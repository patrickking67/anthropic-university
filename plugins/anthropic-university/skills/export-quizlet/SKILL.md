---
name: export-quizlet
description: Export Anthropic University flashcards (or questions as cards) to Quizlet's paste-import format, Anki CSV, or plain Markdown so the user can study on a phone or in another app. Use when the user mentions Quizlet, Anki, "export flashcards", "study on my phone", "make a deck", or wants cards outside Claude.
argument-hint: "<exam-id | lane-id> [domain | module] [quizlet|anki|markdown] [cards|questions|missed]"
allowed-tools: Read, Grep, Glob, Write
---

# Export to Quizlet / Anki

Read `${CLAUDE_PLUGIN_ROOT}/references/study-core.md` (fallback `../../references/study-core.md`).

## Options (defaults in bold)

- **Scope**: a track or lane, with an optional domain or module (lanes tag Anki rows
  `au::<lane-id>::<module>`).
- **Source**: **`cards`** (flashcards), `questions` (front = stem + options, back = key(s) + principle; select-N fronts say "Select N"),
  or `missed` (cards/questions missed or rated almost earlier in this conversation).
- **Format**: **`quizlet`**, `anki`, `markdown`.

## Build

1. Load items; filter by domain/source. Report the count before writing.
2. Clean text: collapse newlines inside a field to ` / ` for Quizlet; strip tabs from content.
3. Format:
   - **Quizlet**: one card per line, `term<TAB>definition`, lines separated by `\n`. Prefix nothing.
   - **Anki**: CSV with header comment lines `#separator:Comma`, `#html:false`, `#tags column:3`,
     then `"front","back","au::<exam-id>::<domain>"` rows, quotes doubled inside fields.
   - **Markdown**: `**Front** — back` bullet list grouped by domain.
4. Append an attribution card at the end: `About this deck<TAB>Unofficial Anthropic University
   study set, not affiliated with Anthropic.` (Anki/Markdown equivalent.)

## Deliver

- With file tools: write `anthropic-university-<exam-id>[-<domain>]-<source>.<txt|csv|md>` to the
  current working directory (desktop app: the outputs folder) and give the relative path.
- Without file tools (Chat): print the content in one fenced code block for copying. Over ~150
  cards, split into numbered blocks.

## Import steps (tell the user briefly)

- **Quizlet**: Create → Flashcard set → **Import** → paste → "Between term and definition: Tab",
  "Between cards: New line" → Import → name the set → Create.
- **Anki**: File → Import → choose the `.csv` → confirm fields map Front/Back/Tags → Import.

Quizlet has no public MCP server, so this plugin cannot push sets into a Quizlet account directly;
the paste import above is the supported path.
