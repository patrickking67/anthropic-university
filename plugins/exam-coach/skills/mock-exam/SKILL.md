---
name: mock-exam
description: Administer a timed mock certification exam and score it on the 100-1000 scale (720 to pass). Use when the user wants a full practice run under exam-like conditions with a final score and per-domain breakdown.
argument-hint: "<exam-id> [question-count]"
allowed-tools: Read, Grep
---

# Mock exam

Administer a timed, exam-like run for `$ARGUMENTS` (exam id + optional question count).

## Setup

- Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
  `architect-professional`. Load `${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` (or, inside the repo,
  `content/<exam-id>/questions.json`). Use its `meta` for the real format (question count, time,
  `passScaled`).
- Default to a shorter, representative set (**20 questions**) unless the user asks for 40 or the
  full 100. Sample **proportionally across domains** using each domain's `weight`.
- State the plan up front:
  - number of questions and informal time budget (scale from `meta.timeMinutes`)
  - scoring is an **approximate** 100–1000 scale with **720 to pass**
  - no feedback until submit
  - commands: letter answer, `flag`, `skip`, `review` (list flagged), `submit`

## Administer

1. Ask questions in sequence. Present scenario + stem + options A–D. **Do not reveal answers or give
   feedback between questions.**
2. Track answers, flags, skips, and question index. If they say `review`, list flagged/skipped ids
   with one-line stems so they can jump back (re-ask that item).
3. Keep pacing light: after every ~10 items, note progress only (`12/20 answered · 2 flagged`), not
   correctness.

## Score & review

When finished (or the user says `submit`):

1. Compute raw correct / total. Map to the scaled score with a simple linear model and label it
   approximate: `scaled = round(scaleMin + (correct/total) * (scaleMax - scaleMin))`. Compare to
   `passScaled` (720) → **PASS / BELOW PASS**.
2. Show a **per-domain breakdown** (correct/total and %) so they can see weak areas.
3. Review **every miss and skip**: correct letter + option text, `explanationCorrect`, and why their
   choice missed when applicable. Group by domain.
4. End with a study prescription: top 1–2 domains, one principle per miss cluster, and a suggested
   follow-up (`/exam-coach:quiz-me <exam-id> <weak-domain>` or flashcards).

Reminder: unofficial practice only. The scaled score helps calibrate study; it is not an official
result.
