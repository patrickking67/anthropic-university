# Foundation Models for Client Conversations

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Explain how large language models work, in plain language, so clients make sound decisions about cost, latency, accuracy, and model choice.**

Group: partner · Level: beginner · ~4 h · For: Consultants, solution architects, and partner sellers who need to explain Claude to business and technical stakeholders.

## Take alongside

- [Claude Partner Network learning path (partner login required)](https://anthropic-partners.skilljar.com/page/claude-partner-network-learning-path) — Claude Partner Network
- [CPN Connect on-demand library (partner login required)](https://anthropic-partners.skilljar.com/page/cpnc-on-demand-library) — Claude Partner Network
- [AI Capabilities and Limitations](https://anthropic.skilljar.com/ai-capabilities-and-limitations) — Anthropic Academy
- [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations) — Anthropic Academy
- [Claude Platform 101](https://anthropic.skilljar.com/claude-platform-101) — Anthropic Academy

## Tokens: the unit clients pay for

What a token is, why the same content costs different amounts in different languages, and how to size a workload before quoting it.

**You will be able to:**

- Explain tokens to a non-technical sponsor without jargon
- Explain why equivalent content can tokenize differently across languages and data types
- Measure a workload with the token counting endpoint instead of guessing
- Translate per-million-token prices into cost per task

**Key points**

- Models read and write tokens, which are word pieces rather than whole words. Anthropic's glossary puts an English token at roughly 3.5 characters, and notes the ratio varies by language.
- A tokenizer's vocabulary is fixed when the model is built. Text patterns that were common in training compress into fewer, longer tokens; less common scripts, rare terms, and long digit strings split into more pieces.
- The same meaning in two languages can therefore use a different number of tokens, which changes both cost and latency. Measure the client's real content rather than assuming parity.
- Pricing is per million tokens with separate input and output rates. On the current lineup output costs five times input, for example $4 in and $20 out per million tokens on Claude Opus 5.5.
- The token counting endpoint (POST /v1/messages/count_tokens) returns the input token count for a request before you send it, including system prompt, tools, and documents.
- Tokenizers can change between model generations. Current models use the tokenizer introduced with Claude Opus 4.7, so re-measure token counts when a client migrates from an older model.

**Practice:** Client conversation: a regional bank asks why its Japanese-language pilot costs more per document than its English pilot, even though both handle the same statements. In three sentences a finance sponsor would follow, explain what a token is and why the gap exists, then describe how you would measure the gap using twenty of their own documents and the token counting endpoint.

**Read:** [Glossary: tokens](https://platform.claude.com/docs/en/about-claude/glossary) · [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) · [Pricing](https://platform.claude.com/docs/en/about-claude/pricing)

<details><summary>Flashcards</summary>

**Q:** What is a token?  
**A:** A word piece the model reads and writes. For English, roughly 3.5 characters on average; the ratio varies by language and content type.

**Q:** Why can the same content cost more in one language than another?  
**A:** The tokenizer's vocabulary is fixed at build time. Scripts and patterns that were less common in training split into more tokens, so equivalent meaning can use more tokens.

**Q:** How do you size token usage before quoting a workload?  
**A:** Run representative client content through POST /v1/messages/count_tokens and price the measured input and expected output.

</details>

### Check your understanding

*Study area: Tokens and tokenization · medium*

A logistics client pilots the same invoice-summary workflow in English and Thai. Thai invoices cost noticeably more per document, even though they contain the same information. What best explains the difference?

- **A.** Thai text is billed at a higher per-token rate than English on the same model.
- **B.** The tokenizer splits Thai text into more tokens, so equal content uses more of them.
- **C.** Non-English requests are routed automatically to a larger, pricier model tier.
- **D.** Claude translates Thai into English internally and bills the translation as output.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Price per token is the same regardless of language. What differs is how many tokens a piece of text becomes: the glossary notes the characters-per-token ratio varies by language, so equivalent Thai content can produce more tokens and cost more.

_Why a tempting wrong answer misses:_ A is tempting because the bill is higher, but the rate card is per token, not per language. The difference comes from token count.

Reference: https://platform.claude.com/docs/en/about-claude/glossary

</details>

---

*Study area: Tokens and tokenization · easy*

A client asks you to forecast token spend for a contract-review workflow before launch. What is the most reliable first step?

- **A.** Divide the average word count by four and multiply by the per-token price.
- **B.** Assume one token per word, since that gives a safe buffer in every language.
- **C.** Run representative client contracts through the token counting endpoint.
- **D.** Use the model's full context window size as the per-request token estimate.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The token counting endpoint returns the actual input token count for a request, including system prompt and documents. Measuring the client's real content is more reliable than any rule of thumb.

_Why a tempting wrong answer misses:_ B sounds conservative, but token-per-word ratios vary by language and content, so a fixed ratio can under- or over-estimate badly.

Reference: https://platform.claude.com/docs/en/build-with-claude/token-counting

</details>

---

*Study area: Tokens and tokenization · medium*

A finance client's prompts include long account numbers and product codes. Their engineer notices these fields use more tokens than their character count suggested. How should you explain it?

- **A.** Long digit and code strings are uncommon patterns, so the tokenizer splits them into short pieces.
- **B.** Numbers are stored as floating-point values that each occupy a fixed block of tokens.
- **C.** The API adds hidden validation tokens around any field that looks like an identifier.
- **D.** Numeric content is always billed as output because the model has to echo it back.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Tokens can be words, subwords, or single characters. Arbitrary digit and code sequences rarely match long vocabulary entries, so they break into several short tokens and use more tokens per character than ordinary prose.

_Why a tempting wrong answer misses:_ B imagines a numeric storage format. The model sees text tokens, not typed numeric values.

Reference: https://platform.claude.com/docs/en/about-claude/glossary

</details>

---

## Next-token prediction and why answers vary

How a model produces text one token at a time by sampling from a probability distribution, and what that means for consistency.

**You will be able to:**

- Describe generation as repeated next-token prediction
- Explain why identical prompts can produce different wording
- Recommend design choices that make outputs consistent where it matters
- Correct outdated advice about sampling parameters on current models

**Key points**

- A model generates one token at a time. At each step it produces a probability distribution over its whole vocabulary, selects a token, appends it, and repeats until it stops.
- Selection is not always the single most likely token. Sampling from the distribution is what produces natural, varied language instead of repetitive text.
- When the distribution is sharply peaked, repeated runs converge on the same answer. When it is flat, runs diverge. Variation across runs is a useful signal about how settled an answer is.
- Anthropic's glossary notes that outputs are not fully deterministic even with temperature at 0, on Anthropic's own service and through cloud providers.
- On the newest Claude models, temperature, top_p, and top_k are no longer accepted and return an error. Consistency comes from clear instructions, examples, structured outputs, and the effort setting.
- For workflows that need repeatable results, design for them: constrain output with a schema, do deterministic post-processing in code, and judge quality with evals over many runs rather than one demo.

**Practice:** Client conversation: a compliance lead at an insurer ran the same prompt twice, got two differently worded summaries, and now says the tool cannot be trusted. Script a two-minute explanation of why wording varies, then name two design changes (for example, a fixed output schema and an eval over 50 runs) that make the results consistent where consistency actually matters.

**Read:** [Glossary: temperature and non-determinism](https://platform.claude.com/docs/en/about-claude/glossary) · [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) · [Effort](https://platform.claude.com/docs/en/build-with-claude/effort)

<details><summary>Flashcards</summary>

**Q:** How does a model produce a response?  
**A:** One token at a time: compute a probability distribution for the next token, select one, append it, repeat.

**Q:** Does temperature 0 guarantee identical outputs?  
**A:** No. Anthropic's glossary notes outputs are not fully deterministic even at temperature 0, and the newest models no longer accept sampling parameters.

**Q:** How do you get consistent outputs on current Claude models?  
**A:** Clear instructions and examples, structured outputs with a schema, deterministic post-processing, and evals over many runs.

</details>

### Check your understanding

*Study area: Sampling and non-determinism · medium*

A compliance officer runs the identical prompt twice, gets two summaries with different wording, and asks whether the system is broken. Which explanation is accurate?

- **A.** It is a defect; a correctly working model always returns identical text for identical input.
- **B.** The second run reused cached tokens from the first, which shifted the phrasing.
- **C.** Each token is selected from a probability distribution, so wording can vary between runs.
- **D.** Claude deliberately rewrites any repeated request so users get fresh content.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Generation samples each next token from a distribution, and Anthropic notes outputs are not fully deterministic even at temperature 0. Different wording on repeat runs is expected behavior, not a fault.

_Why a tempting wrong answer misses:_ B misreads prompt caching, which reuses processed input to save cost and time; it does not change what the model writes.

Reference: https://platform.claude.com/docs/en/about-claude/glossary

</details>

---

*Study area: Sampling and non-determinism · hard*

A client's engineer plans to set temperature to 0 on Claude Opus 5.5 so a classification workflow always returns the same label. What should you advise?

- **A.** Set temperature to 0 and top_k to 1 together, which guarantees identical labels.
- **B.** Sampling parameters are rejected on the newest models; use a schema, clear labels, and evals.
- **C.** Send the job through the Batch API, which processes requests deterministically offline.
- **D.** Raise effort to max, because higher effort removes randomness from final answers.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The newest Claude models no longer accept temperature, top_p, or top_k. Consistent labels come from structured outputs that constrain the answer, precise label definitions, and evals that check agreement over many runs.

_Why a tempting wrong answer misses:_ A reflects older practice. It fails on current models and, even where accepted, temperature 0 was never a determinism guarantee.

Reference: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

</details>

---

## Where Claude's knowledge comes from

The difference between what the model learned in training and what you give it at request time, and why that difference drives most solution designs.

**You will be able to:**

- Distinguish parametric knowledge from information supplied in context
- Explain training cutoffs and their consequences for current facts
- Position web search, retrieval, and citations as grounding options
- Answer the question 'can we train it on our data?' accurately

**Key points**

- Pretraining taught the model to predict the next word across a very large body of text; fine-tuning and reinforcement learning from human feedback then shaped it into a helpful assistant.
- What the model knows from training is stored in its weights, often called parametric knowledge. It is a compressed memory with a training cutoff and no built-in source links, not a database lookup.
- Grounding means putting authoritative material into the context window at request time, through retrieval (RAG), uploaded documents, or connectors, so answers draw on evidence rather than memory.
- The web search tool gives Claude current information, and citations are always enabled for its results. On the API it costs $10 per 1,000 searches plus the tokens the results add.
- The citations feature lets Claude point to the exact passages of supplied documents that support each claim, which makes answers auditable.
- Anthropic's glossary notes the Claude API does not currently offer fine-tuning. For most client requests to 'train it on our data', grounding plus good prompting is the right first answer.

**Practice:** Client conversation: a distributor's CIO asks, 'Can we train Claude on our product catalog so it always knows today's prices?' Draft a short reply that contrasts training with retrieval in plain terms, explains why daily-changing data belongs in context rather than in weights, and sketches the grounding design you would propose instead.

**Read:** [Glossary: pretraining, RAG, fine-tuning](https://platform.claude.com/docs/en/about-claude/glossary) · [Web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) · [Citations](https://platform.claude.com/docs/en/build-with-claude/citations)

<details><summary>Flashcards</summary>

**Q:** What is parametric knowledge?  
**A:** What the model learned in training and stores in its weights. It has a training cutoff and no source links.

**Q:** What is grounding?  
**A:** Supplying authoritative material in the context window at request time (retrieval, documents, connectors, web search) so answers draw on evidence.

**Q:** Client asks: 'Can we train Claude on our data?' First answer?  
**A:** Start with grounding: retrieve their data into context at request time. The Claude API does not currently offer fine-tuning, and changing data belongs in context, not weights.

</details>

### Check your understanding

*Study area: Parametric knowledge and grounding · easy*

A retailer's CIO asks whether Claude 'looks up' facts in a database when it answers a general question with no tools enabled. What is accurate?

- **A.** It queries Anthropic's live knowledge graph on each request to confirm facts.
- **B.** It answers from patterns learned in training and stored in its weights, up to a cutoff.
- **C.** It searches the public web automatically unless an administrator turns browsing off.
- **D.** It retrieves the closest matching document from its original training dataset.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Without tools or supplied documents, Claude answers from parametric knowledge: patterns learned during pretraining and fine-tuning, held in its weights, with a training cutoff and no lookup step.

_Why a tempting wrong answer misses:_ D is tempting, but the model does not keep or search a copy of its training data; knowledge is compressed into weights.

Reference: https://platform.claude.com/docs/en/about-claude/glossary

</details>

---

*Study area: Parametric knowledge and grounding · medium*

A distributor wants Claude to answer questions about prices that change every day. The CIO proposes 'training Claude on our catalog.' What should you recommend first?

- **A.** Fine-tune a custom model each night on the updated catalog through the Claude API.
- **B.** Paste last quarter's catalog into the system prompt so the model memorizes prices.
- **C.** Wait for the next model release, whose training cutoff will cover the newer catalog.
- **D.** Retrieve current catalog entries at request time and supply them in context with citations.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Daily-changing facts belong in context, not in weights. Retrieval-augmented generation fetches the current entries at request time, and citations let users verify the source. The API does not currently offer fine-tuning.

_Why a tempting wrong answer misses:_ A matches the client's wording, but fine-tuning is not currently offered on the Claude API and would be stale by the next price change anyway.

Reference: https://platform.claude.com/docs/en/about-claude/glossary

</details>

---

*Study area: Parametric knowledge and grounding · medium*

A client needs answers about regulatory changes published after the model's training cutoff. Which TWO approaches give Claude access to that current information? (Select 2.)

- **A.** Enable the web search tool so Claude can retrieve current sources with citations.
- **B.** Increase max_tokens so the model can reason further past its training cutoff.
- **C.** Raise the effort level so the model recalls more recent parametric knowledge.
- **D.** Supply the new regulatory text as documents in the request to ground the answer.
- **E.** Ask the model to state its confidence, which refreshes its knowledge to today.

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, D**

Both correct options put current information into the context window: web search retrieves live sources with citations, and supplied documents ground the answer directly. Either works because the model reads what is in context.

_Why a tempting wrong answer misses:_ B, C, and E change how much or how hard the model generates, not what it knows. Nothing about output length, effort, or self-reported confidence moves the training cutoff.

Reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool

</details>

---

## Attention and the context window

How attention lets a model connect ideas across a long input, what the context window holds, and why bigger is not automatically better.

**You will be able to:**

- Explain attention as the mechanism that links tokens across the input
- Define the context window and what counts toward it
- State current context window sizes for the Claude lineup
- Advise when to curate or retrieve instead of loading everything

**Key points**

- Attention lets each token the model processes weigh every earlier token in the context. That is how a model resolves a pronoun or a defined term that appeared many pages earlier.
- The context window is the model's working memory for one request: system prompt, conversation history, documents, tool results, and the output being generated all share it.
- Claude Fable 5.1, Opus 5.5, and Sonnet 5.5 have a 1M-token context window. Claude Haiku 4.5 has 200K.
- With the Messages API, the application sends the prior conversation with each new request, so a long chat processes more input tokens on every turn.
- More context is not free. Irrelevant material adds cost and latency and gives the model more to sift through; curating what goes in usually improves results.
- If the input alone exceeds the window, the API rejects the request with a 'prompt is too long' error, so very large collections need retrieval, chunking, or summarization.

**Practice:** Client conversation: a law firm partner wants to 'just paste all 4,000 contracts in' to ask questions across them. Explain the context window using an analogy of your own, do a rough estimate of whether the collection fits in 1M tokens, and propose a design that works even as the collection grows.

**Read:** [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) · [Glossary: context window](https://platform.claude.com/docs/en/about-claude/glossary) · [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)

<details><summary>Flashcards</summary>

**Q:** What does the context window hold?  
**A:** Everything for one request: system prompt, conversation history, documents, tool results, and the output being generated.

**Q:** Context window sizes for the current lineup?  
**A:** 1M tokens for Fable 5.1, Opus 5.5, and Sonnet 5.5; 200K for Haiku 4.5.

**Q:** Why does a chat get more expensive as it grows?  
**A:** Each request resends the prior conversation, so every turn processes more input tokens.

</details>

### Check your understanding

*Study area: Attention and context windows · medium*

A law firm's chat assistant is built on the Messages API. They ask why the cost of a single conversation keeps climbing as it gets longer. What is the reason?

- **A.** Each new request includes the earlier conversation, so every turn processes more input.
- **B.** The API charges a per-minute session fee that rises with conversation length.
- **C.** Longer conversations are moved automatically to a more expensive model tier.
- **D.** The model retrains on the conversation after each turn, which is billed as usage.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The context window holds the conversation history plus new output. The application resends that history with each request, so input tokens, and therefore cost, grow with every turn.

_Why a tempting wrong answer misses:_ D confuses in-context reading with training. The model's weights do not change during a conversation.

Reference: https://platform.claude.com/docs/en/build-with-claude/context-windows

</details>

---

*Study area: Attention and context windows · hard*

A partner proposes loading a client's entire 2-million-token knowledge base into every request to Claude Sonnet 5.5 'so nothing is missed.' What is the strongest objection?

- **A.** Sonnet 5.5 cannot read any single document longer than 200K tokens.
- **B.** It exceeds the 1M-token window, and padding context adds cost and latency.
- **C.** Documents placed in context are stored and used to train future models.
- **D.** Attention covers only the last few thousand tokens, so the rest is ignored.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Sonnet 5.5 has a 1M-token window, so the request would be rejected as too long. Even for collections that fit, sending material the task does not need raises cost and latency; retrieval of relevant passages is the scalable design.

_Why a tempting wrong answer misses:_ D describes pre-transformer models. Attention lets each token weigh the whole context, which is exactly why long-context models work.

Reference: https://platform.claude.com/docs/en/build-with-claude/context-windows

</details>

---

## Prefill, decode, and what clients feel as latency

Why a request has two phases, where the seconds go, and which changes actually make an assistant feel faster.

**You will be able to:**

- Describe the prefill and decode phases of a request
- Explain time to first token versus total response time
- Rank latency levers by their effect on user experience
- Set realistic latency expectations in a proposal

**Key points**

- A request runs in two phases. Prefill reads the whole input at once and builds the model's internal state; decode then produces output one token at a time, each step depending on the last.
- Time to first token (TTFT) reflects prefill, queueing, and network. Total response time is dominated by how many output tokens are generated.
- A long prompt with a short answer can finish faster than a short prompt that asks for a long report, because decode is sequential.
- Streaming shows text as it is generated. It does not reduce total work, but it makes a long answer feel responsive because people start reading immediately.
- Prompt caching lets repeated prompt prefixes skip reprocessing, cutting latency and cost for long, stable content such as policies, tool definitions, or reference documents.
- Other levers from Anthropic's latency guidance: pick a faster model such as Haiku 4.5, trim prompt and output length, and cap output with max_tokens (which truncates, so use it carefully).
- Claude Opus 5.5 supports fast mode, a research preview that delivers up to 2.5x higher output speed at premium pricing.

**Practice:** Client conversation: a contact-center VP says the agent-assist tool 'feels slow' during live calls, and answers only appear once fully written. Walk the VP through where the seconds go, then rank three changes (for example streaming, shorter answers, and caching the policy manual) by their expected effect on what agents experience.

**Read:** [Reducing latency](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency) · [Streaming](https://platform.claude.com/docs/en/build-with-claude/streaming) · [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

<details><summary>Flashcards</summary>

**Q:** Prefill vs decode?  
**A:** Prefill reads the whole input at once; decode generates output one token at a time. Output length usually dominates total time.

**Q:** What is TTFT?  
**A:** Time to first token: the delay before the first output token appears. It reflects prefill, queueing, and network.

**Q:** What does streaming change?  
**A:** Perceived speed. Users see text as it is generated, even though total generation time is the same.

</details>

### Check your understanding

*Study area: Prefill, decode, and latency · medium*

A contact-center VP says the agent-assist tool 'feels slow.' Answers are long, and nothing appears on screen until the whole response is ready. Which change most improves perceived responsiveness without changing the model?

- **A.** Increase max_tokens so the model has more room and finishes sooner.
- **B.** Move the workflow to the Batch API for its lower per-token price.
- **C.** Stream the response so agents see text as each token is generated.
- **D.** Add more example conversations to the system prompt for focus.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Streaming delivers tokens as they are produced, so agents start reading almost immediately. Total generation time is unchanged, but perceived latency drops sharply.

_Why a tempting wrong answer misses:_ B saves money but is asynchronous, which is the opposite of what a live call needs.

Reference: https://platform.claude.com/docs/en/build-with-claude/streaming

</details>

---

*Study area: Prefill, decode, and latency · hard*

Two workloads use the same model. Workload X sends a 30,000-token prompt and gets a 50-token answer. Workload Y sends a 300-token prompt and asks for a 3,000-token report. Why does Y usually take longer end to end?

- **A.** Short prompts wait behind long prompts, which the scheduler always serves first.
- **B.** Short prompts skip caching, so every token of Y is processed and priced twice.
- **C.** Reports trigger a separate review pass that roughly doubles generation time.
- **D.** Output is generated one token at a time, while input is read in parallel in prefill.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Prefill processes the whole input at once, so a long prompt adds relatively little time. Decode is sequential, one token after another, so 3,000 output tokens dominate Y's total time.

_Why a tempting wrong answer misses:_ B misunderstands caching: an uncached prompt is processed once at the normal rate, not twice.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency

</details>

---

*Study area: Prefill, decode, and latency · medium*

A client's policy Q&A app sends the same 40,000-token manual with every question. Which TWO changes reduce latency for those requests? (Select 2.)

- **A.** Move the manual after the user's question at the end of the prompt.
- **B.** Cache the manual as a stable prompt prefix so it is not reprocessed.
- **C.** Send the manual twice so the model attends to it more strongly.
- **D.** Ask for shorter answers and set a sensible max_tokens limit.
- **E.** Switch to the Batch API so each question is answered in parallel.

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, D**

Prompt caching lets a repeated prefix skip reprocessing, cutting time to first token. Shorter answers cut decode time, which dominates total latency. Both are documented latency levers.

_Why a tempting wrong answer misses:_ Moving the manual after the question (A) would break the shared prefix that caching depends on, and batching (E) trades latency for cost.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

</details>

---

## Hallucination and calibrated uncertainty

Why models sometimes state things that are not true, what calibrated uncertainty means, and the documented techniques that reduce the risk.

**You will be able to:**

- Explain hallucination in terms of how generation works
- Define calibrated uncertainty for a business audience
- Apply Anthropic's documented techniques for reducing hallucinations
- Set honest expectations about residual risk and human review

**Key points**

- A hallucination is fluent, confident output that is not supported by facts or sources. Generation produces plausible continuations, and plausible is not the same as verified.
- Honesty is part of how Claude is trained: Anthropic's HHH framework describes an honest AI as one that acknowledges its limitations and uncertainties.
- Calibrated uncertainty means the confidence a system expresses matches how likely it is to be right. Explicitly permitting Claude to say 'I don't know' is a documented way to reduce false statements.
- For long documents (over about 20K tokens), ask Claude to extract word-for-word quotes first and base its answer on them. Requiring citations, and retracting claims without support, grounds the output further.
- Restricting Claude to the provided documents, asking it to reason step by step, and comparing several runs (inconsistency flags risk) are further documented techniques.
- These techniques reduce hallucinations but do not eliminate them. High-stakes outputs need validation, and a proposal should say where human review stays in the loop.

**Practice:** Client conversation: a healthcare client's pilot produced one invented citation, and the sponsor is ready to cancel. Plan a ten-minute conversation: acknowledge the failure, explain in plain terms why it happens, and propose the specific mitigations and review step you will add before the next checkpoint.

**Read:** [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) · [Glossary: HHH](https://platform.claude.com/docs/en/about-claude/glossary) · [Citations](https://platform.claude.com/docs/en/build-with-claude/citations)

<details><summary>Flashcards</summary>

**Q:** What is a hallucination?  
**A:** Fluent, confident output that is not supported by facts or sources.

**Q:** What is calibrated uncertainty?  
**A:** Expressed confidence that matches the real likelihood of being right. Permitting 'I don't know' helps Claude stay calibrated.

**Q:** Three documented ways to reduce hallucinations?  
**A:** Allow 'I don't know', extract direct quotes before answering from long documents, and require citations (retract unsupported claims).

</details>

### Check your understanding

*Study area: Hallucination and uncertainty · medium*

A healthcare pilot produced a summary that cited a study that does not exist. The sponsor asks why a model would invent a source. What is the best explanation?

- **A.** The model copied a fake citation that a third party planted in its training data.
- **B.** The citation came from a web search the model ran without anyone's permission.
- **C.** The context window overflowed, forcing the model to replace sources with placeholders.
- **D.** It generates plausible text, and without grounding it can produce an unsupported reference.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Generation produces likely continuations. A citation-shaped string is highly plausible in a medical summary, so without supplied sources and citation requirements the model can produce one that is not real.

_Why a tempting wrong answer misses:_ C sounds technical, but an overflowing window stops generation or rejects the request; it does not substitute fabricated sources.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations

</details>

---

*Study area: Hallucination and uncertainty · hard*

A client wants fewer fabricated details in reports drawn from 60-page contracts. Which approach best follows Anthropic's documented guidance?

- **A.** Have Claude extract word-for-word quotes first, answer only from them, and allow 'I don't know.'
- **B.** Raise effort to max so the model is confident enough to avoid uncertain statements.
- **C.** Tell Claude never to express uncertainty, since hedging makes reports look unreliable.
- **D.** Summarize each contract into one paragraph first, then write the report from the summaries.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

For long documents, Anthropic recommends extracting direct quotes before performing the task, grounding claims in those quotes, and explicitly permitting Claude to say it does not know.

_Why a tempting wrong answer misses:_ D feels efficient, but compressing contracts first discards the exact wording the report needs and adds a step where details can drift.

Reference: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations

</details>

---

## Model tiers and choosing among them

The current Claude lineup, what each tier is for, and how to recommend a model with evidence rather than instinct.

**You will be able to:**

- Name the current Claude models and their positioning
- Recommend a starting model for common client workloads
- Explain effort as a lever within a single model
- Design a simple eval to confirm a model choice

**Key points**

- Current lineup: Claude Fable 5.1 ($10/$50 per million tokens in/out), Claude Opus 5.5 ($4/$20), Claude Sonnet 5.5 ($2/$10), and Claude Haiku 4.5 ($1/$5). The first three have 1M-token windows; Haiku 4.5 has 200K.
- Anthropic's default recommendation is to start with Opus 5.5 for most workloads. Use Fable 5.1 for the most demanding reasoning and long-horizon agentic work, Sonnet 5.5 for a strong speed and intelligence balance, and Haiku 4.5 for fast, high-volume, bounded tasks.
- The effort parameter trades intelligence for latency and cost inside one model, and Anthropic notes that tuning effort is often a better lever than switching models. Opus 5.5 defaults to medium; Fable 5.1 to high.
- Confirm the choice with evals on the client's own tasks: a representative test set, a clear rubric, and a comparison of quality, latency, and cost per task across tiers.
- Mixed designs are common: a more capable model plans or reviews while a smaller model handles high-volume sub-tasks.
- Every model id is a pinned snapshot. Older models stay available for a time, but plan migrations deliberately and re-run evals when you move.

**Practice:** Client conversation: an insurer wants 'the best model' for everything, from claims triage to underwriting memos. Propose a starting tier for three of their workflows with one sentence of reasoning each, then outline the eval (test set, rubric, metrics) you would run to confirm or change those picks.

**Read:** [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) · [Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) · [Effort](https://platform.claude.com/docs/en/build-with-claude/effort)

<details><summary>Flashcards</summary>

**Q:** Default starting model per Anthropic's guidance?  
**A:** Claude Opus 5.5, then adjust tier and effort based on the client's evals.

**Q:** When is Haiku 4.5 the natural first candidate?  
**A:** Fast, high-volume, bounded tasks such as classification, real-time applications, and sub-agent work.

**Q:** What is the effort parameter?  
**A:** A setting that trades intelligence for latency and cost within one model. Tuning it is often better than switching models.

</details>

### Check your understanding

*Study area: Model selection · medium*

A client asks which Claude model to start with for a new internal assistant that handles a mix of tasks with no special constraints. What does Anthropic currently recommend as the starting point?

- **A.** Claude Haiku 4.5, because the cheapest model should always be tested first.
- **B.** Claude Fable 5.1, because the most capable model removes any quality risk.
- **C.** Claude Sonnet 5.5, because it is the only model with a 1M-token window.
- **D.** Claude Opus 5.5, then adjust tier and effort based on the client's evals.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Anthropic's current guidance is to start with Opus 5.5 for most workloads, then move up to Fable 5.1 or down to Sonnet 5.5 or Haiku 4.5, and tune effort, based on evals.

_Why a tempting wrong answer misses:_ C is false: Fable 5.1, Opus 5.5, and Sonnet 5.5 all have 1M-token windows.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

*Study area: Model selection · medium*

An insurer sends millions of short, well-defined claim-classification requests each month and needs very low latency. Which model is the most natural first candidate to evaluate?

- **A.** Claude Fable 5.1
- **B.** Claude Opus 5.5
- **C.** Claude Haiku 4.5
- **D.** Claude Sonnet 5.5

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Haiku 4.5 is positioned for the lowest latency and price, suited to real-time, high-volume, bounded tasks such as classification. Confirm with an eval before committing.

_Why a tempting wrong answer misses:_ Fable 5.1 is the most capable model, but a bounded classification task rarely needs it, and it is the slowest and most expensive choice at this volume.

Reference: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model

</details>

---

*Study area: Model selection · hard*

A client's underwriting memos on Opus 5.5 are high quality but slower and costlier than they want. Before switching models, what lever does Anthropic's guidance suggest trying?

- **A.** Lower the effort setting and compare quality and latency on the client's eval set.
- **B.** Move to Claude Fable 5.1, which is faster because it is the most capable model.
- **C.** Remove the system prompt entirely, since instructions are the main source of latency.
- **D.** Split each memo into single sentences and send every sentence as its own request.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Effort trades intelligence for latency and cost within one model, and Anthropic notes that tuning effort is often a better lever than switching models. Evals show whether quality holds at the lower setting.

_Why a tempting wrong answer misses:_ B confuses capability with speed. Fable 5.1 is the most capable and the most expensive tier, not a faster one.

Reference: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model

</details>

---

## Cost, latency, and quality levers

The practical dials that move a solution's cost, speed, and quality, and how to present them to a client as cost per completed task.

**You will be able to:**

- Identify which of cost, latency, and quality a workflow prioritizes
- Apply batch processing, prompt caching, and output control to cut cost
- Route tasks to the cheapest configuration that passes its eval
- Present economics as cost per completed task

**Key points**

- Cost, latency, and quality pull against each other. Agree with the client which one matters most for each workflow before tuning anything.
- The Message Batches API gives a 50% discount for asynchronous work that does not need an immediate answer.
- Prompt caching charges cache reads at a fraction of base input price (generally 10%, 5% on Opus 5.5, 2.5% on Fable 5.1). It pays off for long, stable prefixes such as system prompts, tool definitions, and reference documents.
- Output tokens cost five times input on the current lineup, so asking for concise, structured output is a cost lever as well as a latency lever.
- Send only the context a task needs. Retrieving the relevant passages usually beats pasting everything on both cost and quality.
- Route each task to the least expensive model and effort setting that passes its eval, rather than running every task on the top tier.
- Present economics as cost per completed task (input tokens times input price plus output tokens times output price, adjusted for caching and batch), compared with what the task costs today.

**Practice:** Client conversation: a media company's nightly job summarizes 50,000 articles, and the CFO wants the bill cut in half without hurting quality. Build a one-slide plan that lists the levers you would test in order, the expected effect of each, and how you would prove quality held.

**Read:** [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing) · [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) · [Pricing](https://platform.claude.com/docs/en/about-claude/pricing)

<details><summary>Flashcards</summary>

**Q:** Batch API discount?  
**A:** 50% off for asynchronous requests that do not need an immediate response.

**Q:** When does prompt caching pay off?  
**A:** When requests share a long, stable prefix such as a system prompt, tool definitions, or reference documents.

**Q:** How should you present cost to a client?  
**A:** As cost per completed task, compared with the current cost of doing that task.

</details>

### Check your understanding

*Study area: Cost and latency levers · medium*

A media company summarizes 50,000 articles overnight, and nobody reads the results until morning. Which change most directly cuts the cost of this job?

- **A.** Stream every response so tokens are delivered and billed incrementally.
- **B.** Concatenate many articles per request to fill more of the context window.
- **C.** Submit the job through the Message Batches API for its 50% discount.
- **D.** Move to Claude Fable 5.1 so that fewer retries are needed overall.

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The work is asynchronous, which is exactly what the Message Batches API is for, and batch requests cost 50% less than standard requests.

_Why a tempting wrong answer misses:_ A changes how output is delivered, not what it costs. Streaming helps interactive latency, which this job does not need.

Reference: https://platform.claude.com/docs/en/build-with-claude/batch-processing

</details>

---

*Study area: Cost and latency levers · hard*

A support-bot client wants a lower cost per resolved ticket without hurting quality. Every request repeats a long system prompt and the same tool definitions. Which THREE levers are appropriate to test? (Select 3.)

- **A.** Cache the stable system prompt and tool definitions as a prompt prefix.
- **B.** Resend the full ticket history twice so fewer follow-up turns are needed.
- **C.** Route simple, bounded tickets to a smaller model that passes the same eval.
- **D.** Ask for concise, structured replies, since output costs more than input.
- **E.** Raise effort to max on every request so answers are right the first time.
- **F.** Turn off production evals to stop paying for test traffic.

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C, D**

Caching cuts the cost of the repeated prefix, routing sends easy work to a cheaper model that still passes its eval, and concise output reduces the most expensive token type. Each lowers cost per ticket while keeping quality measured.

_Why a tempting wrong answer misses:_ E raises cost and latency on every ticket, including easy ones, and F removes the evidence that quality held.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

</details>

---
