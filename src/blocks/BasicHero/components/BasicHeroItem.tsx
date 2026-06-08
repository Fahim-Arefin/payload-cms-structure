// import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
// import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
// import heroBg from 'public/assets/images/hero-bg.png'

// import Image from 'next/image'

// type Props = {
//   item: BasicHeroBlockType['heroes'][number]
// }

// function BasicHeroItem({ item }: Props) {
//   return (
//     <div
//       // className="relative w-full md:aspect-[16/9] h-screen md:h-auto"
//       className="relative w-full h-screen "
//     >
//       {/* background image */}
//       {/* {typeof item.image === 'object' && item.image?.url && ( */}
//       <Image
//         src={heroBg}
//         alt={'hero bg image'}
//         fill
//         className={`object-cover object-center z-0`}
//         sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
//         priority
//         quality={85}
//         placeholder="blur"
//         blurDataURL={heroBg?.blurDataURL}
//       />
//       {/* )} */}
//       {/* main content */}
//       <div className="absolute inset-0 z-20 flex items-center ">
//         <div
//           // border-2 border-black
//           className="container-padding-l w-full
//         space-y-10 lg:space-y-6 xl:space-y-8 2xl:space-y-10"
//         >
//           {/* 3 heading */}
//           <div
//             className={`font-agency text-white-1 capitalize text-center md:text-start
//              global-h2
//             `}
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
//           <div
//             className={`font-grift font-semibold text-white-1 capitalize text-center md:text-start global-p3
//           `}
//           >
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
//       {/* bg-indigo-200 */}
//       <div className="hidden md:block z-10 absolute  right-0 top-[100px] h-[calc(100vh-100px)] w-[50%] lg:w-[60%] 2xl:w-[65%]">
//         <div className="w-full h-full relative">
//           {/* image */}
//           {/* bg-red-200 */}
//           <div className=" w-full h-full">
//             {typeof item.image === 'object' && item.image?.url && (
//               <Image
//                 src={item?.image?.url}
//                 alt={'hero image'}
//                 fill
//                 className={` object-fill object-top xl:object-contain xl:origin-center z-0`}
//                 sizes="100vw"
//                 priority
//                 quality={100}
//                 placeholder="blur"
//                 blurDataURL={item?.imageBlurDataURL || ''}
//               />
//             )}
//           </div>
//           {/* stack show */}
//           {/* bg-red-500 */}
//           <div className=" absolute inset-x-0 bottom-24 h-auto flex justify-end container-padding-r">
//             {/* bg-indigo-400  */}
//             <div
//               className="w-full lg:w-[90%] xl:w-[70%] 2xl:w-[60%] flex flex-wrap
//             gap-3 xl:gap-4 2xl:gap-6"
//             >
//               {item?.webSolutionsWeProvide?.map((sol, i) => (
//                 <div
//                   key={i}
//                   className="font-grift global-p5 text-primary-2
//                 px-[24px]
//                 py-[8px]
//                 rounded-[99px]
//                 border border-primary-2
//                 "
//                 >
//                   {sol?.solution}
//                 </div>
//               ))}
//             </div>
//           </div>
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
// import heroBg from 'public/assets/images/hero-bg.png'

// import Image from 'next/image'

// type Props = {
//   item: BasicHeroBlockType['heroes'][number]
// }

// function getPublicVideoAssetPath(fileName?: string | null) {
//   const cleanFileName = fileName?.trim()

//   if (!cleanFileName) return ''

//   if (cleanFileName.startsWith('http://') || cleanFileName.startsWith('https://')) {
//     return cleanFileName
//   }

//   if (cleanFileName.startsWith('/')) {
//     return cleanFileName
//   }

//   if (cleanFileName.startsWith('assets/videos/')) {
//     return `/${cleanFileName}`
//   }

//   return `/assets/videos/${cleanFileName}`
// }

// function BasicHeroItem({ item }: Props) {
//   const heroMediaType = item?.heroMediaType || 'image'
//   const videoAssetSrc = getPublicVideoAssetPath(item?.videoAssetName)

//   return (
//     <div
//       // className="relative w-full md:aspect-[16/9] h-screen md:h-auto"
//       className="relative w-full h-screen "
//     >
//       {/* background image */}
//       {/* {typeof item.image === 'object' && item.image?.url && ( */}
//       <Image
//         src={heroBg}
//         alt={'hero bg image'}
//         fill
//         className={`object-cover object-center z-0`}
//         sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
//         priority
//         quality={85}
//         placeholder="blur"
//         blurDataURL={heroBg?.blurDataURL}
//       />
//       {/* )} */}

//       {/* main content */}
//       <div className="absolute inset-0 z-20 flex items-center ">
//         <div
//           // border-2 border-black
//           className="container-padding-l w-full
//         space-y-10 lg:space-y-6 xl:space-y-8 2xl:space-y-10"
//         >
//           {/* 3 heading */}
//           <div
//             className={`font-agency text-white-1 capitalize text-center md:text-start
//              global-h2
//             `}
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
//           <div
//             className={`font-grift font-semibold text-white-1 capitalize text-center md:text-start global-p3
//           `}
//           >
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
//       {/* bg-indigo-200 */}
//       <div className="hidden md:block z-10 absolute  right-0 top-[100px] h-[calc(100vh-100px)] w-[50%] lg:w-[60%] 2xl:w-[65%]">
//         <div className="w-full h-full relative">
//           {/* image / video */}
//           {/* bg-red-200 */}
//           <div className=" w-full h-full">
//             {heroMediaType === 'image' && typeof item.image === 'object' && item.image?.url && (
//               <Image
//                 src={item?.image?.url}
//                 alt={'hero image'}
//                 fill
//                 className={` object-fill object-top xl:object-contain xl:origin-center z-0`}
//                 sizes="100vw"
//                 priority
//                 quality={100}
//                 placeholder="blur"
//                 blurDataURL={item?.imageBlurDataURL || ''}
//               />
//             )}

//             {heroMediaType === 'video' && videoAssetSrc && (
//               <video
//                 className="absolute inset-0 z-0 h-full w-full object-fill object-top xl:object-contain"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 preload="auto"
//               >
//                 <source src={videoAssetSrc} />
//               </video>
//             )}
//           </div>

//           {/* stack show */}
//           {/* bg-red-500 */}
//           <div className=" absolute inset-x-0 bottom-24 h-auto flex justify-end container-padding-r">
//             {/* bg-indigo-400  */}
//             <div
//               className="w-full lg:w-[90%] xl:w-[70%] 2xl:w-[60%] flex flex-wrap
//             gap-3 xl:gap-4 2xl:gap-6"
//             >
//               {item?.webSolutionsWeProvide?.map((sol, i) => (
//                 <div
//                   key={i}
//                   className="font-grift global-p5 text-primary-2
//                 px-[24px]
//                 py-[8px]
//                 rounded-[99px]
//                 border border-primary-2
//                 "
//                 >
//                   {sol?.solution}
//                 </div>
//               ))}
//             </div>
//           </div>
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
