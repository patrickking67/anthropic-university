---
name: review-questions
description: Adversarially review an Anthropic University question bank for correctness, ambiguity, duplication, and fairness. Use before committing question changes or when auditing an existing content/<exam>/questions.json.
argument-hint: "<exam-id> [domain-id]"
allowed-tools: Read, Grep, Glob, Edit
---

# Review a question bank


> **Schema v2:** read `content/SCHEMA.md` (select-N items, official domains/weights, `official`
> block, scenarios) and `content/FACTS.md` (verified current facts) before editing content.

Audit the questions in `content/$ARGUMENTS/questions.json` (optionally scoped to one domain). Your
job is to catch wrong keys, ambiguity, and unfair items **before** they reach a learner.

## Verify each question against the docs

For every question, confirm the keyed answer is actually correct using the `claude-code-docs` MCP
server and the `claude-api` skill. Flag any key you cannot substantiate from official documentation.
Common things to double-check: `stop_reason` values, batch API (50% cost, up to 24h), `-p/--print`,
`--output-format json`, `.claude/rules/` glob scoping, skill frontmatter (`context: fork`,
`allowed-tools`, `argument-hint`), MCP `.mcp.json` scopes and `${ENV}` expansion, prompt caching, and
plugin/marketplace layout.

## Checklist (report findings, most severe first)

- **Wrong key** — the keyed answer is not the best/only correct one, or another option is also correct.
- **Ambiguous** — two options are defensibly correct, or the stem is under-specified.
- **Tell** — the correct answer is obvious from length, specificity, or grammar rather than knowledge.
- **Weak distractors** — a wrong option is so implausible it gives the answer away.
- **Duplication** — near-identical stem/scenario to another question.
- **Schema/tag issues** — bad `domain`, missing `studyArea`, empty explanations.
- **Fairness/scope** — tests trivia or an undocumented detail rather than a real concept.

## Output

List each finding as: `id — category — one-line problem — suggested fix`. Offer to apply fixes. When
done, run `node scripts/build.mjs --check` and confirm it passes.
