'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import Image from 'next/image'
import ArrowRight from 'public/assets/icons/arrowright.png'
import React, { useRef } from 'react'

type Props = {
  direction?: 'prev' | 'next'
  ariaLabel: string
  onClick?: () => void
  wrapperClassName?: string
  buttonClassName?: string
  expandedWidth?: number
  tailWidth?: number
  disabled?: boolean
}

const IDLE_BG = '#006C674D' // primary-1 30%
const HOVER_BG = '#008078'

function CarouselArrowButton({
  direction = 'next',
  ariaLabel,
  onClick,
  wrapperClassName,
  buttonClassName,
  expandedWidth,
  tailWidth,
  disabled = false,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const overlayRef = useRef<HTMLSpanElement | null>(null)
  const arrowTailRef = useRef<HTMLSpanElement | null>(null)
  const arrowFrontRef = useRef<HTMLImageElement | null>(null)
  const arrowGroupRef = useRef<HTMLSpanElement | null>(null)

  const isPrev = direction === 'prev'

  const getTailWidth = (buttonHeight: number) => {
    const autoTail =
      buttonHeight <= 30 ? 14 : buttonHeight <= 34 ? 16 : buttonHeight <= 38 ? 20 : 28

    const requestedTail = tailWidth ?? autoTail

    if (buttonHeight <= 30) return Math.min(requestedTail, 14)
    if (buttonHeight <= 34) return Math.min(requestedTail, 16)
    if (buttonHeight <= 38) return Math.min(requestedTail, 20)

    return requestedTail
  }

  const getTailHeight = (buttonHeight: number) => {
    if (buttonHeight <= 30) return 1.6
    if (buttonHeight <= 34) return 1.8
    if (buttonHeight <= 38) return 2

    return 2.2
  }

  const getArrowMoveX = (buttonHeight: number) => {
    if (buttonHeight <= 30) return -3.5
    if (buttonHeight <= 34) return -4
    if (buttonHeight <= 38) return -4.5

    return -6
  }

  const getExpandedWidth = (buttonHeight: number) => {
    const autoWidth =
      buttonHeight <= 30 ? 54 : buttonHeight <= 34 ? 60 : buttonHeight <= 38 ? 70 : 88

    const requestedWidth = expandedWidth ?? autoWidth

    if (buttonHeight <= 30) return Math.min(requestedWidth, 54)
    if (buttonHeight <= 34) return Math.min(requestedWidth, 60)
    if (buttonHeight <= 38) return Math.min(requestedWidth, 70)

    return requestedWidth
  }

  const setIdleState = () => {
    const button = buttonRef.current

    if (!button) return

    const buttonHeight = button.offsetHeight
    const tailHeight = getTailHeight(buttonHeight)

    if (buttonHeight > 0) {
      gsap.set(button, {
        width: buttonHeight,
        backgroundColor: IDLE_BG,
      })
    }

    gsap.set(overlayRef.current, {
      width: '0%',
      opacity: 0,
    })

    gsap.set(arrowTailRef.current, {
      width: 0,
      height: tailHeight,
      opacity: 0,
    })

    gsap.set(arrowFrontRef.current, {
      x: 0,
    })

    gsap.set(arrowGroupRef.current, {
      x: 0,
    })
  }

  useGSAP(() => {
    const frame = requestAnimationFrame(setIdleState)

    const handleResize = () => {
      setIdleState()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseEnter = () => {
    if (disabled) return

    const button = buttonRef.current

    if (!button) return

    const buttonHeight = button.offsetHeight
    const targetWidth = getExpandedWidth(buttonHeight)
    const targetTailWidth = getTailWidth(buttonHeight)
    const targetTailHeight = getTailHeight(buttonHeight)
    const arrowMoveX = getArrowMoveX(buttonHeight)

    const groupCenterFix = isPrev ? arrowMoveX / 2 : -arrowMoveX / 2

    gsap.killTweensOf([
      button,
      overlayRef.current,
      arrowTailRef.current,
      arrowFrontRef.current,
      arrowGroupRef.current,
    ])

    gsap.to(button, {
      width: targetWidth,
      backgroundColor: HOVER_BG,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(overlayRef.current, {
      width: '95%',
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(arrowTailRef.current, {
      width: targetTailWidth,
      height: targetTailHeight,
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

    gsap.to(arrowGroupRef.current, {
      x: groupCenterFix,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    const button = buttonRef.current

    if (!button) return

    const buttonHeight = button.offsetHeight
    const tailHeight = getTailHeight(buttonHeight)

    gsap.killTweensOf([
      button,
      overlayRef.current,
      arrowTailRef.current,
      arrowFrontRef.current,
      arrowGroupRef.current,
    ])

    gsap.to(button, {
      width: buttonHeight,
      backgroundColor: IDLE_BG,
      duration: 0.25,
      ease: 'power3.inOut',
      overwrite: 'auto',
    })

    gsap.to(overlayRef.current, {
      width: '0%',
      opacity: 0,
      duration: 0.25,
      ease: 'power3.inOut',
      overwrite: 'auto',
    })

    gsap.to(arrowTailRef.current, {
      width: 0,
      height: tailHeight,
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

    gsap.to(arrowGroupRef.current, {
      x: 0,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  return (
    <span className={`inline-flex overflow-visible ${wrapperClassName ?? ''}`}>
      <span
        className={`
          relative inline-flex overflow-visible
          size-[34px]
          md:size-[38px]
          xl:size-[44px]
          ${buttonClassName ?? ''}
        `}
      >
        <button
          ref={buttonRef}
          type="button"
          aria-label={ariaLabel}
          disabled={disabled}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          className={`
            absolute top-0
            ${isPrev ? 'right-0' : 'left-0'}
            isolate flex h-full items-center justify-center
            overflow-hidden rounded-full
            text-white-1
            transition-transform duration-300 ease-out
            active:scale-95
            disabled:pointer-events-none disabled:opacity-50
          `}
          style={{
            backgroundColor: IDLE_BG,
            boxShadow: `
              0 12px 18px rgba(0, 0, 0, 0.24),
              0 3px 8px rgba(0, 0, 0, 0.14)
            `,
          }}
        >
          <span
            ref={overlayRef}
            className={`
              pointer-events-none
              absolute top-0 z-0
              h-full
              bg-[#008078]
              ${isPrev ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full'}
            `}
          />

          <span
            ref={arrowGroupRef}
            className={`
              relative z-10 flex items-center justify-center
              ${isPrev ? 'rotate-180' : ''}
            `}
          >
            <span
              ref={arrowTailRef}
              className="
                block w-0 shrink-0 origin-right rounded-full bg-white-1 opacity-0
              "
            />

            <Image
              ref={arrowFrontRef}
              src={ArrowRight}
              alt=""
              width={10}
              height={10}
              className="
                shrink-0 object-contain
                w-[8px]
                md:w-[8.5px]
                lg:w-[9px]
                xl:w-[10px]
              "
              placeholder="blur"
              blurDataURL={ArrowRight.blurDataURL}
              quality={95}
            />
          </span>
        </button>
      </span>
    </span>
  )
}

export default CarouselArrowButton
