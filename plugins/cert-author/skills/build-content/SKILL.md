---
name: build-content
description: Validate and regenerate all Anthropic University content from the canonical JSON (contributor tool). Use after editing anything under content/, before committing.
allowed-tools: Bash(node scripts/build.mjs*), Read
---

# Build & validate (contributor)

From the repo root:

```bash
node scripts/build.mjs --check   # validate only; non-zero exit on any error (matches CI)
node scripts/build.mjs           # validate + regenerate markdown, flashcards, and web-app data
```

Node standard library only — no install step. Fix every **error** before committing (CI blocks merge
on failures), address **warnings** where reasonable, and commit the regenerated files alongside your
JSON change (CI checks they're in sync via `git diff`).
