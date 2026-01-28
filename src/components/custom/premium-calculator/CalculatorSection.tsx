// 'use client'

// import React, { useRef, useState } from 'react'
// import CalculateForm from './CalculateForm'
// import { ApiResponse, getTotalPremium } from '@/utils/premiumCalculator'
// import PlanDetailsSection from '../purchase/PlanDetailsSection'
// import PurchaseCalculateSection from '../purchase/PurchaseCalculateSection'
// import LocalizedText from '../shared/LocalizedText'
// import LocalizedHighlighted from '../shared/LocalizedHighlighted'
// import LocalizedRichText from '../shared/LocalizedRichText'
// import { PremCalculatorPageBlockType } from '@/types/payloadCustomTypes'

// type Props = {
//   block: PremCalculatorPageBlockType
// }

// /** Quick luminance-based contrast helper to pick white/black text over a hex background. */
// function pickTextColor(bgHex?: string) {
//   const hex = (bgHex || '').replace('#', '')
//   if (![3, 6, 8].includes(hex.length)) return '#3A3A3C' // default dark
//   const normalized =
//     hex.length === 3
//       ? hex
//           .split('')
//           .map((c) => c + c)
//           .join('')
//       : hex.slice(0, 6)

//   const r = parseInt(normalized.slice(0, 2), 16)
//   const g = parseInt(normalized.slice(2, 4), 16)
//   const b = parseInt(normalized.slice(4, 6), 16)
//   // relative luminance
//   const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
//   return luminance > 0.6 ? '#3A3A3C' : '#FFFFFF'
// }

// const CalculatorSection = ({ block }: Props) => {
//   const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
//   const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
//   const [selectedPlanName, setSelectedPlanName] = useState<string>('')

//   const [formData, setFormData] = useState({
//     PlanCode: 0,
//     Age: 0,
//     dateOfBirth: null as Date | null,
//     SumAssured: 0,
//     Term: 0,
//     PaymentMode: 0,
//     Gender: null as number | null,
//     phoneNumber: '',
//     annualIncome: 0,
//     name: '',
//     email: '',
//   })

//   const [scrollSignal, setScrollSignal] = useState<number>(0)
//   const resultRef = useRef<HTMLDivElement>(null)
//   const formRef = useRef<HTMLDivElement>(null)

//   const handleApiResponse = (response: ApiResponse, paymentMode: string, planName?: string) => {
//     setApiResponse(response)
//     setConfirmedPaymentMode(paymentMode)
//     if (planName) setSelectedPlanName(planName)
//     if (window.innerWidth < 1025) setScrollSignal((prev) => prev + 1)
//   }

//   // Map plan names to PlanDetailsSection expected codes
//   const getPlanDetailsCode = (planName?: string): number => {
//     const map: Record<string, number> = {
//       'Shanta Child Education Plan (3%)': 1,
//       'Shanta Endowment Plan': 2,
//       'Shanta 3 Stage Plan': 3,
//       'Shanta 4 Stage Plan': 4,
//     }
//     if (selectedPlanName && map[selectedPlanName]) return map[selectedPlanName]
//     if (planName && map[planName]) return map[planName]
//     if (selectedPlanName) {
//       if (selectedPlanName.includes('Child Education')) return 1
//       if (selectedPlanName.includes('Endowment')) return 2
//       if (selectedPlanName.includes('3 Stage')) return 3
//       if (selectedPlanName.includes('4 Stage')) return 4
//     }
//     return 1
//   }

//   const plans = [
//     {
//       text: 'Shanta Child Education Plan',
//       videoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
//       code: 1,
//     },
//     {
//       text: 'Shanta Endowment Plan',
//       videoLink: 'https://www.youtube.com/embed/CkKkdNkBk9g',
//       code: 2,
//     },
//     {
//       text: 'Shanta 3 Stage Plan',
//       videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
//       code: 3,
//     },
//     {
//       text: 'Shanta 4 Stage Plan',
//       videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
//       code: 4,
//     },
//   ]

//   const sectionTitleEn = block?.title ?? ''
//   const sectionTitleBn = block?.titleBN ?? ''
//   const sectionHiEn = block?.highlightedTitle ?? ''
//   const sectionHiBn = block?.highlightedTitleBN ?? ''

//   const cards = block?.cards ?? []

//   return (
//     <div
//       className="px-5 pt-12 py-4
//            md:px-24 md:pt-24
//            lg:px-[130px]  lg:pt-[110px]
//            xl:px-[200px]  xl:pt-[100px]
//            2xl:px-[300px] 2xl:pt-[150px] lg:py-10 mb-4 lg:mb-10 xl:mb-20"
//     >
//       {/* Header */}
//       <div className="flex flex-col items-start justify-start">
//         <h1 className="global-h1 font-semibold text-[#4A4A4A] text-start uppercase mb-4 lg:mb-10">
//           <LocalizedHighlighted
//             textEn={sectionTitleEn}
//             textBn={sectionTitleBn}
//             highlightEn={sectionHiEn}
//             highlightBn={sectionHiBn}
//             highlightClassName="text-[#ED7125] font-semibold"
//           />
//         </h1>

//         {/* Section description (rich text) */}
//         {(block?.description || block?.descriptionBN) && (
//           <div className="text-[12px] md:global-p1 text-start w-full xl:w-[80%] text-[#434343]">
//             <LocalizedRichText en={block?.description} bn={block?.descriptionBN} />
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] gap-4 lg:gap-10 justify-center mt-6 lg:mt-10 xl:mt-20">
//         {/* Left: Result / Cards */}
//         <div className="w-full order-2 lg:order-1 ">
//           {apiResponse ? (
//             <div ref={resultRef}>
//               <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
//               <PurchaseCalculateSection
//                 confirmedPaymentMode={confirmedPaymentMode}
//                 getTotalPremium={getTotalPremium}
//                 apiResponse={apiResponse}
//                 scrollSignal={scrollSignal}
//                 onCalculateAgain={() => {
//                   if (window.innerWidth < 1025 && formRef.current) {
//                     const y = formRef.current.getBoundingClientRect().top + window.scrollY
//                     const offset = 80
//                     window.scrollTo({ top: y - offset, behavior: 'smooth' })
//                   }
//                 }}
//               />
//             </div>
//           ) : (
//             <>
//               {/* Cards from schema (1–4) */}
//               {cards.map((card, idx) => {
//                 const bg =
//                   card.cardBg || (idx === 0 ? '#9C863940' : idx === 1 ? '#CCBF95' : '#9C8639B2')
//                 const textColor = pickTextColor(bg)
//                 const isFirst = idx === 0
//                 const isLast = idx === cards.length - 1

//                 return (
//                   <div
//                     key={idx}
//                     className={[
//                       'px-6 md:px-10 py-4 ',
//                       isFirst ? 'pt-6 md:pt-10 pb-4' : '',
//                       isFirst ? 'rounded-t-xl' : '',
//                       isLast ? 'rounded-b-xl' : '',
//                     ].join(' ')}
//                     style={{ backgroundColor: bg, color: card?.cardTextColor || '' }}
//                   >
//                     <h4 className="global-p1 font-bold mb-1">
//                       <LocalizedText en={card.cardTitle || ''} bn={card.cardTitleBN || ''} />
//                     </h4>

//                     {/* If you prefer plain text fallback when rich text is empty */}
//                     {card.cardDesc || card.cardDescBN ? (
//                       <div className="global-p2 font-light">
//                         <LocalizedRichText en={card.cardDesc} bn={card.cardDescBN} />
//                       </div>
//                     ) : (
//                       <p className="global-p2 font-light opacity-80">
//                         <LocalizedText en="—" bn="—" />
//                       </p>
//                     )}
//                   </div>
//                 )
//               })}
//             </>
//           )}
//         </div>

