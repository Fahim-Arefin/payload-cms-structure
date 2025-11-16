import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { StepContentBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  data: StepContentBlockType
}

function StepContentBlock({ data }: Props) {
  return (
    <div>
      <div>
        <div className="flex flex-col mt-12 space-y-4 lg:space-y-4 xl:space-y-7">
          {data?.items.map((eachItem, i) => {
            return (
              <div
                key={i}
                className="flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
                           space-x-2 lg:space-x-1 xl:space-x-3 2xl:space-x-4
                           p-1.5 md:px-3 md:py-1.5 lg:px-3 lg:py-2 xl:p-3 2xl:p-4 
                           rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
              >
                <div className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#434343]">
                  <LocalizedRichText en={eachItem?.description} bn={eachItem?.descriptionBN} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-[30px] lg:mt-[50px] xl:mt-[80px] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        <LocalizedRichText en={data?.additionalDescription} bn={data?.additionalDescriptionBN} />
      </div>
    </div>
  )
}

export default StepContentBlock
