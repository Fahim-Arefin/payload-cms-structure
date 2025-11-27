import BlogDetailsServerSection from '@/components/custom/news-and-media/BlogDetailsServerSection'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { BLOGS_DETAILS_BLOCK_LABEL } from '@/lib/constants'
import { BlogDetailsSectionType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: BlogDetailsSectionType
  params: Record<string, string>
}

function BlockDetailsBlock({ block, params }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <BlogDetailsServerSection block={block} params={params?.slug} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${BLOGS_DETAILS_BLOCK_LABEL}” block and check the “Use shared Board of Directors (Global)” checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default BlockDetailsBlock
