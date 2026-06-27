# Capacitor WebView Notes

Dayling uses Next.js Route Handlers, Prisma, PostgreSQL, and HTTP-only auth cookies.
For the MVP, the native app should load a running Next.js server URL in Capacitor WebView.

## Server URL Mode

`capacitor.config.ts` reads `CAPACITOR_SERVER_URL`.

Examples:

```bash
CAPACITOR_SERVER_URL=http://localhost:3000 npm run cap:sync:ios
CAPACITOR_SERVER_URL=http://10.0.2.2:3000 npm run cap:sync:android
CAPACITOR_SERVER_URL=https://your-dayling-domain.example npm run cap:sync
```

Use:

- `http://localhost:3000` for iOS Simulator when the Next dev server runs on the same Mac.
- `http://10.0.2.2:3000` for Android Emulator.
- A LAN IP or deployed HTTPS URL for physical devices.

HTTP URLs are allowed for local development through `server.cleartext`.
Use HTTPS for production builds.

## Local Static Build

A plain static `webDir` build is not enough for the current MVP because the app depends on:

- `/api/hatch`
- `/api/me/character`
- `/api/care`
- `/api/diary`
- Prisma database access
- HTTP-only session cookies

`capacitor/www/index.html` exists only as a fallback copied asset so Capacitor can sync native shells.
It is not the production app bundle.

## Safe Area

The app uses:

- `viewport-fit=cover` in Next viewport metadata.
- `.safe-screen` CSS with `env(safe-area-inset-*)`.
- Capacitor iOS `contentInset: "automatic"`.

## Android Back Button

The MVP relies on Capacitor WebView's default navigation behavior.
If later flows need custom exit confirmation or tab-level navigation, add `@capacitor/app` and handle `backButton` in a small client-only module.

## Session Persistence

Auth uses an HTTP-only `dayling_session` cookie.
In WebView URL mode, cookie persistence belongs to the native WebView cookie store for that server origin.
Changing `CAPACITOR_SERVER_URL` changes the cookie origin and will require logging in again.
