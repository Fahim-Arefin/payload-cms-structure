import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_NEWS_SLUG_AND_TAG, SINGLE_NEWS_SLUG_AND_TAG } from '@/lib/constants'
import { News } from '@/payload-types'
import { SingleNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import SingleNewsClient from './SingleNewsClient'

type Props = {
  block: SingleNewsBlockType
  id: string
}

async function SingleNewsServer({ block, id }: Props) {
  const data = await getGlobalCached<News>(GLOBAL_NEWS_SLUG_AND_TAG, 2, SINGLE_NEWS_SLUG_AND_TAG)

  const findItem = data?.newsItems?.find((item, _) => item?.id === id)

  return (
    <div>
      {data && data?.newsItems && data?.newsItems?.length > 0 ? (
        findItem ? (
          <SingleNewsClient block={block} data={findItem} />
        ) : (
          <NoDataFound
            message="Please Give Valid Slug"
            description={`This slug item is not exits in your Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
            bgColor={block?.backgroundColor || ''}
          />
        )
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default SingleNewsServer
