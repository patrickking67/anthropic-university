---
name: author-question
description: Author new original practice questions for an Anthropic University track (contributor tool). Use when working inside the anthropic-university repo to add questions to content/<exam>/questions.json.
argument-hint: "<exam-id> [domain-id] [count]"
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Author a question (contributor)

Add **original** practice questions to `content/<exam-id>/questions.json` in the anthropic-university
repo. Arguments: `$ARGUMENTS`.

## Rules

- **Original only** — never reproduce a real or remembered exam question. If a user pastes a real
  item, use it only as a style reference and write a new question on the same public concept.
- **Docs-grounded keys** — verify the correct answer against the official Claude docs (use the
  `claude-code-docs` MCP server / `claude-api` skill). Add a `reference` URL where practical.
- **Unofficial** project — don't imply Anthropic endorsement.

## Schema

```jsonc
{
  "id": "<exam-prefix>-NNN", "domain": "<domains[].id>", "studyArea": "<concept>",
  "scenario": "<optional>", "difficulty": "easy|medium|hard",
  "stem": "…", "options": { "A": "…", "B": "…", "C": "…", "D": "…" }, "answer": "C",
  "explanationCorrect": "<the principle>", "explanationDistractor": "<why a tempting pick fails>",
  "reference": "https://…"
}
```

Prefixes: `as-` associate, `df-` developer, `af-`/`ar-` architect-foundations (match existing),
`ap-` architect-professional. Continue zero-padded numbering from the highest id already present.

## Quality bar

- One unambiguous best answer; three plausible distractors a partially-informed candidate might pick.
- Options **parallel** in grammar, length, and specificity — the key must not win by being longest.
- No "all/none of the above", no "A and C", no negation traps.
- Prefer scenario / root-cause stems ("Production logs reveal…", "What's the most effective fix?").
- Spread across the domain's sub-topics; avoid near-duplicates of existing stems.
- `explanationCorrect` states the principle; `explanationDistractor` names why a tempting wrong pick
  fails.

## Finish

1. Insert into `questions`.
2. Run `node scripts/build.mjs` and fix errors/warnings.
3. Report: count added, domains, docs verified against, and any claims you could not substantiate.
