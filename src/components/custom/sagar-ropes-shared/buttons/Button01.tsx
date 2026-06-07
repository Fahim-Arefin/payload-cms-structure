// 'use client'

// import { Button } from '@/components/ui/button'
// import { gsap, useGSAP } from '@/lib/gsap'
// import React, { useRef } from 'react'

// type Props = {
//   children?: React.ReactNode
//   className?: string
// } & React.ButtonHTMLAttributes<HTMLButtonElement>

// function Button01({ children, className, ...props }: Props) {
//   const btnRef = useRef<HTMLButtonElement | null>(null)
//   const overlayRef = useRef<HTMLDivElement | null>(null)

//   useGSAP(
//     () => {
//       if (!btnRef.current || !overlayRef.current) return

//       const btn = btnRef.current
//       const overlay = overlayRef.current

//       // Initial overlay state
//       gsap.set(overlay, {
//         width: '0%',
//         opacity: 0,
//       })

//       const handleMouseEnter = () => {
//         gsap.to(overlay, {
//           width: '100%',
//           opacity: 1,
//           duration: 0.45,
//           ease: 'power3.out',
//         })
//       }

//       const handleMouseLeave = () => {
//         gsap.to(overlay, {
//           width: '0%',
//           opacity: 0,
//           duration: 0.35,
//           ease: 'power3.inOut',
//         })
//       }

//       btn.addEventListener('mouseenter', handleMouseEnter)
//       btn.addEventListener('mouseleave', handleMouseLeave)

//       return () => {
//         btn.removeEventListener('mouseenter', handleMouseEnter)
//         btn.removeEventListener('mouseleave', handleMouseLeave)
//       }
//     },
//     {
//       scope: btnRef,
//     },
//   )

//   return (
//     <Button
//       {...props}
//       ref={btnRef}
//       onMouseEnter={(e) => {
//         props.onMouseEnter?.(e)
//       }}
//       onMouseLeave={(e) => {
//         props.onMouseLeave?.(e)
//       }}
//       className={`
//         relative overflow-hidden
//         font-grift global-btn font-bold
//         text-white-1
//         bg-primary-1 hover:bg-primary-1
//         rounded-[15px]
//         h-7 xl:h-[52px]
//         px-[24px]
//         py-[16px]
//         ${className ?? ''}
//       `}
//       style={{
//         boxShadow:
//           '0 0 5px 0 rgba(242, 242, 242, 0.50) inset, 0 0 0 1px #999 inset, 2px 2px 1px -2px #B3B3B3 inset, -2px -2px 1px -2px #B3B3B3 inset, 3px 3px 0 -3px rgba(0, 0, 0, 0.50) inset',
//       }}
//     >
//       {/* Hover overlay */}
//       <span
//         ref={overlayRef}
//         className="
//           pointer-events-none
//           absolute left-0 top-0 z-0
//           h-full
//           bg-[#6EC9C71A]
//           backdrop-blur-[10px]
//         "
//       />

//       {/* Button text */}
//       <span className="z-10 pr-1 xl:pr-1.5">{children}</span>
//     </Button>
//   )
// }

// export default Button01

// // ready
// 'use client'

// import { Button } from '@/components/ui/button'
// import { gsap, useGSAP } from '@/lib/gsap'
// import React, { useRef } from 'react'
// import ArrowRight from 'public/assets/icons/arrowright.png'
// import Image from 'next/image'

// type Props = {
//   children?: React.ReactNode
//   className?: string
// } & React.ButtonHTMLAttributes<HTMLButtonElement>

// function Button01({ children, className, onMouseEnter, onMouseLeave, ...props }: Props) {
//   const overlayRef = useRef<HTMLSpanElement | null>(null)
//   const btnRef = useRef<HTMLButtonElement | null>(null)
//   const arrowTailRef = useRef<HTMLDivElement | null>(null)
//   const arrowFrontRef = useRef<HTMLImageElement | null>(null)

//   useGSAP(() => {
//     if (!overlayRef.current) return

//     gsap.set(overlayRef.current, {
//       width: '0%',
//       opacity: 0,
//     })
//   }, [])

//   const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
//     onMouseEnter?.(event)

//     if (!overlayRef.current) return

//     gsap.to(overlayRef.current, {
//       width: '95%',
//       opacity: 1,
//       duration: 0.65,
//       ease: 'power3.out',
//       overwrite: 'auto',
//     })

//     gsap.to(arrowTailRef.current, {
//       width: '20px',
//       height: '2px',
//       duration: 0.65,
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

//     if (!overlayRef.current) return

//     gsap.to(overlayRef.current, {
//       width: '0%',
//       opacity: 0,
//       duration: 0.55,
//       ease: 'power3.inOut',
//       overwrite: 'auto',
//     })

//     gsap.to(arrowTailRef.current, {
//       width: '0px',
//       height: '0px',
//       duration: 0.55,
//       ease: 'power3.inOut',
//       overwrite: 'auto',
//     })

//     gsap.to(arrowFrontRef.current, {
//       x: 0,
//       duration: 1,
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
//         relative overflow-hidden
//         font-grift global-btn font-bold
//         text-white-1
//         bg-primary-1 hover:bg-primary-1
//         rounded-[15px]
//         h-7 xl:h-[52px]
//         px-[24px]
//         py-[16px]
//         ${className ?? ''}
//       `}
//       style={{
//         boxShadow:
//           '0 0 5px 0 rgba(242, 242, 242, 0.50) inset, 0 0 0 1px #999 inset, 2px 2px 1px -2px #B3B3B3 inset, -2px -2px 1px -2px #B3B3B3 inset, 3px 3px 0 -3px rgba(0, 0, 0, 0.50) inset',
//       }}
//       // style={{
//       //   boxShadow:
//       //     '3px 3px 0px -3px rgba(0, 0, 0, 0.50) inset, -2px -2px 1px -2px #B3B3B3 inset, 2px 2px 1px -2px #B3B3B3 inset, 0px 0px 0px 1px #999999 inset, 0px 0px 22px rgba(242, 242, 242, 0.50) inset',
//       //   backdropFilter: 'blur(10px)',
//       //   WebkitBackdropFilter: 'blur(10px)',
//       // }}
//     >
//       {/* Hover overlay */}
//       <span
//         ref={overlayRef}
//         className="
//           pointer-events-none
//           absolute left-0 right-0 z-0
//           h-full
//           bg-[#6EC9C71A]
//           backdrop-blur-[10px]
//         "
//       />

//       {/* Button text */}
//       <span className="relative z-10 pr-1 xl:pr-1.5">{children}</span>
//       <div className="relative z-10 flex justify-center items-center">
//         <span className="bg-white-1 transform origin-right" ref={arrowTailRef}></span>
//         <Image
//           className="arrowFront"
//           src={ArrowRight}
//           alt="arrow right"
//           width={10}
//           height={10}
//           ref={arrowFrontRef}
//         />
//       </div>
//     </Button>
//   )
// }

// export default Button01

// ready
'use client'

import { Button } from '@/components/ui/button'
import { gsap, useGSAP } from '@/lib/gsap'
import Image from 'next/image'
import ArrowRight from 'public/assets/icons/arrowright.png'
import React, { useRef } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button01({ children, className, onMouseEnter, onMouseLeave, ...props }: Props) {
  const overlayRef = useRef<HTMLSpanElement | null>(null)
  const arrowTailRef = useRef<HTMLSpanElement | null>(null)
  const arrowFrontRef = useRef<HTMLImageElement | null>(null)

  useGSAP(() => {
    gsap.set(overlayRef.current, {
      width: '0%',
      opacity: 0,
    })

    gsap.set(arrowTailRef.current, {
      width: 0,
      height: 2,
      opacity: 0,
    })

    gsap.set(arrowFrontRef.current, {
      x: 0,
    })
  }, [])

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(event)

    gsap.to(overlayRef.current, {
      width: '95%',
      opacity: 1,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(arrowTailRef.current, {
      width: 20,
      height: 2,
      opacity: 1,
      duration: 0.55,
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

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(event)

    gsap.to(overlayRef.current, {
      width: '0%',
      opacity: 0,
      duration: 0.45,
      ease: 'power3.inOut',
      overwrite: 'auto',
    })

    gsap.to(arrowTailRef.current, {
      width: 0,
      height: 2,
      opacity: 0,
      duration: 0.45,
      ease: 'power3.inOut',
      overwrite: 'auto',
    })

    gsap.to(arrowFrontRef.current, {
      x: 0,
      duration: 0.85,
      ease: 'power3.out',
      overwrite: 'auto',
    })
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
        rounded-[15px]
        h-7 xl:h-[52px]
        px-[24px]
        py-[16px]
        ${className ?? ''}
      `}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 10px 24px rgba(0, 108, 103, 0.28)',
      }}
    >
      {/* Hover overlay - stays below text and stroke */}
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

      {/* Button text */}
      <span className="relative z-10 pr-1 xl:pr-1.5">{children}</span>

      {/* Arrow */}
      <span className="relative z-10 flex items-center justify-center">
        <span ref={arrowTailRef} className="block shrink-0 origin-right rounded-full bg-white-1" />

        <Image
          ref={arrowFrontRef}
          className="arrowFront shrink-0"
          src={ArrowRight}
          alt="arrow right"
          width={10}
          height={10}
        />
      </span>

      {/* Stroke / inset shadow layer - always above overlay */}
      {/* <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-20
          rounded-[15px]
        "
        style={{
          boxShadow: BUTTON_STROKE_SHADOW,
        }}
      /> */}
      {/* Stroke / inset shadow layer - always above overlay */}
      <span
        aria-hidden="true"
        className="
    pointer-events-none
    absolute inset-0 z-20
    rounded-[15px]
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
