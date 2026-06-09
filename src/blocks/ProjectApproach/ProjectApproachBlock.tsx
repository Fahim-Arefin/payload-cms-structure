import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProjectApproachSection from './components/ProjectApproachSection'

type Props = {
  block: ProjectApproachBlockType
  params: Record<string, string>
}

function ProjectApproachBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <ProjectApproachSection block={block} />
    </WithHashScroller>
  )
}

export default ProjectApproachBlock
