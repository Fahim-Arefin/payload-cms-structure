// // clean up added in this version
// import type { CollectionConfig } from 'payload'
// import { createBeforeChangeHook } from './createBeforeChangeHook'
// import { deleteRemovedMedia } from './deleteRemovedMedia'
// import type { ImageConfig, CreatedMedia } from './mediaUtils'
// import { createSingleDocBeforeOperationHook } from '@/utils/singleDocUtils'
// import { MEDIA_SLUG } from './mediaUtils'

// export type ArrayMediaConfig = {
//   fieldName: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// export type GroupMediaConfig = {
//   groupKey: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
//   groupItemLabelField?: string
// }

// export type WithMediaLifecycleOpts = {
//   imageConfigs?: ImageConfig[]
//   arrayFields?: ArrayMediaConfig[]
//   groupFields?: GroupMediaConfig[]
//   skipOnDraft?: boolean
//   onAfterChange?: (args: { req: any; doc: any; previousDoc: any }) => void | Promise<void>
//   singleDocSlug?: string
//   /** Used to stamp ownerCollection when finalizing */
//   collectionSlug?: string
// }

// /* ---------------- helpers ---------------- */

// const relID = (v: any): string | null => {
//   if (!v) return null
//   if (typeof v === 'string') return v
//   if (typeof v === 'object') {
//     if (typeof v.value === 'string') return v.value
//     if (typeof v.value?.id === 'string') return v.value.id
//     if (typeof v.id === 'string') return v.id
//   }
//   return null
// }

// /** Collect media IDs currently referenced by the SAVED doc (field + fieldOriginal). */
// function collectIDsFromDoc(
//   doc: any,
//   simpleFields: string[],
//   arrayFields: Array<{ field: string; mediaFields: string[] }>,
//   groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>,
// ): string[] {
//   const out = new Set<string>()
//   const addPair = (holder: any, base: string) => {
//     const a = relID(holder?.[base])
//     if (a) out.add(String(a))
//     const b = relID(holder?.[`${base}Original`])
//     if (b) out.add(String(b))
//   }

//   // 1) top-level simple fields
//   for (const f of simpleFields) addPair(doc, f)

//   // 2) one-level arrays
//   for (const a of arrayFields) {
//     const items = doc?.[a.field]
//     if (!Array.isArray(items)) continue
//     for (const it of items) for (const mf of a.mediaFields) addPair(it, mf)
//   }

//   // 3) nested arrays (groupFields)
//   for (const g of groupFields) {
//     const holder = doc?.[g.groupKey]

//     if (Array.isArray(holder)) {
//       for (const gi of holder) {
//         const nested = gi?.[g.arrayKey]
//         if (!Array.isArray(nested)) continue
//         for (const ni of nested) for (const mf of g.mediaFields) addPair(ni, mf)
//       }
//     } else if (holder && typeof holder === 'object') {
//       const nested = holder?.[g.arrayKey]
//       if (!Array.isArray(nested)) continue
//       for (const ni of nested) for (const mf of g.mediaFields) addPair(ni, mf)
//     }
//   }

//   return Array.from(out)
// }

// /** Finalize (and stamp) the media that are actually referenced by this saved doc. */
// async function finalizeReferencedMedia(opts: {
//   req: any
//   doc: any
//   collectionSlug?: string
//   simpleFields: string[]
//   arrayFields: Array<{ field: string; mediaFields: string[] }>
//   groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>
// }) {
//   const { req, doc, collectionSlug, simpleFields, arrayFields, groupFields } = opts
//   const ids = collectIDsFromDoc(doc, simpleFields, arrayFields, groupFields)
//   if (!ids.length) return

//   for (const id of ids) {
//     try {
//       await req.payload.update({
//         collection: MEDIA_SLUG,
//         id,
//         data: {
//           // ensure stamps exist
//           uploadSessionId: doc?.uploadSessionId ?? undefined,
//           ownerCollection: collectionSlug ?? undefined,
//           ownerDocId: String(doc.id),
//           // mark referenced media as finalized
//           temporary: false,
//         },
//         overrideAccess: true,
//       })
//     } catch {
//       /* ignore missing/forbidden */
//     }
//   }
// }

// /* ---------------- main ---------------- */

// export function withMediaLifecycle(opts: WithMediaLifecycleOpts): CollectionConfig['hooks'] {
//   const {
//     imageConfigs = [],
//     arrayFields = [],
//     groupFields = [],
//     skipOnDraft = true,
//     onAfterChange,
//     singleDocSlug,
//     collectionSlug,
//   } = opts

