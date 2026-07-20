---
name: mock-exam
description: Run a full interactive practice exam for a Claude certification track — one multiple-choice question at a time, then an approximate scaled score (100–1000, 720 to pass) with a per-domain breakdown and a review of every miss. Use for a timed, exam-like practice run.
argument-hint: "<exam-id> [question-count]  (e.g. /exam-prep:mock-exam architect-foundations 20)"
allowed-tools: Read, AskUserQuestion
context: fork
---

# Mock exam runner

Administer an interactive practice exam. Present questions one at a time with AskUserQuestion, track
answers, and give a scored report at the end. Keep everything outside the AskUserQuestion prompts
clean and brief — this is an exam, not a conversation.

## Step 1 — Load the bank

Parse `$ARGUMENTS` for an exam id and an optional question count.

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`, `cowork-foundations`.

Load the bank from the first path that exists:

- `${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` (bundled, self-contained after install)
- `content/<exam-id>/questions.json` (when running inside the repo)

If no exam id was given, ask which track with **one** AskUserQuestion (the five tracks as options).
If the id is invalid or the file can't be read, stop and say so plainly. Read `meta`
(`questionCount`, `passScaled`, `scaleMin`, `scaleMax`, `timeMinutes`) and `domains` (id, name,
`weight`).

## Step 2 — Configure (one AskUserQuestion call, up to 3 questions)

1. header **"Questions"** — "How many questions?" Options: `10`, `20 (Recommended)`, `40`,
   `Full <questionCount>`.
2. header **"Focus"** — "Domain focus?" Options: `All domains (Recommended)`, then 2–3 domain names
   (the user can type another domain as "Other").
3. header **"Feedback"** — "Feedback timing?" Options: `After each question (Recommended)`,
   `Only at the end (exam-like)`.

Build the queue: if a domain is chosen, filter to it; otherwise sample **proportionally across
domains by `weight`**. Shuffle, then take the first N. Vary the order each run — don't always start
on the same question.

State the plan in one line: count, that timing is informal, and that the score is an **approximate**
100–1000 scale with `passScaled` (720) to pass.

## Step 3 — Administer

For each question, in order:

1. Print one progress line: `**Q<i> of <total> · score <correct>/<answered>**` (omit the score when
   feedback is end-only).
2. Ask with AskUserQuestion, **one** question:
   - `question`: the `scenario` (if present) then the `stem`, kept readable — trim aggressively if
     very long.
   - `header`: the question id (e.g. `af-013`).
   - `multiSelect`: false.
   - Four options with labels `A` / `B` / `C` / `D`, each option's `description` set to the full
     option text.
3. Record the chosen letter; compare to `answer`.
4. If feedback is **After each question**: one line — `Correct.` or `Incorrect — answer: <X>.` — then
   `explanationCorrect` in 1–2 sentences (and, when wrong, one clause from `explanationDistractor` on
   why their pick misses).
5. If feedback is **Only at the end**: acknowledge in a few words and move on — never reveal the
   answer mid-exam.

Rules: never reveal the correct answer before the user picks. Never skip or reorder a queued
question. Do not use AskUserQuestion between questions for anything but the next question.

## Step 4 — Score & review

When every queued question is answered (or the user says "submit"):

Compute `correct` / `total`. Scaled score =
`round(scaleMin + (correct / total) * (scaleMax - scaleMin))`. Compare to `passScaled` → PASS / FAIL.
Render:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EXAM COMPLETE — <exam title>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Raw score      <correct> / <total>   (<pct>%)
Scaled score   <scaled> / 1000       (approximate)
Pass mark      720 / 1000
Result         PASS  /  FAIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then a **per-domain breakdown** (correct/total and % for each domain that appeared). Then, if
feedback was end-only, list **every missed question**: id, the correct letter, and a one-sentence
reason from `explanationCorrect`. End by naming the 1–2 weakest domains to study next (point at the
`study` plugin's guide/roadmap).

Reminder: unofficial practice only. The scaled score is an approximation to help you calibrate, not
an official result.
