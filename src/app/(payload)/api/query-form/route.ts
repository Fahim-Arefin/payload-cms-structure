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
//   query: string
// }

// export async function POST(req: Request) {
//   try {
//     const body = (await req.json()) as ReviewRequestBody

//     const { name, email, companyName, position, country, countryDialCode, phone, query } = body

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

//     if (!query?.trim()) {
//       return NextResponse.json({ message: 'Query is required.' }, { status: 400 })
//     }

//     const payload = await getPayload({ config })

//     const doc = await payload.create({
//       collection: 'query',
//       data: {
//         name: name.trim(),
//         email: email.trim(),
//         companyName: companyName?.trim() || '',
//         position: position?.trim() || '',
//         country: country.trim(),
//         countryDialCode: countryDialCode?.trim() || '',
//         phone: phone.trim(),
//         query: query.trim(),
//         status: 'new',
//       },
//     })

//     return NextResponse.json(
//       {
//         message: 'Query submitted successfully.',
//         doc,
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.error('Query submit error:', error)

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
import path from 'path'
import { readFile } from 'fs/promises'

export const runtime = 'nodejs'

type QueryRequestBody = {
  name: string
  email: string
  companyName?: string
  position?: string
  country: string
  countryDialCode?: string
  phone: string
  query: string
  recipients?: string[] | string
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

const getPublicAssetUrl = (assetPath: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.API_URL || ''

  return `${String(baseUrl).replace(/\/$/, '')}${assetPath}`
}

const getLogoBase64 = async () => {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'logo.png')
    const logoBuffer = await readFile(logoPath)

    return logoBuffer.toString('base64')
  } catch (error) {
    console.error('[query-form] Failed to read inline logo:', error)
    return undefined
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as QueryRequestBody

    const {
      name,
      email,
      companyName,
      position,
      country,
      countryDialCode,
      phone,
      query,
      recipients = [],
    } = body

    if (!name?.trim()) {
      return NextResponse.json({ message: 'Name is required.' }, { status: 400 })
    }

    if (!email?.trim()) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 })
    }

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ message: 'Please enter a valid email.' }, { status: 400 })
    }

    if (!country?.trim()) {
      return NextResponse.json({ message: 'Country is required.' }, { status: 400 })
    }

    if (!phone?.trim()) {
      return NextResponse.json({ message: 'Phone is required.' }, { status: 400 })
    }

    if (!query?.trim()) {
      return NextResponse.json({ message: 'Query is required.' }, { status: 400 })
    }

    const to = getValidRecipients(recipients)

    if (!to.length) {
      return NextResponse.json({ message: 'No valid recipients.' }, { status: 400 })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanCompanyName = companyName?.trim() || ''
    const cleanPosition = position?.trim() || ''
    const cleanCountry = country.trim()
    const cleanCountryDialCode = countryDialCode?.trim() || ''
    const cleanPhone = phone.trim()
    const cleanQuery = query.trim()
    const fullPhone = [cleanCountryDialCode, cleanPhone].filter(Boolean).join(' ')

    const payload = await getPayload({ config })

    const doc = await payload.create({
      collection: 'query',
      data: {
        name: cleanName,
        email: cleanEmail,
        companyName: cleanCompanyName,
        position: cleanPosition,
        country: cleanCountry,
        countryDialCode: cleanCountryDialCode,
        phone: cleanPhone,
        query: cleanQuery,
        status: 'new',
      },
    })

    const submittedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Dhaka',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const subject = `New Product Query — ${cleanName}`

    const logoBase64 = await getLogoBase64()
    const fallbackLogoUrl = getPublicAssetUrl('/assets/images/logo.png')
    const logoSrc = logoBase64 ? 'cid:sagar-logo' : fallbackLogoUrl

    const text = [
      'New product query submitted from Sagar Rope website.',
      '',
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Company Name: ${cleanCompanyName || '-'}`,
      `Position: ${cleanPosition || '-'}`,
      `Country: ${cleanCountry}`,
      `Contact No.: ${fullPhone || '-'}`,
      '',
      'Query:',
      cleanQuery,
      '',
      `Submitted At: ${submittedAt}`,
      '',
      '— Sent from Sagar Rope Query Form',
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
                    New Product Query
                  </h1>
                  <p style="margin:8px 0 0 0;padding:0;font-size:14px;line-height:1.5;color:#4b4b63;">
                    Submitted from Sagar Rope website query form
                  </p>
                </td>

                <td style="vertical-align:middle;text-align:right;width:150px;padding:0 0 14px 0;">
                  <img
                    src="${escapeHtml(logoSrc)}"
                    alt="Sagar Rope Logo"
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
                <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Name</td>
                <td style="padding:10px 0;vertical-align:top;">${escapeHtml(cleanName)}</td>
              </tr>

              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Email</td>
                <td style="padding:10px 0;vertical-align:top;">
                  <a href="mailto:${escapeHtml(cleanEmail)}" style="color:#070725;text-decoration:none;">
                    ${escapeHtml(cleanEmail)}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Company Name</td>
                <td style="padding:10px 0;vertical-align:top;">${escapeHtml(cleanCompanyName || '-')}</td>
              </tr>

              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Position</td>
                <td style="padding:10px 0;vertical-align:top;">${escapeHtml(cleanPosition || '-')}</td>
              </tr>

              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Country</td>
                <td style="padding:10px 0;vertical-align:top;">${escapeHtml(cleanCountry)}</td>
              </tr>

              <tr>
                <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Contact No.</td>
                <td style="padding:10px 0;vertical-align:top;">
                  <a href="tel:${escapeHtml(fullPhone)}" style="color:#070725;text-decoration:none;">
                    ${escapeHtml(fullPhone || '-')}
                  </a>
                </td>
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
                    Query
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
                  ${escapeHtml(cleanQuery).replace(/\n/g, '<br />')}
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
                  — Sent from Sagar Rope Query Form
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `

    const replyTo = emailRegex.test(cleanEmail) ? cleanEmail : undefined

    await sendEmailViaMsGraph({
      to,
      subject,
      text,
      html,
      replyTo,
      saveToSentItems: true,
      attachments: logoBase64
        ? [
            {
              filename: 'logo.png',
              contentBase64: logoBase64,
              contentType: 'image/png',
              isInline: true,
              contentId: 'sagar-logo',
            },
          ]
        : undefined,
    })

    return NextResponse.json(
      {
        message: 'Query submitted successfully.',
        doc,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Query submit error:', error)

    return NextResponse.json(
      {
        message: error?.message || 'Something went wrong while submitting the form.',
      },
      { status: 500 },
    )
  }
}
