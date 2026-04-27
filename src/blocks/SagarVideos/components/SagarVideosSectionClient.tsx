import IntroSectionDesign04 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign04'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { SagarVideosBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import VideoCarousal from './VideoCarousal'
import { News } from '@/payload-types'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { GLOBAL_NEWS_SLUG_AND_TAG } from '@/lib/constants'

type Props = {
  block: SagarVideosBlockType
  newsData: News
}

function SagarVideosSectionClient({ block, newsData }: Props) {
  const publishedVlogs =
    newsData?.newsItems?.filter((news) => news?.eventType === 'vlog' && news?.isFeatured) ?? []

  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div
          className="container-padding grid grid-cols-1 md:grid-cols-12
        gap-6 xl:gap-12 2xl:gap-14"
        >
          {/* section intro */}
          <IntroSectionDesign04
            block={block}
            position="left"
            className={`md:col-span-4 ${block?.videoAlignment === 'left' ? 'order-2' : 'order-1'}`}
            justify="justify-center"
          />
          {/* videos section */}
          <div
            className={`md:col-span-8 w-full h-full flex items-center justify-center ${block?.videoAlignment === 'left' ? 'order-1' : 'order-2'}`}
          >
            {publishedVlogs?.length > 0 ? (
              <VideoCarousal publishedVlogs={publishedVlogs} />
            ) : (
              <NoDataFound
                message="No Featured Vlog Found"
                description={`Please feature some vlog from Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
                bgColor={block?.backgroundColor || ''}
              />
            )}
          </div>
        </div>
      </div>
    </WithHashScroller>
  )
}

export default SagarVideosSectionClient
