---
name: author-question
description: Author new original practice questions for an Anthropic University track to the exact questions.json schema — one unambiguous best answer, three plausible distractors, a docs-grounded answer key, and balanced option lengths. Use when adding to content/<exam>/questions.json.
argument-hint: "<exam-id> [domain] [count]"
allowed-tools: Read, Edit, Write
---

# Author questions

Write new, original questions that teach publicly documented concepts — never reproduce a real exam
item.

## Schema (`content/<exam-id>/questions.json`)

Each question: `id` (unique, prefix-consistent), `domain` (must match a `domains[].id`), `studyArea`,
optional `scenario`, `difficulty` (`easy` | `medium` | `hard`), `stem`, `options` (exactly A–D),
`answer` (A–D), `explanationCorrect` (state the principle), `explanationDistractor` (why a tempting
pick fails), optional `reference`. See `CLAUDE.md` for the full schema.

## Quality bar

- One unambiguous best answer; three plausible, genuinely-wrong distractors; options parallel in
  length/structure; no "all of the above".
- **Answer length must carry no signal** — do not make the correct option systematically the longest;
  vary which length-rank the key occupies across the bank (aim ~even across the four ranks), and
  spread the answer letter evenly across A/B/C/D.
- Ground every answer key in the official docs (the `claude-code-docs` MCP / live docs). When unsure,
  look it up — don't guess.

After editing, run `node scripts/build.mjs --check` and fix any error for that folder. Never
hand-edit generated files.
