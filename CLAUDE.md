@AGENTS.md

## Claude Code notes

- `.mcp.json` adds the official `claude-code-docs` MCP server (enabled in `.claude/settings.json`). Use it,
  or the `claude-api` skill for API questions, to check answer keys before you commit them.
- Maintainer skills live in `.claude/skills/`: `author-questions`, `review-questions`, `build-content`,
  `add-exam`. The `cert-author` plugin ships the same workflow to contributors.
- `.claude/launch.json` starts the preview server (`anthropic-university-site`, port 4106).
