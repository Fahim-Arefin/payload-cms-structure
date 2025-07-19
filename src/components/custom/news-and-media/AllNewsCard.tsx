import { Button } from '@/components/ui/button'
import { AllNewsAndBlogDataType } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  data: AllNewsAndBlogDataType
  index: number
}

function AllNewsCard({ data, index }: Props) {
  return (
    <div
      className="relative grid grid-cols-1 lg:grid-cols-9 
    gap-6 xl:gap-12"
    >
      <div
        className={` relative 
        lg:max-w-[450px] 2xl:max-w-[500px]  
        max-h-[230px] md:max-h-[350px] lg:max-h-[230px] xl:max-h-[260px] 2xl:max-h-[300px] 
        lg:col-span-4 ${index % 2 !== 0 ? ' lg:order-2  2xl:ml-12' : ' lg:order-1 '}`}
      >
        <img src={data?.image} alt={data?.title} className="w-full h-full " />
        <div
          className={`h-5 w-5 bg-white absolute bottom-0 ${index % 2 !== 0 ? ' right-0' : ' left-0 '}`}
        ></div>
      </div>
      <div
        className={` lg:col-span-5 
        space-y-3 xl:space-y-6 
        text-center lg:text-start
        max-w-[90%] lg:max-w-full mx-auto lg:mx-0 ${index % 2 !== 0 ? ' lg:order-1 ' : ' lg:order-2 '}`}
      >
        <h5 className="text-[#6E6E6E] global-p2 uppercase tracking-[2px]">{data?.date}</h5>
        <h3 className="global-span ">{data?.title}</h3>
        <p
          className="global-p2 leading-6"
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
      <div className="hidden lg:block absolute inset-x-0 -bottom-12 mx-auto w-full lg:w-[60%] xl:w-fit">
        <img src="/assets/verticalline.png" alt="" className="w-full h-full" />
      </div>
    </div>
  )
}

export default AllNewsCard
