import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import { pageHref, resolvePageSlug } from '@/lib/utils'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  item: BasicHeroBlockType['heroes'][number]
}

function BasicHeroItem({ item }: Props) {
  const lang = useSSRLanguage()

  return (
    <div
      // className="relative w-full md:aspect-[16/9] h-screen md:h-auto"
      className="relative w-full h-screen"
    >
      {/* background image */}
      {typeof item.image === 'object' && item.image?.url && (
        <Image
          src={item.image?.url || ''}
          alt={'hero banner image'}
          fill
          className={`object-cover object-center `}
          sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL={item?.imageBlurDataURL || ''}
        />
      )}

      {/* overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,7,37,0.70) 0%, rgba(7,7,37,0.30) 30%, rgba(7,7,37,0.30) 70%, rgba(7,7,37,0.70) 100%)',
        }}
      />

      {/* main content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div
          className="container-padding border-2 border-black w-full
        space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-y-10"
        >
          {/* 3 heading */}
          <div
            className={`font-proxima text-white uppercase font-bold 
             text-[38px] md:text-[48px] lg:text-[72px] xl:text-[96px] 2xl:text-[120px]
              ${lang === 'bn' ? 'leading-[110%]' : `leading-[95.833%]`}
            `}
          >
            <div>
              <LocalizedHighlighted
                textEn={item?.heading1}
                textBn={item?.heading1BN}
                highlightEn={item?.heading1Highlighted}
                highlightBn={item?.heading1HighlightedBN}
              />
            </div>
            <div>
              {(item?.heading2 || item?.heading2BN) && (
                <LocalizedHighlighted
                  textEn={item?.heading2 || item?.heading2BN}
                  textBn={item?.heading2BN || item?.heading2}
                  highlightEn={item?.heading2Highlighted}
                  highlightBn={item?.heading2HighlightedBN}
                />
              )}
            </div>
            <div>
              {(item?.heading3 || item?.heading3BN) && (
                <LocalizedHighlighted
                  textEn={item?.heading3 || item?.heading3BN}
                  textBn={item?.heading3BN || item?.heading3}
                  highlightEn={item?.heading3Highlighted}
                  highlightBn={item?.heading3HighlightedBN}
                />
              )}
            </div>
          </div>

          {/* description */}
          <div
            className={`font-manrope text-white-1 font-light text-opacity-90
          global-p1
          leading-[154.545%]
          `}
          >
            {(item?.description || item?.descriptionBN) && (
              <LocalizedRichText en={item?.description} bn={item?.descriptionBN} />
            )}
          </div>

          {/* cta btns */}
          {item?.ctaButtons &&
            item?.ctaButtons.map((block, index) => {
              // If GlobalButton supports children (you already do in the YT button), render label as child:
              const href = block?.sectionId
                ? `/${resolvePageSlug(block?.buttonLink)}/#${block?.sectionId}`
                : pageHref(block.buttonLink)
              return (
                <div key={`pageLink-${index}`}>
                  {/* <Link href={pageHref(block.buttonLink)}> */}
                  <Link href={href}>
                    <Button01>
                      <LocalizedText en={block.label} bn={block.labelBN} />
                    </Button01>
                  </Link>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default BasicHeroItem
