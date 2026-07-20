---
name: roadmap
description: Build a personalized study roadmap for a certification track — an ordered plan across the domains, weighted by exam blueprint and by the user's weak areas, with a suggested daily cadence. Use when the user asks "how should I study" or "make me a plan".
argument-hint: "<exam-id> [days until exam]"
allowed-tools: Read, AskUserQuestion
context: fork
---

# Study roadmap

Turn a track into an ordered, time-boxed plan.

## Gather

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`, `cowork-foundations`. Load the bank/guide
(`${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` or `content/<exam-id>/`). Ask (AskUserQuestion) how many
days until the exam and which domains feel weakest (offer the domain names as options; "not sure —
run a diagnostic" is valid → suggest `exam-prep:diagnostic`).

## Plan

- Order domains by exam `weight` × the user's weakness; front-load weak, high-weight domains.
- Map to the available days: each day names the domain(s), the guide sections to read, a flashcard
  set to drill, and a short quiz. Reserve the last 1–2 days for a full timed mock exam + review.
- Keep it realistic and specific ("Day 3: Tool Use — read §Tool Use, drill 15 flashcards, take a
  10-question quiz"). End with the one habit that matters most: after every practice run, review each
  miss and revisit that domain.
