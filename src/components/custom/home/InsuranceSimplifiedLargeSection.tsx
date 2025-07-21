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

            {/* Right Background Image Section */}
            {/* <div
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
            </div> */}

            <Dialog>
              <DialogTrigger asChild>
                <div
                  className={cn(
                    `relative group cursor-pointer 
        md:h-[180px] lg:h-[210px] xl:h-[280px] 2xl:h-[320px] w-full  
        bg-no-repeat bg-cover 
        bg-center lg:bg-[position:0px_-35px] xl:bg-[position:0px_-55px]  2xl:bg-[position:0px_-65px] 
   md:rounded-[5.333px_5.333px_53.333px_5.333px] lg:rounded-[8.333px_8.333px_53.333px_8.333px]
        overflow-hidden transition-all`,
                    content === 'left' ? 'order-2' : 'order-1',
                  )}
                  style={{
                    backgroundImage: `url(${data.mainImage})`,
                  }}
                >
                  {/* Hover dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300 rounded-[8.333px_8.333px_53.333px_8.333px]" />

                  {/* Play Button */}
                  <div
                    className="absolute 
              md:-bottom-0 lg:-bottom-0.5 xl:-bottom-2 
              md:-right-0 lg:-right-1 xl:-right-1 "
                  >
                    <img
                      src="/assets/play.svg"
                      alt=""
                      className=" 
                      md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]  
                      md:h-[50px] lg:h-[60px] xl:h-[70px] 2xl:h-[80px]"
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
