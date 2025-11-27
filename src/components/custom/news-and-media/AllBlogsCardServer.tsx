import { AllBlockCardType } from '@/types/payloadCustomTypes'
import React from 'react'
import NoDataFound from '../shared/NoDataFound'
import {
  BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_SLUG_AND_TAG,
  GLOBAL_BLOGS_BLOCK_LABEL,
  GLOBAL_BLOGS_SLUG_AND_TAG,
} from '@/lib/constants'
import { GlobalBlog } from '@/payload-types'
import { getGlobalCached } from '@/lib/cachedGlobals'
import AllBlogsCardClient from './AllBlogsCardClient'

type Props = {
  block: AllBlockCardType
}

async function AllBlogsCardServer({ block }: Props) {
  const data = await getGlobalCached<GlobalBlog>(
    GLOBAL_BLOGS_SLUG_AND_TAG,
    2,
    BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_SLUG_AND_TAG,
  )
  return (
    <div>
      {data ? (
        <AllBlogsCardClient data={data} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global ${GLOBAL_BLOGS_BLOCK_LABEL} collection data`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default AllBlogsCardServer
