# Unit CSV template

Use `units-template.csv` to supply additional units. It contains headers only; add one current-number unit per row.

Save the completed file as UTF-8 CSV. Keep one current unit per row. Never include the allocation schedule's red legacy-number column or any historical unit-number alias.

## Columns

| Column | Required | Format and rule |
| --- | --- | --- |
| `id` | Yes | Unique current unit ID. No legacy unit number. |
| `block` | Yes | Current block label. |
| `level` | Yes | Whole residential level number; use `0` for ground floor. |
| `position_or_stack` | Yes | Approved position or stack value, such as `Corner` or `Intermediate`. |
| `layout_id` | Yes | Must match an ID in `src/data/layouts.ts`. |
| `size_sq_ft` | Yes | Positive whole square-foot value. |
| `bedrooms` | Yes | Non-negative whole number. |
| `bathrooms` | Yes | Non-negative whole number. |
| `base_price_myr` | Yes | Positive MYR amount without `RM`, commas or decimals. |
| `compatible_package_ids` | Yes | One or more IDs from `src/data/packages.ts`, separated by `|`; every package must support `layout_id`. |
| `parking_bay_1` | Yes | Exact approved current bay identifier. |
| `parking_bay_2` | Yes | Exact approved current bay identifier. |
| `parking_level` | Yes | Exact approved car-park level label. |
| `parking_type` | Yes | `Open` or `Covered`. |
| `parking_orientation` | Yes | `Side-by-side` or `Tandem`. |
| `availability_status` | Yes | `available`, `held`, `sold`, `blocked`, `unavailable` or `unknown`. |
| `plan_x` | No | Normalized plan x-coordinate from `0` to `1`; provide all four coordinate fields or none. |
| `plan_y` | No | Normalized plan y-coordinate from `0` to `1`. |
| `plan_width` | No | Positive normalized plan width no greater than `1`. |
| `plan_height` | No | Positive normalized plan height no greater than `1`. |

## Import acceptance rules

- Unit IDs must be unique.
- Layout and package IDs must already exist.
- Prices must be positive finite values.
- Availability status must use the supported vocabulary exactly.
- Each unit must reference at least one package. Every referenced package must list the unit's layout as compatible and carry the same base price.
- Parking identifiers and locations must match the final approved allocation and plan sources exactly.
- A zero-tolerance validation run must pass before records can be added to `src/data/units.ts`.
