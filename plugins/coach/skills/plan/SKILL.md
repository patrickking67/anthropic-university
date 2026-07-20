---
name: plan
description: Build a day-by-day study schedule to a target exam date for a track, balancing reading, flashcards, quizzes, and a final mock exam. Use when the user gives a deadline and wants a concrete calendar.
argument-hint: "<exam-id> <days>"
allowed-tools: Read, AskUserQuestion
context: fork
---

# Study plan to exam day

Produce a concrete, dated schedule.

## Gather

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`, `cowork-foundations`. Load the track
(`${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` or `content/<exam-id>/`). Ask (AskUserQuestion) how many
days until the exam and roughly how much time per day. If weak areas are unknown, suggest
`coach:weak-areas` first.

## Schedule

- Allocate domains across the days by `weight` × weakness, front-loading the hard, high-weight
  domains.
- Each day: the domain(s), guide sections to read, a flashcard set, and a short quiz. Reserve the
  final 1–2 days for a full timed mock exam (`exam-prep:mock-exam`) and a review of every miss.
- Output as a clean dated checklist. End with the non-negotiable habit: after every practice run,
  review each miss and revisit that domain.
