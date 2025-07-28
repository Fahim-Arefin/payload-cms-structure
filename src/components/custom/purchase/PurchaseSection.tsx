'use client'

import React, { useState } from 'react'
import PremiumBreakdown from '../premium-calculator/PremiumBreakdown'
import CalculateForm from '../premium-calculator/CalculateForm'
import PurchaseForm from './PurchaseForm'
import PurchaseCardSection from './PurchaseCardSection'
import { ApiResponse, ApiResToShow, getTotalPremium } from '@/utils/premiumCalculator'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import PurchaseCalculateSection from './PurchaseCalculateSection'
import PlanDetailsSection from './PlanDetailsSection'

type Props = {}

interface FormData {
  PlanCode: number
  Age: number
  PaymentMode: number
  Gender: number | null
  phoneNumber: string
  name: string
  email: string
  city: string
  occupation: string
}

const PurchaseSection = (props: Props) => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
  const [selectedPlanName, setSelectedPlanName] = useState<string>('')
  const [selectedPlanCode, setSelectedPlanCode] = useState<number>(0)
  const [formData, setFormData] = useState<FormData>({
    PlanCode: 0,
    Age: 0,
    PaymentMode: 0,
    Gender: null,
    phoneNumber: '',
    name: '',
    email: '',
    city: '',
    occupation: '',
  })
  const [calculatedPlanCode, setCalculatedPlanCode] = useState<number | null>(null)

  const handleApiResponse = (response: ApiResponse, paymentMode: string, planName?: string) => {
    setApiResponse(response)
    setConfirmedPaymentMode(paymentMode)
    setCalculatedPlanCode(formData.PlanCode)
    if (planName) {
      setSelectedPlanName(planName)
    }
  }

  // Map plan names to PlanDetailsSection expected codes
  const getPlanDetailsCode = (planName?: string): number => {
    // Map plan names to PlanDetailsSection codes
    const planNameToCode: { [key: string]: number } = {
      'Shanta Child Education Plan (3%)': 1,
      'Shanta Endowment Plan': 2,
      'Shanta 3 Stage Plan': 3,
      'Shanta 4 Stage Plan': 4,
    }

    // If we have the selected plan name, use it for mapping
    if (selectedPlanName && planNameToCode[selectedPlanName]) {
      return planNameToCode[selectedPlanName]
    }

    // If no plan name is available, try to use the provided plan name parameter
    if (planName && planNameToCode[planName]) {
      return planNameToCode[planName]
    }

    // Fallback: try to match partial names
    if (selectedPlanName) {
      if (selectedPlanName.includes('Child Education')) return 1
      if (selectedPlanName.includes('Endowment')) return 2
      if (selectedPlanName.includes('3 Stage')) return 3
      if (selectedPlanName.includes('4 Stage')) return 4
    }

    return 1 // Default fallback to show something
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
    // {
    //   text: 'Multi Stage Maturity Plan',
    //   videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
    //   code: 5,
    // },
  ]

  // Helper function to get the correct key for payment mode

  // Click handler to toggle critical illness coverage

  return (
    <div
      className="px-5 pt-12 py-4
           md:px-24 md:pt-24
           lg:px-[130px]  lg:pt-[110px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[150px] lg:py-10 mb-4 lg:mb-10 xl:mb-20"
    >
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-[17px] md:text-[24px] lg:text-[30px] xl:text-[38px] 2xl:text-[46px] font-semibold text-[#4A4A4A] text-start uppercase">
          Let's get a policy
        </h1>
        <h4 className="text-[14px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[32px] font-semibold text-[#4A4A4A] text-start uppercase mb-4 lg:mb-10">
          <span className="text-[#ED7125] font-semibold">for ourselves and our loved ones.</span>
        </h4>
        <p className="text-[12px] md:global-p1 text-start w-full xl:w-[80%] text-[#434343]">
          Our policies provide more than just life coverage. Many plans include savings and
          investment options, helping you grow your wealth over time while ensuring your loved ones
          are protected. With affordable premiums, flexible terms, and guaranteed returns, Shanta
          Life combines security and financial growth in one comprehensive package.
        </p>
      </div>

      <div className="">
        <PurchaseCardSection blur />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] gap-4 lg:gap-10 justify-center mt-6 lg:mt-10 xl:mt-20">
        {/* left side box */}
        <div className=" w-full order-2 lg:order-1">
          {apiResponse ? (
            <div>
              <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
              <PurchaseCalculateSection
                confirmedPaymentMode={confirmedPaymentMode}
                getTotalPremium={getTotalPremium}
                apiResponse={apiResponse}
              />
            </div>
          ) : selectedPlanCode > 0 ? (
            <div>
              <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
            </div>
          ) : (
            <div>
              <div className="px-6 pt-6 md:px-10 md:pt-10 pb-4 rounded-t-xl bg-[#9C863940]">
                <h4 className="global-p1 font-semibold text-[#3A3A3C] mb-1">For their Future</h4>
                <p className="global-p2 text-[#3A3A3C]">
                  Secure Your Child’s Future With A Plan That Covers Both Education Costs And Life
                  Protection—Because Dreams Deserve A Safety Net.
                </p>
              </div>

              <div className="bg-[#ccbf95] px-6 md:px-10 py-4 ">
                <h4 className="global-p1 font-bold text-[#fff] mb-1">For Your Growth</h4>
                <p className="global-p2 font-light text-[#fff]">
                  Build Wealth With Guaranteed Returns And Built-in Life Insurance
                </p>
              </div>

              <div className="bg-[#9C8639B2] rounded-b-xl px-6 md:px-10 py-4">
                <h4 className="global-p1 font-bold text-[#fff] mb-1">
                  When life throws you a Curveball
                </h4>
                <p className="global-p2 font-light text-[#fff]">
                  Because We Want You To Focus On Your Recovery
                </p>
              </div>
            </div>
          )}
        </div>

        {/* right form */}
        <div className="order-1 lg:order-2">
          <PurchaseForm
            formData={formData}
            setFormData={setFormData}
            onPlanSelect={(planCode: number, planName: string) => {
              setSelectedPlanCode(planCode)
              setSelectedPlanName(planName)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PurchaseSection
