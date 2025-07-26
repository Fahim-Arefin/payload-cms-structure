'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ApiResponse } from '@/utils/premiumCalculator'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

type FormData = {
  PlanCode: number
  Age: number
  SumAssured: number
  Term: number
  PaymentMode: number
  Gender: number
  phoneNumber: string
  annualIncome: number
  name: string
  email: string
}

type Props = {
  onApiResponse?: (response: ApiResponse, paymentMode: string, planName?: string) => void
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

function CalculateForm({ onApiResponse, formData, setFormData }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [availableTenures, setAvailableTenures] = useState<{ text: string; value: number }[]>([])
  const [isLoadingTenures, setIsLoadingTenures] = useState(false)
  const [tenureError, setTenureError] = useState<string | null>(null)
  const [availablePlans, setAvailablePlans] = useState<{ plan_name: string; plan_code: number }[]>([])
  const [isLoadingPlans, setIsLoadingPlans] = useState(false)
  const [planError, setPlanError] = useState<string | null>(null)
  const [availablePaymentModes, setAvailablePaymentModes] = useState<{ paymode_name: string; paymode_id: number }[]>([])
  const [isLoadingPaymentModes, setIsLoadingPaymentModes] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{
    PlanCode: boolean
    Age: boolean
    annualIncome: boolean
    SumAssured: boolean
    Term: boolean
    PaymentMode: boolean
    Gender: boolean
  }>({
    PlanCode: false,
    Age: false,
    annualIncome: false,
    SumAssured: false,
    Term: false,
    PaymentMode: false,
    Gender: false,
  })
  const [currentPaymentMode, setCurrentPaymentMode] = useState<string>('')
  const [isHoveringPlanSelect, setIsHoveringPlanSelect] = useState(false)
  const [isHoveringTenureSelect, setIsHoveringTenureSelect] = useState(false)
  const [isHoveringPaymentSelect, setIsHoveringPaymentSelect] = useState(false)

  // Calculate suggested sum assured based on tenure and annual income
  const calculateSuggestedAmount = () => {
    if (formData.Term && formData.annualIncome) {
      const calculated = formData.Term * formData.annualIncome * 0.1
      return Math.max(calculated, 100000)
    }
    return 100000
  }

  const suggestedAmount = calculateSuggestedAmount()

  // Video link mappings for plans
  const videoLinkMappings = {
    'Shanta Child Education Plan (3%)': 'https://www.youtube.com/embed/Fj_BE9D64W4',
    'Shanta Endowment Plan': 'https://www.youtube.com/embed/CkKkdNkBk9g', 
    'Shanta 3 Stage Plan': 'https://www.youtube.com/embed/h11sOPnfnhw',
    'Shanta 4 Stage Plan': 'https://www.youtube.com/embed/h11sOPnfnhw',
  }

  // Fetch plans from API based on age (same as QuoteForm)
  const fetchPlans = async (age: number) => {
    if (!age || age < 18 || age > 65) {
      setAvailablePlans([])
      return
    }

    setIsLoadingPlans(true)
    setPlanError(null)

    try {
      const response = await fetch(`/api/plan/0/${age}`)

      if (!response.ok) {
        throw new Error('Failed to fetch plans')
      }

      const data = await response.json()
      console.log('Plans API response:', data)

      if (Array.isArray(data)) {
        // Define the plan name mappings (same as QuoteForm)
        const planNameMappings = {
          'Shanta Endowment': 'Shanta Endowment Plan',
          'Shanta Three Payment Plan': 'Shanta 3 Stage Plan',
          'Shanta Four Payment Plan': 'Shanta 4 Stage Plan',
          'Shanta Child Education Plan (3%)': 'Shanta Child Education Plan (3%)',
        }

        // Filter and transform the plans
        const filteredPlans = data
          .filter((plan) => planNameMappings.hasOwnProperty(plan.plan_name))
          .map((plan) => ({
            ...plan,
            plan_name: planNameMappings[plan.plan_name as keyof typeof planNameMappings],
          }))

        console.log('Filtered and transformed plans:', filteredPlans)
        setAvailablePlans(filteredPlans)
      } else {
        console.log('Unexpected plans API response format:', data)
        setAvailablePlans([])
      }
    } catch (err) {
      setPlanError(err instanceof Error ? err.message : 'Failed to fetch plans')
      setAvailablePlans([])
    } finally {
      setIsLoadingPlans(false)
    }
  }

  const genders = [
    { text: 'Male', value: 1 },
    { text: 'Female', value: 0 },
  ]

  const tenures = [
    { text: '10 years', value: 10 },
    { text: '15 years', value: 15 },
    { text: '20 years', value: 20 },
    { text: '25 years', value: 25 },
    { text: '30 years', value: 30 },
  ]


  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear field error when user starts typing/selecting (only for validated fields)
    if (field in fieldErrors) {
      const errorField = field as keyof typeof fieldErrors
      if (fieldErrors[errorField]) {
        setFieldErrors((prev) => ({
          ...prev,
          [errorField]: false,
        }))
      }
    }
  }

  const fetchTenureOptions = async (planCode: number, age: number) => {
    if (!planCode || !age || age < 18 || age > 65) {
      setAvailableTenures([])
      return
    }

    setIsLoadingTenures(true)
    setTenureError(null)

    try {
      const response = await fetch(`/api/plan/${planCode}/${age}`)

      if (!response.ok) {
        throw new Error('Failed to fetch tenure options')
      }

      const data = await response.json()
      console.log('Tenure options API response:', data)

      // Parse tenure data from API response (same as QuoteForm)
      if (data && data[0]?.term) {
        const termArray = JSON.parse(data[0].term)
        if (Array.isArray(termArray)) {
          const tenureOptions = termArray.map((termObj: any) => ({
            text: `${termObj.term} years`,
            value: Number(termObj.term),
          }))
          setAvailableTenures(tenureOptions)
        }
      }

      // Extract payment modes from the same API response (same as QuoteForm)
      if (data && data[0]?.pay_mode) {
        try {
          let payModeArray
          if (typeof data[0].pay_mode === 'string') {
            payModeArray = JSON.parse(data[0].pay_mode)
          } else {
            payModeArray = data[0].pay_mode
          }

          if (Array.isArray(payModeArray)) {
            console.log('Payment modes from API:', payModeArray)
            // Filter out invalid payment modes
            const validPaymentModes = payModeArray.filter(
              (mode) =>
                mode &&
                typeof mode === 'object' &&
                mode.paymode_name &&
                mode.paymode_name.trim() !== '' &&
                mode.paymode_id !== undefined &&
                mode.paymode_id !== null,
            )
            console.log('Valid payment modes:', validPaymentModes)
            setAvailablePaymentModes(validPaymentModes)
          } else {
            console.log('Payment modes is not an array:', payModeArray)
            setAvailablePaymentModes([])
          }
        } catch (parseError) {
          console.error('Failed to parse payment modes:', parseError)
          setAvailablePaymentModes([])
        }
      } else {
        console.log('Unexpected API response format:', data)
        setAvailableTenures([])
      }
    } catch (err) {
      setTenureError(err instanceof Error ? err.message : 'Failed to fetch tenure options')
      setAvailableTenures([])
    } finally {
      setIsLoadingTenures(false)
      setIsLoadingPaymentModes(false)
    }
  }

  // Effect to fetch plans when age changes (same as QuoteForm)
  useEffect(() => {
    if (formData.Age) {
      fetchPlans(formData.Age)
      // Reset selected plan when age changes
      setFormData((prev) => ({ ...prev, PlanCode: 0, Term: 0 }))
      setSelectedPlan(null)
      setAvailableTenures([])
    }
  }, [formData.Age])

  // Effect to fetch tenure options when plan or age changes (same as QuoteForm)
  useEffect(() => {
    if (formData.PlanCode && formData.Age) {
      setIsLoadingTenures(true)
      setIsLoadingPaymentModes(true)
      fetchTenureOptions(formData.PlanCode, formData.Age)
      // Reset selected term and payment mode when plan or age changes
      setFormData((prev) => ({ ...prev, Term: 0, PaymentMode: 0 }))
      setCurrentPaymentMode('')
    } else {
      // Clear tenure and payment modes when plan or age is not selected
      setAvailableTenures([])
      setAvailablePaymentModes([])
      setIsLoadingTenures(false)
      setIsLoadingPaymentModes(false)
    }
  }, [formData.PlanCode, formData.Age])

  const calculatePremium = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/calculate-premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PlanCode: formData.PlanCode,
          Age: formData.Age,
          SumAssured: formData.SumAssured,
          Term: formData.Term,
          PaymentMode: formData.PaymentMode,
          AccidentRider: 1,
          CriticalRider: 'CP-S',
          Gender: formData.Gender,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to calculate premium')
      }

      const data: ApiResponse[] = await response.json()
      if (data && data.length > 0) {
        setApiResponse(data[0])
        // Notify parent component about the API response with current payment mode and plan name
        if (onApiResponse) {
          const planName = selectedPlan?.plan_name || ''
          onApiResponse(data[0], currentPaymentMode, planName)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Reset previous field errors
    setFieldErrors({
      PlanCode: false,
      Age: false,
      annualIncome: false,
      SumAssured: false,
      Term: false,
      PaymentMode: false,
      Gender: false,
    })

    // Validate each required field and mark errors
    const errors = {
      PlanCode: !formData.PlanCode,
      Age: !formData.Age || formData.Age < 18 || formData.Age > 65,
      annualIncome: !formData.annualIncome,
      SumAssured: !formData.SumAssured || formData.SumAssured < 100000,
      Term: !formData.Term,
      PaymentMode: !formData.PaymentMode,
      Gender: formData.Gender === undefined || formData.Gender === null,
    }

    // Set field errors
    setFieldErrors(errors)

    // Check if any errors exist
    const hasErrors = Object.values(errors).some((error) => error)

    if (hasErrors) {
      setError('Please fill in all required fields correctly')
      return
    }

    // Additional validation for Sum Assured
    if (formData.SumAssured < 100000) {
      setFieldErrors((prev) => ({ ...prev, SumAssured: true }))
      setError('Sum Assured must be greater than 99,999')
      return
    }

    // Clear errors and proceed
    setError(null)
    calculatePremium()
  }
  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="rounded-2xl bg-[#9C863940]
  grid grid-cols-2 gap-x-4 gap-y-8 md:gap-5 xl:gap-6 
  xl:px-4 xl:py-8 py-8 px-4 z-10"
    >
      {/* plans */}
      <div
        className="relative col-span-2 md:col-span-1"
        onMouseEnter={() => setIsHoveringPlanSelect(true)}
        onMouseLeave={() => setIsHoveringPlanSelect(false)}
      >
        <Select
          disabled={isLoadingPlans || !formData.Age || availablePlans.length === 0}
          onValueChange={(v) => {
            const plan = availablePlans.find((p) => p.plan_name === v)
            // Add video link to the selected plan
            const planWithVideo = plan ? {
              ...plan,
              videoLink: videoLinkMappings[plan.plan_name as keyof typeof videoLinkMappings]
            } : null
            setSelectedPlan(planWithVideo)
            if (plan) {
              // Reset dependent fields when plan changes
              setFormData((prev) => ({
                ...prev,
                PlanCode: plan.plan_code,
                Term: 0,
              }))
              // Clear tenure options until new plan + age combination is selected
              setAvailableTenures([])

              // Clear field errors for plan and dependent fields
              setFieldErrors((prev) => ({
                ...prev,
                PlanCode: false,
                Term: false,
              }))
            }
          }}
        >
          <SelectTrigger
            className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
              fieldErrors.PlanCode ? 'border-red-500 border-2' : ''
            }`}
          >
            <SelectValue
              placeholder={
                isLoadingPlans
                  ? 'Loading plans...'
                  : availablePlans.length === 0 && formData.Age
                    ? 'No plans available'
                    : 'Select Plan'
              }
            />
          </SelectTrigger>
          {/* Custom instant tooltip */}
          {isHoveringPlanSelect && !formData.Age && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
              Enter your age first
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
            </div>
          )}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Plans</SelectLabel>
              {availablePlans.map((plan) => (
                <SelectItem key={plan.plan_code} value={plan.plan_name}>
                  {plan.plan_name}
                </SelectItem>
              ))}
              {availablePlans.length === 0 &&
                !isLoadingPlans &&
                formData.Age && (
                  <SelectItem disabled value="no-options">
                    No plans available for this age
                  </SelectItem>
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* below a text saying watch video */}
        {/* <p className="text-[10px] py-2 absolute inset-x-0 text-[#FF6600] underline">Watch Video</p> */}
        {selectedPlan && selectedPlan.videoLink && (
          <Dialog>
            <DialogTrigger asChild>
              <p className="text-[10px] py-1 absolute inset-x-0 text-[#FF6600] underline cursor-pointer">
                Watch {selectedPlan.plan_name} Video
              </p>
            </DialogTrigger>

            <DialogContent
              className="max-w-5xl w-full aspect-video p-0 bg-black 
      [&>button.absolute]:top-3 [&>button.absolute]:right-3 
      [&>button.absolute]:bg-black/50 
      [&>button.absolute]:text-white 
      [&>button.absolute]:hover:bg-black/80"
            >
              <VisuallyHidden>
                <DialogTitle>Plan Video</DialogTitle>
              </VisuallyHidden>

              <iframe
                width="100%"
                height="100%"
                src={selectedPlan?.videoLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* age input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          min={18}
          max={65}
          type="number"
          placeholder="Age *"
          value={formData.Age || ''}
          onChange={(e) => handleInputChange('Age', parseInt(e.target.value) || 0)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.Age ? 'border-red-500 border-2' : ''
          }`}
        />
      </div>

      {/* select your tenure */}
      <div
        className="col-span-2 md:col-span-1 relative"
        onMouseEnter={() => setIsHoveringTenureSelect(true)}
        onMouseLeave={() => setIsHoveringTenureSelect(false)}
      >
        <Select
          disabled={
            isLoadingTenures || !formData.PlanCode || !formData.Age || availableTenures.length === 0
          }
          onValueChange={(v) => {
            const tenure = availableTenures.find((t) => t.text === v)
            if (tenure) {
              handleInputChange('Term', tenure.value)
            }
          }}
        >
          <SelectTrigger
            className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
              isLoadingTenures ||
              !formData.PlanCode ||
              !formData.Age ||
              availableTenures.length === 0
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } ${fieldErrors.Term ? 'border-red-500 border-2' : ''}`}
          >
            <SelectValue
              placeholder={
                isLoadingTenures
                  ? 'Loading tenure options...'
                  : !formData.PlanCode || !formData.Age
                    ? 'Select plan and age first'
                    : availableTenures.length === 0
                      ? 'No tenure options available'
                      : 'Select Your Tenure *'
              }
            />
          </SelectTrigger>
          {/* Custom instant tooltip */}
          {isHoveringTenureSelect && (!formData.PlanCode || !formData.Age) && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
              Select age and plan first
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
            </div>
          )}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tenure</SelectLabel>
              {availableTenures.map((tenure) => {
                console.log('Rendering tenure option:', tenure)
                return (
                  <SelectItem key={tenure.value} value={tenure.text}>
                    {tenure.text}
                  </SelectItem>
                )
              })}
              {availableTenures.length === 0 &&
                !isLoadingTenures &&
                formData.PlanCode &&
                formData.Age && (
                  <SelectItem disabled value="no-options">
                    No tenure options available for this plan and age
                  </SelectItem>
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {tenureError && (
          <p className="text-[10px] py-1 text-red-600 absolute inset-x-0">{tenureError}</p>
        )}
      </div>

      {/* gender select  */}
      <div className="col-span-2 md:col-span-1">
        <Select
          onValueChange={(v) => {
            const gender = genders.find((g) => g.text === v)
            if (gender) {
              handleInputChange('Gender', gender.value)
            }
          }}
        >
          <SelectTrigger
            className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
              fieldErrors.Gender ? 'border-red-500 border-2' : ''
            }`}
          >
            <SelectValue placeholder="Select Your Gender *" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              {genders.map((gender) => (
                <SelectItem key={gender.text} value={gender.text}>
                  {gender.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* annual income input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          min={0}
          type="number"
          placeholder="Annual Income *"
          value={formData.annualIncome || ''}
          onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value) || 0)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.annualIncome ? 'border-red-500 border-2' : ''
          }`}
        />
      </div>
      {/* sum assured input */}
      <div className="relative col-span-2 md:col-span-1">
        <Input
          min={100000}
          type="number"
          placeholder="Sum Assured *"
          value={formData.SumAssured || ''}
          onChange={(e) => handleInputChange('SumAssured', parseInt(e.target.value) || 0)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.SumAssured ? 'border-red-500 border-2' : ''
          }`}
        />
        <p className="text-[8px] md:text-[10px] py-2 absolute right-1">
          Suggested <span className="text-[#FF6600]">{suggestedAmount.toLocaleString()}</span> BDT
        </p>
      </div>

      {/* phone number input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="tel"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* payment method select  */}
      <div
        className="col-span-2 md:col-span-1 relative"
        onMouseEnter={() => setIsHoveringPaymentSelect(true)}
        onMouseLeave={() => setIsHoveringPaymentSelect(false)}
      >
        <Select
          disabled={
            isLoadingPaymentModes || 
            !formData.PlanCode || 
            !formData.Age || 
            !formData.Term || 
            availablePaymentModes.length === 0
          }
          onValueChange={(v) => {
            const method = availablePaymentModes.find((pm) => pm.paymode_name === v)
            if (method) {
              handleInputChange('PaymentMode', method.paymode_id)
              setCurrentPaymentMode(method.paymode_name)
            }
          }}
        >
          <SelectTrigger
            className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
              fieldErrors.PaymentMode ? 'border-red-500 border-2' : ''
            }`}
          >
            <SelectValue
              placeholder={
                isLoadingPaymentModes
                  ? 'Loading payment methods...'
                  : !formData.PlanCode || !formData.Age || !formData.Term
                    ? 'Select plan, age & term first'
                    : availablePaymentModes.length === 0
                      ? 'No payment methods available'
                      : 'Select Payment Method'
              }
            />
          </SelectTrigger>
          {/* Custom instant tooltip */}
          {isHoveringPaymentSelect && (!formData.PlanCode || !formData.Age || !formData.Term) && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
              Select plan, age & term first
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
            </div>
          )}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Payment Method</SelectLabel>
              {availablePaymentModes
                .map((paymentMethod, index) => {
                  // Ensure we have valid data before rendering
                  if (
                    !paymentMethod ||
                    !paymentMethod.paymode_name ||
                    paymentMethod.paymode_name.trim() === ''
                  ) {
                    return null
                  }

                  return (
                    <SelectItem
                      key={`payment-${paymentMethod.paymode_id}-${paymentMethod.paymode_name}-${index}`}
                      value={paymentMethod.paymode_name}
                    >
                      {paymentMethod.paymode_name}
                    </SelectItem>
                  )
                })
                .filter(Boolean)}
              {availablePaymentModes.length === 0 &&
                !isLoadingPaymentModes &&
                formData.PlanCode &&
                formData.Age &&
                formData.Term && (
                  <SelectItem disabled value="no-options">
                    No payment methods available
                  </SelectItem>
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* name input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* name input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* Error display */}
      {error && (
        <div className="col-span-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      {/* submit button */}
      <div className="col-span-2 items-center px-4 flex flex-col gap-6 lg:gap-6 justify-center">
        <Button
          disabled={isLoading}
          className="bg-[#978900] disabled:bg-gray-400 w-fit text-[11px] md:global-h4 text-white rounded-[4px] md:rounded-[10px] px-6 py-4 xl:px-8 xl:py-8"
        >
          {isLoading ? 'Calculating...' : 'Calculate Now'}
        </Button>
        <p className="text-[12px] md:text-[14px] text-[#00000099] mt-4 md:mt-1 md:w-[90%] font-light md:capitalize">
          Our expert advisors are ready to help you choose the best plan based on your age, income,
          and future goals. Whether you're just starting your career or planning for retirement, we
          are with you at every step.
        </p>
        {/* <p className="text-[10.5px] md:text-[12px] text-[#434343] underline">
          Have Questions? Ask Us! 
        </p> */}
      </div>
    </form>
  )
}

export default CalculateForm
