# Source Reconciliation Report

## Audit result

The attachment set is useful and substantially complete for planning, but it is not yet cleared for zero-tolerance production data. Current unit numbering and unit locations reconcile. Parking allocation and current availability still have unresolved source issues that must be corrected or authoritatively clarified before selector implementation.

No legacy unit number was extracted into the audit dataset. Validation used only the current-number field.

## Scope inspected

- All 38 pages of the 2025 sales kit.
- Both A3 pages of the sale chart.
- All 8 current-numbering car-park plan pages.
- All 5 allocation-schedule pages and all 615 current-unit rows.
- Both block-plan PNGs.
- All five supplied project renders.
- The A/B/C package-comparison graphic, Basic furniture/electrical reference and eligibility-check graphic.

The PDFs were rendered for visual inspection. Embedded text was extracted where available. The allocation schedule was also read as a ruled table so every row could be validated independently of line wrapping.

## Confirmed correlations

### Current residential units

| Check | Result |
| --- | --- |
| Allocation rows | 615, continuously numbered from item 1 through item 615 |
| Unique current unit IDs | 615 |
| Block B | 305 allocation records; exact match to all current unit cells in `Block B.png` |
| Block C | 310 allocation records; exact match to all current unit cells in `Block C.png` |
| Unit block | Every current unit ID agrees with its `BLOCK` value |
| Unit floor | Every current unit ID agrees with its stated residential floor |
| Missing or extra current unit IDs | None between the block plans and allocation schedule |

Block B contains 15 units on each of Levels 1-3 and 20 units on each of Levels 4-16. Block C contains 7 ground-floor units, 12 units on each of Levels 1-3, 20 units on each of Levels 4-16, and 7 units on Level 17. These visible plan sequences produce 305 and 310 units respectively.

### Allocation totals

| Attribute | Validated total |
| --- | ---: |
| RM250,000 units | 123 |
| RM275,000 units | 366 |
| RM290,000 units | 126 |
| Basic | 288 |
| Upgrade | 327 |
| Corner | 251 |
| Intermediate | 364 |
| Covered parking | 502 units |
| Open parking | 113 units |
| Tandem parking | 368 units |
| Side-by-side parking | 247 units |
| Unique assigned bay strings | 1,230 across 615 units |
| Reused assigned bay strings | 0 |

Each allocation row contains two different bay strings. No bay string is assigned to two current units in the supplied schedule. This uniqueness check does not clear malformed strings or prove their physical location.

### Parking plan coverage

The current-numbering car-park plan contains these eight location sheets:

1. Ground Floor
2. Upper Ground
3. Level 1
4. Level 1A
5. Level 2
6. Level 2A
7. Level 3
8. Level 3A

The schedule allocates units across all eight named parking levels. The plan visually contains the bay labels and physical positions, but most bay labels are vector outlines rather than machine-readable text. A reliable interactive coordinate mapping cannot be generated solely by text extraction.

## Hard mismatches and blocking exceptions

### Allocation schedule: malformed parking identifiers

The following current-unit records do not conform to the bay-label structure used throughout the schedule and current-numbering plan. They must not be auto-corrected.

| Schedule item | Current unit | Affected field | Supplied identifier |
| ---: | --- | --- | --- |
| 47 | B-04-02 | P1 | `3-OS-B0143` |
| 291 | B-16-06 | P1 | `UG-CT-277` |
| 291 | B-16-06 | P2 | `UG-CT-278` |
| 294 | B-16-09 | P1 | `UG-CT-273` |
| 294 | B-16-09 | P2 | `UG-CT-274` |
| 295 | B-16-10 | P1 | `UG-CT-269` |
| 295 | B-16-10 | P2 | `UG-CT-270` |
| 296 | B-16-11 | P1 | `UG-CT-265` |
| 296 | B-16-11 | P2 | `UG-CT-266` |
| 297 | B-16-12 | P1 | `UG-CT-263` |
| 297 | B-16-12 | P2 | `UG-CT-264` |
| 298 | B-16-13 | P1 | `UG-CT-261` |
| 298 | B-16-13 | P2 | `UG-CT-262` |
| 299 | B-16-14 | P1 | `UG-CT-259` |
| 299 | B-16-14 | P2 | `UG-CT-260` |
| 302 | B-16-17 | P1 | `UG-CT-267` |
| 302 | B-16-17 | P2 | `UG-CT-268` |
| 303 | B-16-18 | P1 | `UG-CT-271` |
| 303 | B-16-18 | P2 | `UG-CT-272` |
| 304 | B-16-19 | P1 | `UG-CT-275` |
| 304 | B-16-19 | P2 | `UG-CT-276` |

