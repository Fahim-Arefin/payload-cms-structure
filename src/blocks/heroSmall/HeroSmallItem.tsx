// src/components/custom/shared/hero/HeroItem.tsx
import LocalizedString from '@/components/custom/shared/LocalizedString'
import { HeroBlockType, HeroSmallBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'

type Props = {
  slide: HeroSmallBlockType['heroes'][number]
}

export default function HeroItem({ slide }: Props) {
  const stableAlt = slide?.title || 'Hero image' // SSR-stable alt
  return (
    <>
      {/* Background image */}
      {typeof slide.image === 'object' && slide.image?.url && (
        <Image
          src={slide.image?.url || ''}
          alt={stableAlt}
          fill
          className={`object-cover object-center `}
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
          space-y-4 md:space-y-6 xl:space-y-10 2xl:space-y-20 z-20 lg:w-[80%] top-[55%] `}
      >
        {/* Titles */}
        <div className="text-left hero-content-width tracking-[3%] lg:tracking-[0%] font-semibold text-white hero-h1 uppercase">
          {(slide?.title || slide?.titleBN) && (
            <h1>
              <LocalizedString en={slide?.title} bn={slide?.titleBN} />
            </h1>
          )}
        </div>
      </div>
    </>
  )
}
