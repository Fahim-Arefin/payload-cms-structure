import { AllNewsAndBlogDataType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  data: AllNewsAndBlogDataType
}

function NewsSliderCard({ data }: Props) {
  return (
    <Link href={`/news-and-media/${data?.id}`}>
      <div className="border border-[#ED7125] rounded-xl overflow-hidden mx-[2px] lg:mx-[4px] xl:mx-[2px] 2xl:mx-2">
        <div className="overflow-hidden rounded-t-xl w-full">
          <div
            //  h-[220px] md:h-[300px] lg:h-[210px] xl:h-[220px] 2xl:h-[260px]
            className="relative w-full aspect-[3248/2165] "
            role="img"
            aria-label={data?.title}
          >
            <Image
              src={data?.image}
              alt={data?.title}
              fill
              className="object-cover object-center transition-all duration-300 hover:scale-110"
              sizes="(max-width: 767px) 300px, 600px"
            />
          </div>
        </div>
        <div className="p-4 md:p-6 lg:p-4 xl:p-4 2xl:p-6">
          <div className="text-[#6E6E6E] global-p2 uppercase mb-2">{data?.date}</div>
          <p className="global-p2 leading-6 text-justify line-clamp-3">{data?.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default NewsSliderCard
