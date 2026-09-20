# Card Benefits

The heading has three parts: block-level **Title 1**, the selected **Card Name / Title 2**, and the fixed text **benefits.** The section description stays below this heading.

Add a row under **Cards** for each product. Set a unique **Card Key**, matching Card Info, Card Privileges, and the navbar hash. Add its artwork and Benefits items. **Default Card Key** is optional; the first row is used otherwise. An unrelated hash preserves selection, and an empty hash restores the default.

Card Info owns shared navigation anchors. A Benefits-only key gets its anchor at the first Benefits or Privileges block defining it. Matching keys select the corresponding entries in all three blocks.

Desktop shows three cards stepping down to the right. Mobile and tablet show an overlapping vertical stack. A scroll gesture plays one complete transition, moving the front card behind the others. The heading stays static. Pagination and arrow keys also select benefits. Scrolling beyond the first/last benefit releases the section. Reduced-motion users get instant button/keyboard selection without scroll pinning.

The section fills the viewport with the background pattern. Stack size accounts for the navbar, heading, text and pagination. Very short windows scale the content to keep everything visible.

## Migration

Run once per environment before serving the new schema:

```sh
node scripts/migrate-card-benefits-cards.mjs
node scripts/migrate-card-benefits-cards.mjs --apply
```

The first command previews. The second migrates pages and saved versions, preserving benefit arrays, images, names and the configured Card Info keys/default. Original fields remain for recovery. Existing Cards arrays are never overwritten.

```sh
pnpm test:card-benefits
```
