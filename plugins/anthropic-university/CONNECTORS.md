# Connectors

## Bundled (in `.mcp.json`)

| Name | URL | Auth | What the plugin uses it for |
| --- | --- | --- | --- |
| `claude-code-docs` | `https://code.claude.com/docs/mcp` | None | Verifying Claude Code, MCP, plugin, and Agent SDK facts |
| `microsoft-learn` | `https://learn.microsoft.com/api/mcp` | None | Claude on Microsoft Foundry, Azure, Copilot, and Entra scenarios |
| `agent-skills` | `https://agentskills.io/mcp` | None | The Agent Skills spec (`SKILL.md` format, progressive disclosure) |
| `econ-index` | `https://econ-index.mcp.claude.com/mcp` | None | Anthropic Economic Index usage data for partner and industry lanes |
| `claude-docs` | `https://api.anthropic.com/v1/pages/mcp` | Claude sign-in | Saving study plans, notes, and cheat sheets as living docs, on request |

All five are HTTP MCP servers. If one is already connected in your Claude account (for example
from the connector directory), the skills use whichever instance is available.

**Claude Docs needs sign-in.** In Claude Code, run `/mcp`, select `claude-docs`, and authenticate.
On the desktop app or the web, add or enable it under connector settings. Until then, skills
that offer "save to Claude Docs" fall back to a file or a copyable block.

## Also used

- **Anthropic Academy catalog** (`https://academy.claude.com/assets/data/catalog.json`), fetched
  on demand for course recommendations. See `references/sources.md` for the rules.
- **Claude API skill or reference.** The authority for Messages API parameters, models, pricing,
  caching, and batches.
- **Web search.** A fallback only, and only on the official domains listed in
  `references/sources.md`.

## Quizlet and Anki

Quizlet does not publish an MCP server or an open API for creating sets, so there is no Quizlet
connector to bundle. `/anthropic-university:export-quizlet` writes decks in Quizlet's paste-import
format (term TAB definition, one card per line) or as Anki CSV, which you then import by hand in a
few clicks.
