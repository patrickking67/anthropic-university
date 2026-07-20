# Claude Certified Associate – Foundations — Study Guide

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. It teaches the publicly documented concepts the exam covers; the questions here are original and are **not** real exam items.

The Associate – Foundations exam is about using Claude well as a knowledge worker: choosing the right place to work, writing prompts that get usable results, judging whether an output can be trusted, and folding all of that into a team's workflow safely. You are not expected to write code or design production systems. You *are* expected to make sound, practical decisions — and to know when a human, not the model, must have the final say.

A useful mental model runs through every domain: **set yourself up (entry point, model, features, context) → prompt clearly → evaluate the result → integrate it responsibly.** The choices you make *before* prompting set the quality ceiling; the checks you make *after* keep you out of trouble.

This guide follows the seven exam domains. For each, it explains the key concepts, the decision rules, and the traps the exam likes to test.

## Platform & Model Foundations

Claude meets you through several **entry points**, and picking the right one is the first decision:

| Entry point | Best for |
| --- | --- |
| **claude.ai chat** | Quick, one-off, conversational tasks with no reusable setup |
| **Projects** | Repeated work that reuses the same instructions and reference material |
| **Claude Code** | Reading, editing, and running code across a local repository |
| **API** | Building Claude into your own software to run programmatically |

Then choose a **model** to match the task:

- **Claude Opus 4.8** — the most capable model; reserve it for the hardest, multi-step reasoning where accuracy outweighs cost and speed.
- **Claude Sonnet 5** — the balanced default for high-volume, moderately complex work.
- **Claude Haiku 4.5** — fastest and most economical for simple, high-volume tasks like classification.

The classic trap is running *everything* on the largest model "to be safe." That wastes cost and latency; **match the model to the task** instead.

Know the **features** and what each is actually for: **extended (adaptive) thinking** improves multi-step reasoning; **web search** retrieves information newer than the training cutoff; **artifacts** give you an editable side panel for substantial content; **file uploads** let Claude read a real document (like a PDF) instead of a paraphrase. A common distractor swaps these — e.g., offering "extended thinking" for a question that needs *current facts* (that needs web search) or "artifacts" for a *reasoning* problem.

Finally, **manage context within a session.** Everything earlier in a conversation is context Claude may draw on, so when a long chat drifts across topics and answers get noisy, start a fresh conversation. Give Claude the *relevant* material and a specific question rather than dumping hundreds of irrelevant pages.

## Prompting & Task Execution

Good prompts are **structured**: a clear **role**, the **task**, relevant **context**, the desired **output format**, and **examples** where helpful. Missing pieces show up as predictable failures — a generic draft usually means a generic prompt.

Core habits the exam rewards:

- **Be specific.** Name the exact scope, format, and success criteria. Vague asks like "make this better" fail because "better" is undefined — say *clearer structure*, *shorter*, *more data-driven*.
- **Decompose complex requests.** If one prompt asks for three things and each comes out shallow, break the work into focused steps and check each before it feeds the next.
- **Show, don't just tell.** When a specific format or transformation keeps coming out wrong, a couple of worked **input → output examples** (few-shot) communicate the pattern better than more prose. Reserve them for tasks with a particular format or tricky edge cases; simple tasks rarely need them.
- **Say what to do, not only what to avoid.** "Don't be so formal" underperforms "warm and conversational, like advice to a colleague, with a short example."
- **Iterate diagnostically.** Change **one thing at a time** and observe. If you rewrite the role, add examples, change the format, and swap models all at once, you can't tell which change helped.

> Remember: Claude only knows what you give it. For anything about your private policies, products, or data, you must **provide that context** — a bigger model has still never seen your internal documents.

## Evaluating & Validating Output

Claude can be **fluently, confidently wrong**. Tone and polish say nothing about accuracy, so treat confidence as a non-signal.

What to check:

- **Facts and citations.** Verify claims against a primary source. Claude can **hallucinate** authoritative-looking citations that don't exist, and a *real, working* link still needs checking that the source actually says what's attributed to it.
- **Suspicious precision.** Oddly exact figures with no source (e.g., "$4.37B in 2023") are a classic fabrication pattern — precision is not provenance.
- **Bias.** Skewed outputs, especially in decisions about people, are a signal to examine the criteria and keep human oversight.

The central rule is **verification scales with stakes and reversibility.** Low-stakes, reversible, subjective work (brainstorming names) needs little scrutiny. **High-stakes, factual, legal/medical, or irreversible** outputs demand independent human verification — a lawyer for a binding contract, a clinician for a dosage, a careful review before a permanent deletion or a figure you submit to the authorities. And when you send Claude's work **under your own name, you are accountable for it.** A long track record of good results doesn't make outputs infallible; dropping review entirely just lets the inevitable errors through.

