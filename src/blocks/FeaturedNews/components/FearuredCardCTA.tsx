'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import { buildNewsHref } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import ArrowRightColored from 'public/assets/icons/arrowRightColored2.png'
import React, { useRef } from 'react'

type ResponsiveNumber = {
  base?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

type CtaButtonData = {
  label?: string | null
  style?: 'btn01' | 'btn02' | string | null
  buttonLink?: any
  sectionId?: string | null
}

type Props = {
  ctaButton?: CtaButtonData | null
  itemId?: string | null
  detailsPage?: boolean
  className?: string
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

function FearuredCardCTA({ ctaButton, itemId, detailsPage = false, className }: Props) {
  const arrowTailRef = useRef<HTMLSpanElement | null>(null)
  const arrowFrontRef = useRef<HTMLImageElement | null>(null)
  const currentTailHeightRef = useRef(2)

  const buttonLabel = ctaButton?.label || 'Read More'

  const href = buildNewsHref({
    buttonLink: ctaButton?.buttonLink,
    sectionId: ctaButton?.sectionId,
    itemId: itemId || '',
    detail: !detailsPage,
  })

  const isSecondary = ctaButton?.style === 'btn02'

  const tailWidth = 20
  const tailHeight: number | ResponsiveNumber = {
    base: 2,
    lg: 2,
    xl: 2,
    '2xl': 2,
  }
  const arrowMoveX = -6

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
  }, [])

  const handleMouseEnter = () => {
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

  const handleMouseLeave = () => {
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

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className={`
        inline-flex items-center justify-start
        font-grift global-p5 font-bold
        outline-none
        ${isSecondary ? 'text-secondary-1' : 'text-primary-2'}
        ${className ?? ''}
      `}
    >
      <span className="relative z-10 pr-1 xl:pr-1.5">{buttonLabel}</span>

      <span className="relative z-10 flex items-center justify-center">
        <span
          ref={arrowTailRef}
          className={`
            block shrink-0 origin-right rounded-full
            ${isSecondary ? 'bg-secondary-1' : 'bg-primary-2'}
          `}
        />

        <Image
          ref={arrowFrontRef}
          src={ArrowRightColored}
          alt=""
          width={10}
          height={10}
          className={`
            shrink-0
            w-[7px] lg:w-[8px] xl:w-[10px]
            ${isSecondary ? 'brightness-0' : ''}
          `}
          placeholder="blur"
          blurDataURL={ArrowRightColored.blurDataURL}
          quality={95}
        />
      </span>
    </Link>
  )
}

export default FearuredCardCTA
