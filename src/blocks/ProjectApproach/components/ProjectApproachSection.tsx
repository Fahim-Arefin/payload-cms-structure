import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProjectApproachCardSection from './ProjectApproachCardSection'

type Props = {
  block: ProjectApproachBlockType
}

function ProjectApproachSection({ block }: Props) {
  return (
    <div className="container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
      <SectionHeading01 data={block?.sectionHeading} align="middle" />
      <ProjectApproachCardSection data={block?.projectApproach} />
    </div>
  )
}

export default ProjectApproachSection
