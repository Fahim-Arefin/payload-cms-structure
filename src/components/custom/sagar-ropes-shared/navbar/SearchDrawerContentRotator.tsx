'use client'

import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import { gsap, useGSAP } from '@/lib/gsap'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { SearchContentItem } from './ServerNavbar'
import { sliderDelay } from '@/lib/data'

type Props = {
  items?: SearchContentItem[]
  callHref: string
  onCallClick?: () => void
}

const ROTATION_DELAY = sliderDelay

const fallbackItems: SearchContentItem[] = [
  {
    title: '“Big growth steps often bring big challenges”',
    description:
      'but our team is here to make the transition seamless. Reach out today so we can kickstart your success together.',
  },
]

function SearchDrawerContentRotator({ items, callHref, onCallClick }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  const safeItems = useMemo<SearchContentItem[]>(() => {
    const filtered = Array.isArray(items)
      ? items
          .map((item) => ({
            title: String(item?.title ?? '').trim(),
            description: String(item?.description ?? '').trim(),
          }))
          .filter((item) => item.title && item.description)
      : []

    return filtered.length ? filtered : fallbackItems
  }, [items])

  const [activeIndex, setActiveIndex] = useState(0)

  const activeItem = safeItems[activeIndex] ?? safeItems[0]

  useEffect(() => {
    setActiveIndex(0)
  }, [safeItems.length])

  useEffect(() => {
    if (safeItems.length <= 1) return

    const timeout = window.setTimeout(() => {
      setActiveIndex((prev) => {
        const nextIndex = prev + 1

        if (nextIndex >= safeItems.length) return 0

        return nextIndex
      })
    }, ROTATION_DELAY)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [activeIndex, safeItems.length])

  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const animatedItems = Array.from(
        root.querySelectorAll<HTMLElement>('.search-content-text-animate'),
      )

      gsap.killTweensOf(animatedItems)

      gsap.fromTo(
        animatedItems,
        {
          autoAlpha: 0,
          y: 22,
          filter: 'blur(6px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.58,
          stagger: 0.07,
          ease: 'power3.out',
          overwrite: 'auto',
        },
      )
    },
    {
      scope: rootRef,
      dependencies: [activeIndex],
    },
  )

  if (!activeItem) return null

  return (
    <div ref={rootRef} className="mt-auto text-center">
      <h3
        key={`title-${activeIndex}`}
        className="
          search-content-text-animate
          mx-auto max-w-[330px]
          font-grift font-semibold global-p4
          text-[#FFFBFC]
          xl:max-w-[360px]
        "
      >
        {activeItem.title}
      </h3>

      <p
        key={`description-${activeIndex}`}
        className="
          search-content-text-animate
          mx-auto mt-[18px] max-w-[335px]
          font-grift global-p5
          text-[#FFFBFC]
          xl:max-w-[365px]
        "
      >
        {activeItem.description}
      </p>

      <div className="mt-[26px] flex justify-center">
        <Link href={callHref} onClick={onCallClick} className="inline-flex">
          <Button01 type="button">Call Instantly</Button01>
        </Link>
      </div>
    </div>
  )
}

export default SearchDrawerContentRotator
