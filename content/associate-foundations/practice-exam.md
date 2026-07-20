# Claude Certified Associate – Foundations — Practice Exam

> **Unofficial, community-authored study material.** Not affiliated with, endorsed by, or produced by Anthropic. Questions are original and written to teach the publicly documented concepts — they are **not** real exam items.

**100 questions** · Real exam format: 120 min · Passing scaled score 720/1000

*This file is generated from `questions.json` by `scripts/build.mjs`. Do not edit by hand.*

---

### Question 1 of 100

*Study area: Entry Points · easy*

A developer wants Claude to read, edit, and run tests across the files of a local Git repository from the terminal. Which entry point is the best fit?

- **A.** claude.ai chat, pasting the repository files in one at a time by hand each time
- **B.** Claude Code, which works directly with your repository in the terminal
- **C.** A Claude Project with the whole repository zipped and attached as a knowledge source
- **D.** The API, with a custom script the developer writes and maintains

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Claude Code is the terminal-based entry point built to read, edit, and run code across a repository directly. It is purpose-built for hands-on local codebase work.

_Why a tempting wrong answer misses:_ A Project knowledge source is read-only reference material; it cannot edit files or run tests, so zipping the repo into a Project does not enable the work described.

Reference: https://code.claude.com/docs/en/overview

</details>

---

### Question 2 of 100

**Scenario: Customer Support Team**
*Study area: Entry Points · easy*

Your team answers customer questions using the same product FAQ, tone guidelines, and policy documents every day, and you want every chat to start with that context without pasting it each time. Which entry point best fits?

- **A.** A brand-new claude.ai chat every time, pasting the FAQ, tone guide, and policy documents in at the start
- **B.** Claude Code, with the FAQ and policy documents kept in a repository
- **C.** A Claude Project with the FAQ and policies as knowledge and the tone in custom instructions
- **D.** The API, embedding all of the documents in every single request

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Projects let you set durable custom instructions and attach knowledge sources, so every chat in the Project inherits that context automatically. That is ideal for a repeated workflow with shared reference material.

_Why a tempting wrong answer misses:_ Re-pasting the documents into a fresh chat each time is exactly the manual repetition Projects eliminate; it is error-prone and easy to forget.

</details>

---

### Question 3 of 100

*Study area: Entry Points · medium*

An engineer needs Claude to classify incoming support tickets automatically inside the company's own application, with no person in the loop. Which entry point is most appropriate?

- **A.** The Claude Developer Platform API, called from the application's code
- **B.** claude.ai chat, with a staff member manually pasting in each incoming ticket
- **C.** A Claude Project shared with the whole support team
- **D.** Claude Code running in one of the individual developers' local terminals

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Programmatic, automated classification inside your own software is what the API is for: the application sends each ticket to Claude and acts on the response with no manual steps.

_Why a tempting wrong answer misses:_ claude.ai chat requires a person to paste each ticket and read each answer, which defeats the goal of automatic, in-app classification.

</details>

---

### Question 4 of 100

*Study area: Entry Points · easy*

A marketer wants to brainstorm ten taglines for a campaign and refine the best few in a quick back-and-forth. There is no code, no repeated workflow, and nothing confidential. Which entry point is the simplest appropriate choice?

- **A.** The API, driven by a short Python script
- **B.** Claude Code, used from the terminal
- **C.** A dedicated Claude Project with knowledge sources
- **D.** A claude.ai chat conversation

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

For a quick, one-off, conversational task with no code or reusable context, a plain claude.ai chat is the simplest fit; no extra setup is warranted.

_Why a tempting wrong answer misses:_ Creating a Project with knowledge sources is unnecessary overhead for a single throwaway brainstorm that will not be repeated.

</details>

---

### Question 5 of 100

*Study area: Model Selection · easy*

You need Claude to work through a complex, multi-step financial analysis that requires careful reasoning, and where subtle mistakes are costly. Speed and cost are secondary. Which model is the best default?

- **A.** Claude Haiku 4.5, for the fastest possible response
- **B.** Claude Opus 4.8, for the strongest reasoning
- **C.** Whichever model happens to be cheapest that day
- **D.** Claude Sonnet 5, chosen mainly to minimize latency

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Opus 4.8 is the most capable model for the hardest, multi-step reasoning. When accuracy on a complex task outweighs speed and cost, it is the right default.

_Why a tempting wrong answer misses:_ Haiku 4.5 is optimized for speed and simple tasks; using it for costly, subtle multi-step reasoning trades away the capability the task demands.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

### Question 6 of 100

*Study area: Model Selection · medium*

A product feature will summarize thousands of documents per day. Each summary is moderately complex, and you need a strong balance of quality, speed, and cost at scale. Which model is the most appropriate default?

- **A.** Claude Opus 4.8 for every request, regardless of the cost
- **B.** Claude Haiku 4.5, accepting weaker quality on harder documents
- **C.** Claude Sonnet 5, balancing quality and cost at volume
- **D.** A model chosen at random per request

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Sonnet 5 is designed for the balanced, high-volume middle ground: strong quality at a cost and speed that scale to thousands of requests. It fits moderately complex work at volume.

_Why a tempting wrong answer misses:_ Running Opus 4.8 on every request maximizes quality, but its cost and latency are hard to justify across thousands of moderately complex summaries per day.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

### Question 7 of 100

*Study area: Model Selection · easy*

You need to detect whether each incoming message is written in English or Spanish: a simple, high-volume, latency-sensitive classification. Which model is the best fit?

- **A.** Claude Haiku 4.5, the fastest and most economical option
- **B.** Claude Opus 4.8, reached for just to be extra safe on accuracy
- **C.** Whichever model happens to have the largest available context window
- **D.** A separate Opus call per language, then compared side by side

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Haiku 4.5 is built for simple, fast, high-volume tasks like language detection, delivering low latency and low cost where heavier reasoning is not needed.

_Why a tempting wrong answer misses:_ Reaching for Opus 4.8 "to be safe" on a trivial classification wastes cost and latency without meaningfully improving a task Haiku handles well.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

### Question 8 of 100

*Study area: Features · medium*

A logic puzzle keeps tripping Claude up because it involves several dependent reasoning steps. Which built-in capability is most directly aimed at improving multi-step reasoning like this?

- **A.** Web search, to look the puzzle's answer up on the open internet
- **B.** Extended (adaptive) thinking, which lets Claude reason through steps before answering
- **C.** File uploads, to attach the puzzle to the chat as a PDF document
- **D.** Artifacts, to render the finished answer neatly in its own dedicated side panel for later review

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Extended (adaptive) thinking gives Claude room to reason through intermediate steps before committing to an answer, which directly helps on multi-step problems.

_Why a tempting wrong answer misses:_ Artifacts only change how output is displayed in a side panel; they do nothing to improve the underlying reasoning on a multi-step problem.

</details>

---

### Question 9 of 100

*Study area: Features · easy*

You ask Claude about a regulation that changed last week, after the model's training cutoff. Which feature should you enable to get an accurate, current answer?

- **A.** Extended thinking, so Claude can reason harder about the new regulation
- **B.** Artifacts, used to format the final answer nicely in a side panel
- **C.** Web search, so Claude can retrieve up-to-date information
- **D.** A larger maximum output length setting

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Web search lets Claude retrieve current information from the internet, which is essential for facts that changed after its training cutoff. Reasoning alone cannot recover knowledge the model never had.

_Why a tempting wrong answer misses:_ Extended thinking helps Claude reason about what it already knows; it cannot conjure facts about an event that postdates its training data.

</details>

---

### Question 10 of 100

*Study area: Features · medium*

You are drafting a policy document with Claude and want to see it in a dedicated panel, edit it across turns, and keep a stable version as you refine it. Which feature is designed for this?

- **A.** Artifacts, a side panel for substantial, editable content
- **B.** Web search, used to gather outside sources for the document
- **C.** Extended thinking, to plan out the document's structure first
- **D.** Token counting, to measure the document's overall size

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Artifacts render substantial, self-contained content (like a document or code) in a dedicated, editable side panel you can iterate on across turns, which is exactly this use case.

_Why a tempting wrong answer misses:_ Web search retrieves information; it has nothing to do with displaying and iterating on a document you are co-writing.

</details>

---

### Question 11 of 100

*Study area: Features · easy*

A colleague sends you a 40-page PDF contract and asks for a plain-language summary of its key obligations. In claude.ai, what is the most direct way to have Claude work from the actual document?

- **A.** Retype the whole contract into the chat box by hand
- **B.** Upload the PDF file directly to the conversation
- **C.** Describe the contract from memory and let Claude fill the gaps
- **D.** Ask Claude to search the web to find the contract

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

claude.ai supports file uploads, including PDFs, so Claude can read the actual document and summarize it accurately rather than working from a paraphrase.

_Why a tempting wrong answer misses:_ Describing the contract from memory strips out the exact terms Claude needs and invites an inaccurate summary of a document Claude never actually saw.

</details>

---

### Question 12 of 100

*Study area: Context Management · medium*

After a long chat that drifted across several unrelated topics, Claude's answers start pulling in irrelevant details from earlier in the conversation. What is the best way to manage this?

- **A.** Keep going and just hope the accumulated noise clears on its own
- **B.** Repeat your latest question in all capital letters
- **C.** Start a new conversation focused only on the current topic
- **D.** Switch to a smaller and faster model midway through the long chat

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Everything earlier in a conversation is context Claude may draw on. When accumulated, unrelated history starts to interfere, a fresh conversation gives Claude a clean, focused context.

