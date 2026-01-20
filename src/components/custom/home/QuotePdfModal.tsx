// 'use client'

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { useEffect, useState } from 'react'

// type Props = {
//   open: boolean
//   onOpenChange: (v: boolean) => void

//   // payload to generate pdf
//   requestBody: any
// }

// export default function QuotePdfModal({ open, onOpenChange, requestBody }: Props) {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [err, setErr] = useState<string | null>(null)

//   useEffect(() => {
//     if (!open) return

//     let active = true
//     const run = async () => {
//       setLoading(true)
//       setErr(null)
//       setPdfUrl(null)

//       try {
//         const res = await fetch('/api/quote-pdf', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody),
//         })

//         if (!res.ok) {
//           const text = await res.text()
//           throw new Error(text || 'PDF generation failed')
//         }

//         const blob = await res.blob()
//         const url = URL.createObjectURL(blob)

//         if (!active) {
//           URL.revokeObjectURL(url)
//           return
//         }
//         setPdfUrl(url)
//       } catch (e: any) {
//         setErr(e?.message ?? 'Failed')
//       } finally {
//         if (active) setLoading(false)
//       }
//     }

//     run()

//     return () => {
//       active = false
//     }
//   }, [open, requestBody])

//   // cleanup when closing / url changes
//   useEffect(() => {
//     return () => {
//       if (pdfUrl) URL.revokeObjectURL(pdfUrl)
//     }
//   }, [pdfUrl])

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden">
//         <DialogHeader className="p-4  border-b ">
//           <div className="flex items-center gap-4 ">
//             <DialogTitle>Quote Illustration (PDF)</DialogTitle>
//             <div className="flex">
//               {pdfUrl && (
//                 <a href={pdfUrl} download="quote-illustration.pdf">
//                   <Button variant="default" size="sm">
//                     Download
//                   </Button>
//                 </a>
//               )}
//             </div>
//           </div>
//         </DialogHeader>

//         <div className="h-[calc(90vh-72px)]">
//           {loading && (
//             <div className="p-6 flex justify-center items-center w-full h-full">
//               Generating PDF …
//             </div>
//           )}
//           {err && <div className="p-6 text-red-600">{err}</div>}

//           {/* {pdfUrl && !loading && (
//             <iframe title="pdf-preview" src={pdfUrl} className="w-full h-full" />
//           )} */}
//           {pdfUrl && !loading && (
//             <iframe
//               title="pdf-preview"
//               // try to hide built-in viewer UI
//               src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
//               className="w-full h-full"
//               style={{ border: 'none' }}
//             />
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// ======================================================
// ======================================================
// ======================================================

// // fixed the mobile modal issue to new tab
// 'use client'

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { useEffect, useMemo, useState } from 'react'

// type Props = {
//   open: boolean
//   onOpenChange: (v: boolean) => void
//   requestBody: any
// }

// /**
//  * Some mobile/tablet browsers (esp. iOS Safari, some Android WebViews)
//  * cannot reliably render blob: PDFs inside an iframe.
//  *
//  * Fix strategy:
//  * 1) Always generate the PDF as Blob URL (works for Download everywhere)
//  * 2) For desktop -> show iframe preview
//  * 3) For mobile/tablet -> show a big "Open PDF" button (opens in new tab)
//  *    + still keep download button
//  *
//  * This makes it WORK on mobile/tablet instead of a blank/black iframe.
//  */

// function useIsSmallScreen(breakpoint = 1024) {
//   const [isSmall, setIsSmall] = useState(false)

//   useEffect(() => {
//     const update = () => setIsSmall(window.innerWidth < breakpoint)
//     update()
//     window.addEventListener('resize', update)
//     return () => window.removeEventListener('resize', update)
//   }, [breakpoint])

//   return isSmall
// }

// function isIOS() {
//   if (typeof navigator === 'undefined') return false
//   return /iPad|iPhone|iPod/.test(navigator.userAgent)
// }

// export default function QuotePdfModal({ open, onOpenChange, requestBody }: Props) {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [err, setErr] = useState<string | null>(null)

//   // ✅ treat tablets as "small" too
//   // Use 1024 so iPad / most tablets fall into fallback mode.
//   const isSmall = useIsSmallScreen(1024)

//   // ✅ on iOS, iframe blob PDF is very unreliable -> always fallback
//   const needsExternalOpen = isSmall || isIOS()

