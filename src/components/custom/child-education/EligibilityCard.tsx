import { EligibilityCardProps } from '@/types'
import Image from 'next/image'
import React from 'react'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  data: EligibilityCardProps
}

export const EligibilityCard = ({ data }: Props) => {
  const {
    title,
    titleBN,
    icon,
    mobileIcon,
    bgImage,
    entryMin,
    entryMinBN,
    entryMinLabel,
    entryMinLabelBN,
    entryMax,
    entryMaxBN,
    entryMaxLabel,
    entryMaxLabelBN,
    policyTerm,
    policyTermBN,
    policyTermLabel,
    policyTermLabelBN,
    maturityAge,
    maturityAgeBN,
    maturityAgeLabel,
    maturityAgeLabelBN,
  } = data
  return (
    <div
      className="bg-[#F6EDDD] rounded-xl p-4 lg:p-12 w-full h-auto xl:h-[535px] xl:w-[347px] overflow-hidden shadow-lg bg-cover bg-center flex flex-col "
      // style={{
      //   backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.40), rgba(0,0,0,0.30)), url('${bgImage}')`,
      // }}
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="relative w-14 h-14">
          <Image fill src={icon} alt={title} className="" />
        </div>
        <p className="uppercase text-[#434343] font-bold global-p1 mt-2">
          <LocalizedText en={title} bn={titleBN} />
        </p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 my-4">
        {/* Entry Age */}
        <div
          className="px-2 py-4 w-full md:w-[245px] lg:w-64 flex flex-col items-center shadow-md"
          style={{
            borderRadius: '6.667px',
            // background: 'rgba(156, 134, 57, 0.10)',
            background: '#434343',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="text-white global-p2 uppercase mb-1 font-light">
            <LocalizedText en="Entry Age" bn="প্রবেশের বয়স" />
          </div>
          <div className="flex justify-between w-full px-2 text-white">
            <div className="flex flex-col items-center">
              <p className="text-sm font-light text-[#FCF4EB]">
                <LocalizedText en="Minimum" bn="সর্বনিম্ন" />
              </p>
              <p className="global-span font-bold">
                <LocalizedText en={entryMin} bn={entryMinBN} />
              </p>
              <p className="text-base -mt-2 font-light">
                <LocalizedText en={entryMinLabel} bn={entryMinLabelBN} />
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm font-light">
                <LocalizedText en="Maximum" bn="সর্বোচ্চ" />
              </p>
              <p className="global-span font-bold">
                <LocalizedText en={entryMax} bn={entryMaxBN} />
              </p>
              <p className="text-base -mt-2 font-light">
                <LocalizedText en={entryMaxLabel} bn={entryMaxLabelBN} />
              </p>
            </div>
          </div>
        </div>
        {/* Policy Term */}
        <div
          className="px-2 py-4 w-full md:w-[245px] lg:w-64 flex flex-col items-center shadow-md"
          style={{
            borderRadius: '6.667px',
            // background: 'rgba(156, 134, 57, 0.10)',
            background: '#434343',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="text-white global-p2 uppercase mb-1 font-light">
            <LocalizedText en="Policy Term" bn="বীমার মেয়াদ" />
          </div>
          <div className="text-white font-bold global-span">
            <LocalizedText en={policyTerm} bn={policyTermBN} />
            <span className="global-span font-light">
              <LocalizedText en={policyTermLabel} bn={policyTermLabelBN} />
            </span>
          </div>
        </div>
        {/* Maturity Age */}
        <div
          className="px-2 py-4 w-full md:w-[245px] lg:w-64 flex flex-col items-center shadow-md"
          style={{
            borderRadius: '6.667px',
            // background: 'rgba(156, 134, 57, 0.10)',
            background: '#434343',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="text-white global-p2 uppercase mb-1 font-light">
            <LocalizedText en="Maturity Age" bn="পলিসি মেয়াদপূর্তিতে বয়স" />
          </div>
          <div className="text-white font-bold global-span">
            <LocalizedText en={maturityAge} bn={maturityAgeBN} />
            <span className="global-span font-light">
              <LocalizedText en={maturityAgeLabel} bn={maturityAgeLabelBN} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
