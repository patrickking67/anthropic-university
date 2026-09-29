# Claude Certified Architect – Foundations — Flashcards

> Unofficial, community-authored study material. Not affiliated with Anthropic.

*Generated from `flashcards.json` by `scripts/build.mjs`. Do not edit by hand.*

## Agentic Architecture & Orchestration

**Q:** What field decides whether an agentic loop runs tools again or stops?  
**A:** stop_reason. Continue on tool_use (run the tools, return tool_result blocks, call again); stop on end_turn. Never infer completion from text content, since a response can hold text and tool_use together.

**Q:** How do you return tool results so the next iteration can use them?  
**A:** As tool_result blocks keyed by tool_use_id, first in the next user message, all results for a turn together in one message. Splitting them across messages discourages parallel tool use.

**Q:** Is an iteration cap a good primary stopping mechanism?  
**A:** No. stop_reason is the primary control. A max-turns cap is a safety backstop for runaway loops, not the way a loop normally ends.

**Q:** What must a coordinator's allowed tools include to spawn subagents?  
**A:** The Agent tool (named Task before Claude Code v2.1.63; Task still works as an alias). Without it, AgentDefinition entries exist but can't be launched.

**Q:** Do subagents inherit the coordinator's conversation?  
**A:** No. A subagent gets its own system prompt and the delegation prompt. Pass findings, constraints, and metadata explicitly in that prompt.

**Q:** How do you run independent subagents in parallel?  
**A:** Emit several Agent tool calls in a single coordinator response. Spawning them in separate turns serializes the work.

**Q:** Prompt guidance vs. hooks for workflow rules?  
**A:** Prompts are probabilistic and fail some fraction of the time. Use hooks or programmatic gates when a miss causes real harm (identity checks, refund limits, PII). A PreToolUse deny with a reason tells the model why so it redirects instead of retrying.

**Q:** What can a PostToolUse hook do with a tool result?  
**A:** Add context, or replace the output before Claude sees it (updatedToolOutput). Use it to normalize formats or redact sensitive data from tools you can't modify.

**Q:** Prompt chaining or dynamic decomposition?  
**A:** Chaining for predictable, fixed-step workflows. Dynamic decomposition (map, prioritize, adapt) for open-ended tasks whose subtasks depend on what you find.

**Q:** Resume, fork, or start fresh?  
**A:** Resume (claude --resume <name>, or resume in the SDK) when prior context is still valid; tell it which files changed. Fork (--fork-session, fork_session / forkSession) to branch from a shared baseline. Start fresh with a summary when earlier tool results are stale.

## Tool Design & MCP Integration

**Q:** What most determines whether Claude picks the right tool?  
**A:** The tool description: what it does, when to use it versus similar tools, what each parameter means, and its limits. Aim for 3–4+ sentences. Namespace names by service as the library grows.

**Q:** A generic analyze_document tool gives inconsistent results. Fix?  
**A:** Split it into purpose-specific tools with clear input/output contracts (extract, summarize, verify). Replace broad tools like run_sql or fetch_url with constrained ones.

**Q:** What should a failing tool return?  
**A:** A tool_result with is_error: true (MCP: isError) plus structured metadata: error category (transient, validation, business, permission), a retryable flag, and a clear description. Generic 'Operation failed' blocks good recovery.

**Q:** An agent has 20+ tools and selection errors rise. Fix?  
**A:** Scope each agent to the handful of tools its role needs. Allow narrow cross-role tools for frequent needs and route complex work through the coordinator.

**Q:** tool_choice options, and the catch on current models?  
**A:** auto (default), any, tool (named), none. Opus 5.5, Sonnet 5.5, and Fable 5.1 return a 400 for any and tool; manual extended thinking also blocks them. Use auto with strict: true, or structured outputs, instead.

**Q:** MCP scopes in Claude Code?  
**A:** Project: .mcp.json, committed and shared (use ${VAR} expansion for secrets). User and local: stored in ~/.claude.json and private to you. Tools from every connected server are available together.

**Q:** What are the MCP primitives and transports?  
**A:** Primitives: tools, resources, and prompts. Transports: stdio (local) and Streamable HTTP (remote); the older SSE transport is deprecated.

**Q:** When do MCP resources help?  
**A:** When the agent wastes calls discovering what exists. Expose catalogs (schemas, doc trees, issue summaries) as resources it can list and read.

