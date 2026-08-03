import { CS_Collaborative_MobbingBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
// arrowRight.png
import arrowRight from 'public/assets/images/arrowRight.png'

type Props = { block: CS_Collaborative_MobbingBlockType }

function CS_RightsideContent({ block }: Props) {
  return (
    <div className="space-y-4 lg:space-y-8 xl:space-y-12 2xl:space-y-16">
      {/* top */}
      <div
        className="flex items-start
        gap-2 xl:gap-3 2xl:gap-4"
      >
        <div
          className="relative 
            aspect-square
             h-[16px] lg:h-[19px] xl:h-[23px] 2xl:h-[25px]
             mt-[1px] md:mt-[2px] lg:mt-[3px] xl:mt-[5px] 2xl:mt-[4px]
            "
        >
          {typeof block?.otherInfo?.feature?.icon === 'object' &&
            block?.otherInfo?.feature?.icon?.url && (
              <Image
                fill
                src={block?.otherInfo?.feature?.icon?.url}
                alt={'Feature Icon'}
                className="object-contain object-center"
                quality={100}
                placeholder="blur"
                blurDataURL={block?.otherInfo?.feature?.iconBlurDataURL || ''}
              />
            )}
        </div>
        <div className="space-y-1 lg:space-y-2 xl:space-y-3 2xl:space-y-4">
          <div className="global-p3 font-grift font-semibold text-[#191C1D]">
            {block?.otherInfo?.feature?.title}
          </div>
          <div className="global-p5 font-grift text-[#43474E]">
            {block?.otherInfo?.feature?.description}
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="flex justify-around items-center">
        {/* left */}
        <div className=" flex flex-col justify-center items-center gap-1 xl:gap-2">
          {/* icon */}
          <div
            className="relative 
           w-[16px] xl:w-[20px] 
           h-[16px] xl:h-[20px]"
          >
            {typeof block?.otherInfo?.roles?.navigatorIcon === 'object' &&
              block?.otherInfo?.roles?.navigatorIcon?.url && (
                <Image
                  fill
                  src={block?.otherInfo?.roles?.navigatorIcon?.url}
                  alt={'Feature Icon'}
                  className="object-contain object-center"
                  quality={100}
                  placeholder="blur"
                  blurDataURL={block?.otherInfo?.roles?.navigatorIconBlurDataURL || ''}
                />
              )}
          </div>
          {/* label */}
          <div className="font-grift text-primary-1 global-p6">
            {block?.otherInfo?.roles?.navigatorLabel}
          </div>
          {/* description */}
          <div className="font-grift text-[#191C1D] global-p5">
            {block?.otherInfo?.roles?.navigatorDescription}
          </div>
        </div>
        {/* middle */}
        <div
          className="relative 
          w-[16px] xl:w-[20px] 2xl:w-[25px] aspect-[93/58]"
        >
          {/* icon */}
          <Image
            src={arrowRight}
            alt="Arrow Right Icon"
            className="w-full h-full"
            fill
            quality={100}
            placeholder="blur"
            blurDataURL={arrowRight?.blurDataURL}
          />
        </div>
        {/* right */}
        <div className=" flex flex-col justify-center items-center gap-1 xl:gap-2">
          {/* icon */}
          <div
            className="relative 
           w-[16px] xl:w-[20px] 
           h-[16px] xl:h-[20px]"
          >
            {typeof block?.otherInfo?.roles?.driverIcon === 'object' &&
              block?.otherInfo?.roles?.driverIcon?.url && (
                <Image
                  fill
                  src={block?.otherInfo?.roles?.driverIcon?.url}
                  alt={'Feature Icon'}
                  className="object-contain object-center"
                  quality={100}
                  placeholder="blur"
                  blurDataURL={block?.otherInfo?.roles?.driverIconBlurDataURL || ''}
                />
              )}
          </div>
          {/* label */}
          <div className="font-grift text-primary-1 global-p6">
            {block?.otherInfo?.roles?.driverLabel}
          </div>
          {/* description */}
          <div className="font-grift text-[#191C1D] global-p5">
            {block?.otherInfo?.roles?.driverDescription}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CS_RightsideContent
