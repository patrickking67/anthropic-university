# Claude Essentials: lesson guide

This guide walks through the eight modules of the Claude Essentials lane in plain language. Each
section explains the ideas behind the module, then points you to the practice exercise in the lane.
Feature names and menu paths were checked against the Claude Help Center in September 2026. The
apps change often, so if a menu looks different, the Help Center is the source to trust.

## Module 1: Meet Claude and pick a model

Claude is a family of AI models made by Anthropic. Most people meet it through an app: the website
at claude.ai, the desktop app for Mac and Windows, or the mobile apps. It also appears inside other
tools, such as a Chrome extension and add-ins for Excel and PowerPoint, which the Claude for Work
lane covers. Whichever door you use, you are talking to the same underlying models, and your
account, projects, and settings follow you.

You do not need to understand how the models work to use them well, but you should know that there
is more than one. At the time of writing the lineup is:

- **Claude Opus 5.5**, the general default recommendation. Start here if you are unsure.
- **Claude Fable 5.1**, for the hardest reasoning and long, multi-step work.
- **Claude Sonnet 5.5**, a strong balance of speed and intelligence.
- **Claude Haiku 4.5**, the fastest and lightest model, good for quick, simple requests.

You switch models by clicking the model name near the send button. Older models are still offered
under a "More models" option, but treat them as legacy.

Two more controls sit alongside the model. The **effort** setting tells Claude how hard to work on
a response. Low and Medium are good for routine requests and make your usage allowance last longer.
High is a sensible default for real work, and Extra high and Max are for long or difficult tasks.
More effort means more tokens, so you will reach your usage limit sooner. The second control is
**thinking**, the visible reasoning Claude does before answering. On the newest models, including
Opus 5.5, Sonnet 5.5, and Fable 5.1, thinking is always on and cannot be switched off. If you want
quicker, lighter answers from those models, lower the effort instead.

A good habit is to match the setting to the stakes. A reformatted list does not need Max effort. A
contract comparison you will send to a client might.

## Module 2: Prompting basics and iterating

Most disappointing answers come from thin requests. If you type "write a product announcement,"
Claude has to guess the product, the audience, the tone, and the length, and its guesses will be
generic. The fix is not a magic phrase. It is information.

A useful mental checklist has four parts:

1. **Role and goal.** Who are you, and what are you trying to achieve? "I run customer success for a
   small accounting software company, and I need to calm an upset client."
2. **Task.** What exactly should Claude produce? A draft email, a comparison table, a list of risks.
3. **Rules.** Tone, length, format, reading level, things to avoid.
4. **Material.** The documents, data, or examples Claude should work from.

Examples deserve special mention. If you want a certain voice, paste a past piece of writing you
liked and label it as an example of the tone. One good example often does more than a paragraph of
adjectives.

Once Claude answers, treat the conversation as a collaboration. Claude keeps everything earlier in
the chat in view, so you can say "the third section is too technical for executives; rewrite just
that part" and keep the rest. Regenerating the whole thing, or starting over in a new chat, throws
away what already works and costs extra usage.

Some preferences are the same every time: a spelling convention, a preferred length, a habit of
wanting bullet points. Rather than typing them into every chat, put them in **Instructions for
Claude** in your settings. Those apply to all your conversations. If a rule applies only to one
piece of work, it belongs in that project's instructions instead, which Module 4 covers.

## Module 3: Files, images, and artifacts

Claude can read what you give it. You can attach documents, spreadsheets, and images to a chat, up
to 30 MB per file. For PDFs of 100 pages or fewer, Claude reads both the text and the visual
content, so it can describe a chart or a diagram. For other document types, such as Word files, it
extracts only the text. If a Word file contains a chart image that matters, export the document to
PDF or upload the chart separately as an image.

Claude can also make real files. Ask for a Word document, an Excel workbook, a PowerPoint deck, or
a PDF and it can produce a download. This depends on a setting called **Code execution and file
creation**, which on individual plans lives under Settings > Capabilities. If Claude keeps replying
with a table in the chat when you wanted a spreadsheet, check that setting first.

**Artifacts** are a related idea. An artifact is a self-contained piece of work, such as a small web
page, an interactive checklist, a diagram, or a simple app, that opens in a panel next to the chat.
You can keep refining it through conversation and come back to it later. Artifacts start private.
On Free, Pro, and Max plans, publishing one makes it viewable by anyone with the link, and it
appears under Artifacts in your sidebar. On Team and Enterprise plans, sharing keeps the artifact
inside your organization, so only signed-in colleagues can open it. That difference matters when
you want to show work to someone outside your company.

One caution applies to every file you hand Claude: content can carry instructions. A document or
page from an unknown source might contain hidden text designed to steer Claude. Module 8 returns to
this.

## Module 4: Projects: instructions, knowledge, and sharing

A project is a workspace for one ongoing piece of work, such as a product launch, a course you are
teaching, or a client account. It groups related chats and gives them shared instructions and shared
reference material. Projects are available on every plan, with Free accounts limited to five.

You create one from claude.ai/projects with **+ New Project**. You will be asked for a name and a
description. Here is the detail that trips people up: Claude does not see the name or description.
They are labels for you and your colleagues. Anything Claude must follow belongs in the **project
instructions**, which you set from the project page.

