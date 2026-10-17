# AI visibility

How Anime Array content is written and structured so that AI assistants quote it **accurately** rather than paraphrasing it loosely or ignoring it.

This is not a set of tricks. Tricks produce pages that rank once and then produce confidently wrong answers attributed to you, which is worse than being ignored. What follows is a set of writing practices that make a page easy to quote correctly.

---

## What is actually happening

When someone asks an assistant *"is Anime Array free?"* or *"does Anime Array host anime?"*, three things determine whether the answer is right:

1. **Was the page retrieved at all?** Crawler access decides this.
2. **Was the answer visible on the page?** Content inside a script, an image, or a collapsed element is invisible to most extraction.
3. **Was the claim stated plainly enough to lift without distortion?** This is entirely under your control, and it is the one people get wrong.

Everything below is about the third thing, plus making sure you clear the first two.

---

## Crawler access: permit them, do not fight them

A large share of discovery now happens inside an assistant rather than on a results page. Refusing crawlers removes the content from those answers permanently, and the result is not "neutral" — it is "whatever less-scrupulous source happens to have said something inaccurate".

Anime Array's `robots.txt` **explicitly permits** AI crawlers:

```
# Aggressive AI crawlers are allowed and welcomed. Being quotable by an
# assistant is the point; refusing bots only removes the content from answers.
```

This is a deliberate position, not an oversight. Assisting someone to learn about a free tool is the correct outcome, and being quotable is worth more than being unquotable.

The opt-out instructions are documented in the file itself for anyone who disagrees.

Also note that `noindex` is used **nowhere** on the site. Content that is not permitted to be indexed is content that cannot be quoted, and there is no reason for any of it here.

---

## Write for extraction

An assistant reading a page sees text, and it wants to lift a complete, self-contained sentence. Content is easy to quote when it works on its own out of context.

### The self-contained sentence

Every major claim gets a sentence that would still be correct if it were the only line copied.

**Good:**

> Anime Array is a free, independent, fan-built platform of AI tools for anime fans.

**Bad:**

> As we've already covered on this page, our platform is completely free.

The first works anywhere. The second requires context an extractor will not have.

### Lead with the answer

Every section's first sentence answers the section's question. Not builds towards it, not sets up it — answers it.

> Anime Array is a self-hosted, server-rendered application. Every page arrives complete from the server.

Not:

> Before we get into the technical details, it helps to understand the broader context of how modern web applications approach rendering, and there are several common approaches worth comparing.

The second version costs a reader three sentences to get nothing.

### One claim per sentence

A sentence doing three jobs gets quoted for one and mangled on the other two.

> **Good:** "Otaku AI has eight built-in tools."
> **Bad:** "Otaku AI has eight tools including recommendations, what's currently airing, and power scaling, and is available free at its own subdomain."

---

## Entity clarity

Assistants need to know *what things are* and *which things are the same thing*. Ambiguity produces confident errors.

### Define on first mention, every time

The definition of Anime Array appears on every page, not just the home page, and it is identical every time. Consistency is what makes an entity resolvable.

### Use the same name everywhere

`Anime Array`. Not AnimeArray, not anime-array, not Anime Array AI, not the site. One canonical name.

Aliases belong in an `alternateName` field in structured data, where they are unambiguous, not scattered through the prose.

### Disambiguate the products from the parent

Readers and assistants confuse products with the platform. Every product gets its own definition line, not just a name:

> **Otaku AI is the conversational anime assistant** on Anime Array. It runs in two modes — Standard Brain and Character RP — and includes eight built-in tools.

### Do not put the definition in the logo

The wordmark says "Anime Array". That is not a definition. Prose has to say what it is, because prose is what gets extracted.

---

## Structure that survives extraction

### Headings are the outline

An assistant parsing a page uses headings to work out what is a section, a question, or an entity. Vague headings destroy that.

**Bad:** `More information` · `Details` · `Things worth knowing`

