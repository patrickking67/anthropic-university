# Claude Certified Developer – Foundations — Flashcards

> Unofficial, community-authored study material. Not affiliated with Anthropic.

*Generated from `flashcards.json` by `scripts/build.mjs`. Do not edit by hand.*

## Agents and Workflows

**Q:** Workflow vs agent?  
**A:** A workflow runs LLM calls along code paths you define. An agent lets the model choose its own steps and tools. Use a workflow when the steps are known; use an agent for open-ended problems.

**Q:** Five common workflow patterns?  
**A:** Prompt chaining, routing, parallelization (sectioning or voting), orchestrator-workers, and evaluator-optimizer.

**Q:** What drives the agentic loop?  
**A:** stop_reason: on 'tool_use', run the tools and call again; on 'end_turn', stop and return the answer. Bound the loop with an iteration or budget cap.

**Q:** Why delegate to a subagent?  
**A:** Context isolation: its tool calls and raw results stay in its own context, and only its final message returns. Independent subagents can also run in parallel.

**Q:** Agent SDK in one line?  
**A:** Claude Code's agent loop as a Python/TypeScript library: built-in tools, hooks, subagents, MCP, permissions, and sessions in a process you run.

**Q:** Claude Managed Agents in one line?  
**A:** A hosted agent harness (agent, environment, session, events) in beta. Sessions are stored server-side, so it is not currently ZDR or HIPAA BAA eligible.

**Q:** Memory tool: who stores the files?  
**A:** Your application. The memory tool is client-side: Claude requests file operations and your code runs them under /memories, and it must block path traversal.

**Q:** How do you make a human approval step unskippable?  
**A:** Hold the tool_use in your harness and execute it only after out-of-band approval. The model requests calls; your code decides whether they run.

**Q:** Best reviewer for Claude's own generated work?  
**A:** A second, independent Claude instance without the generator's reasoning. It avoids confirmation bias better than self-review.

## Applications and Integration

**Q:** Where does the system prompt go on the Messages API?  
**A:** In the top-level 'system' parameter, not as a message with role 'system' in the messages array.

**Q:** Is the Messages API stateful across calls?  
**A:** No. It is stateless, so resend the full prior conversation (alternating user and assistant turns) on each request.

**Q:** Headers for a raw HTTP call to the Messages API?  
**A:** x-api-key, anthropic-version (for example 2023-06-01), and content-type: application/json.

**Q:** Why stream long outputs?  
**A:** Streaming avoids idle-connection drops and timeouts on long generations. The SDKs assemble the full message for you (get_final_message() / finalMessage()).

**Q:** How do you return results for parallel tool calls?  
**A:** Put ALL tool_result blocks together in ONE user message. Splitting them across messages discourages parallel calls.

**Q:** Message Batches API: key properties?  
**A:** 50% cheaper and asynchronous. Most batches finish within an hour; a batch expires after 24h and unprocessed requests are not billed. Up to 100,000 requests or 256 MB. Match results by custom_id.

**Q:** Why can't an interactive tool-calling loop run inside a batch?  
**A:** Each batch request is a single call. You can't execute a tool mid-request and feed the result back, so the loop has to run synchronously.

**Q:** Resending the same images every turn?  
**A:** Upload once with the Files API and reference the file_id in image blocks, rather than resending base64 on every request.

**Q:** What changes on Amazon Bedrock?  
**A:** AWS credentials and Bedrock model IDs (for example anthropic.claude-opus-5-5). Some features, such as fast mode, are Claude API only.

**Q:** Project vs personal skill with the same name: which wins?  
**A:** Personal. The precedence is enterprise, then personal, then project. Give a personal variant a different name if you still want the team's version.

**Q:** Personal Claude Code setting in one repo without affecting teammates?  
**A:** .claude/settings.local.json. It overrides the shared .claude/settings.json and stays out of git.

**Q:** How do you share MCP config without committing secrets?  
**A:** Commit .mcp.json with ${VAR} expansion so each developer supplies their own secret. MCP scopes: local (default), project, and user.

**Q:** Why version shared skills and plugins?  
**A:** Consumers can pin a known-good version (plugin dependencies accept semver constraints) and adopt breaking changes deliberately.

**Q:** How should production code name the model?  
**A:** With one exact model ID in versioned config, changed only through an eval-gated review. Every current model ID is a pinned snapshot.

**Q:** How do you prevent drift in a generated content pipeline?  
**A:** Keep one canonical source, generate everything else with a build step, and never hand-edit generated files.

**Q:** What makes a prototype handoff-ready?  
**A:** Evals as gates, docs and runbooks, and shared version-controlled config (CLAUDE.md, .mcp.json, skills) the team can operate.

