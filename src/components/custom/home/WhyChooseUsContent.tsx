// localization without media blur effects
import { WhyChooseUsBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import GlobalButton from '../shared/GlobalButton'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedString from '../shared/LocalizedString'
import LocalizedText from '../shared/LocalizedText'
import { pageHref } from '@/lib/utils'

type Props = {
  whyChooseUsData: WhyChooseUsBlockType
}

function WhyChooseUsContent({ whyChooseUsData }: Props) {
  const btnText = (whyChooseUsData?.buttonText ?? '').trim()
  const btnTextBN = (whyChooseUsData?.buttonTextBN ?? '').trim()
  return (
    // bg-white lg:pb-[200px]
    <div
      className={`relative ${whyChooseUsData?.useSearchBar ? 'lg:container-padding-b' : 'lg:container-padding-y'} `}
      style={{
        backgroundColor: whyChooseUsData?.backgroundColor || '',
      }}
    >
      {/* BG (mobile only) */}
      <div className="absolute lg:hidden inset-0 z-10">
        {typeof whyChooseUsData?.mainImage === 'object' && whyChooseUsData?.mainImage && (
          <>
            <Image
              src={whyChooseUsData?.mainImage?.url || ``}
              alt="Background"
              className="object-cover object-center"
              fill
              sizes="700px"
              placeholder="blur"
              blurDataURL={whyChooseUsData?.mainImageBlurDataURL || ''}
            />
            <div className="absolute inset-0 bg-[#1E1E1E]/60 z-20" />
          </>
        )}
      </div>

      <div className="container-width z-30 relative w-full min-h-[550px] md:min-h-[600px] lg:min-h-[550px] grid grid-cols-1 lg:grid-cols-2">
        {/* Left Image (desktop) */}
        <div className="hidden lg:flex justify-end items-center rounded-t-[24px]">
          <div className="relative rounded-t-[24px] w-full lg:h-[600px] xl:h-[650px] 2xl:h-[700px]">
            {typeof whyChooseUsData?.mainImage === 'object' && whyChooseUsData?.mainImage && (
              <Image
                className="object-cover object-center rounded-2xl"
                src={whyChooseUsData?.mainImage?.url || ``}
                alt="why choose us"
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL={whyChooseUsData?.mainImageBlurDataURL || ''}
              />
            )}
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col font-avenir">
          {/* top section */}
          <div className="z-30 space-y-4 lg:space-y-4 h-[50%] flex flex-col justify-start lg:justify-center p-8 md:p-12 lg:pr-0 lg:pt-0 lg:pb-0 lg:pl-12 text-center lg:text-left">
            {/* heading */}
            <LocalizedText
              as="div"
              className="global-h4 text-white lg:text-[#1E1E1E] uppercase font-light"
              en={whyChooseUsData?.heading}
              bn={whyChooseUsData?.headingBN}
            />

            <div className="flex items-center justify-center space-x-2 lg:flex-col lg:justify-start lg:items-start lg:space-x-0">
              {/* title */}
              <LocalizedText
                as="div"
                className="global-h1 font-medium text-white lg:text-[#434342] uppercase"
                en={whyChooseUsData?.title}
                bn={whyChooseUsData?.titleBN}
              />

              {/* subtitle with highlight */}
              <LocalizedHighlighted
                as="div"
                className="global-h1 uppercase font-medium text-white lg:text-[#434342]"
                textEn={whyChooseUsData?.subtitle}
                textBn={whyChooseUsData?.subtitleBN}
                highlightEn={whyChooseUsData?.highlightedText}
                highlightBn={whyChooseUsData?.highlightedTextBN}
                highlightClassName="text-[#ED7125]"
              />
            </div>

            {/* description */}
            <LocalizedText
              as="div"
              className="text-white lg:text-[#434342] text-[12px] md:text-[16px] lg:text-[14px] 2xl:text-[17px] mt-3 lg:mt-0 font-normal"
              en={whyChooseUsData?.description}
              bn={whyChooseUsData?.descriptionBN}
            />
          </div>

          {/* bottom section */}
          <div className="h-[50%] absolute bottom-0 right-0 w-full lg:w-[80%] xl:w-[75%] 2xl:w-[1000px]">
            {/* horizontal grid */}
            <div className="z-[50] h-[250px] 2xl:h-[300px] lg:bg-[#FCF4EB] flex justify-center lg:justify-end items-center rounded-tl-2xl">
              <div className="flex justify-center lg:justify-end items-center flex-wrap w-full lg:w-[61%] xl:w-[67%] 2xl:w-[71%]">
                {whyChooseUsData?.stats?.map((stat, index) => (
                  <div className="w-[48%] md:w-[40%] lg:w-[45%] grid grid-cols-3" key={index}>
                    {/* icon */}
                    <div
                      className={`col-span-1 p-2 2xl:p-4 border-2 border-white lg:border-[#9A4E46] bg-white lg:bg-none 
                      ${index === 0 || index === 1 ? 'rounded-t-sm md:rounded-t-md lg:rounded-t-lg xl:rounded-t-xl' : 'rounded-b-sm md:rounded-b-md lg:rounded-b-lg xl:rounded-b-xl '}`}
                    >
                      {typeof stat?.icon === 'object' && stat?.icon?.url && (
                        <div className="relative w-full aspect-square">
                          <Image
                            fill
                            src={stat?.icon?.url || ''}
                            alt="stat-icon"
                            className="object-cover object-center"
                            sizes="30vw"
                            placeholder="blur"
                            blurDataURL={stat?.iconBlurDataURL || ''}
                          />
                        </div>
                      )}
                    </div>

                    {/* value + label */}
                    <div
                      className={`col-span-2 text-white lg:text-[#434343] p-2 2xl:p-4 ${index === 0 || index === 1 ? 'border-b-2' : 'border-t-2'} border-white lg:border-[#9A4E46] w-full`}
                    >
                      <LocalizedText
                        as="div"
                        className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px] font-bold"
                        en={stat?.value}
                        bn={stat?.valueBN}
                      />
                      <LocalizedText
                        as="div"
                        className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] lg:text-[11px] 2xl:text-[15px] font-light"
                        en={stat?.label}
                        bn={stat?.labelBN}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* side image (vertical) */}
            <div className="hidden lg:block absolute top-0 left-0 bg-[#FCF4EB] lg:pl-2 lg:pt-2 2xl:pl-3.5 2xl:pt-3.pl-3.5 rounded-tl-2xl rounded-br-2xl">
              <div className="relative lg:h-[350px] xl:h-[370px] 2xl:h-[420px] lg:w-[235px]  xl:w-[250px] 2xl:w-[300px] z-[50] rounded-2xl">
                {typeof whyChooseUsData?.sideImage === 'object' && whyChooseUsData?.sideImage && (
                  <Image
                    className="z-[50] rounded-2xl object-cover object-center"
                    src={whyChooseUsData?.sideImage?.url || ``}
                    alt="why choose us"
                    fill
                    sizes="300px"
                    placeholder="blur"
                    blurDataURL={whyChooseUsData?.sideImageBlurDataURL || ''}
                  />
                )}
              </div>
            </div>

            {/* CTA (uses EN/BN only for text) */}
            {btnText.length > 0 && btnTextBN.length > 0 && whyChooseUsData?.buttonLink && (
              <div className="hidden lg:flex justify-center absolute inset-x-0 bottom-0 ">
                <Link href={pageHref(whyChooseUsData.buttonLink)}>
                  <GlobalButton
                    size="small"
                    variant="primary"
                    className="lg:ml-12 xl:-ml-10 2xl:-ml-[140px]"
                  >
                    <LocalizedString
                      en={whyChooseUsData.buttonText}
                      bn={whyChooseUsData.buttonTextBN}
                    />
                  </GlobalButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUsContent
