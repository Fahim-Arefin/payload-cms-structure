// // src/hooks/cascadeDeleteMedia.ts
// type AnyDoc = Record<string, any>

// /** normalize relationship value to a string id */
// function relID(v: any): string | null {
//   if (!v) return null
//   if (typeof v === 'string') return v
//   if (typeof v === 'object') {
//     // relationship shapes you may see:
//     // - { value: 'id' }
//     // - { relationTo: 'media', value: 'id' }
//     // - populated: { id: 'id', ... }
//     if (typeof v.value === 'string') return v.value
//     if (typeof v.value === 'object' && typeof v.value?.id === 'string') return v.value.id
//     if (typeof v.id === 'string') return v.id
//   }
//   return null
// }

// /** collect media ids from the heroes array (image + originalImage) */
// function collectHeroMediaIDs(root: AnyDoc, groupKey = 'homeHero', arrayKey = 'heroes'): string[] {
//   const out = new Set<string>()
//   const heroes = root?.[groupKey]?.[arrayKey] ?? root?.[arrayKey] ?? []
//   if (Array.isArray(heroes)) {
//     for (const item of heroes) {
//       const img = relID(item?.image)
//       const orig = relID(item?.originalImage)
//       if (img) out.add(img)
//       if (orig) out.add(orig)
//     }
//   }
//   return Array.from(out)
// }

// /** diff helper: returns ids that were in prev but not in next */
// function diffRemoved(prev: string[], next: string[]): string[] {
//   const nextSet = new Set(next)
//   return prev.filter((id) => !nextSet.has(id))
// }

// export async function deleteRemovedHeroMedia(args: {
//   req: any
//   previousDoc: AnyDoc | null
//   doc: AnyDoc
//   groupKey?: string // default 'homeHero'
//   arrayKey?: string // default 'heroes'
//   skipOnDraft?: boolean
// }) {
//   const {
//     req,
//     previousDoc,
//     doc,
//     groupKey = 'homeHero',
//     arrayKey = 'heroes',
//     skipOnDraft = true,
//   } = args

//   // optional: skip deletions for drafts
//   if (skipOnDraft) {
//     const isDraftQuery = req?.query?.draft === 'true'
//     const isDraftDoc = doc?._status === 'draft'
//     if (isDraftQuery || isDraftDoc) return
//   }

//   const prevIDs = previousDoc ? collectHeroMediaIDs(previousDoc, groupKey, arrayKey) : []
//   const nextIDs = collectHeroMediaIDs(doc, groupKey, arrayKey)
//   const toDelete = diffRemoved(prevIDs, nextIDs)

//   // delete each removed id from Media
//   for (const id of new Set(toDelete)) {
//     try {
//       await req.payload.delete({ collection: 'media', id })
//     } catch (err) {
//       // don't break the save if one delete fails
//       req.payload.logger?.warn?.(`Failed to delete media ${id}: ${(err as Error).message}`)
//     }
//   }
// }

// src/utils/cascadeDeleteMedia.ts
type AnyDoc = Record<string, any>

/** normalize relationship value to a string id */
function relID(v: any): string | null {
  if (!v) return null
  if (typeof v === 'string') return v
  if (typeof v === 'object') {
    if (typeof v.value === 'string') return v.value
    if (typeof v.value === 'object' && typeof v.value?.id === 'string') return v.value.id
    if (typeof v.id === 'string') return v.id
  }
  return null
}

/** collect media ids from the heroes array (image + originalImage) */
function collectHeroMediaIDs(root: AnyDoc, groupKey = 'homeHero', arrayKey = 'heroes'): string[] {
  const out = new Set<string>()
  const heroes = root?.[groupKey]?.[arrayKey] ?? root?.[arrayKey] ?? []
  if (Array.isArray(heroes)) {
    for (const item of heroes) {
      const img = relID(item?.image)
      const orig = relID(item?.originalImage)
      if (img) out.add(img)
      if (orig) out.add(orig)
    }
  }
  return Array.from(out)
}

/** diff helper: returns ids that were in prev but not in next */
function diffRemoved(prev: string[], next: string[]): string[] {
  const nextSet = new Set(next)
  return prev.filter((id) => !nextSet.has(id))
}

export async function deleteRemovedHeroMedia(args: {
  req: any
  previousDoc: AnyDoc | null
  doc: AnyDoc
  groupKey?: string // e.g. 'homeHero'
  arrayKey?: string // e.g. 'heroes'
  skipOnDraft?: boolean
}) {
  const {
    req,
    previousDoc,
    doc,
    groupKey = 'homeHero',
    arrayKey = 'heroes',
    skipOnDraft = true,
  } = args

  // optional: skip deletions for drafts (same as WhyChooseUs pattern)
  if (skipOnDraft) {
    const isDraftQuery = req?.query?.draft === 'true'
    const isDraftDoc = doc?._status === 'draft'
    if (isDraftQuery || isDraftDoc) return
  }

  const prevIDs = previousDoc ? collectHeroMediaIDs(previousDoc, groupKey, arrayKey) : []
  const nextIDs = collectHeroMediaIDs(doc, groupKey, arrayKey)
  const toDelete = diffRemoved(prevIDs, nextIDs)

  for (const id of new Set(toDelete)) {
    try {
      await req.payload.delete({ collection: 'media', id })
      req.payload.logger?.info?.(`Deleted removed hero media: ${id}`)
    } catch (err) {
      req.payload.logger?.warn?.(`Failed to delete media ${id}: ${(err as Error).message}`)
    }
  }
}
