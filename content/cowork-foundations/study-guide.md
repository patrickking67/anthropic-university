# Claude Cowork – Foundations — Study Guide

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. It teaches the publicly documented concepts the exam covers; the questions and examples here are original, not real exam items.

This guide covers the five domains of the Cowork – Foundations track. **Cowork** is the desktop mode where Claude works *alongside you* — on your files, in your connected apps, in your browser, with your tools. The recurring skill this track tests is a mindset shift: **delegating, not just chatting.** In Chat you trade turns and the response *is* the deliverable. In Cowork you describe an *outcome*, and Claude plans the steps, executes them across whatever tools and files the job needs, and saves a **real deliverable** back to your folder — a `.docx`, `.xlsx`, `.pptx`, or `.pdf`, the whole arc handled end to end.

Cowork is built for **multi-step, longer-running work** that spans several tools and ends in an artifact. Throughout the exam, favor answers that reflect two habits: **point Claude at the right context** (the folder, the connectors, the specifics) and **stay in control** (read the plan, approve deliberately, steer mid-task). Claude prepares; you ship.

## Cowork Foundations

Cowork is a **mode of Claude in the desktop app** (Mac and Windows), not a separate product. You pick it from the mode selector in the top-right. The core distinction is *the shape of the work*, not which features are switched on.

**The delegating mental model.** You give Cowork an outcome ("a one-page launch brief"), and it plans, executes the steps, uses the tools and files it needs, and **saves a deliverable** back to your working folder. You stay in control the whole time: Claude **shows its plan before starting**, by default **asks before actions that matter** (sending, posting, sharing), **always asks before deleting**, and lets you **steer anytime**.

**Chat vs. Cowork vs. Code** — three modes for three shapes of work:

| Mode | One line | Best for | The deliverable is… |
| --- | --- | --- | --- |
| **Chat** | *Thinking with Claude* | Quick exchanges, brainstorming, drafting you'll refine, exploratory thinking | The conversation itself |
| **Cowork** | *Delegating to Claude* | Multi-step work across files and tools that produces a saved artifact you set in motion and come back to | A saved file |
| **Code** (Claude Code) | *Building software with Claude* | Repo/developer work — edits source, runs tests, makes git commits | Changed code in a codebase |

**Key traps to internalize:**

- **A connector being involved does NOT make something Cowork.** Chat can pull from connectors too. The signal for Cowork is a **deliverable that must be produced and saved somewhere.** "Summarize what the team said in Slack" is Chat if the answer is the summary on screen; it becomes Cowork when that summary must land as a saved brief in your folder.
- **Chat memory vs. Cowork context.** In Chat the answer is the conversation, and memory builds itself. Cowork's value is the *artifact*, and you review that artifact, not the chat log.
- **Rule of thumb:** Chat for thinking, Cowork for delegating, Code for software. Most knowledge workers live in **Chat + Cowork**.

**Examples.**

- *"Help me think through how to position this launch to enterprise buyers."* → **Chat.** The answer is the conversation.
- *"From the files in my Q3-QBR folder and the #launch channel since June 1, build a one-page brief for the QBR, saved as a .docx."* → **Cowork.** Multi-step, spans files and a connector, ends in a saved deliverable.
- *"Add retry logic to the payments module and run the test suite."* → **Code.** Source edits and commits in a codebase.

## Setup, Connectors & Permissions

**Install.** Cowork runs inside the **Claude Desktop app** (`claude.com/download`); find it in the mode selector, top-right. It may require a paid plan or a recent version.

**The folder is the single most important setup choice.** Click **"Work in a project"** and pick a folder. That folder is the **boundary for what Claude can read AND write** — it opens, edits, creates, and organizes files there, and saves outputs back to the same place. This is the key difference from Chat: in Chat, Claude can read what you upload but **can't save back to your computer**; in Cowork it can. **Pick the smallest folder that holds what the task needs** — a `~/Work/Q3-QBR` folder, not the `Documents`, `Downloads`, or `Desktop` catch-alls. You can add another folder later.

**Connectors** reach into the apps where your work already lives — email and calendar, messaging, cloud storage, CRM and project tools. Set them up once in **Customize**, then **toggle them per task**, and reference them naturally in prompts ("check what the team said in Slack about the launch"). Examples: Gmail, Google Calendar, Slack, Google Drive, Microsoft 365 (Outlook, SharePoint, OneDrive, Teams), Box, Notion, Salesforce, HubSpot, Asana, Linear.

**Cloud connectors vary in capability.** Many — including the default Google Drive and Microsoft 365 connectors — are **read-and-search only**; some can create or edit. Check each connector's description. The most reliable place for Claude to **build and iterate on a document** is still your **local working folder**.

**Permission modes** (set per task):

| Mode | What it does | When to use |
| --- | --- | --- |
| **Ask before acting** (default) | Claude **pauses for approval** before each action that touches the outside world — sending an email, posting a message, sharing a file | New tools, unfamiliar files, anything you want to watch closely |
| **Act without asking** | Claude works **without pausing** for those approvals — faster but riskier | Only trusted files/sites while you're **actively supervising** |

**The delete guarantee — the constant in both modes:** Claude **always asks before permanently deleting a file.** No exceptions, and that prompt **can't be skipped** — even in "Act without asking." If an answer implies deletion could ever happen silently, it's wrong.

You also control the same levers as Chat: which **connectors/MCPs** Claude can reach and how often each asks, and **web access** (your org admin can turn web search off; you can limit which sites Claude in Chrome visits). Assess how much you trust a connector or site before extending access beyond the defaults.

**Examples.**

- Setting up a quarterly review: point Cowork at `~/Work/Q3-QBR` (the exact folder), not all of `Documents` — the smaller boundary means a mistake can't reach unrelated files.
- First time using a new vendor portal connector → **Ask before acting**, so you can watch each step. A folder of your own drafts you're actively reviewing → **Act without asking** is reasonable.
- Even in "Act without asking," when Claude proposes removing last month's stale export, it **still prompts** before the delete — you approve or decline.

## Task Patterns & Delegation

**Three patterns signal a good Cowork task.** Most good fits show one or more:

1. **Multi-step** — gather, compare, research, draft, and format, handed off as **one prompt** instead of five.
2. **File-based** — the inputs are **real files in your folder** and the output is a **real artifact saved back.** Cowork works on files you already have, not just files it creates.
3. **Multi-tool** — the work spans Gmail, Slack, Microsoft 365, calendar, or a CRM; Cowork plans across connectors and runs the whole sequence as **one delegation** instead of you stitching prompts together.

The through-line: work that used to mean juggling steps, files, and tools **in your own head** can be handed off as a single task.

**The anatomy of a good prompt names three things:**

- **The deliverable** — "a one-page brief," "a single slide for the QBR," "a ranked list with notes." Specifics on format and length save a regenerate.
- **The inputs** — which folder, which channels, which date range, which app. *Cowork is only as good as the context you point it at.*
- **The nuance / specifics** — audience, purpose, and expert judgment Claude can't guess ("lead with the recommendation," "flag anything we can't verify," "give base/best/worst case").

Leaving a row empty usually means **Cowork will ask you for it.** That's the point: more of the back-and-forth happens **upfront, before Claude starts**, rather than across five rounds of "actually, can you also…".

**Clarifying questions.** Claude asks a couple before starting to close context gaps — which of two files to match, the scope, the audience, how to handle unverifiable claims. Usually you just click an option; if none fit, answer in your own words. **Skipping a question means Claude uses its best guess.**

**Steer mid-task.** Watch the plan and progress. If Claude is on the wrong source, format, or tone, **interrupt** — queue a message. Cowork picks up **from where it was, reusing the analysis it already did.** Don't wait for it to finish and then regenerate (that's the Chat instinct); the cost of a redirect is low. You can also stop, refine the prompt, and restart.

**Review the finished deliverable** — the deliverable is the **artifact, not the chat.** Three checks:

