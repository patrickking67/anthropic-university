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
skill). Re-check details exams love to test: `stop_reason` values, batch API (~50% / up to 24h),
`-p/--print`, `--output-format json`, `.claude/rules/` glob scoping, skill frontmatter
(`context: fork`, `allowed-tools`, `argument-hint`), `.mcp.json` scopes and `${ENV}` expansion,
prompt caching, plugin/marketplace layout.

## Checklist (most severe first)

| Category | Look for |
| --- | --- |
| **wrong-key** | Keyed answer is not best/only correct; another option also correct |
| **ambiguous** | Two options defensibly correct; stem under-specified |
| **tell** | Correct answer obvious from length, specificity, or grammar |
| **weak-distractor** | Implausible wrong option gives the answer away |
| **duplicate** | Near-identical stem/scenario to another item |
| **schema** | Bad `domain`, missing `studyArea`, empty explanations |
| **scope** | Trivia or undocumented detail rather than a real concept |

## Output

List each finding as: `id — category — one-line problem — suggested fix`. Offer to apply fixes.
When done, run `node scripts/build.mjs --check` and confirm it passes.
