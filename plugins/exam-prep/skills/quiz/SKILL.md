---
name: quiz
description: A quick, untimed multiple-choice quiz on one domain or a whole track, with immediate feedback and explanations after each question. Use for focused practice or a warm-up, not a full scored exam.
argument-hint: "<exam-id> [domain] [count]"
allowed-tools: Read, AskUserQuestion
context: fork
---

# Quick quiz

Run a short, untimed quiz with immediate feedback — the opposite of exam conditions.

## Load

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`, `cowork-foundations`. Load `${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` or
`content/<exam-id>/questions.json`. If no id, ask which track (AskUserQuestion). If a domain is named
in `$ARGUMENTS`, filter to it.

## Run

Default to 5 questions unless a count is given. For each: ask with AskUserQuestion (question =
`scenario` + `stem`, header = id, four options A–D with descriptions). Immediately after each answer,
say Correct / Incorrect + the correct letter, then `explanationCorrect` and, when wrong, the relevant
`explanationDistractor`. Always name the `studyArea` so the user sees the topic.

## Wrap

End with a one-line tally (correct/total) and the topic(s) most missed. Keep it light and
encouraging — this is practice. Suggest a full timed run with `mock-exam` when they're ready.
