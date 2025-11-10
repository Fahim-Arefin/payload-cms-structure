import React from 'react'
import LocalizedHighlighted from '../LocalizedHighlighted'
import LocalizedText from '../LocalizedText'

// utils/bnNum.ts (or inside your existing utils file)
const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'] as const

export function bnNum(input: number | string): string {
  const str = String(input)
  return str.replace(/[0-9]/g, (digit) => BN_DIGITS[Number(digit)])
}

type Props = {
  data: {
    sectionTitle: string
    highlighedSectionTitle: string
    sectionTitleBN: string
    highlighedSectionTitleBN: string
    description: string
    descriptionBN: string
    items: {
      title: string
      titleBN: string
      description: string
      descriptionBN: string
    }[]
  }
}

function WhyMicroInsuranceMatter({ data }: Props) {
  return (
    <div className="container-padding space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12 bg-[#F6EDDD] ">
      <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12">
        <div className="flex flex-row space-x-1 md:space-x-2">
          <h3 className="global-h2 uppercase font-semibold text-[#434343]">
            <LocalizedHighlighted
              textEn={data?.sectionTitle}
              textBn={data?.sectionTitleBN}
              highlightEn={data?.highlighedSectionTitle}
              highlightBn={data?.highlighedSectionTitleBN}
            />
          </h3>
        </div>
        <div className="global-span font-[350] text-[#434343] text-justify">
          <LocalizedText en={data?.description} bn={data?.descriptionBN} />
        </div>
      </div>
      <div className="space-y-1 lg:space-y-2">
        {data?.items?.map((item, index) => (
          <div
            key={index}
            className="w-full border-[1px] border-white 
          px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12
          py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 
          rounded-md lg:rounded-lg
          shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="text-[#ED7125] font-extrabold global-h1">
                <LocalizedText en={String(index + 1)} bn={bnNum(index + 1)} />.
              </div>
              <div className="space-y-1">
                <div className="text-[#3A3A3A] global-p1 font-semibold">
                  <LocalizedText en={item?.title} bn={item?.titleBN} />
                </div>
                <div className="text-[10px] md:text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[20px] font-light text-[#434342] text-justify">
                  <LocalizedText en={item?.description} bn={item?.descriptionBN} />
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
