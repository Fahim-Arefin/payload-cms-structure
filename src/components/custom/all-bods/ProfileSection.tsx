'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Directors } from '@/types'
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'

// If you already have a language hook/context, use that instead of the `lang` prop.
type Props = {
  data: Directors
  titleColor: string
  reverse?: boolean
  /** Current UI language; pass from your language store/context if you have one */
  lang?: 'en' | 'bn'
}

export const ProfileSection: React.FC<Props> = ({
  data,
  titleColor,
  reverse = false,
  lang = 'en', // fallback if not provided
}) => {
  const [expanded, setExpanded] = useState(false)
  const [canClamp, setCanClamp] = useState(false) // whether content needs clamping (measured only when collapsed)
  const textRef = useRef<HTMLParagraphElement>(null)

  // Reset state on language change so EN state doesn't leak into BN (and vice versa)
  useEffect(() => {
    setExpanded(false)
    setCanClamp(false)
  }, [lang])

  // Measure clamping only when collapsed
  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const checkIfTextClamped = () => {
      if (expanded) return // don't invalidate while expanded
      requestAnimationFrame(() => {
        if (!el) return
        const overflowing = el.scrollHeight > el.clientHeight
        setCanClamp(overflowing)
      })
    }

    // initial measurement
    checkIfTextClamped()

    // font load can change line breaks (esp. Bangla glyphs)
    // @ts-ignore
    if (document?.fonts?.ready) {
      // @ts-ignore
      document.fonts.ready.then(checkIfTextClamped).catch(() => {})
    }

    // observe size and text changes
    const ro = new ResizeObserver(checkIfTextClamped)
    ro.observe(el)

    const mo = new MutationObserver(checkIfTextClamped)
    mo.observe(el, { childList: true, characterData: true, subtree: true })

    const onResize = () => checkIfTextClamped()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      mo.disconnect()
    }
    // Re-measure when either description changes, language flips, or when you collapse back
  }, [data.description, data.descriptionBN, lang, expanded])

  return (
    <div id={`id-${data.id}`} className="container-padding">
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] lg:grid-cols-[1fr_2fr] gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-start',
          reverse && 'md:grid-cols-[1.8fr_1.2fr] lg:grid-cols-[2fr_1fr]',
        )}
      >
        {/* Image block */}
        <div
          className={cn(
            'w-full flex justify-start items-start',
            reverse ? 'md:order-2' : 'md:order-1',
          )}
        >
          <div className="relative rounded-md lg:rounded-lg xl:rounded-xl w-full max-w-[400px] h-[400px] md:h-[250px] lg:h-[300px] xl:h-[480px] shadow-md">
            <Image
              fill
              src={data.image}
              alt={data.title}
              className="rounded-md lg:rounded-lg xl:rounded-xl object-cover"
              sizes="(max-width:767px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Content block */}
        <div
          className={cn(
            'flex flex-col justify-start items-start h-full',
            reverse ? 'md:order-1' : 'md:order-2',
          )}
        >
          {/* Use inline style for dynamic colors (Tailwind can't parse runtime tokens) */}
          <h2 className="global-h2 font-semibold mb-1 uppercase" style={{ color: titleColor }}>
            <LocalizedText en={data?.title} bn={data?.titleBN} />
          </h2>

          <div className="font-medium global-span text-[#444] mb-1 uppercase">
            <LocalizedText en={data?.designation} bn={data?.designationBN} />
          </div>

          <div className="border w-full border-[#000000] mb-4 xl:mb-8" />

          <div className="transition-all duration-300 overflow-hidden">
            <p
              // Remount when language changes to ensure clean measurement per language
              key={`${lang}-${data.id}`}
              ref={textRef}
              className={cn(
                'text-[#444] font-normal text-justify text-base leading-7 xl:leading-10 md:global-p1',
                !expanded && 'line-clamp-5 lg:line-clamp-5 xl:line-clamp-5',
              )}
            >
              <LocalizedText en={data?.description} bn={data?.descriptionBN} />
            </p>
          </div>

          {(canClamp || expanded) && (
            <button
              className="mt-2 text-[#ED7125] hover:underline text-sm font-semibold w-fit"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              {expanded ?  <LocalizedText en={`Read Less`} bn={`কম পড়ুন`} /> : <LocalizedText en={`Read More`} bn={`আরো পড়ুন`} />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
