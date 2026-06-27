# Dayling Style Guide

Dayling is a cute 3D character-raising diary app for mobile WebView. The UI should feel cozy, warm, soft, and emotionally centered on the character.

## Design Principles

- Mobile-first and thumb-friendly.
- Cute and soft, but not cluttered.
- The character area is the emotional center of every screen.
- Korean copy should be warm, short, and clear.
- Use simple UI states that are easy to extend into the MVP logic later.

## Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `background` | `#FFF8F0` | App background |
| `primary` | `#FF9FB2` | Primary CTA, selected states |
| `secondary` | `#FFD6A5` | Warm highlights, cards |
| `accent` | `#BDE0FE` | Informational accents |
| `success` | `#CAFFBF` | Positive feedback |
| `text` | `#3A2E2E` | Main text |
| `surface` | `#FFFFFF` | Cards, inputs, modals |
| `muted` | `#8F7D7D` | Secondary text |

## Typography

- Use the app font from Next.js layout.
- Page title: `text-3xl font-black leading-tight`.
- Section title: `text-lg font-black`.
- Body: `text-sm` or `text-base leading-7`.
- Buttons: `text-sm` or `text-base font-black`.
- Avoid negative letter spacing and viewport-based font scaling.

## Spacing

- Screen padding: `px-5 py-6`.
- Card padding: `p-4` or `p-5`.
- Dense control gap: `gap-2`.
- Form gap: `gap-4`.
- Page section gap: `gap-5` to `gap-7`.

## Radius

- Cards and modals: `rounded-[24px]`.
- Inputs: `rounded-[18px]`.
- Small chips and badges: `rounded-full`.
- Fixed visual tiles may use `rounded-[20px]`.

## Shadows

- Default card: `shadow-[0_12px_30px_rgba(255,159,178,0.18)]`.
- Raised CTA: `shadow-[0_10px_22px_rgba(255,159,178,0.28)]`.
- Modal: `shadow-[0_-18px_40px_rgba(58,46,46,0.18)]`.

## Buttons

- Minimum height `48px`.
- Primary button uses `primary` background and white text.
- Secondary button uses white/surface with warm border.
- Disabled state lowers opacity and blocks pointer actions.

## Inputs

- Minimum height `52px`.
- White surface, warm border, strong focus ring.
- Labels should sit above inputs for mobile readability.

## Cards

- Use white or lightly tinted surfaces.
- Keep cards purposeful: forms, repeated items, panels.
- Do not nest decorative cards inside other cards.

## Modals

- Bottom sheet on mobile.
- Rounded top corners and safe-area bottom padding.
- Use concise titles and direct controls.

## Toasts

- Fixed near top safe area.
- Rounded, high contrast, short copy.
- Use success/error/info tones.

## EXP Progress Bar

- Rounded track with warm pink fill.
- Show numeric EXP nearby.
- Keep height between `10px` and `12px`.

## Status Chip

- Compact pill with label and value.
- Use varied pastel backgrounds.
- Keep labels Korean and short.

## Rarity Badge

- `COMMON`: soft green.
- `RARE`: soft blue.
- `UNIQUE`: soft purple.
- `LEGENDARY`: warm amber/pink.
- Always use uppercase rarity text.

## Bottom Action Button

- Four equal-width buttons.
- Large enough for touch.
- Icon-like large glyph or short Korean label.
- Selected/pressed state should feel soft, not sharp.

## 3D Character Area

- Large central stage.
- Use a placeholder 3D-feeling character until GLB/GLTF assets exist.
- Include short hints below or over the stage.
- The stage should not be dark, neon, or visually heavy.

## Mobile Safe Area

- Use `.safe-screen` on page roots.
- Bottom controls must respect `env(safe-area-inset-bottom)`.
- Avoid tiny tap targets near screen edges.

## Things To Avoid

- Corporate dashboard styling.
- Dark/neon palettes.
- Overly childish clutter.
- Small text-heavy controls.
- Hidden primary actions.
- Business logic embedded in UI components.
