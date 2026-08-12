// 'use client'
// import React from 'react'

// type Props = {
//   widthHeight?: string
//   bgColor?: string
//   message?: string
//   description?: string
//   showIllustration?: boolean
// }

// function NoDataFound({
//   widthHeight = 'min-h-[400px]',
//   bgColor = '#FFFBFC',
//   message = 'No data found',
//   description = "We couldn't find any data to display here.",
//   showIllustration = true,
// }: Props) {
//   return (
//     <div
//       className={`font-grift container-padding flex items-center justify-center ${widthHeight}`}
//       style={{ backgroundColor: bgColor }}
//     >
//       <div className="text-center max-w-lg mx-auto ">
//         {showIllustration && (
//           <div className="relative mb-8">
//             {/* Main container for all animations */}
//             <div className="relative w-32 h-32 mx-auto">
//               {/* Outer pulsing circle */}
//               <div className="absolute inset-0 rounded-full bg-dark-2 animate-ping-slow"></div>

//               {/* Animated document with shaking effect */}
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-white rounded-md shadow-lg border border-gray-200 animate-float">
//                 {/* Document lines */}
//                 <div className="absolute top-4 left-3 right-3 h-1 bg-gray-200 rounded"></div>
//                 <div className="absolute top-7 left-3 right-3 h-1 bg-gray-200 rounded"></div>
//                 <div className="absolute top-10 left-3 right-3 h-1 bg-gray-200 rounded"></div>
//                 <div className="absolute top-13 left-3 right-8 h-1 bg-gray-200 rounded"></div>

//                 {/* Question mark inside document */}
//                 <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 text-blue-500 font-bold text-xl flex items-center justify-center">
//                   ?
//                 </div>
//               </div>

//               {/* Floating search icon */}
//               <div className="absolute top-6 right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center animate-float-reverse animation-delay-500">
//                 <svg
//                   className="w-4 h-4 text-blue-500"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>

//               {/* Floating data points */}
//               <div className="absolute top-2 left-4 w-4 h-4 bg-purple-500 rounded-full opacity-70 animate-float animation-delay-700"></div>
//               <div className="absolute bottom-6 left-2 w-3 h-3 bg-amber-500 rounded-full opacity-70 animate-float-reverse animation-delay-900"></div>
//               <div className="absolute bottom-2 right-6 w-2 h-2 bg-green-500 rounded-full opacity-70 animate-float animation-delay-1100"></div>

//               {/* Swirling particles around the main element */}
//               <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-300 rounded-full animate-orbit"></div>
//               <div className="absolute top-1/2 right-0 w-2 h-2 bg-purple-300 rounded-full animate-orbit animation-delay-1000"></div>
//               <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-amber-300 rounded-full animate-orbit animation-delay-2000"></div>
//               <div className="absolute top-1/2 left-0 w-2 h-2 bg-green-300 rounded-full animate-orbit animation-delay-3000"></div>

//               {/* Micro-interaction sparkles */}
//               <div className="absolute top-4 right-8 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-0 animation-delay-1500"></div>
//               <div className="absolute bottom-8 left-8 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-0 animation-delay-2500"></div>
//             </div>
//           </div>
//         )}

//         <h3 className="font-agency global-h4 text-dark-2 mb-2 opacity-0 animate-fadeIn">
//           {message}
//         </h3>

//         <p className="font-grift global-p4 text-[#424242] mb-6 opacity-0 animate-fadeIn animate-delay-300">
//           {description}
//         </p>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-8px);
//           }
//         }

//         @keyframes float-reverse {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(8px);
//           }
//         }

//         @keyframes orbit {
//           0% {
//             transform: rotate(0deg) translateX(20px) rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg) translateX(20px) rotate(-360deg);
//           }
//         }

//         @keyframes ping-slow {
//           0%,
//           100% {
//             transform: scale(1);
//             opacity: 0.7;
//           }
//           50% {
//             transform: scale(1.5);
//             opacity: 0;
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out forwards;
//         }

//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }

//         .animate-float-reverse {
//           animation: float-reverse 4s ease-in-out infinite;
//         }

//         .animate-orbit {
//           animation: orbit 8s linear infinite;
//         }

//         .animate-ping-slow {
//           animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }

//         .animation-delay-300 {
//           animation-delay: 0.3s;
//         }

//         .animation-delay-500 {
//           animation-delay: 0.5s;
//         }

//         .animation-delay-700 {
//           animation-delay: 0.7s;
//         }

//         .animation-delay-900 {
//           animation-delay: 0.9s;
//         }

//         .animation-delay-1100 {
//           animation-delay: 1.1s;
//         }

//         .animation-delay-1500 {
//           animation-delay: 1.5s;
//         }

//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }

//         .animation-delay-2500 {
//           animation-delay: 2.5s;
//         }

//         .animation-delay-3000 {
//           animation-delay: 3s;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default NoDataFound

'use client'

import React from 'react'

type Props = {
  widthHeight?: string
  bgColor?: string
  message?: string
  description?: string
  showIllustration?: boolean
}

