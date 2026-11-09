# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). The version tracks the marketplace
(`.claude-plugin/marketplace.json`).

## [Unreleased]

### Added

- `node scripts/check.mjs`, one command that runs everything CI runs.
- `node scripts/serve.mjs` preview server and `.claude/launch.json` (port 4106).
- `AGENTS.md` agent guide; `CLAUDE.md` now imports it.
- `SECURITY.md`, this changelog, `.editorconfig`, `.gitattributes`, `CODEOWNERS`, Dependabot for
  GitHub Actions, issue forms.
- `displayName` and `category` on marketplace entries.
- `docs/llms.txt`, copied from the root `llms.txt` by the build.
- Open Graph and Twitter card tags on the web app.
- `tests/storage-blocked.test.mjs`, an offline test that boots the web app with `localStorage`
  blocked. `check.mjs` runs it, so CI does too.

### Fixed

- The web app no longer fails to render when browser storage is blocked.
- Accent text, primary buttons and answer badges meet WCAG AA contrast in light and dark mode.

### Changed

- `llms.txt` follows the llmstxt.org format with absolute URLs.
- CI runs `check.mjs` with read-only permissions.
- CI and the Pages build run on Node 26, the active LTS. Node 20 reached end of life on 2026-04-30.
  Docs now ask for Node 24 or later.
- The Pages workflow skips deploy while Pages is off instead of failing on every push to `main`.
- README states what Anthropic publishes about the certifications and marks the 720 pass mark as
  candidate-reported.

## [1.1.0] - 2026-08-06

### Changed

- Reworked web app UX: practice filters, exam review, flashcard grading, keyboard shortcuts.
- Raised content quality across the Associate, Architect Foundations and Architect Professional banks.
- Plugin skills became interactive coaching flows.

## [1.0.0] - 2026-07-20

### Added

- Four tracks with 100 original questions each, study guides and flashcards.
- `scripts/build.mjs` validation and generation pipeline.
- Static web app in `docs/` with Study, Practice, Exam and Flashcards modes.
- Plugin marketplace with exam-coach, flashcard-drill and cert-author.
- Maintainer skills and CI validation.

[Unreleased]: https://github.com/patrickking67/anthropic-university/compare/67c9c6d...HEAD
[1.1.0]: https://github.com/patrickking67/anthropic-university/compare/d8e4c8c...67c9c6d
[1.0.0]: https://github.com/patrickking67/anthropic-university/commit/d8e4c8c
