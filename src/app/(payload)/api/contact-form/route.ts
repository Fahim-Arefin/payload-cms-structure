// import { CONTACT_FORM_SUBMISSIONS_SLUG } from '@/lib/constants'
// import config from '@payload-config'
// import { NextResponse } from 'next/server'
// import { getPayload } from 'payload'

// const NAME_MAX = 120
// const PHONE_MAX = 40
// const EMAIL_MAX = 254
// const CITY_MAX = 120
// const DESCRIPTION_MAX_CHARS = 1000
// const DESCRIPTION_MAX_WORDS = 160
// const SOLUTION_MAX = 120
// const SOLUTIONS_MAX = 30
// const CURRENCY_SIGN_MAX = 10
// const CURRENCY_CODE_MAX = 10
// const BUDGET_MAX_DIGITS = 15
// const SELECTED_BUDGET_LABEL_MAX = 120

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// const formatNumber = (value: number) => {
//   return new Intl.NumberFormat('en-US').format(value)
// }

// const countWords = (value: string) => {
//   const words = value.trim().match(/\S+/g)

//   return words ? words.length : 0
// }

// const toOptionalNumber = (value: unknown) => {
//   if (value === '' || value === null || value === undefined) return null

//   const numberValue = Number(value)

//   return Number.isFinite(numberValue) ? numberValue : null
// }

// const isValidPhoneNumber = (value: string) => {
//   const trimmedValue = value.trim()

//   if (!trimmedValue) return false

//   const plusCount = trimmedValue.match(/\+/g)?.length ?? 0

//   if (plusCount > 1) return false
//   if (trimmedValue.includes('+') && !trimmedValue.startsWith('+')) return false
//   if (!/^\+?[0-9\s()-]+$/.test(trimmedValue)) return false

//   const digitsOnly = trimmedValue.replace(/\D/g, '')

//   return digitsOnly.length >= 7 && digitsOnly.length <= 15
// }

// const isTooLong = (value: string, maxLength: number) => {
//   return value.length > maxLength
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()

//     const name = String(body?.name ?? '').trim()
//     const phone = String(body?.phone ?? '').trim()
//     const email = String(body?.email ?? '').trim()
//     const city = String(body?.city ?? '').trim()
//     const description = String(body?.description ?? '').trim()

//     const selectedCurrencySign = String(body?.selectedCurrencySign ?? '').trim()
//     const selectedCurrencyCode = String(body?.selectedCurrencyCode ?? '').trim()

//     const selectedSolutionsInput = Array.isArray(body?.selectedSolutions)
//       ? body.selectedSolutions
//       : []

//     const selectedSolutions = selectedSolutionsInput
//       .slice(0, SOLUTIONS_MAX)
//       .map((solution: any) => {
//         if (typeof solution === 'string') return solution.trim()

//         return String(solution?.text ?? '').trim()
//       })
//       .filter(Boolean)

//     const budgetValue = toOptionalNumber(body?.budget)
//     const budget = budgetValue !== null && budgetValue >= 0 ? budgetValue : null

//     if (!name) {
//       return NextResponse.json({ message: 'Name is required.' }, { status: 400 })
//     }

//     if (isTooLong(name, NAME_MAX)) {
//       return NextResponse.json(
//         { message: `Name must be ${NAME_MAX} characters or less.` },
//         { status: 400 },
//       )
//     }

//     if (!phone) {
//       return NextResponse.json({ message: 'Phone number is required.' }, { status: 400 })
//     }

//     if (isTooLong(phone, PHONE_MAX) || !isValidPhoneNumber(phone)) {
//       return NextResponse.json({ message: 'Please enter a valid phone number.' }, { status: 400 })
//     }

//     if (!email || !emailRegex.test(email)) {
//       return NextResponse.json({ message: 'Valid email address is required.' }, { status: 400 })
//     }

//     if (isTooLong(email, EMAIL_MAX)) {
//       return NextResponse.json(
//         { message: `Email must be ${EMAIL_MAX} characters or less.` },
//         { status: 400 },
//       )
//     }

//     if (!city) {
//       return NextResponse.json({ message: 'City is required.' }, { status: 400 })
//     }

//     if (isTooLong(city, CITY_MAX)) {
//       return NextResponse.json(
//         { message: `City must be ${CITY_MAX} characters or less.` },
//         { status: 400 },
//       )
//     }

