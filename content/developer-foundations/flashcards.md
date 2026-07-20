# Claude Certified Developer – Foundations — Flashcards

> Unofficial, community-authored study material. Not affiliated with Anthropic.

*Generated from `flashcards.json` by `scripts/build.mjs`. Do not edit by hand.*

## Model & Technical Foundations

**Q:** Default model for the hardest-tier reasoning?  
**A:** Claude Opus 4.8 — highest capability, the right default when accuracy dominates cost and latency.

**Q:** Which model for high-volume, moderate-complexity work?  
**A:** Claude Sonnet 5 — the balanced choice trading quality against speed and cost.

**Q:** Which model for simple, high-volume, latency-sensitive tasks?  
**A:** Claude Haiku 4.5 — fastest and cheapest, ideal for bounded classification and similar work.

**Q:** Current context window sizes?  
**A:** Opus 4.8 and Sonnet 5 support ~1M tokens; Haiku 4.5 tops out near 200K. Input and output share the window.

**Q:** What does max_tokens limit?  
**A:** The maximum number of tokens Claude may GENERATE (output). It does not cap the input or set the context window.

**Q:** Replacement for the old fixed budget_tokens?  
**A:** Adaptive thinking — set thinking to type 'adaptive' so the model allocates reasoning dynamically.

**Q:** How do you dial reasoning spend up or down without switching models?  
**A:** The effort control (output_config.effort: low, medium, high, xhigh, max). Lower it to cut latency and cost on simple tasks.

**Q:** Why stream long outputs, and how do you get the full message?  
**A:** Streaming avoids HTTP timeouts on long or high-max_tokens generations. Assemble the result with get_final_message() / finalMessage().

**Q:** Where does the system prompt go on the Messages API?  
**A:** In the top-level 'system' parameter — not a 'system' role inside the messages array.

**Q:** Is the Messages API stateful across calls?  
**A:** No — it is stateless. Resend the full prior conversation (alternating user/assistant messages) each request.