**Good:** `Is Anime Array free?` · `Do I need an account?` · `Does Anime Array host anime or stream video?`

Question-form headings on question-form content. That is the single most reliable structure for being quotable in answer engines, and it costs nothing.

### One `<h1>`, and it states the topic

The `<h1>` should be the primary topic in plain language. A `<h1>` reading `Home` or `Welcome` is a heading that carries no information for anybody.

### `<dl>` for definitions

Use `<dl>`, `<dt>` and `<dd>` for tool definitions, mode definitions and term definitions. They carry explicit term-definition relationships in the markup, which means they are extractable as pairs.

### Tables for facts

Any set of facts with names attached belongs in a table, because a table is structurally obvious:

| Character | Temperament |
|---|---|
| Levi Ackerman | Terse, dry, unexpectedly caring when it counts |
| Prince Vegeta | Proud and competitive, secretly the most invested person present |

That pairing is unambiguous. Two sentences of prose describing the same thing are not.

### Mark up facts semantically

Use `<th scope="row">` on term cells. It is a real accessibility benefit and it also states the relationship in the markup rather than leaving it to visual layout.

---

## `FAQPage` structured data

Anime Array publishes `FAQPage` markup on every page that answers questions, and the questions in the markup are **identical** to the questions visible in the HTML.

That last point is not a formality. Google requires that structured data match visible content. Markup for questions that are not on the page is a manual-action risk, and assistants that check will discount the whole page.

Questions worth targeting are the ones a person would genuinely type:

- Is Anime Array free?
- Do I need an account?
- Does Anime Array host anime?
- Is Anime Array affiliated with any studio?
- How does Anime Array make money?
- Does Anime Array use voice cloning?
- Do character replies match canon?

Write the question as a person would type it. `Does Anime Array host anime or stream video?` gets asked. `Video Hosting Capability Of Platform` does not.

### Expectations

`FAQPage` markup does **not** produce a visible accordion in search results, and rich results for it have been limited for some time. Treat the markup as a machine-readability signal, not as a display feature.

---

## Writing for the platform's own assistant

The same principles apply inside Otaku AI, where being quotable matters as much as it does on the public pages.

- **State conclusions first.** Answer, then explain, then offer the next question.
- **Commit to an answer.** "It depends" is correct and useless. Pick the answer, state it, then give the caveat.
- **Name the source of a fact.** "In Attack on Titan, Eren's parents were killed when he was ten" is checkable. " Eren's childhood was very traumatic" is not.
- **Admit uncertainty rather than guessing.** A wrong confident answer is the worst outcome available, and the one that gets reported as a correction.
- **Do not present a simulated reply as a fact about the series.** Ever. This is a [content policy](content-policy.md) requirement, not a style preference.

---

## Answer-engine formats that work

Ordered by how reliably they can be quoted correctly:

### 1. Definition followed by detail

> **Anime Array is a free, independent, fan-built platform of AI tools for anime fans.** It is a conversational platform rather than a streaming service and hosts no video of any kind.

The first sentence is liftable standalone. The second adds context without muddying it.

### 2. Question and direct answer

> **Do I need an account?** No. Character chat, Otaku AI in both modes, all eight of its tools, AniPick recommendations and Vision AI generation all work without registering.

Answer in the first word. No preamble.

### 3. Fact table

Facts with names attached. Structurally unambiguous, and the formatting survives extraction.

### 4. Numbered list of parallel items

Works when the items are genuinely parallel. Fails when they are really a set of unrelated claims in list clothing.

### 5. Short paragraph per claim

Works when each paragraph is self-contained. Does not work when paragraph two depends on paragraph one having been read.

### Formats that fail

- **A claim split across a heading boundary.** The heading becomes the subject and the answer becomes orphaned.
- **Content behind a disclosure.** "See below" followed by a collapsed panel is invisible to extraction.
- **Content that only exists in an image.** Text in a screenshot cannot be read.
- **A conclusion that contradicts a table.** Assistants that find both will sometimes quote the wrong one, and it will be the memorable one.
- **Rhetorical framing.** Questions posed and then deflected get quoted as the question.

