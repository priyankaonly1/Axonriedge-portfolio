# AxonRiedge — Update Guide

A practical, non-technical guide to keeping **axonriedge.com** up to date. No build tools, no
frameworks — just three files you can edit in any text editor:

```
axonriedge.com/
├── index.html      ← all page content (text, links, sections)
├── styles.css      ← all colors, fonts, spacing
├── script.js       ← animations & interactions (rarely needs editing)
└── assets/
    └── favicon.svg  ← the little logo in the browser tab
```

> **Golden rule:** edit one thing, save, then refresh the page in your browser to check it.
> If something breaks, undo your last change. Keep a backup copy of the folder before big edits.

---

## 1. Contact details (phone, address, email, LinkedIn)

These are currently **placeholders**. They live in **two** places in `index.html` — update both.

### A. The visible contact block
Search `index.html` for `<!-- PLACEHOLDER contact details`. You'll find four rows. Replace the
text inside each `<span>`:

| Find this placeholder | Replace with |
|---|---|
| `+1 (000) 000-0000` | your real phone number |
| `[Street], [City], [Country]` | your real office address |
| `hello@axonriedge.com` | your real email (appears twice — also in the form note below) |
| `linkedin.com/company/axonriedge` | your real LinkedIn company URL |

After replacing real values, you can remove the `is-ph` class (it greys the text to mark it as a
placeholder). Example — change:
```html
<span class="is-ph">+1 (000) 000-0000</span>
```
to:
```html
<span>+1 (555) 123-4567</span>
```

### B. The footer social links
Search for `class="socials"`. Update the `href` on each `<a>`:
```html
<a href="https://www.linkedin.com/company/axonriedge" ...>   ← LinkedIn
<a href="https://x.com/axonriedge" ...>                      ← X / Twitter
<a href="https://github.com/axonriedge" ...>                 ← GitHub
```
To remove a social network entirely, delete its whole `<a>...</a>` block.

### C. Search-engine / structured data (important for SEO)
Search for `"@type": "Organization"` near the top of `index.html`. Update `telephone`, `address`,
`email`, and the `sameAs` social links there too. Search engines read this block — keep it in sync
with what's visible on the page.

---

## 2. SEO — keywords, title, description

All SEO lives in the `<head>` of `index.html`. Edit these tags:

- **`<title>`** — the blue link text in Google. Keep it under ~60 characters, lead with your
  strongest keyword.
- **`<meta name="description">`** — the grey summary in Google. ~150 characters, write it like ad copy.
- **`<meta name="keywords">`** — comma-separated terms. Already filled with strong Edge-AI terms
  (on-premise LLM deployment, air-gapped AI, private LLM, etc.). Add a city/region here to rank
  locally, e.g. `…, edge AI deployment London`.
- **Open Graph tags** (`og:title`, `og:description`, `og:image`) — control how the link looks when
  shared on LinkedIn / X / Slack. The image should be `assets/og-image.jpg` at **1200×630px**
  (create this image and drop it in the `assets/` folder).
- **JSON-LD blocks** (the two `<script type="application/ld+json">` blocks) — keep contact info and
  FAQ answers in sync with the page. If you change an FAQ answer in the page, change it here too so
  Google shows the right rich snippet.

> **Localising for a city:** add your city to the `<title>`, the `description`, the `keywords`, and
> fill the real `address` in the JSON-LD. That's the highest-impact local-SEO change you can make.

---

## 3. Articles / Logs (the "Notes from the edge" section)

The section with `id="logs"` holds three article cards. **To add a new one:**

1. In `index.html`, find `<!-- To add an article: copy one ... -->` (just above `id="logs"`).
2. Copy one entire `<article class="log reveal rd-1">…</article>` block.
3. Paste it as the first card and edit:
   - `<span class="tag">Deployment</span>` → your category
   - the date and read-time (`6 min`)
   - the `<h3>` headline and `<p>` summary
   - the `href="#"` on the `Read log` link → the URL of the full article
4. (Optional) To use a real cover image instead of the striped placeholder, replace:
   ```html
   <div class="thumb"><span class="ph">cover image · 16:9</span></div>
   ```
   with:
   ```html
   <div class="thumb"><img src="assets/your-image.jpg" alt="Describe the image"></div>
   ```
   Add `.log .thumb img { width:100%; height:100%; object-fit:cover; }` to `styles.css` once.