_Why a tempting wrong answer misses:_ Switching to a smaller model does not remove the irrelevant conversation history that is actually causing the interference.

</details>

---

### Question 13 of 100

*Study area: Context Management · medium*

You want Claude to answer a specific question about one section of a large report. Which approach gives Claude the most useful context to work with?

- **A.** Paste the entire multi-hundred-page report and ask the question at the very end
- **B.** Provide the relevant section (or a focused excerpt) and state the specific question
- **C.** Ask the question with no context and let Claude infer the report
- **D.** Send the question first, then the report separately hours later

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Giving Claude the relevant section plus a clear, specific question focuses its attention on what matters. Focused, on-point context generally produces better answers than dumping everything or nothing.

_Why a tempting wrong answer misses:_ Dumping hundreds of irrelevant pages buries the pertinent section and can dilute Claude's attention, making a precise answer harder rather than easier.

</details>

---

### Question 14 of 100

*Study area: Entry Points · medium*

You find yourself pasting the same brand style guide into a new chat several times a week to keep Claude's writing on-brand. What is the better long-term setup?

- **A.** Keep pasting the brand style guide into each new chat, since it only takes a minute
- **B.** Memorize the style guide so you can paraphrase it more quickly
- **C.** Create a Project with the style guide as knowledge and the brand voice in custom instructions
- **D.** Email the style guide to Claude and ask it to remember for you

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

When the same reference is reused repeatedly, moving it into a Project (knowledge source plus custom instructions) means every chat inherits it automatically: durable, consistent, and no re-pasting.

_Why a tempting wrong answer misses:_ Continuing to paste the guide every time is the manual, error-prone repetition that a Project is designed to eliminate.

</details>

---

### Question 15 of 100

*Study area: Model Selection · medium*

A teammate runs every task, even trivial reformatting, on the largest, most expensive model "to be safe." What is the most sensible guidance?

- **A.** Always default to the largest model, since its extra reasoning capability is never actually wasted
- **B.** Match the model to the task, using a smaller model for simple work and the largest for hard reasoning
- **C.** Always default to the smallest available model to keep the per-task cost as low as possible
- **D.** Rotate between the models at random each time so usage is spread evenly across them

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Model selection is about fit: simple, high-volume tasks run well on Haiku or Sonnet, while Opus is reserved for the hardest reasoning. Matching model to task controls cost and latency without sacrificing needed quality.

_Why a tempting wrong answer misses:_ "Always use the largest model" pays premium cost and latency for trivial work that a smaller model handles just as correctly.

Reference: https://platform.claude.com/docs/en/about-claude/models/overview

</details>

---

### Question 16 of 100

*Study area: Prompt Structure · easy*

You want Claude to review a draft email the way an experienced communications editor would. Which addition to your prompt most directly sets that up?

- **A.** Assign a clear role, like "act as an experienced communications editor," and say what to review
- **B.** Simply ask it to "be helpful and thorough" and see what comes back
- **C.** Paste the draft email in with no other instructions and simply let Claude decide what to do
- **D.** Ask for the longest, most detailed response it can produce

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Giving Claude a specific role plus a clear task focuses its behavior and standards on the job; an editor's lens produces more targeted feedback than a vague request.

_Why a tempting wrong answer misses:_ "Be helpful and thorough" is too vague to steer the review; it gives Claude no concrete role, criteria, or focus to apply.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview

</details>

---

### Question 17 of 100

*Study area: Output Format · easy*

Claude keeps returning its answer as flowing paragraphs, but you need a table with three named columns to drop into a report. What is the most effective fix?

- **A.** Ask the exact same question over again and simply hope that it comes back formatted as a table
- **B.** Switch to a larger, more capable model and try once more
- **C.** Tell Claude to "make it look a bit nicer" for the report
- **D.** Explicitly specify the output format: a table with the three exact column names you need

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Stating the desired output format precisely, a table with named columns, tells Claude exactly how to structure the response. Being explicit about format is the reliable way to get it.

_Why a tempting wrong answer misses:_ "Make it look nicer" is subjective and unspecified; Claude cannot reliably infer that you want a three-column table from it.

</details>

---

### Question 18 of 100

*Study area: Providing Context · easy*

You ask Claude to "write a follow-up message to the client," but its draft misses that the client is upset about a missed deadline. What would most improve the result?

- **A.** Ask Claude to work a general, non-specific apology in somewhere near the opening of the message
- **B.** Repeat the exact same request again, word for word
- **C.** Provide the context: the client's complaint, the missed deadline, and the outcome you want
- **D.** Ask Claude to make the message shorter and more direct

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Claude can only account for facts it is given. Supplying the situation, the client's concern, and your goal lets Claude write a genuinely responsive message instead of a generic one.

_Why a tempting wrong answer misses:_ Repeating the identical request gives Claude no new information, so the draft will keep missing the context it never received.

</details>

---

### Question 19 of 100

**Scenario: Quarterly Reporting**
*Study area: Task Decomposition · medium*

You need Claude to (1) analyze survey data, (2) draft an executive summary, and (3) create a slide outline. A single prompt asking for all three at once yields shallow results on each. What is the better approach?

- **A.** Demand noticeably more detail and depth while still keeping it all in the same all-in-one prompt
- **B.** Break the work into sequential steps, doing and reviewing each before moving to the next
- **C.** Ask for all three again, but this time request a larger font
- **D.** Drop two of the three tasks to simplify the request

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Decomposing a complex, multi-part request into focused steps lets Claude give each its full attention, and lets you check the output of one step before it feeds the next.

_Why a tempting wrong answer misses:_ Cramming more instructions into the same overloaded prompt keeps Claude splitting attention across three tasks at once, which is why each came out shallow.

</details>

---

### Question 20 of 100

*Study area: Diagnostic Iteration · medium*

An output is not quite right, so in one new attempt you rewrite the role, add three examples, change the format, and swap models all at once. It improves, but you have a problem. What is it?

- **A.** Nothing at all is wrong here; changing everything at once is simply the fastest path to a fix
- **B.** You should have changed even more variables at the same time
- **C.** The model is now permanently biased by your earlier attempt
- **D.** You changed too many variables at once, so you cannot tell which change actually helped

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Diagnostic iteration means changing one variable at a time and observing the effect. Altering many things simultaneously makes the improvement uninterpretable and hard to reproduce.

_Why a tempting wrong answer misses:_ Changing even more at once compounds the problem: you would have zero ability to attribute the result to any specific change.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview

</details>

---

### Question 21 of 100

*Study area: Being Specific · easy*

Your prompts often produce vague, off-target answers. Which single change tends to help the most?

- **A.** Making the prompt longer by padding it out with polite filler around the actual request
- **B.** Asking Claude to simply "be thorough" and then leaving all of the rest to it
- **C.** Being specific about what you want: the exact scope, format, and criteria
- **D.** Sending the identical request several more times in a row

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Specificity is the highest-leverage prompting habit: stating the exact scope, format, and success criteria removes the guesswork that produces vague answers.

_Why a tempting wrong answer misses:_ Telling Claude to "be thorough" adds no concrete direction; it does not tell Claude what to cover or how to shape the answer.

</details>

---

### Question 22 of 100

*Study area: Few-Shot Examples · medium*

You need every product description formatted in a very specific pattern, and written instructions keep producing near-misses. What most reliably locks in the exact format?

- **A.** Provide two or three worked examples of the input and the exact output you want (few-shot)
- **B.** Add the word "exactly" to the instruction and then repeat it
- **C.** Ask Claude to try harder and be more careful next time
- **D.** Make the written instruction paragraph a good deal longer and pack in considerably more detail

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

When a format is hard to convey in words, showing two or three concrete input-to-output examples (few-shot) demonstrates the pattern directly and is more reliable than more prose.

_Why a tempting wrong answer misses:_ Adding emphasis words like "exactly" does not clarify an ambiguous format; Claude still has to guess the pattern you never actually showed it.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview

</details>

---

### Question 23 of 100

*Study area: Examples vs Instructions · medium*

Claude keeps misinterpreting how you want a data field transformed, even after you reworded the instruction twice. What is the most effective next move?

- **A.** Reword the very same instruction a third time and simply hope that it finally lands
- **B.** Tell Claude that it is plainly wrong and then firmly ask it to correct the field
- **C.** Switch the output to all capital letters for emphasis
- **D.** Show a concrete before-and-after example of the transformation you want

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

When instructions keep being misread, a concrete input-to-output example removes the ambiguity by demonstrating the exact transformation, which is often clearer than any wording.

_Why a tempting wrong answer misses:_ Rewording the instruction a third time is more of the same approach that already failed twice; a demonstration communicates what words could not.

</details>

---

### Question 24 of 100

*Study area: Prompt Structure · medium*

A colleague's prompts are just a one-line task with no other detail, and results are inconsistent. Which set of additions best reflects good prompt structure?

- **A.** Much louder wording, plenty of capital letters, and a lot more exclamation points for emphasis
- **B.** A clear role, the task, relevant context, the desired output format, and an example or two
- **C.** A higher maximum-token setting and a request for the longest answer
- **D.** Several unrelated questions bundled together into one message

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Well-structured prompts typically combine role, a clear task, relevant context, an explicit output format, and examples. Together these remove ambiguity and steer Claude toward the intended result.

_Why a tempting wrong answer misses:_ Bundling several unrelated questions together fragments Claude's focus and makes the prompt harder to answer well, not easier.

