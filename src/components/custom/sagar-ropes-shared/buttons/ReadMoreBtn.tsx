// 'use client'

// import React, { useRef } from 'react'
// import ButtonColoredArrowAnimated, {
//   ButtonColoredArrowAnimatedRef,
// } from './ButtonColoredArrowAnimated'

// type Props = {
//   text?: string
//   onClick?: () => void
//   className?: string
// }

// function ReadMoreBtn({ text = 'Read More', onClick, className }: Props) {
//   const arrowRef = useRef<ButtonColoredArrowAnimatedRef | null>(null)

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       onMouseEnter={() => arrowRef.current?.enter()}
//       onMouseLeave={() => arrowRef.current?.leave()}
//       className={`
//         inline-flex items-center gap-2
//         font-grift text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]
//         font-semibold uppercase tracking-[0.08em]
//         text-primary-1
//         ${className ?? ''}
//       `}
//     >
//       <span>{text}</span>

//       <ButtonColoredArrowAnimated ref={arrowRef} />
//     </button>
//   )
// }

// export default ReadMoreBtn

'use client'

import Image from 'next/image'
import DownArrow from 'public/assets/icons/DownArrow.png'
import React from 'react'

type Props = {
  text?: string
  onClick?: () => void
  className?: string
  active?: boolean
}

function ReadMoreBtn({ text = 'Read More', onClick, className, active = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group/read-more-btn
        inline-flex items-center gap-2
        font-grift text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]
        font-semibold uppercase tracking-[0.08em]
        text-primary-1
        transition-colors duration-300 ease-out
        hover:text-primary-1
        ${className ?? ''}
      `}
    >
      <span>{text}</span>

      <span
        className="
          relative inline-block shrink-0
          w-[10px]
          aspect-[48/30]
          translate-y-[1px]
          lg:w-[11px]
          xl:w-[12px]
        "
      >
        <Image
          src={DownArrow}
          alt=""
          fill
          className={`
            object-contain
            transition-transform duration-300 ease-out -mt-[1px]
            ${active ? 'rotate-180' : 'rotate-0'}
          `}
          placeholder="blur"
          blurDataURL={DownArrow.blurDataURL}
          quality={95}
        />
      </span>
    </button>
  )
}

export default ReadMoreBtn
