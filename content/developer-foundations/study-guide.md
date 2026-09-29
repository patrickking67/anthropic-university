# Claude Certified Developer – Foundations — Study Guide

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. This guide teaches publicly documented concepts the certification covers. It does not reproduce real exam content. Facts were checked against the live docs on 2026-09-28; re-check anything load-bearing before you rely on it.

This guide follows the eight official domains of the CCDV-F v1.0 exam guide, in guide order, with each domain's weight shown. Most items are scenarios: you are asked for the *root cause* or the *most effective* change, not a definition. Current models in every example: **Claude Opus 5.5** (`claude-opus-5-5`, the default recommendation), **Fable 5.1**, **Sonnet 5.5**, and **Haiku 4.5**.

## Exam format

| | |
| --- | --- |
| Exam code | CCDV-F (guide v1.0, effective July 2026) |
| Items | 53, multiple-choice and multiple-response |
| Time | 120 minutes |
| Scoring | Scaled 100–1,000; 720 to pass |
| Delivery | Pearson VUE, online proctored or test center |
| Fee / validity | $125 USD; 12 months |

Multiple-response items tell you how many to select, and scoring is all-or-nothing. Each correct option must be true on its own, so check them one at a time.

## 1. Agents and Workflows (14.7%)

**Pick the least autonomy that works.** A *workflow* orchestrates LLM calls along code paths you define. An *agent* lets the model decide its next step and tool. When the steps are known and fixed, a workflow is cheaper, faster, and easier to test. Save agents for open-ended problems where the path depends on what the model finds, such as fixing failures in an unfamiliar repo or iterative research.

Know the common patterns and what each is for:

| Pattern | Use it when |
| --- | --- |
| Prompt chaining | Fixed sequential steps, with code checks between them |
| Routing | Inputs fall into types that each need their own prompt or tools |
| Parallelization | Independent subtasks (sectioning) or several attempts compared (voting) |
| Orchestrator-workers | A lead decides at runtime which subtasks to delegate |
| Evaluator-optimizer | Clear criteria exist, and feedback measurably improves drafts |

**Constructing agents with Claude.** A hand-rolled loop keys off `stop_reason`: on `tool_use`, run the tools and call again; on `end_turn`, stop. Always bound the loop with a maximum iteration count or budget; the SDK tool runner exposes `max_iterations`. The **Claude Agent SDK** embeds Claude Code's loop (built-in tools, hooks, subagents, MCP, permissions, sessions) in a process you run. **Claude Managed Agents** (beta) hosts the harness and sandbox for you. Its sessions are stored server-side, so it is not currently eligible for ZDR or a HIPAA BAA.

**Subagents** buy *context isolation*. Their tool calls and raw results stay in their own context, and only the final message returns to the parent. They start fresh unless explicitly forked, can be limited to specific tools, and can run in parallel.

**Guarantees live in code, not prompts.** Claude only *requests* client tool calls, and your harness decides whether to execute them. That is where an unskippable human approval goes. Audit logging belongs in a hook such as PostToolUse, not in an instruction the model might skip. The **memory tool** (`memory_20250818`) is client-side: your code performs the file operations, so it must confine paths to `/memories` and reject traversal.

Frameworks can speed up common patterns, but learn the prompts and calls they make underneath before you trust them.

**Traps:** building an agent for a fixed pipeline; an unbounded loop; relying on a system-prompt instruction for a safety-critical approval; assuming Anthropic stores memory-tool files.

## 2. Applications and Integration (33.1%)

This is the largest domain. It covers requirements, API mechanics, engineering practice, application design, and configuration.

**Requirements first.** Before choosing a model or writing prompts, pin down the tasks, data sources, volume and latency targets, security constraints, and success measures. Model choice and architecture follow from those.

**Messages API mechanics.**

- The API is **stateless**: resend the full history every turn. The system prompt goes in the top-level `system` parameter.
- Raw HTTP needs `x-api-key`, `anthropic-version` (for example `2023-06-01`), and `content-type: application/json`.
- **Stream** long generations to avoid idle timeouts. The docs point to streaming or batches for anything expected to run long.
- **Parallel tool calls** are on by default. Return every `tool_result` in one user message, matched by `tool_use_id`.
- **Images** can come from base64, URL, or a Files API `file_id`. Upload once and reference the `file_id` rather than resending bytes each turn. JPEG, PNG, GIF, and WebP are supported; put images before the text that refers to them.
- In Python services, use the async client (`AsyncAnthropic`) inside async handlers rather than blocking a thread per call.
- On **Amazon Bedrock**, you authenticate with AWS credentials and use Bedrock model IDs such as `anthropic.claude-opus-5-5`.

**Message Batches API.** 50% of standard prices, asynchronous, up to 100,000 requests or 256 MB per batch. Most batches finish within an hour. A batch that isn't done after 24 hours expires, and unprocessed requests are not billed. Results can return in any order, so match them by `custom_id`, and results stay available for 29 days. Batches suit latency-tolerant bulk work. Live chat and interactive tool loops stay synchronous, because you can't feed a tool result back into a batched request.

