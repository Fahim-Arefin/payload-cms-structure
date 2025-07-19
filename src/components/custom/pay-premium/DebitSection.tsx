import { PayPremiumDataType } from '@/types'
import React from 'react'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import ToolTip from '@/components/custom/shared/ToolTip'

type Props = {
  bgColor?: string
  align?: 'left' | 'right'
  data: {
    bgImage: string
    content: string
  }
}

function DebitSection({ bgColor = '#FFFFFF', align = 'left', data }: Props) {
  return (
    <div
      className="container-padding"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {' '}
      {/* heading */}
      <div className="">
        <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">Authorization</h1>
        <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
          of <span className="global-h1 uppercase text-[#ED7125] font-medium">EFT Debit</span>
        </h1>
      </div>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-9 2xl:gap-16 ${align === 'left' ? ' lg:gap-0 ' : 'gap-7'}`}
      >
        {/* left content */}
        {/* h-[250px] md:h-[300px] lg:h-[360px] xl:h-[400px] 2xl:h-[500px] */}
        <div
          className={`
            relative 
            w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} w-full xl:w-[380px] 2xl:w-[500px] mx-auto
            h-[300px] md:h-[400px] lg:h-auto 
            rounded-[8px] md:rounded-[10px]  lg:rounded-[8px]  xl:rounded-[12px] 
            bg-[lightgray]  
            bg-no-repeat 
            bg-[position:-80px_0px] md:bg-[position:-60px_0px] lg:bg-[position:-150px_0px] xl:bg-[position:0px_0px]
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
          className={`
          flex flex-col mt-6 lg:mt-12
        space-y-4 lg:space-y-4 xl:space-y-7
        ${align === 'left' ? 'order-2' : 'order-2 lg:order-1'} `}
        >
          <div className="text-[#3A3A3A] global-h4 text-justify">{data?.content}</div>
        </div>
      </div>
    </div>
  )
}

export default DebitSection
