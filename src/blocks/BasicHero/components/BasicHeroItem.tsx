import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import heroBg from 'public/assets/images/hero-bg.png'
import BasicHeroAnimatedHeading from './BasicHeroAnimatedHeading'
import BasicHeroSideContent from './BasicHeroSideContent'

type Props = {
  item: BasicHeroBlockType['heroes'][number]
}

const mediaMaskStyle = {
  WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 90%, transparent 100%)',
  maskImage: 'linear-gradient(90deg, transparent 0%, black 90%, transparent 100%)',
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
}

function BasicHeroItem({ item }: Props) {
  const itemAny = item as any

  const hasMobileImageBackground =
    item?.heroMediaType === 'image' && typeof item?.image === 'object' && item?.image?.url

  const animatedHeadingTexts = Array.isArray(itemAny?.animatedHeading?.animatedTexts)
    ? itemAny.animatedHeading.animatedTexts
        .map((animatedItem: any) => String(animatedItem?.text ?? '').trim())
        .filter(Boolean)
    : []

  const shouldShowAnimatedHeading =
    itemAny?.enableAnimatedHeading === true && animatedHeadingTexts.length > 0

  return (
    <div
      className="
        relative h-[100svh] w-full overflow-hidden
        bg-[#0A1128]
        flex flex-col justify-center
        pt-[64px] pb-[34px]
        lg:block lg:h-screen lg:p-0
      "
    >
      {/* default hero background */}
      <Image
        src={heroBg}
        alt="hero bg image"
        fill
        className={`
          z-0 object-cover object-center
          ${hasMobileImageBackground ? 'hidden lg:block' : 'block'}
        `}
        sizes="100vw"
        priority
        quality={100}
        placeholder="blur"
        blurDataURL={heroBg?.blurDataURL}
      />

      {/* mobile + md image background only when hero media type is image */}
      {hasMobileImageBackground && typeof item.image === 'object' && item.image?.url && (
        <div className="absolute inset-0 z-[1] lg:hidden" style={mediaMaskStyle}>
          <Image
            src={item.image.url}
            alt="hero image background"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            quality={100}
            placeholder={item?.imageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={item?.imageBlurDataURL || undefined}
          />
        </div>
      )}

      {/* image / video */}
      <BasicHeroSideContent item={item} />

      {/* main content */}
      <div
        className="
          pointer-events-none relative z-20
          flex w-full items-center justify-center
          lg:absolute lg:inset-0 lg:items-center lg:justify-start
        "
      >
        <div
          className="
            pointer-events-auto w-full
            px-[22px]
            lg:container-padding-l lg:px-0
            space-y-[14px] lg:space-y-6 xl:space-y-8 2xl:space-y-10
          "
        >
          {/* normal heading always visible */}
          <div
            className="xl:mt-12 2xl:mt-0
              font-agency text-white-1 capitalize
              text-center lg:text-start
              leading-[112.5%]
              text-[40px] md:text-[48px] lg:text-[62px] xl:text-[80px] 2xl:text-[92px]
            "
          >
            <div>
              <LocalizedHighlighted
                textEn={item?.heading1}
                textBn={item?.heading1}
                highlightEn={item?.heading1Highlighted}
                highlightBn={item?.heading1Highlighted}
              />
            </div>

            {item?.heading2 && (
              <div>
                <LocalizedHighlighted
                  textEn={item?.heading2}
                  textBn={item?.heading2}
                  highlightEn={item?.heading2Highlighted}
                  highlightBn={item?.heading2Highlighted}
                />
              </div>
            )}

            {item?.heading3 && (
              <div>
                <LocalizedHighlighted
                  textEn={item?.heading3}
                  textBn={item?.heading3}
                  highlightEn={item?.heading3Highlighted}
                  highlightBn={item?.heading3Highlighted}
                />
              </div>
            )}
            {/* typewriter animated heading below normal heading */}
            {shouldShowAnimatedHeading && (
              <BasicHeroAnimatedHeading data={itemAny?.animatedHeading} />
            )}
          </div>

          {item?.description && item?.description?.root?.direction && (
            <div
              className="
                mx-auto max-w-[285px]
                font-grift font-semibold text-white-1 capitalize
                text-center global-p4
                lg:mx-0 lg:max-w-[70%] 2xl:max-w-[60%] lg:text-start lg:global-p3
              "
            >
              <LocalizedRichText en={item?.description} bn={item?.description} />
            </div>
          )}

          {item?.ctaButtons && item?.ctaButtons?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start lg:gap-4">
              <CtaButtons item={item?.ctaButtons} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BasicHeroItem
