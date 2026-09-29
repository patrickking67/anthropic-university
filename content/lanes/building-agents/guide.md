# Building Agents with Claude

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with
> Anthropic. Facts verified against platform.claude.com/docs and code.claude.com/docs on 2026-09-28.
> Beta names and headers change, so check the linked pages before you ship.

This guide walks the path from "should this even be an agent?" to a guarded, measured agent in
production. Code samples use the official `anthropic` Python SDK and `claude-opus-5-5`. They are
kept small so the mechanics stay visible.

---

## 1. Workflow or agent

Start with the question of control. In a **workflow**, your code decides the sequence: call the
model, parse the output, call a tool, call the model again. In an **agent**, the model decides.
It picks tools, reads the results, and keeps going until it judges the task done.

Most production needs are workflows, and that is fine. The familiar shapes are:

- **Prompt chaining:** each call works on the previous call's output.
- **Routing:** classify an input, then send it down a specialized path.
- **Parallelization:** run independent pieces at once, or run the same piece several times and vote.
- **Orchestrator-workers:** one call breaks the job down and hands pieces to workers.
- **Evaluator-optimizer:** one call drafts and another critiques until the draft passes.

An agent earns its extra cost and latency when you can't predict the number of steps ahead of
time. Before you build one, screen the use case with four questions:

1. **Complexity.** Is the task really open-ended, or could a script do it?
2. **Value.** Is the outcome worth several model calls and the added latency?
3. **Viability.** Can Claude actually do the hardest step? Prove it with a quick test first.
4. **Cost of error.** What happens when the agent is wrong, and will anyone notice?

The fourth question is the one teams skip. An agent that opens draft pull requests has
recoverable errors, because tests and reviewers catch them. An agent that issues refunds on its
own has costly, quiet errors. The second kind needs a human checkpoint or shouldn't be autonomous
at all. Every extra autonomous turn adds tokens, latency, and another chance for an early mistake
to compound, so add autonomy only when evals show the simpler design falls short.

---

## 2. Tool use fundamentals

Tools connect Claude to your systems. Claude never runs your code. It emits a structured request,
your code runs the operation, and you send the result back.

### Define a tool Claude can choose correctly

A user-defined tool has three required parts: a `name` (letters, digits, `_` or `-`, up to 128
characters), a `description`, and an `input_schema` written in JSON Schema. The description
matters most. Say what the tool does, when to use it, what it returns, and what it doesn't do.
Several sentences is normal.

```python
import anthropic

client = anthropic.Anthropic()

tools = [
    {
        "name": "get_order_status",
        "description": (
            "Look up the current fulfillment status of one customer order by its order ID. "
            "Use this when the user asks where an order is or whether it has shipped. "
            "Returns status, carrier, and last update time. It does not return payment details."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "order_id": {"type": "string", "description": "Order ID such as ORD-10442"}
            },
            "required": ["order_id"],
        },
    }
]
```

### The loop

When Claude wants a tool, the response ends with `stop_reason == "tool_use"` and contains one or
more `tool_use` blocks. Each has an `id`, a `name`, and an `input`. You run the tool and reply
with a **user** message of `tool_result` blocks. Each `tool_result` carries a `tool_use_id` equal
to the `id` it answers. Repeat until the stop reason is something else.

```python
import json

def get_order_status(order_id: str) -> dict:
    # Replace with a real lookup.
    return {"order_id": order_id, "status": "shipped", "carrier": "UPS"}

def run_tool(name: str, args: dict) -> dict:
    if name == "get_order_status":
        return get_order_status(**args)
    raise ValueError(f"Unknown tool: {name}")

messages = [{"role": "user", "content": "Where is order ORD-10442?"}]

for _ in range(10):  # always bound the loop
    response = client.messages.create(
        model="claude-opus-5-5",
        max_tokens=4096,
        tools=tools,
        messages=messages,
    )
    messages.append({"role": "assistant", "content": response.content})

    if response.stop_reason != "tool_use":
        break

    results = []
    for block in response.content:
        if block.type != "tool_use":
            continue
        try:
            output = run_tool(block.name, block.input)
            results.append({
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": json.dumps(output),
            })
        except Exception as exc:
            results.append({
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": f"Tool failed: {exc}",
                "is_error": True,
            })

    messages.append({"role": "user", "content": results})

print(response.content[-1].text if response.content else "")
```

Three rules are easy to break:

- **Results come right after the call.** Nothing goes between the assistant turn that asked and
  the user message that answers.
- **Results come first in that message.** Any text you add goes after every `tool_result` block.
  Text in front of them causes a 400.
- **Failures are reported, not hidden.** `is_error: True` with a useful message lets Claude
  retry, change its inputs, or explain the problem. An empty "success" makes it reason from data
  that doesn't exist.

The loop above exits on any stop reason other than `tool_use`. In production, handle `max_tokens`,
`refusal`, and `pause_turn` (section 5) on purpose rather than printing whatever came back. One
more habit: content from outside your control, such as web pages, email, or uploads, belongs
inside `tool_result` blocks rather than the system prompt. That limits indirect prompt injection.

---

## 3. Parallel calls, strict tools, and `tool_choice`

**Parallel calls.** Claude can request several tools in one turn, and it does by default. The loop
above already handles that correctly, because it collects every result into **one** user message.
Sending one user message per result is a documented anti-pattern. It breaks the "results come
right after the call" rule and teaches Claude to stop parallelizing. If order matters, set
`disable_parallel_tool_use: True` inside the `tool_choice` object (it isn't a top-level
parameter). With `auto`, that limits Claude to at most one tool per response.

**Strict tools.** Add `"strict": True` to a tool definition and the API constrains sampling so
the `input` always matches your schema and the tool name is always valid. You no longer need to
handle `"2"` when the schema says integer, or a missing required field.

```python
tools[0]["strict"] = True
tools[0]["input_schema"]["additionalProperties"] = False
```

Strict mode constrains the inputs Claude generates and nothing else. It doesn't force a call, it
doesn't replace a good description, and it doesn't validate what your function returns.

**Forcing a tool.** On Claude Opus 5.5, Sonnet 5.5, and Fable 5.1, `tool_choice` of type `any` or
`tool` returns a 400. The documented path is `auto` plus strict tools when you need schema-valid
inputs, or structured outputs when you need the whole response in a fixed JSON shape. `none`
still works when you want no tool calls at all. Older habits of forcing a tool to get JSON need
updating when you move to these models.

---

## 4. Choosing a harness

The loop is the same everywhere: send, run tools, send results, repeat. What changes is who
writes that loop and who runs the machine it lives on.

| Option | Who runs the loop | Who runs the runtime | Reach for it when |
| --- | --- | --- | --- |
| Manual loop (Messages API) | You | You | You need approval, logging, or custom logic on every call |
| Tool Runner (client SDK, beta) | The SDK | You | You want less boilerplate over your own tools |
| Claude Agent SDK | Claude Code's loop, as a library | You | You want Claude Code's tools, hooks, permissions, and sessions in your own service |
| Claude Managed Agents (beta) | Anthropic | Anthropic's sandbox, or a self-hosted sandbox | Long-running or scheduled work without building infrastructure |

### Tool Runner

The Tool Runner turns typed Python functions into tools and runs the loop for you.

```python
from anthropic import Anthropic, beta_tool

client = Anthropic()

@beta_tool
def get_order_status(order_id: str) -> str:
    """Look up the fulfillment status of one order.

    Args:
        order_id: Order ID such as ORD-10442
    """
    return '{"status": "shipped", "carrier": "UPS"}'

runner = client.beta.messages.tool_runner(
    model="claude-opus-5-5",
    max_tokens=4096,
    tools=[get_order_status],
    messages=[{"role": "user", "content": "Where is order ORD-10442?"}],
    max_iterations=10,
)
final = runner.until_done()
print(final.content[-1].text)
```

If a tool raises, the runner catches it and sends Claude a `tool_result` with `is_error: true`
and the exception's message, without the stack trace. The docs point you back to the manual loop
when you need human-in-the-loop approval, custom logging, or conditional execution. In Python you
can also step through the runner and call `generate_tool_call_response()` to inspect a result
before it goes back to Claude.

### Agent SDK

The Claude Agent SDK (Python and TypeScript) is Claude Code as a library. You get the built-in
file, shell, and web tools, the agent loop, hooks, permission modes, sessions, subagents, and
MCP. It runs in a process you operate, so hosting, scaling, and isolation are your job. You
configure it with `ClaudeAgentOptions` and cap runs with `max_turns` and `max_budget_usd`.

### Managed Agents

Claude Managed Agents moves the harness to Anthropic. You create an agent and an environment
through the Claude API, start sessions, and exchange events. Claude runs tools inside a sandbox,
and prompt caching and compaction are built in. Every endpoint needs the
`managed-agents-2026-04-01` beta header, which the SDKs set for you. Section 9 covers the pieces.

---

## 5. Server tools and `pause_turn`

Some tools run on Anthropic's side: **web search**, **web fetch**, **code execution**, and **tool
search**. You enable them in `tools`, and their calls show up as `server_tool_use` blocks (ids
start with `srvtoolu_`) with their results in the same response. You never write a `tool_result`
for them.

```python
tools = [{"type": "web_search_20250305", "name": "web_search", "max_uses": 5}]
messages = [{"role": "user", "content": "Summarize this week's changes to the Claude API."}]

for _ in range(4):  # cap continuations
    response = client.messages.create(
        model="claude-opus-5-5", max_tokens=4096, tools=tools, messages=messages
    )
    messages.append({"role": "assistant", "content": response.content})
    if response.stop_reason != "pause_turn":
        break
```

A single request can trigger several searches. If the server-side loop hits its iteration cap,
the response ends with `pause_turn`. Send the paused content back as it is, with the same tools,
and Claude picks up where it stopped. The loop above does exactly that.

**Mixed turns.** If Claude calls a server tool and one of your client tools in the same turn, the
API returns right away with `stop_reason == "tool_use"`, and the `server_tool_use` block has no
result yet. Reply with **only** your client `tool_result` blocks and keep the same `tools` array.
The API then runs the waiting server tool and Claude continues. Adding text after the results, or
dropping the server tool from `tools`, makes the request fail.

**Scope and spend.** `max_uses` caps searches per request. `allowed_domains` or `blocked_domains`
(one or the other, not both) limit where web tools can go. Web search costs $10 per 1,000
searches plus the tokens its results add. Code execution is free in requests that also include
`web_search_20260209` or `web_fetch_20260209` or later. Otherwise it's billed by container hour
after the monthly free allowance. The newer web tool versions use code execution internally for
dynamic filtering, so they aren't ZDR-eligible by default. Set `allowed_callers: ["direct"]` to
turn that filtering off.

---

## 6. Context management

Long agent runs fill the context window, and quality drops as it fills. You have four tools for
this, and they solve different problems.

**Compaction** replaces older turns with a summary Claude writes on the server. With threshold
compaction, you add one edit to your requests, and the API summarizes once input reaches the
trigger (default 150,000 tokens, minimum 50,000):

```python
response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-5-5",
    max_tokens=4096,
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
)
messages.append({"role": "assistant", "content": response.content})  # keep the compaction block
```

Always send the `compaction` block back. The API ignores everything before it. If you write your
own `instructions`, they replace the default summary prompt completely, so say what must survive:
file paths, decisions, open tasks. The docs now recommend **compaction on demand** (beta header
`compact-2026-09-04`) wherever it's available, because your code chooses when the summary is
written and can keep recent turns word for word.

**Context editing** clears content by rule instead of summarizing. `clear_tool_uses_20250919`
drops the oldest tool results once input passes a trigger (default 100,000 tokens) and keeps the
most recent few (default 3). It fits agents that read large files or search results they won't
need again.

```python
response = client.beta.messages.create(
    betas=["context-management-2025-06-27"],
    model="claude-opus-5-5",
    max_tokens=4096,
    tools=tools,
    messages=messages,
    context_management={"edits": [{
        "type": "clear_tool_uses_20250919",
        "trigger": {"type": "input_tokens", "value": 60000},
        "keep": {"type": "tool_uses", "value": 3},
    }]},
)
```

Clearing breaks the prompt cache at the point it clears, so use `clear_at_least` to make each
clearing worth the cache rewrite.

**The memory tool** gives Claude files that outlast a conversation. You declare it with just
`{"type": "memory_20250818", "name": "memory"}`. Claude asks to `view`, `create`, `str_replace`,
`insert`, `delete`, or `rename` paths under `/memories`, and your code performs those operations
against storage you control. It's client-side, so reject any path that escapes `/memories`. Paired
with context editing, Claude gets a warning before old results are cleared and can save what
matters first.

**Subagents** isolate work. A subagent has its own conversation, and only its final message
returns to the parent. Send the file-reading, search-heavy exploration to a subagent, and the
parent keeps a small, focused context.

