import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

type ReviewRequestBody = {
  name: string
  email: string
  companyName?: string
  position?: string
  country: string
  countryDialCode?: string
  phone: string
  query: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReviewRequestBody

    const { name, email, companyName, position, country, countryDialCode, phone, query } = body

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

    if (!query?.trim()) {
      return NextResponse.json({ message: 'Query is required.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const doc = await payload.create({
      collection: 'query',
      data: {
        name: name.trim(),
        email: email.trim(),
        companyName: companyName?.trim() || '',
        position: position?.trim() || '',
        country: country.trim(),
        countryDialCode: countryDialCode?.trim() || '',
        phone: phone.trim(),
        query: query.trim(),
        status: 'new',
      },
    })

    return NextResponse.json(
      {
        message: 'Query submitted successfully.',
        doc,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Query submit error:', error)

    return NextResponse.json(
      { message: 'Something went wrong while submitting the form.' },
      { status: 500 },
    )
  }
}
