import config from '@payload-config'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
import { getPayload } from 'payload'

export const runtime = 'nodejs'

const REVIEW_MAX_LENGTH = 500

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function validateReviewPayload(body: any) {
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
    const body = await req.json()
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

    return Response.json({
      success: true,
      message: 'Review submitted successfully.',
      submissionId: submission.id,
    })
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
