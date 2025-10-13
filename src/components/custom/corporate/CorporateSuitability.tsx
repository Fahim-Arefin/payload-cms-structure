'use client'

import React from 'react'
import { SuitabilityCardType } from '@/types'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  data: SuitabilityCardType[]
}

function CorporateSuitability({ data }: Props) {
  return (
    <div
      className="px-5 py-8 
           md:px-24 md:py-12
           lg:px-[130px]  lg:py-[60px] 
           xl:px-[200px]  xl:py-[80px] 
           2xl:px-[300px] 2xl:py-[100px] text-white"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), 
           linear-gradient(0deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.20)), 
           url('${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/suitabilityBanner.jpg') 30% top/cover no-repeat, 
           linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), 
           #F6EDDD`,
      }}
    >
      {/* Title */}
      <h1 className="global-h1 font-semibold uppercase mb-10 text-white">
        <LocalizedHighlighted
          textEn={`SUITABILITY STANDARDS`}
          textBn={`কভারেজের জন্য যিনি উপযুক্ত`}
          highlightBn={'উপযুক্ত'}
          highlightEn={`SUITABILITY`}
          highlightClassName="text-[#ED7125]"
        />
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-40 ">
        {data.map((item: SuitabilityCardType, index: number) => (
          <div
            key={index}
            className="rounded-xl px-4 py-6 lg:px-10 lg:py-12 flex flex-col gap-2 md:gap-6 xl:gap-10
                       bg-[#43434333] backdrop-blur-[16.666666px] border border-white"
          >
            <div className="w-[44px] h-[44px] lg:w-[118px] lg:h-[118px]">
              <img src={item?.img} alt={`icon-${index}`} className="object-contain w-full h-full" />
            </div>
            <h2 className="global-p1 font-bold uppercase text-white lg:mb-10">
              <LocalizedText en={item?.title} bn={item?.titleBN} />
            </h2>
            <p className="global-p1 font-[350] text-white text-justify lg:mb-10 xl:mb-20">
              <LocalizedText en={item?.description} bn={item?.descriptionBN} />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CorporateSuitability
