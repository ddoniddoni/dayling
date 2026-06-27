# Dayling

Cute 3D character-raising mobile WebView app built with Next.js App Router.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- three.js / React Three Fiber
- Capacitor WebView later

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
cp .env.example .env
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

Set `DATABASE_URL` in `.env`, then run:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

Open Prisma Studio:

```bash
npm run prisma:studio
```

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
