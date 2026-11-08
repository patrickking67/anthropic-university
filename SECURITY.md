# Security policy

## Supported versions

Only the latest commit on `main` is supported. The plugins and the web app are served from `main`;
there are no maintained release branches.

## Reporting a vulnerability

Report privately through GitHub:
https://github.com/patrickking67/anthropic-university/security/advisories/new

Do not open a public issue for a security problem. Include what you found, where, and how to reproduce it.

## Scope

In scope:

- The web app in `docs/` (for example script injection through rendered content)
- The build, check and preview scripts in `scripts/`
- The Claude Code plugins in `plugins/` and the marketplace in `.claude-plugin/`, including skill
  instructions that could make an agent run unsafe commands
- GitHub Actions workflows in `.github/workflows/`

Out of scope:

- Wrong or outdated answer keys. Open a normal issue for those.
- Anthropic's products, the certification exams, and third-party services. Report those to their owners.

## What to expect

This is a personal project maintained in spare time. Expect an acknowledgement within 7 days and a fix
or a decision within 30 days for confirmed issues. You will be credited in the advisory unless you ask
not to be.
