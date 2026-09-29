---
name: study-plan
description: Anthropic University home base — recommend a learning path by role (Use, Build, Administer, Partner lanes plus the four Claude certifications), check progress, and build a dated plan to a goal or exam date mixing lessons, quizzes, flashcards, and mock exams. Use when the user says "help me study", "where should I start", "make a study plan", "I have my exam on <date>", "what should I learn next", "learning path for <role>", or invokes Anthropic University without a specific activity.
argument-hint: "[exam-id | lane-id | role] [date or days left]"
allowed-tools: Read, Grep, Glob, Write, Bash, WebFetch
---

# Study plan (Anthropic University hub)

Entry point for learners. Anthropic University was created by Patrick King (unofficial). Read `${CLAUDE_PLUGIN_ROOT}/references/study-core.md` (fallback
`../../references/study-core.md`) first and follow it.

## 1. Orient

1. Resolve the target from `$ARGUMENTS`: an exam id, a lane id, or a role. With no target, ask the
   learner's role and goal (a choice tool when available) and propose a path from
   `references/learning-paths.md`. For a lane-only goal (no exam), plan lanes module by module with
   `/anthropic-university:learn` and skip sections 2–3's exam-specific parts.
2. Look for prior progress (progress file or a pasted resume code). If found, summarize it in one
   line: sessions, last score, weakest domains.
3. Resolve the timeline: exam date → days left (today's date from context). No date → assume a
   14-day plan and say so.

## 2. Show the track at a glance

Read `references/blueprints.md` for the track (with a shell, `au.py info <exam-id>` gives the
domains, weights, and bank counts as JSON). One compact table: official domain, weight, bank
questions, and cards. Then the real format in one line (code, item count, multiple-choice +
multiple-response, 120 min, 720/1,000, fee, Pearson VUE). Name the two heaviest domains, since
they decide most of the score.

## 3. Build the plan

Allocate days in proportion to **official** domain weight, boosted for weak domains from progress
(multiply by 1.5, renormalize). Structure:

- **Phase 1 — Learn (≈40%)**: per domain, `explain-concept` on its 2–3 heaviest study areas, then
  a `flashcards` pass for that domain.
- **Phase 2 — Practice (≈40%)**: `quiz-me <exam-id> <domain>`, 10 questions per session, weakest
  first; re-drill missed flashcards.
- **Phase 3 — Simulate (≈20%)**: a 20-question `mock-exam`, review, then a `full` (official-length)
  run if time allows. Place the last full mock 2–3 days before the exam, never the day before.

Pull in lanes as prep: for each weak or heavy official domain, schedule the matching lane modules
(`/anthropic-university:learn <lane-id> <module>`). For example, Developer's Applications and
Integration maps to `claude-api-fundamentals`, and Tools and MCPs maps to `mcp-and-integrations`.
Partners also get `/anthropic-university:client-roleplay` sessions.

Add at most two official Anthropic Academy courses that strongly match the plan, from the live
catalog (sources.md → Academy recommendations), as optional "alongside" rows.

Render as a dated table: `Day | Date | Focus domain | Activity (exact command) | ~minutes`. Keep
daily load realistic (30–60 min). For under 4 days left, compress to: one mock now, drill the two
weakest domains, one final short mock.

## 4. Hand off

End with the single best next action as a runnable command, e.g.
`/anthropic-university:quiz-me developer-foundations tools-mcps`, and offer to start it now. Offer
to save the plan: as a Claude Doc when the `claude-docs` connector is connected and the user
wants it shareable, otherwise to `~/.anthropic-university/plan-<exam-id>.md` with file tools, or
left in chat.

## Menu (when the user just wants options)

| Goal | Command |
| --- | --- |
| Learn a lane module by module | `/anthropic-university:learn <lane-id>` |
| Rehearse a client conversation (partners) | `/anthropic-university:client-roleplay [persona]` |
| Practice questions with feedback | `/anthropic-university:quiz-me <exam-id> [domain]` |
| Timed exam simulation | `/anthropic-university:mock-exam <exam-id> [20\|40\|full]` |
| Rapid recall | `/anthropic-university:flashcards <exam-id> [domain]` |
| Understand a topic | `/anthropic-university:explain-concept <topic>` |
| One-page review sheet | `/anthropic-university:cheat-sheet <exam-id \| lane-id> [domain]` |
| Check my reasoning | `/anthropic-university:grade-my-answer` |
| Study on phone / Quizlet / Anki | `/anthropic-university:export-quizlet <exam-id> [domain]` |
