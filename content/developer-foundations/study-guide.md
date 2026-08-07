# Claude Certified Developer – Foundations — Study Guide

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. This guide teaches the publicly documented concepts the certification covers; it does not reproduce real exam content.

This guide walks the five domains of the Developer – Foundations track. Each section explains the key concepts, the decision rules the exam rewards, and the traps it uses to separate a candidate who has *read* the docs from one who has *built* with them. Prefer the latest models in examples: **Claude Opus 4.8** (`claude-opus-4-8`) is the default, with **Sonnet 5** and **Haiku 4.5** also current. The exam is scenario-heavy — most questions ask you to find the *root cause* and pick the *most effective* fix, not to recite a definition.

## Model & Technical Foundations

Start every design by choosing a model. **Opus 4.8** is the default for the hardest reasoning where accuracy dominates cost and latency. **Sonnet 5** is the balanced choice for high-volume, moderate-complexity work. **Haiku 4.5** is for simple, latency-sensitive, high-volume tasks. A common production win is **model routing**: send a cheap, frequent step (language detection, classification) to Haiku and reserve Opus for the genuinely hard steps, rather than paying Opus latency on everything.

Know the **context window**. Opus 4.8 and Sonnet 5 offer roughly a **1M-token** window; Haiku 4.5 is smaller (~200K). Crucially, **input and output share the same window** — a prompt that nearly fills the context leaves no room for a large `max_tokens`, and the request fails.

