// import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
// import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import heroBg from 'public/assets/images/hero-bg.png'
// import BasicHeroSideContent from './BasicHeroSideContent'

// type Props = {
//   item: BasicHeroBlockType['heroes'][number]
// }

// function BasicHeroItem({ item }: Props) {
//   return (
//     <div className="relative w-full h-screen">
//       {/* background image */}
//       <Image
//         src={heroBg}
//         alt="hero bg image"
//         fill
//         className="object-cover object-center z-0"
//         sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
//         priority
//         quality={85}
//         placeholder="blur"
//         blurDataURL={heroBg?.blurDataURL}
//       />

//       {/* main content */}
//       <div className="pointer-events-none absolute inset-0 z-20 flex items-center ">
//         <div
//           className="pointer-events-auto container-padding-l w-full
//           space-y-10 lg:space-y-6 xl:space-y-8 2xl:space-y-10"
//         >
//           {/* 3 heading */}
//           <div
//             className="font-agency text-white-1 capitalize text-center md:text-start
//             global-h2"
//           >
//             <div>
//               <LocalizedHighlighted
//                 textEn={item?.heading1}
//                 textBn={item?.heading1}
//                 highlightEn={item?.heading1Highlighted}
//                 highlightBn={item?.heading1Highlighted}
//               />
//             </div>

//             <div>
//               {item?.heading2 && (
//                 <LocalizedHighlighted
//                   textEn={item?.heading2}
//                   textBn={item?.heading2}
//                   highlightEn={item?.heading2Highlighted}
//                   highlightBn={item?.heading2Highlighted}
//                 />
//               )}
//             </div>

//             <div>
//               {item?.heading3 && (
//                 <LocalizedHighlighted
//                   textEn={item?.heading3}
//                   textBn={item?.heading3}
//                   highlightEn={item?.heading3Highlighted}
//                   highlightBn={item?.heading3Highlighted}
//                 />
//               )}
//             </div>
//           </div>

//           {/* description */}
//           <div className="font-grift font-semibold text-white-1 capitalize text-center md:text-start global-p3">
//             {item?.description && item?.description?.root?.direction && (
//               <div className="px-8 sm:px-0">
//                 <LocalizedRichText en={item?.description} bn={item?.description} />
//               </div>
//             )}
//           </div>

//           {/* cta btns */}
//           {item?.ctaButtons && item?.ctaButtons?.length > 0 && (
//             <div className="flex flex-wrap justify-center md:justify-start gap-4">
//               <CtaButtons item={item?.ctaButtons} />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* side content */}
//       <BasicHeroSideContent item={item} />
//     </div>
//   )
// }

// export default BasicHeroItem

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
// import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import heroBg from 'public/assets/images/hero-bg.png'
// import BasicHeroSideContent from './BasicHeroSideContent'

// type Props = {
//   item: BasicHeroBlockType['heroes'][number]
// }

// function BasicHeroItem({ item }: Props) {
//   return (
//     <div className="relative h-[100svh] w-full overflow-hidden md:h-screen">
//       {/* background image */}
//       <Image
//         src={heroBg}
//         alt="hero bg image"
//         fill
//         className="z-0 object-cover object-center"
//         sizes="100vw"
//         priority
//         quality={100}
//         placeholder="blur"
//         blurDataURL={heroBg?.blurDataURL}
//       />

//       {/* image / video */}
//       <BasicHeroSideContent item={item} />

//       {/* main content */}
//       <div
//         className="
//           pointer-events-none absolute inset-0 z-20
//           flex items-end md:items-center
//         "
//       >
//         <div
//           className="
//             pointer-events-auto w-full
//             px-[22px] pb-[44px]
//             md:container-padding-l md:pb-0
//             space-y-[12px]
//             md:space-y-6 xl:space-y-8 2xl:space-y-10
//           "
//         >
//           {/* 3 heading */}
//           <div
//             className="
//               font-agency text-white-1 capitalize
//               text-center md:text-start
//               text-[36px] leading-[0.95]
//               sm:text-[42px]
//               md:global-h2
//             "
//           >
//             <div>
//               <LocalizedHighlighted
//                 textEn={item?.heading1}
//                 textBn={item?.heading1}
//                 highlightEn={item?.heading1Highlighted}
//                 highlightBn={item?.heading1Highlighted}
//               />
//             </div>

//             {item?.heading2 && (
//               <div>
//                 <LocalizedHighlighted
//                   textEn={item?.heading2}
//                   textBn={item?.heading2}
//                   highlightEn={item?.heading2Highlighted}
//                   highlightBn={item?.heading2Highlighted}
//                 />
//               </div>
//             )}

//             {item?.heading3 && (
//               <div>
//                 <LocalizedHighlighted
//                   textEn={item?.heading3}
//                   textBn={item?.heading3}
//                   highlightEn={item?.heading3Highlighted}
//                   highlightBn={item?.heading3Highlighted}
//                 />
//               </div>
//             )}
//           </div>

//           {/* description */}
//           {item?.description && item?.description?.root?.direction && (
//             <div
//               className="
//                 mx-auto max-w-[285px]
//                 font-grift font-semibold text-white-1 capitalize
//                 text-center global-p5
//                 md:mx-0 md:max-w-[520px] md:text-start md:global-p3
//               "
//             >
//               <LocalizedRichText en={item?.description} bn={item?.description} />
//             </div>
//           )}

//           {/* cta btns */}
//           {item?.ctaButtons && item?.ctaButtons?.length > 0 && (
//             <div className="flex flex-wrap justify-center gap-3 md:justify-start md:gap-4">
//               <CtaButtons item={item?.ctaButtons} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BasicHeroItem

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
// import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import heroBg from 'public/assets/images/hero-bg.png'
// import BasicHeroSideContent from './BasicHeroSideContent'

// type Props = {
//   item: BasicHeroBlockType['heroes'][number]
// }

// function BasicHeroItem({ item }: Props) {
//   return (
//     <div
//       className="
//         relative h-[100svh] w-full overflow-hidden md:h-screen
//         flex flex-col justify-center
//         pt-[64px] pb-[34px]
//         md:block md:p-0
//       "
//     >
//       {/* background image */}
//       <Image
//         src={heroBg}
//         alt="hero bg image"
//         fill
//         className="z-0 object-cover object-center"
//         sizes="100vw"
//         priority
//         quality={100}
//         placeholder="blur"
//         blurDataURL={heroBg?.blurDataURL}
//       />

//       {/* image / video */}
//       <BasicHeroSideContent item={item} />

//       {/* main content */}
//       <div
//         className="
//           pointer-events-none relative z-20
//           flex w-full items-center justify-center
//           md:absolute md:inset-0 md:items-center md:justify-start
//         "
//       >
//         <div
//           className="
//             pointer-events-auto w-full
//             px-[22px]
//             md:container-padding-l md:px-0
//             space-y-[12px]
//             md:space-y-6 xl:space-y-8 2xl:space-y-10
//           "
//         >
//           {/* 3 heading */}
//           <div
//             className="
//               font-agency text-white-1 capitalize
//               text-center md:text-start
//               leading-[1.2] lg:leading-[0.95]
//               global-h2

//             "
//           >
//             <div>
//               <LocalizedHighlighted
//                 textEn={item?.heading1}
//                 textBn={item?.heading1}
//                 highlightEn={item?.heading1Highlighted}
//                 highlightBn={item?.heading1Highlighted}
//               />
//             </div>

//             {item?.heading2 && (
//               <div>
//                 <LocalizedHighlighted
//                   textEn={item?.heading2}
//                   textBn={item?.heading2}
//                   highlightEn={item?.heading2Highlighted}
//                   highlightBn={item?.heading2Highlighted}
//                 />
//               </div>
//             )}

//             {item?.heading3 && (
//               <div>
//                 <LocalizedHighlighted
//                   textEn={item?.heading3}
//                   textBn={item?.heading3}
//                   highlightEn={item?.heading3Highlighted}
//                   highlightBn={item?.heading3Highlighted}
//                 />
//               </div>
//             )}
//           </div>

//           {/* description */}
//           {item?.description && item?.description?.root?.direction && (
//             <div
//               className="
//                 mx-auto max-w-[285px]
//                 font-grift font-semibold text-white-1 capitalize
//                 text-center global-p4 md:global-p5
//                 md:mx-0 md:max-w-[520px] md:text-start md:global-p3
//               "
//             >
//               <LocalizedRichText en={item?.description} bn={item?.description} />
//             </div>
//           )}

//           {/* cta btns */}
//           {item?.ctaButtons && item?.ctaButtons?.length > 0 && (
//             <div className="flex flex-wrap justify-center gap-3 md:justify-start md:gap-4">
//               <CtaButtons item={item?.ctaButtons} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BasicHeroItem

// import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
// import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import heroBg from 'public/assets/images/hero-bg.png'
// import BasicHeroSideContent from './BasicHeroSideContent'

// type Props = {
//   item: BasicHeroBlockType['heroes'][number]
// }

// function BasicHeroItem({ item }: Props) {
//   return (
//     <div
//       className="
//         relative h-[100svh] w-full overflow-hidden
//         flex flex-col justify-center
//         pt-[64px] pb-[34px]
//         lg:block lg:h-screen lg:p-0
//       "
//     >
//       {/* background image */}
//       <Image
//         src={heroBg}
//         alt="hero bg image"
//         fill
//         className="z-0 object-cover object-center"
//         sizes="100vw"
//         priority
//         quality={100}
//         placeholder="blur"
//         blurDataURL={heroBg?.blurDataURL}
//       />

//       {/* image / video */}
//       <BasicHeroSideContent item={item} />

//       {/* main content */}
//       <div
//         className="
//           pointer-events-none relative z-20
//           flex w-full items-center justify-center
//           lg:absolute lg:inset-0 lg:items-center lg:justify-start
//         "
//       >
//         <div
//           className="
//             pointer-events-auto w-full
//             px-[22px]

//             lg:container-padding-l lg:px-0
//             space-y-[14px] lg:space-y-6 xl:space-y-8 2xl:space-y-10
//           "
//         >
//           {/* 3 heading */}
//           <div
//             className="
//               font-agency text-white-1 capitalize
//               text-center lg:text-start
//               leading-[1.2] lg:leading-[0.95]
//               text-[40px] md:global-h2
//             "
//           >
//             <div>
//               <LocalizedHighlighted
//                 textEn={item?.heading1}
//                 textBn={item?.heading1}
//                 highlightEn={item?.heading1Highlighted}
//                 highlightBn={item?.heading1Highlighted}
//               />
//             </div>

//             {item?.heading2 && (
//               <div>
//                 <LocalizedHighlighted
//                   textEn={item?.heading2}
//                   textBn={item?.heading2}
//                   highlightEn={item?.heading2Highlighted}
//                   highlightBn={item?.heading2Highlighted}
//                 />
//               </div>
//             )}

//             {item?.heading3 && (
//               <div>
//                 <LocalizedHighlighted
//                   textEn={item?.heading3}
//                   textBn={item?.heading3}
//                   highlightEn={item?.heading3Highlighted}
//                   highlightBn={item?.heading3Highlighted}
//                 />
//               </div>
//             )}
//           </div>

//           {/* description */}
//           {item?.description && item?.description?.root?.direction && (
//             <div
//               className="
//                 mx-auto max-w-[285px]
//                 font-grift font-semibold text-white-1 capitalize
//                 text-center global-p4
//                 lg:mx-0 lg:max-w-[520px] lg:text-start lg:global-p3
//               "
//             >
//               <LocalizedRichText en={item?.description} bn={item?.description} />
//             </div>
//           )}

//           {/* cta btns */}
//           {item?.ctaButtons && item?.ctaButtons?.length > 0 && (
//             <div className="flex flex-wrap justify-center gap-3 lg:justify-start lg:gap-4">
//               <CtaButtons item={item?.ctaButtons} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BasicHeroItem

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
  const hasMobileImageBackground =
    item?.heroMediaType === 'image' && typeof item?.image === 'object' && item?.image?.url

  return (
    <div
      className="
        relative h-[100svh] w-full overflow-hidden
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
        className="z-0 object-cover object-center"
        sizes="100vw"
        priority
        quality={100}
        placeholder="blur"
        blurDataURL={heroBg?.blurDataURL}
      />

      {/* mobile + md image background only when hero media type is image */}
      {hasMobileImageBackground && typeof item.image === 'object' && item.image?.url && (
        <>
          <div className="absolute inset-0 z-[1] lg:hidden">
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

          {/* readability overlay for mobile/md image background */}
          <div
            className="pointer-events-none absolute inset-0 z-[2] lg:hidden"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  rgba(10, 17, 40, 0.45) 0%,
                  rgba(10, 17, 40, 0.34) 40%,
                  rgba(10, 17, 40, 0.62) 100%
                ),
                linear-gradient(
                  90deg,
                  rgba(0, 108, 103, 0.34) 0%,
                  rgba(0, 108, 103, 0.10) 38%,
                  rgba(27, 36, 51, 0.38) 100%
                )
              `,
            }}
          />
        </>
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
          {/* 3 heading */}
          <div
            className="
              font-agency text-white-1 capitalize
              text-center lg:text-start
              leading-[1.2] lg:leading-[0.95]
              text-[40px] md:global-h2
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
          </div>

          {/* description */}
          {item?.description && item?.description?.root?.direction && (
            <div
              className="
                mx-auto max-w-[285px]
                font-grift font-semibold text-white-1 capitalize
                text-center global-p4
                lg:mx-0 lg:max-w-[520px] lg:text-start lg:global-p3
              "
            >
              <LocalizedRichText en={item?.description} bn={item?.description} />
            </div>
          )}

          {/* cta btns */}
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
