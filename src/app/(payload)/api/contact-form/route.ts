import { CONTACT_FORM_SUBMISSIONS_SLUG } from '@/lib/constants'
import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = String(body?.name ?? '').trim()
    const phone = String(body?.phone ?? '').trim()
    const email = String(body?.email ?? '').trim()
    const selectedBudget = String(body?.selectedBudget ?? '').trim()
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

    if (!selectedBudget) {
      return NextResponse.json({ message: 'Please select your budget.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: CONTACT_FORM_SUBMISSIONS_SLUG,
      data: {
        name,
        phone,
        email,
        selectedBudget,
        selectedSolutions: selectedSolutions.map((solution: any) => ({
          text: String(solution).trim(),
        })),
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
