---
name: build
description: Validate and regenerate all Anthropic University content — the readable exams, flashcards, web-app data, and plugin data — from the canonical JSON. Use after editing anything under content/, before committing.
allowed-tools: Bash
---

# Build content

Regenerate everything from the canonical `content/<exam>/questions.json` + `flashcards.json`.

- Validate only (CI gate): `node scripts/build.mjs --check` — non-zero exit on any schema error,
  duplicate, or bad key.
- Full build: `node scripts/build.mjs` — regenerates `content/*/practice-exam.md`, `flashcards.md`,
  `docs/data/*.js`, `docs/data/index.js`, and `plugins/*/data/*.json`.

Always run the full build before committing content changes and confirm zero errors. Never hand-edit
generated files — change the canonical JSON and rebuild. After building, reproduce the CI sync check:
run the build again and confirm `git diff` is clean.
