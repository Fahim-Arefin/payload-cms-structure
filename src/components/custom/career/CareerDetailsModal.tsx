// import React, { FC } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from '@/components/ui/dialog'
// import { X } from 'lucide-react'
// import GlobalButton from '../shared/GlobalButton'
// import { FaDownload } from 'react-icons/fa'
// import LocalizedRichText from '../shared/LocalizedRichText'
// import LocalizedText from '../shared/LocalizedText'
// import { useLanguage } from '@/context/LanguageContext'
// import { CareerPageOpeningBlockType } from '@/types/payloadCustomTypes'

// // type OpeningDetail = {
// //   topTitle?: any
// //   topTitleBN?: any
// //   topDescription?: any
// //   topDescriptionBN?: any

// //   title?: string
// //   titleBN?: string
// //   responsibilities?: any
// //   responsibilitiesBN?: any
// //   requirements?: any
// //   requirementsBN?: any
// //   location?: string
// //   locationBN?: string
// //   deadline?: string
// //   applyEmail?: string
// //   subjectLine?: string
// //   footer?: string
// //   filename?: string
// // }

// type OpeningDetail = CareerPageOpeningBlockType['cards'][number]['details']

// type CareerDetailsModalProps = {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   details?: OpeningDetail[]
// }

// // ----- helpers for deadline formatting -----

// const getOrdinalSuffix = (day: number) => {
//   const j = day % 10
//   const k = day % 100
//   if (j === 1 && k !== 11) return 'st'
//   if (j === 2 && k !== 12) return 'nd'
//   if (j === 3 && k !== 13) return 'rd'
//   return 'th'
// }

// const toBnDigits = (value: string) => {
//   const bnDigits = '০১২৩৪৫৬৭৮৯'
//   return value.replace(/[0-9]/g, (d) => bnDigits[Number(d)])
// }

// const formatDeadlineEn = (raw?: string) => {
//   if (!raw) return ''
//   const date = new Date(raw)
//   if (Number.isNaN(date.getTime())) return raw

//   const day = date.getDate()
//   const monthName = date.toLocaleString('en-US', { month: 'long' })
//   const year = date.getFullYear()
//   const suffix = getOrdinalSuffix(day)

//   return `${day}${suffix} ${monthName}, ${year}`
// }

// const formatDeadlineBn = (raw?: string) => {
//   if (!raw) return ''
//   const date = new Date(raw)
//   if (Number.isNaN(date.getTime())) return raw

//   const day = date.getDate()
//   const monthName = date.toLocaleString('en-US', { month: 'long' })
//   const year = date.getFullYear()
//   const suffix = getOrdinalSuffix(day)

//   // Only digits become Bangla; suffix + month stay English as requested
//   const dayStrBn = toBnDigits(String(day))
//   const yearStrBn = toBnDigits(String(year))

//   return `${dayStrBn}${suffix} ${monthName}, ${yearStrBn}`
// }

// const CareerDetailsModal: FC<CareerDetailsModalProps> = ({ open, onOpenChange, details }) => {
//   const { language: lang } = useLanguage() // expects { lang: 'en' | 'bn' }

//   if (!details || !details.length) return null

//   const first = details[0]

//   const handleDownload = (filename?: any) => {
//     if (!filename) return
//     const link = document.createElement('a')
//     // link.href = `/assets/job-posts/${filename}`
//     console.log('filename', filename)
//     link.href =
//       (typeof filename === 'object' && filename?.url) ||
//       (typeof filename === 'string' ? `/media/${filename}` : '#')

//     link.download = `${filename}`
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   const formatDeadlineByLang = (raw?: string) =>
//     lang === 'bn' ? formatDeadlineBn(raw) : formatDeadlineEn(raw)

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-[96vw] max-w-[400px] md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl !p-0 rounded-2xl overflow-y-auto max-h-[95vh]">
//         {/* Header */}
//         <div className="sticky top-0 z-30 bg-[#F6EDDD] rounded-t-2xl">
//           <DialogHeader className="flex flex-row items-center justify-between border-b px-6 py-4 bg-[#F6EDDD]">
//             <DialogTitle className="text-[16px] text-left md:text-center md:text-[22px] font-bold text-[#ED7125]">
//               <LocalizedText en="Job Description" bn="জব ডেসক্রিপশন" />
//               {(first?.title || first?.titleBN) && (
//                 <>
//                   {' - '}
//                   <span>
//                     <LocalizedText en={first.title} bn={first.titleBN} />
//                   </span>
//                 </>
//               )}
//             </DialogTitle>
//             <DialogClose asChild>
//               <button className="rounded-full bg-white p-1 border border-neutral-200 hover:bg-neutral-100 ml-3">
//                 <X className="w-4 h-4 md:w-6 md:h-6" />
//               </button>
//             </DialogClose>
//           </DialogHeader>
//         </div>

//         {/* Branding Row */}
//         <div className="flex justify-between px-6 pt-4 pb-2 border-b">
//           <div className="flex flex-col lg:flex-row lg:items-center gap-2">
//             <img
//               src="/assets/images/modalBanner.png"
//               alt="Modal Banner"
//               className="hidden md:block"
//             />
//             <img
//               src="/assets/images/modalBanner.png"
//               alt="Modal Mobile Banner"
//               className="block md:hidden"
//             />

//             {/* topTitle / topTitleBN as rich text */}
//             <div className="text-[#ED7125] text-[18px] lg:text-[22px] xl:text-[32px] font-bold">
//               {first?.topTitle || first?.topTitleBN ? (
//                 <LocalizedRichText en={first.topTitle} bn={first.topTitleBN} />
//               ) : (
//                 <>
//                   JOIN US <br className="hidden md:block" />
//                   IN CRAFTING A <br className="hidden md:block" />
//                   <span className="whitespace-nowrap">BRIGHTER FUTURE</span>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col gap-2 xl:gap-6 2xl:gap-10 items-start">
//             <img
//               src={`/assets/images/mainlogo_2.png`}
//               alt="Shanta Life Logo"
//               className="h-[60px] md:h-[90px] w-auto object-contain ml-2"
//               style={{ maxWidth: 120 }}
//             />
//             <GlobalButton
//               onClick={() => handleDownload(open?.)}
//               text="Download"
//               variant="primary"
//             >
//               <h1 className="text-[14px] md:text-[20px]">Download</h1>
//               <FaDownload />
//             </GlobalButton>
//           </div>
//         </div>

//         {/* topDescription / topDescriptionBN as rich text */}
//         <div className="px-6 pt-6 pb-2 text-[#434342] text-[15px] font-medium text-justify leading-[1.7] rounded-t-none rounded-b-xl">
//           {first?.topDescription || first?.topDescriptionBN ? (
//             <LocalizedRichText en={first.topDescription} bn={first.topDescriptionBN} />
//           ) : (
//             <>
//               With the vision of redefining the idea of Life Insurance in Bangladesh through
//               innovation and a new spirit, Shanta Life is set to commence its operations. Our
//               ambition is to build a devoted team for delivering best-in-class products and services
//               that will transform the industry. If you are driven by the pursuit of excellence and
//               wish to work with a dynamic team, we invite you to be a part of our journey.
//             </>
//           )}
//         </div>

//         {/* Main content */}
//         <div className="p-6 bg-white mb-2 lg:mb-4 space-y-10">
//           {details.map((d, idx) => (
//             <div key={idx}>
//               {(d.title || d.titleBN) && (
//                 <h3 className="text-[22px] font-bold mb-4 lg:mb-6">
//                   <LocalizedText en={d.title} bn={d.titleBN} />
//                 </h3>
//               )}

//               <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
//                 {/* Left: responsibilities + requirements */}
//                 <div>
//                   {d.responsibilities && (
//                     <div className="mb-5">
//                       <div className="text-[18px] font-bold text-[#343434] mb-2">
//                         <LocalizedText en="Key Responsibilities" bn="মূল দায়িত্বসমূহ" />
//                       </div>
//                       <div className="prose prose-sm max-w-none text-[#434342]">
//                         <LocalizedRichText en={d.responsibilities} bn={d.responsibilitiesBN} />
//                       </div>
//                     </div>
//                   )}

