# Claude API Fundamentals

> Anthropic University learning lane, created by Patrick King. Unofficial study material, not affiliated with or endorsed by Anthropic. Facts were checked against platform.claude.com/docs on 2026-09-28; re-check the docs before relying on any limit or price.

This lane takes you from an API key to an integration you would trust in production. Each section below matches one module. The examples use Python and the official `anthropic` SDK (`pip install anthropic`) with Claude Opus 5.5 (`claude-opus-5-5`), the recommended default model.

---

## 1. Access: the Console, API keys, and workspaces

Everything starts in the Claude Console at platform.claude.com. You create an API key there, and the SDK picks it up from the `ANTHROPIC_API_KEY` environment variable. Treat the key like a password. Keep it in a secret manager or your shell environment, and never commit it.

```python
import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from the environment
```

If you call the HTTP API directly, send the key in the `x-api-key` header and include `anthropic-version: 2023-06-01`. The `Authorization: Bearer` form is for OAuth access tokens, not API keys.

**Workspaces are the unit of isolation.** An organization always has a Default Workspace, and you can add more, up to 100 by default. Every request runs in exactly one workspace, and several resources are scoped to it: files from the Files API, Message Batches, and Skills. Each workspace can have its own spend limit and rate limits, set lower than the organization's limits. The Default Workspace is the exception: you cannot put custom limits on it.

A common layout is one workspace per environment (development, staging, production) or per tenant. The tenant case matters more than it looks. An uploaded file is readable by any key that can reach its workspace, so if two customers share a workspace, one customer's file ID would expose that file to code acting for the other. Keep file IDs server-side, never accept them from end users, and give each tenant its own workspace when you need hard isolation.

Two response headers are worth logging on every call: `request-id` (quote it in support tickets) and `anthropic-workspace-id`, which tells you which workspace the call was billed to.

```python
raw = client.messages.with_raw_response.create(
    model="claude-opus-5-5",
    max_tokens=256,
    messages=[{"role": "user", "content": "ping"}],
)
print(raw.headers.get("request-id"), raw.headers.get("anthropic-workspace-id"))
message = raw.parse()
```

---

## 2. The Messages API and the official SDKs

There is one endpoint to learn: `POST /v1/messages`. Tools, structured outputs, thinking, images, and documents are all features of that endpoint, not separate APIs. A request has four required pieces: `model`, `max_tokens`, `messages`, and usually a `system` prompt.

```python
message = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=4096,
    system="You are a concise assistant for a payments engineering team.",
    messages=[{"role": "user", "content": "Explain idempotency keys in two sentences."}],
)

text = "".join(block.text for block in message.content if block.type == "text")
print(text)
print(message.stop_reason, message.usage.input_tokens, message.usage.output_tokens)
```

Three habits prevent most integration bugs.

**Read content by block type.** `message.content` is a list of typed blocks. On Claude Opus 5.5, thinking is always on, so a response can begin with one or more `thinking` blocks before any text. Code written as `message.content[0].text` breaks on those responses. Filter for `type == "text"` as above.

**Remember that the API is stateless.** Claude does not keep conversation state between requests. To continue a conversation, send the whole history again, appending the assistant's `message.content` exactly as returned.

```python
history = [{"role": "user", "content": "Name three uses for a message queue."}]
reply = client.messages.create(model="claude-opus-5-5", max_tokens=2048, messages=history)
history.append({"role": "assistant", "content": reply.content})  # keep every block
history.append({"role": "user", "content": "Which one fits order processing best?"})
reply = client.messages.create(model="claude-opus-5-5", max_tokens=2048, messages=history)
```

Appending the full content matters most in tool-use loops: thinking blocks must go back unchanged, and the API rejects edited or reordered ones with a 400.

**Check `stop_reason` and `usage` on every response.** They tell you whether the answer is complete and what it cost. The SDK also retries transient failures (connection errors, 408, 409, 429, and 5xx) twice by default, which you can tune with `max_retries`.

---

## 3. Choosing a model: lineup, IDs, and the Models API

The current lineup has four models:

