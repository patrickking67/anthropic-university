---
name: explain
description: Deep-dive a single concept the certification covers (prompt caching, stop_reason, MCP transports, the agent loop, Cowork permissions, and the like) with an accurate, grounded explanation, citing the official Claude Code docs via the bundled docs MCP. Use when the user asks "what is X" or "explain X" for a Claude / Claude Code / MCP / agent concept.
argument-hint: "<concept>"
allowed-tools: Read
context: fork
---

# Explain a concept

Give a clear, correct, exam-focused explanation of one concept.

## Ground it in the docs

This plugin bundles the **Claude Code Docs** MCP server (see `.mcp.json` at the plugin root). When
explaining an API, Claude Code, MCP, or agent concept, **search the docs first and cite what you
find** — prefer the docs over memory. The bundled tools are named
`mcp__plugin_study_claude-code-docs__*` (search the docs, and query the docs filesystem to read a
page). If the server isn't connected, say so and explain from the track's study guide instead
(`content/<exam-id>/study-guide.md`, or the bundled `guide`).

## Explain

- Start with a one-sentence definition, then how it works, then why it matters for the exam, then a
  common trap or misconception.
- Use a concrete example. Include the doc link when you found one.
- Offer a couple of practice questions on the concept (hand off to `exam-prep` for a full quiz).

Accuracy first — if the docs and your memory disagree, trust the docs.
