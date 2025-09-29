// utils/media/createAfterChangeMediaHook.ts
import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import type { CollectionSlug } from 'payload'
import { generateBlurDataURL } from '@/utils/generateBlurDataURL'

type CreatedMedia = { id: string; collection: string }
type TopImageCfg = { fieldName: string; label: string }
type ArrayCfg = { fieldName: string; mediaFields: string[]; itemLabelField?: string }

const DEBUG = !!process.env.DEBUG_MEDIA_HOOKS

function dlog(req: any, ...args: any[]) {
  if (!DEBUG) return
  req?.payload?.logger?.info?.(args.map(String).join(' '))
  console.info(...args)
}
function derror(req: any, ...args: any[]) {
  req?.payload?.logger?.error?.(args.map(String).join(' '))
  console.error(...args)
}

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

function getDocID(doc: any): string {
  const raw = (doc?.id ?? doc?._id)?.toString?.() ?? String(doc?.id ?? doc?._id ?? '')
  if (!raw) throw new Error('saved doc has no id')
  return raw
}

function decodeDataURL(dataURL: string): { buffer: Buffer; mime: string; ext: string } {
  const m = dataURL.match(/^data:(.+);base64,(.*)$/)
  if (!m) throw new Error('Invalid dataURL')
  const mime = m[1]
  const b64 = m[2]
  const buffer = Buffer.from(b64, 'base64')
  const ext = mime.split('/')[1] || 'bin'
  return { buffer, mime, ext }
}

async function mediaExists(req: any, id: string): Promise<boolean> {
  try {
    await req.payload.findByID({
      collection: 'media' as unknown as CollectionSlug,
      id,
      overrideAccess: true,
    })
    return true
  } catch {
    return false
  }
}

function sha256(buf: Buffer): string {
  return crypto.createHash('sha256').update(buf).digest('hex')
}

async function findMediaByHash(req: any, fileHash: string): Promise<string | null> {
  try {
    const res = await req.payload.find({
      collection: 'media' as unknown as CollectionSlug,
      depth: 0,
      limit: 1,
      where: { fileHash: { equals: fileHash } },
      overrideAccess: true,
    })
    return res?.docs?.[0]?.id ?? null
  } catch {
    return null
  }
}

async function createMediaFromBuffer(
  req: any,
  buffer: Buffer,
  alt: string,
  tmpPrefix: string,
  fileHash?: string,
) {
  const tmp = path.join(
    os.tmpdir(),
    `${tmpPrefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.bin`,
  )
  await fs.writeFile(tmp, buffer)
  try {
    const created = await req.payload.create({
      collection: 'media' as unknown as CollectionSlug,
      data: fileHash ? { alt, fileHash } : { alt },
      filePath: tmp,
      overrideAccess: true,
    })
    return String(created.id)
  } finally {
    await fs.unlink(tmp).catch(() => {})
  }
}

export function createAfterChangeMediaHook(opts?: {
  /** Optional explicit slug; falls back to runtime hookArgs.collection.slug */
  collectionSlug?: string
  imageConfigs?: TopImageCfg[]
  arrayFields?: ArrayCfg[]
  processDrafts?: boolean
  failOnBlurError?: boolean
}) {
  const {
    collectionSlug, // ← NEW (optional)
    imageConfigs = [],
    arrayFields = [],
    processDrafts = true,
    failOnBlurError = false,
  } = opts || {}

  return async function afterChange(hookArgs: any) {
    const { req, doc, operation, collection } = hookArgs

    // Resolve slug: explicit option wins; otherwise use runtime
    const runtimeSlug: CollectionSlug | null =
      (collectionSlug as CollectionSlug) || (collection?.slug as CollectionSlug) || null

    if (!runtimeSlug) {
      derror(req, '[afterChange] Missing collection slug (both explicit and runtime).')
      return doc
    }

    try {
      if (operation !== 'create' && operation !== 'update') return doc
      if (req?.context?.__processingMedia) return doc

      const isDraft = doc?._status === 'draft' || req?.query?.draft === 'true'
      if (!processDrafts && isDraft) return doc

      const id = getDocID(doc)
      const createdMedia: CreatedMedia[] = []
      let patch: any = {}
      let touched = false

      const altBase = doc?.title || doc?.heading || 'Document'
      dlog(req, '[afterChange] start | slug=', runtimeSlug, '| id=', id)

      const safeGenBlur = async (buffer: Buffer) => {
        try {
          return await generateBlurDataURL(buffer)
        } catch (e: any) {
          const msg = e?.stack || String(e)
          derror(req, '[afterChange] blur generation failed:', msg)
          if (failOnBlurError) throw e
          return ''
        }
      }

      const processSingleField = async (fieldName: string, label: string) => {
        const cap = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        const pendingOriginalField = `pending${cap}Original`
        const pendingCropField = `pending${cap}Crop`
        const originalField = `${fieldName}Original`
        const blurField = `${fieldName}BlurDataURL`

        const existingMainID = relID(doc[fieldName])
        const existingOrigID = relID(doc[originalField])

        if (existingMainID && !(await mediaExists(req, existingMainID))) {
          dlog(req, `[afterChange] ${fieldName}: existing media id not found; clearing`)
          patch[fieldName] = null
          touched = true
        }
        if (existingOrigID && !(await mediaExists(req, existingOrigID))) {
          dlog(req, `[afterChange] ${originalField}: existing original id not found; clearing`)
          patch[originalField] = null
          touched = true
        }

        if (doc[pendingOriginalField] && typeof doc[pendingOriginalField] === 'string') {
          const { buffer } = decodeDataURL(doc[pendingOriginalField])
          const fileHash = sha256(buffer)
          let mID = await findMediaByHash(req, fileHash)
          if (!mID) {
            mID = await createMediaFromBuffer(
              req,
              buffer,
              `${altBase} ${label} Original`,
              `${fieldName}-orig`,
              fileHash,
            )
            createdMedia.push({ id: mID, collection: 'media' })
            dlog(req, `[afterChange] created original for ${fieldName}:`, mID)
          } else {
            dlog(req, `[afterChange] reused original for ${fieldName}:`, mID)
          }
          patch[originalField] = mID
          patch[pendingOriginalField] = null
          touched = true
        }

        if (doc[pendingCropField] && typeof doc[pendingCropField] === 'string') {
          const { buffer } = decodeDataURL(doc[pendingCropField])
          const fileHash = sha256(buffer)
          let mID = await findMediaByHash(req, fileHash)
          if (!mID) {
            mID = await createMediaFromBuffer(
              req,
              buffer,
              `${altBase} ${label}`,
              `${fieldName}-crop`,
              fileHash,
            )
            createdMedia.push({ id: mID, collection: 'media' })
            dlog(req, `[afterChange] created cropped for ${fieldName}:`, mID)
          } else {
            dlog(req, `[afterChange] reused cropped for ${fieldName}:`, mID)
          }
          patch[fieldName] = mID
          patch[pendingCropField] = null
          patch[blurField] = await safeGenBlur(buffer)
          touched = true
        }
      }

      const processArrayField = async (
        arrayKey: string,
        mediaField: string,
        itemLabelField?: string,
      ) => {
        const arr = Array.isArray(doc[arrayKey]) ? [...doc[arrayKey]] : []
        if (!arr.length) return

        let changedThisArray = false

        for (let i = 0; i < arr.length; i++) {
          const item = arr[i]
          if (!item) continue

          const label = item[itemLabelField || 'label'] || `Item ${i + 1}`
          const cap = mediaField.charAt(0).toUpperCase() + mediaField.slice(1)
          const pendingOriginalField = `pending${cap}Original`
          const pendingCropField = `pending${cap}Crop`
          const originalField = `${mediaField}Original`
          const blurField = `${mediaField}BlurDataURL`

          const existingMainID = relID(item[mediaField])
          const existingOrigID = relID(item[originalField])

          if (existingMainID && !(await mediaExists(req, existingMainID))) {
            dlog(
              req,
              `[afterChange] ${arrayKey}[${i}].${mediaField}: existing id not found; clearing`,
            )
            item[mediaField] = null
            changedThisArray = true
          }
          if (existingOrigID && !(await mediaExists(req, existingOrigID))) {
            dlog(
              req,
              `[afterChange] ${arrayKey}[${i}].${originalField}: existing id not found; clearing`,
            )
            item[originalField] = null
            changedThisArray = true
          }

          if (item[pendingOriginalField] && typeof item[pendingOriginalField] === 'string') {
            const { buffer } = decodeDataURL(item[pendingOriginalField])
            const fileHash = sha256(buffer)
            let mID = await findMediaByHash(req, fileHash)
            if (!mID) {
              mID = await createMediaFromBuffer(
                req,
                buffer,
                `${label} Original`,
                `${arrayKey}-${mediaField}-orig`,
                fileHash,
              )
              createdMedia.push({ id: mID, collection: 'media' })
              dlog(req, `[afterChange] created original for ${arrayKey}[${i}].${mediaField}:`, mID)
            } else {
              dlog(req, `[afterChange] reused original for ${arrayKey}[${i}].${mediaField}:`, mID)
            }
            item[originalField] = mID
            item[pendingOriginalField] = null
            changedThisArray = true
          }

          if (item[pendingCropField] && typeof item[pendingCropField] === 'string') {
            const { buffer } = decodeDataURL(item[pendingCropField])
            const fileHash = sha256(buffer)
            let mID = await findMediaByHash(req, fileHash)
            if (!mID) {
              mID = await createMediaFromBuffer(
                req,
                buffer,
                `${label}`,
                `${arrayKey}-${mediaField}-crop`,
                fileHash,
              )
              createdMedia.push({ id: mID, collection: 'media' })
              dlog(req, `[afterChange] created cropped for ${arrayKey}[${i}].${mediaField}:`, mID)
            } else {
              dlog(req, `[afterChange] reused cropped for ${arrayKey}[${i}].${mediaField}:`, mID)
            }
            item[mediaField] = mID
            item[pendingCropField] = null
            item[blurField] = await safeGenBlur(buffer)
            changedThisArray = true
          }
        }

        if (changedThisArray) {
          patch[arrayKey] = arr
          touched = true
        }
      }

      // Top-level fields
      for (const cfg of imageConfigs) {
        await processSingleField(cfg.fieldName, cfg.label)
      }
      // Array fields
      for (const ac of arrayFields) {
        for (const mediaField of ac.mediaFields) {
          await processArrayField(ac.fieldName, mediaField, ac.itemLabelField)
        }
      }

      if (!touched) {
        dlog(req, '[afterChange] nothing to patch; exit')
        return doc
      }

      try {
        req.context = { ...(req.context || {}), __processingMedia: true }
        dlog(
          req,
          '[afterChange] patching | slug=',
          runtimeSlug,
          '| id=',
          id,
          '| keys=',
          Object.keys(patch),
        )

        const updated = await req.payload.update({
          collection: runtimeSlug,
          id,
          data: patch,
          depth: 0,
          overrideAccess: true,
        })
        dlog(req, '[afterChange] patch complete')
        return updated
      } catch (err: any) {
        const emsg = err?.stack || String(err)
        derror(
          req,
          `[afterChange] patch failed (slug=${runtimeSlug}, id=${id}); rolling back.`,
          emsg,
        )
        for (const m of createdMedia) {
          try {
            await req.payload.delete({
              collection: 'media' as unknown as CollectionSlug,
              id: m.id,
              overrideAccess: true,
            })
            dlog(req, '[afterChange] rollback deleted media', m.id)
          } catch (e: any) {
            derror(req, '[afterChange] rollback failed for', m.id, e?.stack || String(e))
          }
        }
        throw new Error(`[afterChange] media patch failed: ${err?.message || err}`)
      } finally {
        if (req?.context) delete req.context.__processingMedia
      }
    } catch (outer: any) {
      const msg = outer?.stack || String(outer)
      derror(req, '[afterChange] FATAL:', msg)
      throw new Error(`[afterChange] ${outer?.message || outer}`)
    }
  }
}
