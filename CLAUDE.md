# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 App Router dashboard application built from the Next.js Learn Course starter template. It demonstrates a full-stack invoice management system with PostgreSQL database integration.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server

No test framework is currently configured.

## Architecture

### Database Layer
- Uses `postgres` package for direct SQL queries (not an ORM)
- Database connection configured via `POSTGRES_URL` environment variable with SSL required
- Main entities: Users, Customers, Invoices, Revenue
- Database seeding available via `/seed` API route

### Data Layer (`app/lib/`)
- `definitions.ts` - TypeScript interfaces for all data models
- `data.ts` - Database query functions using postgres package
- `utils.ts` - Utility functions for currency formatting, date formatting, pagination
- `placeholder-data.ts` - Seed data for development

### UI Architecture (`app/ui/`)
- Component-based structure organized by feature:
  - `dashboard/` - Dashboard-specific components (cards, charts, navigation)
  - `invoices/` - Invoice management components (forms, tables, status)
  - `customers/` - Customer-related components
- Uses Tailwind CSS for styling with custom global styles in `global.css`
- Heroicons for iconography

### Key Patterns
- Server Components by default (Next.js App Router)
- Direct SQL queries with postgres package, no ORM
- TypeScript path mapping with `@/*` for imports
- Pagination with 6 items per page constant
- Currency stored as cents in database, formatted for display

### Environment Requirements
- `POSTGRES_URL` - PostgreSQL connection string (required, must use SSL)

### Authentication
Uses NextAuth v5 beta - authentication files not present in current codebase snapshot.