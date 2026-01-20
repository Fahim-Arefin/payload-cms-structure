import { NextRequest } from 'next/server'
import { sendEmailViaMsGraph } from '@/lib/email/msGraphMailer'

export const runtime = 'nodejs' // ✅ required for Buffer + MSAL

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()

    const email = String(form.get('email') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const file = form.get('file')

    if (!email) {
      return Response.json({ success: false, message: 'Email is required.' }, { status: 400 })
    }

    if (!(file instanceof File)) {
      return Response.json(
        { success: false, message: 'PDF file is missing. Send multipart field "file".' },
        { status: 400 },
      )
    }

    // ✅ File -> Buffer
    const arrayBuffer = await file.arrayBuffer()
    const pdfBuffer = Buffer.from(arrayBuffer)

    // ✅ Graph supports attachments as base64
    const base64 = pdfBuffer.toString('base64')

    await sendEmailViaMsGraph({
      to: [email],
      subject: 'Your Quote PDF',
      text: `Please find your quote PDF attached.\n\n${phone ? `Phone: ${phone}\n\n` : ''}`,
      saveToSentItems: true,
      attachments: [
        {
          filename: file.name || 'quote-illustration.pdf',
          contentBase64: base64,
          contentType: file.type || 'application/pdf',
        },
      ],
    })

    return Response.json({ success: true })
  } catch (err: any) {
    console.error('[quote-outlook] ERROR', err)
    return Response.json(
      { success: false, message: err?.message || 'Failed to send email' },
      { status: 500 },
    )
  }
}
