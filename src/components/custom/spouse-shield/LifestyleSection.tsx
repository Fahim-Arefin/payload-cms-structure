import React from 'react'
import Image from 'next/image'

type Props = {
  data: {
    title: string
    subTitle: string
    description: string
    image: string
  }
}

function LifestyleSection({ data }: Props) {
  return (
    <div className="bg-[#F6EDDD] container-padding">
      <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_1.4fr] xl:grid-cols-[1fr_1fr] items-center gap-4 lg:gap-6 xl:gap-10">
        {/* Left Image */}
        <div>
          <div className="relative w-full h-[250px] sm:h-[280px] md:h-[300px] lg:w-[512px] lg:h-[315px]">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover object-bottom rounded-[16px]"
              // sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 512px"
              priority
            />
          </div>
        </div>

        {/* Right Text */}
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <div>
            <h2 className="global-h1 font-semibold text-[#3A3A3A]">{data.title}</h2>
            <h3 className="text-[#ED7125] global-h1 font-semibold">{data.subTitle}</h3>
          </div>
          <p className="global-p1 xl:global-span text-[#434343]">{data.description}</p>
        </div>
      </div>
    </div>
  )
}

export default LifestyleSection