//   // Stable key so effect doesn't refire on every render when requestBody is a new object
//   const requestKey = useMemo(() => JSON.stringify(requestBody ?? {}), [requestBody])

//   useEffect(() => {
//     if (!open) return

//     let active = true

//     const run = async () => {
//       setLoading(true)
//       setErr(null)

//       // cleanup previous url
//       setPdfUrl((prev) => {
//         if (prev) URL.revokeObjectURL(prev)
//         return null
//       })

//       try {
//         const res = await fetch('/api/quote-pdf', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: requestKey,
//         })

//         if (!res.ok) {
//           const text = await res.text()
//           throw new Error(text || 'PDF generation failed')
//         }

//         const blob = await res.blob()
//         const url = URL.createObjectURL(blob)

//         if (!active) {
//           URL.revokeObjectURL(url)
//           return
//         }

//         setPdfUrl(url)
//       } catch (e: any) {
//         setErr(e?.message ?? 'Failed')
//       } finally {
//         if (active) setLoading(false)
//       }
//     }

//     run()

//     return () => {
//       active = false
//     }
//   }, [open, requestKey])

//   // cleanup when unmount
//   useEffect(() => {
//     return () => {
//       if (pdfUrl) URL.revokeObjectURL(pdfUrl)
//     }
//   }, [pdfUrl])

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden">
//         <DialogHeader className="p-4 border-b">
//           <div className="flex items-center gap-4">
//             <DialogTitle>Quote Illustration (PDF)</DialogTitle>

//             <div className="flex gap-2">
//               {pdfUrl && (
//                 <>
//                   {/* ✅ Works everywhere */}
//                   <a href={pdfUrl} download="quote-illustration.pdf">
//                     <Button variant="default" size="sm">
//                       Download
//                     </Button>
//                   </a>

//                   {/* ✅ Mobile/tablet: open in new tab (reliable) */}
//                   {needsExternalOpen && (
//                     <a href={pdfUrl} target="_blank" rel="noreferrer">
//                       <Button variant="secondary" size="sm">
//                         Open
//                       </Button>
//                     </a>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </DialogHeader>

//         <div className="h-[calc(90vh-72px)]">
//           {loading && (
//             <div className="p-6 flex justify-center items-center w-full h-full">
//               Generating PDF …
//             </div>
//           )}
//           {err && <div className="p-6 text-red-600">{err}</div>}

//           {/* ✅ Desktop preview */}
//           {pdfUrl && !loading && !needsExternalOpen && (
//             <iframe
//               key={pdfUrl} // ✅ force remount when url changes
//               title="pdf-preview"
//               src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
//               className="w-full h-full"
//               style={{ border: 'none' }}
//             />
//           )}

//           {/* ✅ Mobile/tablet fallback */}
//           {pdfUrl && !loading && needsExternalOpen && (
//             <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6">
//               <p className="text-sm text-muted-foreground text-center max-w-md">
//                 PDF preview is not supported inside the modal on some mobile/tablet browsers. Use
//                 the button below to open it.
//               </p>

//               <a href={pdfUrl} target="_blank" rel="noreferrer" className="w-full max-w-sm">
//                 <Button className="w-full" size="lg">
//                   Open PDF
//                 </Button>
//               </a>
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// ==============================================================================
// ==============================================================================
// ==============================================================================

// fixed the mobile modal issue to new tab
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  requestBody: any
}

/**
 * Some mobile/tablet browsers (esp. iOS Safari, some Android WebViews)
 * cannot reliably render blob: PDFs inside an iframe.
 *
 * Fix strategy:
 * 1) Always generate the PDF as Blob URL (works for Download everywhere)
 * 2) For desktop -> show iframe preview
 * 3) For mobile/tablet -> show a big "Open PDF" button (opens in new tab)
 *    + still keep download button
 *
 * This makes it WORK on mobile/tablet instead of a blank/black iframe.
 */

function useIsSmallScreen(breakpoint = 1024) {
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const update = () => setIsSmall(window.innerWidth < breakpoint)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [breakpoint])

  return isSmall
}