| Model | API ID | Context | Max output | Price in / out per MTok |
| --- | --- | --- | --- | --- |
| Claude Fable 5.1 | `claude-fable-5-1` | 1M | 128K | $10 / $50 |
| Claude Opus 5.5 | `claude-opus-5-5` | 1M | 128K | $4 / $20 |
| Claude Sonnet 5.5 | `claude-sonnet-5-5` | 1M | 128K | $2 / $10 |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` (alias `claude-haiku-4-5`) | 200K | 64K | $1 / $5 |

Start with Opus 5.5 for most workloads. Move up to Fable 5.1 for the hardest reasoning and long-horizon agentic work, or when Opus 5.5 at higher effort still falls short on your evals. Sonnet 5.5 is the speed and intelligence balance. Haiku 4.5 is the fastest and cheapest, and a strong fit for high-volume bounded tasks such as routing and classification. Older models (Opus 5, Opus 4.8, Sonnet 5, and others) are still served, but they are legacy, not the default for new work.

**Model IDs are pinned.** Every Claude model ID is a pinned snapshot, including dateless IDs like `claude-opus-5-5`. Behavior changes only when you change the ID. Aliases only matter for models before the 4.6 generation, where a name like `claude-haiku-4-5` points at a dated ID.

**Discover limits at runtime.** The Models API returns each model's limits and capabilities, so routing code does not need hard-coded numbers.

```python
info = client.models.retrieve("claude-opus-5-5")
print(info.max_input_tokens, info.max_tokens)  # context window, output cap
```

There is no `context_window` field; the context window is `max_input_tokens`.

Pick models with evidence, not intuition. Run the same representative prompts through two candidates and compare quality, latency, and `usage`. Rate limits are also tracked per model class, so a model switch changes which limits apply.

---

## 4. Streaming, tokens, and context limits

**Stream long responses.** A non-streaming request holds an HTTP connection open until the whole answer is ready. The SDKs refuse non-streaming calls they expect to run past about ten minutes, which a large `max_tokens` easily triggers. Streaming avoids that, and `get_final_message()` still hands you one complete `Message` if you do not need the individual events.

```python
with client.messages.stream(
    model="claude-opus-5-5",
    max_tokens=64000,
    messages=[{"role": "user", "content": "Write a detailed design review of this API: ..."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
    final = stream.get_final_message()

print("\n", final.stop_reason, final.usage.output_tokens)
```

Under the hood the server sends server-sent events: `message_start`, then for each block a `content_block_start`, a run of `content_block_delta` events (`text_delta`, `input_json_delta` for tool arguments, `thinking_delta`), and a `content_block_stop`, followed by `message_delta` (with cumulative usage and the stop reason) and `message_stop`. Errors can arrive as an `error` event after the HTTP 200, so a stream handler needs its own error path.

**Count before you send.** The token counting endpoint takes the same shape as a Messages request and returns `input_tokens`. It is free, has its own rate limit, and returns an estimate that can differ slightly from billed usage.

```python
count = client.messages.count_tokens(
    model="claude-opus-5-5",
    system="You are a contract analyst.",
    messages=[{"role": "user", "content": open("contract.txt").read()}],
)
print(count.input_tokens)
```

Always count against the model you will actually use. Current models share the tokenizer introduced with Opus 4.7, which yields roughly 30 percent more tokens for the same text than earlier models. Budgets measured on an older model will be too low.

**Size `max_tokens` for thinking plus reply.** `max_tokens` is a hard cap on total output. On Opus 5.5 that total includes thinking, so a cap sized for a model that ran without thinking can truncate answers. Input plus output must also fit the context window: 1M tokens on Opus 5.5.

---

## 5. Stop reasons, adaptive thinking, and effort

Every response says why it stopped. Branch on it before you use the content.

| `stop_reason` | Meaning | What to do |
| --- | --- | --- |
| `end_turn` | Natural finish | Use the response |
| `max_tokens` | Hit your cap | Raise `max_tokens` or continue; retry if a tool call was cut off |
| `stop_sequence` | Matched one of your stop sequences | Read `stop_sequence` |
| `tool_use` | Claude wants a tool run | Run it and reply with `tool_result` blocks |
| `pause_turn` | A server-tool loop paused | Send the assistant content back unchanged to continue |
| `refusal` | Claude declined | Read `stop_details`; log or route to a fallback |

A refusal is not an exception. Safety classifiers return it as a normal HTTP 200 with `stop_details` naming the category, so an integration that only handles errors will never notice it.

```python
if message.stop_reason == "refusal":
    log_refusal(message.stop_details)
elif message.stop_reason == "max_tokens":
    raise RuntimeError("Response truncated; raise max_tokens or continue")
```

**Adaptive thinking.** Current models decide for themselves when and how much to think. On Opus 5.5 thinking is always on: you can omit the `thinking` field or send `{"type": "adaptive"}`, but `{"type": "disabled"}` and the older `{"type": "enabled", "budget_tokens": N}` both return a 400. Thinking tokens are billed as output tokens even when you do not see them. By default the thinking text is omitted; set `display` to `"summarized"` if you want readable summaries.

**Effort is the control.** `output_config.effort` accepts `low`, `medium`, `high`, `xhigh`, and `max`. Opus 5.5 defaults to `medium`, while most other models default to `high`. Effort shapes all output, not just thinking: lower effort means shorter thinking, fewer tool calls, and terser replies.

```python
message = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=8000,
    output_config={"effort": "low"},
    thinking={"type": "adaptive", "display": "summarized"},
    messages=[{"role": "user", "content": "Classify this ticket: 'Card declined twice.'"}],
)
```

Treat effort as a per-route setting you measure, not a global constant. Run a sweep on your own evals. Hold the top-level effort steady inside a cached conversation, because changing it between requests invalidates the prompt cache. Sampling parameters such as `temperature` are rejected on current models if set to non-default values, so steer with prompts and effort instead.

---

## 6. Vision, PDFs, and the Files API

**Images** go in `image` content blocks with one of three sources: base64 data, a URL, or a Files API `file_id`. The API accepts JPEG, PNG, GIF, and WebP, up to 8000x8000 px and 10 MB per image on the Claude API. Put images before the question when you can. Cost scales with size, at about one visual token per 28x28-pixel patch, and Claude 4.7 and later models accept images up to 2576 px on the long edge before downscaling. Downsample when you do not need the fidelity.

**PDFs** go in `document` blocks. Claude processes each page as extracted text plus an image of the page, which is why it can read charts and tables. Budget for both: text typically runs 1,500 to 3,000 tokens per page, plus image tokens. A request can carry up to 600 pages on a 1M-context model.

**The Files API** lets you upload once and reference a file many times. It is generally available with no beta header. Uploading, listing, and deleting are free; file content is billed as input tokens when a request uses it.

```python
uploaded = client.files.upload(
    file=("q3-report.pdf", open("q3-report.pdf", "rb"), "application/pdf"),
)

message = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=4096,
    messages=[{
        "role": "user",
        "content": [
            {"type": "document", "source": {"type": "file", "file_id": uploaded.id}},
            {"type": "text", "text": "List the three biggest cost drivers in this report."},
        ],
    }],
)
```

This matters most in long conversations. Every request resends the full history, so base64 images or PDFs get re-uploaded on every turn. A `file_id` keeps the payload small. Two limits to remember: 500 MB per file, and the Files API is not available on Amazon Bedrock or Google Cloud, which accept base64 image sources only.

---

## 7. Structured outputs and strict tools

When code consumes Claude's output, you want JSON that validates every time. The older tricks for this no longer work on current models: prefilling the assistant turn with `{` returns a 400, and so does forcing a tool call with `tool_choice` of type `any` or `tool` on Opus 5.5, Sonnet 5.5, and Fable 5.1.

**Structured outputs** constrain the response to a JSON schema through `output_config.format`. In Python, `messages.parse` accepts a Pydantic model, sends the schema, and validates the result.

```python
from pydantic import BaseModel

class Invoice(BaseModel):
    vendor: str
    invoice_date: str
    total: float

response = client.messages.parse(
    model="claude-opus-5-5",
    max_tokens=4096,
    messages=[{"role": "user", "content": "Extract the invoice fields:\n" + invoice_text}],
    output_format=Invoice,
)
invoice = response.parsed_output
```

Schemas must set `additionalProperties: false` on every object, and recursive schemas and external `$ref` are not supported. The first request with a new schema is slower while the grammar compiles; later requests reuse it.

**Strict tool use** gives the same guarantee for tool arguments. Add `strict: true` to the tool definition, keep `tool_choice` at `auto`, and tell Claude in the prompt when to use the tool.

```python
tools = [{
    "name": "place_order",
    "description": "Place an order for a SKU.",
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {"sku": {"type": "string"}, "quantity": {"type": "integer"}},
        "required": ["sku", "quantity"],
        "additionalProperties": False,
    },
}]
```

One conflict to design around: citations and structured outputs cannot be combined. A request that enables both returns a 400.

---

## 8. Prompt caching and the Message Batches API

**Prompt caching** reuses the processed prefix of a prompt. The prefix is built in a fixed order, `tools`, then `system`, then `messages`, and matching is exact: change one byte and everything after it misses. So put stable content first and anything that varies (timestamps, user IDs, the new question) after the last breakpoint.

```python
response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=2048,
    system=[{
        "type": "text",
        "text": policy_manual,  # large, identical on every request
        "cache_control": {"type": "ephemeral"},
    }],
    messages=[{"role": "user", "content": question}],
)
print(response.usage.cache_creation_input_tokens, response.usage.cache_read_input_tokens)
```

You can also set `cache_control` at the top level of the request for automatic caching, which moves the breakpoint forward as a conversation grows. A request allows up to four explicit breakpoints. The default lifetime is five minutes; `"ttl": "1h"` keeps entries for an hour. Writes cost 1.25x base input for five minutes or 2x for an hour, and reads are cheap: 5 percent of base input on Opus 5.5. Prefixes below the model's minimum (512 tokens on Opus 5.5) silently do not cache, so always confirm with `cache_read_input_tokens`. Cache reads also do not count toward input-token rate limits on current models.

**Message Batches** process large volumes asynchronously at 50 percent of standard prices. A batch holds up to 100,000 requests or 256 MB. Most finish within an hour; anything still unprocessed after 24 hours expires and is not billed. Results stay available for 29 days and can come back in any order, so every request needs a unique `custom_id`.

```python
from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

