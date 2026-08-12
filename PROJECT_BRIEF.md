# Project Brief: Residensi Lestari Fasa 2

## Document status

- Status: Owner-approved production baseline
- Repository: `vimelraj-17/rskukotakemuning`
- Primary language: English
- Currency: MYR
- WhatsApp destination: `+60172062979`
- Hosting target: GitHub Pages, without a custom domain
- Implementation status: Complete and prepared for GitHub Pages deployment

## Repository baseline

The repository currently contains one short file, `READ ME`, which states that the project will be a closing sheet for Lestari. There is no application code, framework, package manager, design system, content model, asset library, test suite, CI workflow, or repository-specific instruction file yet.

The note is useful because it establishes the intended sales-support context. It must be preserved as the project is developed.

## Product intent

Build a responsive property landing page and guided unit-selection experience for Residensi Lestari Fasa 2. The site should help a visitor understand the project, compare available layouts and package categories, identify a preferred unit, review the selection and a mortgage illustration, and continue the conversation through WhatsApp.

The experience may support both self-guided visitors and a sales representative using the site as an in-person closing aid. This is a working assumption to confirm before implementation.

## Known product inputs

| Item | Confirmed value |
| --- | --- |
| Project name | Residensi Lestari Fasa 2 |
| Language | English |
| Currency | MYR |
| Package filter values | All, Basic, Upgrade |
| WhatsApp number | +60172062979 |
| Hosting | GitHub Pages |
| Custom domain | None |
| Functional reference | <https://www.zhisoung.com> |

`All` is treated as a filter state that shows every package, not as a purchasable package, unless later project data says otherwise.

## Package model

The package selection has two independent fields:

- `packageType`: `Basic` or `Upgrade`
- `package`: `A`, `B`, or `C`

`All` is a user-interface filter only. It is never stored as a unit's package type.

| Package | Basic price | Upgrade addition | Upgrade total | Reference status |
| --- | ---: | ---: | ---: | --- |
| A | RM250,000 | RM38,000 | RM288,000 | Confirmed by the written instruction and package-comparison image |
| B | RM275,000 | RM33,000 | RM308,000 | Confirmed by the written instruction and package-comparison image |
| C | RM290,000 | RM43,000 | RM333,000 | Owner-approved correction of the extra-zero typo |

For an Upgrade selection, show the base price, upgrade addition and computed total separately. Do not overwrite the allocation schedule's base-price field with the total. Package eligibility, residential level, unit position and parking attributes must come from the reconciled unit record, not from a general marketing headline. The package-comparison image's general parking, floor and corner-unit claims conflict with some rows in the current allocation schedule and are blocked pending correction or written rules.

The supplied Basic furniture reference identifies a TV cabinet and TV, kitchen cabinet and refrigerator, three wardrobes, three air-conditioning units and two water heaters as LPHS-required furniture/electrical items. The supplied package comparison adds Upgrade finish and appliance details for A, B and C. These references may guide the package comparison after their English wording, substitutions, terms and web-publication rights are approved.

## Visitor journey

1. **Landing page** — establish the project identity, key proposition, and primary call to action.
2. **Project information** — explain verified project facts, location, facilities, eligibility, and important notices.
3. **Layouts** — compare floor-plan types using clear specifications and accessible imagery.
4. **Packages** — explain Basic and Upgrade inclusions, pricing implications, and differences.
5. **Unit selection** — browse and filter verified inventory, then select one unit.
6. **Selection summary** — review the chosen unit, layout, package, price, and other confirmed attributes.
7. **Mortgage calculator** — adjust approved assumptions and view a non-binding monthly repayment illustration.
8. **WhatsApp** — open a prefilled inquiry to `+60172062979` containing the approved selected-unit and parking fields.

The journey should preserve selection state while the visitor moves between relevant sections. A visitor must be able to revise the selection before opening WhatsApp.

## Functional scope

### Landing and project information

- Responsive hero, project identity, primary value proposition, and clear calls to action.
- Structured project facts using only approved source material.
- Sections for location, facilities, eligibility, timeline, and disclaimers when content is supplied.
- Navigation that works with keyboard, touch, and small screens.

### Layouts and packages

- Layout cards or comparison views for all supplied unit types.
- Floor-plan imagery with meaningful alternative text and optional detail view.
- Basic and Upgrade package comparison based on approved inclusions.
- `All`, `Basic`, and `Upgrade` controls wherever package filtering is useful.

### Unit selection

- Data-driven inventory rather than unit details embedded directly in UI components.
- Filters determined by the supplied inventory, with package filtering required.
- Clear states for available, unavailable, selected, and unknown units.
- A mobile interaction that does not depend on hover or precise pointer input.
- A prominent statement that displayed availability must be confirmed if no live inventory source exists.

### Selection summary

- A single source of truth for the selected unit.
- Summary fields sourced from the approved unit masterlist.
- Clear edit/change action before the visitor proceeds.
- Graceful empty state when no unit has been selected.

### Mortgage calculator

- Standard principal-and-interest repayment illustration using property price, loan margin or down payment, annual interest rate, and tenure.
- MYR formatting and explicit rounding rules.
- Defaults and permitted ranges supplied or approved by the project owner.
- Non-advisory disclaimer explaining that actual approval, rates, fees, insurance, and repayments depend on the financier and applicant.
- No claim of loan eligibility or approval.

### WhatsApp handoff

- Use the `wa.me` format for `60172062979` without the leading plus sign in the URL.
- Prefill the exact approved field set: unit number, package type, package letter, both assigned car-park numbers, car-park type and car-park orientation.
- Use `Basic` or `Upgrade` for package type, and `A`, `B` or `C` for package.
- Place both assigned bays in `Carpark Number`, separated unambiguously; every allocation row currently has two bay identifiers.
- URL-encode all generated message content.
- Keep WhatsApp as an explicit visitor action; do not transmit data automatically.
- Do not collect personal or financial information on the site unless a later requirement introduces a reviewed privacy flow.

Approved message structure:

```text
Help me lock this unit!

Unit Number: {unit number}
PackageType: {Basic or Upgrade}
Package: {A, B or C}

Carpark Number: {P1} / {P2}
Carpark type: {Open or Covered}
Carpark Orientation: {Side-by-side or Tandem}
```

The owner subsequently approved inclusion of the project name, layout/size, estimated total price, estimated monthly mortgage payment, availability-confirmation request and selected-configuration URL. No visitor name or personal contact details are collected.

## Experience principles

- **Mobile first:** the full journey must remain usable on common phone widths.
- **Progressive disclosure:** show key selling information first and reveal detailed selection controls when needed.
- **Selection clarity:** visitors should always know what is selected, what can be changed, and whether availability is confirmed.
- **Trustworthy calculations:** label mortgage results as estimates and expose the assumptions.
- **Fast and resilient:** optimize images and keep core project information usable on slower mobile connections.
- **Accessible by default:** target WCAG 2.2 AA practices for structure, contrast, focus, touch targets, forms, and status messages.

## Technical and operating constraints

- The production build must be compatible with static GitHub Pages hosting.
- The repository name must be accounted for in asset and routing base paths unless deployment uses a user-level Pages URL.
- Project data should be separated from presentation code so inventory and package updates can be reviewed independently.
- No backend, account system, booking payment, CRM synchronization, or real-time inventory feed is assumed at this stage.
- Analytics, consent requirements, and privacy notices remain undecided.

## Data-integrity policy

- The attachment identities, source roles and precedence are recorded in `SOURCE_REGISTER.md`.
- The current audit and all unresolved exceptions are recorded in `SOURCE_RECONCILIATION_REPORT.md`.
- Only current unit numbers may enter the application. The red legacy-number field in the allocation schedule must never be extracted, stored, displayed, logged, tested or mapped.
- Unit number, unit location, layout, package, price, parking allocation, parking label and parking location must reconcile across their authoritative sources before a record can be published.
- Do not silently repair malformed identifiers. The owner approved the 79 marks in the explicitly named available-unit chart as available inventory as at 23 July 2026; unmarked units retain no public status and are omitted.
- Current operational records contain 615 unique current units - 305 in Block B and 310 in Block C - but an updated approved fact sheet is still required before the website publishes totals because the older sales kit conflicts.
- Contact details in older sales material are superseded for this application. The only visitor WhatsApp destination is `+60172062979`.

## Reference-use boundary

The reference website may inform only high-level experience patterns such as a structured landing page, filterable unit browsing, a persistent selection summary, an adjustable mortgage illustration, and a user-initiated WhatsApp handoff.

Do not copy or adapt its source code, wording, information architecture labels, visual identity, imagery, diagrams, unit data, pricing, contact details, or other proprietary content. All production materials must come from approved Residensi Lestari Fasa 2 sources or be newly created for this repository.

## Out of scope unless later approved

- Live reservation or booking.
- Payment processing.
- Login, user accounts, or saved profiles.
- Automated eligibility decisions or financial advice.
- Scraping or importing data or assets from the reference website.
- CRM, spreadsheet, or property-management-system integration.
- A custom domain.
- Multilingual content beyond English.

## Success criteria

- A visitor can complete the required journey on mobile and desktop without losing the current selection.
- Project, layout, package, unit, and price information is driven by approved data.
- Basic and Upgrade units can be filtered, compared, and selected, with A/B/C shown as a separate package field.
- The summary matches the selected inventory record exactly.
- The mortgage illustration recalculates correctly for approved input ranges and displays its assumptions and disclaimer.
- The WhatsApp link targets `+60172062979` and includes exactly the approved unit/package/parking fields only after a visitor activates it.
- The site can be built and deployed through GitHub Pages.
- Keyboard navigation, focus management, labels, contrast, and responsive layouts pass the agreed quality checks.

## Release decision

On 13 August 2026 the project owner instructed the team to replace and approve all pending content. The release therefore publishes only the 79 zero-mismatch available records and approved supplied media. Rows with malformed parking identifiers and records without an approved availability mark remain outside the application.
