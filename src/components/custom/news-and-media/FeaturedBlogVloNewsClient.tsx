import { GlobalBlog, GlobalVlog } from '@/payload-types'
import { FeaturedBlogVlogNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import NewsSection from '../home/NewsSection'

type Props = {
  featuredBlogAndNews: GlobalBlog['blogs']
  trendingBlogAndNews: GlobalBlog['blogs']
  featuredVlog: GlobalVlog['vlogs']
  block: FeaturedBlogVlogNewsBlockType
}

function FeaturedBlogVloNewsClient({
  featuredBlogAndNews,
  trendingBlogAndNews,
  featuredVlog,
  block,
}: Props) {
  //   console.log('featuredBlogAndNews ', featuredBlogAndNews)
  //   console.log('trendingBlogAndNews ', trendingBlogAndNews)
  //   console.log('featuredVlog ', featuredVlog)

  return (
    <div
      className="container-padding-y"
      style={{
        backgroundColor: block?.backgroundColor || '',
      }}
    >
      <NewsSection
        featuredBlogAndNews={featuredBlogAndNews}
        trendingBlogAndNews={trendingBlogAndNews}
        featuredVlog={featuredVlog}
        block={block}
      />
    </div>
  )
}

export default FeaturedBlogVloNewsClient
