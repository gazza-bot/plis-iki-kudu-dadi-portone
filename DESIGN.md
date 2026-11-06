# DESIGN.md

## Direction

Personal portfolio for recruiters and collaborators in frontend and UI/UX. Editorial-bold visual language with a blue identity, built around typography, rules, and asymmetric composition instead of cards and soft shadows.

Dial: ENERGY 3 / RHYTHM 3 / MOTION 2.

- ENERGY 3: oversized display type, strong contrast between sections, visible personality.
- RHYTHM 3: every section has a different composition. No repeated centered title plus grid pattern.
- MOTION 2: purposeful scroll reveals and hover transitions. No infinite decorative motion.

## Identity motif

The interlocking "A" mark from the existing logo and the blue blob shape are the recurring motif. They appear in the hero portrait, section markers, and the footer wordmark. No new illustration or avatar is introduced.

## Palette

| Token | Value | Use |
|---|---|---|
| ink | `#0b1f33` | Primary text, dark section background, borders |
| white-bg | `#f3f3f3` | Default page background |
| paper | `#ffffff` | Cards, forms, surfaces |
| blue-main | `#2185d5` | Accent: highlights, focus ring, small labels |
| blue-deep | `#175d95` | Accessible text and buttons on light surfaces |
| blue-soft | `#e3f0fb` | Subtle accent surface |

Reason: two core colors (ink, off-white) plus one accent (blue). `blue-deep` exists because white on `blue-main` is 3.9:1, below WCAG AA for normal text. White on `blue-deep` is 6.9:1.

## Typography

- Display: Bebas Neue. Condensed and loud, fits the editorial poster direction.
- Body: Plus Jakarta Sans. Readable at small sizes and pairs with the condensed display face.
- No monospace family. Labels use Plus Jakarta Sans uppercase with moderate tracking, not extreme tracking.

## Radius and elevation

- Surfaces and media: sharp or 2px radius. Editorial layout should feel printed, not soft.
- Buttons and inputs: 2px radius.
- Avatars and the floating assistant button: full round, because they represent compact circular objects.
- Shadows: solid offset shadows for focal elements only (hero portrait, featured project, assistant panel). No soft shadow on every component.

## Layout

- Hero: asymmetric, text-led, portrait on the right with the blob motif.
- Projects: one featured project plus editorial rows with index numbers.
- My Targets: large statement plus a numbered principles list.
- Footer: oversized wordmark and a plain contact list.
- Whitespace separates sections by different amounts on purpose. No alternating background-only rhythm.

## Content rules

- Use real project data from the API and real GitHub data from the API.
- No fabricated testimonials, statistics, or claims.
- Placeholders must be labeled as placeholders.
- Copy uses no em dash.
