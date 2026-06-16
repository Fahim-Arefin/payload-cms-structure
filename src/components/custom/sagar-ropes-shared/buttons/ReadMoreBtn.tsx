'use client'

import React, { useRef } from 'react'
import ButtonColoredArrowAnimated, {
  ButtonColoredArrowAnimatedRef,
} from './ButtonColoredArrowAnimated'

type Props = {
  text?: string
  onClick?: () => void
  className?: string
}

function ReadMoreBtn({ text = 'Read More', onClick, className }: Props) {
  const arrowRef = useRef<ButtonColoredArrowAnimatedRef | null>(null)

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => arrowRef.current?.enter()}
      onMouseLeave={() => arrowRef.current?.leave()}
      className={`
        inline-flex items-center gap-2
        font-grift text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]
        font-semibold uppercase tracking-[0.08em]
        text-primary-1
        ${className ?? ''}
      `}
    >
      <span>{text}</span>

      <ButtonColoredArrowAnimated ref={arrowRef} />
    </button>
  )
}

export default ReadMoreBtn
