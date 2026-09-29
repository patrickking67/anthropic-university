# Anthropic University content schema (v2)

Canonical content lives in `content/`. `node scripts/build.mjs` validates it and generates every
other output. `--check` runs validation only, and CI runs it.

There are two content types:

- **Certification tracks** — `content/<examId>/questions.json`, `flashcards.json`, `study-guide.md`
- **Learning lanes** — `content/lanes/<laneId>/lane.json` (+ optional `guide.md`)

Every item is **original**. Never copy text, questions, or sample items from official exam guides,
official practice exams, Anthropic Academy courses, or partner training. Those sources are topic
references only. Verify every fact against live official docs (`platform.claude.com/docs`,
`code.claude.com/docs`, `support.claude.com`, `learn.microsoft.com`) and cite a `reference` URL.
See `content/FACTS.md` for the verified current-facts snapshot.

---

## Question object (shared by tracks and lanes)

```jsonc
{
  "id": "dv-101",                     // unique within its file; track prefix or lane prefix
  "domain": "applications-integration", // tracks: a domains[].id · lanes: use "module" instead
  "module": "m3",                     // lanes only: a modules[].id
  "studyArea": "Claude API Mechanics",
  "scenario": "Customer Support Resolution Agent", // optional; architect-foundations: must be a scenarios[].name
  "difficulty": "easy | medium | hard",
  "stem": "…",
  "options": { "A": "…", "B": "…", "C": "…", "D": "…" },
  "answer": "B",                      // single-answer: one key, options exactly A–D
  "explanationCorrect": "The principle that makes the key right.",
  "explanationDistractor": "Why the most tempting wrong option fails.",
  "reference": "https://platform.claude.com/docs/en/…"
}
```

### Multiple-response (select-N) items

The real exams include items that tell the candidate how many responses to select.

```jsonc
{
  "options": { "A": "…", "B": "…", "C": "…", "D": "…", "E": "…" }, // 4–6 options, contiguous from A
  "answer": ["A", "D"],               // array of 2–3 distinct option keys, in letter order
  "select": 2,                        // must equal answer.length
  "stem": "… Which TWO …? (Select 2.)"
}
```

Rules: scoring is all-or-nothing, and the stem must say how many to select. Each correct option
must be independently true. Distractors must be plausible but clearly false. Aim for **at least 6
select-N items per track**.

### Quality bar (the build warns on some of these)

- One unambiguous key (or key set). Three or more plausible distractors.
- Options are parallel in grammar, length, and specificity. The key must not be the longest by a
  wide margin; the build warns when it is.
- No "all/none of the above", no combo options, no negation traps, no trivia.
- Prefer scenario and root-cause stems. Use current model names and limits per `FACTS.md`.

---

## Certification track (`content/<examId>/questions.json`)

```jsonc
{
  "examId": "developer-foundations",
  "title": "Claude Certified Developer – Foundations",
  "shortTitle": "Developer – Foundations",
  "track": "Developer", "level": "Foundations", "unofficial": true,
  "meta": {
    "questionCount": 120,             // bank size (must equal questions.length)
    "passScaled": 720, "scaleMin": 100, "scaleMax": 1000, "timeMinutes": 120
  },
  "official": {                       // facts from the public exam guide (no guide text)
    "examCode": "CCDV-F", "guideVersion": "1.0", "effective": "2026-07",
    "items": 53, "fee": "$125 USD", "formats": ["multiple-choice", "multiple-response"],
    "delivery": "Pearson VUE (online proctored or test center)", "validityMonths": 12
  },
  "domains": [                        // OFFICIAL domains, in guide order
    { "id": "agents-workflows", "number": 1, "name": "Agents and Workflows", "weight": 0.147,
      "skills": ["Agent Architecture", "Agent Construction with Claude", "Agent Patterns and Frameworks"] }
  ],
  "scenarios": [                      // architect-foundations only: the 6 official scenarios
    { "id": "s1", "name": "Customer Support Resolution Agent", "domains": ["agentic-architecture", "tool-design-mcp", "context-reliability"] }
  ],
  "questions": [ /* question objects */ ]
}
```

- Domain weights sum to 1.0 (±0.01).
- Bank coverage should track the official weights: each domain's share of questions within
  ±4 percentage points of its weight. The build warns outside that band.
- `studyArea` should name one of the domain's `skills` where skills are defined.

`flashcards.json`: `{ "examId", "cards": [ { "front", "back", "domain" } ] }`, where `domain` is an
official domain id.

---

## Learning lane (`content/lanes/<laneId>/lane.json`)

```jsonc
{
  "laneId": "claude-api-fundamentals",
  "title": "Claude API Fundamentals",
  "group": "build",                   // use | build | administer | partner
  "level": "beginner | intermediate | advanced",
  "summary": "One-sentence promise of the lane.",
  "audience": "Who it is for.",
  "estimatedHours": 4,
  "prefix": "api",                    // id prefix for this lane's questions
  "prerequisites": ["claude-essentials"],   // optional laneIds
  "relatedCertifications": ["developer-foundations"],
  "officialResources": [              // official courses/docs to take alongside (links only)
    { "title": "Building with the Claude API", "url": "https://academy.claude.com/…", "provider": "Anthropic Academy" }
  ],
  "modules": [
    {
      "id": "m1",
      "title": "Your first Messages API call",
      "summary": "…",
      "objectives": ["Send a request with the official SDK", "…"],   // 3–5, verb-first
      "keyPoints": ["…", "…"],        // 4–8 original, docs-verified teaching points
      "practice": "A hands-on exercise the learner can do in 10–20 minutes.",
      "docs": [ { "title": "Messages API", "url": "https://platform.claude.com/docs/en/…" } ]
    }
  ],
  "cards": [ { "front": "…", "back": "…", "module": "m1" } ],       // ≥ 2 per module
  "questions": [ /* question objects with "module" instead of "domain" */ ] // ≥ 2 per module
}
```

- Target size: 5–10 modules, 16–32 cards, 12–26 questions, with 2–3 of them select-N.
- `guide.md` is optional and holds narrative lesson text in original prose. The web app and plugin
  render it.
- Partner lanes teach client-facing solutioning. Keep them original and public-safe: never
  reproduce partner-portal material. Link to it through `officialResources` instead.
