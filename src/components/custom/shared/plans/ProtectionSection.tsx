import { ProtectionDataType } from '@/types'
import React from 'react'
import GlobalButton from '../GlobalButton'
import ToolTip from '../ToolTip'
import Link from 'next/link'

type Props = {
  bgColor?: string
  align?: 'left' | 'right'
  data: ProtectionDataType
}

function ProtectionSection({ bgColor = '#FFFFFF', align = 'left', data }: Props) {
  return (
    <div
      className="container-padding"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-9 2xl:gap-16 ${align === 'left' ? ' lg:gap-0 ' : 'gap-7'}`}
      >
        {/* left content */}
        <div
          className={`
            relative 
            w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
            h-[250px] md:h-[300px] lg:h-[440px] xl:h-[600px] 2xl:h-[700px]
            rounded-[8px] md:rounded-[10px] lg:rounded-[8px]  xl:rounded-[12px] 
            bg-[lightgray]  
            bg-no-repeat 
           bg-cover lg:bg-center
            overflow-hidden
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
          flex flex-col justify-center
        space-y-4 lg:space-y-4 xl:space-y-7
        ${align === 'left' ? 'order-2' : 'order-2 lg:order-1'} `}
        >
          {/* heading */}
          <div>
            <h3 className="global-p1 md:global-h4 lg:global-p1 text-[#3A3A3A] uppercase font-light">
              {data?.title}
            </h3>
            <div className="flex space-x-1">
              <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">{data?.subTitle}</h1>
              <span className="global-h1 uppercase text-[#3A3A3A] font-medium"> - </span>
              <h1 className="global-h1 uppercase text-[#ED7125] font-medium">
                {' '}
                {data?.smallTitle}
              </h1>
            </div>
          </div>
          {/* items */}
          {data?.item?.map((eachItem, i) => (
            <div
              key={i}
              className=" flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
              space-x-2 lg:space-x-1 xl:space-x-2.5 2xl:space-x-4
              p-1 md:px-4 md:py-1.5 lg:px-1 lg:py-2 xl:p-2.5 2xl:p-4 
              rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
            >
              <div
                className="min-w-[35px] md:min-w-[40px] lg:min-w-[30px] xl:min-w-[40px] 2xl:min-w-[46px] 
                           h-[35px] md:h-[40px] lg:h-[30px] xl:h-[40px] 2xl:h-[46px] 
                           "
              >
                <img src={eachItem?.image} alt="icons" className="w-full h-full" />
              </div>
              <div className="text-[12px] md:text-[14px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px] text-[#434343] font-semibold ">
                {eachItem?.description}
              </div>
            </div>
          ))}
          {/* button */}
          <div className="flex gap-4 lg:gap-6 justify-center lg:justify-start">
            {/* <Link href="/premium-calculator">
              <GlobalButton variant="primary" text="Calculate Premium" />
            </Link> */}
            <Link
              href="/assets/pdf/Required Brochures/Health & Protection/Shanta Critical Protection/Shanta Life Rider Brochure.pdf"
              target="_blank"
            >
              <GlobalButton
                variant="primary"
                // className=" text-[#9C8639] hover:text-[#9C8638] border-2 border-[#9C8639]"
                text="Download Brochure"
              />
            </Link>
            {/* </ToolTip> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtectionSection
