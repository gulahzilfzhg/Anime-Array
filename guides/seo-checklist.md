# SEO checklist

The technical and metadata requirements every Anime Array page must meet before it ships. Designed to be run as a pre-publish gate, not read once and forgotten.

---

## Why this checklist exists

Anime Array competes in a search environment that is changing faster than most of the advice written about it. Three things are now true at once:

1. **Classic search still brings most traffic**, so titles, descriptions, canonicals and crawlability still decide whether a page can rank.
2. **A growing share of discovery happens inside AI answers**, where a page either gets quoted accurately or gets ignored entirely. That is covered in [AI visibility](ai-visibility.md).
3. **Both are read by machines**, so the page has to be structured well enough to be understood without a human deciding how to read it.

The technical items here are unglamorous and they are what actually determines whether the content-level work matters.

---

## Pre-publish gate

Run this before any page goes live. Every item is binary.

### Document

- [ ] `<!DOCTYPE html>` on the first line
- [ ] `lang` attribute on `<html>`
- [ ] `charset` declared as the first element in `<head>`
- [ ] `viewport` meta present
- [ ] Exactly **one** `<h1>`, and it is not empty
- [ ] `title` present, 30–60 characters
- [ ] Meta description present, 120–160 characters
- [ ] `rel="canonical"` present and pointing at this page's own absolute URL
- [ ] `theme-color` present
- [ ] Page is valid HTML — no unclosed tags, no duplicate IDs

### Open Graph and social

- [ ] `og:type` present
- [ ] `og:site_name` present
- [ ] `og:title` present
- [ ] `og:description` present
- [ ] `og:url` present and absolute
- [ ] `og:image` present, absolute, 1200×630, under 300 KB
- [ ] `og:image:alt` present
- [ ] `og:locale` present
- [ ] `twitter:card` set to `summary_large_image`
- [ ] `twitter:title` present
- [ ] `twitter:description` present

### Structured data

- [ ] Valid JSON in a `type="application/ld+json"` block — parse it, do not eyeball it
- [ ] `Organization` with `name`, `url`, `email`, `sameAs`
- [ ] `WebSite` on the home page
- [ ] `BreadcrumbList` on every page except the home page
- [ ] `FAQPage` wherever questions are answered in the visible content
- [ ] Every `@id` referenced in a relation is defined somewhere in the graph
- [ ] Schema markup matches visible content — marking up something invisible is a manual-action risk
- [ ] No `sameAs` URL is a redirect or a dead link

### Links

- [ ] Every internal link resolves
- [ ] No internal link points at a redirect
- [ ] Link text is descriptive — never "click here", "read more", or a bare URL
- [ ] External links carry `rel="noopener"` where `target="_blank"` is used
- [ ] No internal link points at an unauthorised download

### Media

- [ ] Every `<img>` has a `alt` attribute
- [ ] Meaningful images have descriptive alt text, not the filename
- [ ] Decorative images have `alt=""`
- [ ] `width` and `height` set to prevent layout shift
- [ ] Images are served at display size, in a modern format, and are not oversized

### Rendering and accessibility

- [ ] Page reads completely with JavaScript disabled
- [ ] Heading levels descend without skipping
- [ ] One `<main>`, one `<header>`, one `<footer>`
- [ ] A skip link is the first focusable element
- [ ] Body and interface text meet WCAG AA contrast against actual rendered backgrounds
- [ ] Every interactive element is keyboard reachable with a visible focus indicator
- [ ] Every form field has an associated `<label>`
- [ ] Decorative links use icons with accessible names, not bare images
- [ ] `prefers-reduced-motion` honoured

### Performance

- [ ] Critical CSS is inline or preloaded
- [ ] No render-blocking script in `<head>`
- [ ] No third-party script above the fold
- [ ] Nothing loads on pages that do not need it
- [ ] Space reserved for dynamically loaded content
- [ ] Total page weight is a deliberate choice, not an accident

---

## Titles

**Length:** 30–60 characters. Under 30 wastes the most valuable pixels on a results page; over 60 truncates.

**Pattern:** `[Primary thing] — [qualifier] | Anime Array`

**Rules:**

