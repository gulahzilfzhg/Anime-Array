# Press kit and syndication package

Everything in this document is written to be **copied and published elsewhere**.

---

## Why this file exists

The documentation site in this repository is hosted on GitHub Pages, which search engines treat as a low-authority domain. The writing on it is good, but good writing on a discounted domain stays invisible. This is a property of the hosting, not of the content.

So the content is duplicated here in a form built for **hosting on domains that carry authority**:

1. **Your own domain.** These pages belong at `animearray.site/`. You already have relevance and some standing there.
2. **Third-party sites.** Guest posts, community forums, listicles, resource roundups. A link from a real site is worth orders of magnitude more than one from a Pages subdomain.

The repository and the documentation site are still worth having — as documentation, as a credibility signal, and as the canonical source everything here is copied from. They are simply not the channel that will move search results on their own.

**Use whichever fits. Attribution is welcome. Use without attribution is also fine, as long as the non-affiliation line travels with the copy.**

---

## Boilerplate

### Short — 25 words

> Anime Array is a free, independent platform of AI tools for anime fans. Character roleplay, a conversational anime assistant, a recommendation engine and an image generator. No account required.

### Medium — 60 words

> Anime Array is a free, independent, fan-built platform of AI tools for anime fans. Chat with twelve characters who each answer in their own voice, ask Otaku AI about series and lore, get recommendations built from what you actually watched, and generate anime artwork. Every core feature is free and none requires an account. The platform hosts no video, sells no user data, and is not affiliated with any anime studio.

### Long — 120 words

> Anime Array is a free, independent, fan-built platform of AI tools for anime fans, covering both halves of what fans do: talking about anime and making it. Its four products are character roleplay with twelve characters drawn from Jujutsu Kaisen, Naruto, Dragon Ball, One Piece and Attack on Titan; the Otaku AI conversational assistant, which runs in two modes and carries eight built-in tools; the AniPick AI recommendation engine, which builds suggestions from what you watched rather than what sells; and the Vision AI image generator.
>
> Every core feature is free, none requires an account, and everything works with advertising blocked. The platform hosts no episodes, films or media files of any kind, does not clone voices, does not sell user data, and is not affiliated with, endorsed by or sponsored by any anime studio, publisher or licensor.

---

## Key facts

| Fact | Value |
|---|---|
| Name | Anime Array |
| Type | Conversational AI platform for anime fans |
| Operator | Independent fan project |
| Cost to users | Free |
| Account required | No, for any core feature |
| Subscription | None |
| Video hosted | None |
| Affiliation | None |
| Voice cloning | Not used |
| User data sold | No |
| Revenue model | Advertising, clearly labelled |
| Products | 4 |
| Characters available | 12 |
| Series represented | 5 |
| Otaku AI modes | 2 |
| Otaku AI tools | 8 |
| Language | English |
| Contact | contact@animearray.site |

All of the above is machine-readable at [`data/platform.json`](data/platform.json) and validated against the published pages in CI.

---

## The characters

| Character | Series | Role |
|---|---|---|
| Gojo Satoru | Jujutsu Kaisen | Special Grade sorcerer and teacher at a jujutsu high school |
| Ryomen Sukuna | Jujutsu Kaisen | Known as the King of Curses |
| Naruto Uzumaki | Naruto | Ninth Hokage of Konoha Village |
| Itachi Uchiha | Naruto | Uchiha clan member and captain in the Konoha Police Force |
| Madara Uchiha | Naruto | A central figure of the Uchiha clan's history |
| Obito Uchiha | Naruto | Uchiha clan member and former teammate of Kakashi and Rin |
| Monkey D. Luffy | One Piece | Captain of the Straw Hat Pirates |
| Roronoa Zoro | One Piece | Swordsman of the Straw Hat Pirates |
| Son Goku | Dragon Ball | Saiyan fighter |
| Prince Vegeta | Dragon Ball | Saiyan prince |
| Eren Yeager | Attack on Titan | Soldier in the military Survey Corps |
| Levi Ackerman | Attack on Titan | Squad Leader in the military Survey Corps |

Machine-readable at [`data/characters.json`](data/characters.json).

**Non-negotiable framing:** these are original AI systems inspired by existing characters. Their replies are not canon, not quotations, and not the opinions of any character's creator. Any published use must carry the non-affiliation line.

