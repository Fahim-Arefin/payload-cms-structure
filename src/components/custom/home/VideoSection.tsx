import { Button } from '@/components/ui/button'
import React from 'react'
import { BsPlay } from 'react-icons/bs'

function VideoSection() {
  return (
    <div className="pt-[200px] lg:pt-[250px] 2xl:pt-[400px] bg-white">
      <div className="relative w-full font-avenir h-[230px] md:h-[350px] lg:h-[400px] xl:h-[550px] 2xl:h-[600px]">
        {/* Background GIF */}
        <img
          src="/assets/bg.gif"
          alt="background gif"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Semi-transparent black overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Foreground content */}
        <div
          className="relative z-20 text-white bg-[#3A3A3A] 
          p-4 2xl:p-10 
          w-[85%] md:w-[70%] lg:w-[65%] 2xl:w-[52%] 
          h-[250px] md:h-[350px] lg:h-[400px] xl:h-[550px] 2xl:h-[600px]
          rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px] mx-auto
          -top-[100px] lg:-top-[120px] xl:-top-[160px] 2xl:-top-[200px]"
        >
          <div
            className=" flex justify-between items-center w-full h-full rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px]"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/assets/host.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'lightgray',
            }}
          ></div>
          <div className=" -mt-14 lg:-mt-16 2xl:-mt-20">
            <div className="flex items-center justify-between w-[80%] mx-auto">
              <Button
                className="bg-[#9A4E46] px-4 md:px-6 py-1 md:py-2 2xl:px-10 2xl:py-6 w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-xl
                rounded-lg"
              >
                Level up Now
              </Button>
              <div className="flex space-x-2 2xl:space-x-4 text-white items-center">
                <div className="border-2 border-white rounded-full p-1 2xl:p-2">
                  <BsPlay />
                </div>
                <div className="text-white text-sm lg:text-xl">From the Expert</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="z-20 absolute inset-x-0 
          text-center text-white 
          bottom-10 lg:bottom-12 xl:bottom-16 2xl:bottom-20 
          global-h1 md:font-semibold uppercase"
        >
          Stay Ahead With Our <span className="text-[#ED7125]">Experts </span>
        </div>
      </div>
    </div>
  )
}

export default VideoSection
