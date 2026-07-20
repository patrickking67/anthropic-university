---
name: review-bank
description: Adversarially review an Anthropic University question bank for correctness, ambiguity, duplication, distractor quality, and answer-length tells — flagging issues before they ship. Use before committing question changes or when auditing a bank.
argument-hint: "<exam-id>"
allowed-tools: Read, Bash
---

# Review a bank

Audit `content/<exam-id>/questions.json` like a skeptic trying to break it.

## Check

- **Correctness**: is each keyed answer actually right per the official docs? Flag any you can't
  verify.
- **One best answer**: is exactly one option defensibly correct? Flag ambiguous or multiple-correct
  items.
- **Distractors**: are all three wrong AND plausible (not filler, not absurd, not accidentally true)?
- **Duplication**: near-duplicate stems or options across the bank.
- **Fairness / tells**: run the length-rank check — the correct answer must not be systematically the
  longest (or shortest):

  ```
  node -e 'const e=require("./content/<exam-id>/questions.json");const r=[0,0,0,0];for(const q of e.questions){const en=Object.entries(q.options).sort((a,b)=>b[1].length-a[1].length);r[en.findIndex(([k])=>k===q.answer)]++;}console.log("rankDist long→short",r.join("/"),"max",Math.max(...r));'
  ```

  Each rank should hold ~25%; flag if any rank exceeds ~32%. Also check the answer-letter spread
  across A/B/C/D.

## Report

List findings most-severe first, each with the question id and a concrete fix. Do not rewrite
silently — surface issues for the maintainer.