- Primary thing first. The qualifier is worthless if the primary thing was cut.
- Brand name last, except on the home page.
- No leading brand name on pages that should rank for something else.
- One primary topic per title.
- No keyword repetition. `Anime` does not need to appear three times.
- Sentence case, not Title Case.

**Examples:**

```
Anime Array — Free AI tools for anime fans | Chat, Discover, Create
About Anime Array — An independent fan-built AI platform
Anime Array Products — Roleplay, Otaku AI, AniPick, Vision AI
Technology — How Anime Array is built, and why
Frequently Asked Questions — Anime Array
Policies — Content, copyright and intellectual property | Anime Array
```

---

## Meta descriptions

**Length:** 120–160 characters. Under 120 wastes space; over 160 truncates mid-sentence, usually at the wrong place.

**Structure, in order:**

1. What it is
2. What it does
3. What removes the reader's objection

**Rules:**

- Written for the reader, not assembled from keywords.
- Include at least one concrete number or fact where one exists — a count, a series, a capability. Numbers raise click-through more reliably than adjectives.
- Not a duplicate of the title.
- Include the qualifying claim where the page level calls for it — no account, no video, not affiliated.
- No ellipsis, no truncated sentences, no `Read more`.

**Good — 154 characters:**

> Anime Array is a free platform of AI tools for anime fans. Chat with 12 characters in their own voice, ask Otaku AI about the lore, find your next series.

**Bad — 61 characters, wastes space:**

> Free AI tools for anime fans. Chat with characters and get anime recommendations.

**Bad — 193 characters, truncates:**

> Anime Array is a free, independent platform of AI tools for anime fans. Chat with 12 characters who answer in their own voice, ask Otaku AI about the lore, and find your next series. No signup.

---

## Canonicals

- One canonical per page, self-referencing, absolute URL.
- Canonical on **every** page, not only duplicates. A self-referencing canonical is a hint, not a redirect.
- `hreflang` annotations are relative to the canonical, not to the raw URL.
- Do not canonicalise pages with genuinely different content, however similar they look.
- Never canonicalise a page to the home page to consolidate authority. It does not work and it loses the page.

---

## Heading structure

- One `<h1>` per page, containing the primary topic.
- `<h2>` for main sections, `<h3>` beneath. Never skip a level.
- Headings describe document structure. Choosing a level for font size breaks the outline and confuses assistive technology and crawlers alike.
- No heading chosen purely for visual weight — that is CSS's job.
- No text in a heading that would be meaningless on its own if read aloud.

---

## Structured data

Types used on Anime Array:

| Page | Types |
|---|---|
| Home | `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage` |
| About | `AboutPage`, `BreadcrumbList`, `Organization` |
| Products | `CollectionPage`, `BreadcrumbList`, `ItemList` with nested `SoftwareApplication`, `Organization` |
| Technology | `TechArticle`, `BreadcrumbList`, `Organization` |
| FAQ | `FAQPage`, `BreadcrumbList`, `Organization` |
| Policies | `WebPage`, `BreadcrumbList`, `Organization` |

**Rules:**

- One `@graph` per page, not multiple disconnected blocks.
- Every referenced `@id` is defined in the same graph.
- `@context` present in every block.
- Markup describes what is **visible**. Marking up hidden content is a manual-action risk, not a trick.
- Validate before shipping. Parse the JSON; do not trust that it looks right.

Rich results are a bonus, not the goal. `FAQPage` markup does not produce a visible accordion in results and should not be written as though it will.

---

## Technical SEO

### Crawlability

- [ ] `robots.txt` present at the site root
- [ ] `robots.txt` references the absolute sitemap URL
- [ ] No `Disallow: /` for search engines
- [ ] AI crawlers explicitly permitted — see [AI visibility](ai-visibility.md)
- [ ] Sitemap at the server root, not inside a subdirectory
- [ ] `sitemap.xml` lists only canonical, indexable, 200-status URLs
- [ ] No `noindex` anywhere in production
- [ ] No meta robots conflicting with `robots.txt`
- [ ] Server responds with a real status code, not a soft 404

### Redirects and status codes

