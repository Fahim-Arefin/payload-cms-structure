// // currently working code
// import type { CollectionConfig } from 'payload'
// import { createBeforeChangeHook } from './createBeforeChangeHook'
// import { deleteRemovedMedia } from './deleteRemovedMedia'
// import type { ImageConfig, CreatedMedia } from './mediaUtils'
// import { MEDIA_SLUG } from './mediaUtils'

// // optional single-doc guard (keep if you already use it)
// import { createSingleDocBeforeOperationHook } from '@/utils/singleDocUtils'

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

// /** Blocks: media directly on the block row */
// export type BlockSimpleMediaConfig = {
//   layoutKey: string // e.g. "layout"
//   blockType: string // block slug (we will write THIS into Media.derivedFrom)
//   mediaFields: string[] // fields on the block row itself
//   mediaFieldLabels?: Record<string, string>
// }

// /** Blocks: array inside a block where items have media */
// export type BlockArrayMediaConfig = {
//   layoutKey: string
//   blockType: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// /** Blocks: group -> nested array where items have media */
// export type BlockGroupMediaConfig = {
//   layoutKey: string
//   blockType: string
//   groupKey: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   groupItemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// /* === NEW: block → nested blocks[] → firstArray[] → secondArray[] → media === */
// export type BlockNestedDeepMediaConfig = {
//   layoutKey: string
//   blockType: string // outer block type (e.g., CUSTOM_CARD_SECTION_SLUG_AND_TAG)
//   blocksKey: string // nested blocks field on the outer block (e.g., 'card')
//   nestedBlockType: string // inner block type to match (e.g., PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG)
//   firstArrayKey: string // e.g., 'planCards'
//   secondArrayKey: string // e.g., 'modalItems'
//   mediaFields: string[] // e.g., ['icon']
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// export type WithMediaLifecycleOpts = {
//   imageConfigs?: ImageConfig[]

//   /** Plain upload fields (e.g., PDFs) at the top level (or dot-path like "group.file"). */
//   otherUploadFields?: string[]

//   arrayFields?: ArrayMediaConfig[]
//   groupFields?: GroupMediaConfig[]
//   blockSimpleFields?: BlockSimpleMediaConfig[]
//   blockArrayFields?: BlockArrayMediaConfig[]
//   blockGroupFields?: BlockGroupMediaConfig[]

//   /* === NEW: deep nested block media === */
//   blockNestedDeepFields?: BlockNestedDeepMediaConfig[]

//   skipOnDraft?: boolean
//   onAfterChange?: (args: { req: any; doc: any; previousDoc: any }) => void | Promise<void>
//   singleDocSlug?: string
//   /** collectionSlug will be stamped into media.ownerCollection */
//   collectionSlug?: string
// }

// /* ───────────────── helpers ───────────────── */

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

// function isBlockItemOfType(row: any, type: string) {
//   return row && typeof row === 'object' && row.blockType === type
// }

// function eachBlockRow(
//   holder: any,
//   layoutKey: string,
//   blockType: string,
//   cb: (row: any, idx: number) => void,
// ) {
//   const rows = Array.isArray(holder?.[layoutKey]) ? holder[layoutKey] : []
//   for (let i = 0; i < rows.length; i++) {
//     const row = rows[i]
//     if (isBlockItemOfType(row, blockType)) cb(row, i)
//   }
// }

// // ── dot-path safe getters/setters ──
// function getByPath(obj: any, path: string): any {
//   if (!obj) return undefined
//   if (!path.includes('.')) return obj?.[path]
//   return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
// }
// function setByPath(obj: any, path: string, value: any) {
//   const parts = path.split('.')
//   const last = parts.pop()!
//   let cur = obj
//   for (const k of parts) {
//     if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {}
//     cur = cur[k]
//   }
//   cur[last] = value
// }

