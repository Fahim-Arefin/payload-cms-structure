import { Button } from '@/components/ui/button'
import React from 'react'

function OpportunitiesHeader() {
  return (
    <div
      className="font-avenir relative text-center w-[95%] md:w-[60%] lg:w-[50%] mx-auto font-avenir 
    space-y-2 2xl:space-y-6
    2xl:px-24 pb-5 
    lg:pt-28 mt-32 lg:mt-0"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 -top-1/2 lg:top-0 bg-[url('/assets/opportunities.png')] bg-cover bg-center bg-no-repeat opacity-45 z-0" />

      {/* Foreground content */}
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-medium uppercase">Life at</h1>
          <h1 className="text-3xl md:text-5xl font-bold uppercase">
            Shanta <span className="md:text-[#FF6600]">Life</span>
          </h1>
          <p className="text-lg 2xl:text-[22px] font-light text-[#1F1F1F]">
            Search your career opportunities through available jobs
          </p>
        </div>
        <Button variant="primary" className="rounded-lg p-8 2xl:p-12">
          <div className="flex flex-col">
            <div className="font-bold text-xl 2xl:text-3xl tracking-wide">Explore</div>
            <div className="font-light text-xl 2xl:text-2xl tracking-wide">the opportunities</div>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default OpportunitiesHeader