</details>

---

### Question 25 of 100

*Study area: Positive Instructions · medium*

You keep telling Claude "don't be so formal," but the tone still misses. Which instruction is likely to work better?

- **A.** Describe the tone you do want, warm and conversational like advice to a colleague, with a short example
- **B.** Repeat the instruction to "never, ever use any formal words at all" to Claude much more emphatically
- **C.** Tell Claude firmly to "stop being so formal" and leave it there
- **D.** Ask Claude to simply "be less of everything" from now on

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Positively describing the target, the tone you do want with an example, gives Claude something concrete to aim at, which steers behavior better than a vague prohibition.

_Why a tempting wrong answer misses:_ "Stop being formal" says what to avoid but not what to do instead, leaving Claude to guess at the tone you actually want.

</details>

---

### Question 26 of 100

*Study area: Providing Context · easy*

You want Claude to answer questions using your company's internal policy, which it was never trained on. What is the essential step?

- **A.** Simply assume that Claude already has your company's private internal policy memorized in full
- **B.** Ask Claude to imagine what the internal policy probably says
- **C.** Switch to a bigger model so that it "knows more" about it
- **D.** Provide the policy text as context (paste it or attach it) so Claude answers from it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Claude has no knowledge of your private, internal documents unless you supply them. Giving it the actual policy text as context is what lets it answer accurately from your source.

_Why a tempting wrong answer misses:_ A bigger model has more general capability but still has never seen your internal policy; capability cannot substitute for the missing document.

</details>

---

### Question 27 of 100

*Study area: Being Specific · medium*

A teammate asks Claude to "make this report better" and is frustrated by the results. What advice best addresses the root problem?

- **A.** Ask Claude to define what "better" should mean for you
- **B.** Run the same request on every model and compare the results
- **C.** Tell Claude what "better" means here: clearer structure, shorter, more data-driven, and so on
- **D.** Simply accept that Claude cannot ever meaningfully improve written business reports

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

"Better" is subjective; Claude cannot read your mind about which dimension you care about. Naming the specific improvements you want turns an ambiguous ask into an actionable one.

_Why a tempting wrong answer misses:_ Asking Claude to define "better" just outsources your own criteria; it may optimize for a dimension you did not actually care about.

</details>

---

### Question 28 of 100

*Study area: Few-Shot Examples · hard*

For a straightforward task like "summarize this paragraph in one sentence," Claude already does exactly what you want. When is adding few-shot examples actually worth the effort?

- **A.** Always add several worked examples to every single prompt you write, no matter how simple the task is
- **B.** Never add examples, since they only end up confusing the model
- **C.** When the task has a specific format or edge cases that plain instructions keep getting wrong
- **D.** Only when you happen to be using the smallest available model

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Few-shot examples pay off when a task has a particular format or tricky edge cases that instructions alone do not nail. For simple tasks Claude already handles, the extra examples add little.

_Why a tempting wrong answer misses:_ Adding examples to every prompt regardless of need is wasted effort and token cost when a plain instruction already yields exactly what you want.

</details>

---

### Question 29 of 100

*Study area: Diagnostic Iteration · medium*

Your first prompt gives a decent but too-technical answer for a general audience. What is the most efficient single adjustment to try next?

- **A.** Completely rewrite the whole prompt from scratch, making many different changes all at once
- **B.** Switch entry points from claude.ai chat over to the API
- **C.** Ask the very same prompt three or four more times
- **D.** Add one instruction specifying the audience and reading level, then compare the result

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Making one targeted change, specifying the audience, and observing the effect is efficient diagnostic iteration: you learn exactly whether that lever fixed the issue.

_Why a tempting wrong answer misses:_ Rewriting everything at once may fix it, but you lose the ability to tell which change mattered, making the next iteration harder.

Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview

</details>

---

### Question 30 of 100

*Study area: Prompt Structure · medium*

A prompt reads simply "Write a job description," and the drafts come back generic and unusable. Which elements are most important to add?

- **A.** The role, the responsibilities, the required skills, the sections to include, and the tone
- **B.** A far more emphatic tone, plenty of bold text, and several extra exclamation points for energy
- **C.** A request for the maximum possible length and lots of extra detail
- **D.** A firm demand that Claude not make any mistakes this time

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A generic draft is usually a symptom of a generic prompt. Supplying the specific role, responsibilities, required skills, structure, and tone gives Claude the substance to produce something usable.

_Why a tempting wrong answer misses:_ Demanding that Claude "not make mistakes" provides none of the concrete details, role, skills, or structure, that the draft is actually missing.

</details>

---

### Question 31 of 100

*Study area: Verifying Citations · medium*

Claude's answer includes three specific statistics attributed to named studies. Before you use them in a published report, what should you do?

- **A.** Independently verify each statistic, and that the cited studies actually say it
- **B.** Trust the statistics, since Claude took care to cite specific, named studies for each one
- **C.** Publish the report first and then correct it later on if anyone happens to complain
- **D.** Assume any confidently stated number in the answer is reliable

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Claude can produce fluent, specific-looking citations that are inaccurate or fabricated. For anything you publish, verify each factual claim and citation against the primary source before relying on it.

_Why a tempting wrong answer misses:_ A confident, specific citation is not evidence of accuracy; Claude can state a fabricated source just as fluently as a real one, so trusting it unverified is risky.

</details>

---

### Question 32 of 100

*Study area: Confident but Wrong · easy*

An answer is written with total confidence and reads smoothly, with no hedging. What can you conclude about its accuracy?

- **A.** Confident, fluent, and polished writing means the answer is almost certainly correct
- **B.** Fluency and confidence say nothing about accuracy; it can be confidently wrong
- **C.** The complete lack of any hedging in it proves that it was carefully fact-checked
- **D.** Smooth, polished writing indicates the model used web search

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The tone and fluency of an answer are independent of its correctness. Claude can be confidently and articulately wrong, so confidence is not a reliability signal.

_Why a tempting wrong answer misses:_ Absence of hedging is a stylistic feature, not a fact-check; it does not mean the claims were verified against any source.

</details>

---

### Question 33 of 100

*Study area: Hallucinations · medium*

You ask Claude for case law supporting an argument, and it returns a citation with a court, year, and quote that looks authoritative, but you cannot find the case anywhere. What is the most likely explanation?

- **A.** The case is genuinely real but simply far too obscure to appear anywhere at all
- **B.** Your own search skills are the problem; the citation is surely valid
- **C.** Claude may have hallucinated a plausible-looking but nonexistent citation
- **D.** The court itself must have quietly pulled the case from every public record somewhere

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Models can generate citations that look authoritative but do not exist, a hallucination. If a specific, checkable source cannot be found, treat it as unverified rather than assuming it is merely obscure.

_Why a tempting wrong answer misses:_ Assuming the citation must be valid and blaming your search ignores a well-known failure mode: confidently formatted citations that were never real.

</details>

---

### Question 34 of 100

**Scenario: Clinical Guidance**
*Study area: Human Verification · medium*

Claude drafts what looks like sound guidance on adjusting a patient's medication dosage. What is the responsible way to use this output?

- **A.** Follow the dosing guidance directly, since the underlying clinical reasoning looks detailed
- **B.** Share it with the patient right away as a definitive answer
- **C.** Use it only if it happens to agree with your initial hunch
- **D.** Treat it as a draft to be reviewed and approved by a qualified medical professional

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Medical dosing is high-stakes and potentially irreversible, so it requires human expert verification. Claude's output should be treated as a draft for a qualified professional to review, never a final clinical decision.

_Why a tempting wrong answer misses:_ Following detailed-looking reasoning directly skips the professional judgment that high-stakes medical decisions require; detail is not the same as clinical validation.

</details>

---

### Question 35 of 100

*Study area: Irreversible Actions · easy*

Claude generates a database command that will permanently delete every record matching a filter. What should you do before running it?

- **A.** Review and verify exactly what it will delete before executing an irreversible action
- **B.** Run it immediately to save yourself some time
- **C.** Run the command against the live production database first, then check it after
- **D.** Assume it is perfectly safe simply because Claude wrote it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Irreversible actions demand human verification first. Reviewing precisely what the command affects before executing catches mistakes while they are still reversible.

_Why a tempting wrong answer misses:_ Assuming the command is safe because Claude produced it skips the check that matters most, exactly when the consequences cannot be undone.

</details>

---

### Question 36 of 100

*Study area: Bias · medium*

You use Claude to screen resumes and notice its shortlist skews heavily toward one demographic. What is the appropriate response?

- **A.** Trust the ranked shortlist completely, since the model is objective and neutral by design
- **B.** Treat it as a possible bias signal, examine the criteria, and add human review
- **C.** Assume the applicant pool itself simply looked that way
- **D.** Remove the human reviewers from the process to speed it up

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

AI outputs can reflect and amplify bias. A skewed result is a signal to scrutinize the criteria and keep human oversight, especially for consequential decisions about people.

_Why a tempting wrong answer misses:_ Treating the model as inherently objective ignores that it can reproduce bias; a skewed shortlist warrants investigation, not blind trust.

</details>

---

### Question 37 of 100

*Study area: Verifying Against Source · medium*

Claude summarizes a long report and includes a striking claim you do not remember reading. Before quoting that claim, what is the right step?

