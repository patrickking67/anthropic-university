# Partner Delivery and Adoption

> Anthropic University learning lane. Original, unofficial study material created by Patrick King. Not affiliated with or endorsed by Anthropic. Product facts were checked against Anthropic's public docs and Help Center on 2026-09-28; re-check them before you rely on them with a client.

Selling a Claude deployment is the easy part. What clients remember is whether, six months later, people actually use it for work that matters and whether someone can show what it changed. This lane follows one engagement from the first workshop to the day the partner steps back, and at each stage it names the decision you have to get right.

It assumes you have completed *Partner Enterprise Solutioning* and know the Claude plans, surfaces, and admin concepts. Here we focus on delivery craft.

## 1. Discovery: start from the work, not the product

The most common opening request is also the least useful: "Roll Claude out to everyone." A company-wide launch with no focus produces a spike of curiosity, a slow fade, and a renewal conversation with nothing to point at. Discovery exists to turn that mandate into a short list of workflows where Claude will make a visible difference.

Run the workshop around tasks. Ask each group what they do every week, what they put off, what they redo because the first attempt was not good enough, and what they hand to someone else because it is tedious. Resist demonstrating features early. Once people see a demo, they start describing the demo back to you instead of describing their work.

Then score what you heard. Two axes do most of the work:

- **Value**: time saved, quality improved, risk reduced, or revenue affected. Be concrete. "Saves the team about six hours a week on first drafts" beats "improves productivity."
- **Feasibility**: the inputs are digital and Claude can reach them, a subject-matter expert can tell a good output from a bad one quickly, and a mistake would be caught before it caused harm.

Plot the ideas. The first pilots come from the corner that is high on both. Ideas that are valuable but not yet feasible go on a roadmap, and each gets a named blocker, such as "needs a connector to the claims system" or "no one owns this process today." Naming the blocker turns a vague "later" into a work item.

Every shortlisted workflow leaves discovery with three things attached:

1. A **business owner** who wants the outcome and will make decisions.
2. A **subject-matter expert** who can judge whether an output is right.
3. A **baseline**: how long the task takes today, how often it is redone, or whatever measure you will compare against later.

Also note what data each workflow touches and how sensitive it is. That single column saves time in rollout planning and in the governance review.

Keep the list short. Three to five focused workflows teach you more than twenty shallow ones, and they let you attribute results. When a sponsor pushes for more, explain that a small first wave is how you build evidence for a larger second one.

## 2. Pilot design: every pilot should end in a decision

A pilot is an experiment, and an experiment needs a hypothesis and a way to measure it. The failure mode is a pilot that "goes well" for months while no one can say whether it worked.

**Write success criteria before launch.** Anthropic's guidance on defining success criteria asks that they be specific, measurable, achievable, and relevant. Translate that into the client's language. "Attorneys like it" is not a criterion. "Summaries need under 15 minutes of edits on average, down from 45, and no summary omits a termination clause" is.

**Build an evaluation set.** Collect representative inputs from real client work, with an expected output or a grading rubric for each. Include hard cases on purpose: the ambiguous document, the edge-case request, the one that went wrong last quarter. Keep the set fixed. When someone changes the prompt, revises a skill, or tries a different model, rerun the same set with the same rubric. Only then can you say the change helped.

Grading comes in three flavors, and you can mix them:

- **Code-based**: exact matches, required fields present, correct format. Cheap and consistent.
- **Human**: the SME scores each output against the rubric. Slower, but it captures judgment.
- **Model-based**: Claude grades outputs against a clear rubric. Useful at volume once you have checked that its grades agree with the SME's on a sample.

**Choose the cohort carefully.** Pick people who do the target workflow often and whose manager wants the pilot to succeed. Keep a baseline from the same people before the pilot, or from a comparable group. Leadership-only pilots feel safe but test the wrong users for frontline work.

**Agree on the decision rule up front.** Before the pilot starts, write down what result means "scale," what means "extend with changes," and what means "stop." When the pilot ends, the conversation is about the result, not about where to put the goalposts.

## 3. Rollout planning: land users in a governed workspace

The technical rollout should be boring. Users sign in with their company identity, see the tools they are supposed to see, and find help when they need it. Getting there depends on sequencing.

**Identity first.** Single sign-on is available on Team and Enterprise plans and on Console organizations. Setup needs someone with the Owner or Primary Owner role, access to company DNS to verify the email domain, and access to the identity provider. Lining up those three people is often the longest lead-time item in the whole plan, so start it in week one.

