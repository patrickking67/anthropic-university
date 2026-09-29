---
name: cheat-sheet
description: Build a one-page, docs-verified review sheet for a Claude Certification domain or an Anthropic University lane module — the key rules, defaults and limits, look-alike comparisons, common traps from the bank's distractors, and links — and save it as a Claude Doc, a Markdown file, or a copyable block. Use when the user says "cheat sheet", "summary sheet", "one-pager", "review notes", "night-before summary", or "save my notes for <domain>". Not for teaching a topic step by step (use learn or explain-concept).
argument-hint: "<exam-id | lane-id> [domain | module] [doc | file | chat]"
allowed-tools: Read, Grep, Glob, Write, Bash
---

# Cheat sheet

Read `${CLAUDE_PLUGIN_ROOT}/references/study-core.md` and `references/sources.md` (fallback
`../../references/`) and follow them.

## Scope

Resolve the track or lane and an optional domain or module from `$ARGUMENTS`. With no domain, cover
the whole track at one line per study area, and say that a per-domain sheet is more useful. If the
learner has saved progress, put their weak domains first.

## Gather

1. **What the bank tests.** With a shell, `au.py info <id>` gives the domains or modules, and
   `au.py sample <id> --domain <d> --n 40 --with-answers` returns the items with keys and
   explanations. Without a shell, use targeted Grep over the data files. Collect the principles
   the keyed answers encode and the traps the distractors keep using.
2. **Lane material.** For a lane module, use its `objectives`, `keyPoints`, and `docs`.
3. **Verify.** Check every version-sensitive fact (models, limits, prices, flags, headers, UI paths)
   against the right connector. Mark anything you could not verify.

## Write (one page, original wording)

- **Title**: `<Domain or module> — cheat sheet`, the date, and "Unofficial · Anthropic University".
- **Must know** (6–10 bullets): each rule in one line, with its default or limit.
- **Look-alikes**: a 2–4 row table of what the exam confuses with what, and the deciding signal.
- **Traps**: 3–5 lines of "If you see X, it is usually not Y, because…", distilled from the
  distractors.
- **Worked example**: one minimal snippet or three-step flow.
- **Sources**: the doc links used.

Do not copy question stems or options into the sheet. It teaches principles, not answers.

## Deliver

Ask where to put it only if the argument did not say:

- **Claude Doc** (`doc`): when the `claude-docs` connector is connected, create the doc with the
  sections above and share the link. If it is not connected, say that sign-in is needed (`/mcp` in
  Claude Code, or connector settings in the app) and use a file instead.
- **File** (`file`): write `anthropic-university-<id>[-<domain>]-cheatsheet.md` to the working
  directory (or the desktop app's outputs folder).
- **Chat** (`chat`, or no file tools): print it in one Markdown block.

End with one next step: `/anthropic-university:quiz-me <id> <domain>` to test the sheet.
