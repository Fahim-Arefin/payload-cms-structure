import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'PlanCode',
      'Age', 
      'SumAssured',
      'Term',
      'PaymentMode',
      'Gender'
    ]
    
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Make the API call to Shanta Life
    const response = await fetch('https://api.shantalife.com/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        PlanCode: body.PlanCode,
        Age: body.Age,
        SumAssured: body.SumAssured,
        Term: body.Term,
        PaymentMode: body.PaymentMode,
        AccidentRider: 1,
        CriticalRider: 'CP-S',
        Gender: body.Gender
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', response.status, errorText)
      
      return NextResponse.json(
        { 
          error: 'Failed to calculate premium',
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
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })

  } catch (error) {
    console.error('Proxy API Error:', error)
    
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}