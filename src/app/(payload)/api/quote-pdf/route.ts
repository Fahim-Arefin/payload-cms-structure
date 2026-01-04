// src/app/api/quote-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generateQuotePdf } from '@/utils/pdf/generateQuotePdf'
import { mapToIllustrationData } from '@/utils/pdf/mapToIllustrationData'

export const runtime = 'nodejs' // IMPORTANT for fs + pdf-lib reliability

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // minimal validation
    if (!body?.apiResponse || !body?.formData) {
      return NextResponse.json({ error: 'Missing apiResponse/formData' }, { status: 400 })
    }

    const illustrationData = mapToIllustrationData(body)
    const pdfBuffer = await generateQuotePdf(illustrationData)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="quote-illustration.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (e: any) {
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: e?.message ?? 'Unknown' },
      { status: 500 },
    )
  }
}
