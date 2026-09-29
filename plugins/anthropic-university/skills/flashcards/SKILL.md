---
name: flashcards
description: Drill Anthropic University flashcards (any certification track or learning lane) with a Leitner-style spaced-repetition loop — front first, self-graded recall, weak cards requeued. Works in Claude Code, the Claude desktop app, and Claude chat. Use when the user says "flashcards", "drill me", "quick review", "rapid recall", or wants to memorize terms and facts for a track, domain, lane, or module. Not for exporting a deck to another app (use export-quizlet).
argument-hint: "<exam-id | lane-id> [domain | module]"
allowed-tools: Read, Grep, Glob, Write, Bash
---

# Flashcards

Read `${CLAUDE_PLUGIN_ROOT}/references/study-core.md` (fallback `../../references/study-core.md`)
and follow it — especially **Parsing replies** and **Grounding and freshness**.

## Setup

- Cards are `data/<exam-id>.json` → `cards` (`front`, `back`, `domain`), or
  `data/lanes/<lane-id>.json` → `cards` (`module`). Filter by domain or module if one is given.
- **With a shell**, `au.py cards <track-or-lane> [--domain <id>] --seed <any>` returns the
  filtered, shuffled deck as JSON, so the whole file never has to be read.
- Seed order: shuffle, then front-load cards from weak domains in saved progress.
- Contract (one line): `Answer or say flip · grade g / a / m · shuffle · domain <id> · stats · stop`.

## Card turn

1. Show `Card <n> · <domain> · <remaining> left` and the **front** only.
2. On an attempt or `flip`, reveal the **back**. When they attempted, open with one line comparing
   their recall to the back (what matched, what was missing) — no lecture.
3. If the back names a model, context size, price, flag, or beta header, check it per
   `references/sources.md`; if stale, add `Current per docs: …` with the source.
4. Ask for the grade (choice tool with Got it / Almost / Missed when available).
5. **After a clear grade, show the next card in the same message** so the loop stays fast.

## Scheduling (Leitner, in-session)

| Grade  | Box | Requeue |
| ------ | --- | ------- |
| missed | 1   | after 2 cards |
| almost | 2   | after ~6 cards |
| got it | 3   | retired; resurfaces only after all others retire |

A card graded `got it` twice in a row after a miss retires. When every card is retired, say so and
offer a final pass over anything ever missed.

## Stats

Every 8 cards (or on `stats`): `Reviewed 16 · retired 9 · shaky 5 (m2 a3) · misses in tools-mcps,
security-safety`.

## Wrap-up

1. Cards reviewed and retired.
2. Still shaky (missed/almost) with their fronts listed.
3. Domains the shaky cards cluster in.
4. One next step: `/anthropic-university:quiz-me <exam-id> <domain>` for the top cluster, or
   `/anthropic-university:export-quizlet <exam-id> <domain>` to keep drilling on a phone.
5. Offer to save progress (study-core → Progress).
