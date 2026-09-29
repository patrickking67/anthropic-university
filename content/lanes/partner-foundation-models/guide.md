# Foundation Models for Client Conversations

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with
> Anthropic. Facts verified against public Anthropic documentation on 2026-09-28. Re-check model
> names, prices, and limits on the [models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
> before you quote them to a client.

Most client questions about Claude are really questions about how language models work. "Why did it
say something different this time?" is a question about sampling. "Why is Japanese more expensive?"
is a question about tokenization. "Can we just train it on our data?" is a question about where
knowledge lives. If you can answer these in plain language, you earn the right to recommend an
architecture. If you can't, the client fills the gap with guesses, and guesses drive bad decisions.

This guide gives you a working mental model in eight short lessons. Each ends with the kind of
conversation you will actually have. None of it requires math.

## 1. Tokens: the unit everything is measured in

A language model never sees words. It sees **tokens**, which are pieces of text drawn from a fixed
vocabulary. A common English word is often one token. A long or rare word might be two or three. A
string of digits might be many. Anthropic's glossary puts an average English token at about 3.5
characters and notes that the ratio changes with language.

The reason for that variation is worth understanding, because clients ask about it constantly. A
tokenizer's vocabulary is built before the model is trained and then frozen. Sequences of
characters that appeared often in the material used to build it earned their own long vocabulary
entries. Sequences that appeared less often did not, so they get spelled out in smaller pieces.
The consequence is simple: **the same meaning can take a different number of tokens depending on
the language, the script, and the kind of content.** Product codes, account numbers, and
identifiers behave the same way. They are arbitrary strings, so they rarely match a long entry.

Why the client cares: price, speed, and capacity are all counted in tokens.

- Pricing is per million tokens, with input and output priced separately. On the current lineup,
  output costs five times input. Claude Opus 5.5, for example, is $4 per million input tokens and
  $20 per million output tokens.
- A context window's size is a token budget, not a page count.
- Generation speed is measured in tokens per second.

So never estimate from word counts. Anthropic provides a token counting endpoint
(`POST /v1/messages/count_tokens`) that returns the input tokens a request would use, including the
system prompt, tool definitions, and attached documents. The professional move is to take twenty
or thirty real samples of the client's content, count them, and price from the measured numbers.
One more nuance: tokenizers can change between model generations. Current Claude models use the
tokenizer introduced with Claude Opus 4.7, so a client migrating from an older model should
re-measure rather than reuse old estimates.

**Client conversation.** A regional bank sees higher per-document costs in its Japanese pilot than
its English one. A good answer: "The model reads text in small pieces called tokens, and you pay
per piece. Japanese text breaks into more pieces than English for the same meaning, so the same
statement costs more to process. Let's count twenty of your real statements in each language so we
can price the rollout from actual numbers instead of averages."

## 2. One token at a time: sampling and variation

Every response is built one token at a time. At each step the model computes a probability for
every token in its vocabulary, picks one, appends it, and repeats. That is the whole generation
loop.

The interesting part is the picking. If the model always took the single most probable token, its
writing would be stiff and repetitive. Instead it **samples**: likely tokens are chosen most of the
time, and less likely tokens some of the time. This is why two runs of the same prompt can produce
different wording.

A useful way to explain this to clients: the shape of the probability distribution tells you how
settled the answer is. Ask for the capital of France and the distribution is sharply peaked; every
run says Paris. Ask for a tagline for a new product and the distribution is flat; every run says
something different, which is exactly what you want from a brainstorm. When runs of a factual
question disagree with each other, treat that disagreement as a warning sign.

Two facts correct common misconceptions:

1. Anthropic's glossary states that outputs are not fully deterministic even with temperature set
   to 0, on Anthropic's own service and through cloud providers.
2. On the newest Claude models, the sampling parameters `temperature`, `top_p`, and `top_k` are no
   longer accepted. A request that sets them returns an error.

So the advice "set temperature to zero" is out of date. When a client needs consistent results,
you design for consistency: precise instructions and examples, **structured outputs** that
constrain the answer to a schema, deterministic post-processing in code, and evals that measure
agreement over many runs. For a classification task, a fixed list of allowed labels in a schema
does more for repeatability than any sampling setting ever did.

**Client conversation.** A compliance lead at an insurer saw two differently worded summaries and
lost confidence. Explain that wording variation is how the model writes, not a malfunction. Then
separate what must be consistent (the risk rating, the policy number, the required fields) from
what can vary (the prose). Lock the first down with a schema and test it over fifty runs; let the
second stay natural.

## 3. Where the knowledge comes from

Claude's general knowledge comes from training. Anthropic's glossary describes pretraining as
teaching the model to predict the next word across a very large body of text, followed by
fine-tuning and reinforcement learning from human feedback to make it a helpful assistant. What the
model learned is stored in its weights. People call this **parametric knowledge**.

Three properties of parametric knowledge shape nearly every solution design:

- **It has a cutoff.** The model knows nothing about events after its training data ends.
- **It has no sources.** The model can't point to where a fact came from, because it is not looking
  anything up. It is recalling a pattern.
- **It is compressed.** Common, well-documented facts are recalled reliably. Obscure or specific
  facts are recalled less reliably, and the model may still sound confident about them.

The alternative is **grounding**: putting the authoritative material into the context window at
request time so the answer is built from evidence. Retrieval-augmented generation (RAG) fetches
relevant passages from the client's knowledge base. Uploaded files and connectors bring in
documents and systems. The **web search tool** retrieves current public information; citations are
always on for its results, and on the API it costs $10 per 1,000 searches plus the tokens the
results add. The **citations** feature lets Claude point to the exact passages in supplied
documents that support each statement, which makes the output auditable.

This is how you answer the most common request in enterprise sales, "Can we train it on our
data?" The glossary notes that the Claude API does not currently offer fine-tuning. More
importantly, the client usually doesn't need it. Their data changes; weights don't. Prices, policies,
inventory, and case files belong in context, retrieved fresh for each request, with citations back
to the source of record.

**Client conversation.** A distributor's CIO wants Claude "trained on the catalog so it knows
today's prices." Explain that training creates a memory that is out of date the moment prices move.
Propose instead that each question triggers a lookup of the current catalog entries, which are
handed to Claude with instructions to answer only from them and cite the SKU record.

## 4. Attention and the context window

The mechanism that made modern language models possible is **attention**. As the model processes
each token, attention lets it weigh every earlier token in the input and decide which ones matter.
That is how it knows that "the agreement" on page forty refers to the master services agreement
defined on page two. Older approaches struggled to connect anything that far apart.

The **context window** is everything the model can consider in one request: the system prompt, the
conversation so far, any documents or tool results, and the output it is generating. The glossary
calls it the model's working memory, as distinct from what it learned in training. Current sizes:

| Model | Context window |
| --- | --- |
| Claude Fable 5.1 | 1M tokens |
| Claude Opus 5.5 | 1M tokens |
| Claude Sonnet 5.5 | 1M tokens |
| Claude Haiku 4.5 | 200K tokens |

Three practical points follow.

First, **conversations are resent.** With the Messages API, the application sends the earlier
conversation along with each new message. A long chat therefore processes more input tokens on
every turn, which is why its cost climbs.

Second, **a big window is a capacity, not a strategy.** One million tokens is a lot of text, but a
client's document estate is usually far larger. If the input alone is larger than the window, the
API rejects the request. And even when everything fits, stuffing the window with material the task
doesn't need adds cost and latency and gives the model more irrelevant text to work through.
Curating context, usually through retrieval, generally gives better answers for less money.

Third, **long context is still valuable** when the task genuinely needs the whole thing: comparing
two long contracts clause by clause, reviewing a complete codebase module, or analyzing a full
transcript. The skill is knowing which kind of task you're looking at.

**Client conversation.** A law firm partner wants to paste in 4,000 contracts. Try an analogy of
your own, such as a desk that can hold a few hundred binders at once while the archive holds
thousands. Do the rough arithmetic out loud, then propose a design where the system first finds the
contracts relevant to the question and only those go on the desk.

## 5. Prefill, decode, and what users feel as latency

Every request runs in two phases, and the difference explains almost every latency complaint.

**Prefill** is reading. The model processes the entire input at once, in parallel, and builds its
internal state. Long prompts take longer to prefill, but the work is parallel, so it scales well.

**Decode** is writing. The model generates the output one token at a time, and each token depends
on the one before it. This step is sequential and can't be parallelized within a response.

Two metrics come out of this. **Time to first token (TTFT)**, defined in Anthropic's glossary, is
how long a user waits before anything appears. It reflects prefill, queueing, and network time.
**Total response time** is dominated by decode, meaning by how many tokens the model writes. That
leads to a result that surprises clients: a 30,000-token prompt with a one-line answer often
finishes before a short prompt that asks for a three-page report.

Anthropic's latency guidance gives you the levers, and you should rank them by what the user
actually experiences:

1. **Stream the response.** Streaming doesn't make generation faster, but people start reading
   immediately, which transforms how fast an assistant feels.
2. **Ask for less output.** Shorter, structured answers cut decode time directly. `max_tokens` sets
   a hard cap but truncates mid-sentence, so use instructions for length and `max_tokens` as a
   safety limit.
3. **Cache stable prefixes.** Prompt caching lets a repeated prefix, such as a policy manual or tool
   definitions, skip reprocessing, which cuts time to first token and cost.
4. **Choose a faster configuration.** Claude Haiku 4.5 is the fastest tier. Lowering the effort
   setting on a larger model also reduces latency. Claude Opus 5.5 supports a fast mode research
   preview with up to 2.5x higher output speed at premium pricing.
5. **Trim the prompt.** Remove redundant material, while keeping the context the model genuinely
   needs.

**Client conversation.** A contact-center VP says agent-assist "feels slow" and answers only appear
when complete. Explain the reading and writing phases, show that the long answers are where the time
goes, and propose streaming first, shorter answers second, and caching the policy manual third.

## 6. Hallucination and calibrated uncertainty

A **hallucination** is output that is fluent and confident but not supported by facts or sources.
It follows directly from how generation works. The model produces the most plausible continuation,
and a plausible-looking citation, statistic, or clause number is exactly the kind of text that
shows up in the documents it learned from. Without evidence in the context, plausible can drift
away from true.

Anthropic trains Claude toward honesty. Its HHH framework (helpful, honest, harmless) describes an
honest AI as one that gives accurate information and acknowledges its limitations and uncertainties.
The goal is **calibrated uncertainty**: the confidence the system expresses should match how likely
it is to be right. A calibrated assistant says "the contract doesn't specify this" instead of
inventing a term.

Anthropic documents specific techniques, and you should be able to name them:

- **Give permission to say "I don't know."** Anthropic notes that explicitly allowing uncertainty
  can sharply reduce false statements.
- **Quote first, then answer.** For long documents (over roughly 20K tokens), ask Claude to extract
  the relevant passages word for word before doing the task, and to base its answer on those quotes.
- **Require citations,** and instruct Claude to retract any claim it can't support with a quote.
- **Restrict to the provided sources** when general knowledge shouldn't be used.
- **Check the reasoning and the consistency.** Step-by-step reasoning exposes faulty logic;
  comparing several runs exposes answers the model isn't sure of.

Be straight with clients about the limit: these techniques reduce hallucinations but don't
eliminate them. For high-stakes outputs such as medical, legal, or financial decisions, the design
must include validation and human review, and the proposal should say so in writing.

**Client conversation.** A healthcare pilot produced one invented citation and the sponsor wants to
cancel. Don't minimize it. Acknowledge the failure, explain the cause in one sentence, and come with
a concrete plan: source documents supplied for every request, quote-then-answer prompting, required
citations with automatic checks that each cited source exists, and clinician sign-off on anything
patient-facing.

## 7. Model tiers and choosing among them

The current lineup, per Anthropic's models overview:

| Model | Positioning | Price (in / out per MTok) | Context |
| --- | --- | --- | --- |
| Claude Fable 5.1 | Most capable; demanding reasoning and long-horizon agentic work | $10 / $50 | 1M |
| Claude Opus 5.5 | Default starting point for most workloads | $4 / $20 | 1M |
| Claude Sonnet 5.5 | Strong balance of speed and intelligence | $2 / $10 | 1M |
| Claude Haiku 4.5 | Fastest and cheapest; high-volume, bounded tasks | $1 / $5 | 200K |

Anthropic's recommendation is to **start with Opus 5.5** for most workloads, then move up or down
based on evidence. Many clients ask for "the best model" everywhere, which usually means paying top
prices for tasks a smaller model handles perfectly well.

Two further levers matter as much as the tier:

- **Effort.** The effort setting trades intelligence for latency and cost inside a single model.
  Anthropic's model selection guidance notes that tuning effort is often a better lever than
  switching models. Opus 5.5 defaults to `medium`; Fable 5.1 defaults to `high`.
- **Mixed designs.** A capable model can plan, review, or handle the hard cases while a smaller
  model processes the high-volume routine work.

Make the choice with **evals**, not instinct or public benchmarks. Build a test set from the
client's real cases, define a rubric, and compare candidate configurations on quality, latency, and
cost per task. The eval also becomes your acceptance test and your safety net when a new model is
released. Every model id is a pinned snapshot, so a migration is a deliberate change you can
re-test.

**Client conversation.** An insurer wants the best model for everything. Propose Haiku 4.5 for
high-volume claim triage, Opus 5.5 for underwriting memos, and Fable 5.1 only for the complex
commercial cases where reasoning quality clearly pays for itself. Then describe the eval that will
confirm or overturn each pick.

## 8. The cost, latency, and quality dials

Cost, latency, and quality pull against each other, and the right balance differs by workflow. A
nightly batch job cares about cost and not at all about latency. A live agent-assist tool cares
about latency first. A legal drafting tool cares about quality above both. Agree on the priority for
each workflow before tuning anything.

The levers, roughly in the order you'd test them:

- **Batch processing.** The Message Batches API costs 50% less for work that doesn't need an
  immediate answer.
- **Prompt caching.** Cache reads are billed at a fraction of the base input price: generally 10%,
  5% on Opus 5.5, and 2.5% on Fable 5.1. It pays off whenever requests share a long, stable prefix.
- **Output discipline.** Output costs five times input, so concise, structured responses save money
  as well as time.
- **Context curation.** Send what the task needs. Retrieval beats pasting everything.
- **Routing and effort.** Send each task to the cheapest model and effort level that passes its
  eval.

When you present economics, don't lead with price per token. Clients can't evaluate it. Show **cost
per completed task** (a summarized article, a resolved ticket, a reviewed contract), calculated
from measured token counts and adjusted for caching and batch discounts, next to what that task
costs today. That's a number a CFO can act on.

**Client conversation.** A media company wants its nightly summarization bill cut in half. The job
is asynchronous, so move it to batch processing first; that alone halves the token cost. Then cache
the shared instructions, tighten the output format, and test whether a smaller model passes the
quality eval on a sample. Report the result per article, before and after.

## Putting it together

When a client asks a question about Claude, identify which of these eight ideas it touches, answer
in plain language, and point to the design choice that follows. That habit is what separates an
advisor from a reseller. For deeper study, work through the officially published Anthropic Academy
courses listed with this lane, and if you are a registered partner, the Claude Partner Network
learning path.
