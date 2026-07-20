# Claude Certified Architect – Foundations — Study Guide

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. It teaches the publicly documented concepts the exam covers; the questions and examples here are original, not real exam items.

This guide covers the five domains of the Architect – Foundations exam. The exam is **scenario-heavy**: most items drop you into a running system ("Production logs reveal…", "You're designing…") and ask for the *most effective* fix. The recurring skill is **root-cause thinking** — choosing the change that removes a problem at its source over one that patches the symptom. Prefer deterministic mechanisms (interfaces, hooks, programmatic gates) over prompt-only guidance, and least-privilege designs over convenient broad ones.

Latest models to assume in examples: **Claude Opus 4.8** (`claude-opus-4-8`) as the default, with **Sonnet 5** (balanced/high-volume) and **Haiku 4.5** (simple/fast). Answer keys never hinge on exact prices.

## Multi-Agent Orchestration

The reference design is the **orchestrator–workers** pattern. A coordinator decomposes a task, delegates subtasks to specialized workers, and routes their results into a **synthesis/aggregation** step. The coordinator is a **hub**: workers do not talk to each other. The hub's value is **centralized visibility, consistent error handling, and control over what each worker receives** — *not* batching or latency reduction. Watch for distractors that justify the hub with a latency argument.

**Decision rules:**

- **Partition before delegating.** Assign distinct subtopics or source classes up front so parallel workers don't overlap. Reactive deduplication and shared "claimed work" lists add races and still waste effort.
- **Coverage is bounded by decomposition.** If every worker "succeeds" yet a whole dimension is missing, the coordinator decomposed too narrowly — synthesis cannot recover what was never gathered. Enumerate required dimensions and confirm each is assigned.
- **Sequential vs. parallel.** Parallelize only *independent* subtasks. A genuine data dependency (find the CEO, then find that person's statements) must run in sequence.
- **Least privilege & tool distribution.** Give each worker only the tools its role needs. When a worker misuses a broad tool (a general `fetch_url` used for ad-hoc search), replace it with a **narrower, validated tool** (`load_document` that only accepts an allowlisted id) so the misuse is impossible *at the interface* — stronger than prompt rules or domain denylists. For a hot path, add a scoped tool (`verify_fact`) for the common case and route rare complex work back through the coordinator.
- **Tool naming/description overlap** causes misrouting; fix by disambiguating both tools' names and descriptions, not by prompt patches.
- **Composite tools** (`get_company_profile`) or batching independent calls in one turn cut round-trips.

**Error propagation:**

- Workers **return structured error context** (failure type, attempted input, partial results, alternatives) so the coordinator can recover — never swallow an error as success, never crash the whole run.
- **Handle errors at the lowest level that can resolve them.** Workers retry transient failures locally and escalate only what they can't fix.
- **Distinguish a valid empty result ("0 matches") from an access failure (timeout).** They demand different responses; collapsing both into "no results" produces misleading coverage.
- **Degrade gracefully with transparency.** When some sources fail under a firm deadline, proceed and **annotate coverage** (well-supported vs. gapped). Fabricating to fill a gap is worse than an honest gap.

**Long-context effects:** Models attend most reliably to the **start and end** of long inputs ("lost in the middle"). Lead a synthesis input with a **key-findings summary** and add **section headers**; rotating order or summarizing away detail is inferior. Cut token bloat **at the source** — have workers emit structured findings (facts, citations, relevance scores) instead of raw page dumps. For **conflicting sources**, surface the disagreement with provenance rather than averaging or silently picking one.

## Claude Code for Continuous Integration

The theme is running Claude Code **headlessly** and turning its output into automation.

- **Headless mode:** `claude -p "…"` (a.k.a. `--print`) runs once, prints to stdout, and exits — the shape a CI step needs. Pre-authorize the tools the job needs so an unattended run never blocks on an interactive approval prompt.
- **Structured output:** `--output-format json` with a schema yields parseable findings (file, line, severity, message, rationale) you can post as **inline PR comments** via the API. Gate the build by reading a field and exiting non-zero — never by grepping prose.
- **Second independent reviewer:** a fresh instance that sees only the diff (not the author's or first reviewer's reasoning) catches blind spots that self-review rationalizes past. Re-running the same prompt reproduces the same blind spots — independence, not repetition, is the win.

**Batch vs. synchronous** is a favorite decision:

| Need | Choice | Why |
| --- | --- | --- |
| Blocking pre-merge gate | **Synchronous** (`claude -p`) | Needs a result *now*; batch is async (≤24h) |
| Overnight/scheduled scan | **Message Batches API** | ~50% cheaper, latency-tolerant |
| Iterative tool-calling review | **Not batch** | Batch is fire-and-forget; it can't execute a tool mid-request and continue |

Prompt caching is a **separate, compatible** cost lever for a synchronous review — cache the stable prefix; it is not a substitute for batch savings.

**Quality tuning:**

- **Noisy category erodes trust in all findings** → temporarily disable low-precision categories (style/naming), keep high-precision ones, improve prompts, re-enable.
- **Vague instruction** ("check comments are accurate") → give **explicit criteria** (flag only when a comment contradicts actual code behavior).
- **Vague/unactionable findings** → **few-shot** the exact desired finding format.
- **Duplicate feedback across commits** → include **prior findings** in context; report only new/unaddressed issues.
- **Duplicate test suggestions** → include the **existing test file** in context.
- **False positives from missing context** → include enough **surrounding code**, not just the isolated diff hunk, so the reviewer sees guards and invariants.
- **Uneven depth on a big PR** → **per-file passes** for depth plus a separate **integration pass** for cross-file data flow.
- **Expensive triage you can't filter** → have Claude include **reasoning + confidence** inline with each finding.
- **Inconsistent severity** → explicit severity definitions with concrete examples.

## Customer Support Resolution Agent

Design for **reliability and safety**, using deterministic mechanisms where prompt-following is not enough.

- **Tool interface first.** When the agent selects the wrong tool (schemas valid), the first fix is **better tool descriptions** — purpose, formats, examples, when-to-use vs. a similar tool. Descriptions are the primary selection signal. Malformed arguments? Put the exact format and an example **in the tool description** and constrain the `input_schema`.
- **Keyword-routing bias.** If a keyword reliably fires one tool *despite* good descriptions, suspect **keyword-sensitive routing instructions in the system prompt**.
- **Ambiguity → ask.** Multiple name matches, or a request missing an order reference, means **ask for a disambiguating identifier** before acting — never silently guess an account.
- **Enforce workflows in code.** A must-run-first step (verify identity) belongs in a **programmatic prerequisite** that blocks downstream tools until `get_customer` returns a verified id. Hard limits (a $100 auto-refund cap) belong in **code at the tool boundary**, not a bolded prompt line.
- **Escalation.** Escalate on a **genuine policy gap** (policy silent on the case, e.g. competitor price match) where the agent would otherwise **fabricate policy**. Do *not* escalate routine evidentiary conflicts a documented process already covers, or multi-topic messages it can handle. Improve calibration with **explicit criteria + few-shot examples**; **self-reported confidence scores are poorly calibrated**.
- **Formats & hooks.** Normalize inconsistent tool output (Unix vs. ISO timestamps), including from **third-party MCP servers you can't modify**, with a **PostToolUse hook** — deterministic and maintainable.
- **Latency.** Run independent lookups **in parallel in one turn** or via a **composite tool**, returning results together.
- **Context.** Keep a **persistent "case facts" block** (order #s, amounts, dates, region) verbatim *outside* the summarized history, so summarization can't corrupt precise details or durable constraints.
- **Completeness.** Add a **self-critique/evaluator step** against explicit criteria before sending. For a multi-concern message, **decompose, investigate in parallel over shared customer context, then synthesize**.
- **Loop control.** Drive the agentic loop off **`stop_reason`** (`tool_use` → continue, `end_turn` → stop); a max-iteration cap is a backstop, not the primary signal. Surface a failed tool as a `tool_result` with `is_error: true` so the agent can recover.

## Code Generation with Claude Code

This domain is about **where guidance lives** so the right context loads at the right time.

| Mechanism | Scope | Use for |
| --- | --- | --- |
| **CLAUDE.md** (project) | Always-on, team-wide | Universal standards everyone needs every session |
| **`~/.claude/CLAUDE.md`** | Always-on, personal, cross-project | Your own preferences, without affecting teammates |
| **`.claude/rules/`** | File path via **glob** frontmatter | Conventions scoped to file types (e.g. `**/*.test.ts`) |
| **Skills** (`.claude/skills/<name>/SKILL.md`) | On-demand by trigger keywords | Task/workflow guidance and reusable exemplar context |

**Skill frontmatter:** `name`, `description`, optional `argument-hint` (prompt for parameters), `allowed-tools` (deterministic capability guardrail — e.g. read-only), `context: fork` (run in an isolated subagent so verbose output doesn't pollute the main conversation), `model`.

**Key rules:**

- **Project skills beat same-named personal skills.** To customize personally without conflict, give your personal skill a **different name** in `~/.claude/skills/`.
- **Team commands/skills live in the project** (`.claude/commands/` or `.claude/skills/`) so they're version-controlled and available on clone/pull. There is **no** `.claude/config.json` "commands array."
- **Rules are for file-path scoping, not workflow scoping.** A multi-step release workflow belongs in a keyword-triggered Skill.
- **Plan mode vs. direct execution:** plan mode to explore and design when the change is architecturally significant or ambiguous (monolith→microservices); direct execution for well-specified, low-ambiguity changes (a mechanical rename).
- **Explore subagent** isolates verbose discovery and returns a summary, preserving the main context window — better than lossy `/compact`. **Plan** designs the approach.
- **Concrete input→output examples** beat more prose when Claude misreads a transform; few-shot examples beat instructions for output format.
- **MCP config sharing:** commit `.mcp.json` with **`${ENV}` expansion** (`${GITHUB_TOKEN}`) so each developer supplies their own secret — never commit tokens. Project scope (`.mcp.json`) is shared; user and local scopes are private.

## Core API, SDK & MCP Fundamentals

- **Messages API.** Everything goes through `POST /v1/messages` — chat, tool use, vision, and PDFs are all content within that one request. Tools are `name` + `description` + `input_schema`; **descriptions are the primary selection mechanism**.
- **`tool_choice`:** `auto` (default), `any` (must use some tool), `tool` (force a specific named tool), `none`.
- **Agentic loop.** Drive it off **`stop_reason`**: `tool_use` → run tools and continue, `end_turn` → done. Others: `max_tokens`, `stop_sequence`, `pause_turn` (server-tool loop paused — resume by resending), `refusal`.
- **Parallel tool use** is on by default. Execute all requested tools and return **all `tool_result` blocks in a single user message**; splitting them across messages trains Claude to stop calling in parallel. A failed tool returns a `tool_result` with `is_error: true` — don't drop it.
- **Structured outputs.** Constrain the response with `output_config.format` + a JSON schema; `strict: true` on a tool guarantees valid tool arguments. This replaces the old assistant-prefill trick (prefills **400** on current models).
- **Prompt caching.** Prefix match — any change in the cached prefix invalidates everything after it. Put stable content (frozen system prompt, deterministic tool order) first and volatile content last. Mark blocks with `cache_control: {type: "ephemeral"}`; **5-minute** default TTL or **1-hour**. Changing the **model, tools, or system prompt** invalidates the cache. Silent invalidators: `datetime.now()`/UUIDs in the prefix, unsorted JSON, per-user tool sets. Verify with `usage.cache_read_input_tokens`.
- **Message Batches API.** Asynchronous, **~50% cheaper**, up to **24h** (most finish sooner), correlate results by **`custom_id`** (any order). Fire-and-forget: **no mid-request tool execution**, so not for interactive loops or blocking work.
- **Streaming.** Use for long inputs/outputs or high `max_tokens` to avoid HTTP timeouts; assemble the result with `get_final_message()` / `finalMessage()`.
- **MCP.** Primitives: **tools, resources, prompts**. Transports: **stdio** (local) and **streamable HTTP/SSE** (remote). A server exposes capabilities; a client (Claude Code, the API MCP connector) consumes them.
- **Agent SDK vs. API.** The **Claude Agent SDK** provides the harness — the agent loop, tool execution, context and permission handling — on top of the API. The raw Messages API gives you the primitives to build that yourself.
- **Token counting** uses the `count_tokens` endpoint, not a third-party tokenizer like tiktoken. **PDF and vision** inputs are supported as content blocks.
- **Models & thinking.** Default `claude-opus-4-8`; Sonnet 5 balanced/high-volume; Haiku 4.5 simple/fast. **Adaptive thinking** (`thinking: {type: "adaptive"}`) replaces fixed `budget_tokens`; steer depth with `output_config.effort` (low/medium/high/xhigh/max). Sampling params like `temperature` are removed on the newest models — steer via prompting.

### Cross-cutting exam habits

1. Prefer the fix that removes the problem at the **interface, hook, or code gate** over one that relies on the model following a prompt.
2. Apply **least privilege** to tools and context.
3. Make failures **observable and structured** so a coordinator (or CI, or a human) can recover.
4. Use a **second independent instance** for review — it beats self-review by avoiding confirmation bias.