**Q:** Grep vs. Glob vs. Edit?  
**A:** Glob finds files by name/path pattern (**/*.test.tsx). Grep searches file contents. Edit replaces an exact string that must be unique: add surrounding context, use replace_all, or fall back to Read + Write.

## Claude Code Configuration & Workflows

**Q:** CLAUDE.md locations and who they reach?  
**A:** ~/.claude/CLAUDE.md: just you, all projects. ./CLAUDE.md or ./.claude/CLAUDE.md: the team via git. ./CLAUDE.local.md: you, this project (gitignore it). Subdirectory CLAUDE.md files load when Claude reads files there.

**Q:** How do you keep CLAUDE.md modular?  
**A:** Import files with @path syntax, or split topics into .claude/rules/*.md. Imports still load at launch; check what loaded with /context (Memory files).

**Q:** How do path-scoped rules work?  
**A:** A .claude/rules/ file with a paths: glob list loads when Claude reads a matching file. It lives in message history, so /compact can summarize it away; drop paths or move it to CLAUDE.md if it must persist.

**Q:** Skill frontmatter essentials?  
**A:** disable-model-invocation: true = only you can run it. user-invocable: false = only Claude. context: fork = run in a subagent. allowed-tools = pre-approve (not restrict). disallowed-tools = remove tools. argument-hint = autocomplete hint; use $ARGUMENTS / $0 in the body.

**Q:** Same-named skill in personal and project folders: which runs?  
**A:** Enterprise over personal, personal over project. A personal ~/.claude/skills/deploy shadows the repo's /deploy.

**Q:** Plan mode or direct execution?  
**A:** Plan mode for large, multi-file, or architecturally uncertain work; direct execution for clear, well-scoped changes. Common combo: plan the approach, then execute it.

**Q:** Iterative refinement techniques?  
**A:** Concrete input/output examples when prose is misread; tests first, then share failures; the interview pattern for unfamiliar domains; one message for interacting issues, sequential fixes for independent ones.

**Q:** Key CI flags for claude -p?  
**A:** --output-format json and --json-schema for parseable findings; --allowedTools to pre-approve tools; --max-turns and --max-budget-usd to bound runs. --bare skips CLAUDE.md, skills, hooks, and MCP discovery.

## Prompt Engineering & Structured Output

**Q:** Why do 'be conservative' instructions fail to cut false positives?  
**A:** They're vague. Define categories to report (correctness, security) and to skip (style, local patterns), with examples per severity level.

**Q:** What do few-shot examples do best?  
**A:** Make format consistent and teach ambiguous cases: show why an acceptable pattern differs from a real issue, and cover varied document structures so extraction generalizes.

**Q:** How do you guarantee schema-valid JSON on current models?  
**A:** output_config.format with a json_schema, or strict: true on tools. Guarantees valid JSON, types, and required fields. It does not guarantee semantic correctness.

**Q:** Schema design against fabrication?  
**A:** Make fields nullable when documents may lack them. Add enum values like 'unclear' and 'other' + detail. Put normalization rules for messy source formats in the prompt.

**Q:** When does retry-with-feedback work, and when doesn't it?  
**A:** Works for format and structure errors: send the document, the failed output, and the specific errors. Fails when the information isn't in the input.

**Q:** Message Batches API facts?  
**A:** 50% cheaper, asynchronous, up to 24 hours (most batches finish within 1 hour), results in any order (match by custom_id), available 29 days. Each request is one Messages call, so your code can't run a tool mid-request.

**Q:** Batch submission cadence for an SLA?  
**A:** Worst case = wait until next submission + 24h processing. For a 36h SLA, submit at least every 12h. Resubmit only failed custom_ids, fixing the cause (such as chunking).

**Q:** Why use an independent review instance?  
**A:** The generating session keeps its own reasoning and tends to defend it. A fresh instance without that context catches more. Split large reviews into per-file passes plus an integration pass.

## Context Management & Reliability

**Q:** How do you keep exact facts through summarization?  
**A:** Keep a persistent case-facts block (amounts, dates, IDs, constraints) outside summarized history, and trim tool results to relevant fields before they pile up.

**Q:** How do you counter 'lost in the middle'?  
**A:** Put a key-findings summary first and use explicit section headers in long aggregated inputs.

**Q:** Valid escalation triggers?  
**A:** An explicit request for a human (honor immediately), a policy gap or exception, or no meaningful progress. Not raw sentiment or self-reported confidence. Ask for another identifier when a lookup returns multiple matches.

**Q:** Error-propagation anti-patterns?  
**A:** Returning an empty success when a source failed, and killing the whole run on one failure. Instead: retry locally, then report failure type, what was tried, and partial results; annotate coverage gaps.

**Q:** Staying accurate in long codebase explorations?  
**A:** Delegate verbose discovery to subagents, keep findings in scratchpad files, summarize between phases, use /compact, and export state manifests for crash recovery.

**Q:** Before cutting human review of extractions?  
**A:** Check accuracy by document type and field (averages hide weak segments), calibrate confidence thresholds on labeled data, and keep stratified sampling of high-confidence output.

**Q:** Preserving provenance in synthesis?  
**A:** Carry structured claim-source mappings (claim, URL, excerpt, date) through every step. Annotate conflicts with sources instead of picking one, and include dates so change over time isn't read as contradiction.