function isIOS() {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export default function QuotePdfModal({ open, onOpenChange, requestBody }: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  // ✅ NEW: send state
  const [sendingEmail, setSendingEmail] = useState(false)
  const [sendMsg, setSendMsg] = useState<string | null>(null)

  // ✅ treat tablets as "small" too
  // Use 1024 so iPad / most tablets fall into fallback mode.
  const isSmall = useIsSmallScreen(1024)

  // ✅ on iOS, iframe blob PDF is very unreliable -> always fallback
  const needsExternalOpen = isSmall || isIOS()

  // Stable key so effect doesn't refire on every render when requestBody is a new object
  const requestKey = useMemo(() => JSON.stringify(requestBody ?? {}), [requestBody])

  useEffect(() => {
    if (!open) return

    let active = true

    const run = async () => {
      setLoading(true)
      setErr(null)
      setSendMsg(null) // ✅ NEW: clear send status when generating new pdf

      // cleanup previous url
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })

      try {
        const res = await fetch('/api/quote-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestKey,
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'PDF generation failed')
        }

        const blob = await res.blob()
        const url = URL.createObjectURL(blob)

        if (!active) {
          URL.revokeObjectURL(url)
          return
        }

        setPdfUrl(url)
      } catch (e: any) {
        setErr(e?.message ?? 'Failed')
      } finally {
        if (active) setLoading(false)
      }
    }

    run()

    return () => {
      active = false
    }
  }, [open, requestKey])

  // cleanup when unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl)
    }
  }, [pdfUrl])

  // ✅ NEW: send email handler (minimal, uses your existing pdfUrl)
  const handleSendEmail = async () => {
    if (!pdfUrl) return

    // Adjust this if your form stores email elsewhere
    const email = String(requestBody?.email ?? requestBody?.formData?.email ?? '').trim()

    if (!email) {
      setSendMsg('Email not found in requestBody.')
      return
    }

    try {
      setSendingEmail(true)
      setSendMsg(null)

      // convert blobUrl -> Blob
      const pdfBlob = await fetch(pdfUrl).then((r) => r.blob())

      const fd = new FormData()
      fd.append('email', email)
      // optional extra info if you want (won't break if your API ignores)
      if (requestBody?.formData?.phoneNumber)
        fd.append('phone', String(requestBody.formData?.phoneNumber))
      fd.append('file', pdfBlob, 'quote-illustration.pdf') // must be "file"

      const endpoint =
        process.env.NEXT_PUBLIC_EMAIL_PROVIDER === 'outlook'
          ? '/api/emails/quote-outlook'
          : '/api/emails/quote'

      const res = await fetch(endpoint, {
        method: 'POST',
        body: fd,
      })

      const data = await res.json().catch(() => ({}) as any)
      if (!res.ok) throw new Error(data?.message || 'Failed to send email')

      setSendMsg('Email sent successfully.')
    } catch (e: any) {
      setSendMsg(e?.message || 'Failed to send email.')
    } finally {
      setSendingEmail(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center gap-4">
            <DialogTitle>Quote Illustration (PDF)</DialogTitle>

            <div className="flex gap-2">
              {pdfUrl && (
                <>
                  {/* ✅ Works everywhere */}
                  <a href={pdfUrl} download="quote-illustration.pdf">
                    <Button variant="default" size="sm">
                      Download
                    </Button>
                  </a>

                  {/* ✅ NEW: Send Email button (beside Download) */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSendEmail}
                    disabled={sendingEmail || loading}
                  >
                    {sendingEmail ? 'Sending…' : 'Send Email'}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* ✅ NEW: tiny status text (doesn't affect functionality) */}
          {sendMsg && <div className="pt-2 text-sm">{sendMsg}</div>}
        </DialogHeader>

        <div className="h-[calc(90vh-72px)]">
          {loading && (
            <div className="p-6 flex justify-center items-center w-full h-full">
              Generating PDF …
            </div>
          )}
          {err && <div className="p-6 text-red-600">{err}</div>}

          {/* ✅ Desktop preview */}
          {pdfUrl && !loading && !needsExternalOpen && (
            <iframe
              key={pdfUrl} // ✅ force remount when url changes
              title="pdf-preview"
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          )}

          {/* ✅ Mobile/tablet fallback */}
          {pdfUrl && !loading && needsExternalOpen && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6">
              <p className="text-sm text-muted-foreground text-center max-w-md">
                PDF preview is not supported inside the modal on some mobile/tablet browsers. Use
                the button below to open it.
              </p>

              <a href={pdfUrl} target="_blank" rel="noreferrer" className="w-full max-w-sm">
                <Button className="w-full" size="lg">
                  Open PDF
                </Button>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
