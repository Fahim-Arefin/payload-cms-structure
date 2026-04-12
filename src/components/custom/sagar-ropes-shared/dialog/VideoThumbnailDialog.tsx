// 'use client'

// import React from 'react'
// import Image from 'next/image'
// import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
// import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
// import PlayButton from '@/components/custom/sagar-ropes-shared/buttons/PlayButton'

// type Props = {
//   /** Thumbnail image url (Payload media url) */
//   thumbnailUrl: string
//   /** Optional blur placeholder data url */
//   blurDataURL?: string
//   /** YouTube embed url */
//   videoUrl: string
//   /** Aspect/size + extra classes for container */
//   className?: string
//   /** Image quality */
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
//     <div className={`bg-white-2 overflow-hidden group ${className ?? ''}`}>
//       <Dialog>
//         <DialogTrigger asChild>
//           <button type="button" className="relative w-full h-full text-left">
//             <Image
//               src={thumbnailUrl}
//               alt="video thumbnail"
//               fill
//               className="object-center object-cover z-10 group-hover:scale-125 transition-all duration-300 ease-in"
//               sizes="100vw"
//               quality={quality}
//               placeholder={blurDataURL ? 'blur' : 'empty'}
//               blurDataURL={blurDataURL || undefined}
//             />

//             <div className="absolute inset-0 z-30 bg-transparent flex justify-center items-center">
//               <PlayButton />
//             </div>

//             {/* overlay */}
//             <div
//               className="absolute inset-0 z-20 pointer-events-none"
//               style={{ background: '#00000020' }}
//             />
//           </button>
//         </DialogTrigger>

//         <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
//           <VisuallyHidden>
//             <DialogTitle>Play video</DialogTitle>
//           </VisuallyHidden>

//           <div className="relative w-full aspect-video">
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
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import PlayButton from '@/components/custom/sagar-ropes-shared/buttons/PlayButton'

type Props = {
  thumbnailUrl: string
  blurDataURL?: string
  videoUrl: string
  className?: string
  quality?: number
}

export default function VideoThumbnailDialog({
  thumbnailUrl,
  blurDataURL,
  videoUrl,
  className,
  quality = 90,
}: Props) {
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

          {/* trigger only on play button */}
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <DialogTrigger asChild>
              <button type="button" aria-label="Play video" className="cursor-pointer">
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
