'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void

  // payload to generate pdf
  requestBody: any
}

export default function QuotePdfModal({ open, onOpenChange, requestBody }: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return

    let active = true
    const run = async () => {
      setLoading(true)
      setErr(null)
      setPdfUrl(null)

      try {
        const res = await fetch('/api/quote-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
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
  }, [open, requestBody])

  // cleanup when closing / url changes
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl)
    }
  }, [pdfUrl])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4  border-b ">
          <div className="flex items-center gap-4 ">
            <DialogTitle>Quote Illustration (PDF)</DialogTitle>
            <div className="flex">
              {pdfUrl && (
                <a href={pdfUrl} download="quote-illustration.pdf">
                  <Button variant="default" size="sm">
                    Download
                  </Button>
                </a>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="h-[calc(90vh-72px)]">
          {loading && (
            <div className="p-6 flex justify-center items-center w-full h-full">
              Generating PDF …
            </div>
          )}
          {err && <div className="p-6 text-red-600">{err}</div>}

          {/* {pdfUrl && !loading && (
            <iframe title="pdf-preview" src={pdfUrl} className="w-full h-full" />
          )} */}
          {pdfUrl && !loading && (
            <iframe
              title="pdf-preview"
              // try to hide built-in viewer UI
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
