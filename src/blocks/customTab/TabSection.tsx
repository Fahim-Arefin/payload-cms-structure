// 'use client'
// import LocalizedText from '@/components/custom/shared/LocalizedText'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { DESCRIPTIVE_CONTENT_SLUG_AND_TAG, STEP_CONTENT_SLUG_AND_TAG } from '@/lib/constants'
// import { CustomTabBlockType } from '@/types/payloadCustomTypes'
// import { useEffect, useRef, useState } from 'react'
// import DescriptiveContentBlock from './descriptiveContent/DescriptiveContentBlock'
// import StepContentBlock from './stepContent/StepContentBlock'
// import './TabSection.css'

// type Props = {
//   block: CustomTabBlockType
// }

// function ArrowIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
//       <path
//         d="M4.76388 3.90426L16.4372 10.4709C16.5013 10.5073 16.5547 10.56 16.5918 10.6236C16.6289 10.6873 16.6484 10.7597 16.6484 10.8334C16.6484 10.9071 16.6289 10.9795 16.5918 11.0432C16.5547 11.1069 16.5013 11.1596 16.4372 11.1959L4.76388 17.7626C4.68904 17.8044 4.60314 17.822 4.51789 17.8132C4.43265 17.8044 4.35219 17.7695 4.2875 17.7133C4.22281 17.657 4.17703 17.5822 4.1564 17.4991C4.13577 17.4159 4.14129 17.3284 4.17221 17.2484L6.60721 10.9843C6.64489 10.8872 6.64489 10.7796 6.60721 10.6826L4.17138 4.41843C4.14028 4.33839 4.13466 4.25071 4.15529 4.16736C4.17593 4.08401 4.22181 4.00908 4.28666 3.9528C4.35151 3.89653 4.43216 3.86166 4.51758 3.85297C4.603 3.84428 4.68902 3.86219 4.76388 3.90426Z"
//         fill="white"
//         stroke="#3A3A3A"
//         strokeWidth="1.25"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   )
// }

// function TabSection({ block }: Props) {
//   // always an array
//   const tabs = block?.tabs
//   console.log('tab data', tabs)

//   const initialValue = tabs[0]?.value ?? ''
//   const [active, setActive] = useState(initialValue)

//   const containerRef = useRef<HTMLDivElement | null>(null)
//   const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
//   const [arrowPositions, setArrowPositions] = useState<number[]>([])

//   // keep active in sync with CRUD changes on tabs
//   useEffect(() => {
//     if (!tabs.length) return

//     const exists = tabs.some((t) => t.value === active)
//     if (!exists) {
//       const first = tabs[0]?.value ?? ''
//       if (first && first !== active) {
//         setActive(first)
//       }
//     }
//   }, [tabs, active])

//   // recompute arrow positions whenever tabs change (CRUD / reorder / label changes)
//   useEffect(() => {
//     if (!containerRef.current || tabs.length < 2) {
//       setArrowPositions([])
//       return
//     }

//     const updatePositions = () => {
//       if (!containerRef.current || tabs.length < 2) {
//         setArrowPositions([])
//         return
//       }

//       const containerRect = containerRef.current.getBoundingClientRect()
//       const centers: number[] = []

//       tabs.forEach((t) => {
//         const el = tabRefs.current[t.value]
//         if (!el) return
//         const rect = el.getBoundingClientRect()
//         const centerX = rect.left + rect.width / 2 - containerRect.left
//         centers.push(centerX)
//       })

//       if (centers.length < 2) {
//         setArrowPositions([])
//         return
//       }

//       const mids: number[] = []
//       for (let i = 0; i < centers.length - 1; i++) {
//         mids.push((centers[i] + centers[i + 1]) / 2)
//       }

//       // Only update state if positions actually changed
//       setArrowPositions((prev) => {
//         if (prev.length === mids.length && prev.every((v, i) => v === mids[i])) {
//           return prev
//         }
//         return mids
//       })
//     }

//     updatePositions()
//     window.addEventListener('resize', updatePositions)
//     return () => {
//       window.removeEventListener('resize', updatePositions)
//     }
//   }, [tabs]) // <-- listen to full tabs array, not just length

