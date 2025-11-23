// // // currently working code
// 'use client'

// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import Cropper, { Area, Point } from 'react-easy-crop'
// import { useField } from '@payloadcms/ui'

// type AdminFieldProps = {
//   path: string
//   value?: any
//   label?: string
//   required?: boolean
//   readOnly?: boolean
//   field?: any // has relationTo + cropper config
// }

// /* ---------- helpers ---------- */

// const DIRECT_UPLOAD = true

// const fileToDataURL = (file: File) =>
//   new Promise<string>((res, rej) => {
//     const fr = new FileReader()
//     fr.onload = () => res(String(fr.result))
//     fr.onerror = rej
//     fr.readAsDataURL(file)
//   })

// const blobToDataURL = (blob: Blob) =>
//   new Promise<string>((res, rej) => {
//     const fr = new FileReader()
//     fr.onload = () => res(String(fr.result))
//     fr.onerror = rej
//     fr.readAsDataURL(blob)
//   })

// const loadImage = (src: string) =>
//   new Promise<HTMLImageElement>((resolve, reject) => {
//     const img = new Image()
//     if (!src.startsWith('data:')) {
//       img.crossOrigin = 'anonymous'
//     }
//     img.onload = () => resolve(img)
//     img.onerror = reject
//     img.src = src
//   })

// async function getCroppedBlob(
//   dataURL: string,
//   cropPx: Area,
//   outType: string,
//   quality: number,
//   targetWidth?: number,
// ): Promise<Blob> {
//   const img = await loadImage(dataURL)

//   const outW = targetWidth ? Math.round(targetWidth) : Math.round(cropPx.width)
//   const scale = outW / cropPx.width
//   const outH = Math.round(cropPx.height * scale)

//   const canvas = document.createElement('canvas')
//   canvas.width = outW
//   canvas.height = outH
//   const ctx = canvas.getContext('2d')
//   if (!ctx) throw new Error('Canvas 2D context not available')

//   ctx.drawImage(
//     img,
//     Math.round(cropPx.x),
//     Math.round(cropPx.y),
//     Math.round(cropPx.width),
//     Math.round(cropPx.height),
//     0,
//     0,
//     outW,
//     outH,
//   )

//   return new Promise<Blob>((resolve, reject) => {
//     canvas.toBlob(
//       (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
//       outType,
//       quality,
//     )
//   })
// }

// /** Tiny canvas downscale (≈24px wide) + mild blur; returns base64 dataURL (no sharp). */
// async function makeTinyBlurDataURL(
//   srcDataURL: string,
//   maxWidth = 24,
//   mime = 'image/webp',
//   quality = 0.6,
// ): Promise<string> {
//   const img = await loadImage(srcDataURL)
//   const w = Math.max(1, Math.min(maxWidth, img.width))
//   const h = Math.max(1, Math.round((img.height * w) / img.width))

//   const canvas = document.createElement('canvas')
//   canvas.width = w
//   canvas.height = h
//   const ctx = canvas.getContext('2d')
//   if (!ctx) throw new Error('Canvas 2D context not available')
//   ;(ctx as any).filter = 'blur(1px)'
//   ctx.drawImage(img, 0, 0, w, h)
//   return canvas.toDataURL(mime, quality)
// }

// function replaceLastSegment(path: string, newName: string) {
//   const parts = path.split('.')
//   parts[parts.length - 1] = newName
//   return parts.join('.')
// }

// // estimate bytes from a dataURL (base64)
// function dataURLSize(dataURL: string) {
//   const base64 = dataURL.split(',')[1] ?? ''
//   const padding = (base64.match(/=+$/) || [''])[0].length
//   return Math.floor((base64.length * 3) / 4) - padding
// }

// function formatBytes(bytes?: number) {
//   if (bytes === undefined || bytes === null) return ''
//   const units = ['B', 'KB', 'MB', 'GB']
//   let i = 0
//   let n = bytes
//   while (n >= 1024 && i < units.length - 1) {
//     n /= 1024
//     i++
//   }
//   const decimals = n < 10 && i > 0 ? 1 : 0
//   return `${n.toFixed(decimals)} ${units[i]}`
// }

// function uuid() {
//   return (
//     (globalThis.crypto?.randomUUID?.() as string) ||
//     Math.random().toString(36).slice(2) + Date.now()
//   )
// }

// /** sanitize to a safe, extension-less base (no dots, spaces -> dashes) */
// function safeBase(filename: string) {
//   const name = filename.replace(/\.[^.]+$/, '')
//   return name
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9-_]+/g, '-')
//     .replace(/-+/g, '-')
//     .replace(/^-|-$/g, '')
// }

// /** map mime or outputType to extension */
// function extFromMime(m: string): string {
//   if (!m) return 'webp'
//   const mime = m.toLowerCase()
//   if (mime.includes('jpeg') || mime.includes('jpg')) return 'jpg'
//   if (mime.includes('png')) return 'png'
//   if (mime.includes('gif')) return 'gif'
//   if (mime.includes('bmp')) return 'bmp'
//   if (mime.includes('svg')) return 'svg'
//   return 'webp'
// }

// /* ---------- component ---------- */

// const CropUploadField: React.FC<AdminFieldProps> = ({
//   label = 'Image',
//   required,
//   readOnly,
//   value,
//   path,
//   field,
// }) => {
//   // bind to this field (relationship 'image')
//   const { value: formValue, setValue } = useField<any>({ path })

//   // per-field config (from generator)
//   const cfg = (field as any)?.cropper ?? {}
//   const aspect: number = cfg.aspect ?? 16 / 9
//   const outputType: string = cfg.outputType ?? 'image/webp'
//   const quality: number = cfg.quality ?? 0.9
//   const acceptCfg: string | string[] = cfg.accept ?? outputType
//   const acceptAttr = Array.isArray(acceptCfg) ? acceptCfg.join(',') : acceptCfg
//   const maxKB: number | undefined = cfg.maxKB
//   const maxKBOriginal: number | undefined = cfg.maxKBOriginal
//   const targetWidth: number | undefined = cfg.targetWidth
//   const previewSizeKey: string | undefined = cfg.previewSize
//   const defaultAlt: string = cfg.defaultAlt ?? 'Cropped image'
//   const relationTo: string = (field as any)?.relationTo || 'media'
//   const ownerCollection: string | undefined = cfg.ownerCollection // provided by generator
//   const baseFieldName: string = (field as any)?.name || 'image'
//   const blurFieldName: string = `${baseFieldName}BlurDataURL`

//   // names for hidden sibling fields
//   const originalFieldName: string = cfg.originalField ?? 'originalImage'
//   const pendingOriginalFieldName: string = cfg.pendingOriginalField ?? 'pendingOriginal'
//   const pendingCropFieldName: string = cfg.pendingCropField ?? 'pendingCrop'

//   // bind siblings (so we can restore original on Edit)
//   const originalPath = useMemo(
//     () => replaceLastSegment(path, originalFieldName),
//     [path, originalFieldName],
//   )
//   const { value: originalId, setValue: setOriginalId } = useField<any>({ path: originalPath })

//   const pendingOriginalPath = useMemo(
//     () => replaceLastSegment(path, pendingOriginalFieldName),
//     [path, pendingOriginalFieldName],
//   )
//   const { value: pendingOriginal, setValue: setPendingOriginal } = useField<any>({
//     path: pendingOriginalPath,
//   })

//   const pendingCropPath = useMemo(
//     () => replaceLastSegment(path, pendingCropFieldName),
//     [path, pendingCropFieldName],
//   )
//   const { value: pendingCrop, setValue: setPendingCrop } = useField<any>({ path: pendingCropPath })

//   // 👇 doc-level blur field (already exists in your generator)
//   const blurPath = useMemo(() => replaceLastSegment(path, blurFieldName), [path, blurFieldName])
//   const { setValue: setDocBlur } = useField<string>({ path: blurPath })

//   // 🔐 per-document session id (hidden root field)
//   const { value: sessionId, setValue: setSessionId } = useField<string>({ path: 'uploadSessionId' })
//   useEffect(() => {
//     if (!sessionId) setSessionId(uuid())
//   }, [sessionId, setSessionId])

//   // UI state
//   const [src, setSrc] = useState<string | null>(null)
//   const [alt, setAlt] = useState<string>(defaultAlt)
//   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
//   const [zoom, setZoom] = useState<number>(1)
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
//   const [busy, setBusy] = useState(false)
//   const [error, setError] = useState<string>('')

//   // preview + sizes
//   const [preview, setPreview] = useState<{ id?: string; url?: string; filename?: string } | null>(
//     null,
//   )
//   const [sizes, setSizes] = useState<{ original?: number; cropped?: number }>({})

//   const fileInputRef = useRef<HTMLInputElement>(null)

//   // 🧹 track temp media created during this edit (for this field)
//   const [tempOriginalId, setTempOriginalId] = useState<string | null>(null)
//   const [tempCroppedId, setTempCroppedId] = useState<string | null>(null)

//   // filename bases (for naming crop)
//   const [origName, setOrigName] = useState<string>('')

//   // normalize current saved image id
//   const currentId: string | null = useMemo(() => {
//     const v = formValue ?? value
//     if (!v) return null
//     if (typeof v === 'string') return v
//     if (typeof v === 'object') {
//       if ('value' in v && v?.value) return v.value as string
//       if ('id' in v && v?.id) return v.id as string
//     }
//     return null
//   }, [formValue, value])

