# Claude Certified Architect – Professional — Flashcards

> Unofficial, community-authored study material. Not affiliated with Anthropic.

*Generated from `flashcards.json` by `scripts/build.mjs`. Do not edit by hand.*

## Solution Design & Architecture

**Q:** What are the four architecture options, simplest to most complex?  
**A:** Single call → workflow (code-controlled steps) → agent (open-ended, model-driven loop) → multi-agent. Pick the simplest that meets the requirement.

**Q:** When is a code-controlled workflow the right choice over an agent?  
**A:** When the steps and their order are known and fixed. Reserve agents for open-ended tasks whose path depends on intermediate results.

**Q:** When is an agent justified over a workflow?  
**A:** When the path isn't known in advance and the useful next step depends on what previous steps revealed (e.g., open-ended incident triage).

**Q:** When does multi-agent orchestration earn its overhead?  
**A:** Broad, separable work across independent areas that overflows a single context window, where parallel coverage matters more than token cost.

**Q:** Which entry point fits which user?  
**A:** claude.ai chat for ad-hoc; Projects for non-technical persistent instructions + knowledge; Claude Code for repo work; the API to build a product.

**Q:** First step when handed an ambiguous business ask?  
**A:** Scope it: clarify outcomes, volume, accuracy bar, data sensitivity, and which actions must stay human-approved — before choosing an architecture.

**Q:** What is the augmented LLM?  
**A:** The basic building block of agentic systems: a model enhanced with retrieval, tools, and memory. Start here and add workflow or agent structure only when needed.

**Q:** Evaluator-optimizer vs orchestrator-workers: when is each the right fit?  
**A:** Evaluator-optimizer: clear criteria and iterative critique adds measurable value. Orchestrator-workers: subtasks can't be predicted in advance, so a lead model decides and delegates them at runtime.

**Q:** How much more do agents and multi-agent systems cost in tokens?  
**A:** Anthropic reports agents use about 4x the tokens of chat, and multi-agent systems about 15x. Reserve multi-agent for high-value, broad, parallelizable work.

## Claude Models, Prompting & Context Engineering

**Q:** Match the current Claude model to the task.  
**A:** Opus 5.5 is the default starting point for most workloads. Fable 5.1 for the most demanding reasoning and long-horizon agentic work. Sonnet 5.5 for the best speed/intelligence balance. Haiku 4.5 for fast, cheap, high-volume bounded tasks.

**Q:** RAG vs stuffing everything into a large context window?  
**A:** Retrieve only the relevant passages per query — cheaper, more current, and more accurate than loading a huge corpus every call, even with a very large context window.

**Q:** What is prompt caching best for, and how do you structure the prompt?  
**A:** A large, stable prefix reused across many calls; cache reads cost a fraction of full processing. Keep stable content first, volatile content last.

**Q:** What is compaction as a context strategy?  
**A:** Replacing older turns with a summary that preserves key decisions and facts, so a long-running session stays inside the context window. The Claude API offers server-side compaction (beta), so you don't write the summarizer yourself.

**Q:** How do you guarantee schema-valid JSON for a downstream system?  
**A:** Use structured outputs (output_config.format with a JSON schema) or strict tool use. Don't rely on prompt instructions, and don't use assistant prefill: it returns a 400 on the 4.6 family and later.

**Q:** Common silent prompt-cache killer?  
**A:** Volatile content in the prefix (datetime.now(), UUIDs, unsorted JSON, per-user tool sets). Any change to the prefix invalidates the cache after it.

**Q:** Temperature fails on a current model. What now?  
**A:** Sampling parameters (temperature/top_p/top_k) are removed on the newest models and return a 400. Steer with prompting, and use output_config.effort (low to max) to trade depth for latency and cost.

**Q:** How do Agent Skills keep context lean?  
**A:** Progressive disclosure: about 100 tokens of name and description per Skill load up front, full SKILL.md instructions load when triggered, and bundled files load only as needed.

**Q:** How many few-shot examples, and how should you format them?  
**A:** Three to five relevant, diverse examples, wrapped in tags (for example <example>) so they're kept apart from instructions and input.

## Developer Productivity & Operational Enablement

**Q:** Why stream long generations?  
**A:** Incremental tokens avoid request-level HTTP timeouts on long or high-max_tokens outputs. Assemble the full message from the stream when done.

**Q:** Correct handling of 429 (rate limit) and 529 (overloaded) responses?  
**A:** Retry with exponential backoff and jitter, bounded attempts — never a tight immediate retry loop.

**Q:** How do you make a retried side-effecting tool call safe?  
**A:** Idempotency keys, so duplicate submissions of the same operation are deduplicated server-side. Don't just remove retries.

**Q:** Graceful degradation when a data source is down?  
**A:** Return the available results and annotate the gaps or lower confidence. Don't fail hard, silently omit, or fabricate the missing data.

**Q:** Where do team-wide Claude Code standards, workflows, and tools live?  
**A:** Committed project files: CLAUDE.md (standards), .claude/skills (workflows), and .mcp.json with ${ENV} expansion (shared tools).

**Q:** Same-named skills in Claude Code: which one runs, and how do you customize privately?  
**A:** Enterprise beats personal, and personal beats project. A same-named personal skill silently shadows the team's project skill, so customize under a different name in ~/.claude/skills.

**Q:** CLAUDE.md — project vs user level?  
**A:** Team guidance goes in the committed project CLAUDE.md so everyone loads it; ~/.claude/CLAUDE.md is personal-only.

**Q:** Claude Code settings precedence, highest first?  
**A:** Managed settings, then command-line arguments, then .claude/settings.local.json, then the shared .claude/settings.json, then ~/.claude/settings.json. Org guardrails go in managed settings.

**Q:** How are Claude Code permission rules evaluated?  
**A:** Deny, then ask, then allow; the first match in that order wins. A broad deny can't be carved out by a narrower allow. Rules are enforced by Claude Code, not by CLAUDE.md instructions.

**Q:** How do you monitor Claude Code usage and cost across a team?  
**A:** Enable telemetry (CLAUDE_CODE_ENABLE_TELEMETRY=1) and export OpenTelemetry metrics and logs to your observability backend with the OTEL_* exporter settings.

## Governance, Safety & Risk Management

**Q:** Which actions need human-in-the-loop before execution?  
**A:** High-impact, irreversible ones. Auto-approve cheap reversible actions under a threshold; gate the rest before they execute.

**Q:** What does a data-residency requirement constrain?  
**A:** Where inference and storage happen. On the Claude API, inference_geo offers only "global" or "us" (US-only is 1.1x price on 4.6+ models). EU-only processing points to EU-scoped endpoints on Bedrock or Vertex AI (10% premium). Encryption in transit alone doesn't satisfy residency.

**Q:** What must an auditable decision system log?  
**A:** Inputs, prompt and model version, tool calls, and outputs per decision — enough to reconstruct and defend any decision.

**Q:** What are the three layers of the safety stack?  
**A:** Input screening, output screening, and tool-call authorization — defense in depth so one failure doesn't open the system.

**Q:** Fail closed vs fail open — which and when?  
**A:** Fail closed: on uncertainty or a failed check, deny or hold the action, especially for irreversible or high-stakes actions. The safe default is 'no'.

**Q:** Core defense against prompt injection from tools or documents?  
**A:** Treat all tool/retrieved content as untrusted data that can't become privileged instructions, and enforce least privilege on the agent's tools.

**Q:** Why isn't a single system-prompt refusal instruction enough?  
**A:** It's a single point of failure; a jailbreak or injection that defeats it defeats everything. Layer independent controls instead.

**Q:** PII data-minimization rule?  
**A:** If the task doesn't need the PII, redact or tokenize it before it reaches the model and before it is logged.

**Q:** Why not have the model judge whether its own input is a prompt injection?  
**A:** The attacker-controlled input can also manipulate the judgment. Enforcement must be external and deterministic, not in the channel the attacker controls.

