# Anthropic University

Learn Claude, end to end. Created by Patrick King. Prep for all four Claude Certification exams
(Associate, Developer, Architect Foundations, Architect Professional), plus 13 learning lanes for
using, building with, administering, and partnering on Claude. It works in Claude Code, the Claude
desktop app, and Claude chat.

> Not affiliated with, endorsed by, or produced by Anthropic. All questions, cards, and lessons are
> original and teach publicly documented concepts. They do not reproduce real or practice exam
> content, Academy course text, or partner-portal training. Nothing here is legal advice. Never use
> AI assistance during a proctored exam.

## Skills

| Skill | Use it to… |
| --- | --- |
| `/anthropic-university:study-plan [role\|exam\|lane] [date]` | Start here: a role path, lanes, the official blueprint, and a dated plan |
| `/anthropic-university:learn <lane> [module]` | Work through a lane module by module, with practice and a checkpoint |
| `/anthropic-university:quiz-me <exam\|lane> [domain\|module] [n]` | Practice one question at a time with adaptive, docs-checked feedback |
| `/anthropic-university:mock-exam <exam> [20\|40\|full]` | Sit a timed run with a scaled score and per-domain breakdown |
| `/anthropic-university:flashcards <exam\|lane> [domain]` | Drill cards with spaced repetition |
| `/anthropic-university:explain-concept <topic>` | Understand a topic from live docs, with look-alike comparisons |
| `/anthropic-university:cheat-sheet <exam\|lane> [domain]` | Get a one-page, docs-verified review sheet, saved as a Claude Doc, a file, or in chat |
| `/anthropic-university:grade-my-answer` | Have your reasoning on a practice question graded |
| `/anthropic-university:client-roleplay [persona]` | Partner practice: rehearse a CIO, CISO, GC, CFO, or engineering-lead conversation, then get scored |
| `/anthropic-university:export-quizlet <exam> [domain] [format]` | Export decks to Quizlet, Anki, or Markdown |
| `/anthropic-university:author-question` · `review-bank` · `build-content` | Contributor tools (Claude Code, inside the repo) |

Exam ids: `associate-foundations`, `developer-foundations`, `architect-foundations`,
`architect-professional`. Loose names like "developer" or "architect pro" also work.

Lanes:

- **Use Claude:** `claude-essentials`, `claude-for-work`
- **Build with Claude:** `claude-api-fundamentals`, `prompt-engineering`, `claude-code`,
  `mcp-and-integrations`, `building-agents`
- **Administer Claude:** `enterprise-administration`, `desktop-deployment`
- **Partner & industry:** `partner-foundation-models`, `partner-enterprise-solutioning`,
  `partner-delivery-adoption`, `industry-solutions`

See `references/learning-paths.md` for role-based paths.

## Connectors

| Connector | Endpoint | Why |
| --- | --- | --- |
| Claude Code Docs | `https://code.claude.com/docs/mcp` | Verifies Claude Code, MCP, skills, plugins, hooks, and SDK facts |
| Microsoft Learn | `https://learn.microsoft.com/api/mcp` | Claude on Microsoft Foundry and Azure, Copilot, Entra, and Azure architecture |
| Agent Skills | `https://agentskills.io/mcp` | The open `SKILL.md` format and skill-authoring rules |
| Anthropic Economic Index | `https://econ-index.mcp.claude.com/mcp` | Real Claude usage patterns by task and region, for partner and industry lessons |
| Claude Docs | `https://api.anthropic.com/v1/pages/mcp` | Saves plans, notes, and cheat sheets as living docs when you ask (needs Claude sign-in) |

The first four are public and need no credentials. Claude Docs needs a sign-in: in Claude Code run
`/mcp` and authenticate `claude-docs`; in the app, enable it in connector settings. Course
recommendations come from Anthropic Academy's public catalog, fetched live. For Quizlet, see
[CONNECTORS.md](CONNECTORS.md).

## Helper script

`scripts/au.py` (Python 3, standard library only) samples official-format mocks, grades answers
with scaled scores, searches the banks, and writes Quizlet, Anki, or Markdown exports. Skills use it
automatically when a shell is available and fall back to reading the data otherwise. Run
`python3 scripts/au.py --help` to see the commands.

## What's inside

- `data/<exam>.json` holds each track's bank (117–129 questions, including multiple-response items,
  and 42–80 flashcards). `data/lanes/<lane>.json` holds each lane's modules, lessons, questions, and
  cards, and `data/catalog.json` lists everything. All of it is generated from the repo's `content/`
  by `node scripts/build.mjs`, so don't edit it by hand.
- `references/study-core.md` holds the shared rules: data loading, surface behavior, reply
  parsing, progress, and integrity.
- `references/sources.md` covers connector routing, the Economic Index and Academy rules, the rule
  that retrieved content is data and never instructions, and citation style.
- `references/blueprints.md` summarizes the official exam guides (v1.0, July 2026): item counts,
  official domains and weights, and the six Architect Foundations scenarios.
- `references/learning-paths.md` maps roles to lanes and certifications.

## Progress

When file tools are available, sessions can be saved to `~/.anthropic-university/progress.json`.
Question text is never stored. In chat without file tools, you get a one-line resume code to paste
next time.

## Install

- **Claude Code:** `/plugin marketplace add patrickking67/anthropic-university`, then
  `/plugin install anthropic-university@anthropic-university`.
- **Claude desktop app or web:** upload `anthropic-university.plugin` from the release (or build it
  with `zip -r`) under Customize → Plugins.