//   // preview priority: pendingCrop → saved doc → nothing
//   useEffect(() => {
//     let stop = false

//     if (typeof pendingCrop === 'string') {
//       setPreview({ url: pendingCrop, filename: 'pending.webp' })
//       setSizes((s) => ({ ...s, cropped: dataURLSize(pendingCrop) }))
//       return
//     }

//     ;(async () => {
//       if (!currentId) {
//         setPreview(null)
//         return
//       }
//       try {
//         const res = await fetch(`/api/${relationTo}/${currentId}?depth=0`, {
//           credentials: 'include',
//         })
//         const json = await res.json()
//         const doc = json?.doc ?? json
//         const url = (previewSizeKey && doc?.sizes?.[previewSizeKey]?.url) || doc?.url
//         setPreview({ id: doc?.id ?? currentId, url, filename: doc?.filename })
//         if (typeof doc?.filesize === 'number') setSizes((s) => ({ ...s, cropped: doc.filesize }))
//         if (doc?.alt) setAlt(doc.alt)

//         // remember base of original filename (for crop naming)
//         if (doc?.filename) {
//           setOrigName(doc.filename.replace(/\.[^.]+$/, ''))
//         }
//       } catch {
//         if (!stop) setPreview({ id: currentId, url: undefined, filename: undefined })
//       }
//     })()

//     return () => {
//       stop = true
//     }
//   }, [currentId, relationTo, previewSizeKey, pendingCrop])

//   const onCropComplete = useCallback(
//     (_: Area, areaPixels: Area) => setCroppedAreaPixels(areaPixels),
//     [],
//   )

//   const resetLocal = () => {
//     setSrc(null)
//     setZoom(1)
//     setCrop({ x: 0, y: 0 })
//     setCroppedAreaPixels(null)
//     setError('')
//     if (fileInputRef.current) fileInputRef.current.value = ''
//   }

//   // direct upload helpers
//   async function uploadBlobToMedia(
//     fileOrBlob: Blob | File,
//     altText: string,
//     ownerField: string,
//     blurDataURL?: string,
//     forcedFilename?: string, // 👈 NEW: enforce filename
//   ) {
//     const fd = new FormData()
//     const name =
//       forcedFilename ||
//       (fileOrBlob as File).name ||
//       `upload-${Date.now()}.${extFromMime((fileOrBlob as any).type || 'image/webp')}`

//     fd.append('file', fileOrBlob, name)
//     fd.append('alt', altText || 'Image')
//     fd.append('temporary', 'true')
//     if (sessionId) fd.append('uploadSessionId', sessionId)
//     if (ownerCollection) fd.append('ownerCollection', String(ownerCollection))
//     fd.append('ownerField', ownerField)
//     if (blurDataURL) fd.append('blurDataURL', blurDataURL) // optional: store blur on Media

//     const res = await fetch('/api/media', { method: 'POST', body: fd, credentials: 'include' })
//     if (!res.ok) throw new Error(`Upload failed (${res.status})`)
//     const json = await res.json()
//     return json?.doc ?? json
//   }

//   async function deleteMedia(id?: string | null) {
//     if (!id) return
//     try {
//       await fetch(`/api/media/${id}`, { method: 'DELETE', credentials: 'include' })
//     } catch {
//       // ignore
//     }
//   }

//   // choose file: validate + (direct upload original with tiny blur) OR base64 path
//   const onSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     setError('')
//     const f = e.target.files?.[0]
//     if (!f) return

//     const allows = Array.isArray(acceptCfg) ? acceptCfg : [acceptCfg]
//     const okType = allows.some((a) =>
//       a.endsWith('/*') ? f.type.startsWith(a.slice(0, a.indexOf('/')) + '/') : f.type === a,
//     )
//     if (!okType) {
//       setError(`Invalid format: ${f.type || '(unknown)'} — allowed: ${allows.join(', ')}`)
//       e.target.value = ''
//       return
//     }

//     if (typeof maxKBOriginal === 'number' && f.size / 1024 > maxKBOriginal) {
//       setError(`File too large: ${(f.size / 1024).toFixed(0)} KB. Max is ${maxKBOriginal} KB.`)
//       e.target.value = ''
//       return
//     }

//     setBusy(true)
//     try {
//       // Prepare preview + tiny blur first (so we can save blur into doc)
//       const dataURL = await fileToDataURL(f)
//       await loadImage(dataURL) // pre-load
//       const tinyBlur = await makeTinyBlurDataURL(dataURL)
//       setDocBlur(tinyBlur)

//       if (DIRECT_UPLOAD) {
//         // delete any previous temps made by this field
//         if (tempCroppedId) {
//           await deleteMedia(tempCroppedId)
//           setTempCroppedId(null)
//         }
//         if (tempOriginalId) {
//           await deleteMedia(tempOriginalId)
//           setTempOriginalId(null)
//         }

//         // Build clean original filename (base + normalized/converted extension)
//         const baseOriginal = safeBase(f.name)
//         const originalExt = extFromMime(f.type) // keep original type family (jpeg -> jpg)
//         const originalName = `${baseOriginal}.${originalExt}`
//         setOrigName(baseOriginal) // store base only; we'll use it for the crop

//         // upload original with enforced filename
//         const origDoc = await uploadBlobToMedia(
//           f,
//           `${label} Original`,
//           `${(field as any)?.name}Original`,
//           tinyBlur,
//           originalName, // 👈 enforce filename (client)
//         )
//         setOriginalId(origDoc.id)
//         setTempOriginalId(origDoc.id)

//         // open local crop UI (from the fresh original)
//         setSrc(dataURL)
//         setSizes({ original: f.size, cropped: undefined })
//         setCrop({ x: 0, y: 0 })
//         setZoom(1)
//         setCroppedAreaPixels(null)
//       } else {
//         // legacy base64 path
//         setSrc(dataURL)
//         setPendingOriginal(dataURL)
//         setOriginalId(null)
//         setPendingCrop(null)
//         setSizes({ original: f.size, cropped: undefined })
//         setCrop({ x: 0, y: 0 })
//         setZoom(1)
//         setCroppedAreaPixels(null)
//       }
//     } catch (err: any) {
//       setError(err?.message || 'Failed to load image')
//       e.target.value = ''
//     } finally {
//       setBusy(false)
//     }
//   }

//   // create cropped image: direct upload + replace temp + tiny blur (doc)
//   const createPendingCrop = useCallback(async () => {
//     if (!src || !croppedAreaPixels) {
//       setError('Please select an image and adjust the crop first.')
//       return
//     }
//     setBusy(true)
//     setError('')
//     try {
//       const blob = await getCroppedBlob(src, croppedAreaPixels, outputType, quality, targetWidth)

//       if (typeof maxKB === 'number' && blob.size / 1024 > maxKB) {
//         setBusy(false)
//         setError(`Cropped file too large: ${(blob.size / 1024).toFixed(0)} KB. Max is ${maxKB} KB.`)
//         return
//       }

//       // make tiny blur from the cropped blob and save to doc
//       const croppedDataURL = await blobToDataURL(blob)
//       const tinyBlur = await makeTinyBlurDataURL(croppedDataURL)
//       setDocBlur(tinyBlur)

//       if (DIRECT_UPLOAD) {
//         if (tempCroppedId) {
//           await deleteMedia(tempCroppedId)
//           setTempCroppedId(null)
//         }

//         // filename: <original-base>-crop.<ext>
//         const base = safeBase(origName || preview?.filename || String(label) || 'image')
//         const ext = extFromMime(outputType)
//         const cropName = `${base}-crop.${ext}`

//         const croppedDoc = await uploadBlobToMedia(
//           blob,
//           String(label),
//           (field as any)?.name,
//           tinyBlur,
//           cropName, // 👈 enforce crop filename
//         )
//         setValue(croppedDoc.id)
//         setTempCroppedId(croppedDoc.id)
//         setPreview({ id: croppedDoc.id, url: croppedDoc.url, filename: croppedDoc.filename })
//         setSizes((s) => ({ ...s, cropped: croppedDoc.filesize }))
//         resetLocal()
//         return
//       }

//       // legacy base64 (not used in DIRECT mode)
//       setPendingCrop(croppedDataURL)
//       setPreview({ url: croppedDataURL })
//       setSizes((s) => ({ ...s, cropped: blob.size }))

//       resetLocal()
//     } catch (err: any) {
//       setError(err?.message || 'Failed to prepare cropped image')
//     } finally {
//       setBusy(false)
//     }
//   }, [
//     src,
//     croppedAreaPixels,
//     outputType,
//     quality,
//     targetWidth,
//     maxKB,
//     label,
//     field,
//     tempCroppedId,
//     setDocBlur,
//     origName,
//     preview?.filename,
//   ])

//   // Edit from original (use server original if we have id)
//   const startEditOriginal = useCallback(async () => {
//     setError('')

//     if (!DIRECT_UPLOAD && typeof pendingOriginal === 'string') {
//       setSrc(pendingOriginal)
//       setSizes((s) => ({ ...s, original: dataURLSize(pendingOriginal) }))
//       setCrop({ x: 0, y: 0 })
//       setZoom(1)
//       return
//     }

