---
name: flashcards
description: Drill a track's flashcards one at a time — show the front, let the user recall, reveal the back, and self-grade known/unknown, re-queuing misses until the deck is clean. Use for spaced-repetition review of a certification track.
argument-hint: "<exam-id> [domain]"
allowed-tools: Read, AskUserQuestion
context: fork
---

# Flashcard drill

Run a self-graded flashcard session.

## Load

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`, `cowork-foundations`. Load cards from
`${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` (`cards`) or `content/<exam-id>/flashcards.json`. Ask
which track if none given. Filter to a domain if named. Shuffle.

## Drill

For each card: show the **front** and pause. When the user is ready (they say "flip" / "show" /
press enter), reveal the **back**. Then ask whether they got it — "Knew it" / "Missed it". Track
results; **re-queue missed cards** to the end and keep going until every card is marked "Knew it" or
the user stops.

## Wrap

Report how many they knew on the first pass, how many needed repeats, and the topics that came up as
misses most. Suggest a focused quiz (`exam-prep`) on the weakest topic. Keep the pace brisk.