A quick way to choose: summarize with compaction when the whole history is getting long, clear
with context editing when stale tool output is the bulk, persist with memory when knowledge must
cross sessions, and isolate with subagents when one subtask would flood the parent.

---

## 7. Multi-agent orchestration

A coordinator with subagents pays off in three situations: **fan-out** over independent pieces,
**specialization** where each role gets its own prompt and tools, and **escalation** of hard
pieces to a stronger model. It costs more tokens than one agent, so use it when the work really
divides.

Design the handoffs deliberately.

- **Partition cleanly.** Give each subagent one slice, a goal, a boundary ("only sources from
  2026", "only the billing service"), and an output format. Identical broad briefs produce
  duplicate findings and leave gaps.
- **Pass context explicitly.** A subagent sees only what you put in its task. Include the facts it
  needs rather than assuming it knows the coordinator's history.
- **Return conclusions, not transcripts.** Ask for condensed findings with sources. The
  coordinator's context should hold results, not every intermediate tool call.
- **Propagate errors honestly.** A subagent that fails should report what it tried, what it found,
  and why it stopped. The coordinator can then retry, reroute, or state the gap in the final
  answer. An empty result marked as success hides the failure and ends up as a confident but
  incomplete report.

The two Anthropic surfaces differ on nesting. In **Managed Agents**, a coordinator lists its
roster in `multiagent.agents` (up to 20 unique agents, each callable many times). Delegation is
one level deep, so a roster that references an agent with its own roster fails validation. Each
agent runs in its own context-isolated session thread, and all of them share the sandbox,
filesystem, and vault credentials. In the **Agent SDK**, subagents can spawn their own, three
layers deep by default, and you can cap depth, concurrency, and spend.

---

## 8. Hooks, permissions, and human-in-the-loop

Guardrails should be deterministic code, not a hopeful sentence in the system prompt.

**Agent SDK hooks** are callbacks on lifecycle events. `PreToolUse` runs before a tool executes
and can deny it. `PostToolUse` sees results and suits audit logs. Here's a minimal guard:

```python
from claude_agent_sdk import ClaudeAgentOptions, HookMatcher

async def block_destructive(input_data, tool_use_id, context):
    command = input_data["tool_input"].get("command", "")
    if "rm -rf" in command or "DROP TABLE" in command.upper():
        return {
            "hookSpecificOutput": {
                "hookEventName": input_data["hook_event_name"],
                "permissionDecision": "deny",
                "permissionDecisionReason": "Destructive commands need a human.",
            }
        }
    return {}

options = ClaudeAgentOptions(
    hooks={"PreToolUse": [HookMatcher(matcher="Bash", hooks=[block_destructive])]}
)
```

**Permission order in the Agent SDK:** hooks, then deny rules, then the permission mode, then
allow rules, then your `canUseTool` callback. A deny rule that matches blocks the call even in
`bypassPermissions`. A bare deny like `Bash` removes the tool completely. A scoped one like
`Bash(rm *)` keeps Bash available and blocks only the matching calls. For a locked-down agent,
pair an explicit `allowed_tools` list with the `dontAsk` mode.

**Managed Agents permission policies** apply to server-executed toolsets:

- `always_allow` runs the call. It's the default for the agent toolset.
- `always_ask` pauses for you. It's the default for MCP toolsets.
- `auto` lets the server run the call, deny it, or pause for you.

Override single tools in the toolset's `configs` array, for example to set `bash` to
`always_ask`. When a call needs approval, the session goes idle with stop reason
`requires_action`, and you reply with a `user.tool_confirmation` event whose `result` is `allow`
or `deny`, optionally with a `deny_message`. Under `auto`, the server treats your `user.message`
events as your intent but never takes instructions from tool results or fetched pages. If you
pass untrusted end-user text through as user messages, keep `always_ask` on anything that user
shouldn't run unreviewed.

Prevent destructive actions in layers. Scope credentials and network access, deny the dangerous
patterns, require approval for irreversible actions, and log every call.

---

## 9. Managed Agents concepts

| Resource | What it holds |
| --- | --- |
| **Agent** | Versioned config: model, system prompt, tools, MCP servers, skills, and an optional multiagent roster |
| **Environment** | Where sessions run: cloud or self-hosted, pre-installed packages, networking (`unrestricted` or `limited` with `allowed_hosts`) |
| **Session** | One running agent in an environment, with its own isolated container and server-side history |
| **Events** | What you exchange with a session: `user.message`, `user.tool_confirmation`, `user.interrupt`, and the agent's streamed progress |
| **Vault** | One end user's credentials, referenced by `vault_ids` when a session is created |
| **Scheduled deployment** | A cron schedule that starts sessions automatically, each with its own budget |

A few details are worth knowing well:

- **Versioning.** Each change to an agent creates a new version. Sessions can pin a version or
  override fields for one run with `agent_with_overrides`. Overrides replace fields in full rather
  than merging them.
- **Vaults.** MCP credentials are injected by server URL. Environment-variable credentials sit in
  the sandbox as placeholders and are swapped for the real secret at egress, so the agent never
  sees the value. A vault holds up to 20 credentials.
- **Deployments.** A deployment needs an agent, an environment, and at least one initial event.
  Schedules use POSIX cron in an IANA timezone. Each attempt produces a deployment run record, so
  you can see failures such as an archived environment. A deployment budget is copied onto every
  session it starts. It caps each run on its own, not the total across runs.
- **Budgets.** A session budget is a hard cap in whole US cents at list price, counting model
  tokens, web searches, and running time. At the cap the session goes idle with
  `budget_reached`, and its history and sandbox are kept.
- **Outcomes.** A `user.define_outcome` event with a rubric makes the harness provision a grader
  in a separate context, and the agent iterates until the rubric passes.
- **Data handling.** Sessions are stateful, so Managed Agents isn't currently eligible for Zero
  Data Retention or HIPAA BAA coverage.

---

## 10. Evaluate, then tune cost

**Evals.** An agent eval is a set of **tasks**, each run over several **trials** because outputs
vary. **Graders** score each trial. They can be code (exact checks, tests, state inspection),
model-based (rubrics), or human. The **transcript**, or trace, is the full record of a trial:
outputs, tool calls, reasoning, and intermediate results. Two habits matter most:

- **Grade outcomes, not paths.** Check the state the agent left behind: the file is fixed, the
  ticket is closed, the report has the required sections. Don't require one exact tool sequence.
  Agents often find valid routes you didn't plan for.
- **Read transcripts.** Metrics tell you that something failed. Transcripts tell you why, and
  they show whether your grader is fair.

Track pass rate alongside cost and latency per task. For reliability-critical agents, look at how
often every trial passes, not just whether one did.

**Effort** is the main dial for cost. `output_config.effort` takes `low`, `medium`, `high`,
`xhigh`, or `max`, and it affects every output token, including tool calls. Claude Opus 5.5
defaults to `medium`, and its adaptive thinking is always on (`thinking: {"type": "disabled"}`
returns a 400). In a multi-agent system, set effort per role. Simple lookup subagents often do
fine at `low` while the coordinator stays higher.

**Task budgets** tell Claude how many tokens a whole agentic loop has. Claude sees a countdown and
paces itself to finish cleanly.

```python
with client.beta.messages.stream(
    model="claude-opus-5-5",
    max_tokens=64000,
    betas=["task-budgets-2026-03-13"],
    output_config={"effort": "medium", "task_budget": {"type": "tokens", "total": 60000}},
    messages=[{"role": "user", "content": "Audit the repo for unused dependencies."}],
) as stream:
    response = stream.get_final_message()
```

Task budgets are advisory. Claude can go over to finish an action, and `max_tokens` remains the
hard per-request ceiling. The minimum total is 20,000 tokens. A budget that's far too small can
make Claude scope the task down or decline it, so size budgets from your real task lengths. For
hard spend caps, use a Managed Agents session budget, or `max_budget_usd` in the Agent SDK, which
ends the run with `error_max_budget_usd`.

---

## Checklist before you ship

- [ ] The use case passed all four screening questions, and irreversible actions have a checkpoint.
- [ ] Tool descriptions are detailed, schemas are strict where inputs matter, and failures return `is_error`.
- [ ] Parallel results go back in one message, and every loop has an iteration cap.
- [ ] `pause_turn` and mixed server and client turns are handled.
- [ ] Context has a plan: compaction, clearing, memory, or subagents.
- [ ] Subagents get bounded slices and report failures honestly.
- [ ] Destructive actions are denied or gated by hooks or permission policies, and every call is logged.
- [ ] An outcome-graded eval runs over several trials, and someone reads the failing transcripts.
- [ ] Effort is tuned per role, and budgets cap both pacing and spend.
