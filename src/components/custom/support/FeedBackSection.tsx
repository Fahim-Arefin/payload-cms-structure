'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import ToolTip from '../shared/ToolTip'

type Props = {}

function FeedBackSection({}: Props) {
  return (
    <div
      className="
        relative overflow-hidden rounded-[8px] h-auto 
        py-[50px] lg:py-[70px] xl:py-[100px] 2xl:py-[120px]
        xl:h-[700px] 2xl:h-[820px]
      "
    >
      {/* Background layer */}
      <div
        className="
          absolute inset-0 z-0 rounded-[8px]
          bg-[linear-gradient(0deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.5)_100%),url('/assets/feedback.jpg')]
          bg-no-repeat bg-center bg-cover
        "
      />

      {/* Foreground content */}
      <div className="relative z-10 text-white w-[80%] lg:w-[85%] xl:w-[72%] mx-auto">
        <h1
          className="text-[18px] md:text-[22px] lg:text-[28px] xl:text-[33px] 2xl:text-[40px] uppercase font-semibold lg:font-normal
        mb-6 lg:mb-8 xl:mb-12 2xl:mb-20 "
        >
          HAVE ANY <span className="text-[#ED7125]">FEEDBACK?</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-12">
          {/* Column 1: Four input fields */}
          <div className="space-y-5 xl:space-y-8">
            <Input
              placeholder="Name"
              className="bg-white text-black w-[80%] md:w-[70%] lg:w-full  shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] rounded-[8px] lg:rounded-[10px] xl:rounded-[12px] h-[45px] lg:h-[50px] xl:h-[60px] "
            />
            <Input
              type="email"
              placeholder="Email"
              className="bg-white text-black w-[80%] md:w-[70%] lg:w-full  shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] rounded-[8px] lg:rounded-[10px] xl:rounded-[12px] h-[45px] lg:h-[50px] xl:h-[60px] "
            />
            <Input
              type="number"
              placeholder="Phone"
              className="bg-white text-black w-[80%] md:w-[70%] lg:w-full  shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] rounded-[8px] lg:rounded-[10px] xl:rounded-[12px] h-[45px] lg:h-[50px] xl:h-[60px] "
            />
            <Input
              placeholder="Address"
              className="bg-white text-black w-[80%] md:w-[70%] lg:w-full  shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] rounded-[8px] lg:rounded-[10px] xl:rounded-[12px] h-[45px] lg:h-[50px] xl:h-[60px] "
            />
            <ToolTip>
              <Button
                variant="primary"
                className="cursor-not-allowed hidden lg:block h-[45px] lg:h-[50px] xl:h-[60px] 
              lg:w-[180px] xl:w-[240px]
              lg:rounded-[6px] xl:rounded-[8px]
              font-normal
              lg:text-[16px] xl:text-[18px]"
              >
                Send Feedback
              </Button>
            </ToolTip>
          </div>

          {/* Column 2: Feedback textarea */}
          <div className="space-y-5 lg:space-y-0">
            <Textarea
              placeholder="Write your feedback"
              className="shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] w-[80%] md:w-[70%] lg:w-full 
              h-[150px] lg:h-[258px] xl:h-[332px] bg-white text-black p-5 rounded-[8px] lg:rounded-[10px] xl:rounded-[12px]"
            />
            <ToolTip>
              <Button
                variant="primary"
                className="cursor-not-allowed lg:hidden h-[45px] lg:h-[50px] xl:h-[60px] 
               lg:w-[180px] xl:w-[240px]
               lg:rounded-[6px] xl:rounded-[8px]
               font-normal
               lg:text-[16px] xl:text-[18px]"
              >
                Send Feedback
              </Button>
            </ToolTip>
          </div>

          {/* Column 3: Support info */}
          <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/60 pt-5 lg:pt-0 lg:pl-8">
            <div className="space-y-4 lg:pl-2 xl:pl-4">
              <div className="space-y-4">
                <p className="global-span font-medium">Want to learn more?</p>
                <ToolTip>
                  <Button
                    variant="outline"
                    className="cursor-not-allowed h-[45px] lg:h-[50px] xl:h-[60px] 
                  lg:w-[180px] xl:w-[240px]
                  lg:rounded-[6px] xl:rounded-[8px]
                  font-normal
                  lg:text-[16px] xl:text-[18px]"
                  >
                    Call to Support Center
                  </Button>
                </ToolTip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedBackSection
