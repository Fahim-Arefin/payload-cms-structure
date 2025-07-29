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
    <div className="container-padding">
      <div className="flex flex-col gap-4 items-center lg:items-start">
        <h3 className="global-h3 font-semibold uppercase">
          Shanta <span className="text-[#ED7125] font-semibold">4 Payment</span> Plan
        </h3>
        <p className="global-p1 w-full lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
          A strategic 4-stage plan crafted to build, elevate, preserve, and transition your
          wealth—flawlessly.
        </p>
      </div>
      {/* Chart section */}
      <div className="mt-4 lg:mt-10 ">
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <h4 className="global-h4 uppercase font-semibold">Payout Milestones</h4>
          <div className="h-[1px] w-full bg-[#7D7D7D] mb-2 lg:mb-4 " />

          <div className="w-full flex justify-center gap-6 items-center">
            <div className="flex items-start gap-2 space-y-8 text-sm text-black">
              <div className="flex flex-col items-start gap-6 text-[12px] md:global-p2">
                <span>1st Stage - 15% of sum assured</span>
                <span>2nd Stage - 15% of sum assured</span>
                <span>3rd Stage - 15% of sum assured</span>
                <span>Final Maturity</span>
              </div>
            </div>
            <div>
              <img src="/assets/line.png" alt="line" className="max-h-[180px] mt-1 mr-10" />
            </div>
            <div className="lg:ml-10">
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

        <div className="w-full">
          {/* connecting dotted line image */}

          <div className="flex w-fit mx-auto gap-2 md:gap-4 lg:gap-[60px] relative">
            <div className="absolute inset-0 hidden md:block top-[20px] md:w-[85%] lg:w-[90%] md:left-[7%] lg:left-[5%]">
              <img
                src="/assets/lineStraight.svg"
                alt="timeline connector"
                className="w-full h-auto"
              />
            </div>
            {planData.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center space-y-2 relative z-10">
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
