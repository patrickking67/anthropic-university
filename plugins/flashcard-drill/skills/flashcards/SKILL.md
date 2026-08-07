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

## Session contract

- Show the **front** only until the user answers or says `flip`.
- Self-grades: `got it` / `almost` / `missed` (aliases: `2` / `1` / `0` or `g` / `a` / `m`).
- Commands: `shuffle`, `domain <id>`, `stats`, `stop`.
- Unofficial study aid — keep the loop quick.

## Drill loop (Leitner-style)

1. Shuffle the cards (optionally filter to the requested domain). Prefer unknown/shaky cards first if
   you already have grades from earlier in the session.
2. Show the **front** only. Let the user attempt recall, then reveal the **back**.
3. Ask them to self-grade: **got it** / **almost** / **missed**.
4. Keep three buckets in memory:
   - **missed** → re-queue soon (after ~2 cards)
   - **almost** → re-queue later in the session
   - **got it** → retire for this session (surface again only if time allows)
5. Continue until the user stops or every card is retired. Prioritize the missed/almost buckets so
   weak cards get more reps.
6. Every ~8 cards, print a one-line `stats`: reviewed / still shaky / domains of misses.

## Wrap up

Report:

1. Cards reviewed
2. How many are still shaky (missed/almost)
3. Which domains those cluster in
4. One suggested next step (`/exam-coach:quiz-me <exam-id> <domain>` or read that domain in the study
   guide)

Keep it motivating and terse.
