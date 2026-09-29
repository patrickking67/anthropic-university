# Claude Essentials

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Use Claude well in the apps: write clear prompts, work with files, projects, research, and memory, and check what Claude gives you before you rely on it.**

Group: use · Level: beginner · ~4 h · For: New or occasional Claude users on any plan who want a solid, practical foundation in the Claude apps.

## Take alongside

- [Claude 101](https://academy.claude.com/courses/claude-101) — Anthropic Academy
- [AI Fluency: Framework and foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations) — Anthropic Academy
- [Introduction to Claude Cowork](https://academy.claude.com/courses/introduction-to-claude-cowork) — Anthropic Academy
- [Claude Help Center](https://support.claude.com/en/) — Anthropic

## Meet Claude and pick a model

What Claude is, where you can use it, and how to choose a model, effort level, and thinking setting for the task in front of you.

**You will be able to:**

- Describe Claude as a general-purpose AI model you reach through several apps
- Name the current Claude models and what each is best at
- Change the model and effort level for a conversation
- Explain the trade-off between higher effort and usage limits

**Key points**

- Claude is a family of AI models from Anthropic. You can use it on the web at claude.ai, in the desktop app, in the mobile apps, and inside tools such as Chrome and Microsoft Office add-ins.
- The current models are Claude Opus 5.5 (the general default recommendation), Claude Fable 5.1 (hardest reasoning and long agentic work), Claude Sonnet 5.5 (a strong balance of speed and intelligence), and Claude Haiku 4.5 (fastest and lightest).
- To switch models, click the model name near the send button and choose another. Some older models sit under a More models option.
- The effort selector runs from Low and Medium, which suit routine tasks and stretch your usage, through High, Extra high, and Max for harder or longer work.
- Higher effort uses more tokens, so you reach your usage limit sooner. Match the effort to the stakes of the task.
- On the newest models, including Opus 5.5, Sonnet 5.5, and Fable 5.1, thinking cannot be switched off. You steer cost and speed with effort instead.

**Practice:** Pick one real task from your week. Ask it once on the default model at medium effort, then again with a different model or effort level. Note which answer you would actually use and why.

**Read:** [Change the model, effort, and thinking settings](https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings) · [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) · [Get started with Claude](https://support.claude.com/en/articles/8114491-get-started-with-claude)

<details><summary>Flashcards</summary>

**Q:** Which Claude model is the general default recommendation today?  
**A:** Claude Opus 5.5. Fable 5.1 is for the hardest reasoning, Sonnet 5.5 balances speed and intelligence, and Haiku 4.5 is fastest and lightest.

**Q:** What does raising the effort level cost you?  
**A:** More tokens per answer, so you reach your usage limit sooner. Low and Medium suit routine work; High and above suit harder tasks.

**Q:** Can you turn thinking off on Opus 5.5?  
**A:** No. On the newest models thinking stays on; you control speed and usage with the effort setting.

</details>

### Check your understanding

*Study area: Models and settings · easy*

A new team member asks which Claude model to start with for everyday writing and analysis when they have no special speed or cost needs. Which model matches the current general default recommendation?

- **A.** Claude Opus 5.5
- **B.** Claude Haiku 4.5
- **C.** Claude Opus 4.8
- **D.** Claude Sonnet 5

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Opus 5.5 is the recommended starting point for most work. Fable 5.1, Sonnet 5.5, and Haiku 4.5 are chosen for specific needs such as harder reasoning, speed balance, or lowest cost.

_Why a tempting wrong answer misses:_ Opus 4.8 and Sonnet 5 are older models that remain available but are not the current recommendation, and Haiku 4.5 is aimed at fast, light tasks.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

*Study area: Models and settings · medium*

A Pro user on Claude Opus 5.5 wants simple reformatting tasks to use less of their allowance. They look for a switch to turn thinking off and cannot find one. What should they do?

- **A.** Turn off Code execution and file creation under Settings > Capabilities
- **B.** Lower the effort level to Low or Medium for these routine requests
- **C.** Open an incognito chat, which skips thinking to save usage
- **D.** Move the tasks into a project so that thinking is disabled there

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Thinking cannot be turned off on Opus 5.5 and the other newest models. Low and Medium effort are intended for routine work and stretch usage further.

_Why a tempting wrong answer misses:_ Incognito only stops the chat being saved to history and memory; it does not change how much reasoning Claude does.

Reference: https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings

</details>

---

## Prompting basics and iterating

Give Claude the context, task, and rules it needs, show examples, and refine the answer through conversation instead of starting over.

**You will be able to:**

- Write a prompt that states your role, goal, task, and constraints
- Use an example to show the tone or format you want
- Refine a response with targeted feedback in the same chat
- Set account-wide instructions for preferences you repeat

**Key points**

- A strong prompt covers four things: who you are and what you are trying to achieve, the task itself, the rules (tone, length, format, audience), and any material Claude should work from.
- An example of good output is often the fastest way to communicate style. Paste a past email, a sample paragraph, or a template.
- Claude remembers earlier turns in the same conversation, so point to the part that needs to change rather than rewriting the whole request.
- Vague prompts lead to generic answers and extra back-and-forth. Clear, detailed requests save both time and usage.
- Instructions for Claude in your settings apply to every conversation on your account. Use them for standing preferences such as spelling conventions or how you like answers laid out.
- Project instructions apply only inside that project, which makes them the right place for rules tied to one piece of work.

**Practice:** Take a request you made recently that gave a bland result. Rewrite it with role, task, rules, and one example, then send both versions and compare. Follow up once with a targeted correction.

**Read:** [Understanding Claude's personalization features](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features) · [Usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices) · [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)

<details><summary>Flashcards</summary>

**Q:** Four parts of a strong prompt  
**A:** Your role and goal, the task, the rules (tone, length, format, audience), and the material or examples Claude should use.

**Q:** Account-wide instructions vs project instructions  
**A:** Instructions for Claude in settings apply to every chat on your account. Project instructions apply only to chats inside that project.

**Q:** Best way to fix one weak paragraph in a good draft  
**A:** Stay in the same chat and give targeted feedback on that paragraph. Claude keeps the earlier context.

</details>

### Check your understanding

*Study area: Prompting basics · easy*

A user types 'write a product announcement' and gets bland, generic copy. What change to the prompt is most likely to produce something usable?

- **A.** Send the same request again several times and pick the best result
- **B.** Ask Claude to be much more creative and exciting in its next attempt
- **C.** Say who the audience is, the key facts, the tone, and the length wanted
- **D.** Switch to a different model without changing any of the prompt text

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Context, task details, and rules such as audience, tone, and length give Claude what it needs to move past generic output.

_Why a tempting wrong answer misses:_ Asking for more creativity adds no information about the product or audience, so the result stays generic in a different way.

Reference: https://support.claude.com/en/articles/9797557-usage-limit-best-practices

</details>

---

*Study area: Prompting basics · medium*

You need Claude to draft a reply to an unhappy customer in your company's usual voice. Which TWO additions to your prompt will most improve the first draft? (Select 2.)

- **A.** A line saying who the customer is, what went wrong, and what you can offer
- **B.** A past reply your team was happy with, labeled as an example of the tone
- **C.** The same request repeated in capital letters so Claude treats it as urgent
- **D.** An instruction to be as creative as possible with no further detail given
- **E.** A note asking Claude to keep the reply secret from other conversations

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

Situational context tells Claude what to say, and a labeled example shows it how to say it. Both directly shape the draft.

_Why a tempting wrong answer misses:_ Capital letters and open-ended calls for creativity add emphasis but no usable information, and chats are not shared between conversations unless memory or search is involved.

Reference: https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features

</details>

---

*Study area: Iterating on responses · easy*

Claude's draft report is good except that the third section is too technical for executives. What is the most efficient next step?

- **A.** Start a new chat and paste the whole original request in once more
- **B.** Copy the draft into a separate file and upload it to a new project
- **C.** Ask Claude to regenerate the full report until section three improves
- **D.** Reply in the same chat asking for section three rewritten for executives

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Claude keeps the earlier turns in context, so a targeted follow-up fixes the weak part without losing the parts that already work.

_Why a tempting wrong answer misses:_ Regenerating the whole report risks changing sections you were happy with and wastes usage.

Reference: https://support.claude.com/en/articles/9797557-usage-limit-best-practices

</details>

---

*Study area: Personalization · medium*

A user starts almost every chat by typing 'use British spelling and keep answers short.' Where should this preference live so that it applies everywhere without retyping?

- **A.** Instructions for Claude in the account settings
- **B.** The description field of a new project
- **C.** A note pinned at the top of an incognito chat
- **D.** The instructions of one shared team project

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Instructions for Claude are account-wide and apply to all conversations, which suits standing personal preferences.

_Why a tempting wrong answer misses:_ Project instructions only apply inside that project, and Claude does not read a project's description at all.

Reference: https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features

</details>

---

## Files, images, and artifacts

Upload material for Claude to read, ask it to create real files, and build artifacts you can view, edit, and share.

**You will be able to:**

- Upload documents and images and know what Claude can read in each
- Turn on file creation to get Word, Excel, PowerPoint, and PDF outputs
- Create an artifact and explain who can see it when shared

**Key points**

- Uploads and downloads are capped at 30 MB per file. Split very large documents into sections when you need Claude to read them closely.
- For PDFs of 100 pages or fewer, Claude reads both the text and the visuals such as charts. For other document types it extracts the text only, so embedded images are not interpreted.
- Claude can create .docx, .xlsx, .pptx, and .pdf files. This needs the Code execution and file creation setting, found under Settings > Capabilities on individual plans.
- Artifacts are self-contained pieces of work, such as a page, a small app, or a diagram, that open in a panel beside the chat where you can view and iterate on them.
- Artifacts start private. On Free, Pro, and Max, publishing makes one viewable by anyone with the link. On Team and Enterprise, sharing keeps it inside your organization.
- Treat files from unknown sources with care. A document can contain hidden instructions meant to steer Claude.

**Practice:** Upload a short PDF report with at least one chart. Ask Claude to summarize it and describe the chart, then ask for a one-page Word brief built from it. Finally, ask for a simple artifact, such as a checklist, based on the brief.

**Read:** [Upload files to Claude](https://support.claude.com/en/articles/8241126-upload-files-to-claude) · [Create and edit files with Claude](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude) · [What are artifacts and how do I use them?](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them) · [Share artifacts](https://support.claude.com/en/articles/9547008-publish-and-share-artifacts)

<details><summary>Flashcards</summary>

**Q:** Per-file upload limit  
**A:** 30 MB per file for uploads and downloads.

**Q:** When does Claude read the charts and images inside a document?  
**A:** In PDFs of 100 pages or fewer. For other document types it extracts text only.

**Q:** Setting needed for Claude to create Word, Excel, PowerPoint, and PDF files  
**A:** Code execution and file creation, under Settings > Capabilities on individual plans.

**Q:** Who can open a shared artifact on a Team or Enterprise plan?  
**A:** Only people signed in to your organization. On Free, Pro, and Max, publishing makes it viewable by anyone with the link.

</details>

### Check your understanding

*Study area: Files and uploads · medium*

A user uploads a Word document that contains an embedded chart image and asks Claude what the chart shows. Claude discusses the text but not the chart. What is the best fix?

- **A.** Raise the effort to Max so that Claude examines the file more closely
- **B.** Export the document as a PDF, or upload the chart as its own image
- **C.** Add the Word file to project knowledge so it is read in retrieval mode
- **D.** Turn on web search so Claude can look the chart up on the internet

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Claude reads text and visuals in PDFs of up to 100 pages, but extracts only text from other document types. A PDF or a separate image lets it see the chart.

_Why a tempting wrong answer misses:_ Effort changes how much Claude reasons, not what it can extract from the file, so the embedded image still goes unread.

Reference: https://support.claude.com/en/articles/8241126-upload-files-to-claude

</details>

---

*Study area: Artifacts · medium*

An employee on a Team plan builds an artifact and shares its link with a client at another company. The client says they cannot open it. Why?

- **A.** Artifacts can only be opened inside the Claude desktop app
- **B.** The client must first be added as an editor of the chat
- **C.** Team sharing keeps artifacts visible only to the organization
- **D.** Shared artifacts expire after the first time they are viewed

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

On Team and Enterprise plans, a shared artifact is available only to people signed in to the organization. Public publishing to anyone with the link applies to Free, Pro, and Max.

_Why a tempting wrong answer misses:_ Artifacts open in the browser as well as the desktop app, so the desktop-only explanation does not account for the failure.

Reference: https://support.claude.com/en/articles/9547008-publish-and-share-artifacts

</details>

---

*Study area: File creation · easy*

A Pro user asks Claude for a downloadable Excel workbook but only ever receives a table in the chat. Which setting should they check first?

- **A.** Search and reference chats, under Settings > Memory
- **B.** Voice language, under Settings > General
- **C.** Web search, in the + menu of the chat box
- **D.** Code execution and file creation, under Settings > Capabilities

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Creating .xlsx, .docx, .pptx, and .pdf files depends on the Code execution and file creation capability.

_Why a tempting wrong answer misses:_ Web search lets Claude look things up online; it does not give Claude the ability to produce files.

Reference: https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude

</details>

---

## Projects: instructions, knowledge, and sharing

Group related chats in a project with its own instructions and knowledge, and share it with the right level of access.

**You will be able to:**

- Create a project and write useful project instructions
- Add knowledge files that Claude uses across the project's chats
- Choose between view and edit access when sharing a project
- Explain how projects keep their own memory

**Key points**

- Create a project from claude.ai/projects with + New Project. Projects are available on every plan; Free accounts can create up to five.
- Claude does not see the project name or description. Put anything Claude must follow into the project instructions.
- Files added to project knowledge become context for every chat in that project. On paid plans, Claude switches to retrieval (RAG) automatically when the knowledge approaches the context limit.
- Project documents are cached, so reusing them counts less against your limits than uploading the same material again in fresh chats.
- On Team and Enterprise plans, the Share project button lets you invite colleagues. Can view lets them chat with the project and see its contents; Can edit also lets them change instructions, knowledge, and members.
- Each project has its own memory space and summary, kept separate from your other projects and general chats.

**Practice:** Create a project for one ongoing piece of work. Write three to five lines of instructions, add two reference files, and start two chats in it. Check that both chats follow the instructions without you repeating them.

**Read:** [How can I create and manage projects?](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects) · [Usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices)

<details><summary>Flashcards</summary>

**Q:** Does Claude read a project's description?  
**A:** No. Put rules and context Claude must follow in the project instructions.

**Q:** Can view vs Can edit on a shared project  
**A:** Can view: see contents and chat. Can edit: also change instructions, knowledge, and members.

**Q:** What happens when project knowledge nears the context limit on a paid plan?  
**A:** Claude switches to retrieval (RAG) automatically to expand the project's capacity.

</details>

### Check your understanding

*Study area: Projects · medium*

A user wrote detailed style rules in their project's description, but chats in the project ignore them. What explains this?

- **A.** Project rules take effect only after the project is starred in the sidebar
- **B.** Claude does not see the description; rules belong in project instructions
- **C.** Descriptions apply only to chats started after the knowledge is re-uploaded
- **D.** Style rules are overridden by memory, so memory must be reset beforehand

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The name and description help people understand the project, but Claude cannot read them. Project instructions are what Claude follows in every project chat.

_Why a tempting wrong answer misses:_ Starring a project only pins it for quick access in the sidebar; it has no effect on what Claude reads.

Reference: https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects

</details>

---

*Study area: Project sharing · easy*

On a Team plan, a manager wants colleagues to chat with a project and use its knowledge, but not change its instructions or files. Which access level fits?

- **A.** Can edit
- **B.** Owner
- **C.** Can view
- **D.** Admin

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Can view lets members see the project's contents and chat with it without changing instructions, knowledge, or membership.

_Why a tempting wrong answer misses:_ Can edit grants the ability to modify instructions, knowledge, and members, which is more than the manager wants.

Reference: https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects

</details>

---

*Study area: Projects · hard*

A Max user works through the same 200-page policy manual every day, uploading it to a fresh chat each morning, and keeps hitting usage limits. What change helps most?

- **A.** Upload the manual once as knowledge in a project and chat there
- **B.** Paste the manual text into Instructions for Claude in settings
- **C.** Use incognito chats so that the uploads do not count toward usage
- **D.** Turn on Research so the manual is read from the web on each run

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Project knowledge is reused across the project's chats and cached documents count less against limits than new uploads. Retrieval also switches on automatically if the material nears the context limit.

_Why a tempting wrong answer misses:_ Incognito changes whether a chat is saved, not how its content counts against usage.

Reference: https://support.claude.com/en/articles/9797557-usage-limit-best-practices

</details>

---

## Web search and Research

Let Claude look things up on the web with citations, and use Research for deeper investigations that span many sources.

**You will be able to:**

- Turn on web search and read the citations it returns
- Decide when a question calls for Research instead of a quick search
- Plan for the extra usage that Research consumes

**Key points**

- Web search is available on every plan. In the classic interface you turn it on from the + button in the chat box; in the newer interface Claude searches on its own when it helps.
- Answers that use web search include citations and source links so you can check the claims yourself.
- Research is for bigger questions. Claude runs several searches that build on each other and decides what to investigate next, then returns a cited report within minutes.
- Research needs a paid plan (Pro, Max, Team, or Enterprise) and needs web search enabled. Turn it on from the + button.
- Research counts like a normal conversation but can use your limits faster because it pulls in many sources.
- On Team and Enterprise, an owner turns web search on for the organization under Organization settings > Capabilities before members can use it.

**Practice:** Ask a quick factual question with web search and open two of the cited sources. Then run Research on a broader question from your work, and list which claims in the report you would still want to confirm.

**Read:** [Enable and use web search](https://support.claude.com/en/articles/10684626-enable-and-use-web-search) · [Using Research on Claude](https://support.claude.com/en/articles/11088861-using-research-on-claude-ai)

<details><summary>Flashcards</summary>

**Q:** Research vs web search  
**A:** Web search answers a question with a few cited lookups. Research runs many linked searches and returns a cited report, and needs a paid plan with web search on.

**Q:** Why might Research use up your limits faster?  
**A:** It retrieves and reasons over many sources in one request.

**Q:** Where Team and Enterprise owners enable web search  
**A:** Organization settings > Capabilities.

</details>

### Check your understanding

*Study area: Research · medium*

A strategy analyst needs a cited overview of how a dozen competitors price a service, drawn from many public sources. Which approach fits best?

- **A.** A normal chat with web search turned off, relying on training data
- **B.** Research, which runs linked searches and returns a cited report
- **C.** An incognito chat, so the investigation stays out of chat history
- **D.** A project with one uploaded brochure from each of the competitors

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Research is built for multi-source investigations. Claude runs searches that build on one another and returns findings with citations you can check.

_Why a tempting wrong answer misses:_ Relying on training data with search off gives no current, cited sources, which the analyst specifically needs.

Reference: https://support.claude.com/en/articles/11088861-using-research-on-claude-ai

</details>

---

*Study area: Research · medium*

Which TWO statements about Research in the Claude apps are accurate? (Select 2.)

- **A.** Claude runs multiple searches that build on each other before answering
- **B.** Web search must be enabled for Research to work
- **C.** Research is included on the Free plan with no extra limits
- **D.** Research requests never count toward your usage limit
- **E.** Research is available only in the Claude desktop app

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

Research works agentically through a chain of searches, and it depends on web search being turned on.

_Why a tempting wrong answer misses:_ Research needs a paid plan, counts toward usage (often faster than a normal chat), and works on web, desktop, and mobile.

Reference: https://support.claude.com/en/articles/11088861-using-research-on-claude-ai

</details>

---

## Memory, chat search, and starting fresh

Understand what Claude remembers across chats, how to control it, and when a clean conversation will serve you better.

**You will be able to:**

- Explain how Claude builds memory from your chats
- View, edit, pause, or reset memory in settings
- Use an incognito chat for conversations you do not want saved
- Recognize when to start a new conversation

**Key points**

- Memory is on by default for Free, Pro, and Max. On Team and Enterprise it is off by default until an organization owner turns it on.
- Claude saves memory as individual topics while you chat, and you can also ask it directly to remember something.
- Settings > Memory lists what Claude remembers. You can edit or delete topics, pause memory, reset it, or turn off searching and referencing past chats.
- Chat search on paid plans lets you ask Claude to look through earlier conversations for relevant details.
- Incognito chats, opened with the ghost icon, are not saved to your history or used for memory. They are available on every plan.
- Long chats consume more usage, and Claude may summarize earlier messages to stay within the context window. When a thread has drifted or you are near your limit, start a new chat with a short summary of what is settled.

**Practice:** Open Settings > Memory and review what is stored. Delete or correct one item. Then hold a short incognito chat and confirm it does not appear in your recent chats.

**Read:** [Use Claude's chat search and memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context) · [Use incognito chats](https://support.claude.com/en/articles/12260368-use-incognito-chats) · [How do usage and length limits work?](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)

<details><summary>Flashcards</summary>

**Q:** Where to review or delete what Claude remembers  
**A:** Settings > Memory, which lists memory topics and lets you edit, delete, pause, or reset.

**Q:** Incognito chat  
**A:** A chat opened with the ghost icon that is not saved to history or used for memory. Available on all plans.

**Q:** Memory default on Team and Enterprise  
**A:** Off until an organization owner turns it on. On Free, Pro, and Max it is on by default.

</details>

### Check your understanding

*Study area: Memory and privacy · easy*

A user wants a one-off brainstorm about a surprise party that should not appear in their chat history or shape Claude's memory. What should they use?

- **A.** A new project with no instructions
- **B.** An incognito chat from the ghost icon
- **C.** A normal chat deleted the next day
- **D.** A chat on a lower effort setting

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Incognito chats are not saved to history and are not used for memory or chat search, and they are available on every plan.

_Why a tempting wrong answer misses:_ A normal chat can contribute to memory while it exists, so deleting it later is not the same as never saving it.

Reference: https://support.claude.com/en/articles/12260368-use-incognito-chats

</details>

---

*Study area: Memory · medium*

A new employee on their company's Team plan notices that Claude never recalls anything from earlier chats, while their personal Pro account does. What is the most likely reason?

- **A.** Memory works only in the mobile apps, not on the web
- **B.** Team plans store memory only for incognito chats
- **C.** Memory is off by default on Team until an owner enables it
- **D.** Memory is only available when Research is switched on

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Memory is on by default for Free, Pro, and Max, but Team and Enterprise organizations start with it off until an owner activates it.

_Why a tempting wrong answer misses:_ Memory is available on web, desktop, and mobile, so the surface does not explain the difference.

Reference: https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context

</details>

---

*Study area: Starting fresh · medium*

After a very long chat, Claude keeps returning to an early assumption the user has since abandoned, and the user is close to their usage limit. What is the best move?

- **A.** Keep going in the same chat and repeat the correction in every message
- **B.** Switch this chat to incognito so that the earlier turns are forgotten
- **C.** Delete the memory topics and continue in the same long conversation
- **D.** Start a new chat with a short summary of what is decided and what is not

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Long conversations consume more usage and may be summarized to fit the context window. A fresh chat with a clean summary removes the stale assumption and saves usage.

_Why a tempting wrong answer misses:_ Memory topics are not what carries context inside a single conversation, so resetting them leaves the long thread's earlier turns in place.

Reference: https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work

</details>

---

## Desktop, mobile, and voice

Know what the desktop app's Chat, Cowork, and Code tabs are for, how Cowork is merging into Claude, and when mobile and voice mode help.

**You will be able to:**

- Describe the Chat, Cowork, and Code tabs in Claude Desktop
- Explain how the unified Claude experience changes Cowork
- Start and control a voice conversation on mobile

**Key points**

- Claude Desktop has three tabs: Chat for conversations, Cowork for multi-step tasks that Claude carries out for you, and Code for software work.
- Cowork and chat are becoming one Claude. You describe what you need and Claude decides which tools to use. This is rolling out first to Pro and Max on web, desktop, and mobile.
- Cowork-style tasks run in isolated cloud environments and keep going if you close your laptop. Work on local files, your browser, or your computer needs the desktop app open.
- On desktop, Claude can read and write files in folders you connect, which removes manual uploads and downloads.
- Voice mode lets you speak to Claude and hear it reply. It is in beta on all plans across mobile, desktop, and web, and works best on a phone.
- Voice mode has its own language setting under Settings > General, separate from your display language.

**Practice:** On your phone, start a voice mode conversation to talk through a plan for tomorrow, then switch to text in the same chat and ask for a written checklist. On desktop, look at the three tabs and note one task you would give each.

**Read:** [Claude Cowork and chat are one Claude](https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude) · [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) · [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode) · [Install Claude Desktop](https://support.claude.com/en/articles/10065433-install-claude-desktop)

<details><summary>Flashcards</summary>

**Q:** The three tabs in Claude Desktop  
**A:** Chat for conversation, Cowork for multi-step tasks Claude carries out, and Code for software work.

**Q:** What does the unified Claude experience change?  
**A:** You no longer pick chat or Cowork. You describe the task and Claude chooses the tools. Rolling out first to Pro and Max.

**Q:** Voice mode availability  
**A:** Beta on all plans across mobile, desktop, and web, designed to work best on a phone.

</details>

### Check your understanding

*Study area: Desktop app · medium*

A Max user wants Claude to sort several hundred files in a folder on their laptop into subfolders by client and write a short index document. Which option fits best?

- **A.** Use Cowork in Claude Desktop with that folder connected
- **B.** Upload the files one at a time to a chat on the web
- **C.** Paste the file names into voice mode on the mobile app
- **D.** Create an artifact that lists the files in the folder

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Cowork carries out multi-step tasks, and on desktop it can read and write files in folders you connect, without manual uploads or downloads.

_Why a tempting wrong answer misses:_ Uploading files to a web chat lets Claude read them but cannot reorganize the folder on the laptop.

Reference: https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork

</details>

---

*Study area: Mobile and voice · easy*

A field technician wants to talk a problem through with Claude while their hands are busy, hearing the answers spoken back. What should they use?

- **A.** Research on the web app
- **B.** An incognito chat
- **C.** Voice mode on the mobile app
- **D.** A shared project

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Voice mode supports full spoken conversations with spoken replies and is designed to work best on a phone.

_Why a tempting wrong answer misses:_ Research produces a written, cited report and does not provide a spoken back-and-forth.

Reference: https://support.claude.com/en/articles/11101966-use-voice-mode

</details>

---

## Accuracy, safety, and knowing the limits

Check Claude's work before you rely on it, protect sensitive information, and recognize tasks where Claude is the wrong tool.

**You will be able to:**

- Verify facts and figures against their sources before reuse
- Recognize prompt injection risks in files, pages, and tools
- Apply the four AI Fluency competencies to everyday use
- Decide what information to keep out of a conversation

**Key points**

- Claude can state wrong facts with confidence. Check important numbers, names, quotes, and dates against the original source, especially before they go to other people.
- Citations make checking easier but are not proof. Open the source and confirm that it actually says what the answer claims.
- Prompt injection is when content Claude reads, such as a web page or file, contains instructions meant to hijack it. Be cautious with material from sources you do not trust.
- Anthropic's AI Fluency framework names four competencies: Delegation (what to hand to AI), Description (how you ask), Discernment (judging the output), and Diligence (taking responsibility for the result).
- You remain responsible for what you send, publish, or act on, even when Claude drafted it.
- Keep passwords, secrets, and data you are not permitted to share out of chats, and follow your organization's rules on what can go into AI tools.

**Practice:** Ask Claude a question in your field that has a precise, checkable answer. Verify each factual claim against a primary source and mark it correct, wrong, or unverifiable. Write one sentence on what you would change in how you prompt next time.

**Read:** [AI Fluency: Framework & Foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations) · [Use Claude Cowork safely](https://support.claude.com/en/articles/13364135-use-claude-cowork-safely) · [Create and edit files with Claude (security considerations)](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude)

<details><summary>Flashcards</summary>

**Q:** Prompt injection  
**A:** Hidden instructions in content Claude reads, such as a page or file, that try to redirect what Claude does.

**Q:** The four AI Fluency competencies  
**A:** Delegation, Description, Discernment, and Diligence.

**Q:** Is a citation proof that a claim is right?  
**A:** No. Open the source and confirm it supports the claim before you reuse it.

</details>

### Check your understanding

*Study area: Accuracy checks · medium*

Claude's answer includes a market-size figure with a citation. The user plans to put the number in a board presentation. What should they do first?

- **A.** Trust the figure, because a citation means it has been verified
- **B.** Ask Claude in the same chat whether it is confident in the figure
- **C.** Regenerate the answer and use the figure if it appears once more
- **D.** Open the cited source and confirm that it states the same figure

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Citations make checking easier but do not guarantee accuracy. Confirming the figure in the source is the step that protects the presentation.

_Why a tempting wrong answer misses:_ Claude's own confidence is not independent evidence; a mistaken answer can be restated with equal confidence.

Reference: https://support.claude.com/en/articles/10684626-enable-and-use-web-search

</details>

---

*Study area: Safety · hard*

A user asks Claude to summarize a web page. Hidden text on the page tells Claude to include a link urging readers to enter their login details. What risk does this illustrate?

- **A.** Prompt injection through content that Claude reads
- **B.** A memory leak from the user's earlier chat history
- **C.** A context-window overflow caused by a long web page
- **D.** An artifact-sharing error between organizations

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Prompt injection is when instructions are planted in content Claude processes, such as a page or file, to redirect its behavior. Treat untrusted content with caution and review outputs.

_Why a tempting wrong answer misses:_ A context overflow causes older content to be summarized or dropped; it does not insert new instructions from a third party.

Reference: https://support.claude.com/en/articles/13364135-use-claude-cowork-safely

</details>

---
