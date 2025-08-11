import { AllNewsAndBlogDataType } from '@/types'
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
          {/* mobile */}
          <div
            className="lg:hidden w-full 
            h-[220px] md:h-[300px] lg:h-[210px] xl:h-[220px] 2xl:h-[260px]
            bg-cover transition-all duration-300 hover:scale-110"
            style={{ backgroundImage: `url(${data?.mobileImage})` }}
            role="img"
            aria-label={data?.title}
          />
          {/* web */}
          <div
            className="hidden lg:block w-full 
            h-[220px] md:h-[300px] lg:h-[210px] xl:h-[220px] 2xl:h-[260px]
            bg-cover transition-all duration-300 hover:scale-110"
            style={{ backgroundImage: `url(${data?.image})` }}
            role="img"
            aria-label={data?.title}
          />
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