- **A.** Quote the striking claim directly, since summaries are reliable by their very nature
- **B.** Rephrase the striking claim so that it ends up sounding a good deal less striking
- **C.** Check the claim against the source document to confirm it is actually there
- **D.** Delete the entire summary, just to be on the safe side

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Summaries can introduce claims that are not in the source. Verifying a surprising claim against the original document guards against repeating something Claude inferred or fabricated.

_Why a tempting wrong answer misses:_ Rephrasing a claim to sound less striking does nothing to establish whether it is actually supported by the source.

</details>

---

### Question 38 of 100

*Study area: Scaling Verification · medium*

For which task is it most reasonable to accept Claude's output with only a light check?

- **A.** Calculating the exact correct dosage for a patient's prescription
- **B.** Drafting the binding wording of a legal contract for signature
- **C.** Confirming a specific historical date for a soon-to-be-published article
- **D.** Brainstorming a list of possible names for an internal project

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Verification effort should scale with stakes. A low-stakes, easily reversible, non-factual task like brainstorming internal names carries little risk if a suggestion is imperfect.

_Why a tempting wrong answer misses:_ A binding legal contract is high-stakes and hard to reverse; its wording needs careful human review, not a light check.

</details>

---

### Question 39 of 100

*Study area: Accountability · easy*

You are about to send a client-facing analysis that Claude largely wrote, under your own name. What is the guiding principle?

- **A.** You are accountable for it, so validate the facts and reasoning before it goes out
- **B.** Claude actually wrote the analysis, so any errors it contains are not your responsibility
- **C.** Client-facing work really needs no more care than internal notes
- **D.** Send it now, since clients generally expect the occasional error

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

When you put your name on Claude's output, you own its accuracy. Validating the facts and reasoning before it goes out is the core responsibility of using AI in real work.

_Why a tempting wrong answer misses:_ Disclaiming responsibility because "Claude wrote it" does not hold up; the person who sends the work is accountable for it.

</details>

---

### Question 40 of 100

*Study area: Fabricated Precision · medium*

Asked for market-size figures, Claude returns very precise numbers such as "$4.37B in 2023" with no source. How should you treat them?

- **A.** Use the figures exactly as-is, since their very precision signals that they are reliable
- **B.** Treat them as unverified estimates and confirm against a real source before using
- **C.** Round the numbers off, which is what makes them accurate
- **D.** Assume that Claude just now retrieved them from a live and up-to-date market database

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Oddly precise figures with no source are a classic hallucination pattern. Precision is not provenance; confirm the numbers against an authoritative source before relying on them.

_Why a tempting wrong answer misses:_ Precision does not signal reliability; a fabricated figure can be stated to the cent just as easily as a rounded one.

</details>

---

### Question 41 of 100

*Study area: Checking Accuracy · medium*

A quick way to gauge whether a long Claude answer is trustworthy on a topic you do not know well is to:

- **A.** Count up how many separate sources the long answer happens to mention in total
- **B.** See whether the entire answer sounds confident all the way through to the end
- **C.** Spot-check a few claims you can verify against known facts or sources
- **D.** Measure how long the overall response happened to turn out to be in total

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Spot-checking verifiable claims gives real evidence about accuracy. If the checkable parts are wrong, that is a strong signal to distrust the parts you cannot immediately verify.

_Why a tempting wrong answer misses:_ The number of sources mentioned says nothing about whether those sources are real or support the claims; it is easy to list citations that do not check out.

</details>

---

### Question 42 of 100

**Scenario: Vendor Contract Review**
*Study area: Human Verification · medium*

Claude reviews a vendor contract and flags no issues, and your company is about to sign. What is the responsible next step?

- **A.** Sign the contract right away, since Claude reviewed it and flagged nothing at all
- **B.** Skip the legal review entirely to save both time and money
- **C.** Assume that no flags raised must simply mean there is no real legal risk
- **D.** Have a qualified lawyer review it before signing a binding agreement

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A binding contract is high-stakes and hard to reverse. Claude's review can assist, but a qualified legal professional must verify before you commit; "no flags" is not legal clearance.

_Why a tempting wrong answer misses:_ Treating "Claude found nothing" as proof of no legal risk over-trusts a tool that can miss issues and is not a substitute for professional legal judgment.

</details>

---

### Question 43 of 100

*Study area: Over-Trust · hard*

A team has used Claude for months with good results and now approves its outputs without any review. What is the main risk?

- **A.** Errors will slip through unnoticed precisely because no one is checking anymore
- **B.** The model will eventually run out of processing capacity
- **C.** Reviewing the outputs was clearly never really necessary here in the first place anyway
- **D.** Claude will eventually refuse to answer anything at all without a reviewer present

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A good track record does not make outputs infallible. Dropping verification entirely means the inevitable errors reach production with nothing to catch them; appropriate review should remain.

_Why a tempting wrong answer misses:_ Concluding review was never necessary misreads past success; the good results likely depended in part on the very checking now being removed.

</details>

---

### Question 44 of 100

*Study area: Verifying Citations · hard*

Claude provides a real, working URL as a citation for a claim. What still needs checking?

- **A.** Nothing further; a working link on its own fully validates the claim
- **B.** That the linked source actually says what the claim attributes to it
- **C.** Only that the link happens to load reasonably quickly in a browser
- **D.** Only the linked website's overall visual design and layout

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

A valid link is necessary but not sufficient. Claude may cite a real page that does not actually support the specific claim, so you must confirm the source says what is attributed to it.

_Why a tempting wrong answer misses:_ A link merely loading proves the page exists, not that its content backs the claim it was attached to.

</details>

---

### Question 45 of 100

*Study area: Scaling Verification · easy*

Which output most clearly demands independent human verification before you act on it?

- **A.** A short, lighthearted haiku that Claude drafted for a close friend's birthday card
- **B.** A list of icebreaker questions for a casual team meeting
- **C.** A suggested color palette for an internal slide deck
- **D.** A tax-filing figure Claude calculated that you will submit to the authorities

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Verification scales with stakes and reversibility. A tax figure you will formally submit is high-stakes, factual, and consequential if wrong, so it demands independent verification, unlike creative, low-risk outputs.

_Why a tempting wrong answer misses:_ A haiku for a birthday card is low-stakes and subjective; an error carries no real consequence, so it does not require the same scrutiny.

</details>

---

### Question 46 of 100

**Scenario: Monthly Reporting**
*Study area: Delegation Boundaries · medium*

You are deciding which parts of a monthly reporting process to hand to Claude. Which step is the best candidate to delegate?

- **A.** Reformatting the raw numbers into the standard report template, a repeatable and checkable step
- **B.** Deciding whether to lay off part of the team based on the numbers
- **C.** Choosing the company's confidential, high-level strategic priorities for the entire year
- **D.** Signing off on the final figures that will go to the board

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The best tasks to delegate are well-specified, repeatable, and easy to verify. Reformatting numbers into a template fits all three; the judgment-heavy, accountability-bearing steps stay with a human.

_Why a tempting wrong answer misses:_ Deciding whether to lay off a team is a high-stakes judgment call with human accountability, exactly the kind of step to keep with a person.

</details>

---

### Question 47 of 100

*Study area: Human Judgment · easy*

Which task should stay with a human rather than being fully delegated to Claude?

- **A.** Converting a plain bulleted list into a neatly formatted table
- **B.** Making the final call on a sensitive personnel decision
- **C.** Drafting an initial first version of routine meeting notes
- **D.** Suggesting a few alternative synonyms for a marketing headline

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Ambiguous, high-stakes decisions that carry human accountability, like sensitive personnel calls, should remain human judgments. Claude can inform them but should not own them.

_Why a tempting wrong answer misses:_ Converting a list to a table is a mechanical, low-risk transformation that is a fine fit for delegation, unlike a consequential personnel decision.

</details>

---

### Question 48 of 100

*Study area: Communicating Limits · medium*

You are presenting a new Claude-assisted workflow to leadership. How should you describe its capabilities?

- **A.** Promise leadership that it is fully autonomous and completely error-free, to build their confidence
- **B.** Avoid mentioning any of its limitations so that the project gets approved
- **C.** Present both the value and the limitations honestly, including where human review is still required
- **D.** Claim it will replace the entire team almost immediately

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Responsible adoption depends on setting accurate expectations. Communicating both the value and the limitations, including where humans stay in the loop, builds durable trust and prevents overreliance.

_Why a tempting wrong answer misses:_ Promising an error-free, fully autonomous system oversells the tool and sets up the project to lose credibility the first time it makes a mistake.

</details>

---

### Question 49 of 100

**Scenario: Team Enablement**
*Study area: Team Adoption · medium*

You personally get great results from Claude, but your teammates get inconsistent ones on the same tasks. What best moves the team from "I use Claude" to "our workflow uses Claude"?

- **A.** Keep all of your best prompting techniques to yourself and quietly hold them as a personal edge
- **B.** Tell your teammates that they simply need to try harder
- **C.** Let everyone on the team figure it out on their own
- **D.** Capture the working prompts, context, and configuration in a shared setup others can reuse

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Scaling from individual to team use means turning personal know-how into shared, reusable assets: documented prompts, shared Project instructions, and knowledge, so everyone gets consistent results.

_Why a tempting wrong answer misses:_ Leaving each teammate to figure it out independently reproduces the very inconsistency you are trying to solve; the knowledge stays trapped with one person.

</details>

---

### Question 50 of 100

*Study area: First Candidates · medium*

A team wants a first win with Claude. Which process is the best starting candidate?

