# Industry Solutions

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Design Claude solutions for specific functions and regulated industries, from legal workflows to financial services, with the guardrails each one needs.**

Group: partner · Level: intermediate · ~6 h · For: Partner solution architects, consultants, and MSP practice leads who package Claude for legal teams, financial institutions, and other sector clients.

## Take alongside

- [Claude Partner Network learning path](https://anthropic-partners.skilljar.com/page/claude-partner-network-learning-path) — Claude Partner Network
- [Claude 101](https://academy.claude.com/courses/claude-101) — Anthropic Academy
- [Introduction to agent skills](https://academy.claude.com/courses/introduction-to-agent-skills) — Anthropic Academy
- [AI Fluency: Framework and foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations) — Anthropic Academy
- [Claude for Legal](https://claude.com/solutions/legal) — Anthropic
- [Claude for Financial Services](https://claude.com/solutions/financial-services) — Anthropic
- [Knowledge-work plugins (open source)](https://github.com/anthropics/knowledge-work-plugins) — Anthropic

## How plugins and skills package domain workflows

Understand the building blocks partners use to turn a department's know-how into something every user can install.

**You will be able to:**

- Describe what a plugin bundles and where each part runs
- Explain how a skill encodes a repeatable domain procedure
- Choose between org-wide skill provisioning and group-scoped plugins
- Adapt an open-source knowledge-work plugin to a client's own practice

**Key points**

- A plugin bundles skills, connectors, and sub-agents into one package, so a team gets a ready-to-go setup for its role instead of assembling each piece.
- Skills in a plugin work in web chat, the Desktop Chat tab, and Cowork. Hooks and sub-agents run only in Cowork and appear grayed out in chat.
- A skill is a folder with a SKILL.md file that captures a procedure: when to use it, the steps, the output format, and any reference material. It is where a client's playbook or house style lives.
- Anthropic publishes open-source knowledge-work plugins for functions such as legal, finance, sales, marketing, HR, operations, and customer support. They are starting points meant to be customized.
- Owners can provision a skill for everyone from organization settings, or bundle skills into a plugin assigned to one group when only that team should see them.
- The partner's value is the customization: the client's positions, templates, escalation rules, and connectors. A generic plugin with none of that produces generic output.

**Practice:** Open the legal plugin in the knowledge-work-plugins repository and list its skills. For one skill, write down three things a specific client would need to change (positions, templates, or routing) before it matches their practice.

**Read:** [Use plugins in Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude) · [What are skills?](https://support.claude.com/en/articles/12512176-what-are-skills) · [Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization)

<details><summary>Flashcards</summary>

**Q:** What does a Claude plugin bundle?  
**A:** Skills, connectors, and sub-agents, packaged so a team gets a ready setup for its role.

**Q:** Which plugin parts work outside Cowork?  
**A:** Skills work in web chat, the Desktop Chat tab, and Cowork. Hooks and sub-agents run only in Cowork.

**Q:** Where does a client's playbook or house style live in a Claude solution?  
**A:** In skills (SKILL.md plus reference files), usually shipped inside a plugin the client's admins control.

</details>

### Check your understanding

**Scenario: In-house legal team packaging**
*Study area: Plugins and skills · easy*

An in-house legal team wants one install that gives every attorney the team's review procedure and access to its document management system. What should the partner build?

- **A.** A shared project containing a long instruction document that each attorney pastes into every new chat before starting.
- **B.** A plugin that bundles the team's review skills with the connector to its document management system.
- **C.** A single system prompt set by an Owner, since system prompts are how organizations distribute procedures.
- **D.** A separate Claude account for each practice group, each preloaded with that group's review procedure and files.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Plugins bundle skills, connectors, and sub-agents into one package, which is exactly the one-install setup the team wants.

_Why a tempting wrong answer misses:_ Pasting instructions from a project (A) is manual and inconsistent, and it does not bring the connector along.

Reference: https://support.claude.com/en/articles/13837440-use-plugins-in-claude

</details>

---

**Scenario: Plugin behavior in web chat**
*Study area: Plugins and skills · medium*

A client installed a compliance plugin. Staff using Claude in the web browser can run its skills, but its sub-agent and hooks appear grayed out. What explains this?

- **A.** The plugin failed to install correctly, so it must be removed and uploaded again by an organization Owner.
- **B.** Sub-agents and hooks require an Enterprise plan, and the client is on the Team plan, which supports skills only.
- **C.** Hooks and sub-agents run only in Cowork; the skills in a plugin work across chat, the Desktop Chat tab, and Cowork.
- **D.** Browser sessions block every plugin component except skills until an admin allowlists the plugin's domain.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The Help Center explains that skills bundled in a plugin work in chat, the Desktop Chat tab, and Cowork, while hooks and sub-agents run only in Cowork and appear grayed out in chat.

_Why a tempting wrong answer misses:_ Plan tier (B) is not the reason; plugins are available on all paid plans, and the grayed-out parts reflect the surface, not the plan.

Reference: https://support.claude.com/en/articles/13837440-use-plugins-in-claude

</details>

---

## Legal workflows: playbook contract review and NDA triage

Design contract review and NDA intake so Claude applies the client's own positions and routes work to the right attorney.

**You will be able to:**

- Explain how playbook-driven contract review works
- Capture a client playbook: positions, fallbacks, and escalation triggers
- Design NDA triage routing that saves attorney time without removing attorney judgment
- Identify the connectors a legal workflow needs for context

**Key points**

- The Legal plugin's contract review compares a contract clause by clause against a configured negotiation playbook, flags each clause GREEN, YELLOW, or RED, and suggests redlines.
- The playbook is the product. It records the client's standard position per clause, acceptable fallback ranges, and the triggers that require escalation. Without it, review falls back to generic commentary.
- NDA triage pre-screens incoming NDAs and sorts them into standard approval, counsel review, or full review, so attorneys spend time where the risk is.
- Triage is routing, not approval. The workflow design decides who signs off in each bucket, and an attorney remains the decision-maker for anything that binds the client.
- Connect document management, chat, and matter or project tools through connectors so Claude sees the right precedent. Anthropic's legal solution page lists connectors such as iManage, NetDocuments, Box, and Ironclad.
- Every output is a draft for a licensed attorney. The Legal plugin itself states that outputs should be reviewed by licensed attorneys.

**Practice:** With a colleague acting as in-house counsel, interview them for 15 minutes about three clauses (limitation of liability, governing law, confidentiality term). Write each as a playbook entry: standard position, acceptable fallback, and escalation trigger.

**Read:** [Legal plugin](https://claude.com/plugins/legal) · [Knowledge-work plugins: legal](https://github.com/anthropics/knowledge-work-plugins) · [Claude for Legal](https://claude.com/solutions/legal)

<details><summary>Flashcards</summary>

**Q:** How does playbook-driven contract review report results?  
**A:** Clause by clause against the configured playbook, flagged GREEN, YELLOW, or RED, with suggested redlines.

**Q:** Three parts of a playbook entry  
**A:** The standard position, the acceptable fallback range, and the escalation trigger.

**Q:** NDA triage buckets  
**A:** Standard approval, counsel review, and full review. Triage routes work; an attorney still decides.

</details>

### Check your understanding

**Scenario: Generic contract review output**
*Study area: Playbook contract review · medium*

A software company's legal team tried the Legal plugin's contract review on a customer MSA. The results flagged generic issues but ignored the company's own positions on liability caps and indemnity. What is the most likely cause?

- **A.** The team has not configured its negotiation playbook with its standard positions, fallbacks, and escalation triggers.
- **B.** The contract was too long for the context window, so Claude reviewed only the first part of the agreement.
- **C.** Contract review works only on NDAs, so an MSA must be split into separate NDA-sized sections before review.
- **D.** The team used a model that does not support legal work and needs to switch to a legal-specific model tier.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Contract review compares clauses against the configured playbook. Without the team's positions and escalation triggers, it can only produce generic commentary.

_Why a tempting wrong answer misses:_ Context length (B) would not explain output that covers the whole contract but ignores the company's positions; the missing input is the playbook.

Reference: https://claude.com/plugins/legal

</details>

---

**Scenario: High-volume NDA intake**
*Study area: NDA triage · medium*

A growing company's two-attorney legal team receives about 60 NDAs a month. How should the partner design NDA triage?

- **A.** Let Claude approve and countersign any NDA it rates as standard, so attorneys see only the unusual ones.
- **B.** Have Claude rewrite every incoming NDA onto the company's own paper and return it to the counterparty directly.
- **C.** Skip triage and send every NDA straight to full attorney review, since any automation adds unacceptable risk.
- **D.** Sort NDAs into standard approval, counsel review, or full review, with an attorney owning sign-off in each.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

NDA triage pre-screens and routes each NDA to the right level of review. It saves attorney time while leaving binding decisions with an attorney.

_Why a tempting wrong answer misses:_ Auto-approving and countersigning (A) removes the attorney from a decision that binds the company, which the workflow should never do.

Reference: https://claude.com/plugins/legal

</details>

---

**Scenario: Building a commercial playbook**
*Study area: Playbook design · medium*

You are interviewing a client's general counsel to build a contract-review playbook. Which TWO items should the playbook capture for each clause? (Select 2.)

- **A.** The company's standard position for the clause
- **B.** The acceptable fallback range and the triggers that require escalation
- **C.** The counterparty's internal pricing and margin for the deal
- **D.** Every contract the company signed in the last decade, pasted in full
- **E.** An instruction to sign automatically whenever all clauses are green

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

A playbook defines the standard position, what fallbacks are acceptable, and when to escalate. That is what lets review flag deviations in the client's own terms.

_Why a tempting wrong answer misses:_ Auto-signing on all-green (E) removes attorney judgment; pasting a decade of contracts (D) is not a playbook and bloats context.

Reference: https://claude.com/plugins/legal

</details>

---

## Legal operations: briefs, compliance, vendors, signatures, time

Extend beyond review into the operational workflows that consume a legal team's week.

**You will be able to:**

- Describe the briefing, compliance-check, and vendor-check workflows
- Design e-signature routing with a human confirmation before sending
- Design time-entry drafting that an attorney approves before billing
- Make workflows report their sources and gaps honestly

**Key points**

- The Legal plugin includes skills for briefings (daily briefs, topic research, and incident briefs), compliance checks on a proposed initiative, vendor agreement status checks, templated legal responses, legal risk assessment, and meeting briefings.
- A vendor check pulls agreement status from connected sources. A well-designed output states which systems were searched and which were unavailable, rather than implying the picture is complete.
- The signature-request skill runs a pre-signature checklist (entity names, exhibits, signature blocks), sets signing order, and routes for execution. Design it so a person confirms the envelope before anything is sent.
- Time entry is a common drafting workflow: Claude turns activity from calendars, email, and documents into draft narratives. The attorney reviews and approves entries before they post to billing.
- Briefings and compliance checks are research aids. They should flag open questions and recommend counsel review, not state conclusions as settled.
- Anything that leaves the building, binds the client, or reaches a court or regulator needs an explicit human checkpoint in the workflow design.

**Practice:** Sketch a signature-routing workflow for a client: the checklist Claude runs, the connector it uses, the exact point where a person approves, and what happens if a check fails. Mark every step that sends something outside the organization.

**Read:** [Knowledge-work plugins (legal skills)](https://github.com/anthropics/knowledge-work-plugins) · [Legal plugin](https://claude.com/plugins/legal)

<details><summary>Flashcards</summary>

**Q:** Legal plugin skills beyond review and triage  
**A:** Briefings (daily, topic, incident), compliance check, vendor check, templated legal responses, legal risk assessment, meeting briefing, and signature request.

**Q:** What should a vendor-check output always state?  
**A:** Which sources were searched and which were unavailable, so gaps are not mistaken for a clean record.

**Q:** Human checkpoint in e-signature routing  
**A:** A person confirms the checked envelope and signing order before it is sent for execution.

</details>

### Check your understanding

**Scenario: Finalized MSA ready to sign**
*Study area: E-signature routing · medium*

A client wants Claude to route finalized agreements for e-signature through its signing platform connector. Which design is most appropriate?

- **A.** Claude sends the envelope the moment a contract's status changes to final, so no signing deadlines are ever missed.
- **B.** Claude runs the pre-signature checklist and sets signing order, then a person confirms before the envelope is sent.
- **C.** Claude emails the signers a PDF and asks them to reply with a typed name, avoiding the signing platform entirely.
- **D.** Claude routes only agreements under a dollar threshold and deletes the rest from the queue for manual handling.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The signature-request workflow verifies entity names, exhibits, and signature blocks and configures signing order. A human confirmation before sending keeps a person accountable for an action that leaves the organization.

_Why a tempting wrong answer misses:_ Sending automatically on a status change (A) skips the checklist review and the human confirmation for an externally binding step.

Reference: https://github.com/anthropics/knowledge-work-plugins

</details>

---

**Scenario: Vendor renewal question**
*Study area: Vendor check · hard*

Procurement asks legal whether an agreement with a data vendor is still in force. Claude's vendor check can reach the contract repository but not the e-signature system, which is offline. What should a well-designed output do?

- **A.** Report the repository findings, state that the e-signature system could not be checked, and flag the gap for follow-up.
- **B.** Conclude the agreement is not in force, since no executed copy was found in the systems that were available.
- **C.** Wait silently until every connected system is back online and only then return any findings to procurement.
- **D.** Infer the likely status from similar vendors' agreements and present that estimate as the answer to procurement.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Reporting what was checked and what was not lets the reader weigh the answer correctly. A missing source is a gap to flag, not evidence of absence.

_Why a tempting wrong answer misses:_ Concluding the agreement lapsed (B) treats an unavailable source as a clean negative result, which can mislead procurement.

Reference: https://github.com/anthropics/knowledge-work-plugins

</details>

---

**Scenario: Law firm time capture**
*Study area: Time entry drafting · easy*

A law firm wants Claude to help attorneys with time entry using calendar, email, and document activity. Which workflow design fits professional-responsibility expectations best?

- **A.** Claude posts entries directly to the billing system every night, and attorneys dispute any errors afterward.
- **B.** Claude estimates hours from each attorney's historical average and submits them to billing weekly in a batch.
- **C.** Claude drafts time narratives from activity, and each attorney reviews and approves entries before they post.
- **D.** Claude writes entries only for partners, while associates keep entering time manually into the billing system.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Drafting narratives saves effort, while attorney approval before posting keeps the person who bills accountable for accuracy.

_Why a tempting wrong answer misses:_ Posting directly (A) puts unreviewed entries onto client bills, shifting error-catching to after the fact.

Reference: https://claude.com/solutions/legal

</details>

---

## Privilege, confidentiality, and attorney review

Build legal deployments that respect privilege and confidentiality and keep licensed attorneys accountable.

**You will be able to:**

- Explain why deployment choice matters for confidential client data
- Scope connector access to matters and repositories the user may already see
- Place attorney review checkpoints in each legal workflow
- Identify oversight tools available on Enterprise

**Key points**

- This lane teaches workflow design, not legal advice. Whether a given use preserves privilege is a question for the client's counsel, and the partner should say so.
- Anthropic states that Team and Enterprise plans do not train on customer data by default. Confidential matters belong in a governed organization account, never a personal consumer account.
- Connectors should inherit the user's existing permissions and be limited to the repositories and matters that workflow needs. Broad access increases the chance of cross-matter leakage.
- Every legal output is a draft. Build the attorney review step into the workflow, including who reviews, what they check (citations, positions, facts), and how approval is recorded.
- Enterprise organizations get audit log exports and the Compliance API, which give legal operations and security teams evidence of activity for oversight.
- Under Anthropic's Usage Policy, legal interpretation and guidance is a high-risk use case. When outputs reach individuals or consumers directly, a qualified professional must review them and AI involvement must be disclosed.

**Practice:** For the contract-review workflow from module 2, write a one-paragraph confidentiality design: which account type, which connectors and scopes, who reviews each output, and what evidence the firm keeps. End with the question you would put to the client's counsel.

**Read:** [Claude for Legal](https://claude.com/solutions/legal) · [Access audit logs](https://support.claude.com/en/articles/9970975-access-audit-logs) · [Anthropic Usage Policy](https://www.anthropic.com/legal/aup)

<details><summary>Flashcards</summary>

**Q:** Default training posture on Team and Enterprise  
**A:** Anthropic states it does not train on customer data by default on Team and Enterprise plans.

**Q:** Connector scoping rule for legal work  
**A:** Inherit the user's existing permissions and limit access to the matters and repositories the workflow needs.

**Q:** Who decides whether a workflow preserves privilege?  
**A:** The client's counsel. Partners design the workflow and raise the question; they do not give legal advice.

</details>

### Check your understanding

**Scenario: Litigation boutique data concerns**
*Study area: Confidentiality · medium*

A litigation boutique is worried about putting privileged client material into Claude. Which recommendation best addresses confidentiality while staying within a partner's role?

- **A.** Assure the firm that using Claude always preserves privilege, because Anthropic's terms cover every jurisdiction.
- **B.** Use a governed Team or Enterprise account, scope connectors to authorized matters, and ask the firm's counsel about privilege.
- **C.** Have attorneys use personal Claude accounts so that client material stays separate from the firm's organization.
- **D.** Recommend the firm avoid connectors and instead paste full case files into each conversation as needed.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Team and Enterprise do not train on customer data by default, connector scoping limits exposure, and whether privilege is preserved is a question for the firm's counsel, not the partner.

_Why a tempting wrong answer misses:_ Guaranteeing privilege (A) is legal advice the partner cannot give, and the claim is not something any vendor term can promise.

Reference: https://claude.com/solutions/legal

</details>

---

**Scenario: Paralegal sending a redline**
*Study area: Attorney review · easy*

A paralegal wants to send Claude's NDA redline straight to the counterparty to save time. What should the workflow require?

- **A.** A licensed attorney reviews the redline before it is sent, since Claude's outputs are drafts for attorney review.
- **B.** The paralegal checks spelling and formatting, since the playbook already guarantees the legal positions are right.
- **C.** Claude adds a note to the redline saying it was machine-generated, which substitutes for any internal review.
- **D.** The counterparty is asked to review the redline for errors, since they will read it closely during negotiation.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The Legal plugin states that outputs should be reviewed by licensed attorneys. A redline sent to a counterparty is an external legal position and needs that review.

_Why a tempting wrong answer misses:_ A playbook (B) improves consistency but does not guarantee each redline is right for the deal; it does not replace attorney review.

Reference: https://claude.com/plugins/legal

</details>

---

**Scenario: Corporate legal department controls**
*Study area: Confidentiality controls · medium*

A corporate legal department on Claude Enterprise asks which controls help protect confidential matter data. Which TWO should the partner recommend? (Select 2.)

- **A.** Limit connectors to the repositories and matters each workflow needs, inheriting user permissions
- **B.** Use audit log exports and the Compliance API to give oversight teams evidence of activity
- **C.** Allow attorneys to move sensitive work into personal consumer accounts for speed
- **D.** Remove attorney review steps once the playbook has been in use for a month
- **E.** Share one service login across the department so activity is easier to track

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

Scoped connectors limit exposure to what each workflow needs, and Enterprise audit logs and the Compliance API support oversight.

_Why a tempting wrong answer misses:_ A shared login (E) destroys individual accountability in the audit trail rather than improving it.

Reference: https://support.claude.com/en/articles/9970975-access-audit-logs

</details>

---

## Financial services

Position Claude for banking, insurance, asset management, and fintech with traceable outputs and regulated-use guardrails.

**You will be able to:**

- Describe the financial-services capabilities Anthropic publishes
- Choose between Cowork plugins, Claude Code, and Managed Agents for an FS workflow
- Design analyst workflows where every number traces to a source
- Recognize FS use cases that fall under high-risk requirements

**Key points**

- Anthropic's financial services page covers banking, insurance, asset management, and fintech, and describes Claude working natively in Excel and PowerPoint.
- Pre-built integrations include LSEG, FactSet, S&P Global, and Morningstar, which let analysts pull licensed market data into their work rather than pasting it by hand.
- Finance agent templates are published as plugins for Cowork and Claude Code and as a cookbook for Claude Managed Agents; the source is in the anthropics/financial-services repository.
- Anthropic emphasizes source-attributed outputs so teams can verify work before acting. Design workflows so the reviewer can trace every figure back to its source.
- Investment advice, loan approvals, and creditworthiness or eligibility decisions are finance high-risk uses under the Usage Policy. Insurance underwriting, claims, and coverage decisions are high-risk too.
- Wealth and advisory workflows such as meeting prep, proposals, and compliance reviews should keep the licensed professional as the one who gives advice to clients.

**Practice:** Pick one analyst task at a mid-size asset manager (for example, a quarterly portfolio review). Map its data sources to connectors, name the surface you would use, and mark where a human verifies figures before the output reaches a client.

**Read:** [Claude for Financial Services](https://claude.com/solutions/financial-services) · [Financial services plugins (GitHub)](https://github.com/anthropics/financial-services) · [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)

<details><summary>Flashcards</summary>

**Q:** FS data integrations Anthropic names  
**A:** LSEG, FactSet, S&P Global, and Morningstar, among others.

**Q:** Three ways finance agent templates are delivered  
**A:** As plugins for Cowork, as plugins for Claude Code, and as a cookbook for Claude Managed Agents.

**Q:** Finance uses on the Usage Policy's high-risk list  
**A:** Financial decisions including investment advice, loan approvals, and financial eligibility or creditworthiness.

</details>

### Check your understanding

**Scenario: Equity research team**
*Study area: Financial services analysis · medium*

An equity research team wants Claude to help build sector comparisons, but compliance insists every figure be traceable. What design best meets that requirement?

- **A.** Ask analysts to type figures from memory into prompts, so the model does not need access to licensed data.
- **B.** Have Claude estimate figures from its training knowledge and mark them as approximate in a footnote.
- **C.** Paste screenshots of data terminals into each chat, since images are easier for compliance to review later.
- **D.** Connect licensed data sources such as FactSet or S&P Global and require source attribution for every figure.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Anthropic's financial services offering pairs pre-built data integrations with source-attributed outputs, so reviewers can trace figures before anyone acts on them.

_Why a tempting wrong answer misses:_ Training-knowledge estimates (B) cannot be traced to a current source, which is exactly what compliance ruled out.

Reference: https://claude.com/solutions/financial-services

</details>

---

**Scenario: Bank building an FS agent**
*Study area: Deployment surface · hard*

A bank's engineering team wants to adapt one of Anthropic's finance agent templates into a backend service that runs without a person at a desktop. Which starting point fits best?

- **A.** The Cowork plugin version, installed on a shared workstation that stays logged in overnight to run the agent.
- **B.** The Claude Managed Agents cookbook version, which is designed for server-hosted agent deployments.
- **C.** A Claude Desktop MDM profile that enables the template for every analyst's machine across the bank.
- **D.** An organization skill uploaded in settings, which turns the template into a background service automatically.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Anthropic publishes the finance agent templates as plugins for Cowork and Claude Code and as a cookbook for Claude Managed Agents, the server-hosted option suited to a backend service.

_Why a tempting wrong answer misses:_ A Cowork plugin on a shared, always-on workstation (A) is a desktop workaround, not a supported server deployment.

Reference: https://claude.com/solutions/financial-services

</details>

---

**Scenario: Robo-advice feature**
*Study area: High-risk finance uses · medium*

A wealth-management fintech wants Claude to give clients personalized investment recommendations inside its app. What must the design include under Anthropic's Usage Policy?

- **A.** A qualified professional reviews recommendations before they are finalized, and clients are told AI was involved.
- **B.** A terms-of-service clause stating the firm accepts no liability for recommendations, shown once at signup.
- **C.** Recommendations limited to low-risk funds, which removes the use case from the Usage Policy's high-risk list.
- **D.** A setting that turns off the model's safety training for financial topics so the advice is more direct.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Investment advice is a finance high-risk use. When outputs affect individuals directly, the policy requires qualified human review and disclosure of AI involvement.

_Why a tempting wrong answer misses:_ Restricting to low-risk funds (C) does not change the category; it is still investment advice to individuals.

Reference: https://www.anthropic.com/legal/aup

</details>

---

## Healthcare, life sciences, government, and other sectors

Tailor the solution conversation to other verticals where Anthropic publishes solution material.

**You will be able to:**

- Name the industries with published Anthropic solution pages
- Match a public-sector requirement to the right deployment option
- Apply high-risk requirements to healthcare scenarios
- Research a vertical from official pages before a client meeting

**Key points**

- Anthropic's solutions pages cover industries including financial services, healthcare, life sciences, government, education (higher education and K-12), nonprofits, and customer support, plus departments such as legal and cybersecurity.
- Anthropic states that Claude for Government is available with authorizations up to FedRAMP High and IL5 through established procurement channels.
- The life sciences page emphasizes working through research with full citations and audit trails, which is the pattern to design around for scientific and regulatory submissions.
- Healthcare decisions, diagnosis, patient care, and medical guidance are high-risk uses under the Usage Policy. General wellness advice is not in that category.
- Confirm compliance configuration, such as HIPAA eligibility, with Anthropic and the client's compliance team before any regulated data flows. Do not assume it from a sales page.
- Before a vertical meeting, read the current solution page and customer stories. Only claim capabilities and industries Anthropic has published.

**Practice:** Choose two verticals from the solutions pages. For each, write three discovery questions that expose the sector's specific data, review, and compliance constraints, and one guardrail you would propose on day one.

**Read:** [Claude for Government](https://claude.com/solutions/government) · [Claude for Healthcare](https://claude.com/solutions/healthcare) · [Claude for Life Sciences](https://claude.com/solutions/life-sciences) · [Claude for Nonprofits](https://claude.com/solutions/nonprofits)

<details><summary>Flashcards</summary>

**Q:** Government authorizations Anthropic states for Claude  
**A:** Up to FedRAMP High and IL5, through established procurement channels.

**Q:** Healthcare: high-risk or not?  
**A:** Healthcare decisions, diagnosis, patient care, and medical guidance are high-risk. General wellness advice is not.

**Q:** Rule for vertical claims in a client meeting  
**A:** Only claim industries and capabilities Anthropic has published on its current solution pages.

</details>

### Check your understanding

**Scenario: Federal agency requirement**
*Study area: Public sector · easy*

A federal civilian agency tells you any AI service must hold a FedRAMP High authorization. Based on Anthropic's published material, what should you explore first?

- **A.** A consumer Pro subscription for each staff member, since individual plans avoid agency procurement rules.
- **B.** Running Claude on agency laptops offline, since local use is exempt from any federal authorization requirement.
- **C.** Claude for Government, which Anthropic states is available with authorizations up to FedRAMP High and IL5.
- **D.** A self-hosted open copy of the Claude model weights, deployed inside the agency's own data center.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Anthropic's government page states Claude is available with authorizations up to FedRAMP High and IL5 through established procurement channels.

_Why a tempting wrong answer misses:_ Claude model weights are not distributed for self-hosting (D), so that path does not exist.

Reference: https://claude.com/solutions/government

</details>

---

**Scenario: Clinic patient assistant**
*Study area: Healthcare guardrails · medium*

A multi-site clinic wants a patient-facing assistant that suggests what a patient's symptoms might indicate and whether to seek care. How should the partner frame the design?

- **A.** As a general wellness tool, which keeps it outside the Usage Policy's healthcare category and its requirements.
- **B.** As a high-risk healthcare use that needs qualified clinical review of guidance and disclosure that AI is involved.
- **C.** As an internal productivity tool, since patients would only see outputs after the clinic's website displays them.
- **D.** As a research prototype, which exempts it from high-risk requirements as long as it is labeled beta in the app.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Guidance about symptoms and whether to seek care is medical guidance, a named high-risk healthcare use. It requires qualified professional review and disclosure, and a patient-facing chatbot must disclose it is AI.

_Why a tempting wrong answer misses:_ Calling it wellness (A) is the tempting shortcut, but the policy carves out things like sleep and nutrition advice, not symptom guidance.

Reference: https://www.anthropic.com/legal/aup

</details>

---

## Professional services and MSP operations

Apply Claude to a service provider's own delivery: tickets, documentation, SOPs, and client reporting.

**You will be able to:**

- Package SOPs and runbooks as skills the whole practice can use
- Connect PSA, RMM, and documentation tools through connectors
- Gate write actions on client systems behind technician approval
- Plan connectivity for private or firewalled MCP servers

**Key points**

- An MSP's standard operating procedures, runbooks, and report templates are natural skills. Encoding them makes technicians' output consistent across clients.
- Connectors built on the Model Context Protocol let Claude read and act in tools such as ticketing, remote monitoring, and documentation systems.
- Separate read from write. Let Claude search tickets and summarize alerts freely, but require a technician to approve anything that changes a client's system or a ticket's customer-facing record.
- Scope credentials per client so one tenant's connector cannot see another's data. Multi-tenant access is where MSP deployments carry the most risk.
- In Cowork, connectors reach external services through Anthropic's cloud. A custom connector must be reachable over the public internet from Anthropic's IP ranges, so private or firewalled servers need a plan.
- Distribute the practice's plugins through an organization plugin marketplace so every technician gets the same reviewed version.

**Practice:** Take one of your practice's runbooks and outline it as a skill: trigger description, steps, the connector calls it needs (read versus write), and the approval point before any change to a client system.

**Read:** [Use plugins in Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude) · [Manage Claude Cowork plugins for your organization](https://support.claude.com/en/articles/13837433-manage-cowork-plugins-for-your-organization) · [Model Context Protocol](https://modelcontextprotocol.io/)

<details><summary>Flashcards</summary>

**Q:** MSP rule for connector write actions  
**A:** Reads can run freely; changes to a client system or customer-facing record need technician approval.

**Q:** Cowork custom connector reachability  
**A:** Connectors go through Anthropic's cloud, so a custom connector must be reachable over the public internet from Anthropic's IP ranges.

**Q:** Biggest MSP-specific data risk  
**A:** Cross-tenant exposure. Scope connector credentials per client.

</details>

### Check your understanding

**Scenario: MSP ticketing assistant**
*Study area: MSP connectors · medium*

An MSP wants Claude to summarize alerts, search tickets, and update ticket status in its PSA across 80 client tenants. Which design best manages the risk?

- **A.** One connector credential with access to every tenant, so technicians can search across all clients in one query.
- **B.** Full write access for Claude on every system, since technician approval would slow down response times too much.
- **C.** Read-only access everywhere and no ticket updates at all, since any write action by an AI is unacceptable.
- **D.** Per-client scoped credentials, free read actions, and technician approval before any change to a ticket or system.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Per-client scoping prevents cross-tenant exposure, and gating writes behind technician approval keeps a person accountable for changes while reads stay fast.

_Why a tempting wrong answer misses:_ A single all-tenant credential (A) is convenient but creates the cross-client data exposure MSPs most need to avoid.

Reference: https://support.claude.com/en/articles/13837440-use-plugins-in-claude

</details>

---

**Scenario: On-premises MCP server**
*Study area: Connector networking · hard*

An MSP built a custom MCP connector to its on-premises documentation server behind the office firewall. It works in local testing, but in Cowork the connector cannot reach the server. What is the most likely cause?

- **A.** Cowork connectors reach services through Anthropic's cloud, so the server must be reachable from Anthropic's IP ranges.
- **B.** Cowork supports only connectors listed in the public directory, so custom connectors are always rejected by design.
- **C.** The Cowork app needs to be restarted after every connector change before it will attempt any outbound connection.
- **D.** MCP connectors must run on the same machine as Claude Desktop, and the server is hosted on a different machine.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The Help Center notes that in Cowork, connectors reach external services through Anthropic's cloud, not the local network, so a custom connector must be publicly reachable from Anthropic's IP ranges.

_Why a tempting wrong answer misses:_ Custom connectors are supported (B is false); the problem is network reachability from Anthropic's cloud, not the connector type.

Reference: https://support.claude.com/en/articles/13837440-use-plugins-in-claude

</details>

---

**Scenario: Consistent technician onboarding runbooks**
*Study area: Packaging SOPs · easy*

An MSP's technicians each follow the client-onboarding runbook differently, and reports come out inconsistent. What is the best way to use Claude to fix this?

- **A.** Ask each technician to write their own prompt for onboarding and share the best ones in a team chat channel.
- **B.** Encode the runbook as a skill, ship it in a plugin through the org marketplace, and update it through review.
- **C.** Store the runbook as a PDF in a shared drive and remind technicians in the weekly meeting to read it again.
- **D.** Record a video of the most senior technician doing an onboarding and ask everyone else to copy the steps.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A skill turns the runbook into a repeatable procedure Claude follows, and distributing it through the org marketplace gives every technician the same reviewed version.

_Why a tempting wrong answer misses:_ Individual prompts shared in chat (A) reproduce the inconsistency the MSP is trying to remove.

Reference: https://support.claude.com/en/articles/13837433-manage-cowork-plugins-for-your-organization

</details>

---

## Guardrails for regulated work

Apply a consistent set of guardrails to any regulated workflow: human review, citations, data handling, and audit.

**You will be able to:**

- Apply the Usage Policy's human-in-the-loop and disclosure requirements
- Design outputs that cite sources and flag unverified claims
- Set data-handling rules for regulated inputs
- Assemble an audit trail a regulator or client auditor could follow

**Key points**

- The Usage Policy's high-risk list covers legal, healthcare, insurance, finance, employment and housing, academic testing and admissions, and published media content.
- For high-risk uses that affect individuals directly, a qualified professional must review before finalization, and people must be told AI helped produce the output, at minimum at the start of each session.
- Consumer-facing chatbots and external interactive agents must always disclose that users are interacting with AI.
- Require citations in research and analysis outputs, and have the workflow flag anything it could not verify. Reviewers check citations, not just prose.
- Classify data before connecting it. Decide which classes may enter prompts, which connectors may reach them, and how long outputs are retained.
- Keep evidence: who ran the workflow, what sources were used, who reviewed, and what changed. On Enterprise, audit logs and the Compliance API supply the platform side of that record.

**Practice:** Write a one-page guardrail checklist you could attach to any regulated workflow proposal. Include a line for the high-risk category (if any), reviewer role, disclosure text, citation rule, data classes, and evidence kept.

**Read:** [Anthropic Usage Policy](https://www.anthropic.com/legal/aup) · [Compliance API FAQ](https://platform.claude.com/docs/en/manage-claude/compliance-faq) · [Access audit logs](https://support.claude.com/en/articles/9970975-access-audit-logs)

<details><summary>Flashcards</summary>

**Q:** Two Usage Policy requirements for high-risk uses affecting individuals  
**A:** Review by a qualified professional before finalization, and disclosure of AI involvement at least at the start of each session.

**Q:** Citation guardrail  
**A:** Require sources in research outputs, flag anything unverified, and have reviewers check the citations themselves.

**Q:** Minimum audit trail for a regulated workflow  
**A:** Who ran it, which sources were used, who reviewed, and what changed, plus platform audit logs on Enterprise.

</details>

### Check your understanding

**Scenario: Insurer claims-status chatbot**
*Study area: Disclosure · easy*

An insurer is launching a public chatbot that answers claims-status questions. Separately from any high-risk review, what disclosure does the Usage Policy require for every consumer-facing chatbot?

- **A.** A disclosure only when a user explicitly asks whether they are talking to a person or to an automated system.
- **B.** A disclosure in the insurer's privacy policy page, which counts as notice for every chatbot the insurer runs.
- **C.** A disclosure that users are interacting with AI rather than a human, at least at the start of each session.
- **D.** A disclosure to the state insurance regulator, filed once before launch, with no notice required to users.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The Usage Policy requires all consumer-facing chatbots and external interactive agents to disclose that users are interacting with AI, at a minimum at the beginning of each chat session.

_Why a tempting wrong answer misses:_ Disclosing only when asked (A) leaves users unaware by default, which the policy's session-start rule is designed to prevent.

Reference: https://www.anthropic.com/legal/aup

</details>

---

**Scenario: Regulatory research brief**
*Study area: Citations and verification · medium*

A pharmaceutical client's regulatory team wants Claude to draft research briefs on new guidance documents. Which guardrail most directly reduces the risk of an unsupported claim reaching a submission?

- **A.** Instruct Claude to write in a confident, formal tone so that reviewers can move quickly through each brief.
- **B.** Limit briefs to one page, since shorter documents contain fewer statements and so fewer possible errors.
- **C.** Run each brief through a second Claude conversation and accept it once both conversations produce agreement.
- **D.** Require citations for each claim, have the brief flag anything unverified, and have a reviewer check the sources.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Cited claims plus explicit flags on unverified items give the human reviewer something concrete to check, which is how unsupported statements get caught before submission.

_Why a tempting wrong answer misses:_ Agreement between two model runs (C) can repeat the same error; it is not a substitute for checking the cited sources.

Reference: https://claude.com/solutions/life-sciences

</details>

---
