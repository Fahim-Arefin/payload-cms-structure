import React from 'react'
import LocalizedHighlighted from '../LocalizedHighlighted'
import LocalizedText from '../LocalizedText'
import Image from 'next/image'
import { EligibilityCommonCard } from '../EligibilityCommonCard'

type Props = {
  data: {
    sectionTitle: string
    highlighedSectionTitle: string
    sectionTitleBN: string
    highlighedSectionTitleBN: string
    description: string
    descriptionBN: string
    image: string
    eligibilityData: {
      backGroundColor: string
      icon: string
      iconTitle: string
      iconTitleBN: string
      age?: {
        title: string
        titleBN: string
        minAgeLabel: string
        minAgeLabelBN: string
        minAgeValue: string
        minAgeValueBN: string
        minAgeValuePeriod: string
        minAgeValuePeriodBN: string
        maxAgeLabel: string
        maxAgeLabelBN: string
        maxAgeValue: string
        maxAgeValueBN: string
        maxAgeValuePeriod: string
        maxAgeValuePeriodBN: string
      }
      policyTerm?: {
        title: string
        titleBN: string
        value: string
        valueBN: string
      }
      maturityAge?: {
        title: string
        titleBN: string
        value: string
        valueBN: string
      }
      physicalCondition?: {
        title: string
        titleBN: string
        value: string
        valueBN: string
      }
    }[]
  }
  image?: 'left' | 'right'
}

function EligibilityCriteria({ data, image = 'left' }: Props) {
  return (
    <div className="bg-[#FCF4EB] container-padding space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12">
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
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
        <div
          className={`order-1 lg:${image === 'left' ? 'order-1' : 'order-2'} relative flex items-center justify-center`}
        >
          {/* main iamge */}
          <div className=" relative w-full aspect-[540/420]">
            <Image
              fill
              src={data?.image}
              alt="Image"
              className="object-cover object-center w-full h-full 
                        rounded-md lg:rounded-lg xl:rounded-xl 2xl:rounded-2xl"
              sizes="50vw"
              quality={80}
            />
          </div>
        </div>
        <div
          className={`order-2 lg:${image === 'left' ? 'order-2' : 'order-1'} h-fit my-auto space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-8`}
        >
          <div className="">
            {data?.eligibilityData?.map((item, index) => (
              <EligibilityCommonCard key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EligibilityCriteria