- **A.** A frequent, well-defined, low-risk task with clear inputs and checkable outputs
- **B.** The single most ambiguous and highest-stakes decision that the whole team currently faces
- **C.** A rare, one-off kind of task that the team will essentially never have to repeat again
- **D.** A tangled process that nobody on the team currently understands

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Good first candidates are frequent, well-defined, and low-risk with verifiable outputs: they deliver clear value, are easy to validate, and build confidence before tackling harder work.

_Why a tempting wrong answer misses:_ Starting with the most ambiguous, high-stakes decision maximizes risk and the chance of a visible failure, undermining early adoption.

</details>

---

### Question 51 of 100

*Study area: Communicating Value · medium*

How should you frame the value of a Claude-assisted drafting workflow to stakeholders?

- **A.** "It completely removes any need to keep human writers anywhere on the team at all, ever again."
- **B.** "It produces solid first drafts fast, which we then review and refine to keep quality high."
- **C.** "It is essentially perfect, and its drafts never need any editing."
- **D.** "It will do everything the team does now, only instantly and free."

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Honest value framing pairs the real benefit (faster first drafts, less turnaround) with the human role that preserves quality. It is credible and sustainable, unlike overclaiming.

_Why a tempting wrong answer misses:_ Claiming the output is perfect and never needs editing sets an expectation the tool cannot meet and erodes trust at the first necessary edit.

</details>

---

### Question 52 of 100

*Study area: Accountability · easy*

In a Claude-assisted approval workflow, who should hold accountability for the final decision?

- **A.** The model itself, since it produced the underlying recommendation
- **B.** No one in particular, just as long as the workflow keeps working
- **C.** A designated human owner who reviews and approves the outcome
- **D.** Whichever teammate happens to be the least busy on that given day

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Accountability must rest with a person. A designated human owner who reviews and approves keeps responsibility clear and ensures a competent check on consequential outcomes.

_Why a tempting wrong answer misses:_ Assigning accountability to the model is a category error; a tool cannot be answerable for a decision, so a named human must own it.

</details>

---

### Question 53 of 100

**Scenario: Hiring Pipeline**
*Study area: Mixed Workflows · hard*

A hiring workflow has four steps: (1) format incoming resumes, (2) draft interview questions, (3) decide who advances, and (4) send templated scheduling emails. Which split is most appropriate?

- **A.** Delegate all four of the steps entirely to Claude with no human review
- **B.** Keep all four steps fully manual and do not use Claude for any of them
- **C.** Delegate only the who-advances hiring decision to Claude and do all the rest by hand
- **D.** Delegate formatting, drafting, and templated emails; keep the advancement decision human

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Delegate the well-specified, low-judgment steps (formatting, drafting, templated sends) and reserve the consequential, accountability-bearing decision, who advances, for a human.

_Why a tempting wrong answer misses:_ Delegating the hiring decision itself hands a high-stakes judgment about people to a tool, which is exactly the step that should stay human.

</details>

---

### Question 54 of 100

*Study area: Durability · medium*

Your Claude-assisted workflow works well, but only you know how to run it. What most improves its long-term resilience?

- **A.** Documenting the steps, prompts, and configuration so others can run it if you are away
- **B.** Keep the whole workflow entirely in your own head so that you stay indispensable to the team
- **C.** Delete all of your notes about it once the workflow finally works
- **D.** Rebuild the entire workflow again from scratch every single month

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A workflow that lives only in one person's head is fragile. Documenting the steps, prompts, and configuration lets the team operate it reliably even when the original author is unavailable.

_Why a tempting wrong answer misses:_ Keeping it all in your head makes you a single point of failure; the workflow breaks the moment you are unavailable.

</details>

---

### Question 55 of 100

*Study area: Managing Expectations · medium*

A stakeholder expects the new Claude workflow to be "100% accurate with no oversight." What is the best response?

- **A.** Simply agree with the stakeholder's expectation outright, just to keep them satisfied and happy
- **B.** Clarify that some human review remains necessary and explain where errors are most likely
- **C.** Quietly remove all of the review steps to match their expectation
- **D.** Tell them that output accuracy is not really something you can measure

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Managing expectations honestly, that review is still needed and where errors tend to occur, protects the project and the stakeholder from an unrealistic promise the tool cannot keep.

_Why a tempting wrong answer misses:_ Agreeing to "100% accurate with no oversight" commits to a standard no AI workflow can guarantee, setting up an inevitable, trust-damaging failure.

</details>

---

### Question 56 of 100

*Study area: Communicating Value · hard*

You want to show that adopting Claude improved a workflow. What is the most credible way to communicate the value?

- **A.** Assert broadly and vaguely that basically everything is just "so much better now" than before
- **B.** Share one dramatic success story and then generalize from that case
- **C.** Compare before-and-after measures like turnaround time and rework rate, noting the human steps kept
- **D.** Claim sweeping benefits that cannot really be measured or verified

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Credible value communication uses concrete, comparable measures (time, rework) and is honest about what still requires people. It gives stakeholders something real to evaluate.

_Why a tempting wrong answer misses:_ A single dramatic anecdote is not representative and can mislead; one story does not establish that the workflow reliably improved.

</details>

---

### Question 57 of 100

*Study area: Delegation Boundaries · medium*

When deciding whether Claude can take an action automatically or a human must approve it first, which factor matters most?

- **A.** How quickly the action itself can actually be carried out end to end
- **B.** How impressive the finished automation ends up looking to others
- **C.** Whether the model itself appears to handle the action confidently enough
- **D.** How reversible the action is and how costly a mistake would be

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The key delegation test is the cost and reversibility of error: cheap, reversible actions can be automated, while costly or irreversible ones warrant human approval first.

_Why a tempting wrong answer misses:_ Speed is a benefit, not a safety criterion; automating an irreversible, high-cost action just because it is fast invites serious harm.

</details>

---

### Question 58 of 100

*Study area: Solution Fit · medium*

A colleague proposes building an elaborate automated system for a task the team does twice a year by hand in ten minutes. What is the most sensible guidance?

- **A.** Match the investment to the need; a heavyweight system is overkill for a rare, quick task
- **B.** Always build the most fully automated solution that is technically possible to build
- **C.** Automate it thoroughly, precisely because the task is so infrequent
- **D.** Add as many features as possible up front so nothing is missing later

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Solution design should fit the problem. For a rare, quick task, the overhead of an elaborate system outweighs any benefit; a simple manual approach (or a light assist) is more sensible.

_Why a tempting wrong answer misses:_ Building the most automated solution regardless of need wastes effort on a twice-a-year task and creates a system to maintain for little return.

</details>

---

### Question 59 of 100

**Scenario: Refund Processing**
*Study area: Human-in-the-Loop · medium*

You are integrating Claude into a customer-refund process. Refunds under $20 are routine; refunds over $500 are sensitive. How should you place the human checkpoint?

- **A.** Require a manual human approval step for every single refund, even the tiny $2 ones
- **B.** Let Claude automatically approve every single refund of any size, no matter how large
- **C.** Require human approval only for the very smallest refunds
- **D.** Auto-process small routine refunds and route large or unusual ones to a human

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Place human review where the stakes are: automate the low-risk, routine refunds and escalate the large or unusual ones. This concentrates human attention where errors are costly.

_Why a tempting wrong answer misses:_ Letting Claude auto-approve refunds of any size removes oversight exactly where it matters most: the large, sensitive payouts.

</details>

---

### Question 60 of 100

*Study area: Custom Instructions · easy*

In a Claude Project, you set custom instructions that say "always write in British English and cite the source section." What is the effect?

- **A.** Every chat started in that Project follows those instructions automatically
- **B.** Only the very next single message that you send will actually follow those instructions
- **C.** The custom instructions then apply across every single one of the Projects you own
- **D.** They apply only after you repeat them again in each new chat

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A Project's custom instructions persist and apply to every conversation started within that Project, so shared preferences are enforced automatically without re-stating them.

_Why a tempting wrong answer misses:_ Custom instructions are not limited to a single message; the whole point is that they persist across every chat in the Project.

</details>

---

### Question 61 of 100

*Study area: Knowledge Sources · easy*

Your team keeps asking Claude questions about a 60-page internal handbook. What is the durable way to make that handbook available in every relevant chat?

- **A.** Paste the entire 60-page internal handbook in at the start of each and every new chat
- **B.** Add the handbook as a knowledge source in a Project so chats can draw on it
- **C.** Ask Claude to memorize the handbook once and rely on that
- **D.** Summarize the handbook from your own memory each time that it happens to come up

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Attaching the handbook as a Project knowledge source makes it available to every chat in the Project, so Claude can ground answers in it without anyone re-pasting the document.

_Why a tempting wrong answer misses:_ Asking Claude to "memorize" a document once does not work; it has no persistent memory of pasted text across separate conversations.

</details>

---

### Question 62 of 100

**Scenario: Pricing Knowledge Base**
*Study area: Keeping Config Current · medium*

A Project's knowledge base still contains last year's pricing, and Claude keeps quoting the old prices. What is the root-cause fix?

- **A.** Simply tell all of the users to mentally adjust the outdated pricing for themselves every time
- **B.** Add a note in each chat correcting the price after the fact
- **C.** Update the knowledge source to the current pricing so every chat inherits the correct data
- **D.** Switch to a larger, more capable model for those chats

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Stale configuration is a leading cause of wrong output. Updating the Project's knowledge source to current pricing fixes the problem at its root for every future chat, rather than patching each conversation.

