---
name: author-questions
description: Author new original practice questions for an Anthropic University certification track. Use when adding or expanding a question bank in content/<exam>/questions.json. Enforces the schema, the one-best-answer quality bar, and docs-grounded answer keys.
argument-hint: "<exam-id> [domain-id] [count]"
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Author practice questions


> **Schema v2:** read `content/SCHEMA.md` (select-N items, official domains/weights, `official`
> block, scenarios) and `content/FACTS.md` (verified current facts) before editing content.

You are writing **original, unofficial** practice questions for Anthropic University. Target exam:
`$ARGUMENTS` (an exam id like `architect-foundations`, optionally a domain id and how many to write).

## Non-negotiables

1. **Original content only.** Never reproduce a real or remembered certification exam question. Write
   new questions that teach publicly documented concepts.
2. **Ground every answer key in the official docs.** Use the `claude-code-docs` MCP server and the
   `claude-api` skill to confirm API, Claude Code, MCP, and agent behavior before committing a key.
   When unsure, look it up — do not guess. Add a `reference` URL when practical.
3. This material is **not affiliated with Anthropic**. Do not imply otherwise.

## Steps

1. Read `content/<exam-id>/questions.json` to see the declared `domains`, the `meta`, existing ids,
   and the house style. Read `content/<exam-id>/study-guide.md` for the concepts in scope.
2. Pick the target domain(s) and how many questions to add. Continue the `id` numbering (zero-padded,
   e.g. `af-041`).
3. For each question, follow this schema exactly:

```jsonc
{
  "id": "af-041", "domain": "<domains[].id>", "studyArea": "<concise concept label>",
  "scenario": "<optional applied framing>", "difficulty": "easy|medium|hard",
  "stem": "<clear, self-contained question>",
  "options": { "A": "…", "B": "…", "C": "…", "D": "…" },
  "answer": "C",
  "explanationCorrect": "<state the principle that makes the key correct>",
  "explanationDistractor": "<why a specific tempting wrong choice fails>",
  "reference": "https://…"
}
```

## Quality bar (apply to every question)

- Exactly **one unambiguously best** answer; the other three are **plausible** distractors a
  partially-informed candidate might pick — never obvious throwaways.
- Options are **parallel** in grammar, length, and specificity. Don't let the correct answer be the
  longest or the only detailed one.
- No "all/none of the above", no "A and C", no negation traps.
- Prefer scenario-based, root-cause questions in the style of the real exams ("Production logs
  reveal…", "You're designing…", "What's the most effective fix?").
- Spread across the domain's sub-topics; avoid near-duplicates of existing stems.

## Finish

- Insert the new questions into the `questions` array.
- Run `node scripts/build.mjs` and fix any validation errors or warnings.
- Report: how many questions added, to which domain(s), and any doc pages you verified against.
