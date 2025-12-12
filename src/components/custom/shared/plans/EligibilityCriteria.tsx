import { PlanInfoDesign07BlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'

import LocalizedHighlighted from '../LocalizedHighlighted'
import LocalizedRichText from '../LocalizedRichText'
import { EligibilityCommonCard } from '@/blocks/customTab/eligibilityContent/EligibilityCommonCard'

type Props = {
  data: PlanInfoDesign07BlockType
  image?: PlanInfoDesign07BlockType['imageOrder']
}

function EligibilityCriteria({ data, image }: Props) {
  const isAnySubtile = data?.eligibilityData?.some(
    (item) => item?.iconSubtitle || item?.iconSubtitleBN,
  )
  return (
    <div
      className="container-padding space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12"
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
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
        <div
          className={`order-1 lg:${image === 'left' ? 'order-1' : 'order-2'} relative flex items-center justify-center`}
        >
          {/* main iamge */}
          {typeof data?.image === 'object' && data?.image?.url && (
            <div className=" relative w-full aspect-[540/420]">
              <Image
                fill
                src={data?.image?.url}
                alt="Image"
                className="object-cover object-center w-full h-full 
                        rounded-md lg:rounded-lg xl:rounded-xl 2xl:rounded-2xl"
                sizes="50vw"
                quality={80}
                placeholder="blur"
                blurDataURL={data?.imageBlurDataURL || ''}
              />
            </div>
          )}
        </div>
        <div
          className={`order-2 lg:${image === 'left' ? 'order-2 ' : 'order-1 '} h-fit my-auto space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-8`}
        >
          <div className={`${image === 'left' ? 'lg:flex lg:justify-center' : ''}`}>
            {data?.eligibilityData?.map((item, index) => (
              <EligibilityCommonCard key={index} data={item} isAnySubtile={isAnySubtile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EligibilityCriteria
