# Claude Certified Architect – Professional — Study Guide

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. It teaches the publicly documented concepts the exam covers; it is not a source of real exam questions.

This is the most senior track in the program. It assumes you already know the API surface, Claude Code, MCP, and multi-agent mechanics, and it tests your **judgment**: turning a fuzzy business problem into the *simplest* architecture that meets it, defending trade-offs to stakeholders, taking a proof-of-concept to production, and governing the whole thing safely. The exam rewards restraint (don't build an agent when a workflow will do), defense in depth, and decisions grounded in evidence rather than vibes. The five domains below are weighted evenly at 20% each.

A useful mental model for almost every question: **pick the simplest thing that meets the requirement, make it safe by design, prove it with evals, and hand it off so it survives you.**

## Platform & Solution Design

The core skill is choosing the right altitude of solution. Escalate only when the previous rung genuinely can't do the job:

1. **Single call** — one input, one output, no orchestration. High-volume classification, extraction, or summarization.
2. **Workflow (code-controlled)** — deterministic control flow with model calls at defined steps: prompt chaining, routing, and parallelization. Use it when the **steps and their order are known**. It is testable, observable, and cheap where it can be.
3. **Agent (open-ended)** — a model-driven loop over tools where the **next step depends on what the last step revealed** (e.g., incident triage). Reach for this only when the path can't be scripted.
4. **Multi-agent** — a coordinator partitions a broad, separable problem across specialized subagents in parallel, then synthesizes. It earns its overhead only when the work overflows one context window and **parallel coverage matters more than token cost**.

> The single most common trap in this domain is **over-engineering**: a multi-agent design for a narrow FAQ, or an autonomous agent for a fixed three-step pipeline. When the workflow is knowable, code it.

Beyond the shape, you choose:

- **Model** — Opus for the hardest, low-volume, high-stakes reasoning; Sonnet for balanced or high-volume work; Haiku for simple, fast, cheap tasks. Match capability to difficulty and stakes; don't default to the biggest model.
- **Context strategy** — **RAG** when the corpus is large, changing, and only a few passages are relevant per query (true even with very large context windows — cost and attention still matter). **Prompt caching** for a large, stable prefix reused across many calls. **Compaction** (running summary) for long-lived sessions nearing the context limit.
- **Entry point** — claude.ai chat for ad-hoc use; **Projects** for non-technical teams needing persistent instructions plus knowledge; **Claude Code** for repository work; the **API** to build a product.
- **Structured output** — when a downstream system consumes the result, constrain it with a JSON schema (structured-output format or `strict` tool args) rather than hoping a prompt yields valid JSON.

Decision rule: reach for a tool when the task needs **live or external data or actions**; reach for a workflow when steps are **known**; reach for an agent only when they are **not**.

## Enterprise Integration & Production

This domain is about turning a POC into something an enterprise will actually run. A notebook with a hardcoded key and no error handling is not production — the blocking gaps are **secret management, error handling and retries, logging/observability, and an eval gate**.

Map the three production pressures to concrete levers:

- **Cost** — **Batches API** (~50% cheaper) for large, latency-tolerant, non-interactive jobs; **prompt caching** for repeated stable prefixes; **model routing** (cheap model for the easy majority, escalate the hard minority). Caching and batch are complementary; for an overnight job, batch is the bigger lever.
- **Latency** — **stream** long or high-`max_tokens` outputs to avoid HTTP timeouts; **parallelize** independent calls; isolate optional model calls from critical paths with strict **timeouts and defaults**.
- **Reliability** — **retry with exponential backoff and jitter** on 429/529; make side-effecting tool calls **idempotent**; add a **circuit breaker** for flaky dependencies; provide a **fallback model** when the primary is overloaded.

Know the **Batches API constraint** cold: it is asynchronous and fire-and-forget, correlating results by `custom_id`. You cannot execute a tool mid-request and continue, so batch does **not** fit interactive tool-calling loops or latency-sensitive work.

Integration patterns enterprises insist on:

- **Auth** — credentials in a secret manager or injected env vars, never in source control.
- **Data residency** — the deployment/region must keep processing in-jurisdiction; encryption in transit is not the same thing.
- **Audit logging** — a structured trail of inputs, prompt/model version, tool calls, and outputs per decision, so any decision can be reconstructed.
- **Human-in-the-loop** — a gate before irreversible/high-impact actions; auto-approve the cheap, reversible majority.
- **Observability** — instrument the *model layer*: token usage, latency percentiles, error/refusal rates, cache-hit rate, and live eval pass rate.
- **Graceful degradation** — when a source fails, proceed with what you have and **annotate the gaps**; never silently omit or fabricate.

Manage model versions like any change: **pin** a version for reproducibility, and promote a new one only after it clears your eval suite against the baseline.

## Responsible AI, Safety & Risk

Think in terms of a **safety stack** and **defense in depth**. A single instruction in the system prompt is a single point of failure. Layer independent controls so that no one failure opens the system:

1. **Input screening** — block malicious payloads, prompt-injection strings, and unauthorized PII *before* they reach the model.
2. **Output screening** — filter unsafe, incorrect, or PII-leaking responses *before* they reach users or downstream systems. You need this even with input screening, because the model can generate or retrieve PII the input screen never saw.
3. **Tool-call authorization** — gate high-impact/irreversible tool calls in an **external policy layer** the system enforces. The model *requests*; the system *authorizes*.

Two placement principles the exam loves:

- **Fail closed.** On uncertainty, timeout, or an unavailable check, **deny or hold** — especially for irreversible or high-stakes actions. Failing open to preserve availability lets through exactly the actions the control exists to stop.
- **Don't put a guardrail where the attacker has influence.** Asking the model to judge whether its own input is an injection is unsound: the malicious input can steer the judgment. Enforcement must be **external and deterministic**.

**Prompt-injection defense** is architectural, not a matter of a stern prompt line. Treat all tool and document content as **untrusted data that can never elevate to privileged instructions**, keep instructions structurally separate from data, and apply **least privilege** to tools. The strongest fix for an over-powered tool is to **replace it with a narrow one** that makes misuse impossible at the interface — not to instruct the model to be careful. Combined with least privilege, an injected "email the data" command simply has no capability to execute.

For **irreversible, high-impact actions** (bulk sends, production deletes, large payouts), require **explicit human approval before execution**. Enforce **role-based authorization** on each tool call against the caller's identity, so a read-only user can't trigger a write no matter how cleverly they phrase it. Handle **PII** by minimization: redact or tokenize before the model and before logs if the task doesn't need it, and screen outputs before they cross into broadly-readable stores. Finally, **red-team** powerful capabilities before launch and **log blocked/flagged events** as security telemetry.

## Evals as Acceptance Criteria & Decision Routing

Evals are the backbone of governance. Build them **first**, as the objective definition of "good enough": a representative dataset with graded expected outputs, covering edge cases and real failure modes, plus a measurable pass threshold. Then use the eval suite as the **gate** — never ship a model swap or architecture change that regresses it. Wire the suite into **CI** so it runs on every prompt/model change and blocks sub-threshold merges.

Eval-design traps to recognize:

- **Overfitting** — a near-perfect score with no production gain means you tuned against your test set. Keep a **held-out** set for true generalization.
- **Happy-path-only sets** — expand with edge cases and the failures production actually shows; grow the suite from real incidents.
- **Proxy gaming** — if the metric rewards a surrogate (e.g., brevity), the system optimizes the surrogate at the expense of the goal. Align the metric with the true objective.
- **Averaged-away regressions** — an aggregate gain can hide a regression on a **critical slice**. Block the change until the critical slice recovers.
- **Judging open-ended output** — use an **LLM-as-judge with an explicit rubric**, run independently of the generator, validated against human labels.
- **Offline is not forever** — pair pre-deploy evals with **online monitoring**; inputs and dependencies drift.

**Decision routing** decides which model outputs auto-execute and which go to a human. Route on three factors: **confidence, reversibility, and cost of error**. Cheap, reversible, high-confidence actions auto-proceed; low-confidence, irreversible, or high-cost actions go to a human. Crucially, **irreversibility and cost dominate confidence** — a confident but irreversible, high-cost action still routes to a human. Set thresholds from **measured outcomes on eval data**, not the model's self-reported confidence (which is poorly calibrated), and tune the threshold to balance residual risk against reviewer capacity.

**Compliance** is made auditable by mapping every obligation to a **named control, an accountable owner, and an evidence artifact** (a retained, versioned eval report with sign-off; the audit log; the traceability record). An unowned control decays; a control with no evidence can't be proven. Governance also requires **per-decision traceability** — inputs, model/prompt version, and routing outcome recorded so any automated decision can be explained after the fact.

## Stakeholder Engagement, Lifecycle & Enablement

An architect's value is only realized if stakeholders can act on it and the system outlives your involvement.

**Structured discovery** with non-technical stakeholders starts with the **business outcome, success metrics, constraints, data sensitivity, and which actions must stay human-controlled** — not model or region choices. Turn vague goals ("accurate," "nothing risky") into **measurable acceptance criteria** and explicit data-sensitivity and prohibited-action rules. Prioritize a backlog by **value against effort/feasibility and risk**, starting with high-value, feasible, lower-risk cases.

**Presenting trade-offs**: frame options in business terms — cost, latency, accuracy, risk — and deliver a **clear recommendation** with its rationale and what would change it. A neutral list with no guidance leaves the client where they started; enumerating is not advising.

**A handoff that survives your absence** is the recurring theme. Put operating knowledge into **versioned docs, runbooks, and shared config in the repo** — not one person's head or a one-time email. A good **runbook** maps symptoms → likely causes → remediation → rollback → escalation. Preserve the reasoning behind significant choices in **Architecture Decision Records**. And hand over the **means to verify**: the eval suite (to gate future changes) and the monitoring dashboards (to observe live health).

**Enabling a team** to adopt and operate the system uses Claude Code's sharing model correctly:

- **Team-wide standards** go in the **committed project `CLAUDE.md`** so every session loads them; `~/.claude/CLAUDE.md` is personal-only and won't reach teammates.
- **Reusable workflows** (release review, deploys) go in **project Skills** (`.claude/skills`) that load on demand via trigger keywords — not in always-on `CLAUDE.md`, which would bloat every unrelated task.
- **Shared tools** go in **`.mcp.json`** with `${ENV}` expansion so each developer supplies their own secret; never commit tokens.
- **Project skills take precedence** over same-named personal skills; to customize privately, use a **different name** in `~/.claude/skills` rather than editing shared config.

Finally, treat the **lifecycle** as ongoing: roll out in **phases** with a pilot and feedback loop; practice **change management** (tell users what's changing, why, and how, with support ready); set expectations **honestly** about value *and* limits, naming mitigations (output screening, human review, verifiable citations) rather than denying risk; confirm delivery with a **formal acceptance review and recorded sign-off** against the agreed criteria; and after launch, measure **adoption and outcome metrics tied to the original success criteria** with a channel to drive iteration. Enablement — training, example workflows, internal champions, office hours — closes adoption gaps far better than mandates.

## How to study with this bank

1. For every scenario, force the altitude question first: single call → workflow → agent. Escalate only when the lower rung cannot meet the requirement.
2. Practice Safety & Risk and Evals & Governance until you default to defense-in-depth (code gates + evals + monitoring), not prompt-only hope.
3. Drill flashcards for stakeholder discovery, ADRs/runbooks, and handoff artifacts (evals + dashboards + shared config).
4. Run domain-filtered practice on your weakest 20%, then a Full mock. Aim comfortably above 720 before exam day.

Docs: [platform.claude.com/docs](https://platform.claude.com/docs) · [code.claude.com/docs](https://code.claude.com/docs).
