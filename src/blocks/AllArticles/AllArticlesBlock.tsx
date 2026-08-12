import NoDataFound from '@/components/custom/shared/NoDataFound'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ALL_ARTICLE_SLUG_AND_TAG } from '@/lib/constants'
import { AllArticlesBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import AllArticlesServer from './components/AllArticlesServer'

type Props = {
  block: AllArticlesBlockType
  params: Record<string, string>
}

function AllArticlesBlock({ block }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'

  return (
    <WithHashScroller id={block?.sectionSettings?.sectionId} bgColor={bgColor}>
      {block?.sharedDataSettings?.useSharedData ? (
        <AllArticlesServer block={block} />
      ) : (
        <NoDataFound
          widthHeight="min-h-[500px]"
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${ALL_ARTICLE_SLUG_AND_TAG}” block and check the checkbox.`}
          bgColor={bgColor}
        />
      )}
    </WithHashScroller>
  )
}

export default AllArticlesBlock
