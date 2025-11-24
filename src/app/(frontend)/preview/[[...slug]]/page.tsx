// Draft preview route (dynamic, no caching, shows latest draft or published)
import RenderBlocks from '@/blocks/RenderBlock'
import { stripButtonLinksToSlug } from '@/lib/utils'
import type { Page as PayloadPage } from '@/payload-types'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type PageParams = { slug?: string[] }
type PageProps = { params: Promise<PageParams> }

const norm = (s: string) =>
  decodeURIComponent(s)
    .replace(/^\/+|\/+$/g, '')
    .replace(/\/{2,}/g, '/')

const payloadClient = async () => getPayload({ config: await config })

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PreviewPage(props: PageProps) {
  const { slug } = await props.params
  const effective = slug?.length ? slug.join('/') : 'index'
  const path = norm(effective)

  const payload = await payloadClient()

  // 👇 draft: true → latest version (draft if exists, otherwise published)
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1,
    depth: 2,
    draft: true,
    where: { slug: { equals: path } },
  })

  const page = (docs?.[0] as PayloadPage | null) || null
  if (!page) return notFound()

  const sanitized = stripButtonLinksToSlug(page)

  // 👀 Here we intentionally allow _status === 'draft' — this *is* the preview
  return (
    <div>
      <RenderBlocks layout={sanitized.layout as PayloadPage['layout']} params={{}} />
    </div>
  )
}
