# Building Agents with Claude

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Design, wire, guard, and evaluate production Claude agents, from the tool-use loop to hosted Managed Agents.**

Group: build · Level: advanced · ~10 h · For: Developers and architects who already call the Claude API and now need to build, operate, and justify autonomous agents.

## Take alongside

- [Building with the Claude API](https://anthropic.skilljar.com/claude-with-the-anthropic-api) — Anthropic Academy
- [Introduction to subagents](https://anthropic.skilljar.com/introduction-to-subagents) — Anthropic Academy
- [Introduction to Model Context Protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol) — Anthropic Academy
- [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) — Claude Docs
- [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview) — Claude Docs
- [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) — Claude Code Docs
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic Engineering

## Workflow or agent: deciding what to build

Separate tasks that fit a predefined code path from tasks that need a model to choose its own steps, and screen agent candidates before writing code.

**You will be able to:**

- Distinguish a workflow from an agent by who controls the sequence of steps
- Score a use case on complexity, value, viability, and cost of error
- Choose the simplest design that meets the requirement
- Identify where a human checkpoint makes an agent safe to run

**Key points**

- A workflow runs model calls and tools through code paths you wrote in advance. An agent lets the model decide which tools to call and when it is done.
- Common workflow shapes are prompt chaining, routing, parallelization, orchestrator-workers, and evaluator-optimizer. Many production needs stop there.
- Agents earn their extra cost and latency on open-ended work where the number of steps cannot be predicted in advance.
- Screen a candidate on four questions: is it complex enough to need autonomy, is the outcome worth the spend, can the model actually do the hard parts, and what happens when it is wrong.
- Low-risk agent work has recoverable errors: tests, review, drafts, or rollback catch mistakes before they reach a customer.
- Each extra autonomous turn adds tokens, latency, and another chance for an early mistake to compound, so start simple and add autonomy only when evals show you need it.

**Practice:** List three automation ideas from your own work. For each, write one line per screening question (complexity, value, viability, cost of error) and decide: single call, workflow, or agent. Note where you would add a human checkpoint.

**Read:** [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) · [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)

<details><summary>Flashcards</summary>

**Q:** Workflow vs agent: what is the difference?  
**A:** A workflow runs model calls and tools through code paths you wrote in advance. An agent lets the model decide its own steps and tool calls until it judges the task done.

**Q:** Four screening questions before building an agent  
**A:** Is the task complex enough to need autonomy? Is the outcome valuable enough to justify cost and latency? Can the model do the hard parts? What does an error cost, and can it be caught?

**Q:** Why do recoverable errors make a task a better agent candidate?  
**A:** When tests, review, drafts, or rollback catch mistakes before they reach anyone, the cost of an autonomous error stays low.

</details>

### Check your understanding

*Study area: Agent Architecture · medium*

A finance team wants Claude to sort each inbound invoice into one of five fixed categories and then post it to the matching queue. The steps are the same for every invoice. What should they build?

- **A.** A workflow: one classification call followed by code that posts to the chosen queue
- **B.** An autonomous agent with a tool per queue so the model can plan its own steps
- **C.** A coordinator agent that delegates each invoice to a specialist subagent
- **D.** A scheduled Managed Agents deployment that polls the inbox and decides each step

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

When the sequence of steps is known and fixed, a workflow with predefined code paths is simpler, cheaper, and easier to test than an agent. This is the routing pattern: classify, then dispatch in code.

_Why a tempting wrong answer misses:_ Giving the model autonomy over a fixed two-step process adds cost, latency, and failure modes without adding capability. Agents fit open-ended tasks whose steps cannot be predicted.

Reference: https://www.anthropic.com/engineering/building-effective-agents

</details>

---

*Study area: Agent Architecture · hard*

A team is screening four agent candidates on complexity, value, viability, and cost of error. Which candidate is the weakest fit for autonomous execution?

- **A.** Triaging repository issues, where every proposed change passes tests and review first
- **B.** Researching competitors, where a person reads the report before anyone acts on it
- **C.** Fixing flaky CI jobs, where the agent's changes land only as draft pull requests
- **D.** Issuing irreversible customer refunds, where a wrong decision is costly and rarely noticed

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Cost of error is the deciding factor here: an action that is expensive, irreversible, and hard to detect is a poor candidate for autonomy without a human checkpoint.

_Why a tempting wrong answer misses:_ The other three all have recoverable errors. Tests, review, a human reader, or draft pull requests catch mistakes before they cause harm, which keeps autonomy low-risk.

Reference: https://www.anthropic.com/engineering/building-effective-agents

</details>

---

## Tool use fundamentals

Define tools Claude can select reliably, then run the request, execute, and return loop with correctly paired results and honest error reporting.

**You will be able to:**

- Write a tool definition with a name, a detailed description, and an input_schema
- Drive the client-tool loop on stop_reason
- Pair each tool_result to its tool_use block by id
- Report tool failures with is_error so Claude can recover

**Key points**

- A user-defined tool has a name matching ^[a-zA-Z0-9_-]{1,128}$, a plaintext description, and a JSON Schema input_schema. Detailed descriptions are the biggest lever on tool selection; aim for several sentences.
- Claude never runs your code. It emits a tool_use block with an id, a name, and an input object, and the response ends with stop_reason "tool_use".
- You reply with a user message whose tool_result blocks carry tool_use_id equal to the id of the call they answer.
- Tool results must immediately follow the assistant turn that requested them, and inside that user message every tool_result block comes before any text.
- When a tool fails, return a tool_result with is_error: true and a useful message. Claude can then retry, change inputs, or explain the failure.
- Keep untrusted content such as web pages or inbound email inside tool_result blocks, not in the system prompt, to limit indirect prompt injection.
- The loop continues while stop_reason is "tool_use" and exits on end_turn, max_tokens, stop_sequence, or refusal, each of which your code should handle.

**Practice:** Write one tool definition for a function you already have (for example, an order lookup). Run a manual loop with claude-opus-5-5, then make the function raise and confirm your loop returns is_error: true and Claude responds sensibly.

**Read:** [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) · [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls)

<details><summary>Flashcards</summary>

**Q:** What three fields make up a user-defined tool?  
**A:** name (matching ^[a-zA-Z0-9_-]{1,128}$), description (detailed plaintext), and input_schema (JSON Schema). input_examples is optional.

**Q:** How does a tool_result find the call it answers?  
**A:** Its tool_use_id equals the id of the tool_use block from the previous assistant turn.

**Q:** How do you report a failed tool run to Claude?  
**A:** Return the tool_result with is_error: true and a message describing the failure, so Claude can retry, adjust, or explain.

</details>

### Check your understanding

*Study area: Tool Use · easy*

Claude's response ends with stop_reason "tool_use" and contains a tool_use block with id toolu_01X. Your code has run the tool. What do you send next?

- **A.** An assistant message that contains the tool output as plain text
- **B.** A system prompt update that lists the tool output under the tool's name
- **C.** A user message with a tool_result block whose tool_use_id is toolu_01X
- **D.** A user text message that begins with the tool name and then the output

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Client tool results go back in a user message as tool_result blocks, each paired to its call by tool_use_id matching the tool_use block's id.

_Why a tempting wrong answer misses:_ Putting output in an assistant message, the system prompt, or loose user text breaks the pairing the API requires, so Claude cannot tell which call the output answers.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls

</details>

---

*Study area: Tool Use · medium*

Your inventory tool times out while Claude is mid-task. How should your loop report this so Claude can recover?

- **A.** Drop the tool_use block from history and resend the request without it
- **B.** Return a tool_result with is_error set to true and a message describing the timeout
- **C.** Return an empty tool_result so Claude treats the call as a success with no data
- **D.** Raise the exception to the end user and stop replying to Claude entirely

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

is_error: true tells Claude the call failed, and the message tells it why. Claude can then retry, change its inputs, pick another tool, or explain the problem.

_Why a tempting wrong answer misses:_ An empty success result misleads Claude into reasoning from missing data, and deleting the tool_use block leaves the history inconsistent with what Claude actually asked for.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls

</details>

---

## Parallel calls, strict tools, and tool_choice

Handle several tool calls in one turn, guarantee schema-valid inputs, and know which tool_choice settings current models accept.

**You will be able to:**

- Return every parallel result in a single user message
- Turn on strict: true and explain what it guarantees
- Choose a tool_choice setting that current models accept
- Disable parallel tool use when ordering matters

**Key points**

- Parallel tool use is on by default: one assistant turn can contain several tool_use blocks.
- Send all the tool_result blocks for that turn together in one user message. Splitting them across separate messages is a documented anti-pattern that teaches Claude to stop parallelizing.
- disable_parallel_tool_use: true lives inside the tool_choice object, not at the top level. With auto, Claude calls at most one tool per response.
- strict: true on a tool definition uses grammar-constrained sampling so the input always matches your input_schema and the tool name is always valid.
- On Claude Opus 5.5, Sonnet 5.5, and Fable 5.1, tool_choice types any and tool return a 400. Use auto (optionally with strict tools) or structured outputs instead; none is also supported.
- strict does not force a call and does not validate what your function returns. It only constrains the inputs Claude generates.

**Practice:** Add strict: true to a tool whose schema has an integer field. Ask a question that triggers two calls at once, confirm you get two tool_use blocks, and answer both in one user message.

**Read:** [Parallel tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use) · [Strict tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use) · [Define tools: forcing tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)

<details><summary>Flashcards</summary>

**Q:** Where do parallel tool results go?  
**A:** All of them in one user message, directly after the assistant turn. Separate messages per result discourage parallel calls.

**Q:** What does strict: true guarantee?  
**A:** Tool inputs match the input_schema and the tool name is valid, via grammar-constrained sampling. It does not force a call or check your function's output.

**Q:** tool_choice any or tool on Opus 5.5?  
**A:** Returns a 400 on Opus 5.5, Sonnet 5.5, and Fable 5.1. Use auto (with strict tools) or structured outputs; none also works.

</details>

### Check your understanding

*Study area: Tool Use · medium*

Claude returns three tool_use blocks in one turn. Your code sends back three separate user messages, one tool_result each. What is the problem?

- **A.** Nothing; one user message per result is fine as long as the ids match
- **B.** All three tool_result blocks belong together in one user message after that turn
- **C.** The results must be returned in reverse order so the newest call is first
- **D.** Each result must repeat the tool name and input so Claude can match it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Every result for a parallel turn goes in a single user message directly after the assistant turn. The docs call separate messages per result a mistake that also reduces future parallel tool use.

_Why a tempting wrong answer misses:_ Matching ids is necessary but not sufficient: results must immediately follow the assistant turn, which separate messages violate. Order and repeated inputs are not the pairing mechanism; ids are.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use

</details>

---

*Study area: Tool Use · hard*

On claude-opus-5-5, a team sets tool_choice to {"type": "tool", "name": "extract_invoice"} to guarantee schema-valid extraction and gets a 400 error. What is the documented fix?

- **A.** Use tool_choice auto and set strict: true on the extract_invoice definition
- **B.** Add disable_parallel_tool_use: true so the forced call is accepted
- **C.** Keep the forced choice and set thinking to disabled on the request
- **D.** Move the schema into the system prompt and ask for raw JSON text

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Opus 5.5, Sonnet 5.5, and Fable 5.1 reject tool_choice any and tool with a 400. The docs point to auto with strict tool use to guarantee schema-valid inputs, or structured outputs for a fixed JSON response.

_Why a tempting wrong answer misses:_ disable_parallel_tool_use does not unlock forcing, and on Opus 5.5 disabling thinking is itself a 400 because adaptive thinking is always on. Prompt-only JSON gives no schema guarantee.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools

</details>

---

*Study area: Tool Use · medium*

Which TWO statements about setting strict: true on a tool definition are accurate? (Select 2.)

- **A.** Claude's tool inputs are constrained so they always match the input_schema
- **B.** Claude is required to call that tool on every turn of the conversation
- **C.** The tool name in each tool_use block is always a tool you provided
- **D.** The tool no longer needs a description because the schema is enforced
- **E.** The API validates the result your function returns against the schema

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

Strict tool use compiles the input_schema into a grammar, so inputs always conform and the tool name is always valid.

_Why a tempting wrong answer misses:_ Strict mode does not force a call, does not replace the description Claude uses to choose tools, and does not inspect what your code returns.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use

</details>

---

## Choosing a harness: manual loop, Tool Runner, Agent SDK, Managed Agents

Decide who supplies the agent loop and who supplies the runtime, from a hand-written loop to a fully hosted agent.

**You will be able to:**

- Compare the four ways to run a Claude agent by who owns the loop and the runtime
- Pick the manual loop when you need per-call control
- Describe what the SDK Tool Runner automates
- Explain when the Agent SDK or Managed Agents fits better than the client SDK

**Key points**

- Manual loop: you call the Messages API, execute tools, append results, and decide when to stop. You own everything, including approval, logging, and retries.
- Tool Runner (beta, client SDKs): define tools with a helper such as @beta_tool in Python, call client.beta.messages.tool_runner, and it runs tools, appends results, and loops until no tool is called or max_iterations is reached.
- When a Tool Runner tool raises, the runner returns a tool_result with is_error: true carrying the exception's message, not the stack trace.
- The docs recommend the manual loop over the Tool Runner when you need human-in-the-loop approval, custom logging, or conditional execution.
- Claude Agent SDK (Python and TypeScript): a library that runs Claude Code's agent loop, built-in tools, hooks, permissions, sessions, and subagents inside a process you operate and deploy.
- Claude Managed Agents (beta, managed-agents-2026-04-01): Anthropic hosts the harness and runs sessions in a managed cloud sandbox or a self-hosted sandbox. You configure it through the Claude API rather than writing a loop.

**Practice:** Take the loop you built in module 2 and rewrite it with the Python Tool Runner. Then list which parts of your original loop the runner replaced and which control you gave up.

**Read:** [Tool Runner (SDK)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner) · [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) · [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)

<details><summary>Flashcards</summary>

**Q:** What does the SDK Tool Runner automate?  
**A:** Running tools when Claude calls them, appending results, managing conversation state, and looping until no tool is called or max_iterations is hit.

**Q:** Agent SDK vs Managed Agents: who runs the harness?  
**A:** Agent SDK: Claude Code's loop runs as a library in a process you operate. Managed Agents: Anthropic hosts the harness and runs sessions in a managed or self-hosted sandbox.

**Q:** When do the docs point you to the manual loop instead of the Tool Runner?  
**A:** When you need human-in-the-loop approval, custom logging, or conditional execution per tool call.

</details>

### Check your understanding

*Study area: Agent Construction with Claude · medium*

A Python service calls the Messages API and must get a human's approval before one sensitive tool runs, plus write a custom audit log for every call. Which approach does the documentation recommend?

- **A.** The SDK Tool Runner with max_iterations set to 1 on every request
- **B.** Server tools, so the approval step runs on Anthropic's infrastructure
- **C.** A Managed Agents session with the agent toolset set to always_allow
- **D.** A manual loop that inspects each tool_use block before running it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The Tool Runner docs say to use the manual loop when you need human-in-the-loop approval, custom logging, or conditional execution, because you control each call before it runs.

_Why a tempting wrong answer misses:_ max_iterations only bounds the loop; it does not add an approval step. always_allow is the opposite of approval, and server tools execute without your code in the path.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner

</details>

---

*Study area: Agent Construction with Claude · medium*

A team wants Claude Code's built-in file and shell tools, hooks, and permission rules embedded in their own Python service, deployed on servers they operate. Which option fits?

- **A.** Claude Managed Agents, which runs the harness in an Anthropic-hosted sandbox
- **B.** The client SDK Tool Runner, which ships Claude Code's file and shell tools
- **C.** The Claude Agent SDK, which runs Claude Code's agent loop inside your own process
- **D.** The Messages API with server tools, which edits files on Anthropic's side

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The Agent SDK is a Python and TypeScript library that gives you Claude Code's tools, agent loop, hooks, permissions, and sessions in a process you operate.

_Why a tempting wrong answer misses:_ Managed Agents moves the harness to Anthropic's infrastructure, which is the opposite of the requirement. The Tool Runner only loops over tools you define; it does not include Claude Code's built-in tools.

Reference: https://code.claude.com/docs/en/agent-sdk/overview

</details>

---

## Server tools and pause_turn

Use tools Anthropic executes, such as web search, web fetch, and code execution, and continue turns that pause or wait on your client tools.

**You will be able to:**

- Distinguish server tools from client tools by where they execute
- Continue a paused turn correctly
- Resume a turn that mixes a server tool with a client tool
- Control server tool scope and spend

**Key points**

- Server tools (web_search, web_fetch, code_execution, tool_search) run on Anthropic's infrastructure. Their calls appear as server_tool_use blocks with srvtoolu_ ids, and you never write a tool_result for them.
- A single request can trigger several server-side iterations. If the server loop hits its iteration cap, the response ends with stop_reason "pause_turn".
- To continue a paused turn, send the paused assistant content back as-is with the same tools array, and cap how many continuations you allow.
- If Claude calls a server tool and a client tool in the same turn, the response ends with tool_use and the server_tool_use block has no result yet. Reply with only the client tool_result blocks and keep the same tools; the API then runs the deferred server tool.
- Web search costs $10 per 1,000 searches plus tokens, and max_uses caps searches per request. allowed_domains or blocked_domains (not both) restrict where web tools can reach.
- Code execution is free when the request also includes web_search_20260209 or web_fetch_20260209 or later; otherwise container hours are billed after the monthly free allowance.

**Practice:** Enable web search with max_uses set to 3 and ask a research question. Write the loop so it handles pause_turn by resending the assistant content, with a cap of three continuations.

**Read:** [Server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools) · [Web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) · [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)

<details><summary>Flashcards</summary>

**Q:** What does stop_reason pause_turn mean?  
**A:** The server-side tool loop hit its iteration cap before finishing. Send the assistant content back as-is with the same tools to continue.

**Q:** Do you write tool_result blocks for server tools?  
**A:** No. Anthropic executes web search, web fetch, code execution, and tool search; their results arrive in the response.

**Q:** Server tool and client tool in the same turn: how do you resume?  
**A:** Send a user message with only the client tool_result blocks and keep the same tools array. The API then runs the waiting server tool.

</details>

### Check your understanding

*Study area: Tool Use · medium*

A request using the web search tool returns stop_reason "pause_turn". What should your code do?

- **A.** Show the partial text to the user as the final answer and end the turn
- **B.** Write a tool_result block for each server_tool_use block and resend
- **C.** Send the assistant content back as-is in a new request with the same tools
- **D.** Retry the original request from scratch with a higher max_uses value

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

pause_turn means the server-side loop stopped before finishing. Passing the paused response back unchanged, with the same tools, lets Claude continue. Cap how many continuations you allow.

_Why a tempting wrong answer misses:_ You never write tool_result blocks for server tools, and restarting throws away the work already done. The paused text is not a finished answer.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools

</details>

---

*Study area: Tool Use · hard*

A response ends with stop_reason "tool_use". It contains a web_fetch server_tool_use block with no result block and a tool_use block for your run_command tool. How do you continue?

- **A.** Send tool_result blocks for both calls, using an empty result for web_fetch
- **B.** Send only the run_command tool_result and keep the same tools array in the request
- **C.** Resend the assistant content with no user message, as you would for pause_turn
- **D.** Send the run_command result followed by a text block asking Claude to fetch again

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

When a server tool and a client tool are called together, the API defers the server tool. Reply with only the client tool_result blocks and keep the same tools; the API then runs web_fetch and Claude continues.

_Why a tempting wrong answer misses:_ You never answer server tools yourself. Adding text after the results ends the turn early and, for a server tool Claude called directly, the request fails with a 400. Dropping web_fetch from tools also fails.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools

</details>

---

*Study area: Tool Use · medium*

Which TWO statements about server tools such as web search and code execution are accurate? (Select 2.)

- **A.** Every server tool requires an anthropic-beta header on each request
- **B.** Anthropic executes them, so you never write tool_result blocks for their calls
- **C.** They cannot be combined with client tools in the same request
- **D.** Their calls appear as server_tool_use blocks whose ids start with srvtoolu_
- **E.** Content they return is excluded from input token billing

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, D**

Server tools run on Anthropic's infrastructure. Their calls show up as server_tool_use blocks with srvtoolu_ ids, and results arrive in the response without any tool_result from you.

_Why a tempting wrong answer misses:_ The current code execution versions need no beta header, server and client tools can be mixed in one turn, and web search results count as input tokens.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools

</details>

---

## Context management for long-running agents

Keep long agent runs inside the context window and focused by summarizing, clearing, persisting to memory, and isolating work in subagents.

**You will be able to:**

- Choose between compaction and context editing for a given problem
- Configure threshold compaction and pass compaction blocks back
- Use the memory tool for knowledge that must outlive a conversation
- Use subagents to keep exploratory work out of the parent's context

**Key points**

- Compaction replaces older turns with a summary Claude writes on the server. Response quality degrades as context grows, so compaction also keeps the active context small.
- Threshold compaction (beta, compact-2026-01-12) uses the compact_20260112 edit in context_management. The default trigger is 150,000 input tokens and the minimum is 50,000. Append the response, compaction block included, and the API ignores everything before it.
- Compaction on demand (beta, compact-2026-09-04) lets your code decide when to summarize, and the docs recommend it wherever it is available.
- Context editing (beta, context-management-2025-06-27) clears by rule instead of summarizing. clear_tool_uses_20250919 removes the oldest tool results past a trigger (default 100,000 input tokens) and keeps the most recent few (default 3).
- The memory tool (memory_20250818) is client-side. Claude asks for view, create, str_replace, insert, delete, and rename operations under /memories, and your code performs them against storage you control. Guard against path traversal.
- A subagent runs in its own conversation. Its intermediate tool calls stay inside it and only its final message returns to the parent, which keeps the parent's context clean.

**Practice:** Run a long tool-heavy task twice: once with clear_tool_uses_20250919 at a low trigger, once with threshold compaction. Compare the context_management and usage fields and note which details each approach lost.

**Read:** [Compaction overview](https://platform.claude.com/docs/en/build-with-claude/compaction) · [Compaction at a token threshold](https://platform.claude.com/docs/en/build-with-claude/compaction-threshold) · [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing) · [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)

<details><summary>Flashcards</summary>

**Q:** Compaction vs context editing  
**A:** Compaction summarizes older turns into a compaction block. Context editing clears content by rule, such as the oldest tool results, without summarizing.

**Q:** Where does the memory tool store data?  
**A:** Wherever your code puts it. The tool is client-side: Claude requests file operations under /memories and your handler executes them.

**Q:** Why use a subagent for exploratory research?  
**A:** Its intermediate tool calls and results stay in its own context; only its final message returns, so the parent's context stays small.

</details>

### Check your understanding

*Study area: Agent Patterns and Frameworks · hard*

You enable threshold compaction (compact_20260112). A response starts with a compaction block. What must your client do on the next request?

- **A.** Append the response content, compaction block included, to the messages array
- **B.** Strip the compaction block and resend the original full message history
- **C.** Move the summary into the system prompt and clear the messages array
- **D.** Raise the trigger value and resend so the summary is no longer needed

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

You pass the compaction block back on later requests. The API ignores everything before it and continues from the summary, so appending the whole response is the simplest correct pattern.

_Why a tempting wrong answer misses:_ Stripping the block brings back the full history the summary replaced, and moving the summary elsewhere loses the block the API needs to continue from it.

Reference: https://platform.claude.com/docs/en/build-with-claude/compaction-threshold

</details>

---

*Study area: Agent Patterns and Frameworks · medium*

Your main agent must survey dozens of files to answer one question, but you want its context to stay small for the rest of the task. What should you do?

- **A.** Keep the survey in the main loop and raise max_tokens for the parent agent
- **B.** Keep the survey in the main loop and paste its findings into the system prompt
- **C.** Delegate the survey to a subagent that shares the parent's full conversation
- **D.** Delegate the survey to a subagent so only its final message returns to the parent

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A subagent runs in its own conversation. Its intermediate tool calls and file contents stay inside it, and only its final message comes back, which is the context-isolation benefit.

_Why a tempting wrong answer misses:_ max_tokens limits output, not the input context that file contents fill. A subagent that shares the parent's whole conversation gives up the isolation you wanted.

Reference: https://code.claude.com/docs/en/agent-sdk/subagents

</details>

---

*Study area: Agent Patterns and Frameworks · medium*

Which TWO statements about the memory tool (memory_20250818) are accurate? (Select 2.)

- **A.** Anthropic stores the memory files on its servers between your requests
- **B.** It is client-side: your code executes the file operations Claude requests
- **C.** You must write an input_schema for it like any user-defined tool
- **D.** Its files are discarded when the conversation that created them ends
- **E.** Your handler should restrict every operation to the /memories directory

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, E**

The memory tool is Anthropic-schema and client-executed. Claude asks for operations under /memories, and your handler maps them onto storage you control, with path-traversal checks.

_Why a tempting wrong answer misses:_ You declare it with a type and name only, with no input_schema. Anthropic does not host the files, and the point of the tool is persistence across conversations.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool

</details>

---

## Multi-agent orchestration

Split work across a coordinator and specialist agents so each gets a clean context, and pass findings and failures back in a form the coordinator can act on.

**You will be able to:**

- Decide when a coordinator with subagents beats a single agent
- Partition work into bounded, non-overlapping tasks
- Specify what each subagent returns to the coordinator
- Propagate subagent failures without hiding them

**Key points**

- Multi-agent designs pay off for parallel fan-out over independent subtasks, for specialization (focused prompts and tools per role), and for escalating hard pieces to a stronger model.
- Give each subagent a distinct slice, an objective, a scope boundary, and an output format. Vague, overlapping briefs produce duplicated work.
- Subagents do not see the coordinator's history unless you pass it. Put everything a subagent needs into its task description.
- Have subagents return condensed findings, not raw transcripts, so the coordinator's context holds conclusions rather than intermediate tool output.
- When a subagent fails, it should say what it tried, what it got, and why it stopped, so the coordinator can retry, reroute, or report a gap. An empty result dressed up as success hides the failure.
- In Claude Managed Agents, a coordinator declares its roster in multiagent.agents (up to 20 unique agents). Delegation is one level deep, and each agent runs in its own context-isolated session thread over a shared sandbox.
- In the Agent SDK, subagents can spawn their own subagents, three layers deep by default, and you can cap depth, concurrency, and spend.

**Practice:** Design a three-subagent research task on paper. For each subagent, write its slice, its tools, its output schema, and the failure report it returns. Check that no two slices overlap.

**Read:** [Multiagent orchestration (Managed Agents)](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration) · [Subagents in the SDK](https://code.claude.com/docs/en/agent-sdk/subagents) · [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)

<details><summary>Flashcards</summary>

**Q:** Three patterns where multi-agent helps  
**A:** Parallel fan-out over independent subtasks, specialization with focused prompts and tools, and escalation of hard pieces to a stronger model.

**Q:** What should a subagent return when it fails?  
**A:** What it tried, any partial results, and why it stopped, so the coordinator can retry, reroute, or report the gap.

**Q:** Managed Agents delegation depth  
**A:** One level. A coordinator whose roster references an agent with its own multiagent roster fails validation. Up to 20 unique agents per roster.

</details>

### Check your understanding

*Study area: Agent Patterns and Frameworks · medium*

A coordinator spawns four research subagents with the same broad prompt. They return largely duplicate findings and miss whole areas. What is the best fix?

- **A.** Spawn more subagents with the same prompt so the coordinator can vote on results
- **B.** Let every subagent read the others' transcripts so they notice overlap on their own
- **C.** Remove the coordinator and have the four subagents co-write the final report
- **D.** Give each subagent a distinct, bounded slice of the question and a defined output format

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Subagents only know what their task description tells them. Clear, non-overlapping slices with objectives, boundaries, and output formats prevent duplication and gaps.

_Why a tempting wrong answer misses:_ More identical briefs multiply the duplication, and sharing full transcripts floods each context, which undoes the isolation that makes subagents useful.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

*Study area: Agent Patterns and Frameworks · hard*

A subagent's search tool keeps failing, so it cannot finish its slice of a research task. What should it return to the coordinator?

- **A.** An empty result marked as success so the coordinator's synthesis is not blocked
- **B.** A request to end the whole session so no report uses incomplete information
- **C.** A structured failure noting what it tried, any partial results, and the cause
- **D.** Nothing until the search succeeds, retrying the same call without any limit

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Propagating the failure with context lets the coordinator decide whether to retry, reroute to another source, or report a known gap in the final answer.

_Why a tempting wrong answer misses:_ Reporting an empty success hides the failure, so the coordinator presents incomplete work as complete. Unbounded retries waste budget, and ending the session discards the other subagents' work.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

*Study area: Agent Architecture · medium*

In Claude Managed Agents, you add an agent to a coordinator's multiagent roster, and that agent has its own multiagent roster. What happens?

- **A.** The request succeeds and delegation nests to any depth you need
- **B.** The create or update request fails with a validation error
- **C.** The nested roster is ignored silently when a session later runs
- **D.** The nested agent runs, but only inside the session's primary thread

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Managed Agents coordinators delegate one level deep. Referencing an agent that has its own multiagent.agents roster fails validation when the coordinator is created or updated.

_Why a tempting wrong answer misses:_ Unlimited nesting describes neither surface: the Agent SDK allows three layers by default with a configurable cap, and Managed Agents allows one.

Reference: https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration

</details>

---

## Hooks, permissions, and human-in-the-loop

Put deterministic guardrails around what an agent can do: block destructive actions, require approval for sensitive ones, and log everything.

**You will be able to:**

- Block a dangerous tool call with a PreToolUse hook
- Explain the Agent SDK permission evaluation order
- Configure Managed Agents permission policies per toolset and per tool
- Route approvals to a human and resume the agent

**Key points**

- Agent SDK hooks are callbacks on lifecycle events. PreToolUse runs before a tool executes and can deny it with permissionDecision "deny"; PostToolUse sees the result and suits auditing.
- The SDK checks hooks first, then deny rules, then the permission mode, then allow rules, then the canUseTool callback. A matching deny rule blocks a call even in bypassPermissions mode.
- A bare deny such as Bash removes the tool from Claude's context; a scoped deny such as Bash(rm *) keeps the tool and blocks matching calls.
- Permission modes include default, dontAsk, acceptEdits, bypassPermissions, plan, and auto. Pair allowedTools with dontAsk for a locked-down agent.
- Managed Agents permission policies are always_allow, always_ask, and auto. The agent toolset defaults to always_allow and MCP toolsets default to always_ask; the configs array overrides individual tools.
- Under always_ask the session goes idle with stop_reason requires_action. You reply with a user.tool_confirmation event whose result is allow or deny, optionally with a deny_message.
- Prevent destructive actions in layers: scope credentials and network, deny the dangerous patterns, require approval for irreversible calls, and keep an audit trail.

**Practice:** Write a PreToolUse hook (or the equivalent check in your manual loop) that denies any shell command containing rm -rf or DROP TABLE, logs every other call, and returns a clear reason Claude can relay.

**Read:** [Hooks (Agent SDK)](https://code.claude.com/docs/en/agent-sdk/hooks) · [Configure permissions (Agent SDK)](https://code.claude.com/docs/en/agent-sdk/permissions) · [Permission policies (Managed Agents)](https://platform.claude.com/docs/en/managed-agents/permission-policies)

<details><summary>Flashcards</summary>

**Q:** Agent SDK permission evaluation order  
**A:** Hooks, then deny rules, then permission mode, then allow rules, then the canUseTool callback. Deny rules apply even in bypassPermissions.

**Q:** Managed Agents default permission policies  
**A:** The agent toolset defaults to always_allow; MCP toolsets default to always_ask. auto lets the server run, deny, or pause each call.

**Q:** How do you approve a paused tool call in Managed Agents?  
**A:** Send a user.tool_confirmation event with the blocking event's id as tool_use_id and result allow or deny (optionally a deny_message).

</details>

### Check your understanding

*Study area: Agent Construction with Claude · medium*

An Agent SDK agent must never write to .env files, and the check needs custom logic on the file path. Where should that logic run?

- **A.** A PreToolUse hook that returns a deny decision when the path is a .env file
- **B.** A PostToolUse hook that reverts the file once the write has completed
- **C.** A Stop hook that scans the final message for any mention of .env files
- **D.** The acceptEdits permission mode so that edits are reviewed automatically

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

PreToolUse runs before the tool executes and can return permissionDecision "deny" with a reason, so the write never happens and Claude can explain why.

_Why a tempting wrong answer misses:_ PostToolUse fires after the write, so the damage is already done. acceptEdits auto-approves file edits, which is the opposite of blocking them.

Reference: https://code.claude.com/docs/en/agent-sdk/hooks

</details>

---

*Study area: Agent Construction with Claude · hard*

An Agent SDK agent runs with disallowed_tools=["Bash(rm *)"] and permission mode bypassPermissions. Claude tries to run rm -rf build. What happens?

- **A.** The call is denied, because matching deny rules apply even in bypassPermissions
- **B.** The call runs, because bypassPermissions skips every permission check
- **C.** The call waits for the canUseTool callback before the mode is applied
- **D.** The Bash tool is removed from the request, so Claude cannot attempt it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Deny rules are checked before the permission mode, and a matching deny rule blocks the call in every mode, including bypassPermissions.

_Why a tempting wrong answer misses:_ Only a bare deny such as Bash removes the tool from Claude's context. A scoped rule like Bash(rm *) leaves Bash available and blocks just the matching calls.

Reference: https://code.claude.com/docs/en/agent-sdk/permissions

</details>

---

*Study area: Agent Architecture · medium*

In Claude Managed Agents, you want every bash call to wait for a human while the rest of the agent toolset runs freely. What do you configure, and how is a call approved?

- **A.** Set networking to limited and approve calls by adding hosts to allowed_hosts
- **B.** Remove bash from the toolset and run each command yourself via user.message
- **C.** Set the whole toolset to auto and send user.interrupt when a call looks risky
- **D.** Set bash to always_ask in the toolset configs and reply with user.tool_confirmation

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A configs entry overrides one tool's policy. Under always_ask the session goes idle with requires_action, and a user.tool_confirmation event with result allow or deny resolves it.

_Why a tempting wrong answer misses:_ Networking controls sandbox egress, not tool approval, and auto lets the server run or deny calls on its own rather than routing every bash call to you.

Reference: https://platform.claude.com/docs/en/managed-agents/permission-policies

</details>

---

## Claude Managed Agents concepts

Learn the resources a hosted agent is built from and how they fit together: agents, environments, sessions, events, vaults, and scheduled deployments.

**You will be able to:**

- Name what each Managed Agents resource holds
- Keep end-user credentials out of prompts with vaults
- Pin a session to an agent version or override it for one run
- Schedule recurring runs with a per-run budget

**Key points**

- An agent is a reusable, versioned configuration: model, system prompt, tools, MCP servers, and skills. Updating it creates a new version.
- An environment defines where sessions run: packages, networking (unrestricted or limited with allowed_hosts), and cloud or self-hosted sandboxes. Each session gets its own isolated container.
- A session is a running instance of an agent in an environment. You send events such as user.message, and Claude streams progress back; history is stored server-side.
- A vault holds one end user's credentials (up to 20). Pass vault_ids at session creation. MCP credentials are injected by server URL; environment-variable credentials are swapped in at egress so the agent never sees the secret.
- A scheduled deployment starts sessions on a POSIX cron expression in an IANA timezone. It needs an agent, an environment, and at least one initial event; each attempt produces a deployment run record.
- A deployment's budget is copied onto every session it starts, so it caps each run separately rather than across runs.
- Managed Agents is stateful, so it is not currently eligible for Zero Data Retention or HIPAA BAA coverage.

**Practice:** Sketch the resources for a nightly dependency-audit agent: the agent config, a limited-network environment, a vault for a GitHub token, and a deployment with a cron schedule and per-run budget.

**Read:** [Define your agent](https://platform.claude.com/docs/en/managed-agents/agent-setup) · [Cloud environment setup](https://platform.claude.com/docs/en/managed-agents/environments) · [Authenticate with vaults](https://platform.claude.com/docs/en/managed-agents/vaults) · [Scheduled deployments](https://platform.claude.com/docs/en/managed-agents/scheduled-deployments)

<details><summary>Flashcards</summary>

**Q:** Managed Agents: agent vs environment vs session  
**A:** Agent: versioned model, prompt, tools, MCP servers, skills. Environment: sandbox config such as packages and networking. Session: a running agent in an environment.

**Q:** What is a vault for?  
**A:** Storing one end user's credentials, referenced by vault_ids at session creation, so secrets never enter prompts. Environment-variable secrets are substituted at egress.

**Q:** What does a scheduled deployment's budget cap?  
**A:** Each session it starts, separately. The cap is copied onto every run; it is not a cumulative ceiling.

</details>

### Check your understanding

*Study area: Agent Architecture · medium*

A SaaS product runs one Managed Agents agent for many customers, and each customer has their own GitHub token. How should the tokens reach each run?

- **A.** Put each token in the agent's system prompt and keep one agent version per customer
- **B.** List each token in the environment's packages field so it is installed in the sandbox
- **C.** Store each customer's token in a vault and pass its vault_ids when creating their session
- **D.** Send each token in the first user.message so the agent can export it as a variable

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Vaults hold per-user credentials and are referenced per session, so the product is managed at the agent level and users at the session level. Secrets are injected by the platform, not placed in prompts.

_Why a tempting wrong answer misses:_ Putting secrets in prompts or messages exposes them to the model and to logs, and one agent version per customer defeats a reusable, versioned agent.

Reference: https://platform.claude.com/docs/en/managed-agents/vaults

</details>

---

*Study area: Agent Architecture · medium*

A Managed Agents scheduled deployment runs hourly with a budget whose max_list_cost amount is "2000". What does that cap bound?

- **A.** The total spend across every run of the deployment in a calendar month
- **B.** Each session the deployment starts, separately, at about $20 per run
- **C.** Only the web searches in each run, with model tokens billed separately
- **D.** The combined spend of all sessions that share the deployment's environment

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A deployment copies its budget onto every session it starts, so the cap applies to each run on its own. Amounts are whole US cents, so "2000" is $20.

_Why a tempting wrong answer misses:_ The docs say the deployment budget is not a cumulative ceiling across runs, and list cost covers model tokens, web searches, and session running time together.

Reference: https://platform.claude.com/docs/en/managed-agents/scheduled-deployments

</details>

---

## Evaluating agents and tuning cost

Measure whether an agent works by reading traces and grading outcomes, then tune effort and budgets so it stays affordable.

**You will be able to:**

- Build an eval from tasks, trials, graders, and transcripts
- Grade outcomes instead of exact tool paths
- Tune effort per role in a multi-agent system
- Apply task budgets, session budgets, and max_tokens correctly

**Key points**

- An agent eval runs tasks over several trials because outputs vary. Graders can be code-based, model-based, or human, and a task can have several.
- The transcript (trace) records every output, tool call, and intermediate result. Read transcripts regularly to confirm that failures are fair and that graders measure what matters.
- Grade the outcome, the state the agent left behind, rather than insisting on one tool sequence, so valid unanticipated solutions still pass.
- Effort (output_config.effort: low, medium, high, xhigh, max) affects all output tokens, including tool calls. Claude Opus 5.5 defaults to medium; low suits simple subagent work.
- Task budgets (beta, task-budgets-2026-03-13) set output_config.task_budget for a whole agentic loop. Claude sees a countdown and paces itself, but the budget is advisory; max_tokens is the hard per-request cap. The minimum total is 20,000 tokens.
- Managed Agents session budgets are hard spend caps in list-price cents. At the cap the session goes idle with stop_reason budget_reached.
- In the Agent SDK, max_turns and max_budget_usd end the loop with error_max_turns or error_max_budget_usd result subtypes.

**Practice:** Pick five tasks for an agent you built. Write an outcome check for each, run three trials at medium and low effort, and compare pass rate, tokens, and one transcript per failure.

**Read:** [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) · [Task budgets](https://platform.claude.com/docs/en/build-with-claude/task-budgets) · [Session budgets (Managed Agents)](https://platform.claude.com/docs/en/managed-agents/budgets) · [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

<details><summary>Flashcards</summary>

**Q:** Why grade outcomes instead of tool paths?  
**A:** Agents can find valid routes you did not anticipate. Checking the end state rewards correct results without penalizing a different path.

**Q:** Task budget vs max_tokens  
**A:** task_budget is an advisory token target across a whole agentic loop that Claude paces against. max_tokens is the enforced per-request output ceiling.

**Q:** Default effort on Claude Opus 5.5  
**A:** medium. Other effort-capable models default to high. Low effort suits simple subagent work.

</details>

### Check your understanding

*Study area: Agent Patterns and Frameworks · medium*

An agent eval checks that the agent called tools in one exact expected sequence. The agent finds a shorter valid route to the correct result and fails. What should change?

- **A.** Add the expected sequence to the system prompt so the agent follows it next time
- **B.** Grade the final outcome, such as the resulting state, rather than the tool sequence
- **C.** Lower the effort level so the agent takes fewer shortcuts on its way to the result
- **D.** Drop the failing tasks from the suite because agent behavior is nondeterministic

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Grading outcomes lets valid solutions you did not anticipate pass. Path checks punish correct results reached a different way.

_Why a tempting wrong answer misses:_ Teaching the agent to follow the grader's path optimizes for the test rather than the task, and deleting tasks hides a grader problem instead of fixing it.

Reference: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

</details>

---

*Study area: Agent Patterns and Frameworks · hard*

A team sets output_config.task_budget with total 50,000 on an agentic loop and expects the API to stop Claude the moment the budget is spent. What is accurate?

- **A.** task_budget is an advisory target across the loop; max_tokens is the enforced per-request cap
- **B.** task_budget is a hard cap, and the API ends the agentic loop once it reaches zero
- **C.** task_budget applies to one request only, while max_tokens spans the whole loop
- **D.** task_budget counts only thinking tokens, so tool results never reduce the countdown

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Claude sees a countdown and paces itself, but the docs call task budgets a soft hint that can be exceeded mid-action. max_tokens is the hard per-request limit on generated tokens.

_Why a tempting wrong answer misses:_ The budget covers the whole agentic turn, not one request, and it counts thinking, tool calls, tool results, and output.

Reference: https://platform.claude.com/docs/en/build-with-claude/task-budgets

</details>

---

*Study area: Agent Patterns and Frameworks · medium*

A coordinator on claude-opus-5-5 fans out many simple lookup subagents. Quality is fine but cost is too high. Which change is supported and most direct?

- **A.** Set thinking to disabled on the subagents so they skip reasoning entirely
- **B.** Raise the coordinator to max effort so it makes fewer subagent calls overall
- **C.** Set temperature to 0 on the subagents so their outputs come back shorter
- **D.** Run the lookup subagents at low effort and leave the coordinator at its current level

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Effort applies to every output token, including tool calls, and low effort is suggested for simple work such as subagents. Tuning it per role cuts cost where quality allows.

_Why a tempting wrong answer misses:_ On Opus 5.5, thinking: disabled returns a 400 because adaptive thinking is always on, and sampling parameters such as temperature are removed on the newest models.

Reference: https://platform.claude.com/docs/en/build-with-claude/effort

</details>

---
