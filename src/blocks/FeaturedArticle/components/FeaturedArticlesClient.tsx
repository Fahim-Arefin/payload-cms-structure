import NoDataFound from '@/components/custom/shared/NoDataFound'
import { GLOBAL_ARTICLE_SLUG_AND_TAG } from '@/lib/constants'
import { Article } from '@/payload-types'
import { FeaturedArticleBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FeaturedArticlesSection from './FeaturedArticlesSection'

type Props = {
  block: FeaturedArticleBlockType
  FeturedArticles: Article['articles']
}

function FeaturedArticlesClient({ block, FeturedArticles }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-2'
  return (
    <div>
      {FeturedArticles && FeturedArticles?.length > 0 ? (
        <FeaturedArticlesSection FeturedArticles={FeturedArticles} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please make some article featured from Global ${GLOBAL_ARTICLE_SLUG_AND_TAG}`}
          bgColor={bgColor}
        />
      )}
    </div>
  )
}

export default FeaturedArticlesClient