batch = client.messages.batches.create(requests=[
    Request(
        custom_id=f"ticket-{t.id}",
        params=MessageCreateParamsNonStreaming(
            model="claude-opus-5-5",
            max_tokens=1024,
            messages=[{"role": "user", "content": f"Summarize: {t.body}"}],
        ),
    )
    for t in tickets
])

# Later, once client.messages.batches.retrieve(batch.id).processing_status == "ended":
for result in client.messages.batches.results(batch.id):
    if result.result.type == "succeeded":
        save(result.custom_id, result.result.message)
```

Use batches for evaluations, backfills, and nightly jobs, anywhere a user is not waiting.

---

## 9. Errors, rate limits, cost, and deployment platforms

**Handle errors by type.** The main HTTP errors are 400 `invalid_request_error`, 401 `authentication_error`, 403 `permission_error`, 404 `not_found_error`, 413 `request_too_large`, 429 `rate_limit_error`, 500 `api_error`, and 529 `overloaded_error`. Retry the transient ones (429, 5xx, 529, connection failures) with backoff that honors `retry-after`. Do not retry a 400 unchanged; fix the request. Catch the SDK's typed exceptions from most specific to least.

```python
import anthropic

client = anthropic.Anthropic(max_retries=4)
try:
    message = client.messages.create(
        model="claude-opus-5-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Hello"}],
    )
except anthropic.RateLimitError as e:
    log("rate limited", e.response.headers.get("retry-after"))
except anthropic.APIStatusError as e:
    log("api error", e.status_code, e.response.headers.get("request-id"))
except anthropic.APIConnectionError:
    log("network problem")
```

**Read rate-limit signals.** Limits are requests, input tokens, and output tokens per minute for each model class, refilled continuously by a token bucket. `anthropic-ratelimit-*` response headers show what remains. One 429 needs special handling: when an organization reaches its tier's monthly spend cap, the 429 carries `error_code: enforced_spend_limit_reached` and no `retry-after` header, and retries keep failing until access resumes or the organization moves up a tier.

**Estimate cost from usage.** Cost is input tokens times the input price plus output tokens (thinking included) times the output price, adjusted for cache writes and reads and for the batch discount. At Opus 5.5 prices, a request with 20,000 input and 2,000 output tokens costs 0.02 x $4 + 0.002 x $20 = $0.12. The biggest levers, in rough order, are caching stable prefixes, batching non-urgent work, tuning effort per route, and choosing the smallest model that passes your evals.

**Choose a platform.** The same models are offered through several surfaces:

- **Claude API**: Anthropic's first-party API with the full feature set.
- **Claude Platform on AWS**: operated by Anthropic, billed through AWS Marketplace, using Claude API model IDs and typically getting features the same day. The Python client is `AnthropicAWS` (in beta).
- **Amazon Bedrock**: operated by AWS inside the AWS security boundary. Model IDs carry an `anthropic.` prefix (for example `anthropic.claude-opus-5-5`), and the Python client is `AnthropicBedrockMantle`. Bedrock does not support structured outputs, the Files API, Message Batches, or the Models API.
- **Google Cloud Vertex AI** and **Microsoft Foundry**: partner platforms with their own IDs, authentication, and feature availability.

```python
from anthropic import AnthropicBedrockMantle

bedrock = AnthropicBedrockMantle(aws_region="us-east-1")
message = bedrock.messages.create(
    model="anthropic.claude-opus-5-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
```

Check the per-feature availability table in the docs before committing to a platform. A design that relies on batches or structured outputs needs a surface that offers them.

---

## Where to go next

- Take Anthropic Academy's **Building with the Claude API** course alongside this lane.
- Continue with the Prompt Engineering lane to improve what you send.
- Practice with the Developer – Foundations question bank.
