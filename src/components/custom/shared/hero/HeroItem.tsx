// src/components/custom/shared/hero/HeroItem.tsx
import { HeroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import LocalizedRichText from '../LocalizedRichText'
import LocalizedString from '../LocalizedString'

type HeroBlock = HeroBlockType
type HeroSlide = NonNullable<HeroBlock['heroes']>[number]

type Props = {
  slide: HeroSlide
  top?: string
  position?: string
}

export default function HeroItem({ slide, top, position }: Props) {
  const stableAlt = slide?.title || 'Hero image' // SSR-stable alt

  return (
    <>
      {/* Background image */}
      {typeof slide.image === 'object' && slide.image?.url && (
        <Image
          src={slide.image?.url || ''}
          alt={stableAlt}
          fill
          className={`object-cover object-center ${position || ''}`}
          sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL={slide?.imageBlurDataURL || ''}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/35" />

      {/* Content */}
      <div
        // lg:w-[920px] xl:w-[1205px] 2xl:w-[1405px]
        className={`absolute inset-x-0 lg:left-[120px] xl:left-[200px] 2xl:left-[270px] lg:right-auto
          space-y-4 md:space-y-6 xl:space-y-10 2xl:space-y-20 z-20 lg:w-[80%]
          ${top ? top : ' top-[100px] md:top-[150px] lg:top-[35%] '}`}
      >
        {/* Titles */}
        <div className="text-left hero-content-width tracking-[3%] lg:tracking-[0%] font-semibold text-white hero-h1 uppercase">
          {(slide?.title || slide?.titleBN) && (
            <h1>
              <LocalizedString en={slide?.title} bn={slide?.titleBN} />
            </h1>
          )}
          {(slide?.subtitle || slide?.subtitleBN) && (
            <h1 className="lg:mt-2">
              <LocalizedString en={slide?.subtitle} bn={slide?.subtitleBN} />
            </h1>
          )}
        </div>

        {/* Description */}
        {(slide?.description || slide?.descriptionBN) && (
          <>
            {/* mobile */}
            <div className="block lg:hidden hero-description-bg-sm font-[350] hero-content-width p-2 md:p-3 lg:p-4 hero-h5">
              <div className="text-white">
                <LocalizedRichText
                  en={slide?.description as any}
                  bn={slide?.descriptionBN as any}
                />
              </div>
            </div>

            {/* lg+ */}
            <div className="hidden lg:block hero-description-bg-lg font-[350] w-fit lg:mr-12 xl:mr-0 p-2 md:p-3 lg:p-4 hero-h5 ">
              <div className="text-white">
                <LocalizedRichText
                  en={slide?.description as any}
                  bn={slide?.descriptionBN as any}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