_Why a tempting wrong answer misses:_ Correcting the price by hand in each chat treats the symptom repeatedly while the outdated source keeps producing the same error.

</details>

---

### Question 63 of 100

*Study area: Project Context · medium*

What is the main advantage of putting durable context into a Project rather than into individual prompts?

- **A.** It mainly just makes each individual prompt take longer to type out
- **B.** It ends up hiding the shared context from the very people using the Project
- **C.** It helps only the very first chat you create and none afterward
- **D.** Every chat in the Project inherits that context, so quality and consistency improve

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Project context is shared by every conversation in the Project. Investing in good instructions and knowledge once raises the baseline quality and consistency of all chats that follow.

_Why a tempting wrong answer misses:_ Project context is not limited to the first chat; its value is precisely that it carries into every conversation in the Project.

</details>

---

### Question 64 of 100

*Study area: Instructions vs Prompt · medium*

Which item is best placed in a Project's custom instructions rather than typed into a single prompt?

- **A.** A standing rule that all outputs use the company's four-part report structure
- **B.** A quick one-time question about what today's local weather is
- **C.** A throwaway request to rephrase one single sentence for you
- **D.** A personal note that has nothing to do with the Project's stated purpose

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Durable, always-apply rules, like a standard report structure every output should follow, belong in custom instructions so they take effect automatically in every chat.

_Why a tempting wrong answer misses:_ A one-time weather question is transient and specific to one conversation; putting it in standing instructions would wrongly apply it to every future chat.

</details>

---

### Question 65 of 100

*Study area: Knowledge vs Instructions · medium*

You have (1) reference documents Claude should consult and (2) rules about tone and format. In a Project, where does each belong?

- **A.** Put both the reference documents and the rules into the custom instructions field
- **B.** Reference documents as knowledge sources, tone and format rules as custom instructions
- **C.** Put both the reference documents and the behavioral rules in as knowledge
- **D.** Neither the documents nor the rules really belong in a Project at all

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Knowledge sources hold reference material Claude draws on; custom instructions hold standing behavioral rules like tone and format. Matching each to its slot keeps the Project organized and effective.

_Why a tempting wrong answer misses:_ Pasting large reference documents into the instructions field misuses it; bulky reference material belongs in knowledge sources, with instructions reserved for rules.

</details>

---

### Question 66 of 100

*Study area: Keeping Config Current · medium*

Your company just changed its refund policy, and several Projects rely on the old policy document. What should you do?

- **A.** Leave the outdated documents in place; Claude will simply work out the new policy on its own
- **B.** Wait until someone actually complains about a wrong policy answer
- **C.** Update the policy document in the affected Projects so chats reflect the new rules
- **D.** Delete all of the affected Projects entirely and then start over again from nothing

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Configuration must be kept current as facts change. Proactively updating the policy document in the affected Projects prevents Claude from confidently applying outdated rules.

_Why a tempting wrong answer misses:_ Waiting for a complaint means Claude keeps giving wrong, outdated answers in the meantime; keeping config current is a proactive maintenance task.

</details>

---

### Question 67 of 100

*Study area: Project Scoping · medium*

You do two very different kinds of work: legal contract review and social-media copywriting. How should you organize Projects for the best context in each?

- **A.** Cram everything into one single Project so that all of the context is always available at once
- **B.** Use no Projects at all and just paste the relevant context each time
- **C.** Randomly assign each chat to whichever Project happens to be open
- **D.** Create a separate Project for each, with its own instructions and knowledge tailored to that work

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Separate Projects keep each body of instructions and knowledge focused and relevant. Tailored context per Project prevents the legal rules and the copywriting rules from bleeding into the wrong chats.

_Why a tempting wrong answer misses:_ Cramming both kinds of work into one Project mixes unrelated instructions and knowledge, diluting the context and risking cross-contamination of guidance.

</details>

---

### Question 68 of 100

**Scenario: Team Onboarding**
*Study area: Team Consistency · medium*

A new hire's Claude outputs do not match the team's house style, while veterans' outputs do. What is the most scalable fix?

- **A.** Give the team a shared Project whose instructions and knowledge encode the house style, so everyone starts the same
- **B.** Have the new hire shadow an experienced veteran for a full month before they are allowed to touch Claude
- **C.** Ask the new hire to infer the house style on their own from past documents
- **D.** Simply accept that new hires will always be off-style for their first while

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Encoding the house style once in a shared Project gives every team member, new or veteran, the same durable context, making consistent output the default rather than something each person recreates.

_Why a tempting wrong answer misses:_ Having the new hire guess the style from old documents is slow and unreliable, and it leaves the knowledge uncaptured for the next new hire.

</details>

---

### Question 69 of 100

*Study area: Config Hygiene · easy*

What is a good practice for Project knowledge that references facts, policies, or data that change over time?

- **A.** Set the knowledge once and then never actually look at it again
- **B.** Review and refresh it on a regular cadence so it stays accurate
- **C.** Assume that Claude itself will keep the knowledge updated automatically
- **D.** Only bother to update it after some major public incident occurs

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Knowledge that references changeable facts drifts out of date. Reviewing and refreshing it on a regular cadence keeps every chat grounded in current information.

_Why a tempting wrong answer misses:_ Claude does not automatically update your uploaded knowledge sources; keeping them current is the owner's responsibility.

</details>

---

### Question 70 of 100

*Study area: Grounding · medium*

Without any reference material, Claude sometimes guesses at your product's specifications. How does a well-configured Project reduce this?

- **A.** It mainly just makes Claude sound a great deal more confident even while it is still guessing
- **B.** It disables Claude's ability to answer questions about the product
- **C.** It supplies the real specifications as knowledge, so Claude answers from your source
- **D.** It has no real effect on the accuracy of the answers either way

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Providing the actual specifications as Project knowledge grounds Claude's answers in your real data, reducing the guessing that leads to inaccurate claims about your product.

_Why a tempting wrong answer misses:_ A Project does not make guessing more confident; it replaces guessing with grounded answers by giving Claude the real reference material.

</details>

---

### Question 71 of 100

*Study area: Instruction Specificity · medium*

A Project's custom instruction reads only "be professional," yet outputs vary widely in structure and length. What would most improve consistency?

- **A.** Remove the vague instruction from the Project entirely
- **B.** Add several more vague, subjective adjectives, such as "good" and "nice"
- **C.** Switch to a different model for each new chat in the Project
- **D.** Make the instruction specific: define the structure, length, and tone you expect

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Vague instructions produce varied results. Specifying the concrete structure, length, and tone gives every chat a precise target, which is what drives consistency.

_Why a tempting wrong answer misses:_ Adding more vague adjectives compounds the ambiguity; "good" and "nice" give Claude no more concrete direction than "professional" did.

</details>

---

### Question 72 of 100

*Study area: Single Source of Truth · hard*

Different team members keep their own slightly different copies of the prompt instructions, and outputs have drifted apart. What is the best remedy?

- **A.** Let every individual person simply keep refining their own separate and private version of it
- **B.** Consolidate into one shared Project configuration that everyone uses as the source of truth
- **C.** Email a freshly revised instruction sheet out to everyone every week
- **D.** Stop giving Claude any standing instructions at all from now on

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Divergent private copies cause drift. A single shared Project configuration acts as the source of truth so everyone works from the same, maintained instructions and knowledge.

_Why a tempting wrong answer misses:_ Letting each person refine a private version is what produced the drift; it guarantees the copies keep diverging.

</details>

---

### Question 73 of 100

*Study area: Knowledge Currency · medium*

A Project's knowledge contains three versions of the same policy: last year's, a draft, and the current one. Claude sometimes cites the wrong version. What should you do?

- **A.** Add a fourth, combined version of the policy just to be safe
- **B.** Tell all of the users to specify the exact policy version they mean in each question
- **C.** Leave all three in place, since having more documents is always better
- **D.** Remove the outdated and draft versions, keeping only the current authoritative one

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Conflicting documents let Claude cite the wrong one. Keeping only the current, authoritative version removes the ambiguity at the source so every chat references the right policy.

_Why a tempting wrong answer misses:_ "More documents is always better" is false when they conflict; extra outdated versions are exactly what causes Claude to cite the wrong policy.

</details>

---

### Question 74 of 100

*Study area: Secrets · easy*

While debugging, you are about to paste a configuration file that includes a live production API key into a chat. What should you do?

- **A.** Remove or redact the secret before sharing; never paste live credentials
- **B.** Paste the whole config file in as-is, since doing so noticeably speeds up the debugging
- **C.** Paste the file in, but ask Claude to simply ignore the embedded production key
- **D.** Paste it now and then rotate the key sometime next quarter

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Live credentials should never be pasted into external tools. Redact or remove the secret first; asking a tool to "ignore" a key does not undo the exposure.

_Why a tempting wrong answer misses:_ Asking Claude to "ignore" the key does nothing to protect it; the secret has still left your controlled environment the moment it is pasted.

</details>

---

### Question 75 of 100

**Scenario: Customer Health Data**
*Study area: Regulated Data · medium*

You want to analyze a spreadsheet of customers' names, addresses, and health conditions. What is the responsible first step?

- **A.** Paste the spreadsheet immediately, since analysis is harmless
- **B.** Check your organization's data policy and get authorization before using regulated personal data
- **C.** Assume that it is perfectly fine simply because the data is only ever being summarized here
- **D.** Remove just the mailing addresses and paste in all of the rest

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Names tied to health conditions are sensitive, regulated personal data. Responsible use requires following your organization's data policy and obtaining authorization before putting such data into any tool.