//   return (
//     <div>
//       {/* Tabs */}
//       <Tabs defaultValue={initialValue} value={active} onValueChange={setActive}>
//         <div
//           ref={containerRef}
//           className="relative w-full border-b border-[#434343] md:py-[12px]  bg-white
//          md:mb-[30px] lg:mb-[50px] xl:mb-[80px]"
//         >
//           <TabsList
//             className={`w-full flex justify-between overflow-x-scroll overflow-y-hidden  lg:overflow-y-visible lg:overflow-x-visible bg-transparent border-none p-0
//           ${tabs.length === 2 ? 'gap-4 md:gap-20' : 'gap-0 lg:gap-6'} `}
//           >
//             {tabs.map((t) => (
//               <TabsTrigger
//                 key={t.value}
//                 value={t.value}
//                 ref={(el) => {
//                   if (el) tabRefs.current[t.value] = el
//                 }}
//                 className={`global-p1 font-semibold px-2 py-2.5 md:py-6 relative uppercase
//                 ${
//                   active === t.value
//                     ? `${tabs.length === 2 && 'after:w-full'} text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:inset-x-0 after:bottom-0 after:h-[4px] after:md:h-[8px] after:bg-orange-500 after:rounded-full`
//                     : 'text-[#434343]'
//                 }
//                 ${tabs.length === 2 && 'w-full'}
//                 `}
//               >
//                 <span className={active === t.value ? 'text-[#ED7125]' : 'text-[#434343]'}>
//                   <LocalizedText en={t.label} bn={t.labelBN} />
//                 </span>
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {/* arrows between tabs (desktop: lg+) */}
//           {arrowPositions.map((left, i) => (
//             <div
//               key={`arrow-${i}`}
//               className="hidden lg:block absolute -bottom-2.5 z-10"
//               style={{ left: `${left}px`, transform: 'translateX(-50%)' }}
//             >
//               <ArrowIcon />
//             </div>
//           ))}
//         </div>

//         {/* Content: dispatch on the single block inside each tab */}
//         {tabs.map((t) => {
//           const single = t.content?.[0]
//           return (
//             <TabsContent key={t.value} value={t.value}>
//               {single?.blockType === DESCRIPTIVE_CONTENT_SLUG_AND_TAG && (
//                 <DescriptiveContentBlock data={single} />
//               )}

//               {single?.blockType === STEP_CONTENT_SLUG_AND_TAG && (
//                 <StepContentBlock data={single} />
//               )}
//             </TabsContent>
//           )
//         })}
//       </Tabs>
//     </div>
//   )
// }

// export default TabSection

// ===================================================================================
// ===================================================================================
// ===================================================================================
'use client'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DESCRIPTIVE_CONTENT_SLUG_AND_TAG, STEP_CONTENT_SLUG_AND_TAG } from '@/lib/constants'
import { CustomTabBlockType } from '@/types/payloadCustomTypes'
import { useEffect, useRef, useState } from 'react'
import DescriptiveContentBlock from './descriptiveContent/DescriptiveContentBlock'
import StepContentBlock from './stepContent/StepContentBlock'
import './TabSection.css'

type Props = {
  block: CustomTabBlockType
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path
        d="M4.76388 3.90426L16.4372 10.4709C16.5013 10.5073 16.5547 10.56 16.5918 10.6236C16.6289 10.6873 16.6484 10.7597 16.6484 10.8334C16.6484 10.9071 16.6289 10.9795 16.5918 11.0432C16.5547 11.1069 16.5013 11.1596 16.4372 11.1959L4.76388 17.7626C4.68904 17.8044 4.60314 17.822 4.51789 17.8132C4.43265 17.8044 4.35219 17.7695 4.2875 17.7133C4.22281 17.657 4.17703 17.5822 4.1564 17.4991C4.13577 17.4159 4.14129 17.3284 4.17221 17.2484L6.60721 10.9843C6.64489 10.8872 6.64489 10.7796 6.60721 10.6826L4.17138 4.41843C4.14028 4.33839 4.13466 4.25071 4.15529 4.16736C4.17593 4.08401 4.22181 4.00908 4.28666 3.9528C4.35151 3.89653 4.43216 3.86166 4.51758 3.85297C4.603 3.84428 4.68902 3.86219 4.76388 3.90426Z"
        fill="white"
        stroke="#3A3A3A"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TabSection({ block }: Props) {
  // always an array
  const tabs = block?.tabs

  const initialValue = tabs[0]?.value ?? ''
  const [active, setActive] = useState(initialValue)
  const [direction, setDirection] = useState<'right' | 'left'>('right')

  const containerRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [arrowPositions, setArrowPositions] = useState<number[]>([])

  // keep active in sync with CRUD changes on tabs
  useEffect(() => {
    if (!tabs.length) return

    const exists = tabs.some((t) => t.value === active)
    if (!exists) {
      const first = tabs[0]?.value ?? ''
      if (first && first !== active) {
        setActive(first)
        // when we jump back to first after CRUD change, direction defaults to right
        setDirection('right')
      }
    }
  }, [tabs, active])

  // recompute arrow positions whenever tabs change (CRUD / reorder / label changes)
  useEffect(() => {
    if (!containerRef.current || tabs.length < 2) {
      setArrowPositions([])
      return
    }

    const updatePositions = () => {
      if (!containerRef.current || tabs.length < 2) {
        setArrowPositions([])
        return
      }

      const containerRect = containerRef.current.getBoundingClientRect()
      const centers: number[] = []

      tabs.forEach((t) => {
        const el = tabRefs.current[t.value]
        if (!el) return
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2 - containerRect.left
        centers.push(centerX)
      })

      if (centers.length < 2) {
        setArrowPositions([])
        return
      }

      const mids: number[] = []
      for (let i = 0; i < centers.length - 1; i++) {
        mids.push((centers[i] + centers[i + 1]) / 2)
      }

      // Only update state if positions actually changed
      setArrowPositions((prev) => {
        if (prev.length === mids.length && prev.every((v, i) => v === mids[i])) {
          return prev
        }
        return mids
      })
    }

    updatePositions()
    window.addEventListener('resize', updatePositions)
    return () => {
      window.removeEventListener('resize', updatePositions)
    }
  }, [tabs])

  // 🔁 handle direction change when tab changes
  const handleTabChange = (nextValue: string) => {
    if (!tabs.length) {
      setActive(nextValue)
      return
    }

    const currentIndex = tabs.findIndex((t) => t.value === active)
    const nextIndex = tabs.findIndex((t) => t.value === nextValue)

    if (currentIndex !== -1 && nextIndex !== -1 && nextIndex !== currentIndex) {
      setDirection(nextIndex > currentIndex ? 'right' : 'left')
    }

    setActive(nextValue)
  }

  return (
    <div>
      {/* Tabs */}
      <Tabs defaultValue={initialValue} value={active} onValueChange={handleTabChange}>
        <div
          ref={containerRef}
          className="relative w-full border-b border-[#434343] md:py-[12px]  
         md:mb-[30px] lg:mb-[50px] xl:mb-[80px]"
        >
          <TabsList
            className={`w-full flex justify-between overflow-x-scroll overflow-y-hidden  lg:overflow-y-visible lg:overflow-x-visible bg-transparent border-none p-0 
          ${tabs.length === 2 ? 'gap-4 md:gap-20' : 'gap-0 lg:gap-6'} `}
          >
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                ref={(el) => {
                  if (el) tabRefs.current[t.value] = el
                }}
                className={`global-p1 font-semibold px-2 py-2.5 md:py-6 relative uppercase  
                ${
                  active === t.value
                    ? `${tabs.length === 2 && 'after:w-full'} text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent after:inset-x-0 after:bottom-0 after:h-[4px] after:md:h-[8px] after:bg-orange-500 after:rounded-full`
                    : 'text-[#434343]'
                }
                ${tabs.length === 2 && 'w-full'}
                `}
              >
                <span className={active === t.value ? 'text-[#ED7125]' : 'text-[#434343]'}>
                  <LocalizedText en={t.label} bn={t.labelBN} />
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* arrows between tabs (desktop: lg+) */}
          {arrowPositions.map((left, i) => (
            <div
              key={`arrow-${i}`}
              className={`hidden lg:block absolute -bottom-2.5 z-10 ${
                direction === 'left' ? 'arrow-left' : 'arrow-right'
              }`}
              style={{ left: `${left}px`, transform: 'translateX(-50%)' }}
            >
              <ArrowIcon />
            </div>
          ))}
        </div>

        {/* Content: dispatch on the single block inside each tab */}
        {tabs.map((t) => {
          const single = t.content?.[0]
          return (
            <TabsContent key={t.value} value={t.value}>
              {single?.blockType === DESCRIPTIVE_CONTENT_SLUG_AND_TAG && (
                <DescriptiveContentBlock data={single} />
              )}

              {single?.blockType === STEP_CONTENT_SLUG_AND_TAG && (
                <StepContentBlock data={single} />
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

export default TabSection
