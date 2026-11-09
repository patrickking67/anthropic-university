# AGENTS.md

Guide for coding agents working in this repo. Read it before you change anything.

## What this is

Anthropic University is an unofficial study hub for Anthropic's four Claude certifications. Each track
has 100 original practice questions, a study guide and flashcards. The same data feeds a static web
app (`docs/`) and a Claude Code plugin marketplace (`.claude-plugin/`, `plugins/`).

It is not affiliated with or endorsed by Anthropic. Keep it that way in every file and page.

| examId | Track |
| --- | --- |
| `associate-foundations` | Claude Certified Associate: Foundations |
| `developer-foundations` | Claude Certified Developer: Foundations |
| `architect-foundations` | Claude Certified Architect: Foundations |
| `architect-professional` | Claude Certified Architect: Professional |

## Stack

- Node 24 or later. CI uses Node 26, the active LTS. ESM scripts, standard library only.
- No `package.json`, no dependencies, no install step, no bundler, no framework.
- Web app: vanilla JS, HTML and CSS that also works from `file://`.

## Commands

All verified on 2026-11-07.

| Task | Command | Result |
| --- | --- | --- |
| Check everything (what CI runs) | `node scripts/check.mjs` | Exit 0 and `All checks passed.` |
| Validate banks only | `node scripts/build.mjs --check` | `Validation passed for 4 exam(s), 400 questions.` |
| Rebuild generated files | `node scripts/build.mjs` | Regenerates every file listed under Generated files |
| Preview the web app | `node scripts/serve.mjs` | http://localhost:4106/ (`PORT=` to change). Also `.claude/launch.json` |
| Validate plugin manifests | `claude plugin validate --strict .` and `claude plugin validate --strict plugins/<name>` | Part of `check.mjs` when the `claude` CLI is on PATH; skipped in CI |

There is no linter, type checker or unit test suite. `check.mjs` is the test suite: bank schema and
duplicates, generated-file sync, JS syntax, JSON parsing, relative markdown links, `llms.txt` shape and
plugin manifests.

## Layout

```
content/<examId>/     questions.json, flashcards.json (canonical), study-guide.md (hand-written),
                      practice-exam.md and flashcards.md (generated)
scripts/build.mjs     validation and generation
scripts/check.mjs     the one check command
scripts/serve.mjs     local preview server for docs/
docs/                 the web app: index.html, app.js, styles.css, mark.svg, data/ (generated), llms.txt (generated)
assets/               original logo and mark SVGs, README screenshots
.claude-plugin/       marketplace.json
plugins/              exam-coach, flashcard-drill, cert-author (data/ inside each is generated)
.claude/skills/       maintainer skills: author-questions, review-questions, build-content, add-exam
.github/workflows/    validate.yml (runs check.mjs), pages.yml (deploys docs/ when Pages is on)
llms.txt              llmstxt.org index with absolute URLs
```

## Generated files

Never edit these by hand. Edit the canonical JSON (or root `llms.txt`) and run `node scripts/build.mjs`.

- `content/<examId>/practice-exam.md`, `content/<examId>/flashcards.md`
- `docs/data/<examId>.js`, `docs/data/index.js`
- `docs/llms.txt` (copy of root `llms.txt`)
- `plugins/exam-coach/data/*.json`, `plugins/flashcard-drill/data/*.json`

## Question schema

`content/<examId>/questions.json`:

```jsonc
{
  "examId": "architect-foundations",       // must equal the folder name
  "title": "Claude Certified Architect – Foundations",
  "shortTitle": "Architect – Foundations",
  "track": "Architect", "level": "Foundations", "unofficial": true,
  "meta": { "questionCount": 100, "passScaled": 720, "scaleMin": 100, "scaleMax": 1000, "timeMinutes": 120 },
  "domains": [ { "id": "multi-agent", "name": "Multi-Agent Orchestration", "weight": 0.2 } ],
  "questions": [ {
    "id": "af-001",                         // unique within the exam
    "domain": "multi-agent",                // must match a domains[].id
    "studyArea": "Multi-Agent Orchestration",
    "scenario": "Multi-Agent Research System",  // optional
    "difficulty": "medium",                 // easy | medium | hard
    "stem": "...",
    "options": { "A": "...", "B": "...", "C": "...", "D": "..." },  // exactly 4
    "answer": "C",
    "explanationCorrect": "Why C is right (state the principle).",
    "explanationDistractor": "Why a tempting wrong pick fails.",
    "reference": "https://code.claude.com/docs/en/..."   // optional doc link
  } ]
}
```

`meta.passScaled`, `scaleMin` and `scaleMax` drive the app's approximate scaled score. Anthropic's
public certification page does not state a pass mark or scale; 720 on 100 to 1000 is what candidates
report. Present it as approximate, never as official.

Quality bar: one clear best answer, three plausible distractors, options parallel in length and
structure, no "all of the above", explanations state the principle. See `CONTRIBUTING.md`.

## Content rules

1. Original material only. Never reproduce real or remembered certification exam questions, and do not
   copy questions a user pastes. Use them as a style reference at most.
2. Ground every answer key in current official docs: code.claude.com/docs for Claude Code, MCP and
   the Agent SDK, platform.claude.com/docs for the API. Look it up; do not answer from memory. If you
   cannot verify a claim, say so in the PR instead of guessing.
3. No Anthropic logos or wordmarks, nothing that implies endorsement. Artwork in `assets/` and `docs/`
   is original. Keep the non-affiliation notice in the README and the site footer.

## Writing rules

No em dashes and no emojis in new or edited text. Plain, short sentences. ISO dates (YYYY-MM-DD).
Older generated content and question banks still contain dashes; do not mass-rewrite them.

## What not to touch

- Generated files (above), except by running the build.
- GitHub repo settings, Pages settings, secrets, branch protection.
- Plugin `name` fields and marketplace entry names: they are users' install ids. Renaming breaks installs.

## How to ship

1. Branch from `main`: `feat/`, `fix/`, `docs/` or `chore/` prefix.
2. Make one logical change per commit, Conventional Commits, signed. Stage explicit paths.
3. Run `node scripts/check.mjs` before every commit. If it regenerated files, commit them.
4. For a web app change, run `node scripts/serve.mjs` and click through Study, Practice, Exam and
   Flashcards at desktop width and 375px.
5. Open a PR against `main` with what changed, why, how you verified it, and what you did not verify.

Merging to `main` publishes the site (once Pages is enabled) and updates the plugins for everyone who
added the marketplace.

## Definition of done

- `node scripts/check.mjs` exits 0.
- Generated files are committed and in sync.
- Any new factual claim about Claude, its certifications or its docs links an official source or is
  marked unverified.
- The non-affiliation notice is intact.
