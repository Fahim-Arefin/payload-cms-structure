// import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import CodingLanguageImage from './CodingLanguageImage'

// type LanguageImage = NonNullable<
//   NonNullable<CodingLanguageBlockType['languageImages']>['languages']
// >[number]

// type Props = {
//   languages?: LanguageImage[]
// }

// type Position = {
//   x: number
//   y: number
// }

// const MAX_STACK_IMAGES = 25

// const stackPositions: Position[] = [
//   // Row 1 — 7 images
//   { x: 5, y: 32 },
//   { x: 18, y: 15 },
//   { x: 31, y: 24 },
//   { x: 43, y: 11 },
//   { x: 55, y: 17 },
//   { x: 69, y: 16 },
//   { x: 86, y: 20 },

//   // Row 2 — 6 images
//   { x: 20, y: 42 },
//   { x: 34, y: 50 },
//   { x: 45, y: 35 },
//   { x: 61, y: 42 },
//   { x: 75, y: 38 },
//   { x: 93, y: 43 },

//   // Row 3 — 6 images
//   { x: 11, y: 58 },
//   // { x: 34, y: 65 },
//   { x: 24, y: 65 },
//   { x: 50, y: 58 },
//   { x: 63, y: 70 },
//   { x: 78, y: 61 },
//   { x: 91, y: 67 },

//   // Row 4 — 6 images
//   // { x: 10, y: 81 },
//   { x: 6, y: 81 },
//   { x: 22, y: 91 },
//   { x: 37, y: 84 },
//   { x: 53, y: 94 },
//   { x: 70, y: 98 },
//   { x: 86, y: 83 },
// ]

// function CodingLanguageImageSection({ languages = [] }: Props) {
//   const validLanguages = languages.slice(0, MAX_STACK_IMAGES).filter((language) => {
//     const stackImage =
//       typeof language?.transparentColoredImage === 'object'
//         ? language.transparentColoredImage
//         : null

//     return !!stackImage?.url
//   })

//   if (!validLanguages.length) return null

//   return (
//     <div
//       // className="
//       //   relative mx-auto w-full
//       //   max-w-[560px]
//       //   sm:max-w-[640px]
//       //   md:max-w-[760px]
//       //   lg:max-w-[860px]
//       //   xl:max-w-[960px]
//       //   2xl:max-w-[1040px]
//       //   h-[250px]
//       //   sm:h-[285px]
//       //   md:h-[320px]
//       //   lg:h-[355px]
//       //   xl:h-[390px]
//       //   2xl:h-[420px]
//       //   overflow-visible
//       //   border border-black
//       // "
//       className="
//         relative mx-auto w-full
//         max-w-[560px]
//         sm:max-w-[640px]
//         md:max-w-[760px]
//         lg:max-w-[860px]
//         xl:max-w-[95%]
//         2xl:max-w-[88%]
//         h-[250px]
//         sm:h-[285px]
//         md:h-[320px]
//         lg:h-[355px]
//         xl:h-[410px]
//         2xl:h-[470px]
//         overflow-visible

//       "
//     >
//       {validLanguages.map((language, index) => (
//         <CodingLanguageImage
//           key={language?.id ?? index}
//           data={language}
//           index={index}
//           position={stackPositions[index] ?? { x: 50, y: 50 }}
//         />
//       ))}
//     </div>
//   )
// }

// export default CodingLanguageImageSection

'use client'

import { gsap } from '@/lib/gsap'
import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import React, { useRef } from 'react'
import CodingLanguageImage from './CodingLanguageImage'

type LanguageImage = NonNullable<
  NonNullable<CodingLanguageBlockType['languageImages']>['languages']
>[number]

type Props = {
  languages?: LanguageImage[]
}

type Position = {
  x: number
  y: number
}

const MAX_STACK_IMAGES = 25
const ICON_MOVE_AMOUNT = 18

const stackPositions: Position[] = [
  // Row 1 — 7 images
  { x: 5, y: 32 },
  { x: 18, y: 15 },
  { x: 31, y: 24 },
  { x: 43, y: 11 },
  { x: 55, y: 17 },
  { x: 69, y: 16 },
  { x: 86, y: 20 },

  // Row 2 — 6 images
  { x: 20, y: 42 },
  { x: 34, y: 50 },
  { x: 45, y: 35 },
  { x: 61, y: 42 },
  { x: 75, y: 38 },
  { x: 93, y: 43 },

  // Row 3 — 6 images
  { x: 11, y: 58 },
  { x: 24, y: 65 },
  { x: 50, y: 58 },
  { x: 63, y: 70 },
  { x: 78, y: 61 },
  { x: 91, y: 67 },

  // Row 4 — 6 images
  { x: 6, y: 81 },
  { x: 22, y: 91 },
  { x: 37, y: 84 },
  { x: 53, y: 94 },
  { x: 70, y: 98 },
  { x: 86, y: 83 },
]

function getRandomLikeFactor(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function CodingLanguageImageSection({ languages = [] }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const validLanguages = languages.slice(0, MAX_STACK_IMAGES).filter((language) => {
    const stackImage =
      typeof language?.transparentColoredImage === 'object'
        ? language.transparentColoredImage
        : null

    return !!stackImage?.url
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current

    if (!container) return

    const rect = container.getBoundingClientRect()

    const normalizedX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const normalizedY = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)

    const motionLayers = container.querySelectorAll<HTMLElement>('.coding-language-motion-layer')

    motionLayers.forEach((layer) => {
      const wrapper = layer.closest<HTMLElement>('[data-coding-language-item]')

      if (wrapper?.dataset.hovered === 'true') return

      const index = Number(layer.dataset.index ?? 0)

      const randomX = getRandomLikeFactor(index, 1) * 2 - 1
      const randomY = getRandomLikeFactor(index, 2) * 2 - 1
      const randomPush = getRandomLikeFactor(index, 3) * 2 - 1

      const moveX =
        normalizedX * ICON_MOVE_AMOUNT * randomX +
        normalizedY * (ICON_MOVE_AMOUNT * 0.45) * randomPush

      const moveY =
        normalizedY * ICON_MOVE_AMOUNT * randomY -
        normalizedX * (ICON_MOVE_AMOUNT * 0.4) * randomPush

      gsap.to(layer, {
        x: moveX,
        y: moveY,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    })
  }

  const handleMouseLeave = () => {
    const container = containerRef.current

    if (!container) return

    const motionLayers = container.querySelectorAll<HTMLElement>('.coding-language-motion-layer')

    gsap.to(motionLayers, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  if (!validLanguages.length) return null

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative mx-auto w-full
        max-w-[560px]
        sm:max-w-[640px]
        md:max-w-[760px]
        lg:max-w-[860px]
        xl:max-w-[95%]
        2xl:max-w-[88%]
        h-[250px]
        sm:h-[285px]
        md:h-[320px]
        lg:h-[355px]
        xl:h-[410px]
        2xl:h-[470px]
        overflow-visible
      "
    >
      {validLanguages.map((language, index) => (
        <CodingLanguageImage
          key={language?.id ?? index}
          data={language}
          index={index}
          position={stackPositions[index] ?? { x: 50, y: 50 }}
        />
      ))}
    </div>
  )
}

export default CodingLanguageImageSection
