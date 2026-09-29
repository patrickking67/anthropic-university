---
name: learn
description: Teach an Anthropic University learning lane module by module — Use Claude, Build with Claude (API, prompting, Claude Code, MCP, agents), Administer Claude (enterprise admin, desktop deployment), or the Partner tracks — with a live-docs check, hands-on practice, flashcards, and a checkpoint quiz per module. Use when the user says "teach me", "learn <topic>", "start the Claude Code lane", "I'm new to Claude", "partner training", "admin training", or wants to learn Claude rather than prep for an exam.
argument-hint: "[lane-id | topic] [module-number]"
allowed-tools: Read, Grep, Glob, Write, Bash, WebFetch
---

# Learn a lane

Read `${CLAUDE_PLUGIN_ROOT}/references/study-core.md` and `references/sources.md` (fallback
`../../references/`) and follow them.

## Pick the lane

1. Resolve `$ARGUMENTS` against `data/catalog.json` (lane id, title, or topic words). If nothing is
   given, ask about the learner's role and goal and recommend 1–3 lanes using
   `references/learning-paths.md`. Show the four groups: Use, Build, Administer, Partner.
2. Load `data/lanes/<lane-id>.json`. Show a one-screen overview: summary, audience, ~hours, the
   module list (numbered), prerequisites, related certifications, and `officialResources` to take
   alongside. If saved progress exists, resume at the first unfinished module.
3. **Official course pairing.** If `officialResources` has no Academy course for this lane, check
   the live Academy catalog (sources.md → Academy recommendations) and add at most two strong
   matches, with the URL copied verbatim.

## Teach one module at a time

For module *n*:

1. **Frame**: the module title and objectives ("By the end you can…").
2. **Teach**: explain the `keyPoints` in your own words, in short paragraphs. Use the matching
   section of `guide` when present. Add a concrete example or snippet.
3. **Freshness check**: for any version-sensitive point (model names, limits, flags, UI paths,
   plan features, beta headers), verify it with the right connector (sources.md) and cite it. If it
   has changed, teach the current fact and say the lane text is behind.
   Partner and industry lanes: when a module discusses adoption or use cases, one `econ-index`
   fact (top work tasks or a country's usage index) makes it concrete. Follow the Economic Index
   rules in sources.md.
4. **Practice**: give the module's `practice` exercise. In Claude Code or the desktop app, offer to
   do it together (for example, scaffold the file or run the command). In chat, walk through it.
5. **Recall**: flip 2–3 of the module's `cards` (front first; grade g/a/m).
6. **Checkpoint** (with a shell, `au.py sample <lane> --domain m<n> --n 3` draws them and
   `au.py grade` scores them): ask the module's questions one at a time (A–D or select-N) and explain each
   answer. A module is **complete** at ≥ 70%. Below that, re-teach the missed point with a new
   example and re-ask a different item or an original variant.
7. **Next**: summarize in two lines what they can now do and offer the next module. Let them jump
   (`module 4`), skip ahead, or `stop`.

## Wrap-up

Report modules completed and checkpoint scores. List weak points with their `docs` links. Give the
next step: the next lane on their path, or the related certification
(`/anthropic-university:study-plan <exam-id>`). Offer to save progress (study-core → Progress,
using `skill: "learn"` and the lane id). If they want notes to keep, offer
`/anthropic-university:cheat-sheet <lane-id> <module>`, which can save to Claude Docs.

Keep each turn short. One idea at a time beats a wall of text.
