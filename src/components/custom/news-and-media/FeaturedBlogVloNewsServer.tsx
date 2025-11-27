import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  GLOBAL_BLOGS_BLOCK_LABEL,
  GLOBAL_BLOGS_SLUG_AND_TAG,
  GLOBAL_VLOGS_SLUG_AND_TAG,
  HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG,
} from '@/lib/constants'
import { GlobalBlog, GlobalVlog } from '@/payload-types'
import { FeaturedBlogVlogNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import NoDataFound from '../shared/NoDataFound'
import FeaturedBlogVloNewsClient from './FeaturedBlogVloNewsClient'

type Props = {
  block: FeaturedBlogVlogNewsBlockType
}

async function FeaturedBlogVloNewsServer({ block }: Props) {
  const blogNewsData = await getGlobalCached<GlobalBlog>(
    GLOBAL_BLOGS_SLUG_AND_TAG,
    2,
    HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG,
  )

  const vlogData = await getGlobalCached<GlobalVlog>(
    GLOBAL_VLOGS_SLUG_AND_TAG,
    2,
    HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG,
  )

  const featuredBlogAndNews = blogNewsData?.blogs?.filter((blog) => blog?.isFeatured === true)
  const trendingBlogAndNews = blogNewsData?.blogs?.filter((blog) => blog?.isTrending === true)
  const featuredVlog = vlogData?.vlogs?.filter((vlog) => vlog?.isFeatured === true)

  return (
    <div>
      {blogNewsData &&
      vlogData &&
      blogNewsData?.blogs?.length > 0 &&
      featuredBlogAndNews?.length > 0 &&
      trendingBlogAndNews?.length > 0 &&
      featuredVlog?.length > 0 &&
      vlogData?.vlogs?.length > 0 ? (
        <FeaturedBlogVloNewsClient
          featuredBlogAndNews={featuredBlogAndNews}
          trendingBlogAndNews={trendingBlogAndNews}
          featuredVlog={featuredVlog}
          block={block}
        />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global ${GLOBAL_BLOGS_BLOCK_LABEL} and ${GLOBAL_VLOGS_SLUG_AND_TAG} collection data`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default FeaturedBlogVloNewsServer
