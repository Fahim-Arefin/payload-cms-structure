// import { EmployeeBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import Frame from 'public/assets/images/Imgframe.png'
// import Image from 'next/image'

// type Props = {
//   employee: EmployeeBlockType['employeeGroup']['employees'][number]
// }

// function EmployeeCard({ employee }: Props) {
//   return (
//     <div className="">
//       {/* image frame */}
//       <div className="relative aspect-[1/1] w-full ">
//         <Image
//           src={Frame}
//           alt="hero bg image"
//           fill
//           className="z-0 object-cover object-center"
//           sizes="100vw"
//           priority
//           quality={100}
//           placeholder="blur"
//           blurDataURL={Frame?.blurDataURL}
//         />
//         {/* employee image */}
//         <div className="absolute inset-0 aspect-[1/1] scale-[56%] w-full ">
//           {typeof employee.employeeImage === 'object' && employee.employeeImage?.url && (
//             <Image
//               src={employee.employeeImage.url}
//               alt="hero image background"
//               fill
//               className="object-cover object-center"
//               sizes="100vw"
//               priority
//               quality={100}
//               placeholder={employee?.employeeImageBlurDataURL ? 'blur' : 'empty'}
//               blurDataURL={employee?.employeeImageBlurDataURL || undefined}
//             />
//           )}
//         </div>
//       </div>
//       <div className=" text-center -mt-[15%]">
//         <div className="global-h7 text-secondary-1 font-agency leading-[33.75px]">
//           {employee.employeeName}
//         </div>
//         <div className="global-p4 text-secondary-1 font-grift leading-[30px]">
//           {employee.designation}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EmployeeCard

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import { EmployeeBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Frame from 'public/assets/images/Imgframe.png'
import React, { useRef } from 'react'

type EmployeeItem = NonNullable<
  NonNullable<EmployeeBlockType['employeeGroup']>['employees']
>[number]

type Props = {
  employee: EmployeeItem
}

const EMPLOYEE_IMAGE_HOVER_SCALE = 60 / 56

function EmployeeCard({ employee }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const frameImageRef = useRef<HTMLDivElement | null>(null)
  const employeeImageMoverRef = useRef<HTMLDivElement | null>(null)
  const employeeImageBoxRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      gsap.set(frameRef.current, {
        scale: 1,
        rotate: 0,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        force3D: true,
      })

      gsap.set(frameImageRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        force3D: true,
      })

      gsap.set(employeeImageMoverRef.current, {
        x: 0,
        y: 0,
        rotate: 0,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        force3D: true,
      })

      gsap.set(employeeImageBoxRef.current, {
        scale: 1,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        force3D: true,
      })

      gsap.set(textRef.current, {
        y: 0,
        force3D: true,
      })
    },
    {
      scope: cardRef,
    },
  )

  const handleMouseEnter = () => {
    gsap.killTweensOf([
      frameRef.current,
      frameImageRef.current,
      employeeImageMoverRef.current,
      employeeImageBoxRef.current,
      textRef.current,
    ])

    gsap.to(frameRef.current, {
      scale: 1.025,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(frameImageRef.current, {
      scale: 1.015,
      rotate: -0.35,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(employeeImageMoverRef.current, {
      y: -10,
      rotate: -1,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(employeeImageBoxRef.current, {
      scale: EMPLOYEE_IMAGE_HOVER_SCALE,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(textRef.current, {
      y: 4,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const frame = frameRef.current
    if (!frame) return

    const rect = frame.getBoundingClientRect()

    const xProgress = (event.clientX - rect.left) / rect.width - 0.5
    const yProgress = (event.clientY - rect.top) / rect.height - 0.5

    const moveX = xProgress * 18
    const moveY = yProgress * 16 - 10
    const rotate = xProgress * 3

    gsap.to(employeeImageMoverRef.current, {
      x: moveX,
      y: moveY,
      rotate,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(employeeImageBoxRef.current, {
      scale: EMPLOYEE_IMAGE_HOVER_SCALE,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(frameImageRef.current, {
      x: xProgress * -4,
      y: yProgress * -4,
      rotate: xProgress * -0.9,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    gsap.killTweensOf([
      frameRef.current,
      frameImageRef.current,
      employeeImageMoverRef.current,
      employeeImageBoxRef.current,
      textRef.current,
    ])

    gsap.to(frameRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(frameImageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.75,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(employeeImageMoverRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.75,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(employeeImageBoxRef.current, {
      scale: 1,
      duration: 0.75,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(textRef.current, {
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  return (
    <div ref={cardRef} className="group">
      {/* image frame */}
      <div
        ref={frameRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          relative aspect-square w-full cursor-pointer
          will-change-transform
          [backface-visibility:hidden]
          [transform-style:preserve-3d]
        "
      >
        <div
          ref={frameImageRef}
          className="
            absolute inset-0 z-0
            will-change-transform
            [backface-visibility:hidden]
            [transform:translateZ(0)]
          "
        >
          <Image
            src={Frame}
            alt="Employee image frame"
            fill
            className="
              object-cover object-center
              [backface-visibility:hidden]
              [transform:translateZ(0)]
            "
            sizes="100vw"
            priority
            quality={100}
            placeholder="blur"
            blurDataURL={Frame?.blurDataURL}
          />
        </div>

        {/* employee image movement wrapper */}
        <div
          ref={employeeImageMoverRef}
          className="
            absolute inset-0 z-10
            will-change-transform
            [backface-visibility:hidden]
            [transform-style:preserve-3d]
          "
        >
          {/* employee image base 56%, hover visual scale = 60% */}
          <div
            ref={employeeImageBoxRef}
            className="
              absolute left-1/2 top-1/2
              h-[56%] w-[56%]
              -translate-x-1/2 -translate-y-1/2
              overflow-hidden
              will-change-transform
              [backface-visibility:hidden]
              [transform-style:preserve-3d]
            "
          >
            {typeof employee.employeeImage === 'object' && employee.employeeImage?.url && (
              <Image
                src={employee.employeeImage.url}
                alt={employee.employeeName || 'Employee image'}
                fill
                className="
                  object-cover object-center
                  [backface-visibility:hidden]
                  [transform:translateZ(0)]
                "
                sizes="100vw"
                priority
                quality={100}
                placeholder={employee?.employeeImageBlurDataURL ? 'blur' : 'empty'}
                blurDataURL={employee?.employeeImageBlurDataURL || undefined}
              />
            )}
          </div>
        </div>
      </div>

      <div
        ref={textRef}
        className="-mt-[15%] text-center will-change-transform 
      
      lg:space-y-0.5 xl:space-y-1"
      >
        <div className="font-agency global-h6 lg:global-h7 leading-[33.75px] text-secondary-1">
          {employee.employeeName}
        </div>

        <div className="font-grift global-p4 leading-[30px] text-secondary-1">
          {employee.designation}
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
