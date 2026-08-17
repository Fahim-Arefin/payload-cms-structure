import NoDataFound from '@/components/custom/shared/NoDataFound'
import { GLOBAL_NEWS_SLUG_AND_TAG } from '@/lib/constants'
import { News } from '@/payload-types'
import { FeaturedNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FeaturedNewsSection from './FeaturedNewsSection'
type Props = {
  block: FeaturedNewsBlockType
  featuredNews: News['news']
}

function FeaturedNewsClient({ block, featuredNews }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-2'
  return (
    <div>
      {featuredNews && featuredNews?.length > 0 ? (
        <FeaturedNewsSection featuredNews={featuredNews} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please make some article featured from Global ${GLOBAL_NEWS_SLUG_AND_TAG}`}
          bgColor={bgColor}
        />
      )}
    </div>
  )
}

export default FeaturedNewsClient
