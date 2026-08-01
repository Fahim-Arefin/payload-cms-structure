import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { OurProjectBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProjectContainer from './ProjectContainer'

type Props = { block: OurProjectBlockType }

function OurProjectSection({ block }: Props) {
  return (
    <div className="space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
      <div className="container-padding ">
        <SectionHeading01 align="middle" dark data={block?.sectionHeading} />
      </div>
      <ProjectContainer block={block} />
    </div>
  )
}

export default OurProjectSection
