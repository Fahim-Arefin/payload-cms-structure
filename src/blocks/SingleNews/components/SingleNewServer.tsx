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

async function SingleNewServer({ block, id }: Props) {
  const data = await getGlobalCached<News>(GLOBAL_NEWS_SLUG_AND_TAG, 2, SINGLE_NEWS_SLUG_AND_TAG)

  const findItem = data?.news?.find((item, _) => item?.id === id)
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'

  return (
    <div>
      {data && data?.news && data?.news?.length > 0 ? (
        findItem ? (
          <SingleNewsClient block={block} data={findItem} />
        ) : (
          <NoDataFound
            message="Please Give Valid Slug"
            description={`This slug item is not exits in your Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
            bgColor={bgColor}
          />
        )
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
          bgColor={bgColor}
        />
      )}
    </div>
  )
}

export default SingleNewServer
