# AGENTS.md

## Project Overview

This project is a cute 3D character-raising mobile WebView app.

The app is built with:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- three.js
- React Three Fiber
- Capacitor WebView

The core experience is:

1. User signs up or logs in.
2. First-time user selects an egg.
3. The egg hatches immediately.
4. The server randomly gives one character based on a probability table.
5. The user raises the character by writing diaries and using care actions.
6. The main screen shows a large 3D character that can be rotated by touch drag.

---

## Required Reading Order

Before implementing anything, read the documents in this order:

1. `PRD.md`
2. `TASKS.md`
3. `AGENTS.md`

`PRD.md` contains the product requirements.

`TASKS.md` contains the implementation checklist and development order.

`AGENTS.md` contains coding rules and project conventions.

---

## Core Development Rules

Follow these rules strictly.

### General

- Build the MVP first.
- Do not add unnecessary advanced features before the MVP works.
- Keep the structure easy to extend.
- Prefer simple, maintainable code.
- Use TypeScript everywhere.
- Use clear names for files, functions, components, and types.
- Do not hardcode business logic in UI components.
- Put reusable logic into utility files or feature modules.

---

## Framework Rules

### Next.js

- Use Next.js App Router.
- Use the `src/app` directory.
- Use Route Handlers for API routes.
- Use Server Components by default.
- Use Client Components only when interaction, browser APIs, animation, or React state is required.
- Keep pages thin.
- Move UI and logic into components and feature modules.

### TypeScript

- Avoid `any`.
- Define explicit types for API responses.
- Define explicit types for domain entities.
- Use discriminated union types where useful.
- Keep shared types in feature-level `*.types.ts` files.

### Styling

- Use Tailwind CSS.
- UI should feel cute, soft, rounded, and pastel.
- Use mobile-first responsive design.
- Consider safe-area padding for WebView environments.
- Buttons should be large enough for mobile touch.

### 3D

- Use three.js through React Three Fiber.
- Use `@react-three/fiber`.
- Use `@react-three/drei` when helpful.
- Use GLB or GLTF models.
- Main character area should support touch drag rotation.
- Provide a fallback placeholder character if real 3D models are missing.
- Keep 3D rendering isolated in character components.
- Do not load 3D Canvas globally.
- Render 3D Canvas only where needed.

---

## Authentication Rules

- Users must sign up and log in.
- After login, check whether the user owns a main character.
- If the user does not own a character, redirect to egg onboarding.
- If the user already owns a character, redirect to home.
- Protected routes should not be accessible without authentication.

---

## Probability Rules

Character hatching must be handled on the server.

Never calculate or decide hatch results on the client.

The client may display probability information, but the actual result must come from the server.

Initial character probability table:

| Rarity | Count | Total Probability | Per Character |
|---|---:|---:|---:|
| COMMON | 10 | 80% | 8% |
| RARE | 3 | 15% | 5% |
| UNIQUE | 1 | 4% | 4% |
| LEGENDARY | 1 | 1% | 1% |

Rules:

- Probability sum must be exactly 100.
- One first-time user can hatch only once.
- Hatch result must be saved in the database.
- Hatch history must be saved separately.
- Do not trust character IDs sent from the client.
- The server chooses the character.

---

## Diary Rules

- Experience points can only increase through diary writing.
- Diary must have at least 3 non-empty lines.
- Empty lines do not count.
- Client-side validation is for UX only.
- Server-side validation is mandatory.
- User can write multiple diaries per day.
- Experience points are granted only once per day.
- Valid diary grants 30 EXP.
- First diary ever grants an additional 20 EXP.

---

## Care Action Rules

Supported care actions:

- Feed
- Water
- Pet
- Touch character

Each care action should:

1. Validate authentication.
2. Find the user's main character.
3. Check cooldown.
4. Update character status.
5. Save action log.
6. Return updated character state.
7. Trigger corresponding animation on the client.

Care action cooldowns:

| Action | Cooldown |
|---|---:|
| FEED | 30 minutes |
| WATER | 30 minutes |
| PET | 10 minutes |
| TOUCH | 10 seconds |

Status values must stay between 0 and 100.

---

## Database Rules

Use Prisma.

Core models:

- User
- CharacterCatalog
- UserCharacter
- EggHatch
- DiaryEntry
- CareActionLog

Use enums:

- Rarity
- CareActionType

Seed the initial 15 characters.

---

## API Rules

Required API routes:

- `POST /api/hatch`
- `GET /api/me/character`
- `POST /api/diary`
- `POST /api/care`

All API routes must:

- Validate authentication.
- Validate request body.
- Return clear JSON responses.
- Return proper error codes.
- Never expose unnecessary internal database fields.

---

## UI Rules

Main screen layout:

- Top 15%: character status and EXP bar
- Middle 70%: large 3D character area
- Bottom 15%: care action buttons

Main screen should include:

- Character name
- Level
- EXP bar
- 3D character
- Feed button
- Water button
- Pet button
- Diary button

3D character behavior:

- Idle animation by default
- Drag to rotate
- Touch to play happy animation
- Feed action plays eat animation
- Water action plays drink animation
- Pet action plays happy animation
- Level up plays level-up animation

---

## File Structure Rules

Prefer this structure:

```txt
src/
  app/
  components/
  features/
  lib/
  store/
  styles/

prisma/
  schema.prisma
  seed.ts

public/
  models/
  images/
```

Keep feature logic grouped by domain.

Example:

```txt
features/
  character/
  diary/
  care/
  hatch/
```

---

## MVP First Policy

The first working version must include:

- Sign up
- Login
- Protected routing
- Egg selection
- Hatch API
- Character probability table
- Character save
- Main character screen
- EXP bar
- Diary writing
- EXP gain
- Level up
- Feed action
- Water action
- Pet action
- 3D placeholder character
- Mobile-friendly layout

Do not block MVP development because real 3D models are missing.

Use placeholder 3D geometry first.

---

## Error Handling Rules

Use clear error messages.

Examples:

- `UNAUTHORIZED`
- `CHARACTER_ALREADY_EXISTS`
- `CHARACTER_NOT_FOUND`
- `INVALID_DIARY_LINE_COUNT`
- `CARE_ACTION_COOLDOWN`
- `INVALID_ACTION_TYPE`
- `PROBABILITY_TABLE_INVALID`

---

## Final Goal

Create a working MVP that can run locally and can later be packaged as a mobile app using Capacitor WebView.

After MVP completion, the project should be easy to extend with:

- More characters
- More eggs
- Character evolution
- Inventory
- Shop
- Push notifications
- Attendance rewards
- Ads
- Friend visits
