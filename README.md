# ClockWise

A world clock for people who work across time zones. Pick cities on an interactive
world map, set one time, and read it in every selected zone.

## Features

- **World map zone selector**: Natural Earth map rendered as SVG with clickable city
  markers and a live day/night terminator
- **Zone cards**: Per-city time, DST-correct UTC offset, zone abbreviation, offset
  versus the anchor zone, and a 24-hour day strip
- **Set any time**: A time input on each card (or the scrubber) re-anchors every zone
  to the same instant — "if it's 3 PM in Berlin, what is it in Tokyo?"
- **Live mode**: "Now" snaps everything back to the current time, ticking every second
- **Real IANA time zones**: All timezone math is `Intl.DateTimeFormat` — no date
  library, DST handled by the browser

## Tech Stack

- **Framework**: Vite 6 + React 18
- **Language**: TypeScript (strict)
- **Map**: `d3-geo` + `topojson-client`, Natural Earth 110m geometry from jsDelivr
- **Styling**: hand-authored CSS (`src/styles/app.css`)
- **Fonts**: IBM Plex Sans / IBM Plex Mono via Google Fonts

No server, no database, no environment variables — the app is fully client-side.

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check + production build to dist/
pnpm preview    # serve the production build
```

## Project Structure

```
index.html                     entry + font links + meta
vite.config.ts                 react plugin, @ → src alias
src/
├── main.tsx                   createRoot
├── App.tsx                    state: selected zones / instant / live
├── components/
│   ├── WorldMap.tsx           SVG map, markers, day-night terminator
│   ├── ZoneCard.tsx           per-zone card + time input
│   └── DayBar.tsx             24-hour strip
├── lib/time.ts                Intl timezone helpers (pure, unit-testable)
├── data/cities.ts             34 cities with IANA zones
└── styles/app.css             all styling
```

## Notes

- The map fetches `world-atlas` from jsDelivr at runtime; vendor it into `public/`
  if an offline or CSP-restricted build is required.
- Deploying to Vercel: framework preset **Vite**, output directory `dist`.
