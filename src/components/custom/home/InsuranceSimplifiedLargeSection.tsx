import React from 'react'
import InsuranceCard from './InsuranceCard'
import { InsuranceDataType } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
  data: InsuranceDataType
  content: 'left' | 'right'
}

function InsuranceSimplifiedLargeSection({ data, content }: Props) {
  const [titleFirstWord, ...titleRestWords] = data?.title?.split(' ') || []
  const words = data?.sectionHeading?.split(' ') || []
  const lastWord = words.at(-1) || ''
  const restWords = words.slice(0, -1).join(' ')

  return (
    // <div className="">
    <div className="">
      <div className="">
        {/* headline */}
        {data?.sectionHeading && (
          <div className="">
            <h1
              className="global-h1 uppercase font-semibold space-x-4 
            md:mb-[30px] lg:mb-[40px] xl:mb-[80px]"
            >
              <span>{restWords}</span>
              <span className="text-[#ED7125]">{lastWord}</span>
            </h1>
          </div>
        )}
        <div className={cn(` space-y-6`)}>
          {/* 1st row */}
          <div className={cn(`grid grid-cols-2`)}>
            {/* Left Text Section */}
            <div
              className={cn(
                `text-[#434343] global-h4 p-4 flex flex-col justify-center`,
                content === 'left'
                  ? 'order-1'
                  : 'order-2 md:ml-[16%] lg:ml-[20%] xl:ml-[30%] 2xl:ml-[40%]',
              )}
            >
              <h4 className="font-semibold uppercase">
                <span className="text-[#ED7125] ">{titleFirstWord}</span> {titleRestWords.join(' ')}
              </h4>
              <h4 className="">{data?.subtitle}</h4>
            </div>

            {/* Right Background Image Section */}
            <div
              className={cn(
                `relative md:h-[200px] lg:h-[250px] xl:h-[300px] w-full  
    bg-no-repeat bg-[length:100%_212.5%] bg-[position:0px_-180.566px] 
    rounded-[8.333px_8.333px_53.333px_8.333px]`,
                content === 'left' ? 'order-2' : 'order-1',
              )}
              style={{
                backgroundImage: `url(${data.mainImage})`,
              }}
            >
              <div
                className="absolute 
              md:-bottom-1 lg:-bottom-2 xl:-bottom-4 
              md:-right-1 lg:-right-2 xl:-right-4"
              >
                <img
                  src="/assets/play.svg"
                  alt=""
                  className=" md:w-[60px] lg:w-[80px] xl:w-[100px]  
                  md:h-[60px] lg:h-[80px] xl:h-[100px]"
                />
              </div>
            </div>
          </div>
          {/* second row */}
          <div className="grid grid-cols-3 gap-6">
            {data?.insuranceCardData?.map((item, i) => <InsuranceCard data={item} key={i} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsuranceSimplifiedLargeSection
