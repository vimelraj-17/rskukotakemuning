# Residensi Lestari Fasa 2 property selector

Responsive property information and unit-selection experience for Residensi Lestari Fasa 2. The production dataset contains 79 owner-approved available units as at 23 July 2026. Each published unit is reconciled to the current unit-number allocation and current car park plans.

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
| Unit inventory | `src/data/units.ts` | Do **not** hand-edit identifiers. Re-import from the approved allocation source and validate before publishing. |

To regenerate the approved inventory, run `node scripts/import-approved-units.mjs "/path/to/approved-allocation.pdf"`. For additional units, fill in `data/templates/units-template.csv` using `data/templates/UNITS_CSV_TEMPLATE.md`, then complete the same zero-tolerance reconciliation.

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
- `src/data` — structured approved project and inventory data
- `src/types` — reusable property-domain types
- `src/styles` — design tokens and responsive global styles
- `src/utils` — framework-independent helpers
- `src/test` — test setup and checks

## GitHub Pages

Production builds default to `/rskukotakemuning/`, matching the repository's GitHub Pages project path. Set `VITE_BASE_PATH` to override it for a different deployment target. The Pages workflow sets the value from the repository name and deploys only from `main` or a manual run.

The experience intentionally uses one document with section anchors and no client-side browser router, avoiding deep-link fallback problems on GitHub Pages.

## Data safety

Never ingest the red legacy-number field from the current car-park allocation schedule. The production importer captures only current unit identifiers and later fields, requires the 79 approved chart-marked records, and rejects duplicate or malformed unit/parking data.

The brochure uses optimized copies of owner-approved project renders, floor plans and the location diagram in `public/images`. Artist-impression and confirmation notices remain visible.

The guided selector reads layouts, packages, compatibility, inclusions and pricing from `src/data`. Valid layout/package choices are stored under `residensi-lestari-selection-v1`; unknown or incompatible saved values are removed before use.

See `PRELAUNCH_QA.md` for final release coverage and reconciliation evidence.
