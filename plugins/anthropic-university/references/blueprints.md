# Official exam blueprints (summary)

Facts summarized from the public Claude Certification exam guides (Version 1.0, effective July
2026). The guides are the authority and are subject to change — when a learner has a newer guide,
prefer it. Objectives below are paraphrased topic lists, not guide text. Official guides and
registration: the Claude Certification page on Anthropic's partner learning site; exams are
delivered by Pearson VUE (online proctored or test center).

## Common to all four exams

- Multiple-choice **and multiple-response** items; each item states how many responses to select.
- 120 minutes · scaled score 100–1,000 · **720 to pass** · result shows percent-correct by domain.
- Credential valid 12 months.

The banks mirror this: most items are single-answer A–D, and each track also has select-N items
(`"answer": [...]`, `"select": N`). Each bank's `domains` are the official domains below, with the
same weights, so coverage and per-domain scores map one to one.

## Associate – Foundations · CCAO-F · 60 items · $99

| # | Official domain | Weight |
| - | --- | --- |
| 1 | Prompting and Task Execution | 14% |
| 2 | Output Evaluation and Validation | 21% |
| 3 | Product and Model Selection | 12% |
| 4 | Workflow Integration and Solution Design | 16% |
| 5 | Configuration and Knowledge Management | 12% |
| 6 | Governance, Risk, and Responsible Use | 15% |
| 7 | Troubleshooting and Optimization | 10% |

Topics: decomposing and iterating prompts by task type; spotting hallucinations/bias, fact-checking,
knowing when human review is needed, choosing output formats (artifacts, inline, structured);
Projects, research mode, artifacts, Haiku/Sonnet/Opus trade-offs, context limits and when to
restart/summarize/persist; applying Claude to requirements, research, and workflow redesign;
Project instructions, knowledge, and connectors; data sensitivity, policy, ethics; diagnosing weak
prompts and optimizing workflows.

## Developer – Foundations · CCDV-F · 53 items · $125

| # | Official domain (skills) | Weight |
| - | --- | --- |
| 1 | Agents and Workflows (architecture 4.5, construction 5.3, patterns/frameworks 4.9) | 14.7% |
| 2 | Applications and Integration (requirements 3.4, life cycle 2.8, API mechanics 6.8, SWE foundations 7.4, app design 8.6, config mgmt 4.1) | 33.1% |
| 3 | Claude Code (operation 3.1) | 3.1% |
| 4 | Eval, Testing, and Debugging (debugging/error handling 2.6) | 2.6% |
| 5 | Model Selection and Optimization (LLM fundamentals 5.2, technical fundamentals 6.1, model trade-offs 2.7, cost/tokens 2.8) | 16.8% |
| 6 | Prompt and Context Engineering (context 3.8, prompting 4.6, output handling 2.6) | 11.0% |
| 7 | Security and Safety (app security 3.2, guardrails 2.3, hooks 1.0) | 8.1% |
| 8 | Tools and MCPs | 10.6% |

Topics: workflow vs. agent, supervisor/subagent hierarchies, Agent SDK and custom loops,
self-hosted vs. Anthropic-hosted agents, hooks, frameworks (e.g. Strands, LangGraph, PydanticAI);
Messages API (tools, streaming, vision, thinking, caching, batches, third-party clouds), REST/JSON/
async, version control and refactoring, session hygiene, plugins, CLAUDE.md/settings.json, model
pinning and prompt versioning; Claude Code rules/skills/commands/agents/memory, headless and auto
modes; trace analysis and failure isolation; tokens, sampling, non-determinism, extended/adaptive
thinking, effort, fast mode, prompt-cache checkpoints; context drift/bloat, compaction, subagent
isolation, structured output and defensive parsing; prompt injection, PII, least privilege,
guardrail layering; custom tools, function schemas, MCP servers, choosing built-in vs. custom vs.
Skills vs. MCP.

## Architect – Foundations · CCAR-F · 60 items · $125 · 4 of 6 scenarios

| # | Official domain | Weight |
| - | --- | --- |
| 1 | Agentic Architecture & Orchestration | 27% |
| 2 | Tool Design & MCP Integration | 18% |
| 3 | Claude Code Configuration & Workflows | 20% |
| 4 | Prompt Engineering & Structured Output | 20% |
| 5 | Context Management & Reliability | 15% |

Scenario bank (the exam presents 4 at random; each frames a set of items):

1. Customer support resolution agent (Agent SDK + custom MCP tools, escalation) — D1, D2, D5
2. Code generation with Claude Code (slash commands, CLAUDE.md, plan vs. direct) — D3, D5
3. Multi-agent research system (coordinator + specialist subagents, citations) — D1, D2, D5
4. Developer productivity with the Agent SDK (built-in tools + MCP) — D2, D3, D1
5. Claude Code in CI/CD (automated review, tests, low false positives) — D3, D4
6. Structured data extraction (JSON schema validation, edge cases) — D4, D5

Task statements span: agentic loops and termination; coordinator–subagent orchestration, context
passing and spawning; enforced multi-step handoffs; SDK hooks; decomposition; session resume/fork;
tool descriptions, structured MCP errors, tool distribution, MCP in Claude Code, built-in tool
choice; CLAUDE.md hierarchy, commands/skills, path-scoped rules, plan mode, iterative refinement,
CI/CD; explicit criteria, few-shot, schema-enforced output, validate-retry loops, batch strategy,
multi-pass review; context preservation, escalation/ambiguity, error propagation, large-codebase
exploration, human review and confidence calibration, provenance.

`mock-exam` for this track should draw **4 of the 6 scenarios at random** and group items under
each scenario header, matching the real structure.

## Architect – Professional · CCAR-P · 63 items · $175

| # | Official domain | Weight |
| - | --- | --- |
| 1 | Solution Design & Architecture | 17% |
| 2 | Claude Models, Prompting & Context Engineering | 13% |
| 3 | Integration | 19% |
| 4 | Evaluation, Testing & Optimization | 16% |
| 5 | Governance, Safety & Risk Management | 14% |
| 6 | Stakeholder Communication & Lifecycle Management | 14% |
| 7 | Developer Productivity & Operational Enablement | 7% |

Topics: business problem → architecture, workflow vs. agentic vs. augmented LLM, multi-agent
orchestration, value pillars; model trade-offs, system prompts and templates, CoT/few-shot, context
and token optimization, reuse via caching/modular prompts/Skills; capability bloat, authn/authz gaps,
accuracy–latency trade-offs, observability, RAG chunking/indexing and retrieval strategy, MCP vs.
API/CLI vs. agent-to-agent, progressive discovery vs. monolithic context; eval metrics and datasets,
A/B testing, diagnosing prompt failure/hallucination/model mismatch; guardrails, HITL, GDPR/HIPAA/
FedRAMP, bias and transparency; discovery, trade-off communication, SLAs, documentation, lifecycle
support; team Claude Code setup and AI-assisted developer workflows.

## Using this file

- `study-plan`: allocate time by official weight.
- `mock-exam`: default length = official item count when the user asks for a "full" mock; sample
  per domain by weight; report per domain.
- `quiz-me` / `flashcards`: show the domain name and number in headers.
