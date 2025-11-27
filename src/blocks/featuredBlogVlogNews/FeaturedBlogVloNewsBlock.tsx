import FeaturedBlogVloNewsServer from '@/components/custom/news-and-media/FeaturedBlogVloNewsServer'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_LABEL } from '@/lib/constants'
import { FeaturedBlogVlogNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: FeaturedBlogVlogNewsBlockType
  params: Record<string, string>
}

function FeaturedBlogVloNewsBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedVlogData && block?.useSharedBlogAndNewsData ? (
        <FeaturedBlogVloNewsServer block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_LABEL}” block and check both checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default FeaturedBlogVloNewsBlock
