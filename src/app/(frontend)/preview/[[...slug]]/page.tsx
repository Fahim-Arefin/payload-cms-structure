// // Draft preview route (dynamic, no caching, shows latest draft or published)
// // working code
// import RenderBlocks from '@/blocks/RenderBlock'
// import { stripButtonLinksToSlug } from '@/lib/utils'
// import type { Page as PayloadPage } from '@/payload-types'
// import config from '@/payload.config'
// import { notFound } from 'next/navigation'
// import { getPayload } from 'payload'

// type PageParams = { slug?: string[] }
// type PageProps = { params: Promise<PageParams> }

// const norm = (s: string) =>
//   decodeURIComponent(s)
//     .replace(/^\/+|\/+$/g, '')
//     .replace(/\/{2,}/g, '/')

// const payloadClient = async () => getPayload({ config: await config })

// export const dynamic = 'force-dynamic'
// export const revalidate = 0

// export default async function PreviewPage(props: PageProps) {
//   const { slug } = await props.params
//   const effective = slug?.length ? slug.join('/') : 'index'
//   const path = norm(effective)

//   const payload = await payloadClient()

//   // 👇 draft: true → latest version (draft if exists, otherwise published)
//   const { docs } = await payload.find({
//     collection: 'pages',
//     limit: 1,
//     depth: 2,
//     draft: true,
//     where: { slug: { equals: path } },
//   })

//   const page = (docs?.[0] as PayloadPage | null) || null
//   if (!page) return notFound()

//   const sanitized = stripButtonLinksToSlug(page)

//   // 👀 Here we intentionally allow _status === 'draft' — this *is* the preview
//   return (
//     <div>
//       <RenderBlocks layout={sanitized.layout as PayloadPage['layout']} params={{}} />
//     </div>
//   )
// }

// =========================================================================
// =========================================================================
// =========================================================================
// =========================================================================

// // broken version
// import RenderBlocks from '@/blocks/RenderBlock'
// import { stripButtonLinksToSlug } from '@/lib/utils'
// import type { Page as PayloadPage } from '@/payload-types'
// import config from '@/payload.config'
// import { notFound } from 'next/navigation'
// import { getPayload } from 'payload'
// import { cookies } from 'next/headers'
// import jwt from 'jsonwebtoken'
// import { roleAtLeast } from '@/lib/rbac'

// type PageParams = { slug?: string[] }
// type PageProps = { params: Promise<PageParams> }

// const norm = (s: string) =>
//   decodeURIComponent(s)
//     .replace(/^\/+|\/+$/g, '')
//     .replace(/\/{2,}/g, '/')

// const payloadClient = async () => getPayload({ config: await config })

// /* ----------------- helpers: auth ----------------- */

// type SimpleCookie = { name: string; value: string }

// /**
//  * Try to find the Payload auth cookie from all cookies.
//  */
// function extractAuthTokenFromCookies(all: SimpleCookie[]): string | null {
//   const authCookie = all.find((c) => {
//     if (!c?.name) return false

//     if (c.name === 'payload-token' || c.name === 'payload_token') return true
//     if (c.name === 'payload-auth' || c.name === 'payload_auth') return true

//     if (c.name.startsWith('payload-token-')) return true
//     if (c.name.startsWith('payload-auth-')) return true

//     return false
//   })

//   return authCookie?.value ?? null
// }

// /**
//  * Decode JWT → get `id` → load full user from Payload.
//  * This gives us the real user object (with `role`) so roleAtLeast() works.
//  */
// async function getUserFromAuthCookie() {
//   // 🔴 FIX HERE: cookies() returns a Promise in your setup → use await
//   const cookieStore = await cookies()
//   const allCookies = cookieStore.getAll()

//   const token = extractAuthTokenFromCookies(
//     allCookies.map((c) => ({ name: c.name, value: c.value })),
//   )

//   if (!token) return null

//   const secret = process.env.PAYLOAD_SECRET
//   if (!secret) {
//     // fail safe if secret is missing
//     return null
//   }

//   console.log('token', token)
//   console.log('secret', secret)

//   let decoded: any
//   try {
//     decoded = jwt.verify(token, secret)
//     console.log('decoded', decoded)
//   } catch {
//     // invalid / expired token
//     return null
//   }

