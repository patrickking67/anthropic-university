---
name: review-bank
description: Adversarially review an Anthropic University question bank or flashcard deck for wrong or stale keys, ambiguity, answer tells, weak distractors, duplicates, and blueprint coverage gaps (contributor tool, Claude Code in the anthropic-university repo). Use before a PR that changes content, or when a learner skill flagged a conflict with the live docs.
argument-hint: "<exam-id> [domain-id] [questions|cards|both]"
allowed-tools: Read, Grep, Glob, Edit, Bash(node scripts/build.mjs*)
---

# Review a bank (contributor)

Requires the `anthropic-university` repo. Read `${CLAUDE_PLUGIN_ROOT}/references/sources.md` and
`references/blueprints.md`. Scope: `content/<exam-id>/questions.json` and/or `flashcards.json`,
optionally one domain.

## 1. Freshness sweep (do first)

Grep for version-sensitive strings — model names and numbers (`Opus`, `Sonnet`, `Haiku`, `Fable`,
`claude-`), context sizes (`200K`, `1M`), prices, beta headers, CLI flags, deprecated parameters.
Verify each against the live docs (Claude API skill / `claude-code-docs`; `microsoft-learn` for
Foundry/Azure). Record every mismatch as **stale**.

## 2. Item checklist (most severe first)

| Category | Look for |
| --- | --- |
| **wrong-key** | Keyed answer not the single best; another option also correct |
| **stale** | Fact was true once but the docs now differ |
| **ambiguous** | Two options defensible; stem under-specified |
| **tell** | Key obvious from length, specificity, or grammar |
| **weak-distractor** | Implausible option that gives the answer away |
| **duplicate** | Near-identical stem/scenario/card to another |
| **schema** | Bad `domain`, missing `studyArea`, empty explanations |
| **scope** | Trivia or undocumented detail rather than a blueprint objective |

## 3. Coverage

Count items per bank domain, map to official domains via `blueprints.md`, and compare to official
weights. List the three largest under-weighted official domains/skills.

## Output

A table: `id | category | problem (one line) | suggested fix | source`. Then the coverage summary.
Offer to apply fixes; after editing, run `node scripts/build.mjs --check` and confirm it passes.
Suggest `/anthropic-university:author-question <exam-id> <domain>` for the top gap.
