import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import ResourceButton from '@/components/custom/shared/plans/ResourceButton'
import { CustomTabBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import TabSection from './TabSection'

type Props = {
  block: CustomTabBlockType
  params: Record<string, string>
}

function CustomTabBlock({ block }: Props) {
  // const selectedBlock = block?.tabs?.map((t) => t.content?.[0])
  return (
    <div
      className={`${block?.addPadding && 'container-padding'}`}
      style={{
        backgroundColor: block?.backgroundColor || '',
      }}
    >
      <div className="space-y-4 md:space-y-10 lg:space-y-12 ">
        {/* Tab heading section */}
        <div
          className={`${block?.halfWidth && block?.imageOrder === 'left' ? 'lg:flex lg:justify-end' : 'lg:flex lg:justify-start'} text-[#434343] text-start 
          ${!block?.addPadding && 'container-padding-x pt-6 md:pt-8 lg:pt-10 xl:pt-12 2xl:pt-16'}`}
        >
          <div
            className={`${block?.halfWidth && block?.imageOrder === 'left' ? 'lg:w-1/2 lg:pl-3 xl:pl-5 2xl:pl-8' : 'lg:w-full'}`}
          >
            <div className="uppercase global-h2 font-semibold">
              <div>
                <LocalizedHighlighted
                  textEn={block?.title}
                  highlightEn={block?.highlightedText}
                  textBn={block?.titleBN}
                  highlightBn={block?.highlightedTextBN}
                  highlightClassName="text-[#ED7125]"
                />
              </div>
              {(block?.subtitle || block?.subtitleBN) && (
                <div>
                  <LocalizedHighlighted
                    textEn={block?.subtitle}
                    highlightEn={block?.highlightedSubtitle}
                    textBn={block?.subtitleBN}
                    highlightBn={block?.highlightedSubtitleBN}
                    highlightClassName="text-[#ED7125]"
                  />
                </div>
              )}
            </div>
            {(block?.description || block?.descriptionBN) && (
              <div
                className={`global-span text-[#3A3A3A] font-[350] 
            ${(block?.title || block?.titleBN) && (block?.subtitle || block?.subtitleBN) ? `mt-2 md:mt-4 xl:mt-6 2xl:mt-8` : ''}`}
              >
                <LocalizedRichText en={block?.description} bn={block?.descriptionBN} />
              </div>
            )}
          </div>
        </div>

        {/* Tab content with image */}
        <div
          className={`grid ${block?.halfWidth ? 'grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-9 2xl:gap-16' : 'grid-cols-1'}`}
        >
          {/* image section */}
          {block?.halfWidth && (
            <div
              className={`order-1 ${block?.imageOrder === 'left' ? `lg:order-1` : `lg:order-2`} flex 
              flex-col items-center ${block?.desktopImageChoice === 'tall' ? 'justify-end' : 'justify-center'} `}
            >
              {/* mobile */}
              <div
                className={`lg:hidden relative w-full
            ${block?.mobileImageChoice === 'tall' ? ` aspect-[630/650] ` : ` aspect-[500/370] `}
            rounded-md lg:rounded-lg  xl:rounded-xl overflow-hidden`}
                role="img"
                aria-label="Background image"
              >
                {block?.mobileImageChoice === 'wide'
                  ? typeof block?.imageWide === 'object' &&
                    block?.imageWide?.url && (
                      <Image
                        fill
                        src={block?.imageWide?.url}
                        alt={`Wide image`}
                        className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
                        quality={80}
                        placeholder="blur"
                        blurDataURL={block?.imageWideBlurDataURL || ''}
                      />
                    )
                  : typeof block?.imageTall === 'object' &&
                    block?.imageTall?.url && (
                      <Image
                        fill
                        src={block?.imageTall?.url}
                        alt={`tall image`}
                        className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
                        quality={80}
                        placeholder="blur"
                        blurDataURL={block?.imageTallBlurDataURL || ''}
                      />
                    )}
              </div>

              {/* web */}
              <div
                className={`hidden lg:block relative w-full 
            ${block?.desktopImageChoice === 'tall' ? ` aspect-[630/650] ` : ` aspect-[500/370] `}
            rounded-md lg:rounded-lg  xl:rounded-xl
            overflow-hidden
            
            `}
                role="img"
                aria-label="Background image"
              >
                {block?.desktopImageChoice === 'tall'
                  ? typeof block?.imageTall === 'object' &&
                    block?.imageTall?.url && (
                      <Image
                        fill
                        src={block?.imageTall?.url}
                        alt={`Tall image`}
                        className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
                        quality={80}
                        placeholder="blur"
                        blurDataURL={block?.imageTallBlurDataURL || ''}
                      />
                    )
                  : typeof block?.imageWide === 'object' &&
                    block?.imageWide?.url && (
                      <Image
                        fill
                        src={block?.imageWide?.url}
                        alt={`wide image`}
                        className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
                        quality={80}
                        placeholder="blur"
                        blurDataURL={block?.imageWideBlurDataURL || ''}
                      />
                    )}
              </div>
            </div>
          )}
          {/* tab block */}
          <TabSection
            block={block}
            className={`
               order-2 ${block?.imageOrder === 'left' ? `lg:order-2` : `lg:order-1`}`}
          />
        </div>

        {/* resource btn */}
        {block?.resourceButtons && block?.resourceButtons?.length > 0 && (
          <>
            <ResourceButton data={block?.resourceButtons} />
          </>
        )}
      </div>
    </div>
  )
}

export default CustomTabBlock
