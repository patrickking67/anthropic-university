# Industry Solutions

> Anthropic University learning lane. Original, unofficial study material created by Patrick King. Not affiliated with or endorsed by Anthropic. Nothing in this lane is legal, financial, medical, or compliance advice. It teaches how to design Claude workflows that keep qualified professionals accountable. Product facts were checked against Anthropic's public pages on 2026-09-28; re-check them before a client meeting.

General-purpose deployments get a client started. Industry solutions are what make Claude part of how a legal team, a bank, or a managed service provider actually works. The partner's job is to translate a sector's procedures, data, and rules into something Claude can follow, and to wrap it in guardrails that suit the stakes.

This lane covers the building blocks (plugins and skills), goes deep on legal as a worked example, then moves through financial services, other published verticals, and professional-services operations. It ends with a guardrail checklist you can apply to any regulated workflow.

## 1. How plugins and skills package domain workflows

Domain expertise lives in people's heads, in playbooks, and in templates. To make it usable by everyone, you package it.

A **skill** is a folder with a `SKILL.md` file. It describes when to use it, the procedure to follow, the output format, and any reference material the procedure needs. It is where a client's playbook, house style, or checklist lives. Because Claude loads a skill when a task matches its description, a well-written skill turns tribal knowledge into a repeatable procedure.

A **plugin** bundles skills together with connectors and sub-agents so a team gets a ready setup for its role in one install. A few behaviors matter when you design one:

- Skills in a plugin work in web chat, the Chat tab in Claude Desktop, and Cowork.
- Hooks and sub-agents run only in Cowork. In chat they appear grayed out, which confuses users unless you tell them in advance.
- Plugins are available on all paid plans. On Enterprise, admins may restrict which plugins users can install.

**Distribution** follows the organization's shape. Owners can provision a skill for everyone from organization settings, which suits company-wide procedures. For a team-specific set, bundle the skills into a plugin and assign it to that team's group. Owners can also run a plugin marketplace, fed by manual upload or by syncing a private GitHub repository.

Anthropic publishes open-source **knowledge-work plugins** for functions such as legal, finance, sales, marketing, human resources, operations, customer support, and more. Treat them as starting points. A plugin with no client-specific positions, templates, or routing produces generic output, and generic output is not what the client is paying for. Your value is the customization.

## 2. Legal: playbook contract review and NDA triage

Legal is a good first vertical to study. The workflows are well defined, the stakes are clear, and the need for professional oversight is unambiguous. Anthropic publishes a Legal plugin for in-house teams and a set of practice-area legal plugins, and its legal solution page lists connectors to legal systems such as iManage, NetDocuments, Box, and Ironclad.

Throughout this section, remember the frame: you are designing workflows. A licensed attorney decides. The Legal plugin itself says its outputs should be reviewed by licensed attorneys.

### Contract review against a playbook

The Legal plugin's contract review reads an agreement clause by clause and compares each clause with the organization's configured negotiation playbook. It marks each clause GREEN, YELLOW, or RED and suggests redlines.

The quality of that review depends almost entirely on the playbook. A playbook entry has three parts:

1. **Standard position.** What the client normally accepts for this clause.
2. **Fallback range.** What the client will accept under pressure, and within what limits.
3. **Escalation trigger.** What must go to a senior attorney or the general counsel.

When a client says "the review is too generic," the playbook is almost always missing or thin. Building it is a real piece of partner work. Interview the general counsel and senior commercial attorneys clause by clause, write the entries in plain language, test them on a handful of recent contracts, and revise.

### NDA triage

NDAs arrive in volume and most are routine. Triage pre-screens each one and sorts it into standard approval, counsel review, or full review, so attorneys spend their time where the risk is.

Design triage as routing, not approval. Decide in advance who signs off in each bucket. Even the "standard approval" path should end with an attorney, or an attorney-approved delegate under a written policy, accepting responsibility. Never design a workflow that countersigns on the model's say-so.

### Context through connectors

Contract review improves when Claude can see precedent: prior versions, the related master agreement, the negotiation history. Connect the document management system and matter tools, scoped to the matters the user already has rights to (more on scoping in section 4).

## 3. Legal operations beyond review

Much of a legal team's week goes to operational work around the contracts. The Legal plugin includes skills for several of these workflows. Here is how to design each one responsibly.

**Briefings.** Daily briefs gather what needs attention, topic briefs research a question, and incident briefs pull together the facts when something goes wrong. Design them to separate what is known from what is open, and to recommend counsel review rather than stating conclusions.

**Compliance checks.** Given a proposed initiative, the workflow identifies applicable regulations and policies, the requirements they impose, risk areas, and approvals needed. This is a research aid for the privacy or compliance attorney, not a sign-off.

