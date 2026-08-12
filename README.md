# Residensi Lestari Fasa 2 property selector

Responsive property information and unit-selection experience for Residensi Lestari Fasa 2. Production inventory remains blocked by the exceptions in `SOURCE_RECONCILIATION_REPORT.md`; the selector currently uses three clearly labelled synthetic records.

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
npm run verify:pages
npm run preview
```

## Simple content editing

The website keeps public content in a few central files so wording and data are not scattered through React components.

| What to update | File | Owner guidance |
| --- | --- | --- |
| Project name and WhatsApp number | `src/data/project.ts` | Keep the Malaysian country code. The website removes `+`, spaces and dashes when it creates the `wa.me` link. |
| Brochure wording, fact cards and image descriptions | `src/data/brochure.ts` | Edit text inside quotation marks. Preserve every `href` beginning with `#` unless the matching page section is also changed. |
| Layout sizes and starting prices | `src/data/layouts.ts` | Use whole MYR amounts without commas, for example `250000`. Do not add bedrooms or bathrooms until approved. |
| Package pricing and inclusions | `src/data/packages.ts` | Keep base price, upgrade addition and total internally consistent. A package must refer to an existing layout ID. |
| Facilities, location and eligibility | `src/data/facilities.ts`, `location.ts`, `eligibility.ts` | Publish only approved information. Keep qualification wording framed as preliminary. |
| Images used on the page | `public/images` and `src/data/brochure.ts` | Prefer compressed WebP images. If the filename changes, update the corresponding `image` value and write useful alternative text in `imageAlt`. |
| Unit inventory | `src/data/units.demo.ts` | Do **not** replace this by hand with production inventory. Use the CSV handoff below and complete reconciliation first. |

For additional units, fill in `data/templates/units-template.csv` using the instructions in `data/templates/UNITS_CSV_TEMPLATE.md`. Give the completed file to the developer for validation and import. Unit IDs, unit positions, car-park bays, car-park levels, types and orientations must match the approved source records exactly.

After any content change, run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run verify:pages
```

Do not publish if any command fails. Merge the approved feature branch into `main` to trigger the GitHub Pages deployment. A manual workflow run can also deploy a chosen ref for a release smoke test.

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

The current inventory layer runs in `DEMO DATA` mode with three synthetic unit records; the selector identifies them as synthetic and says they cannot be reserved. See `data/templates/UNITS_CSV_TEMPLATE.md` and `data/templates/units-template.csv` for the unit-import handoff format. Run-time cross-record checks live in `src/utils/validatePropertyData.ts` and must pass before any dataset is published.

The brochure uses optimized copies of supplied project renders in `public/images`. Each render is described as an artist's impression. Approved standalone floor plans and a verified location map are represented by accessible placeholder blocks until authoritative assets arrive.

The guided selector reads layouts, packages, compatibility, inclusions and pricing from `src/data`. Valid layout/package choices are stored under `residensi-lestari-selection-v1`; unknown or incompatible saved values are removed before use.

See `PRELAUNCH_QA.md` for the final checkpoint coverage, results, environment limitation and remaining launch blockers.
