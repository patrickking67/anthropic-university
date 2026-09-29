# Partner Delivery and Adoption

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Run a Claude deployment for a client from discovery workshop to a governed, measured, self-sustaining operating model.**

Group: partner · Level: intermediate · ~6 h · For: Partner consultants, delivery leads, and customer success managers who deploy Claude Team or Enterprise (and Claude Code) for client organizations.

## Take alongside

- [Claude Partner Network learning path](https://anthropic-partners.skilljar.com/page/claude-partner-network-learning-path) — Claude Partner Network
- [AI Fluency: Framework and foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations) — Anthropic Academy
- [Claude 101](https://academy.claude.com/courses/claude-101) — Anthropic Academy
- [Introduction to agent skills](https://academy.claude.com/courses/introduction-to-agent-skills) — Anthropic Academy
- [Claude Code in action](https://academy.claude.com/courses/claude-code-in-action) — Anthropic Academy
- [Claude Enterprise Administrator Guide](https://claude.com/resources/tutorials/claude-enterprise-administrator-guide) — Anthropic

## Discovery workshops and use-case prioritization

Turn a vague mandate into a short, ranked list of workflows worth piloting, each with an owner and a baseline.

**You will be able to:**

- Plan a discovery workshop that starts from real work, not product features
- Score candidate use cases on business value and delivery feasibility
- Capture a baseline and a named owner for every shortlisted workflow
- Explain to a sponsor why the pilot shortlist is small

**Key points**

- Start discovery with the tasks people repeat every week and the ones they dread, not with a tour of Claude features. Workflows are the unit of value.
- Score each idea on two axes: value (time saved, quality gained, risk reduced, revenue touched) and feasibility (inputs are digital and reachable, quality is easy to judge, stakes are manageable).
- The first pilot candidates sit in the high-value, high-feasibility quadrant. High-value but low-feasibility ideas go on a roadmap with the blocker named, such as a missing connector or an unowned process.
- Every shortlisted workflow needs a business owner, a subject-matter expert who can judge output quality, and a measured baseline of today's effort or cycle time.
- A long list that goes straight to pilot dilutes attention and makes results impossible to attribute. Three to five focused workflows usually teach more than twenty shallow ones.
- Record the data each workflow touches and its sensitivity class during discovery. It feeds rollout scope, connector choices, and the governance review later.

**Practice:** Run a 20-minute mock workshop with a colleague playing a department head. Collect at least eight tasks, score each on value and feasibility from 1 to 5, and write a one-page shortlist with owner, SME, data sensitivity, and a baseline estimate for the top three.

**Read:** [Use Claude on Team and Enterprise plans (Help Center collection)](https://support.claude.com/en) · [Define your success criteria](https://platform.claude.com/docs/en/test-and-evaluate/define-success)

<details><summary>Flashcards</summary>

**Q:** Two axes for prioritizing discovered use cases  
**A:** Business value (time, quality, risk, revenue) and delivery feasibility (reachable inputs, easy-to-judge quality, manageable stakes). Pilot the high-high quadrant first.

**Q:** Three things every shortlisted workflow needs before a pilot  
**A:** A business owner, a subject-matter expert who can judge output quality, and a measured baseline of today's effort or cycle time.

**Q:** Where do high-value but low-feasibility ideas go?  
**A:** On the roadmap with the specific blocker named (for example a missing connector or an unowned process), not into the first pilot.

</details>

### Check your understanding

**Scenario: Regional insurer discovery workshop**
*Study area: Use-case prioritization · medium*

A regional insurer's COO asks you to "roll Claude out to everyone" and wants a use-case plan by Friday. Your discovery workshop produced 40 ideas from six departments. What is the best next step?

- **A.** Score each idea on business value and delivery feasibility, then shortlist the few rated high on both for a pilot.
- **B.** Pilot every idea that has an executive sponsor at the same time, so momentum builds evenly across all departments.
- **C.** Start with the most technically ambitious idea because it shows the COO the ceiling of what Claude can do.
- **D.** Ask IT to rank the list by integration effort alone, since low effort is what decides whether a pilot succeeds.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Prioritizing on both value and feasibility yields a small, attributable pilot that can succeed and matter. The rest of the list becomes a roadmap with named blockers.

_Why a tempting wrong answer misses:_ Piloting everything with a sponsor (B) spreads attention thin and makes results impossible to attribute; effort alone (D) ignores whether the work is worth doing.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/define-success

</details>

---

**Scenario: Logistics firm shortlist**
*Study area: Use-case prioritization · easy*

A logistics client is choosing its first pilot workflow. Which characteristic most strongly signals that a workflow is feasible for an early pilot?

- **A.** It is performed rarely, but a mistake in it is costly enough to justify a large investment in automation.
- **B.** It depends on records held in a legacy system that has no export path or connector available yet.
- **C.** Its inputs are already digital and reachable, and a subject expert can judge output quality quickly.
- **D.** It has no current process owner, so the pilot team can design the process from scratch without pushback.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Reachable inputs and fast, reliable quality judgment make a pilot cheap to run and easy to evaluate, which is what early feasibility means.

_Why a tempting wrong answer misses:_ A rare, high-stakes workflow (A) produces too few examples to evaluate and raises the review burden; an unowned process (D) leaves nobody accountable for adoption.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/define-success

</details>

---

**Scenario: Professional services firm discovery**
*Study area: Discovery outputs · medium*

You are closing a discovery engagement for a 300-person accounting firm. Which TWO items should the discovery deliverable include for each shortlisted workflow? (Select 2.)

- **A.** A measured baseline of current effort or cycle time for the workflow
- **B.** A named business owner and a subject-matter expert who can judge output quality
- **C.** A final enterprise-wide seat count and signed commercial terms
- **D.** A completed security questionnaire for every connector in the directory
- **E.** A fixed set of approved prompts that users must copy word for word

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

A baseline makes later ROI claims credible, and an owner plus SME make the pilot accountable and evaluable. Both belong in discovery output.

_Why a tempting wrong answer misses:_ Commercial terms (C) and a questionnaire for every connector (D) are out of scope for discovery; mandated verbatim prompts (E) block the learning a pilot is for.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/define-success

</details>

---

## Pilot design with success metrics and evals

Design a time-boxed pilot whose result is a decision, backed by measurable criteria and a repeatable evaluation set.

**You will be able to:**

- Write success criteria that are specific, measurable, and agreed before launch
- Build a small evaluation set from representative client work
- Choose a pilot cohort and a comparison baseline
- Define the go, extend, or stop decision the pilot will inform

**Key points**

- Anthropic's guidance on success criteria asks for criteria that are specific, measurable, achievable, and relevant. "Users like it" is not a criterion; "first drafts need under 15 minutes of edits, down from 45" is.
- An evaluation set is a fixed collection of representative inputs with expected outputs or a grading rubric. Rerun the same set whenever the prompt, skill, or model changes so results are comparable.
- Grading can be code-based (exact or format checks), human (an SME scores against a rubric), or model-based (Claude grades against a rubric). Pick the cheapest method that still reflects what the SME cares about.
- Include edge cases and known-hard examples in the eval set, not just the happy path. Pilots fail in production on the cases nobody tested.
- Pick a cohort that does the target workflow often and has an engaged manager. Keep a baseline from the same people or a comparable group so improvement can be attributed.
- Agree on the decision up front: what result means scale, what means extend with changes, and what means stop. A pilot without a decision rule tends to drift indefinitely.

**Practice:** For one shortlisted workflow, write three success criteria with numeric targets, then assemble ten sample inputs (two of them deliberately hard) with a one-line rubric for each. Note which criteria an SME must grade and which a script could check.

**Read:** [Define your success criteria](https://platform.claude.com/docs/en/test-and-evaluate/define-success) · [Create strong empirical evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)

<details><summary>Flashcards</summary>

**Q:** What makes a pilot success criterion usable?  
**A:** It is specific and measurable, agreed before launch, and tied to a target, such as edits per draft dropping from 45 to under 15 minutes.

**Q:** Why keep the evaluation set fixed?  
**A:** So you can rerun it after every prompt, skill, or model change and compare scores directly. A shifting test set hides regressions.

**Q:** Three ways to grade an eval  
**A:** Code-based checks, human SME grading against a rubric, and model-based grading where Claude scores against a rubric.

</details>

### Check your understanding

**Scenario: Law firm summarization pilot**
*Study area: Success criteria · medium*

Six weeks into a contract-summarization pilot at a law firm, the sponsor says it is "going well," but nobody can show whether it met its goal. What should have been set up before the pilot began?

- **A.** A larger user group, so that anecdotal feedback from many attorneys averages out to a reliable signal of success.
- **B.** Specific, measurable success criteria plus a fixed evaluation set of representative contracts graded by a rubric.
- **C.** A longer pilot window of at least six months, so that attorneys have enough time to form stable opinions.
- **D.** A weekly satisfaction poll that asks each attorney to rate on a five-point scale how helpful Claude felt.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Agreed, measurable criteria and a repeatable eval set turn a pilot into evidence. Without them, the result is opinion regardless of pilot size or length.

_Why a tempting wrong answer misses:_ A satisfaction poll (D) measures sentiment, not whether summaries were accurate or saved time, so it cannot show the goal was met.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/define-success

</details>

---

**Scenario: Claims-intake skill iteration**
*Study area: Evaluation design · medium*

A client's team revised the skill behind its claims-intake pilot and wants to know whether quality improved. Which approach gives the most trustworthy answer?

- **A.** Ask the pilot users which version felt better during the past week and adopt whichever one the majority prefers.
- **B.** Test the new version on a fresh random sample of claims, since new data shows how it will behave in production.
- **C.** Rely on published model benchmark scores, because they already measure quality across a wide range of tasks.
- **D.** Rerun the same fixed evaluation set with the same grading rubric on both versions and compare their scores.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Holding the test set and rubric constant isolates the change you made, so any score difference is attributable to the new skill version.

_Why a tempting wrong answer misses:_ A fresh random sample (B) changes the inputs as well as the skill, so you cannot tell whether a score moved because of the revision or the data.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

**Scenario: Retail HR policy assistant pilot**
*Study area: Pilot cohort and decision rules · hard*

A retailer's HR team will pilot a policy-question assistant. The sponsor wants the pilot to end in a clear decision. Which design best achieves that?

- **A.** Choose frequent users with an engaged manager, keep a baseline, and agree beforehand what results mean scale, extend, or stop.
- **B.** Invite volunteers from across the company and decide after the pilot ends what level of improvement counts as success.
- **C.** Give the assistant to the whole HR team without a baseline, then judge success by how many questions it answers.
- **D.** Run the pilot with the HR leadership team only, because their endorsement matters most for the scaling decision.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A representative, frequent-use cohort with a baseline and a pre-agreed decision rule produces a result that maps directly to go, extend, or stop.

_Why a tempting wrong answer misses:_ Setting the success bar after the fact (B) invites moving goalposts; leadership-only pilots (D) test the wrong users for a frontline workflow.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/define-success

</details>

---

## Rollout planning: identity, admin, connectors, desktop

Sequence the technical rollout so users land in a governed workspace with the right access on day one.

**You will be able to:**

- Sequence domain verification, SSO, and provisioning for the client's plan
- Explain which provisioning modes exist on Team versus Enterprise
- Decide which connectors and features are on at launch and who approves new ones
- Plan a managed Claude Desktop deployment through the client's MDM

**Key points**

- SSO is available on Team and Enterprise plans and Console organizations. Setup requires an Owner or Primary Owner, access to the company's DNS to verify the email domain, and access to the identity provider.
- Provisioning modes: invite only (the default), just-in-time (JIT), which creates accounts when an assigned user first signs in, and SCIM directory sync, which provisions and deprovisions from IdP assignments. SCIM is Enterprise-only; Team plans can use JIT.
- Decide the launch feature set deliberately: which connectors are enabled, whether Cowork stays on (it is on by default and owners can disable it), and who reviews requests for new connectors or plugins.
- Cowork connectors reach external services through Anthropic's cloud, so a custom connector must be reachable from the public internet. Flag private or firewalled MCP servers early in the plan.
- Claude Desktop can be managed through system policies: MDM configuration profiles on macOS (preference domain com.anthropic.claudefordesktop) and registry policies on Windows. Machine-level policy overrides the in-app allowlist.
- Stage the rollout: pilot cohort first, then waves by department, with a support channel and known-issues list ready before each wave.

**Practice:** Draft a one-page rollout runbook for a 600-person client on Enterprise: the order of identity steps, the provisioning mode and why, the launch connector list with an approver for each, the MDM delivery plan for Desktop, and three waves with dates.

**Read:** [Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso) · [Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning) · [Enterprise configuration for Claude Desktop](https://support.claude.com/en/articles/12622667-enterprise-configuration-for-claude-desktop) · [Use Claude Cowork on Team and Enterprise plans](https://support.claude.com/en/articles/13455879-use-claude-cowork-on-team-and-enterprise-plans)

<details><summary>Flashcards</summary>

**Q:** Provisioning modes and plan availability  
**A:** Invite only (default), JIT on first sign-in (Team and Enterprise), and SCIM directory sync with automatic deprovisioning (Enterprise only).

**Q:** Prerequisites for configuring SSO  
**A:** Owner or Primary Owner role, access to the company DNS to verify the email domain, and admin access to the identity provider.

**Q:** How is Claude Desktop managed across a fleet?  
**A:** System policies: MDM configuration profiles on macOS (domain com.anthropic.claudefordesktop) and registry policies on Windows. Machine policy overrides the in-app allowlist.

</details>

### Check your understanding

**Scenario: Team plan deprovisioning request**
*Study area: Identity and provisioning · medium*

A 120-person client on the Claude Team plan wants users removed from Claude automatically when HR disables them in the identity provider. What should you tell them?

- **A.** Team plans support SCIM directory sync once SSO is configured, so assignments in the IdP will add and remove users.
- **B.** Automatic removal needs SCIM, which is Enterprise-only; on Team, JIT creates accounts at first sign-in but does not sync removals.
- **C.** Provisioning cannot be automated on any plan, so an Owner must remove each departed user by hand from settings.
- **D.** JIT provisioning on Team deletes accounts as soon as a user fails to sign in for thirty consecutive days in a row.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

SCIM directory sync provisions and deprovisions from IdP assignments and is available on Enterprise, not Team. Team plans can use JIT, which only creates users when they first sign in.

_Why a tempting wrong answer misses:_ Option A is the tempting answer because SSO is on Team, but SCIM is not; the Help Center states SCIM is unavailable for Team plans.

Reference: https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning

</details>

---

**Scenario: Manufacturer SSO kickoff**
*Study area: Identity and provisioning · easy*

You are scheduling the SSO workstream for a manufacturer on Claude Enterprise. Which prerequisite should you confirm with the client first?

- **A.** That every employee has already created a personal Claude account with a company email address before cutover.
- **B.** That the client has purchased a separate identity add-on from Anthropic, since SSO is not included in any plan.
- **C.** That someone with an Owner or Primary Owner role can work with whoever controls company DNS and the IdP.
- **D.** That the security team has approved turning off multi-factor authentication in the IdP for the Claude application.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

SSO setup requires an Owner or Primary Owner, DNS access to verify the email domain, and access to the identity provider. Lining those people up is the first dependency.

_Why a tempting wrong answer misses:_ SSO is included on Team and Enterprise plans (B is false), and there is no requirement to weaken MFA (D).

Reference: https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso

</details>

---

**Scenario: Mac fleet at a design agency**
*Study area: Desktop deployment · medium*

A design agency manages 400 Macs with an MDM tool and wants Claude Desktop settings enforced so users cannot change them. What is the right approach?

- **A.** Ask each user to adjust Claude Desktop preferences to match a written guide, then spot-check a sample of machines.
- **B.** Deploy an MDM configuration profile targeting the com.anthropic.claudefordesktop domain to the managed machines.
- **C.** Rely on the in-app allowlist alone, because it takes precedence over any machine-level policy the MDM applies.
- **D.** Package a modified build of Claude Desktop with settings hard-coded and distribute it through the MDM catalog.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Claude Desktop reads managed preferences from the com.anthropic.claudefordesktop domain on macOS, so an MDM configuration profile enforces settings centrally.

_Why a tempting wrong answer misses:_ The precedence in C is backward: enterprise policy at the machine level overrides the in-app allowlist.

Reference: https://support.claude.com/en/articles/12622667-enterprise-configuration-for-claude-desktop

</details>

---

**Scenario: Hospital network enterprise rollout**
*Study area: Rollout sequencing · medium*

You are sequencing a wave-based Enterprise rollout for a client. Which TWO tasks should be complete before the first broad wave goes live? (Select 2.)

- **A.** Domain verification and SSO configuration with the client's identity provider
- **B.** A decision on which connectors are enabled at launch and who approves new ones
- **C.** Completion of advanced prompt-engineering training by every employee in the company
- **D.** Migration of all historical shared-drive documents into Claude projects
- **E.** Permanently disabling Cowork so that no agentic features are ever available

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

Identity must be in place for users to land in the governed workspace, and the launch connector decision sets data access from day one.

_Why a tempting wrong answer misses:_ Company-wide advanced training (C) and bulk document migration (D) are not launch gates; permanently disabling Cowork (E) is a policy choice, not a prerequisite.

Reference: https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso

</details>

---

## Change management, training, and champions

Drive real behavior change with role-based enablement and a champion network, not a single launch email.

**You will be able to:**

- Design role-based training built on the learner's own tasks
- Recruit and support a champion network across departments
- Plan launch communications that set expectations about review and data
- Diagnose and respond to adoption that stalls in one group

**Key points**

- Adoption follows usefulness in someone's actual week. Train people on two or three of their own recurring tasks, with a worked example they can reuse the next day.
- Champions are practitioners inside each team who share working examples, run office hours, and relay friction back to the program team. Give them early access, a channel, and recognition.
- Teach judgment alongside mechanics: when to delegate a task to Claude, how to describe it clearly, how to check the output, and when a human must stay accountable. Anthropic Academy's AI Fluency course covers this well.
- Launch messages should say what Claude is approved for, what data may and may not go in, where to get help, and that users remain responsible for what they send onward.
- When one group lags, look for a specific cause first: no relevant use case, a missing connector, unclear policy, or a skeptical manager. Fix the cause rather than repeating generic training.
- Share short internal stories of measurable wins. Peer evidence persuades more than vendor material.

**Practice:** Write a 45-minute session plan for one department: two of their real tasks as exercises, a five-minute segment on checking outputs, and a closing ask. Then list three people you would invite as champions and what you would give them.

**Read:** [AI Fluency: Framework & Foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations) · [Claude 101](https://academy.claude.com/courses/claude-101)

<details><summary>Flashcards</summary>

**Q:** What does a champion do?  
**A:** A practitioner inside a team who shares working examples, runs office hours, and relays friction back to the program team.

**Q:** Best raw material for training  
**A:** The learner's own recurring tasks, practiced hands-on, with a worked example they can reuse the next day.

**Q:** First move when one department's adoption stalls  
**A:** Find the specific cause (no relevant use case, missing connector, unclear policy, skeptical manager) and fix that, rather than rerunning generic training.

</details>

### Check your understanding

**Scenario: Finance department adoption stall**
*Study area: Champions and adoption · medium*

Two months after launch at a media company, most departments use Claude weekly, but finance barely logs in. Interviews show finance staff do not see how it applies to their close process. What is the best response?

- **A.** Send the whole company a reminder email that repeats the launch training link and the list of available features.
- **B.** Ask the CFO to set a mandatory weekly usage quota for finance staff and report on who falls below it each month.
- **C.** Remove finance from the program for now and reallocate their seats to departments with higher usage numbers.
- **D.** Recruit a finance champion to build and share close-process examples and run office hours for the team.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The diagnosed cause is missing relevance. A champion inside finance who demonstrates close-process examples fixes that specific cause.

_Why a tempting wrong answer misses:_ Usage quotas (B) drive logins without usefulness and tend to create resentment rather than lasting adoption.

Reference: https://academy.claude.com/courses/ai-fluency-framework-foundations

</details>

---

**Scenario: Customer success team enablement**
*Study area: Training design · easy*

You are designing enablement for a client's customer success team. Which session design is most likely to change day-to-day behavior?

- **A.** A hands-on session built on two of the team's own recurring tasks, including a segment on checking outputs.
- **B.** A recorded tour of every Claude feature that staff can watch whenever they have spare time in the quarter.
- **C.** A slide presentation about how large language models are trained, delivered to the whole team at once.
- **D.** A written FAQ that lists what Claude cannot do, emailed to the team as the only enablement material.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Practicing on real recurring tasks, with explicit coaching on reviewing outputs, gives people something useful they can reuse the next day.

_Why a tempting wrong answer misses:_ A feature tour (B) is easy to produce but rarely connects to a person's actual week, so behavior does not change.

Reference: https://academy.claude.com/courses/claude-101

</details>

---

## Acceptable use, governance, and risk review

Give the client a usable AI policy and a lightweight review gate for higher-risk use cases.

**You will be able to:**

- Draft the core sections of a client AI acceptable-use policy
- Map a proposed use case to Anthropic's Usage Policy, including high-risk requirements
- Run a proportionate risk review before a use case scales
- Identify the admin evidence available for oversight

**Key points**

- A usable internal policy covers approved tools and accounts, data classes allowed in prompts and connectors, required human review before outputs are used externally or in decisions, disclosure expectations, and how to report problems.
- The client's policy sits on top of Anthropic's Usage Policy, which applies to every deployment. It is the client's counsel, not the partner, who approves the final policy language.
- The Usage Policy names high-risk use cases, including legal, healthcare, insurance, finance, and employment and housing decisions. When outputs directly affect individuals or consumers, a qualified professional must review before finalization, and people must be told AI was involved.
- Any consumer-facing chatbot or external interactive agent must disclose that users are talking with AI, at least at the start of each session.
- Scale the review to the risk: an internal drafting aid needs a light check; an agent that acts in systems of record or touches regulated decisions needs a documented review of data, failure modes, human checkpoints, and rollback.
- Enterprise plans provide oversight evidence: audit log exports covering the past 180 days (identifiers, not chat content) and the Compliance API for programmatic access to activity.

**Practice:** Take one proposed use case from your shortlist and write a half-page risk review: data involved, who is affected, whether it is a high-risk use under the Usage Policy, the human checkpoint, the disclosure needed, and what evidence the client will keep.

**Read:** [Anthropic Usage Policy](https://www.anthropic.com/legal/aup) · [Access audit logs](https://support.claude.com/en/articles/9970975-access-audit-logs) · [Compliance API FAQ](https://platform.claude.com/docs/en/manage-claude/compliance-faq)

<details><summary>Flashcards</summary>

**Q:** Two Usage Policy requirements for high-risk uses that affect individuals  
**A:** Human-in-the-loop review by a qualified professional before finalization, and disclosure that AI helped produce the output.

**Q:** Disclosure rule for consumer-facing chatbots  
**A:** They must tell users they are interacting with AI, at least at the start of each session.

**Q:** What Enterprise audit log exports contain  
**A:** Up to the past 180 days of events with identifiers for chats and projects, not their titles or content. The Compliance API gives programmatic access.

</details>

### Check your understanding

**Scenario: Mid-market manufacturer policy draft**
*Study area: Acceptable-use policy · medium*

A manufacturer asks you to help draft its internal AI acceptable-use policy before launch. Which set of sections makes the policy most usable for employees?

- **A.** A history of the vendor selection, the contract term, and a list of competitor products that were not selected.
- **B.** A blanket ban on entering any company information into Claude until a later policy revision says otherwise.
- **C.** Approved tools, data classes allowed in prompts, required human review before external use, and how to report issues.
- **D.** A detailed technical description of model architecture so employees understand exactly how outputs are produced.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Employees need to know what they may use, what data may go in, when a human must review, and where to raise problems. Those sections make the policy actionable.

_Why a tempting wrong answer misses:_ A blanket ban (B) blocks the approved use the deployment exists for and pushes people toward unapproved tools.

Reference: https://www.anthropic.com/legal/aup

</details>

---

**Scenario: Credit union eligibility chatbot**
*Study area: Risk review · hard*

A credit union wants a public chatbot that tells members whether they are likely to qualify for a personal loan. In your risk review, what must the design include to meet Anthropic's Usage Policy?

- **A.** A disclaimer in the site footer, since the chatbot only estimates eligibility and the final decision happens elsewhere.
- **B.** Review by a qualified professional before eligibility outcomes are finalized, plus disclosure that AI is involved.
- **C.** Use of the largest available model, because high-risk use cases are permitted only on the most capable model tier.
- **D.** An internal log of all conversations, which on its own satisfies the policy's requirements for financial use cases.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Creditworthiness and eligibility are high-risk finance use cases. When outputs affect consumers, the policy requires qualified human review and disclosure of AI involvement, and a consumer chatbot must disclose it is AI.

_Why a tempting wrong answer misses:_ A footer disclaimer (A) does not provide the human review or the session-level disclosure the policy requires.

Reference: https://www.anthropic.com/legal/aup

</details>

---

**Scenario: Staffing agency screening tool**
*Study area: Usage Policy · medium*

A staffing agency wants Claude to help rank job applicants and send candidates the results. Under the Usage Policy's high-risk requirements, which TWO measures apply? (Select 2.)

- **A.** A qualified professional reviews rankings or decisions before they are finalized
- **B.** Candidates are told that AI helped produce the results they receive
- **C.** Only the newest model generation may be used for employment decisions
- **D.** Anthropic must pre-approve each individual ranking before it is sent
- **E.** All applicant data must be stored for seven years in the agency's archive

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

Employment decisions are a named high-risk use case. The policy requires human-in-the-loop review by a qualified professional and disclosure of AI involvement to the individuals affected.

_Why a tempting wrong answer misses:_ The policy does not mandate a model tier (C), per-decision Anthropic approval (D), or a specific retention period (E).

Reference: https://www.anthropic.com/legal/aup

</details>

---

## Measuring adoption and ROI

Combine platform usage analytics with workflow outcome metrics to show value in terms the sponsor cares about.

**You will be able to:**

- Locate the usage analytics available to each admin role
- Separate activity metrics from outcome metrics
- Tie outcome metrics back to the discovery baseline
- Build a recurring value report for the executive sponsor

**Key points**

- Team and Enterprise usage analytics show activity, feature adoption, and spend. Team Owners and Primary Owners can view them; on Enterprise, Admins can too, but Admins cannot see Spend.
- The analytics view reaches back up to 90 days, and the most recent data is from the previous day. Export regularly if the client wants longer trend lines.
- Enterprise organizations can pull analytics programmatically through the Admin API's analytics endpoints with an API key that has the read:analytics scope.
- Activity metrics (active users, sessions, feature use) show reach. Outcome metrics (cycle time, rework, throughput, quality scores) show value. A credible ROI story needs both.
- Compare outcome metrics to the baseline captured in discovery, using the same measurement method. Changing the method mid-program makes the comparison meaningless.
- Report value per workflow, not only in aggregate. A sponsor can act on "contract triage time fell by half" but not on "usage is up."

**Practice:** Sketch a one-page monthly value report for a sponsor: two activity metrics from the analytics dashboard, two outcome metrics per piloted workflow compared to baseline, one qualitative story, and one decision you are asking them to make.

**Read:** [View usage analytics for Team and Enterprise plans](https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans) · [Admin API: Analytics](https://platform.claude.com/docs/en/api/admin/analytics)

<details><summary>Flashcards</summary>

**Q:** Who can see Spend in Team/Enterprise analytics?  
**A:** Owners and Primary Owners. Enterprise Admins can view all analytics except Spend.

**Q:** Activity metrics versus outcome metrics  
**A:** Activity (active users, sessions, feature use) shows reach. Outcome (cycle time, rework, quality) shows value. ROI needs both.

**Q:** How far back does the usage analytics view go?  
**A:** Up to 90 days, with data through the previous day. Export regularly for longer trends.

</details>

### Check your understanding

**Scenario: Enterprise admin missing spend data**
*Study area: Usage analytics · medium*

A client's Enterprise Admin can open the analytics dashboard and see adoption data but cannot find the Spend report the CFO requested. What is the most likely explanation?

- **A.** Enterprise Admins can view analytics except Spend, so an Owner or Primary Owner must pull that report.
- **B.** Spend data is only published after the end of each quarter, so the report will appear in a few weeks.
- **C.** The Spend report requires the organization to connect a GitHub account before it can be generated.
- **D.** Analytics on Enterprise are available only through the Admin API, so the dashboard never shows Spend.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The Help Center states that Enterprise Admins can view all usage analytics except Spend. An Owner or Primary Owner can access it.

_Why a tempting wrong answer misses:_ GitHub (C) relates to Claude Code contribution metrics, not spend, and the dashboard is available alongside the API (D).

Reference: https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans

</details>

---

**Scenario: Procurement team value report**
*Study area: ROI measurement · medium*

A client sponsor asks for proof that Claude is paying off in procurement. Weekly active users are high. What makes the strongest value report?

- **A.** Weekly active user counts across the whole company, shown as a rising trend line since the launch date.
- **B.** Survey results showing that most procurement staff say they would be disappointed if Claude were removed.
- **C.** Workflow outcome metrics such as quote-comparison cycle time, compared to the discovery baseline, alongside usage.
- **D.** The total number of messages sent in procurement, converted into hours saved at a flat rate per message.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Outcome metrics measured the same way as the discovery baseline show value; usage shows reach. Together they make a credible ROI case.

_Why a tempting wrong answer misses:_ Converting message counts to hours (D) assumes every message saves the same time, which is not evidence of any outcome.

Reference: https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans

</details>

---

## Operating model after go-live

Hand the client a sustainable model for curating skills and plugins, governing changes, and supporting users.

**You will be able to:**

- Design a skills and plugins library with clear ownership
- Scope capabilities to groups using plugins
- Set up a review and release process for skill and prompt changes
- Define support tiers and a feedback loop

**Key points**

- Owners on Team and Enterprise can provision skills for everyone from Organization settings > Skills. Skills require code execution and file creation to be turned on.
- Provisioning a skill in organization settings gives it to everyone. To reach only one team, bundle the skills into a plugin and assign that plugin to a group.
- Plugin marketplaces let owners distribute curated plugins. Plugins can be added by manual ZIP upload or by syncing a private GitHub repository, which suits teams that review changes like code.
- Treat skills and shared prompts as products: each has an owner, a version history, a test set, and a retirement date if unused. Review changes before release, the same way you would review code.
- Define support tiers: champions for how-to questions, the internal platform team for access and configuration, and escalation to the partner or Anthropic support for defects.
- Run a monthly review that looks at usage, new requests, retired items, and open risks. The operating model is what keeps value growing after the partner steps back.

**Practice:** Draft a RACI for the client's skills library: who proposes, builds, reviews, approves, releases, and retires a skill. Add the repository and marketplace path a new skill travels through.

**Read:** [Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization) · [Manage Claude Cowork plugins for your organization](https://support.claude.com/en/articles/13837433-manage-cowork-plugins-for-your-organization) · [Use plugins in Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude)

<details><summary>Flashcards</summary>

**Q:** How do you give skills to only one team?  
**A:** Bundle them in a plugin and assign the plugin to that group. Organization-level skill provisioning reaches everyone.

**Q:** Two ways to add plugins to an org marketplace  
**A:** Manual ZIP upload in the admin UI, or syncing a private GitHub repository.

**Q:** Prerequisite for organization skills  
**A:** Code execution and file creation, and Skills, must be turned on in organization settings.

</details>

### Check your understanding

**Scenario: Marketing-only skills**
*Study area: Skills and plugins library · medium*

A client has ten approved skills for its marketing team and does not want them cluttering everyone else's workspace. How should the owner distribute them?

- **A.** Upload all ten skills under Organization settings > Skills, which automatically limits them to marketing staff.
- **B.** Email the skill ZIP files to marketing staff and ask each person to upload them to their own account manually.
- **C.** Paste the skill instructions into a shared project, since projects are how skills are scoped to specific groups.
- **D.** Bundle the skills into a plugin and assign that plugin to the marketing group in the organization.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Organization-level skill provisioning reaches everyone. To target one group, the documented approach is to bundle the skills in a plugin and assign it to that group.

_Why a tempting wrong answer misses:_ Option A is tempting, but provisioning through Organization settings > Skills gives the skills to every user, not just marketing.

Reference: https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization

</details>

---

**Scenario: Shared plugin library with several authors**
*Study area: Skill governance · hard*

After go-live, five people across a client's operations team maintain a growing set of shared plugins, and a bad edit recently broke a widely used skill. Which operating-model change best prevents a repeat?

- **A.** Let each author upload new plugin ZIPs directly whenever they finish a change, so updates reach users faster.
- **B.** Keep plugins in a private GitHub repository synced to the org marketplace, with review and tests before merge.
- **C.** Freeze the library permanently and stop accepting new skills until the program is reviewed again next year.
- **D.** Ask users to keep a personal copy of every skill they rely on so they can fall back if a shared one breaks.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

GitHub syncing to a plugin marketplace suits multi-author teams, and code-style review with a test set catches bad edits before they reach users.

_Why a tempting wrong answer misses:_ Unreviewed direct uploads (A) are exactly how the breaking edit reached users; personal copies (D) fragment the library.

Reference: https://support.claude.com/en/articles/13837433-manage-cowork-plugins-for-your-organization

</details>

---

## Scaling to Claude Code for engineering teams

Extend the deployment to engineering with managed settings, sensible defaults, and engineering-specific measurement.

**You will be able to:**

- Explain how managed settings enforce policy over local developer configuration
- Choose a delivery channel for managed settings
- Plan an engineering pilot with repository-level conventions
- Measure Claude Code adoption and contribution

**Key points**

- Claude Code enforces organization policy through managed settings, which take precedence over a developer's local configuration.
- Managed settings can be delivered from the Claude admin console (Team or Enterprise plans), through MDM, or as a file on disk. Server-managed settings are fetched at startup and refreshed hourly.
- Managed settings can restrict tools, commands, MCP servers, network destinations, and which plugin marketplaces users may add.
- Start engineering pilots in one or two repositories with a shared CLAUDE.md, agreed permission settings, and a review norm that Claude-authored changes go through the same pull request process as any other.
- The Claude Code analytics dashboard for Team and Enterprise shows usage metrics such as lines of code accepted, suggestion accept rate, and daily active users and sessions.
- Contribution metrics, in public beta, connect a GitHub organization to show pull requests and lines shipped with Claude Code assistance. They require GitHub Cloud and a GitHub admin to install the app.

**Practice:** Write a managed-settings plan for a client's platform team: three things you would restrict, one you would allow by default, the delivery channel you would use and why, and the two analytics views you would review after the first month.

**Read:** [Set up Claude Code for your organization](https://code.claude.com/docs/en/admin-setup) · [Claude Code settings](https://code.claude.com/docs/en/settings) · [Track team usage with analytics](https://code.claude.com/docs/en/analytics)

<details><summary>Flashcards</summary>

**Q:** Precedence of Claude Code managed settings  
**A:** They take precedence over a developer's local configuration.

**Q:** Delivery channels for Claude Code managed settings  
**A:** The Claude admin console (Team/Enterprise), MDM, or a file on disk. Server-managed settings refresh hourly.

**Q:** What contribution metrics add to Claude Code analytics  
**A:** With GitHub Cloud connected, PRs and lines shipped with Claude Code assistance. Public beta; a GitHub admin installs the app.

</details>

### Check your understanding

**Scenario: Fintech platform team policy**
*Study area: Claude Code managed settings · medium*

A fintech's platform team wants to limit which MCP servers and network destinations Claude Code can reach, regardless of what developers put in their own configuration. What should you recommend?

- **A.** Publish a recommended settings file in the wiki and ask developers to copy it into their home directory.
- **B.** Add the restrictions to each repository's CLAUDE.md, since project memory overrides user-level settings.
- **C.** Deploy managed settings through the admin console, MDM, or a file, because they override local config.
- **D.** Rotate developers' API keys weekly, so that any unapproved MCP server loses access at the next rotation.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Managed settings take precedence over local developer configuration and can restrict tools, MCP servers, and network destinations. They can be delivered from the admin console, MDM, or a file.

_Why a tempting wrong answer misses:_ CLAUDE.md (B) carries instructions, not enforced policy; a developer's local settings can still differ.

Reference: https://code.claude.com/docs/en/admin-setup

</details>

---

**Scenario: Engineering VP impact question**
*Study area: Claude Code analytics · medium*

An engineering VP on Claude Enterprise asks whether Claude Code is changing how much code actually ships, not just how often it is used. What should you set up?

- **A.** Contribution metrics, which connect the GitHub organization to show PRs and lines shipped with Claude Code help.
- **B.** The chat usage analytics view, which reports lines of code merged per repository alongside conversation counts.
- **C.** A quarterly survey asking engineers to estimate what percentage of their merged code Claude Code wrote.
- **D.** The audit log export, which lists every file Claude Code changed together with the content of each diff.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Contribution metrics, in public beta for Team and Enterprise, connect GitHub Cloud to track PRs and lines shipped with and without Claude Code assistance.

_Why a tempting wrong answer misses:_ Audit log exports (D) contain event identifiers, not diff content, and do not measure shipped output.

Reference: https://code.claude.com/docs/en/analytics

</details>

---
