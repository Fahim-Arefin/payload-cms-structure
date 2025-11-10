import React from 'react'
import LocalizedText from '../LocalizedText'
import LocalizedHighlighted from '../LocalizedHighlighted'
import Image from 'next/image'

type Props = {
  data: {
    sectionTitle: string
    highlighedSectionTitle: string
    sectionTitleBN: string
    highlighedSectionTitleBN: string
    description: string
    descriptionBN: string
    image: string
    items: {
      icon: string
      title: string
      titleBN: string
      description: string
      descriptionBN: string
    }[]
  }
}

function WSLSSection({ data }: Props) {
  return (
    <div className="container-padding space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:ga-6 lg:gap-8 xl:gap-10 2xl:gap-12">
        <div className=" flex items-center justify-center">
          <div className="relative w-full aspect-[530/340]">
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
        <div className=" h-fit my-auto space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-8">
          {data?.items?.map((item, index) => (
            <div key={index} className="flex items-start gap-3 xl:gap-4 2xl:gap-5 ">
              <div
                className="rounded-full bg-[#FCF4EB]
              p-1 lg:p-1.5 xl:p-2 2xl:p-3 "
              >
                <div
                  className="relative h-fit
                min-w-[12px] lg:min-w-[15px] xl:min-w-[20px] 2xl:min-w-[25px]
                aspect-[1/1] "
                >
                  <Image
                    fill
                    src={item?.icon}
                    alt="Image"
                    className="object-cover object-center rounded-full w-full h-full"
                    sizes="50vw"
                    quality={80}
                  />
                </div>
              </div>
              <div className="space-y-1 2xl:space-y-2">
                <div className="global-p1 font-semibold text-[#3A3A3A]">
                  <LocalizedText en={item?.title} bn={item?.titleBN} />
                </div>
                <div className="text-[10px] md:text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[20px] font-extralight text-[#434342] text-justify">
                  <LocalizedText en={item?.description} bn={item?.descriptionBN} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WSLSSection
