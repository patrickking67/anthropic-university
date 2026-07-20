# Contributing to Anthropic University

Thanks for helping build a great, **accurate**, and **fair** study resource for the Claude
Certification program. This guide covers how content is structured, the quality bar for questions,
and how to build and validate your changes.

## Ground rules

1. **Original content only.** Do not submit real or remembered certification exam questions.
   Anthropic's Certification Exam Policy prohibits sharing actual Exam Content. Write *new* questions
   that teach publicly documented concepts.
2. **Unofficial.** This project is not affiliated with or endorsed by Anthropic. Don't imply that it
   is, and don't add official logos/branding.
3. **Accuracy over volume.** Every answer key must be defensible against the official Claude docs
   (platform.claude.com, code.claude.com). Cite a doc link in `reference` where practical.
4. **Be excellent to each other.** See `CODE_OF_CONDUCT.md`.

## Repo model

`content/<examId>/questions.json` and `flashcards.json` are the **canonical** source. All markdown
exams, flashcard files, and web-app data are **generated** by `scripts/build.mjs`. Never edit a
generated file — edit the JSON and rebuild.

## Setup & build

Requires Node 18+. No dependencies to install.

```bash
node scripts/build.mjs --check   # validate all banks (fails on any error)
node scripts/build.mjs           # validate + regenerate md + web-app data
```

Open `docs/index.html` in a browser to preview the app locally (works from `file://`).

## Adding or editing a question

Edit `content/<examId>/questions.json`. Each question:

```jsonc
{
  "id": "af-034",                    // unique within the exam, zero-padded
  "domain": "customer-support",      // must match a domains[].id in the same file
  "studyArea": "Escalation Decisions",
  "scenario": "Customer Support Resolution Agent",  // optional framing
  "difficulty": "medium",            // easy | medium | hard
  "stem": "Clear, self-contained question…",
  "options": { "A": "…", "B": "…", "C": "…", "D": "…" },
  "answer": "C",
  "explanationCorrect": "State the principle that makes C correct.",
  "explanationDistractor": "Explain why a tempting wrong answer misses.",
  "reference": "https://code.claude.com/docs/en/…"   // optional but encouraged
}
```

### Question quality checklist

- [ ] Exactly one **unambiguously best** answer; the other three are **plausible** (a candidate with
      partial knowledge might pick them), not obviously wrong.
- [ ] Options are **parallel** in grammar, length, and specificity — the correct answer isn't the
      longest or most detailed by tell.
- [ ] No "all/none of the above", no "A and C", no trick wording.
- [ ] The stem is self-contained and tests a **concept**, not memorization of trivia.
- [ ] `explanationCorrect` states the underlying principle (not just "C is correct").
- [ ] `explanationDistractor` explains why a specific tempting wrong choice fails.
- [ ] The answer key is verified against the official docs (add `reference` when you can).
- [ ] `domain` matches a declared domain; `studyArea` is a concise concept label.

Prefer scenario-based questions ("Production logs reveal…", "You're designing…") that mirror the
real exams' applied style. The maintainer skills in `.claude/skills/` (`author-questions`,
`review-questions`) encode this workflow for Claude Code.

## Adding a flashcard

Edit `content/<examId>/flashcards.json`:

```jsonc
{ "front": "What signals the agentic loop to stop?", "back": "stop_reason == \"end_turn\" (continue on \"tool_use\").", "domain": "prod-prompting" }
```

Keep fronts short and answerable; keep backs crisp and correct.

## Adding a new exam

Use the `add-exam` skill, or by hand: create `content/<newId>/questions.json` (+ `flashcards.json`,
`study-guide.md`), add `<newId>` to `EXAM_ORDER` in `scripts/build.mjs`, and rebuild. The web app and
catalog pick it up automatically.

## Pull requests

- Run `node scripts/build.mjs` and commit the regenerated files alongside your JSON edits.
- CI (`.github/workflows/validate.yml`) runs `--check` and fails on schema errors or duplicates.
- Keep PRs focused. Describe what tracks/domains you touched and how you verified the answer keys.
