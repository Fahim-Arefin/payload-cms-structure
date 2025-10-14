'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  bgColor?: string
  align?: 'left' | 'right'
  data: {
    bgImage: string
    bgMobileImage?: string
    content: string
    contentBN?: string
  }
}

/* =========================
   Link helpers (EN & BN)
   ========================= */

type TargetLink = {
  phrase: string
  href: string
  external?: boolean
  className?: string
}

/** Split strings and interleave with <Link> for a single target phrase. */
function interleavePiecesWithLink(
  pieces: (string | React.ReactNode)[],
  t: TargetLink
) {
  const next: (string | React.ReactNode)[] = []

  for (const chunk of pieces) {
    if (typeof chunk !== 'string') {
      next.push(chunk)
      continue
    }

    const parts = chunk.split(t.phrase)
    parts.forEach((part, i) => {
      next.push(part)
      if (i < parts.length - 1) {
        next.push(
          <Link
            key={`${t.phrase}-${i}-${part.length}`}
            href={t.href}
            {...(t.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={t.className ?? 'text-[#ED7125] underline hover:no-underline'}
          >
            {t.phrase}
          </Link>
        )
      }
    })
  }

  return next
}

/** Generic linkifier that can replace multiple phrases in order. */
function linkifyText(text: string, targets: TargetLink[]): React.ReactNode {
  let result: (string | React.ReactNode)[] = [text]
  for (const t of targets) {
    result = interleavePiecesWithLink(result, t)
  }
  return <>{result}</>
}

/** EN: link “EFT Debit Authorization form” → /premium-calculator#calculator */
function renderWithLinksEN(text: string) {
  return linkifyText(text, [
    {
      phrase: 'EFT Debit Authorization form',
      href: '/premium-calculator#calculator',
    },
  ])
}

/** BN:
 *  - “ইএফটি ডেবিট অনুমোদন ফর্ম” → /premium-calculator#calculator
 *  - “মাই পোর্টাল” → https://portal.shantalife.com/ (external)
 */
function renderWithLinksBN(text: string) {
  return linkifyText(text, [
    {
      phrase: 'ইএফটি ডেবিট অনুমোদন ফর্ম',
      href: '/premium-calculator#calculator',
    },
    {
      phrase: 'মাই পোর্টাল',
      href: 'https://portal.shantalife.com/',
      external: true,
    },
  ])
}

/* =========================
   Component
   ========================= */

function DebitSection({ bgColor = '#FFFFFF', align = 'left', data }: Props) {
  return (
    <div
      className="container-padding"
      style={{ backgroundColor: bgColor }}
    >
      {/* heading */}
      <div className="hidden lg:block">
        <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
          <LocalizedHighlighted
            textEn="Authorization of EFT Debit"
            textBn="ইলেকট্রনিক ফান্ড ট্রান্সফার (ইএফটি) ডেবিট"
            highlightEn="EFT Debit"
            highlightBn="(ইএফটি) ডেবিট"
            highlightClassName="global-h1 uppercase text-[#ED7125] font-medium"
          />
        </h1>
      </div>

      <div className="lg:hidden">
        <h1 className="global-h1 uppercase text-[#3A3A3A] font-medium">
          <LocalizedHighlighted
            textEn="Authorization of EFT Debit"
            textBn="ইলেকট্রনিক ফান্ড ট্রান্সফার (ইএফটি) ডেবিট"
            highlightEn="EFT Debit"
            highlightBn="(ইএফটি) ডেবিট"
            highlightClassName="global-h1 uppercase text-[#ED7125] font-medium"
          />
        </h1>
      </div>

      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-9 2xl:gap-16 ${
          align === 'left' ? ' lg:gap-0 ' : 'gap-7'
        }`}
      >
        {/* left content (mobile) */}
        <div
          className={`lg:hidden relative w-full ${
            align == 'left' ? ' lg:w-[93%] ' : ''
          } w-full xl:w-[380px] 2xl:w-[500px] mx-auto aspect-[2880/1920] rounded-md lg:rounded-lg xl:rounded-xl overflow-hidden mt-12 ${
            align === 'left' ? 'order-1' : 'order-1 lg:order-2'
          }`}
          role="img"
          aria-label="Background image"
        >
          <Image
            src={data?.bgImage}
            alt="Background"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* left content (large) */}
        <div
          className={`hidden lg:block relative w-full ${
            align == 'left' ? ' lg:w-[93%] ' : ''
          } w-full xl:w-[380px] 2xl:w-[500px] mx-auto h-auto rounded-md lg:rounded-lg xl:rounded-xl overflow-hidden mt-12 ${
            align === 'left' ? 'order-1' : 'order-1 lg:order-2'
          }`}
          role="img"
          aria-label="Background image"
        >
          <Image
            src={data?.bgImage}
            alt="Background"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* right content */}
        <div
          className={`flex flex-col mt-6 lg:mt-12 space-y-4 lg:space-y-4 xl:space-y-7 ${
            align === 'left' ? 'order-2' : 'order-2 lg:order-1'
          }`}
        >
          <div className="text-[#3A3A3A] global-h4 text-justify">
            <LocalizedText
              en={renderWithLinksEN(data?.content) as any}
              bn={renderWithLinksBN(data?.contentBN ?? '') as any}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebitSection
