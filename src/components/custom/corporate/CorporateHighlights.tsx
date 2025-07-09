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
    <section className="relative bg-[#8A4F4F] container-padding text-white overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 xl:bottom-20 flex justify-center items-center pointer-events-none">
        <h1 className="text-[4.5rem] md:text-[5.5rem] lg:text-[8rem] font-bold opacity-10 text-center lg:leading-relaxed tracking-wide uppercase whitespace-pre-line">
          SHANTA LIFE{'\n'}INSURANCE PLC
        </h1>
      </div>

      {/* Foreground Content */}
      <div className="">
        <p className="global-h3 text-white text-left">{highlightsData[0]?.mainDescription}</p>

        <hr className="border-t border-white/50 w-full my-6" />

        {/* Stats Section */}
        <div>
          <h2 className="global-h2 font-bold text-center md:text-left uppercase mb-6 lg:mb-10">
            At a Glance
          </h2>
          <div className="flex justify-between text-center px-10">
            <div className='text-start'>
              <p className="text-[54px] font-bold">100+</p>
              <p className="mt-2 text-[1rem]  lg:text-[1.5rem]">Claims</p>
            </div>
            <div className='text-start'>
              <p className="text-[60px] font-bold">
                3<span className="global-h3 font-semibold">Days</span>
              </p>
              <p className="mt-2 text-[1rem] lg:text-[1.5rem]">Settlement</p>
            </div>
            <div className='text-start'>
              <p className="text-[60px] font-bold">92%</p>
              <p className="mt-2 text-[1rem]  lg:text-[1.5rem]">Success ratio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CorporateHighlight
