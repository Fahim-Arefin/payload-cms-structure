import BlogsSectionServer from '@/components/custom/news-and-media/BlogsSectionServer'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { BLOGS_BLOCK_LABEL } from '@/lib/constants'
import { AllBlogsSectionType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: AllBlogsSectionType
  params: Record<string, string>
}

function BlogsBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <BlogsSectionServer block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${BLOGS_BLOCK_LABEL}” block and check the “Use shared Board of Directors (Global)” checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default BlogsBlock
