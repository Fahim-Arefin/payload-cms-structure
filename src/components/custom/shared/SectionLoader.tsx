// import React from 'react'
// type Props = {
//   loadingText?: string
// }

// function SectionLoader({ loadingText }: Props) {
//   return (
//     <div className="flex w-full min-h-screen justify-center items-center bg-[#F6EDDD]">
//       <div className="relative">
//         {/* Pulse animation */}
//         <div className="absolute inset-0 flex justify-center items-center">
//           <div className="animate-ping absolute h-24 w-24 rounded-full bg-amber-600 opacity-20"></div>
//         </div>

//         {/* Main spinner */}
//         <div className="flex justify-center items-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-700"></div>
//         </div>

//         {/* Text with fade animation */}
//         <div className="mt-8 text-center">
//           <p className="text-amber-900 font-medium text-lg animate-pulse">
//             {loadingText ? loadingText : 'Loading your experience...'}
//           </p>
//         </div>

//         {/* Subtle dots for additional visual interest */}
//         <div className="flex justify-center space-x-2 mt-6">
//           {[0, 1, 2].map((i) => (
//             <div
//               key={i}
//               className="h-2 w-2 bg-amber-700 rounded-full animate-bounce"
//               style={{ animationDelay: `${i * 0.1}s` }}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SectionLoader

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// import React from 'react'
// type Props = {
//   loadingText?: string
// }

// function SectionLoader({ loadingText }: Props) {
//   return (
//     <div className="flex w-full min-h-screen justify-center items-center bg-[#F6EDDD]">
//       <div className="text-center">
//         {/* Single spinner element */}
//         <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent mx-auto"></div>

//         {/* Simple text */}
//         <p className="mt-6 text-amber-900 font-medium">
//           {loadingText ? loadingText : 'Loading...'}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default SectionLoader

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// import React from 'react'
// type Props = {
//   loadingText?: string
// }

// function SectionLoader({ loadingText }: Props) {
//   return (
//     <div className="flex w-full min-h-screen justify-center items-center bg-[#F6EDDD]">
//       <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
//     </div>
//   )
// }

// export default SectionLoader

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

import { cn } from '@/lib/utils'
import React from 'react'
type Props = {
  loadingText?: string
  widthHeight?: string
  bgColor?: string
}
function SectionLoader({ loadingText, widthHeight, bgColor }: Props) {
  return (
    <div
      className={cn(
        'flex justify-center items-center',
        widthHeight ? widthHeight : 'w-full min-h-screen',
      )}
      // style={{ backgroundColor: bgColor || '#F6EDDD' }}
      style={{ backgroundColor: bgColor || '#FFFFFF' }}
    >
      <div className="text-center">
        <div className="relative inline-block">
          <div className="animate-ping absolute inset-0 rounded-full bg-amber-500 opacity-20"></div>
          <div
            className="animate-spin rounded-full border-4 border-[#ED7125] border-t-transparent relative
           w-8 md:w-10 lg:w-12 xl:w-14 
           h-8 md:h-10 lg:h-12 xl:h-14 "
          ></div>
        </div>
        <p className="mt-2 lg:mt-3 2xl:mt-5 text-[#434343] text-xs md:text-sm">
          {loadingText ? loadingText : 'Loading Page Data ...'}
        </p>
      </div>
    </div>
  )
}

export default SectionLoader
