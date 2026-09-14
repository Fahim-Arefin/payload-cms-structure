import config from '@/payload.config'
import { unstable_cache as unstableCache } from 'next/cache'
import { getPayload } from 'payload'
import { pageTag, pagesListTag } from './cacheTags'

export const getHomeIntroEnabled = unstableCache(
  async () => {
    const payload = await getPayload({ config: await config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'index' } },
      limit: 1,
      depth: 0,
      select: { layout: true, _status: true },
    })
    const home = docs[0]
    return Boolean(
      home &&
      home._status !== 'draft' &&
      home.layout?.some((block) => block.blockType === 'homeIntroLoader' && block.showIntroLoader),
    )
  },
  ['home-intro-enabled'],
  { tags: [pageTag('index'), pagesListTag] },
)
