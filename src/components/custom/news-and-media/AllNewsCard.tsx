import { Button } from '@/components/ui/button'
import { AllNewsAndBlogDataType } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  data: AllNewsAndBlogDataType
  index: number
  length: number
}

function AllNewsCard({ data, index, length }: Props) {
  return (
    <div
      className="relative grid grid-cols-1 lg:grid-cols-9 
    gap-6 xl:gap-12"
    >
      {/* left */}
      <div
        className={` relative 
       w-full aspect-[3248/2165] 
        lg:col-span-4 ${index % 2 !== 0 ? ' lg:order-2' : ' lg:order-1 '}`}
      >
        <Image
          fill
          src={data?.image}
          alt={data?.title}
          className="object-cover object-center"
          sizes="(max-width: 767px) 300px, 600px"
        />
        <div
          className={`h-5 w-5 bg-white absolute bottom-0 ${index % 2 !== 0 ? ' right-0' : ' left-0 '}`}
        ></div>
      </div>
      {/* right */}
      <div
        className={` lg:col-span-5 
        space-y-3 xl:space-y-6 
        text-center lg:text-start
        max-w-[90%] lg:max-w-full mx-auto lg:mx-0 ${index % 2 !== 0 ? ' lg:order-1 ' : ' lg:order-2 '}`}
      >
        <h5 className="text-[#6E6E6E] global-p2 uppercase tracking-[2px]">{data?.date}</h5>
        <h3 className="global-span ">{data?.title}</h3>
        <p
          className="global-p2 leading-6 line-clamp-4 lg:line-clamp-3 xl:line-clamp-4 2xl:line-clamp-[6] text-justify"
          style={{
            alignSelf: 'stretch',
          }}
        >
          {data?.description}
        </p>
        <div>
          <Link href={`/news-and-media/${data?.id}`} passHref>
            <Button
              variant="link"
              className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit mx-auto lg:mx-0
            global-p2 p-0"
            >
              <div className="flex space-x-1 items-center uppercase ">
                <span>Read More</span>
                <ArrowUpRight />
              </div>
            </Button>
          </Link>
        </div>
      </div>
      {/* horizontal line */}
      {index !== length - 1 && (
        <div className="hidden lg:block absolute inset-x-0 -bottom-12 mx-auto w-full lg:w-[60%] xl:w-fit">
          <img src="/assets/verticalline.png" alt="" className="w-full h-full" />
        </div>
      )}
    </div>
  )
}

export default AllNewsCard