Production clearance requires a corrected allocation schedule or an authorised correction sheet that states the exact final bay strings for all 21 entries.

### Allocation records requiring explicit location sign-off

Four side-by-side allocations cross named plan-sheet boundaries and carry boundary remarks in the schedule: B-04-02, B-08-01, B-08-03 and B-08-04. B-08-07 uses the non-consecutive pair `G-CS-B049` and `G-CS-B098` with a boundary remark. These may be intentional physical adjacencies, but the coordinate relationship must be verified on the current plan and signed off before interactive highlighting is produced.

### Older sales-kit totals conflict with current operational records

| Fact | 2025 sales kit | 2026 allocation and current block plans |
| --- | ---: | ---: |
| Total residential units | 594 | 615 |
| RM250,000 units | 102 | 123 |
| RM275,000 units | 366 | 366 |
| RM290,000 units | 126 | 126 |
| First block total | The overview contains both 284 and 305 in the same entry | Block B has 305 current units |
| Second block total | 310 | Block C has 310 current units |

The 21-unit difference is entirely in the RM250,000 band. An updated, approved project fact sheet is required before the site states total units or price-band totals. Until then, the website must not publish the conflicting older totals.

### Current availability is undefined

The sale-chart PDF contains 79 bright-green marked cells: 41 in Block C and 38 in Block B. The file contains no legend defining the mark and no machine-readable status table. Therefore the marks are recorded only as “green-marked”; no availability meaning is assigned.

Green-marked Block C cells:

`C-17-02`, `C-17-04`, `C-16-01`, `C-16-02`, `C-16-04`, `C-16-09`, `C-15-01`, `C-15-05`, `C-14-02`, `C-14-05`, `C-13-01`, `C-13-02`, `C-13-12`, `C-12-04`, `C-12-05`, `C-12-06`, `C-11-04`, `C-10-04`, `C-10-05`, `C-10-08`, `C-10-10`, `C-10-12`, `C-09-05`, `C-09-07`, `C-08-05`, `C-08-12`, `C-06-05`, `C-06-07`, `C-05-04`, `C-05-05`, `C-05-12`, `C-05-13`, `C-05-20`, `C-04-08`, `C-03-01`, `C-03-04`, `C-03-07`, `C-03-08`, `C-03-12`, `C-02-12`, `C-01-12`.

Green-marked Block B cells:

`B-15-10`, `B-15-15`, `B-13-15`, `B-11-03`, `B-11-15`, `B-10-08`, `B-10-10`, `B-09-08`, `B-09-15`, `B-08-15`, `B-06-04`, `B-06-07`, `B-05-01`, `B-05-03`, `B-05-04`, `B-05-07`, `B-05-08`, `B-05-15`, `B-05-16`, `B-05-20`, `B-04-01`, `B-04-04`, `B-04-07`, `B-04-08`, `B-04-15`, `B-04-16`, `B-04-20`, `B-03-01`, `B-03-03`, `B-03-04`, `B-03-07`, `B-03-08`, `B-03-15`, `B-02-04`, `B-02-08`, `B-02-15`, `B-01-08`, `B-01-15`.

The marked-cell naming was checked against the visible current-number grid. Because the marks obscure parts of some labels, an authoritative exported status list remains mandatory for production use.

### Package price model and rule conflicts

The package-comparison graphic and the latest written instruction establish this intended price model:

| Package | Basic | Upgrade addition | Upgrade total | Reconciliation status |
| --- | ---: | ---: | ---: | --- |
| A | RM250,000 | RM38,000 | RM288,000 | Written instruction and image agree |
| B | RM275,000 | RM33,000 | RM308,000 | Written instruction and image agree |
| C | RM290,000 in the image | RM43,000 | RM333,000 | The written Basic amount is `RM290,0000`; written correction is required |

