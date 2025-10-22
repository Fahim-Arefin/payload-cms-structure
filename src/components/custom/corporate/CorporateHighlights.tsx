import { CorporateIntroBlockType } from '@/types/payloadCustomTypes'
import { FC } from 'react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import LocalizedRichText from '../shared/LocalizedRichText'

type CorporateHighlightProps = {
  highlightsData: CorporateIntroBlockType
}

const CorporateHighlight: FC<CorporateHighlightProps> = ({
  highlightsData,
}: CorporateHighlightProps) => {
  return (
    <section
      className="relative container-padding text-white overflow-hidden"
      style={{ backgroundColor: highlightsData?.backgroundColor || '' }}
    >
      {/* Background Text */}
      <div className="absolute inset-0 xl:bottom-20 flex justify-center items-center pointer-events-none">
        {/* <h1 className="text-[4.5rem] md:text-[5.5rem] hidden md:block lg:text-[8rem] font-bold text-center lg:leading-relaxed tracking-wide uppercase whitespace-pre-line">
          <span className="block animate-fadeSlideLeft">SHANTA LIFE</span>
          <span className="block animate-fadeSlideRight">INSURANCE PLC</span>
        </h1> */}
      </div>

      {/* Foreground Content */}
      <div className="">
        <div className="global-h3 text-white text-left">
          <LocalizedRichText en={highlightsData?.description} bn={highlightsData?.descriptionBN} />
        </div>

        <hr className="border-t border-white/50 w-full my-6" />

        {/* Stats Section */}
        <div>
          <h2 className="text-[20px] md:global-h2 font-bold text-left uppercase mb-6 lg:mb-10">
            <LocalizedText en={highlightsData?.title} bn={highlightsData?.titleBN} />
          </h2>
          {/* <div className="flex justify-between text-center px-0 md:px-10">
            {highlightsData?.stats?.map((item, index) => (
              <div key={index} className="text-start">
                <p className="text-[25px] md:text-[50px] lg:text-[60px] font-bold">
                  <LocalizedText en={item?.value} bn={item?.valueBN} />
                </p>
                <p className="mt-2 text-[1.1rem] lg:text-[1.5rem] font-normal">
                  <LocalizedText en={item?.label} bn={item?.labelBN} />
                </p>
              </div>
            ))}
          </div> */}
          <div className="flex justify-between flex-wrap gap-4 md:gap-5 lg:gap-6 text-center px-0 md:px-10">
            {highlightsData?.stats?.map((item, index) => (
              <div key={index} className="text-start">
                <p className="text-[25px] md:text-[50px] lg:text-[60px] font-bold">
                  <LocalizedText en={item?.value} bn={item?.valueBN} />
                </p>
                <p className="text-[1.1rem] lg:text-[1.5rem] font-normal text-center">
                  <LocalizedText en={item?.label} bn={item?.labelBN} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CorporateHighlight
