import { createRequire } from 'node:module'
import { config } from 'dotenv'

// Preview without --apply. Retain legacy item headings for recovery.
config({ quiet: true })
const require = createRequire(import.meta.url)
const mongoose = createRequire(require.resolve('@payloadcms/db-mongodb'))('mongoose')
if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is required')
const connection = await mongoose.createConnection(process.env.DATABASE_URI).asPromise()
const apply = process.argv.includes('--apply')

try {
  const planned = []
  for (const [name, path] of [
    ['pages', 'layout'],
    ['_pages_versions', 'version.layout'],
  ]) {
    const collection = connection.collection(name)
    for await (const doc of collection.find(
      { [`${path}.blockType`]: 'cardPrivileges' },
      { projection: { [path]: 1 } },
    )) {
      const layout = path === 'layout' ? doc.layout : doc.version?.layout
      for (const [index, block] of (layout ?? []).entries()) {
        if (block.blockType !== 'cardPrivileges') continue
        for (const [cardIndex, card] of (block.cards ?? []).entries()) {
          const prefix = `${path}.${index}.cards.${cardIndex}`
          const fields = {}
          for (const field of ['sectionTitle', 'sectionSubtitle']) {
            if (card[field] == null && typeof card.items?.[0]?.[field] === 'string') {
              fields[`${prefix}.${field}`] = card.items[0][field]
            }
          }
          if (Object.keys(fields).length) {
            planned.push({ collection, id: doc._id, prefix, card, fields })
          }
        }
      }
    }
  }
  console.log(`${planned.length} card headings to migrate${apply ? '' : ' (dry run)'}`)
  for (const { collection, id, prefix, card, fields } of planned) {
    if (!apply) continue
    const result = await collection.updateOne({ _id: id, [prefix]: card }, { $set: fields })
    if (result.modifiedCount !== 1) {
      throw new Error('Content changed during migration. Preview again before retrying.')
    }
  }
  if (apply) console.log('Migration complete. Legacy item headings retained.')
} finally {
  await connection.close()
}
