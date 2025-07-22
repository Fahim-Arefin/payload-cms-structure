'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { CorporateClaim } from './CorporateClaim'
import { IndividualClaim } from './IndividualClaim'

export function ArrowIconLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
      <path
        d="M15.5801 1.56897L1.48553 9.47103C1.40811 9.51476 1.34367 9.57825 1.29879 9.65501C1.25391 9.73178 1.2302 9.81907 1.23007 9.908C1.22994 9.99692 1.2534 10.0843 1.29806 10.1612C1.34272 10.2381 1.40698 10.3017 1.48427 10.3457L15.5561 18.2883C15.6463 18.3388 15.7499 18.3603 15.8528 18.3498C15.9556 18.3393 16.0528 18.2973 16.1309 18.2296C16.209 18.1619 16.2644 18.0717 16.2894 17.9714C16.3145 17.8711 16.308 17.7655 16.2708 17.669L13.344 10.1074C13.2987 9.99027 13.2989 9.86044 13.3445 9.74345L16.2941 2.19031C16.3317 2.09381 16.3387 1.98803 16.3139 1.88745C16.2892 1.78686 16.2339 1.69637 16.1558 1.62837C16.0777 1.56036 15.9804 1.51815 15.8774 1.50752C15.7743 1.49689 15.6705 1.51835 15.5801 1.56897Z"
        fill="white"
        stroke="#3A3A3A"
        strokeWidth="1.50806"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function ArrowIconRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
      <path
        d="M1.85735 1.56897L15.952 9.47103C16.0294 9.51476 16.0938 9.57825 16.1387 9.65501C16.1836 9.73178 16.2073 9.81907 16.2074 9.908C16.2076 9.99692 16.1841 10.0843 16.1394 10.1612C16.0948 10.2381 16.0305 10.3017 15.9532 10.3457L1.8814 18.2883C1.79119 18.3388 1.68759 18.3603 1.58473 18.3498C1.48187 18.3393 1.38474 18.2973 1.3066 18.2296C1.22846 18.1619 1.1731 18.0717 1.14806 17.9714C1.12302 17.8711 1.12953 17.7655 1.1667 17.669L4.09352 10.1074C4.13881 9.99027 4.13862 9.86044 4.09299 9.74345L1.14343 2.19031C1.10576 2.09381 1.09883 1.98803 1.12358 1.88745C1.14834 1.78686 1.20356 1.69637 1.2817 1.62837C1.35984 1.56036 1.45708 1.51815 1.56012 1.50752C1.66316 1.49689 1.76697 1.51835 1.85735 1.56897Z"
        fill="white"
        stroke="#3A3A3A"
        strokeWidth="1.50806"
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
  data: any
}

export function ClaimTabs({ config }: Props) {
  const [activeTab, setActiveTab] = useState(config[0].value)
  console.log(activeTab)

  return (
    <div className="container-padding">
      <Tabs defaultValue={config[0].value} value={activeTab} onValueChange={setActiveTab}>
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
                  'global-p1 font-medium px-2 py-2.5 md:py-[22px] lg:py-[23px] xl:py-[24px] uppercase relative flex justify-center',
                  index === 0 ? 'pl-0' : '',
                  config?.length === 2 && 'w-[45%] text-center',
                  activeTab === tab.value
                    ? 'text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:border-none after:inset-x-0 after:bottom-0 after:h-[4px] after:lg:h-[5px] after:xl:h-[6px] after:2xl:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
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
                      activeTab === 'individual'
                        ? '/assets/arrowRight.png'
                        : '/assets/arrowLeft.png'
                    }
                    alt="arrow"
                    className="w-[14px] lg:w-[16px] xl:w-[18px] 2xl:w-[22px]
                    h-[16px] lg:h-[18px] xl:h-[20x] 2xl:h-[24px]"
                  />
                </div>
              )
            })}
        </div>

        {/* Tab Content */}
        {activeTab === 'individual' && <IndividualClaim />}
        {activeTab === 'corporate' && <CorporateClaim />}
      </Tabs>
    </div>
  )
}
