'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import Image from 'next/image'
import ArrowRightColored from 'public/assets/icons/arrowRightColored.png'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

export type ButtonColoredArrowAnimatedRef = {
  enter: () => void
  leave: () => void
}

type Props = {
  className?: string
  tailClassName?: string
}

const ButtonColoredArrowAnimated = forwardRef<ButtonColoredArrowAnimatedRef, Props>(
  ({ className, tailClassName }, ref) => {
    const arrowTailRef = useRef<HTMLSpanElement | null>(null)
    const arrowFrontRef = useRef<HTMLImageElement | null>(null)

    useGSAP(() => {
      gsap.set(arrowTailRef.current, {
        width: 0,
        height: 2,
        opacity: 0,
      })

      gsap.set(arrowFrontRef.current, {
        x: 0,
      })
    }, [])

    const enter = () => {
      gsap.to(arrowTailRef.current, {
        width: 20,
        height: 2,
        opacity: 1,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      gsap.to(arrowFrontRef.current, {
        x: -5,
        duration: 0.1,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const leave = () => {
      gsap.to(arrowTailRef.current, {
        width: 0,
        height: 2,
        opacity: 0,
        duration: 0.25,
        ease: 'power3.inOut',
        overwrite: 'auto',
      })

      gsap.to(arrowFrontRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    useImperativeHandle(ref, () => ({
      enter,
      leave,
    }))

    return (
      <span className={`relative z-10 flex items-center justify-center ${className ?? ''}`}>
        <span
          ref={arrowTailRef}
          className={`block shrink-0 origin-right rounded-full bg-primary-1 ${tailClassName ?? ''}`}
        />

        <Image
          ref={arrowFrontRef}
          className="arrowFront shrink-0 w-[7px] lg:w-[8px] xl:w-[10px]"
          src={ArrowRightColored}
          alt="arrow right"
          width={10}
          height={10}
        />
      </span>
    )
  },
)

ButtonColoredArrowAnimated.displayName = 'ButtonColoredArrowAnimated'

export default ButtonColoredArrowAnimated
