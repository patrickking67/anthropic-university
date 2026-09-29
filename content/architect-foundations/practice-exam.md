# Claude Certified Architect – Foundations — Practice Exam

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. Questions are original and written to teach the publicly documented concepts — they are **not** real exam items.

**117 questions** · Real exam format: 120 min · Passing scaled score 720/1000

*This file is generated from `questions.json` by `scripts/build.mjs`. Do not edit by hand.*

---

### Question 1 of 117

**Scenario: Multi-Agent Research System**
*Study area: Coordinator-subagent orchestration · medium*

Your research coordinator sends every request through the full pipeline of search, document analysis, synthesis, and report generation. Logs show that simple requests such as 'what year was this standard ratified?' take minutes and cost as much as a full literature review. What is the best design change?

- **A.** Have the coordinator assess each request's complexity and invoke only the subagents that request actually needs
- **B.** Keep the fixed pipeline but lower max_tokens on every subagent so that short requests finish sooner and cost less
- **C.** Split the system into two separate deployments, one for simple lookups and one for full literature reviews
- **D.** Cache each subagent's last output so repeated simple requests can skip the search and analysis stages entirely

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A coordinator's job includes deciding which subagents a query requires. Routing everything through the whole pipeline wastes time and tokens on requests that one step could answer; dynamic selection matches effort to query complexity.

_Why a tempting wrong answer misses:_ Lowering max_tokens (B) truncates output without removing the unnecessary stages, so the cost and latency of running four agents remain.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 2 of 117

**Scenario: Multi-Agent Research System**
*Study area: Coordinator-subagent orchestration · hard*

A report on regional water policy comes back well written, but a reviewer notes that it barely covers groundwater rights, a topic the request explicitly named. The subagents did what they were asked. Which coordinator behavior would most reliably close gaps like this before the report ships?

- **A.** Ask the synthesis subagent to write longer reports so that minor topics are less likely to be squeezed out of the draft
- **B.** Evaluate the synthesis against the request's required topics, re-delegate targeted searches for any gaps, then re-run synthesis
- **C.** Run the whole pipeline three times on the same request and merge the three reports into one combined final document
- **D.** Give the report-generation subagent web search so it can fill any missing topics on its own while it formats the report

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

An iterative refinement loop has the coordinator check synthesized output against the goal, send focused follow-up queries to search and analysis for whatever is thin, and synthesize again until coverage is sufficient.

_Why a tempting wrong answer misses:_ Giving the report writer a search tool (D) spreads research across a role that should not do it and bypasses the coordinator, which loses the central check on coverage.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 3 of 117

**Scenario: Multi-Agent Research System**
*Study area: Subagent context and spawning · medium*

You define three AgentDefinition entries for a coordinator built on the Agent SDK. The coordinator's allowedTools lists Read, Grep, and WebSearch. At runtime it never delegates; it tries to do all the research itself. What is the most likely cause?

- **A.** AgentDefinition entries only take effect when each subagent is also registered as a separate MCP server
- **B.** Subagents are disabled by default and must be switched on with a beta header on every coordinator request
- **C.** The coordinator needs a PreToolUse hook that forwards each research request to the right subagent
- **D.** The coordinator's allowedTools omits the Agent tool, so it has no way to spawn the defined subagents

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Subagents are invoked through the Agent tool (formerly named Task). If the coordinator's allowed tools do not include it, the definitions exist but the coordinator cannot launch them.

_Why a tempting wrong answer misses:_ Subagents are not MCP servers (A); AgentDefinition is the SDK's own mechanism, and it still depends on the Agent tool being allowed.

Reference: https://code.claude.com/docs/en/agent-sdk/subagents

</details>

---

### Question 4 of 117

**Scenario: Multi-Agent Research System**
*Study area: Subagent context and spawning · medium*

The coordinator spawns a synthesis subagent with the prompt 'Synthesize the findings into a briefing.' The briefing comes back generic and cites nothing from the search or analysis steps. What should change?

- **A.** Switch the synthesis subagent to a larger model so it can recall what the other subagents found earlier in the run
- **B.** Tell the synthesis subagent to call the search subagent itself whenever it needs to see the findings
- **C.** Turn on session forking so the synthesis subagent automatically inherits the coordinator's history
- **D.** Include the complete search results and analysis outputs directly in the synthesis subagent's prompt

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Subagents start with their own context and do not inherit the parent's conversation or other subagents' results. Whatever the synthesis step needs has to be passed explicitly in the prompt the coordinator writes.

_Why a tempting wrong answer misses:_ A larger model (A) cannot recall information that was never placed in its context; the gap is missing input, not reasoning ability.

Reference: https://code.claude.com/docs/en/agent-sdk/subagents

</details>

---

### Question 5 of 117

**Scenario: Multi-Agent Research System**
*Study area: Subagent context and spawning · medium*

Your coordinator needs four independent literature searches, one per region. Traces show it launches one search subagent, waits for the result, then launches the next, so a run takes four times longer than one search. How should the coordinator spawn them?

- **A.** Chain the regions so each subagent receives the previous region's results as extra context
- **B.** Launch one subagent and tell it to cover all four regions in sequence inside one long session
- **C.** Add a sleep between launches so the searches overlap without hitting the API rate limits
- **D.** Emit all four Agent tool calls in a single response so the subagents can run concurrently

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Independent subtasks can run in parallel when the coordinator issues multiple Agent tool calls in the same turn. Spreading them across separate turns serializes work that has no dependency between its parts.

_Why a tempting wrong answer misses:_ Chaining the regions (A) creates an artificial dependency and keeps the run sequential, which is the problem being fixed.

Reference: https://code.claude.com/docs/en/agent-sdk/subagents

</details>

---

### Question 6 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Structured tool errors · medium*

Your process_refund tool returns the same message, 'Operation failed', whether the payment gateway timed out or the refund broke policy. The agent retries policy violations three times and gives up on timeouts that would have succeeded. What should the tool return instead?

- **A.** A longer free-text error paragraph describing everything that might have gone wrong with the refund request
- **B.** Structured error metadata such as an error category, an isRetryable flag, and a plain-language description
- **C.** An HTTP status code only, since the model already understands every standard code in the same way
- **D.** An empty success response, so the agent moves on and the customer can simply try again later on

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Distinguishing transient, validation, business, and permission errors, with a clear retryable flag, lets the agent retry what can succeed and stop on what cannot.

_Why a tempting wrong answer misses:_ A bare status code (C) loses the business context, such as which policy was violated, that the agent needs to explain the outcome to the customer.

Reference: https://modelcontextprotocol.io/specification/2026-07-28/server/tools

</details>

---

### Question 7 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Structured tool errors · medium*

An internal MCP tool that reads deployment logs fails because the agent's service account lacks access to the production namespace. The agent retries the call nine times. How should the tool report this failure?

- **A.** As a transient error, so the agent keeps retrying until the permission change eventually takes effect
- **B.** As a successful call with an empty log list, so the agent assumes there were simply no errors to report
- **C.** As a permission error marked non-retryable, naming the missing access so the agent can report or route it
- **D.** As a validation error, so the agent rewrites its query parameters and tries a slightly different request

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Retrying cannot fix missing access. Categorizing the failure as a permission error and marking it non-retryable tells the agent to stop and surface the problem to someone who can grant access.

_Why a tempting wrong answer misses:_ Reporting an empty result (B) turns a failure into a false 'nothing found', which is worse than an error.

Reference: https://modelcontextprotocol.io/specification/2026-07-28/server/tools

</details>

---

### Question 8 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Built-in tool selection · easy*

Your productivity agent has Read, Write, Edit, Bash, Grep, and Glob. An engineer asks it to list every Storybook file in the repo, which follow the naming pattern *.stories.tsx. Which tool fits best?

