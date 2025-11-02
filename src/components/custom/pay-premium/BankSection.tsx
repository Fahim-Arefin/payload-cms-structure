import { PlanInfoDesign05BlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedRichText from '../shared/LocalizedRichText'

type Props = {
  bgColor?: string
  align?: 'left' | 'right'
  data: PlanInfoDesign05BlockType
}

function BankSection({ bgColor = '#FFFFFF', align = 'left', data }: Props) {
  return (
    <div
      className="container-padding space-y-4 md:space-y-10 lg:space-y-12"
      style={{
        backgroundColor: bgColor,
      }}
    >
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
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-12 lg:gap-6 xl:gap-9 2xl:gap-16 ${align === 'left' ? ' lg:gap-0 ' : 'gap-0'}`}
      >
        {/* mobile image*/}
        <div
          className={`lg:hidden
    relative 
    w-full ${align == 'left' ? ' lg:w-[93%] ' : ''} xl:w-full
    ${data?.mobileImageChoice === 'tall' ? ` aspect-[630/700] ` : ` aspect-[500/370] `}
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
            ${data?.desktopImageChoice === 'tall' ? ` aspect-[630/700] ` : ` aspect-[500/370] `}
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
        space-y-4 lg:space-y-2 xl:space-y-4 2xl:space-y-6
        ${align === 'left' ? 'order-2' : 'order-2 lg:order-1'} `}
        >
          {data?.descriptions?.map((eachItem, i) => {
            // ⬇️ choose HTML by language with graceful fallback
            // const html =
            //   lang === 'en'
            //     ? (eachItem.descriptionContent ?? '')
            //     : (eachItem.descriptionContentBN ?? eachItem.descriptionContent ?? '')

            return (
              <div
                key={i}
                className="flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
                           space-x-2 lg:space-x-1 xl:space-x-2.5 2xl:space-x-4
                           p-1 md:px-4 md:py-1.5 lg:px-1 lg:py-2 xl:p-2.5 2xl:p-4 
                           rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
              >
                <div className="text-[12px] md:text-[14px] lg:text-[12px] xl:text-[16px] 2xl:text-[15px] text-[#434343]">
                  {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
                  <LocalizedRichText en={eachItem?.description} bn={eachItem?.descriptionBN} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BankSection