_Why a tempting wrong answer misses:_ Removing only the addresses still leaves names linked to health conditions, highly sensitive PII that its own governance requirements apply to.

</details>

---

### Question 76 of 100

*Study area: Confidential Data · medium*

A teammate suggests pasting an unreleased, confidential product roadmap into a tool that is not approved for confidential data. What is the right response?

- **A.** Just go ahead and paste the whole roadmap in, since a roadmap is not really that secret anyway
- **B.** Paste a "lightly edited" version of the roadmap to be a bit safer
- **C.** Do not use an unapproved tool for confidential data; follow the policy on where it may go
- **D.** Paste it, and then delete the chat afterward to clean it all up

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Confidential material should only go to tools approved for it. Understanding and following the policy on where sensitive data is allowed to flow is central to responsible use.

_Why a tempting wrong answer misses:_ Deleting the chat afterward does not retroactively make an unapproved destination compliant; the confidential data was already sent there.

</details>

---

### Question 77 of 100

*Study area: Where Data Goes · medium*

Before entering any sensitive business data into an AI tool, the most important thing to understand is:

- **A.** How quickly the AI tool itself tends to respond to a fairly typical everyday request from a user
- **B.** How colorful and modern the tool's user interface happens to be
- **C.** Whether the tool's output will be neatly formatted as a table
- **D.** Where the data goes, how it may be used or retained, and whether your policy permits it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Responsible use starts with data awareness: knowing where your input goes, how it may be used or retained, and whether policy allows it. That determines whether entering the data is appropriate at all.

_Why a tempting wrong answer misses:_ Response speed is a convenience factor, not a governance consideration; it tells you nothing about whether the data is safe or permitted to enter the tool.

</details>

---

### Question 78 of 100

*Study area: What Not to Paste · easy*

Which of the following is clearly inappropriate to paste into a general AI chat tool?

- **A.** A colleague's password and a customer's full credit-card number
- **B.** A publicly available product brochure put out by the marketing team
- **C.** A rough draft of a blog post you already wrote for the public website
- **D.** A short list of some common English-language idioms and everyday sayings

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Secrets and sensitive personal financial data, passwords and full card numbers, must never be entered into a general tool. The other items are already public or non-sensitive.

_Why a tempting wrong answer misses:_ A publicly available brochure carries no confidentiality or privacy risk, so it is not comparable to pasting passwords or card numbers.

</details>

---

### Question 79 of 100

*Study area: Data Minimization · medium*

You need Claude to help spot trends in support tickets, but the tickets contain customer names and emails you do not need for the analysis. What is the best practice?

- **A.** Include every single one of the customer's personal details, just to be extra thorough
- **B.** Remove or anonymize the personal details you do not need before sending the data
- **C.** Include the customer emails, but strip out the customer names
- **D.** Send absolutely everything over to the tool and just hope that none of it is retained

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Data minimization means sharing only what the task requires. Stripping or anonymizing personal details you do not need for trend analysis reduces exposure while still enabling the work.

_Why a tempting wrong answer misses:_ Keeping the emails but dropping the names still transmits personal contact data that the trend analysis does not require.

</details>

---

### Question 80 of 100

*Study area: Responsible Use · medium*

A user asks Claude to help them access an ex-partner's private accounts without permission. As a responsible operator, what is the right stance?

- **A.** Help them out, since the user did ask for it quite politely
- **B.** Go ahead and help them, as long as doing so is technically feasible in the first place
- **C.** Decline; this is unauthorized access to someone else's private accounts, however it is framed
- **D.** Help, but attach a disclaimer about using the access responsibly

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Responsible use includes refusing tasks that facilitate harm or unauthorized access to others' private data. Neither politeness nor technical feasibility makes the request acceptable.

_Why a tempting wrong answer misses:_ Adding a disclaimer does not change the nature of the act; assisting unauthorized access to someone's private accounts is inappropriate regardless of a caveat.

</details>

---

### Question 81 of 100

*Study area: Data Classification · hard*

Your company classifies data as Public, Internal, Confidential, and Restricted. Before pasting a document into an AI tool, the classification matters because:

- **A.** A document with a higher data classification reliably produces noticeably better model answers
- **B.** The classification really only affects the tool's file-size limits
- **C.** The color of the label itself changes how the model behaves
- **D.** It tells you the handling rules: some classes may not be entered into certain tools at all

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Data classification drives handling requirements. Knowing a document's class tells you whether, and in which tools, it may be used, which is the governance question that comes before any prompt.

_Why a tempting wrong answer misses:_ Classification is about handling rules and permitted destinations, not file-size limits; it governs whether the data may be entered at all.

</details>

---

### Question 82 of 100

*Study area: Health Data · medium*

A clinic wants to use a general consumer AI tool to summarize identifiable patient records. Before doing so, the key governance question is:

- **A.** Whether that use is permitted under applicable health-privacy rules and the tool's approved handling
- **B.** Whether each of the generated summaries will come in under 200 words
- **C.** Whether the clinic's own staff would tend to prefer neat bullet points or flowing narrative prose
- **D.** Whether the tool offers a dark mode for the late-night shifts

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Identifiable patient records are protected health information. The governing question is whether the intended use complies with health-privacy rules and the tool's approved handling, not stylistic preferences.

_Why a tempting wrong answer misses:_ The length or formatting of the summaries is irrelevant to whether it is lawful and permitted to process identifiable patient data in that tool.

</details>

---

### Question 83 of 100

*Study area: Output Review · medium*

Before forwarding a Claude-generated report to an external partner, you should:

- **A.** Just send the report straight to the partner, since it was generated internally in the first place
- **B.** Review it to ensure no confidential or personal internal data was carried into the output
- **C.** Only check the report over carefully for any spelling mistakes
- **D.** Assume Claude already removed anything sensitive automatically

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Outputs can inadvertently include sensitive details drawn from your inputs. Reviewing before external sharing prevents leaking confidential or personal information outside the organization.

_Why a tempting wrong answer misses:_ Claude does not automatically know which of your internal details are confidential; assuming it stripped them is unsafe before an external send.

</details>

---

### Question 84 of 100

**Scenario: Shadow IT**
*Study area: Approved Tools · medium*

An employee starts using a personal, unvetted AI account for work involving company data because it is convenient. What is the governance concern?

- **A.** There really is no concern here; convenience is honestly all that truly matters
- **B.** Only that the personal account might turn out to be a little slower
- **C.** Company data may flow through an unapproved tool, outside the organization's controls
- **D.** Only that the tool's fonts and colors happen to look a bit different

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Using unapproved, personal tools for company data routes sensitive information outside sanctioned controls, data-handling agreements, and oversight, a core governance risk regardless of convenience.

_Why a tempting wrong answer misses:_ Speed is not the issue; the real concern is company data leaving approved, governed channels through an unvetted personal account.

</details>

---

### Question 85 of 100

*Study area: Data Minimization · medium*

Which principle best guides how much data to include when prompting with real business information?

- **A.** Include only the data necessary for the task, and no more
- **B.** Always include the maximum data available, for the fullest context
- **C.** Include everything and let Claude decide what it should ignore
- **D.** Include some extra unrelated data as a way to test the model

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Data minimization, sharing only what the task needs, limits exposure of sensitive information and is a foundational responsible-use practice.

_Why a tempting wrong answer misses:_ Dumping the maximum available data needlessly exposes sensitive information that the task never required, increasing risk with no benefit.

</details>

---

### Question 86 of 100

*Study area: Where Data Goes · medium*

Two AI tools are available. Tool X is approved by your company with a data agreement in place; Tool Y is a random free site with unknown data practices. For confidential work, which should you use and why?

- **A.** Tool Y, purely on the grounds that a free tool is simply cheaper for the whole team to keep using
- **B.** Either one of the two tools; honestly it makes no real difference for confidential data
- **C.** Tool X, because its approved status and data agreement govern how your data is handled
- **D.** Whichever of the two tools happens to load faster in your browser

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

For confidential work, the approved tool with a known data agreement is the responsible choice; you understand and have assurances about where the data goes and how it is handled.

_Why a tempting wrong answer misses:_ A free site with unknown data practices offers no assurances about retention or use, making it unsuitable for confidential data regardless of cost.

</details>

---

### Question 87 of 100

*Study area: Responsible-Use Policy · hard*

An organization wants a simple rule for employees about sensitive data and AI tools. Which rule is soundest?

- **A.** "Move fast: any tool is fine as long as it helps you hit deadlines, and sort out the data questions later."
- **B.** "Never use AI tools for any work at all; the risk of data exposure always outweighs any possible benefit."
- **C.** "Use whatever tool you happen to like even for sensitive data, so long as you delete the conversation afterward to erase the exposure."
- **D.** "Use only approved tools, follow the data-classification policy, and never enter secrets or regulated personal data without authorization."

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A sound rule combines approved tools, adherence to data classification, and a clear prohibition on entering secrets or regulated personal data without authorization, covering the main governance risks concisely.

_Why a tempting wrong answer misses:_ Deleting the chat afterward (option C) does not reverse the exposure; the sensitive data has already left your controlled environment, so "delete later" is not real protection.

</details>

---

### Question 88 of 100

*Study area: Missing Context · easy*

Claude's answers to your question are consistently generic and could apply to any company. What is the most likely root cause and fix?

