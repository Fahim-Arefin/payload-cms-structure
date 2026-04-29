import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { News } from '@/payload-types'
import { SagarBlogBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import { default as Pattern01, default as Pattern02 } from '/public/assets/images/BOpattern.png'
import IntroSection from '@/components/custom/sagar-ropes-shared/others/IntroSection'
import SagarBlogCarousal from './SagarBlogCarousal'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { GLOBAL_NEWS_SLUG_AND_TAG } from '@/lib/constants'

type Props = {
  block: SagarBlogBlockType
  blogsData: News['newsItems']
}

function SagarBlogClient({ block, blogsData }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div className="container-padding">
          <IntroSection block={block} />
          <div className="mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 ">
            {blogsData && blogsData?.length > 0 ? (
              <SagarBlogCarousal block={block} blogsData={blogsData} />
            ) : (
              <NoDataFound
                message="No Featured Blog Found"
                description={`Please feature some blog from Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
                bgColor={block?.backgroundColor || ''}
              />
            )}
          </div>
        </div>

        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 bottom-0 z-30 h-[50%]
           md:w-[120px] 
           lg:w-[170px] 
           xl:w-[225px] 
           2xl:w-[280px]
        "
          >
            <Image
              fill
              src={Pattern01}
              alt="pattern image 02"
              quality={90}
              sizes="100vw"
              className="object-cover -rotate-180"
              placeholder="blur"
              blurDataURL={Pattern01?.blurDataURL}
            />
          </div>
        )}
        {/* pattern 2 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute right-0 top-0 z-30 h-[50%]
           md:w-[120px] 
           lg:w-[170px] 
           xl:w-[225px] 
           2xl:w-[280px]
        "
          >
            <Image
              fill
              src={Pattern02}
              alt="pattern image 02"
              quality={90}
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Pattern02?.blurDataURL}
            />
          </div>
        )}
      </div>
    </WithHashScroller>
  )
}

export default SagarBlogClient
