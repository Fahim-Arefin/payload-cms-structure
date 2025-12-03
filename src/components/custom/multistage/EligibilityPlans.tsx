import React, { FC } from 'react'
import LocalizedText from '../shared/LocalizedText'
import { MultistagePlanBlockType } from '@/types/payloadCustomTypes'

type EligibilityPlansProps = {
  data: MultistagePlanBlockType
}

const EligibilityPlans: FC<EligibilityPlansProps> = ({ data }: EligibilityPlansProps) => {
  const entryAge = data?.eligibility?.entryAge
  const maturityAge = data?.eligibility?.maturityAge
  return (
    <div className="flex flex-row justify-center items-center gap-2 md:gap-6 lg:gap-10 xl:gap-20 mt-10 lg:mt-20">
      {/* ENTRY AGE CARD */}
      <div className="w-full md:max-w-[280px] border border-[#a88b36] rounded-lg px-4 pt-4 flex flex-col gap-4 ">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <img src="/assets/icons/iconfeet.svg" alt="icon" className="w-4 h-4" />
          <h3 className="text-[10px] md:text-sm tracking-wide font-semibold text-[#000] uppercase">
            <LocalizedText en={entryAge?.label} bn={entryAge?.labelBN} />
          </h3>
        </div>
        <div className="flex justify-center gap-3">
          <div className="flex flex-col items-center bg-[#a88b36] text-white rounded-t-md px-4 py-3 md:min-w-[80px]">
            <span className="text-[8px] md:text-xs">
              <LocalizedText en={entryAge?.minLabel} bn={entryAge?.minLabelBN} />
            </span>
            <span className="text-[16px] md:text-2xl font-bold leading-none">
              <LocalizedText en={`${entryAge?.minValue}`} bn={`${entryAge?.minValueBN}`} />
            </span>
            <span className="text-sm">
              <LocalizedText en={entryAge?.minUnit} bn={entryAge?.minUnit} />
            </span>
          </div>
          <div className="flex flex-col items-center bg-[#a88b36] text-white rounded-t-md px-4 py-3 md:min-w-[80px]">
            <span className="text-[8px] md:text-xs">
              <LocalizedText en={entryAge?.maxLabel} bn={entryAge?.maxLabelBN} />
            </span>
            <span className="text-[16px] md:text-2xl font-bold leading-none">
              <LocalizedText en={`${entryAge?.maxValue}`} bn={`${entryAge?.maxValueBN}`} />
            </span>
            <span className="text-sm">
              <LocalizedText en={entryAge?.maxUnit} bn={entryAge?.maxUnitBN} />
            </span>
          </div>
        </div>
      </div>

      {/* MATURITY AGE CARD */}
      <div className="w-full md:max-w-[280px] border border-[#a88b36] rounded-lg px-4 pt-4 flex flex-col gap-4">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <img src="/assets/icons/iconfeet.svg" alt="icon" className="w-4 h-4" />
          <h3 className="text-[10px] md:text-sm tracking-wide font-semibold text-[#000] uppercase">
            <LocalizedText en={maturityAge?.label} bn={maturityAge?.labelBN} />
          </h3>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center bg-[#a88b36] text-white rounded-t-md px-6 py-3 md:min-w-[80px]">
            <span className="text-[8px] md:text-xs">
              <LocalizedText en={maturityAge?.uptoLabel} bn={maturityAge?.uptoLabelBN} />
            </span>
            <span className="text-[16px] md:text-2xl font-bold leading-none">
              <LocalizedText en={`${maturityAge?.uptoValue}`} bn={`${maturityAge?.uptoValueBN}`} />
            </span>
            <span className="text-sm">
              <LocalizedText en={maturityAge?.uptoUnit} bn={maturityAge?.uptoUnitBN} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EligibilityPlans
