// // src/utils/media/deleteRemovedMedia.ts
// import { MEDIA_SLUG } from './mediaUtils'

// type AnyDoc = Record<string, any>

// function relID(v: any): string | null {
//   if (!v) return null
//   if (typeof v === 'string') return v
//   if (typeof v === 'object') {
//     if (typeof v.value === 'string') return v.value
//     if (typeof v.value?.id === 'string') return v.value.id
//     if (typeof v.id === 'string') return v.id
//   }
//   return null
// }

// function diffRemoved(prev: string[], next: string[]): string[] {
//   const nextSet = new Set(next)
//   return prev.filter((id) => !nextSet.has(id))
// }

// export async function deleteRemovedMedia(options: {
//   req: any
//   previousDoc: AnyDoc | null
//   doc: AnyDoc
//   /** Simple top-level media fields on the document (base names only; we add *Original automatically) */
//   mediaFields?: string[]
//   /** One-level arrays: array field name + media field base names (we add *Original automatically) */
//   arrayFields?: Array<{ field: string; mediaFields: string[] }>
//   /**
//    * Nested arrays:
//    * - groupKey: first-level array (or object)
//    * - arrayKey: nested array inside each group item
//    * - mediaFields: base names (we add *Original automatically)
//    */
//   groupFields?: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>
//   /** Skip deletions for drafts (default: true) */
//   skipOnDraft?: boolean
// }): Promise<void> {
//   const {
//     req,
//     previousDoc,
//     doc,
//     mediaFields = [],
//     arrayFields = [],
//     groupFields = [],
//     skipOnDraft = true,
//   } = options

//   if (skipOnDraft) {
//     const isDraftQuery = req?.query?.draft === 'true'
//     const isDraftDoc = doc?._status === 'draft'
//     if (isDraftQuery || isDraftDoc) return
//   }

//   const addFieldPairIDs = (set: Set<string>, holder: AnyDoc, baseField: string) => {
//     // Field itself
//     const id = relID(holder?.[baseField])
//     if (id) set.add(id)
//     // Original twin
//     const orig = relID(holder?.[`${baseField}Original`])
//     if (orig) set.add(orig)
//   }

//   const collectMediaIDs = (document: AnyDoc): string[] => {
//     const out = new Set<string>()

//     // 1) Simple top-level fields
//     for (const field of mediaFields) {
//       addFieldPairIDs(out, document, field)
//     }

//     // 2) One-level arrays
//     for (const a of arrayFields) {
//       const items = document?.[a.field]
//       if (Array.isArray(items)) {
//         for (const item of items) {
//           for (const mf of a.mediaFields) {
//             addFieldPairIDs(out, item, mf)
//           }
//         }
//       }
//     }

//     // 3) Nested arrays (groupFields)
//     for (const g of groupFields) {
//       const groupHolder = document?.[g.groupKey]

//       // Case A: groupKey points to an ARRAY (e.g., sections[])
//       if (Array.isArray(groupHolder)) {
//         for (const groupItem of groupHolder) {
//           const nestedItems = groupItem?.[g.arrayKey]
//           if (Array.isArray(nestedItems)) {
//             for (const nestedItem of nestedItems) {
//               for (const mf of g.mediaFields) {
//                 addFieldPairIDs(out, nestedItem, mf)
//               }
//             }
//           }
//         }
//       }
//       // Case B: groupKey points to an OBJECT (original behavior)
//       else if (groupHolder && typeof groupHolder === 'object') {
//         const nestedItems = groupHolder?.[g.arrayKey]
//         if (Array.isArray(nestedItems)) {
//           for (const nestedItem of nestedItems) {
//             for (const mf of g.mediaFields) {
//               addFieldPairIDs(out, nestedItem, mf)
//             }
//           }
//         }
//       }
//       // else: nothing to collect
//     }

//     return Array.from(out)
//   }

//   const prevIDs = previousDoc ? collectMediaIDs(previousDoc) : []
//   const nextIDs = collectMediaIDs(doc)
//   const toDelete = diffRemoved(prevIDs, nextIDs)

//   for (const id of new Set(toDelete)) {
//     try {
//       await req.payload.delete({ collection: MEDIA_SLUG, id })
//       req.payload.logger?.info?.(`Deleted removed media: ${id}`)
//     } catch (err) {
//       req.payload.logger?.warn?.(`Failed to delete media ${id}: ${(err as Error).message}`)
//     }
//   }
// }

// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================

// src/utils/media/deleteRemovedMedia.ts
import { MEDIA_SLUG } from './mediaUtils'
import type {
  BlockSimpleMediaConfig,
  BlockArrayMediaConfig,
  BlockGroupMediaConfig,
} from './withMediaLifecycle'

type AnyDoc = Record<string, any>

function relID(v: any): string | null {
  if (!v) return null
  if (typeof v === 'string') return v
  if (typeof v === 'object') {
    if (typeof v.value === 'string') return v.value
    if (typeof v.value?.id === 'string') return v.value.id
    if (typeof v.id === 'string') return v.id
  }
  return null
}

function diffRemoved(prev: string[], next: string[]): string[] {
  const nextSet = new Set(next)
  return prev.filter((id) => !nextSet.has(id))
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

export async function deleteRemovedMedia(options: {
  req: any
  previousDoc: AnyDoc | null
  doc: AnyDoc
  mediaFields?: string[]
  arrayFields?: Array<{ field: string; mediaFields: string[] }>
  groupFields?: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>
  // NEW:
  blockSimpleFields?: BlockSimpleMediaConfig[]
  blockArrayFields?: BlockArrayMediaConfig[]
  blockGroupFields?: BlockGroupMediaConfig[]
  /** Skip deletions for drafts (default: true) */
  skipOnDraft?: boolean
}): Promise<void> {
  const {
    req,
    previousDoc,
    doc,
    mediaFields = [],
    arrayFields = [],
    groupFields = [],
    blockSimpleFields = [],
    blockArrayFields = [],
    blockGroupFields = [],
    skipOnDraft = true,
  } = options

  if (skipOnDraft) {
    const isDraftQuery = req?.query?.draft === 'true'
    const isDraftDoc = doc?._status === 'draft'
    if (isDraftQuery || isDraftDoc) return
  }

  const addFieldPairIDs = (set: Set<string>, holder: AnyDoc, baseField: string) => {
    const id = relID(holder?.[baseField])
    if (id) set.add(id)
    const orig = relID(holder?.[`${baseField}Original`])
    if (orig) set.add(orig)
  }

  const collectMediaIDs = (document: AnyDoc): string[] => {
    const out = new Set<string>()

    // 1) Simple top-level fields
    for (const field of mediaFields) addFieldPairIDs(out, document, field)

    // 2) One-level arrays
    for (const a of arrayFields) {
      const items = document?.[a.field]
      if (Array.isArray(items)) {
        for (const item of items) for (const mf of a.mediaFields) addFieldPairIDs(out, item, mf)
      }
    }

    // 3) Nested arrays (groupFields)
    for (const g of groupFields) {
      const groupHolder = document?.[g.groupKey]
      if (Array.isArray(groupHolder)) {
        for (const groupItem of groupHolder) {
          const nestedItems = groupItem?.[g.arrayKey]
          if (Array.isArray(nestedItems)) {
            for (const nestedItem of nestedItems) {
              for (const mf of g.mediaFields) addFieldPairIDs(out, nestedItem, mf)
            }
          }
        }
      } else if (groupHolder && typeof groupHolder === 'object') {
        const nestedItems = groupHolder?.[g.arrayKey]
        if (Array.isArray(nestedItems)) {
          for (const nestedItem of nestedItems) {
            for (const mf of g.mediaFields) addFieldPairIDs(out, nestedItem, mf)
          }
        }
      }
    }

    // 4) NEW — Blocks: simple fields
    for (const b of blockSimpleFields) {
      eachBlockRow(document, b.layoutKey, b.blockType, (row) => {
        for (const mf of b.mediaFields) addFieldPairIDs(out, row, mf)
      })
    }

    // 5) NEW — Blocks: array items
    for (const b of blockArrayFields) {
      eachBlockRow(document, b.layoutKey, b.blockType, (row) => {
        const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
        for (const item of items) for (const mf of b.mediaFields) addFieldPairIDs(out, item, mf)
      })
    }

    // 6) NEW — Blocks: group -> nested array
    for (const b of blockGroupFields) {
      eachBlockRow(document, b.layoutKey, b.blockType, (row) => {
        const groups = Array.isArray(row?.[b.groupKey]) ? row[b.groupKey] : []
        for (const g of groups) {
          const nestedItems = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
          for (const nested of nestedItems)
            for (const mf of b.mediaFields) addFieldPairIDs(out, nested, mf)
        }
      })
    }

    return Array.from(out)
  }

  const prevIDs = previousDoc ? collectMediaIDs(previousDoc) : []
  const nextIDs = collectMediaIDs(doc)
  const toDelete = diffRemoved(prevIDs, nextIDs)

  for (const id of new Set(toDelete)) {
    try {
      await req.payload.delete({ collection: MEDIA_SLUG, id })
      req.payload.logger?.info?.(`Deleted removed media: ${id}`)
    } catch (err) {
      req.payload.logger?.warn?.(`Failed to delete media ${id}: ${(err as Error).message}`)
    }
  }
}