## Claude Code

**Q:** Where does team-wide Claude Code guidance belong?  
**A:** In the committed project CLAUDE.md, which loads for everyone every session. ~/.claude/CLAUDE.md is personal, and CLAUDE.md files are combined, not overridden.

**Q:** What scopes a rule to files like tests/**/*.py?  
**A:** A markdown file in .claude/rules/ with a paths: frontmatter glob. It loads only when Claude works with matching files.

**Q:** When does a skill's body load?  
**A:** Only when it's used: when you invoke it with /name, or when Claude decides its description matches the task. Long reference material costs little until then.

**Q:** What does 'context: fork' do in a SKILL.md?  
**A:** It runs the skill in a separate subagent that can't see your conversation history, so verbose work stays isolated and only the result returns.

**Q:** What does disable-model-invocation: true do?  
**A:** Only a user can invoke the skill, and Claude can't trigger it itself. Use it for side-effecting workflows such as deploys.

**Q:** How do you run Claude Code headless in CI?  
**A:** claude -p runs once, prints, and exits. Add --output-format json (or --json-schema for a structured_output field), and --bare for scripts.

**Q:** /clear vs /compact?  
**A:** /clear starts fresh for a new task, while project memory such as CLAUDE.md still loads. /compact summarizes the history so you can continue the same task.

**Q:** Where do shared custom commands live?  
**A:** As files in .claude/commands/ or .claude/skills/<name>/SKILL.md, committed to the repo. Commands have been merged into skills.

## Eval, Testing, and Debugging

**Q:** How should a client handle HTTP 429 and 529?  
**A:** Retry with exponential backoff and jitter, honoring retry-after. The SDKs retry twice by default. Don't retry a 400; fix the request.

**Q:** Errors to fix rather than retry?  
**A:** 400 invalid_request_error (for example an unsupported parameter) and 413 request_too_large. They fail the same way on every retry.

**Q:** Empty reply, but the API returned 200?  
**A:** Check whether the code reads content[0].text. Current models can start with a thinking block, so select blocks by type.

**Q:** Role of evals when changing a model or prompt?  
**A:** They are the acceptance gate: run them before any swap and reject changes that regress the eval set.

**Q:** What identifies a request when you contact support?  
**A:** The request-id response header (also exposed by the SDKs). Log it with every error.

## Model Selection and Optimization

**Q:** Default starting model on the Claude API?  
**A:** Claude Opus 5.5 ($4/$20 per MTok, 1M context). Most workloads should start here.

**Q:** Model for the hardest reasoning and long-horizon agentic work?  
**A:** Claude Fable 5.1: the most capable model ($10/$50 per MTok, 1M context, always-on adaptive thinking).

**Q:** Best balance of speed and intelligence?  
**A:** Claude Sonnet 5.5 ($2/$10 per MTok, 1M context).

**Q:** Model for simple, high-volume, latency-sensitive tasks?  
**A:** Claude Haiku 4.5 ($1/$5 per MTok, 200K context, 64K max output). It is the fastest and cheapest.

**Q:** Current context window sizes?  
**A:** 1M tokens on Fable 5.1, Opus 5.5, and Sonnet 5.5 by default (no beta header); 200K on Haiku 4.5. Input and output share the window.

**Q:** What does max_tokens limit?  
**A:** The tokens Claude may generate, including thinking. It doesn't cap input or set the context window. Current models allow up to 128K on the synchronous API.

**Q:** What replaced fixed budget_tokens thinking?  
**A:** Adaptive thinking plus effort. Manual budget_tokens is rejected on Opus 4.7 and later; Haiku 4.5 still uses it.

**Q:** How do you adjust reasoning spend without switching models?  
**A:** output_config.effort: low, medium, high, xhigh, max. Opus 5.5 defaults to medium; most other models default to high.

**Q:** Are temperature and top_p available on the newest models?  
**A:** No. Non-default temperature, top_p, or top_k returns a 400 on Opus 4.7 and later. Steer with prompting and effort.

**Q:** How do you count tokens exactly for Claude?  
**A:** POST /v1/messages/count_tokens. The tokenizer introduced with Opus 4.7 counts differently from older models, so rules of thumb drift.

**Q:** stop_reason values?  
**A:** end_turn, tool_use, max_tokens, stop_sequence, pause_turn (a server-tool loop hit its iteration limit), refusal, and model_context_window_exceeded.

**Q:** Prompt caching: match type and ordering rule?  
**A:** Prefix match in the order tools, then system, then messages. Any change invalidates everything after it, so put stable content first.

