import { Button } from '@/components/ui/button'
import React from 'react'
import ToolTip from '../shared/ToolTip'
import Link from 'next/link'
import GlobalButton from '../shared/GlobalButton'

function OpportunitiesHeader() {
  return (
    <div
      className="font-avenir relative text-center w-[95%] md:w-[60%] lg:w-[50%] mx-auto 
    space-y-2 2xl:space-y-6
    2xl:px-24 pb-5 
    mt-28 lg:mt-0"
    >
      {/* Background overlay */}
      <div className="lg:hidden absolute inset-0 -top-1/2 lg:-top-16 bg-[url('/assets/homepage/mobile/opportunities.png')] bg-cover bg-center bg-no-repeat opacity-45 z-0" />
      <div className="hidden lg:block absolute inset-0 -top-1/2 lg:-top-16 bg-[url('/assets/homepage/web/opportunities.png')] bg-cover bg-center bg-no-repeat opacity-45 z-0" />

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
            {/* <Button variant="primary" className="rounded-lg p-8 2xl:p-8">
              <div className="flex flex-col">
                <div className="font-bold text-xl 2xl:text-3xl tracking-wide">Careers</div>
              </div>
            </Button> */}
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
