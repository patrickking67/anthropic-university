# Claude Cowork – Foundations — Flashcards

> Unofficial, community-authored study material. Not affiliated with Anthropic.

*Generated from `flashcards.json` by `scripts/build.mjs`. Do not edit by hand.*

## Cowork Foundations

**Q:** What is Claude Cowork?  
**A:** A mode of Claude in the desktop app (Mac and Windows) where Claude works on tasks alongside you — on your files, in your connected apps, in your browser, and with your tools.

**Q:** What is the core mental model behind Cowork?  
**A:** Delegating, not just chatting. You describe an outcome; Claude plans, executes the steps, uses the tools and files it needs, and saves a real deliverable back to your folder.

**Q:** What kind of work is Cowork built for?  
**A:** Multi-step, longer-running work that spans several tools and ends in an artifact such as a .docx, .xlsx, .pptx, or .pdf — the whole arc, handled end to end.

**Q:** In Cowork, what is the 'deliverable'?  
**A:** A real, saved artifact — a document, spreadsheet, slide deck, or PDF written back to your working folder — not just a chat response.

**Q:** How do you stay in control of a Cowork task?  
**A:** Claude shows its plan before starting, by default asks before actions that matter (sending, posting, sharing), always asks before deleting, and lets you steer at any time.

**Q:** Chat vs Cowork vs Code — what's the rule of thumb?  
**A:** Chat for thinking, Cowork for delegating, Code for software. Most knowledge workers live in Chat and Cowork.

**Q:** What is Chat mode best for?  
**A:** Thinking with Claude: turn-by-turn dialogue, quick exchanges, brainstorming, and drafting you'll refine. Best when the answer is the conversation — the response itself is the deliverable.

**Q:** What is Claude Code best for?  
**A:** Building software with Claude: an agentic coding tool inside a codebase that edits source files, runs tests, and makes git commits. It's for repo and developer work, not documents.

**Q:** Does involving a connector make a task a Cowork task?  
**A:** No — Chat can use connectors too. The signal for Cowork is a deliverable that must be produced and saved somewhere.

**Q:** When should you delegate to Cowork instead of chatting?  
**A:** For multi-step work across files and tools that produces a real deliverable you set in motion and come back to — rather than a quick exchange where the answer is the conversation.

## Setup, Connectors & Permissions

**Q:** Where does Cowork run, and where do you find it?  
**A:** Inside the Claude Desktop app (claude.com/download). Find it in the mode selector at the top-right. It may require a paid plan or a recent version.

**Q:** What is the single most important setup choice in Cowork?  
**A:** The folder. Click 'Work in a project' and pick one — it is the boundary for what Claude can both read and write.

**Q:** What can Claude do within the working folder?  
**A:** Open, edit, create, and organize files there, and save outputs back to the same place. The folder is the read-and-write boundary for the task.

**Q:** What's the key file difference between Chat and Cowork?  
**A:** In Chat, Claude can read what you upload but can't save back to your computer; in Cowork it can write files to your working folder.

**Q:** How should you pick a working folder?  
**A:** Choose the smallest folder that holds what the task needs — not catch-alls like Documents, Downloads, or Desktop. You can add another folder later.

**Q:** What are connectors, and how do you use them?  
**A:** Integrations that reach into the apps where your work lives (email/calendar, messaging, cloud storage, CRM/project tools). Set them up once in Customize, toggle them per task, and reference them naturally in prompts ('check what the team said in Slack about the launch').

**Q:** Are cloud connectors read-and-write?  
**A:** It varies. Many — including the default Google Drive and Microsoft 365 — are read-and-search only; some can create or edit. Check each connector's description.

**Q:** Most reliable place for Claude to build and iterate on a document?  
**A:** Your local working folder — more reliable than a cloud connector, since many connectors are read-only.

**Q:** What are the two permission modes?  
**A:** 'Ask before acting' (the default), where Claude pauses for approval before each outside-world action; and 'Act without asking,' which is faster but riskier and only for trusted files/sites while you actively supervise.

**Q:** What does 'Ask before acting' pause for?  
**A:** Each action that touches the outside world — sending an email, posting a message, sharing a file. It's best for new tools, unfamiliar files, or anything you want to watch closely.

**Q:** What does Claude always do in BOTH permission modes?  
**A:** Always asks before permanently deleting a file — no exceptions, and that confirmation can't be skipped.