**Application design across surfaces.** The same model behaves differently in claude.ai, Claude Code, and your own app because each surface wraps it with its own system prompt, tools, and context. On the API, your code owns all three. In long Claude Code sessions, `/clear` between unrelated tasks (project memory still loads), and `/compact` to keep going on the same task.

**Configuration management.**

- Every current model ID is a pinned snapshot. Keep one exact ID in versioned config and change it only through an eval-gated review.
- Treat prompts as versioned, reviewed artifacts, separate from application logic.
- Commit `.claude/settings.json` and `.mcp.json` (with `${VAR}` expansion for secrets). Personal overrides go in `.claude/settings.local.json` and `CLAUDE.local.md`, which stay out of git.
- Settings precedence: managed, then command line, then project local, then shared project, then user.
- Skill precedence for the same name: enterprise, then personal, then **project last**. A personal skill shadows the team's, so give personal variants a distinct name.
- Plugin dependencies can declare semver version constraints. Tag releases so dependents pin a range and adopt breaking changes deliberately.

**Traps:** batching an interactive workload; hard-coding model names at every call site; committing personal settings; expecting a project skill to beat a same-named personal skill.

## 3. Claude Code (3.1%)

Small by weight, but its concepts recur in domains 2, 7, and 8.

- **CLAUDE.md** loads every session. The committed project file is for the team, and `~/.claude/CLAUDE.md` is personal. The files are combined, not overridden. `/init` creates a starter file.
- **`.claude/rules/*.md`** with a `paths:` frontmatter glob load only when Claude works with matching files, which suits path-scoped conventions.
- **Skills** (`.claude/skills/<name>/SKILL.md`) load their body only when used: when you type `/name`, or when Claude decides the `description` matches the task. Put the key use case first in the description. Custom commands have been merged into skills, and `.claude/commands/` still works.
- Frontmatter to know: `description`, `argument-hint` (shown in autocomplete), `context: fork` (runs in a subagent without your conversation history), `disable-model-invocation: true` (user-only, for deploys and other side effects), `allowed-tools`, `disallowed-tools`, and `model`.
- **Headless:** `claude -p` runs once and exits. Add `--output-format json` (or `--json-schema` for a `structured_output` field) for automation, and `--bare` for scripted calls.

**Traps:** a trigger-keyword field that doesn't exist; a `commands` array in some config file; assuming a skill loads automatically in every session.

## 4. Eval, Testing, and Debugging (2.6%)

**Evals are the acceptance gate.** Run a representative, labeled set with automatable pass/fail criteria before any model or prompt change, and reject regressions.

**Debug by layer.** Decide first whether the fault is in the model, the prompt, the integration, or the transport.

- An HTTP 200 with an empty display usually means the code reads `content[0].text` while the first block is a thinking block. Select blocks by type.
- **Fix, don't retry:** 400 `invalid_request_error` (an unsupported parameter, such as forced `tool_choice` on current models) and 413 `request_too_large`.
- **Retry with backoff:** 429 (honor `retry-after`), 529 overloaded, and a one-off 500. The SDKs retry twice by default.
- `stop_reason: "refusal"` is a refusal path, not a transport error. Handle it explicitly, for example by routing to a fallback per your policy.
- Log the `request-id` response header with every error.

## 5. Model Selection and Optimization (16.8%)

| Model | ID | Context / max output | Price in / out per MTok | Best for |
| --- | --- | --- | --- | --- |
| Fable 5.1 | `claude-fable-5-1` | 1M / 128K | $10 / $50 | Hardest reasoning, long-horizon agents |
| Opus 5.5 | `claude-opus-5-5` | 1M / 128K | $4 / $20 | Default starting point |
| Sonnet 5.5 | `claude-sonnet-5-5` | 1M / 128K | $2 / $10 | Best speed and intelligence balance |
| Haiku 4.5 | `claude-haiku-4-5` | 200K / 64K | $1 / $5 | Fastest, bounded high-volume work |

**Route by step, not by app.** Send trivial, high-frequency steps (classification, language detection) to Haiku 4.5, and keep the big model for the hard parts.

**LLM fundamentals.**

- The context window holds input *and* output. The 1M window is the default on the three 1M models, with no beta header.
- `max_tokens` caps generated tokens, including thinking. When input plus `max_tokens` exceeds the window, current models accept the request and may stop with `model_context_window_exceeded`. Input alone over the window returns a 400.
- Tokens are sub-word units. The tokenizer introduced with Opus 4.7 counts differently from older models, so measure with `POST /v1/messages/count_tokens`.
- More context isn't automatically better: recall degrades as token count grows (context rot).

**Thinking and effort.** Current models use **adaptive thinking**. Manual `budget_tokens` is rejected on Opus 4.7 and later (Haiku 4.5 still uses it), and thinking can't be disabled on Opus 5.5 or Fable 5.1. Tune spend with `output_config.effort` (`low` to `max`). Opus 5.5 defaults to `medium`, and most others default to `high`. Non-default `temperature`, `top_p`, or `top_k` returns a 400 on Opus 4.7 and later, so steer with prompting and effort.

