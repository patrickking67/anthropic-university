# Claude for Work: lesson guide

This guide accompanies the Claude for Work lane. It assumes you are comfortable with the basics in
Claude Essentials: prompting, files, projects, research, and memory. Here the focus shifts to
making Claude part of your daily work by connecting it to your tools, packaging your workflows,
sharing them with colleagues, and keeping the results trustworthy. Feature names, plan limits, and
menu paths were checked against the Claude Help Center in September 2026. When the app and this
guide disagree, trust the Help Center.

## Module 1: Skills: using and creating them

A **skill** is a packaged way of working. At its simplest it is a folder with one file of
instructions; it can also include reference documents and scripts. Where a prompt tells Claude what
to do once, a skill teaches it how you like a type of task done every time: your status report
format, your brand rules, the steps of your month-end checklist.

Skills are available on every plan, and on Enterprise an owner enables them. They rely on the
**Code execution and file creation** capability, which Team and Enterprise owners manage under
Organization settings > Plugins & skills. You turn individual skills on and off in **Customize >
Skills**. There are three kinds to know:

- **Anthropic skills**, built in for tasks such as working with Excel, Word, PowerPoint, and PDF
  files. They activate on their own when relevant.
- **Custom skills**, which you or a colleague create and upload.
- **Organization skills**, which an owner provisions or a colleague publishes to the company.

The part that makes skills work is the **description**. Claude does not read every skill in full
for every request. It first looks at each skill's name and description, and only loads the full
instructions when a skill fits. A description such as "helpful writing skill" gives Claude nothing
to match against, so the skill rarely fires. A description such as "formats quarterly business
reviews using our section order and metrics table; use when asked for a QBR or quarterly summary"
tells Claude exactly when it applies.

To build one, create a folder whose name matches the skill and put a file named skill.md inside.
The file begins with a short header giving the name (up to 64 characters) and the description (up
to 200 characters), followed by the instructions themselves. Zip the folder and upload it with **+
Create skill > Upload a skill** in Customize > Skills. You do not have to write it by hand: you can
tell Claude what workflow you want to capture and let it interview you and draft the skill.

Two safety rules apply. Never put passwords, API keys, or other secrets in a skill, and read any
skill you download before you enable it, because it can contain instructions and code.

## Module 2: Connectors and the directory

**Connectors** let Claude reach into the services where your work lives, such as Google Drive,
Gmail, Slack, or Microsoft 365, and in many cases act there too. They are built on the Model
Context Protocol, an open standard for connecting AI applications to tools and data.

You can add a connector from a chat by clicking the + button or typing /, then choosing Connectors
and Manage connectors. You can also go to **Customize > Connectors** and click +. Either way, you
pick a service, sign in to it, and approve the access Claude is requesting. A reassuring rule
applies: a connector can only reach what your account in that service can already reach. If you
cannot open the HR folder, neither can Claude through your connection.

The **directory** brings everything together. Under Customize you will find tabs for Skills,
Connectors, and Plugins, each with a Discover view for finding new ones. On Team and Enterprise
plans there is also a Your organization tab for what your company distributes. Some connectors
carry an **Interactive** badge, which means they can render live views, such as a task board or a
dashboard, inside the conversation.

When the service you need is not in the directory, a **custom connector** lets you point Claude at
a remote MCP server by name and URL. Anthropic's cloud makes that connection, not your laptop, so the
server has to be reachable over the public internet. A server that only exists inside your private
network will not work this way; a desktop extension (Module 3) is the local route. Free accounts can
add one custom connector.

On Team and Enterprise, connectors are an organization decision first. An owner enables them under
Organization settings > Connectors, and then each member signs in with their own account. Enterprise
admins can go further and, for example, allow reading but prevent write actions.

## Module 3: Desktop extensions

Some tools need to run on your own computer: a utility that works with local files, an app that has
no cloud service, or an internal tool that never leaves the corporate network. **Desktop
extensions** handle this. Each one packages a local MCP server as a single-click install in Claude
Desktop, so you do not have to edit configuration files or install dependencies yourself.

To find reviewed extensions, open **Settings > Extensions** in Claude Desktop and click **Browse
extensions**. Choose one, click Install, and fill in any settings it asks for. Fields the extension
marks as sensitive are stored in your operating system's secure storage, such as the macOS Keychain
or Windows Credential Manager.

Extensions use the **.mcpb** file format. If a trusted team hands you a .mcpb file for an internal
tool, install it from Settings > Extensions > Advanced settings, in the Extension Developer section,
with Install Extension. Only install files from sources you trust, because an extension runs on your
machine with real access to it.

How do you choose between an extension and a web connector? Ask where the thing you need lives. If
it is a hosted service on the internet, a web connector is simpler and works everywhere you use
Claude. If it is on your computer or only reachable from your network, a desktop extension is the
fit.

For organizations, Team and Enterprise owners can turn public extensions on or off, upload custom
extensions for their people to install in one click, and use an **allowlist** so that only approved
extensions are available.

## Module 4: Claude in Chrome, Excel, and PowerPoint

Claude also comes to the places you already work.

**Claude in Chrome** is a browser extension that lets Claude read pages, click, type, and navigate
alongside you. It is available on all paid plans, and on Enterprise an admin must enable it. It
reviews each action and pauses for your approval on sensitive ones, and you can change how strict
that approval is; your choice carries over between sessions. Browsing agents face a particular
risk: a website can contain hidden instructions aimed at the AI reading it. On any site where a
wrong click has real consequences, such as an admin console, choose a mode that asks before
acting.

**Claude for Excel** is an add-in for Pro, Max, Team, and Enterprise. It can explain a workbook
with citations down to individual cells, change assumptions while keeping formula relationships
intact, trace an error to its root cause, and build or fill in models across multiple tabs. You open
it from Home > Add-ins on Windows or Tools > Add-ins on Mac. Two habits keep it safe: start from a
trusted copy of any workbook before asking for broad edits, and review changes before you finalize
them.

**Claude for PowerPoint** is an add-in for the same plans. It can build a deck from scratch, edit
particular slides without regenerating the rest, turn bullet points into diagrams or native charts,
and keep your template intact as you iterate. The Excel add-in shares context with PowerPoint, Word,
and Outlook, so a single conversation can move from a workbook to the slides that present it.

These integrations change often. Before relying on a particular capability, check its Help Center
page for current plan availability.

## Module 5: Cowork tasks and plugins

**Cowork** is Claude working through a multi-step task on your behalf. You describe the outcome, and
Claude plans the work, breaks it into subtasks, and can run several parts in parallel. Tasks run in
isolated cloud environments and keep going when you close your laptop. Cowork is on paid plans, and
the desktop app must be open for anything that touches local files, your browser, or your computer.
As Essentials explained, Cowork and chat are merging into one Claude, starting with Pro and Max.

Because Cowork acts rather than just answers, how much it may do without asking matters. There are
three **permission modes**. **Manual** asks before acting. **Auto** lets Claude decide, with extra
safety checks that use more of your usage limit. **Skip** runs without those automatic checks. Use
Manual for anything sensitive, such as financial accounts, customer records, or live systems.

For routine work, **/schedule** lets you run a task on demand or on a regular cadence, and it runs
even when your device is offline. A weekly metrics roundup or a Monday meeting brief is a natural
fit.

**Plugins** package a role's toolkit. A plugin bundles skills, connectors, and sub-agents so that
someone can add one thing instead of setting up each piece. You add plugins from **Customize >
Plugins > Discover**. They require a paid plan, and because they are saved to your account they also
show up in Claude Code when you sign in there. You run a plugin's skills by typing / or using the +
button, and in Cowork commands take the form /plugin-name:command.

Not every part of a plugin works everywhere. Hooks and sub-agents run only in Cowork and Claude
Code; in chat they appear grayed out. Plugins that include local MCP servers need the desktop app.
Team and Enterprise admins can distribute organization plugins, which members cannot edit and which
may be required or preinstalled.

