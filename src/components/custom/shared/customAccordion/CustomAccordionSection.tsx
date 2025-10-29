// src/blocks/customAccordion/CustomAccordionSection.tsx
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import type { CustomAccordionBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: CustomAccordionBlockType
  className?: string
}

/**
 * Renders:
 *  - Top description (plain text, EN/BN)
 *  - Numbered accordion items: mainTitle (EN/BN) + points (richText EN/BN)
 *
 * Matches the UI in the provided screenshot:
 * • Soft page background handled by parent; this component draws white rounded panels
 * • First item open by default; caret on the right
 */
export default function CustomAccordionSection({ block, className }: Props) {
  const items = block?.data ?? []

  return (
    <section className={`container-padding bg-[#F6EDDD] ${className ?? ''}`}>
      {/* Top description */}
      {(block?.description || block?.descriptionBN) && (
        <p className="global-p1 mb-6 md:mb-8 text-[#1a1a1a]">
          <LocalizedText en={block?.description} bn={block?.descriptionBN || block?.description} />
        </p>
      )}

      {/* Accordions */}
      <div className="space-y-3 md:space-y-4">
        <Accordion type="single" collapsible defaultValue={items.length ? 'item-0' : undefined}>
          {items.map((it, idx) => {
            const titleNum = `${idx + 1}. `
            const itemId = `item-${idx}`

            return (
              <AccordionItem
                key={itemId}
                value={itemId}
                className="border border-gray-200 rounded-xl  overflow-hidden mb-3 last:mb-0
                           shadow-sm 
                           bg-white"
              >
                <AccordionTrigger
                  className="px-5 md:px-6 py-4 md:py-5
                             text-left text-[18px] md:text-[22px] font-semibold tracking-tight
                             hover:no-underline 
                             rounded-xl
                             [&>svg]:ml-auto"
                >
                  <span className="flex items-center gap-2">
                    <span className="select-none">{titleNum}</span>
                    <span className="leading-snug">
                      <LocalizedText en={it?.mainTitle} bn={it?.mainTitleBN || it?.mainTitle} />
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent
                  className="px-5 md:px-6
                             border border-white border-t-0 rounded-b-xl
                             bg-white"
                >
                  {/* Rich text points (lists/paras as authored in Payload) */}
                  <div
                    className="prose prose-sm md:prose-base max-w-none
                                  prose-ul:list-disc prose-li:marker:text-current
                                  text-[#1a1a1a]"
                  >
                    <LocalizedRichText en={it?.points} bn={it?.pointsBN || it?.points} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
