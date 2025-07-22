'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import GlobalButton from './GlobalButton'
import EndowmentKeyFeature from './plans/EndowmentKeyFeature'
import EndowmentPlanEligibility from './plans/EndowmentPlanEligibility'
import { BenefitsTabSection } from '../child-education/BenefitsTabSection'
import Link from 'next/link'
import ToolTip from './ToolTip'

export function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path
        d="M4.76388 3.90426L16.4372 10.4709C16.5013 10.5073 16.5547 10.56 16.5918 10.6236C16.6289 10.6873 16.6484 10.7597 16.6484 10.8334C16.6484 10.9071 16.6289 10.9795 16.5918 11.0432C16.5547 11.1069 16.5013 11.1596 16.4372 11.1959L4.76388 17.7626C4.68904 17.8044 4.60314 17.822 4.51789 17.8132C4.43265 17.8044 4.35219 17.7695 4.2875 17.7133C4.22281 17.657 4.17703 17.5822 4.1564 17.4991C4.13577 17.4159 4.14129 17.3284 4.17221 17.2484L6.60721 10.9843C6.64489 10.8872 6.64489 10.7796 6.60721 10.6826L4.17138 4.41843C4.14028 4.33839 4.13466 4.25071 4.15529 4.16736C4.17593 4.08401 4.22181 4.00908 4.28666 3.9528C4.35151 3.89653 4.43216 3.86166 4.51758 3.85297C4.603 3.84428 4.68902 3.86219 4.76388 3.90426Z"
        fill="white"
        stroke="#3A3A3A"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Props = {
  config: {
    value: string
    label: string
  }[]
  data?: any
}

export function Tab({ config, data }: Props) {
  const [activeTab, setActiveTab] = useState(config[0].value)
  console.log(activeTab)
  return (
    <div className="container-padding">
      <Tabs
        defaultValue={config[0].value}
        value={activeTab}
        onValueChange={setActiveTab}
        className=""
      >
        <div
          className="relative w-full border-b border-[#434343] md:py-[12px]  bg-white
         md:mb-[30px] lg:mb-[50px] xl:mb-[100px]"
        >
          {/* Tabs */}
          <TabsList
            className={`w-full flex overflow-x-scroll overflow-y-hidden  md:overflow-y-visible md:overflow-x-visible ${config?.length === 2 ? ' justify-start ' : ' justify-between'} bg-transparent border-none p-0`}
          >
            {config.map((tab, index) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  'global-p1 font-medium px-2 py-2.5 md:py-6 relative flex justify-start uppercase ',
                  index === 0 ? 'text-left ' : 'text-left',
                  config?.length === 2 && 'w-[30%]',
                  activeTab === tab.value
                    ? 'text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:inset-x-0 after:bottom-0 after:h-[4px] after:md:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
                    : 'text-[#434343]',
                )}
              >
                {(() => {
                  const words = tab.label.trim().split(' ')
                  const last = words.pop()
                  return (
                    <>
                      {words.join(' ')}{' '}
                      <span
                        className={` ${activeTab === tab.value ? ' text-[#ED7125] ' : ' text-[#9C8639] '} ml-1 md:ml-2`}
                      >
                        {last}
                      </span>
                    </>
                  )
                })()}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dynamic Arrows between Tabs */}
          {config.length > 1 &&
            config.slice(1).map((_, i) => {
              const percent = ((i + 1) / config.length) * 100
              return (
                <div
                  key={`arrow-${i}`}
                  className="hidden md:block absolute -bottom-2.5 z-10"
                  style={{ left: `${percent}%`, transform: 'translateX(-50%)' }}
                >
                  <ArrowIcon />
                </div>
              )
            })}
        </div>

        {/* Tab Content */}
        {(() => {
          return (
            <>
              <TabsContent key={activeTab} value={activeTab}>
                {activeTab === 'features' && <EndowmentKeyFeature data={data['features']} />}
                {activeTab === 'eligibility' && <EndowmentPlanEligibility />}
                {activeTab === 'benefits' && <BenefitsTabSection />}
              </TabsContent>
              <div
                className="flex flex-col md:flex-row w-fit gap-2 mx-auto 
              mt-[30px] lg:mt-[50px] xl:mt-[100px]"
              >
                <Link
                  href="/assets/pdf/Required Brochures/Child Education Plan/Child Education Security Plan.pdf"
                  target="_blank"
                >
                  <GlobalButton text="Download Brochure" variant="primary" />
                </Link>
                <ToolTip>
                  <GlobalButton
                    className="cursor-not-allowed  text-[#9C8639] border-[#9C8639] hover:text-[#9C8639]"
                    text="Calculate Premium"
                    variant="outline"
                  />
                </ToolTip>
              </div>
            </>
          )
        })()}
      </Tabs>
    </div>
  )
}
