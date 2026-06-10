import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type projectApp = NonNullable<ProjectApproachBlockType['projectApproach']>

type Props = {
  data: projectApp['approachItems'][number]
  index: number
}

function ProjectApproachCard({ data, index }: Props) {
  const hasDesc = !!data?.description && !!data?.description?.root?.direction // or lexicalHasRealText(block.description?.root)

  return (
    <div
      className={`${index % 2 === 0 ? 'bg-secondary-1' : 'bg-primary-1'}
      project-approach-card
    relative overflow-hidden
    px-[20px] lg:px-[30px] xl:px-[56px] 2xl:px-[58px]   
    py-[16px] lg:py-[20px] xl:py-[32px] 2xl:py-[34px]
    space-y-2 lg:space-y-[12px] xl:space-y-[15px] 2xl:space-y-[17px]
    rounded-[10px] lg:rounded-[12px] xl:rounded-[16px] 
    `}
    >
      <div className={`relative z-10 font-agency text-white-1 global-h5 `}>{data?.title}</div>
      {hasDesc && (
        <div className="relative z-10 font-grift text-justify global-p4 text-white-1 max-w-full md:max-w-[85%]">
          <LocalizedRichText bn={data?.description} en={data?.description} />
        </div>
      )}
      {/* index design */}
      <div
        className="
          pointer-events-none
          absolute right-0 z-0
          bottom-[-35px] lg:bottom-[-70px] xl:bottom-[-70px] 2xl:bottom-[-70.14px]
          text-[200px] lg:text-[250px] xl:text-[280px] 2xl:text-[300px]
          font-agency text-primary-2
           font-normal leading-[112.5%]
          tracking-[-9px] lowercase
          opacity-[0.15]
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        "
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

export default ProjectApproachCard
