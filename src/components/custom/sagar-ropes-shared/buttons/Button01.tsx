// 'use client'

// import { Button } from '@/components/ui/button'
// import { gsap, useGSAP } from '@/lib/gsap'
// import Image from 'next/image'
// import ArrowRight from 'public/assets/icons/arrowright.png'
// import React, { useRef } from 'react'

// type Props = {
//   children?: React.ReactNode
//   className?: string
// } & React.ButtonHTMLAttributes<HTMLButtonElement>

// function Button01({ children, className, onMouseEnter, onMouseLeave, ...props }: Props) {
//   const overlayRef = useRef<HTMLSpanElement | null>(null)
//   const arrowTailRef = useRef<HTMLSpanElement | null>(null)
//   const arrowFrontRef = useRef<HTMLImageElement | null>(null)

//   useGSAP(() => {
//     gsap.set(overlayRef.current, {
//       width: '0%',
//       opacity: 0,
//     })

//     gsap.set(arrowTailRef.current, {
//       width: 0,
//       height: 2,
//       opacity: 0,
//     })

//     gsap.set(arrowFrontRef.current, {
//       x: 0,
//     })
//   }, [])

//   const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
//     onMouseEnter?.(event)

//     gsap.to(overlayRef.current, {
//       width: '95%',
//       opacity: 1,
//       duration: 0.3,
//       ease: 'power3.out',
//       overwrite: 'auto',
//     })

//     gsap.to(arrowTailRef.current, {
//       width: 20,
//       height: 2,
//       opacity: 1,
//       duration: 0.3,
//       ease: 'power3.out',
//       overwrite: 'auto',
//     })

//     gsap.to(arrowFrontRef.current, {
//       x: -5,
//       duration: 0.1,
//       ease: 'power3.out',
//       overwrite: 'auto',
//     })
//   }

//   const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
//     onMouseLeave?.(event)

//     gsap.to(overlayRef.current, {
//       width: '0%',
//       opacity: 0,
//       duration: 0.25,
//       ease: 'power3.inOut',
//       overwrite: 'auto',
//     })

//     gsap.to(arrowTailRef.current, {
//       width: 0,
//       height: 2,
//       opacity: 0,
//       duration: 0.25,
//       ease: 'power3.inOut',
//       overwrite: 'auto',
//     })

//     gsap.to(arrowFrontRef.current, {
//       x: 0,
//       duration: 0.5,
//       ease: 'power3.out',
//       overwrite: 'auto',
//     })
//   }

//   return (
//     <Button
//       {...props}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       className={`
//         relative isolate overflow-hidden
//         inline-flex items-center justify-center
//         font-grift global-btn font-bold
//         text-white-1
//         bg-primary-1 hover:bg-primary-1
//         rounded-[8px] lg:rounded-[12px] xl:rounded-[15px]
//         h-[35px] lg:h-[40px] xl:h-[52px]
//         px-[12px] lg:px-[18px] xl:px-[24px]
//         ${className ?? ''}
//       `}
//       style={{
//         // backdropFilter: 'blur(10px)',
//         WebkitBackdropFilter: 'blur(10px)',
//         boxShadow: '0 10px 24px rgba(0, 108, 103, 0.28)',
//       }}
//     >
//       {/* Hover overlay - stays below text and stroke */}
//       <span
//         ref={overlayRef}
//         className="
//           pointer-events-none
//           absolute left-0 top-0 z-0
//           rounded-r-[15px]
//           h-full
//           bg-[#6EC9C71A]
//           backdrop-blur-[10px]
//         "
//       />

//       {/* Button text */}
//       <span className="relative z-10 pr-1 xl:pr-1.5">{children}</span>

//       {/* Arrow */}
//       <span className="relative z-10 flex items-center justify-center">
//         <span ref={arrowTailRef} className="block shrink-0 origin-right rounded-full bg-white-1" />

//         <Image
//           ref={arrowFrontRef}
//           className="arrowFront shrink-0 w-[7px] lg:w-[8px] xl:w-[10px]"
//           src={ArrowRight}
//           alt="arrow right"
//           width={10}
//           height={10}
//         />
//       </span>

//       <span
//         aria-hidden="true"
//         className="
//     pointer-events-none
//     absolute inset-0 z-20
//     rounded-[8px] lg:rounded-[12px] xl:rounded-[15px]
//   "
//         style={{
//           boxShadow: `
//       inset 0 0 0 1px rgba(110, 201, 199, 0.65),
//       inset 1.5px 1.5px 0 rgba(255, 251, 252, 0.45),
//       inset -1.5px -1.5px 0 rgba(255, 251, 252, 0.28),
//       inset 0 -2px 8px rgba(110, 201, 199, 0.35),
//       0 0 0 1px rgba(110, 201, 199, 0.35),
//       0 8px 18px rgba(0, 108, 103, 0.35)
//     `,
//         }}
//       />
//     </Button>
//   )
// }

// export default Button01

'use client'

import { Button } from '@/components/ui/button'
import { gsap, useGSAP } from '@/lib/gsap'
import React, { useRef } from 'react'
import ButtonArrowAnimated, { ButtonArrowAnimatedRef } from './ButtonArrowAnimated'

type Props = {
  children?: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button01({ children, className, onMouseEnter, onMouseLeave, ...props }: Props) {
  const overlayRef = useRef<HTMLSpanElement | null>(null)
  const arrowRef = useRef<ButtonArrowAnimatedRef | null>(null)

  useGSAP(() => {
    gsap.set(overlayRef.current, {
      width: '0%',
      opacity: 0,
    })
  }, [])

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(event)

    gsap.to(overlayRef.current, {
      width: '95%',
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    arrowRef.current?.enter()
  }

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(event)

    gsap.to(overlayRef.current, {
      width: '0%',
      opacity: 0,
      duration: 0.25,
      ease: 'power3.inOut',
      overwrite: 'auto',
    })

    arrowRef.current?.leave()
  }

  return (
    <Button
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative isolate overflow-hidden
        inline-flex items-center justify-center
        font-grift global-btn font-bold
        text-white-1
        bg-primary-1 hover:bg-primary-1
        rounded-[8px] lg:rounded-[12px] xl:rounded-[15px]
        h-[35px] lg:h-[40px] xl:h-[52px]
        px-[12px] lg:px-[18px] xl:px-[24px]
        ${className ?? ''}
      `}
      style={{
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 10px 24px rgba(0, 108, 103, 0.28)',
      }}
    >
      <span
        ref={overlayRef}
        className="
          pointer-events-none
          absolute left-0 top-0 z-0
          rounded-r-[15px]
          h-full
          bg-[#6EC9C71A]
          backdrop-blur-[10px]
        "
      />

      <span className="relative z-10 pr-1 xl:pr-1.5">{children}</span>

      <ButtonArrowAnimated ref={arrowRef} />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-20
          rounded-[8px] lg:rounded-[12px] xl:rounded-[15px]
        "
        style={{
          boxShadow: `
            inset 0 0 0 1px rgba(110, 201, 199, 0.65),
            inset 1.5px 1.5px 0 rgba(255, 251, 252, 0.45),
            inset -1.5px -1.5px 0 rgba(255, 251, 252, 0.28),
            inset 0 -2px 8px rgba(110, 201, 199, 0.35),
            0 0 0 1px rgba(110, 201, 199, 0.35),
            0 8px 18px rgba(0, 108, 103, 0.35)
          `,
        }}
      />
    </Button>
  )
}

export default Button01
