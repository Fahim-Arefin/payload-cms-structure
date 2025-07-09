import React, { FC } from 'react'
import CirclePieChart from './CirclePieChart'
import EligibilityPlans from './EligibilityPlans'

type FourStagePlanProps = {}

const fourStageData = [
  { name: '1st Stage', value: 15 },
  { name: '2nd Stage', value: 15 },
  { name: '3rd Stage', value: 15 },
  { name: 'Final maturity', value: 55 },
]

const planData = [
  { image: '/assets/time.png', timeline: '12 YEARS' },
  { image: '/assets/time.png', timeline: '16 YEARS' },
  { image: '/assets/time.png', timeline: '20 YEARS' },
  { image: '/assets/time.png', timeline: '24 YEARS' },
  { image: '/assets/time.png', timeline: '28 YEARS' },
]

const FourStagePlan: FC<FourStagePlanProps> = ({}) => {
  return (
    <div className="container-padding bg-[#F6EDDD]">
      <div className="flex flex-col gap-4 items-center lg:items-start">
        <h3 className="global-h3 font-semibold uppercase">
          Shanta <span className="text-[#ED7125] font-semibold">4-Stage</span> Plan
        </h3>
        <p className="global-p1">Because life doesn’t wait. Celebrate every quarter.</p>
      </div>
      {/* Chart section */}
      <div className="mt-4 lg:mt-10 ">
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <h4 className="global-h4 uppercase font-semibold">Payout Milestones</h4>
          <div className="h-[1px] w-full bg-[#7D7D7D] mb-2 lg:mb-4 " />

          <div className="w-full flex justify-center gap-6 items-center">
            <div className="flex items-start gap-2 space-y-8 text-sm text-black">
              <div className="flex flex-col items-start gap-6 text-[12px] md:global-p2">
                <span>1st Stage</span>
                <span>2nd Stage</span>
                <span>3rd Stage</span>
                <span>Final Maturity</span>
              </div>
            </div>
            <div>
              <img src="/assets/line.png" alt="line" className="max-h-[180px] mt-1 mr-10" />
            </div>
            <div className="ml-10">
              <CirclePieChart data={fourStageData} />
            </div>
            {/* Labels and Dotted Lines */}
          </div>
        </div>
      </div>

      {/* multistage timeline */}
      <div className="flex flex-col gap-4 items-center lg:items-start mt-10">
        <h4 className="global-h4 uppercase font-semibold">POLICY TERMS</h4>
        <div className="h-[1px] w-full bg-[#7D7D7D] mb-2 lg:mb-4" />

        <div className="relative w-full ">
          {/* connecting dotted line image */}
          <img
            src="/assets/lineStraight.svg"
            alt="timeline connector"
            className="absolute hidden md:block top-[20px] w-[322px] md:w-[320px] lg:w-[490px] left-[28px] md:left-[132px] xl:left-[270px] 2xl:left-[406px] z-0"
          />

          <div className="flex justify-center gap-2 md:gap-4 lg:gap-[59px] relative z-10">
            {planData.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <img
                  src={item.image}
                  alt={`term-${item.timeline}`}
                  className="w-[38px] h-[46px] md:w-[50px] md:h-[50px]"
                />
                <p className="text-sm text-center font-medium text-[#434343]">{item.timeline}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* finishing touch */}
      <div>
        <EligibilityPlans />
      </div>
    </div>
  )
}

export default FourStagePlan
