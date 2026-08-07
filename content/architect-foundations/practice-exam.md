# Claude Certified Architect – Foundations — Practice Exam

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. Questions are original and written to teach the publicly documented concepts — they are **not** real exam items.

**100 questions** · Real exam format: 120 min · Passing scaled score 720/1000

*This file is generated from `questions.json` by `scripts/build.mjs`. Do not edit by hand.*

---

### Question 1 of 100

**Scenario: Multi-Agent Research System**
*Study area: Coordinator as Hub · medium*

An engineer proposes letting the web-search worker hand its raw findings straight to the citation-checking worker to 'save a hop' instead of returning through the coordinator. Why does the orchestrator-workers pattern deliberately route worker output through the coordinator?

- **A.** Direct worker-to-worker links add measurable network latency at every hop, so removing the coordinator from the path is the only way to keep parallel workers fast enough for production loads
- **B.** The coordinator provides centralized visibility, consistent error handling, and control over exactly what each worker receives, which direct links would lose
- **C.** Workers cannot serialize their messages into a format that other workers are able to parse
- **D.** The Messages API forbids more than two agents from sharing a single conversation

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The hub's value is centralized oversight: the coordinator sees every result, applies consistent error handling, and controls what each worker is fed. Bypassing it trades that control for a shortcut.

_Why a tempting wrong answer misses:_ The benefit is coordination and control, not latency; worker-to-worker messaging is not primarily a speed problem, so the latency framing in A misidentifies the reason.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 2 of 100

**Scenario: Multi-Agent Research System**
*Study area: Task Decomposition Quality · hard*

A research run finishes with every subagent reporting success and no errors logged, yet the final brief omits the regulatory-risk dimension entirely. What most likely caused the gap?

- **A.** The coordinator decomposed the topic too narrowly, so no subagent was ever assigned the regulatory dimension to research
- **B.** The synthesis prompt lacked a regulatory section header, so Claude dropped that content while aggregating the collected worker reports into the final brief
- **C.** Lost-in-the-middle positioning caused the regulatory findings to be under-weighted during synthesis, so they were gathered by a worker but never surfaced into the final written brief
- **D.** The workers deduplicated too aggressively and removed the regulatory content as redundant

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Coverage is bounded by decomposition quality: if the coordinator never carves out a dimension, no worker produces it and synthesis cannot recover what was never gathered. All-success plus a whole-topic omission points to the plan, not a runtime loss.

_Why a tempting wrong answer misses:_ Lost-in-the-middle (C) would under-weight content that was collected, not omit an entire dimension that was never assigned; it presupposes the findings existed.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 3 of 100

**Scenario: Multi-Agent Research System**
*Study area: Partition Before Delegate · medium*

Three workers each search 'the whole web' for a market-sizing question and return heavily overlapping sources, roughly tripling cost with no coverage gain. You want to keep them running in parallel. What is the best design change?

- **A.** Reduce to a single worker so there is no overlap to worry about
- **B.** Add a shared 'claimed sources' list in external storage that every worker reads and writes before each fetch, so in principle no two workers ever pull the same source twice
- **C.** Have the coordinator assign each worker a distinct source class up front (filings, news, analyst reports) so their searches cannot collide
- **D.** Let all three run, then have the coordinator deduplicate the overlapping sources afterward, right before the synthesis step reconciles them into a single answer

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Partitioning the search space at the coordinator before delegation removes the overlap at its root while preserving parallelism; distinct source classes guarantee non-colliding work.

_Why a tempting wrong answer misses:_ A shared claimed-sources list (B) introduces race conditions and still allows duplicate fetches before a worker notices a claim; proactive partitioning is simpler and reliable.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 4 of 100

**Scenario: Multi-Agent Research System**
*Study area: Tool Distribution & Least Privilege · hard*

A document-analysis worker is given a general fetch_url tool to pull cited PDFs. Logs show it also points fetch_url at search-engine URLs and scrapes results, doing the search worker's job badly. What is the most robust fix?

- **A.** Add a firmly worded system-prompt rule instructing the worker never to point fetch_url at search engines and to use it only for retrieving the specific cited documents it was given
- **B.** Block search-engine domains with a denylist inside fetch_url
- **C.** Route every fetch through the coordinator so it can review each request
- **D.** Replace fetch_url with a narrower load_document tool that only accepts an allowlisted document identifier, making ad-hoc search impossible at the interface

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Constraining the tool interface makes the misuse structurally impossible: a load_document tool that only takes a document id cannot perform search at all. This beats advisory prompts or partial blocks.

_Why a tempting wrong answer misses:_ A prompt instruction (A) is advisory and drifts under pressure; the model can still call the capable tool. Removing the capability at the interface is the durable fix.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 5 of 100

**Scenario: Multi-Agent Research System**
*Study area: Scoped Tools for Hot Paths · medium*

Your synthesis agent constantly needs quick single-fact confirmations (dates, figures) and currently routes every check back through the coordinator, adding latency. Genuine multi-hop verifications are rare. What is the best least-privilege design?

- **A.** Give the synthesis agent a narrow verify_fact tool for the common single-fact case, and keep routing complex verification through the coordinator
- **B.** Give the synthesis agent the full research toolset, including web search and document loaders, so it can independently verify any claim it encounters without ever waiting on the coordinator
- **C.** Have the coordinator pre-verify every fact before synthesis even begins
- **D.** Cache all prior findings so the synthesis agent never has to verify anything

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A scoped verify_fact tool handles the high-frequency simple case locally (a latency win) while rare complex checks still escalate through the coordinator, preserving least privilege.

_Why a tempting wrong answer misses:_ Handing over the full toolset (B) violates least privilege and bloats the agent's capabilities far beyond the narrow hot path it actually needs.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 6 of 100

**Scenario: Multi-Agent Research System**
*Study area: Structured Error Context · medium*

A worker's primary data source times out mid-run. Which return value best lets the coordinator recover intelligently?

- **A.** Return an empty result set so the pipeline keeps moving, and let the downstream synthesis step infer from the conspicuously missing data that this particular source must have been unavailable
- **B.** A structured error object: failure type (timeout), the query attempted, any partial results gathered, and suggested alternative sources
- **C.** A thrown exception that aborts the entire research run
- **D.** A success response containing a prose note that 'some data may be missing,' leaving the coordinator to guess from the wording whether the source actually failed

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Structured error context (failure type, attempted input, partial results, alternatives) gives the coordinator what it needs to retry, reroute, or degrade gracefully instead of guessing.

_Why a tempting wrong answer misses:_ Returning an empty set (A) collapses a failure into a valid 'no results,' so the coordinator cannot distinguish a real gap from a genuine zero and may report false coverage.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 7 of 100

**Scenario: Multi-Agent Research System**
*Study area: Empty vs. Failure · medium*

Two workers each return zero items: one because the database genuinely has no matching records, the other because its API call timed out. Why must the coordinator treat these differently?

- **A.** Timeouts are always transient, so the coordinator should silently retry both cases in exactly the same way
- **B.** Both are failures and the run should abort to avoid publishing incomplete data
- **C.** 'Zero matches' is a valid finding to report as-is, while a timeout is an access failure to retry or annotate; collapsing both into 'no results' produces misleading coverage
- **D.** Zero matches should quietly trigger an escalation to a human reviewer while timeouts are retried automatically, since a genuinely missing record is the more suspicious of the two outcomes

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

A legitimate empty result and an access failure carry different meanings and demand different responses; conflating them either discards valid findings or hides real gaps.

_Why a tempting wrong answer misses:_ Aborting the whole run (B) throws away the legitimately-empty worker's valid answer; the two conditions need distinct handling, not a shared abort.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 8 of 100

**Scenario: Multi-Agent Research System**
*Study area: Local Recovery · medium*

A search worker hits an intermittent HTTP 429 on one of its ten queries. Where should this be handled?

- **A.** In the coordinator, which should catch every error from every worker centrally so that all retry and backoff logic lives in one place and the individual workers can stay simple
- **B.** In a global exception handler that restarts the entire research run
- **C.** Nowhere in particular: drop the failed query and proceed, since nine of the ten queries already succeeded and the missing one is unlikely to change the result
- **D.** In the worker, which retries with backoff locally and only escalates to the coordinator (with context) if its retries are exhausted

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Handle errors at the lowest level that can resolve them: a transient 429 is a local, recoverable condition, so the worker retries and only surfaces what it genuinely cannot fix.

_Why a tempting wrong answer misses:_ Centralizing every transient retry in the coordinator (A) defeats the layering; the coordinator should see only failures the worker could not resolve on its own.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 9 of 100

**Scenario: Multi-Agent Research System**
*Study area: Graceful Degradation · medium*

During a run, two of six planned sources are unavailable and the deadline is firm. What should the final report do?

- **A.** Proceed and annotate coverage, marking which conclusions are well-supported and which rest on gapped sources, rather than hiding the missing coverage
- **B.** Silently omit the topics the failed sources would have covered so the report reads cleanly, and record the reduced scope only in an internal log that the team can consult later
- **C.** Fail the run and deliver nothing until all six sources are reachable again
- **D.** Fill the gaps with the model's best guesses to keep the report looking complete

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Graceful degradation with transparency delivers value under a firm deadline while coverage annotations tell readers exactly which findings to trust and which are gapped.

_Why a tempting wrong answer misses:_ Filling gaps with guesses (D) manufactures unsupported claims, which is more dangerous than an honestly-labeled gap and erodes trust in the whole report.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 10 of 100

**Scenario: Multi-Agent Research System**
*Study area: Long-Context Position Effects · medium*

Your synthesis agent receives 40 worker reports concatenated into one long message. Key conclusions buried in the middle are consistently underused in the final brief. What is the most effective mitigation?

- **A.** Randomly rotate the order of the reports on each run so that no single position is consistently disadvantaged and, over many runs, every report eventually lands near the top of the input
- **B.** Put a key-findings summary at the top and add explicit section headers, so critical content sits where the model attends most and is easy to navigate
- **C.** Summarize every report down to a single sentence to shrink the whole input
- **D.** Increase max_tokens so the model has more room to consider everything

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Models attend most reliably to the beginning and end of long inputs, so leading with a key-findings summary and adding headers places critical content where it is actually used.

_Why a tempting wrong answer misses:_ Rotating order (A) only moves the blind spot around instead of removing it; something always lands in the weakly-attended middle.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/long-context-tips

</details>

---

### Question 11 of 100

**Scenario: Multi-Agent Research System**
*Study area: Token Reduction at Source · medium*

Token usage per run is dominated by workers pasting full page dumps and their entire reasoning chains into their reports. Coverage is fine; cost is not. What is the best fix?

- **A.** Truncate every worker report to the first 500 tokens before synthesis
- **B.** Switch the synthesis model to a larger context window so cost stops mattering
- **C.** Have each worker return structured findings (key facts, citations, relevance scores) instead of raw page text and full reasoning transcripts
- **D.** Add a separate summarization pass over the reports after they arrive, compressing each one down to its essentials before the synthesis agent has to read the whole set

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Cutting bloat at the source, by having workers emit structured findings rather than verbose dumps, reduces tokens without a second model pass and keeps only the signal synthesis needs.

_Why a tempting wrong answer misses:_ A downstream summarization pass (D) still pays to generate and transmit the bloat, then pays again to compress it; shaping the output upstream is cheaper and cleaner.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 12 of 100

**Scenario: Multi-Agent Research System**
*Study area: Conflicting-Source Handling · medium*

Two workers return contradictory figures for the same metric: one source reports 12%, another reports 18%. How should the system handle the conflict when producing the brief?

- **A.** Average the two figures and report the 15% midpoint as the answer, treating the gap between the sources as ordinary measurement noise
- **B.** Keep whichever figure arrived first and discard the other as noise
- **C.** Have the coordinator pick the source it deems most authoritative and silently drop the other
- **D.** Surface the disagreement with both values and their sources so synthesis and the reader can weigh them, rather than hiding the conflict behind a single number

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Conflicting sources should be presented with their provenance so the disagreement is visible and can be judged; hiding it behind one number destroys information the reader needs.

_Why a tempting wrong answer misses:_ Averaging (A) invents a value neither source actually supports and masks a genuine conflict as if it were a settled fact.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 13 of 100

**Scenario: Multi-Agent Research System**
*Study area: Tool Naming & Description Overlap · medium*

Your system exposes two tools, search_news and search_articles, with near-identical descriptions. Claude routes queries between them almost at random, frequently choosing the wrong one. What is the most effective fix?

- **A.** Rewrite both tools' names and descriptions so each states an unambiguous, non-overlapping purpose and when to use it versus the other
- **B.** Delete search_articles and force every query through search_news
- **C.** Add a system-prompt paragraph that lists which kinds of query should go to search_news versus search_articles, overriding whatever the model infers from the two tool descriptions
- **D.** Lower the sampling temperature so tool selection becomes more deterministic and the model stops routing near-identical queries between the two tools at random

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Tool names and descriptions are the primary signal the model selects on, so overlapping descriptions cause misrouting; disambiguating both fixes the actual cause.

_Why a tempting wrong answer misses:_ A system-prompt routing paragraph (C) is a brittle patch layered over ambiguous tool metadata; the model still selects primarily on the descriptions, so fix those.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 14 of 100

**Scenario: Multi-Agent Research System**
*Study area: Composite Tools · medium*

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

### Question 15 of 100

**Scenario: Multi-Agent Research System**
*Study area: Corrupted Input Handling · medium*

A worker fetches a document that turns out to be corrupted and cannot be parsed. What is the best behavior?

- **A.** Return the corrupted bytes to the coordinator and let the synthesis step attempt to interpret whatever partial content can still be salvaged from the damaged document
- **B.** Silently skip the document and report the subtask as successful
- **C.** Return a structured error with context (which document, what failed) so the coordinator can decide whether to retry, substitute, or annotate the gap
- **D.** Retry the same fetch indefinitely until the document finally parses

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

An unparseable input is a failure to report with context, letting the coordinator choose the recovery; the worker should not swallow it, loop on it, or push raw garbage downstream.

_Why a tempting wrong answer misses:_ Silently reporting success (B) hides a real gap, so synthesis proceeds as though coverage were complete when it is not.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 16 of 100

**Scenario: Multi-Agent Research System**
*Study area: Coordinator as Hub · hard*

A teammate justifies the central-coordinator design by saying its main advantage is batching worker requests to reduce API latency. Why is that justification off-base?

- **A.** The coordinator always adds an extra serialization and routing hop that increases end-to-end latency, so calling latency the pattern's advantage gets it backwards
- **B.** Batching requests is impossible in an orchestrator-workers topology
- **C.** Reducing latency is the job of prompt caching, never of a coordinator
- **D.** The coordinator's core value is centralized visibility, consistent error handling, and control over each worker's inputs; latency and batching are not why you adopt the pattern

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The hub exists for oversight and control, not throughput; misattributing its value to batching leads to wrong architectural trade-offs down the line.

_Why a tempting wrong answer misses:_ Claiming the coordinator always increases latency (A) overcorrects; the point is that latency is simply not the pattern's rationale, whichever way it nets out.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 17 of 100

**Scenario: Multi-Agent Research System**
*Study area: Sequential vs. Parallel Decomposition · medium*

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

### Question 18 of 100

**Scenario: Multi-Agent Research System**
*Study area: Orchestrator-Workers Pattern · easy*

In the orchestrator-workers pattern, after the specialized workers finish gathering, what is the coordinator's remaining responsibility?

- **A.** To immediately return each worker's raw output to the user in the order received
- **B.** To route the collected results into a synthesis/aggregation step that reconciles them into one coherent output
- **C.** To spawn a second, identical set of workers to double-check the first
- **D.** To discard any worker result that disagrees with the majority

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The pattern terminates in a coordinator-owned synthesis step: workers gather, and the coordinator reconciles their results into a single coherent answer.

_Why a tempting wrong answer misses:_ Returning raw worker output in arrival order (A) skips the reconciliation that turns parallel findings into a usable, coherent result.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 19 of 100

**Scenario: Multi-Agent Research System**
*Study area: Least Privilege · medium*

Your data-gathering workers only need to read sources, but for convenience every worker is provisioned with one shared toolset that includes a destructive delete_cache tool. From a least-privilege standpoint, what is the problem and fix?

- **A.** There is no real problem; sharing a single toolset across workers simplifies configuration
- **B.** The fix is to instruct workers in the prompt never to call delete_cache
- **C.** Read-only workers should not hold a destructive tool at all; provision each worker only the tools its role actually requires
- **D.** delete_cache should be renamed so workers are less likely to invoke it by accident

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Least privilege means each agent holds only the tools its role needs; a read-only worker should be structurally unable to perform a destructive action.

_Why a tempting wrong answer misses:_ A prompt instruction (B) is advisory and can be overridden mid-run; removing the tool from the worker's set makes the destructive call impossible.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 20 of 100

**Scenario: Multi-Agent Research System**
*Study area: Independent Verification · medium*

You want a verification step that reliably catches the lead research agent's own blind spots before the brief ships. Which approach is most effective?

- **A.** Ask the lead agent to re-read and critique its own final brief
- **B.** Increase the lead agent's thinking effort so it reasons more carefully the first time
- **C.** Have the lead agent lower its confidence threshold before finalizing
- **D.** Run a second, independent agent with a fresh context and no access to the lead's reasoning to review the brief

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A fresh independent instance is not anchored to the author's reasoning, so it catches confirmation-bias blind spots that self-review, sharing the same context, tends to reproduce.

_Why a tempting wrong answer misses:_ Self-critique (A) runs inside the same context and assumptions that created the blind spot, so it typically misses the very things it was meant to catch.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 21 of 100

**Scenario: Multi-Agent Research System**
*Study area: Context Control · medium*

To keep each worker focused and cheap, how should the coordinator manage the context it passes to workers?

- **A.** Send each worker only the scoped instructions and inputs relevant to its subtask, not the entire shared conversation history
- **B.** Broadcast the full conversation history to every worker so none is missing context
- **C.** Let workers pull whatever context they want directly from one another
- **D.** Give every worker the coordinator's complete system prompt verbatim

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Controlling worker inputs is a core hub advantage: scoping each worker's context to its subtask keeps it focused and reduces token cost.

_Why a tempting wrong answer misses:_ Broadcasting the full history (B) inflates every worker's token bill and dilutes its focus with irrelevant conversation.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 22 of 100

**Scenario: Multi-Agent Research System**
*Study area: Coverage Validation · medium*

Given that under-decomposition can silently drop whole topics, which practice best guards against coverage gaps before workers are dispatched?

- **A.** Dispatch the workers immediately and rely on the synthesis step to notice anything missing, since it sees all of the results together and can always request additional follow-up research
- **B.** Have the coordinator enumerate the required subtopics or dimensions explicitly and confirm every one is assigned to a worker before delegating
- **C.** Always spawn the maximum number of workers so more ground gets covered
- **D.** Let each worker pick its own subtopic at runtime to avoid a central bottleneck

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Because final coverage is bounded by the decomposition, explicitly enumerating required dimensions and confirming each is assigned catches gaps before they become silent omissions.

_Why a tempting wrong answer misses:_ Relying on synthesis to catch gaps (A) is too late: the synthesis step cannot reconstruct a dimension that no worker was ever tasked to research.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 23 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Headless Execution · easy*

You are wiring Claude Code into a CI job that must run non-interactively, print its result to stdout, and then exit. Which invocation fits?

- **A.** Launch the interactive REPL and pipe the diff into it, then capture whatever it prints once the session settles, which keeps a human in the loop for the CI run
- **B.** Run claude --watch to keep a single long-lived session alive across every stage of the pipeline so the CI never has to relaunch it
- **C.** Run claude -p "<review prompt>" (the --print flag), which executes once, prints to stdout, and exits
- **D.** Run claude --serve to expose a persistent local HTTP endpoint that each CI job calls into whenever it needs a review

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The -p/--print flag is Claude Code's headless mode: a single non-interactive run that prints to stdout and exits, which is exactly what an unattended CI step needs.

_Why a tempting wrong answer misses:_ The interactive REPL (A) blocks waiting for input and is designed for a human at a terminal, not an unattended pipeline step.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 24 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Structured Output · medium*

Your CI step must post each review finding as an inline PR comment through the GitHub API, so it needs machine-parseable output carrying file, line, and message fields. What should the Claude Code invocation use?

- **A.** Ask Claude in the prompt to 'format findings nicely' and then screen-scrape the resulting text for the file, line, and message of each finding
- **B.** Pipe the default text output through a carefully maintained regex that pulls out the file, line, and message fields for each finding before posting them as comments
- **C.** Enable streaming so the CI can read the finding tokens as they arrive and assemble the file, line, and message fields incrementally on its own
- **D.** Use --output-format json with a schema so findings return as structured data the CI can post directly

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

--output-format json with a schema produces parseable, structured output, which is the supported path for programmatic actions like posting inline PR comments.

_Why a tempting wrong answer misses:_ Regex-scraping the default text (B) is brittle and breaks whenever the model's wording shifts; structured output exists precisely to avoid that.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 25 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Independent Second Reviewer · medium*

A senior engineer has already reviewed a PR. You want an automated check that catches issues a single reviewer, human or model, might rationalize past. What adds the most value?

- **A.** A second, independent Claude Code review instance that sees only the diff, not the first reviewer's notes, reducing shared blind spots
- **B.** Re-run the exact same review prompt three separate times and take the majority verdict, on the theory that a real issue will surface in at least two of the three passes
- **C.** Giving the reviewer the author's own justification for each change
- **D.** Increasing the review model's max_tokens so it writes longer comments

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

An independent reviewer with no access to the first reviewer's reasoning brings a fresh perspective that catches blind spots a single viewpoint rationalizes past.

_Why a tempting wrong answer misses:_ Re-running the identical prompt (B) reproduces the same blind spots each time; independence, not repetition, is what surfaces new issues.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 26 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Batch vs. Synchronous · medium*

Your review must complete and block the merge before a PR can land. Which execution model fits, and why not the Message Batches API?

- **A.** Use the Batches API for the ~50% cost cut; for unattended review, cost outweighs when the result arrives
- **B.** Run a synchronous blocking review call; a required pre-merge gate needs a result now, and Batches can take up to 24 hours
- **C.** Use the Batches API because it guarantees results within one minute for any workload
- **D.** Use either model interchangeably; there is no meaningful difference for a blocking merge gate

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A blocking pre-merge gate is latency-sensitive and needs an immediate answer, so it must run synchronously; the Batches API is fire-and-forget with up to a 24-hour completion window.

_Why a tempting wrong answer misses:_ Batch's cost savings (A) are irrelevant when the workflow cannot proceed until the result is back; async completion breaks the gate.

Reference: https://platform.claude.com/docs/en/build-with-claude/batch-processing

</details>

---

### Question 27 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Batch vs. Synchronous · medium*

You want a nightly scan of the entire repository's open TODOs and dead code, where results can land by morning and cost should be minimized. Which is the best fit?

- **A.** Run a synchronous claude -p call for every file during the workday so a person can watch the results come in and react to anything urgent right away
- **B.** An interactive session that an engineer supervises overnight
- **C.** The Message Batches API, which is about 50% cheaper and asynchronous (up to 24h), ideal for latency-tolerant scheduled jobs
- **D.** Streaming responses to a live dashboard in real time

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

A scheduled, latency-tolerant, high-volume scan is the Batches API's sweet spot: roughly half the cost, asynchronous, with results well within the 24-hour window.

_Why a tempting wrong answer misses:_ Per-file synchronous calls (A) forgo the ~50% batch savings and add no benefit for an unattended overnight job that no one is waiting on.

Reference: https://platform.claude.com/docs/en/build-with-claude/batch-processing

</details>

---

### Question 28 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Batch Constraints · hard*

You considered moving your iterative, tool-calling review agent (it reads files, runs a linter, then revises its findings) onto the Batches API to cut cost. Why does that not work?

- **A.** The Batches API rejects any prompt longer than a few thousand tokens, so a review agent that reads whole files would blow past that limit almost immediately
- **B.** The Batches API cannot return JSON output
- **C.** Batch jobs actually cost more than synchronous calls whenever tools are involved, so the cost saving you were counting on never materializes for this kind of review
- **D.** The Batches API is fire-and-forget and cannot execute a tool mid-request and continue, so it does not fit interactive tool-calling loops

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Batch is an asynchronous, fire-and-forget model: you cannot pause a request to run a tool and resume it, so multi-step tool-calling loops are incompatible with it.

_Why a tempting wrong answer misses:_ Batch can return JSON (B); the real blocker is that it cannot execute a tool partway through a request and continue the loop.

Reference: https://platform.claude.com/docs/en/build-with-claude/batch-processing

</details>

---

### Question 29 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: False-Positive Reduction · medium*

Your automated reviewer's naming and style findings are wrong so often that engineers now ignore all of its comments, including the valuable security ones. What is the best near-term move?

- **A.** Temporarily disable the noisy low-precision categories (style, naming), keep the high-precision ones, then improve those prompts and re-enable
- **B.** Keep every category but add a disclaimer that some findings may be wrong
- **C.** Switch to a cheaper model tier so at least the noise costs less
- **D.** Post all of the findings but sort the style and naming issues to the bottom of the comment, so the security findings engineers care about appear first and get read

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A high false-positive category poisons trust in every finding; muting the noisy categories restores signal, after which you refine their prompts and bring them back.

_Why a tempting wrong answer misses:_ Sorting style issues lower (D) still floods the PR with low-precision noise, which keeps training engineers to tune the bot out entirely.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 30 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Prompt Specificity · medium*

The reviewer was told to 'check that comments are accurate' and now flags almost every code comment as suspicious. How do you make it useful?

- **A.** Tell it to be less strict and flag fewer comments
- **B.** Specify explicit criteria, for example flag a comment only when it contradicts the actual behavior of the code it describes
- **C.** Remove comment-checking from the review altogether
- **D.** Ask the reviewer to rate each comment's accuracy on a 1-to-10 scale so that borderline comments land on a middling score and only the clearly wrong ones stand out

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A vague instruction yields vague over-flagging; a concrete criterion (flag only when a comment contradicts code behavior) gives the model a precise, testable bar.

_Why a tempting wrong answer misses:_ 'Be less strict' (A) is just another vague directive with no concrete rule, so the flagging stays arbitrary and unpredictable.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 31 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Few-Shot for Actionable Findings · medium*

Findings come back as vague one-liners like 'improve error handling here' that engineers cannot act on. What most reliably fixes the format?

- **A.** Increase the review temperature for more creative suggestions, on the theory that more varied phrasings will include the concrete, actionable detail engineers want
- **B.** Add a sentence to the prompt asking the reviewer for 'more actionable' findings and reminding it that engineers need to be able to act on each one directly
- **C.** Provide a few-shot example of the exact desired finding format: problem, location, and a concrete suggested change
- **D.** Switch to the largest available model

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Few-shot examples of the exact finding you want beat abstract instructions for nailing down output format, because the model has a concrete target to imitate.

_Why a tempting wrong answer misses:_ Asking for 'more actionable' findings (B) restates the goal without showing the shape; the model needs an exemplar, not another adjective.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting

</details>

---

### Question 32 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Prior Findings in Context · medium*

On each new commit to a long-lived PR, the bot re-reports the same issues it already flagged, burying the genuinely new ones. What is the best fix?

- **A.** Review only the most recent commit's diff and ignore the earlier commits, on the assumption that anything already flagged must have been addressed in a prior round
- **B.** Post findings to a separate channel so the PR stays clean, and let reviewers open that channel to check whether each flagged issue is new or already reported
- **C.** Reduce how often the review runs
- **D.** Include the prior findings in the review context and ask Claude to report only new or still-unaddressed issues

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Supplying the reviewer with its earlier findings lets it deduplicate against them and surface only what is new or still unresolved.

_Why a tempting wrong answer misses:_ Reviewing only the latest commit (A) can miss issues introduced in earlier commits and handle carryover inconsistently; feeding prior findings targets the duplication directly.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 33 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Existing Tests in Context · medium*

Your reviewer keeps suggesting unit tests that already exist in the repository's test file. How do you stop the redundant suggestions?

- **A.** Include the existing test file in the review context so Claude can see what is already covered
- **B.** Tell Claude to assume the necessary tests already exist and to never suggest adding any new ones for the code under review
- **C.** Delete the redundant suggestions in a post-processing step that keyword-matches each suggested test against the names of the tests already present in the repository
- **D.** Ask Claude to restrict itself to suggesting only integration tests and to skip unit tests entirely so the existing ones stop coming up

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The model suggests duplicate tests because it cannot see the existing ones; putting the test file in context lets it recommend only genuine coverage gaps.

_Why a tempting wrong answer misses:_ A blanket 'never suggest tests' (B) discards legitimately missing coverage along with the duplicates, which defeats the purpose of the check.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 34 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Per-File and Integration Passes · hard*

A 30-file PR gets shallow, inconsistent review depth when handled in one pass: some files get thorough comments, others almost none. What structure improves consistency?

- **A.** Feed the entire thirty-file PR in one prompt but raise max_tokens substantially so the model has enough room to comment on every file in a single pass
- **B.** Run focused per-file review passes for depth, then a separate integration pass that checks cross-file data flow
- **C.** Review only the three largest files in depth and take a quick sampling pass over the remaining twenty-seven to keep the total review time down
- **D.** Split the large PR into three smaller pull requests and review each of them once, so no single review has to hold all thirty files in context at the same time

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Per-file passes give every file consistent depth, and a dedicated integration pass catches the cross-file interactions that a single wide sweep skims over.

_Why a tempting wrong answer misses:_ One large prompt (A) is what spread attention thin in the first place; more output tokens don't stop the model from under-covering some files.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 35 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Inline Reasoning and Confidence · medium*

Reviewers spend most of their time deciding which bot findings are worth investigating, and policy forbids auto-filtering any finding out. What change most reduces that triage cost?

- **A.** Post fewer findings by raising the severity bar so only the most serious issues appear, which shrinks the list the reviewers have to work through on each run
- **B.** Group the findings by file
- **C.** Have Claude include its reasoning and a confidence level inline with each finding so humans can triage faster
- **D.** Convert the findings into a spreadsheet

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

When you cannot drop findings, attaching each one's reasoning and confidence lets a human judge it at a glance instead of re-investigating from scratch.

_Why a tempting wrong answer misses:_ Raising the severity bar (A) drops findings, which the no-filter constraint forbids; the goal is faster triage of all of them, not fewer.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 36 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Severity Criteria · medium*

The same class of issue is labeled 'critical' in one file and 'minor' in another across runs. What most improves severity consistency?

- **A.** Default every finding to 'medium' severity so the labels can never disagree across files, then bump only the few that clearly deserve more
- **B.** Let engineers relabel the severities by hand after each run so the team gradually converges on a shared, if informal, sense of what counts as critical
- **C.** Ask the model to simply be more consistent about how it applies severity from one file to the next, without giving it any concrete rubric to follow
- **D.** Give explicit severity definitions with concrete examples of what counts as critical, major, and minor

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Inconsistent severity comes from an undefined scale; explicit criteria anchored by concrete examples give the model a stable rubric to apply the same way every time.

_Why a tempting wrong answer misses:_ 'Be more consistent' (C) supplies no rubric, so each run still applies a subjective, drifting standard.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 37 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Build Gating · medium*

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

### Question 38 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Prompt Caching as a Cost Lever · hard*

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

### Question 39 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Sufficient Review Context · hard*

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

### Question 40 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Structured Output Schema · medium*

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

### Question 41 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Headless Permissions · medium*

Your headless claude -p review job occasionally stalls in CI. Investigation shows it is waiting on an interactive approval prompt for a tool it wants to use. What is the right fix for unattended CI?

- **A.** Pre-authorize the specific tools the job needs (via allowed-tools / permission settings) so the headless run never blocks on an interactive prompt
- **B.** Add a long sleep before the tool call so the interactive approval prompt times out on its own and the headless run can continue
- **C.** Run the job on a faster machine
- **D.** Switch the model to Haiku so it requests fewer tools

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Headless CI has no human to approve prompts, so the tools the job needs must be pre-authorized; otherwise the run blocks indefinitely on permission requests.

_Why a tempting wrong answer misses:_ Sleeping past the prompt (B) never grants permission, so the tool call still cannot proceed and the job stalls or fails anyway.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 42 of 100

**Scenario: Claude Code for Continuous Integration**
*Study area: Independent Second Reviewer · medium*

A team uses Claude Code to generate a database migration script, then wants Claude to review it before running. Why run the review in a separate instance rather than asking the same session that wrote it?

- **A.** A separate session is cheaper to run than continuing the original one
- **B.** A fresh instance has no access to the generation session's reasoning, so it evaluates the script on its merits and avoids confirmation bias toward the author's assumptions
- **C.** The original session's context window is always full immediately after generating code
- **D.** Claude Code is technically unable to review code that it wrote earlier in the same session, so spinning up a separate instance is the only way to get any review at all

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A fresh reviewer that never saw the generator's reasoning judges the code independently, avoiding the confirmation bias of re-endorsing the same assumptions that produced it.

_Why a tempting wrong answer misses:_ Same-session review is not impossible (D); the point is that an independent instance yields a more objective review, not that the tool refuses.

Reference: https://code.claude.com/docs/en/headless

</details>

---

### Question 43 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Tool Interface Design · medium*

Your support agent has get_order_status and track_shipment tools, but it frequently calls track_shipment when a user's question should be answered by get_order_status. Both schemas are valid. What should you try FIRST?

- **A.** Add a routing rule in the system prompt that maps common phrases to specific tools, so a mention of tracking always sends the request to track_shipment
- **B.** Remove track_shipment from the agent
- **C.** Lower the sampling temperature to make tool selection more deterministic so the model stops drifting to track_shipment on status questions
- **D.** Improve both tools' descriptions so each clearly states its purpose and when to use it versus the other

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Tool descriptions are the primary signal the model selects on, so the first fix for wrong tool choice is to clarify each description's purpose, boundaries, and when-to-use versus a similar tool.

_Why a tempting wrong answer misses:_ Keyword-to-tool routing rules in the prompt (A) are a brittle patch and can themselves bias selection; the descriptions are what the model actually reasons over.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 44 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Ambiguous Multi-Match · medium*

A customer writes 'cancel my order for John Smith.' The lookup returns three customers named John Smith with active orders. What should the agent do?

- **A.** Cancel the most recently placed order, since a customer asking to cancel is most likely referring to their latest purchase rather than an older one
- **B.** Cancel all three orders to be safe and then let the two customers who did not actually want a cancellation place their orders again afterward
- **C.** Ask the customer for an additional identifier (email, phone, or order number) to disambiguate before taking any action
- **D.** Cancel the first match returned by the database

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

With multiple matches, the agent must request a disambiguating identifier before acting; taking an irreversible action on a guessed account is the failure to avoid.

_Why a tempting wrong answer misses:_ Cancelling the most recent order (A) is still a guess that can cancel the wrong person's order; only a disambiguating identifier resolves the ambiguity safely.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 45 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Workflow Prerequisite Enforcement · hard*

Policy requires verifying identity before any account change. A system-prompt instruction to 'always verify first' is followed most of the time but occasionally skipped. What is the most reliable enforcement?

- **A.** Add stronger, capitalized wording to the system prompt stressing that identity must always be verified before any account change is ever attempted
- **B.** Programmatically block the account-change tools until get_customer has returned a verified identity, enforcing the order in code rather than by prompt
- **C.** Ask the model to self-report whether it verified identity first
- **D.** Add a few-shot example showing verification happening before the change

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A programmatic prerequisite (gate the downstream tools on a verified ID) enforces the sequence deterministically, independent of whether the model follows the prompt on any given run.

_Why a tempting wrong answer misses:_ Stronger prompt wording (A) still depends on the model complying every single time; a code-level gate removes that dependence entirely.

Reference: https://code.claude.com/docs/en/hooks

</details>

---

### Question 46 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Escalation on Policy Gaps · medium*

A customer asks the agent to match a competitor's lower price. The company's policy documents say nothing about price matching at all. What is the appropriate behavior?

- **A.** Escalate to a human, because the policy is genuinely silent and the agent would otherwise have to invent a policy
- **B.** Confidently tell the customer that price matching is not allowed, on the principle that anything not explicitly permitted in the policy should be treated as prohibited
- **C.** Approve the price match on the spot to satisfy the customer, effectively creating a brand-new pricing policy that the documented rules never actually granted
- **D.** Ask the customer to prove the competitor's price with a screenshot, then decide unilaterally whether to grant the match without any policy to rely on

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A genuine policy gap (the rules are silent on this case) is exactly when to escalate, so a human can decide rather than the agent fabricating a policy.

_Why a tempting wrong answer misses:_ Asserting 'not allowed' (B) fabricates a rule the documents do not contain, which is the very failure escalation is meant to prevent.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 47 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Escalation Calibration · hard*

Your agent escalates too often on cases it could handle and misses some it should escalate. A teammate suggests escalating whenever the model's self-reported confidence drops below 0.7. What is the better approach?

