import LocalizedHighlighted from '../../shared/LocalizedHighlighted'
import LocalizedRichText from '../../shared/LocalizedRichText'
import LocalizedText from '../../shared/LocalizedText'
import CtaButtons from '../buttons/CtaButtons'

type Props = {
  block: any
  className?: string
}
// support tag variation
function IntroSectionDesign02({ block, className }: Props) {
  const hasDesc = !!block?.description && !!block?.description?.root?.direction // or lexicalHasRealText(block.description?.root)
  return (
    <div className={`space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-y-10 ${className} `}>
      {/* heading */}
      <div>
        {/* heading 1 */}
        {block?.heading1 && (
          <div className="font-grift font-bold global-h2 text-dark-1">
            <LocalizedHighlighted
              textBn={block?.heading1}
              textEn={block?.heading1}
              highlightEn={block?.heading1Highlighted}
              highlightBn={block?.heading1Highlighted}
              highlightClassName={`${block?.heading1HighlightColor === 'primary' ? 'text-cyan' : 'text-white-3'} `}
            />
          </div>
        )}

        {/* heading 2 */}
        {block?.heading2 && (
          <div className="font-grift font-bold global-h2 text-dark-1">
            <LocalizedHighlighted
              textBn={block?.heading2}
              textEn={block?.heading2}
              highlightEn={block?.heading2Highlighted}
              highlightBn={block?.heading2Highlighted}
              highlightClassName={`${block?.heading2HighlightColor === 'primary' ? 'text-cyan' : 'text-white-3'} `}
            />
          </div>
        )}
      </div>

      {/* Description section */}
      {hasDesc && (
        <div className={``}>
          <div className={`font-manrope text-dark-2 global-p3 text-justify`}>
            <LocalizedRichText en={block.description} bn={block.description} />
          </div>
        </div>
      )}
      {/* right */}
      {block?.ctaButtons && block?.ctaButtons?.length > 0 && (
        <div>
          <CtaButtons item={block?.ctaButtons} />
        </div>
      )}

      {/* tag */}
      {block?.tag && (
        <div className="">
          <div className="border-t-2 border-dashed border-[#D0D0F6] ">
            <div className="invisible">invisible</div>
          </div>
          <div
            className="font-manrope text-white text-xs xl:text-[14px] 2xl:text-[15px] leading-[157.143%] tracking-[1.4px]
              px-2 py-1 bg-cyan w-fit uppercase
              mb-2 lg:mb-3 xl:mb-4"
          >
            <LocalizedText en={block?.tag} bn={block?.tag} />
          </div>
        </div>
      )}
    </div>
  )
}

export default IntroSectionDesign02
