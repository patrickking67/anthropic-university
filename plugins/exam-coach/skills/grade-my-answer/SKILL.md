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

1. Determine the best answer yourself, grounded in the official docs (use the `claude-code-docs` MCP
   server / `claude-api` skill when available). If the question matches one in the banks
   (`${CLAUDE_PLUGIN_ROOT}/data/*.json` or `content/*/questions.json`), use its key and explanation.
2. Say clearly whether the user's answer is **correct, partially correct, or incorrect**.
3. Explain the **principle** behind the correct answer — the "why", not just the letter.
4. If they reasoned toward a distractor, name the specific misconception and correct it.
5. Point to the **study area** and, if useful, a doc reference to read next.

Be direct and encouraging. Correct confidently when they're wrong; the point is to learn before the
real exam.
