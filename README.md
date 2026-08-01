<p align="center">
  <img src="public/brand/mark.png" alt="ClockWise" width="96" height="96" />
</p>

<h1 align="center">ClockWise</h1>

<p align="center">Pick zones on the map · set one time · read them all</p>

A world clock for people who work across time zones. Pick cities on an interactive
world map, set one time, and read it in every selected zone.

## Features

- **World map zone selector**: Natural Earth map rendered as SVG with clickable city
  markers and a live day/night terminator
- **Zone cards**: Per-city time, DST-correct UTC offset, zone abbreviation, offset
  versus the anchor zone, and a 24-hour day strip; drag the grip to reorder cards
- **Anchor zone**: The first card is the anchor all deltas are measured against —
  drag a card to the front or click **Set anchor** on it to switch
- **Set any time**: The scrubber sets the anchor zone's wall-clock time and every
  card follows — "if it's 3 PM in Berlin, what is it in Tokyo?"
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

## Branding

The mark is a networked globe — the same idea as the app: one world, many points
on it kept in sync. It is drawn in the app's amber (`--amber`, `#e9b84f`) on the
ink background (`--ink`, `#0c0f12`).

| Asset | Use |
| --- | --- |
| `public/favicon.ico` (16/32/48) | browser tab |
| `public/favicon-16.png`, `favicon-32.png` | modern PNG favicons |
| `public/apple-touch-icon.png` (180) | iOS home screen |
| `public/icon-512.png` | manifest icon + social card |
| `public/brand/mark.png` (128) | header mark, README |
| `public/brand/mark-amber.png`, `mark-mono.png` (512) | full-size amber / white marks on transparent |

The header mark is the PNG applied as a CSS mask (`.mark` in `src/styles/app.css`),
so it takes its color from `--amber` and re-tints with the palette.

## Project Structure

```
index.html                     entry + font links + meta
public/                        favicons, manifest, brand marks
vite.config.ts                 react plugin, @ → src alias
src/
├── main.tsx                   createRoot
├── App.tsx                    state: selected zones / instant / live
├── components/
│   ├── WorldMap.tsx           SVG map, markers, day-night terminator
│   ├── ZoneCard.tsx           per-zone card: reorder grip, set-anchor
│   └── DayBar.tsx             24-hour strip
├── lib/time.ts                Intl timezone helpers (pure, unit-testable)
├── data/cities.ts             34 cities with IANA zones
└── styles/app.css             all styling
```

## Notes

- The map fetches `world-atlas` from jsDelivr at runtime; vendor it into `public/`
  if an offline or CSP-restricted build is required.
- Deploying to Vercel: framework preset **Vite**, output directory `dist`.
