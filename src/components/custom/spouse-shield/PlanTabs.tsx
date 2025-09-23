'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import SpousePlanTabSection from './SpousePlanTabSection'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  config: {
    value: string
    label: string
    labelBN?: string
  }[]
  data: any
}

export function PlanTabs({ config, data }: Props) {
  const [activeTab, setActiveTab] = useState(config[1].value)
  console.log(activeTab)

  return (
    <div
      className="  px-5 py-12 
           md:p-24 
           lg:px-[100px]  lg:py-[100px] 
           xl:px-[200px]  xl:py-[100px] 
           2xl:px-[300px] 2xl:py-[150px]"
    >
      <div
        className="flex 
        space-x-1 lg:space-x-2 xl:space-x-3 2xl:space-x-4 
      mb-4 md:mb-6 lg:mb-8 xl:mb-12 2xl:mb-16"
      >
        <h1 className="global-h1 font-medium">
          <LocalizedText en={data?.title} bn={data?.titleBN}/>
        </h1>
        <h1 className="global-h1 text-[#ED7125] font-medium">
          <LocalizedText en={data?.coloredTitle} bn={data?.coloredTitleBN}/>
        </h1>
      </div>
      <Tabs defaultValue={config[1].value} value={activeTab} onValueChange={setActiveTab}>
        {/* Tab Headers */}
        <div
          className="relative w-full border-b border-[#434343] md:py-[12px] bg-white
         md:mb-[30px] lg:mb-[50px] xl:mb-[80px]"
        >
          <TabsList className={`w-full flex justify-between bg-transparent  p-0 `}>
            {config.map((tab, index) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  'global-p1 font-semibold px-2 py-2.5 md:py-[22px] lg:py-[23px] xl:py-[24px] uppercase relative flex justify-center',
                  index === 0 ? 'pl-0' : '',
                  config?.length === 2 && 'w-[45%] text-center',
                  activeTab === tab.value
                    ? 'text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:border-none after:inset-x-0 after:bottom-0 after:h-[4px] after:lg:h-[5px] after:xl:h-[6px] after:2xl:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
                    : 'text-[#434343]',
                )}
              >
                {
                  <span
                    className={` ${activeTab === tab.value ? ' text-[#ED7125] ' : ' text-[#434343] '}`}
                  >
                    
                    <LocalizedText en={tab.label} bn={tab.labelBN}/>
                  </span>
                }
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dynamic Arrows */}
          {config.length > 1 &&
            config.slice(1).map((_, i) => {
              const percent = ((i + 1) / config.length) * 100
              return (
                <div
                  key={`arrow-${i}`}
                  className="hidden md:block absolute md:-bottom-[8px] lg:-bottom-[9px] xl:-bottom-[9px] 2xl:-bottom-[12px] z-10"
                  style={{ left: `${percent}%`, transform: 'translateX(-60%)' }}
                >
                  <img
                    src={
                      activeTab === 'planA'
                        ? '/assets/icons/web/arrowRight.png'
                        : '/assets/icons/web/arrowLeft.png'
                    }
                    alt="arrow"
                    className="hidden lg:block w-[14px] lg:w-[16px] xl:w-[18px] 2xl:w-[22px]
                    h-[16px] lg:h-[18px] xl:h-[20x] 2xl:h-[24px]"
                  />
                  <img
                    src={
                      activeTab === 'planB'
                        ? '/assets/icons/mobile/arrowRight.png'
                        : '/assets/icons/mobile/arrowLeft.png'
                    }
                    alt="arrow"
                    className="lg:hidden w-[14px] lg:w-[16px] xl:w-[18px] 2xl:w-[22px]
                    h-[16px] lg:h-[18px] xl:h-[20x] 2xl:h-[24px]"
                  />
                </div>
              )
            })}
        </div>

        {/* Tab Content */}
        {activeTab === 'planA' && <SpousePlanTabSection data={data?.planA} />}
        {activeTab === 'planB' && (
          <SpousePlanTabSection data={data?.planB} />
        )}
      </Tabs>
    </div>
  )
}
