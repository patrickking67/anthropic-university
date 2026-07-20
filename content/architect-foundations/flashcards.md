# Claude Certified Architect – Foundations — Flashcards

> Unofficial, community-authored study material. Not affiliated with Anthropic.

*Generated from `flashcards.json` by `scripts/build.mjs`. Do not edit by hand.*

## Multi-Agent Orchestration

**Q:** In the orchestrator-workers pattern, who talks to whom?  
**A:** The coordinator is the hub: it decomposes the task, delegates to specialized workers, and routes their results to a synthesis step. Workers do not talk directly to each other.

**Q:** What is the real advantage of routing everything through the coordinator?  
**A:** Centralized visibility, consistent error handling, and control over what each worker receives, not batching or latency reduction.

**Q:** How do you stop two parallel workers from doing duplicate research?  
**A:** Partition the work at the coordinator before delegating (assign distinct subtopics or source classes). Don't rely on reactive dedup or shared-state races.

**Q:** Every subagent reports success but a whole topic is missing from the output. Root cause?  
**A:** Under-decomposition: coverage is bounded by decomposition quality, so if no worker was assigned a dimension, synthesis can't recover it.

**Q:** A worker misuses a general fetch_url tool to do web search. Best fix?  
**A:** Replace it with a narrower, validated tool (e.g. load_document that only takes a document id) so the misuse is impossible at the interface, not a prompt instruction or denylist.

**Q:** A synthesis agent needs frequent simple fact-checks. Least-privilege design?  
**A:** Give it a narrow verify_fact tool for the common case and route rare complex verification back through the coordinator.

**Q:** How should a worker report a failed data source to the coordinator?  
**A:** Return structured error context: failure type, attempted input, partial results, and suggested alternatives, so the coordinator can recover intelligently.

**Q:** Why distinguish '0 results' from a timeout?  
**A:** A valid empty result is a finding to report; a timeout is an access failure to retry or annotate. Collapsing both into 'no results' produces misleading coverage.

**Q:** Where should a transient error (e.g. a 429) be handled?  
**A:** At the lowest level that can resolve it: the worker retries locally with backoff and only escalates what it can't fix, with context.

**Q:** Some sources fail but the deadline is firm. What should the report do?  
**A:** Degrade gracefully with transparency: proceed and annotate coverage, marking which findings are well-supported vs. gapped. Never fabricate to fill gaps.

**Q:** How do you counter 'lost in the middle' in a long synthesis input?  
**A:** Put a key-findings summary at the top and use explicit section headers; models attend most reliably to the beginning and end.

**Q:** How do you cut token bloat from verbose worker reports?  
**A:** Fix it at the source: have workers return structured findings (key facts, citations, relevance scores) instead of raw page dumps and reasoning transcripts.

## Claude Code for Continuous Integration

**Q:** How do you run Claude Code non-interactively in CI?  
**A:** claude -p "..." (the --print flag): runs once, prints to stdout, and exits.

**Q:** How do you get machine-parseable output to post inline PR comments?  
**A:** Use --output-format json with a schema so findings return as structured data (file, line, severity, message) the CI can post via the API.

**Q:** Why does a blocking pre-merge review use synchronous calls, not the Batches API?  
**A:** A required gate needs a result now; the Batches API is asynchronous with up to a 24-hour turnaround.

**Q:** What kind of CI job is the Batches API ideal for?  
**A:** Overnight or scheduled, latency-tolerant, high-volume jobs, about 50% cheaper and async (up to 24h).

**Q:** Why can't an iterative tool-calling review run on the Batches API?  
**A:** Batch is fire-and-forget: it can't execute a tool mid-request and continue, so multi-step tool-calling loops don't fit.

**Q:** One review category is so noisy engineers ignore all findings. Fix?  
**A:** Temporarily disable the noisy low-precision categories (style/naming), keep the high-precision ones, improve the prompts, then re-enable.

