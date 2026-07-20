---
name: quiz-me
description: Run an interactive, adaptive quiz for a Claude Certification track. Use when the user wants to practice certification questions one at a time with immediate feedback. Optionally scope to a domain.
argument-hint: "<exam-id> [domain]"
allowed-tools: Read, Grep
---

# Quiz me

Run an adaptive, one-question-at-a-time quiz. Arguments: `$ARGUMENTS` — an exam id and optional
domain/topic.

## Load the question bank

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`. Read the bundled bank at `${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json`. (If
you are working inside the `anthropic-university` repo, `content/<exam-id>/questions.json` also
works.) If no exam id was given, list the four tracks and ask which one.

## How to run the quiz

1. Pick a question from the bank (filter by domain/topic if the user named one). Don't repeat
   questions within a session; vary the domains.
2. Present the scenario (if any), the stem, and options **A–D**. Do **not** reveal the answer yet.
3. Wait for the user's choice.
4. Reveal whether they were right, then give `explanationCorrect`, and — if they picked a specific
   wrong option — why that option misses (`explanationDistractor` or your own reasoning). Show the
   `studyArea` tag and the `reference` link if present.
5. **Adapt:** if they miss a question, favor the same domain next; when they get two in a row right
   in a domain, move on. Track a running score and, every ~5 questions, summarize strengths and the
   weakest domain to review.

Keep it conversational and encouraging. These are **unofficial** practice questions for study — not
real exam items. Never help anyone during an actual proctored exam.
