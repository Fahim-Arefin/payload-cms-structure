import { Review } from '@/payload-types'
import Image from 'next/image'
import React from 'react'
import Quote from 'public/assets/images/QuoteIcon.png'
import Profile from 'public/assets/images/avatar.png'
import { CustomerfeedbackBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: Review
  block: CustomerfeedbackBlockType
}

function ReviewItem({ data, block }: Props) {
  return (
    <div
      className="flex flex-col justify-between 
    h-[180px] lg:h-[225px] xl:h-[330px] 2xl:h-[400px]
    "
    >
      <div className="w-[35px] lg:w-[40px] xl:w-[60px] 2xl:w-[80px] aspect-auto">
        <Image
          src={Quote}
          alt="Quote Icon"
          width={Quote?.width}
          height={Quote?.height}
          placeholder="blur"
          blurDataURL={Quote?.blurDataURL}
          quality={90}
          sizes="100vw"
          className="w-fit h-fit"
        />
      </div>

      <div className="font-manrope global-p3 2xl:global-p2 text-dark-3 text-justify line-clamp-5 xl:line-clamp-6">
        {data?.review}
      </div>
      <div className="border-t w-full border-dashed  border-t-[#D0D0F6]">
        <div className="invisible"></div>
      </div>

      <div
        className="flex items-center 
      space-x-2 xl:space-x-4 2xl:space-x-6"
      >
        <div className="w-[35px] lg:w-[40px] xl:w-[55px] 2xl:w-[60px] aspect-square">
          <Image
            src={Profile}
            alt="Profile Icon"
            width={Profile?.width}
            height={Profile?.height}
            placeholder="blur"
            blurDataURL={Profile?.blurDataURL}
            quality={90}
            sizes="100vw"
            className="w-fit h-fit"
          />
        </div>
        <div>
          <div className="font-proxima font-bold global-h5 2xl:global-h4 text-dark-1">
            {' '}
            {data?.name}
          </div>

          <div className="font-manrope global-p5 2xl:global-p4 text-dark-3">
            {data?.position ? data?.position : block?.defaultPosition}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewItem
