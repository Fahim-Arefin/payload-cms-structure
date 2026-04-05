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

function AccordionSection({ data }: Props) {
  return (
    <div className="mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 w-full">
      <Accordion type="single" collapsible defaultValue="item-0" className="">
        {data.map((item, i) => (
          <AccordionItem
            key={`item-${i}`}
            value={`item-${i}`}
            className="bg-white px-8 py-6 mt-[20px]"
          >
            <AccordionTrigger className="text-dark-1 font-manrope font-bold global-h6 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-dark-1 font-manrope global-p3 border-t-2 border-dashed border-[#D0D0F6] pt-4">
              <LocalizedRichText en={item?.answer} bn={item?.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default AccordionSection
