// 'use client'

// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { cn } from '@/lib/utils'
// import { useState } from 'react'
// import InsuraceCoverageTabContent from './InsuraceCoverageTabContent'

// export function ArrowIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
//       <path
//         d="M4.76388 3.90426L16.4372 10.4709C16.5013 10.5073 16.5547 10.56 16.5918 10.6236C16.6289 10.6873 16.6484 10.7597 16.6484 10.8334C16.6484 10.9071 16.6289 10.9795 16.5918 11.0432C16.5547 11.1069 16.5013 11.1596 16.4372 11.1959L4.76388 17.7626C4.68904 17.8044 4.60314 17.822 4.51789 17.8132C4.43265 17.8044 4.35219 17.7695 4.2875 17.7133C4.22281 17.657 4.17703 17.5822 4.1564 17.4991C4.13577 17.4159 4.14129 17.3284 4.17221 17.2484L6.60721 10.9843C6.64489 10.8872 6.64489 10.7796 6.60721 10.6826L4.17138 4.41843C4.14028 4.33839 4.13466 4.25071 4.15529 4.16736C4.17593 4.08401 4.22181 4.00908 4.28666 3.9528C4.35151 3.89653 4.43216 3.86166 4.51758 3.85297C4.603 3.84428 4.68902 3.86219 4.76388 3.90426Z"
//         fill="white"
//         stroke="#3A3A3A"
//         strokeWidth="1.25"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   )
// }

// type Props = {
//   config: {
//     value: string
//     label: string
//   }[]
//   data?: any
// }

// export function InsuranceCoverageTab({ config, data }: Props) {
//   const [activeTab, setActiveTab] = useState(config[0].value)

//   console.log(activeTab)
//   return (
//     <div className="container-padding">
//       <Tabs
//         defaultValue={config[0].value}
//         value={activeTab}
//         onValueChange={setActiveTab}
//         className=""
//       >
//         <div
//           className="relative w-full border-b border-[#434343] bg-white
//          md:mb-[30px] lg:mb-[50px] xl:mb-[80px]"
//         >
//           {/* Tabs */}
//           <TabsList
//             className={`w-full h-fit grid md:gap-12 bg-transparent border-none pl-12 md:pl-0 md:p-0 overflow-x-scroll overflow-y-hidden md:overflow-y-visible md:overflow-x-visible`}
//             style={{
//               gridTemplateColumns: config?.length > 1 ? `repeat(${config.length}, 1fr)` : undefined,
//             }}
//           >
//             {config.map((tab, index) => (
//               <TabsTrigger
//                 key={tab.value}
//                 value={tab.value}
//                 className={cn(
//                   'global-p1 font-semibold px-2 py-2.5 md:py-6 relative flex md:justify-center uppercase',
//                   activeTab === tab.value
//                     ? 'text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:inset-x-0 md:after:-bottom-[4px] after:md:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
//                     : 'text-[#434343]',
//                 )}
//               >
//                 <span
//                   className={` ${activeTab === tab.value ? ' text-[#ED7125] ' : ' text-[#434343] '}`}
//                 >
//                   {tab.label}
//                 </span>
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {config.length > 1 && (
//             <>
//               <div
//                 className="hidden md:grid absolute -bottom-[11px] z-10
//                   w-full gap-12"
//                 style={{ gridTemplateColumns: `repeat(${config?.length}, 1fr)` }}
//               >
//                 {config.slice(1).map((_, i) => (
//                   <div className="flex justify-end" key={i}>
//                     <div className="-mr-9">
//                       <ArrowIcon key={i} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Tab Content */}
//         {(() => {
//           return (
//             <>
//               <TabsContent key={activeTab} value={activeTab}>
//                 {activeTab === 'lifeCoverage' && <InsuraceCoverageTabContent />}
//                 {activeTab === 'healthCoverage' && <InsuraceCoverageTabContent />}
//               </TabsContent>
//             </>
//           )
//         })()}
//       </Tabs>
//     </div>
//   )
// }

'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import InsuraceCoverageTabContent from './InsuraceCoverageTabContent'
import LocalizedText from '../LocalizedText'

type Props = {
  config: {
    value: string
    label: string
    labelBN?: string
  }[]
  data: any
}

export function InsuranceCoverageTab({ config, data }: Props) {
  const [activeTab, setActiveTab] = useState(config[0].value)
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
                    <LocalizedText en={tab?.label} bn={tab?.labelBN} />
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
                      activeTab === 'lifeCoverage'
                        ? '/assets/icons/web/arrowRight.png'
                        : '/assets/icons/web/arrowLeft.png'
                    }
                    alt="arrow"
                    className="hidden lg:block w-[14px] lg:w-[16px] xl:w-[18px] 2xl:w-[22px]
                    h-[16px] lg:h-[18px] xl:h-[20x] 2xl:h-[24px]"
                  />
                  <img
                    src={
                      activeTab === 'healthCoverage'
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
        {activeTab === 'lifeCoverage' && <InsuraceCoverageTabContent data={data?.lifeCoverage} />}
        {activeTab === 'healthCoverage' && (
          <InsuraceCoverageTabContent data={data?.healthCoverage} />
        )}
      </Tabs>
    </div>
  )
}
