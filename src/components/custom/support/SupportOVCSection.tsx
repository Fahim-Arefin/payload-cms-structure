'use client'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { FC, useState } from 'react'
import { BsPlay } from 'react-icons/bs'
import LottieBackground from '../shared/LottieBackground'

type SupportOVCSectionProps = {}

const SupportOVCSection: FC<SupportOVCSectionProps> = ({}) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="pt-[100px] lg:pt-[120px] xl:pt-[160px] 2xl:pt-[200px]
      pb-8 md:pb-12 lg:pb-[75px] xl:pb-[90px] 2xl:pb-[100px] bg-white 
    "
    >
      <div className="relative w-full font-avenir h-[230px] md:h-[300px] lg:h-[370px] xl:h-[450px] 2xl:h-[500px]">
        {/* Background GIF */}
        {/* <img
          src="/assets/bg.lottie"
          alt="background gif"
          className="absolute inset-0 w-full h-full object-cover z-0"
        /> */}
        {/* <LottieBackground src="/assets/homepage/test6.json" background="white" /> */}
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
          <div
            className="lg:hidden flex justify-between items-center w-full h-full rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px]"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/assets/supportpage/mobile/thumbnails/yt-thumbnail-10.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'lightgray',
            }}
          ></div>
          <div
            className="hidden lg:flex justify-between items-center w-full h-full rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px]"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/assets/supportpage/web/thumbnails/yt-thumbnail-10.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'lightgray',
            }}
          ></div>
          <div className=" -mt-14 lg:-mt-16 xl:-mt-20">
            <div className="flex items-center justify-between w-[85%] mx-auto">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <div className="flex space-x-2 2xl:space-x-4 text-white items-center cursor-pointer">
                    <div className="border-2 border-white rounded-full p-1 2xl:p-2">
                      <BsPlay />
                    </div>
                    <div className="text-white/70 global-p2">From the Expert</div>
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
                    src="https://www.youtube.com/embed/Dwr1V4cgZ0o?si=zG-g4Ix3BXY0phL1"
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
              bottom-8 lg:bottom-7 xl:bottom-9 2xl:bottom-12 
              global-h2 md:font-medium uppercase"
        >
          Stay Ahead With Our <span className="text-[#ED7125]">Experts </span>
        </div>
      </div>
    </div>
  )
}

export default SupportOVCSection
