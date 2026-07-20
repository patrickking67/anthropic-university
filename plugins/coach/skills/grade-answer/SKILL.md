---
name: grade-answer
description: Grade a user's written / free-text answer to a scenario or concept question against a rubric — what's correct, what's missing, and the score — the way a grader assesses an open response. Use when the user writes out an answer and wants it evaluated.
argument-hint: "<exam-id or topic>"
allowed-tools: Read, AskUserQuestion
context: fork
---

# Grade a written answer

Assess a free-text answer rigorously and fairly.

## Setup

If the user hasn't supplied a question, take one they name or draw a `scenario` question from the
bank (`${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` or `content/<exam-id>/questions.json`). Establish
the rubric from the question's `explanationCorrect` (the principle that must be present) and the
domain's key points.

## Grade

- List the rubric points the answer **hit**, the ones it **missed**, and anything **incorrect**.
- Give a score (e.g. 0–10) with one line of justification — never just a number; name strengths and
  gaps first.
- Show the model answer (`explanationCorrect`) and the single most important thing to add next time.
- Be encouraging but honest; do not inflate. Reward the underlying principle, not keyword-matching.