//     if (originalId) {
//       try {
//         const res = await fetch(`/api/${relationTo}/${originalId}?depth=0`, {
//           credentials: 'include',
//         })
//         const json = await res.json()
//         const url = json?.doc?.url || json?.url
//         const size = json?.doc?.filesize ?? json?.filesize
//         if (url) {
//           setSrc(url)
//           if (typeof size === 'number') setSizes((s) => ({ ...s, original: size }))
//           setCrop({ x: 0, y: 0 })
//           setZoom(1)
//           return
//         }
//       } catch {
//         /* noop */
//       }
//     }

//     if (preview?.url) {
//       setSrc(preview.url)
//       setCrop({ x: 0, y: 0 })
//       setZoom(1)
//     }
//   }, [pendingOriginal, originalId, relationTo, preview?.url])

//   // Remove everything for this field (delete temps only; persisted refs removed on save)
//   const removeAll = async () => {
//     await deleteMedia(tempCroppedId)
//     setTempCroppedId(null)
//     await deleteMedia(tempOriginalId)
//     setTempOriginalId(null)
//     setValue(null)
//     setOriginalId(null)
//     setPendingOriginal(null)
//     setPendingCrop(null)
//     setPreview(null)
//     setSizes({})
//     setDocBlur('')
//     resetLocal()
//   }

//   /* ---- light Payload-like styles ---- */
//   const btn: React.CSSProperties = {
//     padding: '6px 12px',
//     borderRadius: 6,
//     border: '1px solid var(--theme-elevation-150)',
//     background: 'var(--theme-elevation-50)',
//     cursor: 'pointer',
//   }
//   const btnPrimary: React.CSSProperties = {
//     ...btn,
//     background: 'var(--theme-success-500)',
//     borderColor: 'var(--theme-success-600)',
//     color: 'white',
//   }
//   const inputBox: React.CSSProperties = {
//     padding: 8,
//     border: '1px solid var(--theme-elevation-150)',
//     borderRadius: 6,
//     width: '100%',
//     backgroundColor: 'var(--theme-elevation-100)',
//     cursor: 'not-allowed',
//   }
//   const muted: React.CSSProperties = { color: 'var(--theme-elevation-600)', fontSize: 12 }

//   const displayLabel = cfg.specificLabel || label
//   const displayDescription = cfg.specificDescription || ''

//   return (
//     <div style={{ display: 'grid', gap: 10, marginBottom: 12 }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//         <label style={{ fontWeight: 600 }}>{displayLabel}</label>
//         {required && <span style={{ color: 'var(--theme-error-500)' }}>*</span>}
//       </div>
//       {displayDescription && (
//         <div
//           style={{
//             color: 'var(--theme-elevation-600)',
//             fontSize: 13,
//             marginTop: -6,
//             marginBottom: 6,
//             lineHeight: 1.4,
//           }}
//         >
//           {displayDescription}
//         </div>
//       )}

//       {/* Controls */}
//       <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
//         <label style={btn}>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept={acceptAttr}
//             onChange={onSelect}
//             disabled={busy || readOnly}
//             style={{ display: 'none' }}
//           />
//           Select image
//         </label>

//         {preview?.url && (
//           <>
//             <button type="button" onClick={startEditOriginal} disabled={busy} style={btn}>
//               Edit
//             </button>
//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               disabled={busy}
//               style={btn}
//             >
//               Replace
//             </button>
//             <button type="button" onClick={removeAll} disabled={busy} style={btn}>
//               Remove
//             </button>
//             <a
//               href={preview.url}
//               target="_blank"
//               rel="noreferrer"
//               style={{ ...btn, textDecoration: 'none' }}
//             >
//               Open
//             </a>
//           </>
//         )}
//       </div>

//       {/* Cropper (fixed height box) */}
//       {src && (
//         <>
//           <div
//             style={{
//               position: 'relative',
//               width: '100%',
//               height: 360, // fixed cropper area height
//               background: '#111',
//               borderRadius: 8,
//               overflow: 'hidden',
//             }}
//           >
//             <Cropper
//               image={src}
//               crop={crop}
//               onCropChange={setCrop}
//               aspect={aspect}
//               cropShape="rect"
//               zoom={zoom}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//               showGrid
//             />
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//             <label>Zoom</label>
//             <input
//               type="range"
//               min={1}
//               max={3}
//               step={0.01}
//               value={zoom}
//               onChange={(e) => setZoom(Number(e.target.value))}
//               disabled={busy}
//               style={{ width: 160 }}
//             />
//             <button type="button" onClick={createPendingCrop} disabled={busy} style={btnPrimary}>
//               {busy ? 'Preparing…' : 'Apply crop'}
//             </button>
//             <button
//               type="button"
//               onClick={() => (setSrc(null), setError(''))}
//               disabled={busy}
//               style={btn}
//             >
//               Cancel
//             </button>
//           </div>
//         </>
//       )}

//       {/* Preview (fixed-size box like requested) */}
//       {preview?.url && !src && (
//         <div style={{ display: 'grid', gap: 6 }}>
//           <div
//             style={{
//               width: '100%',
//               // maxWidth: 720,
//               height: 360,
//               borderRadius: 8,
//               border: '1px solid var(--theme-elevation-150)',
//               overflow: 'hidden',
//               background: 'var(--theme-elevation-100)',
//             }}
//           >
//             <img
//               src={preview.url}
//               alt={alt || 'Selected image'}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'contain',
//                 display: 'block',
//               }}
//             />
//           </div>

//           {preview.filename && <div style={muted}>File: {preview.filename}</div>}
//           {(sizes.original || sizes.cropped) && (
//             <div style={muted}>
//               {sizes.original ? `Original: ${formatBytes(sizes.original)}` : ''}
//               {sizes.cropped
//                 ? `${sizes.original ? ' • ' : ''}Cropped: ${formatBytes(sizes.cropped)}`
//                 : ''}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Alt input (disabled UI info) */}
//       <div>
//         <div style={{ marginBottom: 4 }}>Alt text</div>
//         <input
//           type="text"
//           placeholder="Describe the image"
//           value={alt}
//           onChange={(e) => setAlt(e.target.value)}
//           disabled={true}
//           style={inputBox}
//         />
//         <div style={muted}>
//           Format: {outputType}
//           {typeof maxKB === 'number' ? ` • Max cropped size: ${maxKB} KB` : ''}
//           {typeof maxKBOriginal === 'number' ? ` • Max original size: ${maxKBOriginal} KB` : ''}
//         </div>
//       </div>

//       {error && <div style={{ color: 'var(--theme-error-500)', fontSize: 13 }}>{error}</div>}
//     </div>
//   )
// }

// export default CropUploadField

// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
// ==========================================================================================

// // positive test done maybe it will be final based on further checking
// // last working code
// 'use client'

// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import Cropper, { Area, Point } from 'react-easy-crop'
// import { useField } from '@payloadcms/ui'

// type AdminFieldProps = {
//   path: string
//   value?: any
//   label?: string
//   required?: boolean
//   readOnly?: boolean
//   field?: any // has relationTo + cropper config
// }

// /* ---------- helpers ---------- */

// const DIRECT_UPLOAD = true

// const fileToDataURL = (file: File) =>
//   new Promise<string>((res, rej) => {
//     const fr = new FileReader()
//     fr.onload = () => res(String(fr.result))
//     fr.onerror = rej
//     fr.readAsDataURL(file)
//   })

// const blobToDataURL = (blob: Blob) =>
//   new Promise<string>((res, rej) => {
//     const fr = new FileReader()
//     fr.onload = () => res(String(fr.result))
//     fr.onerror = rej
//     fr.readAsDataURL(blob)
//   })

// const loadImage = (src: string) =>
//   new Promise<HTMLImageElement>((resolve, reject) => {
//     const img = new Image()
//     if (!src.startsWith('data:')) {
//       img.crossOrigin = 'anonymous'
//     }
//     img.onload = () => resolve(img)
//     img.onerror = reject
//     img.src = src
//   })

// async function getCroppedBlob(
//   dataURL: string,
//   cropPx: Area,
//   outType: string,
//   quality: number,
//   targetWidth?: number,
// ): Promise<Blob> {
//   const img = await loadImage(dataURL)

//   const outW = targetWidth ? Math.round(targetWidth) : Math.round(cropPx.width)
//   const scale = outW / cropPx.width
//   const outH = Math.round(cropPx.height * scale)

//   const canvas = document.createElement('canvas')
//   canvas.width = outW
//   canvas.height = outH
//   const ctx = canvas.getContext('2d')
//   if (!ctx) throw new Error('Canvas 2D context not available')

//   ctx.drawImage(
//     img,
//     Math.round(cropPx.x),
//     Math.round(cropPx.y),
//     Math.round(cropPx.width),
//     Math.round(cropPx.height),
//     0,
//     0,
//     outW,
//     outH,
//   )

//   return new Promise<Blob>((resolve, reject) => {
//     canvas.toBlob(
//       (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
//       outType,
//       quality,
//     )
//   })
// }

// /** Tiny canvas downscale (≈24px wide) + mild blur; returns base64 dataURL (no sharp). */
// async function makeTinyBlurDataURL(
//   srcDataURL: string,
//   maxWidth = 24,
//   mime = 'image/webp',
//   quality = 0.6,
// ): Promise<string> {
//   const img = await loadImage(srcDataURL)
//   const w = Math.max(1, Math.min(maxWidth, img.width))
//   const h = Math.max(1, Math.round((img.height * w) / img.width))

//   const canvas = document.createElement('canvas')
//   canvas.width = w
//   canvas.height = h
//   const ctx = canvas.getContext('2d')
//   if (!ctx) throw new Error('Canvas 2D context not available')
//   ;(ctx as any).filter = 'blur(1px)'
//   ctx.drawImage(img, 0, 0, w, h)
//   return canvas.toDataURL(mime, quality)
// }

// function replaceLastSegment(path: string, newName: string) {
//   const parts = path.split('.')
//   parts[parts.length - 1] = newName
//   return parts.join('.')
// }

// // estimate bytes from a dataURL (base64)
// function dataURLSize(dataURL: string) {
//   const base64 = dataURL.split(',')[1] ?? ''
//   const padding = (base64.match(/=+$/) || [''])[0].length
//   return Math.floor((base64.length * 3) / 4) - padding
// }

// function formatBytes(bytes?: number) {
//   if (bytes === undefined || bytes === null) return ''
//   const units = ['B', 'KB', 'MB', 'GB']
//   let i = 0
//   let n = bytes
//   while (n >= 1024 && i < units.length - 1) {
//     n /= 1024
//     i++
//   }
//   const decimals = n < 10 && i > 0 ? 1 : 0
//   return `${n.toFixed(decimals)} ${units[i]}`
// }

// function uuid() {
//   return (
//     (globalThis.crypto?.randomUUID?.() as string) ||
//     Math.random().toString(36).slice(2) + Date.now()
//   )
// }

// /** sanitize to a safe, extension-less base (no dots, spaces -> dashes) */
// function safeBase(filename: string) {
//   const name = filename.replace(/\.[^.]+$/, '')
//   return name
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9-_]+/g, '-')
//     .replace(/-+/g, '-')
//     .replace(/^-|-$/g, '')
// }

// /** remove any trailing "-crop..." (e.g. "-crop", "-crop-1", "-crop-20241231") */
// function baseFromFilename(filename: string) {
//   const withoutExt = filename.replace(/\.[^.]+$/, '')
//   // strip "-crop" and anything after it
//   return withoutExt.replace(/-crop.*$/i, '')
// }

// /** map mime or outputType to extension */
// function extFromMime(m: string): string {
//   if (!m) return 'webp'
//   const mime = m.toLowerCase()
//   if (mime.includes('jpeg') || mime.includes('jpg')) return 'jpg'
//   if (mime.includes('png')) return 'png'
//   if (mime.includes('gif')) return 'gif'
//   if (mime.includes('bmp')) return 'bmp'
//   if (mime.includes('svg')) return 'svg'
//   return 'webp'
// }

// /* ---------- component ---------- */

// const CropUploadField: React.FC<AdminFieldProps> = ({
//   label = 'Image',
//   required,
//   readOnly,
//   value,
//   path,
//   field,
// }) => {
//   // bind to this field (relationship 'image')
//   const { value: formValue, setValue } = useField<any>({ path })

//   // per-field config (from generator)
//   const cfg = (field as any)?.cropper ?? {}
//   const aspect: number = cfg.aspect ?? 16 / 9
//   const outputType: string = cfg.outputType ?? 'image/webp'
//   const quality: number = cfg.quality ?? 0.9
//   const acceptCfg: string | string[] = cfg.accept ?? outputType
//   const acceptAttr = Array.isArray(acceptCfg) ? acceptCfg.join(',') : acceptCfg
//   const maxKB: number | undefined = cfg.maxKB
//   const maxKBOriginal: number | undefined = cfg.maxKBOriginal
//   const targetWidth: number | undefined = cfg.targetWidth
//   const previewSizeKey: string | undefined = cfg.previewSize
//   const defaultAlt: string = cfg.defaultAlt ?? 'Cropped image'
//   const relationTo: string = (field as any)?.relationTo || 'media'
//   const ownerCollection: string | undefined = cfg.ownerCollection // provided by generator
//   const baseFieldName: string = (field as any)?.name || 'image'
//   const blurFieldName: string = `${baseFieldName}BlurDataURL`

//   // names for hidden sibling fields
//   const originalFieldName: string = cfg.originalField ?? 'originalImage'
//   const pendingOriginalFieldName: string = cfg.pendingOriginalField ?? 'pendingOriginal'
//   const pendingCropFieldName: string = cfg.pendingCropField ?? 'pendingCrop'

//   // bind siblings (so we can restore original on Edit)
//   const originalPath = useMemo(
//     () => replaceLastSegment(path, originalFieldName),
//     [path, originalFieldName],
//   )
//   const { value: originalId, setValue: setOriginalId } = useField<any>({ path: originalPath })

//   const pendingOriginalPath = useMemo(
//     () => replaceLastSegment(path, pendingOriginalFieldName),
//     [path, pendingOriginalFieldName],
//   )
//   const { value: pendingOriginal, setValue: setPendingOriginal } = useField<any>({
//     path: pendingOriginalPath,
//   })

//   const pendingCropPath = useMemo(
//     () => replaceLastSegment(path, pendingCropFieldName),
//     [path, pendingCropFieldName],
//   )
//   const { value: pendingCrop, setValue: setPendingCrop } = useField<any>({ path: pendingCropPath })

//   // 👇 doc-level blur field (already exists in your generator)
//   const blurPath = useMemo(() => replaceLastSegment(path, blurFieldName), [path, blurFieldName])
//   const { setValue: setDocBlur } = useField<string>({ path: blurPath })

//   // 🔐 per-document session id (hidden root field)
//   const { value: sessionId, setValue: setSessionId } = useField<string>({ path: 'uploadSessionId' })
//   useEffect(() => {
//     if (!sessionId) setSessionId(uuid())
//   }, [sessionId, setSessionId])

//   // UI state
//   const [src, setSrc] = useState<string | null>(null)
//   const [alt, setAlt] = useState<string>(defaultAlt)
//   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
//   const [zoom, setZoom] = useState<number>(1)
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
//   const [busy, setBusy] = useState(false)
//   const [error, setError] = useState<string>('')

//   // preview + sizes
//   const [preview, setPreview] = useState<{ id?: string; url?: string; filename?: string } | null>(
//     null,
//   )
//   const [sizes, setSizes] = useState<{ original?: number; cropped?: number }>({})

//   const fileInputRef = useRef<HTMLInputElement>(null)

//   // 🧹 track temp media created during this edit (for this field)
//   const [tempOriginalId, setTempOriginalId] = useState<string | null>(null)
//   const [tempCroppedId, setTempCroppedId] = useState<string | null>(null)

//   // filename base for this original (includes selection-level random token)
//   // e.g. "agentonboardingbanner-abc123ef"
//   const [origName, setOrigName] = useState<string>('')

//   // normalize current saved image id
//   const currentId: string | null = useMemo(() => {
//     const v = formValue ?? value
//     if (!v) return null
//     if (typeof v === 'string') return v
//     if (typeof v === 'object') {
//       if ('value' in v && v?.value) return v.value as string
//       if ('id' in v && v?.id) return v.id as string
//     }
//     return null
//   }, [formValue, value])

//   // preview priority: pendingCrop → saved doc → nothing
//   useEffect(() => {
//     let stop = false

//     if (typeof pendingCrop === 'string') {
//       setPreview({ url: pendingCrop, filename: 'pending.webp' })
//       setSizes((s) => ({ ...s, cropped: dataURLSize(pendingCrop) }))
//       return
//     }

//     ;(async () => {
//       if (!currentId) {
//         setPreview(null)
//         return
//       }
//       try {
//         const res = await fetch(`/api/${relationTo}/${currentId}?depth=0`, {
//           credentials: 'include',
//         })
//         const json = await res.json()
//         const doc = json?.doc ?? json
//         const url = (previewSizeKey && doc?.sizes?.[previewSizeKey]?.url) || doc?.url
//         setPreview({ id: doc?.id ?? currentId, url, filename: doc?.filename })
//         if (typeof doc?.filesize === 'number') setSizes((s) => ({ ...s, cropped: doc.filesize }))
//         if (doc?.alt) setAlt(doc.alt)

//         // For older docs where we might not have originalId,
//         // initialize origName from the cropped filename (but strip "-crop...").
//         if (doc?.filename && !origName) {
//           const base = safeBase(baseFromFilename(doc.filename))
//           if (base) setOrigName(base)
//         }
//       } catch {
//         if (!stop) setPreview({ id: currentId, url: undefined, filename: undefined })
//       }
//     })()

//     return () => {
//       stop = true
//     }
//   }, [currentId, relationTo, previewSizeKey, pendingCrop, origName])

//   // When we have an originalId, prefer using that filename to reconstruct origName
//   useEffect(() => {
//     let cancelled = false
//     ;(async () => {
//       if (!originalId) return
//       try {
//         const res = await fetch(`/api/${relationTo}/${originalId}?depth=0`, {
//           credentials: 'include',
//         })
//         const json = await res.json()
//         const doc = json?.doc ?? json
//         if (!cancelled && doc?.filename) {
//           const base = safeBase(baseFromFilename(doc.filename))
//           if (base) setOrigName(base)
//         }
//       } catch {
//         // ignore; origName may already be set from selection or preview
//       }
//     })()

//     return () => {
//       cancelled = true
//     }
//   }, [originalId, relationTo])

//   const onCropComplete = useCallback(
//     (_: Area, areaPixels: Area) => setCroppedAreaPixels(areaPixels),
//     [],
//   )

