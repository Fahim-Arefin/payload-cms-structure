import React from 'react'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

function AwardSection() {
  return (
    <div className="bg-white py-12 md:py-24 lg:py-[110px] 2xl:py-[150px]">
      <div className="relative">
        {/* linear linear-gradient */}
        <div className="md:hidden absolute top-[135px] w-full h-[4px]">
          <div className="w-full h-[4px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto" />
        </div>

        <h1
          className="global-h1 w-full lg:w-[85%] 2xl:w-[70%] mx-auto  font-semibold text-[#4A4A4A]
        text-center lg:text-start
        mb-5 md:mb-8 lg:mb-16  2xl:mb-24"
        >
          Milestones <span className="text-[#ED7125]">Unlocked</span>
        </h1>
        <div className="z-20 relative w-full lg:w-[85%] 2xl:w-[70%] mx-auto lg:min-h-[500px] grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section aligned to right */}
          <div className="flex justify-end items-center rounded-t-[14px] lg:rounded-t-[24px]">
            <div
              className="
            w-[70%] mx-auto lg:mx-0 lg:w-full 
            h-[200px] md:h-[300px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px]"
            >
              <img
                className="h-full w-full z-[50] rounded-2xl object-cover"
                src="/assets/news11.jpg"
                alt="why choose us"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col font-avenir">
            {/* top section */}
            <div className="hidden lg:flex h-[250px] 2xl:h-[300px] justify-center lg:justify-end items-center rounded-tl-2xl">
              <div className="flex justify-center lg:justify-end items-center flex-wrap w-full">
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* img */}
                  <div className="p-2 2xl:p-4 border-2 rounded-t-xl border-[#9A4E46] ">
                    <div className="">
                      <img src="/assets/award1.png" alt="" />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-[#434343] p-2 2xl:p-4 border-b-2 border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px] font-bold">
                      100%
                    </div>
                    <div className="text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      Settlement rate
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-t-xl border-[#9A4E46]">
                    <div className="">
                      <img src="/assets/award2.png" alt="" />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-[#434343] p-2 2xl:p-4 border-b-2 border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      112
                    </div>
                    <div className="text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      Claim settled
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-b-xl border-[#9A4E46]">
                    <div className="">
                      <img src="/assets/award3.png" alt="" />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-[#434343] p-2 2xl:p-4 border-t-2 border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      235
                    </div>
                    <div className="text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      Satisfied Customer
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-b-xl border-[#9A4E46]">
                    <div className="">
                      <img src="/assets/award4.png" alt="" />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-[#434343] p-2 2xl:p-4 border-t-2 border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      1K +
                    </div>
                    <div className="text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      Families Insured
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom section */}
            <div
              className=" lg:h-[50%] absolute
              inset-x-0 mx-auto top-[60%] 
              lg:bottom-0 lg:top-auto lg:right-0 lg:left-auto
            w-[90%] lg:w-[70%] xl:w-[67%] 2xl:w-[900px]"
            >
              <div
                className=" lg:h-[250px] 2xl:h-[300px] text-center lg:text-start
               p-2 md:p-6 lg:p-12 text-white space-y-2 lg:space-y-6
              rounded-[8px] bg-[rgba(156,134,57,0.5)] backdrop-blur-[15px]
              "
              >
                <div>
                  <h1 className="global-h2 font-bold">Grand Launch Announcement</h1>
                  <h5 className="global-h4 font-light">December 1, 2024</h5>
                </div>
                <p className="global-p2 font-light">
                  The ceremony was graced by key leaders including CEO Nafis A. Ahmed and directors
                  Saif Khondoker, Arif Khan, Raiven Hasan, Anisul Haque, along with other senior
                  officials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AwardSection