- **A.** Trust self-reported confidence but lower the threshold to 0.5 so the agent escalates only when quite unsure
- **B.** Escalate every case to a human so the agent never makes an unsupported resolution decision
- **C.** Never escalate and always attempt a resolution so ticket volume and handle time stay low
- **D.** Define explicit escalation criteria with few-shot examples; self-reported confidence is poorly calibrated

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Model self-reported confidence is poorly calibrated, so explicit escalation criteria plus few-shot examples of escalate-versus-resolve produce far more reliable routing.

_Why a tempting wrong answer misses:_ Tuning a threshold on an unreliable confidence signal (A) just inherits its poor calibration; the signal itself, not the cutoff, is the problem.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting

</details>

---

### Question 48 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: PostToolUse Normalization · hard*

Two backend tools return timestamps in different formats (one Unix epoch, one ISO 8601) and the agent occasionally misreads dates to customers. One tool is a third-party MCP server you cannot modify. What is the most maintainable fix?

- **A.** Add a prompt instruction telling the agent how to convert each timestamp format, with a worked example of turning an epoch value into a readable date
- **B.** Fork the third-party MCP server and patch its output
- **C.** Add a PostToolUse hook that normalizes both tools' timestamps to one readable format before the agent sees them
- **D.** Ask the customer to specify which timezone and date format they meant, then trust the agent to read each backend timestamp correctly from then on

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

A PostToolUse hook is the deterministic, maintainable place to normalize tool output, and it works even for third-party MCP servers you cannot change.

_Why a tempting wrong answer misses:_ A prompt instruction to convert formats (A) relies on the model doing the conversion correctly every time; a hook normalizes the data deterministically before the model ever sees it.

Reference: https://code.claude.com/docs/en/hooks

</details>

---

### Question 49 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Parallel and Composite Tools · medium*

For each ticket the agent runs get_customer, then get_orders, then get_subscription across three sequential turns, making resolution feel slow. Given the customer id, those last lookups are independent. What best cuts the round-trips?

- **A.** Cache the results of each lookup between tickets so that repeat customers are resolved faster, amortizing the three calls across the day's overall volume
- **B.** Have the agent issue the independent lookups in parallel within a single turn (or expose a composite tool that returns all three) and return the results together
- **C.** Drop get_subscription to save a call
- **D.** Increase max_tokens so the agent can think longer

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Independent lookups can be issued in parallel in one turn, or collapsed into a composite tool, with results returned together, which removes the sequential round-trips driving the latency.

_Why a tempting wrong answer misses:_ Caching (A) helps across tickets but does nothing for a single ticket's sequential calls; parallelizing the independent ones is the direct fix.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 50 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Persistent Case Facts · medium*

In long conversations, after the history is summarized the agent starts getting the order number and refund amount slightly wrong. What design preserves these details?

- **A.** Keep a persistent 'case facts' block (order number, amounts, dates) maintained verbatim outside the summarized history
- **B.** Summarize the conversation more aggressively so there is far less content left for the summary step to get wrong when it compresses the history
- **C.** Ask the customer to repeat the details on every turn
- **D.** Disable summarization entirely and let the full conversation context grow without bound, so that no precise detail is ever lost to a lossy summary step

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Precise identifiers belong in a persistent case-facts block kept verbatim outside the lossy summary, so summarization cannot corrupt the exact values.

_Why a tempting wrong answer misses:_ Summarizing more aggressively (B) discards even more precise detail, which makes the corruption worse rather than better.

Reference: https://platform.claude.com/docs/en/build-with-claude/context-windows

</details>

---

### Question 51 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Self-Critique for Completeness · medium*

The agent resolves tickets correctly, but its explanations to customers are inconsistently complete: some cover every question asked, others miss one. What most improves completeness?

- **A.** Tell the agent to write longer replies
- **B.** Lower the sampling temperature
- **C.** Route every ticket to a human for a completeness check before the reply is sent, so a person always confirms that each question was actually addressed
- **D.** Add a self-critique/evaluator step that checks the drafted reply against explicit completeness criteria before sending

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A self-critique pass against explicit completeness criteria catches unanswered sub-questions before the reply is sent, making completeness consistent.

_Why a tempting wrong answer misses:_ Longer replies (A) are not necessarily more complete; a targeted check against criteria addresses whether each question was actually answered.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/chain-of-thought

</details>

---

### Question 52 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Decompose Multi-Concern Requests · medium*

A customer's message contains three separate concerns (a billing dispute, a shipping delay, and a feature question), and the agent redundantly re-fetches the customer record for each. What is the best approach?

- **A.** Handle only the first concern and ask the customer to resend the other two as separate tickets
- **B.** Escalate the whole multi-concern message because parallel investigation is too complex for the agent
- **C.** Decompose into three concerns, investigate in parallel over one shared customer context, then synthesize one reply
- **D.** Answer all three from memory without lookups so the agent avoids redundant tool round-trips

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Decomposing the request and investigating the parts in parallel over a shared customer context avoids redundant fetches and yields one coherent, complete reply.

_Why a tempting wrong answer misses:_ Escalating (B) is wrong for a multi-concern message the agent can handle sequentially; escalation is reserved for genuine policy gaps, not workload.

Reference: https://www.anthropic.com/engineering/multi-agent-research-system

</details>

---

### Question 53 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Agentic Loop Control · easy*

You are writing the loop that drives the support agent on the Messages API. After each response, how should the loop decide whether to run the requested tools and call the API again, or to stop?

- **A.** Stop when the assistant text contains a closing phrase like 'let me know if there is anything else', which usually signals that the agent considers itself finished
- **B.** Check stop_reason: continue the loop when it is tool_use, and stop when it is end_turn
- **C.** Stop after a fixed three iterations of the loop regardless of what the response actually contains or whether the agent is finished
- **D.** Stop as soon as any text block appears in the response, even when that same response also contains a tool_use block still waiting to run

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

stop_reason is the structured loop-control signal: tool_use means run the requested tools and continue, end_turn means the agent has finished.

_Why a tempting wrong answer misses:_ Scanning for a closing phrase (A) is brittle; the API returns stop_reason precisely so you never have to infer completion from the prose.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 54 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Keyword-Routing Bias · hard*

Despite well-written tool descriptions, the agent almost always calls issue_refund whenever a message contains the word 'refund,' even for questions that only ask about the refund policy. What is the most likely cause?

- **A.** Keyword-sensitive routing in the system prompt (e.g. 'if they say refund, use issue_refund') overrides nuanced tool choice
- **B.** The issue_refund input schema is subtly malformed, so the model falls back to calling it whenever refunds come up
- **C.** The model is too small to read tool descriptions, so it ignores them and keys only on message keywords
- **D.** Sampling temperature is set too high, which makes the agent randomly prefer refund tools over policy tools

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

When descriptions are good but a keyword still forces a specific tool, the usual culprit is keyword-based routing instructions in the system prompt biasing the model toward that tool.

_Why a tempting wrong answer misses:_ A malformed schema (B) would cause tool errors or non-use, not reliable keyword-triggered overuse of that specific tool.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 55 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Tool Description Quality · medium*

The agent selects the right tool but often passes the date argument in the wrong format, causing failures. Where is the most effective place to fix this?

- **A.** Retry the call repeatedly with different formats until one of them happens to be accepted, then reuse that format for the rest of the conversation
- **B.** Add a global instruction to 'use correct formats'
- **C.** Lower the sampling temperature
- **D.** Put the expected format and a concrete example directly in the tool's description, and constrain it in the input_schema

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The tool description is the primary place the model learns how to call a tool, so stating the exact format with an example (backed by input_schema constraints) fixes malformed arguments at the source.

_Why a tempting wrong answer misses:_ A vague global 'use correct formats' (B) gives no concrete target; the specific format belongs in the tool's own description where the model reads it.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 56 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: When Not to Escalate · hard*

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

### Question 57 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Tool Error Handling · medium*

One of the agent's tool calls fails with an error. How should the loop handle it so the agent can recover?

- **A.** Silently drop the failed tool_result and continue as though it succeeded so the resolution keeps moving
- **B.** Return a tool_result with is_error: true describing the failure so the agent can retry, switch tools, or ask
- **C.** Abort the entire conversation immediately so a failed tool cannot cascade into a wrong customer action
- **D.** Remove the failing tool from the agent permanently so that particular error can never occur again

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A failed tool should return a tool_result with is_error true so the model can see the failure and recover, rather than being misled into thinking the call succeeded.

_Why a tempting wrong answer misses:_ Dropping the failed result (A) makes the model believe the call worked, producing incorrect downstream actions built on a phantom success.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 58 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Ask for Missing Information · easy*

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

### Question 59 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Fabricated Policy · medium*

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

### Question 60 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Programmatic Policy Limits · medium*

Refund policy caps automatic refunds at $100, above which a manager must approve. Relying on the prompt, the agent occasionally issues automatic refunds above the cap. What is the best fix?

- **A.** Restate the $100 cap in the system prompt in bold near the tool definition so the agent sees it each turn
- **B.** Ask the agent to double-check the amount before issuing so it catches over-cap refunds itself
- **C.** Enforce the cap in code so issue_refund (or a wrapper) rejects or routes over-$100 amounts to approval
- **D.** Give the agent more few-shot examples of the cap during prompting so it internalizes the limit

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

A hard business limit should be enforced programmatically at the tool boundary so it holds regardless of whether the model follows the prompt on a given run.

