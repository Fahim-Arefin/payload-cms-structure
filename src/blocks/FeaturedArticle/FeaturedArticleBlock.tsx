import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { FEATURED_ARTICLE_SLUG_AND_TAG } from '@/lib/constants'
import { FeaturedArticleBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FeaturedArticlesServer from './components/FeaturedArticlesServer'

type Props = {
  block: FeaturedArticleBlockType
  params: Record<string, string>
}

function FeaturedArticleBlock({ block }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-2'
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={bgColor}
      className={`${block?.isFirstContentOfPage && 'rounded-t-[18px] lg:rounded-t-[25px] xl:rounded-t-[30px] overflow-hidden'}`}
    >
      {block?.sharedDataSettings?.useSharedData ? (
        <FeaturedArticlesServer block={block} />
      ) : (
        <NoDataFound
          widthHeight="min-h-[500px]"
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${FEATURED_ARTICLE_SLUG_AND_TAG}” block and check the checkbox.`}
          bgColor={bgColor}
        />
      )}
    </WithHashScroller>
  )
}

export default FeaturedArticleBlock
