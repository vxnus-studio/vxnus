# VXNUS

VXNUS is a creative technology studio exploring artificial intelligence, intelligent characters, and interactive systems. The public site presents the studio, its work, and research findings, with a private admin workspace for editorial operations.

## Tech Stack

- **Framework:** Next.js (App Router) & React 19
- **Database:** Neon Serverless PostgreSQL with Drizzle ORM
- **Authentication:** Neon Auth
- **Styling:** Tailwind CSS
- **Monorepo:** npm workspaces (`packages/ui-game`)

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Copy `.env.example` to `.env.local` and set your credentials:
   ```bash
   cp .env.example .env.local
   ```
   Required variables:
   - `NEXT_PUBLIC_SITE_URL`: Canonical site URL (e.g. `http://localhost:3000`)
   - `DATABASE_URL`: Neon PostgreSQL connection string
   - `NEXT_PUBLIC_NEON_AUTH_BASE_URL`: Neon Auth API URL
   - `NEON_AUTH_BASE_URL`: Neon Auth API URL (server-side)
   - `NEON_AUTH_COOKIE_SECRET`: 32-character random session secret

3. **Database initialization:**
   ```bash
   # Push schema to database
   npm run db:push

   # Push schema and seed profile data
   npm run db:setup
   ```

4. **Create admin user:**
   ```bash
   npm run user:create <email> <password> [name]
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` for the public site, or `/admin/login` for the editorial dashboard.

## Workspaces & Packages

- `packages/ui-game`: Themeable game UI and knowledge chrome components (`@vxnus/ui-game`).
  ```bash
  npm run build:packages
  ```

## Quality Checks

```bash
npm run lint       # Run ESLint
npx tsc --noEmit   # Type check
npm run build      # Production build
```
