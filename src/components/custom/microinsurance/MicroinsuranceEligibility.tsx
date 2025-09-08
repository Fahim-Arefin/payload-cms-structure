import Image from 'next/image'
import React, { FC } from 'react'

type MicroinsuranceEligibilityProps = {
  data: any
}

const MicroinsuranceEligibility: FC<MicroinsuranceEligibilityProps> = ({
  data,
}: MicroinsuranceEligibilityProps) => {
  return (
    <div
      className="bg-[#FCF4EB] px-5 py-12 
               md:p-24 
               lg:px-[100px]  lg:py-[100px] 
               xl:px-[200px]  xl:py-[100px] 
               2xl:px-[300px] 2xl:py-[150px]"
    >
      <div className="flex flex-col space-y-3 md:space-y-6 mb-4 md:mb-10">
        <div className="flex flex-row space-x-1 md:space-x-2">
          <h3 className="global-h2 uppercase font-semibold text-[#434343]">{data?.title} </h3>
          <h3 className="global-h2 uppercase font-semibold text-[#ED7125]">{data?.coloredTitle}</h3>
        </div>
        <div className="global-span font-[350] text-[#434343] text-justify">
          {data?.description}
        </div>
      </div>
      {/* content */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 
                 gap-4 md:gap-6 lg:gap-12 xl:gap-20 2xl:gap-24"
      >
        <div
          className="order-1 lg:order-2 relative w-full h-auto lg:h-[230px] xl:h-[300px] 2xl:h-[350px]  
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
        <div className="text-[#434343] order-2 lg:order-1 flex flex-col justify-center h-auto space-y-4 lg:space-y-6 xl:space-y-8">
          <div className="space-y-3">
            {data?.items?.map((item: any, i: number) => (
              <div
                key={i}
                className="relative rounded-[5px] bg-white border border-[#F0EAE1]
             shadow-[3px_3px_10px_#0000001A] px-5 py-4 md:px-6 md:py-5
             before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[4px]
             before:bg-[#ED7125] before:rounded-l-2xl"
              >
                <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                  {/* icon (fill) */}
                  <div className="relative w-10 h-10 md:w-[40px] md:h-[43px] shrink-0">
                    <Image
                      src={item?.icon}
                      alt={item?.title}
                      fill
                      sizes="(min-width:768px) 48px, 40px"
                      className="object-contain"
                      priority={i === 0}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="global-p1 font-semibold text-[#000000]">
                      {item?.title}
                    </div>
                    <div className="mt-1 global-p1 font-[350] text-[#000000]">
                      {item?.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MicroinsuranceEligibility
