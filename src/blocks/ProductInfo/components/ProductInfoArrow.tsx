'use client'

import ButtonArrowAnimated, {
  ButtonArrowAnimatedRef,
} from '@/components/custom/sagar-ropes-shared/buttons/ButtonArrowAnimated'
import Link from 'next/link'
import React, { useRef } from 'react'

type Props = {
  productLink?: string
}

function ProductInfoArrow({ productLink }: Props) {
  const arrowRef = useRef<ButtonArrowAnimatedRef | null>(null)

  const className = `relative z-10
    group flex items-center justify-center
    h-full w-full
    min-h-[60px] lg:min-h-[80px] xl:min-h-[100px] 2xl:min-h-[120px] 
    ${!productLink && 'cursor-not-allowed'} 
  `

  const arrow = (
    <ButtonArrowAnimated
      ref={arrowRef}
      arrowMoveX={-6}
      tailHeight={{
        base: 1,
        lg: 1.4,
        xl: 1.8,
        '2xl': 2,
      }}
      className="
    scale-[1.4]
    lg:scale-[2.3]
    xl:scale-[2.8]
    2xl:scale-[3.2]
  "
      tailClassName="bg-white-1"
    />
  )

  const handleMouseEnter = () => {
    arrowRef.current?.enter()
  }

  const handleMouseLeave = () => {
    arrowRef.current?.leave()
  }

  if (productLink) {
    return (
      <Link
        href={productLink}
        aria-label="View product"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {arrow}
      </Link>
    )
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className} cursor-default opacity-50`}
    >
      {arrow}
    </div>
  )
}

export default ProductInfoArrow
