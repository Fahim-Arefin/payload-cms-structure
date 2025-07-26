import { PayPremiumDataType } from '@/types'
import React from 'react'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import ToolTip from '@/components/custom/shared/ToolTip'

type Props = {
  bgColor?: string
  align?: 'left' | 'right'
  data: PayPremiumDataType
}

function RocketSection({ bgColor = '#FFFFFF', align = 'left', data }: Props) {
  return (
    <div
      // className="container-padding"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="lg:hidden">
        <div className="space-x-1">
          <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
            Payment Using{' '}
            <span className="global-h1 uppercase text-[#ED7125] font-medium">Rocket</span>
          </h1>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 lg:gap-6 xl:gap-9 2xl:gap-16 ${align === 'left' ? ' lg:gap-0 ' : 'gap-7'}`}
      >
        {/* left content */}
        <div
          className={`
            relative 
            w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
            h-[300px] md:h-[400px] lg:h-auto
            rounded-[8px] md:rounded-[10px]  lg:rounded-[8px]  xl:rounded-[12px] 
            bg-no-repeat
            lg:bg-[position:0px_32px]  xl:bg-[position:0px_55px]  2xl:bg-[position:0px_85px]  
            bg-cover
            mt-12
           ${align === 'left' ? 'order-1' : 'order-1 lg:order-2 '}`}
          style={{ backgroundImage: `url(${data?.bgImage})` }}
          role="img"
          aria-label="Background image"
        ></div>

        {/* right content */}
        <div
          className={`
          flex flex-col mt-10 lg:mt-0
        space-y-4 lg:space-y-4 xl:space-y-7
        ${align === 'left' ? 'order-2' : 'order-2 lg:order-1'} `}
        >
          <div
            className="hidden lg:block 
          lg:mb-6 2xl:mb-12 "
          >
            <div className="space-x-1">
              <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
                Payment Using{' '}
                <span className="global-h1 uppercase text-[#ED7125] font-medium">Rocket</span>
              </h1>
            </div>
          </div>
          {data?.item?.map((eachItem, i) => (
            <div
              key={i}
              className=" flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
              space-x-2 lg:space-x-1 xl:space-x-2.5 2xl:space-x-4
              p-1 md:px-4 md:py-1.5 lg:px-1 lg:py-2 xl:p-2.5 2xl:p-4 
              rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
            >
              <div className="text-[12px] md:text-[14px] lg:text-[12px] xl:text-[16px] 2xl:text-[15px] text-[#434343]">
                {/* {eachItem?.descriptionContent} */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: eachItem?.descriptionContent,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RocketSection
