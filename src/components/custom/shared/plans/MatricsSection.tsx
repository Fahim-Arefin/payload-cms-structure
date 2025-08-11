'use client'

import React from 'react'
// import { Button } from '@/components/ui/button'
// import GlobalButton from '../GlobalButton'
// import Link from 'next/link'
// import { ArrowUpRight } from 'lucide-react'
import GlobalTabButtons from '../GlobalTabButtons'
import Link from 'next/link'
import GlobalButton from '../GlobalButton'
import { ArrowUpRight } from 'lucide-react'

type Props = {}

function MatricsSection({}: Props) {
  return (
    <div
      className="px-5 py-12 
           md:p-24 
           lg:px-[100px]  lg:py-[100px] 
           xl:px-[200px]  xl:py-[100px] 
           2xl:px-[300px] 2xl:py-[150px]
           space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12"
    >
      <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12">
        {/* Heading */}
        <h1 className="global-h1 font-medium uppercase">
          <span className="text-[#ED7125]">Metrics</span> That Matter
        </h1>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 md:gap-12 lg:gap-0">
          {/* Left image block */}
          {/* mobile */}
          <div
            className="lg:hidden bg-[url('/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/matrics.jpg')] bg-[lightgray] bg-center bg-cover bg-no-repeat 
            rounded-[10px] lg:rounded-[12px] xl:rounded-[14px] 2xl:rounded-[16px]
            h-[250px]
            w-full md:h-[350px]
            lg:w-[350px] lg:h-[350px]
            xl:w-[400px] xl:h-[400px]
            2xl:w-[460px] 2xl:h-[460px]"
            role="img"
            aria-label="Surgery room"
          />
          {/* web */}
          <div
            className="hidden lg:block bg-[url('/assets/solutions/individual/health-and-protection/accidental-coverage/web/matrics.jpg')] bg-[lightgray] bg-center bg-cover bg-no-repeat 
            rounded-[10px] lg:rounded-[12px] xl:rounded-[14px] 2xl:rounded-[16px]
            h-[250px]
            w-full md:h-[350px]
            lg:w-[350px] lg:h-[350px]
            xl:w-[400px] xl:h-[400px]
            2xl:w-[460px] 2xl:h-[460px]"
            role="img"
            aria-label="Surgery room"
          />

          {/* Right visual layout with image arcs */}
          <div
            className=" relative mx-auto  
           h-[250px] md:h-[350px] lg:h-full
           w-[330px] md:w-[580px] lg:w-[380px] xl:w-[500px] 2xl:w-[645px] "
          >
            {/* Background semi-circle */}
            <div className="absolute inset-0 flex left-[28%] items-center">
              <img
                src="/assets/ellipse.png"
                alt="Metric Arc"
                className="object-contain pointer-events-none select-none
                h-[122px] md:h-[216px] lg:h-[150px] xl:h-[198px] 2xl:h-[265px]"
              />
            </div>

            {/* Top vertical line */}
            <img
              src="/assets/line2.png"
              alt="Top Line"
              className="absolute top-0 left-[47%] md:left-[47%] lg:left-[48%] xl:left-[48%] 2xl:left-[49%] -translate-x-1/2 
              w-[4px] md:w-[7px] lg:w-[5px] xl:w-fit
              h-[68px] md:h-[74px] lg:h-[105px] xl:h-[107px] 2xl:h-[107px] "
            />

            {/* Bottom vertical line */}
            <img
              src="/assets/line2.png"
              alt="Bottom Line"
              className="absolute bottom-0 left-[47%] md:left-[47%] lg:left-[48%] xl:left-[48%] 2xl:left-[49%] -translate-x-1/2 
             w-[4px] md:w-[7px] lg:w-[5px] xl:w-fit
              h-[68px] md:h-[74px] lg:h-[105px] xl:h-[107px] 2xl:h-[107px]"
            />

            {/* Center text */}
            <div
              className="absolute inset-0 flex items-center  text-center z-10
             left-[32%] md:left-[34%] lg:left-[32%] 2xl:left-[36%]"
            >
              <div>
                <p className="text-[10px] md:text-[16px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] text-[#ED7125] font-medium">
                  Minimum Coverage
                </p>
                <p className="global-span font-semibold text-[#ED7125]">BDT 100,000</p>
              </div>
            </div>

            {/* Top Left */}
            <div
              className=" absolute text-center p-4 z-10
              top-4 md:left-8 lg:top-4 lg:left-3 xl:top-4 xl:left-4 2xl:top-4 2xl:left-7"
            >
              <p className="global-p2 font-light capitalize">Age At Entry</p>
              <p className="global-p1 font-semibold">18 - 60 Years</p>
            </div>

            {/* Top Right */}
            <div
              className=" absolute text-center p-4 z-10
              top-4
            right-7 md:right-16 lg:right-8 2xl:right-12 "
            >
              <p className="global-p2 font-light capitalize">Policy Term</p>
              <p className="global-p1 font-semibold">Same As </p>
              <p className="global-p1 leading-3 font-semibold">Your Basic Plan</p>
            </div>

            {/* Bottom Left */}
            <div
              className=" absolute text-center p-4 z-10
              bottom-4 md:left-8 lg:bottom-4 lg:left-3  xl:bottom-4 xl:left-4 2xl:bottom-4 2xl:left-7"
            >
              <p className="global-p2 font-light capitalize">Maximum Coverage</p>
              <p className="global-p1 font-semibold">BDT 5,000,000</p>
            </div>

            {/* Bottom Right */}
            <div className=" absolute bottom-4 right-0 md:right-8 lg:right-0 text-center p-4 z-10">
              <p className="global-p2 font-light capitalize">Premium Rate</p>
              <p className="global-p1 font-semibold">Affordable </p>
              <p className="global-p1 leading-3 font-semibold">Extensive Protection!</p>
            </div>
          </div>
        </div>
      </div>
      {/* Buttons */}
      {/* <GlobalTabButtons
        brochureLink="/assets/pdf/Required Brochures/Health & Protection/Shanta Accidental Coverage/Shanta Life Rider Brochure.pdf"
        explorePlansLink="/plans/individual"
        calculateLink="#"
        showCalculatePremium={false}
      /> */}
      {/* button */}
      <div className="flex gap-4 lg:gap-6 justify-center">
        <Link
          href="/assets/pdf/Required Brochures/Health & Protection/Shanta Accidental Coverage/Shanta Life Rider Brochure.pdf"
          target="_blank"
        >
          <GlobalButton variant="primary" text="Download Brochure" />
        </Link>
        <div className="flex justify-center mt-2">
          <Link
            href="/plans/individual"
            className="capitalize text-[#ED7125] underline hover:text-[#d65a1a] transition-colors font-medium flex items-center gap-1 
                    text-[10px] md:text-[12px] lg:text-[14px] xl:text-[14px]"
          >
            explore all plans
            <ArrowUpRight size={14} className="inline-block" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MatricsSection
