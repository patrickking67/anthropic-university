---
name: mock-exam
description: Administer a timed, exam-like Claude Certification mock with no feedback until submit, then score it on an approximate 100–1000 scale (720 to pass) with a per-domain breakdown and full review of misses. Use when the user wants a "mock exam", "practice test", "full run", "simulate the exam", or a readiness check before test day.
argument-hint: "<exam-id> [20|40|100]"
allowed-tools: Read, Grep, Glob, Write
---

# Mock exam

Read `${CLAUDE_PLUGIN_ROOT}/references/study-core.md` (fallback `../../references/study-core.md`)
and follow it.

## Setup

1. Track from `$ARGUMENTS`; length default **20**; `full` = the official item count from
   `references/blueprints.md` (Associate 60, Developer 53, Architect Foundations 60, Architect
   Professional 63); any number up to the bank size is allowed.
2. Build the form before asking anything: sample questions **proportionally to the official domain
   weights** (the bank `domains` are the official ones) and include select-N items at the bank's
   rate
   (largest-remainder rounding so counts sum exactly), spread across `studyArea`s, roughly
   30% easy / 50% medium / 20% hard where the bank allows. Shuffle order. Record the ids.
   **Architect – Foundations:** pick 4 of the 6 blueprint scenarios at random, fill each with bank
   items whose `scenario`/domain fits it, and present items grouped under a scenario header.
3. Time budget = `120 min × length / official item count` (Developer 20 Q ≈ 45 min; others
   20 Q ≈ 38–40 min). Note the start
   time from context if available; the budget is informal.
4. Announce: count, time budget, approximate scoring, no feedback until submit, commands —
   letter answer, `flag`, `skip`, `back <n>`, `review`, `submit`.

## Administer

- Present `Q<n>/<N>` + scenario + stem + options. For select-N items, add `Select N` and accept
  several letters (all-or-nothing when scored). **No correctness signals of any kind** until submit.
- Track answer, flagged, skipped per item. `review` lists unanswered/flagged numbers with a 6-word
  stem snippet. `back <n>` re-presents item n.
- Every 10 items: `10/20 answered · 2 flagged · ~12 min budget left` — progress only.
- At the last item, if any are unanswered, list them and ask to finish or submit anyway.

## Score

1. `raw = correct / N` → `scaled = round(scaleMin + raw × (scaleMax − scaleMin))`; compare to
   `passScaled` → **PASS** / **BELOW PASS**. Label it approximate and unofficial.
2. Per-**official**-domain table (the real score report shows percent-correct by domain):
   correct/total, %, and the domain's exam weight; mark the domain that cost the
   most scaled points.
3. When a visual tool is available (not a plain terminal), a small bar chart of per-domain % with
   a 72% reference line may accompany the table.

## Review

Group misses and skips by domain. For each: stem gist, their answer → key (option text),
`explanationCorrect`, why their pick fails, `reference`. Verify version-specific keys per
`references/sources.md`; flag any that conflict with live docs rather than penalizing a
docs-correct answer (re-score if the user chose the docs-correct option, and say so).

## Prescription

Two weakest domains → one principle per miss cluster → exact next commands
(`quiz-me <exam-id> <domain>`, `flashcards <exam-id> <domain>`, `explain-concept <studyArea>`).
Offer to save the result (study-core → Progress).
