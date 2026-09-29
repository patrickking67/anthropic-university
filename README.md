<p align="center">
  <img src="assets/logo.svg" alt="Anthropic University — learn Claude, end to end" width="720">
</p>

<p align="center">
  <img alt="Status: unofficial" src="https://img.shields.io/badge/status-unofficial-B98A5E">
  <img alt="Certification tracks: 4" src="https://img.shields.io/badge/cert_tracks-4-CC6A4E">
  <img alt="Learning lanes: 13" src="https://img.shields.io/badge/learning_lanes-13-CC6A4E">
  <img alt="Questions: 772" src="https://img.shields.io/badge/practice_questions-772-CC6A4E">
  <img alt="Flashcards: 596" src="https://img.shields.io/badge/flashcards-596-CC6A4E">
  <img alt="Built with vanilla JS" src="https://img.shields.io/badge/app-vanilla_JS%2C_no_build-6A6A68">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-3C3A34">
</p>

# Anthropic University

**Learn Claude, end to end.** An open learning hub created by **Patrick King**: prep for all four
**Claude Certification** exams, plus thirteen learning lanes for using, building with,
administering, and partnering on Claude. It includes an **interactive web app** and an
**Anthropic University plugin** you can use in Claude Code, the Claude desktop app, or Claude chat.

> [!IMPORTANT]
> **Unofficial and community-authored.** Anthropic University is **not** affiliated with, endorsed
> by, or produced by Anthropic. Every question, card, and lesson is **original**, written to teach
> publicly documented concepts. It does **not** reproduce real or practice exam content, Anthropic
> Academy course text, or partner-portal training. Use it to *prepare*, and follow the
> Certification Exam Policy (no AI assistance *during* the exam, no sharing of exam questions).
> Nothing here is legal advice. The logo and artwork are original.

## Certification tracks

Mapped to the official exam guides (v1.0, effective July 2026): official domains and weights,
multiple-choice **and multiple-response** items, 120 minutes, 720 to pass on a 100–1,000 scale.

| Track | Official exam | Questions | Cards | Study |
| --- | --- | --- | --- | --- |
| **Associate – Foundations** | CCAO-F · 60 items · 7 domains | [121](content/associate-foundations/practice-exam.md) | [65](content/associate-foundations/flashcards.md) | [guide](content/associate-foundations/study-guide.md) |
| **Developer – Foundations** | CCDV-F · 53 items · 8 domains | [129](content/developer-foundations/practice-exam.md) | [76](content/developer-foundations/flashcards.md) | [guide](content/developer-foundations/study-guide.md) |
| **Architect – Foundations** | CCAR-F · 60 items · 4 of 6 scenarios | [117](content/architect-foundations/practice-exam.md) | [42](content/architect-foundations/flashcards.md) | [guide](content/architect-foundations/study-guide.md) |
| **Architect – Professional** | CCAR-P · 63 items · 7 domains | [125](content/architect-professional/practice-exam.md) | [80](content/architect-professional/flashcards.md) | [guide](content/architect-professional/study-guide.md) |

## Learning lanes

Each lane is a short course of 7–10 modules with lessons, practice questions, flashcards, and a
checkpoint. Pick lanes by role, or follow a path (see
[`learning-paths.md`](plugins/anthropic-university/references/learning-paths.md)).