## Task Patterns & Delegation

**Q:** What three patterns signal a good Cowork task?  
**A:** Multi-step, file-based, and multi-tool. Most good fits have one or more of these.

**Q:** What is a 'multi-step' Cowork task?  
**A:** Work where you gather, compare, research, draft, and format — handed off as a single prompt instead of run step by step yourself.

**Q:** What is a 'file-based' Cowork task?  
**A:** One where the inputs are real files in your folder and the output is a real artifact saved back. Cowork works on files you already have, not just newly created ones.

**Q:** What is a 'multi-tool' Cowork task?  
**A:** Work that spans tools like Gmail, Slack, M365, calendar, or a CRM; Cowork plans across the connectors and runs the whole sequence as one delegation instead of you stitching prompts together.

**Q:** What three things does a good Cowork prompt name?  
**A:** The deliverable, the inputs, and the nuance/specifics — the prompt 'anatomy.' Leaving a row empty usually means Cowork will ask you for it.

**Q:** In prompt anatomy, what is 'the deliverable'?  
**A:** The concrete output and its shape — 'a one-page brief,' 'a single slide for the QBR,' 'a ranked list with notes.' Specifics on format and length save a regenerate.

**Q:** In prompt anatomy, what are 'the inputs'?  
**A:** Which folder, which channels, which date range, which app. Cowork is only as good as the context you point it at.

**Q:** In prompt anatomy, what is 'the nuance'?  
**A:** Audience, purpose, and expert judgment Claude can't guess — 'lead with the recommendation,' 'flag anything we can't verify,' 'give base/best/worst case.'

**Q:** Why does Claude ask clarifying questions before starting, and what if you skip them?  
**A:** To close context gaps — which of two files to match, scope, audience, how to handle unverifiable claims. Usually you click an option (or answer in your own words); skipping one means Claude uses its best guess.

**Q:** How do you steer a Cowork task mid-run?  
**A:** Watch the plan and progress; if it's on the wrong source, format, or tone, interrupt by queuing a message and Cowork picks up from where it was, reusing analysis it already did. Don't wait for it to finish and regenerate — that's the Chat instinct.

**Q:** How should you review a finished Cowork deliverable?  
**A:** Review the artifact, not the chat: check it meets the objective, verify facts (ask which docs it pulled from), and watch for anything made up — an untraceable date, name, or quote is a flag. If it's mostly right, tell Claude what to change rather than starting over.

**Q:** What is `/schedule`, and what are the two ways to set one up?  
**A:** It sets up a task once to run on a cadence — hourly, daily, weekdays, or manual. Either start fresh with `/schedule`, or do the task once, confirm the output, then `/schedule` to make that exact process recurring.

**Q:** When do scheduled tasks actually run?  
**A:** Only when your computer is on and Claude is running. If the laptop is closed, asleep, or off, Claude picks the task up when you're back and tells you it was delayed.

**Q:** What is Dispatch, and where is it available?  
**A:** Starting a Cowork task from the Claude mobile app while away; the work runs on your desktop (same files, connectors, permissions) and you get a push notification when done. It's in research preview, currently on Pro and Max plans, and needs the desktop on, awake, and signed in with Cowork open.

## Customization: Instructions, Projects, Skills & Plugins

**Q:** What are the four customization building blocks in Cowork?  
**A:** Global instructions, projects, skills, and plugins. They're independent but compound; typically you add global instructions first, projects as recurring work appears, skills when you keep re-explaining a workflow, and plugins when a process is worth sharing.

**Q:** What are global instructions, and what goes in them?  
**A:** A standing brief that applies to every Cowork session (every chat, scheduled task, and Dispatch), set once in Settings → Cowork → Global instructions. Put who you are and what you do, shorthand/acronyms, and how you like output delivered (format, length, tone).

**Q:** How does Cowork's standing context differ from Chat memory?  
**A:** Chat memory builds itself automatically; Cowork's standing context is mostly what you set up — for example, global instructions.

**Q:** What is a Cowork project?  
**A:** A scoped workspace tied to one stream of work — a customer or account, a recurring deliverable, or a launch/initiative.

**Q:** What does a project contain?  
**A:** Three things you set — instructions, scheduled tasks, and context (folders/links every conversation can access) — plus one Claude builds: memory.

