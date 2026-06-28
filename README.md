# Dayling

Dayling is a cute 3D character-raising mobile WebView MVP built with Next.js App Router.

Users sign up, choose an egg, receive a server-drawn character, and raise that character by writing diaries and using care actions.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- three.js / React Three Fiber
- Capacitor WebView

## MVP Status

Implemented:

- Email/password signup, login, logout, and protected routing
- Egg onboarding and server-side hatch draw
- Character probability table and hatch history
- Main character screen with React Three Fiber placeholder
- Touch drag rotation and action animations
- Feed, water, pet, and touch care actions
- Diary writing, daily EXP grants, and level-up handling
- Capacitor iOS/Android shell setup

Known follow-up fixes are tracked in `TASKS.md` and `docs/future-todo.md`.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
cp .env.example .env
```

Fill the Prisma connection values in `.env`.
For Supabase, copy the Prisma connection strings from:

```txt
Supabase Dashboard > Project > Connect > ORMs > Prisma
```

You need:

- `DATABASE_URL`: pooled app query connection
- `DIRECT_URL`: direct or migration connection
- `AUTH_SECRET`: long random string for signed auth cookies

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

After `.env` is ready, generate Prisma Client, run migrations, and seed the initial 15 characters:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

Open Prisma Studio:

```bash
npm run prisma:studio
```

## Verification

Run these before merging a feature branch:

```bash
npm test
npm run lint
npm run build
```

Optional formatting check:

```bash
npm run format:check
```

If `format:check` reports older project-wide formatting drift, format only the files touched by the current branch before committing.

## Capacitor WebView

Dayling uses Next.js Route Handlers, Prisma, and PostgreSQL, so the native shell should load a running Next.js server URL.

Install native platforms after dependencies are installed:

```bash
npm run cap:sync
```

Open native projects:

```bash
npm run cap:open:ios
npm run cap:open:android
```

Set the WebView target URL when needed:

```bash
CAPACITOR_SERVER_URL=http://localhost:3000 npm run cap:sync:ios
CAPACITOR_SERVER_URL=http://10.0.2.2:3000 npm run cap:sync:android
```

Use your machine LAN IP or a deployed HTTPS URL for real devices.
See `docs/capacitor.md` for WebView mode notes.

## Git Flow

Daily development happens on `develop`.

For each phase:

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/short-description
```

After implementation and verification:

```bash
git commit -m "feat(scope): describe change"
git push -u origin feature/short-description
git checkout develop
git merge --ff-only feature/short-description
git push origin develop
```

Use Conventional Commits as described in `AGENTS.md`.

## VS Code

Open the project:

```bash
code ~/dev/dayling
```

Recommended extensions and tasks are configured in `.vscode/`.

## Project Docs

Read in this order before implementation:

1. `PRD.md`
2. `TASKS.md`
3. `AGENTS.md`

Additional docs:

- `design/style.md`: mobile WebView visual direction
- `docs/capacitor.md`: Capacitor WebView packaging notes
- `docs/future-todo.md`: next fixes and post-MVP ideas
