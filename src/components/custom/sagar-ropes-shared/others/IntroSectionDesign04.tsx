import LocalizedHighlighted from '../../shared/LocalizedHighlighted'
import LocalizedRichText from '../../shared/LocalizedRichText'
import LocalizedText from '../../shared/LocalizedText'
import CtaButtons from '../buttons/CtaButtons'

type Props = {
  block: any
  className?: string
  position?: 'left' | 'right' | 'center'
  justify?: string
}

// support alignment and light color
function IntroSectionDesign04({
  block,
  className,
  position = 'left',
  justify = 'justify-between',
}: Props) {
  const hasDesc = !!block?.description && !!block?.description?.root?.direction // or lexicalHasRealText(block.description?.root)
  return (
    <div
      className={` ${className} 
    flex flex-col ${position === 'left' ? 'items-start' : position === 'right' ? 'items-end' : 'items-center'} ${justify}
    gap-[12px] md:gap-[14px] lg:gap-[16px] xl:gap-[18px] 2xl:gap-[20px]`}
    >
      {/* tag */}
      <div
        className="font-manrope text-cyan text-xs xl:text-[14px] 2xl:text-[15px]  leading-[157.143%] tracking-[1.4px]
                    px-2 py-1 bg-white-1 w-fit uppercase"
      >
        <LocalizedText en={block?.tag} bn={block?.tag} />
      </div>

      {/* heading */}
      <div>
        {/* heading 1 */}
        {block?.heading1 && (
          <div
            className={`font-proxima font-bold global-h2 text-dark-1 ${position === 'left' ? 'text-left' : position === 'right' ? 'text-right' : 'text-center'}`}
          >
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
          <div
            className={`font-proxima font-bold global-h2 text-dark-1 ${position === 'left' ? 'text-left' : position === 'right' ? 'text-right' : 'text-center'}`}
          >
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
        <div
          className={`font-manrope text-dark-1 global-p3 ${position === 'left' ? 'text-justify' : position === 'right' ? 'text-justify' : 'text-center'}`}
        >
          <LocalizedRichText en={block.description} bn={block.description} />
        </div>
      )}
      {/* right */}
      {block?.ctaButtons && block?.ctaButtons?.length > 0 && (
        <div>
          <CtaButtons item={block?.ctaButtons} />
        </div>
      )}
    </div>
  )
}

export default IntroSectionDesign04
