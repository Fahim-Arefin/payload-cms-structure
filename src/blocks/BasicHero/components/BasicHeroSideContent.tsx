// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
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

// function BasicHeroSideContent({ item }: Props) {
//   const heroMediaType = item?.heroMediaType || 'none'
//   const videoAssetSrc = getPublicVideoAssetPath(item?.videoAssetName)

//   const isImageMedia =
//     heroMediaType === 'image' && typeof item?.image === 'object' && item?.image?.url

//   const isVideoMedia = heroMediaType === 'video' && videoAssetSrc

//   const hasMedia = isImageMedia || isVideoMedia

//   if (!hasMedia) return null

//   const wrapperClassName = isImageMedia
//     ? `
//       pointer-events-none relative z-10 mx-auto
//       hidden
//       aspect-[871/1000]

//       lg:block lg:absolute lg:mx-0
//       lg:left-auto lg:right-0
//       lg:top-auto lg:bottom-0 lg:translate-x-0
//       lg:h-[100vh] lg:max-h-none
//       xl:h-[100vh]
//       2xl:h-[100vh]
//     `
//     : `
//       pointer-events-none relative z-10 mx-auto
//       h-[42svh] min-h-[230px] max-h-[320px]
//       aspect-[20/18]

//       lg:absolute lg:mx-0
//       lg:left-auto lg:right-0
//       lg:top-auto lg:bottom-0 lg:translate-x-0
//       lg:h-[100vh] lg:max-h-none
//       xl:h-[100vh]
//       2xl:h-[100vh]
//     `

//   return (
//     <div className={wrapperClassName}>
//       <div className="relative z-10 h-full w-full">
//         {/* image only shown as side media from lg and up */}
//         {isImageMedia && typeof item.image === 'object' && item.image?.url && (
//           <Image
//             src={item.image.url}
//             alt="hero image"
//             fill
//             className="
//               z-0 object-contain object-bottom
//               lg:object-contain lg:object-bottom
//             "
//             sizes="65vw"
//             priority
//             quality={100}
//             placeholder={item?.imageBlurDataURL ? 'blur' : 'empty'}
//             blurDataURL={item?.imageBlurDataURL || undefined}
//           />
//         )}

//         {/* video keeps current mobile/md + desktop design */}
//         {isVideoMedia && (
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
//       </div>
//     </div>
//   )
// }

// export default BasicHeroSideContent

// applying mask

// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'

// type Props = {
//   item: BasicHeroBlockType['heroes'][number]
// }

// const mediaMaskStyle = {
//   WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 90%, transparent 100%)',
//   maskImage: 'linear-gradient(90deg, transparent 0%, black 90%, transparent 100%)',
//   WebkitMaskSize: '100% 100%',
//   maskSize: '100% 100%',
//   WebkitMaskRepeat: 'no-repeat',
//   maskRepeat: 'no-repeat',
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

//   const isImageMedia =
//     heroMediaType === 'image' && typeof item?.image === 'object' && item?.image?.url

//   const isVideoMedia = heroMediaType === 'video' && videoAssetSrc

//   const hasMedia = isImageMedia || isVideoMedia

//   if (!hasMedia) return null

//   const wrapperClassName = isImageMedia
//     ? `
//       pointer-events-none relative z-10 mx-auto
//       hidden
//       aspect-square

//       lg:block lg:absolute lg:mx-0
//       lg:left-auto lg:right-0
//       lg:top-auto lg:bottom-0 lg:translate-x-0
//       lg:h-[100vh] lg:max-h-none
//       xl:h-[100vh]
//       2xl:h-[100vh]
//     `
//     : `
//       pointer-events-none relative z-10 mx-auto
//       h-[42svh] min-h-[230px] max-h-[320px]
//       aspect-square

//       lg:absolute lg:mx-0
//       lg:left-auto lg:right-0
//       lg:top-auto lg:bottom-0 lg:translate-x-0
//       lg:h-[100vh] lg:max-h-none
//       xl:h-[100vh]
//       2xl:h-[100vh]
//     `

//   return (
//     <div className={wrapperClassName}>
//       <div className="relative z-10 h-full w-full" style={mediaMaskStyle}>
//         {/* image only shown as side media from lg and up */}
//         {isImageMedia && typeof item.image === 'object' && item.image?.url && (
//           <Image
//             src={item.image.url}
//             alt="hero image"
//             fill
//             className="
//               z-0 object-contain object-bottom
//               lg:object-contain lg:object-bottom
//             "
//             sizes="65vw"
//             priority
//             quality={100}
//             placeholder={item?.imageBlurDataURL ? 'blur' : 'empty'}
//             blurDataURL={item?.imageBlurDataURL || undefined}
//           />
//         )}

//         {/* video keeps current mobile/md + desktop design */}
//         {isVideoMedia && (
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
//       </div>
//     </div>
//   )
// }

// export default BasicHeroSideContent

import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'

type Props = {
  item: BasicHeroBlockType['heroes'][number]
}

// const mediaMaskStyle = {
//   WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 90%, transparent 100%)',
//   maskImage: 'linear-gradient(90deg, transparent 0%, black 90%, transparent 100%)',
//   WebkitMaskSize: '100% 100%',
//   maskSize: '100% 100%',
//   WebkitMaskRepeat: 'no-repeat',
//   maskRepeat: 'no-repeat',
// }

// const mediaMaskStyle = {
//   WebkitMaskImage: `
//     linear-gradient(
//       90deg,
//       rgba(0, 0, 0, 0) 0%,
//       rgba(0, 0, 0, 0.30) 30%,
//       rgba(0, 0, 0, 1) 90%,
//       rgba(0, 0, 0, 0) 100%
//     )
//   `,
//   maskImage: `
//     linear-gradient(
//       90deg,
//       rgba(0, 0, 0, 0) 0%,
//       rgba(0, 0, 0, 0.30) 30%,
//       rgba(0, 0, 0, 1) 90%,
//       rgba(0, 0, 0, 0) 100%
//     )
//   `,
//   WebkitMaskSize: '100% 100%',
//   maskSize: '100% 100%',
//   WebkitMaskRepeat: 'no-repeat',
//   maskRepeat: 'no-repeat',
// }

const imageMediaMaskStyle = {
  WebkitMaskImage: `
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.30) 30%,
      rgba(0, 0, 0, 1) 90%,
      rgba(0, 0, 0, 0) 100%
    )
  `,
  maskImage: `
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.30) 30%,
      rgba(0, 0, 0, 1) 90%,
      rgba(0, 0, 0, 0) 100%
    )
  `,
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskMode: 'alpha',
  maskMode: 'alpha',
}

const videoMediaMaskStyle = {
  WebkitMaskImage: `
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.45) 0%,
      rgba(0, 0, 0, 0.62) 24%,
      rgba(0, 0, 0, 0.88) 54%,
      rgba(0, 0, 0, 1) 86%,
      rgba(0, 0, 0, 0.18) 100%
    )
  `,
  maskImage: `
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.45) 0%,
      rgba(0, 0, 0, 0.62) 24%,
      rgba(0, 0, 0, 0.88) 54%,
      rgba(0, 0, 0, 1) 86%,
      rgba(0, 0, 0, 0.18) 100%
    )
  `,
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskMode: 'alpha',
  maskMode: 'alpha',
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

  const isImageMedia =
    heroMediaType === 'image' && typeof item?.image === 'object' && item?.image?.url

  const isVideoMedia = heroMediaType === 'video' && videoAssetSrc

  const hasMedia = isImageMedia || isVideoMedia

  if (!hasMedia) return null

  const wrapperClassName = isImageMedia
    ? `
      pointer-events-none relative z-10 mx-auto
      hidden
      aspect-square

      lg:block lg:absolute lg:mx-0
      lg:left-auto lg:right-0
      lg:top-auto lg:bottom-0 lg:translate-x-0
      lg:h-[100vh] lg:max-h-none
      xl:h-[100vh]
      2xl:h-[100vh]
    `
    : `
      pointer-events-none relative z-10 mx-auto
      h-[42svh] min-h-[230px] max-h-[320px]
      aspect-square

      lg:absolute lg:mx-0
      lg:left-auto lg:right-0
      lg:top-[100px] lg:bottom-auto lg:translate-x-0
      lg:h-[calc(100vh-100px)] lg:max-h-none
      xl:h-[calc(100vh-100px)]
      2xl:h-[calc(100vh-100px)]
    `

  return (
    <div className={wrapperClassName}>
      <div
        className="relative z-10 h-full w-full"
        style={isImageMedia ? imageMediaMaskStyle : videoMediaMaskStyle}
      >
        {/* image only shown as side media from lg and up */}
        {isImageMedia && typeof item.image === 'object' && item.image?.url && (
          <Image
            src={item.image.url}
            alt="hero image"
            fill
            className="
              z-0 object-contain object-bottom
              lg:object-contain lg:object-bottom
            "
            sizes="65vw"
            priority
            quality={100}
            placeholder={item?.imageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={item?.imageBlurDataURL || undefined}
          />
        )}

        {/* video */}
        {isVideoMedia && (
          <>
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

            {/* mobile/tablet video bottom blend mask */}
            <div
              className="
                pointer-events-none absolute inset-x-0 bottom-0 z-10
                h-[42%]
                lg:hidden
              "
              style={{
                background: `
                  linear-gradient(
                    180deg,
                    rgba(10, 17, 40, 0.00) 0%,
                    rgba(10, 17, 40, 0.10) 24%,
                    rgba(10, 17, 40, 0.38) 54%,
                    rgba(10, 17, 40, 0.72) 78%,
                    rgba(10, 17, 40, 1) 100%
                  )
                `,
              }}
            />

            {/* tiny lower glow so the video blends into the hero background */}
            <div
              className="
                pointer-events-none absolute inset-x-0 bottom-[-8%] z-10
                mx-auto h-[32%] w-[84%]
                rounded-full bg-primary-1/25 blur-[45px]
                lg:hidden
              "
            />
          </>
        )}
      </div>
    </div>
  )
}

export default BasicHeroSideContent
