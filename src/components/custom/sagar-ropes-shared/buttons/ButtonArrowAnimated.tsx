// 'use client'

// import { gsap, useGSAP } from '@/lib/gsap'
// import Image from 'next/image'
// import ArrowRight from 'public/assets/icons/arrowright.png'
// import React, { forwardRef, useImperativeHandle, useRef } from 'react'

// export type ButtonArrowAnimatedRef = {
//   enter: () => void
//   leave: () => void
// }

// type Props = {
//   className?: string
//   tailClassName?: string
// }

// const ButtonArrowAnimated = forwardRef<ButtonArrowAnimatedRef, Props>(
//   ({ className, tailClassName }, ref) => {
//     const arrowTailRef = useRef<HTMLSpanElement | null>(null)
//     const arrowFrontRef = useRef<HTMLImageElement | null>(null)

//     useGSAP(() => {
//       gsap.set(arrowTailRef.current, {
//         width: 0,
//         height: 2,
//         opacity: 0,
//       })

//       gsap.set(arrowFrontRef.current, {
//         x: 0,
//       })
//     }, [])

//     const enter = () => {
//       gsap.to(arrowTailRef.current, {
//         width: 20,
//         height: 2,
//         opacity: 1,
//         duration: 0.3,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })

//       gsap.to(arrowFrontRef.current, {
//         x: -6,
//         duration: 0.1,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })
//     }

//     const leave = () => {
//       gsap.to(arrowTailRef.current, {
//         width: 0,
//         height: 2,
//         opacity: 0,
//         duration: 0.25,
//         ease: 'power3.inOut',
//         overwrite: 'auto',
//       })

//       gsap.to(arrowFrontRef.current, {
//         x: 0,
//         duration: 0.5,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })
//     }

//     useImperativeHandle(ref, () => ({
//       enter,
//       leave,
//     }))

//     return (
//       <span className={`relative z-10 flex items-center justify-center ${className ?? ''}`}>
//         <span
//           ref={arrowTailRef}
//           className={`block shrink-0 origin-right rounded-full bg-white-1 ${tailClassName ?? ''}`}
//         />

//         <Image
//           ref={arrowFrontRef}
//           className="arrowFront shrink-0 w-[7px] lg:w-[8px] xl:w-[10px]"
//           src={ArrowRight}
//           alt="arrow right"
//           width={10}
//           height={10}
//         />
//       </span>
//     )
//   },
// )

// ButtonArrowAnimated.displayName = 'ButtonArrowAnimated'

// export default ButtonArrowAnimated

'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import Image from 'next/image'
import ArrowRight from 'public/assets/icons/arrowright.png'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

export type ButtonArrowAnimatedRef = {
  enter: () => void
  leave: () => void
}

type ResponsiveNumber = {
  base?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

type Props = {
  className?: string
  tailClassName?: string
  tailWidth?: number
  tailHeight?: number | ResponsiveNumber
  arrowMoveX?: number
}

const getResponsiveValue = (
  value: number | ResponsiveNumber | undefined,
  fallback: number,
  screen: keyof ResponsiveNumber,
) => {
  if (typeof value === 'number') return value
  if (!value) return fallback

  return value[screen] ?? value.base ?? fallback
}

const ButtonArrowAnimated = forwardRef<ButtonArrowAnimatedRef, Props>(
  ({ className, tailClassName, tailWidth = 20, tailHeight = 2, arrowMoveX = -6 }, ref) => {
    const arrowTailRef = useRef<HTMLSpanElement | null>(null)
    const arrowFrontRef = useRef<HTMLImageElement | null>(null)
    const currentTailHeightRef = useRef(2)

    useGSAP(() => {
      const mm = gsap.matchMedia()

      mm.add('(max-width: 1023px)', () => {
        currentTailHeightRef.current = getResponsiveValue(tailHeight, 2, 'base')

        gsap.set(arrowTailRef.current, {
          width: 0,
          height: currentTailHeightRef.current,
          opacity: 0,
        })
      })

      mm.add('(min-width: 1024px) and (max-width: 1438px)', () => {
        currentTailHeightRef.current = getResponsiveValue(tailHeight, 2, 'lg')

        gsap.set(arrowTailRef.current, {
          width: 0,
          height: currentTailHeightRef.current,
          opacity: 0,
        })
      })

      mm.add('(min-width: 1439px) and (max-width: 1699px)', () => {
        currentTailHeightRef.current = getResponsiveValue(tailHeight, 2, 'xl')

        gsap.set(arrowTailRef.current, {
          width: 0,
          height: currentTailHeightRef.current,
          opacity: 0,
        })
      })

      mm.add('(min-width: 1700px)', () => {
        currentTailHeightRef.current = getResponsiveValue(tailHeight, 2, '2xl')

        gsap.set(arrowTailRef.current, {
          width: 0,
          height: currentTailHeightRef.current,
          opacity: 0,
        })
      })

      gsap.set(arrowFrontRef.current, {
        x: 0,
      })

      return () => {
        mm.revert()
      }
    }, [tailHeight])

    const enter = () => {
      gsap.to(arrowTailRef.current, {
        width: tailWidth,
        height: currentTailHeightRef.current,
        opacity: 1,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      gsap.to(arrowFrontRef.current, {
        x: arrowMoveX,
        duration: 0.1,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const leave = () => {
      gsap.to(arrowTailRef.current, {
        width: 0,
        height: currentTailHeightRef.current,
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
          className={`block shrink-0 origin-right rounded-full bg-white-1 ${tailClassName ?? ''}`}
        />

        <Image
          ref={arrowFrontRef}
          className="arrowFront shrink-0 w-[7px] lg:w-[8px] xl:w-[10px]"
          src={ArrowRight}
          alt="arrow right"
          width={10}
          height={10}
        />
      </span>
    )
  },
)

ButtonArrowAnimated.displayName = 'ButtonArrowAnimated'

export default ButtonArrowAnimated
