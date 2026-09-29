---
name: add-lane
description: Scaffold or extend an Anthropic University learning lane (Use, Build, Administer, or Partner group) in content/lanes/<lane-id>/ with modules, cards, and checkpoint questions that flow into the web app and the plugin. Use when adding a new lane or new modules to an existing one.
argument-hint: "<lane-id> [group] [\"Title\"]"
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(node scripts/build.mjs*)
---

# Add or extend a learning lane

> **Schema v2:** read `content/SCHEMA.md` → "Learning lane" and `content/FACTS.md` first.

1. Create `content/lanes/<lane-id>/lane.json` with `laneId` (matching the folder), `title`,
   `group` (`use|build|administer|partner`), `level`, `summary`, `audience`, `estimatedHours`, a
   unique `prefix`, `prerequisites`, `relatedCertifications`, and `officialResources` (links only).
2. Write 5–10 modules. Each needs 3–5 verb-first `objectives`, 4–8 original `keyPoints` verified
   against live docs, a hands-on `practice` task, and `docs` links.
3. Add at least 2 cards and 2 questions per module (1–3 select-N items per lane). Questions follow
   the shared question schema with `module` in place of `domain`.
4. Optional: `guide.md`, holding original narrative lessons with one `##` section per module.
5. Partner lanes must be public-safe: never reproduce partner-portal training; link to it instead.
6. Run `node scripts/build.mjs` and fix every error. The lane then appears in the web app
   (`#/lanes`) and in the plugin (`/anthropic-university:learn <lane-id>`). Add the lane to
   `plugins/anthropic-university/references/study-core.md` and `learning-paths.md`.
