<p align="center">
  <img src="assets/logo.svg" alt="Anthropic University — Claude Certification study hub" width="720">
</p>

<p align="center">
  <img alt="Status: unofficial" src="https://img.shields.io/badge/status-unofficial-B98A5E">
  <img alt="Tracks: 4" src="https://img.shields.io/badge/tracks-4-CC6A4E">
  <img alt="Questions: 400" src="https://img.shields.io/badge/practice_questions-400-CC6A4E">
  <img alt="Built with vanilla JS" src="https://img.shields.io/badge/app-vanilla_JS%2C_no_build-6A6A68">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-3C3A34">
</p>

# Anthropic University

An open study hub for the **Claude Certification** program: original practice exams, study guides,
and flashcards for four tracks, plus an **interactive web app** and a **Claude Code plugin
marketplace** you can install to study right in your terminal.

> [!IMPORTANT]
> **Unofficial & community-authored.** Anthropic University is **not** affiliated with, endorsed by,
> or produced by Anthropic. Every question is **original**, written to teach publicly documented
> concepts — it does **not** reproduce real certification exam content. Use it to *prepare*, and
> always follow the [Certification Exam Policy](https://www.anthropic.com) (no AI assistance *during*
> the exam, no sharing of real exam questions). The logo and artwork here are original.

## What's inside

Four certification tracks, each with **100 original questions**, a study guide, and a flashcard set:

| Track | Study guide | Practice exam | Flashcards |
| --- | --- | --- | --- |
| **Claude Certified Associate – Foundations** | [guide](content/associate-foundations/study-guide.md) | [100 Q](content/associate-foundations/practice-exam.md) | [cards](content/associate-foundations/flashcards.md) |
| **Claude Certified Developer – Foundations** | [guide](content/developer-foundations/study-guide.md) | [100 Q](content/developer-foundations/practice-exam.md) | [cards](content/developer-foundations/flashcards.md) |
| **Claude Certified Architect – Foundations** | [guide](content/architect-foundations/study-guide.md) | [100 Q](content/architect-foundations/practice-exam.md) | [cards](content/architect-foundations/flashcards.md) |
| **Claude Certified Architect – Professional** | [guide](content/architect-professional/study-guide.md) | [100 Q](content/architect-professional/practice-exam.md) | [cards](content/architect-professional/flashcards.md) |

Grounded in the official docs: [platform.claude.com/docs](https://platform.claude.com/docs) ·
[code.claude.com/docs](https://code.claude.com/docs) · Model Context Protocol.

## Try the interactive app

A self-contained web app (vanilla JS, no build step) with four modes:

- **Study** — read the guide for a track
- **Practice** — one question at a time, immediate feedback, study-area tags, and filters for
  unanswered / missed / flagged (keyboard: `A`–`D`, arrows, `F` to flag)
- **Exam** — timed mock scored on an approximate **100–1000 scale (720 to pass)**, with a
  per-domain breakdown and review filters for misses, flags, or all items
- **Flashcards** — flip, shuffle, and mark known/unknown (`Space` to flip, `1`/`2` to grade)

Progress is saved in your browser (`localStorage`). Light/dark aware. Mode nav stays available
inside each track.

- **Live site:** `https://patrickking67.github.io/anthropic-university/` *(publishes automatically
  once this branch merges to `main` — see [Deploy](#deploy--github-pages))*
- **Locally:** just open [`docs/index.html`](docs/index.html) in a browser — it works from `file://`,
  no server needed.

<p align="center">
  <img src="assets/screenshot-home.png" alt="Anthropic University home screen with the four certification tracks" width="49%">
  <img src="assets/screenshot-practice.png" alt="Practice mode — one scenario question at a time" width="49%">
</p>
<p align="center">
  <img src="assets/screenshot-study.png" alt="Study mode rendering a track's study guide" width="49%">
  <img src="assets/screenshot-flashcards.png" alt="Flashcard drilling mode" width="49%">
</p>

## A suggested study workflow

1. **Read** the study guide for your track end to end.
2. **Practice** by domain until you can explain *why* each answer is right — read the explanations,
   not just the letters.
3. **Drill flashcards** for the concepts that keep slipping.
4. **Take a timed exam.** Aim comfortably above 720. Review every miss and revisit that domain.

## Use it inside Claude Code

This repo doubles as a Claude Code workspace.

**Docs on tap.** [`.mcp.json`](.mcp.json) wires up the official Claude Code Docs MCP server, so Claude
can look things up while you study or contribute.

**Install the study plugins** from the built-in marketplace ([`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json)):

```text
/plugin marketplace add patrickking67/anthropic-university
/plugin install exam-coach@anthropic-university
/plugin install flashcard-drill@anthropic-university
```

Then, in a session:

```text
/exam-coach:quiz-me architect-foundations
/exam-coach:mock-exam developer-foundations
/exam-coach:explain-concept prompt caching
/flashcard-drill:flashcards associate-foundations
```

- **exam-coach** — an interactive tutor: adaptive quizzing, timed mock runs, deep-dive explanations,
  and answer grading.
- **flashcard-drill** — spaced-repetition flashcard drilling in the terminal.
- **cert-author** — maintainer tools for writing and validating new questions (mirrors the
  repo-local skills in [`.claude/skills/`](.claude/skills)).

## How it's built

`content/<track>/questions.json` and `flashcards.json` are the **single source of truth**. A tiny,
dependency-free Node script regenerates everything else:

```bash
node scripts/build.mjs          # validate + regenerate markdown exams, flashcards, and app data
node scripts/build.mjs --check  # validate only (used by CI) — fails on schema errors or duplicates
```

See [`CLAUDE.md`](CLAUDE.md) for the schema and repo map, and [`CONTRIBUTING.md`](CONTRIBUTING.md)
for the authoring quality bar.

## Deploy (GitHub Pages)

The [`Deploy GitHub Pages`](.github/workflows/pages.yml) workflow builds the app data and publishes
`docs/` on every push to `main`. It uses `actions/configure-pages` with `enablement: true`, so Pages
turns on automatically the first time it runs — no manual Settings toggle. (Publishing Pages from a
**private** repo requires GitHub Pro/Team/Enterprise, which this repo has.)

## Contributing

New questions, corrections, and better explanations are welcome — accuracy is the whole point. Read
[`CONTRIBUTING.md`](CONTRIBUTING.md), keep content original, and open a PR. CI validates every change.

## License

Code and tooling: [MIT](LICENSE). Study content is provided for personal exam preparation. This
project is unofficial and not affiliated with Anthropic; "Claude" and "Anthropic" are trademarks of
Anthropic, referenced here descriptively.
