import React from 'react'
import { SuitabilityCardType } from '@/types'

type Props = {
  data: SuitabilityCardType[]
}

function CorporateSuitability({ data }: Props) {
  return (
    <section className="container-padding bg-[#F5EFE7] py-12">
      {/* Title */}
      <h1 className="global-h1 font-semibold text-[#434343] uppercase mb-10">
        <span className="text-[#ED7125]">SUITABILITY</span> STANDARDS
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-6 xl:gap-40">
        {data.map((item: any, index: number) => (
          <div key={index} className="bg-white rounded-xl px-4 py-6 lg:px-8 lg:py-10 flex flex-col self-stretch gap-4 xl:gap-8">
            <div className="w-[44px] lg:w-[100px] h-[44px] lg:h-[100px]">
              <img src={item?.img} alt={`icon-${index}`} className="object-contain" />
            </div>
            <h2 className="global-h3 text-[#B58528] uppercase">{item?.title}</h2>
            <p className="global-p2 lg:w-[85%] xl:w-[75%] mb-6 lg:mb-10 xl:mb-16 text-[#3A3A3C] ">{item?.description}</p>
          </div>
        ))}


      </div>
    </section>
  )
}

export default CorporateSuitability
