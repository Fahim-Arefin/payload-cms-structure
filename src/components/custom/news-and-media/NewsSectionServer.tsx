import { AllNewsSectionType } from '@/types/payloadCustomTypes'
import React from 'react'
import NoDataFound from '../shared/NoDataFound'
import {
  GLOBAL_BLOGS_BLOCK_LABEL,
  GLOBAL_BLOGS_SLUG_AND_TAG,
  NEWS_SLUG_AND_TAG,
} from '@/lib/constants'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GlobalBlog } from '@/payload-types'
import NewsSectionClient from './NewsSectionClient'

type Props = {
  block: AllNewsSectionType
}

async function NewsSectionServer({ block }: Props) {
  const data = await getGlobalCached<GlobalBlog>(GLOBAL_BLOGS_SLUG_AND_TAG, 2, NEWS_SLUG_AND_TAG)
  return (
    <div>
      {data && data?.blogs && data?.blogs?.length > 0 ? (
        <NewsSectionClient data={data} block={block} />
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

export default NewsSectionServer