**Q:** Why are BOTH input and output screening needed?  
**A:** Input screening can't see PII or unsafe content the model generates or pulls from tools at response time; output screening catches what leaves.

**Q:** Guardrail for an irreversible bulk action?  
**A:** Require explicit human approval before execution. Logging after the fact can't undo it.

**Q:** What three factors route a decision to a human?  
**A:** Confidence, reversibility, and cost of error. Irreversible, high-cost, or low-confidence actions go to a human; cheap reversible ones auto-proceed.

**Q:** In decision routing, what dominates even high confidence?  
**A:** Irreversibility and high cost of error — a confident but irreversible, high-cost action still routes to a human.

**Q:** How do you map a compliance obligation?  
**A:** To a named control that satisfies it, an accountable owner, and an evidence artifact (log, eval report, sign-off) that proves it operates.

**Q:** What does HIPAA readiness on the Claude API require and exclude?  
**A:** A signed BAA plus a HIPAA-enabled org; only eligible features (most betas aren't) and non-eligible ones return a 400. Not available on Microsoft Foundry or Claude Platform on AWS, and Claude Code isn't covered.

**Q:** Which route does Anthropic point to for FedRAMP High, IL4/IL5, or AWS as sole processor?  
**A:** Claude in Amazon Bedrock, which runs on AWS-controlled infrastructure with AWS as the operating party.

**Q:** Two core controls for fairness and transparency in consequential decisions?  
**A:** Measure outcomes across demographic slices for disparate error or selection rates, and disclose AI involvement while keeping accountable humans on consequential decisions.

**Q:** Claude on Foundry: which data zone is available?  
**A:** Hosted-on-Azure Claude deployments offer Global Standard and a US Data Zone only. Hosted-on-Anthropic deployments are Global Standard and may process data outside Azure.

## Integration

**Q:** Key model-layer observability signals in production?  
**A:** Token usage, latency percentiles, error and refusal rates, cache-hit rate, and live eval pass rate — not just host CPU/memory.

**Q:** Where do production credentials belong?  
**A:** A secret manager or injected environment variables — never committed to source control.

**Q:** Where should high-impact tool calls be authorized?  
**A:** In an external policy layer the system enforces before execution — not by the model's judgment or a prompt instruction. The model requests; the system authorizes.

**Q:** Best way to stop an over-powered tool from being misused?  
**A:** Replace it with a narrow tool that makes misuse impossible at the interface (least privilege) — better than a prompt telling the model to behave.

**Q:** How do you limit a 'confused deputy' agent?  
**A:** Least-privilege permissions plus a human gate on high-impact actions, so a hijacked agent can do very little.

**Q:** What is Contextual Retrieval?  
**A:** Prepend a short chunk-specific context to each chunk before embedding and BM25 indexing. Anthropic reports 49% fewer failed retrievals, and 67% with reranking.

**Q:** When do you add BM25 to embedding search?  
**A:** When queries contain exact identifiers (error codes, part numbers, names). Hybrid retrieval with rank fusion, then reranking, catches what semantic similarity misses.

**Q:** When should you use the tool search tool, and when should you skip it?  
**A:** Use it with 10+ tools, 10K+ tokens of definitions, multiple MCP servers, or a growing library (defer_loading on most tools). Skip it with fewer than 10 tools that every request uses.

**Q:** MCP vs direct API vs agent-to-agent: which is which?  
**A:** MCP: one standard server that many AI clients can discover and use. Direct API: a deterministic call inside your own code. Agent-to-agent: peer agents delegating whole tasks to each other.

**Q:** Why is a shared service-account token behind an MCP server an authorization gap?  
**A:** It erases user identity, so downstream systems can't enforce per-user permissions. Use OAuth-based delegated access so each call carries the user's authority.

**Q:** How do you fix capability bloat in an agent's toolset?  
**A:** Consolidate overlapping low-level tools into fewer task-level tools with clear, namespaced names and high-signal responses. Remove tools the role doesn't need.

## Evaluation, Testing & Optimization

**Q:** Batches API — what fits and what doesn't?  
**A:** Fits large, latency-tolerant, non-interactive jobs (~50% cheaper, async, custom_id correlation, ≤24h). Does NOT fit interactive tool-calling loops — no mid-request tool execution.

**Q:** Highest-impact cost lever for a large overnight non-interactive job?  
**A:** The Batches API (~50% cheaper). Prompt caching is a smaller, complementary saving, not a substitute for the batch discount.

**Q:** How do you gain confidence that safety controls hold before launch?  
**A:** Red-team them — actively try to bypass the controls (jailbreaks, injection) before adversaries do.

**Q:** What role do evals play when changing a model or architecture?  
**A:** They are the acceptance gate. A change ships only if it holds or improves the eval scores; never ship a swap that regresses the eval set.

**Q:** What should acceptance criteria actually be?  
**A:** An eval set of representative inputs with graded expected outputs and a measurable pass threshold, defined before building.

**Q:** Why not trust the model's self-reported confidence for thresholds?  
**A:** It's often poorly calibrated. Set thresholds from measured outcomes at each confidence level on eval/held-out data.

**Q:** Why use a separate held-out test set?  
**A:** To detect overfitting — a prompt tuned against the same examples it's scored on inflates the score without real generalization.

**Q:** How do you grade open-ended output at scale?  
**A:** LLM-as-judge with an explicit rubric, run independently of the generator, validated against human labels.

**Q:** Why keep online monitoring after a strong offline eval?  
**A:** Live inputs and model/data drift can degrade quality after launch. You need both offline gates and online telemetry.

**Q:** A change raises the average score but regresses a critical slice — ship it?  
**A:** No — block it. Don't let an aggregate gain hide a regression on a safety-critical subset.

**Q:** How do you make the eval gate reliable?  
**A:** Run the suite automatically in CI on every prompt/model change and block merges that fall below the threshold.

**Q:** What evidence proves a past release met its acceptance criteria?  
**A:** A retained, versioned eval report tied to that model/prompt version, with results and an accountable sign-off.

**Q:** What makes an A/B test of a prompt change trustworthy?  
**A:** Concurrent random assignment, plus a primary metric, guardrail metrics, and sample size fixed in advance. Don't stop early the moment one variant pulls ahead.

**Q:** Which Claude features are unavailable on Microsoft Foundry?  
**A:** Among others: the Message Batches API, Models API, Admin API, and Managed Agents. Hosted-on-Azure deployments also exclude code execution, Agent Skills, and the Files API. Plan batch-discount strategies accordingly.

## Stakeholder Communication & Lifecycle Management

**Q:** What should structured discovery focus on first?  
**A:** Business outcome, success metrics, constraints, data sensitivity, and which actions must stay human-controlled — not technology choices.

**Q:** How do you present architectural options to executives?  
**A:** In business terms — cost, latency, accuracy, risk — with a clear recommendation and its rationale, not a token-count deep dive.

**Q:** What makes a handoff survive your absence?  
**A:** Versioned docs, runbooks for common operations and failures, and shared config in the repo — plus the eval suite and dashboards — not one person's memory.

**Q:** Best rollout approach for a new internal tool?  
**A:** Phased: start with a pilot group, gather feedback, fix issues, then expand. Communicate the change and provide support.

**Q:** What belongs in an operational runbook?  
**A:** Common symptoms → likely causes → remediation steps → rollback procedure → escalation contacts. Make it actionable under pressure.

**Q:** How do you set stakeholder expectations responsibly?  
**A:** Communicate value and limits honestly, including where human verification is required, plus the mitigations in place. Don't overpromise.

**Q:** What preserves the 'why' behind architecture choices?  
**A:** Architecture Decision Records capturing each significant choice, the alternatives considered, and the rationale.

**Q:** How do you prioritize a backlog of AI use cases?  
**A:** By business value against effort/feasibility and risk — start with high-value, feasible, lower-risk cases to build momentum.

**Q:** How do you respond to an unrealistic SLA request?  
**A:** Propose SLOs grounded in measured percentiles (such as time-to-first-token) and composite availability across dependencies, define exactly what is measured, and document degraded modes.
