import Image from 'next/image'
import React from 'react'
import LocalizedText from '../LocalizedText'

type Props = {
  data: {
    title: string
    titleBN?: string
    coloredTitle: string
    coloredTitleBN?: string
    description: string
    descriptionBN?: string
    image: string
  }
  className?: string
}

function WCTMSection({ data, className }: Props) {
  return (
    <div className={`container-padding space-y-6 font-avenir ${className}`}>
      {/* heading */}
      <div className="">
        <div className="flex space-x-2">
          <h3 className="global-h2 uppercase font-bold text-[#434343]">
            <LocalizedText en={data?.title} bn={data?.titleBN} />
          </h3>
          <h3 className="global-h2 uppercase font-bold text-[#ED7125]">
            <LocalizedText en={data?.coloredTitle} bn={data?.coloredTitleBN} />
          </h3>{' '}
        </div>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 
      gap-4 md:gap-8 lg:gap-12 xl:gap-20 2xl:gap-24"
      >
        <div className="order-2 lg:order-1 text-[#434343] global-span font-extralight text-justify flex justify-center items-center  h-auto">
          <LocalizedText en={data?.description} bn={data?.descriptionBN} />
        </div>
        {/* lg:h-[300px] xl:h-[310px] 2xl:h-[210px]  */}
        <div
          className="order-1 lg:order-2  relative w-full h-auto lg:h-[230px] xl:h-[300px] 2xl:h-[330px]  
       aspect-video rounded-md lg:rounded-lg xl:rounded-xl"
        >
          <Image
            fill
            src={data?.image}
            alt={data?.title}
            className="object-cover rounded-md lg:rounded-lg xl:rounded-xl"
            sizes="(max-width: 639px) 350px, 50vw"
          />
        </div>
      </div>
    </div>
  )
}

export default WCTMSection
