// import { cn } from '@/lib/utils'
// import React from 'react'
// type Props = {
//   loadingText?: string
//   widthHeight?: string
//   bgColor?: string
// }
// function Loading({ loadingText, widthHeight, bgColor }: Props) {
//   return (
//     <div
//       className={cn(
//         'flex justify-center items-center',
//         widthHeight ? widthHeight : 'w-full min-h-screen',
//       )}
//       // style={{ backgroundColor: bgColor || '#F6EDDD' }}
//       style={{ backgroundColor: bgColor || '#FFFFFF' }}
//     >
//       <div className="text-center">
//         <div className="relative inline-block">
//           <div className="animate-ping absolute inset-0 rounded-full bg-dark-1 opacity-20"></div>
//           <div
//             className="animate-spin rounded-full border-4 border-cyan border-t-transparent relative
//            w-8 md:w-10 lg:w-12 xl:w-14
//            h-8 md:h-10 lg:h-12 xl:h-14 "
//           ></div>
//         </div>
//         <p className="mt-2 lg:mt-3 2xl:mt-5 text-[#434343] text-xs md:text-sm">
//           {loadingText ? loadingText : 'Loading Page Data ...'}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Loading
import XynolabLottieLoader from '@/components/custom/shared/XynolabLottieLoader'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  widthHeight?: string
  bgColor?: string
}

function Loading({ widthHeight, bgColor }: Props) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center overflow-hidden',
        widthHeight,
      )}
      style={{ backgroundColor: bgColor || '#000' }}
    >
      <XynolabLottieLoader />
    </div>
  )
}

export default Loading
