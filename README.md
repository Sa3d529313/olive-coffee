# Olive Coffee House: website (pitch build)

Run locally: `npm install` then `npm run dev` → http://localhost:5180

Stack (per the Premium Website Playbook): Vite + React + TS, Lenis, GSAP + ScrollTrigger, motion, Paper Shaders.

## Brand facts (from @olivecoffee.ps)
- Sofin, Qalqilya (صوفين – قلقيلية) · Every day 8:00 AM – 2:00 AM · 059 420 4056
- Tagline: "SMILE, YOU'RE IN OLIVE"
- Their Google Maps link points at **Al-Sabi Nursery Co.**, Sofin. Olive has no Google Maps listing of its own (a search finds a different "Olive" in Ajloun, Jordan). Worth raising in the pitch.

## Colours / type
- Forest green `#1F3D2B` / deep `#142A1D`, cream `#F4EEE2`, sand `#E8DCC6`, kraft `#C39A6B`, sage `#8FA27A`
- Archivo (wide, heavy) for headlines, Fraunces italic for the accent word, Alexandria for all Arabic (the main text)

## Before showing it live
- [x] **Hero photo:** `hero.jpg` (wide) and `hero-mobile.jpg` (portrait) are in.
- [x] **Menu:** the real "Olive – The Kitchen" menu is in `src/lib/menu.ts`. (No drinks list yet; send it and it gets its own tabs.)
- [ ] **Order link:** paste Olive's page in the delivery app into `ORDER_URL` in `src/lib/brand.ts` (all "اطلب الآن" buttons use it). Not found on yummy.ps publicly.
- [x] **Wordmark:** `public/images/wordmark.png` (cut from the ChatGPT version, leaf vein added). Used in header, loader, awning, hero, lockup, footer.
- [ ] Optional: clean single-drink shots for the menu cards (prompt in `HERO_PROMPT.md` §6).

## Files
- `src/sections/*`: Hero, Moments (photo grid), Menu (café board), Signature, Place, Visit, Footer
- `src/components/*`: Preloader (glass doors under the awning), Nav (bar + awning on scroll), Flow (mesh gradient), ui (buttons, wordmark, awning)
- The page is Arabic-first and right-to-left; English sits underneath as a second line.
- `public/images/coffee-house.png`, `coffee.png`: logo lettering cut from the ChatGPT version (header lockup, loader, place lockup, hero).
- `public/images/tree-mark.png`: the olive tree cut out of the logo (used as a recolourable mark)
- `.claude/skills/`: google-fonts, grainient, rocaille-shader
