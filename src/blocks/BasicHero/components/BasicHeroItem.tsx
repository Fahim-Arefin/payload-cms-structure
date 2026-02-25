import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { pageHref, resolvePageSlug } from '@/lib/utils'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import explore from '/public/assets/icons/explore.png'
import union from '/public/assets/icons/union.png'

type Props = {
  item: BasicHeroBlockType['heroes'][number]
}

function BasicHeroItem({ item }: Props) {
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
          className={`object-cover object-center`}
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
          // border-2 border-black
          className="container-padding w-full
        space-y-10 lg:space-y-6 xl:space-y-8 2xl:space-y-10"
        >
          {/* 3 heading */}
          <div
            className={`font-proxima text-white uppercase font-bold 
             text-[38px] md:text-[48px] lg:text-[72px] xl:text-[96px] 2xl:text-[120px]
             text-center md:text-start leading-[95.833%]
            `}
          >
            <div>
              <LocalizedHighlighted
                textEn={item?.heading1}
                textBn={item?.heading1}
                highlightEn={item?.heading1Highlighted}
                highlightBn={item?.heading1Highlighted}
              />
            </div>
            <div>
              {item?.heading2 && (
                <LocalizedHighlighted
                  textEn={item?.heading2}
                  textBn={item?.heading2}
                  highlightEn={item?.heading2Highlighted}
                  highlightBn={item?.heading2Highlighted}
                />
              )}
            </div>
            <div>
              {item?.heading3 && (
                <LocalizedHighlighted
                  textEn={item?.heading3}
                  textBn={item?.heading3}
                  highlightEn={item?.heading3Highlighted}
                  highlightBn={item?.heading3Highlighted}
                />
              )}
            </div>
          </div>

          {/* description */}
          <div
            className={`font-manrope text-white-1 font-light text-opacity-90
          global-p1 text-center md:text-start
          leading-[154.545%]
          `}
          >
            {item?.description && (
              <LocalizedRichText en={item?.description} bn={item?.description} />
            )}
          </div>

          {/* cta btns */}
          {item?.ctaButtons && item?.ctaButtons?.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {item?.ctaButtons.map((block, index) => {
                // If GlobalButton supports children (you already do in the YT button), render label as child:
                const href = block?.sectionId
                  ? `/${resolvePageSlug(block?.buttonLink)}/#${block?.sectionId}`
                  : pageHref(block.buttonLink)
                return (
                  <div key={`pageLink-${index}`}>
                    {/* <Link href={pageHref(block.buttonLink)}> */}
                    <Link href={href}>
                      {block?.style === 'btn01' && (
                        <Button01>
                          <LocalizedText en={block.label} bn={block.label} />
                        </Button01>
                      )}
                    </Link>
                  </div>
                )
              })}
            </div>
          )}

          {/* explore more bedge */}
          {item?.exploreMoreBadge && (
            <div
              className="absolute z-30 
            bottom-16 md:bottom-[70px] xl:bottom-32  
             right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 lg:right-12 xl:right-32 2xl:right-52 "
            >
              <div className="relative h-[95px] w-[95px] rounded-full bg-white-1/10 flex justify-center items-center">
                <Image src={union} alt="Explore More Badge" className="w-[24px] h-[30px]" />
                <Image
                  src={explore}
                  alt="Explore More Badge"
                  className="absolute w-[85%] h-[85%]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BasicHeroItem