## Module 6: Role-based workflows

Features are only useful when they combine into routines. Four patterns cover a lot of daily work.

**Analysis.** Upload the data or connect its source, and ask Claude to calculate with code rather
than estimate in prose. Ask it to show its steps so you can follow the logic. Before the result goes
anywhere, reconcile one or two key totals against the original data. That habit catches most
errors in minutes.

**Drafting.** Keep reference material and standing rules in a project so every draft starts from
the same base. Capture house formats, such as a proposal structure or a release-note template, as a
skill so they apply wherever the task comes up. When a draft is close, give targeted feedback on the
weak part instead of asking for a complete rewrite.

**Research.** For questions that span many sources, use Research and let Claude assemble a cited
report. Then open the citations behind any claim that will drive a decision. A link shows where a
claim came from; only reading the source shows whether it supports the claim.

**Meeting prep.** A project holding an account's history, combined with email and calendar
connectors, lets Claude assemble a brief of recent threads, open items, and a draft agenda. A
scheduled task can produce it before each recurring meeting, ready for you to review.

Across all four, match the surface to the job: chat for thinking through a problem, Cowork for
execution across many steps, and the Excel or PowerPoint add-ins when the work lives in those files.
Every workflow should end with a human check that you decided on in advance, along with a clear
owner for the final output.

## Module 7: Organization features on Team and Enterprise

On Team and Enterprise plans, Claude becomes a shared tool, and several features exist to spread
good workflows across a company.

**Projects** can be kept private or shared with the organization, with Can view or Can edit access
for members. A well-maintained shared project is often the simplest way to give a team common
context.

**Skills** can be distributed in two ways. When an owner uploads a skill in organization settings,
it is provisioned to everyone and enabled by default, though each person can turn it off in
Customize > Skills. Owners can also let members publish their own skills to the organization by
setting the Publishing policy to Open or Requires review. On Enterprise, when a skill should reach
only one group, such as finance, the approach is to bundle it into a plugin and assign that plugin
to the group.

**Enterprise search** adds a dedicated project called Ask Your Org for searching across company
sources such as Google Drive, Gmail, Slack, GitHub, and Microsoft 365. An owner completes setup,
choosing a connector for Documents and one for Chat, with Email recommended but optional. After
that, every member can use it.

**Organization instructions** let owners set rules Claude follows in every conversation across the
organization, such as a compliance disclaimer or a formatting standard.

Finally, remember what needs an owner first. On these plans memory starts off, web search is
enabled under Organization settings > Capabilities, connectors under Organization settings >
Connectors, and code execution under the organization's capability and skills settings. When a
colleague says a feature is missing, the organization settings are the first place to look.

## Module 8: Review and data sensitivity

The more Claude can reach and do, the more deliberate you need to be about review and access.

Start with accountability. You remain responsible for everything Claude does on your behalf,
including messages it sends, content it publishes, and data it changes. Scale your review to the
stakes. A brainstorm needs little checking. A client email, a changed spreadsheet model, or an
update to a live system needs a careful look before it counts as done.

Next, limit reach. Give Cowork a dedicated working folder rather than your whole drive, and keep
sensitive material such as financial records out of it unless the task needs them. Every connector
and extension is another path through which malicious instructions could reach Claude, so stick to
verified ones from official directories, review what they can do, and remove the ones you no longer
use. Avoid agentic browsing or Cowork on banking, healthcare, or personal-record sites, and use
Manual approval where mistakes would be costly.

Code execution runs in a sandbox, but prompt injection can still try to push data out. Organizations
choose how much network access that sandbox has: disabled (the most secure, and the Enterprise
default), package managers only, package managers plus specific allowlisted domains, or all domains.
Package managers only is a common middle ground when people need to install libraries but outbound
traffic should otherwise stay closed.

Last, handle data by your organization's rules. Keep credentials and secrets out of prompts and
skills, use incognito for conversations that should not feed memory, and when you are unsure
whether something may go into an AI tool, ask before you paste. Good habits here are what let a
team keep expanding what Claude does without expanding its risk.
