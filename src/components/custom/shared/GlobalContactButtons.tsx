'use client'

import React, { useState } from 'react'

function GlobalContactButtons() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleCall = () => {
    window.open('tel:09610889900', '_self')
  }

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div
      className="hidden lg:flex fixed inset-y-0 right-0 flex-col justify-center items-center gap-2 pr-2 px-0 z-50 h-fit my-auto
    mb-24"
    >
      <div className="cursor-pointer" onClick={handleCall}>
        <svg
          width="50"
          height="50"
          viewBox="0 0 90 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_549_405)">
            <rect x="10" y="10" width="70" height="70" rx="35" fill="#FF6600" />
          </g>
          <path
            d="M41.2679 42.0685L44.4869 39.1165C45.3679 38.3083 45.9873 37.2554 46.2658 36.0929C46.5442 34.9303 46.4691 33.711 46.0499 32.5915L44.6744 28.9195C44.1617 27.5489 43.1453 26.4257 41.8327 25.779C40.52 25.1323 39.0101 25.0109 37.6109 25.4395C32.4629 27.0145 28.5059 31.7995 29.7239 37.483C30.5249 41.221 32.0564 45.913 34.9619 50.9065C37.3964 55.1121 40.4593 58.9211 44.0444 62.2015C48.3494 66.1195 54.4994 65.14 58.4564 61.4515C59.5165 60.4621 60.1597 59.1059 60.255 57.659C60.3503 56.2122 59.8906 54.7833 58.9694 53.6635L56.4479 50.6005C55.688 49.6768 54.6693 49.0014 53.5227 48.6608C52.3761 48.3203 51.1538 48.3303 50.0129 48.6895L45.8489 50.002C45.6879 49.837 45.5049 49.641 45.2999 49.414C44.4436 48.4671 43.6861 47.4352 43.0394 46.3345C42.4097 45.2238 41.895 44.0517 41.5034 42.8365C41.4197 42.5821 41.3412 42.3261 41.2679 42.0685Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_d_549_405"
              x="0"
              y="0"
              width="90"
              height="90"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0   "
                result="hardAlpha"
              />
              <feMorphology
                radius="2"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_549_405"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_549_405" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_549_405"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="relative group cursor-pointer z-50" onClick={handleChatToggle}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <rect width="70" height="70" rx="35" fill="#FF6600" />
          <path
            d="M15.7998 22.9992C15.7998 21.7262 16.3055 20.5053 17.2057 19.6051C18.1059 18.7049 19.3268 18.1992 20.5998 18.1992H37.3998C38.6728 18.1992 39.8937 18.7049 40.7939 19.6051C41.6941 20.5053 42.1998 21.7262 42.1998 22.9992V32.5992C42.1998 33.8723 41.6941 35.0932 40.7939 35.9933C39.8937 36.8935 38.6728 37.3992 37.3998 37.3992H32.5998L25.3998 44.5992V37.3992H20.5998C19.3268 37.3992 18.1059 36.8935 17.2057 35.9933C16.3055 35.0932 15.7998 33.8723 15.7998 32.5992V22.9992Z"
            fill="white"
          />
          <path
            d="M46.9998 27.7988V32.5988C46.9998 35.1449 45.9884 37.5867 44.1881 39.3871C42.3877 41.1874 39.9459 42.1988 37.3998 42.1988H34.587L30.3486 46.4396C31.0206 46.7972 31.7862 46.9988 32.5998 46.9988H37.3998L44.5998 54.1988V46.9988H49.3998C50.6729 46.9988 51.8938 46.4931 52.7939 45.5929C53.6941 44.6928 54.1998 43.4719 54.1998 42.1988V32.5988C54.1998 31.3258 53.6941 30.1049 52.7939 29.2047C51.8938 28.3045 50.6729 27.7988 49.3998 27.7988H46.9998Z"
            fill="white"
          />
        </svg>

        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0 opacity-0 pointer-events-none
                       group-hover:-translate-x-5 group-hover:opacity-100 group-hover:pointer-events-auto
                       transition-all duration-300 ease-in-out -z-10"
        >
          <div className="bg-white rounded-l-full pl-4 pr-7 py-[10px] shadow-md text-sm font-medium text-[#ED7125] whitespace-nowrap">
            Let's chat
          </div>
        </div>
      </div>

      {/* Inline Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 lg:bottom-auto lg:right-16 lg:top-1/2 lg:-translate-y-1/2 z-50">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
            {/* Chat Header */}
            <div className="bg-[#FF6600] text-white px-4 py-3 flex justify-between items-center">
              <span className="font-medium">Chat with us</span>
              <button 
                onClick={handleChatToggle}
                className="text-white hover:text-gray-200 text-xl leading-none"
              >
                ×
              </button>
            </div>
            {/* Chat iframe */}
            <iframe
              src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/18/12/20241218123154-P5ENF3RC.json"
              width="350"
              height="500"
              frameBorder="0"
              title="Botpress Chat"
              className="block"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalContactButtons

// import React from 'react'

// function GlobalContactButtons() {
//   return (
//     <div
//       className="fixed right-2 bottom-20 flex flex-col items-center justify-center gap-1 z-50
//                  lg:top-1/2 lg:bottom-auto lg:translate-y-[-50%] lg:gap-2 lg:pr-2"
//     >
//       {/* Phone Icon */}
//       <div className="cursor-pointer">
//         <svg
//           width="40"
//           height="40"
//           viewBox="0 0 90 90"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="lg:w-[50px] lg:h-[50px]"
//         >
//           <g filter="url(#filter0_d_549_405)">
//             <rect x="10" y="10" width="70" height="70" rx="35" fill="#FF6600" />
//           </g>
//           <path
//             d="M41.2679 42.0685L44.4869 39.1165C45.3679 38.3083 45.9873 37.2554 46.2658 36.0929C46.5442 34.9303 46.4691 33.711 46.0499 32.5915L44.6744 28.9195C44.1617 27.5489 43.1453 26.4257 41.8327 25.779C40.52 25.1323 39.0101 25.0109 37.6109 25.4395C32.4629 27.0145 28.5059 31.7995 29.7239 37.483C30.5249 41.221 32.0564 45.913 34.9619 50.9065C37.3964 55.1121 40.4593 58.9211 44.0444 62.2015C48.3494 66.1195 54.4994 65.14 58.4564 61.4515C59.5165 60.4621 60.1597 59.1059 60.255 57.659C60.3503 56.2122 59.8906 54.7833 58.9694 53.6635L56.4479 50.6005C55.688 49.6768 54.6693 49.0014 53.5227 48.6608C52.3761 48.3203 51.1538 48.3303 50.0129 48.6895L45.8489 50.002C45.6879 49.837 45.5049 49.641 45.2999 49.414C44.4436 48.4671 43.6861 47.4352 43.0394 46.3345C42.4097 45.2238 41.895 44.0517 41.5034 42.8365C41.4197 42.5821 41.3412 42.3261 41.2679 42.0685Z"
//             fill="white"
//           />
//           <defs>
//             <filter
//               id="filter0_d_549_405"
//               x="0"
//               y="0"
//               width="90"
//               height="90"
//               filterUnits="userSpaceOnUse"
//               colorInterpolationFilters="sRGB"
//             >
//               <feFlood floodOpacity="0" result="BackgroundImageFix" />
//               <feColorMatrix
//                 in="SourceAlpha"
//                 type="matrix"
//                 values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                 result="hardAlpha"
//               />
//               <feMorphology
//                 radius="2"
//                 operator="dilate"
//                 in="SourceAlpha"
//                 result="effect1_dropShadow_549_405"
//               />
//               <feOffset />
//               <feGaussianBlur stdDeviation="4" />
//               <feComposite in2="hardAlpha" operator="out" />
//               <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0" />
//               <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_549_405" />
//               <feBlend
//                 mode="normal"
//                 in="SourceGraphic"
//                 in2="effect1_dropShadow_549_405"
//                 result="shape"
//               />
//             </filter>
//           </defs>
//         </svg>
//       </div>

//       {/* Chat Icon with Tooltip */}
//       <div className="relative group cursor-pointer z-50">
//         <svg
//           width="32"
//           height="32"
//           viewBox="0 0 70 70"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="lg:w-[40px] lg:h-[40px]"
//         >
//           <rect width="70" height="70" rx="35" fill="#FF6600" />
//           <path
//             d="M15.7998 22.9992C15.7998 21.7262 16.3055 20.5053 17.2057 19.6051C18.1059 18.7049 19.3268 18.1992 20.5998 18.1992H37.3998C38.6728 18.1992 39.8937 18.7049 40.7939 19.6051C41.6941 20.5053 42.1998 21.7262 42.1998 22.9992V32.5992C42.1998 33.8723 41.6941 35.0932 40.7939 35.9933C39.8937 36.8935 38.6728 37.3992 37.3998 37.3992H32.5998L25.3998 44.5992V37.3992H20.5998C19.3268 37.3992 18.1059 36.8935 17.2057 35.9933C16.3055 35.0932 15.7998 33.8723 15.7998 32.5992V22.9992Z"
//             fill="white"
//           />
//           <path
//             d="M46.9998 27.7988V32.5988C46.9998 35.1449 45.9884 37.5867 44.1881 39.3871C42.3877 41.1874 39.9459 42.1988 37.3998 42.1988H34.587L30.3486 46.4396C31.0206 46.7972 31.7862 46.9988 32.5998 46.9988H37.3998L44.5998 54.1988V46.9988H49.3998C50.6729 46.9988 51.8938 46.4931 52.7939 45.5929C53.6941 44.6928 54.1998 43.4719 54.1998 42.1988V32.5988C54.1998 31.3258 53.6941 30.1049 52.7939 29.2047C51.8938 28.3045 50.6729 27.7988 49.3998 27.7988H46.9998Z"
//             fill="white"
//           />
//         </svg>

//         <div
//           className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0 opacity-0 pointer-events-none
//                      group-hover:-translate-x-4 group-hover:opacity-100 group-hover:pointer-events-auto
//                      transition-all duration-300 ease-in-out"
//         >
//           <div className="bg-white rounded-l-full pl-3 pr-5 py-1.5 text-xs md:text-sm font-medium text-[#ED7125] shadow-md whitespace-nowrap">
//             Let's chat
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GlobalContactButtons
