import { Button } from '@/components/ui/button'
import React from 'react'
import ToolTip from '../shared/ToolTip'
import Link from 'next/link'
import GlobalButton from '../shared/GlobalButton'
import Image from 'next/image'

function OpportunitiesHeader() {
  return (
    <div
      className="font-avenir relative text-center w-[95%] md:w-[60%] lg:w-[50%] mx-auto 
    space-y-2 2xl:space-y-6
    2xl:px-24 pb-5 
    mt-28 lg:mt-0"
    >
      {/* Background overlay */}
      {/* <div className="border border-black absolute inset-0 -top-1/2 lg:-top-16 bg-[url('/assets/homepage/web/opportunities.png')] bg-cover bg-center bg-no-repeat opacity-45 z-0" /> */}
      <div
        className="absolute inset-0 -top-1/2 lg:-top-16 z-0 opacity-45 overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/assets/homepage/web/opportunities.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 1023px) 300px, 400px"
        />
      </div>
      {/* Foreground content */}
      <div className="relative z-10 space-y-4 md:space-y-6">
        <div className="space-y-2">
          <h1 className="global-h4 font-medium uppercase">Life at</h1>
          <h1 className="global-h1 font-semibold uppercase">
            Shanta <span className="md:text-[#FF6600]">Life</span>
          </h1>
          <p className="global-p1 font-light text-[#1F1F1F]">
            Make a difference everyday- your next chapter starts here
          </p>
        </div>
        <div>
          <Link href="/career">
            <GlobalButton
              variant="primary"
              text="Careers"
              className="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[18px] 2xl:text-[20px]"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OpportunitiesHeader
