import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  ALL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_TAGS_SLUG_AND_TAG,
} from '@/lib/constants'
import { News, NewsTag } from '@/payload-types'
import { AllNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import AllNewsClient from './AllNewsClient'

type Props = { block: AllNewsBlockType }

async function AllNewsServer({ block }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'

  const [newsData, tagsData] = await Promise.all([
    getGlobalCached<News>(GLOBAL_NEWS_SLUG_AND_TAG, 2, ALL_NEWS_SLUG_AND_TAG),
    getGlobalCached<NewsTag>(GLOBAL_NEWS_TAGS_SLUG_AND_TAG, 1, ALL_NEWS_SLUG_AND_TAG),
  ])

  return (
    <div>
      {newsData?.news && newsData?.news?.length > 0 ? (
        <AllNewsClient data={newsData} tagsData={tagsData} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global ${GLOBAL_NEWS_SLUG_AND_TAG} collection data`}
          bgColor={bgColor}
        />
      )}
    </div>
  )
}

export default AllNewsServer
