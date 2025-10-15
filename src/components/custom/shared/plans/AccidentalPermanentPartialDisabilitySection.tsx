// 'use client'

// import React from 'react'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import LocalizedText from '../LocalizedText'

// type Row = {
//   loss: { en: string; bn: string }
//   benefit: { en: string; bn: string }
// }

// const ORANGE = '#ED7125'
// const TEXT = '#1E1E1E'
// const GOLD = '#BFA869'
// const HEADER_LINE_THICKNESS = 3 // px — uniform everywhere
// const LINE_THICKNESS = 2 // px — uniform everywhere

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

// export default function AccidentalPermanentPartialDisabilitySection() {
//   return (
//     <section className="container-padding bg-white">
//       {/* Titles */}
//       <div className="mb-6 md:mb-8">
//         <h1 className="global-h1 font-medium uppercase">
//           <LocalizedText en="Coverage Under" bn="বীমার কভারেজের অধীনে" />
//         </h1>
//         <h1 className="global-h1 font-medium uppercase text-[#ED7125]">
//           <LocalizedText
//             en="Accidental Permanent Partial Disability"
//             bn="দুর্ঘটনাজনিত স্থায়ী আংশিক অক্ষমতা।"
//           />
//         </h1>
//       </div>

//       {/* Table */}
//       <div className="mx-auto w-full max-w-[980px]">
//         <Table>
//           {/* Header stays full width. Remove default borders; keep our gold bar only */}
//           <TableHeader className="[&_tr]:border-0 global-p1">
//             <TableRow className="border-0">
//               <TableHead
//                 className="w-[68%] text-center align-bottom font-semibold"
//                 style={{ color: ORANGE }}
//               >
//                 <LocalizedText en="Loss of" bn="ক্ষতি" />
//               </TableHead>
//               <TableHead className="w-[32%] text-center align-bottom" style={{ color: ORANGE }}>
//                 <div className="flex flex-col items-center leading-tight">
//                   <span className="font-semibold">
//                     <LocalizedText en="Benefits" bn="সুবিধা" />
//                   </span>
//                   <span className="global-p2 font-semibold" style={{ color: ORANGE }}>
//                     <LocalizedText en="(As % of Coverage Amount)" bn="(বিমা অঙ্কের শতাংশ হিসেবে)" />
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
//             {rows.map((r, idx) => (
//               <React.Fragment key={idx}>
//                 {/* data row — body content constrained to 70% of header width */}
//                 <TableRow className="border-0 global-p1 hover:bg-white ">
//                   {/* LEFT cell: add px-0 */}
//                   <TableCell className="w-[68%] px-0 text-center align-middle py-4 sm:py-5 md:py-6">
//                     <div className="w-[70%] mx-auto">
//                       <p className="leading-snug" style={{ color: TEXT }}>
//                         <LocalizedText en={r.loss.en} bn={r.loss.bn} />
//                       </p>
//                     </div>
//                   </TableCell>

//                   {/* RIGHT cell: add px-0 */}
//                   <TableCell className="w-[32%] px-0 text-center align-middle py-4 sm:py-5 md:py-6">
//                     <div className="w-[70%] mx-auto">
//                       <span className="tracking-wide" style={{ color: TEXT }}>
//                         <LocalizedText en={r.benefit.en} bn={r.benefit.bn} />
//                       </span>
//                     </div>
//                   </TableCell>
//                 </TableRow>

//                 {/* separator BETWEEN rows — 70% total, centered */}
//                 {idx < rows.length - 1 && (
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

//             {/* final bottom gold bar — 70% total, centered */}
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

//==========================================================================================
//==========================================================================================
//==========================================================================================

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

export default function AccidentalPermanentPartialDisabilitySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const scrollIfHashMatches = () => {
      if (window.location.hash === '#ptd-schedule' && sectionRef.current) {
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
      id="ptd-schedule"
      ref={sectionRef}
      className="container-padding bg-white"
      style={{ scrollMarginTop: HEADER_OFFSET_PX }}
    >
      {/* Titles */}
      <div className="mb-6 md:mb-8">
        <h1 className="global-h1 font-medium uppercase">
          <LocalizedText en="Coverage Under" bn="বীমার কভারেজের অধীনে" />
        </h1>
        <h1 className="global-h1 font-medium uppercase text-[#ED7125]">
          <LocalizedText
            en="Accidental Permanent Partial Disability"
            bn="দুর্ঘটনাজনিত স্থায়ী আংশিক অক্ষমতা।"
          />
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
                <LocalizedText en="Loss of" bn="ক্ষতি" />
              </TableHead>
              <TableHead className="w-[32%] text-center align-bottom" style={{ color: ORANGE }}>
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-semibold">
                    <LocalizedText en="Benefits" bn="সুবিধা" />
                  </span>
                  <span className="global-p2 font-semibold" style={{ color: ORANGE }}>
                    <LocalizedText en="(As % of Coverage Amount)" bn="(বিমা অঙ্কের শতাংশ হিসেবে)" />
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
            {rows.map((r, idx) => (
              <React.Fragment key={idx}>
                {/* Row content constrained to 70% (centered) */}
                <TableRow className="border-0 global-p1 hover:bg-white">
                  <TableCell className="w-[68%] px-0 text-center align-middle py-4 sm:py-5 md:py-6">
                    <div className="w-[70%] mx-auto">
                      <p className="leading-snug" style={{ color: TEXT }}>
                        <LocalizedText en={r.loss.en} bn={r.loss.bn} />
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="w-[32%] px-0 text-center align-middle py-4 sm:py-5 md:py-6">
                    <div className="w-[70%] mx-auto">
                      <span className="tracking-wide" style={{ color: TEXT }}>
                        <LocalizedText en={r.benefit.en} bn={r.benefit.bn} />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>

                {/* 70% separator between rows */}
                {idx < rows.length - 1 && (
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
