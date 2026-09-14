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

// =====================================================================================
// =====================================================================================
// =====================================================================================

// import XynolabLottieLoader from '@/components/custom/shared/XynolabLottieLoader'
// import { cn } from '@/lib/utils'
// import React from 'react'

// type Props = {
//   widthHeight?: string
//   bgColor?: string
// }

// function Loading({ widthHeight, bgColor }: Props) {
//   return (
//     <div
//       className={cn(
//         'fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center overflow-hidden',
//         widthHeight,
//       )}
//       style={{ backgroundColor: bgColor || '#000' }}
//     >
//       <XynolabLottieLoader />
//     </div>
//   )
// }

// export default Loading

// ====================================================================================
// ====================================================================================
// ====================================================================================
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  loadingText?: string
  widthHeight?: string
  bgColor?: string
}

function Loading({ loadingText, widthHeight, bgColor }: Props) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden',
        widthHeight || 'h-dvh w-screen',
      )}
      style={{ backgroundColor: bgColor || '#020617' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute left-1/2 top-1/2
            h-[260px] w-[260px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full bg-primary-1/20 blur-[80px]
            md:h-[340px] md:w-[340px]
            xl:h-[420px] xl:w-[420px]
          "
        />

        <div
          className="
            absolute left-1/2 top-1/2
            h-[160px] w-[160px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full bg-cyan/10 blur-[46px]
            md:h-[210px] md:w-[210px]
            xl:h-[260px] xl:w-[260px]
          "
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div
          className="
            relative flex items-center justify-center
            size-[76px]
            md:size-[92px]
            lg:size-[104px]
            xl:size-[120px]
          "
        >
          <div
            className="
              absolute inset-0 rounded-full
              border border-white/10
              bg-white/[0.03]
              shadow-[0_18px_60px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
            "
          />

          <div
            className="
              absolute inset-[7px]
              animate-spin rounded-full
              border-[2px] border-transparent
              border-t-cyan border-r-primary-2/70
              md:inset-[8px]
            "
          />

          <div
            className="
              absolute inset-[18px]
              animate-pulse rounded-full
              border border-white/10
              bg-white/[0.04]
              md:inset-[22px]
            "
          />

          <div
            className="
              relative size-[10px] rounded-full
              bg-cyan shadow-[0_0_24px_rgba(117,255,253,0.85)]
              md:size-[12px]
              xl:size-[14px]
            "
          />

          <div
            className="
              absolute inset-0 animate-ping rounded-full
              border border-cyan/20
            "
          />
        </div>

        <p
          className="
            mt-[18px]
            font-grift text-[12px] font-medium
            tracking-[0.22em] text-white/70
            md:mt-[22px] md:text-[13px]
            xl:mt-[26px] xl:text-[14px]
          "
        >
          {loadingText || 'LOADING PAGE DATA'}
        </p>

        <div
          className="
            mt-[10px] h-[2px] w-[90px]
            overflow-hidden rounded-full bg-white/10
            md:mt-[12px] md:w-[110px]
            xl:w-[130px]
          "
        >
          <div
            className="
              h-full w-1/2
              animate-[loaderLine_1.4s_ease-in-out_infinite]
              rounded-full bg-cyan
              shadow-[0_0_18px_rgba(117,255,253,0.75)]
            "
          />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes loaderLine {
              0% {
                transform: translateX(-110%);
              }
              50% {
                transform: translateX(60%);
              }
              100% {
                transform: translateX(220%);
              }
            }
          `,
        }}
      />
    </div>
  )
}

export default Loading
