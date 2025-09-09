# ClockWise

A full-stack invoice management dashboard built with Next.js 15, featuring authentication, CRUD operations, and real-time data visualization.

## Features

- **Authentication**: Secure login system with NextAuth v5 and bcrypt password hashing
- **Invoice Management**: Complete CRUD operations for invoices with form validation
- **Customer Management**: Customer database with invoice tracking and analytics
- **Dashboard Analytics**: Revenue charts, latest invoices, and key metrics
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Server actions for seamless data updates
- **Error Handling**: Comprehensive error boundaries and validation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with direct SQL queries
- **Authentication**: NextAuth v5 (credentials provider)
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript with Zod validation
- **Icons**: Heroicons
- **Fonts**: Inter (optimized with next/font)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm
- PostgreSQL database

### Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up your environment variables:
   ```bash
   # Create .env.local file
   POSTGRES_URL="your_postgresql_connection_string_with_ssl"
   NEXTAUTH_SECRET="your_nextauth_secret"
   ```

4. Seed the database:
   ```bash
   # Visit http://localhost:3000/seed after starting the dev server
   ```

### Development

```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Project Structure

```
app/
├── dashboard/           # Protected dashboard routes
│   ├── (overview)/     # Dashboard homepage with analytics
│   ├── invoices/       # Invoice CRUD operations
│   └── customers/      # Customer management
├── lib/                # Data layer and utilities
│   ├── actions.ts      # Server actions for data mutations
│   ├── data.ts         # Database query functions
│   ├── definitions.ts  # TypeScript type definitions
│   └── utils.ts        # Utility functions
├── login/              # Authentication pages
├── ui/                 # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── invoices/       # Invoice-related components
│   └── customers/      # Customer-related components
├── layout.tsx          # Root layout with metadata
└── page.tsx           # Landing page
auth.ts                 # NextAuth configuration
auth.config.ts         # Auth middleware configuration  
middleware.ts          # Route protection middleware
```

## Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Authentication and user management
- **Customers**: Client information and contact details
- **Invoices**: Invoice records with amounts, status, and dates
- **Revenue**: Monthly revenue tracking for analytics

## Authentication

- **Provider**: Credentials-based authentication with email/password
- **Security**: Passwords hashed with bcrypt
- **Protection**: Middleware protects all `/dashboard/*` routes
- **Session Management**: Handled automatically by NextAuth v5

## Key Features

### Invoice Management
- Create, read, update, and delete invoices
- Form validation with Zod schemas
- Search and pagination functionality
- Status tracking (pending/paid)

### Dashboard Analytics
- Revenue chart visualization
- Latest invoices overview
- Key metrics cards (total customers, invoices, amounts)
- Suspense loading states for better UX

### Error Handling
- Global error boundaries
- Form validation with user-friendly messages
- 404 pages for missing resources
- Database error handling

## Development Notes

- Uses direct SQL queries with the `postgres` package (no ORM)
- Server components by default with selective client components
- Optimistic UI updates with revalidation
- TypeScript path mapping with `@/*` imports
- Currency stored as cents, formatted for display

## Learning Resources

This project is based on the [Next.js Learn Course](https://nextjs.org/learn). It demonstrates modern Next.js patterns including:

- App Router architecture
- Server actions and mutations
- Streaming and Suspense
- Authentication and middleware
- Form validation and error handling