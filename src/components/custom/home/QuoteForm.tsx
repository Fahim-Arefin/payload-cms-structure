'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

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
import ToolTip from '../shared/ToolTip'

interface FormData {
  PlanCode: number
  Age: number
  SumAssured: number
  Term: number
  PaymentMode: number
  Gender: number
  phoneNumber: string
  annualIncome: number
}

interface ApiResponse {
  life_premium_yearly: number
  life_premium_half_yearly: number
  life_premium_quarterly: number
  life_premium_monthly: number
  life_premium_single: number
  accident_premium_yearly: number
  accident_premium_half_yearly: number
  accident_premium_quarterly: number
  accident_premium_monthly: number
  accident_premium_single: number
  ci_premium_yearly: number
  ci_premium_half_yearly: number
  ci_premium_quarterly: number
  ci_premium_monthly: number
  ci_premium_single: number
  life_rate: number
  accident_rate: number
  ci_rate: number
  accidental_coverage: number
  ci_coverage: number
  message: string
}

interface QuoteFormProps {
  onApiResponse?: (response: ApiResponse, paymentMode: string) => void
}

function QuoteForm({ onApiResponse }: QuoteFormProps = {}) {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [formData, setFormData] = useState<FormData>({
    PlanCode: 0,
    Age: 0,
    SumAssured: 0,
    Term: 0,
    PaymentMode: 0,
    Gender: 0,
    phoneNumber: '',
    annualIncome: 0,
  })
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [availableTenures, setAvailableTenures] = useState<{ text: string; value: number }[]>([])
  const [isLoadingTenures, setIsLoadingTenures] = useState(false)
  const [tenureError, setTenureError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    PlanCode: boolean
    Age: boolean
    SumAssured: boolean
    Term: boolean
    PaymentMode: boolean
    Gender: boolean
  }>({
    PlanCode: false,
    Age: false,
    SumAssured: false,
    Term: false,
    PaymentMode: false,
    Gender: false,
  })
  const [currentPaymentMode, setCurrentPaymentMode] = useState<string>('')

  // Calculate suggested sum assured based on tenure and annual income
  const calculateSuggestedAmount = () => {
    if (formData.Term && formData.annualIncome) {
      const calculated = formData.Term * formData.annualIncome * 0.1
      return Math.max(calculated, 100000)
    }
    return 100000
  }

  const suggestedAmount = calculateSuggestedAmount()

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
    {
      text: 'Multi Stage Maturity Plan',
      videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
      code: 5,
    },
  ]

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

  const paymentMethods = [
    { text: 'Monthly', value: 4 },
    { text: 'Quarterly', value: 3 },
    { text: 'Semi-annually', value: 2 },
    { text: 'Yearly', value: 1 },
    { text: 'Single', value: 5 },
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
      console.log('check data', data)

      // The API returns an object with a 'term' property containing a JSON string
      if (data && data[0]?.term) {
        try {
          // Parse the JSON string to get the array of term objects
          const termArray = JSON.parse(data[0].term)
          if (Array.isArray(termArray)) {
            const tenureOptions = termArray.map((termObj: any) => {
              console.log('termObj structure:', termObj)
              console.log('termObj.term value:', termObj.term)
              console.log('typeof termObj.term:', typeof termObj.term)

              const termValue = termObj.term
              console.log('test the term 3', termValue)
              return {
                text: `${termValue} years`,
                value: Number(termValue),
              }
            })
            console.log('Final tenureOptions:', tenureOptions)
            setAvailableTenures(tenureOptions)
          } else {
            console.log('Parsed term is not an array:', termArray)
            setAvailableTenures([])
          }
        } catch (parseError) {
          console.error('Failed to parse term JSON:', parseError)
          setAvailableTenures([])
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
    }
  }

  // Effect to fetch tenure options when plan or age changes
  useEffect(() => {
    if (formData.PlanCode && formData.Age) {
      fetchTenureOptions(formData.PlanCode, formData.Age)
      // Reset selected term when plan or age changes
      setFormData((prev) => ({ ...prev, Term: 0 }))
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
        // Notify parent component about the API response with current payment mode
        if (onApiResponse) {
          onApiResponse(data[0], currentPaymentMode)
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
      SumAssured: false,
      Term: false,
      PaymentMode: false,
      Gender: false,
    })

    // Validate each required field and mark errors
    const errors = {
      PlanCode: !formData.PlanCode,
      Age: !formData.Age || formData.Age < 18 || formData.Age > 65,
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
      className="border-2 border-[#9C8639] rounded-2xl bg-[#FFFFFFCC]
  grid grid-cols-2 gap-x-4 gap-y-8 md:gap-5 xl:gap-6 
  p-6 xl:p-8 z-10"
    >
      {/* plans */}
      <div className="relative col-span-2 md:col-span-1">
        <Select
          onValueChange={(v) => {
            const plan = plans.find((p) => p.text === v)
            setSelectedPlan(plan)
            if (plan) {
              // Reset dependent fields when plan changes
              setFormData((prev) => ({
                ...prev,
                PlanCode: plan.code,
                Age: 0,
                Term: 0,
              }))
              // Clear tenure options until new plan + age combination is selected
              setAvailableTenures([])

              // Clear field errors for plan and dependent fields
              setFieldErrors((prev) => ({
                ...prev,
                PlanCode: false,
                Age: false,
                Term: false,
              }))
            }
          }}
        >
          <SelectTrigger
            className={`shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
              fieldErrors.PlanCode ? 'border-red-500 border-2' : ''
            }`}
          >
            <SelectValue placeholder="Select Your Plan *" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Plans</SelectLabel>
              {plans.map((plan) => (
                <SelectItem key={plan.text} value={plan.text}>
                  {plan.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* below a text saying watch video */}
        {/* <p className="text-[10px] py-2 absolute inset-x-0 text-[#FF6600] underline">Watch Video</p> */}
        {selectedPlan && (
          <Dialog>
            <DialogTrigger asChild>
              <p className="text-[10px] py-1 absolute inset-x-0 text-[#FF6600] underline cursor-pointer">
                Watch Video
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
          className={`shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.Age ? 'border-red-500 border-2' : ''
          }`}
        />
      </div>
      {/* select your tenure */}
      <div className="col-span-2 md:col-span-1">
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
            className={`shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
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
            className={`shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
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
          placeholder="Annual Income"
          value={formData.annualIncome || ''}
          onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value) || 0)}
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
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
          className={`shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.SumAssured ? 'border-red-500 border-2' : ''
          }`}
        />
        <p className="text-[10px] py-2 absolute inset-x-0">
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
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* payment method select  */}
      <div className="col-span-2 md:col-span-1">
        <Select
          onValueChange={(v) => {
            const method = paymentMethods.find((pm) => pm.text === v)
            if (method) {
              handleInputChange('PaymentMode', method.value)
              setCurrentPaymentMode(method.text)
            }
          }}
        >
          <SelectTrigger
            className={`shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
              fieldErrors.PaymentMode ? 'border-red-500 border-2' : ''
            }`}
          >
            <SelectValue placeholder="Select Your Payment Method *" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Payment Method</SelectLabel>
              {paymentMethods.map((paymentMethod) => (
                <SelectItem key={paymentMethod.text} value={paymentMethod.text}>
                  {paymentMethod.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Error display */}
      {error && (
        <div className="col-span-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* submit button */}
      <div className="col-span-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-[#9C8639] hover:bg-[#8B7532] disabled:bg-gray-400 text-white rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 w-full"
        >
          {isLoading ? 'Calculating...' : 'Get A Quote Now'}
        </Button>
      </div>
    </form>
  )
}

export default QuoteForm
