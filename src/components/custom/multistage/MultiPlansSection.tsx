import { PlanData } from '@/types'
import CirclePieChart from './CirclePieChart'
import EligibilityPlans from './EligibilityPlans'

type Props = { data?: any[]; planData: PlanData[]; bgColor?: string }

const MultiPlansSection = ({ data, planData, bgColor }: Props) => {
  return (
    <div className={`container-padding ${bgColor ? `bg-[${bgColor}]` : 'bg-white'}`}>
      <div className="flex flex-col gap-4 items-center lg:items-start">
        <h3 className="global-h3 font-semibold uppercase">
          Shanta <span className="text-[#ED7125] font-semibold">3-Stage</span> Plan
        </h3>
        <p className="global-p1">
          For those who like to plan - <span className="font-bold">Dream, Act, Achieve</span>
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
                <span>1/3 of the policy term</span>
                <span>2/3 of the policy term</span>
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

        <div className="relative w-full ">
          {/* connecting dotted line image */}
          <img
            src="/assets/lineStraight.svg"
            alt="timeline connector"
            className="absolute hidden md:block top-[20px] w-[322px] md:w-[399px] lg:w-[620px] 2xl:w-fit left-[28px] md:left-[84px] lg:left-[70px] xl:left-[208px] 2xl:left-[344px] z-0"
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

export default MultiPlansSection
