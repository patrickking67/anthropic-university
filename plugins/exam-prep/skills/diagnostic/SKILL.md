---
name: diagnostic
description: A short placement test that samples every domain of a track and reports which domains are strong vs. weak, so you know where to focus before studying. Use to plan study, not to get a score.
argument-hint: "<exam-id>"
allowed-tools: Read, AskUserQuestion
context: fork
---

# Diagnostic placement test

Estimate where the user stands across a track's domains with a short sample.

## Load & sample

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`, `cowork-foundations`. Load the bank
(`${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` or `content/<exam-id>/questions.json`). Ask which track
first if none given. Sample **2 questions per domain** (one easier, one harder where difficulty
allows).

## Administer

Ask each with AskUserQuestion, **no feedback between questions** — this is a measurement, not
practice. Record answers.

## Report

Per domain: correct/total and a simple label — **Strong** (both right), **Shaky** (one right),
**Weak** (none right). Rank domains weakest-first and recommend the order to study, pointing at the
matching study-guide sections (`study` plugin). Note this is a rough sample, not an exam score.
