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
    items: {
      title: string
      titleBN?: string
      icon: string
    }[]
  }
}

function KeyBenefits({ data }: Props) {
  return (
    <div className="container-padding space-y-4 md:space-y-6 lg:space-y-12 font-avenir ">
      {/* heading */}
      <div className="">
        <div className="flex flex-col md:flex-row md:space-x-2">
          <h3 className="global-h2 uppercase font-bold text-[#434343]">
            <LocalizedText en={data?.title} bn={data?.titleBN} />
          </h3>
          <h3 className="global-h2 uppercase font-bold text-[#ED7125]">
            <LocalizedText en={data?.coloredTitle} bn={data?.coloredTitleBN} />
          </h3>{' '}
        </div>
      </div>
      {/* content */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 
            gap-4 md:gap-6 lg:gap-12 xl:gap-20 2xl:gap-24"
      >
        <div
          className=" relative w-full h-auto lg:h-[230px] xl:h-[300px] 2xl:h-[350px]  
             aspect-video rounded-md lg:rounded-lg xl:rounded-xl"
        >
          <Image
            fill
            src={data?.image}
            alt={data?.title}
            className="object-cover object-top rounded-md lg:rounded-lg xl:rounded-xl"
            sizes="(max-width: 639px) 350px, 50vw"
          />
        </div>
        <div className="text-[#434343] flex flex-col justify-center h-auto space-y-4 lg:space-y-6 xl:space-y-8">
          <div className="global-span font-extralight text-justify">
            <LocalizedText en={data?.description} bn={data?.descriptionBN} />
          </div>
          <div className="space-y-3">
            {data?.items?.map((item, i) => (
              <div className="flex items-center space-x-4" key={i}>
                <div
                  className="flex items-center justify-center
                w-[20px] lg:w-[25px] xl:w-[40px]
                h-[20px] lg:h-[25px] xl:h-[40px]"
                >
                  <img src={item?.icon} alt={item?.title} />
                </div>
                <div className="uppercase text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-semibold text-[#434342]">
                  <LocalizedText en={item?.title} bn={item?.titleBN} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyBenefits
