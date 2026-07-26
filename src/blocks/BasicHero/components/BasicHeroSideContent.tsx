// import { pageHrefWithAnchor } from '@/lib/utils'
// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import Link from 'next/link'

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

// function BasicHeroSideContent({ item }: Props) {
//   const heroMediaType = item?.heroMediaType || 'none'
//   const videoAssetSrc = getPublicVideoAssetPath(item?.videoAssetName)

//   return (
//     <div className="hidden md:block z-10 absolute right-0 top-[100px] h-[calc(100vh-100px)] w-[50%] lg:w-[60%] 2xl:w-[65%] border border-black">
//       <div className="w-full h-full relative">
//         {/* image / video */}
//         <div className="w-full aspect-[20/18]">
//           {heroMediaType === 'image' && typeof item.image === 'object' && item.image?.url && (
//             <Image
//               src={item?.image?.url}
//               alt="hero image"
//               fill
//               className="object-fill object-top lg:object-contain lg:origin-center z-0"
//               // className="object-contain z-0"
//               sizes="100vw"
//               priority
//               quality={100}
//               placeholder="blur"
//               blurDataURL={item?.imageBlurDataURL || ''}
//             />
//           )}

//           {heroMediaType === 'video' && videoAssetSrc && (
//             <video
//               // className="absolute inset-0 z-0 h-full w-full object-fill object-top xl:object-contain bg-transparent"
//               className="absolute inset-0 z-0 h-full w-full object-fill object-top lg:object-contain lg:origin-center bg-transparent"
//               autoPlay
//               muted
//               loop
//               playsInline
//               preload="auto"
//             >
//               <source src={videoAssetSrc} />
//             </video>
//           )}
//         </div>

//         {/* stack show */}
//         <div className="absolute inset-x-0 bottom-24 z-40 h-auto flex justify-end container-padding-r">
//           <div
//             className="w-full lg:w-[90%] xl:w-[70%] 2xl:w-[60%] flex flex-wrap
//             gap-[8px] 2xl:gap-[10px]"
//           >
//             {item?.webSolutionsWeProvide?.map((sol, i) => {
//               const href = pageHrefWithAnchor(sol?.buttonLink, sol?.sectionId)
//               const link = href !== '#' ? href : ''

//               const chipClassName = `font-grift global-p5 text-primary-2
//                 px-[24px]
//                 py-[8px]
//                 rounded-[99px]
//                 border border-primary-2
//                 transition-all duration-300 ease-in
//                 ${link ? 'hover:bg-primary-1/30 hover:text-white-1 cursor-pointer' : ''}`

//               if (link) {
//                 return (
//                   <Link key={i} href={link} className={chipClassName}>
//                     {sol?.solution}
//                   </Link>
//                 )
//               }

//               return (
//                 <div key={i} className={chipClassName}>
//                   {sol?.solution}
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BasicHeroSideContent

// ===================================================================================================
// ===================================================================================================
// ===================================================================================================
// ===================================================================================================
// ===================================================================================================
// ===================================================================================================
// ===================================================================================================

// import { pageHrefWithAnchor } from '@/lib/utils'
// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import Link from 'next/link'

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

// function BasicHeroSideContent({ item }: Props) {
//   const heroMediaType = item?.heroMediaType || 'none'
//   const videoAssetSrc = getPublicVideoAssetPath(item?.videoAssetName)

//   const hasMedia =
//     (heroMediaType === 'image' && typeof item?.image === 'object' && item?.image?.url) ||
//     (heroMediaType === 'video' && videoAssetSrc)

//   if (!hasMedia) return null

//   return (
//     <div
//       className="
//         pointer-events-none absolute z-10

//         left-1/2 top-[78px] -translate-x-1/2
//         h-[42svh] min-h-[230px] max-h-[320px]
//         aspect-[20/18]

//         md:left-auto md:right-0 xl:right-24 2xl:right-28 md:top-auto md:bottom-0 md:translate-x-0
//         md:h-[78vh] md:max-h-none
//         lg:h-[80vh]
//         xl:h-[88vh]
//         2xl:h-[88vh]
//       "
//     >
//       <div className="relative h-full w-full">
//         {/* image / video - always locked to 20:18 parent */}
//         {heroMediaType === 'image' && typeof item.image === 'object' && item.image?.url && (
//           <Image
//             src={item.image.url}
//             alt="hero image"
//             fill
//             className="
//               z-0 object-contain object-bottom
//               md:object-contain md:object-bottom
//             "
//             sizes="(max-width: 767px) 100vw, 65vw"
//             priority
//             quality={100}
//             placeholder={item?.imageBlurDataURL ? 'blur' : 'empty'}
//             blurDataURL={item?.imageBlurDataURL || undefined}
//           />
//         )}

//         {heroMediaType === 'video' && videoAssetSrc && (
//           <video
//             className="
//               absolute inset-0 z-0 h-full w-full
//               object-contain object-bottom
//               bg-transparent
//             "
//             autoPlay
//             muted
//             loop
//             playsInline
//             preload="auto"
//           >
//             <source src={videoAssetSrc} />
//           </video>
//         )}

//         {/* desktop service chips */}
//         {item?.webSolutionsWeProvide && item.webSolutionsWeProvide.length > 0 && (
//           <div
//             className="
//               pointer-events-auto absolute inset-x-0 bottom-24 z-40
//               hidden h-auto justify-end md:flex
//               container-padding-r
//             "
//           >
//             <div
//               className="
//                 flex w-full flex-wrap
//                 gap-[8px] 2xl:gap-[10px]
//                 lg:w-[90%] xl:w-[70%] 2xl:w-[60%]
//               "
//             >
//               {item.webSolutionsWeProvide.map((sol, i) => {
//                 const href = pageHrefWithAnchor(sol?.buttonLink, sol?.sectionId)
//                 const link = href !== '#' ? href : ''

//                 const chipClassName = `
//                   font-grift global-p5 text-primary-2
//                   px-[24px] py-[8px]
//                   rounded-[99px]
//                   border border-primary-2
//                   transition-all duration-300 ease-in
//                   ${link ? 'hover:bg-primary-1/30 hover:text-white-1 cursor-pointer' : ''}
//                 `

//                 if (link) {
//                   return (
//                     <Link key={i} href={link} className={chipClassName}>
//                       {sol?.solution}
//                     </Link>
//                   )
//                 }

//                 return (
//                   <div key={i} className={chipClassName}>
//                     {sol?.solution}
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BasicHeroSideContent

// ====================================================================================================
// ====================================================================================================
// ====================================================================================================
// ====================================================================================================
// ====================================================================================================
import { pageHrefWithAnchor } from '@/lib/utils'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  item: BasicHeroBlockType['heroes'][number]
}

function getPublicVideoAssetPath(fileName?: string | null) {
  const cleanFileName = fileName?.trim()

  if (!cleanFileName) return ''

  if (cleanFileName.startsWith('http://') || cleanFileName.startsWith('https://')) {
    return cleanFileName
  }

  if (cleanFileName.startsWith('/')) {
    return cleanFileName
  }

  if (cleanFileName.startsWith('assets/videos/')) {
    return `/${cleanFileName}`
  }

  return `/assets/videos/${cleanFileName}`
}

function BasicHeroSideContent({ item }: Props) {
  const heroMediaType = item?.heroMediaType || 'none'
  const videoAssetSrc = getPublicVideoAssetPath(item?.videoAssetName)

  const hasMedia =
    (heroMediaType === 'image' && typeof item?.image === 'object' && item?.image?.url) ||
    (heroMediaType === 'video' && videoAssetSrc)

  if (!hasMedia) return null

  return (
    <div
      className="
        pointer-events-none relative z-10 mx-auto
        h-[42svh] min-h-[230px] max-h-[320px]
        aspect-[20/18]

        md:absolute md:mx-0
        md:left-auto md:right-0 xl:right-24 2xl:right-28
        md:top-auto md:bottom-0 md:translate-x-0
        md:h-[78vh] md:max-h-none
        lg:h-[80vh]
        xl:h-[88vh]
        2xl:h-[88vh]
      "
    >
      <div className="relative h-full w-full">
        {/* image / video - always locked to 20:18 parent */}
        {heroMediaType === 'image' && typeof item.image === 'object' && item.image?.url && (
          <Image
            src={item.image.url}
            alt="hero image"
            fill
            className="
              z-0 object-contain object-bottom
              md:object-contain md:object-bottom
            "
            sizes="(max-width: 767px) 100vw, 65vw"
            priority
            quality={100}
            placeholder={item?.imageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={item?.imageBlurDataURL || undefined}
          />
        )}

        {heroMediaType === 'video' && videoAssetSrc && (
          <video
            className="
              absolute inset-0 z-0 h-full w-full
              object-contain object-bottom
              bg-transparent
            "
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={videoAssetSrc} />
          </video>
        )}

        {/* desktop service chips */}
        {item?.webSolutionsWeProvide && item.webSolutionsWeProvide.length > 0 && (
          <div
            className="
              pointer-events-auto absolute inset-x-0 bottom-24 z-40
              hidden h-auto justify-end md:flex
              container-padding-r
            "
          >
            <div
              className="
                flex w-full flex-wrap
                gap-[8px] 2xl:gap-[10px]
                lg:w-[90%] xl:w-[70%] 2xl:w-[60%]
              "
            >
              {item.webSolutionsWeProvide.map((sol, i) => {
                const href = pageHrefWithAnchor(sol?.buttonLink, sol?.sectionId)
                const link = href !== '#' ? href : ''

                const chipClassName = `
                  font-grift global-p5 text-primary-2
                  px-[24px] py-[8px]
                  rounded-[99px]
                  border border-primary-2
                  transition-all duration-300 ease-in
                  ${link ? 'hover:bg-primary-1/30 hover:text-white-1 cursor-pointer' : ''}
                `

                if (link) {
                  return (
                    <Link key={i} href={link} className={chipClassName}>
                      {sol?.solution}
                    </Link>
                  )
                }

                return (
                  <div key={i} className={chipClassName}>
                    {sol?.solution}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BasicHeroSideContent
