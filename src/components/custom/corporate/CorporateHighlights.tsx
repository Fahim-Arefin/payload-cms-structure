import React, { FC } from 'react'

type Highlights = {
  mainDescription: string
}

type CorporateHighlightProps = {
  highlightsData: Highlights[]
}

const CorporateHighlight: FC<CorporateHighlightProps> = ({
  highlightsData,
}: CorporateHighlightProps) => {
  return (
    <section className="relative bg-[#9A4E46] container-padding text-white overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 xl:bottom-20 flex justify-center items-center pointer-events-none">
        <h1 className="text-[4.5rem] md:text-[5.5rem] lg:text-[8rem] font-bold text-center lg:leading-relaxed tracking-wide uppercase whitespace-pre-line">
          <span className="block animate-fadeSlideLeft">SHANTA LIFE</span>
          <span className="block animate-fadeSlideRight">INSURANCE PLC</span>
        </h1>
      </div>

      {/* Foreground Content */}
      <div className="">
        <p className="global-h3 text-white text-left">{highlightsData[0]?.mainDescription}</p>

        <hr className="border-t border-white/50 w-full my-6" />

        {/* Stats Section */}
        <div>
          <h2 className="text-[20px] md:global-h2 font-bold text-left uppercase mb-6 lg:mb-10">
            At a Glance
          </h2>
          <div className="flex justify-between text-center px-10">
            <div className="text-start">
              <p className="text-[30px] md:text-[60px] font-bold">100+</p>
              <p className="mt-2 text-[1.1rem]  lg:text-[1.5rem]">Claims</p>
            </div>
            <div className="text-start">
              <p className="text-[30px] md:text-[60px] font-bold">
                5 <span className="font-semibold">Days</span>
              </p>
              <p className="mt-2 text-[1.1rem] lg:text-[1.5rem]">Settlement</p>
            </div>
            <div className="text-start">
              <p className="text-[30px] md:text-[60px] font-bold">100%</p>
              <p className="mt-2 text-[1.1rem]  lg:text-[1.5rem]">Success rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CorporateHighlight
