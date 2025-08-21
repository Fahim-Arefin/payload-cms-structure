import { EligibilityCardProps } from '@/types'
import Image from 'next/image'
import React from 'react'

type Props = {
  data: EligibilityCardProps
}

export const EligibilityCard = ({ data }: Props) => {
  const {
    title,
    icon,
    mobileIcon,
    bgImage,
    entryMin,
    entryMinLabel,
    entryMax,
    entryMaxLabel,
    policyTerm,
    policyTermLabel,
    maturityAge,
    maturityAgeLabel,
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
        <p className="uppercase text-[#434343] font-bold global-p1 mt-2">{title}</p>
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
          <div className="text-white global-p2 uppercase mb-1 font-light">Entry Age</div>
          <div className="flex justify-between w-full px-2 text-white">
            <div className="flex flex-col items-center">
              <p className="text-sm font-light text-[#FCF4EB]">Minimum</p>
              <p className="global-span font-bold">{entryMin}</p>
              <p className="text-base -mt-2 font-light">{entryMinLabel}</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm font-light">Maximum</p>
              <p className="global-span font-bold">{entryMax}</p>
              <p className="text-base -mt-2 font-light">{entryMaxLabel}</p>
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
          <div className="text-white global-p2 uppercase mb-1 font-light">Policy Term</div>
          <div className="text-white font-bold global-span">
            {policyTerm} <span className="global-span font-light">{policyTermLabel}</span>
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
          <div className="text-white global-p2 uppercase mb-1 font-light">Maturity Age</div>
          <div className="text-white font-bold global-span">
            {maturityAge} <span className="global-span font-light">{maturityAgeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
