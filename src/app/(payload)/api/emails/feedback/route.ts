import { addDataAndFileToRequest, PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (req: PayloadRequest) => {
  const payload = await getPayload({ config })
  await addDataAndFileToRequest(req)
  const { name, email, phone, address, feedback, recipients = [], senderOverride } = req.data || {}

  // sanitize recipients (string or array)
  const toList = Array.isArray(recipients) ? recipients : String(recipients || '').split(',')
  const to = toList
    .map((s: string) => s?.trim())
    .filter((s: string) => s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))

  if (!to.length) {
    return new Response(JSON.stringify({ success: false, error: 'No valid recipients' }), {
      status: 400,
    })
  }

  // prefer block-provided "From", otherwise env default
  const fromAddress =
    (senderOverride?.fromEmail && String(senderOverride.fromEmail).trim()) ||
    process?.env?.SMTP_MAIL_FROM ||
    'no-reply@example.com'
  // console.log({ name, email, phone, address, feedback })
  // console.log(payload)
  await payload?.sendEmail({
    to,
    subject: 'Feedback email',
    text: `name: ${name}, email: ${email}, phone: ${phone}, address: ${address}, feedback: ${feedback}, `,
    // Gmail SMTP will display this From. Keep it on the authenticated domain.
    from: `"${senderOverride?.fromName || 'Shanta Life'}" <${process.env.SMTP_MAIL_FROM}>`,
    // Make replies go to the address configured in your block (or fall back to env)
    replyTo: senderOverride?.fromEmail || process.env.SMTP_MAIL_FROM,

    // Optional: set SMTP envelope (Gmail may still show the authenticated From)
    envelope: {
      from: process.env.SMTP_MAIL_FROM as string,
      to, // no need to split; we already have an array
    },
  })
  return Response.json({ success: true })
}
