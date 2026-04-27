import { CustomerfeedbackBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import Stars from 'public/assets/icons/5Stars.png'
import { Review } from '@/payload-types'

type Props = {
  block: CustomerfeedbackBlockType
  reviews: Review[]
}

function ImageBanner({ block, reviews }: Props) {
  const sumOfAllPublishedRating = reviews?.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.rating,
    0,
  )

  const AvgOfSumOfAllPublishedRating = reviews?.length
    ? sumOfAllPublishedRating / reviews.length
    : 0

  return (
    <div className="relative w-full aspect-[954/860] group overflow-hidden">
      {/* image */}
      {typeof block?.bannerImage === 'object' && block?.bannerImage?.url && (
        <Image
          src={block?.bannerImage?.url}
          alt="Banner Image"
          fill
          sizes="50vw"
          placeholder="blur"
          blurDataURL={block?.bannerImageBlurDataURL || ''}
          quality={90}
          className="object-cover object-center inset-0 w-full h-full z-10 group-hover:scale-[115%] transition-all duration-300 ease-in-out"
        />
      )}

      {/* title */}
      <div
        className="absolute inset-x-0 top-0 z-20 global-h2 font-proxima font-bold text-white-1 text-center
          px-[12px] lg:px-[16px] xl:px-[22px] 2xl:px-[35px]
          py-[16px] lg:py-[22px] xl:py-[38px] 2xl:py-[50px]"
      >
        {block?.bannerTitle}
      </div>
      {/* subtitle */}
      <div
        className="absolute bottom-0 right-0 bg-white-2 z-20
          pl-1.5 lg:pl-2 xl:pl-3 2xl:pl-4 
          pt-1.5 lg:pt-2 xl:pt-3 2xl:pt-4"
      >
        <div
          className="bg-cyan 
            p-1.5 lg:p-2 xl:p-3 2xl:p-4 
            w-[130px] lg:w-[150px] xl:w-[165px] 2xl:w-[200px]
            h-[100px] lg:h-[130px] xl:h-[165px] 2xl:h-[200px]"
        >
          <div className="flex flex-col justify-around h-full">
            <div className="font-proxima font-bold global-h2 text-white-1">
              {AvgOfSumOfAllPublishedRating.toFixed(1)}
            </div>
            <div className="space-y-2">
              {/* stars */}
              <div className="w-[50%] h-fit">
                <Image
                  src={Stars}
                  alt="5 Stars"
                  width={Stars?.width}
                  height={Stars?.height}
                  quality={90}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={Stars?.blurDataURL}
                  className="w-fit h-fit "
                />
              </div>
              <div className="font-manrope font-light global-p5 text-white-1">
                {block?.bannerSubtitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageBanner
