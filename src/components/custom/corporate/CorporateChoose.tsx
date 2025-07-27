import { Button } from '@/components/ui/button'
import React, { FC } from 'react'
import GlobalButton from '../shared/GlobalButton'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

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
      <div className="hidden lg:grid grid-cols-[1.8fr_1.2fr] items-center bg-white">
        {/* Right content */}
        <div className="flex flex-col justify-center gap-4 lg:gap-10 2xl:gap-16 bg-white">
          <h1 className="global-h1 font-bold text-[#434342] mb-2">
            Designed to <span className="text-[#ED7125]">Deliver More</span>
          </h1>

          {benefitsData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 xl:gap-6 xl:px-6">
              {/* ICON */}
              <div
                className="
                  w-[40px] h-[40px]
                  md:w-[60px] md:h-[60px]
                  lg:w-[80px] lg:h-[80px]
                  2xl:w-[115px] 2xl:h-[115px]
                  shrink-0 flex-none
                "
              >
                <img src={item.icon} alt={`icon-${idx}`} className="w-full h-full object-contain" />
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-2 px-4">
                <p className="lg:text-[1.1rem] font-bold whitespace-nowrap xl:text-[1.5rem] text-[#434342]">
                  {item.text}
                </p>
                <p className="lg:global-p2 xl:text-[21px] text-[#434342]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Left image */}
        <div className="">
          <img
            src="/assets/DesignatedDeliverBanner.jpg"
            alt="benefits Image"
            className="w-full lg:h-[660px] xl:h-[820px] 2xl:h-[950px] object-cover rounded-md"
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="relative block lg:hidden w-full">
        <img
          src="/assets/DesignatedDeliverBanner.jpg"
          alt="Mobile Background"
          className="w-full h-[540px] object-cover"
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
                  <p className="uppercase text-left global-p1 text-[#434342]">{item?.text}</p>
                  <p className="uppercase global-p2 text-[#434342]">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center items-center base:justify-start md:items-left gap-4 pb-6 pt-10 lg:pt-10 xl:pt-16 ">
        <Link
          href="/assets/pdf/Required Brochures/Corporate Plans/Group-Insurance-Brochure.pdf"
          target="_blank"
        >
          <GlobalButton text="Download Brochure" variant="primary" />
        </Link>

        <GlobalButton
          className="cursor-not-allowed bg-[#9C8639] 
          w-[170px] md:w-[200px] lg:w-[220px] xl:w-[230px] 2xl:w-[250px]"
          text="Download Company Profile "
        />
        <Link href="/plans">
          <GlobalButton text="Explore All Plans" variant="outline" />
        </Link>
      </div>
    </div>
  )
}

export default CorporateChoose
