# Card Privileges

## Add a card without code changes

1. Open the page in Payload and expand its **Card Privileges** block.
2. Add a row under **Cards**. Enter a **Card Name** and a unique **Card Key / Navbar Anchor**, such as `platinum`.
3. Choose the card image and appearance, and enter the section title and subtitle beside the card image fields. These stay static while scrolling and change only when selecting another card. Then add the carousel items.
4. Set the navbar link to this page with the same anchor, for example `/#platinum`. Do not include `#` in the card key itself.
5. Save and publish the page and navbar changes.

Keys are case-sensitive. Keep them stable when changing a card's display name. For existing cards, use the section IDs already configured in Card Info (`world-elite` and `visa-infinite` on the current home page).

**Default Card Key** is optional. If empty, the first Cards entry is the default. Navigating to another page section preserves the selected card; clearing the URL hash restores the default.

The frontend creates an anchor for each new key at the first Privileges block that uses it. Existing Card Info and section anchors are retained, so matching keys do not create duplicate IDs. A key shared across multiple Privileges blocks selects the matching entry in each block.

Card Info also supports a configurable Cards list. Match its card keys to this block. Card Benefits retains its existing two-card configuration.

## Existing data and deployment

Before deploying this schema to another environment, migrate the old fixed card groups:

```sh
node scripts/migrate-card-privileges-cards.mjs
node scripts/migrate-card-privileges-cards.mjs --apply
```

The first command previews the work. The second adds the Cards entries to pages and saved versions, preserving images, carousel items, Card Info anchor keys, and default selection. Original groups remain in the database for recovery. Re-running the migration leaves existing Cards arrays untouched.

For existing Cards arrays, move the first item's section heading into the card-level fields:

```sh
node scripts/migrate-card-privileges-headings.mjs
node scripts/migrate-card-privileges-headings.mjs --apply
```

This preserves existing card-level headings and retains legacy item headings in the database for recovery. Run it after the Cards migration above on other environments.

## Validation

```sh
pnpm test:card-privileges
```

These tests cover arbitrary new keys, URL selection, defaults, duplicate validation, and migration preservation/idempotency.
