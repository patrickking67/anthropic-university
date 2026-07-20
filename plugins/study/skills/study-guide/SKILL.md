---
name: study-guide
description: Read and walk through a track's study guide — summarize a domain, jump to a topic, or get the key points for a section. Use when the user wants to learn or review the material for a certification track.
argument-hint: "<exam-id> [domain or topic]"
allowed-tools: Read
context: fork
---

# Study guide walkthrough

Help the user learn a track from its study guide.

## Load

Valid exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`, `cowork-foundations`. Read the guide from
`${CLAUDE_PLUGIN_ROOT}/data/<exam-id>.json` (the `guide` field) or `content/<exam-id>/study-guide.md`.
If no track is given, ask which one.

## Teach

- If a domain/topic is named, jump to that section, give the key points, then offer to go deeper or
  quiz on it.
- Otherwise summarize the guide's domains and ask where to start.
- Explain the *why* behind each concept, not just definitions; use short examples. When the user
  seems ready, suggest a quiz (`exam-prep`) on that domain.

Stay accurate to the guide — don't invent facts beyond it. For a deep dive on a single concept with
doc citations, hand off to the `explain` skill.