**Cost and token management.**

- **Prompt caching** matches prefixes in the order tools, then system, then messages. Mark breakpoints with `cache_control: {type: "ephemeral"}` on up to 4 blocks, or once at the top level for automatic caching.
- The cache TTL is 5 minutes by default (1 hour optional). Writes cost 1.25x (5m) or 2x (1h); reads cost 0.1x base (less on Fable 5.1 and Opus 5.5).
- Confirm cache hits with `usage.cache_read_input_tokens`.
- Silent invalidators: timestamps or UUIDs in the prefix, reordered tools, and changes to tools, `tool_choice`, thinking, or effort.
- **Batches** take 50% off bulk work.
- **Fast mode** (research preview, `speed: "fast"` plus a beta header, Claude API only) trades a higher price for faster output on select Opus models. It doesn't share the cache with standard speed and isn't available with batches.

## 6. Prompt and Context Engineering (11.0%)

**Prompt engineering.** Be specific about length, audience, and structure. When a format keeps drifting, add several concrete input-to-output examples; that works better than louder instructions. Use XML tags to separate instructions from inputs, place long documents above the instructions, and state that tagged content is data to analyze. Assistant prefill returns a 400 on the 4.6+ family. Raising effort changes how hard the model thinks, not what format it produces.

**Output handling.** Structured outputs (`output_config.format` with type `json_schema`) guarantee valid JSON with the right fields and types. They don't support numeric bounds, string length limits, `pattern`, or recursive schemas, and a valid shape is not a true answer. Validate business rules in code, and check key claims before acting on them. Changing the output format invalidates the prompt cache.

**Context engineering.** For long conversations and agent runs, use **compaction** (older turns replaced by a server-written summary; beta) and **context editing** (`clear_tool_uses` removes old tool results once input passes a trigger). Retrieve and include only what each request needs.

## 7. Security and Safety (8.1%)

**Everything the model reads is data.** Emails, web pages, tool results, and retrieved documents can contain injected instructions. Prompting alone can't guarantee they are ignored. Privileged actions (refunds, deletions, deploys) need authorization that doesn't depend on model output: policy code, a hook, or human approval.

**Guardrails and safe deployment.**

- Layer the defenses: input screening, output screening, and tool-call authorization, failing closed on uncertainty for irreversible actions.
- `allowed-tools` in a skill **pre-approves** the listed tools for that turn; it does not restrict anything. To block tools, use `disallowed-tools` or permission deny rules.
- Permission rules are evaluated deny, then ask, then allow.
- `disable-model-invocation: true` keeps Claude from triggering a side-effecting skill on its own.

**Claude hooks.** PreToolUse runs before a tool and can block it, by returning `permissionDecision: "deny"` or exiting with code 2, whatever the model decided. PostToolUse runs after, and can replace what Claude sees via `updatedToolOutput`, which is useful for normalizing output from third-party MCP servers.

**Identity, secrets, and keys.** Keep API keys in environment variables or a secret manager, and share MCP config with `${VAR}` expansion rather than committed tokens. Don't send regulated data (PII, PHI) into prompts without authorization. Base64 encoding hides nothing.

## 8. Tools and MCPs (10.6%)

**Tool implementation.** A tool has a `name`, a `description`, and an `input_schema`. The description matters most: say what the tool does, when to use it (and when not to), and how it differs from similar tools. `input_examples` show valid calls, and `strict: true` guarantees generated inputs match the schema.

**`tool_choice` on current models.** `auto` (the default) and `none` work. Forced `any` or `tool` returns a 400 on Opus 5.5, Sonnet 5.5, and Fable 5.1, so use `auto` with `strict: true` and prompt guidance, or structured outputs when the reply itself must be fixed JSON. Report a failed call with a `tool_result` that sets `is_error: true`; never leave a `tool_use` unanswered.

**MCP server development.** MCP has three primitives: tools, resources, and prompts. A server exposes them and a client (such as Claude Code) consumes them. Use stdio for local subprocess servers and Streamable HTTP for remote ones; the older SSE transport is deprecated. Wrapping an internal API as an MCP server lets every MCP-capable app reuse it. Claude Code scopes are local (default), project (`.mcp.json`), and user.

**Agentic customization.** Package a repeated workflow as a version-controlled skill before reaching for anything heavier. When a bundle of skills, hooks, and MCP config needs to reach many teams, ship it as a plugin through a marketplace, versioned so consumers can pin a release.

## How to study with this bank

1. Start with domain 2. At a third of the weight, it decides most results.
2. Memorize the model table, the stop reasons, and the "fix vs retry" error list.
3. Drill the current-model rejections: `budget_tokens`, sampling parameters, prefill, and forced `tool_choice` all return a 400.
4. Practice multiple-response items until you can defend each selected option on its own.
5. Take a Quick mock, review misses by domain, then a Full mock aiming well above the 720 mark.

Docs: [platform.claude.com/docs](https://platform.claude.com/docs) · [code.claude.com/docs](https://code.claude.com/docs).