//   const userId = decoded?.id
//   const collection = decoded?.collection

//   if (!userId || collection !== 'users') {
//     return null
//   }

//   const payload = await payloadClient()

//   try {
//     const user = await payload.findByID({
//       collection: 'users',
//       id: userId,
//       depth: 0,
//       overrideAccess: true,
//     })

//     return user as any
//   } catch {
//     return null
//   }
// }

// /* ------------- dynamic (always latest draft) ------------- */

// export const dynamic = 'force-dynamic'
// export const revalidate = 0

// export default async function PreviewPage(props: PageProps) {
//   const { slug } = await props.params
//   const effective = slug?.length ? slug.join('/') : 'index'
//   const path = norm(effective)

//   // 1) 🔐 Get logged-in Payload user from cookie
//   const user = await getUserFromAuthCookie()

//   // optional:
//   // console.log('Preview user:', user)

//   // 2) 🔐 Only allow viewer+ (viewer, editor, admin, super-admin)
//   if (!user || !roleAtLeast(user, 'viewer')) {
//     return notFound()
//   }

//   // 3) ✅ Fetch latest draft (or published if no draft)
//   const payload = await payloadClient()

//   const { docs } = await payload.find({
//     collection: 'pages',
//     limit: 1,
//     depth: 2,
//     draft: true, // always hit versions table first
//     where: { slug: { equals: path } },
//   })

//   const page = (docs?.[0] as PayloadPage | null) || null
//   if (!page) return notFound()

//   const sanitized = stripButtonLinksToSlug(page)

//   return (
//     <div>
//       <RenderBlocks layout={sanitized.layout as PayloadPage['layout']} params={{}} />
//     </div>
//   )
// }

// ===============================================================
// ===============================================================
// ===============================================================
// ===============================================================
// src/app/preview/[[...slug]]/page.tsx
import RenderBlocks from '@/blocks/RenderBlock'
import { stripButtonLinksToSlug } from '@/lib/utils'
import type { Page as PayloadPage } from '@/payload-types'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import { roleAtLeast } from '@/lib/rbac'

type PageParams = { slug?: string[] }
type PageProps = { params: Promise<PageParams> }

const norm = (s: string) =>
  decodeURIComponent(s)
    .replace(/^\/+|\/+$/g, '')
    .replace(/\/{2,}/g, '/')

const payloadClient = async () => getPayload({ config: await config })

/* ----------------- helpers: auth ----------------- */

async function getUserFromAuthCookie() {
  // In your Next 15 setup cookies() is async
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  // Serialize cookies into a single "Cookie" header string
  const cookieHeader = allCookies
    .map((c) => `${encodeURIComponent(c.name)}=${encodeURIComponent(c.value)}`)
    .join('; ')

  if (!cookieHeader) return null

  const base = process.env.API_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Ask Payload who this user is, using the same cookies the browser sent
  const res = await fetch(`${base}/api/users/me?depth=0`, {
    method: 'GET',
    headers: {
      cookie: cookieHeader,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    return null
  }

  const json = await res.json().catch(() => null)
  // Payload's /me endpoint usually returns { user, token } or similar
  return json?.user ?? null
}

/* ------------- dynamic (always latest draft) ------------- */

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PreviewPage(props: PageProps) {
  const { slug } = await props.params
  const effective = slug?.length ? slug.join('/') : 'index'
  const path = norm(effective)

  // 1) 🔐 Get logged-in Payload user from /api/users/me
  const user = await getUserFromAuthCookie()

  // Optional debug:
  // console.log('Preview user:', user)

  // 2) 🔐 Only allow viewer+ (viewer, editor, admin, super-admin)
  if (!user || !roleAtLeast(user, 'viewer')) {
    // For unauthorized visitors, pretend preview does not exist
    return notFound()
  }

  // 3) ✅ Fetch latest draft (or published if no draft) from Payload
  const payload = await payloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1,
    depth: 2,
    draft: true, // always hit versions table (draft if exists)
    where: { slug: { equals: path } },
  })

  const page = (docs?.[0] as PayloadPage | null) || null
  if (!page) return notFound()

  const sanitized = stripButtonLinksToSlug(page)

  return (
    <div>
      <RenderBlocks layout={sanitized.layout as PayloadPage['layout']} params={{}} />
    </div>
  )
}