//         {/* Right: Form */}
//         <div className="order-1 lg:order-2" ref={formRef}>
//           <CalculateForm
//             onApiResponse={handleApiResponse}
//             formData={formData}
//             setFormData={setFormData}
//             consentEn={block?.premiumCalculatorForm?.consentText}
//             consentBn={block?.premiumCalculatorForm?.consentTextBN}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CalculatorSection

// ==================================================================================
// ==================================================================================
// ==================================================================================

'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { GlobalFooter } from '@/payload-types'
import type { PremCalculatorPageBlockType } from '@/types/payloadCustomTypes'

import CalculateForm from './CalculateForm'
import PlanDetailsSection from '../purchase/PlanDetailsSection'
import PurchaseCalculateSection from '../purchase/PurchaseCalculateSection'

import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedRichText from '../shared/LocalizedRichText'
import LocalizedText from '../shared/LocalizedText'
import GlobalButton from '../shared/GlobalButton'
import useSSRLanguage from '@/hooks/useSSRLanguage'

import { getTotalPremium } from '@/utils/premiumCalculator'
import AgentVerifyModal from '../home/AgentVerifyModal'
import QuotePdfModal from '../home/QuotePdfModal'

type Props = {
  block: PremCalculatorPageBlockType
  footerData?: GlobalFooter | null
}

type FormData = {
  PlanCode: number
  Age: number
  dateOfBirth: Date | null
  SumAssured: number
  Term: number
  PaymentMode: number
  Gender: number | null
  phoneNumber: string
  annualIncome: number
  name: string
  email: string
}

type QuoteMetaPatch = {
  lang?: 'en' | 'bn'
  plan?: { id?: number; displayName?: string }
  term?: { id?: number; displayName?: string }
  payment?: { id?: number; displayName?: string }
  gender?: { id?: number; displayName?: string }
}

type QuoteMeta = Required<Pick<QuoteMetaPatch, 'lang'>> & {
  plan: { id?: number; displayName?: string }
  term: { id?: number; displayName?: string }
  payment: { id?: number; displayName?: string }
  gender: { id?: number; displayName?: string }
}

type PremiumBreakdown = {
  modeKey: string
  basicPremium: number
  riderPremium: number
  totalModalPremium: number

  // aliases (some pdf templates look for different keys)
  totalPremium: number
  total: number
}

function bnNum(s: string | number) {
  return String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
}

/** Quick luminance-based contrast helper to pick white/black text over a hex background. */
function pickTextColor(bgHex?: string) {
  const hex = (bgHex || '').replace('#', '')
  if (![3, 6, 8].includes(hex.length)) return '#3A3A3C'
  const normalized =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex.slice(0, 6)

  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance > 0.6 ? '#3A3A3C' : '#FFFFFF'
}

function toNumber(v: any): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

/**
 * IMPORTANT:
 * Your API uses paymode_name like: Monthly, Quarterly, HalfYearly, Yearly, Single
 * Quote PDF template might look for: "Half Yearly" or "Single Payment" too.
 */
const MODE_KEYS = ['Monthly', 'Quarterly', 'HalfYearly', 'Yearly', 'Single'] as const

function normalizeModeKey(mode?: string): (typeof MODE_KEYS)[number] {
  const m = String(mode || '').trim()
  if (!m) return 'Yearly'
  if (m === 'Half Yearly') return 'HalfYearly'
  if (m === 'Single Payment') return 'Single'
  if (m === 'HalfYearly') return 'HalfYearly'
  if (m === 'Monthly') return 'Monthly'
  if (m === 'Quarterly') return 'Quarterly'
  if (m === 'Yearly') return 'Yearly'
  if (m === 'Single') return 'Single'
  // fallback: try loose match
  const lower = m.toLowerCase()
  if (lower.includes('month')) return 'Monthly'
  if (lower.includes('quarter')) return 'Quarterly'
  if (lower.includes('half')) return 'HalfYearly'
  if (lower.includes('single')) return 'Single'
  return 'Yearly'
}

/**
 * Mirrors QuoteSection behavior:
 * - build a full "premiumBreakdownByMode" map
 * - each value has {basicPremium, riderPremium, totalModalPremium}
 * - uses getTotalPremium(...) so numbers match PurchaseCalculateSection
 */
function buildBreakdownByMode(args: {
  apiResponse: any
  ciSelection: any
  isAccidentSelected: boolean
}): Record<string, PremiumBreakdown> {
  const { apiResponse, ciSelection, isAccidentSelected } = args
  const out: Record<string, PremiumBreakdown> = {}

  for (const key of MODE_KEYS) {
    // We call the same util PurchaseCalculateSection uses.
    // Signature differs across versions, so we call it safely via `any`.
    const raw = (getTotalPremium as any)(apiResponse, key, ciSelection, isAccidentSelected)

    // Normalize whatever getTotalPremium returns -> {basic, rider, total}
    const obj = raw && typeof raw === 'object' ? raw : {}
    const basic = toNumber(
      obj.basicPremium ?? obj.basic_premium ?? obj.basic ?? obj?.premiumBreakdown?.basicPremium,
    )
    const rider = toNumber(
      obj.riderPremium ?? obj.rider_premium ?? obj.rider ?? obj?.premiumBreakdown?.riderPremium,
    )
    const total = toNumber(
      obj.totalModalPremium ??
        obj.totalPremium ??
        obj.total_modal_premium ??
        obj.total ??
        basic + rider,
    )

    out[key] = {
      modeKey: key,
      basicPremium: basic,
      riderPremium: rider,
      totalModalPremium: total,
      totalPremium: total,
      total: total,
    }
  }

  // Aliases that many templates use
  out['Half Yearly'] = out['HalfYearly']
  out['Single Payment'] = out['Single']

  return out
}

