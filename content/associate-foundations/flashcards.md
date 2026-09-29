# Claude Certified Associate – Foundations — Flashcards

> Unofficial, community-authored study material. Not affiliated with Anthropic.

*Generated from `flashcards.json` by `scripts/build.mjs`. Do not edit by hand.*

## Product and Model Selection

**Q:** Which entry point works directly across the files of a local code repository?  
**A:** Claude Code (the terminal tool) reads, edits, and runs code in your repo. Use claude.ai chat for quick Q&A, Projects for reusable context, and the API to build automation.

**Q:** When should you use a Claude Project instead of a plain chat?  
**A:** When you reuse the same instructions and reference material across many chats. A Project's custom instructions and knowledge sources apply to every conversation in it.

**Q:** Which model is the recommended starting point, and when do you step up?  
**A:** Start with Claude Opus 5.5 for most demanding work. Step up to Claude Fable 5.1 for the hardest reasoning and long-horizon agentic work when Opus 5.5 still falls short.

**Q:** Which model for high-volume, balanced work?  
**A:** Claude Sonnet 5.5, the best combination of speed and intelligence, with strong quality at a cost and latency that scale.

**Q:** Which model for simple, fast, high-volume tasks?  
**A:** Claude Haiku 4.5, the fastest and lowest-cost current model, for lightweight tasks like classification or language detection.

**Q:** What feature helps Claude reason through multi-step problems?  
**A:** Extended (adaptive) thinking — it lets Claude work through intermediate steps before answering.

**Q:** How do you get accurate answers about events after the training cutoff?  
**A:** Enable web search so Claude can retrieve current information; reasoning alone cannot recover facts it never learned.

**Q:** Your long chat is dragging in irrelevant earlier details. What is the fix?  
**A:** Start a fresh conversation focused on the current topic, carrying over a short summary if needed. Everything earlier is context Claude may draw on, and automatic summarization of long chats keeps that history rather than removing it.

**Q:** Why not run every task on the biggest model?  
**A:** Match the model to the task. Simple, high-volume work runs well on Haiku 4.5 or Sonnet 5.5; Opus 5.5 (or Fable 5.1) is for the hardest reasoning. Oversizing wastes cost and latency.

**Q:** Web search vs. extended thinking vs. research?  
**A:** Web search for quick factual lookups (one or two searches). Extended thinking for deep reasoning that needs no web data. Research for multi-source synthesis across the web and connected apps, returning a cited report over a few minutes.

**Q:** What does Claude memory do, and how is it scoped?  
**A:** It saves short topics from your chats so future chats can build on them. You can view, edit, pause, or reset it in Settings. Each Project has its own separate memory; incognito chats are never added to memory.

**Q:** What are the tabs in the Claude desktop app?  
**A:** Chat, Cowork, and Code. Cowork handles multi-step tasks such as reports, spreadsheets, and presentations delivered as files; on Pro and Max it is merging with chat into one Claude experience.

## Workflow Integration and Solution Design

**Q:** When is the API the right entry point?  
**A:** When Claude must be embedded in your own software and run programmatically with no person in the loop. That build work belongs to Claude Developers and Architects; Associates scope the need and escalate.

**Q:** Which steps are best to delegate to Claude?  
**A:** Well-specified, repeatable, checkable, low-risk steps. Keep ambiguous, high-stakes, accountability-bearing judgment with a human.

**Q:** What decides whether an action can be automated vs. needs human approval?  
**A:** The cost and reversibility of an error. Cheap and reversible can auto-proceed; costly or irreversible needs human review.

**Q:** How do you describe a Claude workflow's value to stakeholders?  
**A:** Honestly — pair the real benefit with the limitations and where humans stay in the loop. Do not overpromise.

**Q:** Moving from 'I use Claude' to 'our workflow uses Claude'?  
**A:** Capture working prompts, context, and configuration in a shared, reusable setup so the whole team gets consistent results.

**Q:** Best first process to automate with Claude?  
**A:** A frequent, well-defined, low-risk task with clear inputs and checkable outputs.

**Q:** Who should hold accountability for a final decision in an AI-assisted workflow?  
**A:** A designated human owner who reviews and approves. A tool cannot be accountable.

**Q:** Your workflow only lives in your head. What is the risk?  
**A:** It is fragile. Document steps, prompts, and config so others can run it when you are away.

## Prompting and Task Execution

**Q:** What are the core elements of a well-structured prompt?  
**A:** Role, a clear task, relevant context, the desired output format, and examples.

**Q:** Instructions keep missing a specific format. What works better?  
**A:** Show two or three worked input-to-output examples (few-shot). Demonstrating the pattern beats describing it.

**Q:** Why change only one thing at a time when iterating?  
**A:** So you can tell which change caused the effect; changing many at once makes the result uninterpretable.

**Q:** Best fix for a vague, off-target answer?  
**A:** Be specific — state the exact scope, format, and success criteria.

**Q:** A complex request returns shallow results. What helps?  
**A:** Decompose it into focused steps; do and check each before it feeds the next.

**Q:** 'Don't be so formal' is not working. Better approach?  
**A:** Positively describe the tone you do want (warm, conversational) with a short example. Say what to do, not just what to avoid.

**Q:** Claude does not know your internal policy. What is essential?  
**A:** Provide the policy text as context; capability cannot substitute for a document it never saw.

**Q:** When are few-shot examples worth adding?  
**A:** When a task has a specific format or edge cases that plain instructions keep getting wrong. For simple tasks Claude already handles, skip them.

## Output Evaluation and Validation

**Q:** Does confident, fluent writing mean the answer is correct?  
**A:** No — Claude can be confidently and articulately wrong. Fluency is not a reliability signal.

