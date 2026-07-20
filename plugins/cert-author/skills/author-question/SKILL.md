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

- **Original only** — never reproduce a real or remembered exam question.
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

## Quality bar

One unambiguous best answer; three plausible distractors; parallel option phrasing; no
"all/none of the above"; scenario/root-cause style preferred; no near-duplicates.

## Finish

Insert into `questions`, run `node scripts/build.mjs`, fix errors/warnings, and report what you added
and which docs you verified against.