**Vendor checks.** The workflow pulls the status of agreements with a vendor from connected systems. The key design rule is honesty about coverage. If the e-signature system was offline or a repository was not connected, the output must say so. A missing source is a gap, not evidence that no agreement exists.

**Templated responses and risk assessments.** Common inquiries, such as data subject requests or litigation hold notices, can start from templates, and a structured risk assessment helps attorneys weigh an issue. Both still go to an attorney before anything is sent or decided.

**E-signature routing.** The signature-request skill runs a pre-signature checklist (entity names, exhibits, signature blocks), sets signing order, and routes the document for execution. Because sending an envelope binds the client and leaves the organization, put a human confirmation immediately before the send step.

**Time entry.** Many firms want help turning calendar, email, and document activity into draft time narratives. It is a natural drafting task. The design rule is simple: attorneys review and approve their entries before anything posts to billing. The person who bills the client stays accountable for what the bill says.

A general rule covers all of these: anything that leaves the building, binds the client, or reaches a court or regulator needs an explicit human checkpoint, and the workflow should show the reviewer exactly what to check.

## 4. Privilege, confidentiality, and attorney review

Legal clients ask about confidentiality first, and they are right to. Answer with design choices and facts, and be clear about what is not yours to answer.

**Stay in your lane.** Whether a particular use of an AI tool preserves attorney-client privilege or work-product protection is a legal question for the client's counsel. A partner can explain how the deployment handles data and can raise the question. A partner should not promise an answer.

**Use a governed account.** Anthropic states that it does not train on customer data by default on Team and Enterprise plans. Client matters belong in the firm's organization, under its administration and policies, never in someone's personal consumer account.

**Scope connectors.** Connectors should inherit each user's existing permissions and reach only the repositories and matters the workflow needs. Broad, firm-wide access raises the chance of material from one matter appearing in another.

**Build review into the workflow.** For each legal workflow, write down who reviews the output, what they check (positions, facts, citations), and how their approval is recorded. Review that lives only in a policy document tends not to happen under deadline pressure.

**Know the oversight tools.** Enterprise organizations can export audit logs and use the Compliance API, which give legal operations and security teams evidence of activity.

**Check the Usage Policy.** Anthropic's Usage Policy treats legal interpretation, legal guidance, and decisions with legal implications as high-risk use cases. When outputs are delivered directly to individuals or consumers, such as a consumer-facing legal help tool, a qualified professional must review them before they are finalized, and people must be told AI was involved. Internal drafting for attorneys, who are themselves the qualified reviewers, is a different design from a public-facing tool, and your risk review should say which one you are building.

## 5. Financial services

Anthropic's financial services material addresses banking, insurance, asset management, and fintech. Several published capabilities shape how you design solutions:

- **Office integration.** Claude works natively inside Excel and PowerPoint, reading formulas, editing slides, and processing data.
- **Data integrations.** Pre-built integrations with providers including LSEG, FactSet, S&P Global, and Morningstar bring licensed market data into analysts' work.
- **Agent templates.** Finance agent templates are published as plugins for Cowork and Claude Code, and as a cookbook for Claude Managed Agents. The source lives in Anthropic's `financial-services` repository on GitHub.
- **Source attribution.** Anthropic emphasizes that outputs are source-attributed so teams can verify them before acting.

**Choosing a surface.** An analyst working interactively fits Cowork or the Office add-ins. A developer team building tooling fits Claude Code. A bank that wants an agent running as a backend service, with no one at a desktop, should start from the Managed Agents cookbook, which is the server-hosted option.

**Traceability is the design principle.** Compliance teams in financial services want to know where every number came from. Connect licensed sources rather than having people paste figures from memory, require source attribution in outputs, and make the reviewer's job checking figures against sources, not rereading prose.

**Know which uses are high-risk.** The Usage Policy lists financial decisions, including investment advice, loan approvals, and determinations of financial eligibility or creditworthiness, as high-risk. It lists insurance underwriting, claims processing, and coverage decisions separately as high-risk too. For these, when outputs affect individuals directly, a qualified professional reviews before finalization and people are told AI was involved. In advisory workflows, the licensed professional gives the advice, and Claude prepares the work.

## 6. Other verticals Anthropic publishes

Anthropic maintains solution pages for a range of industries, including financial services, healthcare, life sciences, government, higher education and K-12, nonprofits, and customer support, and for departments such as legal and cybersecurity. Before any vertical conversation, read the current page and the customer stories on it, and only claim what Anthropic has published.

**Government.** Anthropic states that Claude for Government is available with authorizations up to FedRAMP High and IL5 through established procurement channels. When an agency names an authorization requirement, start there, and route the details through Anthropic and the agency's procurement and security teams.

**Life sciences.** Anthropic's life sciences material emphasizes working through research with full citations and audit trails. That is the pattern to design around: every claim sourced, every step traceable, from hypothesis to submission.

**Healthcare.** Healthcare decisions, medical diagnosis, patient care, therapy, mental health, and other medical guidance are high-risk uses under the Usage Policy. General wellness advice about sleep, stress, nutrition, or exercise is not. A patient-facing assistant that suggests what symptoms might mean is medical guidance, not wellness, and needs qualified clinical review and disclosure. Confirm compliance configuration, such as HIPAA eligibility, with Anthropic and the client's compliance team before any regulated health data flows. Do not infer it from a marketing page.

**Education and nonprofits.** These sectors often have tight budgets, varied technical maturity, and strong concern about student or beneficiary data. Note that academic testing, accreditation, and admissions decisions are on the high-risk list.

For any new vertical, prepare three kinds of discovery question: what data the work touches and who owns it, who is qualified to review outputs, and which regulator or auditor will eventually ask how the work was done.

## 7. Professional services and MSP operations

Service providers can use Claude on their own delivery as well as selling it. Managed service providers are a good example, because their work is procedure-heavy and spread across many client environments.

**Turn SOPs into skills.** Client onboarding runbooks, patching procedures, incident checklists, and quarterly report templates are natural skills. When every technician runs the same skill, reports come out consistent and new hires ramp faster. Distribute them through the organization's plugin marketplace so everyone gets the same reviewed version, and keep them in a repository so changes are reviewed like code.

**Connect the tool stack.** Connectors built on the Model Context Protocol let Claude work with ticketing, remote monitoring, and documentation systems. A technician can ask for a summary of overnight alerts across a client, a draft ticket note, or the relevant documentation for a device.

**Separate reads from writes.** Let Claude search, summarize, and draft freely. Require a technician's approval before anything changes a client system or a customer-facing ticket record. This one rule removes most of the risk while keeping most of the speed.

**Scope per tenant.** The largest MSP-specific risk is cross-client exposure. Give each client its own scoped connector credentials so a query about one tenant cannot surface another tenant's data. A single all-tenant credential is convenient and dangerous.

**Plan connectivity.** In Cowork, connectors reach external services through Anthropic's cloud, not through the local network. A custom connector must point to a server that is reachable over the public internet from Anthropic's IP ranges. An on-premises documentation server behind the office firewall will work in local testing and then fail in Cowork. Plan the network path early.

## 8. Guardrails for regulated work

Every vertical above shares a small set of guardrails. Use this as a checklist on any regulated workflow proposal.

**1. Classify the use case.** Is it on the Usage Policy's high-risk list? The list covers legal, healthcare, insurance, finance, employment and housing, academic testing and admissions, and automatically generated media content published for external consumption. If it is, and outputs affect individuals or consumers directly, plan for:

- **Human-in-the-loop:** a qualified professional reviews the content or decision before it is disseminated or finalized.
- **Disclosure:** people are told AI helped produce the advice, decision, or recommendation, at minimum at the start of each session.

**2. Disclose AI in any consumer-facing chatbot.** Regardless of category, consumer-facing chatbots and external interactive agents must tell users they are interacting with AI, at least at the start of each session. A privacy-policy mention does not satisfy this.

**3. Require citations.** Research and analysis outputs should cite sources for each claim and flag anything the workflow could not verify. Reviewers check the sources, not just the prose. Two model runs agreeing is not verification.

**4. Handle data deliberately.** Classify data before connecting it. Decide which classes may enter prompts, which connectors may reach them, how long outputs are kept, and which account type the work happens in.

**5. Keep evidence.** Record who ran the workflow, which sources it used, who reviewed, and what changed. On Enterprise, audit logs and the Compliance API supply the platform side of the record. The client's own systems supply the rest.

**6. Name the accountable person.** Every regulated workflow needs a named role that owns the outcome. If you cannot name one, the workflow is not ready.

## Putting it together

Industry solutions come down to two moves done well. First, package the sector's real expertise, its playbooks, templates, and procedures, into skills and plugins the client controls. Second, wrap that package in guardrails proportionate to the stakes, with a qualified human accountable at every point where work leaves the building or affects a person.

Use the official material to go further: Anthropic's solution pages for current capabilities in each sector, the open-source knowledge-work and financial-services plugin repositories for starting points, the Usage Policy for the rules, and the Claude Partner Network learning path for partner-specific enablement.
