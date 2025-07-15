'use client'

import React, { useState } from 'react'
import CalculateForm from './CalculateForm'
import PremiumBreakdown from './PremiumBreakdown'

type Props = {}

const CalculatorSection = (props: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  return (
    <div
      className="px-5 pt-12 py-4
           md:px-24 md:pt-24
           lg:px-[130px]  lg:pt-[110px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[150px] lg:py-10 mb-4 lg:mb-10 xl:mb-20"
    >
      <div className="flex flex-col items-start justify-start">
        <h1 className="global-h1 font-semibold text-[#4A4A4A] text-start uppercase mb-4 lg:mb-10">
          Let’s calculate <span className="text-[#ED7125] font-semibold">the premium</span>
        </h1>
        <p className="text-[12px] md:global-p1 text-start w-full xl:w-[80%] text-[#434343] line-clamp-4 md:line-clamp-2">
          Our policies provide more than just life coverage. Many plans include savings and
          investment options, helping you grow your wealth over time while ensuring your loved ones
          are protected. With affordable premiums, flexible terms, and guaranteed returns, Shanta
          Life combines security and financial growth in one comprehensive package.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] gap-4 lg:gap-10 justify-center mt-6 lg:mt-10 xl:mt-20">
        {/* left side box */}
        <div className=" w-full order-2 lg:order-1">
          {selectedPlan ? (
            <PremiumBreakdown />
          ) : (
            <>
              <div className="px-6 pt-6 md:px-10 md:pt-10 pb-4 rounded-t-xl bg-[#9C863940]">
                <h4 className="global-p1 font-semibold text-[#3A3A3C] mb-1">For their Future</h4>
                <p className="global-p2 text-[#3A3A3C]">
                  Secure Your Child’s Future With A Plan That Covers Both Education Costs And Life
                  Protection—Because Dreams Deserve A Safety Net.
                </p>
              </div>

              <div className="bg-[#ccbf95] px-6 md:px-10 py-4 ">
                <h4 className="global-p1 font-bold text-[#fff] mb-1">For Your Growth</h4>
                <p className="global-p2 font-light text-[#fff]">
                  Build Wealth With Guaranteed Returns And Built-in Life Insurance
                </p>
              </div>

              <div className="bg-[#9C8639B2] rounded-b-xl px-6 md:px-10 py-4">
                <h4 className="global-p1 font-bold text-[#fff] mb-1">
                  When life throws you a Curveball
                </h4>
                <p className="global-p2 font-light text-[#fff]">
                  Because We Want You To Focus On Your Recovery
                </p>
              </div>
            </>
          )}
        </div>

        {/* right form */}
        <div className='order-1 lg:order-2'>
          <CalculateForm plan={selectedPlan ?? undefined} onPlanChange={setSelectedPlan} />
        </div>
      </div>
    </div>
  )
}

export default CalculatorSection