---

## Ready-to-publish articles

Three standalone pieces. Each is written to work as-is on a domain that is not ours. Edit freely, keep it honest, and keep the required claims.

---

### Article 1 — Why anime recommendation tools keep giving you the same list

*Target: a blog about anime, a personal site, a community forum. Around 700 words.*

**Most anime recommendation systems are not broken. They are answering a different question than the one you asked.**

Ask a recommendation engine what you want to watch and you will get the same short list of commercially popular titles that it gives everybody else. The list is not wrong. It is ranked by what keeps you on the platform, and for a platform that goal is coherent — it is just not the same goal as helping you find something worth two hours of your evening.

Where a recommendation tool does try to learn from your history, it usually needs three things before it will say anything useful: an account, a login, and enough tracked viewing data to have a pattern. Ask a stranger for their watchlist and you get ten titles, four of which they have already seen, and the system cannot tell the difference between those four and the six you have not.

## The abandoned series are the useful signal

The thing a popularity ranking throws away most reliably is the show you quit.

Dropping a series is one of the clearest statements of taste available. It tells you what you expected and what you got, and the gap between those two things is exactly the kind of information that a ranked list cannot represent. You thought it would be a slow-burn political drama; it turned out to be a fight-fest. That gap is data, and most recommendation systems have nowhere to put it.

Which is why the better tools start with the smallest input that carries real signal — recent watches, all-time favourites, and what you abandoned — and build outward from there. No account. No warm-up period. Something useful inside one sitting.

## Mood is a filter, not a genre

Genre is a coarse filter that people are forced into because it is the only one available. A better question is how you want to feel, and that maps onto titles far less predictably than genre does. The show that lands after a difficult week is rarely the show that matches your taste on paper.

This is the least technically interesting problem on this list and the one that changes recommendations most in practice.

## Conversation beats a filter

There is a category of question a filter cannot answer at all: "what would this character say about that?" Nobody has ever wanted a dropdown for that.

Putting a conversation in front of the reader covers it, and covers the "tell me something I'd like about this character" case better than any genre taxonomy. It also handles the recommendation you did not know to ask for, because people ask follow-up questions that no matrix of checkboxes anticipates.

## What to actually expect from a recommendation tool

- It will not be personalised on a first visit, and any tool claiming otherwise without data is either lying or guessing.
- Dropped series tell it more than watched ones. Use that field.
- "What do I want to feel right now" beats "what genre am I in the mood for" more often than people expect.
- A conversation, offered before a form, gets better answers than a form, offered before a conversation.
- Any of it that requires an account to be useful is a worse tool than one that does not.

