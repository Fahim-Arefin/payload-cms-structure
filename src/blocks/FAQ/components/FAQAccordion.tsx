'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import { FAQBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import DownArrow from 'public/assets/icons/DownArrow.png'
import React, { useRef, useState } from 'react'

type FAQItem = NonNullable<NonNullable<FAQBlockType['qaGroup']>['items']>[number]

type Props = {
  items?: FAQItem[]
}

const DownArrowIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Image
      src={DownArrow}
      alt=""
      width={24}
      height={16}
      quality={100}
      placeholder="blur"
      blurDataURL={DownArrow.blurDataURL}
      className={`
        h-auto w-[12px]
        transition-transform duration-300 ease-out
        lg:w-[16px]
        xl:w-[18px]
        2xl:w-[20px]
        ${isOpen ? 'rotate-180' : 'rotate-0'}
      `}
    />
  )
}

function FAQAccordion({ items = [] }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(items.length > 0 ? 0 : null)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])
  const answerInnerRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      answerRefs.current.forEach((answer, index) => {
        const inner = answerInnerRefs.current[index]
        if (!answer || !inner) return

        const isOpen = openIndex === index

        gsap.to(answer, {
          height: isOpen ? inner.scrollHeight : 0,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        })

        gsap.to(inner, {
          autoAlpha: isOpen ? 1 : 0,
          y: isOpen ? 0 : -6,
          duration: 0.32,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
    },
    {
      scope: rootRef,
      dependencies: [openIndex, items.length],
    },
  )

  if (!items.length) return null

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div ref={rootRef} className="w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={item?.id ?? index}
            className="
              border-b-2 border-primary-1
              py-[22px]
              lg:py-[28px]
              xl:py-[34px]
              2xl:py-[38px]
            "
          >
            <button
              type="button"
              onClick={() => handleToggle(index)}
              className="
                flex w-full items-center justify-between gap-5
                text-left
                outline-none
              "
              aria-expanded={isOpen}
            >
              <div
                className="
                  font-agency global-h6 xl:global-h7
                  text-secondary-1
                "
              >
                {item?.question}
              </div>

              <span className="shrink-0">
                <DownArrowIcon isOpen={isOpen} />
              </span>
            </button>

            <div
              ref={(el) => {
                answerRefs.current[index] = el
              }}
              className="h-0 overflow-hidden"
            >
              <div
                ref={(el) => {
                  answerInnerRefs.current[index] = el
                }}
                className="
                  pt-[14px]
                  font-grift global-p4
                  leading-[1.55]
                  tracking-[0.02em]
                  text-secondary-1
                  opacity-0
                  lg:pt-[18px]
                "
              >
                {item?.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FAQAccordion
