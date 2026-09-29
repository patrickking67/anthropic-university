# Claude Certified Associate – Foundations — Study Guide

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. It teaches the publicly documented concepts the exam covers; the questions here are original and are **not** real exam items. Facts were checked against the live docs on 2026-09-28.

The Associate – Foundations exam (CCAO-F) is about using Claude well as a knowledge worker: writing prompts that get usable results, judging whether an output can be trusted, choosing the right feature and model, configuring Projects, and folding all of that into a team's workflow safely. You are not expected to write code or build integrations. You *are* expected to make sound, practical decisions, and to know when a human, or a Claude Developer or Architect, must take over.

A useful mental model runs through every domain: **set yourself up (feature, model, context) → prompt clearly → evaluate the result → integrate it responsibly → fix what underperforms.**

## Exam format

| Item | Detail |
| --- | --- |
| Exam code | CCAO-F (guide v1.0, effective July 2026) |
| Items | 60, multiple-choice and multiple-response (each item says how many to select) |
| Time | 120 minutes |
| Scoring | Scaled 100–1,000; 720 to pass. Score report shows percent correct by domain |
| Fee | $99 USD |
| Delivery | Pearson VUE, online proctored or test center |
| Validity | 12 months; renew on time with a free, non-proctored assessment |
| Prerequisites | None. No coding or API experience needed |

Multiple-response items are scored all-or-nothing, so every option you pick must be independently true.

| # | Domain | Weight |
| - | --- | --- |
| 1 | Prompting and Task Execution | 14% |
| 2 | Output Evaluation and Validation | 21% |
| 3 | Product and Model Selection | 12% |
| 4 | Workflow Integration and Solution Design | 16% |
| 5 | Configuration and Knowledge Management | 12% |
| 6 | Governance, Risk, and Responsible Use | 15% |
| 7 | Troubleshooting and Optimization | 10% |

Output Evaluation is the largest domain. Budget study time to match.

## 1. Prompting and Task Execution (14%)

Good prompts are **structured**: a clear **role**, the **task**, relevant **context**, the desired **output format**, and **examples** where helpful. A generic draft usually means a generic prompt.

- **Be specific.** Name the scope, format, and success criteria. "Make this better" fails because "better" is undefined.
- **Supply the context.** Claude knows nothing about your internal policies or data unless you provide them. A bigger model has still never seen your documents.
- **Decompose complex requests (prompt chaining).** Split a big job into single-objective steps, such as extracting themes with quotes, then drafting from the approved themes. Review each step's output before the next step builds on it.
- **Show, don't just tell.** When a format keeps coming out wrong, two or three worked input → output examples (few-shot) beat more prose. Simple tasks rarely need them.
- **Say what to do, not only what to avoid.** "Warm and conversational, like advice to a colleague" beats "don't be so formal."
- **Iterate one change at a time,** so you can tell which change helped.
- **Adapt to the task type.** Brainstorming wants breadth and deferred judgment. Analysis wants the actual data and reasoning tied to evidence. Research wants sources. Drafting wants audience, tone, and length.

## 2. Output Evaluation and Validation (21%)

Claude can be **fluently, confidently wrong**. Tone and polish say nothing about accuracy, and self-reported confidence is not evidence.

What to check:

- **Accuracy and completeness.** Verify facts against a primary source. Check completeness by tracing each original requirement to where the output meets it.
- **Hallucinations.** Authoritative-looking citations can be invented, and a real, working link still has to say what is attributed to it. Oddly precise, unsourced figures ("$4.37B in 2023") are a classic fabrication pattern.
- **Bias and inconsistency.** A skewed result, especially in decisions about people, is a signal to examine the criteria and keep human oversight. Answers that change across repeated runs can also signal fabrication.

Prompt techniques that make outputs easier to trust (from Anthropic's guidance on reducing hallucinations):

- Give Claude permission to say "I don't have enough information."
- Restrict it to the supplied documents rather than its general knowledge.
- Ask for direct quotes or citations for each claim, and have it drop any claim it cannot support.

**Verification scales with stakes and reversibility.** Low-stakes, reversible, subjective work (brainstorming names, a casual newsletter) needs a light check. **High-stakes, factual, legal, medical, financial, public, or irreversible** outputs need independent human or expert review. When you send Claude's work under your own name, you are accountable for it.

**Refine for the audience.** The same facts need different emphasis, vocabulary, and length for engineers versus executives. When comparing two drafts, score both against the same criteria: the facts in an authoritative source, and the requested audience, tone, and length. Never pick by length or by which one Claude says it prefers.

**Choose the output format:**

| Format | Use it when |
| --- | --- |
| **Artifact** | The content is substantial and self-contained (typically 15+ lines) and you will edit, iterate on, reuse, or share it: documents, decks, dashboards, small tools |
| **Inline reply** | A quick answer or short explanation that lives in the conversation |
| **Structured data** (table, CSV, JSON) | The output feeds a spreadsheet or another tool, so it needs fixed fields |

## 3. Product and Model Selection (12%)

**Surfaces.** Claude runs on the web, the desktop app, and mobile. The desktop app has **Chat, Cowork, and Code** tabs. Cowork handles multi-step tasks such as research, reports, spreadsheets, and presentations delivered as files. On Pro and Max, Cowork and chat are merging into one Claude experience. **Claude Code** works directly in a code repository. The **API** is for building Claude into software, which is Developer territory.

**Features and what each is for:**

| Feature | Best for |
| --- | --- |
| **Chat** | Quick, one-off, conversational work |
| **Projects** | Repeated work that reuses the same instructions and knowledge |
| **Web search** | Quick factual lookups, and anything newer than the training cutoff |
| **Extended thinking** | Complex reasoning that needs no web data (math, logic, analysis) |
| **Research** (paid plans) | Multi-source synthesis across the web and connected apps, returning a cited report over a few minutes |
| **Artifacts** | Substantial content you will edit, iterate on, and share |
| **File uploads** | Working from the real document (like a PDF), not a paraphrase |
| **Skills** | Specialized procedures Claude loads only when relevant (needs code execution) |

A classic distractor swaps these, for example offering extended thinking for a question that needs current facts.

**Models (current lineup):**

| Model | Choose it for |
| --- | --- |
| **Claude Opus 5.5** | The recommended starting point for most demanding work |
| **Claude Fable 5.1** | The hardest reasoning and long-horizon agentic work, when Opus 5.5 still falls short (highest cost) |
| **Claude Sonnet 5.5** | The best balance of speed and intelligence for high-volume, moderately complex work |
| **Claude Haiku 4.5** | The fastest, cheapest option for simple, high-volume tasks like classification |

The trap is running *everything* on the largest model "to be safe." **Match the model to the task.** Older models (Opus 4.x, Opus 5, Sonnet 5) are legacy.

**Context and memory.** Fable 5.1, Opus 5.5, and Sonnet 5.5 have a 1M-token context window in chat on paid plans; Haiku 4.5 has 200K. Everything earlier in a chat is context Claude may draw on, so when a long chat drifts, **restart** with a short summary. On paid plans with code execution, Claude automatically summarizes earlier messages as a chat nears the limit, which keeps that history rather than clearing it. To **persist** context, use Project knowledge and instructions. **Memory** saves short topics about you and your work; you can view, edit, pause, or reset it, and each Project has its own separate memory. Chats in a Project share its knowledge but do not see each other's full text. **Incognito** chats are not saved to history or memory and are available only outside Projects.

## 4. Workflow Integration and Solution Design (16%)

- **Requirements.** Claude is good at turning messy interview notes into draft requirements and open questions. A human confirms them with the real stakeholders.
- **Research and planning.** Use Claude to map current process steps, flag likely bottlenecks, and propose options. Never let it invent benchmarks you then present as fact.
- **What to delegate.** Delegate **well-specified, repeatable, checkable, low-risk** steps (reformatting, first drafts, templated messages). Keep **ambiguous, high-stakes, accountability-bearing** judgments with a named human owner. Whether an action can run automatically depends on **how reversible it is and how costly a mistake would be.**
- **Solution fit.** Match the investment to the need. Don't build an elaborate system for a task done by hand twice a year.
- **Know your scope.** Associates design the workflow and document requirements. Scheduled, multi-system, or API integrations are **escalated to Claude Developers and Architects.**
- **From "I use Claude" to "our workflow uses Claude."** Turn personal know-how into shared, documented assets (prompts, Project instructions, knowledge) so results are consistent and the workflow survives your absence.
- **Stakeholder communication.** Be honest about value *and* limits. Overpromising ("fully autonomous, error-free") destroys trust at the first mistake. Back value claims with before/after measures, not one anecdote.

## 5. Configuration and Knowledge Management (12%)

**Projects** are the Associate's main configuration tool. They are available on every plan (Free accounts can create up to five).

- **Project instructions** (system-level instructions) hold standing rules for role, tone, and structure. They apply to every chat in the Project. Make them specific: "be professional" is too vague to produce consistent output.
- **Project knowledge** holds reference documents Claude draws on in every chat. On paid plans, large knowledge bases automatically switch to retrieval (RAG) to fit more content.
- **Connectors** link Claude to apps such as Google Drive, Gmail, and Google Calendar. Google Docs added to a Project from Drive **stay synced** to the latest version. Claude mirrors each user's existing permissions, and on Team and Enterprise plans an Owner or Primary Owner must enable the connectors first.
- **Skills** differ from Project instructions: instructions and knowledge are always loaded in their Project, while a skill loads only when a task needs it.

Match each item to its slot: reference material goes in knowledge, behavioral rules go in instructions, one-off requests stay in a single prompt. Scope Projects tightly, with separate Projects for unrelated kinds of work. Team plans can share Projects with "Can view" or "Can edit" permissions.

The dominant failure is **stale configuration.** If knowledge holds last year's prices, Claude repeats them confidently. The root-cause fix is to **update the source** (or connect the live document), not to correct each chat. Review on a regular cadence, remove conflicting or draft versions, and consolidate private copies of instructions into **one shared Project as the source of truth.**

## 6. Governance, Risk, and Responsible Use (15%)

Responsible use starts with **data awareness: know where your input goes, how it may be used or retained, and whether policy permits it**, *before* you paste anything.

- **Never paste secrets** (passwords, live API keys, full card numbers). Asking Claude to "ignore" a key doesn't undo the exposure.
- **Regulated personal data** (PII, PHI) requires following your data policy and getting authorization first. Anonymize or remove identifiers you don't need (**data minimization**).
- **Confidential data belongs only in approved tools.** Deleting the chat afterward, or using an incognito chat, does not make an unapproved use compliant. Incognito chats are still retained for a period.
- **Data classification** (Public / Internal / Confidential / Restricted) sets handling rules; some classes may not enter certain tools at all. Personal, unvetted AI accounts route company data outside sanctioned controls.
- **Review outputs before sharing externally** so nothing sensitive from your inputs leaks.
- **Appropriate use.** Drafting from approved sources with human review is a good fit. Handing a tool final decisions about people's jobs or health, or generating deceptive content like fake reviews, is not. Anthropic's Usage Policy prohibits deceptive and harmful uses.
- **Ethics.** Outputs that affect people (reviews, hiring, eligibility) can carry bias. The accountable human verifies them against real evidence and owns the judgment.

The soundest org rule *enables safe use*: approved tools, follow the classification policy, no secrets or regulated data without authorization. A blanket ban is not the answer.

## 7. Troubleshooting and Optimization (10%)

Troubleshooting is **root-cause diagnosis, then a durable fix.** Usual suspects:

- **Generic answers →** missing context; add the specifics.
- **Format keeps coming out wrong →** give a concrete example instead of re-describing it.
- **Simple task slow or costly on a big model →** move to Sonnet 5.5 or Haiku 4.5. **Complex task too shallow on a small model →** move up to Opus 5.5 and use extended thinking.
- **Confidently out of date →** enable web search; the gap is the training cutoff.
- **Painful file-by-file pasting of a codebase →** wrong surface; Claude Code works directly in the repository.
- **Ambiguous instruction ("clean up this text") →** say exactly what to change.
- **Rambling output →** set explicit limits ("at most five bullets, one line each").

Two habits: **isolate variables** (revert and reintroduce changes one at a time), and **fix durably.** A correction you repeat every day belongs in shared Project instructions, and context you retype every chat belongs in Project knowledge or a connector-synced document.

## How to study with this bank

1. Read each domain section once, then practice that domain until you can explain *why* the keyed answer wins.
2. Spend the most time on Output Evaluation (21%) and Workflow Integration (16%).
3. Drill the flashcards for feature choice, model choice, Projects and connectors, and verification rules.
4. Practice the multiple-response items: each selected option must be true on its own.
5. Take a Quick mock exam (20 questions), review every miss by domain, then re-practice the weakest two. Sit a Full mock when Quick scores sit comfortably above 720.

Official docs to keep open: [support.claude.com](https://support.claude.com) · [platform.claude.com/docs](https://platform.claude.com/docs) · [code.claude.com/docs](https://code.claude.com/docs).
