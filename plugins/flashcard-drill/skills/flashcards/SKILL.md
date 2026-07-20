---
name: flashcards
description: Drill Claude Certification flashcards in the terminal with a lightweight spaced-repetition loop. Use when the user wants to review concepts quickly with front/back cards and self-graded recall.
argument-hint: "<exam-id> [domain]"
allowed-tools: Read, Grep
---

# Flashcard drill

Run a flashcard session for `$ARGUMENTS` (exam id + optional domain).

## Load cards

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`. Read `${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` (a `{ cards: [...] }`
object). Inside the `anthropic-university` repo, `content/<exam-id>/flashcards.json` works too. If no
exam id was given, list the four tracks and ask.

## Drill loop (Leitner-style)

1. Shuffle the cards (optionally filter to the requested domain).
2. Show the **front** only. Let the user attempt recall, then reveal the **back** when they respond
   (or say "flip").
3. Ask them to self-grade: **got it** / **almost** / **missed**.
4. Keep three buckets in memory:
   - **missed** → re-queue soon (after ~2 cards)
   - **almost** → re-queue later in the session
   - **got it** → retire for this session (surface again only if time allows)
5. Continue until the user stops or every card is retired. Prioritize the missed/almost buckets so
   weak cards get more reps.

## Wrap up

Report: cards reviewed, how many are still shaky (missed/almost), and which domain those cluster in,
so the user knows what to study next. Unofficial study aid — keep it quick and motivating.
