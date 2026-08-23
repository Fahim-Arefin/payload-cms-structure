# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 and Payload CMS 3 TypeScript application. Routes and API handlers live in `src/app`; Payload collections and globals are defined in `src/collections`, with central configuration in `src/payload.config.ts`. Reusable page sections are organized by feature under `src/blocks` (typically a schema, entry point, and `components/`). Shared UI belongs in `src/components`; hooks, contexts, utilities, types, and server helpers live in corresponding `src/*` directories. Static assets and PDF templates are stored under `public/`. Runtime uploads use `media/` and `resumes/` and should not be committed.

## Build, Test, and Development Commands

Use pnpm 9 or 10 with a supported Node version (`^18.20.2` or `>=20.9.0`).

- `pnpm install --frozen-lockfile` installs the exact locked dependencies.
- `pnpm dev` starts the local Next.js/Payload development server.
- `pnpm build` creates a production build and performs framework/type checks.
- `pnpm start` serves the production build.
- `pnpm lint` runs the configured Next.js ESLint rules.
- `pnpm generate:types` regenerates `src/payload-types.ts` after schema changes.
- `pnpm generate:importmap` refreshes Payload's admin import map.
- `docker compose up` starts the optional containerized local stack.

## Coding Style & Naming Conventions

Follow `.prettierrc.json`: two-space indentation, single quotes, no semicolons, trailing commas, and a 100-character print width. ESLint extends `next/core-web-vitals` and `next/typescript`; prefix intentionally unused variables with `_`. Use PascalCase for React components and block directories (`BasicHeroSection.tsx`), `useCamelCase` for hooks, camelCase for utilities, and Next.js route filenames such as `route.ts` and `layout.tsx`. Keep block schemas beside their rendering code.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Before submitting, run `pnpm lint` and `pnpm build`, then manually exercise affected pages, Payload admin workflows, and API routes. If adding tests, colocate them as `*.test.ts` or `*.test.tsx` and add the runner command to `package.json`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative, feature-focused subjects (for example, `Featured news block is done`). Prefer clearer forms such as `Fix review submission image upload`; keep each commit scoped to one concern. Pull requests should include a concise summary, validation steps, linked issue when applicable, and screenshots or recordings for visible UI changes. Call out schema, generated type, environment-variable, or migration impacts explicitly.

## Security & Configuration

Copy `.env.example` to `.env` for local setup. Never commit credentials, Payload secrets, database URIs, SMTP settings, or S3 keys. Document any new variable in `.env.example` using a safe placeholder.
