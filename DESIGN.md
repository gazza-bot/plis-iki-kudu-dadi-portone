# DESIGN.md

## Direction

Personal portfolio for recruiters and collaborators in frontend and UI/UX. Launcher-style home-shell language with a near-black canvas, blue atmospheric lighting, full-bleed media, compact item navigation, and a selected-content panel. This is an interaction reference, not a visual clone.

Dial: ENERGY 3 / RHYTHM 2 / MOTION 2.

- ENERGY 3: a strong opening screen with full-bleed media, high contrast, and a focused selection.
- RHYTHM 2: the home screen uses a launcher rail and lower-left content panel, while deeper sections keep their editorial contrast.
- MOTION 2: focus movement, hover transitions, and purposeful reveal states. No infinite decorative motion.

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
- Avatars: full round, because they represent compact circular objects.
- Shadows: solid offset shadows for focal elements only (hero portrait, featured project, assistant panel). No soft shadow on every component.

## Layout

- Home: a single fullscreen launcher shell with a compact icon rail, full-bleed media, lower-left selected content, one contextual CTA, and keyboard hints.
- Destination pages: Projects, About Me, and Contact reuse the launcher visual language while giving each action a real page.
- The home rail uses tiles because the user asked for a console-home interaction. The rail changes Hero state only; the CTA performs navigation.

## Content rules

- Use real project data from the API and real GitHub data from the API.
- No fabricated testimonials, statistics, or claims.
- Placeholders must be labeled as placeholders.
- Copy uses no em dash.

## Decision reasons

- Near-black background with blue light: matches the project page identity while keeping the content readable.
- Compact icon rail: makes destinations browseable without turning the homepage into a card grid.
- Full-bleed portrait: uses an existing real asset as the atmosphere and introduces the person before the copy.
- White active selection with blue emphasis: makes focus state legible against the dark media without coloring every control.
- Chatbot launcher: routes to a dedicated Nimo chat room instead of opening a floating widget, keeping the home screen focused and giving the conversation enough space to breathe.
- React Router destinations: make each launcher action a real page instead of a dead control or scroll-only illusion.
- Existing Bebas Neue and Plus Jakarta Sans: preserve the portfolio's recognizable voice while improving contrast against the darker shell.
- Shared destination shell: keep the Back to home control, dark canvas, sharp borders, and blue emphasis consistent across every route.
