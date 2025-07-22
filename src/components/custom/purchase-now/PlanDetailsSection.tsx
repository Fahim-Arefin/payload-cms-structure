import React, { FC } from 'react'
import CirclePieChart from '../multistage/CirclePieChart'

type PlanDetailsSectionProps = {
  planCode: number
  plans: { text: string; videoLink: string; code: number }[]
}

const PlanDetailsSection: FC<PlanDetailsSectionProps> = ({ planCode }) => {
  const keyFeatures = {
    1: [
      'Maturity Benefit',
      'Monthly Stipend',
      'Tax Benefits',
      'Flexible Premium Payments',
      'Customisable Coverage',
      'Healthcare Partner Discounts',
    ],
    2: [
      'Maturity Benefit',
      'Life Coverage',
      'Tax Benefits',
      'Flexible Premium Payments',
      'Healthcare Partner Discounts',
    ],
  }

  if (planCode === 3) {
    const threeStageData = [
      { name: '1/3 of the policy term', value: 25 },
      { name: '2/3 of the policy term', value: 25 },
      { name: 'Remaining Sum Assured', value: 50 },
    ]
    return (
      <div className="w-full flex flex-col gap-6 md:gap-8 items-center lg:items-start mb-6">
        <h3 className="global-h3 font-semibold uppercase text-center lg:text-left">
          Shanta <span className="text-[#ED7125]">3-Stage</span> Plan
        </h3>
        <div className="w-full flex flex-col items-center lg:items-start gap-4">
          <h4 className="global-h4 uppercase font-semibold">Payout Milestones</h4>
          <div className="h-[1px] w-full bg-[#7D7D7D]" />
          <div className="w-full flex justify-center flex-col md:flex-row gap-4 md:gap-4 xl:gap-16">
            <CirclePieChart data={threeStageData} />
            <div className="flex items-center gap-2 mt-6 md:mt-0">
              <div>
                <img src="/assets/line.png" alt="line" className="h-[120px] md:h-[180px] mt-1" />
              </div>
              <div className="flex flex-col justify-center items-start gap-6 text-[12px] md:global-p2">
                <span>1/3 of the policy term - (25%)</span>
                <span>2/3 of the policy term - (25%)</span>
                <span>Remaining Sum Assured - (50%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 4-Stage Plan
  if (planCode === 4) {
    const fourStageData = [
      { name: '1st Stage', value: 15 },
      { name: '2nd Stage', value: 15 },
      { name: '3rd Stage', value: 15 },
      { name: 'Final maturity', value: 55 },
    ]
    return (
      <div className="w-full flex flex-col gap-6 md:gap-8 items-center lg:items-start mb-6">
        <h3 className="global-h3 font-semibold uppercase text-center lg:text-left">
          Shanta <span className="text-[#ED7125]">4-Stage</span> Plan
        </h3>
        <div className="w-full flex flex-col items-center lg:items-start gap-4">
          <h4 className="global-h4 uppercase font-semibold">Payout Milestones</h4>
          <div className="h-[1px] w-full bg-[#7D7D7D]" />
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-4 xl:gap-16">
            <CirclePieChart data={fourStageData} />
            <div className="flex flex-row items-center gap-4 md:gap-6">
              <img src="/assets/line.png" alt="line" className="h-[120px] md:h-[180px] mt-1" />
              <div className="flex flex-col items-start gap-6 text-[12px] xl:global-p2">
                <span>1st Stage - (15%)</span>
                <span>2nd Stage - (15%)</span>
                <span>3rd Stage - (15%)</span>
                <span>Final Maturity - (55%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Key features for 1 or 2
  if (planCode === 1 || planCode === 2) {
    const features = keyFeatures[planCode]
    return (
      <div className="w-full flex flex-col items-center lg:items-start gap-6 mb-6">
        <h3 className="global-h3 font-semibold uppercase text-center lg:text-left">
          {planCode === 1 ? 'Shanta Child Education Plan' : 'Shanta Endowment Plan'}
        </h3>
        {/* Key Features Header */}
        <h4 className="global-h3 font-semibold text-[#ED7125] mb-1">Key Features</h4>
        <div className="w-full flex flex-wrap justify-center lg:justify-start gap-3 md:gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-2 bg-white/80 shadow rounded-md px-3 py-2 min-w-[200px] max-w-full text-[13px] md:text-base"
            >
              <span className="text-[#ED7125] mt-[2px]">•</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // fallback
  return null
}

export default PlanDetailsSection
