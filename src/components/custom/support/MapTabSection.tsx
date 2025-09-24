'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import SupportTabContent from './SupportTabContent'
import { TabDataType } from '@/types'
import useSSRLanguage from '@/hooks/useSSRLanguage'

type TabConfig = {
  value: string
  label: string
  labelBN?: string
}[]

type Props = {
  config: TabConfig
  data: TabDataType[]
  initialTab?: string
  bgColor?: string
}

export function MapTabSection({ config, data, initialTab, bgColor }: Props) {
  const [activeTab, setActiveTab] = useState(initialTab || config[0].value)
  const activeIndex = config.findIndex((tab) => tab.value === activeTab)

  const lang = useSSRLanguage()

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
    }
  }, [initialTab])

  return (
    <>
      <div
        className="px-5 pt-12 
           md:px-24 md:pt-[40px] 
           lg:px-[130px]  lg:pt-[50px] 
           xl:px-[200px]  xl:pt-[70px] 
           2xl:px-[300px] 2xl:pt-[100px]"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div
            className="relative w-full border-b border-[#434343] md:py-[12px] bg-white
            mb-[10px] md:mb-[10px] lg:mb-[15px] xl:mb-[20px]"
          >
            <TabsList
              className={cn(
                'w-full flex md:overflow-x-visible bg-transparent border-none p-0 ',
                config.length === 2
                  ? 'justify-start space-x-[5%] md:space-x-[15%] lg:space-x-[25%]'
                  : 'justify-between',
              )}
            >
              {config.map((tab, index) => {
                // Pick localized label
                const label = lang === 'bn' ? tab.labelBN || tab.label : tab.label
                // Highlight last word
                const words = label.trim().split(' ')
                const last = words.pop()

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      'global-p1 font-medium px-2 py-2.5 md:py-6 relative flex justify-start uppercase',
                      index === 0 ? 'text-left pl-0' : 'text-left',
                      activeTab === tab.value
                        ? 'text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:border-none after:inset-x-0 after:bottom-0 after:h-[4px] after:md:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
                        : 'text-[#434343]',
                    )}
                  >
                    {words.join(' ')}{' '}
                    <span
                      className={cn(
                        activeTab === tab.value ? 'text-[#ED7125]' : 'text-[#9C8639]',
                        'ml-1 md:ml-2',
                      )}
                    >
                      {last}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>
        </Tabs>
      </div>
      {/* TabsContent outside of Tabs */}
      {activeTab === 'branches' ? (
        <SupportTabContent data={data} activeTab="branches" bgColor={bgColor} />
      ) : (
        <SupportTabContent data={data} activeTab="hospitals" bgColor={bgColor} />
      )}
    </>
  )
}
