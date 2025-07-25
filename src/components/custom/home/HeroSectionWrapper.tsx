'use client'

import React, { FC, useState } from 'react'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import GlobalButton from '../shared/GlobalButton'
import { BsPlay } from 'react-icons/bs'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Link from 'next/link'

type HeroSectionWrapperProps = {
  heroSlides: any
}

const HeroSectionWrapper: FC<HeroSectionWrapperProps> = ({ heroSlides }) => {
  const [open, setOpen] = useState(false)

  return (
    <HeroSection heroSlides={heroSlides}>
      <div
        className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width flex justify-left space-x-4 md:space-x-6 lg:justify-start 
        "
      >
        <Link href="/plans">
          <GlobalButton size="large" variant="primary" text="Explore Now" className="" />
        </Link>

        {/* <div className="p-1 rounded-full border-2 border-white 2xl:p-2">
              <BsPlay />
            </div>
            <div className="global-h4 font-normal ">From the Expert</div> */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <GlobalButton className="flex items-center self-center space-x-2 px-4 py-2 bg-transparent hover:bg-transparent">
              <div className="p-1 rounded-full border-2 border-white 2xl:p-2">
                <BsPlay />
              </div>
              <div className="global-h4 font-normal">From the Expert</div>
            </GlobalButton>
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
    </HeroSection>
  )
}

export default HeroSectionWrapper
