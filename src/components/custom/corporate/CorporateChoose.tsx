import React, { FC } from 'react'

type benefit = {
  icon: string
  text: string
}

type CorporateChooseProps = {
  benefitsData: benefit[]
}

const CorporateChoose: FC<CorporateChooseProps> = ({ benefitsData }: CorporateChooseProps) => {
  return (
    <div className="w-full ">
      {/* Desktop / Laptop */}
      <div className="hidden lg:flex justify-between items-center bg-white">
        {/* Left image */}

        {/* Right content */}
        <div
          className="flex flex-col gap-4 justify-evenly bg-white h-full container-padding"
        >
          <h1 className="global-h1 font-semibold text-[#434342] uppercase lg:block mb-12">
            <span className="text-[#ED7125] font-semibold">Choose </span> Us For
          </h1>
          {benefitsData.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center lg:gap-4 xl:gap-8">
              <div className="w-[60px] lg:w-[130px] lg:h-[100px] xl:h-[140px]">
                <img src={item.icon} alt={`icon-${idx}`} className="w-full h-auto object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="whitespace-pre-line global-p1 uppercase text-[#9C8639]">
                  {item?.text}
                </p>
                <p className="whitespace-pre-line global-p2 text-[#434342]">{item?.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <img
            src="/assets/corporateChooseBanner.png"
            alt="benefits Image"
            className="h-[180px] md:h-full lg:max-h-[640px] xl:max-h-[720px] 2xl:max-h-[800px] object-cover
          w-full md:w-[100%] lg:w-[800px] 2xl:w-[800px]"
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="relative block lg:hidden w-full ">
        {/* Mobile background image full height */}
        <div className="">
          <img
            src="/assets/corporateChooseBanner.png"
            alt="Mobile Background"
            className="w-full h-[540px] object-cover"
          />
        </div>

        {/* Overlay content inside the image, not overflowing */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 ">
          <div className="bg-[#FCF4EB] rounded-md px-2 py-4 flex flex-col gap-4">
            {benefitsData.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-[40px] h-[40px]">
                  <img src={item.icon} alt={`icon-${idx}`} className="w-full h-auto mt-1" />
                </div>
                <div className="flex flex-col gap-2">
                <p className="whitespace-pre-line uppercase global-p2 text-[#9C8639]">{item?.text}</p>
                <p className="whitespace-pre-line uppercase global-p2 text-[#434342]">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CorporateChoose