- **Does it meet the actual objective?**
- **Are the facts accurate?** Ask Claude which docs it pulled from, then verify them.
- **Does anything sound made up?** An untraceable date, name, or quote is a flag.

If it's mostly right, **tell Claude what to change** rather than starting over — it edits faster than it regenerates.

**Scheduled tasks (`/schedule`).** Set up a task once and have Claude run it on a cadence — **hourly, daily, weekdays, or manual.** Two ways to create one: start fresh with `/schedule`, or do the task once, confirm the output, then `/schedule` to make that *exact* process recurring. **Critical mechanic:** a scheduled task **only runs when your computer is on and Claude is running.** If the laptop is closed, asleep, or off at the scheduled time, Claude **picks it up when you're back and tells you it was delayed** — it does not run in the cloud. Good for a Friday review, a monthly metrics roll-up, or a morning briefing. **Prefer draft-for-review over send-on-your-behalf** until you trust the run.

**Dispatch.** Start a Cowork task from the **Claude mobile app** while away from your computer; the work actually **runs on your desktop** (same files, connectors, and permissions), and you get a **push notification** when it's done. It only works when the **desktop is on, awake, and signed in with Cowork open.** Dispatch is in **research preview**, currently on **Pro and Max** plans; **Enterprise may not have it yet.**

**Examples.**

- A complete prompt: *"Build a one-page brief [deliverable] from the files in Q3-QBR and the #launch channel since June 1 [inputs]; lead with the recommendation and flag anything we can't verify [nuance]."* All three rows filled, so Claude starts instead of interviewing you.
- Mid-task steer: Claude begins pulling from `#launch-mktg` when you meant `#launch-eng`. You queue *"use #launch-eng"* and it continues from there, keeping the work already done.
- A scheduled Friday summary is set for 5 p.m., but your laptop is closed for the weekend. Claude runs it **Monday when you're back** and notes it was delayed.
- On the train, you use **Dispatch** from your phone to kick off a competitor scan; your desktop at the office runs it and pushes you a notification when the deliverable is saved.

## Customization: Instructions, Projects, Skills, Plugins

Cowork has **four building blocks.** They're independent, and they **compound** — the more Cowork knows (who you are, the stream of work, the process, the role's expertise), the more it can take off your plate. You won't set up all four on day one: **global instructions first**, **projects** as recurring work appears, **skills** when you keep re-explaining a workflow, **plugins** when a process is worth sharing.

**1. Global instructions** — a **standing brief that applies to every Cowork session** (every chat, scheduled task, and Dispatch run). Set it once in **Settings → Cowork → Global instructions.** Put in: who you are and what you do; shorthand and acronyms (so Claude never asks what "the QBR deck" means); and how you like output delivered (format, length, tone). It doesn't need to be complete on day one — the **corrections you keep giving** ("lead with the bottom line," "no Oxford commas") are the candidates. *Contrast with Chat:* Chat memory builds itself automatically; **Cowork's standing context is mostly what you set up.**

**2. Projects** — a **scoped workspace** tied to one stream of work (a customer/account, a recurring deliverable, a launch). A project holds **three things you set plus one Claude builds:**

- **Instructions** — like global instructions, but scoped to this project.
- **Scheduled tasks** — recurring runs that belong to the project and execute with its context.
- **Context** — one or more folders or links that every conversation in the project can access.
- **Memory** (Claude builds this) — what Claude learns from conversations *inside* the project. **You don't write it; it builds over time.** This is the difference a project makes: each conversation adds to what Claude knows, so the next task opens already knowing the situation, last week's decisions, and what's still open.

