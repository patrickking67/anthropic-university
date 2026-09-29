# Claude Code in Practice

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Configure, extend, and automate Claude Code so long sessions stay safe, focused, and repeatable for a whole team.**

Group: build · Level: intermediate · ~6 h · For: Developers and technical leads who already use Claude Code for small tasks and want to set it up properly for a repository, a team, and CI.

## Take alongside

- [Claude Code in action](https://academy.claude.com/courses/claude-code-in-action) — Anthropic Academy
- [Claude Code documentation](https://code.claude.com/docs/en/overview) — Anthropic
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Anthropic

## Install Claude Code and pick a surface

Claude Code is one agent that runs in several places. Choose the surface that fits the work, and know which ones share your local configuration.

**You will be able to:**

- Install the Claude Code CLI with the native installer or a package manager
- Compare the terminal, IDE extensions, desktop app, and web surfaces
- Explain which surfaces run on your machine and which run in the cloud

**Key points**

- The native installer is a one-line script (curl on macOS, Linux, and WSL; a PowerShell or CMD script on Windows). Homebrew and WinGet installs also work but do not auto-update.
- The terminal CLI is the full-featured surface. The VS Code extension adds inline diffs, @-mentions, and plan review in the editor; the JetBrains plugin needs the CLI installed separately.
- The Claude desktop app has a Code tab for local coding sessions alongside Chat and Cowork.
- Claude Code on the web (claude.ai/code) runs sessions in cloud environments against a cloned repository, so it does not see files that exist only on your laptop.
- Cloud sessions and routines do not read ~/.claude/skills on your machine. Commit what the team needs to the repository's .claude/ folder.
- Most surfaces need a Claude subscription or a Claude Console account. The CLI and IDE extensions can also use third-party providers such as Amazon Bedrock or Google Cloud Vertex AI.

**Practice:** Install the CLI, run `claude` in a small repository, and ask it to explain the project layout. Then open the same repository in the VS Code extension or the desktop Code tab and compare what each surface shows you.

**Read:** [Claude Code overview](https://code.claude.com/docs/en/overview) · [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) · [VS Code extension](https://code.claude.com/docs/en/vs-code)

<details><summary>Flashcards</summary>

**Q:** Which Claude Code surface runs sessions in the cloud against a cloned repository?  
**A:** Claude Code on the web (claude.ai/code). It cannot see files that exist only on your laptop, and it does not read your ~/.claude/skills.

**Q:** Do Homebrew and WinGet installs of Claude Code auto-update?  
**A:** No. Upgrade them yourself (brew upgrade, winget upgrade). The native installer script is the auto-updating option.

**Q:** What does the JetBrains plugin need besides the plugin itself?  
**A:** The Claude Code CLI, installed separately.

</details>

### Check your understanding

*Study area: Surfaces · easy*

A developer keeps a personal skill in ~/.claude/skills/ on their laptop. It works in the terminal but reports "not found" when a scheduled routine invokes it. What explains this?

- **A.** Routines only run skills that have disable-model-invocation set to false
- **B.** Routines run as cloud sessions, which do not read skills from your local machine
- **C.** Personal skills must be re-registered with /skills before each routine run
- **D.** Routines only load skills that are packaged inside an installed plugin

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Each routine run starts a fresh cloud session. Cloud sessions load project skills committed to the cloned repository, not files under ~/.claude/skills on your laptop. Commit the skill to .claude/skills/ or enable it on your claude.ai account.

_Why a tempting wrong answer misses:_ Packaging as a plugin does not help here: plugins enabled only in user settings also do not load in cloud sessions.

Reference: https://code.claude.com/docs/en/skills

</details>

---

*Study area: Surfaces · easy*

A team wants Claude Code sessions they can start from a browser, which keep running on Anthropic-managed infrastructure against a cloned GitHub repository. Which surface fits?

- **A.** The JetBrains plugin connected to a remote interpreter
- **B.** The terminal CLI started inside a tmux session
- **C.** Claude Code on the web at claude.ai/code
- **D.** The VS Code extension with remote SSH enabled

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Claude Code on the web runs sessions in cloud environments against a cloned repository, so the work continues without your local machine.

_Why a tempting wrong answer misses:_ The CLI, VS Code, and JetBrains surfaces all run the agent on a machine you provide; tmux or SSH only changes where you attach from.

Reference: https://code.claude.com/docs/en/claude-code-on-the-web

</details>

---

## The agent loop, plan mode, and permission modes

Claude Code gathers context, acts, and verifies in a loop. Plan mode and permission modes decide how much of that loop runs without you.

**You will be able to:**

- Describe the gather-context, take-action, verify-results loop
- Apply the explore, plan, implement, commit workflow to a multi-file change
- Choose the right permission mode for interactive work, CI, and isolated containers
- Explain why deny rules still apply in every mode

**Key points**

- Claude works through three blended phases: gather context, take action, and verify results. It repeats until the task is done, and you can interrupt at any point.
- Explore first, then plan, then code. Plan mode is worth its overhead when the approach is uncertain or the change spans several files; skip it when you could describe the diff in one sentence.
- Give Claude a way to verify its work, such as a test suite, a build exit code, or a linter. A check it can read is the strongest single lever on quality.
- Permission modes: default (Manual) asks before most edits and commands; acceptEdits auto-approves file edits and common filesystem commands; plan blocks edits until you approve a plan; auto uses a classifier to review actions; dontAsk denies anything not pre-approved; bypassPermissions skips checks and belongs only in isolated containers or VMs.
- Press Shift+Tab in the CLI to cycle modes, or start with --permission-mode.
- Deny rules block in every mode, including bypassPermissions. Allow rules have no effect in bypassPermissions.

**Practice:** Pick a change that touches three files. Start in plan mode, ask Claude to read the relevant code and propose a plan, edit the plan, then approve it and let Claude implement and run the tests.

**Read:** [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) · [Choose a permission mode](https://code.claude.com/docs/en/permission-modes) · [Best practices](https://code.claude.com/docs/en/best-practices)

<details><summary>Flashcards</summary>

**Q:** The three phases of Claude Code's agent loop  
**A:** Gather context, take action, verify results. They blend together and repeat until the task is done.

**Q:** When is plan mode worth the overhead?  
**A:** When the approach is uncertain, the change spans several files, or you are unfamiliar with the code. Skip it for a one-sentence diff.

**Q:** dontAsk vs bypassPermissions  
**A:** dontAsk denies anything not pre-approved (good for locked-down CI). bypassPermissions skips checks entirely and belongs only in isolated containers or VMs.

**Q:** Does a deny rule apply in bypassPermissions mode?  
**A:** Yes. Deny rules block in every mode. Allow rules have no effect in bypassPermissions.

</details>

### Check your understanding

*Study area: Permission Modes · medium*

A CI job runs Claude Code headlessly to fix lint errors. It must run only `npm run lint` and file reads, and any other action must fail rather than wait for approval. Which configuration fits?

- **A.** claude -p with --permission-mode acceptEdits and no tool allowlist
- **B.** claude -p with --dangerously-skip-permissions inside the runner
- **C.** claude -p with --permission-mode plan so edits wait for approval
- **D.** claude -p with --permission-mode dontAsk and a narrow --allowedTools list

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

dontAsk denies every call that would otherwise prompt, while pre-approved tools from --allowedTools still run. That gives an exact allowlist with no hanging prompts.

_Why a tempting wrong answer misses:_ Skipping permissions allows everything, the opposite of an exact allowlist, and the docs reserve it for isolated containers or VMs.

Reference: https://code.claude.com/docs/en/permission-modes

</details>

---

*Study area: Agent Loop · medium*

Claude Code keeps producing a plausible fix for a date-parsing bug that later fails on edge cases. What single change to the prompt most improves the result?

- **A.** Give Claude a failing test for the edge cases and ask it to make the test pass
- **B.** Switch the session into plan mode and approve the first plan that it proposes
- **C.** Add a line to CLAUDE.md asking Claude to be careful with date handling
- **D.** Raise the model's effort level so it spends more time before answering

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The docs treat a verification signal Claude can read, such as a test suite, as the highest-leverage improvement. A failing test turns "plausible" into "proven".

_Why a tempting wrong answer misses:_ A general caution in CLAUDE.md gives no signal Claude can check, so the same unverified output can recur.

Reference: https://code.claude.com/docs/en/best-practices

</details>

---

*Study area: Permission Modes · hard*

Which TWO statements about Claude Code permission modes are accurate? (Select 2.)

- **A.** Deny rules still block matching tools when the session runs in bypassPermissions mode
- **B.** acceptEdits auto-approves file edits and common filesystem commands such as mkdir and mv
- **C.** Plan mode lets Claude edit files freely but blocks every shell command until approval
- **D.** Allow rules are the only way to grant tools once a session is in bypassPermissions mode
- **E.** dontAsk prompts once per tool and then remembers the answer for the rest of the session

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

Deny rules block in every mode, including bypassPermissions. acceptEdits auto-approves reads, file edits, and common filesystem commands.

_Why a tempting wrong answer misses:_ Plan mode blocks edits until you approve a plan, not the reverse. Allow rules have no effect in bypassPermissions, and dontAsk never prompts: it denies anything not pre-approved.

Reference: https://code.claude.com/docs/en/permission-modes

</details>

---

## Settings scopes and permission rules

The file a setting lives in decides who it applies to. Permission rules layer on top of the mode to pre-approve or block specific tools.

**You will be able to:**

- Place a setting in the user, project, local, or managed scope on purpose
- Predict which value wins when the same key is set in several files
- Write allow, ask, and deny rules with correct tool specifiers
- Keep secrets out of Claude's reach with Read deny rules

**Key points**

- User settings live in ~/.claude/settings.json and apply to you in every project. Project settings in .claude/settings.json are committed and shared. Local settings in .claude/settings.local.json are personal to one project and kept out of git.
- Managed settings are deployed by your organization (a managed-settings.json file, an MDM policy, or server-managed settings) and nothing you set overrides them, apart from a few security-sensitive exceptions.
- Precedence, highest first: managed, command-line flags, project local, shared project, user.
- List keys such as permissions.allow merge across files instead of replacing each other.
- Rules are evaluated deny, then ask, then allow, and the first match wins. A deny in any scope beats an allow in any other scope.
- Specifiers narrow a rule: Bash(npm run *), Read(./.env), WebFetch(domain:example.com), and mcp__server__tool for MCP tools.
- Run /status to see which settings sources loaded, and /permissions to review the active rules.

**Practice:** Create .claude/settings.json that allows your lint and test commands and denies reads of .env and a secrets/ folder. Add a personal override in .claude/settings.local.json, then confirm both with /status.

**Read:** [Settings files and precedence](https://code.claude.com/docs/en/settings) · [Configure permissions](https://code.claude.com/docs/en/permissions) · [Managed settings](https://code.claude.com/docs/en/managed-settings)

<details><summary>Flashcards</summary>

**Q:** Settings precedence, highest first  
**A:** Managed, command-line flags, project local (.claude/settings.local.json), shared project (.claude/settings.json), user (~/.claude/settings.json).

**Q:** Order in which permission rules are evaluated  
**A:** Deny, then ask, then allow. The first match wins, and specificity does not change the order.

**Q:** Rule that blocks Claude's file tools from reading .env  
**A:** "deny": ["Read(./.env)"] in permissions. Add Read(./secrets/**) for a folder.

**Q:** Where does "Yes, and don't ask again" save a Bash approval?  
**A:** As an allow rule in .claude/settings.local.json, which Claude Code keeps out of git.

</details>

### Check your understanding

*Study area: Settings Scopes · easy*

A developer wants to try Opus 5.5 in one repository without changing the model their teammates get from the committed .claude/settings.json. Where should they set the model key?

- **A.** In ~/.claude/settings.json so it follows them across projects
- **B.** In .claude/settings.local.json inside that repository
- **C.** In the committed .claude/settings.json behind a comment
- **D.** In the managed-settings.json file on their own laptop

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Project local settings sit above shared project settings and apply only to you in that project. Claude Code keeps the file out of git.

_Why a tempting wrong answer misses:_ User settings sit below project settings, so the committed project value would still win. Settings files are strict JSON, so a comment is a syntax error.

Reference: https://code.claude.com/docs/en/settings

</details>

---

*Study area: Permission Rules · medium*

User settings contain "allow": ["Bash(git push *)"]. The committed project settings contain "deny": ["Bash(git push *)"]. What happens when Claude tries to run git push origin main?

- **A.** It runs, because the user scope is personal and more specific
- **B.** It prompts, because conflicting rules fall back to an ask decision
- **C.** It is blocked, because deny rules are evaluated before allow rules
- **D.** It runs, because the rule that was written most recently wins

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Rules are evaluated deny, then ask, then allow, across every scope. A deny in project settings blocks an allow in user settings.

_Why a tempting wrong answer misses:_ Scope and recency do not reorder evaluation, and specificity does not change the deny-first order.

Reference: https://code.claude.com/docs/en/permissions

</details>

---

*Study area: Settings Scopes · medium*

Security requires that no developer can let Claude Code read files under secrets/, whatever they put in their own settings files. Where should the Read(./secrets/**) deny rule live?

- **A.** In managed settings deployed by the organization
- **B.** In each developer's user-level settings file
- **C.** In the repository's committed CLAUDE.md file
- **D.** In the project's .claude/settings.local.json

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Managed settings sit at the top of the precedence stack, and developers cannot override them. They are the documented place for security policy.

_Why a tempting wrong answer misses:_ CLAUDE.md is guidance Claude reads, not an enforced permission, and user or local files are under each developer's control.

Reference: https://code.claude.com/docs/en/managed-settings

</details>

---

## CLAUDE.md, imports, and path-scoped rules

Persistent instructions load every session. Keep them short, split them by topic, and scope the ones that only matter for certain files.

**You will be able to:**

- Choose between managed, user, project, and local CLAUDE.md locations
- Use @path imports to pull shared files into CLAUDE.md
- Write .claude/rules files with a paths field so they load only when relevant
- Decide when content belongs in a skill instead of CLAUDE.md

**Key points**

- Locations: a managed policy CLAUDE.md for the whole organization, ~/.claude/CLAUDE.md for you, ./CLAUDE.md or ./.claude/CLAUDE.md for the team, and ./CLAUDE.local.md for personal project notes that stay out of git.
- Claude Code loads CLAUDE.md files from the working directory and every directory above it at launch. Files in subdirectories load when Claude reads files there. All of them are concatenated, not overridden.
- Imports use @path/to/file. Relative paths resolve from the importing file, and imports can nest up to four hops deep.
- Files in .claude/rules/ are discovered recursively. A rule with a paths frontmatter list loads only when Claude reads a matching file; a rule without paths loads every session.
- Run /init to generate a starting CLAUDE.md, and /context to confirm what loaded.
- CLAUDE.md is paid for on every session. Put occasional workflows and deep reference material in skills, which load on demand.

**Practice:** Trim your project CLAUDE.md to build, test, and convention essentials. Move API-specific guidance into .claude/rules/api.md with a paths field for src/api/**, then open an API file and confirm the rule loads.

**Read:** [How Claude remembers your project](https://code.claude.com/docs/en/memory) · [Extend Claude Code](https://code.claude.com/docs/en/features-overview)

<details><summary>Flashcards</summary>

**Q:** CLAUDE.local.md  
**A:** Personal, project-specific instructions at the project root. It loads after CLAUDE.md at that level and should stay out of version control.

**Q:** How deep can CLAUDE.md @imports nest?  
**A:** Up to four hops. Relative paths resolve from the file that contains the import.

**Q:** What makes a .claude/rules file load only for certain files?  
**A:** A paths list in its YAML frontmatter, such as "src/api/**/*.ts". It loads when Claude reads a matching file.

</details>

### Check your understanding

*Study area: CLAUDE.md · medium*

A monorepo's CLAUDE.md has grown to hundreds of lines, and Claude often ignores the frontend conventions buried near the end. What is the best restructure?

- **A.** Move the conventions to the top of CLAUDE.md and mark them IMPORTANT
- **B.** Copy the conventions into each developer's ~/.claude/CLAUDE.md file
- **C.** Split the conventions into an @import file loaded from CLAUDE.md
- **D.** Move them into .claude/rules/frontend.md with a paths field for web files

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A path-scoped rule loads only when Claude reads matching files, which cuts noise and saves context while keeping the guidance where it applies.

_Why a tempting wrong answer misses:_ An @import still expands at launch, so the same text loads every session and the file stays just as long in context.

Reference: https://code.claude.com/docs/en/memory

</details>

---

*Study area: CLAUDE.md · easy*

Claude Code starts in repo/packages/api/. Both repo/CLAUDE.md and repo/packages/api/CLAUDE.md exist. How are they applied?

- **A.** Only the nearest file loads, because it overrides the parent file
- **B.** Both load and are concatenated, with the parent's content read first
- **C.** Only the parent file loads, because it is the repository-root file
- **D.** Both load, but Claude asks which to follow when they overlap in scope

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Claude Code loads CLAUDE.md from the working directory and every directory above it. They are concatenated from the root down, so the file closer to where you launched is read last.

_Why a tempting wrong answer misses:_ Files do not override each other. Contradictory instructions are a maintenance problem to fix, not a prompt Claude raises.

Reference: https://code.claude.com/docs/en/memory

</details>

---

*Study area: CLAUDE.md · medium*

A developer wants their personal sandbox URLs available to Claude in one project without committing them. Which file is designed for this?

- **A.** ~/.claude/CLAUDE.md in the home directory
- **B.** .claude/rules/personal.md with a paths field
- **C.** ./CLAUDE.local.md added to .gitignore
- **D.** ./.claude/CLAUDE.md in the project folder

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

CLAUDE.local.md holds personal, project-specific instructions. It loads alongside CLAUDE.md and should be listed in .gitignore.

_Why a tempting wrong answer misses:_ ~/.claude/CLAUDE.md applies to every project on the machine, not just this one, and .claude/ files in the project are normally committed.

Reference: https://code.claude.com/docs/en/memory

</details>

---

## Skills, slash commands, and subagents

Skills package reusable instructions that you or Claude can invoke. Subagents do side work in their own context and return only a summary.

**You will be able to:**

- Create a skill with SKILL.md and the frontmatter fields the docs define
- Control who can invoke a skill and which tools it pre-approves
- Pass arguments to a skill with $ARGUMENTS and indexed placeholders
- Define a subagent with a restricted tool list and a focused description

**Key points**

- Custom commands merged into skills. A file at .claude/commands/deploy.md and a skill at .claude/skills/deploy/SKILL.md both create /deploy; skills add a folder for supporting files and more frontmatter.
- description tells Claude when to load the skill automatically. disable-model-invocation: true keeps it manual-only; user-invocable: false hides it from the / menu so only Claude can use it.
- allowed-tools pre-approves tools for the turn that invokes the skill. argument-hint shows expected arguments in autocomplete. context: fork runs the skill in a forked subagent, and agent picks which subagent type.
- $ARGUMENTS expands to everything typed after the command; $ARGUMENTS[0] or $0 picks one argument by position.
- Subagents live in .claude/agents/ or ~/.claude/agents/ as Markdown with frontmatter such as name, description, tools, and model. Each runs in its own context window and returns a summary.
- Use a subagent when side work would flood the main conversation with logs or search results you will not need again.

**Practice:** Write a /fix-issue skill that takes an issue number through $ARGUMENTS, set disable-model-invocation: true, and pre-approve only the read and test tools it needs. Then add a read-only reviewer subagent with tools: Read, Grep, Glob.

**Read:** [Extend Claude with skills](https://code.claude.com/docs/en/skills) · [Create custom subagents](https://code.claude.com/docs/en/sub-agents)

<details><summary>Flashcards</summary>

**Q:** disable-model-invocation: true  
**A:** Skill frontmatter that stops Claude from loading the skill on its own. You run it manually with /name, and it costs no context until then.

**Q:** allowed-tools in a skill  
**A:** Tools Claude can use without asking during the turn that invokes the skill. The grant clears when you send your next message.

**Q:** $ARGUMENTS vs $0  
**A:** $ARGUMENTS is the full argument string. $0 (same as $ARGUMENTS[0]) is the first argument by position.

**Q:** Why delegate to a subagent?  
**A:** It works in its own context window and returns only a summary, so logs and search results do not fill the main conversation.

</details>

### Check your understanding

*Study area: Skills · medium*

A /deploy skill should never start on its own because Claude thought a conversation sounded deployment-related. Which frontmatter setting achieves this?

- **A.** disable-model-invocation: true
- **B.** user-invocable: false
- **C.** context: fork
- **D.** allowed-tools: Bash

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

disable-model-invocation: true stops Claude from loading the skill automatically, so it runs only when someone types /deploy.

_Why a tempting wrong answer misses:_ user-invocable: false does the opposite: it hides the skill from the / menu so only Claude can invoke it.

Reference: https://code.claude.com/docs/en/skills

</details>

---

*Study area: Subagents · medium*

Investigating a flaky test means reading hundreds of log lines that the main session will never need again. What is the best way to keep the main context clean?

- **A.** Paste the logs into CLAUDE.md so they load once at session start
- **B.** Run /compact first so the logs fit into the remaining context space
- **C.** Delegate the investigation to a subagent that returns only a summary
- **D.** Raise MAX_MCP_OUTPUT_TOKENS so the logs are not truncated on read

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

A subagent works in its own context window and returns only its result, so the log reads never touch the main conversation.

_Why a tempting wrong answer misses:_ Compacting before the work does not stop the logs from filling context again once they are read.

Reference: https://code.claude.com/docs/en/sub-agents

</details>

---

*Study area: Skills · hard*

Which TWO statements about Claude Code skills are supported by the docs? (Select 2.)

- **A.** A skill's allowed-tools grant lasts for the whole session once it has been invoked
- **B.** A file in .claude/commands/ and a skill folder both create a slash command
- **C.** Skills in ~/.claude/skills/ are synced to cloud sessions automatically on start
- **D.** context: fork runs the skill in a forked subagent context instead of inline
- **E.** The argument-hint field validates arguments and rejects calls that do not match

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, D**

Custom commands merged into skills, so .claude/commands/deploy.md and .claude/skills/deploy/SKILL.md both create /deploy. context: fork runs the skill in its own subagent context.

_Why a tempting wrong answer misses:_ The allowed-tools grant clears at your next message, cloud sessions do not read ~/.claude/skills, and argument-hint only shows a hint in autocomplete.

Reference: https://code.claude.com/docs/en/skills

</details>

---

## Hooks: deterministic control at lifecycle events

Hooks run your own command, HTTP call, or prompt at fixed points in a session, so a rule is enforced every time instead of remembered sometimes.

**You will be able to:**

- Pick the right hook event for a policy, a formatter, or a notification
- Write matchers that target specific tools, including MCP tools
- Use exit codes and JSON output to block or allow an action
- Explain why a hook is stronger than an instruction in CLAUDE.md

**Key points**

- Common events: SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop, SubagentStop, PreCompact, Notification, and SessionEnd.
- For tool events, the matcher filters on the tool name: Bash, Edit|Write, or mcp__github__.* for every tool from one MCP server. The optional if field narrows further with permission-rule syntax such as Bash(rm *).
- Exit 0 means success; print JSON on stdout for structured decisions. Exit 2 is a blocking error: on PreToolUse it blocks the tool call, on Stop it keeps Claude working.
- Exit 1 and other non-zero codes are non-blocking errors, and the action proceeds. A policy hook must use exit 2 or a JSON deny decision.
- A PreToolUse hook that blocks takes precedence over allow rules, so you can allow Bash broadly and block a few dangerous patterns in a hook.
- Handler types include command, http, mcp_tool, prompt, and agent. Command hooks receive the event JSON on stdin.

**Practice:** Add a PostToolUse hook with matcher Edit|Write that runs your formatter, and a PreToolUse hook with matcher Bash that exits 2 on any command touching a production config path. Trigger both and read the transcript notices.

**Read:** [Hooks reference](https://code.claude.com/docs/en/hooks) · [Get started with hooks](https://code.claude.com/docs/en/hooks-guide)

<details><summary>Flashcards</summary>

**Q:** Hook exit code that blocks a PreToolUse call  
**A:** Exit 2. Exit 1 is a non-blocking error and the action proceeds.

**Q:** What does exit 2 do on a Stop hook?  
**A:** Prevents Claude from stopping, so the conversation continues. Useful for "keep going until the tests pass" checks.

**Q:** Matcher for every tool from an MCP server named github  
**A:** mcp__github__.* (the .* is required; a bare mcp__github is compared as an exact string and matches nothing).

</details>

### Check your understanding

*Study area: Hooks · medium*

A PreToolUse hook is meant to block any Bash command that writes to prod.env. It prints a warning and exits with code 1, yet the commands still run. What is wrong?

- **A.** PreToolUse hooks cannot see Bash commands, only file edit tools
- **B.** The hook must exit 2 or return a JSON deny decision to block the call
- **C.** Exit code 1 only blocks when the matcher is written as a regular expression
- **D.** Hooks never block tools; only permission rules are able to block them

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Exit 2 is the blocking code. Exit 1 and other non-zero codes are non-blocking errors, so the action proceeds.

_Why a tempting wrong answer misses:_ Hooks can block: a PreToolUse hook that exits 2 stops the call before permission rules are evaluated.

Reference: https://code.claude.com/docs/en/hooks

</details>

---

*Study area: Hooks · medium*

A team wants every file Claude edits or creates to be formatted automatically, every time, without relying on Claude to remember. Which setup fits?

- **A.** A CLAUDE.md line telling Claude to run the formatter after edits
- **B.** A skill with disable-model-invocation that runs the formatter
- **C.** A PreToolUse hook with matcher Bash that formats before commands
- **D.** A PostToolUse hook with matcher Edit|Write that runs the formatter

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A PostToolUse hook fires after each matching tool call succeeds. Matching Edit|Write runs the formatter deterministically after every edit.

_Why a tempting wrong answer misses:_ A CLAUDE.md instruction is guidance Claude may skip; a hook is enforced on every matching event.

Reference: https://code.claude.com/docs/en/hooks

</details>

---

*Study area: Hooks · hard*

A PreToolUse hook should run for every tool from the MCP server named jira. Which matcher value works?

- **A.** mcp__jira
- **B.** jira__*
- **C.** mcp__jira__.*
- **D.** mcp:jira

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

MCP tools are named mcp__<server>__<tool>. Appending .* to the server prefix puts the matcher on the regular-expression path and matches every tool from that server.

_Why a tempting wrong answer misses:_ mcp__jira contains only exact-match characters, so it is compared as an exact string and matches no tool.

Reference: https://code.claude.com/docs/en/hooks

</details>

---

## MCP servers, plugins, and marketplaces in Claude Code

Connect external systems through MCP with the right scope, then package your whole setup as a plugin so every teammate gets the same thing.

**You will be able to:**

- Add stdio and HTTP MCP servers at local, project, or user scope
- Use environment variable expansion to keep secrets out of .mcp.json
- Describe the plugin directory layout and how plugin skills are namespaced
- Add a marketplace and install a plugin from it

**Key points**

- claude mcp add --transport http <name> <url> adds a remote server; for stdio, everything after -- is the command that launches the server. SSE is deprecated in favor of HTTP.
- Scopes: local (the default, stored in ~/.claude.json for this project only), project (.mcp.json at the repository root, committed), and user (~/.claude.json, all your projects). Local beats project, which beats user.
- .mcp.json supports ${VAR} and ${VAR:-default} in command, args, env, url, and headers, so the committed file names a variable instead of holding the secret.
- Project .mcp.json servers wait for approval, and a cloned repository cannot approve its own servers before you trust the workspace.
- A plugin is a directory with .claude-plugin/plugin.json plus components such as skills/, agents/, hooks/hooks.json, and .mcp.json. Plugin skills are namespaced, as in /my-plugin:review.
- A marketplace is a repository with .claude-plugin/marketplace.json. Add it with /plugin marketplace add, then install with /plugin install name@marketplace. Use --plugin-dir to test a plugin for one session.

**Practice:** Add a remote MCP server at project scope with its token read from ${API_TOKEN}. Then bundle one skill and one hook into a plugin, load it with --plugin-dir, and run its namespaced skill.

**Read:** [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp) · [Plugins overview](https://code.claude.com/docs/en/plugins/overview) · [Create a plugin](https://code.claude.com/docs/en/plugins/create)

<details><summary>Flashcards</summary>

**Q:** Default scope for claude mcp add  
**A:** Local: stored in ~/.claude.json for the current project only. Use --scope project for .mcp.json or --scope user for all your projects.

**Q:** Environment variable syntax in .mcp.json  
**A:** ${VAR} or ${VAR:-default}, in command, args, env, url, and headers.

**Q:** File that makes a directory a plugin  
**A:** .claude-plugin/plugin.json. Components such as skills/ and agents/ sit at the plugin root, not inside .claude-plugin/.

</details>

### Check your understanding

*Study area: MCP in Claude Code · medium*

A team wants everyone who clones a repository to get the same remote MCP server, without committing the API token. What is the recommended approach?

- **A.** Add it at local scope on each laptop and share the token in the README
- **B.** Add it at user scope with the token hard-coded in the headers block
- **C.** Commit .mcp.json with the token pasted into the url query string
- **D.** Commit .mcp.json with a header that references ${API_TOKEN}

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Project scope (.mcp.json) is the shared, committed scope, and ${VAR} expansion in headers keeps the secret in each developer's environment.

_Why a tempting wrong answer misses:_ User and local scopes live in ~/.claude.json and are private to one person, so teammates would not get the server.

Reference: https://code.claude.com/docs/en/mcp

</details>

---

*Study area: Plugins · medium*

A plugin loads, but none of its skills appear. The layout is my-plugin/.claude-plugin/plugin.json and my-plugin/.claude-plugin/skills/review/SKILL.md. What is the fix?

- **A.** Move skills/ to the plugin root, next to .claude-plugin/
- **B.** Rename plugin.json to marketplace.json inside .claude-plugin/
- **C.** Add every skill's full path to the project's settings.json
- **D.** Move SKILL.md up so it sits directly in the skills/ folder

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Component directories such as skills/, agents/, and hooks/ belong at the plugin root. Only the manifest lives inside .claude-plugin/.

_Why a tempting wrong answer misses:_ marketplace.json describes a catalog of plugins, not a single plugin, so renaming the manifest breaks the plugin instead of fixing it.

Reference: https://code.claude.com/docs/en/plugins/create

</details>

---

*Study area: MCP in Claude Code · hard*

Which TWO statements about MCP server scopes in Claude Code are accurate? (Select 2.)

- **A.** claude mcp add writes to local scope unless you pass --scope
- **B.** Project-scoped servers are stored in ~/.claude.json for sharing
- **C.** When a name exists in several scopes, the local definition wins
- **D.** Fields from same-named servers in each scope are merged together
- **E.** User-scoped servers load only in the project where they were added

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

Local is the default scope for claude mcp add. When the same server name appears in several places, Claude Code uses the highest-precedence definition, and local beats project, which beats user.

_Why a tempting wrong answer misses:_ Project servers live in .mcp.json, not ~/.claude.json. Entries are not merged across scopes, and user scope applies to all your projects.

Reference: https://code.claude.com/docs/en/mcp

</details>

---

## Headless runs, CI, context, and checkpoints

Run Claude Code without a person at the keyboard, keep long sessions from drowning in stale context, and undo safely when a direction goes wrong.

**You will be able to:**

- Run claude -p with an exact tool allowlist and JSON output
- Set up the Claude Code GitHub Action for @claude mentions
- Use /clear and /compact at the right moments
- Rewind code and conversation with checkpoints, and know their limits

**Key points**

- claude -p runs a prompt non-interactively. --output-format json returns a result object with fields such as result, session_id, and total_cost_usd; add --json-schema to get a structured_output field that matches your schema.
- In CI, pair --permission-mode dontAsk with --allowedTools so anything not pre-approved is denied instead of hanging on a prompt. --bare skips auto-discovery of hooks, skills, plugins, MCP servers, and CLAUDE.md for faster, more predictable runs.
- /install-github-app sets up the Claude GitHub App, the ANTHROPIC_API_KEY (or OAuth token) secret, and a workflow so @claude works in issues and pull requests.
- Context is the scarcest resource. Run /clear between unrelated tasks. Run /compact with focus instructions, such as /compact Focus on the API changes, to summarize a long session. Claude Code also compacts automatically near the limit.
- Checkpoints capture Claude's file edits. Press Esc twice or run /rewind to restore code, conversation, or both.
- Checkpoints do not track changes made by Bash commands or by anything outside Claude Code, so they are not a substitute for git.

**Practice:** Write a CI step that runs claude -p to summarize a diff with --output-format json and a --json-schema for {risk, summary}, using dontAsk and a Read-only allowlist. Parse structured_output with jq.

**Read:** [Run Claude Code programmatically](https://code.claude.com/docs/en/headless) · [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) · [Checkpointing](https://code.claude.com/docs/en/checkpointing) · [Explore the context window](https://code.claude.com/docs/en/context-window)

<details><summary>Flashcards</summary>

**Q:** Flag that makes claude -p return a schema-shaped result  
**A:** --output-format json with --json-schema '<schema>'. The answer arrives in structured_output.

**Q:** /clear vs /compact  
**A:** /clear resets context for an unrelated task. /compact summarizes the current conversation, optionally with focus instructions, so you can keep going.

**Q:** What do checkpoints not capture?  
**A:** Changes made by Bash commands and edits made outside Claude Code. Use git for those.

</details>

### Check your understanding

*Study area: Headless and CI · medium*

A script calls claude -p and needs a machine-readable object with fields risk and summary for each run. Which invocation fits best?

- **A.** claude -p "..." --output-format text, then parse the prose with a regex
- **B.** claude -p "..." --output-format json --json-schema '<schema>'
- **C.** claude -p "..." --output-format stream-json and keep the first line
- **D.** claude -p "..." --verbose and read the risk field from the debug log

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

--output-format json with --json-schema returns metadata plus a structured_output field that conforms to the schema.

_Why a tempting wrong answer misses:_ stream-json emits a stream of events for real-time display; its first line is an event, not your schema-shaped answer.

Reference: https://code.claude.com/docs/en/headless

</details>

---

*Study area: Context Management · easy*

After finishing an authentication refactor, a developer starts an unrelated task on the billing report in the same session. What does the documented guidance recommend first?

- **A.** Run /compact so the refactor history stays available as a summary
- **B.** Run /rewind to the start so the refactor edits are undone as well
- **C.** Run /clear to reset context before starting the unrelated task
- **D.** Run /init so a fresh CLAUDE.md is generated for the next task

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The best-practices guide recommends /clear between unrelated tasks, because stale context from earlier work lowers performance.

_Why a tempting wrong answer misses:_ /compact suits continuing the same work with less context; for an unrelated task the summary is still noise.

Reference: https://code.claude.com/docs/en/best-practices

</details>

---

*Study area: Checkpoints · medium*

Claude ran a Bash script that deleted generated files, then edited two source files. The developer opens /rewind and restores code to before both steps. What is the result?

- **A.** Both the source edits and the deleted files are fully restored
- **B.** Neither change is restored, because Bash ran inside the same turn
- **C.** The deleted files come back, but the source edits stay in place
- **D.** The source edits are reverted, but the deleted files stay deleted

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Checkpoints track Claude's file edits. Changes made by Bash commands are not tracked, so the deleted files are not restored.

_Why a tempting wrong answer misses:_ Checkpoints are not a full filesystem snapshot. Use git for anything a shell command changes.

Reference: https://code.claude.com/docs/en/checkpointing

</details>

---
