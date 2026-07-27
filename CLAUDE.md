# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClockWise is a client-only world-clock app: an interactive world map for selecting
time zones and a card grid that shows — and sets — the time in each. Built with
Vite 6, React 18, and TypeScript. No server, no database, no auth, no environment
variables.

## Development Commands

- `pnpm dev` - Start Vite dev server (http://localhost:5173)
- `pnpm build` - Type-check (`tsc -b`) and build production bundle to `dist/`
- `pnpm preview` - Serve the production build

No test framework is currently configured. `src/lib/time.ts` is pure and the
recommended place to start if tests are added.

## Architecture

### State (`src/App.tsx`)
- `selected` - ordered list of city ids; the first entry is the **anchor** zone
- `instant` - the single `Date` every card renders from
- `live` - when true, `instant` follows the wall clock (1s interval); setting a
  time via card input or scrubber sets `live` to false; "Now" re-enables it

### Time math (`src/lib/time.ts`)
- Pure helpers built on `Intl.DateTimeFormat` with real IANA zones — no date library
- `parts()` formats an instant in a zone; `offsetMs()` derives the UTC offset;
  `wallToInstant()` inverts wall-clock time to an instant (two passes settle DST)
- `subsolarPoint()` feeds the map's day/night terminator

### Map (`src/components/WorldMap.tsx`)
- `d3-geo` Natural Earth projection rendered as JSX SVG
- Country geometry fetched at runtime from jsDelivr (`world-atlas` 110m topojson)
- Terminator recomputed once per minute (memoized on minute key)

### Data (`src/data/cities.ts`)
- 34 cities with id, display name, country, IANA zone, lat/lon

### Key Patterns
- `@/*` path alias → `./src/*` (tsconfig + vite.config)
- All styling in `src/styles/app.css` — CSS custom properties, no framework
- TypeScript strict mode; `pnpm build` runs the type-check
