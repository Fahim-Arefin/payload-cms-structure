import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { RELATED_ARTICLE_SLUG_AND_TAG } from '@/lib/constants'
import { RelatedArticlesBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import RelatedArticleServer from './components/RelatedArticleServer'

type Props = {
  block: RelatedArticlesBlockType
  params: Record<string, string>
}

function RelatedArticlesBlock({ block, params }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'
  return (
    <WithHashScroller id={block?.sectionSettings?.sectionId} bgColor={bgColor}>
      {block?.sharedDataSettings?.useSharedData ? (
        <RelatedArticleServer block={block} id={params?.slug} />
      ) : (
        <NoDataFound
          widthHeight="min-h-[500px]"
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${RELATED_ARTICLE_SLUG_AND_TAG}” block and check the checkbox.`}
          bgColor={bgColor}
        />
      )}
    </WithHashScroller>
  )
}

export default RelatedArticlesBlock
