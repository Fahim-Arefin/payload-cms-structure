// 'use client'

// import React from 'react'
// import Image from 'next/image'
// import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
// import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
// import PlayButton from '@/components/custom/sagar-ropes-shared/buttons/PlayButton'

// type Props = {
//   thumbnailUrl: string
//   blurDataURL?: string
//   videoUrl: string
//   className?: string
//   quality?: number
// }

// export default function VideoThumbnailDialog({
//   thumbnailUrl,
//   blurDataURL,
//   videoUrl,
//   className,
//   quality = 90,
// }: Props) {
//   return (
//     <div className={`relative h-full overflow-hidden bg-white-2 group ${className ?? ''}`}>
//       <Dialog>
//         <div className="relative h-full w-full overflow-hidden">
//           <Image
//             src={thumbnailUrl}
//             alt="video thumbnail"
//             fill
//             className="z-10 object-cover object-center transition-all duration-300 ease-in group-hover:scale-125"
//             sizes="100vw"
//             quality={quality}
//             placeholder={blurDataURL ? 'blur' : 'empty'}
//             blurDataURL={blurDataURL || undefined}
//           />

//           {/* overlay */}
//           <div className="absolute inset-0 z-20 pointer-events-none bg-black/20" />

//           {/* trigger only on play button */}
//           <div className="absolute inset-0 z-30 flex items-center justify-center">
//             <DialogTrigger asChild>
//               <button type="button" aria-label="Play video" className="cursor-pointer">
//                 <PlayButton />
//               </button>
//             </DialogTrigger>
//           </div>
//         </div>

//         <DialogContent className="max-w-4xl overflow-hidden border-none bg-black p-0">
//           <VisuallyHidden>
//             <DialogTitle>Play video</DialogTitle>
//           </VisuallyHidden>

//           <div className="relative aspect-video w-full">
//             <iframe
//               className="absolute inset-0 h-full w-full"
//               src={videoUrl}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//             />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import PlayButton from '@/components/custom/sagar-ropes-shared/buttons/PlayButton'

type Props = {
  thumbnailUrl: string
  blurDataURL?: string
  videoUrl: string
  className?: string
  quality?: number

  // ✅ optional details link props
  // If not passed, component behaves exactly like before
  detailsHref?: string
  detailsLabel?: React.ReactNode
}

export default function VideoThumbnailDialog({
  thumbnailUrl,
  blurDataURL,
  videoUrl,
  className,
  quality = 90,
  detailsHref,
  detailsLabel,
}: Props) {
  const showDetailsLink = Boolean(detailsHref && detailsLabel)

  return (
    <div className={`relative h-full overflow-hidden bg-white-2 group ${className ?? ''}`}>
      <Dialog>
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt="video thumbnail"
            fill
            className="z-10 object-cover object-center transition-all duration-300 ease-in group-hover:scale-125"
            sizes="100vw"
            quality={quality}
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL || undefined}
          />

          {/* overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-black/20" />

          {/* ✅ Details page link - optional */}
          {showDetailsLink && (
            <Link
              href={detailsHref!}
              aria-label="Go to details page"
              className="
                absolute right-2 top-2 z-40
                flex items-center 
                gap-1 xl:gap-1.5
                bg-black/45 
                px-1.5 xl:px-2 2xl:px-2.5 
                py-1 xl:py-1 2xl:py-1.5 
                text-[9px] xl:text-[10px] 2xl:text-xs
                 
                font-semibold uppercase tracking-wide text-white
                backdrop-blur-sm transition-all duration-300
                hover:bg-black/70
                md:right-3 md:top-3 
              "
            >
              <span className="line-clamp-1 mt-0.5">{detailsLabel}</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M14 3H21V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 14V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}

          {/* trigger only on play button */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Play video"
                className="pointer-events-auto cursor-pointer"
              >
                <PlayButton />
              </button>
            </DialogTrigger>
          </div>
        </div>

        <DialogContent className="max-w-4xl overflow-hidden border-none bg-black p-0">
          <VisuallyHidden>
            <DialogTitle>Play video</DialogTitle>
          </VisuallyHidden>

          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
