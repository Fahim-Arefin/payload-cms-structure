import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { CollaborativeMethodBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import Line from 'public/assets/images/Line.png'
import Image from 'next/image'
import arrowRight from 'public/assets/images/arrowRight.png'
type Props = { block: CollaborativeMethodBlockType }

function CM_LeftsideContent({ block }: Props) {
  return (
    <div
      className="flex flex-col justify-center items-center
    space-y-4 md:space-y-6 lg:space-y-6 xl:space-y-10 2xl:space-y-16
    "
    >
      {/* top */}
      <div className="text-secondary-1 font-grift global-p4 opacity-80">
        <LocalizedRichText
          bn={block?.collaborativeMethodInfo?.description}
          en={block?.collaborativeMethodInfo?.description}
        />
      </div>
      {/* middle */}
      <div className="relative w-full aspect-[660/1]">
        <Image
          fill
          src={Line}
          alt="Line Image"
          sizes="100vw"
          quality={100}
          className="w-full h-full"
          placeholder="blur"
          blurDataURL={Line?.blurDataURL}
        />
      </div>
      {/* bottom */}
      <div className="flex justify-around items-center w-full">
        {/* left */}
        <div className=" flex flex-col justify-center items-center gap-1 xl:gap-2">
          {/* icon */}
          <div
            className="relative 
                 w-[16px] xl:w-[25px] 
                 aspect-square"
          >
            {typeof block?.collaborativeMethodInfo?.designer?.designerIcon === 'object' &&
              block?.collaborativeMethodInfo?.designer?.designerIcon?.url && (
                <Image
                  fill
                  src={block?.collaborativeMethodInfo?.designer?.designerIcon?.url}
                  alt={'Feature Icon'}
                  className="object-contain object-center"
                  quality={100}
                  placeholder="blur"
                  blurDataURL={
                    block?.collaborativeMethodInfo?.designer?.designerIconBlurDataURL || ''
                  }
                />
              )}
          </div>
          {/* label */}
          <div className="font-grift text-primary-1 global-p4 font-semibold">
            {block?.collaborativeMethodInfo?.designer?.title}
          </div>
          {/* description */}
          <div className="font-grift text-secondary-1 global-p5">
            {block?.collaborativeMethodInfo?.designer?.subtitle}
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
                 w-[16px] xl:w-[25px] 
                 aspect-square"
          >
            {typeof block?.collaborativeMethodInfo?.builder?.builderIcon === 'object' &&
              block?.collaborativeMethodInfo?.builder?.builderIcon?.url && (
                <Image
                  fill
                  src={block?.collaborativeMethodInfo?.builder?.builderIcon?.url}
                  alt={'Feature Icon'}
                  className="object-contain object-center"
                  quality={100}
                  placeholder="blur"
                  blurDataURL={
                    block?.collaborativeMethodInfo?.builder?.builderIconBlurDataURL || ''
                  }
                />
              )}
          </div>
          {/* label */}
          <div className="font-grift text-primary-1 global-p4 font-semibold">
            {block?.collaborativeMethodInfo?.builder?.title}
          </div>
          {/* description */}
          <div className="font-grift text-[#191C1D] global-p5">
            {block?.collaborativeMethodInfo?.builder?.subtitle}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CM_LeftsideContent
