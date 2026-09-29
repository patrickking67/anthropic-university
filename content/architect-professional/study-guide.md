# Claude Certified Architect – Professional — Study Guide

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. It teaches the publicly documented concepts the exam covers; it is not a source of real exam questions. Facts verified against the live docs on 2026-09-28.

This is the most senior track in the program. It assumes you already know the API, Claude Code, MCP, and multi-agent mechanics, and it tests your **judgment**: turning a fuzzy business problem into the *simplest* architecture that meets it, integrating it securely, proving it with evals, governing it, and handing it off so it survives you. The exam rewards restraint (don't build an agent when a workflow will do), defense in depth, and decisions grounded in evidence.

A useful mental model for almost every question: **pick the simplest thing that meets the requirement, make it safe by design, prove it with evals, and hand it off so it survives you.**

## Exam format (CCAR-P, guide v1.0, effective July 2026)

| | |
| --- | --- |
| Items | 63, multiple-choice and multiple-response (each item says how many to select) |
| Time | 120 minutes |
| Scoring | Scaled 100–1,000; **720 to pass**; score report shows percent correct by domain |
| Fee | $175 USD |
| Delivery | Pearson VUE, online proctored or test center |
| Validity | 12 months; renew with a free, non-proctored assessment before it lapses |
| Prerequisites | None required. Recommended: 3+ years of systems architecture and 6+ months hands-on with Claude or similar LLM systems in production |

| # | Domain | Weight |
| - | --- | --- |
| 1 | Solution Design & Architecture | 17% |
| 2 | Claude Models, Prompting & Context Engineering | 13% |
| 3 | Integration | 19% |
| 4 | Evaluation, Testing & Optimization | 16% |
| 5 | Governance, Safety & Risk Management | 14% |
| 6 | Stakeholder Communication & Lifecycle Management | 14% |
| 7 | Developer Productivity & Operational Enablement | 7% |

Multiple-response items are all-or-nothing. Each correct option must stand on its own, so judge every option independently.

## 1. Solution Design & Architecture (17%)

**Translate the business problem first.** An ask like "an AI for our customer emails" must become concrete outcomes, volume, an accuracy bar, data sensitivity, and the actions that stay human-approved before any architecture makes sense. Match the entry point to who runs it: a claude.ai Project for a non-technical team, Claude Code for repository work, the API to build a product.

**Choose the lowest rung that works:**

1. **Augmented LLM**: one call enhanced with retrieval, tools, and memory. This is the building block of everything else.
2. **Workflow** (code-controlled): the steps are known. The patterns are *prompt chaining*, *routing* (classify, then hand off), *parallelization* (fixed, independent subtasks), *orchestrator-workers* (a lead model decides the subtasks at runtime), and *evaluator-optimizer* (generate, critique against clear criteria, repeat).
3. **Agent**: the next step depends on what the last one revealed, as in incident triage.
4. **Multi-agent**: broad, separable work that overflows one context window, where parallel coverage matters more than cost. Anthropic reports that agents use about 4× the tokens of chat and multi-agent systems about 15×. Give each subagent a clear objective, output format, and boundaries. Let each explore in its own context window and return condensed findings.

> The most common trap is **over-engineering**: a multi-agent FAQ bot, or an agent for a fixed three-step pipeline. Keep deterministic rules in code and call the model only where judgment is needed (the hybrid workflow).

**Design end to end**: input → processing → output → **feedback loop**. Capture user edits and ratings, turn them into eval cases, and gate changes on them. **Decompose** monoliths into steps you can test and rerun. **Align to value pillars**: keep an efficiency goal (such as handle time against a baseline) separate from a transformation goal. Tie performance SLAs to the design.

## 2. Claude Models, Prompting & Context Engineering (13%)

**Current models** (verify on the models overview page before the exam):

| Model | Use it for | Notes |
| --- | --- | --- |
| Claude Opus 5.5 | Default starting point for most workloads | 1M context, 128K output, $4/$20 per MTok, adaptive thinking always on, default effort `medium` |
| Claude Fable 5.1 | Most demanding reasoning, long-horizon agentic work | 1M context, $10/$50 per MTok, default effort `high` |
| Claude Sonnet 5.5 | Best speed and intelligence balance | 1M context, $2/$10 per MTok |
| Claude Haiku 4.5 | Fast, cheap, high-volume, bounded tasks | 200K context, $1/$5 per MTok, still uses `budget_tokens` |

- **Route by difficulty.** Send the easy majority to a small model and escalate the hard minority. Low-volume, high-stakes reasoning earns a top-tier model.
- **Migration gotchas.** `temperature`, `top_p`, and `top_k` are removed on the newest models (they return a 400). Assistant prefill returns a 400 from the 4.6 family onward, so use structured outputs instead. `budget_tokens` is rejected on later models. Use adaptive thinking and **`output_config.effort`** (`low` to `max`) instead. Effort is the main control over latency and cost. Changing the top-level effort between requests invalidates the prompt cache, so use a per-message effort change to vary a single turn.
- **Prompt templates.** Put the role and standing guardrails in the system prompt. Wrap instructions, reference data, and untrusted input in separate XML tags. Use **3–5 diverse few-shot examples** for consistent format and tone.
- **Context and tokens.** Use RAG when a large corpus changes often and only a few passages matter. A 1M window is a capability, not a reason to skip retrieval. Use **compaction** for long sessions (server-side compaction is in beta). Use `count_tokens` to budget.
- **Reuse.** **Prompt caching** is prefix-match, rendered as tools → system → messages. Keep stable content first and volatile content (such as timestamps) out of the prefix. The default TTL is 5 minutes, and a 1-hour TTL writes at 2× base input. Cache reads cost 10% of base input (5% on Opus 5.5, 2.5% on Fable 5.1). **Agent Skills** use progressive disclosure: about 100 tokens of metadata per Skill up front, full instructions when triggered.

## 3. Integration (19%): the heaviest domain

- **Capability bloat.** Give each role only the tools it needs. Consolidate overlapping low-level tools into a few task-level, namespaced tools. Replace a broad tool, such as a shell, with a narrow one that makes misuse impossible.
- **Progressive discovery vs a monolithic context.** The **tool search tool** (`defer_loading`) keeps most definitions out of context and typically loads only 3–5 per request. Anthropic reports over 85% fewer definition tokens, and selection accuracy degrades past roughly 30–50 visible tools. Use it with 10+ tools, 10K+ tokens of definitions, or many MCP servers. Skip it with fewer than 10 tools that every request uses.
- **Protocol choice.** Use **MCP** when many AI clients or teams need the same capability through a standard, discoverable interface with OAuth-based authorization. Use a **direct API or CLI call** for a deterministic step inside your own code. Use an **agent-to-agent** protocol when peer agents delegate whole tasks to each other.
- **Authn and authz gaps.** A shared service-account token behind an MCP server erases user identity, so use per-user delegated OAuth. Authorize each tool call against the caller's role in the system, not in the prompt. Keep secrets in a secret manager or use workload identity federation, never in the model's context.
- **RAG pipeline.** Chunk along document structure and keep heading paths. Store metadata (version, effective date) so retrieval can filter. **Contextual Retrieval** prepends chunk-specific context before embedding and BM25 indexing: 49% fewer failed retrievals, 67% with reranking. Anthropic doesn't offer its own embedding model; its docs point to Voyage AI.
- **Retrieval strategy matched to the data.** Use **hybrid BM25 plus embeddings** with rank fusion and reranking when queries carry exact identifiers. Use a **read-only query tool** for aggregates over structured warehouses, not vector search. Use a live tool for data that changes minute to minute.
- **Accuracy–latency trade-offs.** Configure each path separately: stream a faster model at lower effort for live chat, and run a more capable model at higher effort for offline reports. Parallelize independent calls. Put strict timeouts on optional calls. Plan a fallback model: the Claude API has server-side `fallbacks`, and other clouds use the client-side pattern.
- **Observability at scale.** Tag requests by tenant and aggregate reported usage. Watch token usage, latency percentiles, error and refusal rates, cache-hit rate, and live eval pass rate. The Usage & Cost Admin API reports org-level usage.
- **Where Claude runs.** The same model can have different feature sets on different platforms:
  - **Claude API**: all features. `inference_geo` supports only `"global"` or `"us"`, with US-only priced at 1.1×. HIPAA readiness is available with a BAA.
  - **Claude in Amazon Bedrock**: AWS-operated. Offers global, geography (including EU), and in-region endpoints; regional endpoints carry a 10% premium. This is Anthropic's pointer for FedRAMP High, IL4/IL5, or AWS as sole processor. It doesn't support the Message Batches API, structured outputs, Agent Skills, or the MCP connector.
  - **Vertex AI**: global, multi-region (US, EU), and regional endpoints; multi-region and regional carry a 10% premium.
  - **Microsoft Foundry**: billed through Azure Marketplace. *Hosted on Azure* offers Global Standard plus a **US-only** Data Zone. *Hosted on Anthropic* is Global Standard and has the widest model list, including Fable. Foundry doesn't offer the Message Batches, Models, or Admin APIs. Hosted-on-Azure deployments also exclude code execution, Agent Skills, and the Files API. HIPAA readiness isn't available.
  - **Claude Platform on AWS**: Anthropic's API through AWS Marketplace. Anthropic stays the data processor.

## 4. Evaluation, Testing & Optimization (16%)

- **Define metrics before building**: accuracy, latency, cost, safety, and security. Acceptance criteria are an eval set with graded expectations and a pass threshold.
- **Datasets and frameworks**: cover representative inputs, edge cases, and real production failures, and grow the set from incidents. Keep a **held-out** set to catch overfitting. For open-ended output, use an **LLM-as-judge** with a rubric, run independently and validated against human labels. Red-team safety controls before launch.
- **Metric traps**: proxy gaming (rewarding brevity instead of helpfulness), and averaged-away regressions (block a change when a critical slice regresses). Set confidence thresholds from measured outcomes, not self-reported confidence.
- **A/B testing and iteration**: randomize assignment concurrently and fix the primary metric, guardrail metrics, and sample size in advance. Don't peek and stop early. Gate model swaps on the eval suite against the pinned baseline, run the gate in CI, and roll out in shadow or canary stages.
- **Diagnose before you fix**: separate prompt failure, hallucination (ground the model with citations and let it say it doesn't know), retrieval problems (stale or irrelevant chunks), and model mismatch.
- **Optimize cost and latency**: the Batches API is 50% off for non-interactive jobs but can't run a mid-request tool loop, and it isn't available on Bedrock, Vertex AI, or Foundry through the Claude API surface. Combine caching and routing. Monitor offline gates and online telemetry together.

## 5. Governance, Safety & Risk Management (14%)

- **Guardrails in depth**: input screening, output screening, and tool-call authorization enforced outside the model. **Fail closed** on uncertain or unavailable checks for high-stakes actions. Never put a guardrail where attacker-controlled input can steer it.
- **Risks and failure modes**: prompt injection through documents or tools (treat that content as untrusted data), confused deputies, PII echo, and hallucination. Keep privileged instructions structurally separate from data.
- **Human in the loop**: route on confidence, reversibility, and cost of error. Irreversibility and cost dominate even high confidence. Size thresholds to reviewer capacity.
- **Compliance**: apply GDPR-style data minimization (redact before the model and before logs). Meet residency with the right platform and geography. For **HIPAA** on the Claude API you need a signed BAA and a HIPAA-enabled org. Only eligible features are covered, and others return a 400; most betas aren't covered, and Foundry and Claude Platform on AWS are excluded. For **FedRAMP High** use Claude in Amazon Bedrock. Map each obligation to a named control, an owner, and an evidence artifact, and keep per-decision traceability.
- **Ethical AI**: measure outcomes across demographic slices, disclose AI involvement, and keep accountable humans on consequential decisions, never as rubber stamps.

## 6. Stakeholder Communication & Lifecycle Management (14%)

- **Discovery**: cover outcomes, success metrics, constraints, data sensitivity, and human-controlled actions. Turn "accurate" and "nothing risky" into testable criteria. Prioritize by value against feasibility and risk.
- **Communicating trade-offs**: present cost, latency, accuracy, and risk in business terms, with a clear recommendation and the conditions that would change it.
- **Expectations and SLAs**: base SLOs on measured percentiles and composite availability across dependencies, define what is measured, and document degraded modes. Be honest about limits and name the mitigations.
- **Documentation**: keep ADRs for the "why", runbooks that map symptoms to causes, remediation, rollback, and escalation, and versioned docs and config in the repo.
- **Lifecycle**: discovery → design → handoff (with the eval suite and dashboards) → monitoring → iteration. Roll out in phases, manage change, run a formal acceptance sign-off, and measure outcomes after launch.

## 7. Developer Productivity & Operational Enablement (7%)

- **Team setup in Claude Code.** Settings precedence, highest first: **managed settings** → command line → `.claude/settings.local.json` → shared `.claude/settings.json` → `~/.claude/settings.json`. Put org guardrails in managed settings. Permission rules are evaluated **deny → ask → allow**, and Claude Code enforces them, not CLAUDE.md. Put team standards in the committed `CLAUDE.md`, workflows in `.claude/skills`, and shared tools in `.mcp.json` with `${ENV}` expansion. When skills share a name, enterprise beats personal and personal beats project, so give a personal variant a different name.
- **AI-assisted workflows.** Use Claude Code for repository-wide changes that run tests, hooks such as a blocking `PreToolUse` to enforce policy, subagents to keep noisy side tasks out of the main context, and GitHub Actions (`@claude` in a PR or issue).
- **Operational debugging.** Stream long generations to avoid timeouts. Retry 429 and 529 errors with exponential backoff and jitter. Make side-effecting tools idempotent, add circuit breakers for flaky dependencies, and degrade gracefully with the gaps annotated. Monitor team usage and cost with OpenTelemetry (`CLAUDE_CODE_ENABLE_TELEMETRY=1`).

## How to study with this bank

1. Weight your time by the blueprint. Integration (19%) and Solution Design (17%) together are over a third of the exam.
2. For every scenario, ask the altitude question first: augmented LLM → workflow → agent → multi-agent.
3. For platform questions, check the feature and compliance matrix above. Many distractors are true on one cloud and false on another.
4. Practice the multiple-response items until you evaluate each option on its own.
5. Run domain-filtered practice on your weakest domains, then a full mock. Aim comfortably above 720.

Docs: [platform.claude.com/docs](https://platform.claude.com/docs) · [code.claude.com/docs](https://code.claude.com/docs) · [Claude in Microsoft Foundry on Microsoft Learn](https://learn.microsoft.com/azure/foundry/foundry-models/concepts/claude-models).