- **A.** The prompt lacks specific context; add the concrete details unique to your situation
- **B.** The underlying model itself must be fundamentally broken, so you should go file a bug report
- **C.** You simply need to go ahead and ask it the exact same question several more times over
- **D.** The maximum output length setting is turned up far too high

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Generic output usually traces back to a generic, context-poor prompt. Supplying the specifics of your situation is the durable fix that makes answers relevant.

_Why a tempting wrong answer misses:_ Repeating the same context-free question just yields more generic answers; the missing ingredient is the specific context, not repetition.

</details>

---

### Question 89 of 100

*Study area: Format Fixes · medium*

You have clearly described the output format three times and Claude still gets the layout slightly wrong. What is the most effective durable fix?

- **A.** Describe the desired format a fourth time, only more emphatically
- **B.** Provide a concrete example of the exact output layout you want
- **C.** Give up on it and simply reformat the output by hand every single time
- **D.** Switch over to a completely different task altogether instead of this one

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

When descriptions of a format keep missing, a worked example demonstrates the target directly. It is usually the durable fix that repeated re-describing is not.

_Why a tempting wrong answer misses:_ Reformatting by hand every time treats the symptom forever; an example fixes the root cause so Claude produces the right layout itself.

</details>

---

### Question 90 of 100

*Study area: Wrong Model · medium*

A high-volume, simple text-cleanup job is running slowly and costing more than expected on your largest model. What is the root-cause fix?

- **A.** Add quite a few more detailed instructions on top of the existing cleanup prompt
- **B.** Run the whole job twice over just to be sure of the result
- **C.** Switch the job to a smaller, faster model suited to simple high-volume work
- **D.** Increase the maximum output length that is allowed for each and every response

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Running a simple, high-volume task on the largest model wastes cost and latency. Matching the model to the task, a smaller, faster model, fixes the root cause.

_Why a tempting wrong answer misses:_ Adding more instructions does not address the mismatch between a heavyweight model and a lightweight task; the model choice is the lever.

</details>

---

### Question 91 of 100

*Study area: Wrong Model · medium*

A genuinely complex, multi-step analysis produces shallow, error-prone results on a small, fast model. What is the most appropriate fix?

- **A.** Ask the very same question several more times over on that exact same small and fast model
- **B.** Shorten the prompt sharply so there is less to confuse the model
- **C.** Lower the maximum output length setting for the responses
- **D.** Move to a more capable model (and enable extended thinking) suited to hard reasoning

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

When a task genuinely exceeds a small model's reasoning, the fix is to match the task to a more capable model, and extended thinking, rather than retrying the same underpowered setup.

_Why a tempting wrong answer misses:_ Repeating the prompt on the same small model does not add the reasoning capacity the complex task needs; the model is the constraint.

</details>

---

### Question 92 of 100

*Study area: Durable Fixes · medium*

Every day you correct Claude's tone the same way in a fresh chat. What is the durable fix?

- **A.** Put the tone rule in the Project's custom instructions once, so it applies automatically
- **B.** Simply keep on correcting the tone by hand in every single new chat, day after day after day
- **C.** Accept the off tone as an unavoidable limitation of the tool itself
- **D.** Try opening Claude in a different web browser and see if it helps

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

A repeated manual correction is a signal to fix the configuration. Putting the tone rule in the Project's custom instructions solves it once for every future chat.

_Why a tempting wrong answer misses:_ Correcting the tone by hand each day is the endlessly repeated one-off patch that a durable configuration change is meant to replace.

</details>

---

### Question 93 of 100

**Scenario: Codebase Edits**
*Study area: Wrong Entry Point · medium*

A developer keeps pasting files from a large codebase into chat one at a time to get Claude to make coordinated edits, and it is painful and error-prone. What is the root-cause fix?

- **A.** Simply paste the individual code files into the chat one by one, only faster this time
- **B.** Use Claude Code, which works directly across the repository, instead of chat
- **C.** Paste every one of the files into a single, giant chat message
- **D.** Reduce the number of files involved by deleting some of the existing code first

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The pain comes from using the wrong entry point. Claude Code operates directly on the repository, eliminating the manual file-by-file pasting that chat forces.

_Why a tempting wrong answer misses:_ Pasting everything in one giant message still lacks the repository access and editing workflow that Claude Code provides, and it strains a single conversation.

Reference: https://code.claude.com/docs/en/overview

</details>

---

### Question 94 of 100

*Study area: Stale Knowledge · easy*

Claude's answer about a fast-moving topic is confidently out of date. What is the most direct fix?

- **A.** Rephrase the very same question using a whole handful of different synonyms
- **B.** Ask Claude directly to please try to "be more current" about the topic
- **C.** Enable web search so Claude can retrieve up-to-date information
- **D.** Switch over to a smaller and faster model just for this one question

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Out-of-date answers on recent topics stem from the training cutoff. Enabling web search lets Claude pull current information rather than relying on stale knowledge.

_Why a tempting wrong answer misses:_ Asking Claude to "be more current" cannot conjure post-cutoff facts it never learned; it needs a retrieval tool like web search.

</details>

---

### Question 95 of 100

*Study area: Ambiguous Prompt · medium*

Two people give Claude "clean up this text" and get very different results, and neither is what they wanted. What is the root cause and fix?

- **A.** The model itself is just inherently inconsistent, so really nothing can be done about it here
- **B.** The text that they each handed it is simply far too long for the model to handle well
- **C.** They should each simply ask the very same thing several more times
- **D.** "Clean up" is ambiguous; specify what to change (grammar, tone, length, formatting)

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Ambiguous instructions like "clean up" invite divergent interpretations. Specifying exactly which changes you want removes the ambiguity and makes results predictable.

_Why a tempting wrong answer misses:_ The variability is not randomness to accept; it stems from an under-specified request, which precise instructions resolve.

</details>

---

### Question 96 of 100

*Study area: Isolating Variables · hard*

An output got worse after you edited your prompt, but you changed several things at once. What is the best troubleshooting move?

- **A.** Revert, then reintroduce the changes one at a time to find which caused the regression
- **B.** Go ahead and change even more things all at once, and just hope the overall result improves
- **C.** Abandon the whole prompt entirely and just start over from nothing
- **D.** Assume the model itself quietly degraded and simply wait a day

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Isolating variables is core to troubleshooting. Reverting and reapplying changes one at a time reveals exactly which edit caused the regression, so you can fix it precisely.

_Why a tempting wrong answer misses:_ Changing even more at once makes the regression harder to diagnose, compounding the very problem that caused it.

</details>

---

### Question 97 of 100

*Study area: Right Diagnosis · medium*

Claude gives wrong answers about your internal process. You are tempted to blame the model, but it was never given the process documentation. What is the real root cause?

- **A.** The model is simply and fundamentally incapable of the entire task at hand here
- **B.** Missing context: Claude was not given the internal information it needs
- **C.** An incorrectly configured temperature setting on the underlying model itself
- **D.** The particular time of day at which you happened to ask

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Wrong answers about private information usually mean the context is missing, not that the model is incapable. Supplying the internal documentation is the fix.

_Why a tempting wrong answer misses:_ Blaming the model's core capability misdiagnoses the problem; Claude simply never received the internal information the answer depends on.

</details>

---

### Question 98 of 100

*Study area: Constraining Output · medium*

Claude's responses are far longer and more rambling than you need for a quick summary. What is the durable fix?

- **A.** Manually delete the unnecessary parts out of each and every single response by hand every time
- **B.** Ask it to "be concise" with no further detail and hope for the best
- **C.** Specify explicit constraints, for example "at most five bullet points, one line each"
- **D.** Switch over to a larger, more capable model for the summaries

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Rambling output is best fixed by explicit constraints on length and structure. Concrete limits like "five bullets, one line each" reliably shape the response.

_Why a tempting wrong answer misses:_ Editing every response by hand is an endless one-off patch; setting a concrete length constraint fixes the behavior at the source.

</details>

---

### Question 99 of 100

*Study area: Root-Cause Thinking · hard*

A prompt underperforms. Which sequence best reflects sound troubleshooting?

- **A.** Immediately switch straight to the biggest, most expensive model available, and then simply move on
- **B.** Randomly tweak the prompt wording until something finally sticks
- **C.** Blame the model, decide it just cannot do this, and stop using it
- **D.** Identify the likely root cause (ambiguous ask, missing context, wrong model or entry point) and fix it

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Effective troubleshooting diagnoses the specific root cause, ambiguity, missing context, model fit, or entry point, before applying a targeted fix, rather than guessing.

_Why a tempting wrong answer misses:_ Randomly tweaking wording may occasionally help by luck but teaches you nothing and often misses the actual cause, like missing context or a model mismatch.

</details>

---

### Question 100 of 100

**Scenario: Team Standardization**
*Study area: Durable Fixes · medium*

You discover a prompt tweak that reliably fixes a recurring problem across your team's chats. What is the best way to capture the win?

- **A.** Keep the useful prompt tweak to yourself and simply reuse it again yourself the next time around
- **B.** Apply the tweak by hand whenever you happen to remember to
- **C.** Mention the tweak once in a team meeting and then move on
- **D.** Build it into the shared Project configuration so every chat benefits automatically

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

A durable fix belongs in shared configuration. Encoding the improvement in the team's Project makes every future chat benefit automatically, instead of depending on individuals remembering to apply it.

_Why a tempting wrong answer misses:_ Applying the tweak manually whenever you remember is fragile and does not help teammates; building it into shared config makes the fix permanent and universal.

</details>

---
