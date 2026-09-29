---
name: quiz-me
description: Run an adaptive, one-question-at-a-time practice quiz for a Claude Certification track or an Anthropic University lane, with immediate docs-grounded feedback, scoped to a domain, module, or topic. Use when the user says "quiz me", "practice questions", "test me on <domain/topic>", "10 questions on MCP", or wants questions with explanations. Not for a timed, feedback-free simulation (use mock-exam) or for grading a question the user pasted (use grade-my-answer).
argument-hint: "<exam-id | lane-id> [domain | module | topic] [count]"
allowed-tools: Read, Grep, Glob, Write, Bash
---

# Quiz me

Read `${CLAUDE_PLUGIN_ROOT}/references/study-core.md` (fallback `../../references/study-core.md`)
and follow it, including `references/sources.md` for verification.

## Setup

- Parse `$ARGUMENTS`: a track or lane, an optional domain id or module (or free-text topic, matched
  against `studyArea`/`stem` with Grep), and an optional count (default 10; "until I stop" means
  unlimited). Lanes use `module` where tracks use `domain`.
- **With a shell**, draw the pool with the helper instead of reading the bank:
  `au.py sample <track> --n <count> [--domain <id>] --seed <any>` (keys hidden). Grade each reply
  with `au.py grade <track> <qid>=<answer>`, which returns the key and both explanations. Use
  `--exclude` with the ids already seen when adapting. Without a shell, follow study-core by hand.
- State the contract once, in two lines: unofficial original questions · reply with a letter ·
  commands `hint`, `skip`, `explain`, `domain <id>`, `score`, `stop`.

## Loop

1. **Select** an unseen question: filter by domain/topic; otherwise follow the adaptive rules below.
   Mix difficulties, starting at `easy` or `medium`. For adaptive picks with the helper, re-sample with
   `--domain <id> --difficulty <level> --exclude <seen ids> --n 1`. Include select-N items at roughly the bank's rate.
2. **Present** `Q<n>/<count> · <domain name> · <studyArea> · <difficulty>`, then the scenario (if
   any), the stem, and the options. For select-N items, show `Select N` and accept several letters;
   use a multi-select choice tool when available. Never reveal the key.
3. **Wait** for an answer. `hint` → one nudge toward the principle, no elimination of the key.
4. **Grade**
   - Correct → `Correct — <letter>.` + `explanationCorrect` in one or two sentences.
   - Incorrect → `Not quite — the key is <letter>.` + `explanationCorrect` + why their pick fails
     (`explanationDistractor`, or reasoning from the same principle for other options).
   - Add `reference` when present. If the item turns on a version-specific fact (model names,
     limits, flags, pricing), verify it per sources.md before affirming it; flag conflicts.
5. **Adapt**
   - Miss → next 1–2 questions from the same domain, preferring a different `studyArea` at equal or
     lower difficulty.
   - Two correct in a row in a domain → rotate to the least-practiced domain and step difficulty up.
6. **Checkpoint** every 5 questions: `Score 4/5 · strongest <domain> · weakest <domain> → <one
   concrete action>`.

## Wrap-up

On `stop` or completion:

1. Score (correct/attempted, %) and an informal readiness read (≥80% strong, 70–79% borderline,
   <70% needs work — practice signal only).
2. Per-domain table: correct/attempted.
3. The two study areas to revisit, each with its best `reference` link.
4. Next step: `/anthropic-university:flashcards <exam-id> <weak-domain>` or
   `/anthropic-university:mock-exam <exam-id>`.
5. Offer to save progress (study-core → Progress).
