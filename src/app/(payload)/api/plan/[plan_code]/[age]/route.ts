import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ plan_code: string; age: string }> }
) {
  try {
    const { plan_code, age } = await params
    
    // Validate parameters
    if (!plan_code || !age) {
      return NextResponse.json(
        { error: 'Missing plan_code or age parameter' },
        { status: 400 }
      )
    }

    // Validate that age is a number
    const ageNumber = parseInt(age)
    if (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 65) {
      return NextResponse.json(
        { error: 'Age must be a valid number between 18 and 65' },
        { status: 400 }
      )
    }

    // Validate that plan_code is a number
    const planCodeNumber = parseInt(plan_code)
    if (isNaN(planCodeNumber) || planCodeNumber < 0 || planCodeNumber > 15) {
      return NextResponse.json(
        { error: 'Plan code must be a valid number between 0 and 15' },
        { status: 400 }
      )
    }

    // Make the API call to Shanta Life
    const response = await fetch(`https://api.shantalife.com/plan/${plan_code}/${age}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Plan API Error:', response.status, errorText)
      
      return NextResponse.json(
        { 
          error: 'Failed to fetch plan details',
          details: errorText,
          status: response.status 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Return the data with CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })

  } catch (error) {
    console.error('Plan Proxy API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle preflight OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}