//   // fields to check for removed media (for your existing delete-replaced behavior)
//   const simpleMediaNames = imageConfigs.map((c) => c.fieldName)
//   const simpleDeleteFields = [...simpleMediaNames, ...simpleMediaNames.map((n) => `${n}Original`)]
//   const arrayDeleteFields = arrayFields.map((a) => ({
//     field: a.fieldName,
//     mediaFields: [...a.mediaFields, ...a.mediaFields.map((n) => `${n}Original`)],
//   }))

//   const beforeChangeCreator = createBeforeChangeHook({ imageConfigs, arrayFields, groupFields })

//   // tiny pre-hook: stash session id for potential error handling/logging
//   const stashSessionIdPreHook = ({ req, data }: any) => {
//     ;(req as any)._uploadSessionId = data?.uploadSessionId
//     return data
//   }

//   return {
//     // keep so session id is available even if validation fails early (no deletes here)
//     beforeValidate: [stashSessionIdPreHook],

//     // your existing creator stays; no temp deletes here
//     beforeChange: [stashSessionIdPreHook, beforeChangeCreator],

//     afterChange: [
//       async ({ req, doc, previousDoc }) => {
//         // 1) keep your existing "delete removed/old media" behavior
//         await deleteRemovedMedia({
//           req,
//           previousDoc,
//           doc,
//           mediaFields: simpleDeleteFields,
//           arrayFields: arrayDeleteFields,
//           groupFields,
//           skipOnDraft,
//         })

//         // 2) finalize + stamp only the media currently referenced by this saved doc
//         await finalizeReferencedMedia({
//           req,
//           doc,
//           collectionSlug: collectionSlug || singleDocSlug,
//           simpleFields: simpleMediaNames,
//           arrayFields: arrayFields.map((a) => ({ field: a.fieldName, mediaFields: a.mediaFields })),
//           groupFields: groupFields.map((g) => ({
//             groupKey: g.groupKey,
//             arrayKey: g.arrayKey,
//             mediaFields: g.mediaFields,
//           })),
//         })

//         // ⚠️ No "purge temporary" here — you asked to do that via endpoint instead.

//         // (legacy) clear per-request rollback stash if used anywhere
//         const r = req as any
//         if (Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []

//         if (onAfterChange) await onAfterChange({ req, doc, previousDoc })
//         return doc
//       },
//     ],

//     afterError: [
//       async ({ req }) => {
//         // Only rollback explicitly tracked creations (if any). No global purges here.
//         const r = req as any
//         const stash: CreatedMedia[] = Array.isArray(r._createdMediaForRollback)
//           ? r._createdMediaForRollback
//           : []
//         for (const m of stash) {
//           try {
//             await req.payload.delete({ collection: m.collection, id: m.id, overrideAccess: true })
//           } catch {}
//         }
//         r._createdMediaForRollback = []
//       },
//     ],

//     afterDelete: [
//       async ({ req, doc }) => {
//         // keep your full document delete cleanup
//         await deleteRemovedMedia({
//           req,
//           previousDoc: doc,
//           doc: {}, // nothing kept
//           mediaFields: simpleDeleteFields,
//           arrayFields: arrayDeleteFields,
//           groupFields,
//           skipOnDraft: false,
//         })

//         // nuke any media that still claim this doc as owner
//         try {
//           const found = await req.payload.find({
//             collection: MEDIA_SLUG,
//             limit: 500,
//             where: {
//               and: [
//                 { ownerDocId: { equals: String(doc.id) } },
//                 { ownerCollection: { exists: true } },
//               ],
//             },
//             depth: 0,
//             overrideAccess: true,
//           })
//           for (const m of found.docs) {
//             await req.payload.delete({ collection: MEDIA_SLUG, id: m.id, overrideAccess: true })
//           }
//         } catch (e) {
//           req.payload.logger?.warn?.(`afterDelete owner cleanup failed: ${(e as Error).message}`)
//         }
//       },
//     ],

//     ...(singleDocSlug
//       ? { beforeOperation: [createSingleDocBeforeOperationHook(singleDocSlug)] }
//       : {}),
//   }
// }

// ==============================================================================================
// ==============================================================================================
// ==============================================================================================

// src/utils/media/withMediaLifecycle.ts
import type { CollectionConfig } from 'payload'
import { createBeforeChangeHook } from './createBeforeChangeHook'
import { deleteRemovedMedia } from './deleteRemovedMedia'
import type { ImageConfig, CreatedMedia } from './mediaUtils'
import { createSingleDocBeforeOperationHook } from '@/utils/singleDocUtils'
import { MEDIA_SLUG } from './mediaUtils'

export type ArrayMediaConfig = {
  fieldName: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

export type GroupMediaConfig = {
  groupKey: string
  arrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
  groupItemLabelField?: string
}

/* ---------- NEW: block-aware configs ---------- */
export type BlockSimpleMediaConfig = {
  layoutKey: string // e.g. "layout"
  blockType: string // block slug
  mediaFields: string[] // media on the block row itself
  mediaFieldLabels?: Record<string, string>
}

export type BlockArrayMediaConfig = {
  layoutKey: string // e.g. "layout"
  blockType: string
  arrayKey: string // e.g. "heroes", "plans", "gallery", "stats"
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

export type BlockGroupMediaConfig = {
  layoutKey: string // e.g. "layout"
  blockType: string
  groupKey: string // e.g. "sections"
  arrayKey: string // e.g. "insuranceCardData"
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
  groupItemLabelField?: string
}

export type WithMediaLifecycleOpts = {
  imageConfigs?: ImageConfig[]
  arrayFields?: ArrayMediaConfig[]
  groupFields?: GroupMediaConfig[]
  /* NEW: scan layout[] blocks */
  blockSimpleFields?: BlockSimpleMediaConfig[]
  blockArrayFields?: BlockArrayMediaConfig[]
  blockGroupFields?: BlockGroupMediaConfig[]
  skipOnDraft?: boolean
  onAfterChange?: (args: { req: any; doc: any; previousDoc: any }) => void | Promise<void>
  singleDocSlug?: string
  /** Used to stamp ownerCollection when finalizing */
  collectionSlug?: string
}

/* ---------------- helpers ---------------- */

const relID = (v: any): string | null => {
  if (!v) return null
  if (typeof v === 'string') return v
  if (typeof v === 'object') {
    if (typeof v.value === 'string') return v.value
    if (typeof v.value?.id === 'string') return v.value.id
    if (typeof v.id === 'string') return v.id
  }
  return null
}

function isBlockItemOfType(row: any, type: string) {
  return row && typeof row === 'object' && row.blockType === type
}

function eachBlockRow(
  holder: any,
  layoutKey: string,
  blockType: string,
  cb: (row: any, idx: number) => void,
) {
  const rows = Array.isArray(holder?.[layoutKey]) ? holder[layoutKey] : []
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    if (isBlockItemOfType(row, blockType)) cb(row, i)
  }
}

/** Collect media IDs currently referenced by the SAVED doc (field + fieldOriginal). */
function collectIDsFromDoc(
  doc: any,
  simpleFields: string[],
  arrayFields: Array<{ field: string; mediaFields: string[] }>,
  groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>,
  // NEW:
  blockSimpleFields: BlockSimpleMediaConfig[],
  blockArrayFields: BlockArrayMediaConfig[],
  blockGroupFields: BlockGroupMediaConfig[],
): string[] {
  const out = new Set<string>()
  const addPair = (holder: any, base: string) => {
    const a = relID(holder?.[base])
    if (a) out.add(String(a))
    const b = relID(holder?.[`${base}Original`])
    if (b) out.add(String(b))
  }

  // 1) top-level simple fields
  for (const f of simpleFields) addPair(doc, f)

  // 2) one-level arrays
  for (const a of arrayFields) {
    const items = doc?.[a.field]
    if (!Array.isArray(items)) continue
    for (const it of items) for (const mf of a.mediaFields) addPair(it, mf)
  }

  // 3) nested arrays (groupFields)
  for (const g of groupFields) {
    const holder = doc?.[g.groupKey]
    if (Array.isArray(holder)) {
      for (const gi of holder) {
        const nested = gi?.[g.arrayKey]
        if (!Array.isArray(nested)) continue
        for (const ni of nested) for (const mf of g.mediaFields) addPair(ni, mf)
      }
    } else if (holder && typeof holder === 'object') {
      const nested = holder?.[g.arrayKey]
      if (!Array.isArray(nested)) continue
      for (const ni of nested) for (const mf of g.mediaFields) addPair(ni, mf)
    }
  }

  // 4) NEW — blocks: media on the block row itself
  for (const b of blockSimpleFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      for (const mf of b.mediaFields) addPair(row, mf)
    })
  }

  // 5) NEW — blocks: array items with media
  for (const b of blockArrayFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
      for (const it of items) for (const mf of b.mediaFields) addPair(it, mf)
    })
  }

  // 6) NEW — blocks: groups -> arrays
  for (const b of blockGroupFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const groups = Array.isArray(row?.[b.groupKey]) ? row[b.groupKey] : []
      for (const g of groups) {
        const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
        for (const ni of nested) for (const mf of b.mediaFields) addPair(ni, mf)
      }
    })
  }

  return Array.from(out)
}

/** Finalize (and stamp) the media that are actually referenced by this saved doc. */
async function finalizeReferencedMedia(opts: {
  req: any
  doc: any
  collectionSlug?: string
  simpleFields: string[]
  arrayFields: Array<{ field: string; mediaFields: string[] }>
  groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>
  // NEW:
  blockSimpleFields: BlockSimpleMediaConfig[]
  blockArrayFields: BlockArrayMediaConfig[]
  blockGroupFields: BlockGroupMediaConfig[]
}) {
  const {
    req,
    doc,
    collectionSlug,
    simpleFields,
    arrayFields,
    groupFields,
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
  } = opts

  const ids = collectIDsFromDoc(
    doc,
    simpleFields,
    arrayFields,
    groupFields,
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
  )
  if (!ids.length) return

  for (const id of ids) {
    try {
      await req.payload.update({
        collection: MEDIA_SLUG,
        id,
        data: {
          uploadSessionId: doc?.uploadSessionId ?? undefined,
          ownerCollection: collectionSlug ?? undefined,
          ownerDocId: String(doc.id),
          temporary: false,
        },
        overrideAccess: true,
      })
    } catch {
      /* ignore */
    }
  }
}

/* ---------------- main ---------------- */

export function withMediaLifecycle(opts: WithMediaLifecycleOpts): CollectionConfig['hooks'] {
  const {
    imageConfigs = [],
    arrayFields = [],
    groupFields = [],
    blockSimpleFields = [],
    blockArrayFields = [],
    blockGroupFields = [],
    skipOnDraft = true,
    onAfterChange,
    singleDocSlug,
    collectionSlug,
  } = opts

  const simpleMediaNames = imageConfigs.map((c) => c.fieldName)
  const simpleDeleteFields = [...simpleMediaNames, ...simpleMediaNames.map((n) => `${n}Original`)]
  const arrayDeleteFields = arrayFields.map((a) => ({
    field: a.fieldName,
    mediaFields: [...a.mediaFields, ...a.mediaFields.map((n) => `${n}Original`)],
  }))

  const beforeChangeCreator = createBeforeChangeHook({
    imageConfigs,
    arrayFields,
    groupFields,
    // NEW:
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
  })

  const stashSessionIdPreHook = ({ req, data }: any) => {
    ;(req as any)._uploadSessionId = data?.uploadSessionId
    return data
  }

  return {
    beforeValidate: [stashSessionIdPreHook],
    beforeChange: [stashSessionIdPreHook, beforeChangeCreator],
    afterChange: [
      async ({ req, doc, previousDoc }) => {
        await deleteRemovedMedia({
          req,
          previousDoc,
          doc,
          mediaFields: simpleDeleteFields,
          arrayFields: arrayDeleteFields,
          groupFields,
          // NEW:
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
          skipOnDraft,
        })

        await finalizeReferencedMedia({
          req,
          doc,
          collectionSlug: collectionSlug || singleDocSlug,
          simpleFields: simpleMediaNames,
          arrayFields: arrayFields.map((a) => ({ field: a.fieldName, mediaFields: a.mediaFields })),
          groupFields: groupFields.map((g) => ({
            groupKey: g.groupKey,
            arrayKey: g.arrayKey,
            mediaFields: g.mediaFields,
          })),
          // NEW:
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
        })

        const r = req as any
        if (Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []

        if (onAfterChange) await onAfterChange({ req, doc, previousDoc })
        return doc
      },
    ],
    afterError: [
      async ({ req }) => {
        const r = req as any
        const stash: CreatedMedia[] = Array.isArray(r._createdMediaForRollback)
          ? r._createdMediaForRollback
          : []
        for (const m of stash) {
          try {
            await req.payload.delete({ collection: m.collection, id: m.id, overrideAccess: true })
          } catch {}
        }
        r._createdMediaForRollback = []
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        await deleteRemovedMedia({
          req,
          previousDoc: doc,
          doc: {},
          mediaFields: simpleDeleteFields,
          arrayFields: arrayDeleteFields,
          groupFields,
          // NEW:
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
          skipOnDraft: false,
        })

        try {
          const found = await req.payload.find({
            collection: MEDIA_SLUG,
            limit: 500,
            where: {
              and: [
                { ownerDocId: { equals: String(doc.id) } },
                { ownerCollection: { exists: true } },
              ],
            },
            depth: 0,
            overrideAccess: true,
          })
          for (const m of found.docs) {
            await req.payload.delete({ collection: MEDIA_SLUG, id: m.id, overrideAccess: true })
          }
        } catch (e) {
          req.payload.logger?.warn?.(`afterDelete owner cleanup failed: ${(e as Error).message}`)
        }
      },
    ],
    ...(singleDocSlug
      ? { beforeOperation: [createSingleDocBeforeOperationHook(singleDocSlug)] }
      : {}),
  }
}
