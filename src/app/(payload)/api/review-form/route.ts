// import config from '@payload-config'
// import { getPayload } from 'payload'
// import { NextResponse } from 'next/server'

// type ReviewRequestBody = {
//   name: string
//   email: string
//   companyName?: string
//   position?: string
//   country: string
//   countryDialCode?: string
//   phone: string
//   rating: number
//   review: string
// }

// export async function POST(req: Request) {
//   try {
//     const body = (await req.json()) as ReviewRequestBody

//     const { name, email, companyName, position, country, countryDialCode, phone, rating, review } =
//       body

//     if (!name?.trim()) {
//       return NextResponse.json({ message: 'Name is required.' }, { status: 400 })
//     }

//     if (!email?.trim()) {
//       return NextResponse.json({ message: 'Email is required.' }, { status: 400 })
//     }

//     if (!country?.trim()) {
//       return NextResponse.json({ message: 'Country is required.' }, { status: 400 })
//     }

//     if (!phone?.trim()) {
//       return NextResponse.json({ message: 'Phone is required.' }, { status: 400 })
//     }

//     if (!review?.trim()) {
//       return NextResponse.json({ message: 'Review is required.' }, { status: 400 })
//     }

//     if (!rating || rating < 1 || rating > 5) {
//       return NextResponse.json({ message: 'Rating must be between 1 and 5.' }, { status: 400 })
//     }

//     const payload = await getPayload({ config })

//     const doc = await payload.create({
//       collection: 'review',
//       data: {
//         name: name.trim(),
//         email: email.trim(),
//         companyName: companyName?.trim() || '',
//         position: position?.trim() || '',
//         country: country.trim(),
//         countryDialCode: countryDialCode?.trim() || '',
//         phone: phone.trim(),
//         rating,
//         review: review.trim(),
//         status: 'new',
//       },
//     })

//     return NextResponse.json(
//       {
//         message: 'Review submitted successfully.',
//         doc,
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.error('Review submit error:', error)

//     return NextResponse.json(
//       { message: 'Something went wrong while submitting the form.' },
//       { status: 500 },
//     )
//   }
// }

import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import { sendEmailViaMsGraph } from '@/lib/email/msGraphMailer'

export const runtime = 'nodejs'

type ReviewRequestBody = {
  name: string
  email: string
  companyName?: string
  position?: string
  country: string
  countryDialCode?: string
  phone: string
  rating: number
  review: string
  recipients?: string[]
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const getValidRecipients = (recipients: unknown): string[] => {
  const list = Array.isArray(recipients)
    ? recipients
    : String(recipients || '')
        .split(',')
        .map((item) => item.trim())

  return list
    .map((email) => String(email || '').trim())
    .filter((email) => email && emailRegex.test(email))
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReviewRequestBody

    const {
      name,
      email,
      companyName,
      position,
      country,
      countryDialCode,
      phone,
      rating,
      review,
      recipients = [],
    } = body

    if (!name?.trim()) {
      return NextResponse.json({ message: 'Name is required.' }, { status: 400 })
    }

    if (!email?.trim()) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 })
    }

    if (!country?.trim()) {
      return NextResponse.json({ message: 'Country is required.' }, { status: 400 })
    }

    if (!phone?.trim()) {
      return NextResponse.json({ message: 'Phone is required.' }, { status: 400 })
    }

    if (!review?.trim()) {
      return NextResponse.json({ message: 'Review is required.' }, { status: 400 })
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ message: 'Rating must be between 1 and 5.' }, { status: 400 })
    }

    const to = getValidRecipients(recipients)

    if (!to.length) {
      return NextResponse.json({ message: 'No valid recipients.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const doc = await payload.create({
      collection: 'review',
      data: {
        name: name.trim(),
        email: email.trim(),
        companyName: companyName?.trim() || '',
        position: position?.trim() || '',
        country: country.trim(),
        countryDialCode: countryDialCode?.trim() || '',
        phone: phone.trim(),
        rating,
        review: review.trim(),
        status: 'new',
      },
    })

    const fullPhone = [countryDialCode, phone].filter(Boolean).join(' ')
    const submittedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Dhaka',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const subject = `New Customer Review — ${name.trim()}`

    const text = [
      'New customer review submitted from Sagar Rope website.',
      '',
      `Buyer Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Company Name: ${companyName?.trim() || '-'}`,
      `Position: ${position?.trim() || '-'}`,
      `Country: ${country.trim()}`,
      `Contact No.: ${fullPhone || '-'}`,
      `Rating: ${rating}/5`,
      '',
      'Review:',
      review.trim(),
      '',
      `Submitted At: ${submittedAt}`,
      '',
      '— Sent from Sagar Rope Feedback Form',
    ].join('\n')

    const html = `
      <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#070725;">
        <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
          <div style="background:#ffffff;border:1px solid #d8edf0;padding:28px;">
            <div style="border-bottom:3px solid #22c7d5;padding-bottom:14px;margin-bottom:22px;">
              <h1 style="margin:0;font-size:24px;line-height:1.3;color:#070725;">
                New Customer Review
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:#4b4b63;">
                Submitted from Sagar Rope website feedback form
              </p>
            </div>

            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;">Buyer Name</td>
                <td style="padding:10px 0;">${escapeHtml(name.trim())}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;">Email</td>
                <td style="padding:10px 0;">${escapeHtml(email.trim())}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;">Company Name</td>
                <td style="padding:10px 0;">${escapeHtml(companyName?.trim() || '-')}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;">Position</td>
                <td style="padding:10px 0;">${escapeHtml(position?.trim() || '-')}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;">Country</td>
                <td style="padding:10px 0;">${escapeHtml(country.trim())}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;">Contact No.</td>
                <td style="padding:10px 0;">${escapeHtml(fullPhone || '-')}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;">Rating</td>
                <td style="padding:10px 0;">${escapeHtml(rating)}/5</td>
              </tr>
            </table>

            <div style="margin-top:22px;padding-top:20px;border-top:1px solid #e2e8f0;">
              <h2 style="margin:0 0 10px;font-size:18px;color:#070725;">Review</h2>
              <div style="white-space:pre-line;font-size:15px;line-height:1.7;color:#202040;background:#f8fbfc;border:1px solid #e2f3f5;padding:16px;">
                ${escapeHtml(review.trim())}
              </div>
            </div>

            <p style="margin:22px 0 0;font-size:13px;color:#6b7280;">
              Submitted At: ${escapeHtml(submittedAt)}
            </p>
          </div>
        </div>
      </div>
    `

    const replyTo = emailRegex.test(email.trim()) ? email.trim() : undefined

    await sendEmailViaMsGraph({
      to,
      subject,
      text,
      html,
      replyTo,
      saveToSentItems: true,
    })

    return NextResponse.json(
      {
        message: 'Review submitted successfully.',
        doc,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Review submit error:', error)

    return NextResponse.json(
      { message: error?.message || 'Something went wrong while submitting the form.' },
      { status: 500 },
    )
  }
}
