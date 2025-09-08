import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import React, { FC, Fragment } from 'react'

type MicroinsurancePartnersProps = {
  data: any
}

const MicroinsurancePartners: FC<MicroinsurancePartnersProps> = ({
  data,
}: MicroinsurancePartnersProps) => {
  return (
    <div className="">
      <div
        className="px-5 pt-12 
               md:px-24 md:pt-24
               lg:px-[100px]  lg:pt-[100px] 
               xl:px-[200px]  xl:pt-[100px] 
               2xl:px-[300px] 2xl:pt-[150px] flex flex-col space-y-3 md:space-y-6 mb-4 md:mb-10"
      >
        <div className="flex flex-row space-x-1 md:space-x-2">
          <h3 className="global-h2 uppercase font-semibold text-[#434343]">{data?.title} </h3>
          <h3 className="global-h2 uppercase font-semibold text-[#ED7125]">{data?.coloredTitle}</h3>
        </div>
        <div className="global-span font-[350] text-[#434343] text-justify">
          {data?.description}
        </div>
      </div>
      {/* SHADCN CAROUSEL */}
      <Carousel opts={{ align: 'start', loop: true, dragFree: true }} className="w-full">
        <CarouselContent className="mb-4">
          {data?.items?.map((it: any, idx: number) => (
            <div key={`${it.title}-${idx}`}>
              {/* card */}
              <CarouselItem className="basis-[160px] md:basis-[180px] lg:basis-[200px]">
                <div
                  className="h-[60px] md:h-[64px] rounded-2xl bg-white border border-[#F0EAE1]
                                shadow-[3px_3px_10px_#0000001A] flex items-center justify-center px-5"
                >
                  <span className="text-[#2E2E2E] text-base md:text-lg font-medium">
                    {it.title}
                  </span>
                </div>
              </CarouselItem>

              {/* dot separator (skip after last) */}
              {idx < data.items.length - 1 && (
                <CarouselItem className="basis-[16px] flex items-center justify-center">
                  <span
                    className="block w-[8px] h-[8px] rounded-full"
                    style={{ backgroundColor: it.dotColor }}
                  />
                </CarouselItem>
              )}
            </div>
          ))}
        </CarouselContent>

        {/* hide arrows (keep markup for a11y) */}
        {/* <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" /> */}
      </Carousel>
    </div>
  )
}

export default MicroinsurancePartners
