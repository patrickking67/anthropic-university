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
- Default to a shorter, representative set (e.g. 20 questions) unless the user asks for the full 100.
  Sample **proportionally across domains** using each domain's `weight`.
- State the plan up front: number of questions, the (informal) time expectation, and that scoring is
  an **approximate** 100–1000 scale with 720 to pass.

## Administer

1. Ask questions in sequence. Present scenario + stem + options A–D. **Do not reveal answers or give
   feedback between questions** — this is exam conditions. Let the user answer with a letter; they may
   say "flag" to mark for review and "skip".
2. Track their answers and elapsed questions.

## Score & review

When finished (or the user says "submit"):

1. Compute raw correct / total. Map to the scaled score with a simple linear model and label it
   approximate: `scaled = round(scaleMin + (correct/total) * (scaleMax - scaleMin))`. Compare to
   `passScaled` (720) → **PASS/FAIL**.
2. Show a **per-domain breakdown** (correct/total per domain) so they can see weak areas.
3. Review **every missed question**: the correct answer, `explanationCorrect`, and why their choice
   missed. End with the top 1–2 domains to study next.

Reminder: unofficial practice only. The scaled score is an approximation to help calibrate, not an
official result.
