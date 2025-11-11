import React from 'react'
import LocalizedHighlighted from '../LocalizedHighlighted'
import Image from 'next/image'
import LocalizedText from '../LocalizedText'

type Props = {
  data: {
    title: string
    highlightedText: string
    titleBN: string
    highlightedTextBN: string
    backgroundColor: string
    partners: {
      image: string
      name: string
      nameBN: string
    }[]
  }
}

function StrategicPatners({ data }: Props) {
  return (
    <div
      className="container-padding space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12 "
      style={{
        backgroundColor: data?.backgroundColor || '',
      }}
    >
      <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12">
        <div className="flex flex-row space-x-1 md:space-x-2">
          <h3 className="global-h2 uppercase font-semibold text-[#434343]">
            <LocalizedHighlighted
              textEn={data?.title}
              textBn={data?.titleBN}
              highlightEn={data?.highlightedText}
              highlightBn={data?.highlightedTextBN}
            />
          </h3>
        </div>
        {/* <div className="global-span font-[350] text-[#434343] text-justify">
          <LocalizedText en={data?.description} bn={data?.descriptionBN} />
        </div> */}
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {data?.partners?.map((item, index) => (
          <div
            key={index}
            className="rounded-md shadow-md 
             w-[150px] h-[150px] flex flex-col justify-center items-center space-y-3"
          >
            <div className="relative w-[40%] aspect-[1/1]">
              <Image
                fill
                src={item?.image}
                alt="Logo"
                sizes="33vw"
                quality={80}
                className="w-full h-full object-contain object-center"
              />
            </div>
            <p
              className={`global-p2 font-semibold text-center text-[#374151] ${index > 0 ? 'uppercase' : ''}`}
            >
              <LocalizedText en={item?.name} bn={item?.nameBN} />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StrategicPatners
