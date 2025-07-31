'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import CalculateForm from '../premium-calculator/CalculateForm'
import PlanDetailsSection from '../purchase/PlanDetailsSection'
import PurchaseCalculateSection from '../purchase/PurchaseCalculateSection'
import { ApiResponse, getTotalPremium } from '@/utils/premiumCalculator'

interface FormData {
  PlanCode: number
  Age: number
  SumAssured: number
  Term: number
  PaymentMode: number
  Gender: number | null
  phoneNumber: string
  annualIncome: number
  name: string
  email: string
}

interface PremiumCalculatorModalProps {
  children: React.ReactNode
}

export default function PremiumCalculatorModal({ children }: PremiumCalculatorModalProps) {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
  const [selectedPlanName, setSelectedPlanName] = useState<string>('')
  const [calculatedPlanCode, setCalculatedPlanCode] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    PlanCode: 0,
    Age: 0,
    SumAssured: 0,
    Term: 0,
    PaymentMode: 0,
    Gender: null,
    phoneNumber: '',
    annualIncome: 0,
    name: '',
    email: '',
  })
  const [isOpen, setIsOpen] = useState(false)

  const handleApiResponse = (response: ApiResponse, paymentMode: string, planName?: string) => {
    setApiResponse(response)
    setConfirmedPaymentMode(paymentMode)
    setCalculatedPlanCode(formData.PlanCode)
    if (planName) {
      setSelectedPlanName(planName)
    }
  }

  const handleCalculateAgain = () => {
    setApiResponse(null)
    setConfirmedPaymentMode('')
    setSelectedPlanName('')
    setCalculatedPlanCode(null)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    // Reset all states when modal closes
    setTimeout(() => {
      setApiResponse(null)
      setConfirmedPaymentMode('')
      setSelectedPlanName('')
      setCalculatedPlanCode(null)
      setFormData({
        PlanCode: 0,
        Age: 0,
        SumAssured: 0,
        Term: 0,
        PaymentMode: 0,
        Gender: null,
        phoneNumber: '',
        annualIncome: 0,
        name: '',
        email: '',
      })
    }, 300) // Wait for modal close animation
  }

  // Map plan names to PlanDetailsSection expected codes
  const getPlanDetailsCode = (planName?: string): number => {
    const planNameToCode: { [key: string]: number } = {
      'Shanta Child Education Plan (3%)': 1,
      'Shanta Endowment Plan': 2,
      'Shanta 3 Stage Plan': 3,
      'Shanta 4 Stage Plan': 4,
    }

    if (selectedPlanName && planNameToCode[selectedPlanName]) {
      return planNameToCode[selectedPlanName]
    }

    if (planName && planNameToCode[planName]) {
      return planNameToCode[planName]
    }

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

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCloseModal()
        } else {
          setIsOpen(true)
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] w-[92vw] sm:w-[85vw] md:w-[80vw] p-0 overflow-hidden">
        <DialogTitle className="sr-only">Premium Calculator</DialogTitle>

        {/* Custom Close Button */}
        {/* <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 z-50 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-0 shadow-lg transition-all"
        >
          <X size={8} className="text-gray-600" />
        </button> */}

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#9C8639] to-[#B09B67] text-white px-8 py-4 md:px-5 md:py-5">
            {/* <h2 className="text-lg md:text-xl font-bold mb-1">Premium Calculator</h2> */}
            <p className="text-xs md:text-sm opacity-90">
              Calculate your premium and find the perfect plan for your needs
            </p>
          </div>

          {/* Content */}
          <div className="p-1 md:p-4">
            {!apiResponse ? (
              /* Form View */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-4">
                {/* Left Side - Info Cards */}
                <div className="order-2 lg:order-1 -mt-6 lg:mt-0">
                  <div className="space-y-0">
                    <div className="px-3 pt-3 md:px-4 md:pt-4 pb-2 md:pb-3 rounded-t-xl bg-[#9C863940]">
                      <h4 className="text-xs md:text-sm font-semibold text-[#3A3A3C] mb-1">
                        For their Future
                      </h4>
                      <p className="text-[10px] md:text-xs text-[#3A3A3C] leading-tight">
                        Secure Your Child's Future With A Plan That Covers Both Education Costs And
                        Life Protection—Because Dreams Deserve A Safety Net.
                      </p>
                    </div>

                    <div className="bg-[#ccbf95] px-3 md:px-4 py-2 md:py-3">
                      <h4 className="text-xs md:text-sm font-bold text-white mb-1">
                        For Your Growth
                      </h4>
                      <p className="text-[10px] md:text-xs font-light text-white leading-tight">
                        Build Wealth With Guaranteed Returns And Built-in Life Insurance
                      </p>
                    </div>

                    <div className="bg-[#9C8639B2] rounded-b-xl px-3 md:px-4 py-2 md:py-3">
                      <h4 className="text-xs md:text-sm font-bold text-white mb-1">
                        When life throws you a Curveball
                      </h4>
                      <p className="text-[10px] md:text-xs font-light text-white leading-tight">
                        Because We Want You To Focus On Your Recovery
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="order-1 lg:order-2">
                  <div className="scale-90 origin-top h-auto lg:h-full overflow-hidden">
                    <CalculateForm
                      onApiResponse={handleApiResponse}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Results View - Keep same two-column layout */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                {/* Left Side - Results */}
                <div className="order-2 lg:order-1">
                  <div className="space-y-3 md:space-y-4">
                    <div className="scale-90 origin-top">
                      <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
                    </div>
                    <div className="scale-90 origin-top">
                      <PurchaseCalculateSection
                        confirmedPaymentMode={confirmedPaymentMode}
                        getTotalPremium={getTotalPremium}
                        apiResponse={apiResponse}
                        scrollSignal={0}
                        onCalculateAgain={handleCalculateAgain}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side - Keep Form Visible */}
                <div className="order-1 lg:order-2">
                  <div className="scale-90 origin-top h-auto lg:h-full overflow-hidden">
                    <CalculateForm
                      onApiResponse={handleApiResponse}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
