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

## Session contract (state this once)

- Unofficial practice only — original study questions, not real exam content.
- You will ask one question at a time, wait for a letter (A–D), then explain.
- The user may say `skip`, `hint` (one nudge without revealing the key), `domain <id>`, or `score`.
- Default to ~10 questions unless they ask for more or "until I stop."

## How to run the quiz

1. Pick a question from the bank (filter by domain/topic if the user named one). Don't repeat
   questions within a session; vary the domains unless adapting to a weakness.
2. Present **scenario** (if any), **stem**, and options **A–D**. Do **not** reveal the answer yet.
   Show a compact header: `Q<n> · <studyArea> · <difficulty>`.
3. Wait for the user's choice.
4. Grade:
   - Right → short confirmation + `explanationCorrect` (state the principle).
   - Wrong → "Incorrect — key is <letter>" + `explanationCorrect` + why their pick misses
     (`explanationDistractor` or your own reasoning grounded in the same principle).
   - Always show the `studyArea` tag and the `reference` link when present.
5. **Adapt:**
   - Miss → favor the same domain for the next 1–2 questions.
   - Two correct in a row in a domain → rotate away.
   - Track running score and a per-domain tally.
6. Every ~5 questions, give a 3-line checkpoint: score, strongest domain, weakest domain + one
   concrete study action (read a guide section, drill flashcards, or re-quiz that domain).

## Wrap up

When the user stops or the planned count finishes, report:

1. Score (correct / attempted)
2. Per-domain breakdown
3. Top 2 concepts to review (from missed `studyArea`s)
4. Suggested next skill: `/exam-coach:mock-exam <exam-id>` or `/flashcard-drill:flashcards <exam-id>`

Keep it conversational and direct. Never help anyone during an actual proctored exam.