**Q:** Claude cites a study or statistic. What must you do before publishing?  
**A:** Independently verify the claim and that the cited source actually says it; citations can be fabricated.

**Q:** A citation looks authoritative but you cannot find the source anywhere. Likely cause?  
**A:** A hallucination — a plausible-looking but nonexistent citation. Treat it as unverified.

**Q:** Which outputs require human verification?  
**A:** High-stakes, factual, legal/medical, or irreversible ones. Validate before you act or put your name on it.

**Q:** A real, working citation URL — is the claim now proven?  
**A:** No — confirm the linked source actually supports the specific claim, not just that the page exists.

**Q:** How much verification does an output need?  
**A:** Scale it with stakes and reversibility. Brainstorming needs little; a tax figure or contract needs independent human review.

**Q:** Claude's resume shortlist skews to one demographic. Response?  
**A:** Treat it as a possible bias signal — examine the criteria and keep human oversight.

**Q:** Who is accountable for Claude's output you send under your name?  
**A:** You are. Validate the facts and reasoning first.

**Q:** Artifact, inline reply, or structured data?  
**A:** Artifact for substantial, self-contained content you will edit, iterate on, or reuse. Inline for quick answers. Structured data (table, CSV, JSON) when the output feeds another tool.

**Q:** Name three prompt techniques that reduce hallucinations.  
**A:** Let Claude say "I don't know"; restrict it to the supplied documents; and ask for direct quotes or citations for each claim, retracting any it cannot support.

**Q:** How do you adapt a draft for a new audience?  
**A:** Say who the audience is and what they need: lead with what matters to them, adjust vocabulary and jargon, and set a length. Then check the facts survived the rewrite.

## Configuration and Knowledge Management

**Q:** What do a Project's custom instructions do?  
**A:** They apply automatically to every chat in the Project — standing rules for tone, format, and behavior.

**Q:** Where should reusable reference documents go in a Project?  
**A:** As knowledge sources. Tone and format rules go in custom instructions.

**Q:** Claude keeps quoting last year's prices. Root-cause fix?  
**A:** Update the Project's knowledge source to current data. Stale config is a top failure cause.

**Q:** Main advantage of Project context over per-prompt context?  
**A:** Every chat in the Project inherits it, raising quality and consistency across all of them.

**Q:** Two unrelated kinds of work — one Project or two?  
**A:** Two. Separate Projects keep each set of instructions and knowledge focused and relevant.

**Q:** How do you keep Project knowledge trustworthy over time?  
**A:** Review and refresh it on a regular cadence; Claude will not update your sources for you.

**Q:** Conflicting policy versions in a Project's knowledge. Fix?  
**A:** Keep only the current authoritative version; remove outdated and draft copies so Claude cites the right one.

**Q:** Why add a Google Doc through the Drive connector instead of uploading a copy?  
**A:** Google Docs added from Drive sync to the latest version, so Project knowledge does not go stale. Claude only sees files the user already has permission to access.

**Q:** Skills vs. Project instructions?  
**A:** Project instructions and knowledge are always loaded for chats in that Project. Skills are folders of instructions and resources that Claude loads only when relevant to a specialized task; they require code execution.

## Governance, Risk, and Responsible Use

**Q:** About to paste a config with a live API key. What do you do?  
**A:** Redact or remove the secret first. Never paste live credentials; asking Claude to 'ignore' it does not undo the exposure.

**Q:** Before using regulated personal data (PII/PHI) in a tool?  
**A:** Follow your data policy and get authorization; minimize or anonymize what you do not need.

**Q:** Most important thing to know before entering sensitive data?  
**A:** Where the data goes, how it may be used or retained, and whether policy permits it.

**Q:** Confidential doc plus an unapproved tool. Right move?  
**A:** Do not. Use only tools approved for that data class; deleting the chat later does not undo the exposure.

**Q:** What is data minimization?  
**A:** Include only the data the task requires, and no more, to reduce exposure of sensitive info.

**Q:** Why does data classification matter before pasting?  
**A:** It sets the handling rules — some classes may not be entered into certain tools at all.

**Q:** Employee uses a personal, unvetted AI account for company data. Concern?  
**A:** Company data flows outside approved controls and agreements — a core governance risk.

**Q:** Before sending Claude output to an external partner?  
**A:** Review it to ensure no confidential or personal internal data was carried into the output.

**Q:** Does an incognito chat make sensitive data safe to paste?  
**A:** No. Incognito chats skip history and memory and are not used for training, but they are still retained for a period (30 days by default). Data policy still applies, and secrets never belong in any chat.

## Troubleshooting and Optimization

**Q:** Answers are generic and could fit any company. Root cause?  
**A:** A context-poor prompt. Add the specific details of your situation.

**Q:** You described the format three times and it is still wrong. Durable fix?  
**A:** Provide a concrete example of the exact output you want.

**Q:** Simple high-volume job is slow/costly on the biggest model. Fix?  
**A:** Switch to a smaller, faster model suited to the task.

**Q:** Same manual correction every day. Durable fix?  
**A:** Encode it once in the Project's custom instructions instead of patching each chat.

**Q:** Answer is confidently out of date on a recent topic. Fix?  
**A:** Enable web search — the gap is the training cutoff, not reasoning.

**Q:** An output regressed after you changed several things at once. Move?  
**A:** Revert and reintroduce changes one at a time to isolate the cause.

**Q:** What is a sound troubleshooting sequence?  
**A:** Diagnose the root cause — ambiguous ask, missing context, wrong model, or wrong entry point — then fix that specific cause durably.

**Q:** You retype the same context in every new chat. Optimization?  
**A:** Move the reusable context into a Project (instructions plus knowledge) or a connector-synced document so every chat starts with it.
