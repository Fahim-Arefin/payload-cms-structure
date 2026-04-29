// import NoDataFound from '@/components/custom/shared/NoDataFound'
// import { getGlobalCached } from '@/lib/cachedGlobals'
// import { ALL_NEWS_SLUG_AND_TAG, GLOBAL_NEWS_SLUG_AND_TAG } from '@/lib/constants'
// import { News } from '@/payload-types'
// import { AllNewsBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import AllNewsClient from './AllNewsClient'

// type Props = {
//   block: AllNewsBlockType
// }

// async function AllNewsServer({ block }: Props) {
//   const data = await getGlobalCached<News>(GLOBAL_NEWS_SLUG_AND_TAG, 2, ALL_NEWS_SLUG_AND_TAG)
//   return (
//     <div>
//       {data && data?.newsItems && data?.newsItems?.length > 0 ? (
//         <AllNewsClient data={data} block={block} />
//       ) : (
//         <NoDataFound
//           message="No Data Found"
//           description={`Please fill up Global ${GLOBAL_NEWS_SLUG_AND_TAG} collection data`}
//           bgColor={block?.backgroundColor || ''}
//         />
//       )}
//     </div>
//   )
// }

// export default AllNewsServer

import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  ALL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG,
  GLOBAL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_TAGS_SLUG_AND_TAG,
} from '@/lib/constants'
import { News, NewsCategory, NewsTag } from '@/payload-types'
import { AllNewsBlockType } from '@/types/payloadCustomTypes'
import AllNewsClient from './AllNewsClient'

type Props = {
  block: AllNewsBlockType
}

async function AllNewsServer({ block }: Props) {
  const [newsData, categoriesData, tagsData] = await Promise.all([
    getGlobalCached<News>(GLOBAL_NEWS_SLUG_AND_TAG, 2, ALL_NEWS_SLUG_AND_TAG),
    getGlobalCached<NewsCategory>(GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG, 1, ALL_NEWS_SLUG_AND_TAG),
    getGlobalCached<NewsTag>(GLOBAL_NEWS_TAGS_SLUG_AND_TAG, 1, ALL_NEWS_SLUG_AND_TAG),
  ])

  return (
    <div>
      {newsData?.newsItems && newsData.newsItems.length > 0 ? (
        <AllNewsClient
          data={newsData}
          categoriesData={categoriesData}
          tagsData={tagsData}
          block={block}
        />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global ${GLOBAL_NEWS_SLUG_AND_TAG} collection data`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default AllNewsServer
