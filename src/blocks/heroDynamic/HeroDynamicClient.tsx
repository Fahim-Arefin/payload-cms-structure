'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { HeroDynamicBlockType, HeroSmallBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
import CTAButtonBlock from '../hero/CTAButtonBlock'
import HeroDynamicItem from './HeroDynamicItem'
import { GlobalBlog } from '@/payload-types'

type Props = {
  data: HeroDynamicBlockType
  globalBlogData: GlobalBlog
}

function HeroSmallClient({ data, globalBlogData }: Props) {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: sliderDelay,
        }),
      ]}
    >
      {/* Carousel Content */}
      <CarouselContent>
        {data?.heroes?.map((slide, index) => (
          <CarouselItem
            key={index}
            // className={`relative w-full ${'aspect-[16/7] h-[352px] md:h-auto 2xl:h-[958px]'}`}
            className={`relative w-full aspect-[16/5] h-[250px] md:h-[300px] lg:h-auto`}
          >
            <HeroDynamicItem slide={slide} globalBlogData={globalBlogData} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Carousel Navigation */}
      {data?.heroes?.length && data?.heroes?.length > 1 && (
        <div className="hidden lg:flex absolute bottom-5 inset-x-0 justify-center z-30 gap-3 ">
          <CarouselPrevious className="static w-8 h-8 border border-white rounded-md bg-transparent text-white hover:bg-white/20 transition-colors flex items-center justify-center" />
          <CarouselNext className="static w-8 h-8 border border-white rounded-md bg-transparent text-white hover:bg-white/20 transition-colors flex items-center justify-center" />
        </div>
      )}
      {/* CTA */}
      {data?.ctaButtons && data?.ctaButtons?.length > 0 && (
        <CTAButtonBlock
          ctaButtons={data?.ctaButtons}
          top="top-[180px] md:top-[220px] lg:top-[75%] xl:top-[70%]"
        />
      )}
    </Carousel>
  )
}

export default HeroSmallClient
