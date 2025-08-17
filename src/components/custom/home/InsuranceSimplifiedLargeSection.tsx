'use client'
import React from 'react'
import InsuranceCard from './InsuranceCard'
import { InsuranceDataType } from '@/types'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Link from 'next/link'
import Image from 'next/image'

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
          <div className="hidden md:block">
            <h1
              className="global-h1 uppercase font-semibold space-x-4 
            mb-[15px] md:mb-[30px] lg:mb-[40px] xl:mb-[80px]"
            >
              <span>{restWords}</span>
              <span className="text-[#ED7125]">{lastWord}</span>
            </h1>
          </div>
        )}
        <div className={cn(` space-y-6`)}>
          {/* 1st row */}
          <div className={cn(`grid grid-cols-1 md:grid-cols-2`)}>
            {/* Left Text Section */}
            <div
              className={cn(
                `text-[#434343] global-h4 py-2 md:p-4 flex flex-col justify-center md:space-y-1 lg:space-y-2 `,
                content === 'left'
                  ? 'md:order-1 md:mr-[16%] lg:mr-[20%] xl:mr-[30%] 2xl:mr-[35%]'
                  : 'md:order-2 md:ml-[16%] lg:ml-[20%] xl:ml-[30%] 2xl:ml-[35%]',
              )}
            >
              <h4 className="font-semibold uppercase cursor-pointer">
                <Link href="/">
                  <span className="text-[#ED7125] ">{titleFirstWord} </span>{' '}
                  {titleRestWords.join(' ')}
                </Link>
              </h4>
              <h4 className="">{data?.subtitle}</h4>
            </div>
            {/* right Section */}
            <Dialog>
              <DialogTrigger asChild>
                <div
                  // w-full aspect-[640/480]
                  // h-[150px] md:h-[180px] lg:h-[210px] xl:h-[280px] 2xl:h-[320px] w-full
                  className={cn(
                    `relative group cursor-pointer 
                    h-[150px] md:h-[180px] lg:h-[210px] xl:h-[280px] 2xl:h-[320px] w-full
                    overflow-hidden transition-all`,
                    content === 'left' ? 'order-2' : 'order-1',
                  )}
                >
                  {/* <div
                    className="absolute inset-0 bg-no-repeat bg-contain bg-center"
                    style={{ backgroundImage: `url(${data.mainImage})` }}
                  /> */}
                  <Image
                    src={data.mainImage}
                    alt={data?.subtitle ?? 'Video thumbnail'}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1023px) 300px, (max-width: 1349px) 400px, 500px"
                    // placeholder="blur" blurDataURL="/tiny-placeholder.png"
                  />
                  {/* Hover dark overlay */}
                  <div
                    className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300 
                  rounded-[4.333px_4.333px_19.333px_4.333px] lg:rounded-[4.333px_4.333px_29.333px_4.333px] xl:rounded-[4.333px_4.333px_39.333px_4.333px]"
                  />

                  {/* Play Button */}
                  <div
                    className="absolute 
              -bottom-0.5 lg:-bottom-0.5 xl:bottom-0 2xl:bottom-0
              -right-0.5 lg:-right-0.5 xl:-right-[3px] 2xl:-right-0.5 "
                  >
                    <img
                      src="/assets/icons/web/play.svg"
                      alt=""
                      className=" 
                      w-[30px] lg:w-[40px] xl:w-[50px] 2xl:w-[60px]  
                      h-[30px] lg:h-[40px] xl:h-[50px] 2xl:h-[60px]"
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
          <div className="grid grid-cols-3 gap-1 md:gap-2 xl:gap-6">
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