//   const resetLocal = () => {
//     setSrc(null)
//     setZoom(1)
//     setCrop({ x: 0, y: 0 })
//     setCroppedAreaPixels(null)
//     setError('')
//     if (fileInputRef.current) fileInputRef.current.value = ''
//   }

//   // direct upload helpers
//   async function uploadBlobToMedia(
//     fileOrBlob: Blob | File,
//     altText: string,
//     ownerField: string,
//     blurDataURL?: string,
//     forcedFilename?: string, // enforce filename
//   ) {
//     const fd = new FormData()
//     const name =
//       forcedFilename ||
//       (fileOrBlob as File).name ||
//       `upload-${Date.now()}.${extFromMime((fileOrBlob as any).type || 'image/webp')}`

//     fd.append('file', fileOrBlob, name)
//     fd.append('alt', altText || 'Image')
//     fd.append('temporary', 'true')
//     if (sessionId) fd.append('uploadSessionId', sessionId)
//     if (ownerCollection) fd.append('ownerCollection', String(ownerCollection))
//     fd.append('ownerField', ownerField)
//     if (blurDataURL) fd.append('blurDataURL', blurDataURL) // optional: store blur on Media

//     const res = await fetch('/api/media', { method: 'POST', body: fd, credentials: 'include' })
//     if (!res.ok) throw new Error(`Upload failed (${res.status})`)
//     const json = await res.json()
//     return json?.doc ?? json
//   }

//   async function deleteMedia(id?: string | null) {
//     if (!id) return
//     try {
//       await fetch(`/api/media/${id}`, { method: 'DELETE', credentials: 'include' })
//     } catch {
//       // ignore
//     }
//   }

//   // choose file: validate + (direct upload original with tiny blur) OR base64 path
//   const onSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     setError('')
//     const f = e.target.files?.[0]
//     if (!f) return

//     const allows = Array.isArray(acceptCfg) ? acceptCfg : [acceptCfg]
//     const okType = allows.some((a) =>
//       a.endsWith('/*') ? f.type.startsWith(a.slice(0, a.indexOf('/')) + '/') : f.type === a,
//     )
//     if (!okType) {
//       setError(`Invalid format: ${f.type || '(unknown)'} — allowed: ${allows.join(', ')}`)
//       e.target.value = ''
//       return
//     }

//     if (typeof maxKBOriginal === 'number' && f.size / 1024 > maxKBOriginal) {
//       setError(`File too large: ${(f.size / 1024).toFixed(0)} KB. Max is ${maxKBOriginal} KB.`)
//       e.target.value = ''
//       return
//     }

//     setBusy(true)
//     try {
//       // Prepare preview + tiny blur first (so we can save blur into doc)
//       const dataURL = await fileToDataURL(f)
//       await loadImage(dataURL) // pre-load
//       const tinyBlur = await makeTinyBlurDataURL(dataURL)
//       setDocBlur(tinyBlur)

//       if (DIRECT_UPLOAD) {
//         // delete any previous temps made by this field in this session
//         if (tempCroppedId) {
//           await deleteMedia(tempCroppedId)
//           setTempCroppedId(null)
//         }
//         if (tempOriginalId) {
//           await deleteMedia(tempOriginalId)
//           setTempOriginalId(null)
//         }

//         // Build UNIQUE original filename:
//         //   <safe-base>-<origToken>.<ext>
//         const rawBase = safeBase(f.name)
//         const origToken = uuid().slice(0, 8) // 👉 new random per selection
//         const originalBase = `${rawBase}-${origToken}`
//         const originalExt = extFromMime(f.type) // keep original type family (jpeg -> jpg)
//         const originalName = `${originalBase}.${originalExt}`

//         // Remember this base (without extension, no "-crop") for crop naming
//         setOrigName(originalBase)

//         // upload original with enforced unique filename
//         const origDoc = await uploadBlobToMedia(
//           f,
//           `${label} Original`,
//           `${(field as any)?.name}Original`,
//           tinyBlur,
//           originalName,
//         )
//         setOriginalId(origDoc.id)
//         setTempOriginalId(origDoc.id)

//         // open local crop UI (from the fresh original)
//         setSrc(dataURL)
//         setSizes({ original: f.size, cropped: undefined })
//         setCrop({ x: 0, y: 0 })
//         setZoom(1)
//         setCroppedAreaPixels(null)
//       } else {
//         // legacy base64 path
//         setSrc(dataURL)
//         setPendingOriginal(dataURL)
//         setOriginalId(null)
//         setPendingCrop(null)
//         setSizes({ original: f.size, cropped: undefined })
//         setCrop({ x: 0, y: 0 })
//         setZoom(1)
//         setCroppedAreaPixels(null)
//       }
//     } catch (err: any) {
//       setError(err?.message || 'Failed to load image')
//       e.target.value = ''
//     } finally {
//       setBusy(false)
//     }
//   }

//   // create cropped image: direct upload + replace temp + tiny blur (doc)
//   const createPendingCrop = useCallback(async () => {
//     if (!src || !croppedAreaPixels) {
//       setError('Please select an image and adjust the crop first.')
//       return
//     }
//     setBusy(true)
//     setError('')
//     try {
//       const blob = await getCroppedBlob(src, croppedAreaPixels, outputType, quality, targetWidth)

//       if (typeof maxKB === 'number' && blob.size / 1024 > maxKB) {
//         setBusy(false)
//         setError(`Cropped file too large: ${(blob.size / 1024).toFixed(0)} KB. Max is ${maxKB} KB.`)
//         return
//       }

//       // make tiny blur from the cropped blob and save to doc
//       const croppedDataURL = await blobToDataURL(blob)
//       const tinyBlur = await makeTinyBlurDataURL(croppedDataURL)
//       setDocBlur(tinyBlur)

//       if (DIRECT_UPLOAD) {
//         if (tempCroppedId) {
//           await deleteMedia(tempCroppedId)
//           setTempCroppedId(null)
//         }

//         // filename: <clean-base>-<cropToken>-crop.<ext>
//         // where:
//         //   - clean-base is from origName OR (fallback) preview.filename with "-crop..." stripped
//         //   - cropToken is new for every crop
//         const baseSource =
//           origName ||
//           (preview?.filename ? baseFromFilename(preview.filename) : '') ||
//           String(label) ||
//           'image'
//         const cleanBase = safeBase(baseSource)
//         const cropToken = uuid().slice(0, 8) // 👉 new random per crop
//         const baseWithToken = `${cleanBase}-${cropToken}`
//         const ext = extFromMime(outputType)
//         const cropName = `${baseWithToken}-crop.${ext}` // "crop" appears exactly once at the end

//         const croppedDoc = await uploadBlobToMedia(
//           blob,
//           String(label),
//           (field as any)?.name,
//           tinyBlur,
//           cropName,
//         )
//         setValue(croppedDoc.id)
//         setTempCroppedId(croppedDoc.id)
//         setPreview({ id: croppedDoc.id, url: croppedDoc.url, filename: croppedDoc.filename })
//         setSizes((s) => ({ ...s, cropped: croppedDoc.filesize }))
//         resetLocal()
//         return
//       }

//       // legacy base64 (not used in DIRECT mode)
//       setPendingCrop(croppedDataURL)
//       setPreview({ url: croppedDataURL })
//       setSizes((s) => ({ ...s, cropped: blob.size }))

//       resetLocal()
//     } catch (err: any) {
//       setError(err?.message || 'Failed to prepare cropped image')
//     } finally {
//       setBusy(false)
//     }
//   }, [
//     src,
//     croppedAreaPixels,
//     outputType,
//     quality,
//     targetWidth,
//     maxKB,
//     label,
//     field,
//     tempCroppedId,
//     setDocBlur,
//     origName,
//     preview?.filename,
//   ])

//   // Edit from original (use server original if we have id)
//   const startEditOriginal = useCallback(async () => {
//     setError('')

//     if (!DIRECT_UPLOAD && typeof pendingOriginal === 'string') {
//       setSrc(pendingOriginal)
//       setSizes((s) => ({ ...s, original: dataURLSize(pendingOriginal) }))
//       setCrop({ x: 0, y: 0 })
//       setZoom(1)
//       return
//     }

//     if (originalId) {
//       try {
//         const res = await fetch(`/api/${relationTo}/${originalId}?depth=0`, {
//           credentials: 'include',
//         })
//         const json = await res.json()
//         const url = json?.doc?.url || json?.url
//         const size = json?.doc?.filesize ?? json?.filesize
//         if (url) {
//           setSrc(url)
//           if (typeof size === 'number') setSizes((s) => ({ ...s, original: size }))
//           setCrop({ x: 0, y: 0 })
//           setZoom(1)
//           return
//         }
//       } catch {
//         /* noop */
//       }
//     }

//     if (preview?.url) {
//       setSrc(preview.url)
//       setCrop({ x: 0, y: 0 })
//       setZoom(1)
//     }
//   }, [pendingOriginal, originalId, relationTo, preview?.url])

//   // Remove everything for this field (delete temps only; persisted refs removed on save)
//   const removeAll = async () => {
//     await deleteMedia(tempCroppedId)
//     setTempCroppedId(null)
//     await deleteMedia(tempOriginalId)
//     setTempOriginalId(null)
//     setValue(null)
//     setOriginalId(null)
//     setPendingOriginal(null)
//     setPendingCrop(null)
//     setPreview(null)
//     setSizes({})
//     setDocBlur('')
//     resetLocal()
//   }

