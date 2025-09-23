import React, { FC } from 'react'
import LocalizedText from '../shared/LocalizedText'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'

type Highlights = {
  mainDescription: string
  mainDescriptionBN?: string
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
        <h1 className="text-[4.5rem] md:text-[5.5rem] hidden md:block lg:text-[8rem] font-bold text-center lg:leading-relaxed tracking-wide uppercase whitespace-pre-line">
          <span className="block animate-fadeSlideLeft">SHANTA LIFE</span>
          <span className="block animate-fadeSlideRight">INSURANCE PLC</span>
        </h1>
      </div>

      {/* Foreground Content */}
      <div className="">
        <p className="global-h3 text-white text-left">
          <LocalizedText
            en={highlightsData[0]?.mainDescription}
            bn={highlightsData[0]?.mainDescriptionBN}
          />
        </p>

        <hr className="border-t border-white/50 w-full my-6" />

        {/* Stats Section */}
        <div>
          <h2 className="text-[20px] md:global-h2 font-bold text-left uppercase mb-6 lg:mb-10">
            <LocalizedText en={`At a Glance`} bn={`এক নজরে`} />
          </h2>
          <div className="flex justify-between text-center px-0 md:px-10">
            <div className="text-start">
              <p className="text-[25px] md:text-[50px] lg:text-[60px] font-bold">
                <LocalizedText en={`100+`} bn={`১০০+`} />
              </p>
              <p className="mt-2 text-[1.1rem] lg:text-[1.5rem] font-normal">
                <LocalizedText en={`Claims`} bn={`দাবি`} />
              </p>
            </div>
            <div className="text-start">
              <p className="text-[25px] md:text-[50px] lg:text-[60px] font-bold">
                <LocalizedHighlighted
                  textBn={`৫ দিনে`}
                  textEn={`5 Days`}
                  highlightEn={`Days`}
                  highlightBn={`দিনে`}
                  highlightClassName="font-semibold"
                />
              </p>
              <p className="mt-2 text-[1.1rem] lg:text-[1.5rem] font-normal">
                <LocalizedText en="Settlement" bn="সেটেলমেন্ট" />
              </p>
            </div>
            <div className="text-start">
              <p className="text-[25px] md:text-[50px] lg:text-[60px] font-bold">
                <LocalizedText en="100%" bn="১০০%" />
              </p>
              <p className="mt-2 text-[1.1rem]  lg:text-[1.5rem] font-normal">
                <LocalizedText en="Settlement rate" bn="সেটেলমেন্ট রেট" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CorporateHighlight