// // ── flatten/unflatten adapter for dot paths (simple fields only) ──
// function flattenDotFields(data: any, fieldNames: string[]) {
//   for (const name of fieldNames) {
//     if (!name.includes('.')) continue
//     const val = getByPath(data, name)
//     if (typeof val !== 'undefined') data[name] = val
//     const origPath = `${name}Original`
//     const origVal = getByPath(data, origPath)
//     if (typeof origVal !== 'undefined') data[origPath] = origVal
//   }
// }
// function unflattenDotFields(data: any, fieldNames: string[]) {
//   for (const name of fieldNames) {
//     if (!name.includes('.')) continue
//     if (Object.prototype.hasOwnProperty.call(data, name)) {
//       setByPath(data, name, data[name])
//       delete data[name]
//     }
//     const origPath = `${name}Original`
//     if (Object.prototype.hasOwnProperty.call(data, origPath)) {
//       setByPath(data, origPath, data[origPath])
//       delete data[origPath]
//     }
//   }
// }

// /** We want (id, derivedFromSlug, ownerField) pairs of all *current* references in the saved doc */
// function collectIDsWithSource(
//   doc: any,
//   simpleFields: string[],
//   arrayFields: Array<{ field: string; mediaFields: string[] }>,
//   groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>,
//   blockSimpleFields: BlockSimpleMediaConfig[],
//   blockArrayFields: BlockArrayMediaConfig[],
//   blockGroupFields: BlockGroupMediaConfig[],
//   // === NEW
//   blockNestedDeepFields: BlockNestedDeepMediaConfig[] = [],
// ): Array<{ id: string; derivedFrom?: string; ownerField?: string }> {
//   const out: Array<{ id: string; derivedFrom?: string; ownerField?: string }> = []

//   const addPairByPath = (root: any, path: string, derivedFrom?: string) => {
//     const val = getByPath(root, path)
//     const id = relID(val)
//     if (id) out.push({ id: String(id), derivedFrom, ownerField: path })
//     const origPath = `${path}Original`
//     const oVal = getByPath(root, origPath)
//     const oid = relID(oVal)
//     if (oid) out.push({ id: String(oid), derivedFrom, ownerField: origPath })
//   }

//   // 1) top-level (or dot-path) simple fields (no block; we won't set derivedFrom here)
//   for (const f of simpleFields) addPairByPath(doc, f, undefined)

//   // 2) one-level arrays (no block; leave derivedFrom empty)
//   for (const a of arrayFields) {
//     const items = doc?.[a.field]
//     if (!Array.isArray(items)) continue
//     for (const it of items) for (const mf of a.mediaFields) addPairByPath(it, mf, undefined)
//   }

//   // 3) nested arrays under a group (no block; leave derivedFrom empty)
//   for (const g of groupFields) {
//     const holder = doc?.[g.groupKey]
//     if (Array.isArray(holder)) {
//       for (const gi of holder) {
//         const nested = gi?.[g.arrayKey]
//         if (!Array.isArray(nested)) continue
//         for (const ni of nested) for (const mf of g.mediaFields) addPairByPath(ni, mf, undefined)
//       }
//     } else if (holder && typeof holder === 'object') {
//       const nested = holder?.[g.arrayKey]
//       if (!Array.isArray(nested)) continue
//       for (const ni of nested) for (const mf of g.mediaFields) addPairByPath(ni, mf, undefined)
//     }
//   }

//   // 4) blocks: media on the block row — derivedFrom = blockType (slug)
//   for (const b of blockSimpleFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       for (const mf of b.mediaFields) addPairByPath(row, mf, b.blockType)
//     })
//   }

//   // 5) blocks: array items with media — derivedFrom = blockType (slug)
//   for (const b of blockArrayFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
//       for (const it of items) for (const mf of b.mediaFields) addPairByPath(it, mf, b.blockType)
//     })
//   }

//   // 6) blocks: groups -> arrays — derivedFrom = blockType (slug)
//   for (const b of blockGroupFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       const holder = row?.[b.groupKey]

//       // Case A: group is an ARRAY of group items
//       if (Array.isArray(holder)) {
//         for (const g of holder) {
//           const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
//           for (const ni of nested)
//             for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
//         }
//         return
//       }

//       // Case B: group is a plain OBJECT that itself contains the array
//       if (holder && typeof holder === 'object') {
//         const nested = Array.isArray(holder?.[b.arrayKey]) ? holder[b.arrayKey] : []
//         for (const ni of nested) for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
//       }
//     })
//   }

//   // === 7) NEW: block → nested blocks[] → firstArray[] → secondArray[] → media
//   for (const b of blockNestedDeepFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
//       const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
//       for (const inner of nestedBlocks) {
//         if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//         const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
//         for (const firstItem of firstArr) {
//           const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
//             ? firstItem[b.secondArrayKey]
//             : []
//           for (const secondItem of secondArr) {
//             for (const mf of b.mediaFields) addPairByPath(secondItem, mf, b.nestedBlockType)
//           }
//         }
//       }
//     })
//   }

//   return out
// }

// /** Diff helper for deep nested removal */
// function collectDeepNestedIDs(doc: any, cfgs: BlockNestedDeepMediaConfig[]): Set<string> {
//   const ids = new Set<string>()
//   const push = (v: any) => {
//     const id = relID(v)
//     if (id) ids.add(String(id))
//     const oid = relID((v && (v as any).imageOriginal) ?? (v && (v as any).iconOriginal))
//     if (oid) ids.add(String(oid))
//   }

//   for (const b of cfgs) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
//       const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
//       for (const inner of nestedBlocks) {
//         if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//         const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
//         for (const firstItem of firstArr) {
//           const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
//             ? firstItem[b.secondArrayKey]
//             : []
//           for (const secondItem of secondArr) {
//             for (const mf of b.mediaFields) {
//               const val = secondItem?.[mf]
//               if (val) push(val)
//               const orig = secondItem?.[`${mf}Original`]
//               if (orig) push(orig)
//             }
//           }
//         }
//       }
//     })
//   }
//   return ids
// }

// /** Finalize (and stamp) the media actually referenced by this saved doc. */
// async function finalizeReferencedMedia(opts: {
//   req: any
//   doc: any
//   collectionSlug?: string
//   simpleFields: string[]
//   arrayFields: Array<{ field: string; mediaFields: string[] }>
//   groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>
//   blockSimpleFields: BlockSimpleMediaConfig[]
//   blockArrayFields: BlockArrayMediaConfig[]
//   blockGroupFields: BlockGroupMediaConfig[]
//   // NEW
//   blockNestedDeepFields?: BlockNestedDeepMediaConfig[]
// }) {
//   const {
//     req,
//     doc,
//     collectionSlug,
//     simpleFields,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//     blockNestedDeepFields = [],
//   } = opts

//   const refs = collectIDsWithSource(
//     doc,
//     simpleFields,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//     blockNestedDeepFields,
//   )
//   if (!refs.length) return

//   for (const ref of refs) {
//     try {
//       await req.payload.update({
//         collection: MEDIA_SLUG,
//         id: ref.id,
//         data: {
//           uploadSessionId: doc?.uploadSessionId ?? undefined,
//           ownerCollection: collectionSlug ?? undefined,
//           ownerDocId: String(doc.id),
//           ownerField: ref.ownerField,
//           derivedFrom: ref.derivedFrom ?? undefined,
//           temporary: false,
//         },
//         overrideAccess: true,
//       })
//     } catch {
//       /* ignore */
//     }
//   }
// }

// /* ───────────────── main ───────────────── */

// export function withMediaLifecycle(opts: WithMediaLifecycleOpts): CollectionConfig['hooks'] {
//   const {
//     imageConfigs = [],
//     otherUploadFields = [],
//     arrayFields = [],
//     groupFields = [],
//     blockSimpleFields = [],
//     blockArrayFields = [],
//     blockGroupFields = [],
//     blockNestedDeepFields = [], // NEW
//     skipOnDraft = true,
//     onAfterChange,
//     singleDocSlug,
//     collectionSlug,
//   } = opts

//   // Track simple media (supports dot-paths like "branding.logo")
//   const simpleMediaNames = [...imageConfigs.map((c) => c.fieldName), ...otherUploadFields]

//   // For delete sweep we include both field and fieldOriginal (dot-path OK)
//   const simpleDeleteFields = [...simpleMediaNames, ...simpleMediaNames.map((n) => `${n}Original`)]

//   const arrayDeleteFields = arrayFields.map((a) => ({
//     field: a.fieldName,
//     mediaFields: [...a.mediaFields, ...a.mediaFields.map((n) => `${n}Original`)],
//   }))

//   const beforeChangeCreator = createBeforeChangeHook({
//     imageConfigs,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//   })

//   const stashSessionIdPreHook = ({ req, data }: any) => {
//     ;(req as any)._uploadSessionId = data?.uploadSessionId
//     return data
//   }

//   // Dot-path adapter (simple fields only)
//   const dotPathPreAdapter = ({ data }: any) => {
//     flattenDotFields(data, simpleMediaNames)
//     return data
//   }
//   const dotPathPostAdapter = ({ data }: any) => {
//     unflattenDotFields(data, simpleMediaNames)
//     return data
//   }

//   // NEW: targeted cleanup for deep nested configs (prev vs current)
//   const cleanupDeepNested = async ({
//     req,
//     previousDoc,
//     doc,
//     configs,
//   }: {
//     req: any
//     previousDoc: any
//     doc: any
//     configs: BlockNestedDeepMediaConfig[]
//   }) => {
//     if (!configs.length) return
//     try {
//       const prevIDs = collectDeepNestedIDs(previousDoc ?? {}, configs)
//       const curIDs = collectDeepNestedIDs(doc ?? {}, configs)
//       const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))
//       for (const id of toDelete) {
//         try {
//           await req.payload.delete({ collection: MEDIA_SLUG, id, overrideAccess: true })
//         } catch {}
//       }
//     } catch (e) {
//       req.payload.logger?.warn?.(
//         `cleanupDeepNested failed: ${(e as Error)?.message ?? 'unknown error'}`,
//       )
//     }
//   }

//   return {
//     beforeValidate: [stashSessionIdPreHook],
//     beforeChange: [
//       stashSessionIdPreHook,
//       dotPathPreAdapter,
//       beforeChangeCreator,
//       dotPathPostAdapter,
//     ],
//     afterChange: [
//       async ({ req, doc, previousDoc }) => {
//         // delete removed relations (existing shapes)
//         await deleteRemovedMedia({
//           req,
//           previousDoc,
//           doc,
//           mediaFields: simpleDeleteFields,
//           arrayFields: arrayDeleteFields,
//           groupFields,
//           blockSimpleFields,
//           blockArrayFields,
//           blockGroupFields,
//           skipOnDraft,
//         })

//         // NEW: handle deep nested removals (block → nested blocks → array → array)
//         await cleanupDeepNested({
//           req,
//           previousDoc,
//           doc,
//           configs: blockNestedDeepFields,
//         })

//         // stamp all referenced media (owner*, temporary:false, derivedFrom = block or inner block)
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
//           blockSimpleFields,
//           blockArrayFields,
//           blockGroupFields,
//           blockNestedDeepFields, // NEW
//         })

//         // clear rollback stash
//         const r = req as any
//         if (Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []

//         // Optional cleanup trigger
//         if (onAfterChange) await onAfterChange({ req, doc, previousDoc })
//         return doc
//       },
//     ],
//     afterError: [
//       async ({ req }) => {
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
//         await deleteRemovedMedia({
//           req,
//           previousDoc: doc,
//           doc: {},
//           mediaFields: simpleDeleteFields,
//           arrayFields: arrayDeleteFields,
//           groupFields,
//           blockSimpleFields,
//           blockArrayFields,
//           blockGroupFields,
//           skipOnDraft: false,
//         })

//         // ownerCollection sweep
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

// =========================================================================================
// =========================================================================================
// =========================================================================================

// currently working code
// src/utils/media/withMediaLifecycle.ts
import type { CollectionConfig } from 'payload'
import { createBeforeChangeHook } from './createBeforeChangeHook'
import { deleteRemovedMedia } from './deleteRemovedMedia'
import type { ImageConfig, CreatedMedia } from './mediaUtils'
import { MEDIA_SLUG } from './mediaUtils'
import { createSingleDocBeforeOperationHook } from '@/utils/singleDocUtils'

/* ───────────────── types ───────────────── */

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

/** Blocks: media directly on the block row */
export type BlockSimpleMediaConfig = {
  layoutKey: string
  blockType: string
  mediaFields: string[]
  mediaFieldLabels?: Record<string, string>
}

/** Blocks: array inside a block where items have media */
export type BlockArrayMediaConfig = {
  layoutKey: string
  blockType: string
  arrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

/** Blocks: group → nested array where items have media */
export type BlockGroupMediaConfig = {
  layoutKey: string
  blockType: string
  groupKey: string
  arrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  groupItemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

/** Blocks: nested blocks[] → firstArray[] → secondArray[] → media */
export type BlockNestedDeepMediaConfig = {
  layoutKey: string
  blockType: string
  blocksKey: string
  nestedBlockType: string
  firstArrayKey: string
  secondArrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

/** NEW: block → array (e.g., tabs[]) → blocks (e.g., content[]) → array (e.g., items[]) → media */
export type BlockArrayBlocksMediaConfig = {
  layoutKey: string
  blockType: string
  arrayKey: string
  blocksKey: string
  nestedBlockType: string
  nestedArrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

export type WithMediaLifecycleOpts = {
  imageConfigs?: ImageConfig[]
  /** top-level (or dot-path) upload fields like PDFs */
  otherUploadFields?: string[]

  arrayFields?: ArrayMediaConfig[]
  groupFields?: GroupMediaConfig[]
  blockSimpleFields?: BlockSimpleMediaConfig[]
  blockArrayFields?: BlockArrayMediaConfig[]
  blockGroupFields?: BlockGroupMediaConfig[]

  /** blocks → nested blocks[] → firstArray[] → secondArray[] → media */
  blockNestedDeepFields?: BlockNestedDeepMediaConfig[]

  /** NEW: block → array[] → blocks[] → array[] → media */
  blockArrayBlocksFields?: BlockArrayBlocksMediaConfig[]

  skipOnDraft?: boolean
  onAfterChange?: (args: { req: any; doc: any; previousDoc: any }) => void | Promise<void>

  /** if present, guards collection to single doc */
  singleDocSlug?: string
  /** stamped into media.ownerCollection */
  collectionSlug?: string
}

/* ───────────────── helpers ───────────────── */

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

// ── dot-path safe getters/setters ──
function getByPath(obj: any, path: string): any {
  if (!obj) return undefined
  if (!path.includes('.')) return obj?.[path]
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}
function setByPath(obj: any, path: string, value: any) {
  const parts = path.split('.')
  const last = parts.pop()!
  let cur = obj
  for (const k of parts) {
    if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {}
    cur = cur[k]
  }
  cur[last] = value
}

// ── flatten/unflatten adapter for dot paths (simple fields only) ──
function flattenDotFields(data: any, fieldNames: string[]) {
  for (const name of fieldNames) {
    if (!name.includes('.')) continue
    const val = getByPath(data, name)
    if (typeof val !== 'undefined') data[name] = val
    const origPath = `${name}Original`
    const origVal = getByPath(data, origPath)
    if (typeof origVal !== 'undefined') data[origPath] = origVal
  }
}
function unflattenDotFields(data: any, fieldNames: string[]) {
  for (const name of fieldNames) {
    if (!name.includes('.')) continue
    if (Object.prototype.hasOwnProperty.call(data, name)) {
      setByPath(data, name, data[name])
      delete data[name]
    }
    const origPath = `${name}Original`
    if (Object.prototype.hasOwnProperty.call(data, origPath)) {
      setByPath(data, origPath, data[origPath])
      delete data[origPath]
    }
  }
}

/** We want (id, derivedFromSlug, ownerField) pairs of all *current* references in the saved doc */
function collectIDsWithSource(
  doc: any,
  simpleFields: string[],
  arrayFields: Array<{ field: string; mediaFields: string[] }>,
  groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>,
  blockSimpleFields: BlockSimpleMediaConfig[],
  blockArrayFields: BlockArrayMediaConfig[],
  blockGroupFields: BlockGroupMediaConfig[],
  // deep: blocks → blocks → array → array
  blockNestedDeepFields: BlockNestedDeepMediaConfig[] = [],
  // NEW: array → blocks → array
  blockArrayBlocksFields: BlockArrayBlocksMediaConfig[] = [],
): Array<{ id: string; derivedFrom?: string; ownerField?: string }> {
  const out: Array<{ id: string; derivedFrom?: string; ownerField?: string }> = []

  const addPairByPath = (root: any, path: string, derivedFrom?: string) => {
    const val = getByPath(root, path)
    const id = relID(val)
    if (id) out.push({ id: String(id), derivedFrom, ownerField: path })
    const origPath = `${path}Original`
    const oVal = getByPath(root, origPath)
    const oid = relID(oVal)
    if (oid) out.push({ id: String(oid), derivedFrom, ownerField: origPath })
  }

  // 1) top-level (or dot-path) simple fields
  for (const f of simpleFields) addPairByPath(doc, f, undefined)

  // 2) one-level arrays
  for (const a of arrayFields) {
    const items = doc?.[a.field]
    if (!Array.isArray(items)) continue
    for (const it of items) for (const mf of a.mediaFields) addPairByPath(it, mf, undefined)
  }

  // 3) nested arrays under a group
  for (const g of groupFields) {
    const holder = doc?.[g.groupKey]
    if (Array.isArray(holder)) {
      for (const gi of holder) {
        const nested = gi?.[g.arrayKey]
        if (!Array.isArray(nested)) continue
        for (const ni of nested) for (const mf of g.mediaFields) addPairByPath(ni, mf, undefined)
      }
    } else if (holder && typeof holder === 'object') {
      const nested = holder?.[g.arrayKey]
      if (!Array.isArray(nested)) continue
      for (const ni of nested) for (const mf of g.mediaFields) addPairByPath(ni, mf, undefined)
    }
  }

  // 4) blocks: media on the block row
  for (const b of blockSimpleFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      for (const mf of b.mediaFields) addPairByPath(row, mf, b.blockType)
    })
  }

  // 5) blocks: array items with media
  for (const b of blockArrayFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
      for (const it of items) for (const mf of b.mediaFields) addPairByPath(it, mf, b.blockType)
    })
  }

  // 6) blocks: groups -> arrays
  for (const b of blockGroupFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const holder = row?.[b.groupKey]

      // array of groups
      if (Array.isArray(holder)) {
        for (const g of holder) {
          const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
          for (const ni of nested)
            for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
        }
        return
      }

      // single group object
      if (holder && typeof holder === 'object') {
        const nested = Array.isArray(holder?.[b.arrayKey]) ? holder[b.arrayKey] : []
        for (const ni of nested) for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
      }
    })
  }

  // 7) blocks: nested blocks[] → firstArray[] → secondArray[] → media
  for (const b of blockNestedDeepFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
      for (const inner of nestedBlocks) {
        if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
        const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
        for (const firstItem of firstArr) {
          const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
            ? firstItem[b.secondArrayKey]
            : []
          for (const secondItem of secondArr) {
            for (const mf of b.mediaFields) addPairByPath(secondItem, mf, b.nestedBlockType)
          }
        }
      }
    })
  }

  // 8) NEW: block → array[] → blocks[] → array[] → media
  for (const b of blockArrayBlocksFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const arr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
      for (const arrItem of arr) {
        const innerBlocks = Array.isArray(arrItem?.[b.blocksKey]) ? arrItem[b.blocksKey] : []
        for (const inner of innerBlocks) {
          if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
          const nestedArr = Array.isArray(inner?.[b.nestedArrayKey]) ? inner[b.nestedArrayKey] : []
          for (const ni of nestedArr) {
            for (const mf of b.mediaFields) addPairByPath(ni, mf, b.nestedBlockType)
          }
        }
      }
    })
  }

  return out
}

/** Diff helper for deep nested removal: blocks → blocks → array → array */
function collectDeepNestedIDs(doc: any, cfgs: BlockNestedDeepMediaConfig[]): Set<string> {
  const ids = new Set<string>()
  const push = (v: any) => {
    const id = relID(v)
    if (id) ids.add(String(id))
    const oid = relID((v && (v as any).imageOriginal) ?? (v && (v as any).iconOriginal))
    if (oid) ids.add(String(oid))
  }

  for (const b of cfgs) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
      for (const inner of nestedBlocks) {
        if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
        const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
        for (const firstItem of firstArr) {
          const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
            ? firstItem[b.secondArrayKey]
            : []
          for (const secondItem of secondArr) {
            for (const mf of b.mediaFields) {
              const val = secondItem?.[mf]
              if (val) push(val)
              const orig = secondItem?.[`${mf}Original`]
              if (orig) push(orig)
            }
          }
        }
      }
    })
  }
  return ids
}

/** NEW: Diff helper for array → blocks → array removal */
function collectArrayBlocksIDs(doc: any, cfgs: BlockArrayBlocksMediaConfig[]): Set<string> {
  const ids = new Set<string>()
  const pushRel = (v: any) => {
    const id = relID(v)
    if (id) ids.add(String(id))
  }

  for (const b of cfgs) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const arr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
      for (const arrItem of arr) {
        const innerBlocks = Array.isArray(arrItem?.[b.blocksKey]) ? arrItem[b.blocksKey] : []
        for (const inner of innerBlocks) {
          if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
          const nestedArr = Array.isArray(inner?.[b.nestedArrayKey]) ? inner[b.nestedArrayKey] : []
          for (const ni of nestedArr) {
            for (const mf of b.mediaFields) {
              pushRel(ni?.[mf])
              pushRel(ni?.[`${mf}Original`])
            }
          }
        }
      }
    })
  }
  return ids
}

/** Finalize (and stamp) the media actually referenced by this saved doc. */
async function finalizeReferencedMedia(opts: {
  req: any
  doc: any
  collectionSlug?: string
  simpleFields: string[]
  arrayFields: Array<{ field: string; mediaFields: string[] }>
  groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>
  blockSimpleFields: BlockSimpleMediaConfig[]
  blockArrayFields: BlockArrayMediaConfig[]
  blockGroupFields: BlockGroupMediaConfig[]
  blockNestedDeepFields?: BlockNestedDeepMediaConfig[]
  blockArrayBlocksFields?: BlockArrayBlocksMediaConfig[] // NEW
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
    blockNestedDeepFields = [],
    blockArrayBlocksFields = [],
  } = opts

  const refs = collectIDsWithSource(
    doc,
    simpleFields,
    arrayFields.map((a) => ({ field: a.field, mediaFields: a.mediaFields })),
    groupFields.map((g) => ({
      groupKey: g.groupKey,
      arrayKey: g.arrayKey,
      mediaFields: g.mediaFields,
    })),
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
    blockNestedDeepFields,
    blockArrayBlocksFields,
  )
  if (!refs.length) return

  for (const ref of refs) {
    try {
      await req.payload.update({
        collection: MEDIA_SLUG,
        id: ref.id,
        data: {
          uploadSessionId: doc?.uploadSessionId ?? undefined,
          ownerCollection: collectionSlug ?? undefined,
          ownerDocId: String(doc.id),
          ownerField: ref.ownerField,
          derivedFrom: ref.derivedFrom ?? undefined,
          temporary: false,
        },
        overrideAccess: true,
      })
    } catch {
      /* ignore */
    }
  }
}

/* ───────────────── main ───────────────── */

export function withMediaLifecycle(opts: WithMediaLifecycleOpts): CollectionConfig['hooks'] {
  const {
    imageConfigs = [],
    otherUploadFields = [],
    arrayFields = [],
    groupFields = [],
    blockSimpleFields = [],
    blockArrayFields = [],
    blockGroupFields = [],
    blockNestedDeepFields = [],
    blockArrayBlocksFields = [], // NEW
    skipOnDraft = true,
    onAfterChange,
    singleDocSlug,
    collectionSlug,
  } = opts

  // Track simple media (supports dot-paths like "branding.logo")
  const simpleMediaNames = [...imageConfigs.map((c) => c.fieldName), ...otherUploadFields]

  // For delete sweep include both field and fieldOriginal
  const simpleDeleteFields = [...simpleMediaNames, ...simpleMediaNames.map((n) => `${n}Original`)]

  const arrayDeleteFields = arrayFields.map((a) => ({
    field: a.fieldName,
    mediaFields: [...a.mediaFields, ...a.mediaFields.map((n) => `${n}Original`)],
  }))

  const beforeChangeCreator = createBeforeChangeHook({
    imageConfigs,
    arrayFields,
    groupFields,
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
  })

  const stashSessionIdPreHook = ({ req, data }: any) => {
    ;(req as any)._uploadSessionId = data?.uploadSessionId
    return data
  }

  // Dot-path adapter (simple fields only)
  const dotPathPreAdapter = ({ data }: any) => {
    flattenDotFields(data, simpleMediaNames)
    return data
  }
  const dotPathPostAdapter = ({ data }: any) => {
    unflattenDotFields(data, simpleMediaNames)
    return data
  }

  // Cleanup helper for deep nested (blocks → blocks → array → array)
  const cleanupDeepNested = async ({
    req,
    previousDoc,
    doc,
    configs,
  }: {
    req: any
    previousDoc: any
    doc: any
    configs: BlockNestedDeepMediaConfig[]
  }) => {
    if (!configs.length) return
    try {
      const prevIDs = collectDeepNestedIDs(previousDoc ?? {}, configs)
      const curIDs = collectDeepNestedIDs(doc ?? {}, configs)
      const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))
      for (const id of toDelete) {
        try {
          await req.payload.delete({ collection: MEDIA_SLUG, id, overrideAccess: true })
        } catch {}
      }
    } catch (e) {
      req.payload.logger?.warn?.(
        `cleanupDeepNested failed: ${(e as Error)?.message ?? 'unknown error'}`,
      )
    }
  }

  // NEW: Cleanup helper for array → blocks → array
  const cleanupArrayBlocks = async ({
    req,
    previousDoc,
    doc,
    configs,
  }: {
    req: any
    previousDoc: any
    doc: any
    configs: BlockArrayBlocksMediaConfig[]
  }) => {
    if (!configs.length) return
    try {
      const prevIDs = collectArrayBlocksIDs(previousDoc ?? {}, configs)
      const curIDs = collectArrayBlocksIDs(doc ?? {}, configs)
      const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))
      for (const id of toDelete) {
        try {
          await req.payload.delete({ collection: MEDIA_SLUG, id, overrideAccess: true })
        } catch {}
      }
    } catch (e) {
      req.payload.logger?.warn?.(
        `cleanupArrayBlocks failed: ${(e as Error)?.message ?? 'unknown error'}`,
      )
    }
  }

  return {
    beforeValidate: [stashSessionIdPreHook],
    beforeChange: [
      stashSessionIdPreHook,
      dotPathPreAdapter,
      beforeChangeCreator,
      dotPathPostAdapter,
    ],
    afterChange: [
      async ({ req, doc, previousDoc }) => {
        // delete removed relations (existing shapes)
        await deleteRemovedMedia({
          req,
          previousDoc,
          doc,
          mediaFields: simpleDeleteFields,
          arrayFields: arrayDeleteFields,
          groupFields,
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
          skipOnDraft,
        })

        // handle deep nested removals (blocks → blocks → array → array)
        await cleanupDeepNested({
          req,
          previousDoc,
          doc,
          configs: blockNestedDeepFields,
        })

        // NEW: handle array → blocks → array removals
        await cleanupArrayBlocks({
          req,
          previousDoc,
          doc,
          configs: blockArrayBlocksFields,
        })

        // stamp all referenced media
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
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
          blockNestedDeepFields,
          blockArrayBlocksFields, // NEW
        })

        // clear rollback stash
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
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
          skipOnDraft: false,
        })

        // ownerCollection sweep
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
