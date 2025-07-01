import React from 'react'
import Image from 'next/image'
import { DirectorProfileDataType } from '@/types'

type Props = {
  data: DirectorProfileDataType
}

function DirectorProfile({ data }: Props) {
  return (
    <div
      className="
    2xl:px-12 2xl:py-6 "
    >
      {/* prfile card */}
      <div
        className="relative mx-auto
      w-[220px] xl:w-[240px] 2xl:w32280px] 
      h-[220px] xl:h-[240px] 2xl:h32280px] "
      >
        {/* Inner Circle with Image and Beige Background */}
        {/* <div className="relative w-full h-full rounded-full bg-[#D3C59D] overflow-hidden z-10">
          <Image src={data?.image} alt={data?.title} fill className="object-cover scale-[1.30]" />
        </div> */}

        <div
          className="
    relative w-full h-full rounded-full overflow-hidden z-10 
    bg-[#D3C59D] 
    bg-[url('/assets/radar.png')] 
    lg:bg-none
    bg-contain bg-no-repeat bg-center
  "
        >
          <Image
            src={data?.image}
            alt={data?.title}
            fill
            className="object-cover lg:scale-[1.30]"
          />
        </div>

        {/* Orange curved stroke — placed OUTSIDE clipping context */}
        <div
          className="hidden lg:block pointer-events-none absolute 
        lg:-bottom-[15px] 2xl:-bottom-[15px] 
        lg:-right-[15px] 2xl:-right-[15px]
        z-20 rounded-full border-[10px] border-[#ED7125] border-t-transparent border-l-transparent
        lg:w-[250px] xl:w-[270px] 2xl:w-[310px]
        lg:h-[250px] xl:h-[270px] 2xl:h-[310px]"
        />
      </div>
      <div className="mt-6">
        <p className="shantaLifeIntroSection-h3 text-[#434342] font-medium text-center">
          {data?.name}
        </p>
        <p className="shantaLifeIntroSection-h5 text-[#9C8639] font-medium text-center">
          {data?.title}
        </p>
      </div>
    </div>
  )
}

export default DirectorProfile
