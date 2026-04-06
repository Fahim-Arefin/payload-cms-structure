// import { QueriesBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion'
// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'

// type Props = {
//   data: QueriesBlockType['queries']
// }

// function AccordionSection({ data }: Props) {
//   return (
//     <div className="mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 w-full">
//       <Accordion type="single" collapsible defaultValue="item-0" className="">
//         {data.map((item, i) => (
//           <AccordionItem
//             key={`item-${i}`}
//             value={`item-${i}`}
//             className="bg-white px-8 py-6 mt-[20px]"
//           >
//             <AccordionTrigger className="text-dark-1 font-manrope font-bold global-h6 hover:no-underline">
//               {item.question}
//             </AccordionTrigger>
//             <AccordionContent className="text-dark-1 font-manrope global-p3 border-t-2 border-dashed border-[#D0D0F6] pt-4">
//               <LocalizedRichText en={item?.answer} bn={item?.answer} />
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   )
// }

// export default AccordionSection

import { QueriesBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'

type Props = {
  data: QueriesBlockType['queries']
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      className="
      w-[8px] lg:w-[10px] xl:w-[11px]  2xl:w-[13px]
      h-[8px] lg:h-[10px] xl:h-[11px]  2xl:h-[13px] 
      "
    >
      <path
        d="M7.47253 5.05495C7.35116 5.05495 7.25275 4.95654 7.25275 4.83517V0H5.05495V4.83517C5.05495 4.95654 4.95654 5.05495 4.83517 5.05495H0V7.25275H4.83517C4.95654 7.25275 5.05495 7.35116 5.05495 7.47253V12.3077H7.25275V7.47253C7.25275 7.35116 7.35116 7.25275 7.47253 7.25275H12.3077V5.05495H7.47253Z"
        fill="currentColor"
      />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="3"
      viewBox="0 0 13 3"
      fill="none"
      className="
      w-[8px] lg:w-[10px] xl:w-[11px]  2xl:w-[13px]
      h-[3px] "
    >
      <path d="M0 2.1978V0H12.3077V2.1978H0Z" fill="currentColor" />
    </svg>
  )
}

function AccordionSection({ data }: Props) {
  return (
    // defaultValue="item-0"
    <div className="mt-4 w-full lg:mt-6 xl:mt-8 2xl:mt-10">
      <Accordion type="single" collapsible>
        {data.map((item, i) => (
          <AccordionItem
            key={`item-${i}`}
            value={`item-${i}`}
            className="border-0 bg-white
             mt-[7px] md:mt-[10px] lg:mt-[12px] xl:mt-[16px] 2xl:mt-[20px]
           "
          >
            <AccordionTrigger
              className="
                px-4 lg:px-6 xl:px-7 2xl:px-8 
                py-3 lg:py-4 xl:py-5 2xl:py-6
                group flex items-center justify-between gap-4
                font-manrope font-bold global-h6 text-dark-1
                transition-all duration-300 hover:no-underline
                [&>svg]:hidden
              "
            >
              <span>{item.question}</span>

              <span
                className="
                  w-[25px] lg:w-[30px] xl:w-[40px] 2xl:w-[44px]
                  h-[25px] lg:h-[30px] xl:h-[40px] 2xl:h-[44px] 
                  relative flex shrink-0 items-center justify-center
                  border border-[#33CCCC]
                  bg-white text-[#33CCCC]
                  transition-all duration-300 ease-in-out
                  group-hover:bg-[#33CCCC]
                  group-hover:text-white
                "
              >
                {/* Plus when collapsed */}
                <span
                  className="
                    absolute inset-0 flex items-center justify-center
                    transition-all duration-300
                    opacity-100 scale-100
                    group-data-[state=open]:opacity-0 group-data-[state=open]:scale-75
                  "
                >
                  <PlusIcon />
                </span>

                {/* Minus when open */}
                <span
                  className="
                    absolute inset-0 flex items-center justify-center
                    transition-all duration-300
                    opacity-0 scale-75
                    group-data-[state=open]:opacity-100 group-data-[state=open]:scale-100
                  "
                >
                  <MinusIcon />
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="border-t-2 border-dashed border-[#D0D0F6] font-manrope global-p3 text-dark-1
            mx-4 lg:mx-6 xl:mx-7 2xl:mx-8 
            py-3 lg:py-4 xl:py-5 2xl:py-6
            "
            >
              <LocalizedRichText en={item?.answer} bn={item?.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default AccordionSection