**Three ways to start a project:** from scratch; from an **existing folder** on your computer (it becomes the working directory); or from a **Chat project** (a **one-way import** — Cowork changes don't sync back to Chat). Create one via **Projects → New project** in the Cowork sidebar.

**3. Skills** — a **reusable playbook** (a folder of files) that teaches Claude how to do a specific kind of work *your way*. Claude **auto-invokes** a skill when a task matches it — you don't name it, though you can be explicit. A skill can include four kinds of files:

| File kind | What it is |
| --- | --- |
| **Instructions** (the `SKILL.md`) | The brief: what it does, when to use it, how to do it |
| **Assets** | Raw materials for real output — logos, brand templates, slide masters, fonts |
| **References** | What "good" looks like — example outputs, style guides, clause libraries |
| **Scripts** | Small code for parts that should run the same way every time — e.g. a variance calc |

A skill can be **just a `SKILL.md`**, or add any combination of the above. Build one fast with **skill-creator** ("I want to build a skill for [process]. Walk me through what you need."). Installed skills live in **Customize**; update one in place by **telling Claude the correction.**

**4. Plugins** — a **packaged set of skills built around a job**, plus the **connectors and subagents** they depend on. (A **subagent** is a purpose-built helper a skill spins up to handle one part of the work in its own context.) Two shapes:

1. **End-to-end pipeline** — skills for each sequential step of one process (e.g. a monthly-close plugin: pull actuals → variance table → board memo).
2. **A team's most-used skills bundled** — independent skills a team reaches for most (e.g. a finance plugin: variance analysis, financial modeling, investment-memo, quarterly reports).

Anthropic publishes plugins for common roles (finance, legal, sales, marketing, support, PM). Find them in **Customize → Plugins**: install off the shelf, **customize** to your team's templates and definitions, or **build your own** with Cowork. **`/setup-cowork`** interviews you and suggests a plugin. Note: **marketplace plugins can't be edited by installers** — updates flow from the maintainer.

**Examples.**

- **Global instructions:** *"I'm a PM at Acme; 'the QBR deck' is the quarterly business review; always lead with the bottom line; no Oxford commas."* Now every session inherits it.
- **Project:** a *"Northwind renewal"* project whose context is the account folder; its **memory** carries last week's pricing decision into this week's prep, so you don't re-brief it.
- **Skill:** a *board-memo* skill bundling a branded template (asset), a past exemplar memo (reference), and a variance-calc **script** — it auto-invokes when you ask for a board memo.
- **Plugin:** installing Anthropic's finance plugin, then customizing its quarterly-report skill to your company's actual template before your team uses it.

## Surfaces, Safety & Sharing

**Claude in Chrome** — the **bridge for tools that don't have a connector** (internal dashboards, vendor portals, web apps behind a login). It's a **browser extension** where Claude reads and acts on pages directly, then hands results back to Cowork to build the deliverable — **one conversation, both surfaces.** **You must be signed in** — Claude can't log in for you; it works within your authenticated session. By default it **asks before sensitive actions**, and you can **narrow what it can act on** for sensitive sites. It may be unavailable on some enterprise plans.

**Claude for Microsoft 365** — Claude lives **inside the document** as an add-in in Word, Excel, PowerPoint, and Outlook, operating on the file or space you have open. One conversation can carry context **across the apps** (Excel analysis → PowerPoint slide; Word memo → Outlook reply). **The rule:** reach for **Cowork** when work pulls from **many sources and ends in a deliverable**; reach for **M365** when you're **editing the Office files themselves** and carrying context app-to-app. Most real work uses **both.**

**Working safely** — what you bring *on top of* the built-in guardrails:

- **Set up so mistakes can't reach what matters:** use a **dedicated working folder** (not a catch-all); **back up anything irreplaceable** before you start; **test new workflows on copies** first (especially scheduled tasks).
- **Write prompts that leave no room for the wrong action:** be specific about **destructive verbs** ("remove from the draft but keep the file," not "cut the section"); **name the bounds** ("only the 3 most recently updated files," "don't message anyone — draft only"); use scheduled tasks to **draft** until you trust them.
- **In the moment:** **read the plan** once it's made; **watch for unexpected patterns** (files or sites you didn't mention, scope creep) — "something feels off" is a real signal, so stop the task; and **approve confirmation prompts deliberately** — most mistakes are clicking through a confirmation that wasn't the intended action.

**When Cowork is NOT the right tool:**