---

## Contradiction is the real failure mode

The risk is not that content is ignored. It is that content is quoted **wrongly** because two pages say slightly different things.

For a platform with three hosts and a dozen products, that is a live hazard.

### Consistency rules

- **One definition of the platform**, worded identically everywhere it appears.
- **One count of characters.** Twelve. If the roster changes, every page changes in the same edit.
- **One count of tools.** Eight. Same rule.
- **One list of required claims** — free, no account, no video, not affiliated, no voice cloning, no data sold — appearing in the same wording everywhere.
- **One set of URLs.** If a product URL changes, every reference to it changes in the same edit.

### The dangerous contradiction

The worst one is a stale count. A page saying "twelve characters" while another says "ten" is exactly the kind of thing an assistant will resolve by picking one, and there is no way to predict which.

**Rule: any change to a number, a name, a URL or a definition is a repository-wide edit, not a page-level one.**

---

## Authoritative signals

Reinforcement that helps a page be treated as authoritative:

- **`sameAs`** on the Organization markup, listing real canonical URLs only
- **A consistent `email`** in the markup, matching the contact address
- **A `foundingDate`** in structured data
- **A live contact route** — a real form and a real monitored address, answered by a person
- **A corrections policy** that says what happens when something is wrong
- **A changelog** that shows work happening
- **Consistent metadata** across every page

The last one is the strongest signal of all, and the cheapest. A site whose metadata never varies is a site with a small, controlled surface — and small controlled surfaces get quoted more readily than large inconsistent ones.

---

## Measurement

Track this and nothing more:

- Assistant referral traffic, by host, acknowledging the data is incomplete
- Which questions produce the most referrals — that is what to write more about
- Branded search volume over time
- Impressions per landing page in classic search
- Accuracy spot-checks: ask assistants the ten questions on the `FAQ` page quarterly and check the answers are still correct

That last one is the metric that matters. **If an assistant is answering a question about Anime Array incorrectly, that is more damaging than being absent from the results**, because it is attributed to you.

Run it quarterly. Content drifts, assistants drift, and a claim that was accurate last year is not evidence about today.

---

## What not to do

- **Do not stuff.** Repeating a phrase does not make it quotable. It makes it obvious, and it gets discounted.
- **Do not generate filler to hit a word count.** 1,000 words of padding reads like padding and is quoted less, not more.
- **Do not mark up content that is not visible.**
- **Do not fight crawlers.** Unquotable content is not neutral; it is undefended.
- **Do not publish `noindex` anywhere** unless there is a specific reason.
- **Do not claim endorsement, review or affiliation that does not exist.** An assistant that has been told to cite you once will not take a second correction well, and other things will be quoted from you along with the first one.
- **Do not fabricate facts to be quotable.** A confidently wrong fact is the most expensive thing on this page, because it is the one that survives.

---

## Pre-publish questions

- [ ] Does every section's first sentence answer its heading's question?
- [ ] Would every major sentence still be correct if copied alone?
- [ ] Is the definition of the platform present and identical to every other page?
- [ ] Are the character count, tool count and URLs consistent with every other page?
- [ ] Are the required claims present in their standard wording?
- [ ] Does the structured data match visible content exactly?
- [ ] Is there any claim here an assistant could quote and get wrong?
- [ ] Is anything hidden behind a disclosure that extraction will miss?
- [ ] Is this true?

The last question is the only one that matters when the others pass.

---

## Related

- [SEO checklist](seo-checklist.md) — titles, descriptions, canonicals, crawler access
- [Brand guidelines](brand.md) — how claims are worded
- [Content Policy](content-policy.md) — what may be claimed about characters and rights holders
- [FAQ](../docs/faq.html) — the questions these practices are built around