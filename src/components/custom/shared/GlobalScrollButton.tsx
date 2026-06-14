'use client'

import ButtonArrowAnimated, {
  ButtonArrowAnimatedRef,
} from '@/components/custom/sagar-ropes-shared/buttons/ButtonArrowAnimated'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import React, { useRef, useState } from 'react'

function GlobalScrollButton() {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const arrowWrapRef = useRef<HTMLSpanElement | null>(null)
  const arrowRef = useRef<ButtonArrowAnimatedRef | null>(null)

  const isTopModeRef = useRef(false)
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null)

  const [isTopMode, setIsTopMode] = useState(false)

  useGSAP(() => {
    const button = buttonRef.current
    const arrowWrap = arrowWrapRef.current

    if (!button || !arrowWrap) return

    gsap.set(button, {
      autoAlpha: 0,
      x: 20,
      pointerEvents: 'none',
    })

    // default: arrow points down
    gsap.set(arrowWrap, {
      rotate: 90,
      transformOrigin: 'center center',
    })

    const showButton = () => {
      gsap.to(button, {
        autoAlpha: 1,
        x: 0,
        duration: 0.45,
        ease: 'power3.out',
        pointerEvents: 'auto',
        overwrite: 'auto',
      })
    }

    const hideButton = () => {
      gsap.to(button, {
        autoAlpha: 0,
        x: 20,
        duration: 0.35,
        ease: 'power3.inOut',
        pointerEvents: 'none',
        overwrite: 'auto',
      })
    }

    const setScrollToTopMode = () => {
      if (isTopModeRef.current) return

      isTopModeRef.current = true
      setIsTopMode(true)

      // arrow points up
      gsap.to(arrowWrap, {
        rotate: -90,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const setScrollToBottomMode = () => {
      if (!isTopModeRef.current) return

      isTopModeRef.current = false
      setIsTopMode(false)

      // arrow points down
      gsap.to(arrowWrap, {
        rotate: 90,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: () => {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const docHeight = document.documentElement.scrollHeight

        const shouldShow = scrollY > 350
        const isNearBottom = scrollY + windowHeight >= docHeight - 650

        if (shouldShow) {
          showButton()
        } else {
          hideButton()
        }

        if (isNearBottom) {
          setScrollToTopMode()
        } else {
          setScrollToBottomMode()
        }
      },
    })

    return () => {
      trigger.kill()
      scrollTweenRef.current?.kill()
    }
  }, [])

  const handleMouseEnter = () => {
    arrowRef.current?.enter()
  }

  const handleMouseLeave = () => {
    arrowRef.current?.leave()
  }

  const handleClick = () => {
    const startY = window.scrollY

    const targetY = isTopModeRef.current
      ? 0
      : document.documentElement.scrollHeight - window.innerHeight

    scrollTweenRef.current?.kill()

    const scrollObject = {
      y: startY,
    }

    scrollTweenRef.current = gsap.to(scrollObject, {
      y: targetY,
      duration: 1.15,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onUpdate: () => {
        window.scrollTo(0, scrollObject.y)
      },
    })
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={isTopMode ? 'Scroll to top' : 'Scroll to bottom'}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        fixed right-[14px] xl:right-[20px] top-[69%] z-50
        hidden -translate-y-1/2
        items-center gap-[5px]
        md:flex md:flex-col justify-center 
        

        text-white-1
        mix-blend-difference
      "
    >
      <div
        className={`${isTopMode ? 'order-2' : 'order-1'}
          font-grift text-white-1 capitalize global-p6
          [writing-mode:vertical-rl]
          rotate-180
        `}
      >
        {isTopMode ? 'Scroll To Top' : 'Scroll To End'}
      </div>

      <span
        ref={arrowWrapRef}
        className={`${isTopMode ? 'order-1' : 'order-2'}
          relative flex h-[42px] w-[42px]
          items-center justify-center
          will-change-transform
        `}
      >
        <ButtonArrowAnimated ref={arrowRef} className="scale-90" tailClassName="bg-white-1" />
      </span>
    </button>
  )
}

export default GlobalScrollButton
