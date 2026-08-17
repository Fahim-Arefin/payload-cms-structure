import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { FEATURED_NEWS_SLUG_AND_TAG, GLOBAL_NEWS_SLUG_AND_TAG } from '@/lib/constants'
import { News } from '@/payload-types'
import { FeaturedNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FeaturedNewsClient from './FeaturedNewsClient'

type Props = { block: FeaturedNewsBlockType }

async function FeaturedNewsServer({ block }: Props) {
  const data = await getGlobalCached<News>(GLOBAL_NEWS_SLUG_AND_TAG, 2, FEATURED_NEWS_SLUG_AND_TAG)

  const featuredNews = data?.news?.filter((article, index) => article?.isFeatured) ?? []
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-2'

  return (
    <div>
      {data?.news && data.news?.length > 0 ? (
        <FeaturedNewsClient featuredNews={featuredNews} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global ${GLOBAL_NEWS_SLUG_AND_TAG} collection data And Featured Some Data`}
          bgColor={bgColor}
        />
      )}
    </div>
  )
}

export default FeaturedNewsServer
