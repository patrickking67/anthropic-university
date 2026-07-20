# CLAUDE.md — Anthropic University

Project context for Claude Code working in this repository. Read this before making changes.

## What this repo is

**Anthropic University** is an open study hub for the **Claude Certification** program. It contains
original practice exams, study guides, and flashcards for the four certification tracks plus a
**Claude Cowork** course companion, an interactive web app (GitHub Pages), and a Claude Code plugin
marketplace.

The tracks (each in `content/<examId>/`):

| examId                   | Title                                     | Kind             |
| ------------------------ | ----------------------------------------- | ---------------- |
| `associate-foundations`  | Claude Certified Associate – Foundations  | certification    |
| `developer-foundations`  | Claude Certified Developer – Foundations  | certification    |
| `architect-foundations`  | Claude Certified Architect – Foundations  | certification    |
| `architect-professional` | Claude Certified Architect – Professional | certification    |
| `cowork-foundations`     | Claude Cowork – Foundations               | course companion |

Each certification track maps to the official CPN prep course of the same name; the Cowork track maps
to the **Introduction to Claude Cowork** course. `meta.questionCount` varies per track (100 for the
certification banks, 60 for the Cowork companion).

## ⚠️ Content integrity rules (read first)

1. **Everything here is original, unofficial study material.** It is **not** affiliated with,
   endorsed by, or produced by Anthropic. Never present it as official.
2. **Never reproduce real or confidential certification exam questions.** Anthropic's Certification
   Exam Policy forbids sharing actual Exam Content. Author *new* questions that teach the publicly
   documented concepts. Do not copy questions from any real or practice exam a user pastes — use it
   only as a style reference.
3. **Ground every answer key in the official docs.** Verify technical claims against the live
   Claude docs before committing an answer key. The `claude-code-docs` MCP server (see `.mcp.json`)
   and the bundled `claude-api` skill are the sources of truth for API, Claude Code, MCP, and agent
   behavior. When unsure, look it up — do not guess.
4. **Do not use official Anthropic logo/wordmark files or imply endorsement.** Artwork in this repo
   (`assets/`, `docs/`) is original, in an Anthropic-adjacent palette. Keep the non-affiliation
   disclaimer in the README and site footer.

## Single source of truth + build

`content/<examId>/questions.json` and `flashcards.json` are **canonical**. Everything else is
generated — never hand-edit generated files.

```bash
node scripts/build.mjs          # validate + regenerate all outputs
node scripts/build.mjs --check  # validate only (CI); non-zero exit on any error
```

Generated (do not edit by hand):
- `content/<examId>/practice-exam.md` — readable exam
- `content/<examId>/flashcards.md` — readable flashcards
- `docs/data/<examId>.js` — `window.AU.exams[...]` payload for the web app
- `docs/data/index.js` — `window.AU.index` catalog
- `plugins/*/data/*.json` — self-contained data for marketplace plugins

**Always run `node scripts/build.mjs` before committing** any change to `content/`, and confirm it
reports zero errors.

## Question schema (`content/<examId>/questions.json`)

```jsonc
{
  "examId": "architect-foundations",     // must equal the folder name
  "title": "Claude Certified Architect – Foundations",
  "shortTitle": "Architect – Foundations",
  "track": "Architect", "level": "Foundations", "unofficial": true,
  "meta": { "questionCount": 100, "passScaled": 720, "scaleMin": 100, "scaleMax": 1000, "timeMinutes": 120 },
  "domains": [ { "id": "multi-agent", "name": "Multi-Agent Orchestration", "weight": 0.2 } ],
  "questions": [ {
    "id": "af-001",                       // unique within the exam
    "domain": "multi-agent",              // must match a domains[].id
    "studyArea": "Multi-Agent Orchestration",
    "scenario": "Multi-Agent Research System",   // optional scenario frame
    "difficulty": "medium",               // easy | medium | hard
    "stem": "…",
    "options": { "A": "…", "B": "…", "C": "…", "D": "…" },  // exactly 4
    "answer": "C",                        // one of A–D
    "explanationCorrect": "Why C is right (state the principle).",
    "explanationDistractor": "Why a tempting wrong pick fails.",
    "reference": "https://code.claude.com/docs/en/…"        // optional doc link
  } ]
}
```

Authoring quality bar: one unambiguous best answer, three plausible distractors, options parallel in
length/structure, no "all of the above", explanation states the underlying principle. See
`CONTRIBUTING.md` and `.claude/skills/author-questions/`.

## Repo layout

```
content/<examId>/    questions.json, flashcards.json (canonical) + study-guide.md + generated md
scripts/build.mjs    validation + generation pipeline (Node stdlib, no deps)
docs/                GitHub Pages app (static, no build step): index.html, app.js, styles.css, data/
assets/              original SVG logo + favicon + screenshots
.claude/skills/      maintainer skills (author-questions, review-questions, build-content, add-exam)
.claude-plugin/      marketplace.json (learner-facing plugin catalog; slug anthropic-university)
plugins/             exam-prep · study · flashcards · coach · author (each: skills/ + agents/; study has .mcp.json)
.github/workflows/   validate.yml (PR gate) + pages.yml (deploy on merge to main)
```

## Plugin marketplace

`.claude-plugin/marketplace.json` catalogs the learner-facing plugins. Its `name` is the required
kebab-case slug `anthropic-university` (used for `/plugin install <p>@anthropic-university`); the
human name **"Anthropic University"** is carried by `metadata.description` and each plugin's
`displayName` (Claude Code ≥ 2.1.143 — marketplace `name` itself may not contain spaces). Five
plugins, each with multiple skills (`plugins/<p>/skills/<name>/SKILL.md`) and, where useful, agents
(`plugins/<p>/agents/*.md`):

- **exam-prep** (Exam Prep) — `mock-exam` (interactive AskUserQuestion runner), `quiz`, `diagnostic`, + `proctor` agent
- **study** (Study) — `study-guide`, `explain`, `roadmap`, + `tutor` agent; bundles the `claude-code-docs` MCP (`plugins/study/.mcp.json`)
- **flashcards** (Flashcards) — `flashcards`, `cram`
- **coach** (Coach) — `weak-areas`, `grade-answer`, `plan`, + `coach` agent
- **author** (Author) — maintainer: `author-question`, `review-bank`, `build`, + `bank-reviewer` agent

`scripts/build.mjs` copies self-contained data into `plugins/{exam-prep,study,coach}/data/` (full
banks; study also embeds the guide) and `plugins/flashcards/data/` (cards) so plugins work after the
install-cache copy. Skills read `${CLAUDE_PLUGIN_ROOT}/data/<examId>.json` (or `content/<examId>/`
inside the repo).

## Conventions

- Node scripts are ESM (`.mjs`), standard library only — do not add npm dependencies.
- The web app is vanilla JS + `window.AU` data (no framework, no bundler). Keep it dependency-free
  and working both on GitHub Pages and by opening `docs/index.html` from disk (`file://`).
- Keep the reference-exam feel of the Practice mode (per-question feedback, study-area tag).
