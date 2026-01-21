import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs' // important for server-side fetch

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const agentCode = searchParams.get('agent_code')

    if (!agentCode) {
      return NextResponse.json({ message: 'agent_code is required' }, { status: 400 })
    }

    const res = await fetch(
      `https://api.shantalife.com/producer/verify?agent_code=${encodeURIComponent(agentCode)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
      },
    )

    const data = await res.json().catch(() => ({}))

    // Pass-through response
    return NextResponse.json(data, {
      status: res.ok ? 200 : res.status,
    })
  } catch (err: any) {
    console.error('[producer-verify] ERROR:', err)

    return NextResponse.json({ message: 'Failed to verify agent code' }, { status: 500 })
  }
}
