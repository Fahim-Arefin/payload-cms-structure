import React from 'react'
import InsuranceCard from './InsuranceCard'
import { InsuranceDataType } from '@/types'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Link from 'next/link'

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
                `text-[#434343] global-h4 p-4 flex flex-col justify-center space-y-1 lg:space-y-2`,
                content === 'left'
                  ? 'order-1 md:mr-[16%] lg:mr-[20%] xl:mr-[30%] 2xl:mr-[35%]'
                  : 'order-2 md:ml-[16%] lg:ml-[20%] xl:ml-[30%] 2xl:ml-[35%]',
              )}
            >
              <h4 className="font-semibold uppercase cursor-pointer">
                <Link href="/">
                  <span className="text-[#ED7125] ">{titleFirstWord}</span>{' '}
                  {titleRestWords.join(' ')}
                </Link>
              </h4>
              <h4 className="">{data?.subtitle}</h4>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div
                  className={cn(
                    `relative group cursor-pointer 
        md:h-[180px] lg:h-[210px] xl:h-[280px] 2xl:h-[320px] w-full  
        bg-no-repeat bg-contain 
        bg-center 
   md:rounded-[8.333px_8.333px_25.333px_8.333px] LG:rounded-[8.333px_8.333px_33.333px_8.333px] xl:rounded-[8.333px_8.333px_40.333px_8.333px] 2xl:rounded-[8.333px_8.333px_53.333px_8.333px]
        overflow-hidden transition-all`,
                    content === 'left' ? 'order-2' : 'order-1',
                  )}
                  style={{
                    backgroundImage: `url(${data.mainImage})`,
                  }}
                >
                  {/* Hover dark overlay */}
                  <div
                    className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300 
                  rounded-[8.333px_8.333px_53.333px_8.333px]"
                  />

                  {/* Play Button */}
                  <div
                    className="absolute 
              md:-bottom-0.5 lg:-bottom-0.5 xl:bottom-0 2xl:bottom-0.5 
              md:-right-0.5 lg:-right-0.5 xl:-right-[3px] 2xl:-right-0.5 "
                  >
                    <img
                      src="/assets/play.svg"
                      alt=""
                      className=" 
                      md:w-[50px] lg:w-[60px] xl:w-[80px] 2xl:w-[90px]  
                      md:h-[50px] lg:h-[60px] xl:h-[80px] 2xl:h-[90px]"
                    />
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent
                className="max-w-5xl w-full aspect-video p-0 bg-black 
      [&>button.absolute]:top-3 [&>button.absolute]:right-3 
      [&>button.absolute]:bg-black/50 
      [&>button.absolute]:text-white 
      [&>button.absolute]:hover:bg-black/80"
              >
                <VisuallyHidden>
                  <DialogTitle>Insurance Video</DialogTitle>
                </VisuallyHidden>

                <iframe
                  width="100%"
                  height="100%"
                  src={data.mainVIdeoLink}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </DialogContent>
            </Dialog>
          </div>
          {/* second row */}
          <div className="grid grid-cols-3 gap-2 xl:gap-6">
            {data?.insuranceCardData?.map((item, i) => (
              <InsuranceCard data={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsuranceSimplifiedLargeSection
