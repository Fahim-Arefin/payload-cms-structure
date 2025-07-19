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
  AccidentRider: number
  CriticalRider: string
  Gender: number
  phoneNumber: string
  annualIncome: number
}

interface ApiResponse {
  life_premium: number
  accident_premium: number
  ci_premium: number
  total_premium: number
  life_rate: number
  accident_rate: number
  ci_rate: number
  accidental_coverage: number
  ci_coverage: number
  message: string
}

function QuoteForm() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [formData, setFormData] = useState<FormData>({
    PlanCode: 0,
    Age: 0,
    SumAssured: 0,
    Term: 0,
    PaymentMode: 0,
    AccidentRider: 0,
    CriticalRider: 'CP-S',
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

  const criticalRiderOptions = [
    { text: 'Classic (CP-C)', value: 'CP-C' },
    { text: 'Standard (CP-S)', value: 'CP-S' },
  ]

  const accidentRiderOptions = [
    { text: 'No', value: 0 },
    { text: 'Yes', value: 1 },
  ]

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
          AccidentRider: formData.AccidentRider,
          CriticalRider: formData.CriticalRider,
          Gender: formData.Gender,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to calculate premium')
      }

      const data: ApiResponse[] = await response.json()
      if (data && data.length > 0) {
        setApiResponse(data[0])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (
      !formData.PlanCode ||
      !formData.Age ||
      !formData.SumAssured ||
      !formData.Term ||
      !formData.PaymentMode
    ) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.SumAssured < 100000) {
      setError('Sum Assured must be greater than 99,999')
      return
    }

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
              handleInputChange('PlanCode', plan.code)
            }
          }}
        >
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
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
      {/* select your tenure */}
      <div className="col-span-2 md:col-span-1">
        <Select
          disabled={isLoadingTenures || !formData.PlanCode || !formData.Age || availableTenures.length === 0}
          onValueChange={(v) => {
            const tenure = availableTenures.find((t) => t.text === v)
            if (tenure) {
              handleInputChange('Term', tenure.value)
            }
          }}
        >
          <SelectTrigger
            className={`shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
              isLoadingTenures || !formData.PlanCode || !formData.Age || availableTenures.length === 0
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
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
      {/* age input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          min={18}
          max={65}
          type="number"
          placeholder="Age *"
          value={formData.Age || ''}
          onChange={(e) => handleInputChange('Age', parseInt(e.target.value) || 0)}
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
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
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
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
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
        <p className="text-[10px] py-2 absolute inset-x-0">
          Suggested BDT <span className="text-[#FF6600]">1,00,000</span>
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
            }
          }}
        >
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
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

      {/* accident rider select  */}
      <div className="col-span-2 md:col-span-1">
        <Select
          onValueChange={(v) => {
            const rider = accidentRiderOptions.find((ar) => ar.text === v)
            if (rider) {
              handleInputChange('AccidentRider', rider.value)
            }
          }}
        >
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder="Accident Rider *" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Accident Rider</SelectLabel>
              {accidentRiderOptions.map((rider) => (
                <SelectItem key={rider.text} value={rider.text}>
                  {rider.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* critical rider select  */}
      <div className="col-span-2 md:col-span-1">
        <Select
          onValueChange={(v) => {
            const rider = criticalRiderOptions.find((cr) => cr.text === v)
            if (rider) {
              handleInputChange('CriticalRider', rider.value)
            }
          }}
        >
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder="Critical Protection *" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Critical Protection</SelectLabel>
              {criticalRiderOptions.map((rider) => (
                <SelectItem key={rider.text} value={rider.text}>
                  {rider.text}
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

      {/* API Response display */}
      {apiResponse && (
        <div className="col-span-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-3">Premium Calculation Results</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Life Premium:</span>
              <span className="font-medium ml-2">৳{apiResponse.life_premium.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-600">Accident Premium:</span>
              <span className="font-medium ml-2">
                ৳{apiResponse.accident_premium.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-600">CI Premium:</span>
              <span className="font-medium ml-2">৳{apiResponse.ci_premium.toLocaleString()}</span>
            </div>
            <div className="col-span-2 pt-2 border-t">
              <span className="text-gray-600">Total Premium:</span>
              <span className="font-bold text-lg ml-2 text-green-700">
                ৳{apiResponse.total_premium.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Accidental Coverage:</span>
              <span className="font-medium ml-2">
                ৳{apiResponse.accidental_coverage.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-600">CI Coverage:</span>
              <span className="font-medium ml-2">৳{apiResponse.ci_coverage.toLocaleString()}</span>
            </div>
          </div>
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
