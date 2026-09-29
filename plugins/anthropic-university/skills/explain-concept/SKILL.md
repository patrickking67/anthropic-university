---
name: explain-concept
description: Explain a Claude Certification concept clearly and accurately from live official docs — definition, when to use it, key rules and defaults, a worked example, the look-alikes the exam confuses it with, and a check question. Covers Claude API, Claude Code, MCP, Agent Skills, agents, and Claude on Microsoft Foundry/Azure. Use when the user asks "explain", "what is", "how does <X> work", "difference between X and Y", or wants to understand rather than be quizzed.
argument-hint: "<concept or topic> [exam-id]"
allowed-tools: Read, Grep, Glob, Bash, WebFetch
---

# Explain a concept

Read `${CLAUDE_PLUGIN_ROOT}/references/study-core.md` and `references/sources.md` (fallback
`../../references/`) and follow them.

## Research first

1. **Route the lookup** per sources.md: Claude Code/MCP/plugins → `claude-code-docs`; API
   behavior → `claude-api` skill; the `SKILL.md` format and skill authoring → `agent-skills`;
   Microsoft Foundry, Azure, Copilot, Entra → `microsoft-learn`.
   Run at least one lookup; two for comparisons.
2. **See how it is tested and taught.** Search the banks (with a shell,
   `au.py find <track-or-lane> "<topic>"`; otherwise Grep) (`data/*.json`, `data/lanes/*.json`, or
   `content/**` in the repo) for the topic. Note which principle the keyed answers encode, which
   distractors recur, and which lane module teaches it, so you can point there.

## Explain in layers

1. **One sentence**: what it is.
2. **Why / when**: the problem it solves and the signal to reach for it.
3. **Rules and defaults**: parameters, limits, ordering rules, failure modes. Mark anything
   version-dependent.
4. **Worked example**: a minimal, correct snippet (JSON request, CLI invocation, `.mcp.json`, skill
   frontmatter) or a 3-step workflow.
5. **Look-alikes**: a two- or three-row comparison table against what the exam confuses it with,
   for example:
   - Batches API vs. prompt caching vs. streaming
   - `.claude/rules/` path-scoped rules vs. skills vs. `CLAUDE.md`
   - `context: fork` / subagents vs. `/compact` vs. `/clear`
   - `stop_reason`: `tool_use` vs. `end_turn` vs. `max_tokens` vs. `pause_turn`
   - Claude via Microsoft Foundry vs. Amazon Bedrock vs. Google Vertex AI vs. the Claude API
6. `Source: <page> — <url>` for each lookup used.

## Check

Ask one original A–D check question on the concept (or a bank item on it). Wait, then reveal and
explain. On a miss, give a second, different check. Suggest
`/anthropic-university:quiz-me <exam-id> <domain>` to keep practicing that domain.

If the learner wants to go deeper, name at most one official Academy course that strongly matches
the concept (sources.md → Academy recommendations). If they want to keep the explanation, offer
`/anthropic-university:cheat-sheet`.

Keep it tight and practical. If the docs are ambiguous or the feature is in beta, say so.
