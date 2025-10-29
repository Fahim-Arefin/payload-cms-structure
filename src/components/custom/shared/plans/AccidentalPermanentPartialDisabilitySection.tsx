// 'use client'

// import React, { useEffect, useRef } from 'react'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import LocalizedText from '../LocalizedText'
// import { APPDBlockType } from '@/types/payloadCustomTypes'

// type Row = {
//   loss: { en: string; bn: string }
//   benefit: { en: string; bn: string }
// }

// const ORANGE = '#ED7125'
// const TEXT = '#1E1E1E'
// const GOLD = '#BFA869'
// const HEADER_LINE_THICKNESS = 3
// const LINE_THICKNESS = 2
// const HEADER_OFFSET_PX = 96 // adjust for your sticky navbar height

// const rows: Row[] = [
//   {
//     loss: {
//       en: 'Both hands, Both foot, or sight of both eye',
//       bn: 'দুই হাত, দুই পা, বা উভয় চোখের দৃষ্টি',
//     },
//     benefit: { en: '100%', bn: '১০০%' },
//   },
//   {
//     loss: { en: 'One hand and one foot', bn: 'এক হাত ও এক পা' },
//     benefit: { en: '100%', bn: '১০০%' },
//   },
//   {
//     loss: { en: 'One hand/foot and sight of one eye', bn: 'এক হাত/পা এবং এক চোখের দৃষ্টি' },
//     benefit: { en: '100%', bn: '১০০%' },
//   },
//   {
//     loss: { en: 'Both ears’ hearing capability', bn: 'উভয় কানের শ্রবণ ক্ষমতা' },
//     benefit: { en: '100%', bn: '১০০%' },
//   },
//   { loss: { en: 'Speech capability', bn: 'বাক ক্ষমতা' }, benefit: { en: '100%', bn: '১০০%' } },
//   { loss: { en: 'One hand/foot', bn: 'একটি হাত/পা' }, benefit: { en: '50%', bn: '৫০%' } },
//   { loss: { en: 'Sight of one eye', bn: 'এক চোখের দৃষ্টি' }, benefit: { en: '50%', bn: '৫০%' } },
//   {
//     loss: { en: 'Thumb and index finger', bn: 'বুড়ো আঙুল ও তর্জনী' },
//     benefit: { en: '25%', bn: '২৫%' },
//   },
// ]

// type Props = {
//   data: APPDBlockType
// }

// export default function AccidentalPermanentPartialDisabilitySection({ data }: Props) {
//   const sectionRef = useRef<HTMLElement>(null)

//   useEffect(() => {
//     const scrollIfHashMatches = () => {
//       if (window.location.hash === '#ptd-schedule' && sectionRef.current) {
//         sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
//       }
//     }

//     // initial load
//     scrollIfHashMatches()

//     // respond to subsequent hash changes
//     window.addEventListener('hashchange', scrollIfHashMatches)
//     return () => window.removeEventListener('hashchange', scrollIfHashMatches)
//   }, [])

//   return (
//     <section
//       id="ptd-schedule"
//       ref={sectionRef}
//       className="container-padding bg-white"
//       style={{ scrollMarginTop: HEADER_OFFSET_PX }}
//     >
//       {/* Titles */}
//       <div className="mb-6 md:mb-8">
//         <h1 className="global-h1 font-medium uppercase">
//           <LocalizedText en={data?.titleLine1} bn={data?.titleLine1BN} />
//         </h1>
//         <h1 className="global-h1 font-medium uppercase text-[#ED7125]">
//           <LocalizedText en={data?.titleLine2} bn={data?.titleLine2BN} />
//         </h1>
//       </div>

//       {/* Table */}
//       <div className="mx-auto w-full max-w-[980px]">
//         <Table>
//           {/* Header (full width) */}
//           <TableHeader className="[&_tr]:border-0 global-p1">
//             <TableRow className="border-0">
//               <TableHead
//                 className="w-[68%] text-center align-bottom font-semibold"
//                 style={{ color: ORANGE }}
//               >
//                 <LocalizedText en={data?.lossHeader} bn={data?.lossHeaderBN} />
//               </TableHead>
//               <TableHead className="w-[32%] text-center align-bottom" style={{ color: ORANGE }}>
//                 <div className="flex flex-col items-center leading-tight">
//                   <span className="font-semibold">
//                     <LocalizedText en={data?.benefitsHeader} bn={data?.benefitsHeaderBN} />
//                   </span>
//                   <span className="global-p2 font-semibold" style={{ color: ORANGE }}>
//                     <LocalizedText en={data?.benefitsSubHeader} bn={data?.benefitsSubHeaderBN} />
//                   </span>
//                 </div>
//               </TableHead>
//             </TableRow>

//             {/* single full-width gold bar under header */}
//             <TableRow className="border-0">
//               <TableCell colSpan={2} className="pt-4 sm:pt-5 md:pt-6">
//                 <div
//                   className="w-full"
//                   style={{ backgroundColor: GOLD, height: `${HEADER_LINE_THICKNESS}px` }}
//                 />
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {data?.rows.map((r, idx) => (
//               <React.Fragment key={idx}>
//                 {/* Row content constrained to 70% (centered) */}
//                 <TableRow className="border-0 global-p1 hover:bg-white">
//                   <TableCell className="w-[68%] px-0 text-center align-middle py-4 sm:py-5 md:py-6">
//                     <div className="w-[70%] mx-auto">
//                       <p className="leading-snug" style={{ color: TEXT }}>
//                         <LocalizedText en={r.lossEN} bn={r.lossBN} />
//                       </p>
//                     </div>
//                   </TableCell>
//                   <TableCell className="w-[32%] px-0 text-center align-middle py-4 sm:py-5 md:py-6">
//                     <div className="w-[70%] mx-auto">
//                       <span className="tracking-wide" style={{ color: TEXT }}>
//                         <LocalizedText en={r.benefitEN} bn={r.benefitBN} />
//                       </span>
//                     </div>
//                   </TableCell>
//                 </TableRow>

//                 {/* 70% separator between rows */}
//                 {idx < data?.rows.length - 1 && (
//                   <TableRow className="border-0">
//                     <TableCell colSpan={2} className="p-0">
//                       <div
//                         className="mx-auto w-[75%]"
//                         style={{ backgroundColor: GOLD, height: `${LINE_THICKNESS}px` }}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </React.Fragment>
//             ))}

//             {/* final bottom 70% separator */}
//             <TableRow className="border-0">
//               <TableCell colSpan={2} className="p-0">
//                 <div
//                   className="mx-auto w-[75%]"
//                   style={{ backgroundColor: GOLD, height: `${LINE_THICKNESS}px` }}
//                 />
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </div>
//     </section>
//   )
// }

// ======================================================================
// ======================================================================
// ======================================================================
'use client'

import React, { useEffect, useRef } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import LocalizedText from '../LocalizedText'
import { APPDBlockType } from '@/types/payloadCustomTypes'

type Row = {
  loss: { en: string; bn: string }
  benefit: { en: string; bn: string }
}

const ORANGE = '#ED7125'
const TEXT = '#1E1E1E'
const GOLD = '#BFA869'
const HEADER_LINE_THICKNESS = 3
const LINE_THICKNESS = 2
const HEADER_OFFSET_PX = 96 // adjust for your sticky navbar height

const rows: Row[] = [
  {
    loss: {
      en: 'Both hands, Both foot, or sight of both eye',
      bn: 'দুই হাত, দুই পা, বা উভয় চোখের দৃষ্টি',
    },
    benefit: { en: '100%', bn: '১০০%' },
  },
  {
    loss: { en: 'One hand and one foot', bn: 'এক হাত ও এক পা' },
    benefit: { en: '100%', bn: '১০০%' },
  },
  {
    loss: { en: 'One hand/foot and sight of one eye', bn: 'এক হাত/পা এবং এক চোখের দৃষ্টি' },
    benefit: { en: '100%', bn: '১০০%' },
  },
  {
    loss: { en: 'Both ears’ hearing capability', bn: 'উভয় কানের শ্রবণ ক্ষমতা' },
    benefit: { en: '100%', bn: '১০০%' },
  },
  { loss: { en: 'Speech capability', bn: 'বাক ক্ষমতা' }, benefit: { en: '100%', bn: '১০০%' } },
  { loss: { en: 'One hand/foot', bn: 'একটি হাত/পা' }, benefit: { en: '50%', bn: '৫০%' } },
  { loss: { en: 'Sight of one eye', bn: 'এক চোখের দৃষ্টি' }, benefit: { en: '50%', bn: '৫০%' } },
  {
    loss: { en: 'Thumb and index finger', bn: 'বুড়ো আঙুল ও তর্জনী' },
    benefit: { en: '25%', bn: '২৫%' },
  },
]

type Props = {
  data: APPDBlockType
}

export default function AccidentalPermanentPartialDisabilitySection({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const scrollIfHashMatches = () => {
      const targetHash = `#${data?.sectionId?.trim() || 'ptd-schedule'}`

      if (window.location.hash === targetHash && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // initial load
    scrollIfHashMatches()

    // respond to subsequent hash changes
    window.addEventListener('hashchange', scrollIfHashMatches)
    return () => window.removeEventListener('hashchange', scrollIfHashMatches)
  }, [])

  return (
    <section
      id={data?.sectionId?.trim() || 'ptd-schedule'}
      ref={sectionRef}
      className="container-padding bg-white"
      style={{ scrollMarginTop: HEADER_OFFSET_PX }}
    >
      {/* Titles */}
      <div className="mb-6 md:mb-8">
        <h1 className="global-h1 font-medium uppercase">
          <LocalizedText en={data?.titleLine1} bn={data?.titleLine1BN} />
        </h1>
        <h1 className="global-h1 font-medium uppercase text-[#ED7125]">
          <LocalizedText en={data?.titleLine2} bn={data?.titleLine2BN} />
        </h1>
      </div>

      {/* Table */}
      <div className="mx-auto w-full max-w-[980px]">
        <Table>
          {/* Header (full width) */}
          <TableHeader className="[&_tr]:border-0 global-p1">
            <TableRow className="border-0">
              <TableHead
                className="w-[68%] text-center align-bottom font-semibold"
                style={{ color: ORANGE }}
              >
                <LocalizedText en={data?.lossHeader} bn={data?.lossHeaderBN} />
              </TableHead>
              <TableHead className="w-[32%] text-center align-bottom" style={{ color: ORANGE }}>
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-semibold">
                    <LocalizedText en={data?.benefitsHeader} bn={data?.benefitsHeaderBN} />
                  </span>
                  <span className="global-p2 font-semibold" style={{ color: ORANGE }}>
                    <LocalizedText en={data?.benefitsSubHeader} bn={data?.benefitsSubHeaderBN} />
                  </span>
                </div>
              </TableHead>
            </TableRow>

            {/* single full-width gold bar under header */}
            <TableRow className="border-0">
              <TableCell colSpan={2} className="pt-4 sm:pt-5 md:pt-6">
                <div
                  className="w-full"
                  style={{ backgroundColor: GOLD, height: `${HEADER_LINE_THICKNESS}px` }}
                />
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.rows.map((r, idx) => (
              <React.Fragment key={idx}>
                {/* Row content constrained to 70% (centered) */}
                <TableRow className="border-0 global-p1 hover:bg-white">
                  <TableCell className="w-[68%] px-0 text-center align-middle py-4 sm:py-5 md:py-6">
                    <div className="w-[70%] mx-auto">
                      <p className="leading-snug" style={{ color: TEXT }}>
                        <LocalizedText en={r.lossEN} bn={r.lossBN} />
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="w-[32%] px-0 text-center align-middle py-4 sm:py-5 md:py-6">
                    <div className="w-[70%] mx-auto">
                      <span className="tracking-wide" style={{ color: TEXT }}>
                        <LocalizedText en={r.benefitEN} bn={r.benefitBN} />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>

                {/* 70% separator between rows */}
                {idx < data?.rows.length - 1 && (
                  <TableRow className="border-0">
                    <TableCell colSpan={2} className="p-0">
                      <div
                        className="mx-auto w-[75%]"
                        style={{ backgroundColor: GOLD, height: `${LINE_THICKNESS}px` }}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}

            {/* final bottom 70% separator */}
            <TableRow className="border-0">
              <TableCell colSpan={2} className="p-0">
                <div
                  className="mx-auto w-[75%]"
                  style={{ backgroundColor: GOLD, height: `${LINE_THICKNESS}px` }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