//     if (isTooLong(description, DESCRIPTION_MAX_CHARS)) {
//       return NextResponse.json(
//         { message: `Description must be ${DESCRIPTION_MAX_CHARS} characters or less.` },
//         { status: 400 },
//       )
//     }

//     if (countWords(description) > DESCRIPTION_MAX_WORDS) {
//       return NextResponse.json(
//         { message: `Description must be ${DESCRIPTION_MAX_WORDS} words or less.` },
//         { status: 400 },
//       )
//     }

//     if (selectedSolutions.some((solution: any) => isTooLong(solution, SOLUTION_MAX))) {
//       return NextResponse.json(
//         { message: `Each selected service must be ${SOLUTION_MAX} characters or less.` },
//         { status: 400 },
//       )
//     }

//     if (budget !== null && String(Math.trunc(budget)).length > BUDGET_MAX_DIGITS) {
//       return NextResponse.json({ message: 'Budget value is too large.' }, { status: 400 })
//     }

//     if (selectedCurrencySign && isTooLong(selectedCurrencySign, CURRENCY_SIGN_MAX)) {
//       return NextResponse.json({ message: 'Currency sign is too long.' }, { status: 400 })
//     }

//     if (selectedCurrencyCode && isTooLong(selectedCurrencyCode, CURRENCY_CODE_MAX)) {
//       return NextResponse.json({ message: 'Currency code is too long.' }, { status: 400 })
//     }

//     const selectedBudgetLabel =
//       budget !== null
//         ? String(body?.selectedBudgetLabel ?? '').trim() ||
//           `${formatNumber(budget)}${selectedCurrencyCode ? ` ${selectedCurrencyCode}` : ''}`
//         : ''

//     if (selectedBudgetLabel && isTooLong(selectedBudgetLabel, SELECTED_BUDGET_LABEL_MAX)) {
//       return NextResponse.json({ message: 'Selected budget label is too long.' }, { status: 400 })
//     }

//     const payload = await getPayload({ config })

//     const submissionData: any = {
//       name,
//       phone,
//       email,
//       city,
//       description,
//       selectedSolutions: selectedSolutions.map((solution: any) => ({
//         text: solution,
//       })),
//       status: 'new',
//     }

//     if (budget !== null) {
//       submissionData.selectedCurrencySign = selectedCurrencySign
//       submissionData.selectedCurrencyCode = selectedCurrencyCode
//       submissionData.budget = budget
//       submissionData.selectedBudgetLabel = selectedBudgetLabel
//     }

//     await payload.create({
//       collection: CONTACT_FORM_SUBMISSIONS_SLUG,
//       data: submissionData,
//       overrideAccess: true,
//     })

//     return NextResponse.json(
//       {
//         message: 'Your message has been submitted successfully.',
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.error('Contact form submit error:', error)

//     return NextResponse.json(
//       {
//         message: 'Something went wrong. Please try again.',
//       },
//       { status: 500 },
//     )
//   }
// }

import { CONTACT_FORM_SUBMISSIONS_SLUG, GLOBAL_CONTACT_US_SLUG_AND_TAG } from '@/lib/constants'
import config from '@payload-config'
import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'
import { getPayload } from 'payload'

export const runtime = 'nodejs'

const NAME_MAX = 120
const PHONE_MAX = 40
const EMAIL_MAX = 254
const CITY_MAX = 120
const DESCRIPTION_MAX_CHARS = 1000
const DESCRIPTION_MAX_WORDS = 160
const SOLUTION_MAX = 120
const SOLUTIONS_MAX = 30
const CURRENCY_SIGN_MAX = 10
const CURRENCY_CODE_MAX = 10
const BUDGET_MAX_DIGITS = 15
const SELECTED_BUDGET_LABEL_MAX = 120

// const EMAIL_LOGO_PUBLIC_PATH = '/assets/images/DPXynolab.png'
const EMAIL_LOGO_PUBLIC_PATH = '/assets/images/emailLogo.png'
const EMAIL_LOGO_CONTENT_ID = 'xynolab-email-logo'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type RecipientEmails = {
  email1?: string | null
  email2?: string | null
  email3?: string | null
  email4?: string | null
  email5?: string | null
}

type GlobalContactUsWithRecipients = {
  recipientEmails?: RecipientEmails | null
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value)
}

const countWords = (value: string) => {
  const words = value.trim().match(/\S+/g)

  return words ? words.length : 0
}

const toOptionalNumber = (value: unknown) => {
  if (value === '' || value === null || value === undefined) return null

  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : null
}

const isValidPhoneNumber = (value: string) => {
  const trimmedValue = value.trim()

  if (!trimmedValue) return false

  const plusCount = trimmedValue.match(/\+/g)?.length ?? 0

  if (plusCount > 1) return false
  if (trimmedValue.includes('+') && !trimmedValue.startsWith('+')) return false
  if (!/^\+?[0-9\s()-]+$/.test(trimmedValue)) return false

  const digitsOnly = trimmedValue.replace(/\D/g, '')

  return digitsOnly.length >= 7 && digitsOnly.length <= 15
}

const isTooLong = (value: string, maxLength: number) => {
  return value.length > maxLength
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

const getRecipientsFromGlobal = (globalContactData: unknown) => {
  const recipientEmails = (globalContactData as GlobalContactUsWithRecipients)?.recipientEmails

  return getValidRecipients([
    recipientEmails?.email1,
    recipientEmails?.email2,
    recipientEmails?.email3,
    recipientEmails?.email4,
    recipientEmails?.email5,
  ])
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
      `[contact-form] Failed to read inline email logo: ${EMAIL_LOGO_PUBLIC_PATH}`,
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

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = String(body?.name ?? '').trim()
    const phone = String(body?.phone ?? '').trim()
    const email = String(body?.email ?? '').trim()
    const city = String(body?.city ?? '').trim()
    const description = String(body?.description ?? '').trim()

    const selectedCurrencySign = String(body?.selectedCurrencySign ?? '').trim()
    const selectedCurrencyCode = String(body?.selectedCurrencyCode ?? '').trim()

    const selectedSolutionsInput = Array.isArray(body?.selectedSolutions)
      ? body.selectedSolutions
      : []

    const selectedSolutions = selectedSolutionsInput
      .slice(0, SOLUTIONS_MAX)
      .map((solution: any) => {
        if (typeof solution === 'string') return solution.trim()

        return String(solution?.text ?? '').trim()
      })
      .filter(Boolean)

    const budgetValue = toOptionalNumber(body?.budget)
    const budget = budgetValue !== null && budgetValue >= 0 ? budgetValue : null

    if (!name) {
      return NextResponse.json({ message: 'Name is required.' }, { status: 400 })
    }

    if (isTooLong(name, NAME_MAX)) {
      return NextResponse.json(
        { message: `Name must be ${NAME_MAX} characters or less.` },
        { status: 400 },
      )
    }

    if (!phone) {
      return NextResponse.json({ message: 'Phone number is required.' }, { status: 400 })
    }

    if (isTooLong(phone, PHONE_MAX) || !isValidPhoneNumber(phone)) {
      return NextResponse.json({ message: 'Please enter a valid phone number.' }, { status: 400 })
    }

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ message: 'Valid email address is required.' }, { status: 400 })
    }

    if (isTooLong(email, EMAIL_MAX)) {
      return NextResponse.json(
        { message: `Email must be ${EMAIL_MAX} characters or less.` },
        { status: 400 },
      )
    }

    if (!city) {
      return NextResponse.json({ message: 'City is required.' }, { status: 400 })
    }

    if (isTooLong(city, CITY_MAX)) {
      return NextResponse.json(
        { message: `City must be ${CITY_MAX} characters or less.` },
        { status: 400 },
      )
    }

    if (isTooLong(description, DESCRIPTION_MAX_CHARS)) {
      return NextResponse.json(
        { message: `Description must be ${DESCRIPTION_MAX_CHARS} characters or less.` },
        { status: 400 },
      )
    }

    if (countWords(description) > DESCRIPTION_MAX_WORDS) {
      return NextResponse.json(
        { message: `Description must be ${DESCRIPTION_MAX_WORDS} words or less.` },
        { status: 400 },
      )
    }

    if (selectedSolutions.some((solution: any) => isTooLong(solution, SOLUTION_MAX))) {
      return NextResponse.json(
        { message: `Each selected service must be ${SOLUTION_MAX} characters or less.` },
        { status: 400 },
      )
    }

    if (budget !== null && String(Math.trunc(budget)).length > BUDGET_MAX_DIGITS) {
      return NextResponse.json({ message: 'Budget value is too large.' }, { status: 400 })
    }

    if (selectedCurrencySign && isTooLong(selectedCurrencySign, CURRENCY_SIGN_MAX)) {
      return NextResponse.json({ message: 'Currency sign is too long.' }, { status: 400 })
    }

    if (selectedCurrencyCode && isTooLong(selectedCurrencyCode, CURRENCY_CODE_MAX)) {
      return NextResponse.json({ message: 'Currency code is too long.' }, { status: 400 })
    }

    const selectedBudgetLabel =
      budget !== null
        ? String(body?.selectedBudgetLabel ?? '').trim() ||
          `${formatNumber(budget)}${selectedCurrencyCode ? ` ${selectedCurrencyCode}` : ''}`
        : ''

    if (selectedBudgetLabel && isTooLong(selectedBudgetLabel, SELECTED_BUDGET_LABEL_MAX)) {
      return NextResponse.json({ message: 'Selected budget label is too long.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const submissionData: any = {
      name,
      phone,
      email,
      city,
      description,
      selectedSolutions: selectedSolutions.map((solution: any) => ({
        text: solution,
      })),
      status: 'new',
    }

    if (budget !== null) {
      submissionData.selectedCurrencySign = selectedCurrencySign
      submissionData.selectedCurrencyCode = selectedCurrencyCode
      submissionData.budget = budget
      submissionData.selectedBudgetLabel = selectedBudgetLabel
    }

    await payload.create({
      collection: CONTACT_FORM_SUBMISSIONS_SLUG,
      data: submissionData,
      overrideAccess: true,
    })

    const submittedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Dhaka',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const servicesLabel = selectedSolutions.length ? selectedSolutions.join(', ') : '-'
    const budgetLabel = selectedBudgetLabel || '-'
    const cleanDescription = description || '-'

    const subject = `New Contact Form Submission — ${name}`

    const emailLogoBuffer = await getEmailLogoBuffer()
    const fallbackLogoUrl = getPublicAssetUrl(EMAIL_LOGO_PUBLIC_PATH)
    const logoSrc = emailLogoBuffer ? `cid:${EMAIL_LOGO_CONTENT_ID}` : fallbackLogoUrl

    const text = [
      'New contact form submission from XynoLab website.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City: ${city}`,
      `Selected Services: ${servicesLabel}`,
      `Budget: ${budgetLabel}`,
      '',
      'Message:',
      cleanDescription,
      '',
      `Submitted At: ${submittedAt}`,
      '',
      '— Sent from XynoLab Contact Us Form',
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
                New Contact Form Submission
              </h1>
              <p style="margin:8px 0 0 0;padding:0;font-size:14px;line-height:1.5;color:#4b4b63;">
                Submitted from XynoLab website contact form
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
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Name</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(name)}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Email</td>
            <td style="padding:10px 0;vertical-align:top;">
              <a href="mailto:${escapeHtml(email)}" style="color:#070725;text-decoration:none;">
                ${escapeHtml(email)}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Phone Number</td>
            <td style="padding:10px 0;vertical-align:top;">
              <a href="tel:${escapeHtml(phone)}" style="color:#070725;text-decoration:none;">
                ${escapeHtml(phone)}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">City</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(city)}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Selected Services</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(servicesLabel)}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;width:180px;font-weight:700;vertical-align:top;">Budget</td>
            <td style="padding:10px 0;vertical-align:top;">${escapeHtml(budgetLabel)}</td>
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
                Message
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
              ${escapeHtml(cleanDescription).replace(/\n/g, '<br />')}
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
              — Sent from XynoLab Contact Us Form
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
`

    let emailSent = false
    let emailMessage = 'Your form was submitted, but the admin email could not be sent right now.'

    try {
      const globalContactData = await payload.findGlobal({
        slug: GLOBAL_CONTACT_US_SLUG_AND_TAG,
        depth: 0,
        overrideAccess: true,
      })

      const to = getRecipientsFromGlobal(globalContactData)

      if (!to.length) {
        throw new Error('No valid recipient emails found in Global Contact Us.')
      }

      await payload.sendEmail({
        to,
        subject,
        text,
        html,
        from: `"${process.env.SMTP_MAIL_FROM_NAME || 'XynoLab'}" <${process.env.SMTP_MAIL_FROM}>`,
        replyTo: email,
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
      emailMessage = 'Your message has also reached our admin team via email.'
    } catch (emailError) {
      console.error('Contact form email send error:', emailError)
    }

    return NextResponse.json(
      {
        message: 'Your message has been submitted successfully.',
        emailSent,
        emailMessage,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Contact form submit error:', error)

    return NextResponse.json(
      {
        message: 'Something went wrong. Please try again.',
      },
      { status: 500 },
    )
  }
}
