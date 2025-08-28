import React, { FC } from 'react'

type EligibilityPlansProps = {}

const EligibilityPlans: FC<EligibilityPlansProps> = ({}) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 md:gap-6 lg:gap-10 xl:gap-20 mt-10 lg:mt-20">
      {/* ENTRY AGE CARD */}
      <div className="w-full md:max-w-[280px] border border-[#a88b36] rounded-lg px-4 pt-4 flex flex-col gap-4 ">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <img src="/assets/iconfeet.svg" alt="icon" className="w-4 h-4" />
          <h3 className="text-[10px] md:text-sm tracking-wide font-semibold text-[#000] uppercase">Entry Age</h3>
        </div>
        <div className="flex justify-center gap-3">
          <div className="flex flex-col items-center bg-[#a88b36] text-white rounded-t-md px-4 py-3 md:min-w-[80px]">
            <span className="text-[8px] md:text-xs">Minimum</span>
            <span className="text-[16px] md:text-2xl font-bold leading-none">30</span>
            <span className="text-sm">Days</span>
          </div>
          <div className="flex flex-col items-center bg-[#a88b36] text-white rounded-t-md px-4 py-3 md:min-w-[80px]">
            <span className="text-[8px] md:text-xs">Maximum</span>
            <span className="text-[16px] md:text-2xl font-bold leading-none">60</span>
            <span className="text-sm">Years</span>
          </div>
        </div>
      </div>

      {/* MATURITY AGE CARD */}
      <div className="w-full md:max-w-[280px] border border-[#a88b36] rounded-lg px-4 pt-4 flex flex-col gap-4">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <img src="/assets/iconfeet.svg" alt="icon" className="w-4 h-4" />
          <h3 className="text-[10px] md:text-sm tracking-wide font-semibold text-[#000] uppercase">Maturity Age</h3>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center bg-[#a88b36] text-white rounded-t-md px-6 py-3 md:min-w-[80px]">
            <span className="text-[8px] md:text-xs">Upto</span>
            <span className="text-[16px] md:text-2xl font-bold leading-none">72</span>
            <span className="text-sm">Years</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EligibilityPlans