**Layout note:** the cards sit in a 3-column grid. The `rd-1` / `rd-2` / `rd-3` classes just stagger
the fade-in animation — cycle them (`rd-1`, `rd-2`, `rd-3`, `rd-1`, …) for a nice cascade. Adding a
4th, 5th, or 6th card works automatically; they wrap to a new row.

To wire up the **"All Articles"** button, change its `href="#"` to your blog index page.

---

## 4. Editing the colours

Open `styles.css`. Everything is controlled from the `:root` block at the very top — change a value
there and it updates everywhere.

```css
--accent: oklch(0.82 0.12 205);   /* the cyan signal colour */
--bg:     #0a0b0e;                /* deep dark background */
--paper:  #ecebe3;                /* light blueprint hero background */
```

- **To change the accent colour:** edit `--accent` (and optionally `--accent-dim`). The site uses
  `oklch(Lightness Chroma Hue)`. Keep Lightness/Chroma the same and just change the **hue** number to
  shift colour: `205` = cyan, `260` = violet, `150` = green, `25` = orange.
- **To make the dark sections lighter/darker:** edit `--bg`, `--bg-2`, `--surface`.
- The particle colour in `script.js` is hard-coded as `rgba(52,227,255, …)` — if you change the
  accent dramatically, update that value too (search for `rgba(52,227,255`).

---

## 5. Editing the fonts

Two steps, both already wired up:

1. In `index.html` `<head>`, the Google Fonts `<link>` loads **Space Grotesk**, **IBM Plex Sans**,
   and **IBM Plex Mono**. To swap a font, change the family name in that URL.
2. In `styles.css` `:root`, update the matching variable:
   ```css
   --f-head: 'Space Grotesk', …;   /* headings */
   --f-body: 'IBM Plex Sans', …;   /* body text */
   --f-mono: 'IBM Plex Mono', …;   /* labels, specs, code */
   ```

---

## 6. Editing text content

All copy is plain text inside `index.html`. Find the section by its comment banner
(e.g. `<!-- ===== HERO ===== -->`) and edit the words between the tags. Leave the tags
(`<h2>`, `<p>`, `class="…"`) alone — only change the text between them.

The hero's rotating words ("Air-gapped. Offline. Sovereign. Yours.") are in `script.js` — search for
`const words =` and edit the list.

---

## 7. The contact form

The form validates in the browser and shows a success message, **but it does not send anything**
yet — there's no backend. To actually receive submissions, pick one:

- **Easiest:** use a form service (Formspree, Basin, Web3Forms). They give you an `action` URL.
  In `index.html` find `<form class="form" id="contactForm"`, add `action="THEIR_URL" method="POST"`,
  and in `script.js` remove the `e.preventDefault()` line so the form submits normally.
- **mailto fallback:** the form note already links `hello@axonriedge.com` so visitors can email
  directly.

---

## 8. Going live (hosting)

Because it's just static files, you can host it free on **Netlify**, **Vercel**, **GitHub Pages**,
or **Cloudflare Pages** — drag-and-drop the whole folder, or connect a Git repo. Point your
`axonriedge.com` domain at the host and you're live. No server or database required.

---

## 9. Quick reference — "I want to change ___"

| I want to… | File | Look for |
|---|---|---|
| Update phone/address/email | `index.html` | `PLACEHOLDER contact details` **and** `"Organization"` |
| Change LinkedIn / socials | `index.html` | `class="socials"` |
| Add a blog article | `index.html` | `id="logs"` |
| Change the accent colour | `styles.css` | `--accent` |
| Change fonts | `index.html` + `styles.css` | Google Fonts `<link>` + `--f-head` |
| Edit SEO title/description | `index.html` | `<title>` / `meta name="description"` |
| Edit a headline or paragraph | `index.html` | the section's `<!-- comment -->` banner |
| Make the form actually send | `index.html` + `script.js` | `id="contactForm"` |

---

*Keep a backup before major edits. When in doubt, change one thing at a time and refresh.*