**Choose a provisioning mode.** There are three:

- *Invite only*, the default, where admins add and remove people by hand.
- *Just-in-time (JIT)*, where users assigned to the Claude app in the IdP get an account the first time they sign in. It is available on Team and Enterprise.
- *SCIM directory sync*, where the IdP provisions and deprovisions users automatically based on assignments. SCIM is Enterprise-only.

The distinction matters in scoping conversations. A Team-plan client who wants automatic removal of departed staff is asking for SCIM, which means an Enterprise conversation, or a manual offboarding step in their HR process.

**Decide the launch feature set on purpose.** Which connectors are on at launch? Who approves a request for a new one? Cowork is on by default for Team and Enterprise organizations, and owners can turn it off in organization settings; decide whether it is part of wave one. If the client runs its own MCP servers, note that Cowork reaches connectors through Anthropic's cloud, so a custom connector must be reachable from the public internet. Private or firewalled servers need a plan before launch, not after.

**Manage the desktop.** Claude Desktop can be controlled through system policies. On macOS, an MDM tool deploys a configuration profile for the preference domain `com.anthropic.claudefordesktop`; on Windows, policies live in the registry. Machine-level policy takes precedence over the in-app allowlist, which is what IT teams usually want.

**Roll out in waves.** Pilot cohort, then department by department. Before each wave, have the support channel open, a known-issues list ready, and champions briefed. A wave that launches without support creates the impression that the tool is broken even when it is not.

## 4. Change management: behavior changes one workflow at a time

Adoption does not come from the launch email. It comes from people finding that Claude helps with something in their actual week, and then telling a colleague.

**Train on real tasks.** A 45-minute session built around two of the team's own recurring tasks will change more behavior than a two-hour feature tour. End each session with a worked example people can reuse the next morning.

**Teach judgment, not just clicks.** People need to know when a task is a good one to hand to Claude, how to describe it clearly, how to check what comes back, and when they must stay accountable for the result. Anthropic Academy's *AI Fluency: Framework & Foundations* course is a good shared reference for this, and *Claude 101* covers the everyday product features.

**Build a champion network.** Champions are practitioners inside each team, not the program office. They share working examples, run informal office hours, and tell the program team where people are getting stuck. Give them early access, a private channel, and public credit. Their examples persuade colleagues far better than vendor material does.

**Set expectations in launch messages.** Say what Claude is approved for, what data may and may not go in, where to get help, and that people remain responsible for what they send onward. Clear rules reduce anxiety, which increases use.

**Diagnose stalls specifically.** When one department lags, find out why before you act. Common causes are that no one has shown them a relevant use case, a connector they need is missing, the policy feels unclear, or a manager is skeptical. Each has a different fix. Mandatory usage quotas fix none of them; they produce logins without value and resentment besides.

## 5. Governance: a usable policy and a proportionate review

Clients need two governance artifacts: an acceptable-use policy that employees can follow, and a review gate for use cases that carry more risk.

**The acceptable-use policy.** Keep it short enough to read. The sections that matter most are:

- Approved tools and accounts. Work happens in the company's organization, not personal accounts.
- Data classes. What may be entered into prompts or reached through connectors, and what may not.
- Human review. When a person must check an output before it is used externally or in a decision.
- Disclosure. When the client must tell customers or others that AI was involved.
- Reporting. Where to raise a problem or a near miss.

The client's counsel owns the final language. Your role is to bring a workable structure and examples.

**Anthropic's Usage Policy sits underneath.** Every deployment must follow it, and it contains requirements your governance review should check for. It names high-risk use cases, including legal, healthcare, insurance, finance, and employment and housing decisions, among others. When these outputs directly affect individuals or consumers, the policy requires that a qualified professional review the content or decision before it is finalized, and that people be told AI helped produce it. Separately, any consumer-facing chatbot or external interactive agent must disclose that users are talking to AI, at least at the start of each session.

**Scale the review to the risk.** An internal drafting aid for marketing copy needs a light check. An agent that takes actions in systems of record, or that touches a regulated decision, needs a written review covering the data involved, who is affected, failure modes, where humans intervene, and how to roll back.

**Know the oversight evidence.** Enterprise organizations can export audit logs covering the past 180 days. The export records events with identifiers for chats and projects, not their titles or content. The Compliance API gives security and compliance teams programmatic access to activity. Knowing what exists helps you answer the CISO's first question.

## 6. Measuring adoption and ROI

Sponsors renew what they can defend. Your job is to give them a report they can defend.

