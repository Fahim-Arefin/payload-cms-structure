// // collection config 100% code
// import path from 'node:path'
// import os from 'node:os'
// import fs from 'node:fs/promises'
// import type { CollectionSlug } from 'payload'
// import { generateBlurDataURL } from '@/utils/generateBlurDataURL'

// export const MEDIA_SLUG = 'media' as CollectionSlug

// export interface ImageConfig {
//   fieldName: string
//   label: string
//   description: string
//   aspectRatio: number
//   quality?: number
//   maxKB?: number
//   minWidth?: number
//   minHeight?: number
// }

// export interface CreatedMedia {
//   id: string
//   collection: CollectionSlug
// }

// // per-request tracker
// export function trackReqCreatedMedia(
//   req: any,
//   id: string,
//   collection: CollectionSlug = MEDIA_SLUG,
// ) {
//   const r = req as any
//   if (!Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []
//   r._createdMediaForRollback.push({ id, collection })
// }

// export function decodeDataURL(dataURL: string): { buffer: Buffer; mime: string; ext: string } {
//   const m = dataURL.match(/^data:(.+);base64,(.*)$/)
//   if (!m) throw new Error('Invalid dataURL')
//   const mime = m[1]
//   const b64 = m[2]
//   const buffer = Buffer.from(b64, 'base64')
//   const ext = mime.split('/')[1] || 'bin'
//   return { buffer, mime, ext }
// }

// /**
//  * CREATE-only (no deletions here). Deletions happen in afterChange.
//  */
// export async function processImageField(args: {
//   data: any
//   fieldConfig: ImageConfig
//   originalDoc: any
//   req: any
//   altBase: string
//   createdMedia?: CreatedMedia[]
// }): Promise<void> {
//   const { data, fieldConfig, req, altBase, createdMedia } = args
//   const { fieldName, label } = fieldConfig

//   const Caps = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//   const pendingOriginalField = `pending${Caps}Original`
//   const pendingCropField = `pending${Caps}Crop`
//   const originalField = `${fieldName}Original`
//   const blurDataURLField = `${fieldName}BlurDataURL`

//   // original
//   if (data[pendingOriginalField] && typeof data[pendingOriginalField] === 'string') {
//     const { buffer, ext } = decodeDataURL(data[pendingOriginalField])
//     const tmp = path.join(
//       os.tmpdir(),
//       `${fieldName}-original-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`,
//     )
//     await fs.writeFile(tmp, buffer)
//     const created = await req.payload.create({
//       collection: MEDIA_SLUG,
//       data: { alt: `${altBase} ${label} Original` },
//       filePath: tmp,
//     })
//     await fs.unlink(tmp).catch(() => {})
//     if (createdMedia) createdMedia.push({ id: created.id, collection: MEDIA_SLUG })
//     trackReqCreatedMedia(req, created.id, MEDIA_SLUG)
//     data[originalField] = created.id
//     data[pendingOriginalField] = undefined
//   }

//   // crop
//   if (data[pendingCropField] && typeof data[pendingCropField] === 'string') {
//     const { buffer, ext } = decodeDataURL(data[pendingCropField])
//     const tmp = path.join(
//       os.tmpdir(),
//       `${fieldName}-crop-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`,
//     )
//     await fs.writeFile(tmp, buffer)
//     const cropped = await req.payload.create({
//       collection: MEDIA_SLUG,
//       data: { alt: `${altBase} ${label}` },
//       filePath: tmp,
//     })
//     await fs.unlink(tmp).catch(() => {})
//     if (createdMedia) createdMedia.push({ id: cropped.id, collection: MEDIA_SLUG })
//     trackReqCreatedMedia(req, cropped.id, MEDIA_SLUG)
//     data[fieldName] = cropped.id
//     data[pendingCropField] = undefined
//     data[blurDataURLField] = await generateBlurDataURL(buffer)
//   }
// }

// // delete newly-created media on failure
// export async function rollbackCreatedMedia(req: any, createdMedia: CreatedMedia[]): Promise<void> {
//   for (const media of createdMedia) {
//     try {
//       await req.payload.delete({ collection: media.collection, id: media.id })
//       req.payload.logger?.info?.(`Rollback: Deleted media ${media.id}`)
//     } catch (e) {
//       req.payload.logger?.warn?.(`Rollback delete failed for ${media.id}: ${(e as Error).message}`)
//     }
//   }
// }

// ==============================================================
// ==============================================================
// ==============================================================
// 100% solved code
import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs/promises'
import type { CollectionSlug } from 'payload'
import { generateBlurDataURL } from '@/utils/generateBlurDataURL'

export const MEDIA_SLUG = 'media' as CollectionSlug

export interface ImageConfig {
  fieldName: string
  label: string
  description: string
  aspectRatio: number
  quality?: number
  maxKB?: number
  minWidth?: number
  minHeight?: number
  required?: boolean
}

export interface CreatedMedia {
  id: string
  collection: CollectionSlug
}

// per-request tracker
export function trackReqCreatedMedia(
  req: any,
  id: string,
  collection: CollectionSlug = MEDIA_SLUG,
) {
  const r = req as any
  if (!Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []
  r._createdMediaForRollback.push({ id, collection })
}

export function decodeDataURL(dataURL: string): { buffer: Buffer; mime: string; ext: string } {
  const m = dataURL.match(/^data:(.+);base64,(.*)$/)
  if (!m) throw new Error('Invalid dataURL')
  const mime = m[1]
  const b64 = m[2]
  const buffer = Buffer.from(b64, 'base64')
  const ext = mime.split('/')[1] || 'bin'
  return { buffer, mime, ext }
}

/**
 * CREATE-only (no deletions here). Deletions happen in afterChange.
 */
export async function processImageField(args: {
  data: any
  fieldConfig: ImageConfig
  originalDoc: any
  req: any
  altBase: string
  createdMedia?: CreatedMedia[]
}): Promise<void> {
  const { data, fieldConfig, req, altBase, createdMedia } = args
  const { fieldName, label } = fieldConfig

  const Caps = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  const pendingOriginalField = `pending${Caps}Original`
  const pendingCropField = `pending${Caps}Crop`
  const originalField = `${fieldName}Original`
  const blurDataURLField = `${fieldName}BlurDataURL`

  // original
  if (data[pendingOriginalField] && typeof data[pendingOriginalField] === 'string') {
    const { buffer, ext } = decodeDataURL(data[pendingOriginalField])
    const tmp = path.join(
      os.tmpdir(),
      `${fieldName}-original-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`,
    )
    await fs.writeFile(tmp, buffer)
    const created = await req.payload.create({
      collection: MEDIA_SLUG,
      data: { alt: `${altBase} ${label} Original` },
      filePath: tmp,
    })
    await fs.unlink(tmp).catch(() => {})
    if (createdMedia) createdMedia.push({ id: created.id, collection: MEDIA_SLUG })
    trackReqCreatedMedia(req, created.id, MEDIA_SLUG)
    data[originalField] = created.id
    data[pendingOriginalField] = undefined
  }

  // crop
  if (data[pendingCropField] && typeof data[pendingCropField] === 'string') {
    const { buffer, ext } = decodeDataURL(data[pendingCropField])
    const tmp = path.join(
      os.tmpdir(),
      `${fieldName}-crop-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`,
    )
    await fs.writeFile(tmp, buffer)
    const cropped = await req.payload.create({
      collection: MEDIA_SLUG,
      data: { alt: `${altBase} ${label}` },
      filePath: tmp,
    })
    await fs.unlink(tmp).catch(() => {})
    if (createdMedia) createdMedia.push({ id: cropped.id, collection: MEDIA_SLUG })
    trackReqCreatedMedia(req, cropped.id, MEDIA_SLUG)
    data[fieldName] = cropped.id
    data[pendingCropField] = undefined
    data[blurDataURLField] = await generateBlurDataURL(buffer)
  }
}

// delete newly-created media on failure
export async function rollbackCreatedMedia(req: any, createdMedia: CreatedMedia[]): Promise<void> {
  for (const media of createdMedia) {
    try {
      await req.payload.delete({ collection: media.collection, id: media.id })
      req.payload.logger?.info?.(`Rollback: Deleted media ${media.id}`)
    } catch (e) {
      req.payload.logger?.warn?.(`Rollback delete failed for ${media.id}: ${(e as Error).message}`)
    }
  }
}