- **A.** Grep, searching file contents for the word 'stories'
- **B.** Glob, matching the path pattern **/*.stories.tsx
- **C.** Read, opening each directory's index file one by one
- **D.** Edit, adding a marker comment to every matching file

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Glob finds files by name or path pattern, which is exactly what a naming convention like *.stories.tsx describes. Grep searches inside files.

_Why a tempting wrong answer misses:_ Grep (A) would scan contents and match any file that mentions 'stories', missing the point that the files are identified by their names.

Reference: https://code.claude.com/docs/en/tools-reference

</details>

---

### Question 9 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Built-in tool selection · medium*

The agent's Edit call to change `retries: 3` fails because that exact string appears in four places in a config file, and only one of them should change. What should the agent do next?

- **A.** Give Edit a longer old_string that includes nearby unique lines so it matches only the intended occurrence
- **B.** Set replace_all so all four occurrences change, then revert the three that should not have been changed
- **C.** Delete the config file with Bash and ask the engineer to recreate it by hand with the new setting
- **D.** Switch to Grep, since Grep can modify the matching line in place without needing a unique anchor

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Edit replaces an exact string that must appear once. Adding surrounding context pins down the one occurrence. If Edit still cannot find a unique anchor, reading the file and writing it back in full is the fallback.

_Why a tempting wrong answer misses:_ replace_all (B) is for when every occurrence should change; using it here creates three wrong edits to undo.

Reference: https://code.claude.com/docs/en/tools-reference

</details>

---

### Question 10 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Context preservation · medium*

Each call to your warehouse's get_shipment tool returns about 60 fields, including carrier internals and audit metadata. A return case needs about six of them. After a few lookups, the agent loses track of earlier details. What should you change?

- **A.** Trim tool results to the fields relevant to the task before they enter the agent's context
- **B.** Ask the agent to remember the important fields and ignore the others as the chat goes on
- **C.** Call get_shipment again every turn so the latest full record is always at the end of context
- **D.** Move the full records into the system prompt, where they will not count against the context

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Verbose tool output accumulates and crowds out what matters. Keeping only the relevant fields controls context growth at the source.

_Why a tempting wrong answer misses:_ Re-calling the tool every turn (C) multiplies the same bloat that caused the problem.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools

</details>

---

### Question 11 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Large-codebase context · medium*

During a long exploration of a legacy monolith, the agent's answers drift: it starts describing 'typical' service patterns instead of the specific classes it found an hour ago. What practice counters this?

- **A.** Have the agent record key findings in a scratchpad file and consult that file for later questions
- **B.** Ask the agent to re-read the entire monolith before every question, to keep all its facts fresh
- **C.** Switch to a model with a larger context window so that the earlier findings never fall away
- **D.** Tell the agent to answer from general knowledge whenever it cannot recall a specific class

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Context degrades over long sessions. A scratchpad file persists concrete findings outside the conversation, so the agent can reload specifics instead of falling back on generic patterns.

_Why a tempting wrong answer misses:_ Answering from general knowledge (D) formalizes the exact failure being described.

Reference: https://code.claude.com/docs/en/context-window

</details>

---

### Question 12 of 117

**Scenario: Multi-Agent Research System**
*Study area: Provenance and uncertainty · hard*

Synthesis reports that two sources 'contradict each other' on a city's population, 1.8 million versus 2.1 million. On inspection, one figure is from a 2015 census and the other from a 2024 estimate. What design change prevents this misreading?

- **A.** Tell synthesis to always prefer whichever of the two sources reports the larger population figure
- **B.** Average conflicting figures automatically so the report shows one population number instead of two
- **C.** Require subagents to include publication or collection dates with each figure in their structured output
- **D.** Drop any statistic that appears in more than one source, so no contradictions reach the report

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Without dates, a change over time looks like a contradiction. Carrying publication or collection dates through structured outputs lets synthesis interpret differences correctly.

_Why a tempting wrong answer misses:_ Averaging (B) produces a number neither source reported and hides the real timeline.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 13 of 117

**Scenario: Multi-Agent Research System**
*Study area: Tool interface design · hard*

Your research system has one tool, analyze_document, whose description says 'Analyzes a document.' Subagents use it for extraction, summarization, and fact-checking, and the outputs are inconsistent because nothing defines what each use should return. What is the best redesign?

- **A.** Keep analyze_document and add an optional free-text 'mode' parameter that each subagent can fill in
- **B.** Replace the tool with direct document access so subagents read the files and do the analysis themselves
- **C.** Keep one tool but tell every subagent in its prompt to phrase requests to analyze_document more precisely
- **D.** Split it into purpose-specific tools, such as extract_data_points, summarize_content, and verify_claim, each with its own contract

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Purpose-specific tools with defined inputs and outputs make selection clear and results consistent. A generic tool forces the model to guess what each call should do and return.

_Why a tempting wrong answer misses:_ A free-text mode parameter (A) keeps the ambiguity inside one tool instead of removing it.

Reference: https://www.anthropic.com/engineering/writing-tools-for-agents

</details>

---

### Question 14 of 117

**Scenario: Multi-Agent Research System**
*Study area: Tool interface design · medium*

A worker repeatedly calls get_company, then get_filings, then get_officers for the same entity, one round-trip each, and end-to-end latency is poor. What best reduces the round-trips?

- **A.** Cache each call's result so the next entity is faster
- **B.** Provide a composite get_company_profile tool that returns the company, its filings, and its officers in a single call
- **C.** Increase the worker's max_tokens so it can request more data per call and therefore needs fewer separate round-trips to gather the same company information
- **D.** Move all three calls into the coordinator instead of the worker so they can be issued together, centralizing the round-trips in the place where they are easiest to observe and manage

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A composite tool collapses several dependent round-trips into one call, directly cutting the latency that comes from sequential hops.

_Why a tempting wrong answer misses:_ Caching (A) helps only on repeat lookups of the same entity and does nothing for the first entity's three sequential round-trips.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 15 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Built-in tool selection · medium*

An engineer asks the agent how session tokens are validated in a large unfamiliar service. The agent starts by reading every file under src/, fills its context, and answers vaguely. What exploration strategy works better?

- **A.** Read all files again but in reverse order, so the most recent code lands last in the agent's context
- **B.** Ask the engineer to paste the relevant code into chat, since agents cannot explore large codebases
- **C.** Use Glob to list every file in the repository and pick files at random to read until the answer appears
- **D.** Grep for entry points such as the validation function name, then Read along the imports from there

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Building understanding incrementally, by searching for a precise entry point and then following imports and calls, keeps context focused on relevant code instead of the whole tree.

_Why a tempting wrong answer misses:_ Reading in a different order (A) still loads everything and does nothing about the flooded context.

Reference: https://code.claude.com/docs/en/best-practices

</details>

---

### Question 16 of 117

**Scenario: Multi-Agent Research System**
*Study area: Subagent context and spawning · hard*

Your coordinator's delegation prompts read like scripts: 'Step 1, search for X. Step 2, open the first three results. Step 3, summarize each.' Subagents follow them rigidly and miss better sources when the first results are weak. What prompt design works better?

- **A.** Add more steps to the script so the subagent has a fallback instruction for every situation it could encounter
- **B.** Keep the script but raise the effort level so the subagent reasons more carefully about each fixed step
- **C.** Remove the prompt entirely and let each subagent infer its task from the name of its AgentDefinition entry
- **D.** State the research goal, the scope, and the quality bar for sources, and let the subagent choose how to reach them

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Delegation prompts that specify the objective and the criteria for a good result let a capable subagent adapt its approach. Procedural scripts remove that adaptability and break when conditions differ from what the script assumed.

_Why a tempting wrong answer misses:_ Longer scripts (A) still cannot anticipate every case and make the subagent even more rigid.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 17 of 117

**Scenario: Multi-Agent Research System**
*Study area: Task decomposition · medium*

The coordinator must gather a company's current CEO and then find that person's published statements. An engineer wants both workers to run in parallel to save time. Why is parallel delegation the wrong call here?

- **A.** The second task depends on the first task's output (the CEO's identity), so it is a genuine sequential dependency, not parallelizable work
- **B.** Parallel workers always consume more tokens than sequential ones because their contexts cannot be shared, so the extra token cost alone makes parallelism the wrong choice in this case
- **C.** The Messages API cannot run two workers concurrently
- **D.** Parallel workers are unable to return structured error context

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Partitioning for parallelism only works on independent subtasks; when one task needs another's output, it is a real data dependency that must run in sequence.

_Why a tempting wrong answer misses:_ Parallel execution is not inherently more expensive (B); the blocker here is the dependency between the two tasks, not their combined cost.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 18 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Subagent context and spawning · medium*

Your developer-productivity agent has a custom 'dependency-auditor' subagent defined with the description 'Helper agent.' Engineers ask the main agent to check for outdated packages, but it never delegates to the auditor. What is the first thing to fix?

- **A.** Give the auditor every tool the main agent has so that it looks more capable when the main agent chooses
- **B.** Rename the auditor so that its name sorts first alphabetically among the subagents that are available
- **C.** Rewrite the description to say what the auditor does and when to use it, such as checking package versions
- **D.** Move the auditor's instructions into the main agent's system prompt and delete the subagent definition

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The main agent decides whether to delegate based on each subagent's description. A vague description gives it no basis to match a request to the subagent, so a clear statement of purpose and trigger conditions is the first fix.

_Why a tempting wrong answer misses:_ Granting every tool (A) does nothing for selection and violates least privilege; the router reads the description, not the tool list.

Reference: https://code.claude.com/docs/en/agent-sdk/subagents

</details>

---

### Question 19 of 117

**Scenario: Multi-Agent Research System**
*Study area: Tool distribution and tool_choice · medium*

Your data-gathering workers only need to read sources, but for convenience every worker is provisioned with one shared toolset that includes a destructive delete_cache tool. From a least-privilege standpoint, what is the problem and fix?

- **A.** Nothing needs to change, because one shared toolset keeps the worker configuration simple
- **B.** Keep the shared toolset and add a prompt rule telling workers never to call delete_cache
- **C.** Remove delete_cache from the read-only workers and give each worker only the tools its role needs
- **D.** Rename delete_cache to something obscure so workers are less likely to call it by accident

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Least privilege means each agent holds only the tools its role needs; a read-only worker should be structurally unable to perform a destructive action.

_Why a tempting wrong answer misses:_ A prompt rule (B) leaves the destructive capability in place and relies on the model never slipping, which is not least privilege.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 20 of 117

**Scenario: Multi-Agent Research System**
*Study area: Provenance and uncertainty · hard*

Your pipeline summarizes each source, then summarizes the summaries. Reviewers find claims in the final report that no one can trace to a source. What design keeps attribution intact?

- **A.** Summarize fewer times, but keep the prose format for every step in the pipeline as it is today
- **B.** Have subagents output claim-source mappings, such as the claim, URL, and excerpt, that later steps must preserve
- **C.** Add a final step that searches the web for a source matching each claim once the report is written
- **D.** Attach every original source document to the final report so that readers can check claims themselves

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Attribution is lost when findings are compressed without their sources. Structured claim-source mappings that each stage must carry forward keep every claim traceable.

_Why a tempting wrong answer misses:_ Searching for sources after the fact (C) can attach a claim to a source that never supported it.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 21 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Session resume and fork · medium*

An agent has spent an hour analyzing a payments module. You want to compare two refactoring strategies, one that extracts a service and one that keeps a modular monolith, without redoing the analysis or letting the two explorations contaminate each other. What should you do?

- **A.** Continue in the same session and ask the agent to alternate between the two strategies turn by turn
- **B.** Start two brand-new sessions and paste the entire earlier transcript into the first message of each
- **C.** Resume the session twice without forking so both explorations write to the same shared history
- **D.** Fork the analyzed session twice so each strategy branches from the same baseline in its own history

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Forking creates a new session that starts with a copy of the original history and then diverges. Two forks give two independent branches that both keep the shared analysis.

_Why a tempting wrong answer misses:_ Resuming without forking (C) appends both explorations to one history, which is exactly the contamination you want to avoid.

Reference: https://code.claude.com/docs/en/agent-sdk/sessions

</details>

---

### Question 22 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Session resume and fork · hard*

Yesterday a Claude Code session mapped a service's data flow. Overnight, a large merge rewrote most of the files it read. Today you need to continue the investigation. Which approach is most reliable?

- **A.** Resume yesterday's session as-is, since its earlier tool results are already loaded and cost nothing extra
- **B.** Resume the session and ask Claude to trust its earlier notes unless a file fails to open this morning
- **C.** Start a fresh session seeded with a short summary of yesterday's conclusions, then re-read the changed code
- **D.** Fork yesterday's session so the stale tool results are isolated in the original while you keep working

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Resumption works when prior context is mostly still valid. When most of the files behind earlier tool results have changed, those results are stale, and a new session seeded with a structured summary avoids reasoning from outdated reads.

_Why a tempting wrong answer misses:_ Forking (D) copies the same stale history into the new branch, so it does not remove the problem.

Reference: https://code.claude.com/docs/en/agent-sdk/sessions

</details>

---

### Question 23 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: CI/CD integration · medium*

A nightly CI job runs claude -p to triage flaky tests. On a bad night it kept working for hours and ran up a large bill. Which flags bound an unattended print-mode run?

- **A.** --continue and --fork-session, which reuse the previous night's session and keep each run's context small
- **B.** --max-turns and --max-budget-usd, which cap the number of agentic turns and the dollar spend of the run
- **C.** --verbose and --debug, which make runaway behavior visible in the logs so the team can stop it by hand
- **D.** --permission-mode plan, which keeps the job in read-only planning so it can never run for too long

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

In print mode, --max-turns limits the agentic turns and exits with an error when reached, and --max-budget-usd stops the run once spend reaches the cap. Both put a hard ceiling on unattended jobs.

_Why a tempting wrong answer misses:_ Verbose logging (C) shows what happened but does not stop it; nobody is watching a nightly job in real time.

Reference: https://code.claude.com/docs/en/cli-reference

</details>

---

### Question 24 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: CI/CD integration · hard*

Your CI review job runs claude --bare -p to start faster. Reviews now ignore the review criteria and fixture conventions documented in the repository's CLAUDE.md. Why?

- **A.** Print mode never reads CLAUDE.md, so review criteria have to be passed in the prompt on every CI run
- **B.** CLAUDE.md only loads when a developer opens an interactive session on their machine for the first time
- **C.** Bare mode skips auto-discovery of CLAUDE.md, skills, hooks, and MCP servers, so the project context never loads
- **D.** The model ignores CLAUDE.md in CI because it is written for people rather than for automated review jobs

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

--bare starts a minimal session that skips discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md. That speeds scripted calls but drops the project context a review depends on.

_Why a tempting wrong answer misses:_ Print mode itself does load CLAUDE.md (A); the flag that removes it is --bare.

Reference: https://code.claude.com/docs/en/cli-reference

</details>

---

### Question 25 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: CI/CD integration · medium*

CI-generated tests are technically valid but low value: they re-test getters, ignore your shared fixtures, and skip the edge cases your team cares about. Where should you document what a valuable test looks like so every CI run applies it?

- **A.** In the project CLAUDE.md, covering testing standards, the fixtures available, and which cases are worth testing
- **B.** In each engineer's ~/.claude/CLAUDE.md, so the guidance follows whoever triggers the CI pipeline run
- **C.** In a comment at the top of every test file, so Claude sees the standards whenever it opens a test
- **D.** In the pull-request template, so authors paste the testing standards into every PR description

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

CLAUDE.md is how project context reaches CI-invoked Claude Code. Documenting standards, fixtures, and what counts as a valuable test raises the quality of generated tests on every run.

_Why a tempting wrong answer misses:_ User-level files (B) live on individual machines and are not present on a CI runner.

Reference: https://code.claude.com/docs/en/github-actions

</details>

---

### Question 26 of 117

**Scenario: Structured Data Extraction**
*Study area: Batch processing · hard*

Contracts arrive continuously, and extracted terms must be available within 36 hours of arrival. You use the Message Batches API, which can take up to 24 hours to process a batch. How often must you submit batches, at minimum, to guarantee the 36-hour window?

- **A.** Once a day, since each batch finishes within 24 hours and 24 is below the 36-hour window
- **B.** Every 12 hours, so a document waits at most 12 hours before a batch that takes at most 24
- **C.** Every 36 hours, matching the window, because batches usually finish in under an hour
- **D.** Every 48 hours, since the API returns results early enough to cover the extra waiting time

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Worst-case latency equals the wait until the next submission plus the maximum processing time. With 24 hours of processing, submissions must occur at least every 12 hours to stay within 36.

_Why a tempting wrong answer misses:_ Daily submission (A) lets a document wait up to 24 hours plus 24 of processing, which is 48 hours.

Reference: https://platform.claude.com/docs/en/build-with-claude/batch-processing

</details>

---

### Question 27 of 117

**Scenario: Structured Data Extraction**
*Study area: Batch processing · medium*

A batch of 10,000 extraction requests finishes with 140 errored results, most of them documents that exceeded the context window. What is the most efficient recovery?

- **A.** Resubmit the entire batch of 10,000 requests so that every result comes from the same run
- **B.** Use each failed result's custom_id to resubmit only those documents, chunking the oversized ones
- **C.** Discard the 140 documents, because a batch cannot be retried once it has finished processing
- **D.** Resubmit the 140 unchanged through the synchronous API in case they succeed there instead

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

custom_id links each result to its request, so you can resubmit just the failures. Documents that were too large need a modification such as chunking, or they will fail again.

_Why a tempting wrong answer misses:_ Resending them unchanged (D) repeats the same context overflow on a more expensive path.

Reference: https://platform.claude.com/docs/en/build-with-claude/batch-processing

</details>

---

### Question 28 of 117

**Scenario: Structured Data Extraction**
*Study area: Batch processing · medium*

You are about to batch-process 250,000 archived invoices with a new extraction prompt. What should you do before submitting the full volume?

- **A.** Submit everything at once, since batch pricing makes any reruns cheap enough to not matter
- **B.** Refine the prompt on a representative sample until first-pass quality is acceptable, then batch
- **C.** Remove all examples from the prompt so each of the 250,000 requests uses fewer input tokens
- **D.** Split the invoices across many models and keep whichever model's output looks best later

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Iterating on a sample catches prompt problems while they are cheap to fix. It raises first-pass success so you avoid resubmitting large volumes.

_Why a tempting wrong answer misses:_ Even at half price (A), rerunning 250,000 requests because of a prompt flaw is expensive and slow.

Reference: https://platform.claude.com/docs/en/build-with-claude/batch-processing

</details>

---

### Question 29 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: Explicit criteria · medium*

Your review prompt says 'be conservative and only report findings you are confident about.' False positives barely changed. What revision is most likely to improve precision?

- **A.** Repeat the instruction in capital letters at both the beginning and the end of the review prompt
- **B.** Ask the model to report a confidence number and suppress everything below a fixed threshold
- **C.** Define which categories to report, such as correctness and security bugs, and which to skip, such as style
- **D.** Add 'you will be penalized for false positives' so the model feels more pressure to hold back

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Specific categorical criteria about what to report and what to skip change behavior far more than general appeals to caution or confidence.

_Why a tempting wrong answer misses:_ Confidence thresholds (B) depend on the model's self-assessment, which is a weak filter for precision.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/be-clear-and-direct

</details>

---

### Question 30 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: Few-shot prompting · hard*

Your reviewer keeps flagging your team's intentional early-return guard pattern as 'confusing control flow,' and it also misses a genuinely unsafe variant of the same pattern. What prompt change helps most?

- **A.** Add a rule saying 'never flag early returns' so the acceptable pattern stops appearing in reviews
- **B.** Add few-shot examples contrasting the acceptable guard with the unsafe variant, with reasons for each
- **C.** Remove control-flow review from the prompt entirely, since the reviewer cannot judge that category
- **D.** Lower the reviewer's effort setting so that it flags fewer control-flow findings in general

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Examples that show why one form is fine and another is a real problem teach the distinction, so the model can generalize to new cases instead of matching a keyword.

_Why a tempting wrong answer misses:_ A blanket rule (A) also suppresses the unsafe variant, trading false positives for missed bugs.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting

</details>

---

### Question 31 of 117

**Scenario: Structured Data Extraction**
*Study area: Few-shot prompting · hard*

You extract cited sources from research papers. Papers with a bibliography section work well, but papers that cite inline, such as '(Okafor, 2019)', often return an empty sources array. What is the most effective fix?

- **A.** Make the sources field required, so the model must return at least one entry for every paper
- **B.** Add few-shot examples showing correct extraction from both bibliography-style and inline-citation papers
- **C.** Run each paper through the prompt twice and keep whichever run returns the longer sources array
- **D.** Tell the model in capital letters that every paper always contains citations somewhere in it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Few-shot examples that cover varied document structures show the model how to handle formats that instructions alone do not convey, which fixes empty extraction on the underrepresented format.

_Why a tempting wrong answer misses:_ Forcing the field to be non-empty (A) pressures the model to invent sources when none are found.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting

</details>

---

### Question 32 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: Validation and retry loops · hard*

Developers dismiss about a third of your bot's review findings, but you cannot tell which kinds of code trigger the dismissed ones. What change to the finding schema would enable that analysis?

- **A.** Add a detected_pattern field that records which code construct triggered each finding
- **B.** Remove the severity field so developers stop dismissing findings marked as low priority
- **C.** Add a free-text apology field so the bot can explain itself when a finding is wrong
- **D.** Store only the count of findings per pull request so the data stays small and simple

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Recording what triggered each finding lets you group dismissals by pattern and see which constructs produce false positives, which tells you where to tighten the prompt.

_Why a tempting wrong answer misses:_ Per-PR counts (D) discard exactly the detail needed to find the problem patterns.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

### Question 33 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: Multi-pass review · medium*

Your review pipeline has limited senior-reviewer time. You want the model's findings routed so that uncertain ones get human attention first. What should the verification pass add?

- **A.** A rule that the model must only emit findings it is completely certain about
- **B.** A self-reported confidence level on each finding, used to route human review
- **C.** A random shuffle of the findings, so reviewers see a different order each time
- **D.** A single overall score for the pull request in place of the individual findings

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A verification pass in which the model reports confidence for each finding gives the pipeline a signal for routing reviewer attention, ideally with thresholds calibrated against labeled data.

_Why a tempting wrong answer misses:_ Emitting only certain findings (A) hides the uncertain cases that most need a human.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

### Question 34 of 117

**Scenario: Structured Data Extraction**
*Study area: Validation and retry loops · hard*

Invoices sometimes extract with line items that do not add up to the stated total, and nothing downstream notices. How can the extraction design surface these discrepancies?

- **A.** Extract only the stated total and skip the line items, since the stated total is the authoritative figure
- **B.** Enable strict schema enforcement, which guarantees that the extracted numbers are arithmetically correct
- **C.** Ask the model to round each line item so that small mismatches disappear before the data is stored
- **D.** Extract a calculated_total alongside the stated_total and flag the record when the two values differ

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Having the extraction produce both figures turns a silent semantic error into a checkable condition that validation can flag for review or retry.

_Why a tempting wrong answer misses:_ Strict schemas (B) guarantee structure and types, not that the values are semantically consistent.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

### Question 35 of 117

**Scenario: Structured Data Extraction**
*Study area: Validation and retry loops · medium*

A shipping-manifest extraction fails validation because a weight field reads '12 kg' where the schema expects a number. What should the retry request contain to give the model the best chance of correcting it?

- **A.** The same prompt resent unchanged, since the error was probably random and will not repeat itself
- **B.** Only the validation error, sent without the document, to keep the retry request short and cheap
- **C.** The original document, the failed extraction, and the specific validation error that it triggered
- **D.** A shorter version of the document with the weight section removed so the field is skipped

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Retry with error feedback works best when the model can see what it produced, what was wrong with it, and the source it should correct against.

_Why a tempting wrong answer misses:_ Sending the error alone (B) leaves the model without the source text it needs to fix the value.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

### Question 36 of 117

**Scenario: Structured Data Extraction**
*Study area: Validation and retry loops · medium*

Validation flags that purchase-order numbers are missing from 8% of extracted invoices. Retries with the error message do not help. You find that for those vendors, the PO number is printed only on a separate packing slip that is not in the input. What does this tell you?

- **A.** Retries cannot recover information that is absent from the input, so the fix is supplying the slip or allowing null
- **B.** The retry messages were not forceful enough and should say the field is mandatory in stronger terms
- **C.** The model needs a higher effort setting to find PO numbers that are printed in very small fonts
- **D.** The schema should mark the PO number as required so the model is forced to always return one

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Retry loops fix format and structural errors. When the required information is not in the document, no amount of retrying will produce it.

_Why a tempting wrong answer misses:_ Making the field required (D) pushes the model toward inventing a value that does not exist in the input.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

### Question 37 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: CI/CD integration · medium*

Your pipeline must fail the build when the reviewer finds a blocking issue. Given a headless claude -p run with --output-format json, what is the cleanest way to gate the build?

- **A.** Parse the structured JSON for a blocking-severity finding and have the CI step exit non-zero based on that field
- **B.** Grep the raw transcript for the word 'blocking' and fail the build whenever it appears anywhere in the reviewer's free-text output for the pull request
- **C.** Always pass the build and email the findings to the author, letting them decide after the fact whether anything flagged should actually have blocked the merge
- **D.** Let Claude Code itself decide whether to merge the PR

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

With structured JSON output, the pipeline reads a defined field and sets its own exit status deterministically, keeping the merge gate in CI and driven by parseable data.

_Why a tempting wrong answer misses:_ Grepping free text (B) is exactly the brittleness --output-format json is meant to eliminate; wording changes would silently break the gate.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 38 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: Batch processing · hard*

You must cut the cost of a synchronous pre-merge review without changing its blocking behavior, and you cannot switch to the Batches API. Which lever applies?

- **A.** Move the review to the Batches API anyway and simply accept the added latency, since the roughly 50% cost saving is worth more than keeping the gate perfectly synchronous
- **B.** Cache the stable prefix (system prompt, conventions, unchanged files) with prompt caching so repeat reviews reread it at reduced cost
- **C.** Truncate the diff to only the first few files
- **D.** Remove the system prompt entirely to save tokens

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Prompt caching is a separate, compatible lever: caching the stable prefix lowers the cost of re-reading it on each synchronous review without touching the blocking timing.

_Why a tempting wrong answer misses:_ Moving to batch (A) violates the stated blocking requirement, since batch is asynchronous with up to a 24-hour turnaround.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

</details>

---

### Question 39 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: CI/CD integration · hard*

The reviewer flags a 'null pointer' bug on a changed line, but the value is guaranteed non-null by a check three lines above the diff hunk. What context change reduces these false positives?

- **A.** Tell the reviewer to assume all inputs are already validated upstream, so it stops flagging null-pointer concerns on values that some caller was supposed to check
- **B.** Lower the model's confidence so it flags fewer things
- **C.** Include enough surrounding file context, not just the isolated diff hunk, so the reviewer can see the guards and invariants around the change
- **D.** Review only added lines, never modified ones

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Reviewing an isolated hunk hides guarantees established just outside it; supplying surrounding context lets the model reason about the actual guards and avoid false positives.

_Why a tempting wrong answer misses:_ Telling it to assume inputs are validated (A) also suppresses genuine bugs; the fix is giving the model the context to see the real guard, not blanket assumptions.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 40 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: Schema-enforced output · medium*

You are defining the JSON schema for review findings that a script will turn into inline PR comments. Which set of fields is most fit for purpose?

- **A.** A single free-text 'summary' string covering the whole review in prose, which the script then posts as one top-level PR comment
- **B.** Just a boolean 'approved' flag on the response, so the script can decide whether to pass or fail the build without reading any per-finding detail
- **C.** A list of markdown blobs, one per finding, that the script can drop straight into the PR conversation without having to parse any individual fields out of them
- **D.** A list of findings, each with file path, line number, severity, message, and rationale

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Posting inline comments requires per-finding structured fields (file, line, severity, message, rationale) so the script can anchor each comment to a precise location.

_Why a tempting wrong answer misses:_ A single summary string (A) has no per-location structure, so the script cannot map it to specific file-and-line anchors to place inline comments.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 41 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: CI/CD integration · medium*

Your headless claude -p review job occasionally stalls in CI. Investigation shows it is waiting on an interactive approval prompt for a tool it wants to use. What is the right fix for unattended CI?

- **A.** Pre-authorize the specific tools the job needs (via allowed-tools / permission settings) so the headless run never blocks on an interactive prompt
- **B.** Add a long sleep before the tool call so the interactive approval prompt times out on its own and the headless run can continue
- **C.** Run the job on a faster machine
- **D.** Switch the model to Haiku so it requests fewer tools

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Headless CI has no human to approve prompts, so the tools the job needs must be pre-authorized; otherwise the run blocks indefinitely on permission requests.

_Why a tempting wrong answer misses:_ Sleeping past the prompt (B) never grants permission, so the tool call still cannot proceed and the job stalls or fails anyway.

Reference: https://code.claude.com/docs/en/cli-reference

</details>

---

### Question 42 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Session resume and fork · medium*

You resume a named Claude Code session that was reviewing a billing module. Since then, a teammate changed three specific files in that module and nothing else. What is the most efficient way to bring the session up to date?

- **A.** Tell the resumed session which three files changed and ask it to re-analyze just those files
- **B.** Ask the session to re-read the whole billing module from scratch before it continues any work
- **C.** Start over in a new session, because a resumed session cannot see any changes made to the files
- **D.** Say nothing about the change, since Claude Code refreshes every earlier tool result on resume

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A resumed session still holds its earlier tool results. Telling it exactly which files changed lets it target the re-analysis instead of re-exploring everything or silently relying on outdated reads.

_Why a tempting wrong answer misses:_ Earlier tool results are not refreshed automatically on resume (D), so staying silent leaves the session reasoning from old file contents.

Reference: https://code.claude.com/docs/en/agent-sdk/sessions

</details>

---

### Question 43 of 117

**Scenario: Developer Productivity with Claude**
*Study area: MCP server integration · hard*

You connected an MCP server whose semantic_code_search tool understands call graphs and returns ranked results. The agent still uses Grep for almost every search, and results suffer. The MCP tool's description reads 'Searches code.' What should you change first?

- **A.** Remove Grep from the agent completely, so the MCP tool is the only search option that remains available
- **B.** Move the MCP server from project scope to user scope so its tools are loaded earlier in each session
- **C.** Rename semantic_code_search to grep so the agent reaches for it by habit whenever it needs to search
- **D.** Expand the MCP tool's description to explain what it finds that Grep cannot, what it returns, and when to use it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The agent chooses tools by their descriptions. If the MCP tool's description does not explain its advantages, the model defaults to the familiar built-in. A detailed description is the first lever.

_Why a tempting wrong answer misses:_ Removing Grep (A) forces the choice but also removes a tool that is still right for simple literal searches.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools

</details>

---

### Question 44 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Escalation and ambiguity · easy*

A customer's first message says: 'I want to talk to a real person about my bill, please.' The billing issue looks simple for the agent to resolve. What should the agent do?

- **A.** Resolve the billing issue first and offer a human only if the customer is still unhappy
- **B.** Ask several diagnostic questions so the human agent has a complete picture of the issue
- **C.** Honor the request and escalate to a human right away, without first investigating it
- **D.** Explain that the agent can resolve simple issues faster, and keep working on the bill

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

An explicit request for a human is an escalation trigger that should be honored immediately, even when the issue looks easy.

_Why a tempting wrong answer misses:_ Resolving first (A) overrides a clear customer choice; offering to resolve fits customers who are frustrated but have not asked for a person.

Reference: https://platform.claude.com/docs/en/about-claude/use-case-guides/customer-support-chat

</details>

---

### Question 45 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Workflow enforcement and handoffs · hard*

A telecom support agent can call swap_sim, which moves a phone number to a new SIM card. Policy says a one-time passcode must be verified first. Which TWO statements about enforcing that rule are correct? (Select 2.)

- **A.** A clear system-prompt instruction to verify first makes the ordering deterministic enough for account-takeover risks
- **B.** A PreToolUse hook that denies swap_sim until session state records a successful verify_otp call enforces the order in code
- **C.** Few-shot examples of the verification step remove the need for any programmatic check on high-risk tools
- **D.** Prompt-only guidance keeps a non-zero failure rate, which is unacceptable when the step guards against fraud
- **E.** Raising the effort level guarantees the agent will never skip a step that its system prompt describes

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, D**

Prompt instructions and examples shape behavior probabilistically, so some calls will still skip the step. When a skipped step enables fraud, a programmatic gate such as a hook that blocks the tool until verification succeeds is required.

_Why a tempting wrong answer misses:_ Few-shot examples (C) improve compliance but cannot guarantee it; they complement a code-level gate rather than replace it.

Reference: https://code.claude.com/docs/en/agent-sdk/hooks

</details>

---

### Question 46 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Workflow enforcement and handoffs · medium*

When your support agent escalates a disputed invoice, the human specialist receives only the ticket number and must re-read a 60-turn transcript before acting. Specialists cannot see the agent's tool results. What should the escalation step produce?

- **A.** The full raw transcript attached to the ticket, so that the specialist has every detail available to scroll through
- **B.** A one-line note saying 'customer unhappy, please review' so the specialist can start from a neutral position
- **C.** A structured handoff with customer ID, the disputed amount, findings so far, the likely root cause, and a recommended action
- **D.** A request that the customer restate the whole issue once the specialist joins, so nothing is lost in translation

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

A structured handoff summary gives the specialist the facts and the agent's analysis in a compact, reliable form. It avoids forcing a human to reconstruct context from a transcript or tool data they cannot access.

_Why a tempting wrong answer misses:_ The raw transcript (A) technically contains everything but pushes the reconstruction work onto the specialist, which is what the handoff is meant to remove.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 47 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Escalation and ambiguity · hard*

Your agent escalates whenever a sentiment score shows strong frustration. A customer writes, angrily, that a coupon failed at checkout, which is a case the agent can fix in one step. What behavior should the design produce?

- **A.** Acknowledge the frustration, offer to fix the coupon now, and escalate if the customer still asks for a person
- **B.** Escalate at once, since strong negative sentiment is the most reliable sign of a complex case
- **C.** Ignore the tone and apply the coupon without comment, since emotion is not relevant to the fix
- **D.** Ask the customer to calm down before the agent is willing to look at the coupon issue at all

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Sentiment is a poor proxy for complexity. When the issue is within the agent's ability, acknowledging the frustration and offering a fix serves the customer, with escalation if they reiterate a wish for a human.

_Why a tempting wrong answer misses:_ Sentiment-triggered escalation (B) sends easy cases to humans and does not track actual case complexity.

Reference: https://platform.claude.com/docs/en/about-claude/use-case-guides/customer-support-chat

</details>

---

### Question 48 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Agent SDK hooks · medium*

A PreToolUse hook blocks apply_account_credit calls above $250. After a block, the agent keeps retrying the same call with the same amount. What should the hook return so the agent redirects instead of retrying?

- **A.** A deny decision with no reason, so the agent cannot argue with the policy and has nothing to respond to
- **B.** An exception that ends the whole session, since any over-limit request means the conversation must stop
- **C.** An allow decision with the amount silently lowered to $250, so the call succeeds without further discussion
- **D.** A deny decision with a permissionDecisionReason explaining the limit and that such credits go to human review

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

When a hook denies a tool call, the reason is passed back to the model. Explaining the limit and the correct path lets the agent stop retrying and escalate instead.

_Why a tempting wrong answer misses:_ Silently rewriting the amount (C) changes what the customer receives without telling anyone, which trades a blocked action for an unexplained one.

Reference: https://code.claude.com/docs/en/agent-sdk/hooks

</details>

---

### Question 49 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Agent SDK hooks · hard*

A third-party MCP billing tool returns full card numbers in its results, and compliance says the model must never see them. You cannot change the tool. Which approach meets the requirement deterministically?

- **A.** Add a system-prompt rule telling the agent to ignore any card numbers that it happens to see in tool results
- **B.** Ask the agent to call a separate masking tool on each billing result before it reads the content
- **C.** Lower the tool's priority in the tool list so the agent calls it less often during normal conversations
- **D.** Use a PostToolUse hook that replaces the tool's output with a redacted version before the model receives it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

PostToolUse hooks run after a tool executes and can replace its output before the model processes it. That makes redaction a code-level guarantee rather than a request the model might not follow.

_Why a tempting wrong answer misses:_ A masking tool the agent must remember to call (B) still lets the raw result reach the model first and depends on the model's compliance.

Reference: https://code.claude.com/docs/en/agent-sdk/hooks

</details>

---

### Question 50 of 117

**Scenario: Multi-Agent Research System**
*Study area: Error propagation · hard*

A multi-agent research run crashed partway through after four of seven subagents had finished. Restarting from scratch wastes hours. How should the system be designed for recovery?

- **A.** Rely on the coordinator's memory of the run, since it can recall which subagents finished
- **B.** Have each agent export its state to a known location, and have the coordinator load a manifest on resume
- **C.** Run every subagent twice in parallel so that one copy of each is likely to survive a crash
- **D.** Increase timeouts on every subagent so that the crash is less likely to happen in the future

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Structured state exports and a manifest let the coordinator see what finished and inject prior results into the remaining agents' prompts, so a restart resumes rather than repeats.

_Why a tempting wrong answer misses:_ The coordinator's context (A) does not survive a crash of the process that held it.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 51 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Subagent context and spawning · medium*

Your support agent delegates refund research to a billing subagent. The customer said early on that they want store credit, not a card refund, and that the order shipped to Canada. The subagent's recommendation ignores both points. What is the fix?

- **A.** Tell the billing subagent to read the main agent's conversation history before it starts any research work
- **B.** Include the customer's stated constraints, such as store credit and the Canadian address, in the delegation prompt
- **C.** Move all refund research back into the main agent, because subagents are not able to handle customer preferences
- **D.** Add the customer's preferences to the billing subagent's permanent system prompt for every future conversation

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A subagent receives only what the delegation prompt gives it. Constraints that matter to the outcome must be passed explicitly, or the subagent will reason without them.

_Why a tempting wrong answer misses:_ Subagents cannot read the parent's history on request (A); they do not inherit it, so the constraints have to be in the prompt.

Reference: https://code.claude.com/docs/en/agent-sdk/subagents

</details>

---

### Question 52 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Task decomposition · hard*

You ask an agent to 'add meaningful test coverage to this 12-year-old codebase with almost no tests.' Which decomposition approach fits this task best?

- **A.** A fixed chain that writes tests for every file in alphabetical order, then runs the full suite once at the end
- **B.** One pass that reads the whole repository into context and writes all the new tests in a single response
- **C.** Map the structure first, pick high-impact areas, then work through a prioritized plan that adapts as dependencies appear
- **D.** Split the repository evenly by line count across parallel subagents and merge whatever tests each returns

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Open-ended work with unknown structure calls for dynamic decomposition: explore, prioritize, and let later subtasks depend on what earlier steps discover. A fixed chain suits predictable tasks, not this one.

_Why a tempting wrong answer misses:_ Splitting by line count (D) ignores where risk and value actually sit, and the pieces cannot coordinate on shared fixtures or dependencies.

Reference: https://code.claude.com/docs/en/best-practices

</details>

---

### Question 53 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Agentic loops · medium*

Your hand-written loop ends the conversation whenever Claude's response contains a text block. Customers report that the agent says 'Let me look up your order' and then goes silent without answering. What is the bug?

- **A.** The model should never produce text alongside a tool call, so the prompt needs a rule that forbids any narration
- **B.** The loop should wait a few seconds after each text block in case a tool call arrives in a later response
- **C.** The loop should parse the text for phrases like 'let me' and treat those as a signal to keep the loop running
- **D.** A response can hold text and tool_use blocks together; the loop must continue when stop_reason is tool_use

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Claude often narrates before calling a tool, so a response can contain both a text block and a tool_use block. The stop_reason field, not the presence of text, tells the loop whether tools need to run.

_Why a tempting wrong answer misses:_ Parsing phrases (C) replaces a reliable structured signal with guesswork about wording.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls

</details>

---

### Question 54 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Tool distribution and tool_choice · medium*

To save setup time, your support agent was given all 22 tools from three internal MCP servers. Tool-selection errors rose sharply after the change, even for simple order questions. What is the most effective fix?

- **A.** Give the agent only the handful of tools its support role needs, and leave the rest out of its configuration
- **B.** Keep all 22 tools but sort them so the most commonly used support tools appear first in the tool list
- **C.** Add a system-prompt paragraph that describes all 22 tools again in more detail than their own descriptions
- **D.** Raise the effort level so the agent spends more reasoning on choosing among the 22 tools each turn

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

More tools means more decision complexity and more near-miss choices. Scoping the agent to the tools its role needs restores selection reliability.

_Why a tempting wrong answer misses:_ Reordering (B) does not reduce the number of options the model must weigh on each turn.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools

</details>

---

### Question 55 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Tool interface design · medium*

The agent selects the right tool but often passes the date argument in the wrong format, causing failures. Where is the most effective place to fix this?

- **A.** Retry the call repeatedly with different formats until one of them happens to be accepted, then reuse that format for the rest of the conversation
- **B.** Add a global instruction to 'use correct formats'
- **C.** Lower the sampling temperature
- **D.** Put the expected format and a concrete example directly in the tool's description, and constrain it in the input_schema

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The tool description is the primary place the model learns how to call a tool, so stating the exact format with an example (backed by input_schema constraints) fixes malformed arguments at the source.

_Why a tempting wrong answer misses:_ A vague global 'use correct formats' (B) gives no concrete target; the specific format belongs in the tool's own description where the model reads it.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools

</details>

---

### Question 56 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Escalation and ambiguity · hard*

A customer claims their package never arrived, but the tracking tool shows 'delivered.' A teammate says the agent should escalate any time evidence conflicts. Is escalation the right default here?

- **A.** Yes, any time the evidence conflicts the agent should escalate immediately, since a mismatch between the customer and the system is inherently beyond its authority
- **B.** Yes, because the agent is not capable of handling disputes
- **C.** No, this is a handleable case within policy (open a missing-package claim per the documented process); escalate for genuine policy gaps, not every evidentiary conflict
- **D.** No, the agent should simply side with the tracking system and close the ticket

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Escalation is for genuine policy gaps, not routine evidentiary conflicts that a documented procedure (like a missing-package claim) already covers.

_Why a tempting wrong answer misses:_ Escalating every conflict (A) floods humans with cases the agent can resolve within policy, which defeats the purpose of an automated resolution agent.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 57 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Structured tool errors · medium*

One of the agent's tool calls fails with an error. How should the loop handle it so the agent can recover?

- **A.** Silently drop the failed tool_result and continue as though it succeeded so the resolution keeps moving
- **B.** Return a tool_result with is_error: true describing the failure so the agent can retry, switch tools, or ask
- **C.** Abort the entire conversation immediately so a failed tool cannot cascade into a wrong customer action
- **D.** Remove the failing tool from the agent permanently so that particular error can never occur again

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A failed tool should return a tool_result with is_error true so the model can see the failure and recover, rather than being misled into thinking the call succeeded.

_Why a tempting wrong answer misses:_ Dropping the failed result (A) makes the model believe the call worked, producing incorrect downstream actions built on a phantom success.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls

</details>

---

### Question 58 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Escalation and ambiguity · easy*

A customer says 'I want a refund' with no order reference, and the agent has no way to identify which purchase they mean. What is the best next step?

- **A.** Ask the customer for the order number or another identifier so the correct order can be located before acting
- **B.** Refund the customer's most expensive recent order, on the assumption that a refund request most likely concerns the purchase they care about most
- **C.** Refund every order currently on the customer's account, assuming that at least one of them must be the purchase the refund request was about
- **D.** Tell the customer that issuing any refund is impossible right now because the team is short-staffed, and ask them to try again some other time

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

When required information is missing or ambiguous, the agent should request the disambiguating detail rather than guess which order to act on.

_Why a tempting wrong answer misses:_ Refunding the most expensive order (B) is a guess that can refund the wrong purchase; the agent must ask which order is meant.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 59 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Escalation and ambiguity · medium*

Under pressure to resolve tickets without escalating, the agent starts stating specific policies (return windows, fees) that do not appear anywhere in its knowledge base. What is the root problem and fix?

- **A.** The model is being too creative; lower temperature so it stops volunteering policy it cannot support
- **B.** The knowledge base is too long; shorten it so the agent can retrieve the right policy snippets faster
- **C.** The agent simply needs more tools so it can look up fees and return windows without inventing them
- **D.** The agent is fabricating to fill policy gaps; give explicit criteria to recognize gaps and escalate instead

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Fabricated policy is the failure mode of not escalating genuine gaps; explicit gap-recognition criteria plus an escalation path stop the model from inventing rules.

_Why a tempting wrong answer misses:_ Lowering temperature (A) does not teach the model where real policy ends, so it will keep confidently filling gaps with invented specifics.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations

</details>

---

### Question 60 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Agent SDK hooks · medium*

Refund policy caps automatic refunds at $100, above which a manager must approve. Relying on the prompt, the agent occasionally issues automatic refunds above the cap. What is the best fix?

- **A.** Restate the $100 cap in the system prompt in bold near the tool definition so the agent sees it each turn
- **B.** Ask the agent to double-check the amount before issuing so it catches over-cap refunds itself
- **C.** Enforce the cap in code so issue_refund (or a wrapper) rejects or routes over-$100 amounts to approval
- **D.** Give the agent more few-shot examples of the cap during prompting so it internalizes the limit

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

A hard business limit should be enforced programmatically at the tool boundary so it holds regardless of whether the model follows the prompt on a given run.

_Why a tempting wrong answer misses:_ A bolded prompt rule (A) still depends on model compliance every time, whereas a code-enforced cap cannot be bypassed by a wayward generation.

Reference: https://code.claude.com/docs/en/agent-sdk/hooks

</details>

---

### Question 61 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Large-codebase context · medium*

A three-phase investigation (map the modules, trace the data flow, then assess risk) is running out of context during phase two because phase one's raw exploration output is still in the conversation. What should you do between phases?

- **A.** Summarize phase one's key findings and pass that summary into the next phase's subagents, compacting if needed
- **B.** Keep all of phase one's raw output, because deleting any of it risks losing an important detail
- **C.** Start phase two in a new session with no information from phase one, to keep the context clean
- **D.** Ask the agent to answer the risk question now, skipping phase two to avoid running out of space

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Summarizing findings at phase boundaries and injecting the summary into the next phase's initial context keeps what matters while freeing space; /compact helps when discovery output has piled up.

_Why a tempting wrong answer misses:_ A clean session with nothing carried over (C) throws away the phase-one map that phase two depends on.

Reference: https://code.claude.com/docs/en/context-window

</details>

---

### Question 62 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Agentic loops · medium*

Your support agent loop is driven by stop_reason, but you also want to prevent a pathological case where the model keeps requesting tools indefinitely. What is a reasonable safeguard that does not break normal operation?

- **A.** Keep stop_reason as the primary control but add a maximum-iteration cap as a safety backstop
- **B.** Replace the stop_reason check with a fixed two-iteration limit so the loop always stops early
- **C.** Parse the assistant's natural-language text for 'done' instead of reading stop_reason
- **D.** Remove all tools from the agent so the loop can never continue after the first response

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

stop_reason should remain the primary signal, with a max-iteration cap only as a backstop for pathological loops, degrading gracefully if the cap is reached.

_Why a tempting wrong answer misses:_ A fixed two-iteration limit (B) would cut off normal multi-step resolutions that legitimately need more tool calls to finish.

Reference: https://code.claude.com/docs/en/agent-sdk/agent-loop

</details>

---

### Question 63 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Path-scoped rules · hard*

A .claude/rules/ file with paths: ["migrations/**"] loads correctly when Claude reads a migration. In a long session, after /compact, Claude stops following that rule even while still editing migrations. What explains this?

- **A.** Path-scoped rules expire after a fixed number of turns and must be re-enabled with a slash command
- **B.** The glob is wrong; migrations/** only matches files at the top level of the migrations folder
- **C.** Compaction deletes the .claude/rules/ directory, so the rule file must be restored from version control
- **D.** Path-scoped rules enter message history when triggered, so compaction summarizes them away with the rest

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A path-scoped rule loads into the conversation when a matching file is read, so compaction can summarize it away. If a rule must survive compaction, drop the paths field or move it to the project-root CLAUDE.md.

_Why a tempting wrong answer misses:_ The glob (B) is fine; ** matches files at any depth, and the rule did load before compaction.

Reference: https://code.claude.com/docs/en/memory

</details>

---

### Question 64 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Slash commands and skills · medium*

You wrote a /deploy skill that pushes to production. You want it to run only when a developer types /deploy, never because Claude decided the code looked ready. Which frontmatter setting does that?

- **A.** user-invocable: false
- **B.** context: fork
- **C.** disable-model-invocation: true
- **D.** argument-hint: [environment]

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

disable-model-invocation: true stops Claude from loading or running the skill on its own, which suits workflows with side effects that a person should trigger deliberately.

_Why a tempting wrong answer misses:_ user-invocable: false (A) does the opposite: it hides the skill from the / menu so only Claude can invoke it.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 65 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Slash commands and skills · hard*

Which TWO statements about skill frontmatter in Claude Code are accurate? (Select 2.)

- **A.** argument-hint is text shown during autocomplete to indicate which arguments the skill expects
- **B.** allowed-tools removes every tool it does not list, so the skill cannot call anything else
- **C.** context: fork runs the skill in its own subagent context, apart from the main conversation
- **D.** A skill in .claude/skills/ always overrides a personal skill of the same name in ~/.claude/skills/
- **E.** disable-model-invocation: true hides the skill from the / menu so that only Claude can run it

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

argument-hint is an autocomplete hint, and context: fork runs the skill in a separate subagent context. Both are documented frontmatter fields.

_Why a tempting wrong answer misses:_ allowed-tools (B) pre-approves the listed tools for that turn; it does not restrict the others. To remove tools, use disallowed-tools.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 66 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Slash commands and skills · hard*

Your autonomous /triage-backlog skill runs unattended and must never stop to ask the developer a question through AskUserQuestion. Which frontmatter setting removes that tool while the skill is active?

- **A.** allowed-tools listing every tool except AskUserQuestion
- **B.** disallowed-tools: AskUserQuestion
- **C.** user-invocable: false
- **D.** argument-hint: [no-questions]

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

disallowed-tools removes the named tools from Claude's pool while the skill is active. allowed-tools only pre-approves tools for the invoking turn and leaves every other tool callable.

_Why a tempting wrong answer misses:_ Listing everything else in allowed-tools (A) grants permissions but does not take AskUserQuestion away.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 67 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Slash commands and skills · medium*

Your /release-notes skill needs a version number. Developers type /release-notes 4.2.0, but the skill body never uses the value. How should the body reference what the developer typed?

- **A.** With the $ARGUMENTS placeholder, or $0 for the first argument, which Claude Code replaces with the typed text
- **B.** By asking Claude in the body to scroll back through the chat and find whatever the developer typed
- **C.** By adding an argument-hint field, which stores the typed value in an environment variable for Bash
- **D.** By reading a file named ARGUMENTS in the skill directory, which Claude Code writes on each call

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Claude Code substitutes $ARGUMENTS with the full argument string and $N with individual arguments in the skill's content.

_Why a tempting wrong answer misses:_ argument-hint (C) only shows a hint in autocomplete; it does not capture or pass the value.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 68 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Slash commands and skills · hard*

The repository ships a /deploy skill in .claude/skills/deploy/. One developer's /deploy behaves differently from everyone else's. You find a deploy skill in their ~/.claude/skills/ folder. What is happening?

- **A.** Project skills always win, so the difference must come from their local settings rather than the skill
- **B.** Claude Code merges the two skills into one, and the personal file's steps are appended to the project's
- **C.** Personal skills take precedence over project skills with the same name, so their personal copy runs
- **D.** Claude Code picks one of the two same-named skills at random on each invocation of /deploy

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

When skills share a name, enterprise wins over personal and personal wins over project. The developer's personal deploy skill shadows the team's version; renaming the personal one resolves it.

_Why a tempting wrong answer misses:_ Project skills do not override personal ones (A); the precedence runs the other way.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 69 of 117

**Scenario: Code Generation with Claude Code**
*Study area: CLAUDE.md hierarchy · medium*

In a monorepo, the payments package must follow your PCI coding standard and the web package must follow your accessibility standard. Both standards live as separate markdown files in /standards. How can each package pull in only the standard it needs?

- **A.** Paste both standards into the root CLAUDE.md so every package receives both documents in full
- **B.** Rename each standards file to CLAUDE.md and copy it into every directory of the monorepo
- **C.** Store both standards as personal rules so that each engineer can decide which one to load
- **D.** Import the relevant file from each package's CLAUDE.md with @path syntax, such as @../../standards/pci.md

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

CLAUDE.md files can import other files with @path syntax. Each package's CLAUDE.md can import just the standards that apply to it, keeping configuration modular.

_Why a tempting wrong answer misses:_ Putting both in the root file (A) loads irrelevant standards everywhere and grows every session's context.

Reference: https://code.claude.com/docs/en/memory

</details>

---

### Question 70 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Plan mode vs direct execution · medium*

You must migrate 60 files from a deprecated HTTP client to a new one, and the new client handles retries differently. Which workflow fits best?

- **A.** Use plan mode to investigate usage patterns and agree on an approach, then execute the approved plan directly
- **B.** Start editing the files one by one immediately and adjust the approach whenever a test starts failing
- **C.** Stay in plan mode for the whole migration so that every one of the 60 file edits gets planned in detail
- **D.** Ask Claude to rewrite all 60 files in a single response without any investigation beforehand

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Plan mode suits the investigation and design phase of a change with real choices to make. Once the approach is agreed, direct execution implements it efficiently.

_Why a tempting wrong answer misses:_ Jumping straight into edits (B) risks rework across dozens of files once the retry difference surfaces.

Reference: https://code.claude.com/docs/en/permission-modes

</details>

---

### Question 71 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Iterative refinement · medium*

You need a caching layer for a pricing service, a domain you have not worked in. You are not sure what invalidation or failure cases matter. What is an effective way to start with Claude Code?

- **A.** Ask Claude to implement the cache immediately and fix whatever breaks during code review later
- **B.** Paste a generic caching tutorial into the prompt and ask Claude to follow it exactly as written
- **C.** Ask Claude to interview you first, raising questions about invalidation, staleness, and failures before it writes code
- **D.** Skip the design discussion and ask Claude for three implementations so you can pick one at random

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Having Claude ask questions before implementing surfaces considerations you may not have anticipated, such as invalidation strategy and failure modes, so the design is settled before code exists.

_Why a tempting wrong answer misses:_ Implementing first (A) pushes design discovery into review, where changes are more expensive.

Reference: https://code.claude.com/docs/en/best-practices

</details>

---

### Question 72 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Iterative refinement · medium*

You want Claude Code to build a currency-rounding module with strict rules for half-cent cases, negative amounts, and very large values. Which iteration approach gives the most dependable result?

- **A.** Describe the rules in a long paragraph, then accept the first version that compiles without errors
- **B.** Write tests for expected behavior and the edge cases first, then iterate by sharing the failing tests
- **C.** Ask Claude to write the module and its tests together, then trust that passing tests prove correctness
- **D.** Implement the module yourself and ask Claude only to add comments explaining how it works to others

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Test-driven iteration makes the requirements executable. Sharing concrete failures gives Claude precise feedback and progressively improves the implementation.

_Why a tempting wrong answer misses:_ Tests written alongside the code (C) can encode the same misunderstanding as the implementation.

Reference: https://code.claude.com/docs/en/best-practices

</details>

---

### Question 73 of 117

**Scenario: Developer Productivity with Claude**
*Study area: MCP server integration · medium*

Your team wants Claude to read and update issues in a widely used issue tracker. An engineer proposes writing a custom MCP server from scratch. A well-maintained community server for that tracker already exists. What is the sensible default?

- **A.** Write the custom server anyway, since any server not written in-house cannot be connected to Claude Code
- **B.** Skip MCP and give the agent Bash access so it can call the tracker's REST API directly with curl
- **C.** Use the existing community server for the standard integration and save custom servers for team-specific workflows
- **D.** Ask Claude to reimplement the tracker's API inside a skill so no server is needed for the integration at all

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Standard integrations are well served by existing servers, which saves build and maintenance effort. Custom servers earn their keep for workflows unique to your team.

_Why a tempting wrong answer misses:_ Raw curl through Bash (B) gives up the typed tool interface and puts credentials and parsing on the agent.

Reference: https://code.claude.com/docs/en/mcp

</details>

---

### Question 74 of 117

**Scenario: Code Generation with Claude Code**
*Study area: CLAUDE.md hierarchy · easy*

You want Claude to use your personal sandbox URL and test account in this one repository, without committing them or applying them to your other projects. Where do they belong?

- **A.** In the project CLAUDE.md, under a heading that asks teammates to ignore the personal section
- **B.** In ~/.claude/CLAUDE.md, since that file is private to you and applies in every project you open
- **C.** In a CLAUDE.local.md at the project root, added to .gitignore so it stays on your machine only
- **D.** In a path-scoped rule under .claude/rules/ that matches only the files you personally edit

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

CLAUDE.local.md holds personal, project-specific preferences. It loads alongside CLAUDE.md and, when gitignored, never reaches the repository.

_Why a tempting wrong answer misses:_ ~/.claude/CLAUDE.md (B) is private but applies to all your projects, not just this one.

Reference: https://code.claude.com/docs/en/memory

</details>

---

### Question 75 of 117

**Scenario: Code Generation with Claude Code**
*Study area: CLAUDE.md hierarchy · hard*

Your repo has services/billing/CLAUDE.md with billing conventions. A developer launches Claude Code at the repo root and asks a general question about billing, and the answer ignores those conventions. Nothing is misconfigured. Why?

- **A.** Subdirectory CLAUDE.md files load on demand when Claude reads files in that directory, not at launch
- **B.** Only one CLAUDE.md can load per session, and the root file always replaces every nested file
- **C.** Nested CLAUDE.md files apply only when the file is named CLAUDE.local.md and is gitignored
- **D.** Claude Code reads nested CLAUDE.md files only in plan mode, never in the default permission mode

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Files in the directory hierarchy above the working directory load at launch. CLAUDE.md files in subdirectories load when Claude reads files there, so a question answered without touching billing files never pulls them in.

_Why a tempting wrong answer misses:_ Multiple CLAUDE.md files are concatenated rather than replacing one another (B).

Reference: https://code.claude.com/docs/en/memory

</details>

---

### Question 76 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Plan mode vs direct execution · easy*

A ticket says: 'rename the variable userId to accountId across the auth module and update all references.' It is unambiguous and low-risk. What is the appropriate mode?

- **A.** Use plan mode to design the rename carefully before acting, mapping out every reference to the variable so that nothing in the auth module gets missed
- **B.** Direct execution, since the task is well-specified and low-ambiguity
- **C.** Spin up a small multi-agent research system to investigate and perform the rename across the auth module
- **D.** Escalate the rename to a human software architect for a design decision before touching any of the references

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Direct execution suits well-specified, low-ambiguity changes; plan mode is reserved for architecturally significant or ambiguous work, so it would be overkill here.

_Why a tempting wrong answer misses:_ Plan mode (A) adds exploration and design overhead with no payoff for a mechanical, unambiguous rename.

Reference: https://code.claude.com/docs/en/common-workflows

</details>

---

### Question 77 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Path-scoped rules · hard*

A teammate proposes using a .claude/rules/ file with a glob to encode your five-step release workflow so it 'loads automatically.' Why is a rule the wrong tool, and what fits?

- **A.** Rules cannot contain markdown, so use a skill
- **B.** Rules actually load for every task the way CLAUDE.md does, so the release workflow belongs in CLAUDE.md instead, where its always-on nature is expected
- **C.** .claude/rules/ globs scope by file path, not by task; a multi-step workflow should be a Skill triggered by keywords
- **D.** Rules are deprecated, so use CLAUDE.md

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Rules are for file-path/glob scoping, not workflow scoping; a multi-step release workflow belongs in a keyword-triggered Skill.

_Why a tempting wrong answer misses:_ Option B misstates rules as loading for every task (that is CLAUDE.md); the real mismatch is that rules scope by path, not by workflow trigger.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 78 of 117

**Scenario: Developer Productivity with Claude**
*Study area: MCP server integration · medium*

You configured an MCP server in .mcp.json and a teammate says it should instead go in the 'user' scope. What distinguishes the project scope (.mcp.json) from the user and local scopes?

- **A.** Project scope is only for stdio servers while user scope is only for HTTP servers, so where the config lives is determined by the transport the server uses
- **B.** Project and user scopes are identical, so the choice is cosmetic
- **C.** Project scope disables environment-variable expansion
- **D.** The project scope (.mcp.json) is version-controlled and shared with everyone who clones the repo, while user and local scopes are private to an individual developer

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

.mcp.json is the project scope: version-controlled and shared with the team, whereas user and local scopes are per-developer and not distributed via the repo.

_Why a tempting wrong answer misses:_ Transport type, stdio versus HTTP (A), is independent of scope; any scope can configure either transport.

Reference: https://code.claude.com/docs/en/mcp

</details>

---

### Question 79 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Few-shot prompting · medium*

Generated code keeps coming back in a formatting style your repo does not use, even after you describe the style in words. What most reliably fixes it?

- **A.** Describe the repository's formatting style in even more detail in the prompt, enumerating the spacing, ordering, and naming rules that the model keeps missing
- **B.** Show a few-shot example of a correctly-formatted snippet from your repo so the model has a concrete pattern to match
- **C.** Increase max_tokens so there is more than enough room in the response for the model to lay the generated code out in your repository's formatting style
- **D.** Switch to a larger model

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Few-shot examples beat instructions for consistent output format; a real correctly-formatted snippet gives the model a concrete pattern to imitate.

_Why a tempting wrong answer misses:_ More detailed rules (A) restate guidance the model already missed; a worked example shows the target style directly.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting

</details>

---

### Question 80 of 117

**Scenario: Code Generation with Claude Code**
*Study area: CLAUDE.md hierarchy · medium*

You personally prefer verbose commit messages and want that to apply across all of your repositories, without imposing it on teammates. Where does that instruction belong?

- **A.** In your user-level ~/.claude/CLAUDE.md, which applies to your sessions across projects without affecting teammates
- **B.** Put the verbose-commit-message preference in each project's CLAUDE.md so it applies while you work there, accepting that teammates in those repos inherit it too
- **C.** In a .claude/rules/ file committed to every repo
- **D.** In a project Skill

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Personal, cross-project preferences belong in the user-level ~/.claude/CLAUDE.md, which applies to your sessions everywhere without touching shared project files.

_Why a tempting wrong answer misses:_ Putting it in each project's CLAUDE.md (B) would impose your personal preference on the whole team and only in the repos you edit.

Reference: https://code.claude.com/docs/en/memory

</details>

---

### Question 81 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Plan mode vs direct execution · hard*

When Claude Code delegates codebase research to its built-in Explore subagent, the summary it returns sometimes ignores naming conventions written in your project CLAUDE.md. What explains this?

- **A.** Explore runs on an older model that is not able to follow instructions written in markdown files
- **B.** Explore and Plan skip CLAUDE.md files to keep research fast, so conventions there do not reach them
- **C.** Explore reads only files under .claude/, so it never sees any of the source code it summarizes
- **D.** The main agent strips the summary of every convention before showing it, to save context space

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The built-in Explore and Plan subagents skip CLAUDE.md and the git status snapshot to keep research fast and inexpensive. Conventions the main agent must apply stay in the main conversation.

_Why a tempting wrong answer misses:_ Explore does read source code (C); its purpose is to search and understand the codebase without making changes.

Reference: https://code.claude.com/docs/en/sub-agents

</details>

---

### Question 82 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Iterative refinement · medium*

A generated import script has three problems: dates parse in the wrong timezone, the resulting off-by-one day breaks deduplication, and the dedupe step then drops valid rows. How should you report them to Claude?

- **A.** Report one problem per message and wait for each fix, since tackling them separately is always safest
- **B.** Report only the dropped rows, because that is the symptom users notice, and let Claude find the rest
- **C.** Ask Claude to regenerate the whole script from scratch without describing any of the three problems
- **D.** Describe all three in one detailed message, because the fixes interact and must be designed together

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

When issues interact, fixing them one at a time can produce changes that conflict. One message that lays out all three lets Claude design a coherent fix. Independent issues can be handled sequentially.

_Why a tempting wrong answer misses:_ Sequential fixes (A) suit independent problems; here each fix changes the input to the next step.

Reference: https://code.claude.com/docs/en/best-practices

</details>

---

### Question 83 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Context preservation · medium*

Your support backend sends each new customer message to the Messages API on its own. The agent keeps asking for the order number the customer gave two messages earlier. What is wrong?

- **A.** The model's memory expires after a few seconds, so customers must repeat details in each message
- **B.** The API is stateless, so each request must include the prior conversation turns for the model to see them
- **C.** Order numbers are filtered out of requests for privacy, so the model never receives them at all
- **D.** The agent needs a larger max_tokens value to remember messages that arrived earlier in the chat

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The Messages API does not store conversation state between calls. Coherent multi-turn behavior requires sending the relevant history, or a maintained summary plus key facts, with every request.

_Why a tempting wrong answer misses:_ max_tokens (D) caps the length of the response; it has nothing to do with what the model can see from earlier turns.

Reference: https://platform.claude.com/docs/en/build-with-claude/working-with-messages

</details>

---

### Question 84 of 117

**Scenario: Structured Data Extraction**
*Study area: Schema-enforced output · hard*

After moving an extraction job to Claude Opus 5.5, requests that set tool_choice to {"type": "any"} now fail with a 400 error. You still need schema-valid structured results. What should you use?

- **A.** Switch tool_choice to {"type": "tool", "name": "extract"}, which forces one named tool
- **B.** Remove the tools and prefill the assistant turn with an opening brace to start the JSON
- **C.** Keep tool_choice auto with strict: true on the tool, or request output_config.format with a JSON schema
- **D.** Set temperature to 0 so the model reliably calls the extraction tool without being forced

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Claude Opus 5.5, Sonnet 5.5, and Fable 5.1 reject forced tool use (any or a named tool). The documented alternatives are auto with strict tool use for schema-valid inputs, or structured outputs for a fixed JSON response.

_Why a tempting wrong answer misses:_ A named-tool choice (A) is also forced tool use and returns the same 400 on these models.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools

</details>

---

### Question 85 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: Batch processing · hard*

You enabled prompt caching with a large static system prompt first, but cache hit rates are near zero. Logs show you prepend the current timestamp to the system prompt on every request. What is happening?

- **A.** Timestamps are ignored by the cache when it computes a prefix match, so prepending one cannot be what is driving your near-zero cache hit rate here
- **B.** Caching only works on the user message, not the system prompt
- **C.** Any change in the cached prefix invalidates everything after it, so a per-request timestamp at the front busts the cache every time
- **D.** The cache TTL is set too long, so entries never refresh

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Prompt caching is prefix-match: a value that changes every request (a timestamp or UUID) at the front invalidates the entire cache, so volatile content must go last.

_Why a tempting wrong answer misses:_ Caching does apply to the system prompt and tools (B); the actual problem is the changing prefix, not what is eligible to be cached.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

</details>

---

### Question 86 of 117

**Scenario: Structured Data Extraction**
*Study area: Schema-enforced output · hard*

You enabled structured outputs with a strict JSON schema for receipt extraction. Which TWO problems can still occur and still need validation? (Select 2.)

- **A.** A response that cannot be parsed as JSON at all
- **B.** A tax amount placed in the tip field of the output
- **C.** A required field that is missing from the object
- **D.** Line items that do not add up to the printed total
- **E.** A string value where the schema requires a number

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, D**

Structured outputs guarantee valid JSON, correct types, and required fields, but not semantic correctness. Values in the wrong field and totals that do not reconcile still need checks.

_Why a tempting wrong answer misses:_ Parse failures, missing required fields, and type mismatches (A, C, E) are the syntactic problems a strict schema eliminates.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

### Question 87 of 117

**Scenario: Structured Data Extraction**
*Study area: Batch processing · medium*

Which statement about the Message Batches API is accurate?

- **A.** It is asynchronous, about 50% cheaper, finishes within 24 hours (often sooner), and results may return out of order
- **B.** It is synchronous and returns results in submission order, so responses can drive a live agent loop
- **C.** It is real-time and cheaper because it skips safety checks that the Messages API would apply
- **D.** It guarantees sub-second latency for high-volume jobs, making it ideal for blocking merge gates

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Batch processing is asynchronous and about 50% cheaper, finishes within 24 hours (usually faster), and you correlate results to requests by custom_id since they return in any order.

_Why a tempting wrong answer misses:_ Batch is asynchronous and unordered (B is wrong); you must match each result to its request via custom_id rather than relying on submission order.

Reference: https://platform.claude.com/docs/en/build-with-claude/batch-processing

</details>

---

### Question 88 of 117

**Scenario: Structured Data Extraction**
*Study area: Schema-enforced output · medium*

Your lease-extraction schema marks renewal_option_date as required. For leases without a renewal option, the model returns plausible but invented dates. What schema change addresses this?

- **A.** Keep the field required and add a prompt line asking the model to be honest about the renewal date
- **B.** Make the field nullable so that the model can return null when the lease does not contain a date
- **C.** Replace the date field with a free-text notes field so that the model can say anything it likes
- **D.** Remove the field from the schema and ask reviewers to find renewal dates by hand for every lease

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

When source documents may lack a value, a required field pressures the model to fabricate one. A nullable or optional field lets it report absence honestly.

_Why a tempting wrong answer misses:_ A prompt plea (A) fights the schema, which still demands a value on every lease.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

### Question 89 of 117

**Scenario: Structured Data Extraction**
*Study area: Schema-enforced output · hard*

You need the model's final response to conform exactly to a JSON schema so a downstream service can parse it without defensive code. On current models, what is the recommended mechanism?

- **A.** Prefill the assistant message with an opening brace so the model is forced to continue as JSON, then parse whatever it produces after that starting token
- **B.** Ask for JSON in the prompt and hope it complies
- **C.** Use output_config.format with a JSON schema to constrain the response, and strict: true on a tool to guarantee valid tool arguments
- **D.** Post-process the text with a JSON-repair library

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Structured outputs via output_config.format with a JSON schema constrain the response to valid JSON, and strict: true guarantees valid tool arguments; this replaces the old prefill trick.

_Why a tempting wrong answer misses:_ Assistant-message prefills (A) return a 400 on current models and are no longer the way to force JSON; structured outputs are the supported mechanism.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

### Question 90 of 117

**Scenario: Developer Productivity with Claude**
*Study area: MCP server integration · easy*

In the Model Context Protocol, which trio names the core primitives a server can expose?

- **A.** prompts, embeddings, and fine-tunes, which together let a server supply reusable prompts and the vector data a client needs to ground its answers
- **B.** endpoints, webhooks, and secrets
- **C.** agents, workflows, and pipelines
- **D.** tools, resources, and prompts

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

MCP servers expose three core primitives: tools, resources, and prompts.

_Why a tempting wrong answer misses:_ Embeddings and fine-tunes (A) are not MCP primitives; the correct trio is tools, resources, and prompts.

Reference: https://platform.claude.com/docs/en/agents-and-tools/mcp

</details>

---

### Question 91 of 117

**Scenario: Developer Productivity with Claude**
*Study area: MCP server integration · medium*

You are connecting Claude to a local MCP server running on the same machine and, separately, to a remote hosted one. Which transports fit these two cases?

- **A.** stdio for the local server and streamable HTTP for the remote server
- **B.** HTTP for the local server on localhost and stdio for the remote server over the network
- **C.** WebSocket for both servers, since the MCP specification allows only that one transport
- **D.** gRPC for the local server and a plain REST API for the remote hosted server

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

stdio suits a server launched as a local process on the same machine, and streamable HTTP is the standard transport for a remote server reached over the network.

_Why a tempting wrong answer misses:_ stdio (B) communicates over a child process's standard input and output, so it cannot reach a server running on another host.

Reference: https://code.claude.com/docs/en/mcp

</details>

---

### Question 92 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Agentic loops · medium*

A team wants Claude to run an agent loop with tool execution, context management, and file/permission handling largely handled for them, rather than writing that orchestration against raw HTTP. Which choice matches?

- **A.** The raw Messages API, because it already ships with a built-in harness that runs the full agent loop
- **B.** The Claude Agent SDK, which provides the harness (loop, tool execution, context handling) on top of the API
- **C.** The Batches API, which manages multi-step agent loops asynchronously at a lower unit cost
- **D.** Either surface interchangeably; the Messages API and Agent SDK expose the same harness behavior

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The Claude Agent SDK provides the agent harness (loop, tool execution, context handling) built on the API, while the raw Messages API gives you the primitives and you assemble the loop yourself.

_Why a tempting wrong answer misses:_ The raw Messages API (A) does not include a harness; you would have to write the loop, tool dispatch, and context handling manually.

Reference: https://code.claude.com/docs/en/agent-sdk/overview

</details>

---

### Question 93 of 117

**Scenario: Structured Data Extraction**
*Study area: Context preservation · medium*

Before sending a large request you want an accurate token count for the exact model and message shape you will use. What is the right approach?

- **A.** Estimate with a generic tokenizer library like tiktoken, which is close enough in practice that the small difference rarely affects how you size a request
- **B.** Divide the total character count by four to approximate the token count, which is usually close enough for sizing a request before you send it
- **C.** Use the count_tokens endpoint, which counts for the actual model and request structure
- **D.** Send the request and read the usage figures afterward, since there is really no reliable way to count the tokens beforehand

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The count_tokens endpoint returns an accurate count for the specific model and request shape, which generic tokenizers cannot match.

_Why a tempting wrong answer misses:_ tiktoken (A) is a different provider's tokenizer and will not reflect Claude's tokenization; use the count_tokens endpoint instead.

Reference: https://platform.claude.com/docs/en/build-with-claude/token-counting

</details>

---

### Question 94 of 117

**Scenario: Structured Data Extraction**
*Study area: Schema-enforced output · medium*

Your support-ticket classifier uses an enum of eight categories. New kinds of tickets get forced into the nearest category, and truly ambiguous tickets get a confident label. What schema design handles both?

- **A.** Grow the enum to 60 categories so that every conceivable ticket has an exact match somewhere
- **B.** Replace the enum with free text so the model can describe each ticket in its own words
- **C.** Add 'other' with a detail string for new kinds, and 'unclear' for tickets that are truly ambiguous
- **D.** Keep the eight categories and ask the model to pick the first one whenever it is unsure

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

An 'other' value paired with a detail field makes the category set extensible, and an 'unclear' value lets the model flag ambiguity instead of guessing.

_Why a tempting wrong answer misses:_ Free text (B) loses the consistency downstream systems need to route and count tickets.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

### Question 95 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Agentic loops · hard*

Claude requested three tools in a single turn. Your code returns each tool_result in its own separate user message across three API calls. Over time Claude stops calling tools in parallel. Why?

- **A.** Splitting tool_results across multiple messages trains the model away from parallel calls; all tool_results for a turn should be returned together in one user message
- **B.** Parallel tool use is only available on the Haiku models, so once your traffic shifts to a larger model the requests stop being dispatched in parallel
- **C.** The tools' schemas must be merged into one combined schema
- **D.** You must set tool_choice to any to keep parallelism

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

All tool_results for a turn should be returned together in a single user message; splitting them across messages trains Claude to stop calling tools in parallel.

_Why a tempting wrong answer misses:_ tool_choice (D) controls whether a tool must be called, and the newest models reject any and named-tool values with a 400; it does nothing for parallelism. The remedy is returning all results together in one message.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use

</details>

---

### Question 96 of 117

**Scenario: Structured Data Extraction**
*Study area: Schema-enforced output · medium*

Your strict schema requires ISO 8601 dates, but source forms write dates as '3/4/25', '4 March 2025', and '2025.03.04', and some US-format dates come out with day and month swapped. What should you add?

- **A.** Nothing, because the schema's date format already tells the model how to read each source format
- **B.** A post-processing step that rejects every date and asks a human to re-enter all of them by hand
- **C.** A looser schema that accepts any string, so the source formatting is preserved exactly as written
- **D.** Explicit normalization rules in the prompt, such as how to read slashed dates and what to do when unsure

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A strict schema fixes the output shape, but it does not tell the model how to interpret inconsistent source formats. Normalization rules in the prompt resolve that ambiguity.

_Why a tempting wrong answer misses:_ Loosening the schema (C) pushes the inconsistency downstream instead of resolving it.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

### Question 97 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Agentic loops · medium*

Your agent loop must handle every way a turn can end. Which set correctly lists Messages API stop_reason values you should branch on?

- **A.** success, failure, retry, and timeout, which tell the loop whether a turn should be tried again
- **B.** complete, incomplete, and error, the three states that show whether a turn finished cleanly
- **C.** end_turn, tool_use, max_tokens, stop_sequence, pause_turn, refusal, and model_context_window_exceeded
- **D.** done, continue, and stop, a simple trio of control signals for deciding whether to call again

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The documented stop_reason values are end_turn, tool_use, max_tokens, stop_sequence, pause_turn (a server-tool loop hit its iteration limit), refusal, and model_context_window_exceeded. A robust loop branches on each.

_Why a tempting wrong answer misses:_ Options like success/failure/retry (A) are invented; the API reports structured stop_reason values such as end_turn and tool_use.

Reference: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

</details>

---

### Question 98 of 117

**Scenario: Structured Data Extraction**
*Study area: Batch processing · medium*

You need to classify five million short product listings into a fixed set of categories overnight. Quality tests show every current model is accurate enough. Which choice best minimizes cost?

- **A.** Claude Haiku 4.5 through the Message Batches API
- **B.** Claude Fable 5.1 through the synchronous Messages API
- **C.** Claude Opus 5.5 with the effort level set to max
- **D.** Claude Sonnet 5.5 called one listing at a time

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Haiku 4.5 is the fastest and cheapest current model for high-volume, bounded tasks, and the Batch API halves the price for latency-tolerant work.

_Why a tempting wrong answer misses:_ Fable 5.1 (B) is the most capable and most expensive model; its extra reasoning adds cost without benefit on a simple task.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

### Question 99 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Agentic loops · hard*

On the newest models, how do you increase reasoning depth for a hard multi-step problem, given that fixed budget_tokens and sampling controls have changed?

- **A.** Set a large budget_tokens value as before, since reserving more thinking tokens still controls depth
- **B.** Raise temperature so the model samples more aggressively and appears to think harder
- **C.** Use adaptive thinking (thinking type "adaptive") and set output_config.effort (low through max)
- **D.** There is no supported way to influence reasoning depth on current Claude models

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Current models use adaptive thinking (replacing fixed budget_tokens) with an effort setting from low through max to control reasoning depth; temperature is not the lever.

_Why a tempting wrong answer misses:_ Fixed budget_tokens (A) has been superseded by adaptive thinking on the newest models; you steer depth with the effort setting instead.

Reference: https://platform.claude.com/docs/en/build-with-claude/thinking

</details>

---

### Question 100 of 117

**Scenario: Claude Code for Continuous Integration**
*Study area: Batch processing · medium*

After enabling prompt caching you want to confirm at runtime that reads are actually hitting the cache. What tells you?

- **A.** The response latency on its own proves it, since a genuine cache read always comes back noticeably faster than an uncached request would
- **B.** A boolean 'cached' field on the message that is set to true whenever the response was served wholly or partly from a previously cached prefix
- **C.** The absence of any cache-related error in the response means the read must have worked and the prefix was served from the cache
- **D.** The usage object's cache_read_input_tokens (alongside the cache-creation fields) reported on the response

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The response usage reports cache_read_input_tokens (and cache-creation counts), which is the authoritative way to confirm caching is working.

_Why a tempting wrong answer misses:_ Latency (A) is noisy and not a reliable signal; the usage cache-token fields are what actually confirm a cache read.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

</details>

---

### Question 101 of 117

**Scenario: Structured Data Extraction**
*Study area: Task decomposition · medium*

Every insurance claim packet goes through the same steps: classify the document type, extract fields for that type, then check the fields against policy rules. The steps and their order never change. Which decomposition pattern fits?

- **A.** A fixed prompt chain in which each step's output feeds the next step's prompt
- **B.** A coordinator that invents a new plan for each packet based on what it finds
- **C.** A single prompt that performs classification, extraction, and checking together
- **D.** Parallel subagents that each attempt all three steps and then vote on a result

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

When the workflow is predictable, prompt chaining keeps each step focused and easy to test. Dynamic, adaptive decomposition is for open-ended tasks whose subtasks depend on what is discovered.

_Why a tempting wrong answer misses:_ A coordinator that replans every packet (B) adds cost and variability to a process that has no need for it.

Reference: https://www.anthropic.com/engineering/building-effective-agents

</details>

---

### Question 102 of 117

**Scenario: Multi-Agent Research System**
*Study area: Coordinator-subagent orchestration · medium*

In a hub-and-spoke research system, which TWO responsibilities belong to the coordinator? (Select 2.)

- **A.** Deciding how the research question is split into subtasks and which subagent receives each one
- **B.** Letting subagents message each other directly so they can trade findings without a round-trip
- **C.** Receiving each subagent's results and errors so it can aggregate them and decide on recovery
- **D.** Running every web search itself so that subagents only ever format the text that it returns
- **E.** Sharing its full conversation history with each subagent automatically at the moment of launch

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

The coordinator decomposes and delegates the work, and all results and failures flow back through it so it can aggregate, handle errors consistently, and decide what happens next.

_Why a tempting wrong answer misses:_ Direct subagent-to-subagent messaging (B) bypasses the hub and removes the central visibility and control that the pattern exists to provide.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 103 of 117

**Scenario: Multi-Agent Research System**
*Study area: Subagent context and spawning · hard*

The analysis subagent hands findings to synthesis as paragraphs of prose with sources mentioned in passing. The final report often attaches a claim to the wrong document. How should findings be passed between agents?

- **A.** As longer prose with a closing sentence that lists every source the analysis subagent consulted
- **B.** As a single citation list at the end of the handoff, numbered in the order the documents were read
- **C.** As raw copies of every source document, so synthesis can work out attribution again on its own
- **D.** As structured records that keep each claim separate from its metadata, such as source URL, document name, and page

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Separating content from metadata in a structured format preserves the link between each claim and its source as it moves between agents, so attribution survives synthesis.

_Why a tempting wrong answer misses:_ Passing raw documents (C) floods the synthesis context and forces it to redo analysis that already happened.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 104 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Agent SDK hooks · hard*

You are deciding which support-agent rules to enforce with Agent SDK hooks and which to leave to the system prompt. Which TWO rules most clearly need a hook? (Select 2.)

- **A.** Keep a warm, professional tone that matches the brand voice in every customer message
- **B.** Never issue a refund to an account that is flagged for suspected fraud in the risk system
- **C.** Suggest a relevant help-center article when the customer's question matches one directly
- **D.** Strip government ID numbers from tool results before the model can read or repeat them
- **E.** Prefer short paragraphs and plain language when explaining any billing policy to a customer

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, D**

Hooks give deterministic guarantees, so they belong on rules where a single miss causes real harm: blocking a prohibited financial action and removing sensitive data before the model sees it. Style and helpfulness guidance is fine as probabilistic prompt guidance.

_Why a tempting wrong answer misses:_ Tone and article suggestions (A, C, E) matter, but an occasional miss is tolerable and they depend on judgment that hooks cannot express.

Reference: https://code.claude.com/docs/en/agent-sdk/hooks

</details>

---

### Question 105 of 117

**Scenario: Code Generation with Claude Code**
*Study area: Session resume and fork · easy*

You run several long Claude Code investigations in the same repository and keep resuming the wrong one. What is the cleanest way to return to a specific investigation later?

- **A.** Give each session a name when you start it, then return with claude --resume and that name
- **B.** Use claude --continue each time, since it always opens the investigation you care about most
- **C.** Copy the transcript into CLAUDE.md so every new session starts with the investigation loaded
- **D.** Keep one terminal open per investigation and never close them, so no session ever needs resuming

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Named sessions can be resumed by name, which removes the guesswork of picking from a list or relying on whichever session was most recent.

_Why a tempting wrong answer misses:_ --continue (B) loads the most recent conversation in the directory, which is exactly how the wrong investigation gets picked up.

Reference: https://code.claude.com/docs/en/cli-reference

</details>

---

### Question 106 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Agentic loops · medium*

In your custom loop, after running a requested tool you append its output as a new assistant message that says 'Tool output: ...'. Claude then asks for the same tool again and seems unaware of the result. What is wrong?

- **A.** Tool output must be sent in the system prompt so that the model treats it as trusted context for its next step
- **B.** The result should be returned as a tool_result block in a user message that references the tool_use id
- **C.** Tool output is too long for the model to read, so it should be summarized before it goes back into the loop
- **D.** The loop should restart the conversation with only the tool output so the model focuses on it alone

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The API expects each tool result as a tool_result block, keyed to the tool_use id, in the next user message. Appending it as assistant text breaks that pairing, so the model never registers the call as answered.

_Why a tempting wrong answer misses:_ Putting tool output in the system prompt (A) is the wrong channel and, for external content, raises prompt-injection risk.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls

</details>

---

### Question 107 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Agentic loops · hard*

A team replaced model-driven tool selection with a hard-coded sequence: always get_customer, then get_orders, then get_returns. It works for returns but fails badly on billing and login questions. What does this show?

- **A.** The sequence needs more branches, so the team should add a hand-written path for each new question type
- **B.** Tools should only ever be called in a fixed order, so the billing and login tools must be removed entirely
- **C.** The model needs a larger context window, because a fixed sequence fails only when the conversation grows long
- **D.** Model-driven selection lets Claude pick the next tool from context, which adapts to requests a fixed tree did not foresee

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

In an agentic loop, the model reasons about which tool to call next based on what it has learned so far. A pre-configured sequence only covers the paths someone anticipated.

_Why a tempting wrong answer misses:_ Adding branches (A) grows a brittle decision tree that will keep missing the next unanticipated request.

Reference: https://code.claude.com/docs/en/agent-sdk/agent-loop

</details>

---

### Question 108 of 117

**Scenario: Developer Productivity with Claude**
*Study area: MCP server integration · medium*

Your agent answers questions about an analytics warehouse with 300 tables. It spends many tool calls running exploratory queries just to discover which tables and columns exist. What MCP design reduces this?

- **A.** Expose the schema catalog as MCP resources so the agent can see what data exists without probing queries
- **B.** Add a run_any_sql tool with broader permissions so each exploratory query returns more rows at once
- **C.** Put all 300 table definitions into the agent's system prompt so the schema is loaded on every request
- **D.** Lower the tool-call limit so the agent is forced to guess table names instead of querying for them

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

MCP resources expose content such as schemas or documentation hierarchies that a client can list and read. Giving the agent a catalog cuts the exploratory calls it would otherwise make.

_Why a tempting wrong answer misses:_ Loading every definition into the system prompt (C) spends context on all 300 tables for every request, including ones that need none of them.

Reference: https://modelcontextprotocol.io/specification/2026-07-28/server/resources

</details>

---

### Question 109 of 117

**Scenario: Multi-Agent Research System**
*Study area: Tool distribution and tool_choice · hard*

You are assigning tools across a research coordinator and its search, analysis, and synthesis subagents. Which TWO choices follow sound tool-distribution principles? (Select 2.)

- **A.** Give every subagent the full shared toolset so any of them can cover for another when it is busy
- **B.** Limit the analysis subagent to document-loading and extraction tools and leave web search out
- **C.** Let the synthesis subagent read only the findings the coordinator hands it, with no search or fetch tools of its own
- **D.** Let the synthesis subagent run open web searches whenever it thinks a finding looks incomplete
- **E.** Remove all tools from the coordinator and have it guess which subagent produced each result

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, C**

Each agent should hold only the tools its role needs: analysis loads and extracts from documents, and synthesis works from the findings it is given. Any extra research goes back through the coordinator.

_Why a tempting wrong answer misses:_ Open web search for synthesis (D) invites the cross-specialization misuse that scoped tools are meant to prevent.

Reference: https://code.claude.com/docs/en/agent-sdk/subagents

</details>

---

### Question 110 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Built-in tool selection · hard*

You need every caller of a payment function, but the codebase re-exports it through a wrapper module under two aliases, chargeCard and payNow. A Grep for the original name finds only a few callers. What is the right approach?

- **A.** Conclude that the function is rarely used, since Grep found only a few references to its original name
- **B.** Use Glob for *.ts files and assume that every TypeScript file in the repository calls the function
- **C.** Edit the wrapper to remove the aliases so that future Grep searches only have one name to look for
- **D.** Read the wrapper to find every exported name for the function, then Grep for each name across the codebase

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Tracing usage through wrappers means first identifying all exported names, then searching for each one. Searching only for the original identifier misses callers that use the aliases.

_Why a tempting wrong answer misses:_ Editing the wrapper (C) changes production code to make a search easier and would break every caller that uses the aliases.

Reference: https://code.claude.com/docs/en/tools-reference

</details>

---

### Question 111 of 117

**Scenario: Customer Support Resolution Agent**
*Study area: Tool distribution and tool_choice · hard*

Your support agent has a run_sql tool so it can look up invoices. Logs show it sometimes runs broad queries across all customers and once ran an UPDATE. What is the most robust fix?

- **A.** Keep run_sql but add a system-prompt warning against UPDATE statements and against broad queries
- **B.** Replace run_sql with a get_invoice tool that takes an invoice ID and returns only that customer's record
- **C.** Keep run_sql and log every query so that a reviewer can undo harmful statements after the fact
- **D.** Give run_sql a longer description listing the specific tables the agent should be allowed to query

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A constrained tool with a narrow contract makes the unwanted behavior impossible at the interface. A general-purpose tool with prompt warnings still leaves the risky capability in place.

_Why a tempting wrong answer misses:_ Logging and undoing (C) detects damage after it happens instead of preventing it.

Reference: https://www.anthropic.com/engineering/writing-tools-for-agents

</details>

---

### Question 112 of 117

**Scenario: Developer Productivity with Claude**
*Study area: Tool interface design · medium*

Your developer agent loads tools from a code host and an issue tracker, and both expose a tool named list_items. The agent often queries the wrong system. What naming practice helps most?

- **A.** Give both tools random suffixes so that each one has a unique name the model has never seen before
- **B.** Leave the names alone and rely on the order the servers connect in to decide which one gets called
- **C.** Merge both tools into one list_items tool that queries each system and returns the combined results
- **D.** Namespace the tools by service, such as repo_list_pull_requests and tracker_list_issues

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Prefixing tool names with the service and naming the resource makes selection unambiguous as the tool library grows.

_Why a tempting wrong answer misses:_ Merging (C) hides which system each result came from and makes every call hit both services.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools

</details>

---

### Question 113 of 117

**Scenario: Structured Data Extraction**
*Study area: Human review and confidence · hard*

An extraction pipeline reports 97% field accuracy, and leadership wants to stop human review. You have not yet broken the number down. What should you check first?

- **A.** Nothing further, since 97% overall accuracy is well above the level at which review adds value
- **B.** Whether the model can explain its reasoning when asked about a handful of random extractions
- **C.** Whether a larger model would push the overall accuracy figure from 97% up to 99%
- **D.** Accuracy by document type and by field, since a high average can hide weak segments

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Aggregate accuracy can mask poor performance on particular document types or fields. Validating each segment is necessary before reducing human review.

_Why a tempting wrong answer misses:_ Stopping at the average (A) risks automating exactly the segment where errors concentrate.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

### Question 114 of 117

**Scenario: Structured Data Extraction**
*Study area: Human review and confidence · medium*

You auto-approve high-confidence extractions and only humans see the low-confidence ones. How can you keep measuring the error rate of the auto-approved stream and catch new error patterns?

- **A.** Review a stratified random sample of high-confidence extractions on an ongoing basis
- **B.** Trust the high-confidence stream completely, since the model already rated it as reliable
- **C.** Review only the extractions that downstream users have complained about each month
- **D.** Re-run every high-confidence extraction through the same model and compare the outputs

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Stratified random sampling of high-confidence output gives an unbiased ongoing error estimate across segments and surfaces novel error types before they spread.

_Why a tempting wrong answer misses:_ Complaint-driven review (C) only sees errors someone noticed, which biases the measurement.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

### Question 115 of 117

**Scenario: Structured Data Extraction**
*Study area: Human review and confidence · hard*

Your extraction model outputs a confidence score for each field, and reviewer capacity is limited. Which TWO practices make confidence-based routing trustworthy? (Select 2.)

- **A.** Calibrate the review threshold against a labeled validation set before relying on the scores
- **B.** Treat any score above 0.9 as correct, since the model's own ratings need no further checking
- **C.** Route extractions from ambiguous or contradictory source documents to human review
- **D.** Remove the scores from the output so reviewers are not biased by the model's own opinion
- **E.** Pick one threshold for all fields and document types, so the routing rule stays simple

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

Raw confidence scores need calibration against labeled data before they can set thresholds. Low confidence and conflicting source material are both good reasons to spend limited reviewer time.

_Why a tempting wrong answer misses:_ Trusting uncalibrated scores (B) assumes the model's self-assessment is accurate, which is what calibration exists to test.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

</details>

---

### Question 116 of 117

**Scenario: Multi-Agent Research System**
*Study area: Error propagation · hard*

Which TWO subagent error-handling behaviors are anti-patterns in a multi-agent research system? (Select 2.)

- **A.** Retrying a transient timeout locally before reporting anything to the coordinator
- **B.** Returning an empty result marked as success when the source could not be reached
- **C.** Reporting the failure type, the query attempted, and any partial results gathered
- **D.** Terminating the entire research run because a single source returned an error
- **E.** Distinguishing a valid 'no matches' result from a failed request in the response

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, D**

Silently turning a failure into an empty success hides it from the coordinator, and aborting everything on one failure throws away recoverable work. Both are anti-patterns.

_Why a tempting wrong answer misses:_ Local retries, structured error context, and separating empty results from failures (A, C, E) are the recommended practices.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 117 of 117

**Scenario: Multi-Agent Research System**
*Study area: Provenance and uncertainty · medium*

Your research reports convert everything into bullet points: quarterly revenue figures, a news timeline, and an API compatibility matrix. Readers find the financial comparison hard to use. What should the synthesis step do?

- **A.** Keep a single bullet format everywhere, because consistency matters more than fit for readers
- **B.** Render each content type in a suitable form, such as tables for financials and prose for news
- **C.** Remove the financial data from reports, since it is the section that readers find hardest to use
- **D.** Convert every section into one long table so that all of the content can be compared side by side

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Different content types read best in different forms: tables for numeric comparisons, prose for narrative, structured lists for technical findings. Forcing a uniform format hurts usability.

_Why a tempting wrong answer misses:_ One giant table (D) is as mismatched for the news timeline as bullets are for the financials.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---
