# CLAUDE.md — Anthropic University

Project context for Claude Code working in this repository. Read this before making changes.

## What this repo is

**Anthropic University** is an open study hub for the **Claude Certification** program. It contains
original practice exams, study guides, and flashcards for four certification tracks, thirteen
**learning lanes** (Use / Build / Administer / Partner & industry), an interactive web app (GitHub
Pages), and the cross-surface `anthropic-university` plugin. Created by Patrick King.

The four tracks (each in `content/<examId>/`):

| examId                   | Title                                    |
| ------------------------ | ---------------------------------------- |
| `associate-foundations`  | Claude Certified Associate – Foundations |
| `developer-foundations`  | Claude Certified Developer – Foundations |
| `architect-foundations`  | Claude Certified Architect – Foundations |
| `architect-professional` | Claude Certified Architect – Professional |

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

Lanes live in `content/lanes/<laneId>/` (`lane.json` canonical + `guide.md`). Groups: `use`,
`build`, `administer`, `partner`. See `content/SCHEMA.md` for the full v2 schema (tracks, lanes,
select-N) and `content/FACTS.md` for the verified fact snapshot (models, surfaces, certification
program) — update FACTS.md first when a fact changes, then the content that depends on it.

Partner-track content is original: never reproduce partner-portal, Academy, or official practice
exam text. Use those sources for topic lists only. Never give legal advice in any lane.

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
- `content/lanes/<laneId>/lane.md`, `docs/data/lanes/<laneId>.js`, `docs/data/lanes-index.js`
- `plugins/anthropic-university/data/*.json`, `data/lanes/*.json`, `data/catalog.json` —
  self-contained plugin data

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
  "official": { "code": "CCAR-F", "items": 60, "…": "…" },  // official blueprint facts
  "domains": [ { "id": "agentic-architecture", "number": 1, "name": "…", "weight": 0.27, "skills": ["…"] } ],
  "questions": [ {
    "id": "af-001",                       // unique within the exam
    "domain": "agentic-architecture",     // must match a domains[].id (weights = official)
    "studyArea": "…",                     // one of that domain's skills
    "scenario": "Multi-Agent Research System",   // optional scenario frame
    "difficulty": "medium",               // easy | medium | hard
    "stem": "…",
    "options": { "A": "…", "B": "…", "C": "…", "D": "…" },  // 4 (select-N: 4–6, A–F)
    "answer": "C",                        // one key, or an array of 2–3 keys for select-N
    // "select": 2,                        // select-N only: equals answer.length
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
content/lanes/       <laneId>/lane.json (canonical) + guide.md + generated lane.md
content/SCHEMA.md    v2 schema · content/FACTS.md verified facts snapshot
scripts/build.mjs    validation + generation pipeline (Node stdlib, no deps)
docs/                GitHub Pages app (static, no build step): index.html, app.js, styles.css, data/
assets/              original SVG logo + favicon + screenshots
.claude/skills/      maintainer skills (author-questions, review-questions, build-content, add-exam, add-lane)
.claude-plugin/      marketplace.json (learner-facing plugin catalog)
plugins/             anthropic-university (single cross-surface plugin: study, learn, client-roleplay,
                     exports; references/blueprints.md summarizes the official exam guides)
.github/workflows/   validate.yml (PR gate) + pages.yml (deploy on merge to main)
```

## Conventions

- Node scripts are ESM (`.mjs`), standard library only — do not add npm dependencies.
- The web app is vanilla JS + `window.AU` data (no framework, no bundler). Keep it dependency-free
  and working both on GitHub Pages and by opening `docs/index.html` from disk (`file://`).
- Keep the reference-exam feel of the Practice mode (per-question feedback, study-area tag).
