import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { TestingPillarsBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = {
  data: NonNullable<TestingPillarsBlockType['testingPillars']>[number]
  className?: string
  index?: number
}

function TestingPilarCard({ data, className, index }: Props) {
  return (
    <div
      className="group/testCard w-full bg-white-2
    px-4 lg:px-7 xl:px-9 2xl:px-11
    py-6 lg:py-10 xl:py-12 2xl:py-16
    space-y-3 md:space-y-5 lg:space-y-7 xl:space-y-9 2xl:space-y-11
    "
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
                  key={index}
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
      <div>
        <div>image</div>
        {/* arrays */}
        {data?.items &&
          data?.items?.length > 0 &&
          data?.items?.map((item, index) => (
            <div>
              <div>icon</div>
              <div>
                <div>{item?.title}</div>
                <div>
                  <LocalizedRichText en={item?.description} bn={item?.description} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TestingPilarCard
