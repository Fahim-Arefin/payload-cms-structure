import React from 'react'
import GlobalButton from '../shared/GlobalButton'
import LocalizedText from '../shared/LocalizedText'
import LocalizedString from '../shared/LocalizedString'

type Props = {
  data: any
}

function SpousePlanTabSection({ data }: Props) {
  return (
    <div
      className="mt-6 md:mt-0 grid grid-cols-1 
      gap-4 md:gap-8 lg:gap-12 xl:gap-16"
    >
      {data?.map((item: any, i: number) => (
        <div
          key={i}
          className="flex
         space-x-2 md:space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-12"
        >
          <div
            className="
          min-w-[20px] lg:min-w-[30px] xl:min-w-[40px] 2xl:min-w-[50px] 
          h-[20px] lg:h-[30px] xl:h-[40px] 2xl:h-[50px]"
          >
            <img src={item?.image} alt={item?.title} className="w-full h-full" />
          </div>
          <div>
            <div className="global-p1 font-semibold text-[#3A3A3A]">
              <LocalizedText en={item?.title} bn={item?.titleBN} />
            </div>
            <div className="global-p2 text-justify text-[#434342]">
              <LocalizedText en={item?.description} bn={item?.descriptionBN} />
            </div>
          </div>
        </div>
      ))}

      {/* <div className="flex flex-row justify-center items-center gap-4">
        <GlobalButton text="Download Brochure" className="cursor-not-allowed" variant="secondary">
          <LocalizedString en={'Download Brochure'} bn={'ডাউনলোড ব্রোশিউর'} />
        </GlobalButton>

        <GlobalButton variant="outline" className="cursor-not-allowed" text="Explore Now">
          <LocalizedString en={'Explore Now'} bn={'ঘুরে দেখুন'} />
        </GlobalButton>
      </div> */}
    </div>
  )
}

export default SpousePlanTabSection