const bgColorMap: Record<string, string> = {
  'white-1': '#FFFFFF',
  'white-2': '#F8F8F8',
  'white-3': '#FFFBFC',
  'secondary-1': '#0A1128',
  'secondary-2': '#202B4C',
  'primary-1': '#006C67',
  'primary-2': '#6EC9C7',
  'primary-1-30': 'rgba(0, 108, 103, 0.3)',
  'primary-1-50': 'rgba(0, 108, 103, 0.5)',
}

function resolveBgColor(bgColor?: string) {
  if (!bgColor) return '#FFFBFC'
  return bgColorMap[bgColor] || bgColor
}

function isDarkBackground(bgColor?: string) {
  return bgColor === 'secondary-1' || bgColor === 'secondary-2' || bgColor === '#0A1128'
}

function NoDataFound({
  widthHeight = 'min-h-[420px]',
  bgColor = '#FFFBFC',
  message = 'No data found',
  description = "We couldn't find any data to display here.",
  showIllustration = true,
}: Props) {
  const resolvedBgColor = resolveBgColor(bgColor)
  const dark = isDarkBackground(bgColor)

  return (
    <div
      className={`
        container-padding
        relative isolate flex w-full items-center justify-center
        overflow-hidden
        ${widthHeight}
      `}
      style={{ backgroundColor: resolvedBgColor }}
    >
      {/* soft background glow */}
      <div
        className="
          pointer-events-none absolute left-1/2 top-1/2 -z-10
          h-[320px] w-[520px] -translate-x-1/2 -translate-y-1/2
          rounded-full bg-primary-1/10 blur-[80px]
          md:h-[420px] md:w-[720px] md:blur-[110px]
        "
      />

      <div
        className={`
          relative mx-auto flex w-full max-w-[620px] flex-col items-center
          rounded-[18px] border px-[22px] py-[42px] text-center
          shadow-[0_22px_70px_rgba(10,17,40,0.08)]
          backdrop-blur-[16px]
          md:px-[42px] md:py-[54px]
          lg:rounded-[22px]
          ${dark ? 'border-white-1/12 bg-white-1/6' : 'border-primary-1/18 bg-white-1/70'}
        `}
      >
        {showIllustration && (
          <div
            className="
              relative mb-[26px] flex size-[92px] items-center justify-center
              rounded-[24px] border border-primary-1/25
              bg-primary-1/10
              shadow-[0_16px_42px_rgba(0,108,103,0.14)]
              md:size-[104px] md:rounded-[28px]
            "
          >
            <div
              className="
                absolute inset-[-8px] -z-10 rounded-[30px]
                bg-primary-1/10 blur-[18px]
              "
            />

            <div
              className="
                relative flex size-[54px] items-center justify-center
                rounded-[16px] bg-white-1
                shadow-[0_10px_24px_rgba(10,17,40,0.12)]
                md:size-[60px]
              "
            >
              <span
                className="
                  absolute left-[14px] right-[14px] top-[16px]
                  h-[3px] rounded-full bg-primary-1/25
                "
              />
              <span
                className="
                  absolute left-[14px] right-[20px] top-[25px]
                  h-[3px] rounded-full bg-primary-1/20
                "
              />
              <span
                className="
                  absolute left-[14px] right-[26px] top-[34px]
                  h-[3px] rounded-full bg-primary-1/15
                "
              />

              <span
                className="
                  relative z-10 mt-[20px]
                  font-agency text-[28px] leading-none
                  text-primary-1
                "
              >
                ?
              </span>
            </div>
          </div>
        )}

        <div
          className="
            mb-[14px] inline-flex items-center gap-[8px]
            rounded-full border border-primary-1/25
            bg-primary-1/10 px-[12px] py-[6px]
            font-grift text-[11px] font-bold uppercase tracking-[0.12em]
            text-primary-1
          "
        >
          <span className="size-[6px] rounded-full bg-primary-1" />
          Action Required
        </div>

        <h3
          className={`
            max-w-[520px]
            font-agency text-[42px] leading-[0.95]
            md:text-[54px]
            lg:text-[62px]
            ${dark ? 'text-white-1' : 'text-secondary-1'}
          `}
        >
          {message}
        </h3>

        <p
          className={`
            mt-[16px] max-w-[500px]
            font-grift global-p4 leading-[1.65]
            ${dark ? 'text-white-1/72' : 'text-secondary-2'}
          `}
        >
          {description}
        </p>

        <div
          className={`
            mt-[28px] w-full rounded-[12px] border px-[16px] py-[14px]
            text-left font-grift text-[12px] leading-[1.55]
            md:px-[18px] md:py-[16px]
            ${
              dark
                ? 'border-white-1/10 bg-white-1/5 text-white-1/68'
                : 'border-primary-1/12 bg-primary-1/5 text-secondary-1/72'
            }
          `}
        >
          <span className="font-bold text-primary-1">Note:</span> This section is ready, but its
          required content or setting is not enabled yet. Update it from the Payload admin panel.
        </div>
      </div>
    </div>
  )
}

export default NoDataFound