//   /* ---- light Payload-like styles ---- */
//   const btn: React.CSSProperties = {
//     padding: '6px 12px',
//     borderRadius: 6,
//     border: '1px solid var(--theme-elevation-150)',
//     background: 'var(--theme-elevation-50)',
//     cursor: 'pointer',
//   }
//   const btnPrimary: React.CSSProperties = {
//     ...btn,
//     background: 'var(--theme-success-500)',
//     borderColor: 'var(--theme-success-600)',
//     color: 'white',
//   }
//   const inputBox: React.CSSProperties = {
//     padding: 8,
//     border: '1px solid var(--theme-elevation-150)',
//     borderRadius: 6,
//     width: '100%',
//     backgroundColor: 'var(--theme-elevation-100)',
//     cursor: 'not-allowed',
//   }
//   const muted: React.CSSProperties = { color: 'var(--theme-elevation-600)', fontSize: 12 }

//   const displayLabel = cfg.specificLabel || label
//   const displayDescription = cfg.specificDescription || ''

//   return (
//     <div style={{ display: 'grid', gap: 10, marginBottom: 12 }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//         <label style={{ fontWeight: 600 }}>{displayLabel}</label>
//         {required && <span style={{ color: 'var(--theme-error-500)' }}>*</span>}
//       </div>
//       {displayDescription && (
//         <div
//           style={{
//             color: 'var(--theme-elevation-600)',
//             fontSize: 13,
//             marginTop: -6,
//             marginBottom: 6,
//             lineHeight: 1.4,
//           }}
//         >
//           {displayDescription}
//         </div>
//       )}

//       {/* Controls */}
//       <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
//         <label style={btn}>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept={acceptAttr}
//             onChange={onSelect}
//             disabled={busy || readOnly}
//             style={{ display: 'none' }}
//           />
//           Select image
//         </label>

//         {preview?.url && (
//           <>
//             <button type="button" onClick={startEditOriginal} disabled={busy} style={btn}>
//               Edit
//             </button>
//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               disabled={busy}
//               style={btn}
//             >
//               Replace
//             </button>
//             <button type="button" onClick={removeAll} disabled={busy} style={btn}>
//               Remove
//             </button>
//             <a
//               href={preview.url}
//               target="_blank"
//               rel="noreferrer"
//               style={{ ...btn, textDecoration: 'none' }}
//             >
//               Open
//             </a>
//           </>
//         )}
//       </div>

//       {/* Cropper (fixed height box) */}
//       {src && (
//         <>
//           <div
//             style={{
//               position: 'relative',
//               width: '100%',
//               height: 360, // fixed cropper area height
//               background: '#111',
//               borderRadius: 8,
//               overflow: 'hidden',
//             }}
//           >
//             <Cropper
//               image={src}
//               crop={crop}
//               onCropChange={setCrop}
//               aspect={aspect}
//               cropShape="rect"
//               zoom={zoom}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//               showGrid
//             />
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//             <label>Zoom</label>
//             <input
//               type="range"
//               min={1}
//               max={3}
//               step={0.01}
//               value={zoom}
//               onChange={(e) => setZoom(Number(e.target.value))}
//               disabled={busy}
//               style={{ width: 160 }}
//             />
//             <button type="button" onClick={createPendingCrop} disabled={busy} style={btnPrimary}>
//               {busy ? 'Preparing…' : 'Apply crop'}
//             </button>
//             <button
//               type="button"
//               onClick={() => (setSrc(null), setError(''))}
//               disabled={busy}
//               style={btn}
//             >
//               Cancel
//             </button>
//           </div>
//         </>
//       )}

//       {/* Preview (fixed-size box like requested) */}
//       {preview?.url && !src && (
//         <div style={{ display: 'grid', gap: 6 }}>
//           <div
//             style={{
//               width: '100%',
//               height: 360,
//               borderRadius: 8,
//               border: '1px solid var(--theme-elevation-150)',
//               overflow: 'hidden',
//               background: 'var(--theme-elevation-100)',
//             }}
//           >
//             <img
//               src={preview.url}
//               alt={alt || 'Selected image'}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'contain',
//                 display: 'block',
//               }}
//             />
//           </div>

//           {preview.filename && <div style={muted}>File: {preview.filename}</div>}
//           {(sizes.original || sizes.cropped) && (
//             <div style={muted}>
//               {sizes.original ? `Original: ${formatBytes(sizes.original)}` : ''}
//               {sizes.cropped
//                 ? `${sizes.original ? ' • ' : ''}Cropped: ${formatBytes(sizes.cropped)}`
//                 : ''}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Alt input (disabled UI info) */}
//       <div>
//         <div style={{ marginBottom: 4 }}>Alt text</div>
//         <input
//           type="text"
//           placeholder="Describe the image"
//           value={alt}
//           onChange={(e) => setAlt(e.target.value)}
//           disabled={true}
//           style={inputBox}
//         />
//         <div style={muted}>
//           Format: {outputType}
//           {typeof maxKB === 'number' ? ` • Max cropped size: ${maxKB} KB` : ''}
//           {typeof maxKBOriginal === 'number' ? ` • Max original size: ${maxKBOriginal} KB` : ''}
//         </div>
//       </div>

//       {error && <div style={{ color: 'var(--theme-error-500)', fontSize: 13 }}>{error}</div>}
//     </div>
//   )
// }

// export default CropUploadField

// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import { useField } from '@payloadcms/ui'

type AdminFieldProps = {
  path: string
  value?: any
  label?: string
  required?: boolean
  readOnly?: boolean
  field?: any // has relationTo + cropper config
}

/* ---------- helpers ---------- */

const DIRECT_UPLOAD = true

const fileToDataURL = (file: File) =>
  new Promise<string>((res, rej) => {
    const fr = new FileReader()
    fr.onload = () => res(String(fr.result))
    fr.onerror = rej
    fr.readAsDataURL(file)
  })

const blobToDataURL = (blob: Blob) =>
  new Promise<string>((res, rej) => {
    const fr = new FileReader()
    fr.onload = () => res(String(fr.result))
    fr.onerror = rej
    fr.readAsDataURL(blob)
  })

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    if (!src.startsWith('data:')) {
      img.crossOrigin = 'anonymous'
    }
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

async function getCroppedBlob(
  dataURL: string,
  cropPx: Area,
  outType: string,
  quality: number,
  targetWidth?: number,
): Promise<Blob> {
  const img = await loadImage(dataURL)

  const outW = targetWidth ? Math.round(targetWidth) : Math.round(cropPx.width)
  const scale = outW / cropPx.width
  const outH = Math.round(cropPx.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = outW
  canvas.height = outH
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context not available')

  ctx.drawImage(
    img,
    Math.round(cropPx.x),
    Math.round(cropPx.y),
    Math.round(cropPx.width),
    Math.round(cropPx.height),
    0,
    0,
    outW,
    outH,
  )

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
      outType,
      quality,
    )
  })
}

/** Tiny canvas downscale (≈24px wide) + mild blur; returns base64 dataURL (no sharp). */
async function makeTinyBlurDataURL(
  srcDataURL: string,
  maxWidth = 24,
  mime = 'image/webp',
  quality = 0.6,
): Promise<string> {
  const img = await loadImage(srcDataURL)
  const w = Math.max(1, Math.min(maxWidth, img.width))
  const h = Math.max(1, Math.round((img.height * w) / img.width))

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context not available')
  ;(ctx as any).filter = 'blur(1px)'
  ctx.drawImage(img, 0, 0, w, h)
  return canvas.toDataURL(mime, quality)
}

function replaceLastSegment(path: string, newName: string) {
  const parts = path.split('.')
  parts[parts.length - 1] = newName
  return parts.join('.')
}

// estimate bytes from a dataURL (base64)
function dataURLSize(dataURL: string) {
  const base64 = dataURL.split(',')[1] ?? ''
  const padding = (base64.match(/=+$/) || [''])[0].length
  return Math.floor((base64.length * 3) / 4) - padding
}

function formatBytes(bytes?: number) {
  if (bytes === undefined || bytes === null) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let n = bytes
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  const decimals = n < 10 && i > 0 ? 1 : 0
  return `${n.toFixed(decimals)} ${units[i]}`
}

function uuid() {
  return (
    (globalThis.crypto?.randomUUID?.() as string) ||
    Math.random().toString(36).slice(2) + Date.now()
  )
}

