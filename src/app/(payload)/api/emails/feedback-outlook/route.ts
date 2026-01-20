import { addDataAndFileToRequest, PayloadRequest } from 'payload'
import { sendEmailViaMsGraph } from '@/lib/email/msGraphMailer'

export const runtime = 'nodejs' // IMPORTANT: do not run in edge

export const POST = async (req: PayloadRequest) => {
  await addDataAndFileToRequest(req)

  const { name, email, phone, address, feedback, recipients = [], senderOverride } = req.data || {}

  // same recipient sanitation logic (copy from your existing route)
  const toList = Array.isArray(recipients) ? recipients : String(recipients || '').split(',')
  const to = toList
    .map((s: string) => s?.trim())
    .filter((s: string) => s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))

  if (!to.length) {
    return new Response(JSON.stringify({ success: false, error: 'No valid recipients' }), {
      status: 400,
    })
  }

  const subject = 'Feedback email'
  const text = `name: ${name}, email: ${email}, phone: ${phone}, address: ${address}, feedback: ${feedback}`

  // Graph: sender is fixed by MS_SENDER_EMAIL, so we use replyTo to point back to user or override
  const replyTo =
    (senderOverride?.fromEmail && String(senderOverride.fromEmail).trim()) ||
    (email && String(email).trim()) ||
    undefined

  await sendEmailViaMsGraph({
    to,
    subject,
    text,
    replyTo,
    saveToSentItems: true,
  })

  return Response.json({ success: true })
}
