# Connectors

## Bundled (in `.mcp.json`)

| Name | Type | URL | Auth | Tools |
| --- | --- | --- | --- | --- |
| `claude-code-docs` | HTTP MCP | `https://code.claude.com/docs/mcp` | None | `search_claude_code_docs`, `query_docs_filesystem_claude_code_docs` |
| `microsoft-learn` | HTTP MCP | `https://learn.microsoft.com/api/mcp` | None | `microsoft_docs_search`, `microsoft_docs_fetch`, `microsoft_code_sample_search` |

If either connector is already set up in your Claude account (for example from the connector
directory), the skills use whichever instance is available.

## Recommended, if you have them

- **Claude API skill / reference.** This is the authority for Messages API parameters, models,
  pricing, caching, and batches.
- **Web search.** Used as a fallback only, and only on official domains (`docs.claude.com`,
  `code.claude.com`, `platform.claude.com`, `anthropic.com`, `learn.microsoft.com`).

## Quizlet and Anki

Quizlet does not publish an MCP server or an open API for creating sets, so there is no Quizlet
connector to bundle. `/anthropic-university:export-quizlet` writes decks in Quizlet's paste-import
format (term TAB definition, one card per line) or as Anki CSV. You then import them by hand in a
few clicks. If Quizlet ships an MCP server later, add it to `.mcp.json` and to the export skill's
Deliver step.
