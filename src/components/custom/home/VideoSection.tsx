'use client'
// import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React, { useState } from 'react'
import { BsPlay } from 'react-icons/bs'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
// import ToolTip from '../shared/ToolTip'
// import LottiePlayer from '../shared/LottiePlayer'
// import LottieBackground from '../shared/LottieBackground'

function VideoSection() {
  const [open, setOpen] = useState(false)
  return (
    <div className="pt-[150px] md:pt-[100px] lg:pt-[150px] xl:pt-[200px] bg-white">
      <div className="relative w-full font-avenir h-[230px] md:h-[350px] lg:h-[400px] xl:h-[550px] 2xl:h-[600px]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/bg.mp4`} type="video/mp4" />
        </video>
        {/* <LottiePlayer
          className="absolute inset-0 z-0"
          style={{ width: '100%', objectFit: 'fill' }}
          src="/assets/homepage/test5.json"
          background="white"
        /> */}
        {/* Lottie background */}
        {/* <LottieBackground src="/assets/homepage/test6.json" background="white" /> */}
        {/* <div className="absolute inset-0 z-0 w-full h-full">
          <DotLottieReact
            src="/assets/homepage/test5.json"
            autoplay
            loop
            style={{
              width: '100%',
              height: '100%',
              // border: '1px solid red',
              display: 'block',
            }}
          />
        </div> */}

        {/* Semi-transparent black overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Foreground content */}
        <div
          className="relative z-20 text-white bg-[#3A3A3A] 
          p-4 lg:p-6 
          w-[85%] md:w-[70%] lg:w-[65%] xl:w-[60%]  2xl:w-[52%] 
          h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[560px]
          rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px] mx-auto
          -top-[100px] lg:-top-[120px] xl:-top-[160px] 2xl:-top-[200px]"
        >
          <div className="relative w-full h-full rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-4.jpg`}
              alt="Video thumbnail"
              fill
              className="inset-0 rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px] object-cover"
              sizes="(max-width: 1023px) 300px, (max-width: 1349px) 500px, 600px"
            />
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
                    <div className="text-white font-medium global-p2">
                      <LocalizedText en="From the Expert" bn="এক্সপার্টদের থেকে" />
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
                    <DialogTitle>Expert Video</DialogTitle>
                  </VisuallyHidden>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/YbnlDrexiGE"
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
        <div
          className="z-20 absolute inset-x-0
          text-center text-white
          bottom-10 lg:bottom-12 xl:bottom-16 2xl:bottom-20 
          global-h2 md:font-medium uppercase"
        >
          {/* Stay Ahead With Our <span className="text-[#ED7125]">Experts </span> */}
          <LocalizedHighlighted
            textBn="থাকুন এক ধাপ এগিয়ে"
            textEn="Stay Ahead With Our Experts"
            highlightBn="এগিয়ে"
            highlightEn="Experts"
            highlightClassName="text-[#ED7125]"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoSection
