'use client'

import React, { useEffect, useRef, useState } from 'react'
import EllipseDecoration from './EllipseDecoration'
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'
import LocalizedString from '../shared/LocalizedString'
import { CareerPageResourcesBlockType } from '@/types/payloadCustomTypes'
import { cn } from '@/lib/utils'

type ResourceCardProps = {
  data: CareerPageResourcesBlockType['cards'][0]
  readMoreButtonText?: string
  readMoreButtonTextBN?: string
  readLessButtonText?: string
  readLessButtonTextBN?: string
  /** Optional, in case you want to reset on language change like ProfileSection */
  lang?: 'en' | 'bn'
}

function ResourceCard({
  data,
  readMoreButtonText,
  readMoreButtonTextBN,
  readLessButtonText,
  readLessButtonTextBN,
  lang = 'en', // only used to reset state / remount text, LocalizedText still controls actual language
}: ResourceCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [canClamp, setCanClamp] = useState(false) // whether content actually overflows
  const textRef = useRef<HTMLParagraphElement | null>(null)

  // Reset on language change so EN state doesn't leak into BN and vice versa
  useEffect(() => {
    setExpanded(false)
    setCanClamp(false)
  }, [lang])

  // Measure overflow only when collapsed (same idea as ProfileSection)
  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const checkIfTextClamped = () => {
      if (expanded) return // don't mess with state while expanded

      requestAnimationFrame(() => {
        if (!el) return
        const overflowing = el.scrollHeight > el.clientHeight
        setCanClamp(overflowing)
      })
    }

    // initial measure
    checkIfTextClamped()

    // fonts can change metrics (esp. Bangla glyphs)
    // @ts-ignore
    if (document?.fonts?.ready) {
      // @ts-ignore
      document.fonts.ready.then(checkIfTextClamped).catch(() => {})
    }

    // observe layout changes
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
  }, [data.description, data.descriptionBN, lang, expanded])

  return (
    <>
      {typeof data?.image === 'object' && data?.image?.url && (
        <div className="relative bg-[#F9F4EE] rounded-[18px] px-4 py-6 md:py-8 md:px-7 xl:px-8 w-[300px] md:w-[500px] flex flex-col justify-between shadow-[0_2px_8px_0_rgba(51,51,51,0.04)] overflow-visible">
          {/* 4 Ellipse Overlays */}
          <EllipseDecoration />

          {/* Description */}
          <div className="mb-8">
            <div className="transition-all duration-300 overflow-hidden">
              <p
                key={`${lang}-${data.id ?? data.title}`} // remount per language for clean measurement
                ref={textRef}
                className={cn(
                  'text-[#434342] text-[12px] md:text-[14px] xl:text-[16px]',
                  !expanded && 'line-clamp-2 lg:line-clamp-2 xl:line-clamp-2',
                )}
              >
                <LocalizedText en={data?.description} bn={data?.descriptionBN} />
              </p>
            </div>

            {(canClamp || expanded) && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="group flex items-center gap-1 mt-4 text-[#ED7125] font-bold text-[13px] md:text-[14px] uppercase tracking-tight transition-colors hover:text-[#d76420]"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <LocalizedString
                    en={readLessButtonText || 'Read Less'}
                    bn={readLessButtonTextBN || 'কম পড়ুন'}
                  />
                ) : (
                  <LocalizedString
                    en={readMoreButtonText || 'Read More'}
                    bn={readMoreButtonTextBN || 'আরও পড়ুন'}
                  />
                )}
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="#ED7125"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
                </svg>
              </button>
            )}
          </div>

          {/* Avatar & Name/Designation */}
          <div className="flex items-center mt-auto gap-4">
            <div>
              <div className="absolute left-[-23px] bottom-[-23px] w-[70px] h-[70px]">
                <Image
                  src={data?.image?.url}
                  alt={data.title}
                  fill
                  blurDataURL={data?.imageBlurDataURL || ''}
                  quality={80}
                  placeholder="blur"
                  sizes="( min-width: 768px) 70px"
                  className="rounded-full hidden md:block relative z-20 object-cover"
                />
                <Image
                  src={data?.image?.url}
                  alt={data.title}
                  blurDataURL={data?.imageBlurDataURL || ''}
                  fill
                  placeholder="blur"
                  quality={80}
                  sizes="( max-width: 768px) 70px"
                  className="rounded-full block md:hidden relative z-20 w-[70px] h-[70px] object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col ml-12 md:ml-10">
              <span className="text-[#434342] font-semibold text-[12px] md:text-[14px] xl:text-[16px]">
                <LocalizedText en={data?.title} bn={data?.titleBN} />
              </span>
              <span className="text-[#434342] font-light uppercase text-[12px] md:text-[15px] xl:text-[16px]">
                <LocalizedText en={data?.designation} bn={data?.designationBN} />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ResourceCard
