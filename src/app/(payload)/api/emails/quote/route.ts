import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

export const runtime = 'nodejs' // ✅ required for Buffer + email attachments

export async function POST(req: NextRequest) {
  try {
    // ✅ Payload local API (new recommended way)
    const payload = await getPayload({ config: payloadConfig })

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

    await payload.sendEmail({
      to: email, // ✅ send to user email from formData
      subject: 'Your Quote PDF',
      // text: `Please find your quote PDF attached.\n\nPhone: ${phone || 'N/A'}`,
      text: `Please find your quote PDF attached.\n\n`,
      attachments: [
        {
          filename: file.name || 'quote-illustration.pdf',
          content: pdfBuffer,
          contentType: file.type || 'application/pdf',
        },
      ],
    })

    return Response.json({ success: true })
  } catch (err: any) {
    return Response.json(
      { success: false, message: err?.message || 'Failed to send email' },
      { status: 500 },
    )
  }
}
