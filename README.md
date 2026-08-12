# Residensi Lestari Fasa 2 property selector

Responsive property information and unit-selection experience for Residensi Lestari Fasa 2. The current checkpoint is the maintainable React, TypeScript and Vite foundation; production inventory remains blocked by the exceptions in `SOURCE_RECONCILIATION_REPORT.md`.

The original `READ ME` note is preserved.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

## Structure

- `src/components` — reusable interface components
- `src/data` — structured confirmed, pending-approval and demo project data
- `src/types` — reusable property-domain types
- `src/styles` — design tokens and responsive global styles
- `src/utils` — framework-independent helpers
- `src/test` — test setup and checks

## GitHub Pages

Production builds default to `/rskukotakemuning/`, matching the repository's GitHub Pages project path. Set `VITE_BASE_PATH` to override it for a different deployment target. The Pages workflow sets the value from the repository name and deploys only from `main` or a manual run.

The experience intentionally uses one document with section anchors and no client-side browser router, avoiding deep-link fallback problems on GitHub Pages.

## Data safety

Do not add production unit, availability or parking-highlight data until all blocking exceptions in the source reconciliation report are resolved. Never ingest the red legacy-number field from the current car-park allocation schedule.

The current inventory layer runs in `DEMO DATA` mode with three synthetic unit records; the public brochure does not present them as inventory. See `data/templates/UNITS_CSV_TEMPLATE.md` and `data/templates/units-template.csv` for the unit-import handoff format. Run-time cross-record checks live in `src/utils/validatePropertyData.ts` and must pass before any dataset is published.

The brochure uses optimized copies of supplied project renders in `public/images`. Each render is described as an artist's impression. Approved standalone floor plans and a verified location map are represented by accessible placeholder blocks until authoritative assets arrive.
