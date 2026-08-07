---
name: explain-concept
description: Give a clear, docs-grounded explanation of a Claude Certification concept (e.g. prompt caching, the agentic loop, batch processing, .claude/rules, escalation design), with a worked example and a check question. Use when the user wants to understand a topic, not be quizzed.
argument-hint: "<concept or topic>"
allowed-tools: Read, Grep
---

# Explain a concept

Teach the concept in `$ARGUMENTS` clearly and accurately for someone preparing for a Claude
certification.

## Approach

1. **Ground it in the docs.** Prefer the `claude-code-docs` MCP server and the `claude-api` skill
   over memory for parameter names, defaults, and behaviors. Grep the exam banks under
   `${CLAUDE_PLUGIN_ROOT}/data/*.json` (or `content/*/questions.json`) for the topic to see how it
   is tested and which principle the keyed answers encode.
2. **Explain in layers:**
   - one-sentence definition
   - when to reach for it / why it matters
   - key rules, defaults, and trade-offs
   - a short concrete example (CLI flag, JSON snippet, or workflow step)
3. **Contrast with look-alikes** the exam likes to confuse, for example:
   - Batches API vs. prompt caching vs. streaming
   - `.claude/rules/` glob-scoped rules vs. Skills with trigger keywords vs. `CLAUDE.md`
   - `context: fork` vs. Explore subagent vs. `/compact`
   - `stop_reason` `tool_use` vs. `end_turn` vs. `max_tokens` vs. `pause_turn`
4. **End with one check question** (A–D, original or from the bank). Wait for their answer, then
   reveal and explain. Offer a second check if they miss.

## Tone

Tight, correct, and practical. If something is version-dependent or ambiguous in the docs, say so
and point to the page. Unofficial study aid — do not imply Anthropic endorsement.
