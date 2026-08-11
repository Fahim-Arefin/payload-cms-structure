import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { WCUBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import WhyChooseUsGrid from './WhyChooseUsGrid'

type Props = { block: WCUBlockType }

function WhyChooseUsSection({ block }: Props) {
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
      <WhyChooseUsGrid block={block} />
    </div>
  )
}

export default WhyChooseUsSection
