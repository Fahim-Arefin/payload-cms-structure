import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  ALL_ARTICLE_SLUG_AND_TAG,
  GLOBAL_ARTICLE_SLUG_AND_TAG,
  GLOBAL_ARTICLE_TAGS_SLUG_AND_TAG,
} from '@/lib/constants'
import { Article, ArticleTag } from '@/payload-types'
import { AllArticlesBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import AllArticlesClient from './AllArticlesClient'

type Props = { block: AllArticlesBlockType }

async function AllArticlesServer({ block }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'

  const [newsData, tagsData] = await Promise.all([
    getGlobalCached<Article>(GLOBAL_ARTICLE_SLUG_AND_TAG, 2, ALL_ARTICLE_SLUG_AND_TAG),
    getGlobalCached<ArticleTag>(GLOBAL_ARTICLE_TAGS_SLUG_AND_TAG, 1, ALL_ARTICLE_SLUG_AND_TAG),
  ])

  return (
    <div>
      {newsData?.articles && newsData.articles?.length > 0 ? (
        <AllArticlesClient data={newsData} tagsData={tagsData} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global ${GLOBAL_ARTICLE_SLUG_AND_TAG} collection data`}
          bgColor={bgColor}
        />
      )}
    </div>
  )
}

export default AllArticlesServer
