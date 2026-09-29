# Claude for Work

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Turn Claude into a daily work tool with skills, connectors, extensions, plugins, and Office and browser integrations, while keeping review and data handling sound.**

Group: use · Level: intermediate · ~5 h · For: Knowledge workers and team leads who already use Claude and want to connect it to their tools, share workflows with colleagues, and use it responsibly on Team or Enterprise plans.

## Take alongside

- [Claude 101](https://anthropic.skilljar.com/claude-101) — Anthropic Academy
- [Introduction to Claude Cowork](https://anthropic.skilljar.com/introduction-to-claude-cowork) — Anthropic Academy
- [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations) — Anthropic Academy
- [Claude use cases](https://claude.com/resources/use-cases) — Anthropic

## Skills: using and creating them

Use Anthropic's built-in skills, package your own repeatable workflows as skills, and understand how Claude decides when to load one.

**You will be able to:**

- Enable and toggle skills from the Customize menu
- Explain the difference between Anthropic, custom, and organization skills
- Write a skill description that triggers at the right time
- Package and upload a custom skill safely

**Key points**

- A skill is a folder of instructions, and optionally scripts and reference files, that teaches Claude a repeatable way of working. Skills work on every plan; Enterprise needs an owner to enable them.
- Skills depend on the Code execution and file creation capability. On Team and Enterprise, owners manage this under Organization settings > Plugins & skills.
- Turn skills on or off in Customize > Skills. Anthropic's own skills, such as those for Excel, Word, PowerPoint, and PDF work, activate on their own when relevant.
- Claude chooses a skill from its description, reading only the name and description first and loading the full instructions when the skill applies. A vague description means the skill rarely fires.
- Every skill needs a skill.md file whose frontmatter includes a name (up to 64 characters) and a description (up to 200 characters). The folder name must match the skill name.
- To upload, zip the skill folder and choose + Create skill > Upload a skill in Customize > Skills. You can also ask Claude to interview you and draft the skill for you.
- Never hard-code passwords or API keys in a skill, and review any skill you download before enabling it.

**Practice:** Pick a task you repeat weekly, such as a status report format. Ask Claude to help you write it as a skill, check that the description says what it does and when to use it, upload it, and test it with three differently worded requests.

**Read:** [What are skills?](https://support.claude.com/en/articles/12512176-what-are-skills) · [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude) · [How to create custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)

<details><summary>Flashcards</summary>

**Q:** What decides whether Claude loads a skill?  
**A:** The skill's description. Claude reads name and description first and loads the full instructions only when the skill fits the request.

**Q:** Minimum contents of a custom skill  
**A:** A folder whose name matches the skill, containing skill.md with frontmatter giving a name (up to 64 characters) and a description (up to 200).

**Q:** Where to toggle and upload skills  
**A:** Customize > Skills. Upload with + Create skill > Upload a skill, using a zipped skill folder.

**Q:** Capability skills depend on  
**A:** Code execution and file creation.

</details>

### Check your understanding

*Study area: Skills · medium*

A user uploads a skill for writing quarterly reviews, but Claude almost never uses it unless the user names it. The skill's description reads 'Helpful writing skill.' What should they change first?

- **A.** Move the skill's instructions into the account-wide Instructions for Claude
- **B.** Rewrite the description to say what the skill produces and when to use it
- **C.** Rename the skill folder so its name starts with a number for higher priority
- **D.** Raise the effort level to Max so that Claude checks more skills per request

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Claude decides whether to load a skill from its name and description. A specific description that names the output and the situations it fits makes the skill trigger reliably.

_Why a tempting wrong answer misses:_ Account-wide instructions load into every chat, which wastes context and loses the benefit of loading the workflow only when needed.

Reference: https://support.claude.com/en/articles/12512198-how-to-create-custom-skills

</details>

---

*Study area: Skills · easy*

On a Team plan, a member cannot use any skills at all, including Anthropic's built-in ones. Which organization setting is the most likely cause?

- **A.** Memory has not been turned on for the organization
- **B.** The member has not connected their Google Drive yet
- **C.** Code execution and file creation is switched off
- **D.** The member's projects are private rather than shared

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Skills depend on the Code execution and file creation capability, which Team and Enterprise owners manage in organization settings.

_Why a tempting wrong answer misses:_ Memory affects what Claude recalls across chats; it has no bearing on whether skills can run.

Reference: https://support.claude.com/en/articles/12512180-use-skills-in-claude

</details>

---

*Study area: Skills vs projects · medium*

A marketing lead wants Claude to apply the same brand formatting rules to any document, in any chat, whenever branded material is being produced. Which feature fits best?

- **A.** A skill that describes the brand rules and when they apply
- **B.** A project whose knowledge holds the brand guideline PDF
- **C.** An incognito chat with the rules pasted into every message
- **D.** An artifact that displays the brand rules as a web page

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Skills package a repeatable procedure that Claude loads whenever the request matches, across conversations, which suits formatting rules that apply everywhere.

_Why a tempting wrong answer misses:_ Project knowledge only applies to chats inside that project, so branded work done elsewhere would miss the rules.

Reference: https://support.claude.com/en/articles/12512176-what-are-skills

</details>

---

## Connectors and the directory

Connect Claude to the apps where your work lives, find connectors in the directory, and understand what access they grant.

**You will be able to:**

- Add a directory connector from chat or from Customize
- Explain how connector permissions relate to your own account access
- Add a custom connector and state its network requirement
- Find skills, connectors, and plugins in one directory

**Key points**

- Connectors let Claude read from and act in services such as Google Drive, Gmail, Slack, or Microsoft 365. They are built on the Model Context Protocol (MCP).
- Add one from a chat with the + button or by typing /, then Connectors > Manage connectors, or go to Customize > Connectors and click +. You then sign in to the service and approve access.
- A connector can only reach what your account in that service can reach. It inherits your permissions rather than granting new ones.
- The directory lives under Customize, with Skills, Connectors, and Plugins tabs, each with a Discover view. Team and Enterprise members also see a Your organization tab.
- Custom connectors point Claude at a remote MCP server by name and URL. Anthropic's cloud makes the connection, so the server must be reachable over the public internet. Free accounts can add one custom connector.
- On Team and Enterprise, an owner must enable connectors in Organization settings > Connectors before members can use them, and Enterprise admins can restrict write actions.
- Some connectors carry an Interactive badge and render live views, such as task boards or dashboards, inside the conversation.

**Practice:** Connect one work app you use daily. Ask Claude a question that needs data from it, then ask Claude to explain which tool calls it made. Review the connector's settings and note which actions it can take.

**Read:** [Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities) · [Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) · [Browse skills, connectors, and plugins in one directory](https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory)

<details><summary>Flashcards</summary>

**Q:** Can a connector see files your account cannot?  
**A:** No. Connectors inherit your permissions in the connected service.

**Q:** Network requirement for a custom connector  
**A:** The remote MCP server must be reachable over the public internet, because Anthropic's cloud makes the connection.

**Q:** Where Team and Enterprise owners enable connectors  
**A:** Organization settings > Connectors. Members still sign in to each service themselves.

</details>

### Check your understanding

*Study area: Custom connectors · hard*

An IT team adds a custom connector pointing at an MCP server that runs only inside the company's private network. Claude on the web cannot connect to it. What explains this?

- **A.** Custom connectors work only after the server is listed in the directory
- **B.** Custom connectors are limited to the Free plan and blocked on Team
- **C.** The server needs an Interactive badge before Claude can connect to it
- **D.** Anthropic's cloud makes the connection, so the server must be public

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Custom connectors connect from Anthropic's cloud rather than your device, so the MCP server must be reachable over the public internet.

_Why a tempting wrong answer misses:_ Custom connectors do not need to be listed in the directory; you add them by name and URL.

Reference: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp

</details>

---

*Study area: Connector permissions · easy*

An employee hesitates to connect Google Drive because they fear Claude will read HR folders that they themselves cannot open. What is accurate?

- **A.** Connectors grant read access to every shared drive in the company
- **B.** Connectors reach only what the employee's own account can access
- **C.** Connectors read all folders but hide restricted ones in the answers
- **D.** Connectors copy the entire drive into project knowledge on sign-in

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Connectors inherit the user's existing permissions in the connected service, so Claude cannot reach what the user cannot.

_Why a tempting wrong answer misses:_ Nothing in the connector model reads restricted content and then hides it; access is limited at the source.

Reference: https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities

</details>

---

*Study area: Connectors on Team · medium*

A Team plan member opens Customize > Connectors but finds no option to connect Slack, even though a colleague at another company uses it. What is the most likely reason?

- **A.** Their organization owner has not enabled it under Organization settings > Connectors
- **B.** Slack can only be connected from the mobile app on Team and Enterprise plans
- **C.** The member must first create a desktop extension that wraps the Slack service
- **D.** Slack becomes available only after the member turns on memory for their account

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

On Team and Enterprise, owners must enable connectors for the organization before members can use them. Members then authenticate individually.

_Why a tempting wrong answer misses:_ Connectors are managed from the web and desktop apps, and nothing restricts Slack to mobile.

Reference: https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities

</details>

---

## Desktop extensions

Install local MCP servers in Claude Desktop with one click, and know when a local extension fits better than a web connector.

**You will be able to:**

- Install a reviewed extension from Settings > Extensions
- Install a custom .mcpb extension from a trusted source
- Choose between a desktop extension and a web connector

**Key points**

- Desktop extensions package local MCP servers as single-click installs, so you do not have to edit configuration files or manage dependencies by hand.
- In Claude Desktop, go to Settings > Extensions and click Browse extensions to see tools Anthropic has reviewed, then Install and fill in any required settings.
- Extensions use the .mcpb format. A custom one is installed from Settings > Extensions > Advanced settings, under Extension Developer, with Install Extension.
- Extensions run on your computer, which suits tools that need local files or local apps. Web connectors run from Anthropic's cloud and suit hosted services.
- Configuration fields marked sensitive are stored with the operating system's secure storage, such as the macOS Keychain or Windows Credential Manager.
- Team and Enterprise owners can turn public extensions on or off, upload custom extensions for their team, and use an allowlist to control what can be installed.

**Practice:** Open Settings > Extensions in Claude Desktop and browse the directory. Pick one extension that would help you locally, read what it can access, and decide whether a web connector would serve you better.

**Read:** [Getting started with local MCP servers on Claude Desktop](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop) · [When to use desktop and web connectors](https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors) · [Enabling and using the desktop extension allowlist](https://support.claude.com/en/articles/12592343-enabling-and-using-the-desktop-extension-allowlist)

<details><summary>Flashcards</summary>

**Q:** What is a desktop extension?  
**A:** A one-click .mcpb package that installs a local MCP server in Claude Desktop.

**Q:** Where to browse reviewed desktop extensions  
**A:** Claude Desktop, Settings > Extensions > Browse extensions.

**Q:** Desktop extension vs web connector  
**A:** Extensions run on your computer and suit local files and apps. Web connectors run from Anthropic's cloud and suit hosted services.

</details>

### Check your understanding

*Study area: Desktop extensions · medium*

A trusted internal team gives you a .mcpb file for a local tool. Where do you install it in Claude Desktop?

- **A.** Customize > Connectors, then add it as a custom connector by URL
- **B.** Customize > Skills, then upload it with + Create skill
- **C.** Settings > Extensions > Advanced settings, then Install Extension
- **D.** Settings > Memory, then import it as a new memory topic

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

.mcpb files are desktop extensions. Custom ones are installed from the Extension Developer section under Settings > Extensions > Advanced settings.

_Why a tempting wrong answer misses:_ Custom connectors take a remote server URL; a .mcpb file packages a local server and is installed as an extension.

Reference: https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop

</details>

---

*Study area: Extension governance · hard*

An Enterprise security team wants employees to install only the desktop extensions it has approved. Which approach matches the documented controls?

- **A.** Ask employees to remove Claude Desktop and use only the web app
- **B.** Turn off memory so extensions cannot store configuration values
- **C.** Require every extension to be converted into a custom skill file
- **D.** Disable public extensions, upload approved ones, use the allowlist

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Owners can disable public desktop extensions, upload custom extensions for one-click install, and use an allowlist so only approved extensions are available.

_Why a tempting wrong answer misses:_ Removing the desktop app gives up local capabilities entirely rather than governing them.

Reference: https://support.claude.com/en/articles/12592343-enabling-and-using-the-desktop-extension-allowlist

</details>

---

## Claude in Chrome, Excel, and PowerPoint

Bring Claude into the browser and Microsoft Office, and use each integration with the right checks.

**You will be able to:**

- Describe what Claude in Chrome can do and which plans include it
- Use Claude for Excel to explain and change a workbook safely
- Build or edit slides with Claude for PowerPoint
- Adjust approval settings for browser actions on sensitive sites

**Key points**

- Claude in Chrome is a browser extension that lets Claude read, click, and navigate websites alongside you. It works with all paid plans; on Enterprise an admin must enable it.
- Claude in Chrome reviews each action and asks for approval on sensitive ones. You can change the approval mode, and the choice persists. Websites can contain prompt injection, so tighten approvals on sites that matter.
- Claude for Excel is an add-in for Pro, Max, Team, and Enterprise. It answers questions about a workbook with cell-level citations, adjusts assumptions while keeping formulas intact, and traces errors to their cause.
- On Windows the add-in is under Home > Add-ins, and on Mac under Tools > Add-ins. Start from a trusted copy of a workbook and review changes before you finalize.
- Claude for PowerPoint is an add-in for Pro, Max, Team, and Enterprise. It can build a deck, edit specific slides without regenerating everything, and turn bullets into diagrams or native charts while respecting your template.
- Claude for Excel shares context with the PowerPoint, Word, and Outlook add-ins, so one conversation can span a workbook and the deck built from it.

**Practice:** Open a copy of a spreadsheet you know well in Excel with the Claude add-in. Ask it to explain one formula chain with citations and to find any errors. Then ask Claude for PowerPoint to turn one table into a chart slide in your template.

**Read:** [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome) · [Use Claude for Excel](https://support.claude.com/en/articles/12650343-use-claude-for-excel) · [Use Claude for PowerPoint](https://support.claude.com/en/articles/13521390-use-claude-for-powerpoint)

<details><summary>Flashcards</summary>

**Q:** Claude in Chrome plan availability  
**A:** All paid plans: Pro, Max, Team, and Enterprise, with Enterprise requiring admin enablement.

**Q:** Two safe habits with Claude for Excel  
**A:** Start from a trusted copy of the workbook and review changes before finalizing.

**Q:** What context do the Office add-ins share?  
**A:** Claude for Excel shares context with PowerPoint, Word, and Outlook, so one conversation can span them.

</details>

### Check your understanding

*Study area: Claude for Excel · medium*

A financial analyst plans to ask Claude for Excel to rework assumptions across a large, business-critical model. What is the best way to begin?

- **A.** Work on a trusted copy and review each change before finalizing it
- **B.** Paste the whole model into a web chat so Claude sees every value
- **C.** Ask for all changes at once, since formulas are always preserved
- **D.** Turn on Research so the add-in can verify the assumptions online

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The documented guidance is to start from a trusted copy before broad edits and to review changes before finalizing.

_Why a tempting wrong answer misses:_ Claude aims to keep formula relationships intact, but that does not remove the need to review a large set of changes.

Reference: https://support.claude.com/en/articles/12650343-use-claude-for-excel

</details>

---

*Study area: Claude in Chrome · hard*

A user lets Claude in Chrome help with tasks on an internal admin portal where one wrong click could change live settings. What adjustment makes the most sense?

- **A.** Keep automatic approval so Claude can finish without interruption
- **B.** Switch to an approval mode that asks before Claude takes actions
- **C.** Open the portal in an incognito chat so actions are not recorded
- **D.** Raise the effort to Max so Claude avoids mistakes on the portal

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Claude in Chrome lets you change how actions are approved. Requiring approval before acting keeps a human in the loop on a high-stakes site, and websites can carry prompt injection.

_Why a tempting wrong answer misses:_ Higher effort can improve reasoning, but it does not stop a manipulated or mistaken action from executing without your review.

Reference: https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome

</details>

---

*Study area: Office add-ins · medium*

Which TWO statements about Claude's Microsoft Office add-ins are accurate? (Select 2.)

- **A.** Claude for Excel shares context with the PowerPoint, Word, and Outlook add-ins
- **B.** Claude for PowerPoint can edit specific slides without regenerating the whole deck
- **C.** Claude for Excel is limited to the Free plan and is unavailable on paid plans
- **D.** Claude for PowerPoint needs Claude Code installed before it can open a deck
- **E.** Claude for Excel answers questions about a workbook without citing any cells

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

The Excel add-in shares context across the Office add-ins so one conversation can span files, and the PowerPoint add-in edits targeted slides while keeping template compliance.

_Why a tempting wrong answer misses:_ Claude for Excel is for Pro, Max, Team, and Enterprise and answers with cell-level citations; neither add-in depends on Claude Code.

Reference: https://support.claude.com/en/articles/13521390-use-claude-for-powerpoint

</details>

---

## Cowork tasks and plugins

Hand Claude multi-step tasks, choose a safe permission mode, schedule recurring work, and install plugins that bundle skills and connectors for your role.

**You will be able to:**

- Start a Cowork task that works with connected folders
- Choose a permission mode that matches the stakes
- Install a plugin from the directory and run its skills
- Explain which plugin parts work in chat versus Cowork and Code

**Key points**

- Cowork handles multi-step tasks for you: it plans, breaks work into subtasks, and can run parallel workstreams. Tasks run in isolated cloud environments and keep going when your device closes.
- Cowork is on paid plans. The Claude Desktop app must be open for work that touches local files, your browser, or your computer.
- Permission modes are Manual (asks before acting), Auto (Claude decides, with safety checks that use more of your limit), and Skip (no automatic checks). Pick Manual for sensitive accounts or sites.
- Use /schedule to run a task on demand or on a recurring cadence, without your device needing to be online.
- A plugin bundles skills, connectors, and sub-agents for a role or team. Add one from Customize > Plugins > Discover. Plugins need a paid plan and are saved to your account, so they also appear in Claude Code.
- Hooks and sub-agents in a plugin work only in Cowork and Claude Code; in chat they appear grayed out. Plugins with local MCP servers need the desktop app.
- Run plugin skills by typing / or using the + button. In Cowork, commands take the form /plugin-name:command.

**Practice:** Install one plugin that matches your role and list what skills and connectors it includes. Give Cowork a small multi-step task in a dedicated test folder on Manual mode, and watch which steps ask for approval.

**Read:** [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) · [Use plugins in Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude) · [Claude Cowork and chat are one Claude](https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude)

<details><summary>Flashcards</summary>

**Q:** Three Cowork permission modes  
**A:** Manual asks before acting, Auto lets Claude decide with safety checks, and Skip runs without automatic checks.

**Q:** What a plugin bundles  
**A:** Skills, connectors, and sub-agents packaged for a role or team.

**Q:** Why are a plugin's hooks grayed out in chat?  
**A:** Hooks and sub-agents run only in Cowork and Claude Code.

**Q:** Command to automate recurring Cowork work  
**A:** /schedule, which runs a task on demand or on a cadence without your device online.

</details>

### Check your understanding

*Study area: Plugins · medium*

A sales operations lead wants to give reps one installable package containing the team's proposal skills and its CRM connector. What should they build?

- **A.** A shared project with the skills pasted into its instructions
- **B.** A desktop extension that bundles the skills as local files
- **C.** A plugin that bundles the skills and the CRM connector together
- **D.** An artifact that links to each skill and connector separately

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Plugins bundle skills, connectors, and sub-agents into a single package that people add once, and organizations can distribute them.

_Why a tempting wrong answer misses:_ Desktop extensions package local MCP servers, not skills together with connectors.

Reference: https://support.claude.com/en/articles/13837440-use-plugins-in-claude

</details>

---

*Study area: Plugins · hard*

After adding a plugin, a user sees its skills working in a web chat, but its hooks and sub-agents appear grayed out. What explains this?

- **A.** The plugin was installed without its connectors being authenticated
- **B.** Hooks and sub-agents work only in Cowork and Claude Code, not chat
- **C.** Grayed-out components are waiting on an organization owner's review
- **D.** The free trial for the plugin's advanced features has already ended

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

In chat, a plugin's hooks and sub-agents are shown grayed out because they run only in Cowork and Claude Code.

_Why a tempting wrong answer misses:_ Unauthenticated connectors would affect connector tools, not hooks and sub-agents specifically.

Reference: https://support.claude.com/en/articles/13837440-use-plugins-in-claude

</details>

---

*Study area: Cowork permissions · medium*

A user wants Cowork to update records in a customer portal where mistakes would be costly. Which permission mode should they choose?

- **A.** Manual, so Claude asks for permission before it acts
- **B.** Skip, so the task finishes faster without extra checks
- **C.** Auto, because it uses the least of the usage limit
- **D.** Any mode, since Cowork never acts outside chat

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Manual mode asks before acting, which suits sensitive accounts and sites where each step deserves review.

_Why a tempting wrong answer misses:_ Auto mode adds safety checks but consumes more of the usage limit, and it still lets Claude decide when to proceed.

Reference: https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork

</details>

---

## Role-based workflows

Combine projects, connectors, skills, and research into repeatable workflows for analysis, drafting, research, and meeting preparation.

**You will be able to:**

- Design an analysis workflow that shows its method and can be checked
- Set up a drafting workflow that keeps voice and format consistent
- Run a research workflow with verified citations
- Build a meeting-prep routine from calendar, email, and project context

**Key points**

- Analysis: upload the data or connect its source, ask Claude to compute with code and show its steps, then reconcile key totals against the original before sharing.
- Drafting: keep reference material and rules in a project, capture house formats in a skill, and give targeted feedback rather than regenerating whole drafts.
- Research: use Research for multi-source questions, then open the citations behind any claim that will drive a decision.
- Meeting prep: a project holding account notes plus calendar and email connectors lets Claude assemble a brief. Scheduled tasks can prepare it before each meeting.
- Match the surface to the job: chat for thinking, Cowork for multi-step execution, and the Excel or PowerPoint add-ins when the work lives in those files.
- Every workflow ends with a human check. Decide in advance what you will verify and who owns the final output.

**Practice:** Choose one workflow from your role. Write down its inputs, the Claude features it uses, the output, and the specific checks you will run. Run it once end to end and time it against your usual approach.

**Read:** [Claude use cases](https://claude.com/resources/use-cases) · [Using Research on Claude](https://support.claude.com/en/articles/11088861-using-research-on-claude-ai) · [Create and edit files with Claude](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude)

<details><summary>Flashcards</summary>

**Q:** Analysis workflow check  
**A:** Have Claude show its method, then reconcile key totals against the source data before sharing.

**Q:** Meeting-prep building blocks  
**A:** A project with account notes, calendar and email connectors, and optionally a scheduled task to produce the brief.

</details>

### Check your understanding

*Study area: Meeting prep workflow · medium*

An account manager meets the same client every Monday and wants a brief covering recent emails, open items, and the agenda. Which setup fits best?

- **A.** A new incognito chat each week with notes retyped from memory
- **B.** A project with account notes, plus email and calendar connectors
- **C.** A published artifact that the client edits before each meeting
- **D.** A desktop extension that stores the client's emails locally

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A project keeps durable account context, and connectors bring in current email and calendar data, so Claude can assemble each brief for the manager to review.

_Why a tempting wrong answer misses:_ Incognito chats keep no history and rely on retyped notes, which throws away the context the brief needs.

Reference: https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities

</details>

---

*Study area: Analysis workflow · medium*

An operations analyst asks Claude to find the top five cost drivers in an exported CSV of expenses before a budget meeting. Which practice gives the most trustworthy result?

- **A.** Accept the summary if the numbers look reasonable at a glance
- **B.** Ask Claude to rate how confident it is in each of the figures
- **C.** Paste only the top rows of the CSV to keep the request short
- **D.** Have Claude compute with code, show steps, and reconcile totals

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Code execution lets Claude calculate over the actual data, a visible method lets you follow the logic, and reconciling totals to the source catches errors before the meeting.

_Why a tempting wrong answer misses:_ A self-reported confidence rating is not independent evidence that the figures are correct.

Reference: https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude

</details>

---

*Study area: Research workflow · medium*

A policy advisor is preparing a recommendation that depends on recent regulatory changes across several countries. Which TWO steps belong in the workflow? (Select 2.)

- **A.** Use Research so Claude runs linked searches and returns a cited report
- **B.** Open the citations behind each claim the recommendation will rely on
- **C.** Treat every cited claim as verified because a source link is attached
- **D.** Turn web search off so that Claude relies only on its training data
- **E.** Publish the draft as a public artifact before any review takes place

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

Research is designed for multi-source questions, and checking the underlying sources is what makes the findings safe to rely on.

_Why a tempting wrong answer misses:_ A citation shows where a claim came from but does not prove the source supports it, and Research needs web search turned on.

Reference: https://support.claude.com/en/articles/11088861-using-research-on-claude-ai

</details>

---

## Organization features on Team and Enterprise

Share projects and skills across a company, set organization-wide instructions, and search company knowledge from one place.

**You will be able to:**

- Share projects and publish skills to colleagues
- Explain how owner-provisioned skills reach users
- Set up and use enterprise search
- Identify which features an owner must enable first

**Key points**

- Projects can be private or shared with the organization, with Can view or Can edit access for members.
- When an owner uploads a skill in organization settings, it is provisioned to everyone and enabled by default. Users can still switch it off for themselves in Customize > Skills.
- Enterprise can give skills to only some people by bundling them into a plugin and assigning that plugin to a group.
- Owners can let members publish skills to the organization by setting the Publishing policy to Open or Requires review.
- Enterprise search adds an Ask Your Org project for searching across company sources such as Google Drive, Slack, and Microsoft 365. An owner completes setup, choosing a connector for Documents and for Chat, with Email optional.
- Organization instructions let owners set standards Claude follows in every conversation across the organization.
- Several features start off or need owner action on Team and Enterprise: memory, web search (Organization settings > Capabilities), connectors (Organization settings > Connectors), and code execution.

**Practice:** List the three workflows your team repeats most. For each, decide whether it belongs in a shared project, an organization skill, or a plugin, and name who would own and review it.

**Read:** [Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization) · [Use enterprise search](https://support.claude.com/en/articles/12489464-use-enterprise-search) · [Set organization instructions](https://support.claude.com/en/articles/14546867-set-organization-preferences) · [Manage plugins for your organization](https://support.claude.com/en/articles/13837433-manage-plugins-for-your-organization)

<details><summary>Flashcards</summary>

**Q:** Owner-provisioned skill defaults  
**A:** Provisioned to everyone and enabled by default; each user can toggle it off.

**Q:** How Enterprise targets skills to one group  
**A:** Bundle the skills in a plugin and assign the plugin to that group.

**Q:** Ask Your Org  
**A:** The project enterprise search adds for searching company sources. An owner sets it up with Documents and Chat connectors.

</details>

### Check your understanding

*Study area: Enterprise search · medium*

A company on a Team plan wants employees to ask one place questions that draw on documents in Google Drive and discussions in Slack. What should an owner set up?

- **A.** A public artifact that indexes the company's shared files
- **B.** A personal skill for each employee that lists the sources
- **C.** Enterprise search, which adds an Ask Your Org project
- **D.** An incognito chat template shared through the directory

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Enterprise search adds a dedicated Ask Your Org project for searching across company sources, available to members once an owner completes setup with Documents and Chat connectors.

_Why a tempting wrong answer misses:_ A skill describes how to do a task; it does not give Claude access to company sources.

Reference: https://support.claude.com/en/articles/12489464-use-enterprise-search

</details>

---

*Study area: Organization skills · hard*

An Enterprise admin wants a set of month-end close skills available only to the finance group, not to the whole company. How should they distribute them?

- **A.** Upload the skills in organization settings so everyone receives them
- **B.** Ask each finance member to upload the skills to their own account
- **C.** Put the skills into the organization instructions for all members
- **D.** Bundle the skills in a plugin and assign that plugin to the group

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Enterprise plans can target skills by bundling them into a plugin and assigning it to a group, so only that group's members see them.

_Why a tempting wrong answer misses:_ Uploading skills in organization settings provisions them to every user, which is the opposite of what the admin wants.

Reference: https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization

</details>

---

*Study area: Organization instructions · easy*

A company wants Claude to follow the same compliance disclaimer rule in every conversation across the organization. Which feature is designed for this?

- **A.** Organization instructions set by an owner
- **B.** A project shared with view access to all
- **C.** Each member's personal memory settings
- **D.** A desktop extension installed by IT

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Organization instructions let owners set rules Claude follows in every conversation across the organization, such as compliance guidance.

_Why a tempting wrong answer misses:_ A shared project's instructions only apply to chats inside that project.

Reference: https://support.claude.com/en/articles/14546867-set-organization-preferences

</details>

---

## Review and data sensitivity

Keep humans accountable for Claude's work, limit what Claude can reach, and handle confidential data carefully.

**You will be able to:**

- Scale review effort to the stakes of the output
- Limit folder, connector, and network access to what a task needs
- Recognize prompt injection in agentic work
- Choose where sensitive work should and should not happen

**Key points**

- You remain responsible for everything Claude does on your behalf, including sent messages, published content, and changed data.
- Give Cowork a dedicated working folder rather than broad access to sensitive files such as financial records.
- Each connector or extension is another path for malicious instructions to reach Claude. Use verified ones from official directories and review their permissions.
- Avoid using agentic browsing or Cowork on banking, healthcare, or personal-record sites, and switch to Manual approval where stakes are high.
- Code execution runs in a sandbox, but prompt injection can still try to send data out. Enterprise organizations default to network access disabled; options run from disabled, to package managers only, to allowlisted domains, to all domains.
- Follow your organization's data rules. Use incognito for conversations that should not feed memory, and keep secrets and credentials out of prompts and skills.

**Practice:** Audit your own setup: list every connector, extension, and connected folder Claude can reach. Remove one you no longer need, narrow one folder, and write down which outputs you always check before they leave your hands.

**Read:** [Use Claude Cowork safely](https://support.claude.com/en/articles/13364135-use-claude-cowork-safely) · [Create and edit files with Claude (network access and security)](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude) · [Use incognito chats](https://support.claude.com/en/articles/12260368-use-incognito-chats)

<details><summary>Flashcards</summary>

**Q:** Safer folder access for Cowork  
**A:** A dedicated working folder, not broad access to sensitive files.

**Q:** Enterprise default for code execution network access  
**A:** Disabled. Other options: package managers only, package managers plus allowlisted domains, or all domains.

**Q:** Who is responsible for actions Claude takes for you?  
**A:** You are, including messages, published content, and data changes.

</details>

### Check your understanding

*Study area: Safe agentic work · medium*

A user is setting up Cowork to process expense receipts on their laptop. Which TWO practices follow the documented safety guidance? (Select 2.)

- **A.** Connect a dedicated working folder that holds only the receipts
- **B.** Use Manual approval when the task touches financial accounts
- **C.** Grant access to the whole home directory to save setup time
- **D.** Use Skip mode on banking sites so tasks are not interrupted
- **E.** Install any extension that promises faster receipt scanning

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

Limiting access to a dedicated folder and requiring approval on sensitive accounts both reduce the damage a mistake or prompt injection could cause.

_Why a tempting wrong answer misses:_ Broad folder access, Skip mode on banking sites, and unverified extensions all widen the paths for harm that the guidance warns against.

Reference: https://support.claude.com/en/articles/13364135-use-claude-cowork-safely

</details>

---

*Study area: Network access · hard*

An Enterprise security team wants Claude's code execution to install common Python libraries while keeping other outbound traffic blocked. Which network access setting fits?

- **A.** Network access disabled
- **B.** Package managers only
- **C.** All domains allowed
- **D.** Allowlist every site

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Package managers only allows package installation while blocking other domains, a balance between capability and exfiltration risk.

_Why a tempting wrong answer misses:_ Disabling network access is the most secure option but prevents installing packages, which the team needs.

Reference: https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude

</details>

---
