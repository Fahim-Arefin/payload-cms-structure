import { Button } from '@/components/ui/button'
import { AllNewsAndBlogDataType } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

type Props = {
  data: AllNewsAndBlogDataType
  index: number
}

function AllNewsCard({ data, index }: Props) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-9 
    gap-6 xl:gap-12"
    >
      <div
        className={`relative 
        lg:max-w-[450px] 2xl:max-w-[500px] 
        lg:max-h-[230px] xl:max-h-[260px] 2xl:max-h-[300px] 
        lg:col-span-4 ${index % 2 !== 0 ? ' order-2' : ' order-1 '}`}
      >
        <img src={data?.image} alt={data?.title} className="w-full h-full " />
        <div
          className={`h-5 w-5 bg-white absolute bottom-0 ${index % 2 !== 0 ? ' right-0 ' : ' left-0 '}`}
        ></div>
      </div>
      <div
        className={` lg:col-span-5 
        space-y-3 xl:space-y-6 
        text-center lg:text-start
        max-w-[90%] lg:max-w-full mx-auto lg:mx-0 ${index % 2 !== 0 ? ' order-1' : ' order-2 '}`}
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
        <Button
          variant="link"
          className="text-[#ED7125] hover:underline w-fit mx-auto lg:mx-0
           global-p2 p-0"
        >
          <div className="flex space-x-1 items-center ">
            <span>Explore</span>
            <ArrowUpRight />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default AllNewsCard