**Q:** How do you mark cached content, and what does it cost?  
**A:** cache_control {type: 'ephemeral'} on a block (up to 4 breakpoints) or once at the top level. 5-minute TTL by default, 1 hour optional. Writes cost 1.25x (5m) or 2x (1h); reads cost 0.1x base.

**Q:** How do you verify a prompt-cache hit?  
**A:** usage.cache_read_input_tokens. A non-zero value means the cache was read; cache_creation_input_tokens shows writes.

**Q:** Common silent cache invalidators?  
**A:** Timestamps or UUIDs in the prefix, unsorted JSON keys, reordered tools, and changes to tools, tool_choice, thinking, or effort.

**Q:** Fast mode in one line?  
**A:** speed: 'fast' with a beta header, a research preview on Opus 5.5 and select Opus models, on the Claude API only. Higher output speed at a premium price, and not available with batches.

## Prompt and Context Engineering

**Q:** Better than more prose for a stubborn output format?  
**A:** Concrete few-shot input-to-output examples: show, don't tell.

**Q:** How do you keep a document from being read as instructions?  
**A:** Wrap it in named XML tags, put long inputs above your instructions, and state that the tagged content is data to analyze.

**Q:** Can you prefill the assistant turn on current models?  
**A:** No. Assistant prefill returns a 400 on the 4.6+ family. Use structured outputs or instructions instead.

**Q:** How do you force a schema-valid JSON response?  
**A:** Structured outputs: output_config.format with type json_schema. Unsupported: min/max, string length limits, pattern, and recursive schemas.

**Q:** What do structured outputs NOT guarantee?  
**A:** Correctness. Validate ranges and cross-field rules in code, and check claims against a trusted source before acting on them.

**Q:** Two server-side context-management tools for long runs?  
**A:** Compaction (older turns replaced by a summary) and context editing (clear_tool_uses removes stale tool results past a trigger).

**Q:** Why not fill the 1M window 'just to be safe'?  
**A:** Context rot: accuracy and recall degrade as token count grows. Retrieve only what each request needs.

## Security and Safety

**Q:** Core prompt-injection principle for tool and retrieved content?  
**A:** Treat it as untrusted DATA, never as instructions. It must not override the system prompt or authorize actions.

**Q:** Three layers of a defense-in-depth safety stack?  
**A:** Input screening, output screening, and tool-call authorization for high-impact actions, failing closed on uncertainty.

**Q:** What does allowed-tools in a skill actually do?  
**A:** It pre-approves the listed tools for the invoking turn; it does NOT restrict. To block tools, use disallowed-tools or permission deny rules.

**Q:** Which hook blocks a tool call, and how?  
**A:** PreToolUse: return permissionDecision 'deny' or exit with code 2. Permission rules are evaluated deny, then ask, then allow.

**Q:** Which hook normalizes third-party tool output?  
**A:** PostToolUse. It runs after the tool and can replace what Claude sees with updatedToolOutput.

**Q:** Handling secrets and regulated data (PII/PHI) in prompts?  
**A:** Don't send them without authorization; redact them or use approved compliant channels. Base64 is not protection. Keep API keys in env vars or a secret manager, never in the repo.

## Tools and MCPs

**Q:** Primary signal Claude uses to choose a tool?  
**A:** The tool's description. Fix wrong tool selection first by stating what the tool does, when to use it, and how it differs from other tools.

**Q:** Three parts of a tool definition?  
**A:** name, description, and input_schema (a JSON Schema for the arguments). Optional: input_examples and strict.

**Q:** tool_choice on current models?  
**A:** auto (default) and none work. Forced 'any' or 'tool' returns a 400 on Opus 5.5, Sonnet 5.5, and Fable 5.1. Use auto with strict: true, or structured outputs.

**Q:** How do you guarantee valid tool arguments?  
**A:** Set strict: true on the tool so generated inputs always match its input_schema.

**Q:** How do you report a failed tool call?  
**A:** Return a tool_result with is_error: true and a clear message. Never drop it, or the tool_use is left unanswered.

**Q:** What links a tool_result to its tool_use?  
**A:** The tool_result's tool_use_id matches the tool_use block's id. Order is not authoritative.

**Q:** MCP primitives and transports?  
**A:** Primitives: tools, resources, and prompts. Transports: stdio (local) and Streamable HTTP (remote); the older SSE transport is deprecated.

**Q:** Server vs client in MCP?  
**A:** The server exposes capabilities (tools, resources, prompts); the client, such as Claude Code, consumes them.

**Q:** How do you distribute a bundle of skills and commands to teammates?  
**A:** Package them as a plugin and publish it to a marketplace (catalog in marketplace.json). Teammates add the marketplace and install.
