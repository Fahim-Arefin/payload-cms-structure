// app/api/media/purge-temporary/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST() {
  try {
    console.log('inside route.ts')
    const payload = await getPayload({ config: configPromise })

    // Find all temporary:true media (global sweep)
    const found = await payload.find({
      collection: 'media',
      where: { temporary: { equals: true } },
      limit: 1000, // adjust if you expect more; loop w/ next page if needed
      depth: 0,
      overrideAccess: true,
    })

    let deleted = 0
    for (const m of found.docs) {
      try {
        await payload.delete({
          collection: 'media',
          id: m.id,
          overrideAccess: true,
        })
        deleted++
      } catch {
        // ignore individual failures
      }
    }

    return NextResponse.json({ ok: true, scanned: found.totalDocs, deleted })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'error' }, { status: 500 })
  }
}
