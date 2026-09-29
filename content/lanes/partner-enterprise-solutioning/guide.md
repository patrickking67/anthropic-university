# Enterprise Solutioning with Claude

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with
> Anthropic. Plan and feature facts verified against [claude.com/pricing](https://claude.com/pricing)
> and [support.claude.com](https://support.claude.com) on 2026-09-28. Plans and prices change;
> re-check both pages before you put a number or a feature claim in front of a client.

Selling Claude well is mostly about fit. The client who gets the right offering, scoped to a
measurable problem, with honest answers to their hard questions, renews and expands. The client who
gets an oversized rollout justified by a feature they already had does not. This guide walks
through the work in the order it happens: know the product map, know what Enterprise actually adds,
listen for signals, run discovery, frame value, handle objections, and write a proposal that holds
up.

The scenarios here are illustrative and invented for this guide.

## 1. The product map

There are three broad ways an organization uses Claude, and a lot of confusion in early meetings
comes from mixing them up.

**The Claude apps**, on web, desktop, and mobile, are what employees use directly. They are sold as
plans:

| Plan | Who it's for | Highlights (per claude.com/pricing) |
| --- | --- | --- |
| Free | Individuals trying Claude | Chat on web, desktop, and mobile |
| Pro | Individuals | Adds Claude Code, web search, Projects, memory, and more models |
| Max | Heavy individual users | Everything in Pro with 5x or 20x Pro usage and higher output limits |
| Team | Organizations | Standard and Premium seats; Claude Code and Cowork; enterprise search; central billing and administration; single sign-on; connector controls |
| Enterprise | Organizations with governance needs | Everything in Team plus role-based access, SCIM, audit logs, Compliance API, custom data retention, HIPAA-ready offering, IP allowlisting |

At the time of writing, the pricing page lists Pro at $20 a month ($17 billed annually), Max from
$100 a month, Team Standard seats at $20 to $25 and Premium seats at $100 to $125 per seat per month,
and Enterprise at a $20 per-seat platform fee plus usage billed at API rates. Don't memorize these;
look them up each time.

**Claude Code** is Anthropic's agentic coding tool. It runs in the terminal, in IDEs, in the desktop
app, and on the web. Organizations get it through Pro, Max, Team, or Enterprise seats, or by using
API keys.

**The Claude Developer Platform** (the Claude API and Console) is for building Claude into the
client's own products, internal tools, and automated workflows. Usage is billed per token, by model.

**Cloud platforms.** Claude is also available through Amazon Bedrock, Google Cloud Vertex AI, and
Microsoft Foundry. For clients with deep commitments to one cloud, this lets them procure Claude
through their existing agreement and manage it with the identity, networking, and billing they
already use. Feature availability can differ by platform, so check the relevant platform page before
promising a specific capability.

The single most useful early question is: **are we equipping people, building into products and
processes, or both?** A 900-person manufacturer might want Team or Enterprise seats for its office
staff and an API integration that reads supplier emails and updates its ERP. Those are two
different purchases with different owners, and naming that early keeps the conversation organized.

## 2. What Claude Enterprise adds

Enterprise builds on Team. Be precise about the difference, because security teams will check.
According to Anthropic's Enterprise plan article and pricing page, Enterprise adds:

**Identity and access.**
- **SCIM provisioning** synchronizes users from the client's identity provider, so joiners get
  access and leavers lose it automatically.
- **Role-based access control** for finer-grained permissions.
- Note that **single sign-on is on both Team and Enterprise.** It is not, by itself, a reason to
  upgrade.

**Visibility and oversight.**
- **Audit logs** capture user actions, system events, and data access.
- The **Compliance API** gives programmatic access to activity logs, chat histories, and file
  content, filterable by user and time range. It's the foundation for eDiscovery and for feeding a
  client's own monitoring tools. Coverage has edges: Anthropic's support article notes, for example,
  that it doesn't cover sessions run on Amazon Bedrock or Google Vertex AI. Check the current article
  before promising coverage for a given surface.
- An **Analytics API** provides aggregated engagement and adoption metrics.

**Data governance.**
- **Custom data retention controls** let an organization's Primary Owner or Owner set how long chats
  and projects are kept.
- **Customer-managed encryption keys** let the client provision a key in its own cloud provider that
  Anthropic uses to protect chats, projects, and files.
- **US-only inference** keeps the organization's inference within the United States.

**Security posture.**
- Anthropic lists SOC 2, ISO 27001, GDPR, and CCPA compliance, a **HIPAA-ready offering**, and
  **IP allowlisting**. The Trust Center is where reviewers get the actual reports.

**Commercial model.** The Enterprise seat fee covers access to the platform. All usage across
Claude, Claude Code, and Cowork is billed separately at standard API rates, based on what the
organization actually consumes, with no per-seat usage limits and no included token allowance. This
matters for forecasting: an Enterprise budget has a fixed seat component and a variable usage
component, and your proposal should model both.

## 3. Hearing signals and mapping them to features

Clients rarely ask for "SCIM." They describe a pain. Your job is to hear the pain, name the
capability that relieves it, and confirm before you propose. A working map:

| What you hear | What it usually points to |
| --- | --- |
| "IT adds and removes users by hand and we missed a leaver." | SCIM provisioning (Enterprise) |
| "Legal needs to produce conversations if we're sued, and delete them on schedule." | Compliance API plus custom retention (Enterprise) |
| "Security wants to know who did what, and when." | Audit logs; the Compliance API for programmatic monitoring (Enterprise) |
| "People are using personal accounts and finance can't see the spend." | An organization plan with central billing, administration, and SSO (Team or Enterprise) |
| "Our AI spend has to go through our cloud commitment." | Amazon Bedrock, Google Cloud Vertex AI, or Microsoft Foundry |
| "Our developers want an agent that works in the codebase." | Claude Code on seats or API keys |
| "We need encryption keys we control." | Customer-managed encryption keys (Enterprise) |

Two disciplines keep this honest.

**Confirm before proposing.** "It sounds like offboarding is the real concern. How many people leave
in a typical month, and how do you find out today?" The answer tells you whether the need is real
and how much it's worth.

**Justify upgrades with gaps, not size.** A good Team-to-Enterprise trigger is a governance or scale
need that Team cannot meet: automated deprovisioning, audit logs, eDiscovery, custom retention,
customer-managed keys. Seat count on its own is not a trigger, and neither is SSO or access to Claude
Code and Cowork, because Team already includes them. Partners who upsell on features the client
already has lose credibility the moment the client's IT lead reads the pricing page.

## 4. Structured discovery

Discovery is where most deals are won or lost, usually without anyone noticing. A consistent
structure keeps you from proposing too early. Cover six areas:

1. **The problem and its owner.** What is going wrong, for whom, and who is accountable for fixing it?
2. **The current process.** How is the work done today, step by step?
3. **Volumes and baselines.** How many, how long, how often, at what cost, with what error rate?
4. **Data and systems.** Where does the information live, and how would Claude reach it?
5. **Constraints.** Security, compliance, data residency, procurement rules, change-management capacity.
6. **Decision process.** Who approves, who can block, what the timeline is, and what else is competing
   for the budget.

Technique matters as much as coverage. Open with a concrete, recent example: "Walk me through the
last invoice exception your team handled." Specific stories reveal the real process in a way that
"tell me about your workflow" never does. Then quantify: "How many of those a week? How long each?
What happens when one is missed?"

**Map the stakeholders early.** An AI purchase usually involves a budget owner, a technical owner,
security and legal reviewers, and at least one end-user champion. Each needs a different
conversation, and the reviewers can stall a deal late if they hear about it last.

**Capture the baseline before any pilot.** If you don't record today's cycle time, backlog, or error
rate, you can't show improvement later, and the pilot's success becomes a matter of opinion.

**Look for disqualifiers.** A rule that no data may ever leave the client's environment, or a
requirement for guaranteed identical outputs, changes the design or ends the opportunity. Better to
learn it in week one.

**Close with a written summary** the client confirms: the problem, the success criteria and how each
is measured, scope boundaries including what's out, open risks, and the next step. This document
becomes the spine of your proposal.

## 5. Business value and ROI

Clients buy outcomes, and each use case should tie to one primary kind of value. Four cover most
cases:

- **Time returned:** skilled people spend fewer hours on drafting, searching, or summarizing.
- **Quality and consistency:** fewer errors, more uniform output, better adherence to standards.
- **Capacity and speed:** more cases handled, faster response, backlog reduced without new hires.
- **Risk and compliance:** fewer missed obligations, better audit trails, less manual review effort.

Anchor each one to a metric the client **already tracks**. A claims leader believes cycle-time and
cost-per-claim numbers from their own dashboard far more than any benchmark.

A simple ROI model is enough, provided every assumption is visible:

> ROI = (value of time saved or revenue enabled + avoided costs − total cost) ÷ total cost

Total cost must be complete: seats, usage at API rates, integration and build work, and change
management and training. Leaving any of these out is the fastest way to lose a CFO's trust.

Work an example. A claims team handles 2,000 claims a month, and a pilot cut drafting time by 12
minutes per claim. That's 400 hours a month. At an assumed loaded cost of $60 an hour, the gross
figure is $24,000 a month. But be conservative: if only 70% of those hours are realized as capacity
the business actually uses, the figure is closer to $16,800. Subtract the monthly cost of seats,
usage, and amortized services, and present a low and high case with those assumptions printed on the
slide. The CFO will change your assumptions; let them, because a model they've adjusted is a model
they own.

**Design pilots to produce evidence.** Keep the scope narrow, capture the baseline, fix the
measurement window, and agree on success thresholds before the pilot starts. A pilot without
pre-agreed thresholds tends to end in "it seemed good" and no decision.

**Resist the big number.** When a sponsor wants to promise "40% productivity for everyone" based on
one enthusiastic team, offer a range grounded in measured data instead. The inflated figure may win
a quick approval, but it becomes the benchmark you are judged against at renewal.

## 6. Handling objections with verified facts

Use the same four steps for every objection: **acknowledge** the concern, **clarify** what is behind
it, **answer** with a fact and a public source, and **confirm** it's resolved. If you can't verify
something on the spot, say you'll confirm in writing. Never improvise a security or legal claim.

**"You'll train on our data."** Anthropic states that inputs and outputs from its commercial
products, which include Team, Enterprise, and the API, are not used to train models by default. The
exceptions are when the customer explicitly opts in, or when a user submits feedback such as a thumbs
rating. Cite the Enterprise page or the relevant support article, and let the client's reviewers read
the Commercial Terms themselves.

**"Show us your security posture."** Point to Anthropic's Trust Center for reports such as SOC 2 and
ISO 27001, then walk through the Enterprise controls relevant to their concern: SSO, SCIM, audit logs,
role-based access, IP allowlisting, customer-managed keys. For regulated health data, Anthropic lists
a HIPAA-ready offering for Enterprise; confirm scope and requirements with Anthropic rather than
asserting it applies automatically.

**"How long do you keep our data?"** Enterprise supports custom retention periods. For API
workloads, Anthropic offers zero data retention and HIPAA-readiness arrangements for eligible
organizations, with details in the API data retention documentation.

**"It made something up in the demo."** Take this seriously; it's a fair concern. Acknowledge that
language models can produce errors. Then explain the mitigations you will design in: grounding
answers in the client's documents, requiring citations, measuring accuracy with evals on real cases,
and keeping human review for high-stakes outputs. Don't claim that a paid plan, a setting, or a bigger
model eliminates the problem. None of them do.

**"It's too expensive."** Move the conversation from sticker price to economics. Show cost per
completed task compared with what that task costs today, and show the levers available to tune it:
model tier, effort, prompt caching, and batch processing for asynchronous work. Discounting out of your
own margin doesn't address the concern and trains the client to push on price.

## 7. Proposals and statements of work

A proposal persuades; a statement of work (SOW) protects both parties. Write the proposal from the
confirmed discovery summary: restate the problem in the client's own words, the agreed success
criteria, the recommended offering, and why it fits better than the alternatives you considered.

A solid SOW includes:

- **Objectives** tied to the success criteria.
- **Scope**, with an explicit out-of-scope list. The out-of-scope list prevents more disputes than
  anything else in the document.
- **Deliverables with acceptance criteria.** Make these measurable. "The assistant works well" is not
  acceptable; "summaries meet the agreed rubric on at least 90% of a signed-off test set of 200
  contracts" is.
- **Assumptions and client dependencies**, such as access to systems, sample data, and reviewers'
  time.
- **Timeline, milestones, and phase gates.** A common shape is pilot, then production rollout, then
  scale and optimize, with each gate tied to measured results rather than dates alone.
- **Roles, change control, and commercial terms.**

Add assumptions specific to AI work, because clients rarely think to ask:

- Outputs are probabilistic. High-stakes outputs will have human review.
- Model versions and prices may change during the engagement. Evals will be re-run after any model
  change.
- Accuracy depends on the quality and availability of the client's source data.

Finally, **show Anthropic licensing and usage separately from your services fees.** Platform cost
recurs and scales with seats and consumption; delivery work is bounded by the SOW. Separating them
lets the client budget each correctly and see exactly what continues after your engagement ends.

## Bringing it together

A good Claude engagement follows a straight line: the right product for the client's situation,
capabilities matched to real needs, a baseline captured before anything is built, value expressed in
the client's own metrics, objections answered with facts you can cite, and a scope with acceptance
criteria both sides can measure. Keep each step honest, and the renewal conversation takes care of
itself.

For official material, see the Anthropic Academy courses listed with this lane. Registered partners
should also work through the Claude Partner Network learning path and the CPN Connect on-demand
library.
