# Contributing to Anime Array

Contributions are welcome, and the most valuable ones do not require you to write any code.

This document covers how to contribute, what is worth contributing, and the standard any change has to meet before it ships.

---

## The four things that help most

In rough order of usefulness to the project:

### 1. Corrections

**This is the single most valuable contribution available, and it requires no technical skill at all.**

Anime Array's product rests on character knowledge and on factual claims about series. Some of those will be wrong. When one is, the fix is usually small and the impact is large.

Send corrections through the [contact form](https://animearray.site/contact-us/) or to contact@animearray.site with:

- the character, tool or page concerned
- the question that was asked
- the answer that was given
- what the correct answer is, and where you are confident about it

Corrections are handled under the platform's [editorial guidelines and corrections policy](https://animearray.site/editorial-guidelines-and-corrections-policy/), which fixes the underlying knowledge rather than patching the individual reply.

### 2. Translation

English is currently the only language. Native speakers improving or adding one would have a direct effect on who can use the platform at all.

Machine translation is **not** an acceptable substitute. A translated character who is subtly wrong is worse than no translated character, because the error is invisible to the reader.

### 3. Accessibility reports

Anything that blocks somebody using the platform with a keyboard, a screen reader, a specific browser, or a specific assistive technology. These are treated as defects, not as suggestions, and fixing them takes priority over new features.

Please include:

- the browser and assistive technology combination
- what you expected to happen
- what happened instead
- the page URL

### 4. Character requests

Submitted through the [AI Hub](https://animearray.site/ai-hub/). The roster follows what readers actually ask for rather than a fixed release schedule, so requests genuinely influence what gets built next.

---

## Before you write anything

If you are planning a technical contribution, please open an issue describing the problem first. Not a finished pull request — a paragraph explaining what is wrong or what is missing.

This exists for two reasons. A change that cannot be reverted in a single step needs a considerably stronger justification than usual, and it is much easier to agree an approach before somebody has written it than afterwards. It also saves you the frustration of building something that was never going to be merged.

---

## How to contribute technically

1. **Open an issue** describing the problem, not the solution. Describe who has the problem and what they are trying to do.
2. **Wait for a response.** There is no automated triage bot and no service-level promise. A human reads this.
3. **Fork and branch** from `main`. Branch names are not enforced; a short descriptive name is appreciated.
4. **Keep the change small.** One logical change per branch. A pull request that fixes three unrelated things cannot be reviewed properly and is likely to sit.
5. **Match the surrounding style.** Read the file you are editing before you edit it.
6. **Verify it yourself before submitting.** A pull request that has not been run is a pull request that has not been finished.
7. **Explain what changed and why** in the pull request description, including how you tested it.

---

## The standard any change has to meet

These are not aspirations. A change that does not meet them will not be merged.

### It works without JavaScript where that is possible

Core reading, character conversation and the AI assistant work without scripting. If your change makes something JavaScript-only, it needs a justification strong enough to be written into the pull request description, and there are very few of those.

### It works on a throttled mobile connection

If the feature needs a good connection to be usable, it does not ship. Test it before claiming it does.

### It is reversible in a single step

Every change should be possible to undo in one step. This is the reason the platform has never been down for a long period, and it is the reason small changes shipped often are safer than one large change shipped rarely.

If your change cannot be reverted in one step, say so explicitly and explain why the trade is worth it.

### It is accessible

Native elements rather than styled divs. A real heading hierarchy rather than heading levels chosen for font size. A focus indicator visible against the actual background. Labels on every form field. Errors stated in words. Streaming and status changes announced through live regions. `prefers-reduced-motion` honoured. Contrast meeting WCAG AA against what is actually rendered.

Check your keyboard pass before submitting. Tab through the feature and confirm the order makes sense and you can always see where you are.

### It is readable

One person should be able to understand, trace and repair it on a bad evening without a runbook. Where there was a choice between something clever and something comprehensible, comprehensible wins.

### It is honest

If the feature can mislead somebody about what the site is or how it makes money, that is a defect regardless of how the feature itself performs.

---

## What will not be merged

- **Changes that publish operational internals.** Stack inventories, server configuration, deployment layout, file structure, dependency versions, credential configuration and security-hardening detail are deliberately not published. See the `Technology` page for the reasoning.
- **Affiliate or referral links added without discussion.** Advertising is the funding model and placements are deliberate. Unsolicited link insertions are not contributions.
- **Keyword stuffing or SEO padding.** The documentation is written to be read and quoted. Repeating a phrase does not make it more quotable.
- **Fake reviews, testimonials or social proof.** Nothing that is not true gets written down.
- **Copy that implies an affiliation that does not exist.** No studio, publisher, licensor, broadcaster or rights holder has endorsed, licensed, sponsored or approved this project.
- **Anything reproducing protected media.** No animation, manga, audio or script content, and no links to unauthorised downloads.
- **Large refactors bundled with a feature.** Split them.

---

## Reporting a vulnerability

**Do not open a public issue for a security problem.** Follow [SECURITY.md](SECURITY.md) and report privately.

---

## Code of conduct

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## Licence

By contributing you agree that your work is published under the [MIT Licence](LICENSE).

The licence covers the documentation and code in this repository. It does not cover Anime Array's platform, its generated output, its character personalities as written, or any third-party intellectual property referenced in the documentation.