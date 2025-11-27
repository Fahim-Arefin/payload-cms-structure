import BrochureButtonBlock from '@/blocks/resourcesButton/BrochureButton/BrochureButtonBlock'
import LinkButtonBlock from '@/blocks/resourcesButton/LinkButton/LinkButtonBlock'
import { BROCHURE_BUTTON_SLUG_AND_TAG, LINK_BUTTON_SLUG_AND_TAG } from '@/lib/constants'
import { PlanInfoDesign03BlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import LocalizedHighlighted from '../LocalizedHighlighted'
import LocalizedText from '../LocalizedText'
import LocalizedRichText from '../LocalizedRichText'

type Props = {
  align?: 'left' | 'right'
  data: PlanInfoDesign03BlockType
}

function ProtectionSection({ align = 'left', data }: Props) {
  const cols = (data?.resourceButtons?.length && data?.resourceButtons?.length - 1) ?? 1

  return (
    <div
      className="container-padding space-y-4 md:space-y-10 lg:space-y-12"
      style={{
        backgroundColor: data?.backgroundColor || '',
      }}
    >
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
      {/* content */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-12 xl:gap-9 2xl:gap-16 ${align === 'left' ? ' lg:gap-0 ' : 'lg:gap-7'}`}
      >
        {/* left content */}
        {/* mobile */}
        <div
          className={`lg:hidden
            relative 
            w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
            ${data?.mobileImageChoice === 'tall' ? ` aspect-[630/700] ` : ` aspect-[500/370] `}
            rounded-md lg:rounded-lg  xl:rounded-xl 
            overflow-hidden
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
                  className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
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
                  className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
                  sizes="50vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL={data?.imageTallBlurDataURL || ''}
                />
              )}
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10 " />
        </div>

        {/* web */}
        <div
          className={`hidden lg:flex lg:flex-col lg:justify-center  
          ${align === 'left' ? 'order-1' : 'order-1 lg:order-2 '}`}
        >
          <div
            //  h-[250px] md:h-[350px] lg:h-[440px] xl:h-[600px] 2xl:h-[700px]
            className={`hidden lg:block
            relative 
            w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
            ${data?.desktopImageChoice === 'tall' ? ` aspect-[630/700] ` : ` aspect-[500/370] `}
            rounded-md lg:rounded-lg  xl:rounded-xl
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
                    className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
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
                    className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
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

        {/* right content */}
        <div
          className={`
          flex flex-col justify-center
        space-y-4 lg:space-y-4 xl:space-y-7
        ${align === 'left' ? 'order-2' : 'order-2 lg:order-1'} `}
        >
          {/* heading */}
          {(data?.cardTitle || data?.cardTitleBN || data?.cardSubtitle || data?.cardSubtitleBN) && (
            <div className="">
              {(data?.cardTitle || data?.cardTitle) && (
                <h3 className="global-p1 md:global-h4 lg:global-p1 text-[#3A3A3A] uppercase font-light ">
                  <LocalizedHighlighted
                    textEn={data?.cardTitle}
                    highlightEn={data?.cardTitleHighlighted}
                    textBn={data?.cardTitleBN}
                    highlightBn={data?.cardTitleHighlightedBN}
                    as="div"
                  />
                </h3>
              )}
              {(data?.cardSubtitle || data?.cardSubtitle) && (
                <h3 className="global-h1 uppercase text-[#3A3A3A] font-medium">
                  <LocalizedHighlighted
                    textEn={data?.cardSubtitle}
                    highlightEn={data?.cardSubtitleHighlighted}
                    textBn={data?.cardSubtitleBN}
                    highlightBn={data?.cardSubtitleHighlightedBN}
                    as="div"
                  />
                </h3>
              )}
            </div>
          )}
          {/* items */}
          <div className="space-y-4 lg:space-y-4 xl:space-y-7 lg:pb-1">
            {data?.cardItems?.map((eachItem, i) => (
              <div
                // bg-white/50 border-[#9C8639]
                key={i}
                className={` flex items-center  
              ${
                data?.cardItemBorder === 'border'
                  ? `backdrop-blur-[12.5px] border-[1.25px] space-x-2 lg:space-x-2 xl:space-x-3 2xl:space-x-4
                p-1 md:px-4 md:py-1.5 lg:px-1 lg:py-2 xl:p-2.5 2xl:p-4 rounded-[4px] lg:rounded-[5px] xl:rounded-[6px] 2xl:rounded-[7px]
                `
                  : `space-x-3 lg:space-x-4 xl:space-x-6 2xl:space-x-8 p-1 md:px-4 md:py-1.5 lg:px-1 lg:py-2 xl:p-2.5 2xl:p-4`
              }`}
                style={{
                  backgroundColor:
                    data?.cardItemBorder === 'border' ? data?.cardItemBorderBgColor || '' : '',
                  borderColor:
                    data?.cardItemBorder === 'border' ? data?.cardItemBorderColor || '' : '',
                }}
              >
                {eachItem?.icon && (
                  <div
                    // min-w-[35px] md:min-w-[40px] lg:min-w-[30px] xl:min-w-[40px] 2xl:min-w-[46px] h-[35px] md:h-[40px] lg:h-[30px] xl:h-[40px] 2xl:h-[46px]
                    className={`
                    ${
                      data?.cardItemBorder === 'border'
                        ? `min-w-[35px] md:min-w-[40px] lg:min-w-[30px] xl:min-w-[40px] 2xl:min-w-[46px] `
                        : `min-w-[40px] md:min-w-[50px] lg:min-w-[60px] xl:min-w-[70px] 2xl:min-w-[80px]`
                    } 
                    relative aspect-[1/1]`}
                  >
                    {typeof eachItem?.icon === 'object' && eachItem?.icon?.url && (
                      <Image
                        fill
                        src={eachItem?.icon?.url}
                        alt="icons"
                        placeholder="blur"
                        blurDataURL={eachItem?.iconBlurDataURL || ''}
                        quality={80}
                      />
                    )}
                  </div>
                )}
                {(eachItem?.description || eachItem?.descriptionBN) && (
                  <div className="text-justify text-[12px] md:text-[14px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px] text-[#434343] font-semibold ">
                    <LocalizedText en={eachItem?.description} bn={eachItem?.descriptionBN} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/*CTA button */}
          {data?.resourceButtons && data?.resourceButtons?.length > 0 && (
            <>
              <div
                className=" w-full
                  flex flex-row flex-wrap gap-y-2 gap-x-4 justify-start items-center  "
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
              >
                {data?.resourceButtons?.map((item, i) => (
                  <div key={i} className="">
                    {item?.blockType === BROCHURE_BUTTON_SLUG_AND_TAG && (
                      <div className={`flex ${i % 2 === 0 ? `justify-start ` : 'justify-start '} `}>
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
      </div>
    </div>
  )
}

export default ProtectionSection
