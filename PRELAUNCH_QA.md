# Pre-launch QA checkpoint

Date: 13 August 2026  
Branch: `feature/property-selector`

## Release result

Production content and publication rights were approved by the project owner on 13 August 2026. The selector contains 79 units marked available in `latest sale chart available as at 230726.pdf`; every published record matches the current-number allocation schedule and current car park plans.

The red legacy-number column is excluded from the import and application. Unmarked units and allocation rows with malformed parking identifiers are not published.

## Reconciliation evidence

- 79 approved current unit IDs imported; zero missing or duplicate IDs.
- 158 valid, unique assigned parking bays; zero duplicates.
- Zero published records from the malformed-bay exception set.
- Prices and package types match the approved current allocation rows.
- Availability timestamp: 23 July 2026.

## Complete visitor journey

`src/test/PrelaunchJourney.test.tsx` verifies landing content, layout/package compatibility, filters, current unit selection, price summary, mortgage changes, generated WhatsApp text, local-storage restoration and a validated shared URL. Unit tests additionally prove non-available statuses cannot be selected.

## Responsive and accessibility coverage

- Target viewports: 375 × 812, 768 × 1024 and 1440 × 900.
- Floor plans and the location diagram scroll horizontally instead of shrinking below readability.
- Sticky navigation, touch targets, labels, focus, heading order, alternative text and internal links are covered by the application and test suite.
- `axe-core` reports no detectable WCAG A/AA structural violations in jsdom; the deployed site receives a final browser smoke test.

## Release commands

```text
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run verify:pages
```

Availability and final pricing remain subject to confirmation by an authorised representative. Repeat reconciliation and update the timestamp whenever newer sources arrive.
