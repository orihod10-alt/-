<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: אינסטלטור
description: Professional plumbing services — precise, trusted, available 24/7
---

# Design System: אינסטלטור

## 1. Overview

**Creative North Star: "The Trusted Craftsman's Report"**

This system channels the quiet authority of an expert who lets his record speak. Every visual decision asks: does this earn trust, or does it just decorate? The aesthetic owes more to a well-typeset professional document than to a website template — structured, legible, with weight where weight is earned and whitespace where it signals confidence. References: Stripe's structural precision and typographic certainty; Linear's information-first density and crisp tonal hierarchy.

The surface is warm-neutral throughout: stone whites, deep warm near-blacks, and a single accent hue drawn from material craft rather than emergency-service branding. This is not a flashy site. It is a site that a stressed homeowner scans in 90 seconds and immediately feels: *this is the one to call.* That feeling comes from clarity, not spectacle.

The RTL-aware Hebrew typographic system is the primary design tool. Spatial rhythm and type-scale carry the visual hierarchy before color does. The one accent color appears in fewer than 10% of any screen, reserved for the primary CTA and the single most important trust signal per section. Its restraint is the point: when something is bold here, it means something.

**Key Characteristics:**
- Typography-first hierarchy — scale and weight do the work before color is needed
- RTL-native — layout, reading order, and component mirroring designed Hebrew-first, not adapted from LTR
- Warm material ground — the canvas reads like quality off-white paper, not a CSS template
- Single conversion path — at any scroll position, one action is clearly primary
- No ambient decoration — every element earns its presence through function

**The Craftsman's Economy Rule.** If an element does not build trust, reduce friction to contact, or prove competence with evidence — remove it. This applies to copy, visual ornament, and interaction alike.

---

## 2. Colors: The Stone & Copper Palette

A Restrained palette where tinted stone neutrals carry 90%+ of the surface and a single warm accent — drawn from the material world of copper fittings and brass valves, not the cliché spectrum of contractor marketing — appears only where it must direct the eye.

### Primary
- **Deep Warm Copper** `[to be resolved during implementation]`: The sole accent. Used on the primary CTA button, the phone/WhatsApp link, and one trust signal per section. Its rarity is the point. Anchor hue family: a muted, darkened warm copper-bronze — material and earned, not emergency-orange.

### Neutral
- **Warm Stone White** `[to be resolved during implementation]`: The primary background. Not pure white — tinted with the faintest amber warmth, reads like quality paper or plaster.
- **Deep Warm Charcoal** `[to be resolved during implementation]`: Primary text. Not true black — has warmth pulled toward the copper hue at the lowest chroma possible. Prevents harshness.
- **Mid Stone** `[to be resolved during implementation]`: Secondary text, dividers, meta information (dates, license numbers, timing). Lightened version of the charcoal, still legible at WCAG AA.
- **Light Stone** `[to be resolved during implementation]`: Section background alternation, subtle container differentiation. One step lighter than the main background.

### Named Rules

**The One Accent Rule.** The deep warm copper appears on ≤10% of any given screen. It fires once per section: on the primary CTA only. Using it on decorative icons, background panels, or secondary links dilutes its authority. When the copper appears, the user's eye goes there. That must always be intentional.

**The Warmth Through Tinting Rule.** Every neutral is pulled toward the copper hue at the lowest measurable chroma (0.005–0.01 in OKLCH). The background is never `#ffffff`. The text is never `#000000`. The warmth is barely perceptible but present — the difference between a printed document and a monitor.

**The Anti-Navy Rule.** Blue in any form — navy, cobalt, teal, cyan — is prohibited as an accent or background. It is the fingerprint of ten thousand Israeli contractor sites. If a design choice looks like it came from a Canva contractor template, reconsider it.

---

## 3. Typography: The Editorial-Professional Pairing

**Display Font:** Classical serif `[font pairing to be chosen at implementation — must have Hebrew support: Frank Ruhl Libre, Noto Serif Hebrew, or a high-quality Hebrew-enabled serif]`
**Body / UI Font:** Clean humanist sans-serif `[to be chosen at implementation — must have Hebrew support: Assistant, Heebo, or a quality humanist sans with RTL coverage]`

**Character:** The serif brings gravitas and editorial authority to headlines — it says "established professional with a track record." The humanist sans brings clarity and approachability to every functional element. Neither should feel designed; both should feel *right*.

### Hierarchy

- **Display** (serif, light-to-regular weight, large — `clamp` to be resolved): Business name in the hero, landmark section titles. Appears rarely. Maximum 2 instances per page.
- **Headline** (serif, regular, mid-large): Section-opening claims. "15 שנות ניסיון". "זמין 24/7". Short, bold, serif-set.
- **Title** (sans-serif, medium-bold): Service names, card headers, credential labels.
- **Body** (sans-serif, regular, comfortable line-height): Explanatory copy. Max 65ch line length. This is where the homeowner reads and decides.
- **Label** (sans-serif, medium, slightly spaced): CTAs, button text, phone numbers, meta data. Uppercase optional for CTAs only — use sparingly, and never for full sentences.
- **Number / Stat** (serif or tabular figure variant of the sans): Years of experience, jobs completed, response time. Numbers deserve their own typographic voice.

### Named Rules

**The Serif Headline Rule.** Serif is for claims and evidence (headlines, stats, the business name). Sans-serif is for action and information (body, UI, CTAs). Mixing the roles — sans headlines, serif body — breaks the system's logic and flattens the hierarchy.

**The RTL Line-Length Rule.** Body text columns are capped at 65ch regardless of viewport width. In Hebrew RTL layouts, this is especially important: long lines collapse under rapid scanning. The eye needs a short, decisive line to track.

---

## 4. Elevation

Flat by default. Depth is communicated through typographic weight, spatial scale, and the tonal step between surface layers — not through shadows. This matches the Stripe and Linear references: authority comes from structure, not dimension.

The single exception: the primary CTA button receives a subtle lift shadow on hover (diffuse, not dramatic) to signal interactivity. This is a state response, not ambient decoration.

**The Flat-By-Default Rule.** Surfaces are flat at rest. No decorative box-shadows on cards, sections, or images. If something needs to feel elevated, it should be elevated through whitespace or tonal differentiation instead. Hover shadows are permitted only on interactive elements as state feedback.

---

## 5. Components

*Omitted in seed mode. Components will be extracted and documented on the next `/impeccable document` run once the implementation exists.*

---

## 6. Do's and Don'ts

### Do:
- **Do** lead every section with a concrete, numbered proof signal: years of experience, response time in minutes, number of completed jobs. Specificity builds trust faster than superlatives.
- **Do** make the phone number and WhatsApp CTA visible at every scroll position on mobile — floating or sticky if necessary.
- **Do** use the serif at Display scale for the business name and landmark claims only. Earn the serif; don't scatter it.
- **Do** design Hebrew-first. Every layout decision (padding, alignment, icon placement, list direction) assumes RTL from line one. LTR adaptation, if needed, comes second.
- **Do** keep touch targets on mobile ≥ 48px. A stressed homeowner is tapping with one hand.
- **Do** use `prefers-reduced-motion` to disable all scroll animations and transitions for users who request it.
- **Do** test color contrast at WCAG AA (4.5:1 for body, 3:1 for large text) with the warm stone background. Warmth does not excuse illegibility.

### Don't:
- **Don't** use navy, cobalt, teal, or generic blue in any role — accent, background, icon, or border. This is the fingerprint of every generic Israeli contractor site (Yad2, template-built service sites). It is immediately forgettable.
- **Don't** use a clipart wrench, water-drop, or house icon in the logo or hero. These are the visual vocabulary of low-quality local directories. If an icon is needed, it must be custom, minimal, and purposeful.
- **Don't** build a multi-ad, cluttered layout. This is not a classifieds page. One voice. One CTA. One primary action per section.
- **Don't** use gradient text (`background-clip: text` with a gradient background). It signals "AI-generated design" and undermines the credibility the site is trying to build.
- **Don't** add background panels or card grids with `border-left` colored stripes as the only visual differentiator. Rewrite with tonal backgrounds, leading numbers, or nothing.
- **Don't** use stock photos of generic workers or families. Real photos of actual work, actual spaces, actual tools. If there are no real photos yet, use neutral placeholder space rather than stock imagery.
- **Don't** use the copper accent on decorative elements, section backgrounds, icon fills, or secondary CTAs. One appearance per section, on the primary action only. Diluting the accent dilutes its meaning.
- **Don't** choreograph scroll animations. No stagger-entrance sequences, no parallax on the hero image, no animated counters that count from 0 to 15 on scroll. This is a service site, not a portfolio. A stressed user needs information, not a show.
