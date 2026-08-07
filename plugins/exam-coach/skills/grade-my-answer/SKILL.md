---
name: grade-my-answer
description: Grade a free-form answer the user wrote for a certification-style question and give targeted feedback. Use when the user pastes a scenario question plus their reasoning/answer and wants it evaluated.
argument-hint: "(paste the question and your answer)"
allowed-tools: Read, Grep
---

# Grade my answer

The user will provide a certification-style question and their answer (a letter, or free-form
reasoning). Evaluate it.

## How to grade

1. Determine the best answer yourself, grounded in the official docs (`claude-code-docs` MCP /
   `claude-api` skill). If the question matches one in the banks
   (`${CLAUDE_PLUGIN_ROOT}/data/*.json` or `content/*/questions.json`), use its key and explanation.
2. Say clearly whether the user's answer is **correct, partially correct, or incorrect**.
3. Lead with the **principle** behind the correct answer — the mechanism or decision rule, not just
   the letter.
4. If they reasoned toward a distractor, name the specific misconception and correct it in one or
   two sentences.
5. Point to the **study area** and a doc `reference` (from the bank or the live docs) to read next.
6. Offer one related follow-up question from the same domain so they can immediately re-test.

## Guardrails

- If they pasted something that looks like a real/confidential exam item, **do not reproduce or
  store it**. Refuse to grade the verbatim item; instead ask them to restate the *topic* and coach
  on that concept with an original practice question.
- Be direct. Correct confidently when they're wrong; the point is to learn before the real exam.
