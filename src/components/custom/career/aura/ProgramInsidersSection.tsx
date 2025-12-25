// src/components/custom/career/CareerAuraProgramInsidersBlock.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { CareerAuraProgramInsidersBlockType } from '@/types/payloadCustomTypes'
import LocalizedHighlighted from '../../shared/LocalizedHighlighted'

type SectionProps = {
  block: CareerAuraProgramInsidersBlockType
}

function ProgramInsidersSection({ block }: SectionProps) {
  const bgColor = block?.backgroundColor || '#FCF4EB'
  const items = Array.isArray(block?.images) ? block.images.slice(0, 9) : []

  const lgPlacements: string[] = [
    'lg:col-span-1 lg:row-span-2',
    'lg:col-span-2 lg:row-span-1',
    'lg:col-span-1 lg:row-span-1',
    'lg:col-span-1 lg:row-span-1',
    'lg:col-span-1 lg:row-span-1',
    'lg:col-span-1 lg:row-span-2',
    'lg:col-span-1 lg:row-span-1',
    'lg:col-span-2 lg:row-span-1',
    'lg:col-span-1 lg:row-span-1',
  ]

  const smPlacements: string[] = [
    'sm:col-span-2 sm:row-span-1',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-2 sm:row-span-1',
    'sm:col-span-2 sm:row-span-1',
  ]

  const useMosaic = items.length >= 7

  return (
    <section className="w-full container-padding" style={{ backgroundColor: bgColor }}>
      {/* Heading */}
      <div className="uppercase global-h2 font-semibold mb-8 lg:mb-10">
        <LocalizedHighlighted
          textEn={block?.title}
          textBn={block?.titleBN}
          highlightEn={block?.highlightedTitle}
          highlightBn={block?.highlightedTitleBN}
          highlightClassName="text-[#ED7125]"
        />
      </div>

      {useMosaic ? (
        <div
          className={[
            'grid grid-cols-2 gap-2',
            'sm:grid-cols-2 sm:gap-4 sm:auto-rows-[160px]',
            'md:auto-rows-[180px] md:gap-4',
            'lg:grid-cols-4 lg:gap-4',
            'lg:auto-rows-[180px] xl:auto-rows-[200px] 2xl:auto-rows-[220px]',
          ].join(' ')}
        >
          {items.map((item: any, idx: number) => {
            const placementLg = lgPlacements[idx] ?? 'lg:col-span-1 lg:row-span-1'
            const placementSm = smPlacements[idx] ?? 'sm:col-span-1 sm:row-span-1'

            const img = item?.image
            const url = typeof img === 'object' && img?.url ? img.url : ''
            const alt =
              (typeof img === 'object' && img?.alt ? img.alt : '') ||
              `Program insider image ${idx + 1}`

            if (!url) return null

            const blur = (item?.imageBlurDataURL ?? '').toString().trim()
            const canBlur = blur.startsWith('data:image')

            return (
              <div
                key={img?.id ?? `${url}-${idx}`}
                className={[
                  'relative overflow-hidden rounded-md bg-white ring-1 ring-black/5',
                  'h-[220px] sm:h-full',
                  placementSm,
                  placementLg,
                ].join(' ')}
              >
                <Image
                  src={url}
                  alt={alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={80}
                  placeholder={canBlur ? 'blur' : 'empty'}
                  blurDataURL={canBlur ? blur : undefined}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {items.map((item: any, idx: number) => {
            const img = item?.image
            const url = typeof img === 'object' && img?.url ? img.url : ''
            if (!url) return null

            const blur = (item?.imageBlurDataURL ?? '').toString().trim()
            const canBlur = blur.startsWith('data:image')

            return (
              <div
                key={img?.id ?? `${url}-${idx}`}
                className="relative w-full overflow-hidden rounded-md bg-white ring-1 ring-black/5 aspect-[4/3]"
              >
                <Image
                  src={url}
                  alt={(img?.alt as string) || `Program insider image ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                  placeholder={canBlur ? 'blur' : 'empty'}
                  blurDataURL={canBlur ? blur : undefined}
                />
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ProgramInsidersSection
