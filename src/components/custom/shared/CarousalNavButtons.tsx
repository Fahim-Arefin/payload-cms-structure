// 'use client'

// import { useState } from 'react'
// import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
// import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

// type Props = {
//   onPrev: () => void
//   onNext: () => void
//   defaultActive?: 'left' | 'right'
// }

// export default function CarouselNavButtons({ onPrev, onNext, defaultActive = 'right' }: Props) {
//   const [active, setActive] = useState<'left' | 'right'>(defaultActive)

//   return (
//     <div className="flex justify-center gap-1 items-center w-fit h-fit">
//       {/* Left Button */}
//       <button
//         onClick={() => {
//           onPrev()
//           setActive('left')
//         }}
//         className={`transition-all duration-300 flex items-center justify-center rounded-full
//           ${active === 'left' ? 'bg-orange-500 text-white px-6 h-8' : 'bg-transparent text-gray-700 border border-gray-400 w-8 h-8'}
//         `}
//       >
//         {active === 'left' ? <BsArrowLeft size={20} /> : <LuArrowLeft size={20} />}
//       </button>

//       {/* Right Button */}
//       <button
//         onClick={() => {
//           onNext()
//           setActive('right')
//         }}
//         className={`transition-all duration-300 flex items-center justify-center rounded-full
//           ${active === 'right' ? 'bg-orange-500 text-white px-6 h-8' : 'bg-transparent text-gray-700 border border-gray-400 w-8 h-8'}
//         `}
//       >
//         {active === 'right' ? <BsArrowRight size={20} /> : <LuArrowRight size={20} />}
//       </button>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

type Props = {
  onPrev: () => void
  onNext: () => void
  hasPrev?: boolean
  hasNext?: boolean
  defaultActive?: 'left' | 'right'
  color?: string
}

export default function CarouselNavButtons({
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  defaultActive = 'right',
  color = '#000000',
}: Props) {
  const [active, setActive] = useState<'left' | 'right'>(defaultActive)

  return (
    <div className="flex justify-center gap-1 items-center w-fit h-fit">
      {/* Left Button */}
      <button
        onClick={() => {
          if (!hasPrev) return
          onPrev()
          setActive('left')
        }}
        disabled={!hasPrev}
        className={`transition-all duration-300 flex items-center justify-center rounded-full
            
          ${
            active === 'left'
              ? 'bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-5 xl:px-6 h-6 lg:h-7 xl:h-8'
              : 'bg-transparent hover:bg-white/70 text-gray-700 border border-gray-400 w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8'
          }
          ${!hasPrev ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {active === 'left' ? <BsArrowLeft size={20} /> : <LuArrowLeft color={color} size={20} />}
      </button>

      {/* Right Button */}
      <button
        onClick={() => {
          if (!hasNext) return
          onNext()
          setActive('right')
        }}
        disabled={!hasNext}
        className={`transition-all duration-300 flex items-center justify-center rounded-full
          ${
            active === 'right'
              ? 'bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-5  xl:px-6 h-6 lg:h-7 xl:h-8'
              : 'bg-transparent hover:bg-white/70 text-gray-700 border border-gray-400 w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8'
          }
          ${!hasNext ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {active === 'right' ? <BsArrowRight size={20} /> : <LuArrowRight color={color} size={20} />}
      </button>
    </div>
  )
}
