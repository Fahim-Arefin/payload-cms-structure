import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProjectApproachCard from './ProjectApproachCard'

type Props = {
  data: ProjectApproachBlockType['projectApproach']
}

function ProjectApproachCardSection({ data }: Props) {
  return (
    <div>
      <div>
        {data?.approachItems &&
          data?.approachItems?.length > 0 &&
          data?.approachItems?.map((item, i) => (
            <ProjectApproachCard data={item} index={i} key={i} />
          ))}
      </div>
    </div>
  )
}

export default ProjectApproachCardSection
