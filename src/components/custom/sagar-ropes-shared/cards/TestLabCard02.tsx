import {
  PerformanceAndApplicationCardBlockType,
  ProductAdvantageCardBlockType,
} from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import CtaButtons from '../buttons/CtaButtons'

type Props = {
  className?: string
  data: NonNullable<NonNullable<PerformanceAndApplicationCardBlockType['testLabCards']>[number]>
}

function TestLabCard02({ className, data }: Props) {
  const colored = data?.icon
  const white = data?.iconWhite

  return (
    <div
      className={`group/testCard transition-all duration-300 ease-in hover:bg-cyan flex items-center justify-center ${className}
      flex flex-col justify-evenly`}
    >
      {/* icon */}
      {(typeof colored === 'object' && colored?.url) ||
      (typeof white === 'object' && white?.url) ? (
        <div
          className="relative rounded-full transition-all delay-150 duration-150 ease-in-out
            w-[30px] md:w-[40px] lg:w-[50px] xl:w-[60px]
            h-[30px] md:h-[40px] lg:h-[50px] xl:h-[60px]"
        >
          {/* colored (default) */}
          {typeof colored === 'object' && colored?.url && (
            <Image
              src={colored.url}
              alt="icon"
              fill
              sizes="100vw"
              className="object-contain transition-all delay-150 duration-150 ease-in-out group-hover/testCard:opacity-0"
              placeholder={data?.iconBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={data?.iconBlurDataURL || undefined}
            />
          )}

          {/* white (hover) */}
          {typeof white === 'object' && white?.url && (
            <Image
              src={white.url}
              alt="icon white"
              fill
              sizes="100vw"
              className="object-contain opacity-0 transition-all delay-150 duration-150 ease-in-out
                group-hover/testCard:opacity-100 group-hover/testCard:scale-150"
              placeholder={data?.iconWhiteBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={data?.iconWhiteBlurDataURL || undefined}
            />
          )}
        </div>
      ) : null}

      <div
        className="flex flex-col items-center justify-center transition-all delay-150 duration-150 ease-in-out
      group-hover/testCard:mt-[7%]"
      >
        {/* title and subtitle */}
        {(data?.title || data?.subtitle) && (
          <div className="font-proxima global-h4 font-bold text-dark-1 transition-all delay-150 duration-150 ease-in-out group-hover/testCard:text-white">
            {data?.title && <div>{data?.title}</div>}
            {data?.subtitle && <div>{data?.subtitle}</div>}
          </div>
        )}

        {/* link */}
        {data?.ctaButtons && (
          <div>
            <CtaButtons item={data?.ctaButtons} groupName="testCard" />
          </div>
        )}
      </div>
    </div>
  )
}

export default TestLabCard02
