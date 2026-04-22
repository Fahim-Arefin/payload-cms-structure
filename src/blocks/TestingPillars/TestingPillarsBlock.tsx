import IntroSectionDesign04 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign04'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { TestingPillarsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import TestingPilarCard from './components/TestingPilarCard'

type Props = {
  block: TestingPillarsBlockType
  params: Record<string, string>
}

function TestingPillarsBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="container-padding">
        <IntroSectionDesign04 block={block} position="center" />
        <div
          className="mt-4 lg:mt-6 xl:mt-8 2xl:mt-10
          grid grid-cols-1
          gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 "
        >
          {block?.testingPillars &&
            block?.testingPillars?.length > 0 &&
            block?.testingPillars?.map((item, index) => (
              <TestingPilarCard
                key={index}
                data={item}
                index={index}
                //   className="
                //   border-2 border-dashed border-cyan bg-white-2 hover:bg-cyan
                //   h-fit md:h-[130px] lg:h-[160px] xl:h-[230px] 2xl:h-[250px]
                //   hover:h-[110%] md:hover:h-[150px] lg:hover:h-[180px] xl:hover:h-[250px]  2xl:hover:h-[270px]
                //   overflow-hidden hover:overflow-y-auto overflow-x-hidden"
              />
            ))}
        </div>
      </div>
    </WithHashScroller>
  )
}

export default TestingPillarsBlock
