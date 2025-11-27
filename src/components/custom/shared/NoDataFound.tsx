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
//   bgColor = 'bg-white',
//   message = 'No data found',
//   description = "We couldn't find any data to display here.",
//   showIllustration = true,
// }: Props) {
//   return (
//     <div
//       className={`flex items-center justify-center ${widthHeight} rounded-lg p-6`}
//       style={{ backgroundColor: bgColor || '#F6EDDD' }}
//     >
//       <div className="text-center max-w-md mx-auto">
//         {showIllustration && (
//           <div className="relative mb-6">
//             {/* Animated magnifying glass */}
//             <div className="animate-bounce w-16 h-16 border-4 border-gray-300 rounded-full mx-auto mb-2"></div>
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-3 -translate-y-3 w-6 h-1 bg-gray-400 rotate-45 opacity-0 animate-fadeIn"></div>

//             {/* Floating particles */}
//             <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-blue-200 animate-ping opacity-75"></div>
//             <div className="absolute -bottom-2 -right-2 w-2 h-2 rounded-full bg-amber-200 animate-ping opacity-75 animation-delay-1000"></div>
//             <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-purple-200 animate-ping opacity-75 animation-delay-2000"></div>
//           </div>
//         )}

//         <h3 className="global-p1 font-semibold text-[#424242] mb-2 opacity-0 animate-fadeIn">
//           {message}
//         </h3>

//         <p className="global-p2 text-[#424242] mb-6 opacity-0 animate-fadeIn animate-delay-300">
//           {description}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default NoDataFound

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
'use client'
import React from 'react'

type Props = {
  widthHeight?: string
  bgColor?: string
  message?: string
  description?: string
  showIllustration?: boolean
}

function NoDataFound({
  widthHeight = 'min-h-[400px]',
  bgColor = '#F6EDDD',
  message = 'No data found',
  description = "We couldn't find any data to display here.",
  showIllustration = true,
}: Props) {
  return (
    <div
      className={`container-padding flex items-center justify-center ${widthHeight}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="text-center max-w-lg mx-auto">
        {showIllustration && (
          <div className="relative mb-8">
            {/* Main container for all animations */}
            <div className="relative w-32 h-32 mx-auto">
              {/* Outer pulsing circle */}
              <div className="absolute inset-0 rounded-full bg-blue-100/40 animate-ping-slow"></div>

              {/* Animated document with shaking effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-white rounded-md shadow-lg border border-gray-200 animate-float">
                {/* Document lines */}
                <div className="absolute top-4 left-3 right-3 h-1 bg-gray-200 rounded"></div>
                <div className="absolute top-7 left-3 right-3 h-1 bg-gray-200 rounded"></div>
                <div className="absolute top-10 left-3 right-3 h-1 bg-gray-200 rounded"></div>
                <div className="absolute top-13 left-3 right-8 h-1 bg-gray-200 rounded"></div>

                {/* Question mark inside document */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 text-blue-500 font-bold text-xl flex items-center justify-center">
                  ?
                </div>
              </div>

              {/* Floating search icon */}
              <div className="absolute top-6 right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center animate-float-reverse animation-delay-500">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Floating data points */}
              <div className="absolute top-2 left-4 w-4 h-4 bg-purple-500 rounded-full opacity-70 animate-float animation-delay-700"></div>
              <div className="absolute bottom-6 left-2 w-3 h-3 bg-amber-500 rounded-full opacity-70 animate-float-reverse animation-delay-900"></div>
              <div className="absolute bottom-2 right-6 w-2 h-2 bg-green-500 rounded-full opacity-70 animate-float animation-delay-1100"></div>

              {/* Swirling particles around the main element */}
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-300 rounded-full animate-orbit"></div>
              <div className="absolute top-1/2 right-0 w-2 h-2 bg-purple-300 rounded-full animate-orbit animation-delay-1000"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-amber-300 rounded-full animate-orbit animation-delay-2000"></div>
              <div className="absolute top-1/2 left-0 w-2 h-2 bg-green-300 rounded-full animate-orbit animation-delay-3000"></div>

              {/* Micro-interaction sparkles */}
              <div className="absolute top-4 right-8 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-0 animation-delay-1500"></div>
              <div className="absolute bottom-8 left-8 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-0 animation-delay-2500"></div>
            </div>
          </div>
        )}

        <h3 className="global-p1 font-semibold text-[#424242] mb-2 opacity-0 animate-fadeIn">
          {message}
        </h3>

        <p className="global-p2 text-[#424242] mb-6 opacity-0 animate-fadeIn animate-delay-300">
          {description}
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(20px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(20px) rotate(-360deg);
          }
        }

        @keyframes ping-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 4s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 8s linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
        }

        .animation-delay-1100 {
          animation-delay: 1.1s;
        }

        .animation-delay-1500 {
          animation-delay: 1.5s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-2500 {
          animation-delay: 2.5s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  )
}

export default NoDataFound
