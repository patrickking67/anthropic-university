#!/usr/bin/env node
/**
 * Anthropic University — content build pipeline.
 *
 * Canonical source of truth: content/<examId>/questions.json (+ flashcards.json) for certification
 * tracks, and content/lanes/<laneId>/lane.json (+ guide.md) for learning lanes. See content/SCHEMA.md.
 * Everything else is generated so nothing drifts:
 *   - content/<examId>/practice-exam.md   (human-readable exam)
 *   - content/<examId>/flashcards.md      (human-readable flashcards)
 *   - docs/data/<examId>.js               (window.AU.exams[...] payload for the web app)
 *   - docs/data/index.js                  (window.AU.index catalog for the web app)
 *   - plugins/anthropic-university/data/*.json (self-contained plugin data: questions + cards)
 *   - content/lanes/<laneId>/lane.md      (human-readable lane)
 *   - docs/data/lanes/<laneId>.js + docs/data/lanes-index.js (web app lane payloads)
 *   - plugins/anthropic-university/data/lanes/<laneId>.json
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
const LANES_DIR = join(CONTENT_DIR, "lanes");
const PLUGIN_DATA_DIR = join(PLUGINS_DIR, "anthropic-university", "data");

const CHECK_ONLY = process.argv.includes("--check");

// Canonical exam order (controls display order in the app and catalog).
const EXAM_ORDER = [
  "associate-foundations",
  "developer-foundations",
  "architect-foundations",
  "architect-professional",
];

const LANE_GROUPS = ["use", "build", "administer", "partner"];
const DIFFICULTIES = ["easy", "medium", "hard"];

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
    warn(`content/ directory not found — no exams to build yet`);
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
const ALL_KEYS = ["A", "B", "C", "D", "E", "F"];

const isMulti = (q) => Array.isArray(q.answer);
const optionKeys = (q) => (q.options && typeof q.options === "object" ? Object.keys(q.options) : []);
const answerKeys = (q) => (isMulti(q) ? q.answer : [q.answer]);

/**
 * Validate one question object. `ctx` = { where, groupField: "domain"|"module", groupIds: Set,
 * scenarioNames?: Set }. Shared by certification tracks and learning lanes.
 */
function validateQuestion(q, i, ctx, seenIds, seenStems) {
  const tag = `${ctx.where} q[${i}]${q.id ? ` (${q.id})` : ""}`;
  if (!q.id) err(`${tag}: missing "id"`);
  else if (seenIds.has(q.id)) err(`${tag}: duplicate id "${q.id}"`);
  else seenIds.add(q.id);

  if (!q.stem || !q.stem.trim()) err(`${tag}: empty "stem"`);
  else {
    const norm = q.stem.trim().toLowerCase();
    if (seenStems.has(norm)) err(`${tag}: duplicate question stem`);
    else seenStems.add(norm);
  }

  const keys = optionKeys(q);
  if (!keys.length) err(`${tag}: missing "options" object`);
  if (isMulti(q)) {
    const expect = ALL_KEYS.slice(0, keys.length);
    if (keys.length < 4 || keys.length > 6 || expect.some((k) => !keys.includes(k))) {
      err(`${tag}: select-N options must be 4–6 keys contiguous from A (got ${keys.join(",")})`);
    }
    const ans = q.answer;
    if (ans.length < 2 || ans.length > 3) err(`${tag}: select-N "answer" must list 2–3 keys`);
    if (new Set(ans).size !== ans.length) err(`${tag}: select-N "answer" has duplicate keys`);
    if (ans.some((k) => !keys.includes(k))) err(`${tag}: select-N "answer" references a missing option`);
    if (ans.join("") !== [...ans].sort().join("")) warn(`${tag}: list select-N answer keys in letter order`);
    if (q.select !== ans.length) err(`${tag}: "select" must equal answer.length (${ans.length})`);
    if (ans.length >= keys.length) err(`${tag}: select-N needs at least one wrong option`);
    if (q.stem && !/select\s*\d|which\s+(two|three)/i.test(q.stem)) {
      warn(`${tag}: select-N stem should state how many to select (e.g. "(Select 2.)")`);
    }
  } else {
    if (keys.length !== 4 || !OPTION_KEYS.every((k) => keys.includes(k))) {
      err(`${tag}: options must have exactly keys A, B, C, D (got ${keys.join(",")})`);
    }
    if (!OPTION_KEYS.includes(q.answer)) {
      err(`${tag}: "answer" must be one of A,B,C,D (got ${JSON.stringify(q.answer)})`);
    }
    if (q.select !== undefined) err(`${tag}: "select" is only valid on select-N items`);
  }
  for (const k of keys) {
    if (!String(q.options[k] ?? "").trim()) err(`${tag}: option ${k} is empty`);
  }

  // Tell check: a single key noticeably longer than every distractor gives the answer away.
  if (!isMulti(q) && keys.length === 4 && OPTION_KEYS.includes(q.answer)) {
    const len = (k) => String(q.options[k] || "").length;
    const others = OPTION_KEYS.filter((k) => k !== q.answer).map(len);
    if (len(q.answer) > Math.max(...others) * 1.3 && len(q.answer) - Math.max(...others) > 20) {
      warn(`${tag}: keyed option is much longer than every distractor (answer-length tell)`);
    }
  }

  if (!q.explanationCorrect || !q.explanationCorrect.trim()) err(`${tag}: missing "explanationCorrect"`);
  if (!q.explanationDistractor || !q.explanationDistractor.trim()) {
    warn(`${tag}: missing "explanationDistractor" (recommended)`);
  }
  const g = q[ctx.groupField];
  if (!g) err(`${tag}: missing "${ctx.groupField}"`);
  else if (!ctx.groupIds.has(g)) err(`${tag}: ${ctx.groupField} "${g}" is not declared`);
  if (!q.studyArea || !q.studyArea.trim()) warn(`${tag}: missing "studyArea" (recommended)`);
  if (q.difficulty && !DIFFICULTIES.includes(q.difficulty)) err(`${tag}: difficulty must be easy|medium|hard`);
  if (ctx.scenarioNames && q.scenario && !ctx.scenarioNames.has(q.scenario)) {
    err(`${tag}: scenario "${q.scenario}" is not one of the declared scenarios`);
  }
  if (q.reference && !/^https:\/\//.test(q.reference)) warn(`${tag}: reference should be an https URL`);
}

function validateCards(cards, where, groupField, groupIds) {
  cards.forEach((c, i) => {
    if (!c.front || !c.front.trim()) err(`${where} card[${i}]: empty "front"`);
    if (!c.back || !c.back.trim()) err(`${where} card[${i}]: empty "back"`);
    if (c[groupField] && !groupIds.has(c[groupField])) {
      err(`${where} card[${i}]: ${groupField} "${c[groupField]}" is not declared`);
    }
  });
}

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
  const wsum = (exam.domains || []).reduce((n, d) => n + (Number(d.weight) || 0), 0);
  if (exam.domains && exam.domains.length && Math.abs(wsum - 1) > 0.011) {
    warn(`${where}: domain weights sum to ${wsum.toFixed(3)} (expected 1.0)`);
  }

  let scenarioNames = null;
  if (Array.isArray(exam.scenarios)) {
    scenarioNames = new Set(exam.scenarios.map((s) => s.name));
    for (const s of exam.scenarios) {
      for (const d of s.domains || []) {
        if (!domainIds.has(d)) err(`${where}: scenario "${s.name}" references unknown domain "${d}"`);
      }
    }
  }

  const questions = exam.questions || [];
  const seenIds = new Set();
  const seenStems = new Set();
  const ctx = { where, groupField: "domain", groupIds: domainIds, scenarioNames };
  questions.forEach((q, i) => validateQuestion(q, i, ctx, seenIds, seenStems));

  const expected = (exam.meta && exam.meta.questionCount) || 100;
  if (questions.length !== expected) {
    warn(`${where}: has ${questions.length} questions, meta.questionCount says ${expected}`);
  }

  // Coverage vs official weights (±4 percentage points).
  if (questions.length) {
    for (const d of exam.domains || []) {
      if (!d.weight) continue;
      const share = questions.filter((q) => q.domain === d.id).length / questions.length;
      if (Math.abs(share - d.weight) > 0.04) {
        warn(`${where}: domain "${d.id}" is ${(share * 100).toFixed(1)}% of the bank vs ${(d.weight * 100).toFixed(1)}% official weight`);
      }
    }
    const multi = questions.filter(isMulti).length;
    if (multi < 6) warn(`${where}: only ${multi} select-N item(s); aim for at least 6`);
  }

  if (flashcards) {
    validateCards(flashcards.cards || [], `content/${examId}/flashcards.json`, "domain", domainIds);
  } else {
    warn(`content/${examId}: no flashcards.json found`);
  }
}

function validateLane(laneId, lane) {
  const where = `content/lanes/${laneId}/lane.json`;
  for (const f of ["laneId", "title", "group", "summary", "prefix", "modules"]) {
    if (!(f in lane)) err(`${where}: missing required field "${f}"`);
  }
  if (lane.laneId && lane.laneId !== laneId) err(`${where}: laneId "${lane.laneId}" does not match folder "${laneId}"`);
  if (lane.group && !LANE_GROUPS.includes(lane.group)) err(`${where}: group must be one of ${LANE_GROUPS.join("|")}`);
  const moduleIds = new Set();
  (lane.modules || []).forEach((m, i) => {
    const tag = `${where} modules[${i}]`;
    if (!m.id || !m.title) err(`${tag}: needs "id" and "title"`);
    if (moduleIds.has(m.id)) err(`${tag}: duplicate module id "${m.id}"`);
    moduleIds.add(m.id);
    if (!Array.isArray(m.objectives) || m.objectives.length < 2) warn(`${tag}: add 3–5 objectives`);
    if (!Array.isArray(m.keyPoints) || m.keyPoints.length < 3) warn(`${tag}: add 4–8 keyPoints`);
    for (const d of m.docs || []) {
      if (!d.url || !/^https:\/\//.test(d.url)) err(`${tag}: docs entries need an https "url"`);
    }
  });
  const questions = lane.questions || [];
  const seenIds = new Set();
  const seenStems = new Set();
  const ctx = { where, groupField: "module", groupIds: moduleIds };
  questions.forEach((q, i) => {
    validateQuestion(q, i, ctx, seenIds, seenStems);
    if (q.id && lane.prefix && !q.id.startsWith(lane.prefix + "-")) warn(`${where}: question ${q.id} should start with "${lane.prefix}-"`);
  });
  validateCards(lane.cards || [], where, "module", moduleIds);
  for (const id of moduleIds) {
    if (questions.filter((q) => q.module === id).length < 2) warn(`${where}: module "${id}" has fewer than 2 questions`);
    if ((lane.cards || []).filter((c) => c.module === id).length < 2) warn(`${where}: module "${id}" has fewer than 2 cards`);
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
    pushQuestionMd(lines, q);
  });

  return lines.join("\n");
}

function pushQuestionMd(lines, q) {
  if (q.scenario) lines.push(`**Scenario: ${mdEscape(q.scenario)}**`);
  if (q.studyArea) lines.push(`*Study area: ${mdEscape(q.studyArea)}${q.difficulty ? ` · ${q.difficulty}` : ""}*`);
  lines.push("");
  lines.push(mdEscape(q.stem) + (isMulti(q) && !/select\s*\d/i.test(q.stem) ? ` *(Select ${q.select}.)*` : ""));
  lines.push("");
  for (const k of optionKeys(q)) {
    lines.push(`- **${k}.** ${mdEscape(q.options[k])}`);
  }
  lines.push("");
  lines.push(`<details><summary>Answer &amp; explanation</summary>`);
  lines.push("");
  lines.push(isMulti(q) ? `**Correct answers: ${q.answer.join(", ")}**` : `**Correct answer: ${q.answer}**`);
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
    official: exam.official || null,
    guide: guide || null,
    domains: exam.domains || [],
    scenarios: exam.scenarios || null,
    questions: (exam.questions || []).map(questionPayload),
    flashcards: (flashcards && flashcards.cards) || [],
  };
}

function questionPayload(q) {
  const out = {
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
  };
  if (q.module) out.module = q.module;
  if (isMulti(q)) out.select = q.select;
  return out;
}

function lanePayload(lane, guide) {
  return {
    laneId: lane.laneId,
    title: lane.title,
    group: lane.group,
    level: lane.level || null,
    summary: lane.summary || "",
    audience: lane.audience || "",
    estimatedHours: lane.estimatedHours || null,
    prerequisites: lane.prerequisites || [],
    relatedCertifications: lane.relatedCertifications || [],
    officialResources: lane.officialResources || [],
    modules: lane.modules || [],
    guide: guide || null,
    cards: lane.cards || [],
    questions: (lane.questions || []).map(questionPayload),
  };
}

function generateLaneMd(lane) {
  const lines = [];
  lines.push(`# ${lane.title}`);
  lines.push("");
  lines.push(`> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.`);
  lines.push("");
  lines.push(`*Generated from \`lane.json\` by \`scripts/build.mjs\`. Do not edit by hand.*`);
  lines.push("");
  lines.push(`**${lane.summary || ""}**`);
  lines.push("");
  const meta = [lane.group && `Group: ${lane.group}`, lane.level && `Level: ${lane.level}`,
    lane.estimatedHours && `~${lane.estimatedHours} h`, lane.audience && `For: ${lane.audience}`].filter(Boolean);
  if (meta.length) lines.push(meta.join(" · "), "");
  if ((lane.officialResources || []).length) {
    lines.push("## Take alongside", "");
    for (const r of lane.officialResources) lines.push(`- [${r.title}](${r.url})${r.provider ? ` — ${r.provider}` : ""}`);
    lines.push("");
  }
  for (const m of lane.modules || []) {
    lines.push(`## ${m.title}`, "");
    if (m.summary) lines.push(m.summary, "");
    if ((m.objectives || []).length) {
      lines.push("**You will be able to:**", "");
      for (const o of m.objectives) lines.push(`- ${o}`);
      lines.push("");
    }
    if ((m.keyPoints || []).length) {
      lines.push("**Key points**", "");
      for (const k of m.keyPoints) lines.push(`- ${k}`);
      lines.push("");
    }
    if (m.practice) lines.push(`**Practice:** ${m.practice}`, "");
    if ((m.docs || []).length) lines.push("**Read:** " + m.docs.map((d) => `[${d.title}](${d.url})`).join(" · "), "");
    const cards = (lane.cards || []).filter((c) => c.module === m.id);
    if (cards.length) {
      lines.push("<details><summary>Flashcards</summary>", "");
      for (const c of cards) lines.push(`**Q:** ${mdEscape(c.front)}  `, `**A:** ${mdEscape(c.back)}`, "");
      lines.push("</details>", "");
    }
    const qs = (lane.questions || []).filter((q) => q.module === m.id);
    if (qs.length) {
      lines.push("### Check your understanding", "");
      qs.forEach((q) => pushQuestionMd(lines, q));
    }
  }
  return lines.join("\n");
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
      dir: PLUGIN_DATA_DIR,
      file: `${examId}.json`,
      // One self-contained file per track (questions + flashcards) so every skill works after the
      // plugin is copied to an install cache or uploaded to Claude chat.
      content: () => ({
        examId,
        title: payload.title,
        meta: payload.meta,
        official: payload.official,
        domains: payload.domains,
        scenarios: payload.scenarios,
        questions: payload.questions,
        cards: (flashcards && flashcards.cards) || [],
      }),
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

const lanes = [];
if (existsSync(LANES_DIR)) {
  for (const laneId of readdirSync(LANES_DIR).sort()) {
    const p = join(LANES_DIR, laneId, "lane.json");
    if (!existsSync(p)) continue;
    const lane = readJSON(p);
    if (!lane) continue;
    validateLane(laneId, lane);
    lanes.push({ laneId, lane });
  }
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
  console.log(`\n✓ Validation passed for ${loaded.length} exam(s), ${loaded.reduce((n, x) => n + (x.exam.questions || []).length, 0)} questions, ${lanes.length} lane(s).`);
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
    official: payload.official,
    passScaled: payload.meta.passScaled || 720,
    scaleMin: payload.meta.scaleMin || 100,
    scaleMax: payload.meta.scaleMax || 1000,
    timeMinutes: payload.meta.timeMinutes || null,
    domains: payload.domains.map((d) => ({ id: d.id, name: d.name, weight: d.weight || null })),
    flashcardCount: payload.flashcards.length,
  });
}

writeIndexJs(catalog);

const laneCatalog = [];
ensureDir(join(DOCS_DATA_DIR, "lanes"));
if (lanes.length && existsSync(dirname(PLUGIN_DATA_DIR))) ensureDir(join(PLUGIN_DATA_DIR, "lanes"));
for (const { laneId, lane } of lanes) {
  const guidePath = join(LANES_DIR, laneId, "guide.md");
  const guide = existsSync(guidePath) ? readFileSync(guidePath, "utf8") : null;
  const payload = lanePayload(lane, guide);
  writeFileSync(join(LANES_DIR, laneId, "lane.md"), generateLaneMd(lane));
  writeFileSync(join(DOCS_DATA_DIR, "lanes", `${laneId}.js`),
    `/* Generated by scripts/build.mjs — do not edit. */\nwindow.AU = window.AU || {};\n` +
    `window.AU.lanes = window.AU.lanes || {};\nwindow.AU.lanes[${JSON.stringify(laneId)}] = ${JSON.stringify(payload)};\n`);
  if (existsSync(dirname(PLUGIN_DATA_DIR))) {
    writeFileSync(join(PLUGIN_DATA_DIR, "lanes", `${laneId}.json`), JSON.stringify(payload, null, 2) + "\n");
  }
  laneCatalog.push({
    laneId, title: lane.title, group: lane.group, level: lane.level || null, summary: lane.summary || "",
    estimatedHours: lane.estimatedHours || null, moduleCount: (lane.modules || []).length,
    cardCount: (lane.cards || []).length, questionCount: (lane.questions || []).length,
    relatedCertifications: lane.relatedCertifications || [],
  });
}
const groupRank = (g) => LANE_GROUPS.indexOf(g);
laneCatalog.sort((a, b) => groupRank(a.group) - groupRank(b.group) || a.title.localeCompare(b.title));
writeFileSync(join(DOCS_DATA_DIR, "lanes-index.js"),
  `/* Generated by scripts/build.mjs — do not edit. */\nwindow.AU = window.AU || {};\nwindow.AU.laneIndex = ${JSON.stringify(laneCatalog, null, 2)};\n`);
if (existsSync(dirname(PLUGIN_DATA_DIR))) {
  ensureDir(PLUGIN_DATA_DIR);
  writeFileSync(join(PLUGIN_DATA_DIR, "catalog.json"), JSON.stringify({ exams: catalog, lanes: laneCatalog }, null, 2) + "\n");
}

console.log(`\n✓ Built ${loaded.length} exam(s):`);
for (const c of catalog) {
  console.log(`  - ${c.title}: ${c.questionCount} questions, ${c.flashcardCount} flashcards`);
}
for (const l of laneCatalog) {
  console.log(`  - lane ${l.laneId} (${l.group}): ${l.moduleCount} modules, ${l.questionCount} questions, ${l.cardCount} cards`);
}
console.log(`\nOutputs: content/*/practice-exam.md, content/*/flashcards.md, content/lanes/*/lane.md, docs/data/**, plugins/anthropic-university/data/**`);
