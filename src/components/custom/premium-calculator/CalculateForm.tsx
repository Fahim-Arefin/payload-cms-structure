'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format, differenceInYears } from 'date-fns'
// CHANGE HERE
import { Check, ChevronDown, ChevronRight } from 'lucide-react'

// CHANGE HERE: add dropdown-menu imports
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'

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
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

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
  const [availablePlans, setAvailablePlans] = useState<{ plan_name: string; plan_code: number }[]>(
    [],
  )
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoadingPlans, setIsLoadingPlans] = useState(false)
  const [planError, setPlanError] = useState<string | null>(null)
  const [availablePaymentModes, setAvailablePaymentModes] = useState<
    { paymode_name: string; paymode_id: number }[]
  >([])
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
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isCalculatingAge, setIsCalculatingAge] = useState(false)
  const [ageCalculationError, setAgeCalculationError] = useState<string | null>(null)
  const [isChildEducationHovered, setIsChildEducationHovered] = useState(false)
  const [childEducationVariants, setChildEducationVariants] = useState<
    { plan_name: string; plan_code: number }[]
  >([])

  // CHANGE HERE: control the plan menu open/close
  const [planMenuOpen, setPlanMenuOpen] = useState(false)

  // CHANGE HERE (add near other const/let before return)
  const isPlanDisabled =
    isLoadingPlans ||
    !formData.Age ||
    (availablePlans.length === 0 && childEducationVariants.length === 0)

  const planDisabledMsg = !formData.Age
    ? 'Enter age first'
    : isLoadingPlans
      ? 'Loading plans...'
      : 'No plans available'

  // Format date to DD/MM/YYYY
  const formatDateForAPI = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }

  // Call API to calculate age from date of birth
  const calculateAgeFromAPI = async (dateOfBirth: Date) => {
    setIsCalculatingAge(true)
    setAgeCalculationError(null)

    try {
      const formattedDate = formatDateForAPI(dateOfBirth)
      const response = await fetch(`/api/age-calculate?dateofbirth=${formattedDate}`)

      if (!response.ok) {
        throw new Error('Failed to calculate age')
      }

      const data = await response.json()

      if (data.age !== undefined) {
        // Update form data with both date and calculated age
        setFormData((prev) => ({
          ...prev,
          dateOfBirth: dateOfBirth,
          Age: data.age,
        }))

        // Close the date picker
        setIsDatePickerOpen(false)
        setTempSelectedDate(null)

        // Clear any field errors
        setFieldErrors((prev) => ({
          ...prev,
          Age: false,
        }))
      } else {
        throw new Error('Invalid response from age calculation API')
      }
    } catch (err) {
      setAgeCalculationError(err instanceof Error ? err.message : 'Failed to calculate age')
    } finally {
      setIsCalculatingAge(false)
    }
  }

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
    'Shanta Child Education Plan (1%)': 'https://www.youtube.com/embed/Fj_BE9D64W4',
    'Shanta Child Education Plan (2%)': 'https://www.youtube.com/embed/Fj_BE9D64W4',
    'Shanta Child Education Plan (3%)': 'https://www.youtube.com/embed/Fj_BE9D64W4',
    'Shanta Child Education Plan Single Payment (1%)': 'https://www.youtube.com/embed/Fj_BE9D64W4',
    'Shanta Child Education Plan Single Payment (2%)': 'https://www.youtube.com/embed/Fj_BE9D64W4',
    'Shanta Child Education Plan Single Payment (3%)': 'https://www.youtube.com/embed/Fj_BE9D64W4',
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
          'Shanta Child Education Plan (1%)': 'Shanta Child Education Plan (1%)',
          'Shanta Child Education Plan (2%)': 'Shanta Child Education Plan (2%)',
          'Shanta Child Education Plan (3%)': 'Shanta Child Education Plan (3%)',
          'Shanta Child Education Plan Single Payment (1%)':
            'Shanta Child Education Plan Single Payment (1%)',
          'Shanta Child Education Plan Single Payment (2%)':
            'Shanta Child Education Plan Single Payment (2%)',
          'Shanta Child Education Plan Single Payment (3%)':
            'Shanta Child Education Plan Single Payment (3%)',
        }

        // Filter and transform the plans
        const filteredPlans = data
          .filter((plan) => planNameMappings.hasOwnProperty(plan.plan_name))
          .map((plan) => ({
            ...plan,
            plan_name: planNameMappings[plan.plan_name as keyof typeof planNameMappings],
          }))

        // Separate Child Education Plans from other plans (including Single Payment variants)
        const childEducationPlans = filteredPlans.filter((plan) =>
          plan.plan_name.toLowerCase().includes('child education'),
        )
        const otherPlans = filteredPlans.filter(
          (plan) => !plan.plan_name.toLowerCase().includes('child education'),
        )

        // Store child education variants separately
        setChildEducationVariants(childEducationPlans)

        // Create a grouped plan list with single "Shanta Child Education Plan" entry
        const groupedPlans = [
          ...otherPlans,
          ...(childEducationPlans.length > 0
            ? [
                {
                  plan_name: 'Shanta Child Education Plan',
                  plan_code: 0, // Temporary code for the group
                  isGroup: true,
                },
              ]
            : []),
        ]

        console.log('Child Education variants:', childEducationPlans)
        console.log('Grouped plans:', groupedPlans)
        setAvailablePlans(groupedPlans)
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
    { text: 'Female', value: 2 },
  ]

  const tenures = [
    { text: '10 years', value: 10 },
    { text: '15 years', value: 15 },
    { text: '20 years', value: 20 },
    { text: '25 years', value: 25 },
    { text: '30 years', value: 30 },
  ]

  const handleInputChange = (field: keyof FormData, value: string | number | Date | null) => {
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

  // Handle date selection in the picker (temporary selection)
  const handleDateChange = (date: Date | null) => {
    setTempSelectedDate(date)
  }

  // Handle confirm button click
  const handleConfirmDate = () => {
    if (tempSelectedDate) {
      calculateAgeFromAPI(tempSelectedDate)
    }
  }

  // Handle opening date picker
  const handleOpenDatePicker = () => {
    setTempSelectedDate(formData.dateOfBirth)
    setIsDatePickerOpen(true)
    setAgeCalculationError(null)
  }

  // Handle closing date picker
  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false)
    setTempSelectedDate(null)
    setAgeCalculationError(null)
  }

  // Handle child education plan selection from submenu
  const handleChildEducationPlanSelect = (variant: { plan_name: string; plan_code: number }) => {
    console.log('Selected variant:', variant)
    const planWithVideo = {
      ...variant,
      videoLink: videoLinkMappings[variant.plan_name as keyof typeof videoLinkMappings],
    }
    setSelectedPlan(planWithVideo)

    setFormData((prev) => {
      console.log('Updating formData with PlanCode:', variant.plan_code)
      return {
        ...prev,
        PlanCode: variant.plan_code,
        Term: 0,
      }
    })

    // Clear tenure options until new plan + age combination is selected
    setAvailableTenures([])

    // Clear field errors for plan and dependent fields
    setFieldErrors((prev) => ({
      ...prev,
      PlanCode: false,
      Term: false,
    }))

    // Hide the submenu after selection
    setIsChildEducationHovered(false)
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
          DateOfBirth: formData.dateOfBirth ? formatDateForAPI(formData.dateOfBirth) : '',
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

  // Function to get specific error message for each field
  const getFieldErrorMessage = (field: keyof typeof fieldErrors): string => {
    if (!fieldErrors[field]) return ''

    switch (field) {
      case 'PlanCode':
        return 'Please select a plan'
      case 'Age':
        if (!formData.dateOfBirth) return 'Please select your date of birth'
        if (formData.Age < 18 || formData.Age > 65) return 'Age must be between 18 and 65'
        return ''
      case 'annualIncome':
        return 'Please enter your annual income'
      case 'SumAssured':
        if (!formData.SumAssured) return 'Please enter sum assured amount'
        if (formData.SumAssured < 100000) return 'Sum assured must be at least ৳1,00,000'
        return ''
      case 'Term':
        return 'Please select a tenure'
      case 'PaymentMode':
        return 'Please select a payment method'
      case 'Gender':
        return 'Please select your gender'
      default:
        return ''
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
      Age: !formData.dateOfBirth || formData.Age < 18 || formData.Age > 65,
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
      // Don't set general error message anymore, field-specific messages will show
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
      {/* date of birth and age inputs - combined in one column */}
      <div className="col-span-2 md:col-span-1">
        <div className="flex gap-2">
          {/* date of birth input - half width */}
          <div className="flex-1">
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleOpenDatePicker}
                  className={`w-full justify-start text-left font-normal bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-3 py-5 xl:px-4 xl:py-6 text-xs xl:text-sm ${
                    fieldErrors.Age ? 'border-red-500 border-2' : ''
                  } ${!formData.dateOfBirth ? 'text-muted-foreground' : ''}`}
                >
                  {formData.dateOfBirth ? (
                    <span>{format(formData.dateOfBirth, 'dd/MM/yyyy')}</span>
                  ) : (
                    <span>DOB *</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4">
                  <DatePicker
                    selected={tempSelectedDate}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    minDate={new Date(new Date().getFullYear() - 65, 0, 1)}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    placeholderText="Select date of birth"
                    dateFormat="dd/MM/yyyy"
                    inline
                  />

                  {/* Action buttons */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCloseDatePicker}
                      disabled={isCalculatingAge}
                    >
                      Cancel
                    </Button>

                    <Button
                      size="sm"
                      onClick={handleConfirmDate}
                      disabled={!tempSelectedDate || isCalculatingAge}
                      className="bg-[#978900] hover:bg-[#978900]/90"
                    >
                      {isCalculatingAge ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Calculating...
                        </div>
                      ) : (
                        'Confirm'
                      )}
                    </Button>
                  </div>

                  {/* Error message */}
                  {ageCalculationError && (
                    <p className="text-red-500 text-xs mt-2">{ageCalculationError}</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* age input (read-only, auto-populated) - half width */}
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Age"
              value={formData.Age ? `Age: ${formData.Age}` : ''}
              readOnly
              className={`bg-gray-50 shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-3 py-5 xl:px-4 xl:py-6 cursor-not-allowed text-xs xl:text-sm ${
                fieldErrors.Age ? 'border-red-500 border-2' : ''
              }`}
            />
          </div>
        </div>

        {/* Age error message and loading indicator - below both fields */}
        {getFieldErrorMessage('Age') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Age')}</p>
        )}

        {/* Loading indicator for age calculation */}
        {isCalculatingAge && (
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 border-2 border-[#978900] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-[#978900]">Calculating age...</span>
          </div>
        )}
      </div>

      {/* plans */}
      {/* =========================== REPLACE FROM HERE =========================== */}
      <div
        className="relative col-span-2 md:col-span-1"
        onMouseEnter={() => setIsHoveringPlanSelect(true)}
        onMouseLeave={() => setIsHoveringPlanSelect(false)}
      >
        <DropdownMenu
          open={planMenuOpen}
          onOpenChange={(next) => {
            if (isPlanDisabled) return
            setPlanMenuOpen(next)
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={[
                // base: match SelectTrigger
                'font-normal text-xs w-full justify-between text-left bg-background text-foreground',
                'border border-input rounded-[10px] px-5 py-5 xl:px-4 xl:py-6',
                'shadow-[0px_0px_5px_0px_#00000040]',
                'transition-colors',

                // hover (when enabled)
                !isPlanDisabled && 'hover:bg-accent hover:text-accent-foreground',

                // focus ring like shadcn
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',

                // open state (match Select’s slight emphasis)
                planMenuOpen && 'bg-accent text-accent-foreground',

                // error border
                fieldErrors.PlanCode ? 'border-red-500' : '',

                // disabled visuals
                isPlanDisabled ? 'opacity-50 cursor-not-allowed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-disabled={isPlanDisabled}
              onPointerDownCapture={(e) => {
                if (isPlanDisabled) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
              onClick={(e) => {
                if (isPlanDisabled) {
                  e.preventDefault()
                  e.stopPropagation()
                  return
                }
                setPlanMenuOpen(true)
              }}
              onKeyDownCapture={(e) => {
                if (isPlanDisabled && ['Enter', ' ', 'Spacebar', 'ArrowDown'].includes(e.key)) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
              tabIndex={isPlanDisabled ? -1 : 0}
            >
              <span
                className={`truncate ${
                  !formData.PlanCode &&
                  !isLoadingPlans &&
                  formData.Age &&
                  (availablePlans.length || childEducationVariants.length)
                    ? 'text-foreground'
                    : !formData.PlanCode
                      ? 'text-muted-foreground'
                      : 'text-foreground'
                }`}
              >
                {(() => {
                  const regular = availablePlans.filter(
                    (p) => p.plan_name !== 'Shanta Child Education Plan' && !(p as any).isGroup,
                  )
                  const pickedRegular = regular.find((p) => p.plan_code === formData.PlanCode)
                  const pickedChild = childEducationVariants.find(
                    (p) => p.plan_code === formData.PlanCode,
                  )
                  const selectedLabel = pickedRegular?.plan_name ?? pickedChild?.plan_name ?? ''

                  if (selectedLabel) return selectedLabel
                  if (isLoadingPlans) return 'Loading plans...'
                  if (!formData.Age) return 'Enter age to load plans'
                  if (availablePlans.length === 0 && childEducationVariants.length === 0)
                    return 'No plans available'
                  return 'Select Plan'
                })()}
              </span>

              {/* CHANGE HERE — chevron like Select, rotates when open */}
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform ${planMenuOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            sideOffset={6}
            // className="z-[1000] rounded-[10px] p-0 overflow-hidden min-w-[260px]"
            className="z-[1000] min-w-[260px] rounded-md border bg-popover text-popover-foreground shadow-md p-0 overflow-hidden"
          >
            <div className="py-2">
              <DropdownMenuLabel className="px-3 py-2">Plans</DropdownMenuLabel>

              {/* Regular plans */}
              {/* {availablePlans
                .filter((p) => p.plan_name !== 'Shanta Child Education Plan' && !(p as any).isGroup)
                .map((plan) => (
                  <DropdownMenuItem
                    key={plan.plan_code}
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => {
                      const planWithVideo = {
                        ...plan,
                        videoLink:
                          videoLinkMappings[plan.plan_name as keyof typeof videoLinkMappings],
                      }
                      setSelectedPlan(planWithVideo)
                      setFormData((prev) => ({
                        ...prev,
                        PlanCode: plan.plan_code,
                        Term: 0,
                        PaymentMode: 0,
                      }))
                      setAvailableTenures([])
                      setAvailablePaymentModes([])
                      setFieldErrors((prev) => ({ ...prev, PlanCode: false, Term: false }))
                    }}
                  >
                    {plan.plan_name}
                  </DropdownMenuItem>
                ))} */}
              {availablePlans
                .filter((p) => p.plan_name !== 'Shanta Child Education Plan' && !(p as any).isGroup)
                .map((plan) => {
                  const selected = formData.PlanCode === plan.plan_code
                  return (
                    <DropdownMenuItem
                      key={plan.plan_code}
                      onClick={() => {
                        const planWithVideo = {
                          ...plan,
                          videoLink:
                            videoLinkMappings[plan.plan_name as keyof typeof videoLinkMappings],
                        }
                        setSelectedPlan(planWithVideo)
                        setFormData((prev) => ({
                          ...prev,
                          PlanCode: plan.plan_code,
                          Term: 0,
                          PaymentMode: 0,
                        }))
                        setAvailableTenures([])
                        setAvailablePaymentModes([])
                        setFieldErrors((prev) => ({ ...prev, PlanCode: false, Term: false }))
                      }}
                      className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${
                        selected ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      <Check className={`h-4 w-4 ${selected ? 'opacity-100' : 'opacity-0'}`} />
                      <span className="truncate">{plan.plan_name}</span>
                    </DropdownMenuItem>
                  )
                })}

              {/* If no regular plans */}
              {!isLoadingPlans &&
                formData.Age &&
                availablePlans.filter(
                  (p) => p.plan_name !== 'Shanta Child Education Plan' && !(p as any).isGroup,
                ).length === 0 && (
                  <DropdownMenuItem disabled className="px-3 py-2">
                    No regular plans available
                  </DropdownMenuItem>
                )}

              {/* Child Education submenu */}
              {childEducationVariants.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="px-3 py-2 cursor-pointer flex items-center justify-between">
                      <span>Shanta Child Education Plan</span>
                      {/* <ChevronRight className="h-4 w-4" /> */}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="z-[1100] min-w-[280px] rounded-md border bg-popover text-popover-foreground shadow-md p-0 overflow-hidden">
                      {/* {childEducationVariants.map((variant) => (
                        <DropdownMenuItem
                          key={variant.plan_code}
                          className="px-3 py-2 cursor-pointer"
                          onClick={() => {
                            const planWithVideo = {
                              ...variant,
                              videoLink:
                                videoLinkMappings[
                                  variant.plan_name as keyof typeof videoLinkMappings
                                ],
                            }
                            setSelectedPlan(planWithVideo)
                            setFormData((prev) => ({
                              ...prev,
                              PlanCode: variant.plan_code,
                              Term: 0,
                              PaymentMode: 0,
                            }))
                            setAvailableTenures([])
                            setAvailablePaymentModes([])
                            setFieldErrors((prev) => ({ ...prev, PlanCode: false, Term: false }))
                          }}
                        >
                          {variant.plan_name}
                        </DropdownMenuItem>
                      ))} */}
                      {childEducationVariants.map((variant) => {
                        const selected = formData.PlanCode === variant.plan_code
                        return (
                          <DropdownMenuItem
                            key={variant.plan_code}
                            onClick={() => {
                              const planWithVideo = {
                                ...variant,
                                videoLink:
                                  videoLinkMappings[
                                    variant.plan_name as keyof typeof videoLinkMappings
                                  ],
                              }
                              setSelectedPlan(planWithVideo)
                              setFormData((prev) => ({
                                ...prev,
                                PlanCode: variant.plan_code,
                                Term: 0,
                                PaymentMode: 0,
                              }))
                              setAvailableTenures([])
                              setAvailablePaymentModes([])
                              setFieldErrors((prev) => ({ ...prev, PlanCode: false, Term: false }))
                            }}
                            className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${
                              selected ? 'bg-accent text-accent-foreground' : ''
                            }`}
                          >
                            <Check
                              className={`h-4 w-4 ${selected ? 'opacity-100' : 'opacity-0'}`}
                            />
                            <span className="truncate">{variant.plan_name}</span>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </>
              )}

              {/* If truly nothing */}
              {!isLoadingPlans &&
                formData.Age &&
                availablePlans.length === 0 &&
                childEducationVariants.length === 0 && (
                  <DropdownMenuItem disabled className="px-3 py-2">
                    No plans available for this age
                  </DropdownMenuItem>
                )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* CHANGE HERE: tooltip while "disabled" (simulated) */}
        {isPlanDisabled && isHoveringPlanSelect && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
            {planDisabledMsg}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
          </div>
        )}

        {/* Watch video link (unchanged) */}
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
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Plan selection error (unchanged) */}
        {getFieldErrorMessage('PlanCode') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('PlanCode')}</p>
        )}
      </div>
      {/* ============================ REPLACE TO HERE ============================ */}

      {/* select your tenure */}
      <div
        className="col-span-2 md:col-span-1 relative"
        onMouseEnter={() => setIsHoveringTenureSelect(true)}
        onMouseLeave={() => setIsHoveringTenureSelect(false)}
      >
        <Select
          value={
            formData.Term && formData.Term > 0
              ? availableTenures.find((t) => t.value === formData.Term)?.text || ''
              : ''
          }
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
        {/* Tenure error message */}
        {getFieldErrorMessage('Term') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Term')}</p>
        )}
      </div>

      {/* gender select  */}
      <div className="col-span-2 md:col-span-1">
        <Select
          value={
            formData.Gender !== null && formData.Gender !== undefined
              ? genders.find((g) => g.value === formData.Gender)?.text || ''
              : ''
          }
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
            <SelectValue placeholder="Select Gender *" />
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
        {/* Gender error message */}
        {getFieldErrorMessage('Gender') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Gender')}</p>
        )}
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
        {/* Annual income error message */}
        {getFieldErrorMessage('annualIncome') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('annualIncome')}</p>
        )}
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
        {/* Show either suggested amount OR error message, not both */}
        {getFieldErrorMessage('SumAssured') ? (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('SumAssured')}</p>
        ) : (
          <p className="text-[8px] md:text-[10px] py-2 absolute right-1">
            Suggested <span className="text-[#FF6600]">{suggestedAmount.toLocaleString()}</span> BDT
          </p>
        )}
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
          value={
            formData.PaymentMode && formData.PaymentMode > 0
              ? availablePaymentModes.find((pm) => pm.paymode_id === formData.PaymentMode)
                  ?.paymode_name || ''
              : ''
          }
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
        {/* Payment Method error message */}
        {getFieldErrorMessage('PaymentMode') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('PaymentMode')}</p>
        )}
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

      {/* CONSENT CHECKBOX */}
      <div className="col-span-2">
        <label className="flex items-start gap-3">
          <Checkbox
            id="agree-terms"
            checked={agreeTerms}
            onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
          />
          <span className="text-xs md:text-sm leading-relaxed">
            By clicking <span className="font-semibold">Request for purchase</span>, you agree to
            our{' '}
            <Link
              href="/terms-condition"
              className="underline text-[#FF6600] hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              terms and conditions
            </Link>{' '}
            and Shanta Life{' '}
            <Link
              href="/privacy-policy"
              className="underline text-[#FF6600] hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacy policy
            </Link>
            .
          </span>
        </label>
      </div>

      {/* General error display removed - using field-specific errors now */}
      {/* submit button */}
      <div className="col-span-2 items-center px-4 flex flex-col gap-6 lg:gap-6 justify-center">
        <Button
          disabled={isLoading || !agreeTerms}
          aria-disabled={isLoading || !agreeTerms}
          className={[
            'bg-[#978900] disabled:bg-gray-400 w-fit text-[11px] md:global-h4 text-white rounded-[4px] md:rounded-[10px] px-6 py-4 xl:px-8 xl:py-8',
            !agreeTerms || isLoading ? 'opacity-60 cursor-not-allowed' : '',
          ].join(' ')}
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
