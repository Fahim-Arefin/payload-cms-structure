import CalculatorModalBlock from '@/blocks/calculatorModalBlock.tsx/CalculatorModalBlock'
import BrochureButtonBlock from '@/blocks/resourcesButton/BrochureButton/BrochureButtonBlock'
import LinkButtonBlock from '@/blocks/resourcesButton/LinkButton/LinkButtonBlock'
import {
  BROCHURE_BUTTON_SLUG_AND_TAG,
  CALCULATOR_MODAL_SLUG_AND_TAG,
  LINK_BUTTON_SLUG_AND_TAG,
} from '@/lib/constants'
import { CustomTabBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  data: CustomTabBlockType['resourceButtons']
}

function ResourceButton({ data }: Props) {
  const cols = (data?.length && data?.length - 1) ?? 1
  return (
    <div
      // mt-[30px] lg:mt-[50px] xl:mt-[80px]
      className="xl:w-[40%] mx-auto
                  flex flex-row flex-wrap gap-y-2 gap-x-4 justify-center items-center  "
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {data?.map((item, i) => (
        <div key={i} className="basis-[46%]">
          {item?.blockType === BROCHURE_BUTTON_SLUG_AND_TAG && (
            <div className={`flex ${i % 2 === 0 ? `justify-end ` : 'justify-start '} `}>
              <BrochureButtonBlock data={item} />
            </div>
          )}
          {item?.blockType === CALCULATOR_MODAL_SLUG_AND_TAG && (
            <div className={`flex ${i % 2 === 0 ? `justify-end ` : 'justify-start '} `}>
              <CalculatorModalBlock data={item} />
            </div>
          )}
          {item?.blockType === LINK_BUTTON_SLUG_AND_TAG && (
            <div
              className={`flex gap-x-2  ${data?.length === 2 ? `justify-start` : 'justify-center'}`}
            >
              <LinkButtonBlock data={item} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ResourceButton
