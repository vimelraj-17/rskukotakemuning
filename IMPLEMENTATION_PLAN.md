# Implementation Plan: Residensi Lestari Fasa 2

## Current repository assessment

The `main` branch has one initial commit and one tracked file: `READ ME`. Its note describes the repository as a future closing sheet for Lestari. There is no existing technology stack to extend and no useful application code to replace.

This plan intentionally stops before major implementation.

## Proposed branch

Use `feature/property-selector` from the latest `main`, as requested for implementation. The branch was created for the Phase 1 foundation checkpoint.

Keep planning changes separate from application implementation. Use focused commits and open a draft pull request early so content, data, accessibility, and UI decisions can be reviewed incrementally.

## Proposed technology

This is a recommendation, not an existing repository choice.

| Area | Proposal | Reason |
| --- | --- | --- |
| Application | React with TypeScript | Suitable for a multi-step, stateful selection and calculator experience while keeping data contracts explicit. |
| Build tool | Vite | Produces a static build that is straightforward to host on GitHub Pages. |
| Styling | Project-owned CSS with design tokens | Keeps the visual system original, lightweight, responsive, and independent of the reference site. |
| Data | Validated JSON or TypeScript data modules | Separates approved project, package, layout, and unit records from UI components. |
| Unit plan | Accessible HTML/SVG overlay or semantic grid, chosen after assets arrive | Supports interactive hit targets without relying on raster images alone. |
| Unit state | React state with optional URL-safe selection parameters | Keeps the visitor's selection consistent across sections and may allow safe sharing without a backend. |
| Testing | Vitest and Testing Library; Playwright for critical browser journeys | Covers calculations, filters, state transitions, accessibility behavior, and responsive flows. |
| Quality | ESLint, Prettier, and TypeScript checks | Establishes a consistent baseline in a new repository. |
| Deployment | GitHub Actions to GitHub Pages | Automates repeatable static builds and deployment from approved branches. |

Avoid a client-side router unless separate routes provide a clear benefit. A single-page section journey is simpler for GitHub Pages and matches the requested sequence. If routes are introduced, configure a GitHub Pages-compatible fallback and repository base path.

## Proposed information architecture

1. Header and mobile navigation
2. Landing hero
3. Project information
4. Layout comparison
5. Package comparison
6. Unit selection workspace
7. Selection summary
8. Mortgage calculator
9. WhatsApp call to action
10. Legal notices and footer

The precise labels and content order should be validated against supplied sales materials and must not be copied from the reference website.

## Proposed data contracts

Define and validate these records before building UI around them:

- `Project`: approved name, summary, facts, address, tenure, timeline, facilities, eligibility text, and notices.
- `Layout`: stable ID, public name, size, bedroom/bathroom counts, features, plan asset, and alternative text.
- `Package`: letter A/B/C, Basic/Upgrade type, base price, upgrade addition, computed total, approved inclusions/exclusions, and display order.
- `Unit`: stable ID, block, floor, stack, layout ID, package ID, price in MYR, position, status, and any approved orientation or parking attributes.
- `Selection`: selected unit ID plus derived layout, package, and price information; derived values must not be duplicated as editable state.
- `MortgageScenario`: property price, loan margin or down payment, annual rate, tenure, estimated principal, monthly repayment, and calculation timestamp if shown.

Use a schema validator or a build-time validation script so missing IDs, duplicate units, invalid package references, negative prices, and unsupported statuses fail before deployment.

## Implementation sequence

### Phase 0 — Content and data gate

Deliverables:

- Resolve the blocking items in `CONTENT_ASSET_CHECKLIST.md`.
- Resolve every exception in `SOURCE_RECONCILIATION_REPORT.md`; do not auto-correct source identifiers.
- Enforce the exclusion rule in `SOURCE_REGISTER.md` so the red legacy-number field is never ingested.
- Confirm source ownership and approval for every supplied image, plan, map, logo, and dataset.
- Normalize the unit masterlist and package definitions into agreed schemas.
- Approve mortgage defaults, ranges, rounding, and disclaimer.
- Approve the WhatsApp message fields and recipient identity.
- Reconcile general package marketing claims against every current unit allocation; do not derive parking, position or floor attributes from package letter alone.

Exit criteria:

- The team can distinguish authoritative data from placeholders.
- No production UI depends on copied reference content.
- A repeatable source validator reports zero unit, parking, status and geometry mismatches.

### Phase 1 — Repository and application foundation

Deliverables:

- Create `feature/property-selector` from current `main`.
- Scaffold React, TypeScript, and Vite.
- Add linting, formatting, type-checking, unit-test, and build commands.
- Add design tokens, responsive breakpoints, base typography, focus styles, and reduced-motion behavior.
- Configure the GitHub Pages base path and a deployment workflow.
- Add a concise developer README without deleting the existing `READ ME` note until its content is intentionally migrated.

Exit criteria:

- A minimal original shell builds and tests locally and in CI.
- No major sales content or selector implementation is included yet.

### Phase 2 — Marketing journey

Deliverables:

- Build the header, hero, project information, layout, package, and footer sections.
- Render all project claims from approved data.
- Add responsive, optimized media with dimensions and alternative text.
- Add stable section links and accessible mobile navigation.

Exit criteria:

- Approved project information is readable and navigable on phone, tablet, and desktop.
- Package comparison clearly distinguishes Basic and Upgrade.

### Phase 3 — Unit inventory and selection

Deliverables:

- Implement unit data validation and derived indexes.
- Build required package filters and any additional approved filters.
- Build the unit visualization after final plan assets and geometry are supplied.
- Implement loading, empty, unavailable, error, selected, and stale-data states.
- Keep selection state in one controller and expose a clear change/reset action.

Exit criteria:

- Filters produce correct counts and results from test fixtures.
- Every interactive unit has a keyboard-accessible name and a touch-friendly target.
- Unavailable units cannot be selected.

### Phase 4 — Summary, mortgage, and WhatsApp

Deliverables:

- Build the selection summary from the selected unit record.
- Implement and unit-test the repayment formula and MYR formatting.
- Add approved input limits, helper text, validation, and financial disclaimer.
- Generate the encoded WhatsApp URL for `60172062979` only when the visitor activates the call to action.
- Include exactly the approved unit/package/parking fields; omit calculator results, personal details, URL and timestamp unless later approved.

Exit criteria:

- Summary values cannot drift from the selected unit.
- Calculation fixtures cover zero/invalid inputs, boundary rates, tenure limits, rounding, and common scenarios.
- WhatsApp link tests verify the destination number and decoded message fields.

### Phase 5 — Quality, accessibility, and performance

Deliverables:

- Test the complete journey at representative mobile, tablet, laptop, and wide-screen sizes.
- Test keyboard-only navigation, screen-reader labels, focus order, error announcements, contrast, zoom, and reduced motion.
- Test current Chrome, Safari, Firefox, and Edge support at an agreed level.
- Audit performance, image weight, layout shift, and slow-network behavior.
- Verify all facts and units against the latest approved source files.

Exit criteria:

- Critical end-to-end journey passes on the agreed browser/device matrix.
- No high-severity accessibility defects remain.
- Data and content sign-off is recorded.

### Phase 6 — GitHub Pages release

Deliverables:

- Review and merge the implementation pull request.
- Enable the agreed GitHub Pages source and run the production workflow.
- Verify repository-path asset loading, section links, calculator behavior, and WhatsApp handoff on the live Pages URL.
- Record the deployment and rollback procedure.

Exit criteria:

- The live site completes the visitor journey without console, asset-path, or routing errors.
- A documented owner exists for future inventory and content updates.

## Testing strategy

### Unit tests

- Mortgage repayment calculation and rounding.
- MYR formatting.
- Unit schema validation and duplicate detection.
- Package and availability filters.
- WhatsApp URL construction and decoded content.

### Component and integration tests

- Selection, change, and reset states.
- Filter combinations and zero-result recovery.
- Summary values derived from the selected unit.
- Validation and accessible error messages for calculator inputs.
- Navigation between journey sections without state loss.

### End-to-end tests

- Landing to Basic-package unit to WhatsApp.
- Landing to Upgrade-package unit to WhatsApp.
- Change a selection after viewing the summary.
- Adjust all approved mortgage inputs and verify the updated illustration.
- Complete the journey at a narrow mobile viewport using keyboard-equivalent controls.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Unit inventory is incomplete or changes frequently | Visitors see incorrect availability or price | Require a timestamped authoritative masterlist, explicit availability notice, validation, and an update owner. |
| Supplied operational records contain malformed bay identifiers | A selected unit could highlight or message the wrong car park | Block ingestion until an authorised corrected source resolves every identifier listed in the reconciliation report. |
| Older marketing totals conflict with current plans | The site could publish inaccurate project or price-band totals | Require an updated fact sheet and keep conflicting totals out of production content. |
| Floor plans arrive only as flattened images | Selection may be inaccurate or inaccessible | Request source SVG/CAD exports or approved coordinate mappings and provide a semantic list fallback. |
| Package rules are ambiguous | Filters and summary may mislead visitors | Approve package definitions, inclusions, exclusions, and price effects before UI work. |
| Package marketing claims conflict with unit-level allocation rows | The selector could show the wrong parking type, position or eligible floor | Treat the allocation as unit-level authority, block conflicting records/rules, and obtain a corrected package rule sheet. |
| Mortgage defaults are presented without context | Visitors may treat estimates as advice | Expose inputs, use neutral language, show an approved disclaimer, and avoid eligibility claims. |
| GitHub Pages base path is misconfigured | Production assets or links fail | Set and test the repository base path in preview and production builds. |
| Reference site influences the visual design too closely | Copyright or brand confusion | Use original copy, tokens, components, assets, and data; review for independent visual identity. |
| Large plans and hero media hurt mobile performance | Slow interaction and high data use | Use responsive formats, explicit dimensions, lazy loading, and performance budgets. |

## Git and review workflow

1. Approve the planning documents and critical data inputs on `main`.
2. Create `feature/property-selector` from the latest `main`.
3. Commit foundation, content model, marketing sections, selector, calculator/WhatsApp, and QA changes separately.
4. Open a draft pull request after Phase 1.
5. Request content/data review after Phase 2 and selector review after Phase 3.
6. Require passing type, lint, test, build, and accessibility checks before merge.
7. Merge only after content, inventory, calculation, legal, and visual sign-off.
8. Deploy the merged commit to GitHub Pages and run the production smoke test.

## Definition of done

- The visitor journey is complete and responsive.
- All displayed claims and inventory records are approved and traceable.
- Basic and Upgrade filters, selection, summary, calculator, and WhatsApp handoff behave correctly.
- The site is keyboard accessible and meets the agreed WCAG 2.2 AA checks.
- Automated tests and GitHub Pages deployment pass.
- The live Pages build is verified at its actual repository URL.
- Update ownership and the inventory/content refresh process are documented.