The A/B/C letter can map to the allocation schedule's RM250,000/RM275,000/RM290,000 base-price bands. The allocation's `PACKAGE` column supplies the Basic/Upgrade type. The Upgrade total must be computed separately; it must not replace the schedule's base-price field.

Several broad statements in the package graphic do not match every unit-level allocation record:

| Package graphic statement | Current allocation result | Status |
| --- | --- | --- |
| Basic packages have open parking | 175 Basic units have covered parking: A 1, B 160, C 14 | Conflict; use unit allocation only after source correction/approval |
| Upgrade packages have covered parking | All 327 Upgrade units have covered parking | Reconciles |
| A Upgrade is for corner units | All 47 A Upgrade units are corner units | Reconciles |
| B Upgrade is for corner units | 42 of 175 B Upgrade units are intermediate | Conflict |
| Package A is Levels 1-5 | All 123 A records are on Levels 1-5 | Reconciles |
| Package B is Level 6 onwards | Three B records are on Level 5 | Conflict |
| Package C Basic is Levels 1-2 only | Seven C Basic records are on the ground floor; all C Upgrade records are Levels 3-17 | Wording conflict/ambiguity |

The selector must never derive a unit's parking type, position or residential floor from a package marketing rule. These fields must remain unit-level data. A corrected package rule sheet or written exception policy is required before the general statements are published.

### Basic inclusions and eligibility references

The Basic reference visibly lists a TV cabinet and TV, kitchen cabinet and refrigerator, three wardrobes, three air-conditioning units and two water heaters as LPHS-required furniture/electrical items. It is a Malay-language marketing graphic and supplies no effective date, substitution terms or explicit exclusions.

The eligibility graphic visibly states Malaysian citizenship, age 18 or above, household income not exceeding RM14,500 per month, no home in Selangor for the applicant or spouse, and LPHS registration. It presents these as a preliminary check subject to LPHS and bank approval. Because eligibility rules can change and the site's primary language is English, current LPHS authority/source dates, approved English wording and legal review remain required.

## Missing authoritative files or approvals

### Required for zero-tolerance unit selection

1. A corrected and approved car-park allocation spreadsheet or PDF resolving all 21 malformed bay identifiers.
2. A machine-readable current inventory/status export containing one current unit ID per row, an explicit status value, an effective date/time and the meaning of every status. It must also define the 79 green marks in the supplied sale chart.
3. An editable current-numbering car-park source - preferably DWG/DXF/SVG - or an approved bay-coordinate table mapping every bay ID to its sheet and highlight geometry.
4. An approved unit-to-layout-type and built-up mapping for every current unit. The block charts visually encode stack types, but no machine-readable mapping was supplied.
5. High-resolution standalone plan assets for every layout or mirrored orientation intended to be shown, with approval for interactive overlays.
6. A current project fact sheet reconciling 615 units, Block B/Block C naming and the current price-band totals.

### Required for complete site content

7. A corrected Package C written Basic price and an authoritative package rule sheet resolving the parking, B Upgrade position and B/C floor exceptions listed above.
8. Standalone approved logo files, brand palette, font direction and usage rules.
9. Written web-publication rights, required credits and approved artist-impression captions/disclaimers for every supplied image and plan.
10. A current, authoritative LPHS eligibility/document source with an effective date, plus approved English copy. The new graphic is legible but remains a Malay-language marketing reference.
11. Approved mortgage defaults, limits, rounding rule and non-advisory disclaimer.
12. The WhatsApp recipient/display name for `+60172062979`. The opening and unit/package/parking field set are confirmed.
13. Approved current legal, sales, eligibility, privacy and information-change notices.
14. Named owners and an update cadence for inventory, prices, project copy and assets.

## Release gate

No unit-selection or car-park-highlight dataset should be generated for production until items 1-6 above are resolved and a validator reports zero missing units, zero extra units, zero duplicate unit IDs, zero duplicate bay assignments, zero malformed bay IDs, zero unknown statuses and zero unmapped unit or bay locations.
