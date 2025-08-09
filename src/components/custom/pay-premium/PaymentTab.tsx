'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { BenefitsTabSection } from '../child-education/BenefitsTabSection'
import Link from 'next/link'
import EndowmentKeyFeature from '../shared/plans/EndowmentKeyFeature'
import EndowmentPlanEligibility from '../shared/plans/EndowmentPlanEligibility'
import GlobalButton from '../shared/GlobalButton'
import ToolTip from '../shared/ToolTip'
import BkashSection from './BkashSection'
import RocketSection from './RocketSection'

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

type PaymentItem = {
  descriptionContent: string
}

type PaymentData = {
  item: PaymentItem[]
}

type Props = {
  config: {
    value: string
    label: string
  }[]
  data?: PaymentData
  rocketData?: PaymentData
}

export default function PaymentTab({ config, data, rocketData }: Props) {
  const [activeTab, setActiveTab] = useState('bkash')

  return (
    <div
      className="px-5 py-12 
           md:p-24 
           lg:px-[130px]  lg:py-[110px] 
           xl:px-[200px]  xl:py-[100px] 
           2xl:px-[300px] 2xl:py-[100px] bg-[#FCF4EB] "
    >
      <div className="lg:hidden mb-12">
        <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium ">
          Payment With{' '}
          <span className="global-h1 uppercase text-[#ED7125] font-medium">Bkash & Rocket</span>
        </h1>
      </div>
      <div className="hidden lg:flex mb-12 lg:w-[49%] 2xl:w-[48%] ml-auto">
        <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium ">
          Payment With{' '}
          <span className="global-h1 uppercase text-[#ED7125] font-medium">Bkash & Rocket</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 xl:gap-9 2xl:gap-16 ">
        {/* Left - Single Static Image */}
        {/* lg:mt-28 xl:mt-44 2xl:mt-36 */}
        {/* h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] */}

        {/* mbile */}
        <div
          className="lg:hidden relative w-full  
            lg:mt-[100px]
            h-[300px] md:h-[400px] lg:h-auto
            rounded-[8px] md:rounded-[10px] lg:rounded-[8px] xl:rounded-[12px] 
            bg-no-repeat bg-center
            bg-contain
            order-1 flex-shrink-0"
          style={{ backgroundImage: `url(/assets/paypremium/mobile/bkash-roket.png)` }}
          role="img"
          aria-label="Background image"
        ></div>
        {/* large */}
        <div
          className="hidden lg:block relative w-full  
            lg:mt-[100px]
            h-[300px] md:h-[400px] lg:h-auto
            rounded-[8px] md:rounded-[10px] lg:rounded-[8px] xl:rounded-[12px] 
            bg-no-repeat bg-center
            bg-contain
            order-1 flex-shrink-0"
          style={{ backgroundImage: `url(/assets/paypremium/web/bkash-roket.png)` }}
          role="img"
          aria-label="Background image"
        ></div>

        {/* Right - Tabbed Content */}
        <div className="flex flex-col mt-10 lg:mt-0 order-2">
          {/* Title */}
          {/* <div className="hidden lg:block lg:mb-6 2xl:mb-12">
            <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
              Payment Using{' '}
              <span className="global-h1 uppercase text-[#ED7125] font-medium">bKash & Rocket</span>
            </h1>
          </div> */}

          {/* <div className="lg:hidden mb-6">
            <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
              Payment Using{' '}
              <span className="global-h1 uppercase text-[#ED7125] font-medium">bKash & Rocket</span>
            </h1>
          </div> */}

          {/* Tabs */}
          <Tabs
            defaultValue="bkash"
            value={activeTab}
            onValueChange={setActiveTab}
            className="bg-[#FCF4EB] "
          >
            <div
              className="relative w-full border-b border-[#434343] md:py-[12px] bg-[#FCF4EB]
             mb-[16px] md:mb-[20px] lg:mb-[30px]"
            >
              <TabsList className="w-full flex justify-between bg-[#FCF4EB]  p-0 ">
                <TabsTrigger
                  value="bkash"
                  // className={cn(
                  //   'global-p1 font-medium px-2 py-2.5 md:py-[16px] uppercase relative flex justify-center pl-0 bg-transparent data-[state=active]:bg-transparent',
                  //   'w-[40%] text-center',
                  //   activeTab === 'bkash'
                  //     ? 'text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:border-none after:inset-x-0 after:bottom-0 after:h-[4px] after:lg:h-[5px] after:xl:h-[6px] after:2xl:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
                  //     : 'text-[#434343]',
                  // )}
                  className={cn(
                    'global-p1 font-semibold px-2 py-2.5 md:py-[22px] lg:py-[23px] xl:py-[24px] uppercase relative flex justify-center pl-0 data-[state=active]:bg-transparent',
                    config?.length === 2 && 'w-[45%] text-center',
                    activeTab === 'bkash'
                      ? ' text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:border-none after:inset-x-0 after:bottom-0 after:h-[4px] after:lg:h-[5px] after:xl:h-[6px] after:2xl:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
                      : 'text-[#434343]',
                  )}
                >
                  <span className={activeTab === 'bkash' ? 'text-[#ED7125]' : 'text-[#9C8639]'}>
                    bKash
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="rocket"
                  // className={cn(
                  //   'global-p1 font-medium px-2 py-2.5 md:py-[16px] uppercase relative flex justify-center bg-transparent data-[state=active]:bg-transparent',
                  //   'w-[40%] text-center',
                  //   activeTab === 'rocket'
                  //     ? 'text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:border-none after:inset-x-0 after:bottom-0 after:h-[4px] after:lg:h-[5px] after:xl:h-[6px] after:2xl:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
                  //     : 'text-[#434343]',
                  // )}
                  className={cn(
                    'global-p1 font-semibold px-2 py-2.5 md:py-[22px] lg:py-[23px] xl:py-[24px] uppercase relative flex justify-center data-[state=active]:bg-transparent',
                    config?.length === 2 && 'w-[45%] text-center',
                    activeTab === 'rocket'
                      ? 'text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:border-none after:inset-x-0 after:bottom-0 after:h-[4px] after:lg:h-[5px] after:xl:h-[6px] after:2xl:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
                      : 'text-[#434343]',
                  )}
                >
                  <span className={activeTab === 'rocket' ? 'text-[#ED7125]' : 'text-[#9C8639]'}>
                    Rocket
                  </span>
                </TabsTrigger>
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
                          activeTab === 'bkash'
                            ? '/assets/icons/web/arrowRight.png'
                            : '/assets/icons/web/arrowLeft.png'
                        }
                        alt="arrow"
                        className="hidden lg:block w-[14px] lg:w-[16px] xl:w-[18px] 2xl:w-[22px]
                    h-[16px] lg:h-[18px] xl:h-[20x] 2xl:h-[24px]"
                      />
                      <img
                        src={
                          activeTab === 'rocket'
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
            <TabsContent value="bkash" className="space-y-4 lg:space-y-4 xl:space-y-7">
              {data?.item?.map((eachItem, i) => (
                <div
                  key={i}
                  className="flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
                  space-x-2 lg:space-x-1 xl:space-x-2.5 2xl:space-x-4
                  p-1 md:px-4 md:py-1.5 lg:px-1 lg:py-2 xl:p-2.5 2xl:p-4 
                  rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
                >
                  <div className="text-[12px] md:text-[14px] lg:text-[12px] xl:text-[16px] 2xl:text-[15px] text-[#434343]">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: eachItem?.descriptionContent,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="rocket" className="space-y-4 lg:space-y-4 xl:space-y-7">
              {rocketData?.item?.map((eachItem, i) => (
                <div
                  key={i}
                  className="flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
                  space-x-2 lg:space-x-1 xl:space-x-2.5 2xl:space-x-4
                  p-1 md:px-4 md:py-1.5 lg:px-1 lg:py-2 xl:p-2.5 2xl:p-4 
                  rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
                >
                  <div className="text-[12px] md:text-[14px] lg:text-[12px] xl:text-[16px] 2xl:text-[15px] text-[#434343]">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: eachItem?.descriptionContent,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
