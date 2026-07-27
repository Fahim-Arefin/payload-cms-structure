import { CONTACT_FORM_SUBMISSIONS_SLUG } from '@/lib/constants'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = String(body?.name ?? '').trim()
    const phone = String(body?.phone ?? '').trim()
    const email = String(body?.email ?? '').trim()

    const selectedCurrencySign = String(body?.selectedCurrencySign ?? '').trim()
    const selectedCurrencyCode = String(body?.selectedCurrencyCode ?? '').trim()

    const budgetMin = Number(body?.budgetMin)
    const budgetMax = Number(body?.budgetMax)

    const selectedSolutions = Array.isArray(body?.selectedSolutions) ? body.selectedSolutions : []

    if (!name) {
      return NextResponse.json({ message: 'Name is required.' }, { status: 400 })
    }

    if (!phone) {
      return NextResponse.json({ message: 'Phone number is required.' }, { status: 400 })
    }

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ message: 'Valid email address is required.' }, { status: 400 })
    }

    if (!selectedSolutions.length) {
      return NextResponse.json({ message: 'Please select at least one solution.' }, { status: 400 })
    }

    if (!selectedCurrencyCode || !selectedCurrencySign) {
      return NextResponse.json({ message: 'Please select a currency.' }, { status: 400 })
    }

    if (!Number.isFinite(budgetMin) || budgetMin < 0) {
      return NextResponse.json({ message: 'Please enter a valid minimum budget.' }, { status: 400 })
    }

    if (!Number.isFinite(budgetMax) || budgetMax <= 0) {
      return NextResponse.json({ message: 'Please enter a valid maximum budget.' }, { status: 400 })
    }

    if (budgetMin > budgetMax) {
      return NextResponse.json(
        { message: 'Minimum budget cannot be greater than maximum budget.' },
        { status: 400 },
      )
    }

    const selectedBudgetLabel = `${formatNumber(budgetMin)} - ${formatNumber(
      budgetMax,
    )} ${selectedCurrencyCode}`

    const payload = await getPayload({ config })

    await payload.create({
      collection: CONTACT_FORM_SUBMISSIONS_SLUG,
      data: {
        name,
        phone,
        email,
        selectedSolutions: selectedSolutions.map((solution: any) => ({
          text: String(solution).trim(),
        })),
        selectedCurrencySign,
        selectedCurrencyCode,
        budgetMin,
        budgetMax,
        selectedBudgetLabel,
        status: 'new',
      },
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
