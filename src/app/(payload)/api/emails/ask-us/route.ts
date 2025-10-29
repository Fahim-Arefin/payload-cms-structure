// import { addDataAndFileToRequest, PayloadRequest } from 'payload'
// import { getPayload } from 'payload'
// import config from '@payload-config'

// export const POST = async (req: PayloadRequest) => {
//   const payload = await getPayload({ config })
//   await addDataAndFileToRequest(req)

//   const { firstName, lastName, email, phone, address, message } = req.data

//     const additionalEmail = process?.env?.SHANTA_ADDITIONAL_EMAIL

//   // Construct the "to" field with both the original and additional email
//   const toEmails = `${process?.env?.SHANTA_SUPPORT_MAIL}, ${additionalEmail}`
//   // console.log({ name, email, phone, address, message })
//   // console.log(payload)
//   await payload?.sendEmail({
//     to: toEmails,
//     subject: 'Ask us email',
//     text: `First Name: ${firstName}, Last Name: ${lastName}, email: ${email}, phone: ${phone}, address: ${address}, message: ${message}, `,
//   })
//   return Response.json({ success: true })
// }

// ===================================================================================
// ===================================================================================
// ===================================================================================
// import { NextResponse } from 'next/server'
// import { getPayload } from 'payload'
// import config from '@payload-config'
// export async function POST(req: Request) {
//   try {
//     const payload = await getPayload({ config })
//     const body = await req.json().catch(() => ({}))

//     const {
//       firstName = '',
//       lastName = '',
//       email = '',
//       phone = '',
//       message = '',
//       recipients = [],
//     } = body || {}

//     // sanitize recipients from client (take only valid emails; unique)
//     const validEmail = (s: unknown) =>
//       typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
//     const fromBlock = Array.isArray(recipients)
//       ? (recipients as string[]).filter(validEmail).map((s) => s.trim())
//       : []

//     // env fallbacks
//     const fallback1 = process?.env?.SHANTA_SUPPORT_MAIL
//     const fallback2 = process?.env?.SHANTA_ADDITIONAL_EMAIL
//     const envEmails = [fallback1, fallback2].filter(validEmail) as string[]

//     // final list (prefer block emails if present; otherwise use env)
//     const toList = (fromBlock.length ? fromBlock : envEmails).filter(Boolean)
//     if (!toList.length) {
//       return NextResponse.json(
//         { success: false, error: 'No recipient email configured.' },
//         { status: 400 },
//       )
//     }

//     const subject = 'Ask Us — Website Message'
//     const text = [
//       `First Name: ${firstName}`,
//       `Last Name: ${lastName}`,
//       `Email: ${email}`,
//       `Phone: ${phone}`,
//       '',
//       `Message:`,
//       message,
//       '',
//       '— Sent from Contact Us form',
//     ].join('\n')

//     await payload.sendEmail({
//       to: toList.join(', '), // send to all
//       subject,
//       text,
//     })

//     return NextResponse.json({ success: true })
//   } catch (e) {
//     return NextResponse.json(
//       { success: false, error: (e as Error)?.message || 'Unknown error' },
//       { status: 500 },
//     )
//   }
// }

// ==================================================================================
// ==================================================================================
// ==================================================================================
// /app/api/emails/ask-us/route.ts (or wherever your route is)
import { addDataAndFileToRequest, PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (req: PayloadRequest) => {
  const payload = await getPayload({ config })
  await addDataAndFileToRequest(req)

  const {
    firstName,
    lastName,
    email,
    phone,
    message,
    recipients = [],
    senderOverride,
  } = req.data || {}

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

  // prefer block-provided "From", otherwise env default
  const fromAddress =
    (senderOverride?.fromEmail && String(senderOverride.fromEmail).trim()) ||
    process?.env?.SMTP_MAIL_FROM ||
    'no-reply@example.com'

  console.log('form address', fromAddress)

  const fromName =
    (senderOverride?.fromName && String(senderOverride.fromName).trim()) || 'Shanta Life'

  // await payload.sendEmail({
  //   // Nodemailer accepts object or string — use object for clarity
  //   from: { address: fromAddress, name: fromName },
  //   to, // array -> multiple recipients
  //   subject,
  //   text,
  // })

  await payload.sendEmail({
    to, // array of validated recipients
    subject,
    text, // composed plain text body
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
