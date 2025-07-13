'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import React from 'react'

const resourceData = [
  {
    title: 'Mantaka Faruqui Aurthi',
    image: '/assets/mantaka.jpg',
    description: "Shanta Life isn’t just a workplace—it’s a dynamic space where ideas thrive, creativity is celebrated, and every voice matters. As a woman in the Marketing department, I’ve experienced firsthand how empowering and inclusive the culture is. Here,",
    designation: 'Marketing',
  },
  {
    title: 'Surab Barua',
    image: '/assets/surab.jpg',
    description: "At Shanta Life, innovation is in our DNA, and every challenge is an opportunity to grow. As a member of the IT department, I’ve had the chance to work on...",
    designation: 'Information Technology.',
  },
]

export function CareerResourceSection() {
  return (
    <section className="relative w-full flex flex-col items-center py-10 sm:py-14 bg-white overflow-hidden">
      {/* Absolute Human Resource Image - Top Right */}
      <Image
        src="/assets/humanresource.png"
        alt="Human Resource"
        width={420}
        height={220}
        className="hidden lg:block absolute right-8 top-8 z-0 pointer-events-none select-none w-[400px] h-auto"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      {/* Mobile: Human resource image background */}
      <Image
        src="/assets/humanresource.png"
        alt="Human Resource"
        width={350}
        height={220}
        className="block lg:hidden absolute right-1 top-32 w-[88vw] max-w-[370px] z-0 pointer-events-none select-none"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      {/* Section Title */}
      <div className="mb-7 sm:mb-10 relative z-10 w-full max-w-[1250px] px-3 md:px-6 2xl:px-0">
        <h3 className="text-[#343434] font-light text-[20px] md:text-[25px] xl:text-[30px] 2xl:text-[32px] tracking-tight">
          HEAR FROM
        </h3>
        <div className="flex items-center gap-2 mt-[-4px]">
          <span className="text-[#343434] font-bold text-[32px] md:text-[42px] xl:text-[50px] 2xl:text-[56px] tracking-tight leading-tight">OUR</span>
          <span className="text-[#ED7125] font-bold text-[32px] md:text-[42px] xl:text-[50px] 2xl:text-[56px] tracking-tight leading-tight ml-2">RESOURCES</span>
        </div>
      </div>

      {/* Desktop: 2 Cards, Mobile: Carousel 1 Card */}
      <div className="relative w-full max-w-[1250px] mx-auto flex justify-center px-3 md:px-6 2xl:px-0">
        <div className="hidden lg:flex w-full gap-8 z-10">
          {resourceData.map((item, idx) => (
            <ResourceCard key={idx} data={item} />
          ))}
        </div>
        {/* Shadcn Carousel for Mobile/Tablet */}
        <div className="block lg:hidden w-full z-10">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {resourceData.map((item, idx) => (
                <CarouselItem key={idx} className="px-2">
                  <ResourceCard data={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel navigation at bottom center */}
            <div className="flex justify-center items-center mt-6 gap-4">
              <CarouselPrevious className="!rounded-full border border-[#E6E6E6] w-[38px] h-[38px] bg-white hover:bg-[#ED7125] hover:text-white transition-all duration-200 shadow-md" />
              <CarouselNext className="!rounded-full border border-[#ED7125] bg-[#ED7125] text-white w-[38px] h-[38px] shadow-md hover:bg-[#ed7125ee] transition-all duration-200" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

type ResourceData = {
  title: string;
  image: string;
  description: string;
  designation: string;
};

function ResourceCard({ data }: { data: ResourceData }) {
  return (
    <div className="relative bg-[#F9F4EE] rounded-[18px] px-4 py-6 md:py-8 md:px-7 xl:px-8 w-full max-w-[500px] min-h-[250px] flex flex-col justify-between shadow-[0_2px_8px_0_rgba(51,51,51,0.04)] overflow-visible">
      {/* 4 Ellipse Overlays */}
      <EllipseDecoration />
      {/* Description */}
      <div className="mb-8">
        <p className="text-[#343434] font-light text-[15px] md:text-[17px] xl:text-[18px] leading-relaxed">
          {data.description}
        </p>
        <button className="group flex items-center gap-1 mt-4 text-[#ED7125] font-bold text-[13px] md:text-[14px] uppercase tracking-tight transition-colors hover:text-[#d76420]">
          READ MORE
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="#ED7125" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>
        </button>
      </div>
      {/* Avatar & Name/Designation */}
      <div className="flex items-center mt-auto gap-4">
        <div className="relative z-10">
          {/* Ellipse overlays around image */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
            <Image src="/assets/ellipse.svg" alt="" width={80} height={80} className="absolute z-0 w-[80px] h-[80px]" />
            <Image src="/assets/ellipseSmall.svg" alt="" width={52} height={52} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[52px] h-[52px]" />
          </div>
          <Image src={data.image} alt={data.title} width={56} height={56} className="rounded-full border-[4px] border-white relative z-20 w-[56px] h-[56px] object-cover bg-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[#343434] font-semibold text-[17px] md:text-[19px] xl:text-[20px]">{data.title}</span>
          <span className="text-[#343434] font-light uppercase text-[14px] md:text-[15px] xl:text-[16px]">{data.designation}</span>
        </div>
      </div>
    </div>
  )
}

// Ellipse decoration for 4 layered ellipses, absolute
function EllipseDecoration() {
  return (
    <>
      {/* Large ellipses behind */}
      <Image src="/assets/ellipse.svg" alt="" width={140} height={140}
        className="absolute left-[-45px] top-[-45px] w-[140px] h-[140px] opacity-70 pointer-events-none select-none z-0"
        draggable={false} style={{ userSelect: 'none' }} />
      <Image src="/assets/ellipse.svg" alt="" width={70} height={70}
        className="absolute right-[-32px] top-[-32px] w-[70px] h-[70px] opacity-30 pointer-events-none select-none z-0"
        draggable={false} style={{ userSelect: 'none' }} />
      {/* Small ellipses front */}
      <Image src="/assets/ellipseSmall.svg" alt="" width={36} height={36}
        className="absolute left-[-22px] bottom-[-22px] w-[36px] h-[36px] opacity-50 pointer-events-none select-none z-0"
        draggable={false} style={{ userSelect: 'none' }} />
      <Image src="/assets/ellipseSmall.svg" alt="" width={22} height={22}
        className="absolute right-[-15px] bottom-[-15px] w-[22px] h-[22px] opacity-30 pointer-events-none select-none z-0"
        draggable={false} style={{ userSelect: 'none' }} />
    </>
  )
}
