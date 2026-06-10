import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CodingLanguageImageSection from './CodingLanguageImageSection'

type Props = {
  block: CodingLanguageBlockType
}

function CodingLanguageSection({ block }: Props) {
  return (
    // <div className="container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
    //   <SectionHeading01 data={block?.sectionHeading} align="middle" />
    //   <CodingLanguageImageSection data={block} />
    // </div>
    <div className="space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
      <div className="container-padding-x container-padding-t ">
        <SectionHeading01 data={block?.sectionHeading} align="middle" />
      </div>
      <div className="container-padding-b">
        <CodingLanguageImageSection data={block} />
      </div>
    </div>
  )
}

export default CodingLanguageSection
