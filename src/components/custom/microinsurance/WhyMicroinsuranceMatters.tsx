// src/components/custom/home/WhyMicroInsuranceMatter.tsx
'use client'

import React from 'react'
import { bnNum } from '@/lib/utils'
import { MicroinsuranceMattersBlockType } from '@/types/payloadCustomTypes'
import LocalizedText from '../shared/LocalizedText'
import LocalizedRichText from '../shared/LocalizedRichText'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'

type Props = {
  block: MicroinsuranceMattersBlockType
}

function WhyMicroInsuranceMatter({ block }: Props) {
  const bgColor = block?.backgroundColor || '#F6EDDD'

  return (
    <div
      className="container-padding space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12"
      style={{ backgroundColor: bgColor }}
    >
      {/* Heading + description */}
      <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12">
        <div className="flex flex-row space-x-1 md:space-x-2">
          <h3 className="global-h2 uppercase font-semibold text-[#434343]">
            <LocalizedHighlighted
              textEn={block?.sectionTitle}
              textBn={block?.sectionTitleBN}
              highlightEn={block?.highlightedSectionTitle}
              highlightBn={block?.highlightedSectionTitleBN}
            />
          </h3>
        </div>

        <div className="global-span font-[350] text-[#434343] text-justify">
          {/* Main description as RichText (EN/BN) */}
          <LocalizedRichText en={block?.description} bn={block?.descriptionBN} />
        </div>
      </div>

      {/* Items */}
      <div className="space-y-1 lg:space-y-2">
        {block?.items?.map((item, index) => (
          <div
            key={item.id ?? index}
            className="w-full border-[1px] border-white 
              px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12
              py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 
              rounded-md lg:rounded-lg
              shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="text-[#ED7125] font-extrabold global-h1">
                <LocalizedText en={String(index + 1)} bn={bnNum(index + 1)} />.
              </div>

              <div className="space-y-1 flex-1">
                {/* Item content (title + description together) as RichText */}
                <div className="text-[#3A3A3A] text-[10px] md:text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[20px]">
                  <LocalizedRichText en={item.itemDescription} bn={item.itemDescriptionBN} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyMicroInsuranceMatter
