'use client'
import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useState } from 'react'
import QuoteIcon from 'public/assets/images/QuoteIcon.png'
import Frame from 'public/assets/images/Frame1.png'
import Ellipse from 'public/assets/images/Ellipse.png'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import Button02 from '@/components/custom/sagar-ropes-shared/buttons/Button02'

type Props = {
  block: FounderQuoteBlockType
}

function FounderQuoteSection({ block }: Props) {
  const [expand, setExpand] = useState(false)

  const handleClick = () => {
    setExpand(!expand)
  }

  return (
    <div
      className="mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 
        gap-4 md:gap-6 lg:gap-10 xl:gap-16 2xl:gap-28
        grid grid-cols-1 md:grid-cols-12 "
    >
      {/* left */}
      <div
        className="col-span-1 md:col-span-4  
          flex flex-col items-center justify-center
          transition-all duration-300 ease-out
          "
      >
        <div className="relative w-fit h-fit aspect-[800/1008] ">
          <Image
            src={Frame}
            alt="Frame"
            quality={90}
            width={Frame?.width}
            height={Frame?.height}
            placeholder="blur"
            blurDataURL={Frame.blurDataURL}
          />

          <div
            className="absolute w-full h-full 
                left-0 
                bottom-7 md:bottom-3 lg:bottom-4 xl:bottom-4 2xl:bottom-7
                "
          >
            <Image
              src={Ellipse}
              alt="Ellipse image"
              fill
              quality={90}
              sizes="50vw"
              placeholder="blur"
              blurDataURL={Ellipse?.blurDataURL}
            />
          </div>

          {typeof block?.profileImage === 'object' && block?.profileImage?.url && (
            // left-2 md:left-2 lg:left-3 xl:left-4 2xl:left-5
            // bottom-7 md:bottom-3 lg:bottom-4 xl:bottom-4 2xl:bottom-7
            <div
              className="absolute w-full h-full 
                left-2 md:left-2 lg:left-3 xl:left-4 2xl:left-5
                bottom-[29px] md:bottom-[13px] lg:bottom-[17px] xl:bottom-[17px] 2xl:bottom-[30px]
                "
            >
              <Image
                src={block.profileImage.url}
                alt="profile image"
                fill
                quality={90}
                sizes="50vw"
                className="object-center object-cover"
                placeholder="blur"
                blurDataURL={block?.profileImageBlurDataURL || ''}
              />
            </div>
          )}
        </div>
        {/* name and designation */}
        <div
          className="text-center 
        mt-1 lg:mt-2 xl:mt-3 2xl:mt-4"
        >
          <div
            className="font-proxima font-bold global-h6 text-dark-1 
                "
          >
            {block?.name}
          </div>
          <div
            className="font-manrope global-p5
                text-[#0B0B3B] 
              "
          >
            {block?.designation}
          </div>
        </div>
      </div>
      {/* right */}
      <div
        className="col-span-1 md:col-span-8 flex flex-col justify-center
        transition-all duration-300 ease-out
         space-y-2 lg:space-y-3 xl:space-y-5 2xl:space-y-6 
          "
      >
        {/* icon */}
        <div
          className="
            w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px] 
            h-[47px] lg:h-[57px] xl:h-[67px] 2xl:h-[77px]"
        >
          <Image
            src={QuoteIcon}
            alt="Quote Icon"
            quality={90}
            placeholder="blur"
            blurDataURL={QuoteIcon.blurDataURL}
            width={QuoteIcon?.width}
            height={QuoteIcon?.height}
          />
        </div>
        {/* description */}
        <div
          //         className={`overflow-hidden font-manrope text-[16px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]
          //   tracking-[1.1px] leading-[181.818%] text-dark-3 text-justify
          //   transition-all duration-500 ease-in-out opacity-90
          //   ${expand ? 'max-h-[1200px]' : 'max-h-[200px] lg:max-h-[200px] xl:max-h-[350px] '}
          // `}
          className={`overflow-hidden font-manrope global-p2
     text-dark-3 text-justify
    transition-all duration-500 ease-in-out opacity-90
    ${expand ? 'max-h-[1200px]' : 'max-h-[160px] lg:max-h-[185px] xl:max-h-[260px] 2xl:max-h-[330px] '}
  `}
        >
          <LocalizedRichText en={block?.quote} bn={block?.quote} />
        </div>

        {/* link */}
        <div className="-ml-0.5 md:-ml-1 ">
          <Button02 onClick={handleClick}>{expand ? 'Read Less' : 'Read More'}</Button02>
        </div>
      </div>
    </div>
  )
}

export default FounderQuoteSection