/** sanitize to a safe, extension-less base (no dots, spaces -> dashes) */
function safeBase(filename: string) {
  const name = filename.replace(/\.[^.]+$/, '')
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** remove any trailing "-crop..." (e.g. "-crop", "-crop-1", "-crop-20241231") */
function baseFromFilename(filename: string) {
  const withoutExt = filename.replace(/\.[^.]+$/, '')
  // strip "-crop" and anything after it
  return withoutExt.replace(/-crop.*$/i, '')
}

/** map mime or outputType to extension */
function extFromMime(m: string): string {
  if (!m) return 'webp'
  const mime = m.toLowerCase()
  if (mime.includes('jpeg') || mime.includes('jpg')) return 'jpg'
  if (mime.includes('png')) return 'png'
  if (mime.includes('gif')) return 'gif'
  if (mime.includes('bmp')) return 'bmp'
  if (mime.includes('svg')) return 'svg'
  return 'webp'
}

/* ---------- component ---------- */

const CropUploadField: React.FC<AdminFieldProps> = ({
  label = 'Image',
  required,
  readOnly,
  value,
  path,
  field,
}) => {
  // bind to this field (relationship 'image')
  const { value: formValue, setValue } = useField<any>({ path })

  // per-field config (from generator)
  const cfg = (field as any)?.cropper ?? {}
  const aspect: number = cfg.aspect ?? 16 / 9
  const outputType: string = cfg.outputType ?? 'image/webp'
  const quality: number = cfg.quality ?? 0.9
  const acceptCfg: string | string[] = cfg.accept ?? outputType
  const acceptAttr = Array.isArray(acceptCfg) ? acceptCfg.join(',') : acceptCfg
  const maxKB: number | undefined = cfg.maxKB
  const maxKBOriginal: number | undefined = cfg.maxKBOriginal
  const targetWidth: number | undefined = cfg.targetWidth
  const previewSizeKey: string | undefined = cfg.previewSize
  const defaultAlt: string = cfg.defaultAlt ?? 'Cropped image'
  const relationTo: string = (field as any)?.relationTo || 'media'
  const ownerCollection: string | undefined = cfg.ownerCollection // provided by generator
  const baseFieldName: string = (field as any)?.name || 'image'
  const blurFieldName: string = `${baseFieldName}BlurDataURL`

  // names for hidden sibling fields
  const originalFieldName: string = cfg.originalField ?? 'originalImage'
  const pendingOriginalFieldName: string = cfg.pendingOriginalField ?? 'pendingOriginal'
  const pendingCropFieldName: string = cfg.pendingCropField ?? 'pendingCrop'

  // bind siblings (so we can restore original on Edit)
  const originalPath = useMemo(
    () => replaceLastSegment(path, originalFieldName),
    [path, originalFieldName],
  )
  const { value: originalId, setValue: setOriginalId } = useField<any>({ path: originalPath })

  const pendingOriginalPath = useMemo(
    () => replaceLastSegment(path, pendingOriginalFieldName),
    [path, pendingOriginalFieldName],
  )
  const { value: pendingOriginal, setValue: setPendingOriginal } = useField<any>({
    path: pendingOriginalPath,
  })

  const pendingCropPath = useMemo(
    () => replaceLastSegment(path, pendingCropFieldName),
    [path, pendingCropFieldName],
  )
  const { value: pendingCrop, setValue: setPendingCrop } = useField<any>({ path: pendingCropPath })

  // 👇 doc-level blur field (already exists in your generator)
  const blurPath = useMemo(() => replaceLastSegment(path, blurFieldName), [path, blurFieldName])
  const { setValue: setDocBlur } = useField<string>({ path: blurPath })

  // 🔐 per-document session id (hidden root field)
  const { value: sessionId, setValue: setSessionId } = useField<string>({ path: 'uploadSessionId' })
  useEffect(() => {
    if (!sessionId) setSessionId(uuid())
  }, [sessionId, setSessionId])

  // UI state
  const [src, setSrc] = useState<string | null>(null)
  const [alt, setAlt] = useState<string>(defaultAlt)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>('')

  // preview + sizes
  const [preview, setPreview] = useState<{ id?: string; url?: string; filename?: string } | null>(
    null,
  )
  const [sizes, setSizes] = useState<{ original?: number; cropped?: number }>({})

  const fileInputRef = useRef<HTMLInputElement>(null)

  // 🧹 track temp media created during this edit (for this field)
  const [tempOriginalId, setTempOriginalId] = useState<string | null>(null)
  const [tempCroppedId, setTempCroppedId] = useState<string | null>(null)

  // filename base for this original (includes selection-level random token)
  // e.g. "agentonboardingbanner-abc123ef"
  const [origName, setOrigName] = useState<string>('')

  // normalize current saved image id
  const currentId: string | null = useMemo(() => {
    const v = formValue ?? value
    if (!v) return null
    if (typeof v === 'string') return v
    if (typeof v === 'object') {
      if ('value' in v && v?.value) return v.value as string
      if ('id' in v && v?.id) return v.id as string
    }
    return null
  }, [formValue, value])

  // preview priority: pendingCrop → saved doc → nothing
  useEffect(() => {
    let stop = false

    if (typeof pendingCrop === 'string') {
      setPreview({ url: pendingCrop, filename: 'pending.webp' })
      setSizes((s) => ({ ...s, cropped: dataURLSize(pendingCrop) }))
      return
    }

    ;(async () => {
      if (!currentId) {
        setPreview(null)
        return
      }
      try {
        const res = await fetch(`/api/${relationTo}/${currentId}?depth=0`, {
          credentials: 'include',
        })
        const json = await res.json()
        const doc = json?.doc ?? json
        const url = (previewSizeKey && doc?.sizes?.[previewSizeKey]?.url) || doc?.url
        setPreview({ id: doc?.id ?? currentId, url, filename: doc?.filename })
        if (typeof doc?.filesize === 'number') setSizes((s) => ({ ...s, cropped: doc.filesize }))
        if (doc?.alt) setAlt(doc.alt)

        // For older docs where we might not have originalId,
        // initialize origName from the cropped filename (but strip "-crop...").
        if (doc?.filename && !origName) {
          const base = safeBase(baseFromFilename(doc.filename))
          if (base) setOrigName(base)
        }
      } catch {
        if (!stop) setPreview({ id: currentId, url: undefined, filename: undefined })
      }
    })()

    return () => {
      stop = true
    }
  }, [currentId, relationTo, previewSizeKey, pendingCrop, origName])

  // When we have an originalId, prefer using that filename to reconstruct origName
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!originalId) return
      try {
        const res = await fetch(`/api/${relationTo}/${originalId}?depth=0`, {
          credentials: 'include',
        })
        const json = await res.json()
        const doc = json?.doc ?? json
        if (!cancelled && doc?.filename) {
          const base = safeBase(baseFromFilename(doc.filename))
          if (base) setOrigName(base)
        }
      } catch {
        // ignore; origName may already be set from selection or preview
      }
    })()

    return () => {
      cancelled = true
    }
  }, [originalId, relationTo])

  const onCropComplete = useCallback(
    (_: Area, areaPixels: Area) => setCroppedAreaPixels(areaPixels),
    [],
  )

  const resetLocal = () => {
    setSrc(null)
    setZoom(1)
    setCrop({ x: 0, y: 0 })
    setCroppedAreaPixels(null)
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // direct upload helpers
  async function uploadBlobToMedia(
    fileOrBlob: Blob | File,
    altText: string,
    ownerField: string,
    blurDataURL?: string,
    forcedFilename?: string, // enforce filename
  ) {
    const fd = new FormData()
    const name =
      forcedFilename ||
      (fileOrBlob as File).name ||
      `upload-${Date.now()}.${extFromMime((fileOrBlob as any).type || 'image/webp')}`

    fd.append('file', fileOrBlob, name)
    fd.append('alt', altText || 'Image')
    fd.append('temporary', 'true')
    if (sessionId) fd.append('uploadSessionId', sessionId)
    if (ownerCollection) fd.append('ownerCollection', String(ownerCollection))
    fd.append('ownerField', ownerField)
    if (blurDataURL) fd.append('blurDataURL', blurDataURL) // optional: store blur on Media

    const res = await fetch('/api/media', { method: 'POST', body: fd, credentials: 'include' })
    if (!res.ok) throw new Error(`Upload failed (${res.status})`)
    const json = await res.json()
    return json?.doc ?? json
  }

  async function deleteMedia(id?: string | null) {
    if (!id) return
    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE', credentials: 'include' })
    } catch {
      // ignore
    }
  }

  // choose file: validate + (direct upload original with tiny blur) OR base64 path
  const onSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const f = e.target.files?.[0]
    if (!f) return

    const allows = Array.isArray(acceptCfg) ? acceptCfg : [acceptCfg]
    const okType = allows.some((a) =>
      a.endsWith('/*') ? f.type.startsWith(a.slice(0, a.indexOf('/')) + '/') : f.type === a,
    )
    if (!okType) {
      setError(`Invalid format: ${f.type || '(unknown)'} — allowed: ${allows.join(', ')}`)
      e.target.value = ''
      return
    }

    if (typeof maxKBOriginal === 'number' && f.size / 1024 > maxKBOriginal) {
      setError(`File too large: ${(f.size / 1024).toFixed(0)} KB. Max is ${maxKBOriginal} KB.`)
      e.target.value = ''
      return
    }

    setBusy(true)
    try {
      // Prepare preview + tiny blur first (so we can save blur into doc)
      const dataURL = await fileToDataURL(f)
      await loadImage(dataURL) // pre-load
      const tinyBlur = await makeTinyBlurDataURL(dataURL)
      setDocBlur(tinyBlur)

      if (DIRECT_UPLOAD) {
        // delete any previous temps made by this field in this session
        if (tempCroppedId) {
          await deleteMedia(tempCroppedId)
          setTempCroppedId(null)
        }
        if (tempOriginalId) {
          await deleteMedia(tempOriginalId)
          setTempOriginalId(null)
        }

        // Build UNIQUE original filename:
        //   <safe-base>-<origToken>.<ext>
        const rawBase = safeBase(f.name)
        const origToken = uuid().slice(0, 8) // 👉 new random per selection
        const originalBase = `${rawBase}-${origToken}`
        const originalExt = extFromMime(f.type) // keep original type family (jpeg -> jpg)
        const originalName = `${originalBase}.${originalExt}`

        // Remember this base (without extension, no "-crop") for crop naming
        setOrigName(originalBase)

        // upload original with enforced unique filename
        const origDoc = await uploadBlobToMedia(
          f,
          `${label} Original`,
          `${(field as any)?.name}Original`,
          tinyBlur,
          originalName,
        )
        setOriginalId(origDoc.id)
        setTempOriginalId(origDoc.id)

        // open local crop UI (from the fresh original)
        setSrc(dataURL)
        setSizes({ original: f.size, cropped: undefined })
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setCroppedAreaPixels(null)
      } else {
        // legacy base64 path
        setSrc(dataURL)
        setPendingOriginal(dataURL)
        setOriginalId(null)
        setPendingCrop(null)
        setSizes({ original: f.size, cropped: undefined })
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setCroppedAreaPixels(null)
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load image')
      e.target.value = ''
    } finally {
      setBusy(false)
    }
  }

  // create cropped image: direct upload + replace temp + tiny blur (doc)
  const createPendingCrop = useCallback(async () => {
    if (!src || !croppedAreaPixels) {
      setError('Please select an image and adjust the crop first.')
      return
    }
    setBusy(true)
    setError('')
    try {
      const blob = await getCroppedBlob(src, croppedAreaPixels, outputType, quality, targetWidth)

      if (typeof maxKB === 'number' && blob.size / 1024 > maxKB) {
        setBusy(false)
        setError(`Cropped file too large: ${(blob.size / 1024).toFixed(0)} KB. Max is ${maxKB} KB.`)
        return
      }

      // make tiny blur from the cropped blob and save to doc
      const croppedDataURL = await blobToDataURL(blob)
      const tinyBlur = await makeTinyBlurDataURL(croppedDataURL)
      setDocBlur(tinyBlur)

      if (DIRECT_UPLOAD) {
        if (tempCroppedId) {
          await deleteMedia(tempCroppedId)
          setTempCroppedId(null)
        }

        // filename: <clean-base>-<cropToken>-crop.<ext>
        // where:
        //   - clean-base is from origName OR (fallback) preview.filename with "-crop..." stripped
        //   - cropToken is new for every crop
        const baseSource =
          origName ||
          (preview?.filename ? baseFromFilename(preview.filename) : '') ||
          String(label) ||
          'image'
        const cleanBase = safeBase(baseSource)
        const cropToken = uuid().slice(0, 8) // 👉 new random per crop
        const baseWithToken = `${cleanBase}-${cropToken}`
        const ext = extFromMime(outputType)
        const cropName = `${baseWithToken}-crop.${ext}` // "crop" appears exactly once at the end

        const croppedDoc = await uploadBlobToMedia(
          blob,
          String(label),
          (field as any)?.name,
          tinyBlur,
          cropName,
        )
        setValue(croppedDoc.id)
        setTempCroppedId(croppedDoc.id)
        setPreview({ id: croppedDoc.id, url: croppedDoc.url, filename: croppedDoc.filename })
        setSizes((s) => ({ ...s, cropped: croppedDoc.filesize }))
        resetLocal()
        return
      }

      // legacy base64 (not used in DIRECT mode)
      setPendingCrop(croppedDataURL)
      setPreview({ url: croppedDataURL })
      setSizes((s) => ({ ...s, cropped: blob.size }))

      resetLocal()
    } catch (err: any) {
      setError(err?.message || 'Failed to prepare cropped image')
    } finally {
      setBusy(false)
    }
  }, [
    src,
    croppedAreaPixels,
    outputType,
    quality,
    targetWidth,
    maxKB,
    label,
    field,
    tempCroppedId,
    setDocBlur,
    origName,
    preview?.filename,
    setValue,
  ])

  // Edit from original (use server original if we have id)
  const startEditOriginal = useCallback(async () => {
    setError('')

    if (!DIRECT_UPLOAD && typeof pendingOriginal === 'string') {
      setSrc(pendingOriginal)
      setSizes((s) => ({ ...s, original: dataURLSize(pendingOriginal) }))
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      return
    }

    if (originalId) {
      try {
        const res = await fetch(`/api/${relationTo}/${originalId}?depth=0`, {
          credentials: 'include',
        })
        const json = await res.json()
        const url = json?.doc?.url || json?.url
        const size = json?.doc?.filesize ?? json?.filesize
        if (url) {
          setSrc(url)
          if (typeof size === 'number') setSizes((s) => ({ ...s, original: size }))
          setCrop({ x: 0, y: 0 })
          setZoom(1)
          return
        }
      } catch {
        /* noop */
      }
    }

    if (preview?.url) {
      setSrc(preview.url)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
    }
  }, [pendingOriginal, originalId, relationTo, preview?.url])

  // Remove everything for this field (delete temps only; persisted refs removed on save)
  const removeAll = async () => {
    await deleteMedia(tempCroppedId)
    setTempCroppedId(null)
    await deleteMedia(tempOriginalId)
    setTempOriginalId(null)
    setValue(null)
    setOriginalId(null)
    setPendingOriginal(null)
    setPendingCrop(null)
    setPreview(null)
    setSizes({})
    setDocBlur('')
    resetLocal()
  }

  /* ---- light Payload-like styles ---- */
  const btn: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: 6,
    border: '1px solid var(--theme-elevation-150)',
    background: 'var(--theme-elevation-50)',
    cursor: 'pointer',
  }
  const btnPrimary: React.CSSProperties = {
    ...btn,
    background: 'var(--theme-success-500)',
    borderColor: 'var(--theme-success-600)',
    color: 'white',
  }
  const inputBox: React.CSSProperties = {
    padding: 8,
    border: '1px solid var(--theme-elevation-150)',
    borderRadius: 6,
    width: '100%',
    backgroundColor: 'var(--theme-elevation-100)',
    cursor: 'not-allowed',
  }
  const muted: React.CSSProperties = { color: 'var(--theme-elevation-600)', fontSize: 12 }

  const displayLabel = cfg.specificLabel || label
  const displayDescription = cfg.specificDescription || ''

  return (
    <div style={{ display: 'grid', gap: 10, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <label style={{ fontWeight: 600 }}>{displayLabel}</label>
        {required && <span style={{ color: 'var(--theme-error-500)' }}>*</span>}
      </div>
      {displayDescription && (
        <div
          style={{
            color: 'var(--theme-elevation-600)',
            fontSize: 13,
            marginTop: -6,
            marginBottom: 6,
            lineHeight: 1.4,
          }}
        >
          {displayDescription}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={btn}>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptAttr}
            onChange={onSelect}
            disabled={busy || readOnly}
            style={{ display: 'none' }}
          />
          Select image
        </label>

        {preview?.url && (
          <>
            <button type="button" onClick={startEditOriginal} disabled={busy} style={btn}>
              Edit
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy}
              style={btn}
            >
              Replace
            </button>
            <button type="button" onClick={removeAll} disabled={busy} style={btn}>
              Remove
            </button>
            <a
              href={preview.url}
              target="_blank"
              rel="noreferrer"
              style={{ ...btn, textDecoration: 'none' }}
            >
              Open
            </a>
          </>
        )}
      </div>

      {/* Cropper (fixed height box) */}
      {src && (
        <>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 360, // fixed cropper area height
              background: '#111',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <Cropper
              image={src}
              crop={crop}
              onCropChange={setCrop}
              aspect={aspect}
              cropShape="rect"
              zoom={zoom}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label>Zoom</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              disabled={busy}
              style={{ width: 160 }}
            />
            <button type="button" onClick={createPendingCrop} disabled={busy} style={btnPrimary}>
              {busy ? 'Preparing…' : 'Apply crop'}
            </button>
            <button
              type="button"
              onClick={() => (setSrc(null), setError(''))}
              disabled={busy}
              style={btn}
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Preview (fixed-size box like requested) */}
      {preview?.url && !src && (
        <div style={{ display: 'grid', gap: 6 }}>
          <div
            style={{
              width: '100%',
              height: 360,
              borderRadius: 8,
              border: '1px solid var(--theme-elevation-150)',
              overflow: 'hidden',
              background: 'var(--theme-elevation-100)',
            }}
          >
            <img
              src={preview.url}
              alt={alt || 'Selected image'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>

          {preview.filename && <div style={muted}>File: {preview.filename}</div>}
          {(sizes.original || sizes.cropped) && (
            <div style={muted}>
              {sizes.original ? `Original: ${formatBytes(sizes.original)}` : ''}
              {sizes.cropped
                ? `${sizes.original ? ' • ' : ''}Cropped: ${formatBytes(sizes.cropped)}`
                : ''}
            </div>
          )}
        </div>
      )}

      {/* Alt input (disabled UI info) */}
      <div>
        <div style={{ marginBottom: 4 }}>Alt text</div>
        <input
          type="text"
          placeholder="Describe the image"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          disabled={true}
          style={inputBox}
        />
        <div style={muted}>
          Format: {outputType}
          {typeof maxKB === 'number' ? ` • Max cropped size: ${maxKB} KB` : ''}
          {typeof maxKBOriginal === 'number' ? ` • Max original size: ${maxKBOriginal} KB` : ''}
        </div>
      </div>

      {error && <div style={{ color: 'var(--theme-error-500)', fontSize: 13 }}>{error}</div>}
    </div>
  )
}

export default CropUploadField
