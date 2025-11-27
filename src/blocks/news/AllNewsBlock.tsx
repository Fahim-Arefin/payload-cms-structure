import NewsSectionServer from '@/components/custom/news-and-media/NewsSectionServer'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { NEWS_BLOCK_LABEL } from '@/lib/constants'
import { AllNewsSectionType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: AllNewsSectionType
  params: Record<string, string>
}

function AllNewsBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <NewsSectionServer block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${NEWS_BLOCK_LABEL}” block and check the checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default AllNewsBlock