The **project knowledge** area holds files that Claude uses as context in every chat in the project.
This is where style guides, policy manuals, past reports, and data dictionaries go. On paid plans,
when the knowledge grows close to the context limit, Claude switches to retrieval automatically,
pulling in the relevant parts rather than everything at once. Project documents are also cached,
which means reusing them counts less against your usage than uploading the same file into a fresh
chat each morning.

On Team and Enterprise plans you can share a project with the **Share project** button. There are
two access levels. **Can view** lets someone see the project's contents and chat with it without
changing anything. **Can edit** also lets them change the instructions, the knowledge, and who is
a member. Give view access by default and edit access to the people who maintain the project.

Projects also keep their own memory. Each project has a separate memory space and summary, so
details from one client project do not drift into another or into your general chats.

## Module 5: Web search and Research

Claude's training has a cutoff, and your questions often need current information. **Web search**
fills that gap. It is available on every plan. In the classic interface you turn it on from the +
button in the chat box; in the newer interface Claude decides on its own when a search would help.
Answers that draw on the web include citations and links so you can check them.

**Research** is for bigger questions. Instead of one or two lookups, Claude runs a series of
searches that build on each other, decides what to investigate next, and returns a cited report,
usually within minutes. It suits questions like "how are the main competitors in our region pricing
this service?" where the answer lives across many sources. Research needs a paid plan and needs web
search enabled, and you turn it on from the same + button. Because it pulls in many sources, it can
use your limits faster than a normal chat.

On Team and Enterprise, web search is an organization capability. An owner turns it on under
Organization settings > Capabilities before members can use it.

Whichever you use, the citations are a starting point for checking, not a guarantee. Open the
sources behind the claims you plan to rely on.

## Module 6: Memory, chat search, and starting fresh

By default, Claude on Free, Pro, and Max builds a **memory** from your chats. It saves individual
topics as you talk, such as the name of your team or a deadline that moved, so that later
conversations start with that context. You can also ask it directly to remember something. On Team
and Enterprise, memory is off until an organization owner turns it on, which is why a work account
can feel more forgetful than a personal one.

You stay in control. **Settings > Memory** lists what Claude remembers. You can correct or delete a
topic, pause memory so nothing new is added, reset it entirely, or switch off searching and
referencing past chats. Paid plans also offer **chat search**, where you ask Claude to look through
earlier conversations for a detail you discussed before.

Sometimes you want a conversation that leaves no trace. An **incognito chat**, opened with the
ghost icon, is not saved to your history and is not used for memory. It is available on every plan.

Finally, know when to start over. Long conversations use more of your allowance, and when a chat
nears the context window Claude may summarize earlier messages to keep going. If a thread has
drifted, if Claude keeps returning to an idea you abandoned, or if you are near your usage limit,
open a new chat and begin with a short summary of what is decided and what is still open. A clean
start with a good summary usually beats a long thread full of corrections.

## Module 7: Desktop, mobile, and voice

The **Claude Desktop** app has three tabs. **Chat** is the familiar conversation. **Cowork** is
where Claude takes on multi-step tasks and carries them out for you, such as organizing files,
assembling a report from several sources, or reformatting a batch of documents. **Code** is for
software work.

Cowork and chat are in the middle of becoming one experience. In the unified Claude, you describe
what you need and Claude decides which tools to use, whether that is a quick answer, a web search,
file creation, or a longer task. This is rolling out first to Pro and Max on web, desktop, and
mobile, with other plans to follow. Cowork-style tasks run in isolated cloud environments and keep
going if you close your laptop. Tasks that touch files on your computer, your browser, or your
computer itself need the desktop app open. On desktop you can connect folders so Claude can read and
write files there directly, without uploads and downloads.

The **mobile apps** give you the same account on the go. The feature most worth trying there is
**voice mode**, which lets you speak to Claude and hear it reply. It is in beta on all plans across
mobile, desktop, and web, and it is designed to work best on a phone. It is useful when your hands
are busy or when talking a problem through is easier than typing. You can switch between voice and
text in the same conversation, and voice mode has its own language setting under Settings > General.

## Module 8: Accuracy, safety, and knowing the limits

Claude is capable and fast, and it can still be wrong. It can misremember a figure, misread a
table, or state something false with complete confidence. The skill that separates good users from
frustrated ones is checking. Before a number, name, quote, or date goes to anyone else, confirm it
against the original source. Citations help because they tell you where to look, but they are not
proof. Open the source and see whether it says what the answer claims. Asking Claude "are you sure?"
is not a substitute, because a confident restatement is not independent evidence.

A second risk is **prompt injection**. When Claude reads a web page, a file, or the output of a
connected tool, that content might contain instructions planted by someone else, for example hidden
text telling Claude to add a suspicious link to its summary. Be cautious with material from sources
you do not trust, and look at outputs with that possibility in mind.

Anthropic's AI Fluency course offers a helpful frame with four competencies:

- **Delegation**: deciding what to hand to AI and what to keep.
- **Description**: asking clearly, which Module 2 covered.
- **Discernment**: judging the quality of what comes back.
- **Diligence**: taking responsibility for how the output is used.

That last point is the anchor for everything else. You remain responsible for what you send,
publish, or act on, even when Claude wrote the first draft. Keep passwords and secrets out of
chats, follow your organization's rules about what data may go into AI tools, and recognize the
tasks where Claude is the wrong choice, such as a decision that needs a licensed professional or
information you are not permitted to share.

When you have worked through all eight modules, the Claude for Work lane builds on this foundation
with skills, connectors, extensions, plugins, and the Office and browser integrations.
