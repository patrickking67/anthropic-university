# Enterprise Solutioning with Claude

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Position, scope, and propose Claude offerings: map customer signals to the right product and plan, run structured discovery, frame value, answer objections with verified facts, and shape a statement of work.**

Group: partner · Level: intermediate · ~5 h · For: Partner account leads, solution consultants, and engagement managers who sell and scope Claude for organizations.

## Take alongside

- [Claude Partner Network learning path (partner login required)](https://anthropic-partners.skilljar.com/page/claude-partner-network-learning-path) — Claude Partner Network
- [CPN Connect on-demand library (partner login required)](https://anthropic-partners.skilljar.com/page/cpnc-on-demand-library) — Claude Partner Network
- [Deploying Claude Enterprise with Confidence](https://anthropic.skilljar.com/deploying-claude-enterprise-with-confidence) — Anthropic Academy
- [Claude 101](https://anthropic.skilljar.com/claude-101) — Anthropic Academy
- [Claude with Amazon Bedrock](https://anthropic.skilljar.com/claude-in-amazon-bedrock) — Anthropic Academy
- [Claude on Google Cloud](https://anthropic.skilljar.com/claude-with-google-vertex) — Anthropic Academy

## The Claude product map

The ways an organization can buy and use Claude, and the first question that sorts a client into the right one.

**You will be able to:**

- Distinguish the Claude app plans from the developer platform and cloud platforms
- Describe what each app plan adds at a high level
- Place Claude Code in the product map
- Ask the sorting question that separates workforce use from product builds

**Key points**

- The Claude apps (web, desktop, mobile) are sold as plans: Free, Pro, and Max for individuals, and Team and Enterprise for organizations. Check claude.com/pricing for current prices before quoting.
- Pro includes Claude Code, web search, Projects, and memory. Max builds on Pro with 5x or 20x more usage and higher output limits.
- Team offers Standard and Premium seats and includes Claude Code and Cowork, enterprise search, central billing and administration, single sign-on, and connector controls.
- Enterprise includes everything in Team plus governance controls such as role-based access, SCIM, audit logs, the Compliance API, and custom data retention. Its seat fee covers access, and usage is billed at API rates.
- Claude Code is Anthropic's agentic coding tool, available in the terminal, IDEs, the desktop app, and the web. Organizations get it through app seats or through API keys.
- The Claude Developer Platform (API and Console) is for building Claude into the client's own products and processes, paid per token.
- Claude is also available through Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry, which lets clients buy and run it inside the cloud accounts and governance they already use. Feature availability can differ by platform, so check the platform page.
- The first sorting question: is the client equipping employees, building Claude into products and workflows, or both? Many enterprise accounts need both.

**Practice:** Client conversation: a 900-person manufacturer says 'we want Claude' and nothing more. Write the five questions you would ask in the first fifteen minutes to decide between app seats, the developer platform, a cloud platform, or a mix, and note which answer would push you toward each.

**Read:** [Claude pricing and plans](https://claude.com/pricing) · [Claude Code overview](https://code.claude.com/docs/en/overview) · [Claude on Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock)

<details><summary>Flashcards</summary>

**Q:** Which Claude plans are for organizations?  
**A:** Team (Standard and Premium seats) and Enterprise. Free, Pro, and Max are individual plans.

**Q:** When is the Claude Developer Platform the right fit?  
**A:** When the client is building Claude into its own products or processes and paying per token, rather than equipping employees with the apps.

**Q:** Why would a client buy Claude through Bedrock, Vertex AI, or Foundry?  
**A:** To use Claude inside the cloud account, governance, and spending commitment they already have.

**Q:** Where does Claude Code fit in the product map?  
**A:** Anthropic's agentic coding tool, included with Pro, Max, Team, and Enterprise seats and also usable with API keys.

</details>

### Check your understanding

*Study area: Product map · easy*

A 40-person marketing agency wants every employee to use Claude for drafting and research, with central billing and single sign-on. They have no plans to build software. Which offering fits first?

- **A.** A Claude Developer Platform account with API keys shared among staff
- **B.** Claude Team, with a seat for each employee and central administration
- **C.** Individual Max subscriptions that each employee expenses monthly
- **D.** Claude through Amazon Bedrock with a custom-built chat interface

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Team is the organization plan for equipping employees with the Claude apps, and it includes central billing and administration and SSO. Nothing here requires building software or Enterprise governance.

_Why a tempting wrong answer misses:_ D could work technically, but it means building and maintaining an application the client does not need.

Reference: https://claude.com/pricing

</details>

---

*Study area: Product map · medium*

A software company wants to add a Claude-powered feature to its own customer-facing product and pay by usage. Which offering is designed for this?

- **A.** Claude Enterprise seats purchased for each of the company's customers
- **B.** Claude Max, because it provides the highest individual usage limits
- **C.** The Claude Developer Platform (Claude API), billed per token
- **D.** Claude Team Premium seats assigned to the product's service account

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Building Claude into a product is what the Claude API is for: the application calls the API and the company pays per token. App plans are for people using the Claude apps.

_Why a tempting wrong answer misses:_ B and D stretch individual or seat-based app plans into a product backend, which is not what those plans are for.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

*Study area: Product map · medium*

A client has a large committed-spend agreement with its cloud provider and wants Claude usage to count against it, inside its existing cloud governance. What should you explore?

- **A.** Using Claude through that cloud's platform: Amazon Bedrock, Vertex AI, or Microsoft Foundry
- **B.** Buying Claude Pro seats on a corporate card and filing them as cloud expenses
- **C.** Self-hosting downloaded Claude model weights on the client's cloud instances
- **D.** Routing Claude API calls through a VPN so they bill to the cloud account

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Claude is offered on Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry, so a client can procure and govern it through the cloud relationship it already has.

_Why a tempting wrong answer misses:_ C sounds like full control, but Claude's weights are not distributed for self-hosting; cloud platforms host the models for the client.

Reference: https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock

</details>

---

## What Claude Enterprise adds

The identity, visibility, data governance, and security capabilities that separate Enterprise from Team, stated precisely.

**You will be able to:**

- List the governance capabilities Enterprise adds over Team
- Explain SCIM, audit logs, and the Compliance API in business terms
- Describe Enterprise's data retention and encryption options
- Explain the Enterprise pricing model accurately

**Key points**

- Identity: single sign-on is available on both Team and Enterprise. SCIM provisioning (automatic user creation and removal from the identity provider) and role-based access control are Enterprise capabilities.
- Visibility: audit logs capture user actions, system events, and data access. The Compliance API gives programmatic access to activity logs, chats, and file content, filterable by user and time range.
- Data governance: Enterprise offers custom data retention controls (set by a Primary Owner or Owner), customer-managed encryption keys, and a US-only inference option.
- Security posture: Anthropic lists SOC 2, ISO 27001, GDPR, and CCPA compliance, a HIPAA-ready offering, and IP allowlisting for Enterprise. Send reviewers to the Trust Center for reports.
- Commercial products (Team, Enterprise, and the API) do not use customer inputs or outputs to train models by default.
- Pricing model: the Enterprise seat fee covers platform access only. Usage across Claude, Claude Code, and Cowork is billed at standard API rates, with no per-seat usage limits and no included token allowance.
- Know the edges before you promise: for example, Compliance API coverage excludes some surfaces, such as sessions run on Amazon Bedrock or Google Vertex AI. Check the current support article.

**Practice:** Client conversation: a hospital group's CISO sends a checklist: SSO, automatic deprovisioning, a record of who accessed what, a seven-year retention rule, and encryption keys they control. For each item, name the Claude capability and plan that covers it and the public page you would cite, and flag anything you would confirm with Anthropic before answering in writing.

**Read:** [What is the Enterprise plan?](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan) · [Access the Compliance API](https://support.claude.com/en/articles/13015708-access-the-compliance-api) · [Custom data retention controls](https://support.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans)

<details><summary>Flashcards</summary>

**Q:** SSO: Team or Enterprise?  
**A:** Both. Single sign-on is included on Team and Enterprise, so it is not an upgrade reason by itself.

**Q:** What does SCIM do?  
**A:** Automatically creates, updates, and removes Claude users from the client's identity provider. It is an Enterprise capability.

**Q:** What is the Compliance API?  
**A:** Enterprise programmatic access to activity logs, chats, and file content, filterable by user and time, for monitoring and eDiscovery.

**Q:** How is Claude Enterprise priced?  
**A:** A seat fee for platform access, plus usage across Claude, Claude Code, and Cowork billed at API rates. No per-seat usage limits or included token allowance.

</details>

### Check your understanding

*Study area: Claude Enterprise capabilities · medium*

A client's IT team adds and removes Claude users by hand and has missed several departures. Which Claude Enterprise capability addresses this most directly?

- **A.** Custom data retention controls
- **B.** The Compliance API activity feed
- **C.** IP allowlisting for the organization
- **D.** SCIM provisioning from the identity provider

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

SCIM keeps Claude accounts in sync with the identity provider, so people removed there are deprovisioned in Claude automatically. It is an Enterprise capability.

_Why a tempting wrong answer misses:_ B would let you detect that a leaver still had access, but it does not remove the account; SCIM prevents the gap.

Reference: https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan

</details>

---

*Study area: Claude Enterprise capabilities · hard*

A client on Claude Team says, 'We need SSO, so we have to move to Enterprise.' What is the accurate response?

- **A.** Correct; single sign-on is only available on the Enterprise plan.
- **B.** Team already includes SSO; probe for needs like SCIM, audit logs, or retention.
- **C.** SSO requires the Claude API, so they should build a custom front end first.
- **D.** SSO is offered only through cloud platforms such as Bedrock or Vertex AI.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Anthropic's pricing page lists single sign-on for Team. A real Enterprise conversation rests on needs Team does not cover, such as SCIM, audit logs, the Compliance API, or custom retention.

_Why a tempting wrong answer misses:_ A is a common misconception. Selling an upgrade on it damages credibility when the client's IT team checks the plan page.

Reference: https://claude.com/pricing

</details>

---

*Study area: Claude Enterprise capabilities · medium*

A financial-services client's security team asks which controls Claude Enterprise adds beyond Team. Which THREE are Enterprise capabilities according to Anthropic's plan documentation? (Select 3.)

- **A.** Audit logs of user actions, system events, and data access
- **B.** On-premises deployment of Claude model weights in their data center
- **C.** Compliance API access to activity logs, chats, and file content
- **D.** Fine-tuning Claude on the client's internal documents through the app
- **E.** Custom data retention controls for chats and projects

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C, E**

Anthropic's Enterprise plan article lists audit logs, the Compliance API, and custom data retention controls among the security features Enterprise adds on top of Team.

_Why a tempting wrong answer misses:_ On-premises weights and in-app fine-tuning are not part of any Claude plan. Claiming them would fail the security team's verification.

Reference: https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan

</details>

---

## Hearing customer signals and mapping them to features

How to turn what clients say into the right capability and a justified upgrade path, without leading with features.

**You will be able to:**

- Translate common client statements into specific capabilities
- Identify genuine upgrade triggers from Team to Enterprise
- Avoid upgrade arguments built on features the current plan already has
- Confirm a mapped need with a follow-up question before proposing

**Key points**

- 'IT adds and removes users by hand and misses leavers' points to SCIM provisioning.
- 'Legal must produce conversations for litigation and delete them on a schedule' points to the Compliance API and custom data retention.
- 'Security wants to know who did what, and when' points to audit logs and, for programmatic monitoring, the Compliance API.
- 'Staff use personal accounts and finance cannot see the spend' points to an organization plan with central billing, administration, and SSO.
- 'Our AI spend has to run through our cloud commitment' points to Amazon Bedrock, Google Cloud Vertex AI, or Microsoft Foundry.
- A sound upgrade trigger is a governance or scale need the current plan cannot meet. SSO on its own is not a reason to move from Team to Enterprise, because Team already includes it.
- Separate the feature a client names from the outcome they need. Restate the need, confirm it, then propose.

**Practice:** Client conversation: in a quarterly review, a 150-seat Team customer mentions (1) a recent offboarding miss, (2) an upcoming audit, and (3) developers asking for Claude Code. For each remark, write the follow-up question you would ask and the capability it might map to, then decide whether the combination justifies an Enterprise conversation.

**Read:** [Claude pricing and plans](https://claude.com/pricing) · [What is the Enterprise plan?](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan) · [Claude Enterprise overview](https://claude.com/solutions/enterprise)

<details><summary>Flashcards</summary>

**Q:** Signal: 'We keep missing leavers when we offboard.'  
**A:** SCIM provisioning (Enterprise).

**Q:** Signal: 'Legal needs to produce and then delete conversations on a schedule.'  
**A:** Compliance API plus custom data retention controls (Enterprise).

**Q:** What makes a real Team-to-Enterprise upgrade trigger?  
**A:** A governance or scale need Team cannot meet, such as SCIM, audit logs, the Compliance API, or custom retention. Not seat count or SSO alone.

</details>

### Check your understanding

*Study area: Signals and upgrade triggers · medium*

A general counsel says, 'If we're sued, we must be able to produce employees' AI conversations, and we must delete them after seven years.' Which capabilities should you map this to?

- **A.** Single sign-on and domain capture
- **B.** Connectors and enterprise search
- **C.** Compliance API and custom data retention controls
- **D.** Claude Code and usage analytics

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The Compliance API gives programmatic access to chats and activity for eDiscovery, and custom retention controls let the organization set how long data is kept. Both are Enterprise capabilities.

_Why a tempting wrong answer misses:_ A controls who can sign in; it does nothing to produce or expire conversation records.

Reference: https://support.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans

</details>

---

*Study area: Signals and upgrade triggers · medium*

A client says employees are already using personal Claude accounts for work, and finance cannot see total spend. What does this signal most directly suggest?

- **A.** Consolidating onto an organization plan with central billing and SSO
- **B.** Blocking Claude at the firewall until a formal AI policy is written
- **C.** Asking each employee to upgrade from Pro to Max for higher limits
- **D.** Building an internal chat tool on the API before any rollout starts

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Shadow use on personal accounts is a governance and visibility problem. An organization plan brings users under central billing, administration, and sign-on, which addresses both the risk and the spend visibility.

_Why a tempting wrong answer misses:_ B suppresses demand the client has already proven exists, and usually pushes use further out of sight.

Reference: https://claude.com/pricing

</details>

---

*Study area: Signals and upgrade triggers · hard*

A 60-seat Team customer asks about moving to Enterprise. Which reason is the strongest upgrade trigger to validate?

- **A.** Their seat count has grown past the size of a typical small team.
- **B.** They want employees to have access to Claude Code and Cowork.
- **C.** They want single sign-on through their existing identity provider.
- **D.** Their security team needs audit logs and deprovisioning through SCIM.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Audit logs and SCIM are Enterprise capabilities that Team does not include, so a verified need for them is a genuine trigger.

_Why a tempting wrong answer misses:_ B and C are already included in Team, and seat count alone does not create a need Team cannot meet.

Reference: https://claude.com/pricing

</details>

---

## Structured discovery

A repeatable way to learn the client's problem, baseline, constraints, and decision process before proposing anything.

**You will be able to:**

- Plan a discovery conversation around problem, baseline, constraints, and decision process
- Move from open questions to quantified answers
- Map the stakeholders who shape an AI purchase
- Write a discovery summary the client can confirm

**Key points**

- Cover six areas: the business problem and its owner, how the work is done today, volumes and baseline metrics, data sources and systems, constraints (security, compliance, residency, procurement), and the decision process and timeline.
- Ask open questions first ('walk me through last Tuesday's close'), then quantify ('how many, how long, how often, at what cost').
- Map stakeholders early: the budget owner, the technical owner, security and legal reviewers, and an end-user champion. Each needs a different conversation.
- Capture baselines before any pilot. Without a baseline, no improvement can be measured or credited.
- Look for disqualifiers early, such as a rule that no data may leave the client's environment or a requirement for guaranteed identical outputs.
- Close with a short written summary the client confirms: problem, success criteria, scope boundaries, open risks, and the next step.

**Practice:** Client conversation: role-play a 30-minute discovery call with an accounts-payable director who says invoice exceptions 'eat the team alive.' Write your question plan (at least ten questions across the six areas), then draft the one-page discovery summary you would send afterward.

**Read:** [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) · [Claude Enterprise overview](https://claude.com/solutions/enterprise) · [Claude pricing and plans](https://claude.com/pricing)

<details><summary>Flashcards</summary>

**Q:** Six areas of structured discovery?  
**A:** Problem and owner, current process, volumes and baselines, data and systems, constraints, and decision process and timeline.

**Q:** Why capture a baseline before a pilot?  
**A:** Without it, no improvement can be measured or credited to the solution.

**Q:** What goes in a discovery summary?  
**A:** Problem, success criteria, scope boundaries, open risks, and the next step, confirmed by the client in writing.

</details>

### Check your understanding

*Study area: Structured discovery · easy*

Why should a partner capture baseline metrics during discovery, before any pilot starts?

- **A.** Anthropic requires baseline data before it will issue Enterprise seats.
- **B.** Without a baseline, the pilot's improvement cannot be measured or credited.
- **C.** Baselines determine which model tier Claude will automatically select.
- **D.** Baseline metrics are needed to configure the organization's SSO settings.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Value is a comparison between before and after. If the current cycle time, error rate, or cost per case is not recorded first, the pilot's results cannot be quantified or attributed.

_Why a tempting wrong answer misses:_ A and D invent vendor or configuration requirements; baselines matter for the business case, not for provisioning.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

*Study area: Structured discovery · medium*

In a first discovery meeting, a VP of operations says, 'We want AI everywhere.' What is the best next move?

- **A.** Present the full product catalog so the VP can choose what fits.
- **B.** Propose an Enterprise rollout for every employee to maximize impact.
- **C.** Ask them to walk through one painful recent process, then quantify it.
- **D.** Schedule an API demo for the VP's engineers later in the week.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Broad ambition needs to be grounded in a specific, measurable problem. Asking for a concrete recent example, then quantifying volume, time, and cost, turns enthusiasm into a scoped use case with a baseline.

_Why a tempting wrong answer misses:_ B matches the VP's energy, but proposing a large rollout before knowing the problem, owner, or baseline invites a stalled deal or a failed deployment.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

*Study area: Structured discovery · medium*

Which TWO items belong in the written discovery summary you send the client to confirm? (Select 2.)

- **A.** A guarantee that the solution will not produce factual errors
- **B.** The agreed success criteria and how each will be measured
- **C.** The partner's internal margin on the proposed services
- **D.** The scope boundaries, including what is explicitly out of scope
- **E.** A commitment to use the largest model for every task

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, D**

Success criteria and scope boundaries are what the client must agree to before a proposal: they define what 'done' and 'not included' mean and prevent later disputes.

_Why a tempting wrong answer misses:_ A promises what no one can deliver, C is internal information, and E fixes a design choice before evals have been run.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

## Business value and ROI framing

How to connect a use case to value the client already measures, and how to present ROI that survives a CFO's questions.

**You will be able to:**

- Tie each use case to one primary value type and an existing metric
- Build a simple ROI model with stated assumptions
- Design a pilot that produces credible evidence
- Present value as ranges rather than single-point promises

**Key points**

- Four common kinds of value: time returned to people, quality and consistency of work, capacity or speed to serve customers, and reduced risk or compliance effort. Pick one primary kind per use case.
- Anchor value to a metric the client already tracks, such as cycle time, backlog, error rate, or cost per case, so results are credible to them.
- A simple ROI model: (value of time saved or revenue enabled + avoided costs - total cost) / total cost. Total cost includes seats, usage at API rates, integration work, and change management.
- Use conservative adoption and realization assumptions. Hours saved only count if the client values or redeploys them.
- Design pilots to produce evidence: a narrow scope, a baseline, a fixed measurement window, and success thresholds agreed before the pilot starts.
- Present ranges with the assumptions visible. Measured deltas from a pilot persuade finance far more than benchmark scores or anecdotes.

**Practice:** Client conversation: a claims team handles 2,000 claims a month, and a pilot cut drafting time by 12 minutes per claim. Build a one-slide ROI view for the CFO with a low and high case, list every assumption, and include all solution costs. Then write the two questions you expect the CFO to ask and your answers.

**Read:** [Claude pricing and plans](https://claude.com/pricing) · [API pricing](https://platform.claude.com/docs/en/about-claude/pricing) · [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)

<details><summary>Flashcards</summary>

**Q:** Four common kinds of AI value?  
**A:** Time returned, quality and consistency, capacity or speed to serve, and reduced risk or compliance effort.

**Q:** What belongs in total cost for an ROI model?  
**A:** Seats, usage at API rates, integration work, and change management, not just licenses.

**Q:** How should you present projected value?  
**A:** As a range with visible assumptions, backed by measured pilot results.

</details>

### Check your understanding

*Study area: Value and ROI · medium*

A claims team handles 2,000 claims a month, and a pilot cut drafting time by 12 minutes per claim. How should you present the value to the CFO?

- **A.** Claim a 100% productivity gain, since the drafting step is now automated.
- **B.** Convert time saved to cost with stated assumptions, net of all solution costs.
- **C.** Lead with benchmark scores showing the model outperforms its competitors.
- **D.** Report the number of prompts employees sent during the pilot period.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

2,000 claims at 12 minutes is 400 hours a month. Converting that to cost with explicit assumptions (loaded rate, realization, adoption) and subtracting seats, usage, and services gives a figure a CFO can test.

_Why a tempting wrong answer misses:_ D is an activity metric. Usage volume shows adoption, not financial value.

Reference: https://claude.com/pricing

</details>

---

*Study area: Value and ROI · hard*

A sponsor wants the business case to promise '40% productivity for every employee,' based on one enthusiastic team. What is the better approach?

- **A.** Present a conservative range with explicit adoption assumptions and pilot data.
- **B.** Use the 40% figure, since optimistic projections help secure budget quickly.
- **C.** Leave out numbers entirely and rely on testimonials from the enthusiastic team.
- **D.** Swap in a published benchmark from an unrelated industry to seem neutral.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

One team's result does not generalize to every role. A range with visible assumptions, anchored in measured pilot data, survives finance scrutiny and protects the partner's credibility at renewal.

_Why a tempting wrong answer misses:_ B may win a quick approval, but an unmet promise becomes the headline at the first review.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

## Handling objections with verified facts

A method for answering security, data-use, accuracy, and cost objections with facts you can cite, and without overclaiming.

**You will be able to:**

- Apply a consistent method to any objection
- Answer data-use and training questions accurately
- Respond to accuracy concerns without promising zero errors
- Reframe cost objections around cost per completed task

**Key points**

- Method: acknowledge the concern, ask what is behind it, answer with a fact and a public source, and confirm the concern is resolved. If you cannot verify something, say you will confirm it in writing.
- Data use: Anthropic does not use inputs or outputs from commercial products to train models by default. Exceptions are when a customer opts in, or a user submits feedback such as a thumbs rating.
- Security: point reviewers to Anthropic's Trust Center for compliance reports, and to Enterprise controls such as SSO, SCIM, audit logs, role-based access, IP allowlisting, and customer-managed keys.
- Retention: Enterprise supports custom retention periods. For the API, Anthropic offers zero data retention and HIPAA-readiness arrangements for eligible organizations.
- Accuracy: acknowledge that models can produce errors, then describe the mitigations (grounding, citations, evals, and human review for high-stakes outputs). Never promise error-free output.
- Cost: move the conversation from price per seat or token to cost per completed task compared with today, and show the levers available (model tier, effort, caching, batch).

**Practice:** Client conversation: prepare answers to four objections from a bank's steering committee: 'You'll train on our data,' 'Where's your SOC 2?', 'It made up a number in the demo,' and 'Per-seat plus usage is too expensive.' For each, write a two-to-three sentence answer and the public page you would cite.

**Read:** [Claude Enterprise overview (data use and security)](https://claude.com/solutions/enterprise) · [Anthropic Trust Center](https://trust.anthropic.com) · [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)

<details><summary>Flashcards</summary>

**Q:** Does Anthropic train on Enterprise customers' chats?  
**A:** Not by default. Commercial inputs and outputs are not used for training unless the customer opts in or a user submits feedback.

**Q:** Four steps for handling any objection?  
**A:** Acknowledge, clarify what is behind it, answer with a fact and a source, confirm it is resolved.

**Q:** How do you answer 'It made something up'?  
**A:** Acknowledge it, explain grounding, citations, evals, and where human review stays. Never promise zero errors.

</details>

### Check your understanding

*Study area: Objection handling · medium*

A client's CISO asks, 'Will Anthropic train its models on our employees' chats?' The client would be on Claude Enterprise. What is the accurate answer?

- **A.** Yes, but only on anonymized chats, and only after a 30-day holding period.
- **B.** No, because Enterprise chats are deleted as soon as each response is sent.
- **C.** Yes, unless an administrator purchases a separate zero-retention add-on.
- **D.** Not by default; data is used only if the customer opts in or sends feedback.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Anthropic states that inputs and outputs from commercial products are not used to train models by default. The exceptions are an explicit customer opt-in or feedback a user chooses to submit.

_Why a tempting wrong answer misses:_ B overcorrects. Enterprise data is retained according to the organization's retention settings, not deleted immediately.

Reference: https://claude.com/solutions/enterprise

</details>

---

*Study area: Objection handling · medium*

A COO objects, 'It made up a number in the demo, so we can't trust it.' Which response is best?

- **A.** Promise that the production version will not make errors once configured.
- **B.** Explain that the demo ran on a free plan, and paid plans do not hallucinate.
- **C.** Acknowledge it, then explain grounding, citations, evals, and human review.
- **D.** Suggest raising effort to max so the model is always certain of its numbers.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Accuracy objections are answered with honesty and mitigations: acknowledge the risk, show how grounding and citations reduce it, how evals measure it, and where human review remains for high-stakes outputs.

_Why a tempting wrong answer misses:_ A and B make claims no plan or configuration can support. Hallucination risk is reduced by design, not removed by a purchase.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations

</details>

---

*Study area: Objection handling · hard*

A procurement lead says the Enterprise model of seat fees plus usage at API rates 'looks expensive.' What is the strongest reframing?

- **A.** Compare cost per completed task with today's cost of doing that task.
- **B.** Offer to discount Anthropic's fees out of the partner's own services margin.
- **C.** Point out that the most capable model is always the cheapest per token.
- **D.** Recommend buying fewer seats and having employees share their logins.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Price only means something next to value. Showing cost per completed task against the current cost, plus the levers available to tune it, moves the conversation from sticker price to economics.

_Why a tempting wrong answer misses:_ B erodes the partner's business without addressing the concern, and D breaks identity and audit controls.

Reference: https://platform.claude.com/docs/en/about-claude/pricing

</details>

---

*Study area: Objection handling · medium*

A hospital system's security reviewer asks for evidence of Anthropic's security and compliance posture. Which TWO responses are appropriate? (Select 2.)

- **A.** Tell them any Claude plan is automatically HIPAA compliant for patient data.
- **B.** Share your personal impression of how Anthropic runs its data centers.
- **C.** Direct them to Anthropic's Trust Center for reports such as SOC 2 and ISO 27001.
- **D.** State that Claude runs entirely inside the hospital's own network by default.
- **E.** Explain that Enterprise has a HIPAA-ready offering, and confirm scope with Anthropic.

<details><summary>Answer &amp; explanation</summary>

**Correct answers: C, E**

The Trust Center is the authoritative place for compliance documentation, and Anthropic lists a HIPAA-ready offering for Enterprise. Confirming scope avoids overstating what applies to this client.

_Why a tempting wrong answer misses:_ A overclaims: HIPAA readiness is a specific offering with conditions, not a property of every plan.

Reference: https://claude.com/solutions/enterprise

</details>

---

## Proposals and statements of work

How to turn discovery into a proposal and a statement of work with measurable acceptance criteria and honest AI-specific assumptions.

**You will be able to:**

- Structure a proposal around the client's confirmed problem and success criteria
- List the essential sections of a statement of work
- Write measurable acceptance criteria for an AI deliverable
- State AI-specific assumptions and dependencies clearly

**Key points**

- A strong proposal restates the problem in the client's words, the agreed success criteria, the recommended offering, and why it fits better than the alternatives.
- SOW essentials: objectives, in-scope and out-of-scope items, deliverables with acceptance criteria, assumptions and client dependencies, timeline and milestones, roles, change control, and commercial terms.
- Phase the work (for example, pilot, then production rollout, then scale and optimize) and tie each phase gate to measured results rather than dates alone.
- Make acceptance criteria measurable, such as a pass rate against a rubric on a signed-off test set, not 'the assistant works well.'
- State AI-specific assumptions: outputs are probabilistic, high-stakes outputs get human review, model versions and prices can change, and the client supplies timely access to data and reviewers.
- Show Anthropic licensing or usage separately from services fees, so the client sees recurring platform cost apart from one-time delivery work.

**Practice:** Client conversation: using the accounts-payable discovery summary from module 4, draft the scope, three deliverables with measurable acceptance criteria, five assumptions (at least two AI-specific), and the phase gates for a 10-week engagement.

**Read:** [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) · [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) · [Claude pricing and plans](https://claude.com/pricing)

<details><summary>Flashcards</summary>

**Q:** What makes an AI acceptance criterion measurable?  
**A:** A pass rate against an agreed rubric on a signed-off test set, rather than a subjective judgment.

**Q:** Two AI-specific SOW assumptions?  
**A:** Outputs are probabilistic and high-stakes outputs get human review; model versions and prices can change during the engagement.

**Q:** Why separate licensing from services fees?  
**A:** So the client sees recurring platform cost apart from one-time delivery work.

</details>

### Check your understanding

*Study area: Proposals and SOWs · medium*

Which acceptance criterion is best suited to a statement of work for a contract-summary assistant?

- **A.** The assistant produces summaries that stakeholders find generally helpful.
- **B.** The assistant uses the most capable Claude model available at go-live.
- **C.** The client's sponsor approves the final demo in the handover meeting.
- **D.** Summaries meet the agreed rubric on at least 90% of a signed-off test set.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A measurable criterion names the test set, the rubric, and the threshold in advance, so both parties can tell objectively whether the deliverable is accepted.

_Why a tempting wrong answer misses:_ C feels decisive, but a single demo approval is subjective and does not show the assistant performs across real cases.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

*Study area: Proposals and SOWs · hard*

A client asks why your proposal lists Anthropic licensing and usage separately from your services fees. What is the best reason?

- **A.** Anthropic requires partners to fold services fees into license costs.
- **B.** It shows recurring platform cost apart from one-time delivery work.
- **C.** Services fees are always tax-exempt when itemized on their own line.
- **D.** Separate lines let the partner change license prices after signing.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Platform cost recurs and scales with seats and usage; delivery work is bounded by the SOW. Separating them lets the client budget each correctly and see what continues after the engagement ends.

_Why a tempting wrong answer misses:_ C and D invent tax and contract effects; itemizing is about transparency, not changing terms.

Reference: https://claude.com/pricing

</details>

---
