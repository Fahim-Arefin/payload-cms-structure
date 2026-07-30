'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import React, { useRef } from 'react'

type Props = {
  onClick: () => void
}

function AboutIntroPlayButton({ onClick }: Props) {
  const rootRef = useRef<HTMLButtonElement | null>(null)
  const fillRef = useRef<HTMLSpanElement | null>(null)
  const orbitRef = useRef<HTMLSpanElement | null>(null)
  const glowRef = useRef<HTMLSpanElement | null>(null)
  const iconRef = useRef<HTMLSpanElement | null>(null)

  useGSAP(
    () => {
      gsap.set(fillRef.current, {
        scale: 0,
        transformOrigin: 'center center',
      })

      gsap.set(iconRef.current, {
        color: 'rgb(var(--secondary-1))',
      })

      gsap.to(orbitRef.current, {
        rotate: 360,
        duration: 8,
        ease: 'none',
        repeat: -1,
      })

      gsap.fromTo(
        glowRef.current,
        {
          scale: 1,
          autoAlpha: 0.28,
        },
        {
          scale: 1.55,
          autoAlpha: 0,
          duration: 2.2,
          ease: 'power2.out',
          repeat: -1,
        },
      )
    },
    {
      scope: rootRef,
    },
  )

  const handleMouseEnter = () => {
    gsap.killTweensOf([fillRef.current, iconRef.current, rootRef.current])

    gsap.to(fillRef.current, {
      scale: 1,
      duration: 0.42,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(iconRef.current, {
      color: 'rgb(var(--white-1))',
      duration: 0.28,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    gsap.to(rootRef.current, {
      boxShadow: '0 14px 34px rgba(10,17,40,0.30)',
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    gsap.killTweensOf([fillRef.current, iconRef.current, rootRef.current])

    gsap.to(fillRef.current, {
      scale: 0,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(iconRef.current, {
      color: 'rgb(var(--secondary-1))',
      duration: 0.28,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    gsap.to(rootRef.current, {
      boxShadow: '0 10px 24px rgba(10,17,40,0.16)',
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  return (
    <button
      ref={rootRef}
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Play about us video"
      className="
        relative isolate flex items-center justify-center
        size-[38px]
        rounded-full
        border border-secondary-1
        bg-white-1/70
        text-secondary-1
        shadow-[0_10px_24px_rgba(10,17,40,0.16)]
        outline-none
        backdrop-blur-[10px]
        sm:size-[42px]
        md:size-[46px]
        lg:size-[52px]
        xl:size-[58px]
        2xl:size-[64px]
      "
    >
      {/* soft breathing glow */}
      <span
        ref={glowRef}
        className="
          pointer-events-none absolute inset-0 -z-20
          rounded-full
          bg-secondary-1/20
        "
      />

      {/* slow rotating broken ring */}
      <span
        ref={orbitRef}
        className="
          pointer-events-none absolute
          inset-[-7px] -z-10
          rounded-full
          opacity-70
        "
        style={{
          background: `
            conic-gradient(
              from 0deg,
              rgba(10, 17, 40, 0.00) 0deg,
              rgba(10, 17, 40, 0.00) 70deg,
              rgb(var(--secondary-1)) 90deg,
              rgba(10, 17, 40, 0.00) 125deg,
              rgba(10, 17, 40, 0.00) 250deg,
              rgb(var(--secondary-1)) 280deg,
              rgba(10, 17, 40, 0.00) 320deg,
              rgba(10, 17, 40, 0.00) 360deg
            )
          `,
          WebkitMask:
            'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 1px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 1px))',
        }}
      />

      {/* hover fill */}
      <span
        ref={fillRef}
        className="
          pointer-events-none absolute inset-0 -z-10
          rounded-full
          bg-secondary-1
        "
      />

      {/* play icon */}
      <span
        ref={iconRef}
        className="
          ml-[2px]
          block
          h-0 w-0
          border-y-[6px] border-l-[10px]
          border-y-transparent border-l-current
          sm:border-y-[7px] sm:border-l-[11px]
          md:border-y-[8px] md:border-l-[12px]
          lg:border-y-[9px] lg:border-l-[14px]
          xl:border-y-[10px] xl:border-l-[16px]
          2xl:border-y-[11px] 2xl:border-l-[18px]
        "
      />
    </button>
  )
}

export default AboutIntroPlayButton
