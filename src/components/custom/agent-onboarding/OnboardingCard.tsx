
import { FootPrintDataType } from '@/types'
import React from 'react'

type Props = {
  data: FootPrintDataType
  isActive?: boolean
}

function OnboardingCard({ data, isActive = false }: Props) {
  return (
    <div
      className={`
        mx-auto relative p-6 overflow-hidden rounded-xl text-white
        transition-all duration-500 ease-in-out
        ${isActive ? 'h-[250px] md:h-[320px] lg:h-[420px] xl:h-[500px] 2xl:h-[600px]' : 'h-[180px] md:h-[220px] lg:h-[250px] xl:h-[300px] 2xl:h-[375px] translate-y-[68px] md:translate-y-[100px] lg:translate-y-[168px] xl:translate-y-[200px] 2xl:translate-y-[224px]'}
      `}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${data.image}')`,
        }}
      />

      {/* Overlay gradient */}
      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* Foreground content */}
      <div className="relative z-10 text-white space-y-2 text-justify flex flex-col justify-between h-full">
        <p className="text-xs xl:text-sm font-light leading-snug line-clamp-5">
          {data?.description}
        </p>
        <h1 className="text-lg font-bold">{data?.title}</h1>
      </div>
    </div>
  )
}

export default OnboardingCard
