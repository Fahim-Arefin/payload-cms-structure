import { CS_Collaborative_MobbingBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
// arrowRight.png
import arrowRight from 'public/assets/images/arrowRight.png'

type Props = { block: CS_Collaborative_MobbingBlockType }

function CS_CollaborativeMobbingGrid({ block }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
      {/* left */}
      <div className="">
        {/* mainImage */}
        <div
          className="relative border border-black rounded-[8px]
           2xl:w-full aspect-[902/540] "
        >
          {typeof block?.otherInfo?.mainImage === 'object' && block?.otherInfo?.mainImage?.url && (
            <Image
              fill
              src={block?.otherInfo?.mainImage?.url}
              alt={'Feature Icon'}
              className="object-contain object-center z-10"
              quality={100}
              placeholder="blur"
              blurDataURL={block?.otherInfo?.mainImageBlurDataURL || ''}
            />
          )}
          <div
            className="absolute inset-0 bg-primary-2 z-0 rounded-[8px]
           2xl:w-full aspect-[902/540] left-10 top-10 border border-black"
          >
            <div>below primary background</div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="border border-black space-y-12">
        {/* top */}
        <div
          className="flex 
        2xl:gap-4"
        >
          <div
            className="relative 
           2xl:w-[30px] 2xl:h-[30px]"
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
          <div className="2xl:space-y-2">
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
          <div className=" flex flex-col justify-center items-center gap-2">
            {/* icon */}
            <div
              className="relative 
           2xl:w-[20px] 2xl:h-[20px]"
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
          w-[20px] 2xl:w-[25px] aspect-[93/58]"
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
          <div className=" flex flex-col justify-center items-center gap-2">
            {/* icon */}
            <div
              className="relative 
           2xl:w-[20px] 2xl:h-[20px]"
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
    </div>
  )
}

export default CS_CollaborativeMobbingGrid
