// import { CompanyStatsBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'

// type Props = {
//   block: CompanyStatsBlockType
// }

// function CompanyStatsSection({ block }: Props) {
//   return (
//     <div
//       className="px-6 lg:container-padding-x
//   py-[12px] lg:py-[28px] xl:py-[32px] 2xl:py-[38px]
//   grid grid-cols-2 md:grid-cols-4
//   gap-2 md:gap-0
//   "
//     >
//       {block?.companyStats?.stats?.map((stat, index) => (
//         <div
//           key={index}
//           className="flex flex-col justify-center items-center gap-1 lg:gap-2 xl:gap-3"
//         >
//           <div className="text-secondary-1 font-agency global-p2 text-center">{stat.value}</div>
//           <div className="text-white-3 font-grift font-bold global-p5 text-center">
//             {stat.label}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default CompanyStatsSection

'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { CompanyStatsBlockType } from '@/types/payloadCustomTypes'
import React, { useRef } from 'react'

type Props = {
  block: CompanyStatsBlockType
}

type ParsedStatValue = {
  original: string
  prefix: string
  number: number
  suffix: string
  decimals: number
  hasNumber: boolean
}

function parseStatValue(value?: string | null): ParsedStatValue {
  const text = value || ''
  const match = text.match(/(\d+(?:\.\d+)?)/)

  if (!match) {
    return {
      original: text,
      prefix: '',
      number: 0,
      suffix: '',
      decimals: 0,
      hasNumber: false,
    }
  }

  const numberText = match[0]
  const numberIndex = text.indexOf(numberText)

  return {
    original: text,
    prefix: text.slice(0, numberIndex),
    number: Number(numberText),
    suffix: text.slice(numberIndex + numberText.length),
    decimals: numberText.includes('.') ? numberText.split('.')[1].length : 0,
    hasNumber: true,
  }
}

function formatValue(value: number, decimals: number) {
  if (decimals > 0) return value.toFixed(decimals)

  return Math.round(value).toString()
}

function CompanyStatsSection({ block }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const hasAnimatedRef = useRef(false)

  const stats = block?.companyStats?.stats ?? []

  useGSAP(
    () => {
      const section = sectionRef.current

      if (!section || !stats.length || hasAnimatedRef.current) return

      gsap.registerPlugin(ScrollTrigger)

      const trigger = ScrollTrigger.create({
        trigger: section,
        // start: 'top 80%',
        // start: 'center center',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          hasAnimatedRef.current = true

          stats.forEach((stat, index) => {
            const element = valueRefs.current[index]
            const parsed = parseStatValue(stat?.value)

            if (!element) return

            if (!parsed.hasNumber) {
              element.textContent = parsed.original
              return
            }

            const counter = {
              value: 0,
            }

            gsap.to(counter, {
              value: parsed.number,
              duration: 2,
              ease: 'power2.out',
              delay: index * 0.08,
              onUpdate: () => {
                element.textContent = `${parsed.prefix}${formatValue(
                  counter.value,
                  parsed.decimals,
                )}${parsed.suffix}`
              },
              onComplete: () => {
                element.textContent = parsed.original
              },
            })
          })
        },
      })

      return () => {
        trigger.kill()
      }
    },
    {
      scope: sectionRef,
      dependencies: [stats.length],
    },
  )

  return (
    <div
      ref={sectionRef}
      className="
        px-6 lg:container-padding-x
        py-[12px] lg:py-[28px] xl:py-[32px] 2xl:py-[38px]
        grid grid-cols-2 md:grid-cols-4
        gap-2 md:gap-0
      "
    >
      {stats.map((stat, index) => {
        const parsedValue = parseStatValue(stat?.value)

        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-1 lg:gap-2 xl:gap-3"
          >
            <div className="text-secondary-1 font-agency global-p2 text-center">
              <span
                ref={(el) => {
                  valueRefs.current[index] = el
                }}
              >
                {parsedValue.hasNumber
                  ? `${parsedValue.prefix}0${parsedValue.suffix}`
                  : parsedValue.original}
              </span>
            </div>

            <div className="text-white-3 font-grift font-bold global-p5 text-center">
              {stat?.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CompanyStatsSection