**Q:** What is project memory?  
**A:** What Claude learns from conversations inside the project. It builds over time (you don't write it), so each new task opens with the situation, last week's decisions, and what's still open.

**Q:** What are the three ways to start a project?  
**A:** From scratch; from an existing folder on your computer (it becomes the working directory); or from a Chat project — a one-way import, since Cowork changes don't sync back to Chat.

**Q:** What is a skill, and how is it invoked?  
**A:** A reusable playbook — a folder of files — that teaches Claude how to do a specific kind of work your way. Claude auto-invokes it when a task matches, though you can also name it explicitly.

**Q:** What four kinds of files can a skill include?  
**A:** Instructions (the SKILL.md), assets (logos, templates, fonts), references (examples of good output, style guides), and scripts (small code for parts that should run the same way every time). A skill can be just a SKILL.md or add any combination.

**Q:** What is skill-creator?  
**A:** A tool that builds a skill fast — say 'I want to build a skill for [process]. Walk me through what you need.' Installed skills live in Customize, and you update one in place by telling Claude the correction.

**Q:** What is a plugin?  
**A:** A packaged set of skills built around a job, plus the connectors and subagents they depend on. (A subagent is a purpose-built helper a skill spins up to handle one part of the work in its own context.)

**Q:** What are the two shapes a plugin can take?  
**A:** An end-to-end pipeline (skills for each sequential step of one process, e.g. monthly-close), or a team's most-used skills bundled together (independent skills a team reaches for most, e.g. a finance plugin).

**Q:** Where do you find plugins, and what is `/setup-cowork`?  
**A:** In Customize → Plugins: install off the shelf, customize to your team's templates, or build your own with Cowork. `/setup-cowork` interviews you and suggests a plugin. Marketplace plugins can't be edited by installers — updates flow from the maintainer.

## Surfaces, Safety & Sharing

**Q:** What is Claude in Chrome for?  
**A:** It's the bridge for tools that don't have a connector — internal dashboards, vendor portals, web apps behind a login. As a browser extension, Claude reads and acts on pages directly, then hands results back to Cowork to build the deliverable.

**Q:** What must be true to use Claude in Chrome?  
**A:** You must be signed in — Claude can't log in for you and works in your authenticated session. By default it asks before sensitive actions, and you can narrow what it may act on for sensitive sites.

**Q:** What is Claude for Microsoft 365?  
**A:** An add-in where Claude lives inside the document in Word, Excel, PowerPoint, and Outlook, operating on the file or space you have open, and it can carry one conversation's context across those apps.

**Q:** Cowork vs Claude for M365 — when do you use each?  
**A:** Reach for Cowork when work pulls from many sources and ends in a deliverable; reach for M365 when you're editing the Office files themselves and carrying context app-to-app. Most real work uses both.

**Q:** How do you set up so mistakes can't reach what matters?  
**A:** Use a dedicated working folder (not a catch-all), back up anything irreplaceable before you start, and test new workflows on copies first — especially scheduled tasks.

**Q:** What habits keep prompts and moment-to-moment work safe?  
**A:** Be specific about destructive verbs ('remove from the draft but keep the file') and name the bounds ('only the 3 most recently updated files'). Read the plan, treat 'something feels off' as a real signal to stop, and approve confirmation prompts deliberately.

**Q:** When is Cowork NOT the right tool?  
**A:** For regulated workflows that need an audit trail (Cowork activity isn't in audit logs, the Compliance API, or data exports), anything you wouldn't trust a smart colleague to do unsupervised, and highly sensitive personal data outside your IT-approved boundary.

**Q:** What is an eval, and how does skill-creator run one?  
**A:** A try-out: a realistic request in, look at the output, tell Claude what to fix. skill-creator generates 2+ prompts and, for each, a with-skill vs without-skill output pair; you pick the one you'd actually send and give plain-English feedback, then re-run — a loop, not a one-time gate.

**Q:** What's the bar to ship a skill or plugin?  
**A:** Not perfect evals — it's that the cases you care about pass meaningfully better than the baseline and you've named what you don't yet handle. Grades can come from code graders, model graders, or human graders.

**Q:** What are the private-marketplace publish levels?  
**A:** Available (in the Directory, install if you want), Installed by default (already on, can turn off), Required (on and stays on, for compliance), and Hidden (in the marketplace but not shown, for staging/restricted).
