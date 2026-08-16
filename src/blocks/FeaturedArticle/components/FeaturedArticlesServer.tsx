import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { FEATURED_ARTICLE_SLUG_AND_TAG, GLOBAL_ARTICLE_SLUG_AND_TAG } from '@/lib/constants'
import { Article } from '@/payload-types'
import { FeaturedArticleBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FeaturedArticlesClient from './FeaturedArticlesClient'

type Props = { block: FeaturedArticleBlockType }

async function FeaturedArticlesServer({ block }: Props) {
  const data = await getGlobalCached<Article>(
    GLOBAL_ARTICLE_SLUG_AND_TAG,
    2,
    FEATURED_ARTICLE_SLUG_AND_TAG,
  )

  const FeturedArticles = data?.articles?.filter((article, index) => article?.isFeatured) ?? []
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-2'

  return (
    <div>
      {data?.articles && data.articles?.length > 0 ? (
        <FeaturedArticlesClient FeturedArticles={FeturedArticles} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global ${GLOBAL_ARTICLE_SLUG_AND_TAG} collection data And Featured Some Data`}
          bgColor={bgColor}
        />
      )}
    </div>
  )
}

export default FeaturedArticlesServer
