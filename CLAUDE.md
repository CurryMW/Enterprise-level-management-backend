# CLAUDE.md

## Project Overview

Enterprise-level management backend — a React admin dashboard template built with React 19, TypeScript, Ant Design 6, and Vite 8.

## Tech Stack

- **Framework**: React 19 + TypeScript 5.9
- **UI Library**: Ant Design 6
- **Build Tool**: Vite 8
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios (wrapped in `src/utils/request.ts`)
- **Styling**: Less + CSS
- **Package Manager**: pnpm

## Project Structure

```
src/
├── api/          # API request modules
├── assets/       # Static assets
├── components/   # Shared components
├── hooks/        # Custom React hooks
├── router/       # Route configuration (react-router-dom)
├── store/        # State management
├── types/        # TypeScript type definitions
├── utils/        # Utilities (request.ts, storage.ts)
└── views/        # Page components (login, etc.)
```

## Commands

- `pnpm dev` — Start dev server (development mode)
- `pnpm build` — Type-check and build for production
- `pnpm lint` — Run ESLint
- `pnpm preview` — Preview production build

## Development Notes

- API proxy: `/api` requests are proxied to the Apifox mock server in development (configured in `vite.config.ts`)
- Environment variables use `VITE_` prefix (Vite convention), defined in `.env.development`
- Strict TypeScript config: `noUnusedLocals`, `noUnusedParameters` enabled
- Code and comments are written in Chinese