`max_tokens` is the single most-confused parameter. It caps the **tokens Claude may generate** — the *output* — not the input and not the context window. If responses cut off mid-sentence and `stop_reason` is `max_tokens`, raise `max_tokens` (within the model's limit); do not shorten the prompt.

Reasoning controls have modernized:

- **Adaptive thinking** (`thinking` with type `adaptive`) replaces the old fixed `budget_tokens`; the model allocates reasoning dynamically. Enable it for multi-step math/logic/planning; skip it for trivial single-step tasks.
- **Effort** (`output_config.effort`: `low`, `medium`, `high`, `xhigh`, `max`) tunes how much reasoning to spend. Lower it to cut latency and cost on simple, well-specified tasks.
- **Sampling parameters** (`temperature`, `top_p`) are **removed on the newest models** — steer through prompting and effort instead.

**Streaming** matters for long or high-`max_tokens` outputs: tokens arrive incrementally so you avoid single-response HTTP timeouts. Reassemble the complete result with `get_final_message()` / `finalMessage()`.

Message structure: the **system prompt is a top-level `system` parameter**, not a `system` role in the messages array. The Messages API is **stateless** — resend the full alternating user/assistant history each turn. Count tokens with the **`count_tokens` endpoint** (Claude's tokenizer), not tiktoken. Remember tokens are **sub-word units**, so the same meaning costs different token counts across languages.

Memorize the **`stop_reason`** values, the backbone of loop control:

| stop_reason | Meaning |
| --- | --- |
| `end_turn` | Finished normally |
| `tool_use` | Wants tool results — run them and continue |
| `max_tokens` | Hit the output cap (truncated) |
| `stop_sequence` | Hit a configured stop sequence |
| `pause_turn` | A server-tool turn paused — resend to resume |
| `refusal` | Declined for safety |

**Traps:** confusing `max_tokens` with input/context size; thinking the API remembers conversations; treating `pause_turn` as a refusal; reaching for `temperature` on models that dropped it.

## Production Prompting, Agents & Tool Use

Reliability comes from **specificity, structure, and examples**. When output format keeps drifting, **concrete few-shot input-to-output examples** beat more prose ("show, don't tell"). When a single prompt juggles four jobs and results are erratic, **decompose** it into focused steps. Iterate **diagnostically** — change one variable at a time so you can attribute the improvement.

**Tool definitions** have three parts: `name`, `description`, and `input_schema` (a JSON Schema for the arguments). The **description is the primary signal** Claude uses to choose a tool, so the first fix for misrouting is to sharpen each description — what it does, when to use it, how it differs from similar tools. `tool_choice` controls selection: `auto` (default), `any` (must use some tool), a specific `tool` (must use that one), or `none`.

**Parallel tool use** is on by default and is a frequent exam target. The rule: execute all requested tools and **return every `tool_result` block in a single user message**. Splitting them across messages trains Claude to stop calling in parallel. Each `tool_result` is matched to its request by **`tool_use_id`**, not by order. A failed tool must still return a `tool_result` with **`is_error: true`** — never drop it, or the `tool_use` is left dangling.

The **agentic loop** is driven off `stop_reason`: on `tool_use`, run the tools and call the API again; on `end_turn`, stop and present the answer. Do not parse the assistant's natural-language text to decide — that is brittle by design.

**Structured outputs** replace old prompt hacks:

- `output_config.format` with a JSON schema constrains the whole response to valid, parseable JSON.
- `strict: true` on a tool guarantees generated arguments match its `input_schema`.
- Structured outputs are **incompatible with citations** in the same request.
- The legacy assistant-message **prefill trick 400s** on current models.

**Context management** for long agent runs: **compaction** summarizes older history to reclaim window space; **context editing** clears stale tool results that are no longer needed. Both keep later requests lean without losing the thread.

**Traps:** returning parallel `tool_result`s in separate messages; dropping failed tools instead of marking `is_error`; forcing `tool_choice: any` to fix *which* tool is chosen (it only forces *some* tool); trying to combine structured outputs with citations.

## Claude Code, MCP & Integration

Configuration lives in a hierarchy, and the exam tests which mechanism fits which need.

- **CLAUDE.md** is loaded every session. Team-wide guidance goes in the **project** `CLAUDE.md` (committed) so everyone gets it; `~/.claude/CLAUDE.md` is **personal**. Project and user memory are **combined**, not mutually exclusive.
- **`.claude/rules/`** files carry YAML frontmatter **glob patterns** and apply automatically based on the **file path** being edited — ideal for cross-cutting, path-scoped conventions (e.g., a `tests/**` rule).
- **Skills** (`.claude/skills/<name>/SKILL.md`) load **on demand by trigger keywords** — ideal for **task/workflow** guidance (deploys, migrations, reviews) that shouldn't burden every session. Frontmatter you must know: `description` (its trigger keywords are what surface the skill), `argument-hint` (prompts for parameters), `allowed-tools` (a deterministic guardrail restricting tools), `context: fork` (runs in an isolated subagent context so verbose output stays out of the main conversation), and `model`.

A precedence rule appears often: **project skills beat same-named personal skills**. To keep a personal variant, give it a **different name** in `~/.claude/skills/`.

Shared **slash commands and skills** live in the project (`.claude/commands/`, `.claude/skills/`), version-controlled — there is **no `config.json` "commands" array**. Run Claude Code **headless** with `claude -p` / `--print` (runs once, prints, exits — for CI), and add **`--output-format json`** for parseable output you can post as inline PR comments.

**MCP (Model Context Protocol)** standardizes three primitives — **tools, resources, prompts** — over two transports: **stdio** (local subprocess) and **streamable HTTP/SSE** (remote). A **server exposes** capabilities; a **client** (Claude Code, the API MCP connector) consumes them. Configure servers in **`.mcp.json`** with **`${ENV}` expansion** so each developer supplies their own secret — never commit tokens. Scopes are **project** (`.mcp.json`, shared), **user**, and **local**.

**Hooks** run deterministic logic around tool calls. A **PostToolUse** hook is the maintainable place to **normalize or transform tool output** (e.g., Unix timestamps → readable dates), even for third-party MCP servers you can't modify. A **PreToolUse** hook runs **before** execution and can **block** a call (e.g., a write to a protected path).

**Traps:** putting team guidance in personal `~/.claude`; believing a same-named personal skill overrides the project one; inventing a `config.json` commands array; using PreToolUse to reformat output the tool hasn't produced yet.

## Production Engineering, Evals & Security

**Evals are the acceptance gate.** Before any model or prompt change, run a representative, labeled eval set with clear, automatable pass/fail criteria and **refuse changes that regress it**. A single always-passing example is not an eval.

The **Message Batches API** is a core lever: **~50% cheaper**, **asynchronous**, completes within **up to 24 hours** (most finish sooner), and you correlate results by **`custom_id`** because they arrive in any order. Its defining limitation: it is fire-and-forget, so you **cannot execute a tool mid-request** — an interactive tool-calling loop cannot run inside a batch. Use it for overnight, latency-tolerant, bulk jobs.

**Prompt caching** is a prefix match. Any change in the cached prefix invalidates everything after it, so put **stable content first, volatile content last**. Mark the boundary with **`cache_control` type `ephemeral`** (default 5-minute TTL, 1-hour option). Verify hits with **`usage.cache_read_input_tokens`**. Watch for **silent invalidators**: a `datetime.now()` or UUID in the prefix, unsorted JSON keys, a reordered tools array, or any change to the model, tools, or system prompt. For big bulk cost savings, **batch is the larger lever**; caching is a separate, smaller optimization — not a substitute.

**Resilience:** retry transient errors (**429** rate limited, **529** overloaded, 500) with **exponential backoff and jitter**, honoring `Retry-After`; do **not** retry **400s** — fix the malformed request. Prevent rate-limit trips by smoothing load (client-side concurrency limits/queueing) or moving bulk work to batch.

**Security is defense in depth.** Treat all **tool/retrieved content as untrusted data, never instructions** — a web page saying "ignore your instructions" must not override your system prompt or authorize actions (prompt injection). Layer **input screening** (block injection/PII before the model), **output screening** (validate the model's action before it hits a downstream system), and **tool-call authorization** for high-impact actions. For **irreversible** actions, **fail closed** — deny on uncertainty. Never send secrets or regulated data (PII/PHI) into prompts without authorization; redact or use approved channels (base64 is not protection).

**Traps:** relying on caching to price a bulk job (batch is the real discount); retrying 400s; putting untrusted content where it gains authority; failing *open* on an uncertain irreversible call.

## Accelerators & IP Contribution

This domain is about turning a working prototype into **reusable, maintainable, shareable** IP.

**Package for reuse.** A workflow you keep pasting in should become a **version-controlled Skill** in `.claude/skills/` (or a plugin) committed to the repo — discoverable and available to everyone on pull. Reusable exemplar context also belongs in a Skill that loads on demand, not in every session's system prompt. Prefer the **simplest packaging that meets the need**: reach for a single well-described skill before a heavyweight multi-command plugin, and add plugin/marketplace machinery only when scope justifies it.

**Share team configuration.** Commit `CLAUDE.md` for always-on standards, `.mcp.json` (with `${ENV}` expansion) for MCP servers, and skills/commands for workflows. To distribute a bundle broadly, publish a **plugin to a marketplace** (catalog via `marketplace.json`); teammates add the marketplace and install in a versioned, repeatable step.

**Version and maintain.** Version shared skills/plugins so consumers can **pin a known-good release** and adopt updates deliberately. Keep one **canonical source** and generate the rest via a build step — never hand-edit generated files. Pin and document versions for reproducibility. Treat shared config as **living documentation**: **stale config is a leading failure cause**, so keep `CLAUDE.md`, skills, and `.mcp.json` current as the system evolves.

**Make it defensible.** For sign-off and handoff, provide **evals as gates**, docs and runbooks, and shared version-controlled config so the team can operate the system without you. Add production hardening — retries/backoff, observability/logging, eval gates. For review, produce **small, focused changes with clear diffs and explanations**. And for the highest-confidence review of Claude's own output, use a **second, independent Claude instance** (no access to the generator's reasoning) to avoid confirmation bias.

**Traps:** hoarding a useful workflow locally; committing secrets instead of using `${ENV}`; hand-editing generated files; over-engineering an accelerator; leaving shared config to rot after launch.

## How to study with this bank

1. Memorize the `stop_reason` table and the tool-result rules (parallel results in one user message; `is_error: true` on failures).
2. Practice Model Foundations and Production Prompting until wrong keys are rare, then Claude Code / MCP.
3. Drill flashcards for caching, Batches (~50% / up to 24h), `.claude/rules/` vs. Skills, and `${ENV}` in `.mcp.json`.
4. Take a Quick mock, review misses by domain, then a Full mock above the approximate 720 pass mark.

Docs: [platform.claude.com/docs](https://platform.claude.com/docs) · [code.claude.com/docs](https://code.claude.com/docs).
