# Claude API Fundamentals

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Go from an API key to a production-ready Claude integration: requests, models, streaming, thinking, files, structured outputs, caching, batches, errors, and cost.**

Group: build · Level: intermediate · ~8 h · For: Developers who can write Python and want to build reliable applications on the Claude API.

## Take alongside

- [Building with the Claude API](https://academy.claude.com/courses/building-with-the-claude-api) — Anthropic Academy
- [Claude Platform 101](https://academy.claude.com/courses/claude-platform-101) — Anthropic Academy
- [Claude Developer Platform docs](https://platform.claude.com/docs) — Anthropic

## Access: the Console, API keys, and workspaces

Get credentials, understand how workspaces scope keys and resources, and set limits before any code runs.

**You will be able to:**

- Create an API key in the Claude Console and load it from the environment
- Explain how a workspace scopes API keys, files, batches, and limits
- Separate environments or tenants with workspaces instead of shared keys
- Set workspace spend and rate limits below the organization's limits

**Key points**

- The SDK client reads `ANTHROPIC_API_KEY` from the environment; never hard-code a key in source.
- Raw HTTP calls send the key in the `x-api-key` header plus `anthropic-version: 2023-06-01`.
- Every organization has a Default Workspace that cannot be renamed, archived, or given its own limits.
- Every request runs in exactly one workspace; Files, Message Batches, and Skills are scoped to it.
- Workspace spend and rate limits can be set lower than, never higher than, the organization's limits.
- Uploaded files are visible to any key with access to the workspace, so use one workspace per tenant for hard isolation.
- Responses carry `request-id` and `anthropic-workspace-id` headers; keep the request ID for support tickets.

**Practice:** In the Console, create a Development workspace with a low monthly spend limit, mint a key inside it, export it as ANTHROPIC_API_KEY, and send one request. Read the anthropic-workspace-id response header with client.messages.with_raw_response to confirm which workspace the call counted against.

**Read:** [Workspaces](https://platform.claude.com/docs/en/manage-claude/workspaces) · [API errors and request IDs](https://platform.claude.com/docs/en/api/errors)

<details><summary>Flashcards</summary>

**Q:** Where does the Python SDK look for your API key by default?  
**A:** The `ANTHROPIC_API_KEY` environment variable. Keep keys out of source code.

**Q:** Which resources are scoped to a workspace?  
**A:** Files, Message Batches, and Skills, plus the workspace's spend and rate limits. Every request runs in exactly one workspace.

**Q:** Can you set custom limits on the Default Workspace?  
**A:** No. Create another workspace to cap spend or rate for a project or environment.

</details>

### Check your understanding

*Study area: Workspaces and keys · medium*

A startup runs staging and production traffic from one organization. It wants a separate monthly spend cap for staging, and a leaked staging key must not be able to read production's uploaded files. What should it set up?

- **A.** Two API keys in the Default Workspace, each with its own spend limit applied
- **B.** A separate workspace per environment, each with its own keys and spend limit
- **C.** One organization key plus a request header that names the target environment
- **D.** One shared key that is rotated weekly, with staging calls tagged in metadata

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Workspaces scope API keys, files, batches, and limits. A staging-workspace key can only reach staging resources, and the workspace can carry its own spend limit.

_Why a tempting wrong answer misses:_ The Default Workspace cannot carry custom limits, and two keys in the same workspace can both read every file uploaded there.

Reference: https://platform.claude.com/docs/en/manage-claude/workspaces

</details>

---

*Study area: Workspaces and keys · medium*

A multi-tenant app uploads each customer's contracts with the Files API and stores the returned file_id per customer. Who can read a given file through the API?

- **A.** Only the specific API key that performed the original upload request
- **B.** Only requests that also send the end user's session token as a header
- **C.** Any API key with access to the workspace the file was uploaded into
- **D.** Any API key anywhere in the organization, across all of its workspaces

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Files are workspace-scoped, not user- or key-scoped. Any key with access to that workspace can use the file, so never accept file IDs from end users, and use a workspace per tenant for hard isolation.

_Why a tempting wrong answer misses:_ Files are not bound to the uploading key, and a key scoped to another workspace cannot reach them.

Reference: https://platform.claude.com/docs/en/build-with-claude/files

</details>

---

## The Messages API and the official SDKs

Shape a Messages request, read the response by content-block type, and carry a conversation forward.

**You will be able to:**

- Send a Messages request with model, max_tokens, system, and messages
- Read text from a response by content-block type rather than by position
- Continue a multi-turn conversation by appending the full assistant content
- Inspect usage and stop_reason on every response

**Key points**

- Everything goes through `POST /v1/messages`; tools, structured outputs, and thinking are features of that one endpoint.
- The API is stateless: resend the full conversation history on every request.
- `system` is a top-level parameter, not a message; `messages` alternate user and assistant turns.
- On Claude Opus 5.5 a response can begin with `thinking` blocks, so `content[0].text` is unsafe; filter blocks where `type == "text"`.
- Append the assistant's `response.content` unchanged when continuing, especially thinking blocks in tool loops.
- `usage` reports `input_tokens`, `output_tokens`, and cache fields; `stop_reason` says why generation ended.
- The Python SDK retries 408/409/429/5xx and connection errors twice by default.

**Practice:** Write a 30-line Python script that holds a three-turn conversation with claude-opus-5-5, appending each response.content to the history, and prints only the text blocks plus usage.output_tokens after each turn.

**Read:** [Working with the Messages API](https://platform.claude.com/docs/en/build-with-claude/working-with-messages) · [Migrating to Claude Opus 5.5](https://platform.claude.com/docs/en/models/opus-5-5/migration-guide)

<details><summary>Flashcards</summary>

**Q:** Why is `response.content[0].text` unsafe on Claude Opus 5.5?  
**A:** Responses can start with `thinking` blocks. Select blocks whose `type` is `"text"` instead.

**Q:** Does the Messages API remember earlier turns?  
**A:** No. It is stateless: send the full history, appending each assistant `response.content` unchanged.

**Q:** Where does the system prompt go in a Messages request?  
**A:** The top-level `system` parameter, not a message in the `messages` array.

</details>

### Check your understanding

*Study area: Messages API basics · medium*

After switching a support bot from an older model to claude-opus-5-5, the line reply = response.content[0].text starts failing on some requests even though stop_reason is end_turn. What is the most likely cause?

- **A.** Opus 5.5 returns plain strings instead of content blocks when replies are short
- **B.** The SDK moved the text of each reply into a separate response.output field
- **C.** The conversation exceeded the context window, so the content array came back empty
- **D.** The response can begin with a thinking block, so index 0 is not always the text

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Thinking is always on for Opus 5.5, so a response can start with one or more thinking blocks. Read text by filtering blocks whose type is "text".

_Why a tempting wrong answer misses:_ The content array is still a list of typed blocks. An oversized request fails with an error or a context stop reason, not an end_turn with an empty array.

Reference: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

</details>

---

*Study area: Messages API basics · easy*

You are calling POST /v1/messages with curl and a standard Claude API key. Which TWO headers are required besides content-type? (Select 2.)

- **A.** x-api-key, carrying the API key value
- **B.** anthropic-version, set to 2023-06-01
- **C.** Authorization: Bearer, carrying the API key
- **D.** anthropic-model, naming the target model
- **E.** x-request-id, a client-generated UUID

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

API keys go in x-api-key, and every request sends anthropic-version: 2023-06-01. The model is named in the JSON body.

_Why a tempting wrong answer misses:_ Authorization: Bearer is for OAuth access tokens, not API keys. request-id is a response header the API returns, not one you send.

Reference: https://platform.claude.com/docs/en/api/errors

</details>

---

## Choosing a model: lineup, IDs, and the Models API

Match the current lineup to the workload, understand pinned IDs, and discover limits at runtime.

**You will be able to:**

- Choose between Fable 5.1, Opus 5.5, Sonnet 5.5, and Haiku 4.5 for a workload
- Explain why current model IDs are pinned snapshots
- Query the Models API for context window, output cap, and capabilities
- Plan evals before switching models

**Key points**

- Start with Claude Opus 5.5 (`claude-opus-5-5`) for most workloads; it has a 1M context window and 128K max output.
- Claude Fable 5.1 (`claude-fable-5-1`) is for the most demanding reasoning and long-horizon agentic work, at $10 / $50 per MTok.
- Claude Sonnet 5.5 (`claude-sonnet-5-5`) balances speed and intelligence; Claude Haiku 4.5 is fastest and cheapest, with 200K context and 64K output.
- Every model ID is a pinned snapshot, including dateless IDs such as `claude-opus-5-5`; aliases only matter for models before the 4.6 generation.
- `GET /v1/models` returns `max_input_tokens`, `max_tokens`, and a `capabilities` object; there is no `context_window` field.
- Opus, Sonnet 5.5, and Fable 5.1 have separate rate-limit buckets, so switching models also changes which limits apply.

**Practice:** Call client.models.retrieve for each current model and print max_input_tokens and max_tokens. Then run the same five prompts from your app through Opus 5.5 and Haiku 4.5 and compare quality, latency, and usage.

**Read:** [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) · [Choosing a model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model)

<details><summary>Flashcards</summary>

**Q:** Default model recommendation for most workloads?  
**A:** Claude Opus 5.5 (`claude-opus-5-5`): 1M context, 128K output, $4 / $20 per MTok.

**Q:** Is `claude-opus-5-5` an alias that can change under you?  
**A:** No. Every current model ID is a pinned snapshot, including dateless IDs.

**Q:** Which Models API fields give the context window and output cap?  
**A:** `max_input_tokens` and `max_tokens`, plus a `capabilities` object.

</details>

### Check your understanding

*Study area: Model selection · easy*

A pipeline routes millions of short support tickets into one of eight fixed categories. The task is bounded, and cost and latency matter most. Which model is the best starting point to evaluate?

- **A.** Claude Haiku 4.5, the fastest and lowest-cost model in the lineup
- **B.** Claude Fable 5.1, the lineup's model for long-horizon agentic work
- **C.** Claude Opus 5.5 at max effort, to guarantee the best possible labels
- **D.** Claude Sonnet 5.5 with a forced tool_choice for the category label

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Haiku 4.5 is the fastest and cheapest current model and fits high-volume, bounded tasks. Confirm quality with an eval before committing.

_Why a tempting wrong answer misses:_ Fable 5.1 costs $10 / $50 per MTok and is aimed at demanding reasoning, which this bounded task does not need. Sonnet 5.5 also rejects forced tool_choice.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

*Study area: Model selection · medium*

A compliance team requires that production behavior never changes without a code change. The app sends model="claude-opus-5-5". What should the team do?

- **A.** Append a release date suffix to the ID, because dateless IDs are floating aliases
- **B.** Keep the ID as is, because every current model ID is already a pinned snapshot
- **C.** Call the Models API at startup and always select the newest Opus model it lists
- **D.** Switch to the Bedrock form of the ID, since only Bedrock pins model snapshots

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Every Claude model ID is a pinned snapshot, including the dateless IDs used from the 4.6 generation on. Changing behavior requires changing the ID in code.

_Why a tempting wrong answer misses:_ No date-suffixed form of claude-opus-5-5 exists, and selecting the newest model at runtime is the opposite of pinning.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

*Study area: Models API · medium*

A routing service must decide at runtime whether a prompt fits a model's context window and how high it can set max_tokens, without hard-coding numbers. Which approach fits?

- **A.** Read the context_window field that each count_tokens response includes
- **B.** Send a probe request with max_tokens set to 1,000,000 and parse the error
- **C.** Read max_input_tokens and max_tokens from the Models API for that model
- **D.** Keep a local table and refresh it whenever a request fails with a 413 error

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

GET /v1/models (and retrieve for a single ID) returns max_input_tokens, max_tokens, and a capabilities object for each model.

_Why a tempting wrong answer misses:_ count_tokens returns only input_tokens, and there is no context_window field anywhere. A 413 signals request bytes, not token limits.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

## Streaming, tokens, and context limits

Stream long responses safely, count tokens before sending, and size max_tokens against the context window.

**You will be able to:**

- Stream a response with client.messages.stream and collect it with get_final_message
- Count input tokens with the count_tokens endpoint
- Size max_tokens so thinking plus reply fit
- Recount prompts when moving to a model with a different tokenizer

**Key points**

- Stream when `max_tokens` is large; the SDKs guard non-streaming calls expected to exceed about 10 minutes.
- `stream.get_final_message()` returns the same `Message` a non-streaming call would, so you need not handle each event.
- SSE order: `message_start`, then per-block `content_block_start` / `content_block_delta` / `content_block_stop`, then `message_delta` and `message_stop`.
- Usage in `message_delta` is cumulative; errors can still arrive mid-stream after an HTTP 200.
- `client.messages.count_tokens(...)` returns `input_tokens`; it is free, rate-limited separately, and an estimate.
- Current models use the tokenizer introduced with Opus 4.7, which yields roughly 30% more tokens than earlier models for the same text.
- `max_tokens` is a hard cap on thinking plus response text, so leave room for thinking on Opus 5.5.

**Practice:** Stream a 2,000-word essay request from claude-opus-5-5, printing text as it arrives, then print final.usage from get_final_message(). Before sending, call count_tokens on the same request and compare the estimate with usage.input_tokens.

**Read:** [Streaming messages](https://platform.claude.com/docs/en/build-with-claude/streaming) · [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) · [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)

<details><summary>Flashcards</summary>

**Q:** How do you stream but still get one complete Message object?  
**A:** `with client.messages.stream(...) as stream:` then `stream.get_final_message()`.

**Q:** What does count_tokens cost?  
**A:** Nothing. It is free, has its own RPM limit, and returns an estimate in `input_tokens`.

**Q:** What does `max_tokens` cap on a thinking model?  
**A:** Total output: thinking tokens plus response text.

</details>

### Check your understanding

*Study area: Streaming · medium*

A report generator sets max_tokens=128000 on claude-opus-5-5 with a plain messages.create call, and the SDK raises an error before sending. The team wants the whole message at once, not a token-by-token UI. What is the best fix?

- **A.** Lower max_tokens to 4,096 and ask the model to be much more concise
- **B.** Raise the client timeout to 60 minutes and resend the same request
- **C.** Split the report into sections and send each one to the Batches API
- **D.** Use client.messages.stream and collect the result with get_final_message

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The SDKs refuse non-streaming requests expected to run past about 10 minutes. Streaming with get_final_message avoids the timeout and still returns one complete Message.

_Why a tempting wrong answer misses:_ Cutting max_tokens to 4,096 risks truncating a long report, and thinking also counts toward that cap on Opus 5.5.

Reference: https://platform.claude.com/docs/en/api/errors

</details>

---

*Study area: Token counting · easy*

Which statement about the count_tokens endpoint is accurate?

- **A.** It is free to call, has its own rate limit, and returns an estimate
- **B.** It is billed at the model's input price for every token it counts
- **C.** It returns exact counts that always equal the billed input tokens
- **D.** It reads the prompt cache, so cached prefixes are reported as zero

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Token counting is free, rate-limited separately from message creation, and returns an estimate that can differ slightly from actual usage.

_Why a tempting wrong answer misses:_ Counts are estimates, not exact, and the endpoint does not use caching logic.

Reference: https://platform.claude.com/docs/en/build-with-claude/token-counting

</details>

---

*Study area: Token counting · hard*

A team moving from Claude Sonnet 4.6 to Claude Opus 5.5 reuses its old token counts to budget context and cost, and requests start running over the planned budget. What explains this?

- **A.** Opus 5.5 bills thinking tokens as input, which inflates every request
- **B.** Opus 5.5 uses a newer tokenizer that produces roughly 30% more tokens
- **C.** Opus 5.5 has a smaller context window, so each request is truncated
- **D.** Opus 5.5 adds billed system tokens to every request that has tools

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Claude 4.7 and later models use a newer tokenizer that produces about 30 percent more tokens for the same text. Recount prompts with count_tokens against the target model.

_Why a tempting wrong answer misses:_ Thinking is billed as output, not input, and Opus 5.5 has a 1M-token window. System-added tokens are not billed.

Reference: https://platform.claude.com/docs/en/build-with-claude/token-counting

</details>

---

## Stop reasons, adaptive thinking, and effort

Branch correctly on every stop_reason and control reasoning depth with effort instead of thinking budgets.

**You will be able to:**

- Handle end_turn, max_tokens, tool_use, pause_turn, and refusal
- Explain adaptive thinking and why budget_tokens is rejected on current models
- Choose an effort level and measure it against evals
- Control whether thinking summaries are returned with display

**Key points**

- `end_turn` is a natural finish; `max_tokens` means truncation, so raise the cap or continue.
- `tool_use` means run the tool and reply with `tool_result` blocks; `pause_turn` means send the assistant content back unchanged so a server-tool loop can continue.
- `refusal` arrives as HTTP 200 with a `stop_details` object naming the category, so check `stop_reason` before reading content.
- Opus 5.5 thinking is always on: `thinking: {"type": "disabled"}` and `budget_tokens` both return 400.
- `output_config.effort` takes `low`, `medium`, `high`, `xhigh`, or `max`; Opus 5.5 defaults to `medium`, most other models to `high`.
- Thinking tokens are billed as output even when hidden; `display` defaults to `"omitted"`, and `"summarized"` returns readable summaries.
- Changing top-level effort between requests invalidates the prompt cache, so hold it steady inside a cached conversation.

**Practice:** Run one hard reasoning prompt at effort low, medium, and high on claude-opus-5-5. Record output_tokens, latency, and answer quality for each, then write a one-paragraph recommendation for that route.

**Read:** [Handling stop reasons](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons) · [Thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) · [Effort](https://platform.claude.com/docs/en/build-with-claude/effort)

<details><summary>Flashcards</summary>

**Q:** What should your code do on `stop_reason: "pause_turn"`?  
**A:** Send the assistant content back as-is so the server-tool loop can continue.

**Q:** How does a safety refusal arrive?  
**A:** HTTP 200 with `stop_reason: "refusal"` and a `stop_details` category. It is not an exception.

**Q:** How do you reduce thinking on Claude Opus 5.5?  
**A:** Lower `output_config.effort` (for example `"low"`). Thinking cannot be disabled on Opus 5.5.

</details>

### Check your understanding

*Study area: Stop reasons · medium*

An assistant uses the server-side web search tool. A response comes back with stop_reason pause_turn and no final answer. What should the code do next?

- **A.** Treat it as an error and retry the original request from the beginning
- **B.** Raise max_tokens and resend only the original user message to the model
- **C.** Send the conversation back with the paused assistant content appended as-is
- **D.** Return the partial text to the user, because pause_turn marks a finished turn

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

pause_turn means the server-tool loop hit its iteration limit. Append the assistant content unchanged and send the request again so Claude can continue.

_Why a tempting wrong answer misses:_ Retrying from scratch discards the work already done, and pause_turn is not a normal completion.

Reference: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

</details>

---

*Study area: Stop reasons · medium*

Monitoring shows occasional responses with HTTP 200 and stop_reason refusal. The app's error handler never fires for them. How should the integration treat these?

- **A.** Catch them as exceptions, because the SDK raises a RefusalError for each
- **B.** Ignore stop_reason and render whatever text blocks the content array holds
- **C.** Retry each one at a higher temperature so the classifier is less likely to fire
- **D.** Check stop_reason first and read stop_details to get the refusal category

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Safety classifiers return refusals as normal 200 responses. Check stop_reason before reading content, and use stop_details to log the category or route to a fallback.

_Why a tempting wrong answer misses:_ No exception is raised for a refusal, and non-default temperature values are rejected on current models.

Reference: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

</details>

---

*Study area: Thinking and effort · hard*

A latency-sensitive chat route ran on Claude Opus 5 with thinking: {"type": "disabled"}. After switching to claude-opus-5-5, every request returns 400. The team still wants fast, lightweight replies. What should it change?

- **A.** Remove the thinking field and set output_config.effort to "low", then measure
- **B.** Replace it with thinking: {"type": "enabled", "budget_tokens": 1024}
- **C.** Keep thinking disabled and add temperature: 0 so replies are shorter
- **D.** Set thinking.display to "omitted" so the model does no thinking at all

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Thinking is always on for Opus 5.5 and effort is the control for how much it thinks. Low effort keeps thinking short, and the team should verify quality on its own traffic.

_Why a tempting wrong answer misses:_ display only controls whether a summary is returned; the model still thinks and is billed the same. budget_tokens is also rejected on current models.

Reference: https://platform.claude.com/docs/en/build-with-claude/effort

</details>

---

## Vision, PDFs, and the Files API

Send images and documents efficiently and reuse uploads by file_id.

**You will be able to:**

- Send images as base64, URL, or file_id sources
- Send PDFs as document blocks and estimate their token cost
- Upload once with the Files API and reference the file_id many times
- Apply Files API isolation and lifecycle rules

**Key points**

- Images go in `image` blocks; supported formats are JPEG, PNG, GIF, and WebP, up to 8000x8000 px and 10 MB each on the Claude API.
- Place images and long documents before the question text when the use case allows.
- Image cost is about `ceil(w/28) * ceil(h/28)` visual tokens; Claude 4.7 and later models accept up to 2576 px on the long edge.
- PDFs are processed page by page as extracted text plus a page image, typically 1,500 to 3,000 text tokens per page.
- A request allows up to 600 PDF pages when the context window is 1M, and 100 otherwise.
- Upload with `client.files.upload(...)`, then reference `{"type": "file", "file_id": ...}`; file operations are free, content is billed as input tokens.
- The Files API is GA with no beta header, 500 MB per file, and is not available on Amazon Bedrock or Google Cloud.

**Practice:** Upload a multi-page PDF with client.files.upload, ask two different questions about it in two requests that reference the same file_id, and compare usage.input_tokens with a base64 version counted by count_tokens.

**Read:** [Vision](https://platform.claude.com/docs/en/build-with-claude/vision) · [PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support) · [Files API](https://platform.claude.com/docs/en/build-with-claude/files)

<details><summary>Flashcards</summary>

**Q:** Three ways to supply an image?  
**A:** Base64 data, a URL, or a Files API `file_id`. Bedrock and Google Cloud accept base64 only.

**Q:** How is a PDF page processed?  
**A:** As extracted text plus an image of the page, so both text and image tokens apply.

**Q:** What do Files API operations cost?  
**A:** Upload, list, download, and delete are free. File content used in a request is billed as input tokens.

</details>

### Check your understanding

*Study area: Files and multimodal input · medium*

An agent sends screenshots as base64 images on each turn. As conversations grow, requests get slow and approach the 32 MB request limit. What is the best fix?

- **A.** Convert each screenshot to a GIF so the encoded payload gets smaller
- **B.** Upload each image once with the Files API and reference it by file_id
- **C.** Move the screenshots into the system prompt so they are sent only once
- **D.** Send every screenshot as a URL to a public bucket to skip the size limit

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Every request resends the full history, so base64 images repeat on every turn. file_id references keep payloads small no matter how many images accumulate.

_Why a tempting wrong answer misses:_ The system prompt is resent on every request too, and public URLs trade a size problem for a data-exposure one.

Reference: https://platform.claude.com/docs/en/build-with-claude/vision

</details>

---

*Study area: PDF input · medium*

Which TWO statements about sending PDFs to Claude through the Claude API are accurate? (Select 2.)

- **A.** Each page is processed as extracted text plus an image of the page
- **B.** A request on a 1M-context model can include up to 600 PDF pages
- **C.** PDFs must be converted to plain text before the API accepts them
- **D.** count_tokens can count a PDF passed by url or file_id source
- **E.** PDF input carries a per-page fee on top of normal token pricing

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, B**

Claude converts each page to an image and pairs it with the page's extracted text, which is why charts are understood. The limit is 600 pages, or 100 when the context window is under 1M.

_Why a tempting wrong answer misses:_ count_tokens rejects url and file sources, so send the PDF as base64 to count it. There is no extra PDF fee, only text and image token costs.

Reference: https://platform.claude.com/docs/en/build-with-claude/pdf-support

</details>

---

## Structured outputs and strict tools

Get schema-valid JSON and tool inputs without prefill or forced tool choice.

**You will be able to:**

- Constrain a response with output_config.format and a JSON schema
- Use client.messages.parse with a Pydantic model
- Make tool inputs schema-valid with strict: true
- Recognize features that conflict with structured outputs

**Key points**

- `output_config: {"format": {"type": "json_schema", "schema": {...}}}` constrains the response; the old top-level `output_format` is deprecated.
- Python's `client.messages.parse(..., output_format=MyModel)` returns `response.parsed_output`.
- Every object in the schema needs `additionalProperties: false`; recursive schemas and external `$ref` are not supported.
- `strict: true` on a tool definition guarantees `tool_use.input` matches the schema.
- Opus 5.5, Sonnet 5.5, and Fable 5.1 reject forced `tool_choice` (`any` or `tool`); use `auto` plus `strict: true`.
- Citations and structured outputs are incompatible and return a 400 when combined; prefill is also rejected on current models.
- The first request with a new schema pays a grammar-compilation latency cost that is then cached.

**Practice:** Define a Pydantic model for an invoice (vendor, date, total, line_items) and extract it from three messy invoice texts with client.messages.parse on claude-opus-5-5. Log any case where parsed_output is missing.

**Read:** [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) · [Strict tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use)

<details><summary>Flashcards</summary>

**Q:** Current way to constrain the response to a JSON schema?  
**A:** `output_config.format` with `type: "json_schema"`, or `client.messages.parse` in the SDK.

**Q:** How do you guarantee tool inputs match the schema?  
**A:** Set `strict: true` on the tool definition, with `additionalProperties: false`.

**Q:** Which feature cannot be combined with structured outputs?  
**A:** Citations. Enabling both returns a 400.

</details>

### Check your understanding

*Study area: Structured outputs · medium*

An extraction service on claude-opus-5-5 must always return JSON that matches a fixed schema. The old code prefilled the assistant turn with "{". What should replace it?

- **A.** Keep the prefill but also set temperature to 0 for deterministic output
- **B.** Force the model to call an extract tool with tool_choice of type tool
- **C.** Set output_config.format with a JSON schema, or use messages.parse
- **D.** Ask for JSON in the user turn and strip any extra prose with a regex

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Structured outputs constrain the response to the schema. The Python SDK's messages.parse adds validation and a parsed_output attribute.

_Why a tempting wrong answer misses:_ Prefill returns a 400 on current models, and Opus 5.5 rejects forced tool_choice. Prompt-only JSON is not guaranteed to match the schema.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

*Study area: Strict tools · hard*

An order agent on claude-opus-5-5 calls a place_order tool. Occasionally the input is missing a required field, and tool_choice {"type": "tool"} now returns a 400. What is the right design?

- **A.** Send tool_choice any and validate each input again on the client side
- **B.** Add "CRITICAL: always include every field" to the tool description text
- **C.** Switch that route to Haiku 4.5, which still accepts forced tool choice
- **D.** Keep tool_choice auto and set strict: true on the tool's definition

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

strict: true guarantees tool inputs validate against the schema. With forced tool choice unavailable on Opus 5.5, auto plus strict and a clear instruction is the supported pattern.

_Why a tempting wrong answer misses:_ tool_choice any is rejected on Opus 5.5 just like type tool, and emphatic wording does not guarantee schema validity.

Reference: https://platform.claude.com/docs/en/api/errors

</details>

---

## Prompt caching and the Message Batches API

Cut cost and latency on repeated prefixes and move non-urgent work to batches.

**You will be able to:**

- Place cache_control breakpoints on stable prefixes
- Verify cache hits from usage fields
- Submit a batch and match results by custom_id
- Decide when batch processing fits a workload

**Key points**

- Caching is a prefix match in the order `tools` -> `system` -> `messages`; any byte change invalidates everything after it.
- Use top-level `cache_control: {"type": "ephemeral"}` for automatic caching, or up to 4 explicit breakpoints.
- Default TTL is 5 minutes; `"ttl": "1h"` writes cost 2x base input, 5-minute writes 1.25x, and Opus 5.5 reads cost 5% of base input.
- Opus 5.5's minimum cacheable prefix is 512 tokens; shorter prefixes silently do not cache, so check `cache_read_input_tokens`.
- Cache reads do not count toward ITPM on current models, which raises effective throughput.
- Batches cost 50% of standard prices, hold up to 100,000 requests or 256 MB, and expire unprocessed requests after 24 hours.
- Batch results can arrive in any order and stay downloadable for 29 days; key them by `custom_id`.

**Practice:** Send the same 5,000-token system prompt twice within five minutes with a cache breakpoint and print cache_creation_input_tokens and cache_read_input_tokens from each response. Then submit a three-request batch and print each result.type by custom_id.

**Read:** [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) · [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

<details><summary>Flashcards</summary>

**Q:** Prompt cache render order?  
**A:** `tools` -> `system` -> `messages`. Put stable content first and volatile content after the last breakpoint.

**Q:** How do you confirm a cache hit?  
**A:** `usage.cache_read_input_tokens` is above zero on the repeat request.

**Q:** Batch discount and matching rule?  
**A:** 50% off standard prices. Results can arrive in any order, so match them by `custom_id`.

</details>

### Check your understanding

*Study area: Prompt caching · hard*

A team adds cache_control to a 6,000-token system prompt, but cache_read_input_tokens stays at 0 on every request. The system prompt starts with "Current time: <timestamp>". What is the fix?

- **A.** Move the timestamp after the cached block so the prefix stays identical
- **B.** Switch the cache TTL to one hour so the entries last between requests
- **C.** Add three more cache_control breakpoints inside the same system prompt
- **D.** Lower the effort setting, because a high effort value disables caching

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Caching is an exact prefix match, so a changing timestamp at the start invalidates the prefix on every call. Keep volatile content after the last breakpoint.

_Why a tempting wrong answer misses:_ A longer TTL cannot help when the prefix differs every request, and extra breakpoints over changing text still miss.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

</details>

---

*Study area: Message Batches · medium*

A team submits 40,000 overnight summarization requests with the Message Batches API. Which THREE statements are accurate? (Select 3.)

- **A.** Batch requests cost 50% of standard Messages API prices
- **B.** Results are returned in the same order the requests were sent
- **C.** Each result should be matched to its request by custom_id
- **D.** Requests left unprocessed after 24 hours expire and are not billed
- **E.** Requests inside a batch cannot use prompt caching at all

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C, D**

Batches are 50% off, results can come back in any order so custom_id is the join key, and a batch that does not finish in 24 hours expires the remaining requests without billing them.

_Why a tempting wrong answer misses:_ Order is not guaranteed, and prompt caching does work in batches on a best-effort basis.

Reference: https://platform.claude.com/docs/en/build-with-claude/batch-processing

</details>

---

## Errors, rate limits, cost, and deployment platforms

Handle failures by type, read rate-limit signals, estimate cost, and pick the right cloud surface.

**You will be able to:**

- Catch SDK exceptions most-specific-first and retry only transient failures
- Tell a rate-limit 429 from a spend-cap 429
- Estimate request cost from usage and published prices
- Choose between the Claude API, Claude Platform on AWS, Bedrock, Vertex AI, and Foundry

**Key points**

- 400 `invalid_request_error`, 401 authentication, 403 permission, 404 not found, 413 too large, 429 rate limit, 500 api_error, 529 overloaded.
- Retry 429, 5xx, 529, and connection errors with backoff that honors `retry-after`; do not retry 400s unchanged.
- A 429 with `error_code: enforced_spend_limit_reached` and no `retry-after` means the monthly spend cap is hit; retries fail until access resumes.
- Rate limits are RPM, ITPM, and OTPM per model class, replenished continuously by a token bucket; `max_tokens` does not count against OTPM.
- Cost = input tokens x input price + output tokens (thinking included) x output price, adjusted for cache and batch discounts.
- Claude Platform on AWS is Anthropic-operated with AWS Marketplace billing and uses Claude API model IDs; Bedrock is AWS-operated and uses `anthropic.`-prefixed IDs.
- Bedrock does not support structured outputs, the Files API, Message Batches, or the Models API; check per-feature availability before choosing a platform.

**Practice:** Wrap a Messages call in a try/except chain for RateLimitError, APIStatusError, and APIConnectionError that logs the request ID. Then compute the dollar cost of one real response from its usage object at Opus 5.5 prices.

**Read:** [API errors](https://platform.claude.com/docs/en/api/errors) · [Rate limits](https://platform.claude.com/docs/en/api/rate-limits) · [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws) · [Claude in Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock)

<details><summary>Flashcards</summary>

**Q:** How can you tell a spend-cap 429 from a rate-limit 429?  
**A:** The spend-cap 429 has no `retry-after` header and carries `error_code: enforced_spend_limit_reached`.

**Q:** Do cached input tokens count toward ITPM?  
**A:** Not on current models. Only uncached input and cache writes count.

**Q:** Claude Platform on AWS vs Amazon Bedrock?  
**A:** Platform on AWS is Anthropic-operated with Claude API IDs and AWS Marketplace billing. Bedrock is AWS-operated with `anthropic.`-prefixed IDs and fewer features.

</details>

### Check your understanding

*Study area: Errors and rate limits · hard*

Mid-month, every request starts failing with 429 rate_limit_error. The responses carry error_code enforced_spend_limit_reached and no retry-after header, and SDK retries all fail. What is happening?

- **A.** A per-minute token bucket is empty and will refill within a few seconds
- **B.** The organization hit its tier's monthly spend cap, so usage pauses until reset
- **C.** An acceleration limit fired, and ramping traffic back gradually will clear it
- **D.** The API key was revoked, and the platform reports this as a 429 rate limit

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The spend-cap 429 has no retry-after header and carries enforced_spend_limit_reached. Access resumes next month or when the org moves to a higher tier.

_Why a tempting wrong answer misses:_ A token-bucket 429 includes retry-after and clears quickly, and a revoked key returns 401, not 429.

Reference: https://platform.claude.com/docs/en/api/rate-limits

</details>

---

*Study area: Deployment platforms · medium*

An enterprise must bill Claude usage through AWS but needs the Message Batches API, the Files API, and structured outputs, with first-party model IDs. Which surface fits best?

- **A.** Amazon Bedrock through the Mantle client and anthropic.-prefixed model IDs
- **B.** Google Cloud Vertex AI billed through the customer's AWS enterprise account
- **C.** Claude Platform on AWS, which Anthropic operates with AWS Marketplace billing
- **D.** The Claude API with a base_url override that points at an AWS endpoint

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Claude Platform on AWS is Anthropic-operated, billed through AWS Marketplace, and uses Claude API model IDs with the broader platform feature set.

_Why a tempting wrong answer misses:_ Amazon Bedrock does not support Message Batches, the Files API, or structured outputs, and its IDs carry an anthropic. prefix.

Reference: https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws

</details>

---
