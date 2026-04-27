import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { TestingPillarsBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = {
  data: NonNullable<TestingPillarsBlockType['testingPillars']>[number]
  className?: string
}

function TestingPilarCard({ data, className }: Props) {
  return (
    <div
      className={`group/testCard w-full bg-white-2 md:hover:scale-105 lg:hover:scale-110 transition-all duration-500 ease-in-out 
    px-4 lg:px-7 xl:px-9 2xl:px-11
    py-6 lg:py-10 xl:py-12 2xl:py-16
    space-y-3 md:space-y-5 lg:space-y-7 xl:space-y-9 2xl:space-y-11
    hover:border-2 hover:border-dashed hover:border-[#686893] 
    ${className} `}
    >
      {/* top */}
      <div
        className="flex items-center md:items-start
      space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-5 2xl:space-x-6"
      >
        {/* icon */}
        <div className="space-y-2 lg:space-y-3 xl:space-y-4 2xl:space-y-5">
          {typeof data?.icon === 'object' && data?.icon?.url && (
            <div
              className="
            relative overflow-hidden
            border-[1.125px] border-[rgba(16,16,83,0.15)]
            w-[45px] md:w-[55px] lg:w-[65px] xl:w-[75px] 2xl:w-[85px]
            h-[45px] md:h-[55px] lg:h-[65px] xl:h-[75px] 2xl:h-[85px]
            rounded-full
            flex items-center justify-center
            p-1 xl:p-1.5 2xl:p-2
          "
            >
              {/* default gradient */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,16,83,0.30)_0%,rgba(16,16,83,0)_50%,rgba(16,16,83,0.30)_100%)]" />

              {/* hover gradient */}
              <div
                className="
              absolute inset-0 opacity-0
              transition-opacity duration-300 ease-in
              group-hover/testCard:opacity-100
              bg-[linear-gradient(135deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,1)_100%)]
            "
              />

              <div className="relative z-10 w-full aspect-[5/4] group-hover/testCard:scale-90 transition-all delay-150 duration-300 ease-out">
                <Image
                  src={data?.icon?.url}
                  alt="icon"
                  fill
                  sizes="100vw"
                  className="object-cover object-center w-full h-full"
                  placeholder={data?.iconBlurDataURL ? 'blur' : 'empty'}
                  blurDataURL={data?.iconBlurDataURL || undefined}
                />
              </div>
            </div>
          )}
        </div>
        {/* title and desc */}
        <div className="md:space-y-1.5 lg:space-y-2 xl:space-y-3 2xl:space-y-4">
          <div className="text-dark-1 font-proxima  font-bold global-h4">{data?.title}</div>
          <div className="text-dark-3 font-manrope global-p3 hidden md:block">
            <LocalizedRichText en={data?.description} bn={data?.description} />
          </div>
        </div>
      </div>

      {/* hidden desc */}
      <div className="text-dark-3 font-manrope global-p3 md:hidden text-justify">
        <LocalizedRichText en={data?.description} bn={data?.description} />
      </div>

      {/* below*/}
      <div
        className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-2 
        md:pr-[20px] lg:pr-[20px] xl:pr-[34px] 2xl:pr-[50px]
        md:pl-[68px] lg:pl-[82px] xl:pl-[101px] 2xl:pl-[113px]
        gap-3 lg:gap-5 xl:gap-6 2xl:gap-8"
      >
        {typeof data?.image === 'object' && data?.image?.url && (
          <div className="col-span-1 md:col-span-4 xl:col-span-1 relative w-full aspect-[327/211]">
            <Image
              src={data?.image?.url}
              alt="image"
              fill
              sizes="100vw"
              className="object-cover object-center w-full h-full"
              placeholder={data?.imageBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={data?.imageBlurDataURL || undefined}
            />
          </div>
        )}
        {/* arrays */}
        <div className="col-span-1 md:col-span-8 xl:col-span-1 space-y-2 md:space-y-1 lg:space-y-2 xl:space-y-3 2xl:space-y-4">
          {data?.items &&
            data?.items?.length > 0 &&
            data?.items?.map((item, index) => (
              <div
                key={index}
                className="flex space-x-2 md:space-x-1 lg:space-x-2 xl:space-x-3 2xl:space-x-4
                "
              >
                {typeof item?.icon === 'object' && item?.icon?.url && (
                  <div className="min-w-[20px] md:min-w-[15px] lg:min-w-[20px] xl:min-w-[25px] 2xl:min-w-[30px] mt-0.5 lg:mt-1">
                    <div className="relative  w-full aspect-square">
                      <Image
                        key={index}
                        src={item?.icon?.url}
                        alt="image"
                        fill
                        sizes="100vw"
                        className="object-cover object-center w-full h-full"
                        placeholder={item?.iconBlurDataURL ? 'blur' : 'empty'}
                        blurDataURL={item?.iconBlurDataURL || undefined}
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-0.5 2xl:space-y-1">
                  <div className="font-proxima font-bold global-h6 text-dark-1">{item?.title}</div>
                  <div className="font-manrope global-p4 text-dark-3 text-justify">
                    <LocalizedRichText en={item?.description} bn={item?.description} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default TestingPilarCard
