'use client'

import React, { useRef, useState } from 'react'
import CalculateForm from './CalculateForm'
import { ApiResponse, getTotalPremium } from '@/utils/premiumCalculator'
import PlanDetailsSection from '../purchase/PlanDetailsSection'
import PurchaseCalculateSection from '../purchase/PurchaseCalculateSection'
import LocalizedText from '../shared/LocalizedText'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedRichText from '../shared/LocalizedRichText'
import { PremCalculatorPageBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: PremCalculatorPageBlockType
}

/** Quick luminance-based contrast helper to pick white/black text over a hex background. */
function pickTextColor(bgHex?: string) {
  const hex = (bgHex || '').replace('#', '')
  if (![3, 6, 8].includes(hex.length)) return '#3A3A3C' // default dark
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
  // relative luminance
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance > 0.6 ? '#3A3A3C' : '#FFFFFF'
}

const CalculatorSection = ({ block }: Props) => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
  const [selectedPlanName, setSelectedPlanName] = useState<string>('')

  const [formData, setFormData] = useState({
    PlanCode: 0,
    Age: 0,
    dateOfBirth: null as Date | null,
    SumAssured: 0,
    Term: 0,
    PaymentMode: 0,
    Gender: null as number | null,
    phoneNumber: '',
    annualIncome: 0,
    name: '',
    email: '',
  })

  const [scrollSignal, setScrollSignal] = useState<number>(0)
  const resultRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const handleApiResponse = (response: ApiResponse, paymentMode: string, planName?: string) => {
    setApiResponse(response)
    setConfirmedPaymentMode(paymentMode)
    if (planName) setSelectedPlanName(planName)
    if (window.innerWidth < 1025) setScrollSignal((prev) => prev + 1)
  }

  // Map plan names to PlanDetailsSection expected codes
  const getPlanDetailsCode = (planName?: string): number => {
    const map: Record<string, number> = {
      'Shanta Child Education Plan (3%)': 1,
      'Shanta Endowment Plan': 2,
      'Shanta 3 Stage Plan': 3,
      'Shanta 4 Stage Plan': 4,
    }
    if (selectedPlanName && map[selectedPlanName]) return map[selectedPlanName]
    if (planName && map[planName]) return map[planName]
    if (selectedPlanName) {
      if (selectedPlanName.includes('Child Education')) return 1
      if (selectedPlanName.includes('Endowment')) return 2
      if (selectedPlanName.includes('3 Stage')) return 3
      if (selectedPlanName.includes('4 Stage')) return 4
    }
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

  return (
    <div
      className="px-5 pt-12 py-4
           md:px-24 md:pt-24
           lg:px-[130px]  lg:pt-[110px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[150px] lg:py-10 mb-4 lg:mb-10 xl:mb-20"
    >
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

        {/* Section description (rich text) */}
        {(block?.description || block?.descriptionBN) && (
          <div className="text-[12px] md:global-p1 text-start w-full xl:w-[80%] text-[#434343]">
            <LocalizedRichText en={block?.description} bn={block?.descriptionBN} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] gap-4 lg:gap-10 justify-center mt-6 lg:mt-10 xl:mt-20">
        {/* Left: Result / Cards */}
        <div className="w-full order-2 lg:order-1 ">
          {apiResponse ? (
            <div ref={resultRef}>
              <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
              <PurchaseCalculateSection
                confirmedPaymentMode={confirmedPaymentMode}
                getTotalPremium={getTotalPremium}
                apiResponse={apiResponse}
                scrollSignal={scrollSignal}
                onCalculateAgain={() => {
                  if (window.innerWidth < 1025 && formRef.current) {
                    const y = formRef.current.getBoundingClientRect().top + window.scrollY
                    const offset = 80
                    window.scrollTo({ top: y - offset, behavior: 'smooth' })
                  }
                }}
              />
            </div>
          ) : (
            <>
              {/* Cards from schema (1–4) */}
              {cards.map((card, idx) => {
                const bg =
                  card.cardBg || (idx === 0 ? '#9C863940' : idx === 1 ? '#CCBF95' : '#9C8639B2')
                const textColor = pickTextColor(bg)
                const isFirst = idx === 0
                const isLast = idx === cards.length - 1

                return (
                  <div
                    key={idx}
                    className={[
                      'px-6 md:px-10 py-4 ',
                      isFirst ? 'pt-6 md:pt-10 pb-4' : '',
                      isFirst ? 'rounded-t-xl' : '',
                      isLast ? 'rounded-b-xl' : '',
                    ].join(' ')}
                    style={{ backgroundColor: bg, color: card?.cardTextColor || '' }}
                  >
                    <h4 className="global-p1 font-bold mb-1">
                      <LocalizedText en={card.cardTitle || ''} bn={card.cardTitleBN || ''} />
                    </h4>

                    {/* If you prefer plain text fallback when rich text is empty */}
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

        {/* Right: Form */}
        <div className="order-1 lg:order-2" ref={formRef}>
          <CalculateForm
            onApiResponse={handleApiResponse}
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
