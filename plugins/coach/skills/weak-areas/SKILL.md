---
name: weak-areas
description: Identify which domains and sub-topics are weakest for a track — from the user's recent practice results or a quick probe — and turn that into a focused study list. Use after a quiz/exam or when the user asks "what should I focus on".
argument-hint: "<exam-id>"
allowed-tools: Read, AskUserQuestion
context: fork
---

# Weak-area analysis

Find where the user is losing points and what to do about it.

## Inputs

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`, `cowork-foundations`. Load the bank
(`${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` or `content/<exam-id>/questions.json`) for the
domain/topic structure. If the user has recent results, use them; otherwise run a brief probe (a few
questions across domains via AskUserQuestion) to estimate.

## Analyze

- Group misses by `domain` and `studyArea`. Weight by exam blueprint (`domains[].weight`) — a weak
  high-weight domain matters more.
- Produce a ranked focus list: domain → specific sub-topics → the exact study-guide section and a
  flashcard set to drill. Be concrete about the highest-leverage next hour of study. Hand off to
  `study:roadmap` or `coach:plan` for a full schedule.
