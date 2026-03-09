# Forecast Wine

Biodynamic wine calendar PWA — tells users if today is a good day to drink wine based on lunar cycles.

## Stack
- Next.js 16 (App Router), TypeScript, Tailwind v4, shadcn/ui
- Font: **Outfit** (Google Fonts, `--font-outfit`)
- `astronomy-engine` for lunar ephemeris
- Hosting: Vercel
- Analytics: PostHog (via reverse proxy)

## Key Files
- `src/lib/calendar.ts` — biodynamic calendar logic, `getForecast()`, `DayPeriod`, `ForecastDay`
- `src/lib/unfavourable.ts` — unfavourable period detection (nodes, perigee, transitions)
- `src/lib/i18n.ts` — EN/ES dictionaries, date formatting functions
- `src/components/day-card.tsx` — hero card + compact card
- `src/components/forecast-strip.tsx` — forecast list with upcoming section
- `src/components/forecast-page.tsx` — main page layout
- `src/components/analytics.tsx` — PostHog client init

## Analytics (PostHog)
- Key in env var `NEXT_PUBLIC_POSTHOG_KEY` (`.env.local` locally, Vercel env vars in prod)
- Reverse proxy: `fw.forecastwine.com` → PostHog managed proxy
- `api_host: "https://fw.forecastwine.com"`, `ui_host: "https://eu.i.posthog.com"`
- Captures: pageview + pageleave. Autocapture, session recording, heatmaps disabled.
- Never commit PostHog keys to git — always use env vars

## Design
- Colors: burgundy (#800020) for "Yes"/fruit, grey (#c4c0b8) for "No", type-specific dots
- Hero: centered layout, no card background, type illustration in circle
- Compact cards: simple list rows with border separator, dot + type + rating
- Type images: watercolor illustrations for fruit/flower/leaf/root (emoji fallback)
- "Best moment": shows best drinking window with practical-hours check (10am+)
- Yes/No verdict: based on whether practical good window exists

## Conventions
- No co-author lines in commits
- No emojis in UI text
- Spanish locale used primarily for testing
- Hour format: am/pm for English, 24h for Spanish
- `public/icons/icon.svg` — exists locally but not in git
- `src/app/favicon.ico` — custom favicon, must stay in repo
- `.env*` in `.gitignore`
