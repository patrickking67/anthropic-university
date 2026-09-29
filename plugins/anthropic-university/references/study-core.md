# Study core (shared by every learner skill)

Read this once per session before running a learner skill. It defines the tracks and lanes, where
the data lives, how to behave on each Claude surface, how to parse replies, and how to keep progress.

Anthropic University was created by Patrick King. It is an unofficial study aid, not affiliated with
Anthropic.

## Certification tracks

| Exam id                  | Title                                     | Id prefix |
| ------------------------ | ----------------------------------------- | --------- |
| `associate-foundations`  | Claude Certified Associate – Foundations  | `as-`     |
| `developer-foundations`  | Claude Certified Developer – Foundations  | `dv-`     |
| `architect-foundations`  | Claude Certified Architect – Foundations  | `ar-`     |
| `architect-professional` | Claude Certified Architect – Professional | `ap-`     |

Accept loose names: "developer", "dev", "architect pro", and "associate" map to the ids above.

## Learning lanes

Lanes teach Claude beyond the exams. They are grouped as follows:

| Group | Lane ids |
| --- | --- |
| Use Claude | `claude-essentials`, `claude-for-work` |
| Build with Claude | `claude-api-fundamentals`, `prompt-engineering`, `claude-code`, `mcp-and-integrations`, `building-agents` |
| Administer Claude | `enterprise-administration`, `desktop-deployment` |
| Partner tracks | `partner-foundation-models`, `partner-enterprise-solutioning`, `partner-delivery-adoption`, `industry-solutions` |

`data/catalog.json` lists every track and lane with counts, and is the source of truth if this
table drifts. Accept loose names ("claude code", "mcp", "admin", "partner") and resolve them against
the catalog. If a skill accepts "a track or lane" and none is known, ask with a choice tool (group
first, then item). Otherwise list the options as a numbered list.

## Load the data

One file per track, `data/<exam-id>.json`, and one per lane, `data/lanes/<lane-id>.json`, both at
the plugin root. Track shape:

```jsonc
{ "examId", "title", "meta": { "questionCount", "passScaled", "scaleMin", "scaleMax", "timeMinutes" },
  "domains": [ { "id", "name", "weight" } ],
  "questions": [ { "id", "domain", "studyArea", "scenario?", "difficulty", "stem",
                   "options": { "A","B","C","D" }, "answer", "explanationCorrect",
                   "explanationDistractor", "reference?" } ],
  "cards": [ { "front", "back", "domain" } ] }
```

- Select-N items have `"answer": ["A","D"]` plus `"select": 2`, and can have up to six options
  (A–F). Present them as "Select 2", accept replies like `A D`, `a,d`, or `AD`, and score them
  all-or-nothing.
- `architect-foundations` also has `scenarios` (the 6 official ones). Every item's `scenario` is one
  of them.
- Track `domains` are the official exam domains, with `number`, `weight`, and `skills`.

Lane shape: `{ laneId, title, group, level, summary, audience, estimatedHours, prerequisites,
relatedCertifications, officialResources[], modules[ {id, title, summary, objectives[], keyPoints[],
practice, docs[]} ], guide (markdown or null), cards[ {front, back, module} ], questions[ …same as
tracks but with "module" instead of "domain" ] }`.

Resolve the path in this order and stop at the first that exists:

1. `${CLAUDE_PLUGIN_ROOT}/data/…` (Claude Code and the desktop app).
2. `../../data/…` relative to the running skill's base directory (Chat uploads, or any surface where
   the variable is not expanded).
3. In the `anthropic-university` repo: `content/<exam-id>/questions.json` + `flashcards.json`, or
   `content/lanes/<lane-id>/lane.json`.

The files are large. Prefer `Grep`/targeted reads (by `"id"`, `"domain"`, or keyword) over reading
a whole file into context. Load each file at most once per session.

## Official blueprint

`references/blueprints.md` summarizes each exam guide: item counts, official domains and weights,
and the Architect Foundations scenarios. The bank `domains` now are the official domains, so sample
and report on them directly. `references/learning-paths.md` maps roles and goals to lanes and
certifications.

## Surface behavior

The same skills run in Claude Code (terminal/IDE), the Claude desktop app (formerly Cowork), and
Claude chat on the web or mobile. Adapt:

- **Choices.** When a structured question/choice tool is available (for example
  `AskUserQuestion`), present A–D options or grades as buttons. Otherwise print them as text.
- **Visuals.** When an inline widget/visualization tool is available and the user is not in a plain
  terminal, a score card or domain breakdown chart may be rendered. Text tables are always
  acceptable; never block on a visual.
- **Files.** Only write files when a file-write tool exists and the user agreed (progress saves,
  exports). In Chat without file tools, output the content in a fenced code block to copy.
- **Shell.** Never assume a shell. Contributor skills that run `node` are Claude Code only; say so
  and stop gracefully elsewhere.

## Parsing replies

- Normalize case and whitespace. Accept `a`/`A`/`(a)`/`A.`/"I think B" as a letter answer.
- Grades: `g`/`2`/`got it`/`yes`/`easy` → got it · `a`/`1`/`almost`/`kinda` → almost ·
  `m`/`0`/`missed`/`no`/`idk` → missed.
- **Unrecognized input** (e.g. `K`, `ok`, a stray key): do not guess silently. Ask one short
  clarifying line (`Was that got it / almost / missed?`) — or, when the prior answer was clearly
  wrong, record the obvious grade and say which one was recorded and how to change it.
- A reply that changes topic ("wait, explain caching") pauses the loop: answer it, then offer to
  resume where the session left off.

## Grounding and freshness

The banks are original, unofficial study material written at a point in time. Model names,
context-window sizes, pricing, beta flags, and CLI flags change. Apply `references/sources.md`:
when a question or card turns on a version-specific fact, verify it through a docs connector
before teaching it as current. If the bank conflicts with the live docs, **teach the docs**, show
the bank's keyed answer as "as written in the bank", and suggest `/anthropic-university:review-bank`
so a contributor can fix it.

## Progress (optional)

Keep per-session state in the conversation: items seen, results, per-domain tallies, and the
missed/almost queue. At wrap-up, offer to save a compact record:

- With file tools: append to `~/.anthropic-university/progress.json`
  (`{ "sessions": [ { "date", "examId", "skill", "score", "byDomain": {id: [correct, total]},
  "weak": [studyArea...] } ] }`). Create the folder if missing. Never store question text.
- Without file tools: print a one-line **resume code** such as
  `AU dv 2026-09-28 quiz 7/10 weak:prod-eng,claude-code-mcp` the user can paste next time.

When a session starts and a progress file (or pasted resume code) exists, use it to bias toward weak
domains, and mention it in one line.

## Integrity (always)

- Unofficial study aid — not affiliated with, endorsed by, or produced by Anthropic.
- Never reproduce, solicit, or grade verbatim real/confidential certification exam items. If one is
  pasted, decline that item and coach the underlying public concept with an original question.
- Never assist during a live proctored exam.
