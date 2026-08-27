import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { News, NewsTag } from '@/payload-types'
import { AllNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import NewsSection from './NewsSection'

type Props = {
  block: AllNewsBlockType
  data: News
  tagsData: NewsTag
}

function AllNewsClient({ block, data, tagsData }: Props) {
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
      <NewsSection data={data} tagsData={tagsData} block={block} />
    </div>
  )
}

export default AllNewsClient
