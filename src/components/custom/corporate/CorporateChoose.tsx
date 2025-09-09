import { Button } from '@/components/ui/button'
import React, { FC } from 'react'
import GlobalButton from '../shared/GlobalButton'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ToolTip from '../shared/ToolTip'
import Image from 'next/image'

type Benefit = {
  icon: string
  text: string
  description: string
}

type CorporateChooseProps = {
  benefitsData: Benefit[]
}

const CorporateChoose: FC<CorporateChooseProps> = ({ benefitsData }) => {
  return (
    <div
      className="w-full py-12 
           
           lg:pl-[130px]  lg:py-[110px] 
           xl:pl-[200px]  xl:py-[100px] 
           2xl:pl-[250px] 2xl:py-[120px]"
    >
      {/* Desktop / Laptop */}
      {/* grid-cols-[1.8fr_1.2fr] */}
      <div className="hidden lg:grid grid-cols-2 gap-4 items-center bg-white ">
        {/* Right content */}
        <div className="flex flex-col justify-center gap-4 xl:gap-7 2xl:gap-12 bg-white ">
          <h1 className="global-h1 font-bold text-[#434342] mb-2 whitespace-nowrap">
            Designed to <span className="text-[#ED7125]">Deliver More</span>
          </h1>

          {benefitsData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 xl:gap-6 xl:px-6">
              {/* ICON */}
              <div
                className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]
                  lg:w-[80px] lg:h-[80px]
                  2xl:w-[115px] 2xl:h-[115px]
                  shrink-0 flex-none
                  relative
                  aspect-[1/1]
                "
              >
                <Image
                  src={item.icon}
                  alt={`icon-${idx}`}
                  fill
                  sizes="( max-width: 767px) 40px, (max-width: 1023px) 60px, (max-width: 1279px) 80px, 115px"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-2 px-4">
                <p className="lg:text-[1.1rem] font-bold xl:text-[1.3rem] text-[#434342]">
                  {item.text}
                </p>
                <p className="lg:text-[14px] xl:text-[18px] font-extralight text-justify text-[#434342]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Left image */}
        <div className="relative w-full lg:h-[660px] xl:h-[820px] 2xl:h-[950px] rounded-md lg:rounded-lg xl:rounded-xl ">
          <Image
            src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/DesignatedDeliverBanner.jpg`}
            alt="benefits Image"
            fill
            className="rounded-md lg:rounded-lg xl:rounded-xl object-cover object-[30%,0%]"
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="relative block lg:hidden w-full h-[540px]">
        <Image
          src="/assets/DesignatedDeliverBanner.jpg"
          alt="Mobile Background"
          fill
          sizes="(max-width: 767px) 540px"
          className="object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
          <div className="px-4 py-5 flex flex-col gap-4 bg-[#FCF4EB] rounded-md">
            {benefitsData.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                {/* ICON */}
                <div className="w-[40px] h-[40px] shrink-0 flex-none">
                  <img
                    src={item.icon}
                    alt={`icon-${idx}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* TEXT */}
                <div className="flex flex-col gap-2">
                  <p className="uppercase text-left global-p1 font-medium text-[#434342]">
                    {item?.text}
                  </p>
                  <p className="uppercase global-p2 text-[#434342]">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* btn */}
      <div className="mt-[30px] lg:mt-[50px] xl:mt-[80px] w-fit mx-auto">
        <div className="flex flex-row gap-2">
          <Link
            href="/assets/pdf/Required Brochures/Corporate Plans/Group-Insurance-Brochure.pdf"
            target="_blank"
            prefetch={false}
          >
            <GlobalButton text="Download Brochure" variant="primary" />
          </Link>
          <Link
            href="/assets/pdf/Required Brochures/Corporate Plans/Shanta Company Profile Brochure.pdf"
            target="_blank"
          >
            <GlobalButton
              className="bg-[#9C8639] 
              w-[170px] md:w-[200px] lg:w-[220px] xl:w-[230px] 2xl:w-[250px]"
              text="Download Company Profile"
            />
          </Link>
        </div>
        <div className="flex justify-center mt-2">
          <Link
            href="/plans"
            className="capitalize text-[#ED7125] underline hover:text-[#d65a1a] transition-colors font-medium flex items-center gap-1 
                    text-[10px] md:text-[12px] lg:text-[14px] xl:text-[14px]"
          >
            explore all plans
            <ArrowUpRight size={14} className="inline-block" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CorporateChoose
