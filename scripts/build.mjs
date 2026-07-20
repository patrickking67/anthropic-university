#!/usr/bin/env node
/**
 * Anthropic University — content build pipeline.
 *
 * Canonical source of truth: content/<examId>/questions.json (+ flashcards.json).
 * Everything else is generated so nothing drifts:
 *   - content/<examId>/practice-exam.md   (human-readable exam)
 *   - content/<examId>/flashcards.md      (human-readable flashcards)
 *   - docs/data/<examId>.js               (window.AU.exams[...] payload for the web app)
 *   - docs/data/index.js                  (window.AU.index catalog for the web app)
 *   - plugins/<p>/data/*.json             (self-contained data for marketplace plugins, if present)
 *
 * Usage:
 *   node scripts/build.mjs          Validate + generate all outputs
 *   node scripts/build.mjs --check  Validate only; exit non-zero on any error (used in CI)
 *
 * Node stdlib only — no dependencies, no network.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = join(ROOT, "content");
const DOCS_DATA_DIR = join(ROOT, "docs", "data");
const PLUGINS_DIR = join(ROOT, "plugins");

const CHECK_ONLY = process.argv.includes("--check");

// Canonical exam order (controls display order in the app and catalog).
const EXAM_ORDER = [
  "associate-foundations",
  "developer-foundations",
  "architect-foundations",
  "architect-professional",
];

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

function readJSON(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    err(`Could not parse JSON at ${rel(path)}: ${e.message}`);
    return null;
  }
}

function rel(path) {
  return path.startsWith(ROOT) ? path.slice(ROOT.length + 1) : path;
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ---------------------------------------------------------------------------
// Discover exams
// ---------------------------------------------------------------------------
function discoverExams() {
  if (!existsSync(CONTENT_DIR)) {
    err(`content/ directory not found`);
    return [];
  }
  const dirs = readdirSync(CONTENT_DIR).filter((name) => {
    const p = join(CONTENT_DIR, name);
    return statSync(p).isDirectory() && existsSync(join(p, "questions.json"));
  });
  // Order by EXAM_ORDER, then any extras alphabetically.
  return dirs.sort((a, b) => {
    const ia = EXAM_ORDER.indexOf(a);
    const ib = EXAM_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
const OPTION_KEYS = ["A", "B", "C", "D"];

function validateExam(examId, exam, flashcards) {
  const where = `content/${examId}/questions.json`;

  for (const field of ["examId", "title", "domains", "questions"]) {
    if (!(field in exam)) err(`${where}: missing required field "${field}"`);
  }
  if (exam.examId && exam.examId !== examId) {
    err(`${where}: examId "${exam.examId}" does not match folder name "${examId}"`);
  }

  const domainIds = new Set((exam.domains || []).map((d) => d.id));
  for (const d of exam.domains || []) {
    if (!d.id || !d.name) err(`${where}: each domain needs an "id" and "name" (got ${JSON.stringify(d)})`);
  }

  const seenIds = new Set();
  const seenStems = new Set();
  const questions = exam.questions || [];

  questions.forEach((q, i) => {
    const tag = `${where} q[${i}]${q.id ? ` (${q.id})` : ""}`;
    if (!q.id) err(`${tag}: missing "id"`);
    else if (seenIds.has(q.id)) err(`${tag}: duplicate id "${q.id}"`);
    else seenIds.add(q.id);

    if (!q.stem || !q.stem.trim()) err(`${tag}: empty "stem"`);
    else {
      const norm = q.stem.trim().toLowerCase();
      if (seenStems.has(norm)) err(`${tag}: duplicate question stem`);
      else seenStems.add(norm);
    }

    if (!q.options || typeof q.options !== "object") {
      err(`${tag}: missing "options" object`);
    } else {
      const keys = Object.keys(q.options);
      if (keys.length !== 4 || !OPTION_KEYS.every((k) => keys.includes(k))) {
        err(`${tag}: options must have exactly keys A, B, C, D (got ${keys.join(",")})`);
      }
      for (const k of OPTION_KEYS) {
        if (q.options[k] !== undefined && !String(q.options[k]).trim()) {
          err(`${tag}: option ${k} is empty`);
        }
      }
    }

    if (!OPTION_KEYS.includes(q.answer)) {
      err(`${tag}: "answer" must be one of A,B,C,D (got ${JSON.stringify(q.answer)})`);
    }
    if (!q.explanationCorrect || !q.explanationCorrect.trim()) {
      err(`${tag}: missing "explanationCorrect"`);
    }
    if (!q.explanationDistractor || !q.explanationDistractor.trim()) {
      warn(`${tag}: missing "explanationDistractor" (recommended)`);
    }
    if (q.domain && !domainIds.has(q.domain)) {
      err(`${tag}: domain "${q.domain}" is not declared in exam.domains`);
    }
    if (!q.studyArea || !q.studyArea.trim()) {
      warn(`${tag}: missing "studyArea" (recommended)`);
    }
  });

  const expected = (exam.meta && exam.meta.questionCount) || 100;
  if (questions.length !== expected) {
    warn(`${where}: has ${questions.length} questions, meta.questionCount says ${expected}`);
  }

  if (flashcards) {
    const cards = flashcards.cards || [];
    cards.forEach((c, i) => {
      if (!c.front || !c.front.trim()) err(`content/${examId}/flashcards.json card[${i}]: empty "front"`);
      if (!c.back || !c.back.trim()) err(`content/${examId}/flashcards.json card[${i}]: empty "back"`);
    });
  } else {
    warn(`content/${examId}: no flashcards.json found`);
  }
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------
function mdEscape(s) {
  return String(s == null ? "" : s);
}

function generatePracticeExamMd(exam) {
  const m = exam.meta || {};
  const lines = [];
  lines.push(`# ${exam.title} — Practice Exam`);
  lines.push("");
  lines.push(`> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. Questions are original and written to teach the publicly documented concepts — they are **not** real exam items.`);
  lines.push("");
  lines.push(`**${(exam.questions || []).length} questions**` +
    (m.timeMinutes ? ` · Real exam format: ${m.timeMinutes} min` : "") +
    (m.passScaled ? ` · Passing scaled score ${m.passScaled}/${m.scaleMax || 1000}` : ""));
  lines.push("");
  lines.push(`*This file is generated from \`questions.json\` by \`scripts/build.mjs\`. Do not edit by hand.*`);
  lines.push("");
  lines.push("---");
  lines.push("");

  (exam.questions || []).forEach((q, i) => {
    lines.push(`### Question ${i + 1} of ${exam.questions.length}`);
    lines.push("");
    if (q.scenario) lines.push(`**Scenario: ${mdEscape(q.scenario)}**`);
    if (q.studyArea) lines.push(`*Study area: ${mdEscape(q.studyArea)}${q.difficulty ? ` · ${q.difficulty}` : ""}*`);
    lines.push("");
    lines.push(mdEscape(q.stem));
    lines.push("");
    for (const k of OPTION_KEYS) {
      lines.push(`- **${k}.** ${mdEscape(q.options[k])}`);
    }
    lines.push("");
    lines.push(`<details><summary>Answer &amp; explanation</summary>`);
    lines.push("");
    lines.push(`**Correct answer: ${q.answer}**`);
    lines.push("");
    lines.push(mdEscape(q.explanationCorrect));
    if (q.explanationDistractor) {
      lines.push("");
      lines.push(`_Why a tempting wrong answer misses:_ ${mdEscape(q.explanationDistractor)}`);
    }
    if (q.reference) {
      lines.push("");
      lines.push(`Reference: ${mdEscape(q.reference)}`);
    }
    lines.push("");
    lines.push(`</details>`);
    lines.push("");
    lines.push("---");
    lines.push("");
  });

  return lines.join("\n");
}

function generateFlashcardsMd(exam, flashcards) {
  const lines = [];
  lines.push(`# ${exam.title} — Flashcards`);
  lines.push("");
  lines.push(`> Unofficial, community-authored study material. Not affiliated with Anthropic.`);
  lines.push("");
  lines.push(`*Generated from \`flashcards.json\` by \`scripts/build.mjs\`. Do not edit by hand.*`);
  lines.push("");
  const cards = (flashcards && flashcards.cards) || [];
  // Group by domain for readability.
  const byDomain = new Map();
  for (const c of cards) {
    const key = c.domain || "General";
    if (!byDomain.has(key)) byDomain.set(key, []);
    byDomain.get(key).push(c);
  }
  const domainName = new Map((exam.domains || []).map((d) => [d.id, d.name]));
  for (const [domain, group] of byDomain) {
    lines.push(`## ${domainName.get(domain) || domain}`);
    lines.push("");
    group.forEach((c) => {
      lines.push(`**Q:** ${mdEscape(c.front)}  `);
      lines.push(`**A:** ${mdEscape(c.back)}`);
      lines.push("");
    });
  }
  return lines.join("\n");
}

function examPayload(exam, flashcards, guide) {
  // Trim to what the app needs (keeps the payload lean but complete).
  return {
    examId: exam.examId,
    title: exam.title,
    shortTitle: exam.shortTitle || exam.title,
    track: exam.track || null,
    level: exam.level || null,
    unofficial: exam.unofficial !== false,
    meta: exam.meta || {},
    guide: guide || null,
    domains: exam.domains || [],
    questions: (exam.questions || []).map((q) => ({
      id: q.id,
      domain: q.domain || null,
      studyArea: q.studyArea || null,
      scenario: q.scenario || null,
      difficulty: q.difficulty || null,
      stem: q.stem,
      options: q.options,
      answer: q.answer,
      explanationCorrect: q.explanationCorrect,
      explanationDistractor: q.explanationDistractor || "",
      reference: q.reference || null,
    })),
    flashcards: (flashcards && flashcards.cards) || [],
  };
}

function writeExamDataJs(payload) {
  const js =
    `/* Generated by scripts/build.mjs — do not edit. */\n` +
    `window.AU = window.AU || {};\n` +
    `window.AU.exams = window.AU.exams || {};\n` +
    `window.AU.exams[${JSON.stringify(payload.examId)}] = ${JSON.stringify(payload)};\n`;
  writeFileSync(join(DOCS_DATA_DIR, `${payload.examId}.js`), js);
}

function writeIndexJs(catalog) {
  const js =
    `/* Generated by scripts/build.mjs — do not edit. */\n` +
    `window.AU = window.AU || {};\n` +
    `window.AU.index = ${JSON.stringify(catalog, null, 2)};\n`;
  writeFileSync(join(DOCS_DATA_DIR, `index.js`), js);
}

function writePluginData(examId, payload, flashcards) {
  // Best-effort: only emit if a plugin dir exists. Keeps marketplace plugins self-contained.
  const targets = [
    {
      dir: join(PLUGINS_DIR, "exam-coach", "data"),
      file: `${examId}.json`,
      // Full self-contained bank so the coach can serve real questions + explanations
      // even after the plugin is copied to its install cache.
      content: () => ({
        examId,
        title: payload.title,
        meta: payload.meta,
        domains: payload.domains,
        questions: payload.questions,
      }),
    },
    {
      dir: join(PLUGINS_DIR, "flashcard-drill", "data"),
      file: `${examId}.json`,
      content: () => ({ examId, title: payload.title, cards: (flashcards && flashcards.cards) || [] }),
    },
  ];
  for (const t of targets) {
    const pluginRoot = dirname(t.dir);
    if (!existsSync(pluginRoot)) continue;
    ensureDir(t.dir);
    writeFileSync(join(t.dir, t.file), JSON.stringify(t.content(), null, 2) + "\n");
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const exams = discoverExams();
if (exams.length === 0) warn("No exams found under content/. Nothing to build yet.");

const catalog = [];
const loaded = [];

for (const examId of exams) {
  const exam = readJSON(join(CONTENT_DIR, examId, "questions.json"));
  if (!exam) continue;
  const fcPath = join(CONTENT_DIR, examId, "flashcards.json");
  const flashcards = existsSync(fcPath) ? readJSON(fcPath) : null;
  validateExam(examId, exam, flashcards);
  loaded.push({ examId, exam, flashcards });
}

if (errors.length) {
  console.error(`\n✖ ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
}
if (warnings.length) {
  console.error(`\n⚠ ${warnings.length} warning(s):`);
  for (const w of warnings) console.error(`  - ${w}`);
}

if (CHECK_ONLY) {
  if (errors.length) {
    console.error(`\nValidation FAILED with ${errors.length} error(s).`);
    process.exit(1);
  }
  console.log(`\n✓ Validation passed for ${loaded.length} exam(s), ${loaded.reduce((n, x) => n + (x.exam.questions || []).length, 0)} questions.`);
  process.exit(0);
}

if (errors.length) {
  console.error(`\nRefusing to generate output while errors exist. Fix the above and re-run.`);
  process.exit(1);
}

ensureDir(DOCS_DATA_DIR);

for (const { examId, exam, flashcards } of loaded) {
  writeFileSync(join(CONTENT_DIR, examId, "practice-exam.md"), generatePracticeExamMd(exam));
  if (flashcards) {
    writeFileSync(join(CONTENT_DIR, examId, "flashcards.md"), generateFlashcardsMd(exam, flashcards));
  }
  const guidePath = join(CONTENT_DIR, examId, "study-guide.md");
  const guide = existsSync(guidePath) ? readFileSync(guidePath, "utf8") : null;
  const payload = examPayload(exam, flashcards, guide);
  writeExamDataJs(payload);
  writePluginData(examId, payload, flashcards);

  catalog.push({
    examId: payload.examId,
    title: payload.title,
    shortTitle: payload.shortTitle,
    track: payload.track,
    level: payload.level,
    questionCount: payload.questions.length,
    passScaled: payload.meta.passScaled || 720,
    scaleMin: payload.meta.scaleMin || 100,
    scaleMax: payload.meta.scaleMax || 1000,
    timeMinutes: payload.meta.timeMinutes || null,
    domains: payload.domains.map((d) => ({ id: d.id, name: d.name, weight: d.weight || null })),
    flashcardCount: payload.flashcards.length,
  });
}

writeIndexJs(catalog);

console.log(`\n✓ Built ${loaded.length} exam(s):`);
for (const c of catalog) {
  console.log(`  - ${c.title}: ${c.questionCount} questions, ${c.flashcardCount} flashcards`);
}
console.log(`\nOutputs: content/*/practice-exam.md, content/*/flashcards.md, docs/data/*.js`);