- [ ] Every URL redirects in exactly one hop
- [ ] Redirect chains do not exceed one level
- [ ] No redirect loops
- [ ] Correct status codes: `200` for pages, `301` for permanent moves, `410` for retired pages
- [ ] Retired pages return `410 Gone`, not a redirect to the home page
- [ ] No soft 404s — pages with thin content that return `200`

Retired pages matter more than they look. Redirecting a withdrawn page to the home page tells a search engine the URL now means "home page", which is how a site accumulates soft 404s across a few hundred dead links.

### Performance signals

- [ ] Server response time is a first metric, not a afterthought
- [ ] HTML is compressed in transit
- [ ] Images are modern formats, sized to display, and lazy-loaded below the fold
- [ ] Layout shift is near zero — dimensions declared, space reserved
- [ ] Largest Contentful Paint identified and optimised
- [ ] Interaction to Next Paint considered — streaming responses should not block input
- [ ] Cache headers set sensibly on assets and pages
- [ ] Cache purged deliberately when important content changes, rather than left to expire

### Multi-host deployment

Anime Array is served from several hosts. Specific rules apply:

- [ ] One canonical URL per page — the host that owns it, consistently
- [ ] Cross-host duplicates either canonicalise to the primary or are de-indexed deliberately
- [ ] Analytics identifiers are **never** reused across hosts. One measurement ID per host, always
- [ ] Structured data `@id` values use the canonical host consistently
- [ ] `sameAs` in Organization markup lists real, canonical URLs only
- [ ] Each host's `robots.txt` and sitemap reference that host's own URLs

Reusing an analytics identifier across hosts corrupts the data for both, and the resulting numbers are wrong in a way that looks plausible — which makes it worse than having no analytics at all.

---

## Performance budgets

Check these before publishing, not after:

| Metric | Target |
|---|---|
| HTML transfer size | Under 40 KB |
| CSS, compressed | Under 20 KB |
| JavaScript, compressed, total | Under 100 KB |
| Images above the fold | Under 200 KB combined |
| Server response time | Under 400 ms |
| LCP, mobile, throttled | Under 2.5 s |
| CLS | Under 0.1 |

A throttled mobile test is the one that counts. Performance measured on a fast desktop connection is not a proxy for the reader actually using the site.

---

## Publishing procedure

1. Copy the page template. Do not start from a blank file.
2. Write the `<title>` first, then the description, then the `<h1>`. Writing the body first produces titles that describe the body rather than the topic.
3. Write the content.
4. Add structured data.
5. Run the pre-publish gate.
6. Validate the HTML and parse the JSON-LD.
7. Test with JavaScript disabled.
8. Tab through the whole page.
9. Test on a real phone on mobile data.
10. Deploy, purge the cache, verify the live response — not the local file.
11. Confirm the canonical, the status code and the sitemap entry on the live URL.

Step 11 is not optional. The page that works locally and the page a reader receives are frequently not the same page.

---

## Measurement

Track this, and nothing more:

- Impressions and clicks per landing page
- Average position per landing page
- Pages with zero impressions after 60 days — these need rewriting or de-indexing, not patience
- Core Web Vitals at the 75th percentile, mobile, split by host
- Coverage errors, resolved monthly

**Do not** track rank as a primary metric. Rank is a lagging indicator of things that take months, and it is not what the business depends on.

**Do not** treat traffic from AI answers as a separate success story until the numbers are stable. Referrer data from assistants is incomplete, and undercounting it is normal.

---

## Anti-patterns

Never:

- Keyword stuffing, or instructions to repeat a phrase
- Cloaking, or content served differently to crawlers
- Hidden text, or text hidden behind a disclosure that is already present
- `hreflang` pointing at non-existent or redirected URLs
- Schema markup for content that is not visible on the page
- AI-generated filler added purely to hit a word count — 1,000 words of padding ranks worse than 600 good ones and reads like what it is
- Bulk-generated pages with no original information in them
- Canonicalising to the home page to consolidate authority
- Auto-generated content published without being read by a person first

---

## Related

- [AI visibility](ai-visibility.md) — being quotable inside AI answers
- [Brand guidelines](brand.md) — title and description patterns, required claims
- [Content Policy](content-policy.md) — what may be claimed about characters and rights holders
- [Contributing](../CONTRIBUTING.md) — the standard any change has to meet