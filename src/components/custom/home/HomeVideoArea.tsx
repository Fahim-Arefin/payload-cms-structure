'use client'
import React, { useState } from 'react'
import { BsPlay } from 'react-icons/bs'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'
import { LifeInsuranceVideoBlockType } from '@/types/payloadCustomTypes'
type Props = {
  data: LifeInsuranceVideoBlockType
}

function HomeVideoArea({ data }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <div
      // h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[560px]
      // -top-[100px] lg:-top-[120px] xl:-top-[160px] 2xl:-top-[200px]
      className="relative z-20 text-white bg-[#3A3A3A]
          p-4 lg:p-6
          w-[85%] md:w-[70%] lg:w-[65%] xl:w-[60%]  2xl:w-[52%]
          h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[560px]
          rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px] mx-auto
          -top-12 md:-top-[70px] lg:-top-[90px] xl:-top-[100px] 2xl:-top-[150px]"
    >
      <div className="relative w-full h-full rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px]">
        {typeof data?.thumbnail === 'object' && data?.thumbnail?.url && (
          <Image
            // src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-4.jpg`}
            src={data?.thumbnail?.url || ''}
            alt="Video thumbnail"
            fill
            className="inset-0 rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px] object-cover"
            sizes="(max-width: 1023px) 300px, (max-width: 1349px) 500px, 600px"
            // placeholder="blur"
            // blurDataURL={data?.thumbnailBlurDataURL || ''}
          />
        )}
      </div>

      {/* linear-gradient overlay */}
      <div
        className="rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px]
          absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))]"
      />

      <div className="relative z-30 -mt-14 lg:-mt-16 xl:-mt-20">
        <div className="flex items-center justify-between w-[85%] mx-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex space-x-2 2xl:space-x-4 text-white items-center cursor-pointer">
                <div className="border-2 border-white rounded-full p-1 2xl:p-2">
                  <BsPlay className="font-bold" />
                </div>
                {/* <div className="text-white font-medium global-p2">{data?.youtubeButtonText}</div> */}
                <LocalizedText
                  as="div"
                  className="text-white font-medium global-p2"
                  en={data?.youtubeButtonText}
                  bn={data?.youtubeButtonTextBN}
                />
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
                <DialogTitle>Expert Video</DialogTitle>
              </VisuallyHidden>
              <iframe
                width="100%"
                height="100%"
                // src="https://www.youtube.com/embed/YbnlDrexiGE"
                src={data?.youtubeUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default HomeVideoArea
