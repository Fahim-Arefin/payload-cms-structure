import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import heroBg from 'public/assets/images/hero-bg.png'
import BasicHeroSideContent from './BasicHeroSideContent'

type Props = {
  item: BasicHeroBlockType['heroes'][number]
}

function BasicHeroItem({ item }: Props) {
  return (
    <div className="relative w-full h-screen">
      {/* background image */}
      <Image
        src={heroBg}
        alt="hero bg image"
        fill
        className="object-cover object-center z-0"
        sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
        priority
        quality={85}
        placeholder="blur"
        blurDataURL={heroBg?.blurDataURL}
      />

      {/* main content */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
        <div
          className="pointer-events-auto container-padding-l w-full 
          space-y-10 lg:space-y-6 xl:space-y-8 2xl:space-y-10"
        >
          {/* 3 heading */}
          <div
            className="font-agency text-white-1 capitalize text-center md:text-start 
            global-h2"
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
          <div className="font-grift font-semibold text-white-1 capitalize text-center md:text-start global-p3">
            {item?.description && item?.description?.root?.direction && (
              <div className="px-8 sm:px-0">
                <LocalizedRichText en={item?.description} bn={item?.description} />
              </div>
            )}
          </div>

          {/* cta btns */}
          {item?.ctaButtons && item?.ctaButtons?.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <CtaButtons item={item?.ctaButtons} />
            </div>
          )}
        </div>
      </div>

      {/* side content */}
      <BasicHeroSideContent item={item} />
    </div>
  )
}

export default BasicHeroItem
