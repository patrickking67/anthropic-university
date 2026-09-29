---
name: build-content
description: Validate and regenerate all Anthropic University content (markdown exams, flashcards, and web-app data) from the canonical JSON. Use after editing anything under content/, before committing.
allowed-tools: Bash(node scripts/build.mjs*), Read
---

# Build & validate content


> **Schema v2:** read `content/SCHEMA.md` (select-N items, official domains/weights, `official`
> block, scenarios) and `content/FACTS.md` (verified current facts) before editing content.

Regenerate every derived artifact from the canonical `content/<exam>/questions.json` and
`flashcards.json`.

## Run

```bash
node scripts/build.mjs --check   # validate only; non-zero exit on any error
node scripts/build.mjs           # validate + regenerate all outputs
```

`build.mjs` uses only the Node standard library — no install step.

## What it produces

- `content/<exam>/practice-exam.md` and `flashcards.md` (readable)
- `docs/data/<exam>.js` and `docs/data/index.js` (web-app data)
- `plugins/*/data/*.json` (self-contained data for the marketplace plugins)

## Do

- Fix every **error** before committing (the CI `validate` workflow runs `--check` and blocks merge).
- Address **warnings** where reasonable (missing `explanationDistractor`/`studyArea`, off-by-count).
- Commit the regenerated files alongside the JSON change — CI verifies they are in sync via
  `git diff`.
