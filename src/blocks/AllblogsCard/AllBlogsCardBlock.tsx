import AllBlogsCardServer from '@/components/custom/news-and-media/AllBlogsCardServer'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { BLOGS_BLOCK_LABEL } from '@/lib/constants'
import { AllBlockCardType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: AllBlockCardType
  params: Record<string, string>
}

function AllBlogsCardBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <AllBlogsCardServer block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${BLOGS_BLOCK_LABEL}” block and check the “Use shared Blogs (Global)” checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default AllBlogsCardBlock
