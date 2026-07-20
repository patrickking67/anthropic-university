---
name: cram
description: A fast, no-grading rapid review of a track's flashcards or one domain — front and back shown together in quick succession for last-minute review before an exam. Use when the user wants to skim everything fast rather than test recall.
argument-hint: "<exam-id> [domain]"
allowed-tools: Read
context: fork
---

# Cram review

Rapid, read-only review — no self-grading, no pausing for recall.

## Load

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`, `cowork-foundations`. Load cards from
`${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` (`cards`) or `content/<exam-id>/flashcards.json`. Filter
to a domain if named.

## Review

Present the cards in compact batches (front → back), grouped by topic/domain, so the user can scroll
the whole set quickly. Bold the term on each. At the end, list the 5–10 highest-yield facts to
remember walking into the exam. This is for the final hour — pair it with a full mock exam earlier.
