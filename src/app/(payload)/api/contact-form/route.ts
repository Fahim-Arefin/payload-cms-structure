// import { CONTACT_FORM_SUBMISSIONS_SLUG } from '@/lib/constants'
// import config from '@payload-config'
// import { NextResponse } from 'next/server'
// import { getPayload } from 'payload'

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// const formatNumber = (value: number) => {
//   return new Intl.NumberFormat('en-US').format(value)
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()

//     const name = String(body?.name ?? '').trim()
//     const phone = String(body?.phone ?? '').trim()
//     const email = String(body?.email ?? '').trim()

//     const selectedCurrencySign = String(body?.selectedCurrencySign ?? '').trim()
//     const selectedCurrencyCode = String(body?.selectedCurrencyCode ?? '').trim()

//     const budgetMin = Number(body?.budgetMin)
//     const budgetMax = Number(body?.budgetMax)

//     const selectedSolutions = Array.isArray(body?.selectedSolutions) ? body.selectedSolutions : []

//     if (!name) {
//       return NextResponse.json({ message: 'Name is required.' }, { status: 400 })
//     }

//     if (!phone) {
//       return NextResponse.json({ message: 'Phone number is required.' }, { status: 400 })
//     }

//     if (!email || !emailRegex.test(email)) {
//       return NextResponse.json({ message: 'Valid email address is required.' }, { status: 400 })
//     }

//     if (!selectedSolutions.length) {
//       return NextResponse.json({ message: 'Please select at least one solution.' }, { status: 400 })
//     }

//     if (!selectedCurrencyCode || !selectedCurrencySign) {
//       return NextResponse.json({ message: 'Please select a currency.' }, { status: 400 })
//     }

//     if (!Number.isFinite(budgetMin) || budgetMin < 0) {
//       return NextResponse.json({ message: 'Please enter a valid minimum budget.' }, { status: 400 })
//     }

//     if (!Number.isFinite(budgetMax) || budgetMax <= 0) {
//       return NextResponse.json({ message: 'Please enter a valid maximum budget.' }, { status: 400 })
//     }

//     if (budgetMin > budgetMax) {
//       return NextResponse.json(
//         { message: 'Minimum budget cannot be greater than maximum budget.' },
//         { status: 400 },
//       )
//     }

//     const selectedBudgetLabel = `${formatNumber(budgetMin)} - ${formatNumber(
//       budgetMax,
//     )} ${selectedCurrencyCode}`

//     const payload = await getPayload({ config })

//     await payload.create({
//       collection: CONTACT_FORM_SUBMISSIONS_SLUG,
//       data: {
//         name,
//         phone,
//         email,
//         selectedSolutions: selectedSolutions.map((solution: any) => ({
//           text: String(solution).trim(),
//         })),
//         selectedCurrencySign,
//         selectedCurrencyCode,
//         budgetMin,
//         budgetMax,
//         selectedBudgetLabel,
//         status: 'new',
//       },
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

import { CONTACT_FORM_SUBMISSIONS_SLUG } from '@/lib/constants'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    return NextResponse.json(
      {
        message: 'Your message has been submitted successfully.',
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
