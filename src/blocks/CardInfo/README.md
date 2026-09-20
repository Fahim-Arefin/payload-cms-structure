# Card Info

Add a row under **Cards** in Payload with a name, unique **Card Key**, image and button label. Leave **Link To Page** empty for selection on the current page. Use the same key in navbar anchors and Card Privileges, for example `platinum` and `/#platinum`.

The optional **Default Card Key** selects a card on first load without a matching hash. Otherwise, the first row is selected. Unknown section anchors preserve selection; removing the URL hash restores the default. Reordering rows changes button and numbered selector order.

Two cards retain the original stack geometry and mobile button order. Larger lists show the selected card and the next two cards in a bounded stack. Every card remains selectable using wrapping buttons and numbered links. One card is centered.

Card Benefits still uses its original two-card schema. A hidden `legacyCardType` preserves the migrated cards' connection to Benefits even if their keys change. Adding a new Card Info row does not create Benefits content.

## Existing data

Run once per environment before serving the new schema:

```sh
node scripts/migrate-card-info-cards.mjs
node scripts/migrate-card-info-cards.mjs --apply
```

The first command previews. The second copies existing groups into Cards on pages and saved versions, retaining media references, names, button links, anchors and defaults. Original selector data remains for recovery. Existing Cards arrays are never overwritten, and concurrent edits cause the migration to stop.

```sh
pnpm test:card-info
pnpm test:card-privileges
```
