# Current facts snapshot

Verified against the live docs on **2026-09-28**. Re-verify before relying on anything here. When
the docs and this file disagree, the docs win; fix this file in the same PR.

## Models (source: platform.claude.com/docs/en/about-claude/models/overview)

| Model | API id | Context | Max output | Price in / out per MTok | Thinking | Default effort |
| --- | --- | --- | --- | --- | --- | --- |
| Claude Fable 5.1 | `claude-fable-5-1` | 1M | 128K | $10 / $50 | Adaptive (always on) | `high` |
| Claude Opus 5.5 | `claude-opus-5-5` | 1M | 128K | $4 / $20 | Adaptive (always on) | `medium` |
| Claude Sonnet 5.5 | `claude-sonnet-5-5` | 1M | 128K | $2 / $10 | Adaptive | `high` |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` (alias `claude-haiku-4-5`) | 200K | 64K | $1 / $5 | Extended (budget_tokens) | not supported |

- **Default recommendation:** start with Claude Opus 5.5 for most workloads. Use Fable 5.1 for
  demanding reasoning and long-horizon agentic work. Use Sonnet 5.5 for the best speed and
  intelligence balance. Use Haiku 4.5 for fastest, cheapest, high-volume, bounded tasks.
- **Legacy (still available):** Fable 5, Opus 5, Opus 4.8/4.7/4.6/4.5, Sonnet 5, Sonnet 4.6/4.5.
  Do not teach these as current.
- **Batch API:** 50% off. Up to 300K output with the `output-300k-2026-03-24` beta on current
  Opus/Sonnet models.
- **Prompt caching:** reads cost 10% of base input (2.5% on Fable 5.1, 5% on Opus 5.5). Prefix
  match; render order is tools → system → messages.
- **Thinking:** adaptive thinking (`thinking: {type: "adaptive"}`) plus `output_config.effort`
  (`low`/`medium`/`high`/`xhigh`/`max`). `budget_tokens` extended thinking is deprecated on 4.6
  and rejected on later models. Haiku 4.5 still uses `budget_tokens`.
- **Sampling params** (`temperature`/`top_p`/`top_k`) are removed on the newest models (a 400).
  Steer through prompting and effort.
- **Assistant prefill** returns a 400 on the 4.6+ family. Use structured outputs
  (`output_config.format`) or instructions instead.
- **Forced tool use** (`tool_choice` `any` / `tool`) returns a 400 on Opus 5.5, Sonnet 5.5 and
  Fable 5.1, and errors with manual extended thinking. It still works on Opus 5 and older. On
  current models use `auto` + `strict: true`, or structured outputs for a fixed JSON shape.
  (source: platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)
- **Thinking** cannot be disabled on Opus 5.5 (`thinking: disabled` → 400).
- **Token counting:** `POST /v1/messages/count_tokens`. The tokenizer introduced with Opus 4.7 is
  used by current models. 1M tokens ≈ 555K words.
- **Models API** (`GET /v1/models`) returns `max_input_tokens`, `max_tokens`, and `capabilities`.
- Every model id is a pinned snapshot, including dateless ids since the 4.6 generation.

## Surfaces

- **Claude desktop app**: Chat, Cowork (now part of "Claude"), and Code tabs. Cowork is rolling
  into Claude for Pro and Max.
- Cloud platforms: Claude API, Claude Platform on AWS, Amazon Bedrock, Google Cloud Vertex AI,
  Microsoft Foundry.

## Certification program (source: public exam guides v1.0, effective July 2026)

| Exam | Code | Items | Fee |
| --- | --- | --- | --- |
| Associate – Foundations | CCAO-F | 60 | $99 |
| Developer – Foundations | CCDV-F | 53 | $125 |
| Architect – Foundations | CCAR-F | 60 (4 of 6 scenarios) | $125 |
| Architect – Professional | CCAR-P | 63 | $175 |

All four exams: multiple-choice plus multiple-response items, 120 minutes, scaled 100–1,000 with
720 to pass, 12-month validity. Delivered by Pearson VUE (online proctored or test center).
