import { addDataAndFileToRequest, PayloadRequest } from 'payload'
import { sendEmailViaMsGraph } from '@/lib/email/msGraphMailer'

export const runtime = 'nodejs' // IMPORTANT for MSAL

export const POST = async (req: PayloadRequest) => {
  await addDataAndFileToRequest(req)

  const { firstName, lastName, email, phone, message, recipients = [], senderOverride } = req.data || {}

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

  const subject = 'Contact Us Form — Website Message'
  const text = [
    `First Name: ${firstName}`,
    `Last Name: ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    '',
    `Message:`,
    message,
    '',
    '— Sent from Contact Us form',
  ].join('\n')

  // Graph: sender is fixed as MS_SENDER_EMAIL (env).
  // So we only control reply-to.
  const replyTo =
    (senderOverride?.fromEmail && String(senderOverride.fromEmail).trim()) ||
    (email && String(email).trim()) ||
    undefined

  try {
    await sendEmailViaMsGraph({
      to,
      subject,
      text,
      replyTo,
      saveToSentItems: true,
    })

    return Response.json({ success: true })
  } catch (err: any) {
    console.error('[ask-us-outlook] ERROR', err)

    return new Response(
      JSON.stringify({
        success: false,
        error: err?.message || 'Internal Server Error',
      }),
      { status: 500 }
    )
  }
}
