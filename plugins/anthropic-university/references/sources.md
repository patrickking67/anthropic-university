# Sources and connectors

Route every factual lookup to the most authoritative connector available, cite the page, and say
when you could not verify something.

## Connectors bundled with the plugin

| Connector          | Tools (typical)                                                            | Use for |
| ------------------ | -------------------------------------------------------------------------- | ------- |
| `claude-code-docs` | `search_claude_code_docs`, `query_docs_filesystem_claude_code_docs`        | Claude Code CLI, flags, settings, hooks, skills, subagents, plugins/marketplaces, MCP config, headless/`-p` mode, GitHub Actions, SDK. |
| `microsoft-learn`  | `microsoft_docs_search`, `microsoft_docs_fetch`, `microsoft_code_sample_search` | Claude on Microsoft Foundry / Azure, Microsoft 365 Copilot and Copilot Studio with Claude, Entra/identity, Azure networking and governance that architect scenarios lean on. |

## Also use when present

- The `claude-api` skill (or equivalent Claude API reference) for Messages API parameters,
  `stop_reason` values, tool use, streaming, prompt caching, Batches, token counting, model ids.
- Web search/fetch restricted to `docs.claude.com`, `code.claude.com`, `platform.claude.com`,
  `anthropic.com`, and `learn.microsoft.com` when no connector covers the question.

## Routing

1. Claude Code / MCP / plugins / agent SDK → `claude-code-docs`.
2. Claude API behavior, models, pricing → `claude-api` skill, then official web docs.
3. Anything Azure/Microsoft (Claude in Foundry, Copilot, Entra, Azure infra) → `microsoft-learn`.
4. Cross-cloud deployment (Bedrock, Vertex AI) → official web docs from the cloud vendor.

## Citation style

End explanations that relied on a lookup with `Source: <page title> — <url>`. If a connector is
unavailable or returns nothing relevant, say "Not verified against live docs" rather than asserting
from memory, and fall back to the bank's `reference` link.

## Quizlet and Anki

Quizlet does not offer a public MCP server. The plugin integrates by exporting cards in Quizlet's
paste-import format (and Anki's CSV). See `/anthropic-university:export-quizlet`.
