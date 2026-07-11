# appshome

Standalone homepage extracted from [bento-portfolio](../bento-portfolio). Renders the bento grid landing page only — no `/projects`, `/designs`, or `/blog` routes.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cross-app navigation

Links to Projects, Designs, and Blog point at the main portfolio app via `NEXT_PUBLIC_PORTFOLIO_URL`. Copy `.env.example` to `.env.local` and set the base URL when running appshome separately:

```bash
# appshome on :3000, bento-portfolio on :3001
NEXT_PUBLIC_PORTFOLIO_URL=http://localhost:3001
```

Leave empty when both apps are served behind the same domain or reverse proxy.

## Build

```bash
npm run build
npm start
```

## Extracted from

Homepage dependency tree from `bento-portfolio/app/page.tsx` and `app/layout.tsx` — 31 source files, public assets under `public/lang/`, `public/tech/`, plus `pfp.png` and resume PDF.
