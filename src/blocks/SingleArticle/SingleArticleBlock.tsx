import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { SINGLE_ARTICLE_SLUG_AND_TAG } from '@/lib/constants'
import { SingleArticlesBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import SingleArticleServer from './components/SingleArticleServer'

type Props = {
  block: SingleArticlesBlockType
  params: Record<string, string>
}

function SingleArticleBlock({ block, params }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={bgColor}
      className="rounded-t-[18px] lg:rounded-t-[25px] xl:rounded-t-[30px]"
    >
      {block?.sharedDataSettings?.useSharedData ? (
        <SingleArticleServer block={block} id={params?.slug} />
      ) : (
        <NoDataFound
          widthHeight="min-h-[500px]"
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${SINGLE_ARTICLE_SLUG_AND_TAG}” block and check the checkbox.`}
          bgColor={bgColor}
        />
      )}
    </WithHashScroller>
  )
}

export default SingleArticleBlock
