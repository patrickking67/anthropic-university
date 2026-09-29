---
name: author-question
description: Author new original, docs-grounded practice questions for an Anthropic University track, targeting official-blueprint coverage gaps (contributor tool, Claude Code in the anthropic-university repo). Use when a contributor says "write questions", "add questions for <domain>", "fill coverage gaps", or "author items" for content/<exam>/questions.json.
argument-hint: "<exam-id> [domain-id | official domain] [count]"
allowed-tools: Read, Grep, Glob, Edit, Write, Bash(node scripts/build.mjs*)
---

# Author questions (contributor)

Requires the `anthropic-university` repo as the working directory (`content/` and
`scripts/build.mjs` present). If absent, say this is a contributor tool for that repo and stop.
Read `${CLAUDE_PLUGIN_ROOT}/references/sources.md` and `references/blueprints.md`.

## Rules

- **Original only.** Never reproduce a real, remembered, or leaked exam item, or the sample
  questions in the official exam guides. Pasted items are style references only.
- **Docs-grounded keys.** Verify the deciding fact of every key through a connector (sources.md);
  add a `reference` URL. Use current model names and limits from the docs, not from older items.
- **Target the blueprint.** With no domain given, write toward the track's largest coverage gap in
  `blueprints.md` and map each item to an existing bank `domain` id.
- Unofficial project — never imply Anthropic endorsement.

## Schema

```jsonc
{ "id": "<prefix>-NNN", "domain": "<domains[].id>", "studyArea": "<concept>",
  "scenario": "<optional frame>", "difficulty": "easy|medium|hard",
  "stem": "…", "options": { "A": "…", "B": "…", "C": "…", "D": "…" }, "answer": "C",
  "explanationCorrect": "<the principle>", "explanationDistractor": "<why a tempting pick fails>",
  "reference": "https://…" }
```

Prefixes: `as-` associate, `dv-` developer, `ar-` architect-foundations, `ap-`
architect-professional. Continue zero-padded numbering from the highest existing id.

## Quality bar

- One unambiguous best answer; three plausible distractors a partly informed candidate might pick.
- Options parallel in grammar, length, and specificity; the key must not be the longest (the build
  checks answer-length rank). Rotate the key letter across items.
- No "all/none of the above", no combo options, no negation traps, no trivia.
- Prefer scenario and root-cause stems; for architect-foundations use one of the six blueprint
  scenarios as `scenario`.
- Avoid near-duplicates: Grep existing stems for the concept first.

## Finish

1. Insert into `questions`.
2. Run `node scripts/build.mjs`; fix every error and address warnings.
3. Report: count added per domain, blueprint gap targeted, docs pages verified, and any claim you
   could not substantiate (leave those out rather than guessing).
