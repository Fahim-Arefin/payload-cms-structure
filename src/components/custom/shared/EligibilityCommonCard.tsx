import { EligibilityCardProps } from '@/types'
import Image from 'next/image'
import React from 'react'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  data: {
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
  }
}

export const EligibilityCommonCard = ({ data }: Props) => {
  return (
    <div
      // xl:h-[535px] xl:w-[347px]
      className="rounded-xl p-4 lg:p-6 xl:p-12 
      w-full md:w-[300px] mx-auto lg:mx-0 xl:w-[347px]
      h-fit
      overflow-hidden 
      shadow-lg bg-cover bg-center 
      flex flex-col 
      "
      style={{ backgroundColor: data?.backGroundColor }}
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="relative w-14 aspect-[1/1]">
          <Image fill src={data?.icon} alt={data?.iconTitle} className="" />
        </div>
        <p className="uppercase text-[#434343] font-bold global-p1 mt-2">
          <LocalizedText en={data?.iconTitle} bn={data?.iconTitleBN} />
        </p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 my-4">
        {/* Entry Age */}
        {data?.age && (
          <div
            className="px-2 py-4 w-full md:w-[245px] lg:w-64 flex flex-col items-center shadow-md"
            style={{
              borderRadius: '6.667px',
              // background: 'rgba(156, 134, 57, 0.10)',
              background: '#434343',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="text-[#FCF4EB]/70 global-p2 uppercase mb-1 font-light">
              <LocalizedText en={data?.age?.title} bn={data?.age?.titleBN} />
            </div>
            <div className="flex justify-between w-full px-2 text-white">
              <div className="flex flex-col items-center">
                <p className="text-sm font-light text-[#FCF4EB]/70">
                  <LocalizedText en={data?.age?.minAgeLabel} bn={data?.age?.minAgeLabelBN} />
                </p>
                <p className="global-span font-bold">
                  <LocalizedText en={data?.age?.minAgeValue} bn={data?.age?.minAgeValueBN} />
                </p>
                <p className="text-base -mt-2 font-light text-[#FCF4EB]/70">
                  <LocalizedText
                    en={data?.age?.minAgeValuePeriod}
                    bn={data?.age?.minAgeValuePeriodBN}
                  />
                </p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-sm font-light text-[#FCF4EB]/70">
                  <LocalizedText en={data?.age?.maxAgeLabel} bn={data?.age?.maxAgeLabelBN} />
                </p>
                <p className="global-span font-bold">
                  <LocalizedText en={data?.age?.maxAgeValue} bn={data?.age.maxAgeValueBN} />
                </p>
                <p className="text-base -mt-2 font-light text-[#FCF4EB]/70">
                  <LocalizedText
                    en={data?.age?.maxAgeValuePeriod}
                    bn={data?.age?.maxAgeValuePeriodBN}
                  />
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Policy Term */}
        {data?.policyTerm && (
          <div
            className="px-2 py-4 w-full md:w-[245px] lg:w-64 flex flex-col items-center shadow-md"
            style={{
              borderRadius: '6.667px',
              // background: 'rgba(156, 134, 57, 0.10)',
              background: '#434343',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="global-p2 uppercase mb-1 font-light text-[#FCF4EB]/70">
              <LocalizedText en={data?.policyTerm?.title} bn={data?.policyTerm?.titleBN} />
            </div>
            <div className="text-white font-medium global-p1">
              <LocalizedText en={data?.policyTerm?.value} bn={data?.policyTerm?.valueBN} />
            </div>
          </div>
        )}
        {/* Maturity Age */}
        {data?.maturityAge && (
          <div
            className="px-2 py-4 w-full md:w-[245px] lg:w-64 flex flex-col items-center shadow-md"
            style={{
              borderRadius: '6.667px',
              // background: 'rgba(156, 134, 57, 0.10)',
              background: '#434343',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="global-p2 uppercase mb-1 font-light text-[#FCF4EB]/70">
              <LocalizedText en={data?.maturityAge?.title} bn={data?.maturityAge?.titleBN} />
            </div>
            <div className="text-white font-medium global-p1">
              <LocalizedText en={data?.maturityAge?.value} bn={data?.maturityAge?.valueBN} />
            </div>
          </div>
        )}
        {/* Physical Condition */}
        {data?.physicalCondition && (
          <div
            className="px-2 py-4 w-full md:w-[245px] lg:w-64 flex flex-col items-center shadow-md"
            style={{
              borderRadius: '6.667px',
              // background: 'rgba(156, 134, 57, 0.10)',
              background: '#434343',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="global-p2 uppercase mb-1 font-light text-[#FCF4EB]/70">
              <LocalizedText
                en={data?.physicalCondition?.title}
                bn={data?.physicalCondition?.titleBN}
              />
            </div>
            <div className="text-white font-medium global-p1">
              <LocalizedText
                en={data?.physicalCondition?.value}
                bn={data?.physicalCondition?.valueBN}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
