---
name: build-content
description: Validate and regenerate all Anthropic University content (markdown, web-app data, and this plugin's bundled data) from the canonical JSON (contributor tool, Claude Code in the anthropic-university repo). Use after editing anything under content/, before committing, or when CI reports generated files out of sync.
allowed-tools: Bash(node scripts/build.mjs*), Bash(git diff*), Bash(git status*), Read
---

# Build and validate (contributor)

Requires the `anthropic-university` repo and Node (standard library only — no install). From the
repo root:

```bash
node scripts/build.mjs --check   # validate only; non-zero exit on any error (what CI runs)
node scripts/build.mjs           # validate + regenerate all generated outputs
```

Generated outputs (never hand-edit): `content/<exam>/practice-exam.md`, `content/<exam>/flashcards.md`,
`docs/data/*.js`, and `plugins/anthropic-university/data/<exam>.json` (questions + cards).

Steps:

1. Run the full build. Fix every **error**; address **warnings** where reasonable.
2. `git status` / `git diff --stat` to confirm only expected files changed.
3. Report errors/warnings fixed and remind the contributor to commit the regenerated files with the
   JSON change — CI fails when they drift.