_Why a tempting wrong answer misses:_ A bolded prompt rule (A) still depends on model compliance every time, whereas a code-enforced cap cannot be bypassed by a wayward generation.

Reference: https://code.claude.com/docs/en/hooks

</details>

---

### Question 61 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Persistent Constraints · medium*

Early in a chat the customer states they are in the EU, which changes the applicable return window. Twenty turns later, after summarization, the agent quotes the US window. What prevents this?

- **A.** Ask the customer to restate their region at the end of the chat so the agent can verify it before replying
- **B.** Keep region and other durable constraints in a persistent case-facts block that survives summarization
- **C.** Never summarize the conversation at all so early regional details cannot be lost mid-session
- **D.** Shorten the return policy so region no longer changes the window the agent is allowed to quote

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Durable constraints like region or entitlements belong in a persistent facts block that outlives summarization, so the agent keeps applying the right rule throughout the conversation.

_Why a tempting wrong answer misses:_ Never summarizing (C) lets context grow until it overflows; a persistent facts block is the targeted, scalable way to retain the constraint.

Reference: https://platform.claude.com/docs/en/build-with-claude/context-windows

</details>

---

### Question 62 of 100

**Scenario: Customer Support Resolution Agent**
*Study area: Loop Safeguards · medium*

Your support agent loop is driven by stop_reason, but you also want to prevent a pathological case where the model keeps requesting tools indefinitely. What is a reasonable safeguard that does not break normal operation?

- **A.** Keep stop_reason as the primary control but add a maximum-iteration cap as a safety backstop
- **B.** Replace the stop_reason check with a fixed two-iteration limit so the loop always stops early
- **C.** Parse the assistant's natural-language text for 'done' instead of reading stop_reason
- **D.** Remove all tools from the agent so the loop can never continue after the first response

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

stop_reason should remain the primary signal, with a max-iteration cap only as a backstop for pathological loops, degrading gracefully if the cap is reached.

_Why a tempting wrong answer misses:_ A fixed two-iteration limit (B) would cut off normal multi-step resolutions that legitimately need more tool calls to finish.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 63 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Glob-Scoped Rules · medium*

Your team wants test-writing conventions to apply automatically whenever anyone edits a file matching **/*.test.ts, wherever it lives, without loading those rules for unrelated work. What mechanism fits best?

- **A.** Put the test-writing conventions in the root CLAUDE.md so that they are always loaded and every engineer sees them on every task, regardless of the file being edited
- **B.** Add a file under .claude/rules/ with YAML frontmatter specifying the **/*.test.ts glob, so it applies automatically based on the file being edited
- **C.** Create a skill that engineers must invoke by name before writing tests
- **D.** Paste the conventions into each pull request description

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

.claude/rules/ files carry glob frontmatter that applies path-scoped conventions automatically based on the edited file, which is exactly the file-type scoping this needs.

_Why a tempting wrong answer misses:_ The root CLAUDE.md (A) loads for every task and cannot be limited to test files; rules provide the glob scoping that CLAUDE.md lacks.

Reference: https://code.claude.com/docs/en/memory

</details>

---

### Question 64 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Skills vs. CLAUDE.md · medium*

You have a detailed, multi-step database-migration workflow that should load only when someone is actually doing a migration, not on every task. Where does it belong?

- **A.** In a Skill (.claude/skills/<name>/SKILL.md) that loads on demand when its trigger keywords appear
- **B.** Put the migration workflow in the root CLAUDE.md so it is always available and no one ever has to remember to invoke it before starting a migration
- **C.** In a .claude/rules/ file scoped by a glob, so the migration workflow attaches automatically whenever a matching migration file is opened for editing
- **D.** In the user-level ~/.claude/CLAUDE.md, so the full migration workflow is always loaded in your own sessions across every project you work in

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Task/workflow-specific guidance that should not load on every task belongs in a Skill, which loads on demand when its trigger keywords appear.

_Why a tempting wrong answer misses:_ The root CLAUDE.md (B) loads every session, so it would carry an occasional workflow into every unrelated task; Skills load only when triggered.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 65 of 100

**Scenario: Code Generation with Claude Code**
*Study area: context: fork · hard*

A skill performs a noisy, verbose repository scan whose intermediate output would clutter the main conversation, but you only need its final summary. Which frontmatter option keeps the main context clean?

- **A.** allowed-tools, which restricts which tools the skill may call (for example to read-only commands)
- **B.** argument-hint, which only suggests parameters in the UI and does not isolate context
- **C.** model, which pins a specific model for the skill but still runs in the main conversation
- **D.** context: fork, which runs the skill in an isolated subagent so verbose output stays out of the main chat

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

context: fork runs a skill in an isolated subagent so its verbose intermediate output stays out of the main conversation and only the result returns.

_Why a tempting wrong answer misses:_ allowed-tools (A) restricts capabilities but does nothing about verbose output flooding the main context; forking is what isolates it.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 66 of 100

**Scenario: Code Generation with Claude Code**
*Study area: allowed-tools · medium*

You want a documentation-generation skill to be structurally unable to run shell commands or edit files, only to read them. Which frontmatter field enforces that guardrail deterministically?

- **A.** context: fork, which runs the skill in an isolated subagent so its file reads and shell calls cannot touch the main context
- **B.** argument-hint
- **C.** allowed-tools, restricting the skill to just the read tools it needs
- **D.** Add a clear sentence in the skill body asking it to only read files and never run shell commands or make edits while it generates the documentation

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

allowed-tools restricts what a skill can do at the harness level, a deterministic guardrail that is far stronger than an in-body request.

_Why a tempting wrong answer misses:_ A request in the skill body (D) is advisory and can be ignored mid-task; allowed-tools enforces the restriction so the capability simply is not available.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 67 of 100

**Scenario: Code Generation with Claude Code**
*Study area: argument-hint · easy*

Your custom /deploy skill needs the target environment as a parameter, and you want Claude Code to prompt for it. Which frontmatter field is designed for this?

- **A.** argument-hint, which declares and prompts for the expected parameter(s)
- **B.** allowed-tools, which lists the tools a skill may call and could be misread as also declaring the environment it should receive
- **C.** context: fork, which runs the skill in an isolated subagent that is handed the target environment separately from the main conversation
- **D.** model

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

argument-hint declares the parameters a skill or command expects and prompts the user to supply them.

_Why a tempting wrong answer misses:_ allowed-tools (B) restricts which tools a skill may call and has nothing to do with prompting for parameters.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 68 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Project Skill Precedence · hard*

The project defines a skill named 'review' in .claude/skills/. You want your own personal variant with different behavior, but your personal 'review' skill never runs. Why, and what is the clean fix?

- **A.** Personal skills are disabled inside project repos by default; re-enable them in local settings
- **B.** Project skills take precedence over a same-named personal skill; rename your personal skill to coexist
- **C.** Move your personal skill into the project directory so it overrides the team's shared skill
- **D.** Delete the project skill from the repo so your personal skill is the only one that can run

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A project skill wins over a same-named personal skill; to customize personally without conflict, give your personal skill a different name so both remain available.

_Why a tempting wrong answer misses:_ Moving your skill into the project (C) would change behavior for the whole team, not just you; a differently-named personal skill keeps the customization personal.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 69 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Custom Command Location · medium*

You want a custom slash command to be available to everyone on the team automatically when they clone or pull the repository. Where should it live?

- **A.** Put the command in each developer's personal ~/.claude/commands/ directory and ask everyone on the team to add it there after they clone the repository
- **B.** In a .claude/config.json 'commands' array
- **C.** In the project's .claude/commands/ (or .claude/skills/) directory, so it is version-controlled and ships with the repo
- **D.** In an environment variable set on the CI runner

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Team commands and skills belong in the project's .claude/ directory so they are version-controlled and available to everyone who clones or pulls the repo.

_Why a tempting wrong answer misses:_ There is no .claude/config.json 'commands' array (B); custom commands live as files under .claude/commands/ or .claude/skills/.

Reference: https://code.claude.com/docs/en/slash-commands

</details>

---

### Question 70 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Plan Mode vs. Direct Execution · medium*

You are asked to split a monolith into microservices, a change with major architectural implications and several viable decompositions. What is the best first move in Claude Code?

- **A.** Start editing the largest source file directly to make immediate progress, then rework the structure later as the design becomes clearer
- **B.** Ask Claude to compact the context window first so there is more room to hold the whole monolith before deciding how to split it
- **C.** Immediately generate the full implementation across all of the services and then review the result afterward, iterating on whatever the first pass gets wrong
- **D.** Use plan mode to explore the codebase and design the approach before touching code

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Architecturally significant or ambiguous work calls for plan mode to explore and design before implementation; direct execution is for well-specified, low-ambiguity changes.

_Why a tempting wrong answer misses:_ Jumping straight into edits (A) risks committing to a poor decomposition on a high-ambiguity architectural change; planning first surfaces the trade-offs.

Reference: https://code.claude.com/docs/en/common-workflows

</details>

---

### Question 71 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Explore Subagent · medium*

Before implementing, you must understand how authentication flows through a large unfamiliar codebase, which means reading many files. You want to preserve your main context window. What is the best approach?

- **A.** Read every file yourself in the main session to build a complete picture, then run /compact once the context window starts to fill up from all of that reading
- **B.** Delegate the discovery to the Explore subagent, which isolates the verbose reading and returns a summary, preserving the main context
- **C.** Increase the context window size in settings
- **D.** Skip discovery and start implementing, correcting as you go

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The Explore subagent isolates verbose discovery and returns a concise summary, preserving the main context window; delegating beats a lossy /compact.

_Why a tempting wrong answer misses:_ Reading everything in the main session and then /compact (A) is lossy and still fills the context; the Explore subagent avoids both problems.

Reference: https://code.claude.com/docs/en/sub-agents

</details>

---

### Question 72 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Concrete Examples · medium*

Claude keeps misinterpreting a data transformation you described in prose, producing subtly wrong output shapes. What most reliably communicates the transform?

- **A.** Provide a concrete input-to-output example pair showing exactly what goes in and what should come out
- **B.** Rewrite the prose description of the transformation to be considerably longer and more detailed, spelling out each edge case the model keeps getting wrong
- **C.** Raise the model's thinking effort so it reasons longer about your prose description and is less likely to misread the intended output shape
- **D.** Add more of the transformation's requirements as a longer bulleted list of constraints, describing each rule the output shape must satisfy in words

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Concrete input-to-output examples beat more prose for pinning down a transform the model keeps misreading, because the exact shapes remove the ambiguity.

_Why a tempting wrong answer misses:_ Longer prose (B) preserves the same ambiguity that caused the misread; a worked example shows the target directly instead of describing it again.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting

</details>

---

### Question 73 of 100

**Scenario: Code Generation with Claude Code**
*Study area: MCP Env Expansion · medium*

Your team wants a shared MCP server configuration checked into the repo, but each developer must supply their own GitHub token and no secret may be committed. What is the idiomatic setup?

- **A.** Commit .mcp.json with the token hard-coded into the file and simply rotate that token frequently so that a leak has only a limited window of usefulness
- **B.** Have each developer keep their own private copy of the MCP configuration outside the repository so their personal token never gets committed anywhere
- **C.** Store the token in CLAUDE.md so Claude can read it
- **D.** Commit .mcp.json using ${GITHUB_TOKEN} environment-variable expansion, so each developer supplies their own secret at runtime

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

.mcp.json supports ${ENV} expansion, so the shared config stays version-controlled while each developer provides their own secret via an environment variable, never committing tokens.

_Why a tempting wrong answer misses:_ Hard-coding a token in a committed file (A) leaks the secret no matter how often it is rotated; env expansion avoids committing it at all.

Reference: https://code.claude.com/docs/en/mcp

</details>

---

### Question 74 of 100

**Scenario: Code Generation with Claude Code**
*Study area: CLAUDE.md Hierarchy · easy*

You want a coding standard that applies to every engineer working in this repository, loaded in every session. Where should it go?

- **A.** Put the coding standard in your personal ~/.claude/CLAUDE.md so it travels with you, and ask each teammate to copy the same content into their own personal file
- **B.** In a .claude/rules/ file scoped to a single narrow glob, so the standard only attaches when a file matching that one pattern is being edited
- **C.** In the project's CLAUDE.md (checked into the repo) so the whole team inherits it every session
- **D.** In a Skill that individual engineers have to remember to invoke by name each time before the coding standard will actually apply to their work

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Team-wide, always-on guidance belongs in the project CLAUDE.md, which is checked in and loaded every session for everyone on the team.

_Why a tempting wrong answer misses:_ The personal ~/.claude/CLAUDE.md (A) is user-level and applies only to your sessions, so teammates would never receive the standard.

Reference: https://code.claude.com/docs/en/memory

</details>

---

### Question 75 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Mechanism Selection · hard*

Match the mechanism to the need: universal always-apply standards, file-path-scoped conventions, and task-triggered workflows. Which mapping is correct?

- **A.** Universal standards to CLAUDE.md; file-path-scoped conventions to .claude/rules/ globs; task-triggered workflows to Skills
- **B.** Universal standards to Skills; file-path-scoped conventions to the root CLAUDE.md; and task-triggered workflows to .claude/rules/ glob files
- **C.** Put everything into CLAUDE.md, since it always loads and therefore guarantees that every standard, convention, and workflow is available on every single task
- **D.** Universal standards to rules; conventions to Skills; workflows to CLAUDE.md

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

CLAUDE.md is always-on for universal standards, .claude/rules/ globs scope by file path, and Skills load on trigger keywords for task workflows.

_Why a tempting wrong answer misses:_ Option B inverts the roles: Skills load on demand and cannot carry universal always-apply standards the way CLAUDE.md does.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 76 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Plan Mode vs. Direct Execution · easy*

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

### Question 77 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Rules vs. Skills Scope · hard*

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

### Question 78 of 100

**Scenario: Code Generation with Claude Code**
*Study area: MCP Config Scopes · medium*

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

### Question 79 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Few-Shot for Output Format · medium*

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

### Question 80 of 100

**Scenario: Code Generation with Claude Code**
*Study area: CLAUDE.md Hierarchy · medium*

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

### Question 81 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Explore and Plan Subagents · medium*

In Claude Code's subagent model, which pairing correctly describes the Explore and Plan subagents?

- **A.** Explore writes the final implementation code while Plan runs the test suite, so the two subagents together cover building and then verifying the change
- **B.** Explore and Plan both edit files directly in the main conversation context rather than working in any isolated subagent
- **C.** Explore compacts the running conversation to save space, while Plan deletes stale or outdated context that is no longer needed
- **D.** Explore isolates verbose discovery and returns a summary; Plan designs the implementation approach

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Explore handles verbose discovery and returns a summary that preserves context, and Plan designs the implementation approach before any code is written.

_Why a tempting wrong answer misses:_ Neither subagent is a code-writing or test-running role (A); Explore discovers and Plan designs.

Reference: https://code.claude.com/docs/en/sub-agents

</details>

---

### Question 82 of 100

**Scenario: Code Generation with Claude Code**
*Study area: Skills as Reusable Context · medium*

You maintain a set of canonical example implementations that Claude should reference only when building a new API endpoint, not on every task. What is the best home for them?

- **A.** Paste the canonical example implementations into the root CLAUDE.md so they are always on hand, ensuring the model can reference them the moment they are needed
- **B.** Put them in a .claude/rules/ file with a broad glob
- **C.** Put them in a Skill that loads on demand when endpoint-building keywords trigger it, keeping them out of unrelated tasks
- **D.** Keep them only in a wiki outside the repo

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Reusable exemplar context that should not load for every task fits a Skill, which loads on demand by trigger keywords and keeps unrelated sessions lean.

_Why a tempting wrong answer misses:_ Putting exemplars in CLAUDE.md (A) loads them into every session, spending context on tasks that never need them.

Reference: https://code.claude.com/docs/en/skills

</details>

---

### Question 83 of 100

**Scenario: Building on the Claude Platform**
*Study area: Messages API · easy*

A developer new to the platform asks which endpoint handles a normal chat completion, a tool-use turn, and a vision request. What is the correct answer?

- **A.** All of them go through the single Messages API endpoint (POST /v1/messages); tools, images, and text are all expressed within that one request
- **B.** Each capability uses a different endpoint: /v1/chat for text, /v1/tools for tool use, and /v1/vision for images
- **C.** Chat uses /v1/messages, but tool use requires a separate /v1/functions endpoint
- **D.** Vision requires a dedicated /v1/images endpoint

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The Messages API (POST /v1/messages) is the single entry point; tool use, vision, and text are all expressed inside that one request shape.

_Why a tempting wrong answer misses:_ There are no separate /v1/chat or /v1/tools endpoints (B); the whole surface is the Messages API with different content blocks and parameters.

Reference: https://platform.claude.com/docs/en/api/messages

</details>

---

### Question 84 of 100

**Scenario: Building on the Claude Platform**
*Study area: tool_choice · medium*

You want to force Claude to call one specific tool, get_weather, on this turn rather than letting it decide. Which tool_choice setting does that?

- **A.** tool_choice: auto, which leaves the decision to the model and tends to select get_weather when the prompt is obviously about weather, though it is not guaranteed
- **B.** tool_choice: { type: "tool", name: "get_weather" }, which forces that specific tool
- **C.** tool_choice: any, which requires the model to call some tool on this turn, making it very likely to reach for get_weather in a weather scenario
- **D.** tool_choice: none

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

tool_choice of type "tool" with a name forces that exact tool; auto lets the model decide, any forces some tool, and none forbids tools.

_Why a tempting wrong answer misses:_ any (C) forces the model to use some tool but not a specific one; only type "tool" pins the exact tool to call.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 85 of 100

**Scenario: Building on the Claude Platform**
*Study area: Prompt Caching Invalidation · hard*

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

### Question 86 of 100

**Scenario: Building on the Claude Platform**
*Study area: Prompt Caching Invalidation · medium*

Which change will NOT, on its own, invalidate an existing prompt cache entry?

- **A.** Changing the model
- **B.** Changing the tool definitions sent with the request, since the tools sit in the cached prefix and editing them busts the cache
- **C.** Editing the text of the cached system prompt is a safe operation, because the cache keys on structure rather than exact wording, so the entry survives it
- **D.** Adding a new user message after the cached prefix while leaving the prefix itself unchanged

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Because caching is prefix-based, appending new content after an unchanged cached prefix still hits the cache; changing the model, the tools, or the prefix text is what invalidates it.

_Why a tempting wrong answer misses:_ Changing the model (A) does invalidate the cache; the safe operation is adding content after the stable prefix, not altering anything within it.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

</details>

---

### Question 87 of 100

**Scenario: Building on the Claude Platform**
*Study area: Message Batches API · medium*

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

### Question 88 of 100

**Scenario: Building on the Claude Platform**
*Study area: Streaming · medium*

You are generating very long outputs with a high max_tokens and occasionally hit HTTP timeouts on non-streaming requests. What is the recommended fix, and how do you get the assembled result?

- **A.** Lower max_tokens until the timeouts stop, accepting that some answers will be truncated, since a shorter completion is less likely to exceed the request timeout
- **B.** Use streaming to avoid the timeout, then assemble the complete result with the SDK's get_final_message()/finalMessage() helper
- **C.** Retry the non-streaming call with only a longer client timeout
- **D.** Split the prompt across the Batches API

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Streaming is recommended for long outputs or high max_tokens to avoid HTTP timeouts, and the SDK's get_final_message()/finalMessage() gives you the fully assembled message.

_Why a tempting wrong answer misses:_ Lowering max_tokens (A) sacrifices the output you actually need; streaming solves the timeout without truncating the response.

Reference: https://platform.claude.com/docs/en/build-with-claude/streaming

</details>

---

### Question 89 of 100

**Scenario: Building on the Claude Platform**
*Study area: Structured Outputs · hard*

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

### Question 90 of 100

**Scenario: Building on the Claude Platform**
*Study area: MCP Primitives · easy*

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

### Question 91 of 100

**Scenario: Building on the Claude Platform**
*Study area: MCP Transports · medium*

You are connecting Claude to a local MCP server running on the same machine and, separately, to a remote hosted one. Which transports fit these two cases?

- **A.** stdio for the local server and streamable HTTP/SSE for the remote server
- **B.** HTTP for the local server so it can be reached on localhost, and stdio for the remote server so it can stream over the network connection to the host
- **C.** WebSocket connections for both the local and the remote server, since the MCP specification requires that single transport everywhere
- **D.** gRPC for the local server on the same machine and a plain REST API for the remote hosted server over the network

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

MCP uses stdio for local servers and streamable HTTP/SSE for remote ones.

_Why a tempting wrong answer misses:_ Option B reverses the two: stdio is the local transport and HTTP/SSE is for remote servers, not the other way around.

Reference: https://platform.claude.com/docs/en/agents-and-tools/mcp

</details>

---

### Question 92 of 100

**Scenario: Building on the Claude Platform**
*Study area: Agent SDK vs. API · medium*

A team wants Claude to run an agent loop with tool execution, context management, and file/permission handling largely handled for them, rather than writing that orchestration against raw HTTP. Which choice matches?

- **A.** The raw Messages API, because it already ships with a built-in harness that runs the full agent loop
- **B.** The Claude Agent SDK, which provides the harness (loop, tool execution, context handling) on top of the API
- **C.** The Batches API, which manages multi-step agent loops asynchronously at a lower unit cost
- **D.** Either surface interchangeably; the Messages API and Agent SDK expose the same harness behavior

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The Claude Agent SDK provides the agent harness (loop, tool execution, context handling) built on the API, while the raw Messages API gives you the primitives and you assemble the loop yourself.

_Why a tempting wrong answer misses:_ The raw Messages API (A) does not include a harness; you would have to write the loop, tool dispatch, and context handling manually.

Reference: https://platform.claude.com/docs/en/api/agent-sdk/overview

</details>

---

### Question 93 of 100

**Scenario: Building on the Claude Platform**
*Study area: Token Counting · medium*

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

### Question 94 of 100

**Scenario: Building on the Claude Platform**
*Study area: PDF and Vision Inputs · easy*

You need Claude to answer questions about a multi-page PDF and a screenshot. How are these provided?

- **A.** Only plain text extracted from the PDF and image can be sent, so you must run OCR and text extraction yourself before putting anything into the request
- **B.** They must first be uploaded to a separate vision product outside the Messages API, which then returns text you can paste into your request
- **C.** PDF documents are supported as native input, but screenshots and other images are not, so you would still have to extract the image's text yourself
- **D.** Both PDFs and images are supported as content blocks within a Messages API request (document and image inputs)

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The Messages API natively accepts PDF (document) and image inputs as content blocks, so you do not need to pre-extract text or use a separate product.

_Why a tempting wrong answer misses:_ Native PDF and vision input are supported (A is wrong), so pre-extracting text is unnecessary and would discard layout and visual information the model can use.

Reference: https://platform.claude.com/docs/en/build-with-claude/pdf-support

</details>

---

### Question 95 of 100

**Scenario: Building on the Claude Platform**
*Study area: Parallel Tool Results · hard*

Claude requested three tools in a single turn. Your code returns each tool_result in its own separate user message across three API calls. Over time Claude stops calling tools in parallel. Why?

- **A.** Splitting tool_results across multiple messages trains the model away from parallel calls; all tool_results for a turn should be returned together in one user message
- **B.** Parallel tool use is only available on the Haiku models, so once your traffic shifts to a larger model the requests stop being dispatched in parallel
- **C.** The tools' schemas must be merged into one combined schema
- **D.** You must set tool_choice to any to keep parallelism

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

All tool_results for a turn should be returned together in a single user message; splitting them across messages trains Claude to stop calling tools in parallel.

_Why a tempting wrong answer misses:_ Setting tool_choice to any (D) forces a tool call but does not fix the pattern; the remedy is returning all results together in one message.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview

</details>

---

### Question 96 of 100

**Scenario: Building on the Claude Platform**
*Study area: Prompt Caching Mechanics · medium*

How do you mark a block for caching, and what TTLs are available?

- **A.** Set stream: true and caching then turns on automatically for the request, with a fixed ten-minute time-to-live that you do not configure yourself
- **B.** Add cache_control { type: "ephemeral" } to the block; the default TTL is 5 minutes, with a 1-hour option
- **C.** Prefix the block with a special cache token in the content; the TTL for a block cached that way is always fixed at 24 hours
- **D.** Enable it globally in the dashboard; the TTL cannot be changed

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

You opt a block into caching with cache_control { type: "ephemeral" }; the default TTL is 5 minutes, and a 1-hour TTL is also available.

_Why a tempting wrong answer misses:_ Caching is not automatic and has no fixed 10-minute TTL (A); you opt in per block with cache_control and choose the TTL.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

</details>

---

### Question 97 of 100

**Scenario: Building on the Claude Platform**
*Study area: stop_reason Values · medium*

Your agent loop must handle every way a turn can end. Which set correctly lists Messages API stop_reason values you should branch on?

- **A.** success, failure, retry, and timeout, which between them describe every way an API turn can finish and tell the loop whether it should try again
- **B.** complete, incomplete, and error, the three states the loop should branch on to decide whether a turn finished cleanly or needs handling
- **C.** end_turn, tool_use, max_tokens, stop_sequence, plus pause_turn and refusal
- **D.** done, continue, and stop, a simple trio of control signals the loop can switch on to decide whether to call the API again or finish

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Valid stop_reason values include end_turn, tool_use, max_tokens, stop_sequence, pause_turn (a server-tool loop paused), and refusal; the loop should branch on these.

_Why a tempting wrong answer misses:_ Options like success/failure/retry (A) are invented; the API reports structured stop_reason values such as end_turn and tool_use.

Reference: https://platform.claude.com/docs/en/api/handling-stop-reasons

</details>

---

### Question 98 of 100

**Scenario: Building on the Claude Platform**
*Study area: Model Selection · medium*

For a high-volume classification job where each item is simple and latency matters, which current model is the most cost-and-speed appropriate default, assuming quality is adequate?

- **A.** Always use Opus 4.8 regardless of the task, on the reasoning that the strongest model gives the best quality and avoids any risk of misclassification
- **B.** Use whichever model has the largest context window
- **C.** Fine-tune a custom model first
- **D.** Haiku 4.5, which targets simple, high-throughput, latency-sensitive work (with Sonnet 5 as the balanced step up and Opus 4.8 for the hardest reasoning)

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Haiku 4.5 fits simple, high-volume, latency-sensitive tasks; Sonnet 5 is the balanced choice and Opus 4.8 is for the hardest reasoning. Match the model to the task.

_Why a tempting wrong answer misses:_ Defaulting everything to Opus (A) overpays and adds latency for simple, high-volume work that Haiku handles well.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

### Question 99 of 100

**Scenario: Building on the Claude Platform**
*Study area: Adaptive Thinking · hard*

On the newest models, how do you increase reasoning depth for a hard multi-step problem, given that fixed budget_tokens and sampling controls have changed?

- **A.** Set a large budget_tokens value as before, since reserving more thinking tokens still controls depth
- **B.** Raise temperature so the model samples more aggressively and appears to think harder
- **C.** Use adaptive thinking (thinking type "adaptive") and set output_config.effort (low through max)
- **D.** There is no supported way to influence reasoning depth on current Claude models

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Current models use adaptive thinking (replacing fixed budget_tokens) with an effort setting from low through max to control reasoning depth; temperature is not the lever.

_Why a tempting wrong answer misses:_ Fixed budget_tokens (A) has been superseded by adaptive thinking on the newest models; you steer depth with the effort setting instead.

Reference: https://platform.claude.com/docs/en/build-with-claude/extended-thinking

</details>

---

### Question 100 of 100

**Scenario: Building on the Claude Platform**
*Study area: Verifying Cache Hits · medium*

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
