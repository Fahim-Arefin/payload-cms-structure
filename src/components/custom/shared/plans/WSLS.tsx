import React from 'react'
import LocalizedText from '../LocalizedText'
import LocalizedHighlighted from '../LocalizedHighlighted'
import Image from 'next/image'
import { PlanInfoDesign06BlockType } from '@/types/payloadCustomTypes'
import LocalizedRichText from '../LocalizedRichText'

type Props = {
  data: PlanInfoDesign06BlockType
  align?: 'left' | 'right'
}

function WSLSSection({ data, align }: Props) {
  return (
    <div
      className="container-padding space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12"
      style={{
        backgroundColor: data?.backgroundColor || '',
      }}
    >
      {/* headers */}
      <div>
        {/* section heading */}
        {(data?.title ||
          data?.subtitle ||
          data?.description ||
          data?.titleBN ||
          data?.subtitleBN ||
          data?.descriptionBN) && (
          <div className={` text-[#434343] text-start `}>
            <div className="uppercase global-h2 font-semibold">
              <div>
                <LocalizedHighlighted
                  textEn={data?.title}
                  highlightEn={data?.highlightedText}
                  textBn={data?.titleBN}
                  highlightBn={data?.highlightedTextBN}
                  highlightClassName="text-[#ED7125]"
                />
              </div>
              {(data?.subtitle || data?.subtitleBN) && (
                <div>
                  <LocalizedHighlighted
                    textEn={data?.subtitle}
                    highlightEn={data?.highlightedSubtitle}
                    textBn={data?.subtitleBN}
                    highlightBn={data?.highlightedSubtitleBN}
                  />
                </div>
              )}
            </div>
            {(data?.description || data?.descriptionBN) && (
              <div
                className={`global-span text-[#3A3A3A] font-[350] 
                               ${(data?.title || data?.titleBN) && (data?.subtitle || data?.subtitleBN) ? `mt-2 md:mt-4 xl:mt-6 2xl:mt-8` : ''}`}
              >
                <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
              </div>
            )}
          </div>
        )}
      </div>
      {/* main content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
        {/* mobile image*/}
        <div
          className={`lg:hidden
              relative 
              w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
              ${data?.mobileImageChoice === 'tall' ? ` aspect-[630/700] ` : ` aspect-[530/340] `}
              rounded-md lg:rounded-lg xl:rounded-xl 
              overflow-hidden
              mt-12
              ${align === 'left' ? 'order-1' : 'order-1 lg:order-2 '}`}
          role="img"
          aria-label="Background image"
        >
          {/* Image */}
          {data?.mobileImageChoice === 'wide'
            ? typeof data?.imageWide === 'object' &&
              data?.imageWide?.url && (
                <Image
                  fill
                  src={data?.imageWide?.url}
                  alt={`Wide image`}
                  className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl w-full h-full "
                  sizes="50vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL={data?.imageWideBlurDataURL || ''}
                />
              )
            : typeof data?.imageTall === 'object' &&
              data?.imageTall?.url && (
                <Image
                  fill
                  src={data?.imageTall?.url}
                  alt={`tall image`}
                  className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl w-full h-full "
                  sizes="50vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL={data?.imageTallBlurDataURL || ''}
                />
              )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
        {/* web image */}
        <div
          className={`hidden lg:flex lg:flex-col lg:justify-center  
                    ${align === 'left' ? 'order-1' : 'order-1 lg:order-2 '}`}
        >
          <div
            className={`hidden lg:block
                      relative 
                      w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
                      ${data?.desktopImageChoice === 'tall' ? ` aspect-[630/700] ` : ` aspect-[530/340] `}
                      rounded-md lg:rounded-lg xl:rounded-xl 
                      overflow-hidden`}
            role="img"
            aria-label="Background image"
          >
            {/* Image */}
            {data?.desktopImageChoice === 'tall'
              ? typeof data?.imageTall === 'object' &&
                data?.imageTall?.url && (
                  <Image
                    fill
                    src={data?.imageTall?.url}
                    alt={`Tall image`}
                    className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl w-full h-full "
                    sizes="50vw"
                    quality={80}
                    placeholder="blur"
                    blurDataURL={data?.imageTallBlurDataURL || ''}
                  />
                )
              : typeof data?.imageWide === 'object' &&
                data?.imageWide?.url && (
                  <Image
                    fill
                    src={data?.imageWide?.url}
                    alt={`wide image`}
                    className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl w-full h-full "
                    sizes="50vw"
                    quality={80}
                    placeholder="blur"
                    blurDataURL={data?.imageWideBlurDataURL || ''}
                  />
                )}
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/10 " />
          </div>
        </div>
        {/* stamp iamge */}
        <div className="absolute inset-x-0 -bottom-[40px] flex items-center justify-center">
          <div
            className={`hidden lg:block relative
          w-[70px] xl:w-[90px]
           aspect-[1/1]
           ${align === 'left' ? ' lg:mr-8 xl:mr-10 ' : ' lg:ml-8 xl:ml-10 '}`}
          >
            {typeof data?.stampImage === 'object' && data?.stampImage?.url && (
              <Image
                fill
                src={data?.stampImage?.url}
                alt="Image"
                className="object-cover object-center 
              rounded-md lg:rounded-lg xl:rounded-xl 2xl:rounded-2xl"
                sizes="50vw"
                quality={80}
                placeholder="blur"
                blurDataURL={data?.stampImageBlurDataURL || ''}
              />
            )}
          </div>
        </div>
        {/* features */}
        <div
          className={` h-fit my-auto space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-8 ${align === 'left' ? 'order-2' : 'order-2 lg:order-1'} `}
        >
          {data?.features?.map((item, index) => (
            <div key={index} className="flex items-start gap-3 xl:gap-4 2xl:gap-5 ">
              <div
                className="rounded-full bg-[#FCF4EB]
              p-1 lg:p-1.5 xl:p-2 2xl:p-3 "
              >
                <div
                  className="relative h-fit
                min-w-[12px] lg:min-w-[15px] xl:min-w-[20px] 2xl:min-w-[25px]
                aspect-[1/1] "
                >
                  {typeof item?.icon === 'object' && item?.icon?.url && (
                    <Image
                      fill
                      src={item?.icon?.url}
                      alt="Image"
                      className="object-cover object-center rounded-full w-full h-full"
                      sizes="50vw"
                      quality={80}
                      placeholder="blur"
                      blurDataURL={item?.iconBlurDataURL || ''}
                    />
                  )}
                </div>
              </div>
              <div className="space-y-1 2xl:space-y-2">
                <div className="global-p1 font-semibold text-[#3A3A3A]">
                  <LocalizedText en={item?.title} bn={item?.titleBN} />
                </div>
                <div className="text-[10px] md:text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[20px] font-extralight text-[#434342]">
                  <LocalizedRichText en={item?.description} bn={item?.descriptionBN} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WSLSSection