**Know the analytics.** Team and Enterprise organizations have a usage analytics view covering activity, feature adoption, and spend. On Team, Owners and Primary Owners can see it. On Enterprise, Admins can see it too, with one exception: Admins cannot see Spend. The view reaches back up to 90 days, with data through the previous day, so export regularly if the client wants longer trends. Enterprise organizations can also pull analytics through the Admin API with a key that has the `read:analytics` scope, which is useful for feeding a client's own BI tools.

**Separate activity from outcomes.** Activity metrics, like active users, sessions, and feature use, show reach. Outcome metrics, like cycle time, rework rate, throughput, and quality scores, show value. A high active-user count with no outcome data invites the question "so what?" Outcome data with no usage context invites "is anyone actually using it?" You need both.

**Compare against the discovery baseline.** Use the same measurement method you used in discovery. If you timed contract triage with a stopwatch study before, do the same after. Switching methods mid-program makes any comparison unreliable.

**Report per workflow.** "Quote comparison now takes two hours instead of a day" is something a sponsor can repeat to their CFO. "Usage is up 40 percent" is not. Add one short story from a real user, and end each report with a decision you want the sponsor to make, such as expanding to the next department.

## 7. The operating model after go-live

The engagement succeeds when the client can keep improving without you. That requires an operating model: who curates the skills and plugins, how changes are reviewed, and how users get support.

**Curate a library.** Owners on Team and Enterprise plans can provision skills to everyone from organization settings. Skills depend on code execution and file creation being enabled. Organization-level provisioning reaches every user, which is right for company-wide skills like a house writing style. For a skill set that belongs to one team, bundle the skills in a plugin and assign that plugin to the team's group.

**Distribute through a marketplace.** Owners can create plugin marketplaces to distribute curated plugins across the organization. Plugins can be added by manual ZIP upload or by syncing from a private GitHub repository. Once more than one or two people maintain plugins, the GitHub route pays for itself: changes go through pull requests, reviewers catch mistakes, and history shows who changed what.

**Treat skills as products.** Each skill needs an owner, a version history, a small test set, and a retirement date if nobody uses it. Review changes before release. A single bad edit to a widely used skill can undo months of trust.

**Define support tiers.** Champions answer how-to questions. The client's internal platform team handles access and configuration. Defects go to the partner or to Anthropic support. Publish the path so people know where to go.

**Run a monthly review.** Look at usage trends, new requests, retired items, open risks, and the next workflow to pilot. This meeting is what keeps value growing after launch energy fades.

## 8. Scaling to Claude Code for engineering teams

Engineering is often the second wave, and it has its own controls and metrics.

**Managed settings are the policy layer.** Claude Code enforces organization policy through managed settings, which take precedence over a developer's local configuration. They can restrict tools, commands, MCP servers, network destinations, and which plugin marketplaces developers may add. You can deliver them from the Claude admin console on Team or Enterprise plans, through MDM, or as a file on disk. Server-managed settings are fetched at startup and refreshed hourly, so there is no endpoint infrastructure to run.

A useful distinction for client conversations: a repository's `CLAUDE.md` is guidance that shapes how Claude works in that project. It is not enforcement. When the security team says "must," the answer is managed settings.

**Pilot in one or two repositories.** Agree on a shared `CLAUDE.md`, sensible permission settings, and a norm that changes Claude helps write go through the same pull request review as any other change. Anthropic Academy's *Claude Code in Action* course is a strong enablement companion for this wave.

**Measure with the right dashboard.** The Claude Code analytics dashboard for Team and Enterprise shows usage metrics such as lines of code accepted, suggestion accept rate, and daily active users and sessions. Contribution metrics, in public beta, connect a GitHub organization and show pull requests and lines shipped with Claude Code assistance. They require GitHub Cloud and a GitHub admin to install the app. For an engineering VP asking whether more code actually ships, contribution metrics answer the question more directly than usage counts do.

## Putting it together

A good delivery engagement follows a steady rhythm. Find a few workflows worth changing and measure them. Prove the change in a pilot that ends in a decision. Roll out in waves on a governed foundation. Teach people through their own work. Govern in proportion to risk. Report outcomes, not just activity. Leave behind an operating model that someone owns. Every stage above feeds the next: the baseline you capture in discovery becomes your ROI evidence, the data column becomes your governance scope, and the champions from training become the support tier of the operating model.

Keep the official material close. The Claude Partner Network learning path and the Anthropic Academy courses listed with this lane go deeper on each area, and the Help Center articles linked in each module are the authority on how the product behaves today.
