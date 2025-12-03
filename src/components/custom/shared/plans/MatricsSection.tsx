'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import GlobalButton from '../GlobalButton'
import LocalizedHighlighted from '../LocalizedHighlighted'
import LocalizedString from '../LocalizedString'
import LocalizedText from '../LocalizedText'
import { PlanInfoDesign04BlockType } from '@/types/payloadCustomTypes'
import BrochureButtonBlock from '@/blocks/resourcesButton/BrochureButton/BrochureButtonBlock'
import LinkButtonBlock from '@/blocks/resourcesButton/LinkButton/LinkButtonBlock'
import { BROCHURE_BUTTON_SLUG_AND_TAG, LINK_BUTTON_SLUG_AND_TAG } from '@/lib/constants'
import LocalizedRichText from '../LocalizedRichText'

type Props = {
  data: PlanInfoDesign04BlockType
}

function MatricsSection({ data }: Props) {
  const cols = (data?.resourceButtons?.length && data?.resourceButtons?.length - 1) ?? 1

  return (
    <div
      className="container-padding
           space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12"
    >
      <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12">
        {/* Heading */}
        {/* <h1 className="global-h1 font-medium uppercase">
          <LocalizedHighlighted
            textEn={`Metrics That Matter`}
            textBn={`গুরুত্বপূর্ণ তথ্য`}
            highlightEn={`Metrics`}
            highlightBn={`গুরুত্বপূর্ণ`}
            highlightClassName="text-[#ED7125]"
          />
        </h1> */}
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
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 md:gap-12 lg:gap-0 ">
          {/* Left image block */}
          {/* desktop img */}
          <div className={`order-1 lg:${data?.imageOrder === 'left' ? 'order-1' : 'order-2'} `}>
            {data?.desktopImageChoice === 'tall' ? (
              <div
                className="hidden lg:block relative 
           rounded-md lg:rounded-lg xl:rounded-xl 
           w-full h-auto aspect-[630/700]"
              >
                {typeof data?.imageTall === 'object' && data?.imageTall?.url && (
                  <Image
                    fill
                    // src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/accidental-coverage/web/matrics.jpg`}
                    src={data?.imageTall?.url}
                    alt="Surgery room"
                    className="object-cover object-center rounded-md lg:rounded-lg xl:rounded-xl "
                    sizes="(max-width: 1023px) 350px, 700px"
                    placeholder="blur"
                    blurDataURL={data?.imageTallBlurDataURL || ''}
                    quality={80}
                  />
                )}
              </div>
            ) : (
              <div
                className="hidden lg:block relative 
           rounded-md lg:rounded-lg xl:rounded-xl 
           w-full h-auto aspect-[500/370]"
              >
                {typeof data?.imageWide === 'object' && data?.imageWide?.url && (
                  <Image
                    fill
                    // src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/accidental-coverage/web/matrics.jpg`}
                    src={data?.imageWide?.url}
                    alt="Surgery room"
                    className="object-cover object-center rounded-md lg:rounded-lg xl:rounded-xl "
                    sizes="(max-width: 1023px) 350px, 700px"
                    placeholder="blur"
                    blurDataURL={data?.imageWideBlurDataURL || ''}
                    quality={80}
                  />
                )}
              </div>
            )}

            {/* mobile img */}
            {data?.mobileImageChoice === 'tall' ? (
              <div
                className="lg:hidden relative 
           rounded-md lg:rounded-lg xl:rounded-xl 
           w-full h-auto aspect-[630/700]"
              >
                {typeof data?.imageTall === 'object' && data?.imageTall?.url && (
                  <Image
                    fill
                    // src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/accidental-coverage/web/matrics.jpg`}
                    src={data?.imageTall?.url}
                    alt="Surgery room"
                    className="object-cover object-center rounded-md lg:rounded-lg xl:rounded-xl "
                    sizes="(max-width: 1023px) 350px, 700px"
                    placeholder="blur"
                    blurDataURL={data?.imageTallBlurDataURL || ''}
                    quality={80}
                  />
                )}
              </div>
            ) : (
              <div
                className="lg:hidden relative
           rounded-md lg:rounded-lg xl:rounded-xl 
           w-full h-auto aspect-[500/370]"
              >
                {typeof data?.imageWide === 'object' && data?.imageWide?.url && (
                  <Image
                    fill
                    // src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/accidental-coverage/web/matrics.jpg`}
                    src={data?.imageWide?.url}
                    alt="Surgery room"
                    className="object-cover object-center rounded-md lg:rounded-lg xl:rounded-xl "
                    sizes="(max-width: 1023px) 350px, 700px"
                    placeholder="blur"
                    blurDataURL={data?.imageWideBlurDataURL || ''}
                    quality={80}
                  />
                )}
              </div>
            )}
          </div>

          {/* Right visual layout with image arcs */}
          <div
            className={`order-2 lg:${data?.imageOrder === 'left' ? 'order-2' : 'order-1'}  
            relative mx-auto 
           h-[250px] md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[460px]
           w-[330px] md:w-[580px] lg:w-[380px] xl:w-[500px] 2xl:w-[645px]`}
          >
            {/* Background semi-circle */}
            <div className="absolute inset-0 flex left-[28%] items-center">
              <img
                src="/assets/images/ellipse.png"
                alt="Metric Arc"
                className="object-contain pointer-events-none select-none
                h-[122px] md:h-[216px] lg:h-[150px] xl:h-[198px] 2xl:h-[265px]"
              />
            </div>

            {/* Top vertical line */}
            <img
              src="/assets/images/line2.png"
              alt="Top Line"
              className="absolute top-0 left-[47%] md:left-[47%] lg:left-[48%] xl:left-[48%] 2xl:left-[49%] -translate-x-1/2 
              w-[4px] md:w-[7px] lg:w-[5px] xl:w-fit
              h-[68px] md:h-[74px] lg:h-[105px] xl:h-[107px] 2xl:h-[107px] "
            />

            {/* Bottom vertical line */}
            <img
              src="/assets/images/line2.png"
              alt="Bottom Line"
              className="absolute bottom-0 left-[47%] md:left-[47%] lg:left-[48%] xl:left-[48%] 2xl:left-[49%] -translate-x-1/2 
             w-[4px] md:w-[7px] lg:w-[5px] xl:w-fit
              h-[68px] md:h-[74px] lg:h-[105px] xl:h-[107px] 2xl:h-[107px]"
            />

            {/* Center text */}
            <div
              className=" w-[33%] h-[33%] absolute inset-0 flex items-center  text-center z-10
             left-[32%] md:left-[34%] lg:left-[32%] 2xl:left-[36%] top-1/3"
            >
              <div>
                <p className="text-[10px] md:text-[16px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] text-[#ED7125] font-medium">
                  <LocalizedText
                    en={data?.circleInfo?.centerTitle}
                    bn={data?.circleInfo?.centerTitleBN}
                  />
                </p>
                <p className="global-span font-semibold text-[#ED7125]">
                  <LocalizedText
                    en={data?.circleInfo?.centerValue}
                    bn={data?.circleInfo?.centerValueBN}
                  />
                </p>
              </div>
            </div>

            {/* Top Left */}
            <div
              className=" absolute text-center p-4 z-10 
              top-4 md:left-8 lg:top-4 lg:left-3 xl:top-4 xl:left-4 2xl:top-4 2xl:left-7 max-w-[45%]"
            >
              <p className="global-p2 font-light capitalize">
                <LocalizedText
                  en={data?.circleInfo?.topLeftLabel}
                  bn={data?.circleInfo?.topLeftLabelBN}
                />
              </p>
              <p className="global-p1 font-semibold">
                <LocalizedText
                  en={data?.circleInfo?.topLeftValue}
                  bn={data?.circleInfo?.topLeftValueBN}
                />
              </p>
            </div>

            {/* Top Right */}
            <div
              //   className=" absolute text-center p-4 z-10 border border-black top-4
              // right-0 md:right-8 lg:right-0 2xl:right-12 max-w-[45%]"
              className=" absolute top-4 right-0 md:right-8 lg:right-0 text-center p-4 z-10 max-w-[45%]"
            >
              <p className="global-p2 font-light capitalize">
                <LocalizedText
                  en={data?.circleInfo?.topRightLabel}
                  bn={data?.circleInfo?.topRightLabelBN}
                />
              </p>
              <p className="global-p1 font-semibold">
                <LocalizedText
                  en={data?.circleInfo?.topRightValue}
                  bn={data?.circleInfo?.topRightValueBN}
                />
              </p>
              {/* <p className="global-p1 leading-3 font-semibold">
                <LocalizedText en={`Your Basic Plan`} bn={`পলিসির অনুরূপ`} />
              </p> */}
            </div>

            {/* Bottom Left */}
            <div
              className=" absolute text-center p-4 z-10  max-w-[45%]
              bottom-4 md:left-8 lg:bottom-4 lg:left-3  xl:bottom-4 xl:left-4 2xl:bottom-4 2xl:left-7"
            >
              <p className="global-p2 font-light capitalize">
                <LocalizedText
                  en={data?.circleInfo?.bottomLeftLabel}
                  bn={data?.circleInfo?.bottomLeftLabelBN}
                />
              </p>
              <p className="global-p1 font-semibold">
                <LocalizedText
                  en={data?.circleInfo?.bottomLefValue}
                  bn={data?.circleInfo?.bottomLefValueBN}
                />
              </p>
            </div>

            {/* Bottom Right */}
            <div className=" absolute bottom-4 right-0 md:right-8 lg:right-0 text-center p-4 z-10 max-w-[45%]">
              <p className="global-p2 font-light capitalize">
                <LocalizedText
                  en={data?.circleInfo?.bottomRightLabel}
                  bn={data?.circleInfo?.bottomRightLabelBN}
                />
              </p>
              <p className="global-p1 font-semibold">
                <LocalizedText
                  en={data?.circleInfo?.bottomRightValue}
                  bn={data?.circleInfo?.bottomRightValueBN}
                />
              </p>
              {/* <p className="global-p1 leading-3 font-semibold">
                <LocalizedText en={`Extensive Protection!`} bn={`মানের সাথে সামঞ্জস্যপূর্ণ`} />
              </p> */}
            </div>
          </div>
        </div>
      </div>
      {/* Buttons */}

      {/* <div className="flex gap-4 lg:gap-6 justify-center">
        <Link
          href="/assets/pdf/Required Brochures/Health Protection/Shanta Accidental Coverage/Shanta-Life-Rider-Brochure.pdf"
          target="_blank"
          prefetch={false}
        >
          <GlobalButton variant="primary" text="Download Brochure">
            <LocalizedString en={`Download Brochure`} bn={`ডাউনলোড ব্রোশিওর`} />
          </GlobalButton>
        </Link>
        <div className="flex justify-center mt-2">
          <Link
            href="/plans/individual"
            className="capitalize text-[#ED7125] underline hover:text-[#d65a1a] transition-colors font-medium flex items-center gap-1 
                    text-[10px] md:text-[12px] lg:text-[14px] xl:text-[14px]"
          >
            <LocalizedText en="explore all plans" bn="সকল প্ল্যান ঘুরে দেখুন" />
            <ArrowUpRight size={14} className="inline-block" />
          </Link>
        </div>
      </div> */}
      {/* btn */}
      {data?.resourceButtons && data?.resourceButtons?.length > 0 && (
        <>
          <div
            className="mt-[30px] lg:mt-[50px] xl:mt-[80px] w-[40%] mx-auto
              flex flex-row flex-wrap gap-y-2 gap-x-4 justify-center items-center  "
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {data?.resourceButtons?.map((item, i) => (
              <div key={i} className="basis-[46%]">
                {item?.blockType === BROCHURE_BUTTON_SLUG_AND_TAG && (
                  <div className={`flex ${i % 2 === 0 ? `justify-end ` : 'justify-start '} `}>
                    <BrochureButtonBlock data={item} />
                  </div>
                )}
                {item?.blockType === LINK_BUTTON_SLUG_AND_TAG && (
                  <div
                    className={`flex gap-x-2  ${data?.resourceButtons?.length === 2 ? `justify-start` : 'justify-center'}`}
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

export default MatricsSection
