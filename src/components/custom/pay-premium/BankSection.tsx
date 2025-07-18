import { PayPremiumDataType } from '@/types'
import React from 'react'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import ToolTip from '@/components/custom/shared/ToolTip'

type Props = {
  bgColor?: string
  align?: 'left' | 'right'
  data: PayPremiumDataType
}

function BankSection({ bgColor = '#FFFFFF', align = 'left', data }: Props) {
  return (
    <div
      className="container-padding"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div>
        <div className="space-x-1">
          <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
            Payment Using{' '}
            <span className="global-h1 uppercase text-[#ED7125] font-medium">Internet Banking</span>
          </h1>
          <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">(Bank transfer)</h1>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-9 2xl:gap-16 ${align === 'left' ? ' lg:gap-0 ' : 'gap-7'}`}
      >
        {/* left content */}
        <div
          className={`
            relative 
            w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
            h-[250px] md:h-[300px] lg:h-[560px] xl:h-[600px] 2xl:h-[700px]
            rounded-[8px] md:rounded-[10px]  lg:rounded-[8px]  xl:rounded-[12px] 
            bg-[lightgray]  
            bg-no-repeat 
            lg:bg-[length:185.378%_100%] 
            lg:bg-[position:-172.35px_0px]
            bg-cover
            overflow-hidden
            mt-12
           ${align === 'left' ? 'order-1' : 'order-1 lg:order-2 '}`}
          style={{ backgroundImage: `url(${data?.bgImage})` }}
          role="img"
          aria-label="Background image"
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10 " />
        </div>
        {/* right content */}
        <div
          //   className={`
          //   xl:py-10 2xl:py-12
          // space-y-4 lg:space-y-4 xl:space-y-7
          // ${align === 'left' ? 'order-2 lg:py-6' : 'order-2 lg:order-1 lg:py-0'}`}
          className={`
          flex flex-col mt-12
        space-y-4 lg:space-y-4 xl:space-y-7
        ${align === 'left' ? 'order-2' : 'order-2 lg:order-1'} `}
        >
          {/* heading */}
          {/* <div>
            <div className="space-x-1">
              <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
                Payment Using Internet Banking
              </h1>
              <h1 className="global-h1 uppercase text-[#ED7125] font-medium">(Bank transfer)</h1>
            </div>
          </div> */}
          {/* items */}
          {data?.item?.map((eachItem, i) => (
            <div
              key={i}
              className=" flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
              space-x-2 lg:space-x-1 xl:space-x-2.5 2xl:space-x-4
              p-1 md:px-4 md:py-1.5 lg:px-1 lg:py-2 xl:p-2.5 2xl:p-4 
              rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
            >
              {/* <div
                className="min-w-[35px] md:min-w-[40px] lg:min-w-[30px] xl:min-w-[40px] 2xl:min-w-[46px] 
                           h-[35px] md:h-[40px] lg:h-[30px] xl:h-[40px] 2xl:h-[46px] 
                           "
              >
                <img src={eachItem?.image} alt="icons" className="w-full h-full" />
              </div> */}
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
          {/* button */}
          {/* <div className="flex justify-center lg:justify-start">
            <ToolTip>
              <GlobalButton
                variant="primary"
                text="Calculate Premium"
                className="cursor-not-allowed"
              />
            </ToolTip>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default BankSection
