import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { ALL_NEWS_SLUG_AND_TAG } from '@/lib/constants'
import { AllNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import AllNewsServer from './components/AllNewsServer'

type Props = {
  block: AllNewsBlockType
  params: Record<string, string>
}

function AllNewsBlock({ block }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-1'
  return (
    <WithHashScroller id={block?.sectionSettings?.sectionId} bgColor={bgColor}>
      {block?.sharedDataSettings?.useSharedData ? (
        <AllNewsServer block={block} />
      ) : (
        <NoDataFound
          widthHeight="min-h-[500px]"
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${ALL_NEWS_SLUG_AND_TAG}” block and check the checkbox.`}
          bgColor={bgColor}
        />
      )}
    </WithHashScroller>
  )
}

export default AllNewsBlock