## Workflow Integration & Solution Design

The recurring question is **what to delegate versus keep with a human.** Delegate the **well-specified, repeatable, checkable, low-risk** steps (reformatting, first drafts, templated messages). Keep the **ambiguous, high-stakes, accountability-bearing** judgments (personnel decisions, who advances in hiring, signing off on official figures). The deciding factors for whether an action can run automatically are **how reversible it is and how costly a mistake would be** — cheap and reversible can auto-proceed; costly or irreversible warrants human approval, placed exactly where the stakes are.

Accountability always rests with a **named human owner**; a tool cannot be answerable for a decision.

When **communicating to stakeholders**, be honest about both value *and* limits. Overpromising ("fully autonomous, error-free, replaces the team") destroys trust at the first mistake. Credible value framing pairs the real benefit (faster first drafts, shorter turnaround) with the human role that preserves quality, and backs it with concrete before/after measures rather than a single anecdote.

To move from **"I use Claude" to "our workflow uses Claude,"** turn personal know-how into shared, reusable, documented assets — prompts, Project instructions, and knowledge — so results are consistent and the workflow survives your absence. And match the **investment to the need**: don't build an elaborate system for a task done by hand twice a year.

## Configuration & Knowledge Management

**Claude Projects** are the Associate's main configuration tool. Two building blocks:

- **Custom instructions** — standing behavioral rules (role, tone, structure) that apply **automatically to every chat** in the Project.
- **Knowledge sources** — reference documents Claude can draw on across every chat.

Match each to its slot: reference material goes in **knowledge sources**, behavioral rules go in **custom instructions**. The payoff is leverage — invest in good context once, and **every** conversation in the Project inherits it, raising quality and consistency across the board. That also means durable, always-apply rules belong in the Project, while a one-off request belongs in a single prompt.

The dominant failure mode here is **stale configuration.** If knowledge holds last year's prices or an old policy, Claude will confidently repeat it. The **root-cause fix is to update the source**, not to correct each chat by hand. Keep configuration current on a regular cadence, remove **conflicting or outdated** versions so Claude can't cite the wrong one, and scope Projects tightly (separate Projects for unrelated kinds of work). When teams drift because everyone keeps a private copy of the instructions, consolidate into **one shared Project as the source of truth**. Vague instructions ("be professional") produce varied output; specify structure, length, and tone.

## Governance, Risk & Responsible Use

Responsible use starts with **data awareness: know where your input goes, how it may be used or retained, and whether policy permits it** — *before* you paste anything.

Firm rules:

- **Never paste secrets** (passwords, live API keys, full card numbers). Asking Claude to "ignore" a key doesn't undo the exposure.
- **Regulated personal data** (PII/PHI) requires following your data policy and getting authorization first; identifiable patient records raise health-privacy obligations.
- **Confidential data belongs only in approved tools.** Deleting the chat afterward doesn't retroactively make an unapproved destination compliant.
- **Practice data minimization** — include only what the task needs; anonymize or strip details you don't. Review outputs before sharing externally so nothing sensitive leaks.

Understand **data classification** (Public / Internal / Confidential / Restricted): the label sets handling rules, and some classes may not be entered into certain tools at all. Beware **shadow IT** — personal, unvetted accounts route company data outside sanctioned controls. And **responsible-use judgment** means declining requests that facilitate harm or unauthorized access, regardless of how they're framed. The soundest org rule *enables safe use*: approved tools, follow the classification policy, no secrets or regulated data without authorization — not a blanket ban.

## Troubleshooting & Optimization

Troubleshooting is **root-cause diagnosis, then a durable fix.** When an output underperforms, ask which of a few usual suspects is to blame:

- **Generic answers →** missing context; add the specifics of your situation.
- **Format keeps coming out wrong →** stop re-describing it and give a concrete example.
- **Simple task slow/expensive on a big model →** wrong model; move to a smaller, faster one. **Complex task too shallow on a small model →** move up (and enable extended thinking).
- **Confidently out of date →** enable web search; the gap is the training cutoff, not reasoning.
- **Painful file-by-file pasting of a codebase →** wrong entry point; use Claude Code.
- **Ambiguous instruction ("clean up this") →** specify exactly what to change.

Two meta-skills: **isolate variables** (if an edit made things worse, revert and reintroduce changes one at a time), and **fix durably, not once.** A correction you repeat every day, or a tweak that reliably helps the whole team, belongs in the **shared Project configuration** so every future chat benefits automatically — not in a one-off patch you have to remember to apply.