| Group | Lane | Level | Modules · Questions · Cards |
| --- | --- | --- | --- |
| **Use Claude** | [Claude Essentials](content/lanes/claude-essentials/lane.md) | Beginner | 8 · 21 · 25 |
| | [Claude for Work](content/lanes/claude-for-work/lane.md) | Intermediate | 8 · 22 · 25 |
| **Build with Claude** | [Claude API Fundamentals](content/lanes/claude-api-fundamentals/lane.md) | Intermediate | 9 · 21 · 27 |
| | [Prompt Engineering for Claude](content/lanes/prompt-engineering/lane.md) | Intermediate | 9 · 21 · 27 |
| | [Claude Code in Practice](content/lanes/claude-code/lane.md) | Intermediate | 8 · 23 · 27 |
| | [MCP and Integrations](content/lanes/mcp-and-integrations/lane.md) | Intermediate | 8 · 22 · 26 |
| | [Building Agents with Claude](content/lanes/building-agents/lane.md) | Advanced | 10 · 26 · 30 |
| **Administer Claude** | [Enterprise Administration](content/lanes/enterprise-administration/lane.md) | Intermediate | 9 · 22 · 27 |
| | [Claude Desktop Deployment](content/lanes/desktop-deployment/lane.md) | Intermediate | 8 · 20 · 24 |
| **Partner & industry** | [Foundation Models for Client Conversations](content/lanes/partner-foundation-models/lane.md) | Beginner | 8 · 20 · 24 |
| | [Enterprise Solutioning with Claude](content/lanes/partner-enterprise-solutioning/lane.md) | Intermediate | 7 · 20 · 23 |
| | [Partner Delivery and Adoption](content/lanes/partner-delivery-adoption/lane.md) | Intermediate | 8 · 21 · 24 |
| | [Industry Solutions](content/lanes/industry-solutions/lane.md) | Intermediate | 8 · 21 · 24 |

The **partner tracks** are for consultants, resellers, and MSPs: model fundamentals in client
language, solutioning and ROI, delivery and change management, and industry patterns (legal,
financial services, regulated work). Pair them with the `client-roleplay` skill.

Everything is grounded in the official docs: [platform.claude.com/docs](https://platform.claude.com/docs) ·
[code.claude.com/docs](https://code.claude.com/docs) · [support.claude.com](https://support.claude.com) ·
[modelcontextprotocol.io](https://modelcontextprotocol.io). Facts that change often are tracked
in [`content/FACTS.md`](content/FACTS.md).

## Try the interactive app

A self-contained web app (vanilla JS, no build step):

- **Study / Lessons**: read a track's guide or a lane's module-by-module lessons
- **Practice**: one question at a time with immediate feedback, study-area tags, and filters for
  unanswered, missed, or flagged items. Multiple-response items say how many answers to select.
  Keyboard: `A`–`F`, arrows, `F` to flag.
- **Exam / Checkpoint**: timed mock scored on an approximate **100–1,000 scale (720 to pass)**, with
  a per-domain breakdown. **Official format** uses the official item count, and for Architect –
  Foundations it draws 4 of the 6 scenarios.
- **Flashcards**: flip, shuffle, and mark known or unknown (`Space` to flip, `1`/`2` to grade)

Progress is saved in your browser (`localStorage`). Light and dark themes are supported.

- **Live site:** `https://patrickking67.github.io/anthropic-university/` (publishes automatically
  once changes merge to `main`; see [Deploy](#deploy-github-pages))
- **Locally:** open [`docs/index.html`](docs/index.html) in a browser. It works from `file://`.

<p align="center">
  <img src="assets/screenshot-home.png" alt="Anthropic University home screen" width="49%">
  <img src="assets/screenshot-practice.png" alt="Practice mode, one scenario question at a time" width="49%">
</p>
<p align="center">
  <img src="assets/screenshot-study.png" alt="Study mode rendering a guide" width="49%">
  <img src="assets/screenshot-flashcards.png" alt="Flashcard drilling mode" width="49%">
</p>

## A suggested study workflow

1. **Learn** the lanes for your role (for example Claude API Fundamentals → Claude Code → MCP →
   Building Agents for a developer).
2. **Read** the study guide for your certification track.
3. **Practice** by domain until you can explain *why* each answer is right.
4. **Drill flashcards** for the concepts that keep slipping.
5. **Take an official-format mock.** Aim comfortably above 720, then revisit weak domains.

## Use it inside Claude

**Install the plugin** from this repo's marketplace ([`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json)):

```text
/plugin marketplace add patrickking67/anthropic-university
/plugin install anthropic-university@anthropic-university
```

One plugin, **Anthropic University**, runs in Claude Code, the Claude desktop app, and Claude chat.
Upload the packaged `.plugin` file on the desktop app or web, or install it from the marketplace in
Claude Code. Then:

```text
/anthropic-university:study-plan                       # start here: role, path, dated plan
/anthropic-university:learn building-agents
/anthropic-university:quiz-me developer-foundations tools-mcps
/anthropic-university:mock-exam architect-foundations full
/anthropic-university:flashcards claude-essentials
/anthropic-university:client-roleplay ciso
/anthropic-university:explain-concept prompt caching
/anthropic-university:export-quizlet architect-professional
```

| Skill | What it does |
| --- | --- |
| `study-plan` | Hub: recommends a role path, lanes, and a certification, then builds a dated plan |
| `learn` | Teaches a lane module by module, with a freshness check, practice, and a 70% checkpoint |
| `quiz-me` | Adaptive one-at-a-time practice with docs-verified feedback (tracks or lanes) |
| `mock-exam` | Timed run at official length and weights; 100–1,000 scaled score and per-domain report |
| `flashcards` | Leitner-style spaced repetition with requeues for weak cards |
| `explain-concept` | Layered, docs-grounded explainer with look-alike comparisons and a check question |
| `cheat-sheet` | One-page, docs-verified review sheet, saved as a Claude Doc, a Markdown file, or in chat |
| `grade-my-answer` | Grades pasted reasoning, names the misconception, and re-tests |
| `client-roleplay` | Partner practice: Claude plays a CIO, CISO, GC, CFO, or engineering lead, then scores you |
| `export-quizlet` | Exports cards to Quizlet paste-import, Anki CSV, or Markdown |
| `author-question` · `review-bank` · `build-content` | Contributor tools (Claude Code, in this repo) |

**Connectors.** The plugin bundles five hosted MCP servers:

| Connector | Used for |
| --- | --- |
| **Claude Code Docs** (`code.claude.com/docs/mcp`) | Checking answers against the live Claude Code, MCP, and SDK docs |
| **Microsoft Learn** (`learn.microsoft.com/api/mcp`) | Claude on Microsoft Foundry, Azure, and Copilot scenarios |
| **Agent Skills** (`agentskills.io/mcp`) | The open `SKILL.md` format behind skills questions |
| **Anthropic Economic Index** (`econ-index.mcp.claude.com/mcp`) | Real usage patterns for partner and industry lessons and client role-play |
| **Claude Docs** (`api.anthropic.com/v1/pages/mcp`) | Saving plans and cheat sheets as living docs, on request (needs Claude sign-in) |

Course recommendations come from Anthropic Academy's public catalog, fetched live, and are never
recommended from memory. Quizlet has no public MCP server, so the plugin exports decks in Quizlet's
import format instead. A bundled helper, `scripts/au.py` (Python standard library only), handles
official-format sampling, scaled grading, search, and exports whenever a shell is available.

## How it's built

`content/<track>/questions.json`, `flashcards.json`, and `content/lanes/<lane>/lane.json` are the
**single source of truth**. A dependency-free Node script validates them and regenerates everything
else (markdown, web-app data, plugin data):

```bash
node scripts/build.mjs          # validate + regenerate
node scripts/build.mjs --check  # validate only (CI): schema, select-N rules, coverage vs. weights
```

See [`content/SCHEMA.md`](content/SCHEMA.md) for the schema, [`CLAUDE.md`](CLAUDE.md) for the repo
map, and [`CONTRIBUTING.md`](CONTRIBUTING.md) for the authoring quality bar.

## Deploy (GitHub Pages)

The [`Deploy GitHub Pages`](.github/workflows/pages.yml) workflow builds the app data and publishes
`docs/` on every push to `main`. It uses `actions/configure-pages` with `enablement: true`, so Pages
turns on automatically the first time it runs.

## Contributing

New questions, lanes, corrections, and better explanations are welcome; accuracy is the whole
point. Read [`CONTRIBUTING.md`](CONTRIBUTING.md), keep content original, and open a PR. CI validates
every change.

## License

Created by Patrick King. Code and tooling: [MIT](LICENSE). Study content is provided for personal
learning and exam preparation. This project is unofficial and not affiliated with Anthropic;
"Claude" and "Anthropic" are trademarks of Anthropic, referenced here descriptively.
