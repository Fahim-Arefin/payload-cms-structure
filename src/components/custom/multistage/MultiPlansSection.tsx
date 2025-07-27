import { PlanData } from '@/types'
import CirclePieChart from './CirclePieChart'
import EligibilityPlans from './EligibilityPlans'

type Props = { data?: any[]; planData: PlanData[]; bgColor?: string }

const MultiPlansSection = ({ data, planData, bgColor }: Props) => {
  return (
    <div className={`container-padding ${bgColor ? `bg-[${bgColor}]` : 'bg-white'}`}>
      <div className="flex flex-col gap-4 items-center lg:items-start">
        <h3 className="global-h3 font-semibold uppercase">
          Shanta <span className="text-[#ED7125] font-semibold">3 Payment</span> Plan
        </h3>
        <p className="global-p1 w-full lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
          Three life stages, three payouts, and one seamless plan- because your ambitions deserve a
          strategy, not just a policy.
        </p>
      </div>
      {/* Chart section */}
      <div className="mt-4 lg:mt-10">
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <h4 className="global-h4 uppercase font-semibold">Payout Milestones</h4>
          <div className="h-[1px] w-full bg-[#7D7D7D] mb-2 lg:mb-4" />

          <div className="w-full flex justify-center gap-6 lg:gap-28 xl:gap-40 items-center h-[300px]">
            <CirclePieChart data={data} />
            {/* Labels and Dotted Lines */}
            <div className="flex items-start gap-2 space-y-8 text-sm text-black">
              <div>
                <img src="/assets/line.png" alt="line" className="h-[180px] mt-1" />
              </div>
              <div className="flex flex-col items-start gap-6 text-[12px] md:global-p2">
                <span>25% of sum assured</span>
                <span>25% of sum assured</span>
                <span>Remaining Sum Assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* multistage timeline */}
      <div className="flex flex-col gap-4 items-center lg:items-start">
        <h4 className="global-h4 uppercase font-semibold">POLICY TERMS</h4>
        <div className="h-[1px] w-full bg-[#7D7D7D] mb-2 lg:mb-4" />

        <div className="w-full">
          {/* connecting dotted line image */}
          

          <div className="flex w-fit mx-auto gap-2 md:gap-4 lg:gap-[60px] relative">
            <div className="absolute inset-0 hidden md:block top-[20px] w-[88%] lg:w-fit md:left-[6%] lg:left-[4%]">
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

export default MultiPlansSection
