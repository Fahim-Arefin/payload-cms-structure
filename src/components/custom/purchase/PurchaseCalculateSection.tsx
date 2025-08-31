'use client'

import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { ApiResToShow } from '@/utils/premiumCalculator'
import React, { FC, useEffect, useRef, useState } from 'react'
import GlobalButton from '../shared/GlobalButton'
import { Checkbox } from '@/components/ui/checkbox'
// import PurchaseCalculateSectionCommon from '@/components/custom/purchase/PurchaseCalculateSectionCommon'

type PurchaseCalculateSectionProps = {
  confirmedPaymentMode: string
  getTotalPremium: any
  apiResponse: any
  scrollSignal?: number
  onCalculateAgain?: () => void
}

const PurchaseCalculateSection: FC<PurchaseCalculateSectionProps> = ({
  confirmedPaymentMode,
  getTotalPremium,
  apiResponse,
  scrollSignal,
  onCalculateAgain,
}) => {
  const [ciSelection, setCiSelection] = useState<'ci19' | 'ci25' | null>(null)
  const [isAccidentSelected, setIsAccidentSelected] = useState<boolean>(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const brandCheckbox =
    'w-4 h-4 md:w-5 md:h-5 rounded-sm border-[#ED7125] data-[state=checked]:bg-[#ED7125] data-[state=checked]:border-[#ED7125] focus-visible:ring-0 focus-visible:ring-offset-0'

  const getPaymentModeKey = (paymentMode: string): keyof ApiResToShow['lifePremium'] => {
    switch (paymentMode) {
      case 'Monthly':
        return 'monthly'
      case 'Quarterly':
        return 'quarterly'
      case 'Semi-annually':
      case 'Half Yearly':
        return 'half_yearly'
      case 'Yearly':
        return 'yearly'
      case 'Single':
        return 'single'
      default:
        return 'monthly'
    }
  }

  const handleCriticalIllness19Toggle = () => {
    setCiSelection((prev) => (prev === 'ci19' ? null : 'ci19')) // mutually exclusive within CI
  }

  const handleCriticalIllness25Toggle = () => {
    setCiSelection((prev) => (prev === 'ci25' ? null : 'ci25'))
  }

  const handleAccidentToggle = () => {
    setIsAccidentSelected((prev) => !prev) // independent toggle
  }

  // Helper function to get the total premium including selected coverage if any
  const getTotalPremiumWithCoverage = (paymentMode: string): number => {
    if (!apiResponse) return 0
    const premiums = getTotalPremium(apiResponse, paymentMode)
    const paymentKey = getPaymentModeKey(paymentMode)

    const life = premiums.lifePremium[paymentKey]
    const ci =
      ciSelection === 'ci19'
        ? premiums.ciPremium[paymentKey]
        : ciSelection === 'ci25'
          ? premiums.ci25Premium[paymentKey]
          : 0
    const accident = isAccidentSelected ? premiums.accidentPremium[paymentKey] : 0

    return life + ci + accident
  }

  useEffect(() => {
    if (window.innerWidth < 1025 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [scrollSignal]) // ✅ scroll every time signal changes

  return (
    <div className="" ref={sectionRef}>
      <h2 className="global-h3 lg:global-h4 font-semibold mb-2">
        Your <span className="text-[#ED7125]">Premium</span>
      </h2>
      <div className="h-[1px] w-full bg-[#ED7125] mb-6" />

      <div className="grid grid-cols-4 gap-2 bg-[#FFFFFFCC] rounded-b-lg ">
        {confirmedPaymentMode !== 'Single' && (
          <>
            <div className="col-span-2 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:my-3 xl:my-4">
              <div
                className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
                  confirmedPaymentMode === 'Monthly'
                    ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold'
                    : 'text-[#1E1E1E]'
                }`}
              >
                Monthly
              </div>
              <div
                className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
                  confirmedPaymentMode === 'Monthly'
                    ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold'
                    : 'text-[#1E1E1E]'
                }`}
              >
                <AnimatedCounter
                  value={Math.ceil(
                    confirmedPaymentMode === 'Monthly'
                      ? getTotalPremiumWithCoverage('Monthly')
                      : getTotalPremium(apiResponse, 'Monthly')?.lifePremium.monthly || 0,
                  )}
                  prefix="৳"
                  showAnimation={confirmedPaymentMode === 'Monthly'}
                  duration={800}
                />
              </div>
            </div>
            <div className="col-span-2 p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
              <div
                className={`text-[16px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
                  confirmedPaymentMode === 'Quarterly'
                    ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold'
                    : 'text-[#1E1E1E]'
                }`}
              >
                Quarterly
              </div>
              <div
                className={`text-[16px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
                  confirmedPaymentMode === 'Quarterly'
                    ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold'
                    : 'text-[#1E1E1E]'
                }`}
              >
                <AnimatedCounter
                  value={Math.ceil(
                    confirmedPaymentMode === 'Quarterly'
                      ? getTotalPremiumWithCoverage('Quarterly')
                      : getTotalPremium(apiResponse, 'Quarterly')?.lifePremium.quarterly || 0,
                  )}
                  prefix="৳"
                  showAnimation={confirmedPaymentMode === 'Quarterly'}
                  duration={800}
                />
              </div>
            </div>
            <div className="col-span-2 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
              <div
                className={`text-[16px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
                  confirmedPaymentMode === 'Half Yearly'
                    ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold'
                    : 'text-[#1E1E1E]'
                }`}
              >
                Half Yearly
              </div>
              <div
                className={`text-[16px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
                  confirmedPaymentMode === 'Half Yearly'
                    ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold'
                    : 'text-[#1E1E1E]'
                }`}
              >
                <AnimatedCounter
                  value={Math.ceil(
                    confirmedPaymentMode === 'Half Yearly'
                      ? getTotalPremiumWithCoverage('Half Yearly')
                      : getTotalPremium(apiResponse, 'Half Yearly')?.lifePremium.half_yearly || 0,
                  )}
                  prefix="৳"
                  showAnimation={confirmedPaymentMode === 'Half Yearly'}
                  duration={800}
                />
              </div>
            </div>
            <div className="col-span-2 p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
              <div
                className={`text-[16px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
                  confirmedPaymentMode === 'Yearly'
                    ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold'
                    : 'text-[#1E1E1E]'
                }`}
              >
                Yearly
              </div>
              <div
                className={`text-[16px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
                  confirmedPaymentMode === 'Yearly'
                    ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold'
                    : 'text-[#1E1E1E]'
                }`}
              >
                <AnimatedCounter
                  value={Math.ceil(
                    confirmedPaymentMode === 'Yearly'
                      ? getTotalPremiumWithCoverage('Yearly')
                      : getTotalPremium(apiResponse, 'Yearly')?.lifePremium.yearly || 0,
                  )}
                  prefix="৳"
                  showAnimation={confirmedPaymentMode === 'Yearly'}
                  duration={800}
                />
              </div>
            </div>
          </>
        )}
        {confirmedPaymentMode === 'Single' && (
          <div className="col-span-4 p-6 py-8 bg-gradient-to-br from-[#ED7125]/10 to-[#ED7125]/20 rounded-lg border border-[#ED7125]/30">
            <div className="text-center">
              <div className="text-[#ED7125] text-[18px] lg:text-[24px] xl:text-[28px] font-bold mb-3">
                Single Payment
              </div>
              <div className="text-[#ED7125] text-[24px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] font-bold">
                <AnimatedCounter
                  value={Math.ceil(getTotalPremiumWithCoverage('Single'))}
                  prefix="৳"
                  showAnimation={true}
                  duration={800}
                />
              </div>
            </div>
          </div>
        )}
        <div className="col-span-5 py-3 px-6 xl:py-4 xl:px-8 space-y-2 mt-2 xl:mt-6">
          {getTotalPremium(apiResponse, confirmedPaymentMode).ciPremium[
            getPaymentModeKey(confirmedPaymentMode)
          ] > 0 && (
            <div className="bg-[#F6EDDD] md:px-4 lg:px-1 md:py-1.5 lg:py-1 xl:px-4 xl:py-1.5 md:w-[60%] lg:w-[100%] xl:w-[85%] 2xl:w-[70%] mx-auto rounded-full flex items-center space-x-2">
              <Checkbox
                className={brandCheckbox}
                checked={ciSelection === 'ci19'}
                onCheckedChange={handleCriticalIllness19Toggle}
                aria-label="Toggle CI-19 coverage"
                id="ci19-left"
              />

              <div
                className="underline underline-offset-4 text-xs cursor-pointer hover:text-blue-600 transition-colors"
                onClick={handleCriticalIllness19Toggle}
              >
                <>
                  {ciSelection === 'ci19' ? 'Remove' : 'Add'}{' '}
                  {`৳${Math.ceil(getTotalPremium(apiResponse, confirmedPaymentMode).ciPremium[getPaymentModeKey(confirmedPaymentMode)]).toLocaleString()}`}{' '}
                  taka <span className="font-bold">{confirmedPaymentMode}</span> to Cover 19
                  Critical Illness!
                </>
              </div>

              {/* this belwo div will be align right of the flex*/}
              <div className="flex-1 flex justify-end">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
                    fill="#1F1F1F"
                  />
                </svg>
              </div>
            </div>
          )}
          {getTotalPremium(apiResponse, confirmedPaymentMode).ci25Premium[
            getPaymentModeKey(confirmedPaymentMode)
          ] > 0 && (
            <div className="bg-[#F6EDDD] md:px-4 lg:px-1 md:py-1.5 lg:py-1 xl:px-4 xl:py-1.5 md:w-[60%] lg:w-[100%] xl:w-[85%] 2xl:w-[70%] mx-auto rounded-full flex items-center space-x-2">
              <Checkbox
                className={brandCheckbox}
                checked={ciSelection === 'ci25'}
                onCheckedChange={handleCriticalIllness25Toggle}
                aria-label="Toggle CI-25 coverage"
                id="ci25-left"
              />

              <div
                className="underline underline-offset-4 text-xs cursor-pointer hover:text-blue-600 transition-colors"
                onClick={handleCriticalIllness25Toggle}
              >
                <>
                  {ciSelection === 'ci25' ? 'Remove' : 'Add'}{' '}
                  {`৳${Math.ceil(getTotalPremium(apiResponse, confirmedPaymentMode).ci25Premium[getPaymentModeKey(confirmedPaymentMode)]).toLocaleString()}`}{' '}
                  taka <span className="font-bold">{confirmedPaymentMode}</span> to Cover 25
                  Critical Illness!
                </>
              </div>

              {/* this belwo div will be align right of the flex*/}
              <div className="flex-1 flex justify-end">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
                    fill="#1F1F1F"
                  />
                </svg>
              </div>
            </div>
          )}
          {getTotalPremium(apiResponse, confirmedPaymentMode).accidentPremium[
            getPaymentModeKey(confirmedPaymentMode)
          ] > 0 && (
            <>
              <div className="bg-[#F6EDDD]  md:px-4 lg:px-1 md:py-1.5 lg:py-1 xl:px-4 xl:py-1.5 md:w-[60%] lg:w-[100%] xl:w-[85%] 2xl:w-[70%] mx-auto rounded-full flex items-center space-x-2">
                <Checkbox
                  className={brandCheckbox}
                  checked={isAccidentSelected}
                  onCheckedChange={handleAccidentToggle}
                  aria-label="Toggle Accident coverage"
                  id="acc-left"
                />
                <div
                  className="underline underline-offset-4 text-xs cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={handleAccidentToggle}
                >
                  {isAccidentSelected
                    ? 'Remove accident coverage for'
                    : "Prone to accidents? Let's get you covered in"}{' '}
                  {`৳${Math.ceil(getTotalPremium(apiResponse, confirmedPaymentMode).accidentPremium[getPaymentModeKey(confirmedPaymentMode)]).toLocaleString()}`}{' '}
                  taka <span className="font-bold">{confirmedPaymentMode}</span>!
                </div>
                <div className="flex-1 flex justify-end">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
                      fill="#1F1F1F"
                    />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center lg:hidden mt-4">
        <GlobalButton
          onClick={onCalculateAgain}
          className=""
          variant="secondary"
          text="Calculate Again"
        />
      </div>
    </div>
  )
}

export default PurchaseCalculateSection
