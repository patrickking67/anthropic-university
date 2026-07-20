---
name: review-bank
description: Adversarially review an Anthropic University question bank for wrong keys, ambiguity, tells, weak distractors, and duplication (contributor tool). Use before opening a PR that changes questions.
argument-hint: "<exam-id> [domain-id]"
allowed-tools: Read, Grep, Glob, Edit
---

# Review a bank (contributor)

Audit `content/<exam-id>/questions.json` (optionally one domain) before it ships.

## Verify keys against the docs

Confirm every keyed answer with the official docs (`claude-code-docs` MCP server / `claude-api`
skill). Re-check the details exams love to test: `stop_reason` values, batch API (50% / up to 24h),
`-p/--print`, `--output-format json`, `.claude/rules/` glob scoping, skill frontmatter
(`context: fork`, `allowed-tools`, `argument-hint`), `.mcp.json` scopes and `${ENV}` expansion,
prompt caching, plugin/marketplace layout.

## Findings (most severe first)

`id — category — problem — fix`, where category is one of: **wrong-key**, **ambiguous**, **tell**,
**weak-distractor**, **duplicate**, **schema**, **scope**. Offer to apply fixes, then run
`node scripts/build.mjs --check` and confirm it passes.
