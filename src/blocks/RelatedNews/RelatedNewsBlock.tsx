import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { RELATED_NEWS_SLUG_AND_TAG } from '@/lib/constants'
import { RelatedNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import RelatedNewsServer from './components/RelatedNewsServer'

type Props = {
  block: RelatedNewsBlockType
  params: Record<string, string>
}

function RelatedNewsBlock({ block, params }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'
  return (
    <WithHashScroller id={block?.sectionSettings?.sectionId} bgColor={bgColor}>
      {block?.sharedDataSettings?.useSharedData ? (
        <RelatedNewsServer block={block} id={params?.slug} />
      ) : (
        <NoDataFound
          widthHeight="min-h-[500px]"
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${RELATED_NEWS_SLUG_AND_TAG}” block and check the checkbox.`}
          bgColor={bgColor}
        />
      )}
    </WithHashScroller>
  )
}

export default RelatedNewsBlock
