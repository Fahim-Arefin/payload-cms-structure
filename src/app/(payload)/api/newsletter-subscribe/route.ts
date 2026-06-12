import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = String(body?.email || '')
      .trim()
      .toLowerCase()

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is required.',
        },
        { status: 400 },
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please enter a valid email address.',
        },
        { status: 400 },
      )
    }

    const payload = await getPayload({
      config: configPromise,
    })

    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'You are already subscribed.',
        },
        { status: 200 },
      )
    }

    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email,
        status: 'active',
        source: 'website-footer',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Subscribed successfully.',
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Newsletter subscribe error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 },
    )
  }
}
