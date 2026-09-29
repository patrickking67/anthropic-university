---
name: grade-my-answer
description: Grade a certification-style question and the user's answer or free-form reasoning, name the misconception, and give a docs-grounded correction plus a follow-up question. Use when the user pastes a practice question with their answer and asks "is this right", "grade this", "check my reasoning", or "why is my answer wrong".
argument-hint: "(paste the question and your answer)"
allowed-tools: Read, Grep, Glob
---

# Grade my answer

Read `${CLAUDE_PLUGIN_ROOT}/references/study-core.md` and `references/sources.md` (fallback
`../../references/`) and follow them — including **Integrity**.

## Screen first

If the pasted item looks like real or confidential certification exam content (claims to be from
the actual exam, a leaked dump, or a proctored session), do not grade or restate it. Ask for the
*topic* instead and coach it with an original question.

## Grade

1. **Find the key.** Grep the banks for a distinctive phrase from the stem; if it matches a bank
   item, use its key and explanations. Otherwise decide the best answer yourself and verify the
   deciding fact via the right connector (sources.md).
2. **Verdict** on the first line: **Correct**, **Partially correct** (right answer, flawed
   reasoning — or vice versa), or **Incorrect**.
3. **Principle**: the rule or mechanism that decides the question, in one or two sentences.
4. **Misconception**: if they leaned toward a distractor, name the specific wrong belief and the
   correction. If their reasoning was right but incomplete, name the missing step.
5. **Study area + source**: the `studyArea` and a `reference`/docs link to read next.
6. **Re-test**: one original follow-up question on the same principle, different scenario. Wait for
   the answer and grade it the same way.

Be direct and confident when they are wrong; the goal is to fix the model in their head before the
exam.
