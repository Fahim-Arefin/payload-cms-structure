import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { CustomTabBlockType } from '@/types/payloadCustomTypes'
import TabSection from './TabSection'

type Props = {
  block: CustomTabBlockType
  params: Record<string, string>
}

function CustomTabBlock({ block }: Props) {
  return (
    <div
      className={`container-padding`}
      style={{
        backgroundColor: block?.backgroundColor || '',
      }}
    >
      {/* Tab heading section */}
      <div
        className={`text-[#434343] text-start
      mb-9 md:mb-[40px] lg:mb-[54px] xl:mb-[74px]`}
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

      {/* tab block */}
      <div className="">
        <TabSection block={block} />
      </div>
    </div>
  )
}

export default CustomTabBlock