Anime Array is built on these principles — recommendations weighted towards abandoned series, a mood filter, an assistant you can talk to, and no account required for any of it. It is at [animearray.site](https://animearray.site/), free, and an independent fan project with no affiliation to any studio.

---

### Article 2 — Talking to anime characters without them all sounding the same

*Target: a writing blog, a creative community, a Reddit-style forum. Around 700 words.*

**Ask four different anime chatbots the same question and you will often get four answers that are the same answer with a different name above it. This is the problem that anyone building a character roleplay product actually has to solve.**

Generating text is easy. Anyone can get a model to produce a paragraph in a vaguely elevated register. The difficulty is making twelve characters respond *differently to identical pressure*, consistently, across turns, without the twelve voices collapsing into one.

## Collapse is the default

The reason voices collapse is that tone is a low-dimensional thing. "Serious", "intense", "warm", "playful" are four directions in a small space, and a model asked to be intense will land near the same place whether it is meant to be a stoic captain or a restless revolutionary. Ask both of them what they think they are fighting for and you get two paragraphs about protecting what matters, in the same register, with the same cadence.

Escaping that requires more than a personality description. It requires deciding what a character does *when the conversation is not going their way*.

## Pressure is the test

The useful question is not "who is this character" but "what happens when you try to unsettle them, and what happens when you try to impress them."

A character written to be contemptuous should dismiss you and turn the conversation back on you, and should be entirely unbothered by the attempt. A character written to be caring should not be warm at you — should be short, dry, and briefly different when it actually matters. A character who leads with conviction should not adjust their position because you disagreed; they should restate it with the same confidence and wait.

Those behaviours are learnable, testable, and much more specific than a personality adjective. They are also what a reader actually notices in the first three exchanges.

## Short is a character trait, not a limitation

One of the easiest wins is accepting that a good character's replies should be short. Verbosity is the default failure mode of language models, and a character defined by terseness ends up indistinguishable from every other character precisely because the model pads them back out.

The test is whether removing a sentence loses information. If it does not, it was filler, and filler is what makes a character sound like the model rather than like itself.

## Replies should not pretend to be canon

A character simulation that produces confident invented lore is worse than one that admits it is improvising, because readers will quote the invented version back as fact. The honest framing is that these are original responses written in a character's voice — reasoned from the character's temperament rather than retrieved from a script — and the copy should say so plainly rather than leaving the reader to guess.

Anime Array takes that approach on its [roleplay platform](https://roleplay.animearray.site/), where twelve characters are each written to behave differently under pressure, and states the same thing on its [policies page](https://muqeet-1138.github.io/Anime-Array/policies.html). It is an independent fan project, free, and not affiliated with any studio.

---

### Article 3 — What "free with no signup" has to mean in 2026

*Target: a consumer-software blog, an indie web community, a newsletter. Around 700 words.*

**"Free" is the most common word on the internet and the least informative. Here is what it has to mean before it is worth anything.**

## The three-part test

A claim of "free" is only meaningful if you can answer three questions, and the answer to each one is where the disagreement actually lives.

**Is it free at the point of use?** No trial, no credit card, no "free tier" with the useful part behind the upgrade. The feature either works or it is not free.

**Is an account required?** This is the part most sites blur. "No signup needed" and "no account required" are different claims, and the second one is the stronger and rarer one. An account is not always a paywall, but it is always a data collection decision somebody made.

**Does it survive blocking third-party scripts?** If a site works only with its ad and analytics code running, then the parts of it that pay for it are load-bearing. A genuine free tool works with all of that blocked.

## Why free is a position, not a business model

Advertising pays the bills, and it is a blunt instrument: it introduces third-party code onto pages that would otherwise be clean. A site can be free and still make that trade honestly, but only if it is explicit about it.

The test is whether the ads are labelled, whether they are kept away from the actual product, and whether anything you came for stops working when you block them. If the answer to the last one is yes, the "free" claim is doing more work than it should.

## The honest version of this

The strongest version of a free product says all of this without being asked: here is what it costs, here is how it is funded, here is what happens if you block the ads, here is what is collected, here is what is never collected, and here is who to contact.

Most sites cover this across four separate policies none of which mention each other. That fragmentation is the tell. If you cannot answer "is it free" from a single page, the answer is probably no, or it is only free in a way that requires reading the small print.

Anime Array states all of it in one place: [animearray.site](https://animearray.site/) is free, no core feature requires an account, every core feature works with advertising blocked, user data is not sold, and the platform hosts no video and is not affiliated with any studio. It is an independent fan project.

---

## Media assets

| Asset | Format | Size |
|---|---|---|
| Social card, home | `docs/assets/og-default.png` | 1200×630 PNG |
| Social card, per page | `docs/assets/og-{page}.png` | 1200×630 PNG |
| Site stylesheet | `docs/assets/style.css` | — |
| Roster data | `data/characters.json` | — |
| Product data | `data/tools.json` | — |
| Platform facts | `data/platform.json` | — |

The social cards carry the brand name, the page title, one line of copy, the domain, and the non-affiliation line. They contain nothing operational and are safe to reuse verbatim.

---

## Rules for anyone reusing this material

**Required.** Every published use carries:

1. That Anime Array is an independent fan project.
2. That it is not affiliated with, endorsed by or sponsored by any anime studio, publisher or licensor.
3. That it hosts no video.
4. That character replies are not canon — they are original responses written in a character's voice.
5. That character names and series titles belong to their respective owners.

**Not permitted.** Do not describe Anime Array as official, licensed, endorsed, or partnered. Do not imply a studio is connected to it. Do not present character replies as quotations. Do not use social cards or screenshots from the platform to imply it hosts episodes.

**Attribution.** Welcome, not required. If you do attribute, a link to the platform is appreciated.

---

## Contact

Corrections, questions, or a syndication request: [contact form](https://animearray.site/contact-us/) or **contact@animearray.site**.

Security issues go through the private route in [`SECURITY.md`](SECURITY.md), not to that address.