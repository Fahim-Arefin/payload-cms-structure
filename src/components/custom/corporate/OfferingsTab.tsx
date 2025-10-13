'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

import LifeOfferings from './LifeOfferings'
import MedicalOfferings from './MedicalOfferings'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  config: { value: string; label: string; labelBN?: string }[]
  data: any
}

function OfferingsTab({ data, config }: Props) {
  const [activeTab, setActiveTab] = useState(config[0].value)

  return (
    <div className="px-5 py-4 
           md:px-24 md:py-8
           lg:px-[130px]  lg:py-[40px] 
           xl:px-[200px]  xl:py-[60px] 
           2xl:px-[300px] 2xl:py-[80px] bg-[#FCF4EB]">
      <Tabs defaultValue={config[0].value} value={activeTab} onValueChange={setActiveTab}>
        {/* Tab Headers */}
        <div
          className="relative w-full border-b border-[#434343] md:py-[12px] bg-transparent
           md:mb-[30px] xl:mb-[40px]"
        >
          <TabsList
            className={cn(
              'w-full flex justify-between p-0',
              // hard override shadcn defaults ONLY here
              'bg-transparent rounded-none shadow-none border-0',
            )}
          >
            {config.map((tab, index) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  'global-p1 font-semibold px-2 py-2.5 md:py-[22px] lg:py-[23px] xl:py-[24px] uppercase relative flex justify-center',
                  index === 0 ? 'pl-0' : '',
                  config?.length === 2 && 'w-[45%] text-center',

                  // remove the default white active bg, hover bg, and shadows
                  'bg-transparent hover:bg-transparent data-[state=active]:bg-transparent',
                  'shadow-none data-[state=active]:shadow-none',

                  activeTab === tab.value
                    ? 'text-[#434343] after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:h-[4px] after:lg:h-[5px] after:xl:h-[6px] after:2xl:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
                    : 'text-[#434343]',
                )}
              >
                <span
                  className={
                    activeTab === tab.value
                      ? 'text-[#ED7125] text-[10px] md:text-base lg:text-[18px]'
                      : 'text-[#434343] text-[10px] md:text-base lg:text-[18px]'
                  }
                >
                  <LocalizedText en={tab?.label} bn={tab?.labelBN} />
                </span>
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
                      activeTab === 'life'
                        ? '/assets/icons/web/arrowRight.png'
                        : '/assets/icons/web/arrowLeft.png'
                    }
                    alt="arrow"
                    className="hidden lg:block w-[14px] lg:w-[16px] xl:w-[18px] 2xl:w-[22px]
                    h-[16px] lg:h-[18px] xl:h-[20x] 2xl:h-[24px]"
                  />
                  <img
                    src={
                      activeTab === 'life'
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
        {activeTab === 'life' && <LifeOfferings />}
        {activeTab === 'medical' && <MedicalOfferings />}
      </Tabs>
    </div>
  )
}

export default OfferingsTab
