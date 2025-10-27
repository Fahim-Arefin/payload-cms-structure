import { AddonInfoBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import LocalizedHighlighted from '../LocalizedHighlighted'
import LocalizedRichText from '../LocalizedRichText'
import LocalizedText from '../LocalizedText'

type Props = {
  data: AddonInfoBlockType
}

function WCTMSection({ data }: Props) {
  return (
    <div
      className={`container-padding font-avenir space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-y-10`}
      style={{ backgroundColor: data?.backgroundColor || '' }}
    >
      {/* heading */}
      <div className="">
        <div>
          {(data?.title || data?.titleBN) && (
            <h3 className="global-h2 uppercase font-bold text-[#434343]">
              <LocalizedHighlighted
                textEn={data?.title}
                textBn={data?.titleBN}
                highlightEn={data?.highlightedText}
                highlightBn={data?.highlightedTextBN}
              />
            </h3>
          )}
          {(data?.subtitle || data?.subtitleBN) && (
            <h3 className="global-h2 uppercase font-bold text-[#434343]">
              <LocalizedHighlighted
                textEn={data?.subtitle}
                textBn={data?.subtitleBN}
                highlightEn={data?.highlightedSubtitle}
                highlightBn={data?.highlightedSubtitleBN}
              />
            </h3>
          )}
        </div>
        <div className={``}>
          {(data?.description || data?.descriptionBN) && (
            <div
              className={`global-span text-[#3A3A3A] font-[350] 
                       ${(data?.title || data?.titleBN) && (data?.subtitle || data?.subtitleBN) ? `mt-2 xl:mt-4` : ''}`}
            >
              <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
            </div>
          )}
        </div>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 
      gap-4 lg:gap-8 xl:gap-12 2xl:gap-16 
      "
      >
        {/* info */}
        <div
          // gap-3 xl:gap-6
          className={`order-2 lg:${data?.imageOrder === 'left' ? `order-2 ` : `order-1 `} text-[#434343] 
          flex flex-col justify-center gap-3 xl:gap-6`}
        >
          {(data?.infoTitle || data?.infoTitleBN || data?.infoSubtitle || data?.infoSubtitleBN) && (
            <div className="">
              {(data?.infoTitle || data?.infoTitleBN) && (
                <LocalizedHighlighted
                  as="h3"
                  className="global-h3 uppercase font-semibold text-[#434343]"
                  textEn={data?.infoTitle}
                  textBn={data?.infoTitleBN}
                  highlightEn={data?.infoTitleHighlighted}
                  highlightBn={data?.infoTitleHighlightedBN}
                />
              )}
              {(data?.infoSubtitle || data?.infoSubtitleBN) && (
                <LocalizedHighlighted
                  as="h3"
                  className="global-h3 uppercase font-semibold text-[#434343]"
                  textEn={data?.infoSubtitle}
                  textBn={data?.infoSubtitleBN}
                  highlightEn={data?.infoSubtitleHighlighted}
                  highlightBn={data?.infoSubtitleHighlightedBN}
                />
              )}
            </div>
          )}

          {(data?.infoDescription || data?.infoDescriptionBN) && (
            <div className="text-justify global-span font-extralight ">
              <LocalizedRichText en={data?.infoDescription} bn={data?.infoDescriptionBN} />
            </div>
          )}
          {data?.keyFeatures && data?.keyFeatures?.length > 0 && (
            <div className="space-y-3 ">
              {data?.keyFeatures?.map((item, i) => (
                <div className="flex items-center space-x-4" key={i}>
                  <div
                    className="relative flex items-center justify-center
                    w-[20px] lg:w-[25px] xl:w-[40px] aspect-[1/1]"
                  >
                    {typeof item?.icon === 'object' && item?.icon?.url && (
                      <Image
                        fill
                        src={item?.icon?.url}
                        alt={item?.name}
                        placeholder="blur"
                        blurDataURL={item?.iconBlurDataURL || ''}
                      />
                    )}
                  </div>
                  <div className="uppercase text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-semibold text-[#434342]">
                    <LocalizedText en={item?.name} bn={item?.nameBN} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* image */}
        <div
          // h-auto lg:h-[230px] xl:h-[300px] 2xl:h-[330px]
          className={`order-1 lg:${data?.imageOrder === 'left' ? `order-1 ` : `order-2 `} relative my-auto 
          rounded-md lg:rounded-lg xl:rounded-xl 
          ${data?.imageVariant === 'wide' ? 'w-full aspect-[16/9]' : 'w-[70%] mx-auto aspect-[1/1]'} `}
        >
          {data?.imageVariant &&
          data?.imageVariant === 'square' &&
          typeof data?.imageSquare === 'object' &&
          data?.imageSquare?.url ? (
            <Image
              fill
              src={data?.imageSquare?.url}
              alt={`side Image`}
              className="object-cover object-center rounded-md lg:rounded-lg xl:rounded-xl"
              sizes="(max-width: 639px) 350px, 50vw"
              placeholder="blur"
              blurDataURL={data?.imageSquareBlurDataURL || ''}
              quality={80}
            />
          ) : data?.imageVariant &&
            data?.imageVariant === 'wide' &&
            typeof data?.imageWide === 'object' &&
            data?.imageWide?.url ? (
            <Image
              fill
              src={data?.imageWide?.url}
              alt={`side Image`}
              className="object-cover object-center rounded-md lg:rounded-lg xl:rounded-xl"
              sizes="(max-width: 639px) 350px, 50vw"
              placeholder="blur"
              blurDataURL={data?.imageWideBlurDataURL || ''}
              quality={80}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default WCTMSection
