import { Button } from '@/components/ui/button'
import React, { FC } from 'react'

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
    <div className="w-full">
      {/* Desktop / Laptop */}
      <div className="hidden lg:flex justify-between items-center bg-white">
        {/* Right content */}
        <div className="flex flex-col gap-4 justify-between bg-white container-padding">
          <h1 className="global-h1 font-bold text-[#434342] mb-10">
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
                <p className="lg:text-[1.1rem] whitespace-nowrap xl:text-[1.5rem] uppercase text-[#434342]">
                  {item.text}
                </p>
                <p className="lg:global-p2 xl:global-p1 text-[#434342]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Left image */}
        <div>
          <img
            src="/assets/corporateChooseBanner.png"
            alt="benefits Image"
            className="h-[180px] md:h-full lg:max-h-[720px] 2xl:max-h-[800px]
            w-full md:w-[100%] lg:w-[800px] 2xl:w-[800px] object-cover rounded-l-md"
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="relative block lg:hidden w-full">
        <img
          src="/assets/corporateChooseBanner.png"
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
                  <p className="uppercase text-left global-p1 text-[#434342]">{item.text}</p>
                  <p className="uppercase global-p2 text-[#434342]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 pb-12 pt-10 lg:pt-0 lg:pb-[110px] xl:pb-[100px] 2xl:pb-[150px]">
        <Button
          variant="primary"
          className="
            cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[6px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
        >
          Download Brochure
        </Button>
        <Button
          variant="primary"
          className="
            cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            bg-[#9C8639]
            py-1 md:py-2 2xl:py-6
            h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[6px] 
            
            global-h4 font-normal"
        >
          Download Company Profile
        </Button>
      </div>
    </div>
  )
}

export default CorporateChoose
