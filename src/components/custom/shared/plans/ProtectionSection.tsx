import { ProtectionDataType } from '@/types'
import React from 'react'
import GlobalButton from '../GlobalButton'
import ToolTip from '../ToolTip'
import Link from 'next/link'
import GlobalTabButtons from '../GlobalTabButtons'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

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
        className={`grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-12 xl:gap-9 2xl:gap-16 ${align === 'left' ? ' lg:gap-0 ' : 'lg:gap-7'}`}
      >
        {/* left content */}
        {/* mobile */}
        <div
          className={`lg:hidden
            relative 
            w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
            aspect-[300/260] lg:aspect-auto lg:h-[440px] xl:h-[600px] 2xl:h-[700px]
            rounded-md lg:rounded-lg  xl:rounded-xl 
            overflow-hidden
           ${align === 'left' ? 'order-1' : 'order-1 lg:order-2 '}`}
          role="img"
          aria-label="Background image"
        >
          {/* Image */}
          <Image
            fill
            src={data?.bgMobileImage}
            alt={data?.title}
            className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
            sizes="50vw"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10 " />
        </div>

        {/* web */}
        <div
          className={`hidden lg:block
            relative 
            w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
            h-[250px] md:h-[350px] lg:h-[440px] xl:h-[600px] 2xl:h-[700px]
            rounded-md lg:rounded-lg  xl:rounded-xl
            overflow-hidden
           ${align === 'left' ? 'order-1' : 'order-1 lg:order-2 '}`}
          role="img"
          aria-label="Background image"
        >
          {/* Image */}
          <Image
            fill
            src={data?.bgImage}
            alt={data?.title}
            className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
            sizes="50vw"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10 " />
        </div>
        {/* right content */}
        <div
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
                className="relative min-w-[35px] md:min-w-[40px] lg:min-w-[30px] xl:min-w-[40px] 2xl:min-w-[46px] 
                           h-[35px] md:h-[40px] lg:h-[30px] xl:h-[40px] 2xl:h-[46px] 
                           "
              >
                <Image fill src={eachItem?.image} alt="icons" />
              </div>
              <div className="text-[12px] md:text-[14px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px] text-[#434343] font-semibold ">
                {eachItem?.description}
              </div>
            </div>
          ))}
          {/* button */}
          <div className="flex gap-4 lg:gap-6 ">
            <Link
              href="/assets/pdf/Required Brochures/Health & Protection/Shanta Critical Protection/Shanta Life Rider Brochure.pdf"
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
      </div>
    </div>
  )
}

export default ProtectionSection
