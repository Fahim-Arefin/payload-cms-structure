// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import LocalizedText from '@/components/custom/shared/LocalizedText'
// import { LearnMoreVideoContentBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React from 'react'
// import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { cn } from '@/lib/utils'
// import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

// type BlogType = NonNullable<
//   NonNullable<LearnMoreVideoContentBlockType['groups']>[number]['blogs']
// >[number]

// type BlogItemProps = {
//   blog: BlogType
//   index: number
//   bg: string
// }

// function VideoItem({ blog, bg, index }: BlogItemProps) {
//   return (
//     <div
//       className={`space-y-4 lg:space-y-6 xl:space-y-10 2xl:space-y-12
//     ${index % 2 === 0 ? 'lg:mt-20 xl:mt-24 2xl:mt-32' : ''}`}
//     >
//       {/* image */}
//       <div className={`rounded-xl `}>
//         <div className="relative w-full aspect-[525/278] ">
//           {typeof blog?.image === 'object' && blog?.image?.url && (
//             <Image
//               fill
//               src={blog?.image?.url}
//               alt={blog?.title}
//               sizes="50vw"
//               className="object-cover object-center rounded-xl w-full h-full"
//               quality={80}
//               placeholder="blur"
//               blurDataURL={blog?.imageBlurDataURL || ''}
//             />
//           )}
//           <div
//             className="rounded-tr-xl absolute -left-0.5 -bottom-0.5
//         h-8 md:h-10 lg:h-9 xl:h-11 2xl:h-12
//         w-8 md:w-10 lg:w-9 xl:w-11 2xl:w-12"
//             style={{
//               backgroundColor: bg,
//             }}
//           >
//             <div className="invisible">white layer</div>
//           </div>
//           <div className="absolute inset-x-0 -bottom-4 xl:-bottom-6 mx-auto h-1 xl:h-2 w-12 xl:w-20 bg-[#ED7125] hidden lg:block rounded-xl">
//             <div className="invisible">Orange div</div>
//           </div>
//         </div>
//       </div>

//       {/* content */}
//       <div className="md:space-y-1 lg:space-y-2 2xl:space-y-4">
//         <div className="text-[#201F22] global-h3 font-semibold text-center">
//           <LocalizedText en={blog?.title} bn={blog?.titleBN} />
//         </div>

//         <div className={`global-p2 font-light text-[#828384] text-justify line-clamp-4`}>
//           <LocalizedRichText en={blog?.description} bn={blog?.descriptionBN} />
//         </div>
//         <div className={`global-p2 font-light text-[#AEB2B3] text-center`}>
//           <LocalizedText en={blog?.caption} bn={blog?.captionBN} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VideoItem

// ====================================================================
// ====================================================================
// ====================================================================
// ====================================================================

import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LearnMoreVideoContentBlockType } from '@/types/payloadCustomTypes'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'

type BlogType = NonNullable<
  NonNullable<LearnMoreVideoContentBlockType['groups']>[number]['blogs']
>[number]

type BlogItemProps = {
  blog: BlogType
  index: number
  bg: string
}

function VideoItem({ blog, bg, index }: BlogItemProps) {
  return (
    <div
      className={`space-y-4 lg:space-y-6 xl:space-y-10 2xl:space-y-12
    ${index % 2 === 0 ? 'lg:mt-20 xl:mt-24 2xl:mt-32' : ''}`}
    >
      {/* image and viodeo */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Play insurance video"
            className="relative rounded-xl w-full aspect-[525/278] group cursor-pointer transition-all"
          >
            {/* <div className=" "> */}
            {/* image */}
            {typeof blog?.image === 'object' && blog?.image?.url && (
              <Image
                fill
                src={blog?.image?.url}
                alt={blog?.title}
                sizes="50vw"
                className="object-cover object-center rounded-xl w-full h-full"
                quality={80}
                placeholder="blur"
                blurDataURL={blog?.imageBlurDataURL || ''}
              />
            )}
            {/* white rectangle */}
            <div
              className="rounded-tr-xl absolute -left-0.5 -bottom-0.5 
        h-8 md:h-10 lg:h-9 xl:h-11 2xl:h-12 
        w-8 md:w-10 lg:w-9 xl:w-11 2xl:w-12"
              style={{
                backgroundColor: bg,
              }}
            >
              <div className="invisible">white layer</div>
            </div>
            {/* orange border */}
            <div className="absolute inset-x-0 -bottom-4 xl:-bottom-6 mx-auto h-1 xl:h-2 w-12 xl:w-20 bg-[#ED7125] hidden lg:block rounded-xl">
              <div className="invisible">Orange div</div>
            </div>
            {/* overlay */}
            <div className="absolute inset-0 group-hover:bg-black/50 transition duration-300 rounded-xl" />
            {/* play btn */}
            <div
              className="absolute 
        bottom-0 lg:bottom-0.5 xl:bottom-0.5 2xl:bottom-0
        -right-0 lg:right-0.5 xl:right-[3px] 2xl:-right-0.5 
         w-[30px] lg:w-[40px] xl:w-[50px] 2xl:w-[60px]  
          h-[30px] lg:h-[40px] xl:h-[50px] 2xl:h-[60px]"
            >
              <Image src="/assets/icons/web/play.svg" alt="Play video" fill className="" />
            </div>
            {/* </div> */}
          </button>
        </DialogTrigger>
        <DialogContent
          className="max-w-5xl w-full aspect-video p-0 bg-black 
      [&>button.absolute]:top-3 [&>button.absolute]:right-3 
      [&>button.absolute]:bg-black/50 
      [&>button.absolute]:text-white 
      [&>button.absolute]:hover:bg-black/80"
        >
          <VisuallyHidden>
            <DialogTitle>Insurance Video</DialogTitle>
          </VisuallyHidden>

          <iframe
            width="100%"
            height="100%"
            src={blog?.videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
      {/* content */}
      <div className="md:space-y-1 lg:space-y-2 2xl:space-y-4">
        <div className="text-[#201F22] global-h3 font-semibold text-center">
          <LocalizedText en={blog?.title} bn={blog?.titleBN} />
        </div>

        <div className={`global-p2 font-light text-[#828384] text-justify line-clamp-4`}>
          <LocalizedRichText en={blog?.description} bn={blog?.descriptionBN} />
        </div>
        <div className={`global-p2 font-light text-[#AEB2B3] text-center`}>
          <LocalizedText en={blog?.caption} bn={blog?.captionBN} />
        </div>
      </div>
    </div>
  )
}

export default VideoItem
