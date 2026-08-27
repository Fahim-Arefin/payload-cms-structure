// import config from '@payload-config'
// import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
// import { getPayload } from 'payload'

// export const runtime = 'nodejs'

// const REVIEW_MAX_LENGTH = 500

// function getString(value: unknown) {
//   return typeof value === 'string' ? value.trim() : ''
// }

// function validateReviewPayload(body: any) {
//   const buyersFullName = getString(body?.buyersFullName)
//   const linkedIn = getString(body?.linkedIn)
//   const companyName = getString(body?.companyName)
//   const position = getString(body?.position)
//   const country = getString(body?.country)
//   const countryDialCode = getString(body?.countryDialCode)
//   const phone = getString(body?.phone)
//   const review = getString(body?.review)
//   const rating = Number(body?.rating || 0)

//   if (!buyersFullName) return { error: 'Buyer full name is required.' }
//   if (!companyName) return { error: 'Company name is required.' }
//   if (!position) return { error: 'Position is required.' }
//   if (!country) return { error: 'Country is required.' }
//   if (!phone) return { error: 'Contact number is required.' }
//   if (!/^\d+$/.test(phone)) return { error: 'Contact number can contain numbers only.' }

//   const phoneNumber = parsePhoneNumberFromString(phone, country as CountryCode)

//   if (!phoneNumber) return { error: 'Please enter a valid contact number.' }
//   if (!phoneNumber.isPossible()) {
//     return { error: 'Phone number length is not valid for the selected country.' }
//   }
//   if (!phoneNumber.isValid()) return { error: 'Please enter a valid contact number.' }

//   if (!rating || rating < 1 || rating > 5) return { error: 'Rating is required.' }

//   if (!review) return { error: 'Review is required.' }
//   if (review.length > REVIEW_MAX_LENGTH) {
//     return { error: `Review must be ${REVIEW_MAX_LENGTH} characters or less.` }
//   }

//   return {
//     data: {
//       buyersFullName,
//       linkedIn,
//       companyName,
//       position,
//       country,
//       countryDialCode,
//       phone,
//       rating,
//       review,
//     },
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const validation = validateReviewPayload(body)

//     if ('error' in validation) {
//       return Response.json(
//         {
//           success: false,
//           message: validation.error,
//         },
//         { status: 400 },
//       )
//     }

//     const payload = await getPayload({ config })

//     const submission = await payload.create({
//       collection: 'review-form-submissions',
//       data: validation.data,
//       overrideAccess: true,
//     })

//     return Response.json({
//       success: true,
//       message: 'Review submitted successfully.',
//       submissionId: submission.id,
//     })
//   } catch (error) {
//     console.error('Review form submission error:', error)

//     return Response.json(
//       {
//         success: false,
//         message: 'Something went wrong while submitting your review.',
//       },
//       { status: 500 },
//     )
//   }
// }

import config from '@payload-config'
import { readFile } from 'fs/promises'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
import path from 'path'
import { getPayload } from 'payload'

export const runtime = 'nodejs'

const REVIEW_MAX_LENGTH = 500
// const EMAIL_LOGO_PUBLIC_PATH = '/assets/images/DPXynolab.png'
const EMAIL_LOGO_PUBLIC_PATH = '/assets/images/emailLogo.png'
const EMAIL_LOGO_CONTENT_ID = 'xynolab-rating-email-logo'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ReviewRequestBody = {
  buyersFullName?: string
  linkedIn?: string
  companyName?: string
  position?: string
  country?: string
  countryDialCode?: string
  phone?: string
  rating?: number
  review?: string
  recipients?: string[] | string
}

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

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

const getPublicAssetUrl = (assetPath: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.API_URL || ''

  return `${String(baseUrl).replace(/\/$/, '')}${assetPath}`
}

const getEmailLogoBuffer = async () => {
  try {
    const cleanPublicPath = EMAIL_LOGO_PUBLIC_PATH.replace(/^\/+/, '')
    const logoPath = path.join(process.cwd(), 'public', cleanPublicPath)

    return await readFile(logoPath)
  } catch (error) {
    console.error(
      `[review-form] Failed to read inline email logo: ${EMAIL_LOGO_PUBLIC_PATH}`,
      error,
    )

    return undefined
  }
}

const getEmailLogoFileName = () => {
  return EMAIL_LOGO_PUBLIC_PATH.split('/').filter(Boolean).pop() || 'email-logo.png'
}

const getEmailLogoContentType = () => {
  const extension = getEmailLogoFileName().split('.').pop()?.toLowerCase()

  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg'
  if (extension === 'webp') return 'image/webp'
  if (extension === 'gif') return 'image/gif'
  if (extension === 'svg') return 'image/svg+xml'

  return 'image/png'
}

function validateReviewPayload(body: ReviewRequestBody) {
  const buyersFullName = getString(body?.buyersFullName)
  const linkedIn = getString(body?.linkedIn)
  const companyName = getString(body?.companyName)
  const position = getString(body?.position)
  const country = getString(body?.country)
  const countryDialCode = getString(body?.countryDialCode)
  const phone = getString(body?.phone)
  const review = getString(body?.review)
  const rating = Number(body?.rating || 0)

  if (!buyersFullName) return { error: 'Buyer full name is required.' }
  if (!companyName) return { error: 'Company name is required.' }
  if (!position) return { error: 'Position is required.' }
  if (!country) return { error: 'Country is required.' }
  if (!phone) return { error: 'Contact number is required.' }
  if (!/^\d+$/.test(phone)) return { error: 'Contact number can contain numbers only.' }

  const phoneNumber = parsePhoneNumberFromString(phone, country as CountryCode)

  if (!phoneNumber) return { error: 'Please enter a valid contact number.' }
  if (!phoneNumber.isPossible()) {
    return { error: 'Phone number length is not valid for the selected country.' }
  }
  if (!phoneNumber.isValid()) return { error: 'Please enter a valid contact number.' }

  if (!rating || rating < 1 || rating > 5) return { error: 'Rating is required.' }

  if (!review) return { error: 'Review is required.' }
  if (review.length > REVIEW_MAX_LENGTH) {
    return { error: `Review must be ${REVIEW_MAX_LENGTH} characters or less.` }
  }

  return {
    data: {
      buyersFullName,
      linkedIn,
      companyName,
      position,
      country,
      countryDialCode,
      phone,
      rating,
      review,
    },
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReviewRequestBody
    const validation = validateReviewPayload(body)

    if ('error' in validation) {
      return Response.json(
        {
          success: false,
          message: validation.error,
        },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    const submission = await payload.create({
      collection: 'review-form-submissions',
      data: validation.data,
      overrideAccess: true,
    })

    const {
      buyersFullName,
      linkedIn,
      companyName,
      position,
      country,
      countryDialCode,
      phone,
      rating,
      review,
    } = validation.data

    const fullPhone = [countryDialCode, phone].filter(Boolean).join(' ')

    const submittedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Dhaka',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const to = getValidRecipients(body?.recipients)

    const subject = `New Rating Form Submission — ${buyersFullName}`

    const emailLogoBuffer = await getEmailLogoBuffer()
    const fallbackLogoUrl = getPublicAssetUrl(EMAIL_LOGO_PUBLIC_PATH)
    const logoSrc = emailLogoBuffer ? `cid:${EMAIL_LOGO_CONTENT_ID}` : fallbackLogoUrl

    const text = [
      'New rating/review form submission from XynoLab website.',
      '',
      `Buyer Full Name: ${buyersFullName}`,
      `LinkedIn: ${linkedIn || '-'}`,
      `Company Name: ${companyName}`,
      `Position: ${position}`,
      `Country: ${country}`,
      `Contact No.: ${fullPhone || '-'}`,
      `Rating: ${rating}/5`,
      '',
      'Review:',
      review,
      '',
      `Submitted At: ${submittedAt}`,
      '',
      '— Sent from XynoLab Rating Form',
    ].join('\n')

    const html = `
  <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#070725;">
    <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
      <div style="background:#ffffff;border:1px solid #d8edf0;padding:28px;">
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="width:100%;border-collapse:collapse;border-bottom:3px solid #22c7d5;margin-bottom:22px;"
        >
          <tr>
            <td style="vertical-align:middle;padding:0 16px 14px 0;">
              <h1 style="margin:0;padding:0;font-size:24px;line-height:1.3;color:#070725;font-weight:700;">
                New Rating Form Submission
              </h1>
              <p style="margin:8px 0 0 0;padding:0;font-size:14px;line-height:1.5;color:#4b4b63;">
                Submitted from XynoLab website rating form
              </p>
            </td>

            <td style="vertical-align:middle;text-align:right;width:150px;padding:0 0 14px 0;">
              <img
                src="${escapeHtml(logoSrc)}"
                alt="XynoLab Logo"
                width="130"
                style="display:inline-block;width:130px;max-width:130px;height:auto;border:0;outline:none;text-decoration:none;"
              />
            </td>
          </tr>
        </table>

        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="width:100%;border-collapse:collapse;font-size:15px;color:#070725;"
        >
          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Buyer Full Name</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(buyersFullName)}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">LinkedIn</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(linkedIn || '-')}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Company Name</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(companyName)}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Position</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(position)}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Country</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(country)}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Contact No.</td>
            <td style="padding:10px 0;vertical-align:top;">
              <a href="tel:${escapeHtml(fullPhone)}" style="color:#070725;text-decoration:none;">
                ${escapeHtml(fullPhone || '-')}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Rating</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(rating)}/5</td>
          </tr>
        </table>

        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="width:100%;border-collapse:collapse;margin-top:22px;border-top:1px solid #e2e8f0;"
        >
          <tr>
            <td style="padding-top:20px;padding-bottom:10px;">
              <h2 style="margin:0;padding:0;font-size:18px;line-height:1.4;color:#070725;font-weight:700;">
                Review
              </h2>
            </td>
          </tr>

          <tr>
            <td
              style="
                background:#f8fbfc;
                border:1px solid #e2f3f5;
                padding:16px;
                font-size:15px;
                line-height:1.6;
                color:#202040;
                mso-line-height-rule:exactly;
              "
            >
              ${escapeHtml(review).replace(/\n/g, '<br />')}
            </td>
          </tr>
        </table>

        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="width:100%;border-collapse:collapse;margin-top:22px;"
        >
          <tr>
            <td style="padding:0;font-size:13px;line-height:1.5;color:#6b7280;">
              Submitted At: ${escapeHtml(submittedAt)}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0 0 0;font-size:13px;line-height:1.5;color:#6b7280;">
              — Sent from XynoLab Rating Form
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
`

    let emailSent = false
    let emailMessage = 'Your review was submitted, but the admin email could not be sent right now.'

    try {
      if (!to.length) {
        throw new Error('No valid recipient emails were provided from Rating block.')
      }

      await payload.sendEmail({
        to,
        subject,
        text,
        html,
        from: `"${process.env.SMTP_MAIL_FROM_NAME || 'XynoLab'}" <${process.env.SMTP_MAIL_FROM}>`,
        replyTo: process.env.SMTP_MAIL_FROM,
        envelope: {
          from: process.env.SMTP_MAIL_FROM as string,
          to,
        },
        attachments: emailLogoBuffer
          ? [
              {
                filename: getEmailLogoFileName(),
                content: emailLogoBuffer,
                contentType: getEmailLogoContentType(),
                cid: EMAIL_LOGO_CONTENT_ID,
              },
            ]
          : undefined,
      } as any)

      emailSent = true
      emailMessage = 'Your review has also reached our admin team via email.'
    } catch (emailError) {
      console.error('Review form email send error:', emailError)
    }

    return Response.json(
      {
        success: true,
        message: 'Review submitted successfully.',
        emailSent,
        emailMessage,
        submissionId: submission.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Review form submission error:', error)

    return Response.json(
      {
        success: false,
        message: 'Something went wrong while submitting your review.',
      },
      { status: 500 },
    )
  }
}
