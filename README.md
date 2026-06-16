# Wells Gallery — Wildlife Art in Motion

A redesigned website for **Wells Gallery**, the bronze studio of sculptor
**Ronnie Wells**. Static HTML/CSS/JS — no build step, no framework, no
dependencies. Open it and it runs.

## Run it
Just open `index.html` in a browser. (For the contact form and clean URLs you
can serve it locally with any static server, e.g. `python3 -m http.server`.)

## Structure
```
index.html          Home — hero, about, selected works, commissions, contact
gallery.html        The full collection (lightbox grid)
assets/css/style.css  All styling
assets/js/main.js     Nav, scroll reveal, lightbox, image fallbacks
assets/images/        Drop photos here — see assets/images/README.md
```

## Design notes
- **Typography (intentionally not the default web-app fonts):**
  *Cinzel* for the engraved monument lettering, *Cormorant Garamond* for the
  large display headings, and *Spectral* for body text — a warm, gallery-grade
  pairing suited to bronze.
- **Palette:** foundry bronze, weathered patina, parchment, and warm ink.
- The original **Wells Gallery logo is kept as-is** (`assets/images/logo.png`).
- Fully responsive, keyboard-accessible lightbox, respects
  `prefers-reduced-motion`.

## Before you go live — quick checklist
Everything works now; these swap in the real details:

1. **Add the photos.** See `assets/images/README.md` — drop them in with the
   listed filenames and they appear automatically.
2. **Contact details.** In `index.html`, search for `[ Add` and fill in the
   address, phone, and `tel:` link. Update the email if it isn't
   `info@ronniewells.com`.
3. **Facebook & Yelp links.** Search both HTML files for `facebook.com/` and
   `yelp.com/` and paste the gallery's real page URLs into the `href`s.
4. **Contact form.** The form is wired but inert. Point its `action` at a
   handler like [Formspree](https://formspree.io) or Netlify Forms (search
   `TODO: point action`).

> Note: this redesign was built from the images and details provided directly.
> The studio's live phone, address, and exact social URLs weren't reachable from
> this environment (network was restricted to GitHub), so those are left as
> clearly-marked placeholders rather than guessed.
