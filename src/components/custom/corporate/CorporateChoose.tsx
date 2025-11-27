import BrochureButtonBlock from '@/blocks/resourcesButton/BrochureButton/BrochureButtonBlock'
import LinkButtonBlock from '@/blocks/resourcesButton/LinkButton/LinkButtonBlock'
import { BROCHURE_BUTTON_SLUG_AND_TAG, LINK_BUTTON_SLUG_AND_TAG } from '@/lib/constants'
import { CorporateInfoBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import { FC } from 'react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'

type CorporateChooseProps = {
  benefitsData: CorporateInfoBlockType
}

const CorporateChoose: FC<CorporateChooseProps> = ({ benefitsData }) => {
  const cols =
    (benefitsData?.resourceButtons?.length && benefitsData?.resourceButtons?.length - 1) ?? 1

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
          <h1 className="global-h1 font-bold text-[#434342] mb-2">
            <LocalizedHighlighted
              textEn={benefitsData?.title}
              textBn={benefitsData?.titleBN}
              highlightEn={benefitsData?.highlightedText}
              highlightBn={benefitsData?.highlightedTextBN}
              // highlightClassName="text-[#ED7125]"
            />
          </h1>

          {benefitsData?.infos.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 xl:gap-6 xl:px-6">
              {/* ICON */}
              <div
                // h-[40px] md:h-[60px] lg:h-[80px] 2xl:h-[115px]
                className="w-[40px] md:w-[60px] xl:w-[80px] 
                shrink-0 flex-none
                relative
                aspect-[1/1]
                
                "
              >
                {typeof item?.icon === 'object' && item?.icon?.url && (
                  <Image
                    src={item.icon?.url}
                    alt={`icon-${idx}`}
                    fill
                    sizes="( max-width: 767px) 40px, (max-width: 1023px) 60px, (max-width: 1279px) 80px, 115px"
                    className="w-full h-full object-center object-cover"
                    placeholder="blur"
                    blurDataURL={item?.iconBlurDataURL || ''}
                    quality={85}
                  />
                )}
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-2 px-4">
                <p className="lg:text-[1.1rem] font-bold xl:text-[1.3rem] text-[#434342]">
                  <LocalizedText en={item?.title} bn={item?.titleBN} />
                </p>
                <p className="lg:text-[14px] xl:text-[18px] font-extralight text-justify text-[#434342]">
                  <LocalizedText en={item?.description} bn={item?.descriptionBN} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Left image */}
        {/* lg:h-[660px] xl:h-[820px] 2xl:h-[950px]  */}
        <div className="relative w-full rounded-md lg:rounded-lg xl:rounded-xl aspect-[628/820]">
          {typeof benefitsData?.image === 'object' && benefitsData?.image?.url && (
            <Image
              // src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/DesignatedDeliverBanner.jpg`}
              src={benefitsData?.image?.url}
              alt="benefits Image"
              fill
              //  object-[30%,0%]
              className="rounded-md lg:rounded-lg xl:rounded-xl object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={benefitsData?.imageBlurDataURL || ''}
              quality={80}
            />
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="relative block lg:hidden w-full h-[540px]">
        {typeof benefitsData?.imageOriginal === 'object' && benefitsData?.imageOriginal?.url && (
          <Image
            // src="/assets/DesignatedDeliverBanner.jpg"
            src={benefitsData?.imageOriginal?.url}
            alt="Mobile Background"
            fill
            sizes="(max-width: 767px) 540px"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL={benefitsData?.imageBlurDataURL || ''}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
          <div className="px-4 py-5 flex flex-col gap-4 bg-[#FCF4EB] rounded-md">
            {benefitsData?.infos?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                {/* ICON */}
                <div className="relative w-[40px] aspect-[1/1] shrink-0 flex-none">
                  {typeof item?.icon === 'object' && item?.icon?.url && (
                    <Image
                      src={item.icon?.url}
                      alt={`icon-${idx}`}
                      fill
                      className="object-cover object-center"
                      placeholder="blur"
                      blurDataURL={item?.iconBlurDataURL || ''}
                      quality={80}
                    />
                  )}
                </div>

                {/* TEXT */}
                <div className="flex flex-col gap-2">
                  <p className="uppercase text-left global-p1 font-medium text-[#434342]">
                    <LocalizedText en={item?.title} bn={item?.titleBN} />
                  </p>
                  <p className="uppercase global-p2 text-[#434342]">
                    {' '}
                    <LocalizedText en={item?.description} bn={item?.descriptionBN} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* btn */}
      {benefitsData?.resourceButtons && benefitsData?.resourceButtons?.length > 0 && (
        <>
          <div
            className="mt-[30px] lg:mt-[50px] xl:mt-[80px] w-[40%] mx-auto
        flex flex-row flex-wrap gap-y-2 gap-x-4 justify-center items-center  "
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {benefitsData?.resourceButtons?.map((item, i) => (
              <div key={i} className="basis-[46%]">
                {item?.blockType === BROCHURE_BUTTON_SLUG_AND_TAG && (
                  <div className={`flex ${i % 2 === 0 ? `justify-end ` : 'justify-start '} `}>
                    <BrochureButtonBlock data={item} />
                  </div>
                )}
                {item?.blockType === LINK_BUTTON_SLUG_AND_TAG && (
                  <div
                    className={`flex gap-x-2  ${benefitsData?.resourceButtons?.length === 2 ? `justify-start` : 'justify-center'}`}
                  >
                    <LinkButtonBlock data={item} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CorporateChoose
