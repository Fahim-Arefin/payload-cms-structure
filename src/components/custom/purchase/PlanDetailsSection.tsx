import React, { FC } from 'react'
import CirclePieChart from '../multistage/CirclePieChart'
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { FaCircle } from 'react-icons/fa'

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
      { name: '1/3 of the policy term', value: 25, color: '#ED7125' },
      { name: '2/3 of the policy term', value: 25, color: '#254525' },
      { name: 'Remaining Sum Assured', value: 50, color: '#583382' },
    ]
    return (
      <div className="w-full flex flex-col gap-6 md:gap-8 items-start mb-6 mt-4 lg:mt-0">
        <h3 className="global-h3 font-semibold uppercase text-left">
          Shanta <span className="text-[#ED7125]">3-Stage</span> Plan
        </h3>
        <div className="w-full flex flex-col items-start gap-4">
          <div className="w-full">
            <h4 className="global-h3 lg:global-h4 font-semibold mb-2">Living Benefits:</h4>
            <div className="h-[1px] w-full bg-[#7D7D7D]" />
          </div>
          <div className="w-full flex justify-center items-center flex-row gap-4 2xl:gap-10">
            <div className="">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={threeStageData}
                    dataKey="value"
                    labelLine
                    innerRadius={35}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={5}
                    activeShape={{ scale: 1.1 }}
                    stroke="white"
                  >
                    {threeStageData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color || ['#ED7125', '#4745B0', '#6AD8C9'][index % 3]}
                      />
                    ))}
                    <Label value="" position="center" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-6 md:mt-0">
              <div>
                <img src="/assets/line.png" alt="line1" className="h-[150px] md:h-[180px] mt-1" />
              </div>
              <div className="flex flex-col justify-center items-start gap-6 text-[12px] md:global-p2">
                <div className="flex gap-2 items-center">
                  <FaCircle size={10} color="#F79646" className="" />
                  <span>1/3 of the policy term - (25% of sum assured)</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaCircle size={10} color="#254525" className="" />
                  <span>2/3 of the policy term - (25% of sum assured)</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaCircle size={10} color="#583382" className="" />
                  <span>Remaining Sum Assured - (50% of sum assured)</span>
                </div>
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
      { name: '1st Stage', value: 15, color: '#ED7125' },
      { name: '2nd Stage', value: 15, color: '#7F2D23' },
      { name: '3rd Stage', value: 15, color: '#254525' },
      { name: 'Final maturity', value: 55, color: '#583382' },
    ]
    return (
      <div className="w-full flex flex-col gap-6 md:gap-8 items-start mb-6 mt-4 lg:mt-0">
        <h3 className="global-h3 font-semibold uppercase text-left">
          Shanta <span className="text-[#ED7125]">4-Stage</span> Plan
        </h3>
        <div className="w-full flex flex-col items-start gap-4">
          <div className="w-full">
            <h4 className="global-h3 lg:global-h4 font-semibold mb-2">Living Benefits:</h4>
            <div className="h-[1px] w-full bg-[#7D7D7D]" />
          </div>
          <div className="w-full flex justify-center items-center gap-4 2xl:gap-10">
            <div className="">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={fourStageData}
                    dataKey="value"
                    labelLine
                    innerRadius={35}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={5}
                    activeShape={{ scale: 1.1 }}
                    stroke="white"
                  >
                    {fourStageData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color || ['#ED7125', '#4745B0', '#6AD8C9'][index % 3]}
                      />
                    ))}
                    <Label value="" position="center" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-6 md:mt-0">
              <div>
                <img src="/assets/line.png" alt="line" className="h-[150px] md:h-[180px] mt-1" />
              </div>
              <div className="flex flex-col justify-center items-start gap-6 text-[12px] md:global-p2">
                <div className="flex gap-2 items-center">
                  <FaCircle size={10} color="#F79646" className="" />
                  <span>1st Stage - (15% of sum assured)</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaCircle size={10} color="#7F2D23" className="" />
                  <span>2nd Stage - (15% of sum assured)</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaCircle size={10} color="#254525" className="" />
                  <span>3rd Stage - (15% of sum assured)</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaCircle size={10} color="#583382" className="" />
                  <span>Final Maturity - (55% of sum assured)</span>
                </div>
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
      <div className="w-full flex flex-col items-start gap-6 mb-6">
        <h3 className="global-h3 font-semibold uppercase text-left">
          {planCode === 1 ? 'Shanta Child Education Plan' : 'Shanta Endowment Plan'}
        </h3>
        {/* Key Features Header */}
        <h4 className="global-h3 font-semibold text-[#ED7125] mb-1">Key Features:</h4>
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 justify-center lg:justify-start gap-3 md:gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-2 bg-white/80 shadow rounded-md px-3 py-2 text-[12px] md:text-base"
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
