// src/components/custom/career/CareerShapeBlock.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { pageHref } from '@/lib/utils'
import { CareerShapeBlockType } from '@/types/payloadCustomTypes'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  block: CareerShapeBlockType
  params: Record<string, string>
}

type SectionProps = {
  block: CareerShapeBlockType
}

function getMedia(image: any) {
  const media =
    image && typeof image === 'object' && 'url' in image
      ? (image as { url?: string; alt?: string })
      : null
  return media?.url ? media : null
}

function CareerShapeSection({ block }: SectionProps) {
  const bgMedia = getMedia(block?.backgroundImage)
  const hasButton = !!(block?.buttonText || block?.buttonTextBN)
  const btnHref = block?.buttonLink ? pageHref(block.buttonLink) : '#'

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      {bgMedia && (
        <div className="absolute inset-0">
          <Image
            src={bgMedia.url as any}
            alt={bgMedia.alt || 'Career background'}
            fill
            className="object-cover object-center"
            sizes="100vw"
            placeholder={block.backgroundImageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={block.backgroundImageBlurDataURL || undefined}
          />
          {/* Subtle dark overlay to improve text contrast */}
          <div className="absolute inset-0 bg-black/35" />
        </div>
      )}

      {/* Fallback plain background if no image */}
      {!bgMedia && <div className="absolute inset-0 bg-slate-900" />}

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto flex min-h-[320px] items-center md:min-h-[380px] lg:min-h-[420px] container-padding">
        {/* Glass card */}
        <div className="w-full rounded-xl border border-white/35 px-4 py-10 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-[2px] md:px-10 md:py-14 lg:px-16 lg:py-16">
          {/* Title */}
          <div className="mb-6 text-center md:mb-8">
            <h2 className="global-h1 font-semibold uppercase text-white">
              <LocalizedString en={block.leadingTitle} bn={block.leadingTitleBN} />
            </h2>
          </div>

          {/* Description */}
          <div className="mx-auto mb-8 items-center global-span font-[300] text-white">
            <LocalizedRichText en={block?.leadingDescription} bn={block?.leadingDescriptionBN} />
          </div>

          {/* CTA button (optional) */}
          {hasButton && (
            <div className="flex justify-center">
              {btnHref && btnHref !== '#' ? (
                <Link href={btnHref}>
                  <Button
                    variant="outline"
                    className="h-12 rounded-[5px] border-2 border-white bg-white/10 px-10 global-p2 font-normal text-white hover:bg-white/20 hover:text-white md:h-[52px] md:px-14"
                  >
                    <LocalizedString en={block.buttonText} bn={block.buttonTextBN} />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  className="h-12 rounded-[5px] border-2 border-white bg-white/10 px-10 global-p2 font-normal text-white hover:bg-white/20 hover:text-white md:h-[52px] md:px-14"
                >
                  <LocalizedString en={block.buttonText} bn={block.buttonTextBN} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CareerShapeSection
