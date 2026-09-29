# Claude Code in Practice

> Anthropic University learning lane. Original study material by Patrick King, unofficial and not
> affiliated with Anthropic. Every fact here was checked against code.claude.com/docs on
> 2026-09-28. Claude Code changes quickly, so confirm details in the linked docs before you rely
> on them.

Most people meet Claude Code through one good afternoon: they ask it to fix a bug, it does, and
they are hooked. The harder question comes a week later. How do you run it on a real repository,
for a whole team, with secrets nearby and CI waiting, and still trust what comes back? This lane
answers that question in eight lessons. Each one matches a module in the lane, and each ends with
something to try.

---

## 1. One agent, several surfaces

Claude Code is a single agent you can reach from several places:

- **Terminal CLI.** The full-featured surface. Install it with the native script
  (`curl -fsSL https://claude.ai/install.sh | bash` on macOS, Linux, and WSL, or the Windows
  script). Homebrew (`brew install --cask claude-code`) and WinGet also work, but those installs
  don't auto-update, so upgrade them yourself.
- **IDE extensions.** The VS Code extension adds inline diffs, @-mentions, and plan review inside
  the editor. The JetBrains plugin works with IntelliJ, PyCharm, and the rest of the family, but it
  needs the CLI installed separately.
- **Desktop app.** The Claude desktop app has a **Code** tab for local coding sessions, next to
  Chat and Cowork.
- **Web.** At `claude.ai/code`, sessions run in cloud environments against a cloned repository.

The surface you choose decides where the work runs. On your laptop, Claude Code sees your files,
your `~/.claude` folder, and your local tools. In a cloud session it sees only what is committed to
the repository and what your claude.ai account provides. The same rule catches people out with
**routines**, which are scheduled cloud runs: a personal skill in `~/.claude/skills/` works in your
terminal but fails in a routine, because the routine never had access to your laptop.

**Rule of thumb:** anything the team or a cloud session needs goes in the repository's `.claude/`
folder. Anything that belongs only to you lives under `~/.claude/`.

---

## 2. The loop, plan mode, and permission modes

### How the loop works

Claude Code works in a loop with three phases that blend together: **gather context** (search and
read the code), **take action** (edit files and run commands), and **verify results** (run tests,
read output). It repeats until the task is done, and you can interrupt at any point.

Two habits make that loop far more reliable.

**Explore, then plan, then code.** For a change that spans several files, or code you don't know
well, start in plan mode. Claude reads the relevant code and proposes a plan, and nothing is edited
until you approve it. When you could describe the whole diff in one sentence, skip the plan, because
it only adds overhead there.

**Give Claude something to check against.** A failing test, a build exit code, a linter, or a
script that diffs output against a fixture turns a fix that looks right into one that is proven
right. The best-practices guide ranks this as the single highest-leverage thing you can do.

### Permission modes

A permission mode sets how much of the loop runs without asking you. Press `Shift+Tab` in the CLI
to cycle modes, or start a session with `--permission-mode`.

| Mode | What runs without asking | Use it for |
| --- | --- | --- |
| `default` (Manual) | Reads only | Sensitive or unfamiliar work |
| `acceptEdits` | Reads, file edits, common filesystem commands | Iterating on code you're reviewing |
| `plan` | Reads; edits wait for an approved plan | Exploring before changing |
| `auto` | Everything, with a classifier reviewing actions | Long tasks, fewer prompts |
| `dontAsk` | Only pre-approved tools; everything else is denied | Locked-down CI and scripts |
| `bypassPermissions` | Everything | Isolated containers and VMs only |

Two facts matter more than the table. First, **deny rules block in every mode**, including
`bypassPermissions`, so a deny rule is a real floor. Second, **allow rules have no effect in
`bypassPermissions`**, because everything is already allowed there. If you find yourself reaching
for bypass on a laptop, you probably want `acceptEdits`, `auto`, or better allow rules instead.

---

## 3. Settings: the file decides who it applies to

Claude Code reads settings from several JSON files. Where you put a key decides who it affects:

| Scope | File | Applies to |
| --- | --- | --- |
| User | `~/.claude/settings.json` | You, in every project |
| Project | `.claude/settings.json` (committed) | Everyone who clones the repository |
| Local | `.claude/settings.local.json` (kept out of git) | You, in this one project |
| Managed | `managed-settings.json`, MDM policy, or server-managed settings | Everyone your organization deploys it to |

When the same key appears in more than one file, precedence from highest to lowest is: **managed,
command-line flags, project local, shared project, user.** One exception makes team setups easy:
list keys such as `permissions.allow` **merge** across files instead of replacing each other, so a
teammate's local file can add entries without wiping out the project's.

### Permission rules

Rules come in three kinds: `allow`, `ask`, and `deny`. They are evaluated **deny first, then ask,
then allow**, and the first match wins. Specificity doesn't reorder that, and neither does scope: a
deny in project settings blocks an allow in your user settings, and the reverse is true too.

A reasonable shared project file:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./secrets/**)",
      "Bash(git push *)"
    ]
  }
}
```

Specifiers narrow a rule to part of a tool. `Bash(npm run *)` matches any `npm run` command.
`Read(./.env)` matches one file. `WebFetch(domain:example.com)` matches one host. For MCP tools,
use `mcp__<server>__<tool>`, or `mcp__<server>__*` for every tool from one server.

Settings files are strict JSON, so a `//` comment or a trailing comma is a syntax error. When you
choose "Yes, and don't ask again" on a prompt, Claude Code saves that approval as an allow rule in
`.claude/settings.local.json`. Run `/status` to see which settings files loaded, and `/permissions`
to review the rules in force.

For policy that must hold for everyone, such as "never read the secrets folder," use **managed
settings**. Nothing a developer sets in their own files overrides them.

---

## 4. CLAUDE.md, imports, and rules

Settings control what Claude *can* do. CLAUDE.md files tell it what it *should* do. They are
Markdown instructions that Claude reads at the start of every session.

| Location | Purpose |
| --- | --- |
| Managed policy CLAUDE.md (for example `/etc/claude-code/CLAUDE.md` on Linux) | Organization-wide standards |
| `~/.claude/CLAUDE.md` | Your personal preferences, every project |
| `./CLAUDE.md` or `./.claude/CLAUDE.md` | Team instructions, committed |
| `./CLAUDE.local.md` | Your notes for this project; add it to `.gitignore` |

Claude Code loads CLAUDE.md files from the working directory and **every directory above it** at
launch. Files in subdirectories load later, when Claude reads files there. None of them override
each other: they are concatenated from the filesystem root downward, so the file nearest to where
you launched is read last. If two files contradict each other, Claude may follow either one, so
clean up conflicts instead of relying on order.

Run `/init` to generate a first draft from your codebase, then edit it by hand. Run `/context` to
confirm what actually loaded.

### Imports

A CLAUDE.md can pull in other files with `@path/to/file`. Relative paths resolve from the file that
contains the import, and imports can nest up to four hops deep. Imports keep files tidy, but an
imported file still loads at launch, so it costs the same context as pasting it in.

### Path-scoped rules

For guidance that only matters for some files, use `.claude/rules/`. Each Markdown file covers one
topic. Add a `paths` list to its frontmatter and it loads only when Claude reads a matching file:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API rules

- Validate every request body before use.
- Return errors in the standard error envelope.
```

A rule without `paths` loads every session, like CLAUDE.md. This is the fix for the CLAUDE.md that
grew to 400 lines and stopped being followed: keep the always-true essentials in CLAUDE.md, move
file-specific guidance into scoped rules, and move occasional workflows into skills.

---

## 5. Skills, slash commands, and subagents

### Skills

A skill is a folder with a `SKILL.md` file. Custom slash commands have been merged into skills: a
file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create
`/deploy`. Skills add a folder for supporting files and more frontmatter options. Put personal
skills in `~/.claude/skills/` and team skills in the project's `.claude/skills/`.

```markdown
---
description: Fix a GitHub issue by number, following our test-first workflow.
argument-hint: [issue-number]
disable-model-invocation: true
allowed-tools: Read Grep Bash(npm test *)
---

Fix GitHub issue $ARGUMENTS.

1. Read the issue and find the failing behavior.
2. Write a failing test first, then make it pass.
3. Summarize the change for the pull request.
```

The frontmatter fields you'll use most:

- **`description`**: what the skill does and when to use it. Claude uses it to decide when to load
  the skill on its own, so put the main use case first.
- **`disable-model-invocation: true`**: Claude never starts the skill by itself, so it runs only
  when someone types `/name`. Use it for anything with side effects, like deploys or commits. It
  also keeps the skill out of context until someone invokes it.
- **`user-invocable: false`**: the reverse. The skill is hidden from the `/` menu and only Claude
  can use it, which suits background knowledge.
- **`allowed-tools`**: tools Claude can use without asking during the turn that invokes the skill.
  The grant ends when you send your next message.
- **`argument-hint`**: a hint shown in autocomplete. It does not validate anything.
- **`context: fork`**: runs the skill in a forked subagent instead of inline. Pair it with `agent`
  to choose the subagent type.

Arguments arrive through `$ARGUMENTS` (the whole string) or by position with `$ARGUMENTS[0]`,
shortened to `$0`, `$1`, and so on.

### Subagents

A subagent is a specialist that runs in **its own context window** with its own system prompt and
tool access, then returns only a summary. Define one as Markdown in `.claude/agents/` (for the
team) or `~/.claude/agents/` (for you):

```markdown
---
name: log-investigator
description: Reads CI logs and test output to find the root cause of a failure. Use for flaky or failing tests.
tools: Read, Grep, Glob, Bash
model: haiku
---

Find the first real error in the logs, trace it to the code, and report the cause and the
evidence in under 200 words.
```

Reach for a subagent when side work would flood the main conversation with material you'll never
look at again, such as hundreds of log lines or a broad code search. Keep descriptions short,
because every description sits in context so Claude knows when to delegate.

---

## 6. Hooks: rules that always run

A CLAUDE.md line saying "always run the formatter" is a request. A hook is a guarantee. Hooks run
your own handler at fixed points in the session: a shell command, an HTTP call, an MCP tool, a
prompt, or an agent.

The events you'll use most are `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`,
`Stop`, `SubagentStop`, `PreCompact`, and `Notification`. For tool events, a **matcher** filters on
the tool name, and an optional `if` field narrows further using permission-rule syntax:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/format.sh" }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "if": "Bash(rm *)", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-rm.sh" }
        ]
      }
    ]
  }
}
```

Command hooks receive the event as JSON on stdin and answer through their exit code:

- **Exit 0**: success. Print JSON on stdout for structured decisions, such as a `permissionDecision`
  of `"deny"` on `PreToolUse`. Exit 0 with no output means the hook has no opinion, and the normal
  permission flow continues.
- **Exit 2**: a blocking error. On `PreToolUse` it blocks the tool call. On `UserPromptSubmit` it
  rejects the prompt. On `Stop` it keeps Claude working, which is useful for "don't stop until the
  tests pass." On events that have already happened, such as `PostToolUse`, it shows stderr to
  Claude instead.
- **Any other non-zero code, including 1**: a non-blocking error. The action goes ahead anyway.

That last point causes real incidents. A policy hook that exits 1 because that is the usual Unix
failure code blocks nothing. Enforce policy with exit 2 or a JSON deny.

Matching MCP tools has one trap of its own. Tools are named `mcp__<server>__<tool>`. To match every
tool from a server named `github`, write `mcp__github__.*`. A bare `mcp__github` contains only
plain characters, so it is compared as an exact string and matches nothing.

A blocking `PreToolUse` hook also takes precedence over allow rules. That gives you a clean pattern:
allow `Bash` broadly for speed, then block the few dangerous commands in a hook.

---

## 7. MCP servers, plugins, and marketplaces

### MCP in Claude Code

MCP servers give Claude tools for systems outside the repository, such as issue trackers,
databases, or browsers. Add them from the command line:

```bash
# Remote server over HTTP (SSE is deprecated)
claude mcp add --transport http notion https://mcp.notion.com/mcp

# Local stdio server: everything after -- is the launch command
claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable -- npx -y airtable-mcp-server

# Share with the team by writing to .mcp.json
claude mcp add --transport http shared-docs --scope project https://docs.example.com/mcp
```

There are three scopes:

- **Local** (the default): stored in `~/.claude.json` for the current project only.
- **Project**: stored in `.mcp.json` at the repository root and committed.
- **User**: stored in `~/.claude.json` and available in all your projects.

If the same server name appears in more than one scope, Claude Code uses the whole entry from the
highest-precedence source (local, then project, then user) and never merges fields between them.

A committed `.mcp.json` should name its secrets instead of containing them. Expansion with
`${VAR}` and `${VAR:-default}` works in `command`, `args`, `env`, `url`, and `headers`:

```json
{
  "mcpServers": {
    "tickets": {
      "type": "http",
      "url": "${TICKETS_URL:-https://tickets.example.com}/mcp",
      "headers": { "Authorization": "Bearer ${TICKETS_TOKEN}" }
    }
  }
}
```

Project servers wait for approval, and a freshly cloned repository cannot approve its own servers
before you trust the workspace. For remote servers that use OAuth, open `/mcp` to sign in.

### Plugins

Once you have a good set of skills, subagents, hooks, and MCP servers, a plugin packages them into
one installable unit:

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json        # the manifest: name, version, description
├── skills/review/SKILL.md # runs as /my-plugin:review
├── agents/reviewer.md
├── hooks/hooks.json
└── .mcp.json
```

Only the manifest goes inside `.claude-plugin/`. Component folders sit at the plugin root. Putting
`skills/` inside `.claude-plugin/` is the most common reason a plugin loads but shows no skills.
Plugin skills are namespaced (`/my-plugin:review`) so that several plugins can coexist. Inside
plugin hooks and MCP configs, use `${CLAUDE_PLUGIN_ROOT}` to reference the plugin's own files.

To test a plugin, run `claude --plugin-dir ./my-plugin` for one session and `/reload-plugins` after
edits. To distribute it, publish a **marketplace**: a repository with
`.claude-plugin/marketplace.json` that lists plugins and where to fetch them. Users run
`/plugin marketplace add <owner>/<repo>` once, then `/plugin install <plugin>@<marketplace>`.

---

## 8. Headless runs, CI, context, and checkpoints

### Headless and CI

`claude -p "<prompt>"` runs one prompt with no interactive session. For scripts, the flags that
matter are:

```bash
claude --bare -p "Review this diff for risky changes" \
  --permission-mode dontAsk \
  --allowedTools "Read" "Bash(git diff *)" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"risk":{"type":"string"},"summary":{"type":"string"}},"required":["risk","summary"]}' \
  | jq '.structured_output'
```

- `--output-format json` returns a result object that includes `result`, `session_id`, and a cost
  estimate in `total_cost_usd`. Adding `--json-schema` puts a schema-shaped answer in
  `structured_output`. Use `stream-json` when you need events in real time.
- `--permission-mode dontAsk` with `--allowedTools` gives an exact allowlist. Anything else is
  denied instead of hanging on a prompt nobody will answer.
- `--bare` skips auto-discovery of hooks, skills, plugins, MCP servers, auto memory, and
  CLAUDE.md, which makes runs faster and more predictable. Without it, `-p` loads the project's
  configuration and shows no workspace trust dialog, so be careful when you point it at an untrusted
  repository.

For GitHub, run `/install-github-app` from Claude Code. It installs the Claude GitHub App, stores an
`ANTHROPIC_API_KEY` (or OAuth token) secret, and opens a pull request with the workflow. After that
merges, mentioning `@claude` in an issue or pull request starts a run. You can also give the action
a prompt to run on any GitHub event.

### Managing context

Context is the resource that runs out first, and quality drops as it fills. Three commands keep it
healthy:

- **`/clear`** between unrelated tasks. If you have corrected Claude twice on the same point, clear
  and start again with a better prompt.
- **`/compact <focus>`**, such as `/compact Focus on the API changes`, to summarize a long session
  and keep working. Claude Code also compacts automatically as you approach the limit.
- **`/context`** to see what is using space.

### Checkpoints and rewind

Claude Code saves a checkpoint of its own file edits as it works. Press `Esc` twice on an empty
prompt, or run `/rewind`, to restore the code, the conversation, or both to an earlier point.

Know the limits. Checkpoints **don't track changes made by Bash commands** (a script that deletes
files, a migration, a `mv`) or edits made outside Claude Code. They are a fast undo for Claude's own
edits, not a replacement for git. Commit before risky work.

---

## Where to go next

- Take Anthropic Academy's **Claude Code in Action** course alongside this lane.
- Keep the docs open: [settings](https://code.claude.com/docs/en/settings),
  [permissions](https://code.claude.com/docs/en/permissions),
  [hooks](https://code.claude.com/docs/en/hooks), [skills](https://code.claude.com/docs/en/skills),
  and [MCP](https://code.claude.com/docs/en/mcp).
- Then continue to the **MCP and Integrations** lane to build the servers you connect here.