const CalculatorSection = ({ block, footerData }: Props) => {
  const lang = useSSRLanguage()
  const L = (en: string, bn?: string) => (lang === 'en' ? en : (bn ?? en))

  // --- controller state (replacing the hook) ---
  const [formData, setFormData] = useState<FormData>({
    PlanCode: 0,
    Age: 0,
    dateOfBirth: null,
    SumAssured: 0,
    Term: 0,
    PaymentMode: 0,
    Gender: null,
    phoneNumber: '',
    annualIncome: 0,
    name: '',
    email: '',
  })

  const [apiResponse, setApiResponse] = useState<any | null>(null)
  const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('') // paymode_name
  const [selectedPlanName, setSelectedPlanName] = useState<string>('') // canonical key from CalculateForm
  const [scrollSignal, setScrollSignal] = useState<number>(0)

  // addons (same behavior as Block-1 / QuoteSection)
  const [ciSelection, setCiSelection] = useState<any>(null) // keep type flexible
  const [isAccidentSelected, setIsAccidentSelected] = useState<boolean>(false)

  // quote meta (same pattern as QuoteSection)
  const [quoteMeta, setQuoteMeta] = useState<QuoteMeta>({
    lang,
    plan: {},
    term: {},
    payment: {},
    gender: {},
  })

  const mergeQuoteMeta = (patch: QuoteMetaPatch) => {
    setQuoteMeta((prev) => ({
      ...prev,
      ...patch,
      plan: { ...(prev.plan || {}), ...(patch.plan || {}) },
      term: { ...(prev.term || {}), ...(patch.term || {}) },
      payment: { ...(prev.payment || {}), ...(patch.payment || {}) },
      gender: { ...(prev.gender || {}), ...(patch.gender || {}) },
    }))
  }

  useEffect(() => {
    // keep lang synced
    setQuoteMeta((prev) => ({ ...prev, lang }))
  }, [lang])

  // ---- PDF flow gate ----
  const gatePlanCodes = useMemo(() => [6, 8, 9, 10], [])
  const [verifyOpen, setVerifyOpen] = useState(false)
  const [pdfOpen, setPdfOpen] = useState(false)
  const [pdfRequestBody, setPdfRequestBody] = useState<any>(null)

  const resultRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  // ---- premiumBreakdownByMode (maintained like QuoteSection) ----
  const [premiumBreakdownByMode, setPremiumBreakdownByMode] = useState<
    Record<string, PremiumBreakdown>
  >({})

  useEffect(() => {
    if (!apiResponse) {
      setPremiumBreakdownByMode({})
      return
    }
    const map = buildBreakdownByMode({ apiResponse, ciSelection, isAccidentSelected })
    setPremiumBreakdownByMode(map)
  }, [apiResponse, ciSelection, isAccidentSelected])

  const chosenModeKey = normalizeModeKey(confirmedPaymentMode)
  const chosenBreakdown: PremiumBreakdown | null = apiResponse
    ? premiumBreakdownByMode[confirmedPaymentMode] ||
      premiumBreakdownByMode[chosenModeKey] ||
      premiumBreakdownByMode['Yearly'] ||
      null
    : null

  // Ensure term/payment/plan meta is always populated for PDF (even if state updates are slightly behind)
  const safeMetaForPdf = (): QuoteMeta => {
    const termId = quoteMeta.term?.id ?? formData.Term
    const termDisplay =
      quoteMeta.term?.displayName ??
      (termId ? (lang === 'en' ? `${termId} years` : `${bnNum(termId)} বছর`) : '')

    const planId = quoteMeta.plan?.id ?? formData.PlanCode
    const planDisplay = quoteMeta.plan?.displayName ?? selectedPlanName ?? ''

    const payId = quoteMeta.payment?.id ?? formData.PaymentMode
    const payDisplay = quoteMeta.payment?.displayName ?? confirmedPaymentMode ?? ''

    const genderId = quoteMeta.gender?.id ?? formData.Gender ?? undefined
    const genderDisplay =
      quoteMeta.gender?.displayName ??
      (formData.Gender === 1 ? 'Male' : formData.Gender === 2 ? 'Female' : '')

    return {
      lang,
      plan: { id: planId, displayName: planDisplay },
      term: { id: termId, displayName: termDisplay },
      payment: { id: payId, displayName: payDisplay },
      gender: { id: genderId, displayName: genderDisplay },
    }
  }

  const buildPdfRequestBodyNow = () => {
    if (!apiResponse) return null

    // Recompute map NOW (important: avoids stale state when user clicks immediately)
    const mapNow = buildBreakdownByMode({ apiResponse, ciSelection, isAccidentSelected })

    const modeKeyNow = normalizeModeKey(confirmedPaymentMode)
    const selected =
      mapNow[confirmedPaymentMode] || mapNow[modeKeyNow] || mapNow['Yearly'] || mapNow['Yearly']

    return {
      footerData,
      formData,
      apiResponse,

      // meta fields used by the PDF table (Policy Term, Premium Mode, etc.)
      meta: safeMetaForPdf(),
      confirmedPaymentMode: confirmedPaymentMode || safeMetaForPdf().payment.displayName || '',

      // ✅ exactly what QuoteSection passes
      premiumBreakdown: selected,
      premiumBreakdownByMode: mapNow,

      // optional: keep riders state in request (your generator can ignore if unused)
      ciSelection,
      isAccidentSelected,
    }
  }

  const openPdfFlow = () => {
    const body = buildPdfRequestBodyNow()
    if (!body) return
    setPdfRequestBody(body)

    const planCode = Number(formData.PlanCode || body?.meta?.plan?.id || 0)
    if (gatePlanCodes.includes(planCode)) {
      setVerifyOpen(true)
      return
    }
    setPdfOpen(true)
  }

  const onVerified = () => {
    setVerifyOpen(false)
    // rebuild once more to be extra-safe after async verify
    const body = buildPdfRequestBodyNow()
    if (body) setPdfRequestBody(body)
    setPdfOpen(true)
  }

  // Scroll behavior similar to your previous controller
  useEffect(() => {
    if (!scrollSignal || !apiResponse) return
    if (typeof window !== 'undefined' && window.innerWidth < 1025 && resultRef.current) {
      const y = resultRef.current.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: y - 80, behavior: 'smooth' })
    }
  }, [scrollSignal, apiResponse])

  const resetResult = () => {
    setApiResponse(null)
    setConfirmedPaymentMode('')
    setSelectedPlanName('')
    setPdfOpen(false)
    setVerifyOpen(false)
    setPdfRequestBody(null)
    setCiSelection(null)
    setIsAccidentSelected(false)
    setPremiumBreakdownByMode({})
  }

  const handleApiResponse = (response: any, paymentMode: string, planName?: string) => {
    setApiResponse(response)
    setConfirmedPaymentMode(paymentMode || '')
    setSelectedPlanName(planName || '')
    setScrollSignal(Date.now())

    // Patch meta defensively so PDF table never gets blanks
    const termId = formData.Term
    mergeQuoteMeta({
      lang,
      plan: { id: formData.PlanCode, displayName: planName || quoteMeta.plan.displayName || '' },
      term: {
        id: termId,
        displayName:
          quoteMeta.term.displayName ||
          (termId ? (lang === 'en' ? `${termId} years` : `${bnNum(termId)} বছর`) : ''),
      },
      payment: {
        id: formData.PaymentMode,
        displayName: paymentMode || quoteMeta.payment.displayName || '',
      },
    })
  }

  // Map plan names to PlanDetailsSection expected codes (keep old behavior)
  const getPlanDetailsCode = (planName?: string): number => {
    const map: Record<string, number> = {
      'Shanta Child Education Plan (3%)': 1,
      'Shanta Endowment Plan': 2,
      'Shanta 3 Stage Plan': 3,
      'Shanta 4 Stage Plan': 4,
    }

    const name = selectedPlanName || planName || ''
    if (name && map[name]) return map[name]
    if (name.includes('Child Education')) return 1
    if (name.includes('Endowment')) return 2
    if (name.includes('3 Stage')) return 3
    if (name.includes('4 Stage')) return 4
    return 1
  }

  const plans = [
    {
      text: 'Shanta Child Education Plan',
      videoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
      code: 1,
    },
    {
      text: 'Shanta Endowment Plan',
      videoLink: 'https://www.youtube.com/embed/CkKkdNkBk9g',
      code: 2,
    },
    {
      text: 'Shanta 3 Stage Plan',
      videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
      code: 3,
    },
    {
      text: 'Shanta 4 Stage Plan',
      videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
      code: 4,
    },
  ]

  const sectionTitleEn = block?.title ?? ''
  const sectionTitleBn = block?.titleBN ?? ''
  const sectionHiEn = block?.highlightedTitle ?? ''
  const sectionHiBn = block?.highlightedTitleBN ?? ''
  const cards = block?.cards ?? []

  console.log('premiumBreakdownByMode', premiumBreakdownByMode)

  return (
    <div className="px-5 pt-12 py-4 md:px-24 md:pt-24 lg:px-[130px] lg:pt-[110px] xl:px-[200px] xl:pt-[100px] 2xl:px-[300px] 2xl:pt-[150px] lg:py-10 mb-4 lg:mb-10 xl:mb-20">
      {/* Header */}
      <div className="flex flex-col items-start justify-start">
        <h1 className="global-h1 font-semibold text-[#4A4A4A] text-start uppercase mb-4 lg:mb-10">
          <LocalizedHighlighted
            textEn={sectionTitleEn}
            textBn={sectionTitleBn}
            highlightEn={sectionHiEn}
            highlightBn={sectionHiBn}
            highlightClassName="text-[#ED7125] font-semibold"
          />
        </h1>

        {(block?.description || block?.descriptionBN) && (
          <div className="text-[12px] md:global-p1 text-start w-full xl:w-[80%] text-[#434343]">
            <LocalizedRichText en={block?.description} bn={block?.descriptionBN} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] gap-4 lg:gap-10 justify-center mt-6 lg:mt-10 xl:mt-20">
        {/* Left */}
        <div className="w-full order-2 lg:order-1">
          {apiResponse ? (
            <div ref={resultRef}>
              <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />

              <PurchaseCalculateSection
                confirmedPaymentMode={confirmedPaymentMode}
                getTotalPremium={getTotalPremium}
                apiResponse={apiResponse}
                scrollSignal={scrollSignal}
                onCalculateAgain={() => {
                  if (
                    typeof window !== 'undefined' &&
                    window.innerWidth < 1025 &&
                    formRef.current
                  ) {
                    const y = formRef.current.getBoundingClientRect().top + window.scrollY
                    window.scrollTo({ top: y - 80, behavior: 'smooth' })
                  }
                }}
                ciSelection={ciSelection}
                setCiSelection={setCiSelection}
                isAccidentSelected={isAccidentSelected}
                setIsAccidentSelected={setIsAccidentSelected}
              />

              {/* ✅ PDF flow */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <GlobalButton
                  variant="primary"
                  text={L('Download Quote PDF', 'কোট পিডিএফ ডাউনলোড')}
                  onClick={openPdfFlow}
                />
              </div>

              {/* Agent verify gate */}
              <AgentVerifyModal
                open={verifyOpen}
                onOpenChange={setVerifyOpen}
                onVerified={onVerified}
              />

              {/* PDF modal */}
              <QuotePdfModal
                open={pdfOpen}
                onOpenChange={setPdfOpen}
                requestBody={pdfRequestBody}
              />
            </div>
          ) : (
            <>
              {cards.map((card, idx) => {
                const bg =
                  card.cardBg || (idx === 0 ? '#9C863940' : idx === 1 ? '#CCBF95' : '#9C8639B2')
                const _textColor = pickTextColor(bg)
                const isFirst = idx === 0
                const isLast = idx === cards.length - 1

                return (
                  <div
                    key={idx}
                    className={[
                      'px-6 md:px-10 py-4',
                      isFirst ? 'pt-6 md:pt-10 pb-4 rounded-t-xl' : '',
                      isLast ? 'rounded-b-xl' : '',
                    ].join(' ')}
                    style={{ backgroundColor: bg, color: card?.cardTextColor || '' }}
                  >
                    <h4 className="global-p1 font-bold mb-1">
                      <LocalizedText en={card.cardTitle || ''} bn={card.cardTitleBN || ''} />
                    </h4>

                    {card.cardDesc || card.cardDescBN ? (
                      <div className="global-p2 font-light">
                        <LocalizedRichText en={card.cardDesc} bn={card.cardDescBN} />
                      </div>
                    ) : (
                      <p className="global-p2 font-light opacity-80">
                        <LocalizedText en="—" bn="—" />
                      </p>
                    )}
                  </div>
                )
              })}
            </>
          )}
        </div>

        {/* Right */}
        <div className="order-1 lg:order-2" ref={formRef}>
          <CalculateForm
            onApiResponse={handleApiResponse}
            onResetResult={resetResult}
            onMetaChange={mergeQuoteMeta}
            formData={formData}
            setFormData={setFormData}
            consentEn={block?.premiumCalculatorForm?.consentText}
            consentBn={block?.premiumCalculatorForm?.consentTextBN}
          />
        </div>
      </div>
    </div>
  )
}

export default CalculatorSection
