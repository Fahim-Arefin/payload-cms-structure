'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'
import { FaCircle } from 'react-icons/fa'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'
import { TbAlertCircleFilled } from 'react-icons/tb'

const pieData = [
  { name: '15% - ¼', value: 10, color: '#ED7125' },
  { name: '15% - ¾', value: 35, color: '#254525' },
  { name: 'Final 55%', value: 55, color: '#583382' },
]

export default function PremiumBreakdown() {
  return (
    <div className="w-full space-y-10">
      {/* ===== LIVING BENEFITS ===== */}
      <div>
        <h3 className="global-h3 font-bold text-[#1D3C1E] mb-2">Living Benefits:</h3>
        <div className="border-t border-black mb-6" />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full 2xl:w-[300px]">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
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
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                  <Label value="" position="center" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-sm text-[#3A3A3C] grid grid-cols-[1.2fr,0.8fr] gap-2">
            {/* 15% + 55% Section with Line Image */}
            <div className="flex items-start gap-4">
              {/* vertical image line */}
              <img src="/assets/straightLine.png" alt="line" className="w-[10px] h-[150px] mt-1" />

              {/* label block */}
              <div className="space-y-8">
                {/* 15% label */}
                <div className="flex gap-2 items-start">
                  <FaCircle size={10} color="#F79646" className="mt-[6px]" />
                  <div>
                    <p className="font-semibold">15% of the Face Amount paid at the end of:</p>
                    <ul className="ml-2 space-y-1 text-xs">
                      <li className="before:content-['--'] before:mr-1">¼ of the policy term</li>
                      <li className="before:content-['--'] before:mr-1">½ of the policy term</li>
                      <li className="before:content-['--'] before:mr-1">¾ of the policy</li>
                    </ul>
                  </div>
                </div>

                {/* 55% label */}
                <div className="flex gap-2 ">
                  <FaCircle size={8} color="#4F6228" className="mt-[6px]" />
                  <div>
                    <p className="font-semibold">Final 55% paid at full maturity!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Death Coverage Section */}
            <div className="flex gap-2">
              {/* line image again */}
              <img src="/assets/straightLine.png" alt="line" className="w-[10px] h-[150px] mt-1" />

              {/* label */}
              <div className="space-y-1">
                <ul className="list-disc list-inside ml-2">
                  <li>Death Coverage</li>
                  <li className="">
                    100% of the Face Amount- regardless of any partial maturity benefits
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PREMIUM TABLE ===== */}
      <div>
        <h1 className="global-h3 font-semibold text-[#3A3A3C]">
          Your <span className="text-[#ED7125]">Premium</span>
        </h1>
        <div className="h-[2px] w-full mt-1 bg-[#ED7125] mb-6" />
        <div className="p-4 grid grid-cols-3 text-center items-center">
          <div className="">
            <p className="global-p2 text-[#3A3A3C]">Monthly</p>
            <p className="font-bold global-p1">10,000.00</p>
          </div>
          <div className="border-r-2 border-l-2 border-l-[#88888880] border-r-[#88888880]">
            <p className="global-p1 text-[#ED7125]">Quarterly</p>
            <p className="font-bold global-h3 text-[#ED7125]">20,000.00</p>
          </div>
          <div>
            <p className="global-p2 text-[#3A3A3C]">Yearly</p>
            <p className="font-bold global-p1">1,00,000.00</p>
          </div>
        </div>
      </div>

      {/* ===== ADDITIONAL COVERAGE ===== */}
      <div>
        <h4 className="global-p2 font-semibold text-[#3A3A3C] mb-2">Additional Coverage:</h4>
        <div className="border-t border-black mb-2" />

        <Accordion type="multiple" className="space-y-3">
          <AccordionItem value="ci">
            <AccordionTrigger className="text-sm no-underline [&>svg]:hidden hover:no-underline hover:bg-transparent px-0">
              <div className="flex items-center gap-2">
                <CiSquarePlus className="text-[#9C8639]" size={20} />
                <img className="w-5 h-5" src="/assets/hospital-bed.png" />
                <span className="text-[12px] font-light text-[#434343]">
                  Add <span className="font-bold">255</span> taka to cover{' '}
                  <u className="">
                    <span className="font-bold">25</span> critical illness
                  </u>
                  .
                </span>
                <TbAlertCircleFilled color="#ED7125" className="text-white" size={20} />
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground pl-6">
              Covers 25 major critical illnesses such as cancer, stroke, heart disease, organ
              failure, etc. Offers lump sum payout upon diagnosis.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="accident">
            <AccordionTrigger className="text-sm no-underline [&>svg]:hidden hover:no-underline hover:bg-transparent px-0">
              <div className="flex items-center gap-2">
                <CiSquareMinus className="text-[#9C8639]" size={20} />
                <img className="w-5 h-5" src="/assets/hospital.png" />
                <span className="text-[12px] font-light text-[#434343]">
                  Add <span className="font-bold">1000</span> taka for{' '}
                  <u className="">accidental coverage</u>.
                </span>
                <TbAlertCircleFilled color="#ED7125" className="text-white" size={20} />
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground pl-6">
              Covers accidental death and disability, with added payout benefits in case of
              permanent injuries or hospitalization due to accidents.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
