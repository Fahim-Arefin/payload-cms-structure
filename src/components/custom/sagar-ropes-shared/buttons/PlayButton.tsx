// import React from 'react'

// type Props = {
//   className?: React.ReactNode
// }

// function PlayButton({ className }: Props) {
//   return (
//     <>
//       <div
//         className={`group rounded-full flex justify-center items-center cursor-pointer
//             w-[50px] h-[50px]
//             bg-white-1/10 backdrop-blur-[5.625px] hover:backdrop-blur-[7.625px]
//             border-2 border-white/10 hover:border-3 hover:border-cyan
//             text-white hover:text-cyan
//             transition-all duration-300 ease-in
//          ${className}`}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="11"
//           height="12"
//           viewBox="0 0 8 12"
//           className="fill-current transition-colors duration-300"
//         >
//           <path d="M0 0L10.0658 5.87171L0 11.7434V0Z" />
//         </svg>
//       </div>
//     </>
//   )
// }

// export default PlayButton

// =======================================================
// =======================================================
// =======================================================
'use client'

import React, { useState } from 'react'

type Props = {
  className?: string
}

function PlayButton({ className }: Props) {
  const [burst, setBurst] = useState(false)

  return (
    <div
      onClick={() => setBurst(true)}
      className={`group rounded-full flex justify-center items-center cursor-pointer  
        w-[30px] lg:w-[40px] xl:w-[50px] 
        h-[30px] lg:h-[40px] xl:h-[50px] 
        bg-white-1/10 backdrop-blur-[5.625px] hover:backdrop-blur-[7.625px]
        border-2 border-white/10 hover:border-[3px] hover:border-cyan
        text-white hover:text-cyan
        transition-all duration-300 ease-in
        ${className ?? ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="12"
        viewBox="0 0 8 12"
        onAnimationEnd={() => setBurst(false)}
        className={[
          'fill-current transition-colors duration-300',
          // click burst: scale up + fade out (cyan because parent is hover:text-cyan)
          burst ? 'animate-play-burst' : '',
        ].join(' ')}
      >
        <path d="M0 0L10.0658 5.87171L0 11.7434V0Z" />
      </svg>

      {/* local keyframes (no config needed) */}
      <style>{`
        @keyframes play-burst {
          0%   { transform: scale(1);   opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .animate-play-burst {
          animation: play-burst 420ms ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default PlayButton
