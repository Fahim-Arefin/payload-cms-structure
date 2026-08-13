import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_ARTICLE_SLUG_AND_TAG, SINGLE_ARTICLE_SLUG_AND_TAG } from '@/lib/constants'
import { Article } from '@/payload-types'
import { SingleArticlesBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import SingleArticleClient from './SingleArticleClient'

type Props = {
  block: SingleArticlesBlockType
  id: string
}

async function SingleArticleServer({ block, id }: Props) {
  const data = await getGlobalCached<Article>(
    GLOBAL_ARTICLE_SLUG_AND_TAG,
    2,
    SINGLE_ARTICLE_SLUG_AND_TAG,
  )

  const findItem = data?.articles?.find((item, _) => item?.id === id)
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'

  return (
    <div>
      {data && data?.articles && data?.articles?.length > 0 ? (
        findItem ? (
          <SingleArticleClient block={block} data={findItem} />
        ) : (
          <NoDataFound
            message="Please Give Valid Slug"
            description={`This slug item is not exits in your Global '${GLOBAL_ARTICLE_SLUG_AND_TAG}' collection data`}
            bgColor={bgColor}
          />
        )
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global '${GLOBAL_ARTICLE_SLUG_AND_TAG}' collection data`}
          bgColor={bgColor}
        />
      )}
    </div>
  )
}

export default SingleArticleServer