**Q:** How do you count tokens exactly for Claude?  
**A:** Use the count_tokens endpoint (Claude's own tokenizer), not tiktoken or a chars/4 estimate.

**Q:** List the stop_reason values.  
**A:** end_turn, tool_use, max_tokens, stop_sequence, pause_turn (server-tool paused), refusal (safety stop).

**Q:** Are temperature and top_p available on the newest models?  
**A:** No — sampling params are removed on the newest models. Steer behavior through prompting and effort instead.

## Production Prompting, Agents & Tool Use

**Q:** Primary signal Claude uses to choose a tool?  
**A:** The tool's description. Fix wrong tool selection first by improving descriptions (what it does, when to use it, how it differs).

**Q:** Three parts of a tool definition?  
**A:** name, description, and input_schema (a JSON Schema for the arguments).

**Q:** tool_choice options?  
**A:** auto (default), any (must use some tool), tool (a specific named tool), none (no tools).

**Q:** How do you return results for parallel tool calls?  
**A:** Put ALL tool_result blocks together in ONE user message. Splitting them across messages trains Claude to stop calling in parallel.

**Q:** How do you report a failed tool call?  
**A:** Return a tool_result with is_error: true and a description — never drop it, or the tool_use is left unanswered.

**Q:** What drives the agentic loop?  
**A:** stop_reason: continue (run tools, call again) on 'tool_use'; stop and show the answer on 'end_turn'.

**Q:** How do you force a schema-valid JSON response?  
**A:** Structured outputs — output_config.format with a JSON schema constrains the response.

**Q:** How do you guarantee valid tool arguments?  
**A:** Set strict: true on the tool so generated arguments always match its input_schema.

**Q:** Can you combine structured outputs with citations?  
**A:** No — structured outputs are incompatible with citations in the same request.

**Q:** What links a tool_result to its tool_use?  
**A:** The tool_use_id on the tool_result matches the id of the tool_use block — order is not authoritative.

**Q:** Better than more prose for a stubborn output format?  
**A:** Concrete few-shot input-to-output examples — show, don't tell.

**Q:** Two context-management techniques for long agent runs?  
**A:** Compaction (summarize older history to free space) and context editing (clear stale tool results from context).

## Claude Code, MCP & Integration

**Q:** Where does team-wide Claude Code guidance belong?  
**A:** In the project CLAUDE.md (committed), which loads for everyone every session. ~/.claude/CLAUDE.md is personal.

**Q:** What scopes a convention to file paths like tests/**/*.py?  
**A:** .claude/rules/ markdown with a YAML frontmatter glob — applied automatically based on the file being edited.

**Q:** When do Skills load, and what are they best for?  
**A:** On demand by trigger keywords — best for task/workflow-scoped guidance (deploys, migrations, reviews) that shouldn't load every session.

**Q:** What does 'context: fork' do in a SKILL.md?  
**A:** Runs the skill in an isolated subagent context so its verbose output doesn't pollute the main conversation; only the result returns.

**Q:** What does the allowed-tools frontmatter field do?  
**A:** Restricts a skill to a specific set of tools — a deterministic guardrail, stronger than a prompt instruction.

**Q:** What does argument-hint do?  
**A:** Prompts for and documents the parameters a skill expects.

**Q:** Project vs personal skill with the same name — which wins?  
**A:** Project skills take precedence over same-named personal skills. To personalize, use a DIFFERENT name in ~/.claude/skills/.

**Q:** Where do shared team slash commands live?  
**A:** In .claude/commands/ (or skills in .claude/skills/), committed to the repo. There is no config.json 'commands' array.

**Q:** How do you run Claude Code headless in CI?  
**A:** claude -p / --print runs once, prints to stdout, and exits. Add --output-format json for parseable output.

**Q:** MCP primitives and transports?  
**A:** Primitives: tools, resources, prompts. Transports: stdio (local) and streamable HTTP/SSE (remote).

**Q:** How do you share MCP config without committing secrets?  
**A:** Commit .mcp.json using ${ENV} expansion so each dev supplies their own secret. Scopes: project, user, local.

**Q:** Which hook deterministically normalizes third-party tool output?  
**A:** A PostToolUse hook (runs after the tool). A PreToolUse hook runs before and can block a call.

**Q:** Server vs client in MCP?  
**A:** The server exposes capabilities (tools/resources/prompts); the client (e.g., Claude Code) consumes them.

## Production Engineering, Evals & Security

**Q:** Message Batches API — key properties?  
**A:** ~50% cheaper, asynchronous, completes within up to 24h, correlate by custom_id. No mid-request tool execution.

**Q:** Why can't an interactive tool-calling agent run on the Batches API?  
**A:** Batch is fire-and-forget — you can't execute a tool mid-request and feed results back, so the loop can't run inside a batch.

**Q:** Prompt caching match type and ordering rule?  
**A:** Prefix match — any change invalidates everything after it. Put stable content first, volatile content last.

**Q:** How do you mark cached content and set its TTL?  
**A:** cache_control of type 'ephemeral' at the breakpoint; default TTL 5 minutes, with a 1-hour option.

**Q:** How do you verify a prompt-cache hit?  
**A:** Check usage.cache_read_input_tokens in the response — non-zero means the cache was read.

**Q:** Common silent cache invalidators?  
**A:** datetime.now()/UUIDs in the prefix, unsorted JSON keys, reordered tools, and changing the model, tools, or system prompt.

**Q:** How should a client handle HTTP 429 and 529?  
**A:** Retry with exponential backoff and jitter (respect Retry-After). Don't retry 400s — fix the malformed request.

**Q:** Role of evals when changing a model or prompt?  
**A:** They're the acceptance gate — run them before any swap and refuse changes that regress the eval set.

**Q:** Core prompt-injection principle for tool/retrieved content?  
**A:** Treat it as untrusted DATA, never as instructions. It must not override the system prompt or authorize actions.

**Q:** Three layers of a defense-in-depth safety stack?  
**A:** Input screening, output screening, and tool-call authorization for high-impact actions — and fail closed on uncertainty.

**Q:** Handling secrets and regulated data (PII/PHI) in prompts?  
**A:** Don't send them without authorization; redact or use approved compliant channels. Base64 is not protection.

**Q:** How should the safety layer behave for an uncertain, irreversible tool call?  
**A:** Fail closed — deny on uncertainty. Gate high-impact/irreversible actions behind explicit authorization.

## Accelerators & IP Contribution

**Q:** How do you turn a repeated workflow into reusable team IP?  
**A:** Package it as a version-controlled Skill in .claude/skills/ (or a plugin) committed to the repo.

**Q:** How do you distribute a bundle of skills/commands to teammates?  
**A:** Publish a plugin to a marketplace (catalog via marketplace.json); teammates add the marketplace and install.

**Q:** Best reviewer for Claude's own generated work?  
**A:** A second, independent Claude instance with no access to the generator's reasoning — it avoids confirmation bias better than self-review.

**Q:** What makes a prototype defensible and handoff-ready?  
**A:** Evals as gates, docs/runbooks, and shared version-controlled config (CLAUDE.md, .mcp.json, skills) the team can operate.

**Q:** Why version shared skills and plugins?  
**A:** So consumers can pin a known-good version and adopt updates deliberately, avoiding surprise breaking changes.

**Q:** How do you prevent drift in a generated content pipeline?  
**A:** Keep one canonical source, generate the rest via a build step, and never hand-edit generated files.

**Q:** Leading cause of shared-config failure over time?  
**A:** Stale config — keep CLAUDE.md, skills, and .mcp.json current as the system evolves; treat it as living documentation.

**Q:** How do you right-size an accelerator's packaging?  
**A:** Prefer the simplest packaging that meets the need (a single skill first); add plugin/marketplace machinery only when scope justifies it.
