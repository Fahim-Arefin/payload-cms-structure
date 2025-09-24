'use client'

import { PayPremiumDataType } from '@/types'
import React from 'react'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import ToolTip from '@/components/custom/shared/ToolTip'
import Image from 'next/image'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import useSSRLanguage from '@/hooks/useSSRLanguage'

type Props = {
  bgColor?: string
  align?: 'left' | 'right'
  data: PayPremiumDataType
}

function BankSection({ bgColor = '#FFFFFF', align = 'left', data }: Props) {
  const lang = useSSRLanguage() // ⬅️ current language
  return (
    <div
      className="container-padding"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div>
        <div className="space-x-1">
          <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
            {/* Payment Using{' '}
            <span className="global-h1 uppercase text-[#ED7125] font-medium">Internet Banking</span> */}
            <LocalizedHighlighted
              textEn="Payment Using Internet Banking"
              highlightEn="Internet Banking"
              textBn="ইন্টারনেট ব্যাংকিং বা ব্যাংক ট্রান্সফার"
              highlightBn="ব্যাংক ট্রান্সফার"
              highlightClassName="global-h1 uppercase text-[#ED7125] font-medium"
            />
          </h1>
          <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
            <LocalizedText en="(Bank transfer)" bn="এর মাধ্যমে প্রিমিয়াম প্রদান" />
          </h1>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 lg:gap-6 xl:gap-9 2xl:gap-16 ${align === 'left' ? ' lg:gap-0 ' : 'gap-0'}`}
      >
        {/* left content mobile*/}
        {/* h-[300px] md:h-[400px] lg:h-auto */}
        <div
          className={`lg:hidden
    relative 
    w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
    aspect-[2880/1920]
    rounded-md lg:rounded-lg xl:rounded-xl 
    overflow-hidden
    mt-12
    ${align === 'left' ? 'order-1' : 'order-1 lg:order-2 '}`}
          role="img"
          aria-label="Background image"
        >
          {/* Background Image */}
          <Image
            src={data?.bgMobileImage} // fallback to avoid crash
            alt="Background"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* left content large*/}
        {/* lg:bg-[position:-300px_0px]  xl:bg-[position:-400px_0px]  2xl:bg-[position:-272.65px_0px]   */}
        <div
          className={`hidden lg:block
            relative 
            w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
            h-[300px] md:h-[400px] lg:h-auto
            rounded-md lg:rounded-lg xl:rounded-xl 
            overflow-hidden
            mt-12
           ${align === 'left' ? 'order-1' : 'order-1 lg:order-2 '}`}
          role="img"
          aria-label="Background image"
        >
          {/* Background Image */}
          <Image
            src={data?.bgImage} // fallback to avoid crash
            alt="Background"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10 " />
        </div>
        {/* right content */}
        <div
          className={`
          flex flex-col mt-12
        space-y-4 lg:space-y-2 xl:space-y-4 2xl:space-y-6
        ${align === 'left' ? 'order-2' : 'order-2 lg:order-1'} `}
        >
{data?.item?.map((eachItem, i) => {
            // ⬇️ choose HTML by language with graceful fallback
            const html =
              lang === 'en'
                ? (eachItem.descriptionContent ?? '')
                : (eachItem.descriptionContentBN ?? eachItem.descriptionContent ?? '')

            return (
              <div
                key={i}
                className="flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
                           space-x-2 lg:space-x-1 xl:space-x-2.5 2xl:space-x-4
                           p-1 md:px-4 md:py-1.5 lg:px-1 lg:py-2 xl:p-2.5 2xl:p-4 
                           rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
              >
                <div className="text-[12px] md:text-[14px] lg:text-[12px] xl:text-[16px] 2xl:text-[15px] text-[#434343]">
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BankSection
