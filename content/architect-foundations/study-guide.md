# Claude Certified Architect – Foundations — Study Guide

> **Unofficial, community-authored study material.** Created by Patrick King for Anthropic University. Not affiliated with, endorsed by, or produced by Anthropic. It teaches the publicly documented concepts the exam covers; every question and example here is original, not a real exam item. Facts were checked against the live Claude docs on 2026-09-28.

## Exam format at a glance

| | |
| --- | --- |
| Exam code | CCAR-F (exam guide v1.0, effective July 2026) |
| Items | 60, multiple-choice and multiple-response (each item says how many to select) |
| Structure | 4 scenarios, drawn at random from a bank of 6; each scenario frames a group of items |
| Time | 120 minutes |
| Scoring | Scaled 100–1,000, **720 to pass**; the score report shows percent-correct by domain |
| Fee / delivery | $125 USD · Pearson VUE, online proctored or at a test center |
| Validity | 12 months |

| # | Official domain | Weight | Bank items |
| - | --- | --- | --- |
| 1 | Agentic Architecture & Orchestration | 27% | 31 |
| 2 | Tool Design & MCP Integration | 18% | 21 |
| 3 | Claude Code Configuration & Workflows | 20% | 23 |
| 4 | Prompt Engineering & Structured Output | 20% | 24 |
| 5 | Context Management & Reliability | 15% | 18 |

The bank has 117 items, including 8 select-N items scored all-or-nothing. Current models to assume: **Claude Opus 5.5** as the default, **Fable 5.1** for the hardest long-horizon work, **Sonnet 5.5** for speed and intelligence balance, and **Haiku 4.5** for fast, cheap, high-volume tasks.

**How items are written.** Most items describe a running system and ask for the most effective change. The recurring skill is root-cause thinking. A good rule of thumb for ranking answers: (1) make the failure impossible in code or at the interface, (2) give the model structured context it must see, (3) improve prompts and examples, (4) only then add process workarounds.

## The six scenarios (in brief)

You will see four of these. Each one leans on particular domains.

1. **Customer Support Resolution Agent** (domains 1, 2, 5). An Agent SDK agent resolves returns, billing, and account issues through backend tools, and has to know when to hand off to a person. Expect loop control, hooks and gates, tool errors, case facts, and escalation judgment.
2. **Code Generation with Claude Code** (domains 3, 5). A team uses Claude Code day to day. Expect CLAUDE.md layering, skills and commands, path rules, plan mode, iteration techniques, and session management.
3. **Multi-Agent Research System** (domains 1, 2, 5). A coordinator delegates to search, analysis, synthesis, and reporting subagents and must produce cited output. Expect delegation, context passing, tool scoping, error propagation, and provenance.
4. **Developer Productivity with Claude** (domains 2, 3, 1). An agent helps engineers explore and change unfamiliar code with built-in tools and MCP servers. Expect Grep/Glob/Edit choices, MCP integration, and exploration strategy.
5. **Claude Code for Continuous Integration** (domains 3, 4). Claude Code runs in pipelines to review PRs and generate tests. Expect headless flags, structured output, review precision, and batch vs. synchronous trade-offs.
6. **Structured Data Extraction** (domains 4, 5). Claude turns messy documents into schema-valid records for downstream systems. Expect schema design, validation and retry loops, batch strategy, and human review calibration.

## Domain 1 — Agentic Architecture & Orchestration (27%)

**Agentic loops.** Send the request, read `stop_reason`, run tools on `tool_use`, return each result as a `tool_result` block (keyed by `tool_use_id`, first in the next user message, all results for a turn together), and stop on `end_turn`. A response can contain text *and* a tool call, so never end the loop because text appeared. Handle the other stop reasons too: `max_tokens`, `stop_sequence`, `pause_turn`, `refusal`, and `model_context_window_exceeded`. A max-iterations cap is a backstop, not the main control. The Agent SDK provides this harness for you; with the raw Messages API you write it yourself.

**Coordinator–subagent orchestration.** Hub and spoke: the coordinator decomposes the task, picks which subagents a query actually needs (don't run the full pipeline for a one-line lookup), receives every result and error, and aggregates. Subagents don't talk to each other directly. For coverage, have the coordinator check the synthesis against the request, send targeted follow-ups for gaps, and synthesize again.

**Subagent context and spawning.** Subagents are launched with the **Agent** tool (called Task before Claude Code v2.1.63; `Task` still works as an alias), so it must be in the coordinator's allowed tools. Subagents do **not** inherit the parent's conversation: put findings, user constraints, and metadata in the delegation prompt, in structured form that keeps each claim tied to its source. The coordinator picks a subagent by its `description`, so make it specific. Emit several Agent calls in one response to run independent subagents in parallel. Write delegation prompts as goals plus quality criteria, not step-by-step scripts.

**Workflow enforcement and handoffs.** Prompt instructions are probabilistic. When a skipped step causes harm (identity verification before a SIM swap or refund), enforce the order in code with a gate or hook. When escalating, hand the human a structured summary: customer ID, amounts, findings, likely root cause, and a recommended action. The specialist usually can't see the transcript or tool results.

**Agent SDK hooks.** `PreToolUse` can allow, deny, ask, or rewrite input. Include `permissionDecisionReason` on a deny so the model redirects instead of retrying. `PostToolUse` can add context or replace a tool's output (`updatedToolOutput`) before Claude sees it, which is how you normalize formats or redact data from tools you can't modify. Use hooks for guarantees and prompts for style and judgment.

**Task decomposition.** Use prompt chaining for predictable, fixed-step work (classify → extract → validate). Use dynamic decomposition for open-ended work (map the codebase, pick high-impact areas, adapt the plan). Parallelize only independent subtasks; a real data dependency must run in sequence.

**Session resume and fork.** Name sessions and resume them by name (`claude --resume <name>`). Resume when prior context is still valid, and tell the session which files changed. Fork (`--fork-session`, or `fork_session` / `forkSession` in the SDK) to explore two approaches from one baseline. Start fresh with a summary when earlier tool results are stale.

## Domain 2 — Tool Design & MCP Integration (18%)

**Tool interface design.** The description is the most important factor in tool selection: what the tool does, when to use it and when not to, what each parameter means, formats with examples, and what it doesn't return. Split vague multipurpose tools into purpose-specific tools with clear contracts. Namespace names by service (`repo_list_pull_requests`, `tracker_list_issues`). A composite tool can cut round trips when calls always go together.

**Structured tool errors.** Return `is_error: true` (MCP: `isError`) with structured metadata: a category (transient, validation, business, permission), a retryable flag, and a plain-language explanation the agent can pass on. "Operation failed" leads to retrying policy violations and giving up on timeouts that would have worked. A permission error isn't retryable, and a failure must never be reported as an empty success.

**Tool distribution and `tool_choice`.** Giving an agent too many tools hurts selection. Scope each agent to its role. Replace risky general tools (`run_sql`, `fetch_url`) with constrained ones. `tool_choice` is `auto` (default), `any`, `tool`, or `none`. **Current-model catch:** Claude Opus 5.5, Sonnet 5.5, and Fable 5.1 return a 400 for `any` and named `tool`, and manual extended thinking blocks them too. On those models, use `auto` with `strict: true` for schema-valid tool inputs, or structured outputs for a fixed JSON response.

**MCP server integration.** Primitives: tools, resources, prompts. Transports: stdio (local) and Streamable HTTP (remote); the older SSE transport is deprecated. In Claude Code, project scope is `.mcp.json` (committed, shared; use `${VAR}` expansion so secrets stay out of git), while user and local scopes live in `~/.claude.json` and stay private. Tools from all connected servers are available together. Use resources to expose catalogs such as schemas and doc trees, so the agent doesn't have to probe for them. Prefer a maintained community server for standard integrations and build custom servers for team-specific workflows. If the agent keeps using Grep instead of a better MCP tool, improve the MCP tool's description.

**Built-in tool selection.** Glob matches file paths (`**/*.stories.tsx`). Grep searches file contents. Read and Write handle whole files. Edit replaces an exact, unique string: add surrounding context, use `replace_all` when every occurrence should change, or fall back to Read + Write. Explore step by step (Grep for an entry point, then Read along the imports) instead of reading everything. To trace a function through wrapper modules, find every exported alias first. Note: on macOS, Linux, and WSL, Claude Code leaves Glob and Grep out of its default tool set and searches through Bash, but you get them back when you name them in `--tools`/`--allowedTools` or the SDK's options.

## Domain 3 — Claude Code Configuration & Workflows (20%)

**CLAUDE.md hierarchy.** `~/.claude/CLAUDE.md` applies to you in every project. `./CLAUDE.md` or `./.claude/CLAUDE.md` is shared with the team through git. `./CLAUDE.local.md` holds your personal settings for this project (gitignore it). Files above the working directory load at launch and are concatenated, not overridden. Subdirectory CLAUDE.md files load when Claude reads files in that directory. Use `@path` imports to pull in only the standards each package needs, and keep each file under about 200 lines. Check what loaded with `/context`.

**Slash commands and skills.** Project skills and commands live in `.claude/skills/` and `.claude/commands/`; personal ones live in `~/.claude/`. When names collide, **enterprise beats personal and personal beats project**. Frontmatter: `disable-model-invocation: true` (only you can trigger it, which is right for deploys), `user-invocable: false` (only Claude), `context: fork` (run in a subagent), `allowed-tools` (pre-approves the listed tools for that turn; it does **not** restrict anything), `disallowed-tools` (removes tools while the skill runs), `argument-hint` (autocomplete hint). Reference arguments with `$ARGUMENTS` or `$0`. Put always-on standards in CLAUDE.md and on-demand workflows in skills.

**Path-scoped rules.** Files in `.claude/rules/` with a `paths:` glob list load when Claude reads a matching file, wherever it sits in the tree, which is better than per-directory CLAUDE.md for conventions such as test files. `paths` is the only field Claude Code reads. Because a triggered rule lives in message history, `/compact` can summarize it away. If a rule must persist, remove `paths` or move it to the root CLAUDE.md. Rules scope by file path, not by task: multi-step workflows belong in skills.

**Plan mode vs. direct execution.** Plan mode suits large, multi-file, or architecturally open changes. Direct execution suits clear, well-scoped ones. A common combination: plan the migration, then execute the approved plan. The built-in Explore and Plan subagents keep verbose research out of the main context, and they skip CLAUDE.md, so conventions stay with the main agent.

**Iterative refinement.** Give 2–3 concrete input/output examples when prose descriptions keep being misread. Write tests first and share the failures. Use the interview pattern in unfamiliar domains. Send all interacting problems in one message, and fix independent ones one at a time.

**CI/CD integration.** `claude -p` runs non-interactively. `--output-format json` plus `--json-schema` gives validated, parseable findings to post as inline comments or to gate the build on a field. Pre-approve tools with `--allowedTools` so the job never waits on a prompt. Bound runs with `--max-turns` and `--max-budget-usd`. `--bare` skips CLAUDE.md, skills, hooks, and MCP discovery, which is fast but drops project context. Document review criteria, testing standards, and fixtures in CLAUDE.md. Pass prior findings and existing tests into context to avoid duplicate output, and include enough surrounding code for the reviewer to see guards.

## Domain 4 — Prompt Engineering & Structured Output (20%)

**Explicit criteria.** "Be conservative" doesn't change precision. List which categories to report (correctness, security) and which to skip (style, local conventions), with concrete examples for each severity level. If one noisy category is costing developer trust, disable it temporarily while you fix its prompt.

**Few-shot prompting.** Examples are the most reliable way to get a consistent format and correct handling of ambiguous cases. Contrast an acceptable pattern with a real issue and explain why. For extraction, cover different document layouts (bibliographies and inline citations) so required fields don't come back empty.

**Schema-enforced output.** `output_config.format` with a JSON schema, or `strict: true` on tools, guarantees valid JSON, types, and required fields. It does **not** guarantee semantic correctness: values can land in the wrong field, or totals may not reconcile. Make fields nullable when documents may not contain them, add `unclear` and `other` + detail to enums, and state normalization rules for messy source formats. Assistant prefill returns a 400 on current models, so don't rely on it.

**Validation and retry loops.** Retry with the original document, the failed output, and the specific errors. Retries fix format and structure problems, but they can't produce information that isn't in the input. Extract `calculated_total` next to `stated_total` (or add a `conflict_detected` flag) to surface inconsistencies. Add a `detected_pattern` field so you can analyze which findings developers dismiss.

**Batch processing.** The Message Batches API costs 50% less, runs asynchronously, and can take up to 24 hours, though most batches finish within an hour. Results come back in any order, so match them by `custom_id`; they stay available for 29 days. Each request is one Messages call, so your code can't run a tool partway through and continue. Use synchronous calls for blocking checks. Submission cadence = SLA − 24 hours (for a 36-hour SLA, submit at least every 12 hours). Resubmit only the failed `custom_id`s, fixing the cause first (for example, chunking oversized documents). Refine the prompt on a sample before batching large volumes. Prompt caching is a separate cost lever: keep volatile content out of the prefix and check `cache_read_input_tokens`.

**Multi-pass review.** A session that generated code is biased toward its own reasoning, so use an independent instance to review. Split large reviews into per-file passes plus an integration pass. Have the model report confidence for each finding so reviewers can be routed where they're needed.

## Domain 5 — Context Management & Reliability (15%)

**Context preservation.** The API is stateless, so send the history (or a maintained summary plus key facts) with every request. Keep a persistent case-facts block of amounts, dates, IDs, and constraints outside summarized history. Trim tool results to the fields you need before they pile up. Put a key-findings summary first and use section headers to counter "lost in the middle." Use `count_tokens` for accurate sizing.

**Escalation and ambiguity.** Escalate right away when the customer explicitly asks for a person. For a frustrated customer with a problem the agent can fix, acknowledge the frustration and offer the fix, and escalate if they ask again. Escalate for policy gaps rather than inventing policy. Sentiment and self-reported confidence are poor proxies for how complex a case is. Ask for an extra identifier when a lookup returns several matches or when information is missing.

**Error propagation.** Subagents retry transient failures locally, then report the failure type, what they tried, partial results, and alternatives. Anti-patterns: returning an empty success when a source failed, and aborting the whole run over one failure. Keep "no matches" separate from "couldn't reach the source," and annotate coverage gaps in the output. For crash recovery, have each agent export state and give the coordinator a manifest to load on resume.

**Large-codebase context.** Long sessions degrade, and answers drift toward generic patterns. Delegate verbose discovery to subagents, keep findings in scratchpad files, summarize at phase boundaries and pass the summary to the next phase, and use `/compact` when discovery output fills the context.

**Human review and confidence.** A 97% average can hide weak document types or fields, so validate each segment before reducing review. Calibrate confidence thresholds against labeled data, keep stratified random sampling of high-confidence output, and send ambiguous or contradictory sources to people first.

**Provenance and uncertainty.** Carry structured claim-source mappings (claim, URL, excerpt, date) through every summarization step. When credible sources conflict, report both values with attribution instead of picking one. Dates stop change over time from looking like contradiction. Present each content type in a suitable form: tables for financials, prose for news, lists for technical findings.

## How to study with this bank

- Study time should follow the **official** weights above. Domain 1 alone is more than a quarter of the exam.
- Practice select-N items until "select exactly two" feels natural. They are scored all-or-nothing.
- For each scenario, be able to explain the one mechanism that removes each failure at its source.
- Get hands-on: build a small Agent SDK agent with a hook and a subagent, set up a repo with CLAUDE.md, a path-scoped rule, and a forked skill, and run `claude -p --output-format json --json-schema` in a CI job.
