'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import React, { useMemo, useRef } from 'react'

type AnimatedTextItem = {
  text?: string | null
}

type AnimatedHeadingData = {
  staticText?: string | null
  animatedTextPlacement?: 'same-line' | 'new-line' | string | null
  animatedTexts?: AnimatedTextItem[] | null
}

type Props = {
  data?: AnimatedHeadingData | null
}

const TYPE_CHAR_DURATION = 0.055
const DELETE_CHAR_DURATION = 0.032
const HOLD_DURATION = 1.05
const BETWEEN_WORD_DELAY = 0.18

function BasicHeroAnimatedHeading({ data }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const typedTextRef = useRef<HTMLSpanElement | null>(null)
  const cursorRef = useRef<HTMLSpanElement | null>(null)

  const animatedTexts = useMemo(() => {
    const items = Array.isArray(data?.animatedTexts) ? data.animatedTexts : []

    return items.map((item) => String(item?.text ?? '').trim()).filter(Boolean)
  }, [data?.animatedTexts])

  const staticText = String(data?.staticText ?? '').trim()
  const isNewLine = data?.animatedTextPlacement === 'new-line'

  useGSAP(
    () => {
      const typedText = typedTextRef.current
      const cursor = cursorRef.current

      if (!typedText || !animatedTexts.length) return

      typedText.textContent = ''

      const cursorTween = cursor
        ? gsap.to(cursor, {
            autoAlpha: 0,
            duration: 0.48,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
          })
        : null

      const tl = gsap.timeline({
        repeat: -1,
        defaults: {
          ease: 'none',
        },
      })

      animatedTexts.forEach((word) => {
        const typeState = {
          count: 0,
        }

        const deleteState = {
          count: word.length,
        }

        tl.set(typedText, {
          textContent: '',
        })

        tl.to(typeState, {
          count: word.length,
          duration: Math.max(0.35, word.length * TYPE_CHAR_DURATION),
          snap: {
            count: 1,
          },
          onUpdate: () => {
            typedText.textContent = word.slice(0, Math.round(typeState.count))
          },
        })

        tl.to({}, { duration: HOLD_DURATION })

        tl.to(deleteState, {
          count: 0,
          duration: Math.max(0.22, word.length * DELETE_CHAR_DURATION),
          snap: {
            count: 1,
          },
          onUpdate: () => {
            typedText.textContent = word.slice(0, Math.round(deleteState.count))
          },
        })

        tl.to({}, { duration: BETWEEN_WORD_DELAY })
      })

      return () => {
        tl.kill()
        cursorTween?.kill()
      }
    },
    {
      scope: rootRef,
      dependencies: [animatedTexts.join('|')],
    },
  )

  if (!animatedTexts.length) return null

  return (
    <div
      ref={rootRef}
      className="
        font-agency text-white-1 capitalize
        text-center lg:text-start
        leading-[112.5%]
        text-[40px] md:text-[48px] lg:text-[62px] xl:text-[80px] 2xl:text-[92px]
      "
    >
      {staticText && (
        <span>
          {staticText}
          {!isNewLine ? ' ' : ''}
        </span>
      )}

      {isNewLine && <br />}

      <span
        ref={typedTextRef}
        className="
          inline-block min-w-[8px]
          text-primary-2
          will-change-transform
        "
      />

      <span
        ref={cursorRef}
        className="
          ml-[4px] inline-block
          h-[0.78em] w-[3px]
          translate-y-[0.08em]
          rounded-full bg-primary-2
          md:w-[4px]
        "
      />
    </div>
  )
}

export default BasicHeroAnimatedHeading
