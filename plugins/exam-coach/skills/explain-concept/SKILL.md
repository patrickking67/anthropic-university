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

1. **Ground it in the docs.** If the `claude-code-docs` MCP server or the `claude-api` skill is
   available, verify specifics (parameter names, defaults, behaviors) rather than relying on memory.
   The exam banks under `${CLAUDE_PLUGIN_ROOT}/data/*.json` (or `content/*/questions.json` in the
   repo) are a good source of the exact study areas and the principle behind each — grep them for the
   topic to see how it's tested.
2. **Explain in layers:** a one-sentence definition → why it matters / when to reach for it → the key
   rules or trade-offs → a short concrete example.
3. **Contrast with look-alikes** the exam likes to confuse (e.g. batch API vs. prompt caching;
   `.claude/rules/` glob-scoped rules vs. skills with trigger keywords; `context: fork` vs.
   `/compact`; `stop_reason` "tool_use" vs. "end_turn").
4. **End with one check question** (A–D) so the user can test understanding, then reveal and explain
   the answer.

Keep it tight and correct. If something is genuinely ambiguous or version-dependent, say so.
