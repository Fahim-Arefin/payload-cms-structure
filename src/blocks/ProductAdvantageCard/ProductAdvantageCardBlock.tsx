import Card01 from '@/components/custom/sagar-ropes-shared/cards/Card01'
import IntroSection from '@/components/custom/sagar-ropes-shared/others/IntroSection'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ProductAdvantageCardBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: ProductAdvantageCardBlockType
  params: Record<string, string>
}

function ProductAdvantageCardBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="container-padding ">
        {/* section intro */}
        <IntroSection block={block} />
        {/* cards */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 
          mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 
         gap-3 lg:gap-2.5 xl:gap-4 2xl:gap-6 "
        >
          {block?.cards?.map((item, index) => (
            <Card01
              key={index}
              data={item}
              index={index}
              className="bg-white-1
              p-2.5 md:p-3.5 xl:p-5 2xl:p-6 
              min-h-[170px] md:min-h-[160px] lg:min-h-[210px] xl:min-h-[275px] 2xl:min-h-[300px]"
            />
          ))}
        </div>
      </div>
    </WithHashScroller>
  )
}

export default ProductAdvantageCardBlock
