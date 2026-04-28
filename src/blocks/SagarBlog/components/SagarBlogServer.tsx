import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_NEWS_SLUG_AND_TAG, SAGAR_BLOGS_SLUG_AND_TAG } from '@/lib/constants'
import { News } from '@/payload-types'
import { SagarBlogBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import SagarBlogClient from './SagarBlogClient'

type Props = {
  block: SagarBlogBlockType
}

async function SagarBlogServer({ block }: Props) {
  const data = await getGlobalCached<News>(GLOBAL_NEWS_SLUG_AND_TAG, 2, SAGAR_BLOGS_SLUG_AND_TAG)

  const publishedBlogs =
    data?.newsItems?.filter((news) => news?.eventType === 'blog' && news?.isFeatured) ?? []

  return (
    <div>
      {data && data?.newsItems && data?.newsItems?.length > 0 ? (
        <SagarBlogClient blogsData={publishedBlogs} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default SagarBlogServer
