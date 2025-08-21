import { WayWeAreDataType } from '@/types'
import Image from 'next/image'
import React from 'react'

type Props = {
  data: WayWeAreDataType
  isActive?: boolean
}

function OnboardingCard({ data, isActive = false }: Props) {
  return (
    <div
      className={`cursor-pointer
        mx-auto relative p-4 md:p-6 overflow-hidden text-white
        transition-all duration-500 ease-in-out
        rounded-md
        w-[97%] md:w-[95%] lg:w-[95%] xl:w-[90%] 
        h-[80px] md:h-[170px] lg:h-[220px] xl:h-[280px] 2xl:h-[350px]
        hover:w-full 
        hover:h-full
        flex flex-col justify-end
      `}
    >
      {/* Background image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${data.image}')`,
        }}
      /> */}

      <Image
        src={data?.image}
        alt={data?.title}
        fill
        className="object-cover object-center"
        sizes="(max-width: 767px) 300px, 500px"
      />

      {/* Overlay gradient */}
      {/* <div className="absolute inset-0 bg-black/20" /> */}

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
