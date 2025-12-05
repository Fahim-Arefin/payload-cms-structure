'use client'

import React from 'react'
import Image from 'next/image'
import { StrategicPartnersBlockType } from '@/types/payloadCustomTypes'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  block: StrategicPartnersBlockType
}

function StrategicPatners({ block }: Props) {
  const bgColor = block?.backgroundColor || '#FFFFFF'
  const partners = Array.isArray(block?.partners) ? block.partners : []

  return (
    <div
      className="container-padding space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12"
      style={{ backgroundColor: bgColor }}
    >
      {/* Heading */}
      <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12">
        <div className="flex flex-row space-x-1 md:space-x-2">
          <h3 className="global-h2 uppercase font-semibold text-[#434343]">
            <LocalizedHighlighted
              textEn={block?.title}
              textBn={block?.titleBN}
              highlightEn={block?.highlightedText}
              highlightBn={block?.highlightedTextBN}
            />
          </h3>
        </div>
      </div>

      {/* Partners grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {partners.map((item, index) => {
          // logo can be string (id) or populated media doc; handle both safely
          const logoField: any = (item as any).logo
          const logoUrl =
            typeof logoField === 'string'
              ? '' // if you keep depth 0; with depth>0 you'd get logoField.url
              : logoField?.url ?? ''

          return (
            <div
              key={item.id ?? index}
              className="rounded-md shadow-md 
                w-[150px] h-[150px] flex flex-col justify-center items-center space-y-3"
            >
              <div className="relative w-[40%] aspect-[1/1]">
                {logoUrl && (
                  <Image
                    fill
                    src={logoUrl}
                    alt={item?.name || 'Partner Logo'}
                    sizes="33vw"
                    quality={80}
                    className="w-full h-full object-contain object-center"
                  />
                )}
              </div>

              <p
                className={`global-p2 font-semibold text-center text-[#374151] ${
                  index > 0 && index < partners.length - 1 ? 'uppercase' : ''
                }`}
              >
                <LocalizedText en={item?.name} bn={item?.nameBN} />
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StrategicPatners
