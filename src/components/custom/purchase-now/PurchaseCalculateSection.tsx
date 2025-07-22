'use client'

import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { ApiResToShow } from '@/utils/premiumCalculator'
import React, { FC, useState } from 'react'

type PurchaseCalculateSectionProps = {
  confirmedPaymentMode: string
  getTotalPremium: any
  apiResponse: any
}

const PurchaseCalculateSection: FC<PurchaseCalculateSectionProps> = ({
  confirmedPaymentMode,
  getTotalPremium,
  apiResponse,
}) => {
  const [isCriticalIllnessCovered, setIsCriticalIllnessCovered] = useState<boolean>(false)
  const [isAccidentCovered, setIsAccidentCovered] = useState<boolean>(false)

  const getPaymentModeKey = (paymentMode: string): keyof ApiResToShow['lifePremium'] => {
    switch (paymentMode) {
      case 'Monthly':
        return 'monthly'
      case 'Quarterly':
        return 'quarterly'
      case 'Semi-annually':
        return 'half_yearly'
      case 'Yearly':
        return 'yearly'
      default:
        return 'monthly'
    }
  }

  const handleCriticalIllnessToggle = () => {
    setIsCriticalIllnessCovered(!isCriticalIllnessCovered)
  }

  // Click handler to toggle accident coverage
  const handleAccidentToggle = () => {
    setIsAccidentCovered(!isAccidentCovered)
  }

  // Helper function to get the total premium including CI and accident coverage if added
  const getTotalPremiumWithCoverage = (paymentMode: string): number => {
    if (!apiResponse) return 0

    const premiums = getTotalPremium(apiResponse, paymentMode)
    const paymentKey = getPaymentModeKey(paymentMode)

    const lifePremium = premiums.lifePremium[paymentKey]
    const ciPremium = isCriticalIllnessCovered ? premiums.ciPremium[paymentKey] : 0
    const accidentPremium = isAccidentCovered ? premiums.accidentPremium[paymentKey] : 0

    return lifePremium + ciPremium + accidentPremium
  }

  return (
    <div className=''>
      <h2 className="global-h4 font-semibold mb-6">
        Your Premium Is - on top of the main output:
      </h2>

      <div className="hidden md:grid grid-cols-4 bg-[#FFFFFFCC] rounded-b-lg ">
        <div className="lg:col-span-2 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:my-3 xl:my-4">
          <div
            className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
              confirmedPaymentMode === 'Monthly' ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold' : 'text-[#1E1E1E]'
            }`}
          >
            Monthly
          </div>
          <div
            className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
              confirmedPaymentMode === 'Monthly' ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold' : 'text-[#1E1E1E]'
            }`}
          >
            <AnimatedCounter
              value={
                confirmedPaymentMode === 'Monthly'
                  ? getTotalPremiumWithCoverage('Monthly')
                  : getTotalPremium(apiResponse, 'Monthly')?.lifePremium.monthly || 0
              }
              prefix="৳"
              showAnimation={confirmedPaymentMode === 'Monthly'}
              duration={800}
            />
          </div>
        </div>
        <div className="lg:col-span-2 p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
          <div
            className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
              confirmedPaymentMode === 'Quarterly' ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold' : 'text-[#1E1E1E]'
            }`}
          >
            Quarterly
          </div>
          <div
            className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
              confirmedPaymentMode === 'Quarterly' ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold' : 'text-[#1E1E1E]'
            }`}
          >
            <AnimatedCounter
              value={
                confirmedPaymentMode === 'Quarterly'
                  ? getTotalPremiumWithCoverage('Quarterly')
                  : getTotalPremium(apiResponse, 'Quarterly')?.lifePremium.quarterly || 0
              }
              prefix="৳"
              showAnimation={confirmedPaymentMode === 'Quarterly'}
              duration={800}
            />
          </div>
        </div>
        <div className="lg:col-span-2 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
          <div
            className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
              confirmedPaymentMode === 'Semi-annually' ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold' : 'text-[#1E1E1E]'
            }`}
          >
            Semi-annually
          </div>
          <div
            className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
              confirmedPaymentMode === 'Semi-annually' ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold' : 'text-[#1E1E1E]'
            }`}
          >
            <AnimatedCounter
              value={
                confirmedPaymentMode === 'Semi-annually'
                  ? getTotalPremiumWithCoverage('Semi-annually')
                  : getTotalPremium(apiResponse, 'Semi-annually')?.lifePremium.half_yearly || 0
              }
              prefix="৳"
              showAnimation={confirmedPaymentMode === 'Semi-annually'}
              duration={800}
            />
          </div>
        </div>
        <div className="lg:col-span-2 p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
          <div
            className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
              confirmedPaymentMode === 'Yearly' ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold' : 'text-[#1E1E1E]'
            }`}
          >
            Yearly
          </div>
          <div
            className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
              confirmedPaymentMode === 'Yearly' ? 'text-[#ED7125] text-[16px] lg:text-[20px] xl:text-[24px] font-bold' : 'text-[#1E1E1E]'
            }`}
          >
            <AnimatedCounter
              value={
                confirmedPaymentMode === 'Yearly'
                  ? getTotalPremiumWithCoverage('Yearly')
                  : getTotalPremium(apiResponse, 'Yearly')?.lifePremium.yearly || 0
              }
              prefix="৳"
              showAnimation={confirmedPaymentMode === 'Yearly'}
              duration={800}
            />
          </div>
        </div>
        {/* <div className="col-span-1 p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
                <div
                  className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
                    confirmedPaymentMode === 'Single' ? 'text-[#ED7125]' : 'text-[#1E1E1E]'
                  }`}
                >
                  Single
                </div>
                <div
                  className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
                    confirmedPaymentMode === 'Single' ? 'text-[#ED7125]' : 'text-[#1E1E1E]'
                  }`}
                >
                  {getTotalPremium(
                    apiResponse,
                    confirmedPaymentMode,
                  ).lifePremium.single.toLocaleString() !== '0'
                    ? `৳${getTotalPremium(apiResponse, confirmedPaymentMode).lifePremium.single.toLocaleString()}`
                    : ''}
                </div>
              </div> */}
        <div className="col-span-5 py-3 px-6 xl:py-4 xl:px-8 space-y-2 mt-2 xl:mt-6">
          <div className="bg-[#F6EDDD] md:px-4 lg:px-1 md:py-1.5 lg:py-1 xl:px-4 xl:py-1.5 md:w-[60%] lg:w-[100%] xl:w-[85%] 2xl:w-[70%] mx-auto rounded-full flex items-center space-x-2">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 4H16.5V20H7.5V4ZM4.5 8.33333H7.5V20H4.5V8.33333ZM16.5 8.33333H19.5V20H16.5V8.33333Z"
                  fill="white"
                />
                <path d="M9.8335 14.666H14.1668V19.9993H9.8335V14.666Z" fill="#92D3F5" />
                <path
                  d="M14.5 7.66667H12.8333V6H11.1667V7.66667H9.5V9.33333H11.1667V11H12.8333V9.33333H14.5V7.66667Z"
                  fill="#EA5A47"
                />
                <path
                  d="M5.6665 10H6.33317V11.6667H5.6665V10ZM5.6665 13.3333H6.33317V15H5.6665V13.3333ZM5.6665 16.6667H6.33317V18.3333H5.6665V16.6667ZM17.6665 10H18.3332V11.6667H17.6665V10ZM17.6665 13.3333H18.3332V15H17.6665V13.3333ZM17.6665 16.6667H18.3332V18.3333H17.6665V16.6667Z"
                  stroke="#92D3F5"
                  strokeWidth="0.444444"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 20V4H7.5V20M16.5 20H7.5M16.5 20H19.5V8.33333H16.5V20ZM7.5 20V8.33333H4.5V20H7.5Z"
                  stroke="black"
                  strokeWidth="0.444444"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9998 20V14.6667M6.33317 11.6667H5.6665V10M6.33317 15H5.6665V13.3333M6.33317 18.3333H5.6665V16.6667M18.3332 11.6667H17.6665V10M18.3332 15H17.6665V13.3333M18.3332 18.3333H17.6665V16.6667M9.83317 14.6667H14.1665V20H9.83317V14.6667ZM14.4998 7.66667H12.8332V6H11.1665V7.66667H9.49984V9.33333H11.1665V11H12.8332V9.33333H14.4998V7.66667Z"
                  stroke="black"
                  strokeWidth="0.444444"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="underline underline-offset-4 text-xs cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleCriticalIllnessToggle}
            >
              {isCriticalIllnessCovered ? 'Remove' : 'Add'}{' '}
              {`৳${getTotalPremium(apiResponse, confirmedPaymentMode).ciPremium[getPaymentModeKey(confirmedPaymentMode)].toLocaleString()}`}{' '}
              taka to Cover 25 Critical Illness!
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
          <div className="bg-[#F6EDDD]  md:px-4 lg:px-1 md:py-1.5 lg:py-1 xl:px-4 xl:py-1.5 md:w-[60%] lg:w-[100%] xl:w-[85%] 2xl:w-[70%] mx-auto rounded-full flex items-center space-x-2">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 4H16.5V20H7.5V4ZM4.5 8.33333H7.5V20H4.5V8.33333ZM16.5 8.33333H19.5V20H16.5V8.33333Z"
                  fill="white"
                />
                <path d="M9.8335 14.666H14.1668V19.9993H9.8335V14.666Z" fill="#92D3F5" />
                <path
                  d="M14.5 7.66667H12.8333V6H11.1667V7.66667H9.5V9.33333H11.1667V11H12.8333V9.33333H14.5V7.66667Z"
                  fill="#EA5A47"
                />
                <path
                  d="M5.6665 10H6.33317V11.6667H5.6665V10ZM5.6665 13.3333H6.33317V15H5.6665V13.3333ZM5.6665 16.6667H6.33317V18.3333H5.6665V16.6667ZM17.6665 10H18.3332V11.6667H17.6665V10ZM17.6665 13.3333H18.3332V15H17.6665V13.3333ZM17.6665 16.6667H18.3332V18.3333H17.6665V16.6667Z"
                  stroke="#92D3F5"
                  strokeWidth="0.444444"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 20V4H7.5V20M16.5 20H7.5M16.5 20H19.5V8.33333H16.5V20ZM7.5 20V8.33333H4.5V20H7.5Z"
                  stroke="black"
                  strokeWidth="0.444444"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9998 20V14.6667M6.33317 11.6667H5.6665V10M6.33317 15H5.6665V13.3333M6.33317 18.3333H5.6665V16.6667M18.3332 11.6667H17.6665V10M18.3332 15H17.6665V13.3333M18.3332 18.3333H17.6665V16.6667M9.83317 14.6667H14.1665V20H9.83317V14.6667ZM14.4998 7.66667H12.8332V6H11.1665V7.66667H9.49984V9.33333H11.1665V11H12.8332V9.33333H14.4998V7.66667Z"
                  stroke="black"
                  strokeWidth="0.444444"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="underline underline-offset-4 text-xs cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleAccidentToggle}
            >
              {isAccidentCovered
                ? 'Remove accident coverage for'
                : "Prone to accidents? Let's get you covered in"}{' '}
              {`৳${getTotalPremium(apiResponse, confirmedPaymentMode).accidentPremium[getPaymentModeKey(confirmedPaymentMode)].toLocaleString()}`}{' '}
              taka!
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
        </div>
      </div>
    </div>
  )
}

export default PurchaseCalculateSection