//                   {d.requirements && (
//                     <div>
//                       <div className="text-[18px] font-bold text-[#343434] mb-2">
//                         <LocalizedText en="Key Requirements" bn="মূল যোগ্যতাসমূহ" />
//                       </div>
//                       <div className="prose prose-sm max-w-none text-[#434342]">
//                         <LocalizedRichText en={d.requirements} bn={d.requirementsBN} />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right: job info + how to apply */}
//                 <div className="flex flex-col">
//                   <div className="mb-4">
//                     <div className="text-[18px] font-bold text-[#343434] mb-2">
//                       <LocalizedText en="Job Info" bn="চাকরির তথ্য" />
//                     </div>
//                     <div className="text-[15px] mb-1">
//                       {(d.location || d.locationBN) && (
//                         <>
//                           <span className="font-semibold">
//                             <LocalizedText en="Location:" bn="স্থান:" />
//                           </span>{' '}
//                           <LocalizedText en={d.location} bn={d.locationBN} />
//                           <br />
//                         </>
//                       )}
//                       {d.deadline && (
//                         <>
//                           <span className="font-semibold">
//                             <LocalizedText en="Deadline:" bn="ডেডলাইন:" />
//                           </span>{' '}
//                           {formatDeadlineByLang(d.deadline)}
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   {(d.applyEmail || d.subjectLine) && (
//                     <div className="bg-[#F6EDDD] rounded-xl p-4">
//                       <div className="font-bold text-[#ED7125] text-[16px] mb-1">
//                         <LocalizedText en="How to Apply?" bn="কিভাবে আবেদন করবেন?" />
//                       </div>
//                       <div className="text-[15px] text-[#434342]">
//                         {d.applyEmail && (
//                           <>
//                             <LocalizedText en="Email your updated CV to" bn="আপডেটেড সিভি পাঠান" />{' '}
//                             <span className="font-semibold">{d.applyEmail}</span>
//                             <br />
//                           </>
//                         )}
//                         {d.subjectLine && (
//                           <>
//                             <LocalizedText
//                               en="Mentioning the Subject Line:"
//                               bn="সাবজেক্ট লাইনে লিখুন:"
//                             />{' '}
//                             <span className="font-semibold">{d.subjectLine}</span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {d.footer && <div className="mt-4 text-[14px] text-[#434342]">{d.footer}</div>}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CareerDetailsModal

// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// src/components/custom/career/CareerDetailsModal.tsx
'use client'

import React, { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import GlobalButton from '../shared/GlobalButton'
import { FaDownload } from 'react-icons/fa'
import LocalizedRichText from '../shared/LocalizedRichText'
import LocalizedText from '../shared/LocalizedText'
import { useLanguage } from '@/context/LanguageContext'
import { CareerPageOpeningBlockType } from '@/types/payloadCustomTypes'

type OpeningDetail = CareerPageOpeningBlockType['cards'][number]['details']
type OpeningFile = CareerPageOpeningBlockType['cards'][number]['filename']

type CareerDetailsModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  details?: OpeningDetail[]
  file?: OpeningFile
}

// ----- helpers for deadline formatting -----

const getOrdinalSuffix = (day: number) => {
  const j = day % 10
  const k = day % 100
  if (j === 1 && k !== 11) return 'st'
  if (j === 2 && k !== 12) return 'nd'
  if (j === 3 && k !== 13) return 'rd'
  return 'th'
}

const toBnDigits = (value: string) => {
  const bnDigits = '০১২৩৪৫৬৭৮৯'
  return value.replace(/[0-9]/g, (d) => bnDigits[Number(d)])
}

const formatDeadlineEn = (raw?: string) => {
  if (!raw) return ''
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw

  const day = date.getDate()
  const monthName = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  const suffix = getOrdinalSuffix(day)

  return `${day}${suffix} ${monthName}, ${year}`
}

const formatDeadlineBn = (raw?: string) => {
  if (!raw) return ''
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw

  const day = date.getDate()
  const monthName = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  const suffix = getOrdinalSuffix(day)

  // Only digits become Bangla; suffix + month stay English as requested
  const dayStrBn = toBnDigits(String(day))
  const yearStrBn = toBnDigits(String(year))

  return `${dayStrBn}${suffix} ${monthName}, ${yearStrBn}`
}

const getFileHref = (file: any): string => {
  if (!file) return ''

  // populated upload object (Payload media)
  if (typeof file === 'object') {
    if (typeof file.url === 'string' && file.url) return file.url
    if (typeof file.filename === 'string' && file.filename) return `/media/${file.filename}`
    if (typeof file.id === 'string' && file.id) return `/media/${file.id}`
  }

  // string fallback (id or filename)
  if (typeof file === 'string') return `/media/${file}`

  return ''
}

const getDownloadName = (file: any): string => {
  if (!file) return 'attachment'
  if (typeof file === 'object') {
    return file?.filename || file?.name || file?.originalFilename || 'attachment'
  }
  if (typeof file === 'string') return file
  return 'attachment'
}

const CareerDetailsModal: FC<CareerDetailsModalProps> = ({ open, onOpenChange, details, file }) => {
  const { language: lang } = useLanguage()

  if (!details || !details.length) return null
  const first = details[0]

  const handleDownload = (f?: any) => {
    const href = getFileHref(f)
    if (!href) return

    const link = document.createElement('a')
    link.href = href
    link.download = getDownloadName(f)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDeadlineByLang = (raw?: string) =>
    lang === 'bn' ? formatDeadlineBn(raw) : formatDeadlineEn(raw)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] max-w-[400px] md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl !p-0 rounded-2xl overflow-y-auto max-h-[95vh]">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-[#F6EDDD] rounded-t-2xl">
          <DialogHeader className="flex flex-row items-center justify-between border-b px-6 py-4 bg-[#F6EDDD]">
            <DialogTitle className="text-[16px] text-left md:text-center md:text-[22px] font-bold text-[#ED7125]">
              <LocalizedText en="Job Description" bn="জব ডেসক্রিপশন" />
              {(first?.title || first?.titleBN) && (
                <>
                  {' - '}
                  <span>
                    <LocalizedText en={first.title} bn={first.titleBN} />
                  </span>
                </>
              )}
            </DialogTitle>
            <DialogClose asChild>
              <button className="rounded-full bg-white p-1 border border-neutral-200 hover:bg-neutral-100 ml-3">
                <X className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </DialogClose>
          </DialogHeader>
        </div>

        {/* Branding Row */}
        <div className="flex justify-between px-6 pt-4 pb-2 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <img
              src="/assets/images/modalBanner.png"
              alt="Modal Banner"
              className="hidden md:block"
            />
            <img
              src="/assets/images/modalBanner.png"
              alt="Modal Mobile Banner"
              className="block md:hidden"
            />

            {/* topTitle / topTitleBN as rich text */}
            <div className="text-[#ED7125] text-[18px] lg:text-[22px] xl:text-[32px] font-bold">
              {first?.topTitle || first?.topTitleBN ? (
                <LocalizedRichText en={first.topTitle} bn={first.topTitleBN} />
              ) : (
                <>
                  JOIN US <br className="hidden md:block" />
                  IN CRAFTING A <br className="hidden md:block" />
                  <span className="whitespace-nowrap">BRIGHTER FUTURE</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 xl:gap-6 2xl:gap-10 items-start">
            <img
              src={`/assets/images/mainlogo_2.png`}
              alt="Shanta Life Logo"
              className="h-[60px] md:h-[90px] w-auto object-contain ml-2"
              style={{ maxWidth: 120 }}
            />

            <GlobalButton onClick={() => handleDownload(file)} text="Download" variant="primary">
              <h1 className="text-[14px] md:text-[20px]">Download</h1>
              <FaDownload />
            </GlobalButton>
          </div>
        </div>

        {/* topDescription / topDescriptionBN as rich text */}
        <div className="px-6 pt-6 pb-2 text-[#434342] text-[15px] font-medium text-justify leading-[1.7] rounded-t-none rounded-b-xl">
          {first?.topDescription || first?.topDescriptionBN ? (
            <LocalizedRichText en={first.topDescription} bn={first.topDescriptionBN} />
          ) : (
            <>
              With the vision of redefining the idea of Life Insurance in Bangladesh through
              innovation and a new spirit, Shanta Life is set to commence its operations. Our
              ambition is to build a devoted team for delivering best-in-class products and services
              that will transform the industry. If you are driven by the pursuit of excellence and
              wish to work with a dynamic team, we invite you to be a part of our journey.
            </>
          )}
        </div>

        {/* Main content */}
        <div className="p-6 bg-white mb-2 lg:mb-4 space-y-10">
          {details.map((d, idx) => (
            <div key={idx}>
              {(d.title || d.titleBN) && (
                <h3 className="text-[22px] font-bold mb-4 lg:mb-6">
                  <LocalizedText en={d.title} bn={d.titleBN} />
                </h3>
              )}

              <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
                {/* Left: responsibilities + requirements */}
                <div>
                  {d.responsibilities && (
                    <div className="mb-5">
                      <div className="text-[18px] font-bold text-[#343434] mb-2">
                        <LocalizedText en="Key Responsibilities" bn="মূল দায়িত্বসমূহ" />
                      </div>
                      <div className="prose prose-sm max-w-none text-[#434342]">
                        <LocalizedRichText en={d.responsibilities} bn={d.responsibilitiesBN} />
                      </div>
                    </div>
                  )}

                  {d.requirements && (
                    <div>
                      <div className="text-[18px] font-bold text-[#343434] mb-2">
                        <LocalizedText en="Key Requirements" bn="মূল যোগ্যতাসমূহ" />
                      </div>
                      <div className="prose prose-sm max-w-none text-[#434342]">
                        <LocalizedRichText en={d.requirements} bn={d.requirementsBN} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: job info + how to apply */}
                <div className="flex flex-col">
                  <div className="mb-4">
                    <div className="text-[18px] font-bold text-[#343434] mb-2">
                      <LocalizedText en="Job Info" bn="চাকরির তথ্য" />
                    </div>
                    <div className="text-[15px] mb-1">
                      {(d.location || d.locationBN) && (
                        <>
                          <span className="font-semibold">
                            <LocalizedText en="Location:" bn="স্থান:" />
                          </span>{' '}
                          <LocalizedText en={d.location} bn={d.locationBN} />
                          <br />
                        </>
                      )}
                      {d.deadline && (
                        <>
                          <span className="font-semibold">
                            <LocalizedText en="Deadline:" bn="ডেডলাইন:" />
                          </span>{' '}
                          {formatDeadlineByLang(d.deadline)}
                        </>
                      )}
                    </div>
                  </div>

                  {(d.applyEmail || d.subjectLine) && (
                    <div className="bg-[#F6EDDD] rounded-xl p-4">
                      <div className="font-bold text-[#ED7125] text-[16px] mb-1">
                        <LocalizedText en="How to Apply?" bn="কিভাবে আবেদন করবেন?" />
                      </div>
                      <div className="text-[15px] text-[#434342]">
                        {d.applyEmail && (
                          <>
                            <LocalizedText en="Email your updated CV to" bn="আপডেটেড সিভি পাঠান" />{' '}
                            <span className="font-semibold">{d.applyEmail}</span>
                            <br />
                          </>
                        )}
                        {d.subjectLine && (
                          <>
                            <LocalizedText
                              en="Mentioning the Subject Line:"
                              bn="সাবজেক্ট লাইনে লিখুন:"
                            />{' '}
                            <span className="font-semibold">{d.subjectLine}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {d.footer && <div className="mt-4 text-[14px] text-[#434342]">{d.footer}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CareerDetailsModal