**Q:** The reviewer over-flags because the instruction is vague. Fix?  
**A:** Give explicit criteria, e.g. 'flag a comment only when it contradicts the actual behavior of the code it describes.'

**Q:** Findings are vague and unactionable. Most reliable fix?  
**A:** Provide a few-shot example of the exact desired finding format (problem, location, concrete suggested change).

**Q:** The bot re-reports the same issues on every commit. Fix?  
**A:** Include prior findings in context and ask Claude to report only new or still-unaddressed issues.

**Q:** The reviewer suggests tests that already exist. Fix?  
**A:** Include the existing test file in the review context so it recommends only genuine gaps.

**Q:** A big multi-file PR gets inconsistent review depth. Better structure?  
**A:** Run focused per-file passes for depth, then a separate integration pass for cross-file data flow.

**Q:** How do you keep a synchronous pre-merge review cheaper without going async?  
**A:** Cache the stable prefix (system prompt, conventions, unchanged files) with prompt caching; it's a separate lever from batch and preserves the blocking behavior.

## Customer Support Resolution Agent

**Q:** First fix when the support agent picks the wrong tool (schemas valid)?  
**A:** Improve the tool descriptions: state each tool's purpose, formats, examples, and when to use it versus a similar tool. Descriptions are the primary selection signal.

**Q:** A lookup returns multiple people with the same name. What should the agent do?  
**A:** Ask the user for an additional identifier (email, phone, order number) before acting; never silently guess.

**Q:** How do you guarantee identity is verified before any account change?  
**A:** Enforce a programmatic prerequisite: block the downstream tools until get_customer returns a verified ID. Don't rely on the prompt.

**Q:** When should the agent escalate to a human?  
**A:** On a genuine policy gap (the policy is silent, e.g. competitor price match) where it would otherwise fabricate policy, not for every evidentiary conflict or multi-topic message.

**Q:** How do you improve escalation calibration?  
**A:** Use explicit escalation criteria plus few-shot examples; self-reported confidence scores are poorly calibrated.

**Q:** Two tools return timestamps in different formats. Maintainable fix?  
**A:** A PostToolUse hook that normalizes the formats deterministically before the agent sees them, works even for third-party MCP servers.

**Q:** How do you cut round-trips when several lookups are independent?  
**A:** Issue them in parallel in one turn, or expose a composite tool, and return all results together.

**Q:** Precise details get corrupted after conversation summarization. Fix?  
**A:** Keep a persistent 'case facts' block (order numbers, amounts, dates, region) verbatim outside the summarized history.

**Q:** Explanations are inconsistently complete. Fix?  
**A:** Add a self-critique/evaluator step that checks the drafted reply against explicit completeness criteria before sending.

**Q:** A message has three concerns and the agent re-fetches the customer each time. Fix?  
**A:** Decompose into concerns, investigate in parallel over one shared customer context, then synthesize a single reply.

**Q:** The agent fires a specific tool whenever a keyword appears, despite good tool descriptions. Likely cause?  
**A:** Keyword-sensitive routing instructions in the system prompt biasing tool selection.

**Q:** How should a failed tool call be surfaced to the agent?  
**A:** Return a tool_result with is_error: true describing the failure so the agent can retry, try another tool, or ask the user, don't drop it.

## Code Generation with Claude Code

**Q:** What does .claude/rules/ scope on?  
**A:** File path via glob patterns in YAML frontmatter; the rule applies automatically based on the file being edited, wherever it lives.

**Q:** When do you use a Skill instead of CLAUDE.md?  
**A:** For task/workflow-scoped guidance that should load on demand by trigger keywords, not on every task. CLAUDE.md is for always-on universal standards.

**Q:** What does 'context: fork' do in a skill?  
**A:** Runs the skill in an isolated subagent context so its verbose output doesn't pollute the main conversation, only the result returns.

**Q:** What does 'allowed-tools' in skill frontmatter give you?  
**A:** A deterministic guardrail restricting what the skill can do (e.g. read-only), stronger than a prompt instruction.

**Q:** A project skill shadows your same-named personal skill. Clean fix?  
**A:** Project skills take precedence; give your personal skill a different name in ~/.claude/skills/ so both coexist.

**Q:** Where do team custom commands/skills live so everyone gets them?  
**A:** In the project's .claude/commands/ or .claude/skills/ (version-controlled). There is no .claude/config.json 'commands' array.

**Q:** When do you use plan mode vs. direct execution?  
**A:** Plan mode for architecturally significant or ambiguous work (explore + design first); direct execution for well-specified, low-ambiguity changes.

**Q:** How do you research a large codebase without blowing the main context?  
**A:** Delegate discovery to the Explore subagent, which isolates verbose reading and returns a summary. Better than lossy /compact.

**Q:** Claude keeps misinterpreting a transform described in prose. Best fix?  
**A:** Provide a concrete input-to-output example; few-shot examples beat more instructions for output format.

**Q:** How do you share MCP config for a team without committing secrets?  
**A:** Commit .mcp.json using ${ENV} expansion (e.g. ${GITHUB_TOKEN}); each developer supplies their own secret at runtime.

**Q:** Project CLAUDE.md vs. ~/.claude/CLAUDE.md?  
**A:** Project CLAUDE.md is team-wide and checked in (loads every session for everyone); ~/.claude/CLAUDE.md is personal and cross-project for just you.

**Q:** Mechanism map: universal standards, path-scoped conventions, task workflows?  
**A:** CLAUDE.md (always-on) → universal standards; .claude/rules/ globs → path-scoped conventions; Skills → task-triggered workflows.

## Core API, SDK & MCP Fundamentals

**Q:** Which endpoint handles chat, tool use, and vision?  
**A:** The single Messages API endpoint, POST /v1/messages; tools, images, and text are all content within that request.

**Q:** What are the tool_choice options?  
**A:** auto (default, model decides), any (must use some tool), tool (force a specific named tool), none (no tools).

**Q:** How does prompt caching match, and what invalidates it?  
**A:** Prefix match: any change in the cached prefix invalidates everything after it. Changing the model, tools, or system prompt invalidates the cache. Put volatile content last.

**Q:** How do you enable caching and what TTLs exist?  
**A:** cache_control { type: "ephemeral" } on the block; 5-minute default TTL with a 1-hour option. Verify with usage.cache_read_input_tokens.

**Q:** Key facts about the Message Batches API?  
**A:** Asynchronous, ~50% cheaper, up to 24h (most finish sooner), correlate results by custom_id (any order), no mid-request tool execution.

**Q:** When should you use streaming?  
**A:** For long inputs/outputs or high max_tokens to avoid HTTP timeouts; get the full result with get_final_message()/finalMessage().

**Q:** How do you constrain output to a JSON schema on current models?  
**A:** Use output_config.format with a JSON schema (and strict: true on a tool for valid tool args). Assistant-message prefills 400 on current models.

**Q:** What are the MCP primitives and transports?  
**A:** Primitives: tools, resources, prompts. Transports: stdio (local) and streamable HTTP/SSE (remote).

**Q:** Claude Agent SDK vs. the raw Messages API?  
**A:** The Agent SDK provides the harness (loop, tool execution, context/permission handling) on top of the API; the raw API gives you the primitives to build that yourself.

**Q:** How should you count tokens accurately?  
**A:** Use the count_tokens endpoint for the actual model and request shape, not a third-party tokenizer like tiktoken.

**Q:** What drives the agentic loop, and on which values?  
**A:** stop_reason: tool_use → run tools and continue; end_turn → stop. Others include max_tokens, stop_sequence, pause_turn, refusal.

**Q:** How do you steer reasoning depth on the newest models?  
**A:** Adaptive thinking (thinking type "adaptive") plus output_config.effort (low/medium/high/xhigh/max); fixed budget_tokens and temperature controls are superseded.
