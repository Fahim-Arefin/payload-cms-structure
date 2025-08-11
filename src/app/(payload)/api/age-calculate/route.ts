import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateofbirth = searchParams.get('dateofbirth')

    if (!dateofbirth) {
      return NextResponse.json(
        { error: 'Date of birth is required' },
        { status: 400 }
      )
    }

    // Call the external API
    const response = await fetch(
      `https://api.shantalife.com/age-calculate?dateofbirth=${encodeURIComponent(dateofbirth)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`External API returned ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Age calculation API error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate age' },
      { status: 500 }
    )
  }
}