- **Regulated workflows that need an audit trail.** Cowork activity **isn't in audit logs, the Compliance API, or data exports.**
- **Anything you wouldn't trust a smart, quick colleague to do unsupervised.** Claude prepares; you ship.
- **Highly sensitive personal data** outside your IT-approved boundary.

**Validating skills/plugins with evals** before you rely on or share them. An **eval** is a try-out — a realistic request in, look at the output, tell Claude what to fix. **skill-creator** generates **2+ realistic prompts** and, for each, a **with-skill vs. without-skill** output pair; you pick the one you'd actually send and give plain-English feedback; Claude revises; you re-run. It's a **loop, not a one-time gate.** The bar to ship isn't *perfect* evals — it's that the cases you care about **pass meaningfully better than the baseline** and you've **named what you don't yet handle.** Grade types: **code graders, model graders, human graders.**

**Sharing across a team (Enterprise).** Bundle proven skills into a plugin and distribute it through your org's **private marketplace** (an admin manages it). The **four publish levels:**

| Level | State | Use for |
| --- | --- | --- |
| **Available** | In the Directory; install if you want | Optional, discoverable tools |
| **Installed by default** | Already on; users **can turn it off** | Recommended-but-not-mandatory |
| **Required** | On and **stays on** | Compliance — can't be removed |
| **Hidden** | In the marketplace but **not shown** | Staging or restricted rollout |

It's a **hand-off:** you bring the plugin to the **marketplace owner** (team lead, enablement, or IT). Admins create the marketplace in **Organization settings → Plugins** — they upload it or connect a **GitHub repo so updates sync.** Good habits: **one named owner** per shared plugin; **evals before every publish**; **name skills/plugins specifically** ("sales-customer-renewal-prep," not "meeting-prep") to avoid collisions; and set a **review rhythm** (quarterly), retiring what nobody runs.

**Examples.**

- An internal metrics dashboard with **no connector** → **Claude in Chrome** reads it in your signed-in session and hands the numbers back to Cowork to build the slide.
- You're editing a specific PowerPoint deck and pulling a chart from the open Excel file → **Claude for M365**, not Cowork. But if the deck must draw from Slack, Drive, *and* three local files, that's **Cowork.**
- A regulated approval workflow that must show up in **audit logs** → **not Cowork.** Prepare with Cowork if you like, but the system of record needs the audited tool.
- A compliance-disclaimer skill your legal team mandates → publish as **Required.** A beta plugin you're still testing → publish as **Hidden** while it's staged.

## How to study this track

- **Anchor on the mental model.** Nearly every question resolves faster once you ask, *"Is the deliverable the conversation (Chat), a saved file (Cowork), or changed code (Code)?"* Remember the trap: a connector alone never makes something Cowork — a **saved deliverable** does.
- **Memorize the small set of hard mechanics.** These are the details questions hinge on: the **folder is the read-and-write boundary** (and the difference from Chat); the **two permission modes** plus the **always-ask-before-delete** guarantee that holds in both; **`/schedule` only runs when the computer is on and Claude is running**; **Dispatch** runs on the desktop and is **research-preview on Pro/Max.**
- **Learn the four "sets" cold.** The **three task patterns** (multi-step, file-based, multi-tool), the **three-part prompt anatomy** (deliverable, inputs, nuance), the **four building blocks** (global instructions, projects, skills, plugins), and the **four publish levels** (Available, Installed by default, Required, Hidden).
- **Practice the "stay in control" reflexes.** Read the plan, steer mid-task instead of waiting-and-regenerating, review the *artifact* not the chat, verify facts by asking which docs Claude used, and approve prompts deliberately.
- **Know the boundaries.** Be ready to say **when Cowork is the wrong tool** (audit-trail/regulated work, anything needing unsupervised trust, sensitive data outside approved boundaries) and when to reach for a **neighboring surface** (Chrome for connector-less sites, M365 for editing Office files in place).
- **Reason from principles, not memorized clicks.** When two answers look plausible, prefer the one that **points Claude at the smallest sufficient context** and **keeps a human in control** of consequential and destructive actions.
