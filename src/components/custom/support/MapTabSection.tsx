'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import MapSection from './MapSection'

type TabConfig = {
  value: string
  label: string
}[]

type TabData = {
  content: {
    office_location: string
    office_address: string
    office_email: string
    office_phone: string
  }
}[]

type Props = {
  config: TabConfig
  data: TabData
}

export function MapTabSection({ config, data }: Props) {
  const [activeTab, setActiveTab] = useState(config[0].value)
  const activeIndex = config.findIndex((tab) => tab.value === activeTab)

  return (
    <>
      <div
        className="px-5 pt-12 
           md:px-24 md:pt-24 
           lg:px-[130px]  lg:pt-[110px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[150px]"
      >
        <Tabs defaultValue={config[0].value} value={activeTab} onValueChange={setActiveTab}>
          <div
            className="relative w-full border-b border-[#434343] md:py-[12px] bg-white
            mb-[16px] md:mb-[20px] lg:mb-[40px] xl:mb-[70px]"
          >
            <TabsList
              className={cn(
                'w-full flex md:overflow-x-visible bg-transparent border-none p-0 ',
                config.length === 2
                  ? 'justify-start space-x-[5%] md:space-x-[15%] lg:space-x-[25%]'
                  : 'justify-between',
              )}
            >
              {config.map((tab, index) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    'global-p1 font-medium px-2 py-2.5 md:py-6 relative flex justify-start uppercase',
                    index === 0 ? 'text-left pl-0' : 'text-left',
                    // config.length === 2 && 'w-[30%]',
                    activeTab === tab.value
                      ? 'text-[#434343] after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:h-[4px] after:md:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
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
                          className={cn(
                            activeTab === tab.value ? 'text-[#ED7125]' : 'text-[#9C8639]',
                            'ml-1 md:ml-2',
                          )}
                        >
                          {last}
                        </span>
                      </>
                    )
                  })()}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>
      {/* TabsContent outside of Tabs */}
      {activeTab === 'branches' ? (
        <div>
          <div
            className="px-5
            pb-[16px]
           md:px-24 md:pb-[0px] 
           lg:px-[130px]  lg:pb-[50px] 
           xl:px-[200px]  xl:pb-[50px] 
           2xl:px-[300px] 2xl:pb-[50px]
           mb-6 lg:mb-0
            "
          >
            <h1 className="global-h3 w-[75%] lg:w-full font-semibold lg:font-normal mb-[16px] md:mb-[20px] lg:mb-[30px] xl:mb-[60px]">
              Come and visit us at any of our branches. We are here to assist you.
            </h1>

            <Select>
              <SelectTrigger className="w-[70%] md:w-[300px] bg-white text-[#6B6565] h-[40px] md:h-[45px] lg:h-[50px]">
                <SelectValue placeholder="Select a Branch Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dhaka">Shanta Western Tower, Dhaka</SelectItem>
                <SelectItem value="ctg">Agrabad Commercial Area, Chattogram</SelectItem>
                <SelectItem value="khulna">KDA Avenue, Khulna</SelectItem>
                <SelectItem value="rajshahi">Upashahar, Rajshahi</SelectItem>
                <SelectItem value="sylhet">Zindabazar, Sylhet</SelectItem>
                {/* Add more as needed */}
              </SelectContent>
            </Select>
          </div>
          <MapSection data={data[0]} />
        </div>
      ) : (
        <div className="text-center py-16 text-[#434343] font-medium text-lg">
          Panel Hospital information will be available soon.
        </div>
      )}
    </>
  )
}
