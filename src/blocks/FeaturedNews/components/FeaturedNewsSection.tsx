import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { News } from '@/payload-types'
import { FeaturedNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FeaturedNewsCarousal from './FeaturedNewsCarousal'
type Props = {
  block: FeaturedNewsBlockType
  featuredNews: News['news']
}

function FeaturedNewsSection({ featuredNews, block }: Props) {
  return (
    <div
      className="container-padding
        space-y-[20px]
        lg:space-y-[40px]
        xl:space-y-[56px]
        2xl:space-y-[60px]
      "
    >
      <SectionHeading01 data={block?.sectionHeading} align="middle" />
      <FeaturedNewsCarousal featuredNews={featuredNews} block={block} />
    </div>
  )
}

export default FeaturedNewsSection
