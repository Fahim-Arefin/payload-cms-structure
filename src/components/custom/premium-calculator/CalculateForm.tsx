'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import DatePicker from 'react-datepicker'
// @ts-ignore: side-effect import of CSS without type declarations
import 'react-datepicker/dist/react-datepicker.css'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Check, ChevronDown } from 'lucide-react'
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
import useSSRLanguage from '@/hooks/useSSRLanguage'
import LocalizedRichText from '../shared/LocalizedRichText'

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
  consentEn?: any | null
  consentBn?: any | null
}

function CalculateForm({ onApiResponse, formData, setFormData, consentBn, consentEn }: Props) {
  // ===== Localization helper =====
  const lang = useSSRLanguage()
  const L = (en: string, bn?: string) => (lang === 'en' ? en : (bn ?? en))

  const [selectedPlan, setSelectedPlan] = useState<AvailablePlan | null>(null)
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [availableTenures, setAvailableTenures] = useState<{ labelEn: string; labelBn: string; value: number }[]>([])
  const [isLoadingTenures, setIsLoadingTenures] = useState(false)
  const [tenureError, setTenureError] = useState<string | null>(null)

  const [availablePlans, setAvailablePlans] = useState<AvailablePlan[]>([])
  const [childEducationVariants, setChildEducationVariants] = useState<ChildVariant[]>([])
  const [isLoadingPlans, setIsLoadingPlans] = useState(false)
  const [planError, setPlanError] = useState<string | null>(null)
  const [planMenuOpen, setPlanMenuOpen] = useState(false)

  const [agreeTerms, setAgreeTerms] = useState(false)

  const [availablePaymentModes, setAvailablePaymentModes] = useState<
    { paymode_name: string; paymode_id: number }[]
  >([])
  const [isLoadingPaymentModes, setIsLoadingPaymentModes] = useState(false)

  const [fieldErrors, setFieldErrors] = useState({
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

  const isPlanDisabled =
    isLoadingPlans ||
    !formData.Age ||
    (availablePlans.length === 0 && childEducationVariants.length === 0)

  const planDisabledMsg = !formData.Age
    ? L('Enter age first', 'আগে বয়স লিখুন')
    : isLoadingPlans
      ? L('Loading plans...', 'প্ল্যান লোড হচ্ছে...')
      : L('No plans available', 'কোনো প্ল্যান পাওয়া যায়নি')

  const formatDateForAPI = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }

  const calculateAgeFromAPI = async (dateOfBirth: Date) => {
    setIsCalculatingAge(true)
    setAgeCalculationError(null)
    try {
      const formattedDate = formatDateForAPI(dateOfBirth)
      const response = await fetch(`/api/age-calculate?dateofbirth=${formattedDate}`)
      if (!response.ok) throw new Error('Failed to calculate age')
      const data = await response.json()
      if (data.age !== undefined) {
        setFormData((prev) => ({ ...prev, dateOfBirth, Age: data.age }))
        setIsDatePickerOpen(false)
        setTempSelectedDate(null)
        setFieldErrors((prev) => ({ ...prev, Age: false }))
      } else throw new Error('Invalid response from age calculation API')
    } catch (err) {
      setAgeCalculationError(err instanceof Error ? err.message : 'Failed to calculate age')
    } finally {
      setIsCalculatingAge(false)
    }
  }

  const calculateSuggestedAmount = () => {
    if (formData.Term && formData.annualIncome) {
      const calculated = formData.Term * formData.annualIncome * 0.1
      return Math.max(calculated, 100000)
    }
    return 100000
  }
  const suggestedAmount = calculateSuggestedAmount()

  // Fetch & normalize plans (localized)
  const fetchPlans = async (age: number) => {
    if (!age || age < 18 || age > 65) {
      setAvailablePlans([])
      setChildEducationVariants([])
      return
    }
    setIsLoadingPlans(true)
    setPlanError(null)

    try {
      const response = await fetch(`/api/plan/0/${age}`)
      if (!response.ok) throw new Error('Failed to fetch plans')
      const data = await response.json()

      if (Array.isArray(data)) {
        // Normalize to canonical keys
        const normalized = data
          .filter((p: any) => API_TO_CANONICAL[p.plan_name])
          .map((p: any) => {
            const key = API_TO_CANONICAL[p.plan_name]
            return {
              plan_code: p.plan_code,
              key,
              labelEn: PLAN_LABELS[key].en,
              labelBn: PLAN_LABELS[key].bn,
              videoLink: VIDEO_LINKS[key],
            } as AvailablePlan
          })

        const children = normalized.filter((p) =>
          p.key.toLowerCase().includes('child education'),
        )
        const others = normalized.filter((p) => !p.key.toLowerCase().includes('child education'))

        setChildEducationVariants(children)
        setAvailablePlans(others)
      } else {
        setAvailablePlans([])
        setChildEducationVariants([])
      }
    } catch (err) {
      setPlanError(err instanceof Error ? err.message : 'Failed to fetch plans')
      setAvailablePlans([])
      setChildEducationVariants([])
    } finally {
      setIsLoadingPlans(false)
    }
  }

  // Tenure + payment modes (localized)
  const fetchTenureOptions = async (planCode: number, age: number) => {
    if (!planCode || !age || age < 18 || age > 65) {
      setAvailableTenures([])
      setAvailablePaymentModes([])
      return
    }
    setIsLoadingTenures(true)
    setIsLoadingPaymentModes(true)
    setTenureError(null)
    try {
      const response = await fetch(`/api/plan/${planCode}/${age}`)
      if (!response.ok) throw new Error('Failed to fetch tenure options')
      const data = await response.json()

      if (data && data[0]?.term) {
        const termArray = JSON.parse(data[0].term)
        if (Array.isArray(termArray)) {
          const tenureOptions = termArray.map((t: any) => ({
            labelEn: `${t.term} years`,
            labelBn: `${bnNum(t.term)} বছর`,
            value: Number(t.term),
          }))
          setAvailableTenures(tenureOptions)
        } else setAvailableTenures([])
      } else {
        setAvailableTenures([])
      }

      if (data && data[0]?.pay_mode) {
        try {
          const payModeArray =
            typeof data[0].pay_mode === 'string' ? JSON.parse(data[0].pay_mode) : data[0].pay_mode
          if (Array.isArray(payModeArray)) {
            const valid = payModeArray.filter(
              (m: any) =>
                m &&
                typeof m === 'object' &&
                m.paymode_name &&
                m.paymode_name.trim() !== '' &&
                m.paymode_id != null,
            )
            setAvailablePaymentModes(valid)
          } else setAvailablePaymentModes([])
        } catch {
          setAvailablePaymentModes([])
        }
      } else {
        setAvailablePaymentModes([])
      }
    } catch (err) {
      setTenureError(err instanceof Error ? err.message : 'Failed to fetch tenure options')
      setAvailableTenures([])
      setAvailablePaymentModes([])
    } finally {
      setIsLoadingTenures(false)
      setIsLoadingPaymentModes(false)
    }
  }

  // Gender (stable numeric; localized label)
  const genders = [
    { textEn: 'Male', textBn: 'পুরুষ', value: 1 },
    { textEn: 'Female', textBn: 'মহিলা', value: 2 },
  ]

  const handleInputChange = (field: keyof FormData, value: string | number | Date | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if ((field as keyof typeof fieldErrors) in fieldErrors) {
      const f = field as keyof typeof fieldErrors
      if (fieldErrors[f]) setFieldErrors((prev) => ({ ...prev, [f]: false }))
    }
  }

  const handleDateChange = (date: Date | null) => setTempSelectedDate(date)
  const handleConfirmDate = () => tempSelectedDate && calculateAgeFromAPI(tempSelectedDate)
  const handleOpenDatePicker = () => {
    setTempSelectedDate(formData.dateOfBirth)
    setIsDatePickerOpen(true)
    setAgeCalculationError(null)
  }
  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false)
    setTempSelectedDate(null)
    setAgeCalculationError(null)
  }

  const handleChildEducationPlanSelect = (variant: ChildVariant) => {
    setSelectedPlan(variant)
    setFormData((prev) => ({ ...prev, PlanCode: variant.plan_code, Term: 0, PaymentMode: 0 }))
    setAvailableTenures([])
    setAvailablePaymentModes([])
    setFieldErrors((prev) => ({ ...prev, PlanCode: false, Term: false }))
  }

  useEffect(() => {
    if (formData.Age) {
      fetchPlans(formData.Age)
      setFormData((prev) => ({ ...prev, PlanCode: 0, Term: 0, PaymentMode: 0 }))
      setSelectedPlan(null)
      setAvailableTenures([])
      setAvailablePaymentModes([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.Age])

  useEffect(() => {
    if (formData.PlanCode && formData.Age) {
      setIsLoadingTenures(true)
      setIsLoadingPaymentModes(true)
      fetchTenureOptions(formData.PlanCode, formData.Age)
      setFormData((prev) => ({ ...prev, Term: 0, PaymentMode: 0 }))
      setCurrentPaymentMode('')
    } else {
      setAvailableTenures([])
      setAvailablePaymentModes([])
      setIsLoadingTenures(false)
      setIsLoadingPaymentModes(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.PlanCode, formData.Age])

  const calculatePremium = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/calculate-premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      if (!response.ok) throw new Error('Failed to calculate premium')
      const data: ApiResponse[] = await response.json()
      if (data && data.length > 0) {
        setApiResponse(data[0])
        // pass canonical EN name to parent for any mapping logic
        onApiResponse?.(data[0], currentPaymentMode, selectedPlan?.key)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldErrorMessage = (field: keyof typeof fieldErrors): string => {
    if (!fieldErrors[field]) return ''
    switch (field) {
      case 'PlanCode':
        return L('Please select a plan', 'অনুগ্রহ করে একটি প্ল্যান নির্বাচন করুন')
      case 'Age':
        if (!formData.dateOfBirth)
          return L('Please select your date of birth', 'অনুগ্রহ করে জন্মতারিখ নির্বাচন করুন')
        if (formData.Age < 18 || formData.Age > 65)
          return L('Age must be between 18 and 65', 'বয়স ১৮ থেকে ৬৫ বছরের মধ্যে হতে হবে')
        return ''
      case 'annualIncome':
        return L('Please enter your annual income', 'অনুগ্রহ করে বার্ষিক আয় লিখুন')
      case 'SumAssured':
        if (!formData.SumAssured)
          return L('Please enter sum assured amount', 'অনুগ্রহ করে বীমা অঙ্ক লিখুন')
        if (formData.SumAssured < 100000)
          return L('Sum assured must be at least ৳1,00,000', 'বীমা অঙ্ক কমপক্ষে ৳১,০০,০০০ হতে হবে')
        return ''
      case 'Term':
        return L('Please select a tenure', 'অনুগ্রহ করে মেয়াদ নির্বাচন করুন')
      case 'PaymentMode':
        return L('Please select a payment method', 'অনুগ্রহ করে পেমেন্ট মেথড নির্বাচন করুন')
      case 'Gender':
        return L('Please select your gender', 'অনুগ্রহ করে লিঙ্গ নির্বাচন করুন')
      default:
        return ''
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({
      PlanCode: false,
      Age: false,
      annualIncome: false,
      SumAssured: false,
      Term: false,
      PaymentMode: false,
      Gender: false,
    })

    const errors = {
      PlanCode: !formData.PlanCode,
      Age: !formData.dateOfBirth || formData.Age < 18 || formData.Age > 65,
      annualIncome: !formData.annualIncome,
      SumAssured: !formData.SumAssured || formData.SumAssured < 100000,
      Term: !formData.Term,
      PaymentMode: !formData.PaymentMode,
      Gender: formData.Gender === undefined || formData.Gender === null,
    }

    setFieldErrors(errors)
    if (Object.values(errors).some(Boolean)) return

    setError(null)
    calculatePremium()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-[#9C863940] grid grid-cols-2 gap-x-4 gap-y-8 md:gap-5 xl:gap-6 xl:px-4 xl:py-8 py-8 px-4 z-10"
    >
      {/* DOB + Age */}
      <div className="col-span-2 md:col-span-1">
        <div className="flex gap-2">
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
                    <span>{L('DOB *', 'জন্মতারিখ *')}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4">
                  <DatePicker
                    selected={tempSelectedDate}
                    onChange={(d) => setTempSelectedDate(d)}
                    maxDate={new Date()}
                    minDate={new Date(new Date().getFullYear() - 65, 0, 1)}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    placeholderText={L('Select date of birth', 'জন্মতারিখ নির্বাচন করুন')}
                    dateFormat="dd/MM/yyyy"
                    inline
                  />
                  <div className="flex justify-between items-center mt-3 pt-3 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCloseDatePicker}
                      disabled={isCalculatingAge}
                    >
                      {L('Cancel', 'বাতিল')}
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
                          {L('Calculating...', 'হিসাব করা হচ্ছে...')}
                        </div>
                      ) : (
                        L('Confirm', 'নিশ্চিত করুন')
                      )}
                    </Button>
                  </div>
                  {ageCalculationError && (
                    <p className="text-red-500 text-xs mt-2">{ageCalculationError}</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1">
            <Input
              type="text"
              placeholder={L('Age', 'বয়স')}
              value={formData.Age ? `${L('Age', 'বয়স')}: ${lang === 'en' ? formData.Age : bnNum(formData.Age)}` : ''}
              readOnly
              className={`bg-gray-50 shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-3 py-5 xl:px-4 xl:py-6 cursor-not-allowed text-xs xl:text-sm ${
                fieldErrors.Age ? 'border-red-500 border-2' : ''
              }`}
            />
          </div>
        </div>

        {getFieldErrorMessage('Age') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Age')}</p>
        )}
        {isCalculatingAge && (
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 border-2 border-[#978900] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-[#978900]">
              {L('Calculating age...', 'বয়স হিসাব করা হচ্ছে...')}
            </span>
          </div>
        )}
      </div>

      {/* Plans (DropdownMenu) */}
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
                'font-normal text-xs w-full justify-between text-left bg-background text-foreground',
                'border border-input rounded-[10px] px-5 py-5 xl:px-4 xl:py-6',
                'shadow-[0px_0px_5px_0px_#00000040]',
                'transition-colors',
                !isPlanDisabled && 'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
                planMenuOpen && 'bg-accent text-accent-foreground',
                fieldErrors.PlanCode ? 'border-red-500' : '',
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
                  const pickedRegular = availablePlans.find((p) => p.plan_code === formData.PlanCode)
                  const pickedChild = childEducationVariants.find((p) => p.plan_code === formData.PlanCode)
                  const label = pickedRegular?.[lang === 'en' ? 'labelEn' : 'labelBn'] ?? pickedChild?.[lang === 'en' ? 'labelEn' : 'labelBn'] ?? ''

                  if (label) return label
                  if (isLoadingPlans) return L('Loading plans...', 'প্ল্যান লোড হচ্ছে...')
                  if (!formData.Age) return L('Enter age to load plans', 'প্ল্যান দেখতে আগে বয়স লিখুন')
                  if (availablePlans.length === 0 && childEducationVariants.length === 0)
                    return L('No plans available', 'কোনো প্ল্যান পাওয়া যায়নি')
                  return L('Select Plan', 'প্ল্যান নির্বাচন করুন')
                })()}
              </span>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${planMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            sideOffset={6}
            className="z-[1000] min-w-[260px] rounded-md border bg-popover text-popover-foreground shadow-md p-0 overflow-hidden"
          >
            <div className="py-2">
              <DropdownMenuLabel className="px-3 py-2">
                {L('Plans', 'প্ল্যানসমূহ')}
              </DropdownMenuLabel>

              {/* Regular plans */}
              {availablePlans.map((plan) => {
                const selected = formData.PlanCode === plan.plan_code
                const label = lang === 'en' ? plan.labelEn : plan.labelBn
                return (
                  <DropdownMenuItem
                    key={plan.plan_code}
                    onClick={() => {
                      setSelectedPlan(plan)
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
                    className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${selected ? 'bg-accent text-accent-foreground' : ''}`}
                  >
                    <Check className={`h-4 w-4 ${selected ? 'opacity-100' : 'opacity-0'}`} />
                    <span className="truncate">{label}</span>
                  </DropdownMenuItem>
                )
              })}

              {!isLoadingPlans && formData.Age && availablePlans.length === 0 && (
                <DropdownMenuItem disabled className="px-3 py-2">
                  {L('No regular plans available', 'কোনো সাধারণ প্ল্যান নেই')}
                </DropdownMenuItem>
              )}

              {/* Child Education group */}
              {childEducationVariants.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="px-3 py-2 cursor-pointer flex items-center justify-between">
                      <span>
                        {L('Shanta Child Education Plan', 'শান্তা চাইল্ড এডুকেশন প্ল্যান')}
                      </span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="z-[1100] min-w-[280px] rounded-md border bg-popover text-popover-foreground shadow-md p-0 overflow-hidden">
                      {childEducationVariants.map((variant) => {
                        const selected = formData.PlanCode === variant.plan_code
                        const label = lang === 'en' ? variant.labelEn : variant.labelBn
                        return (
                          <DropdownMenuItem
                            key={variant.plan_code}
                            onClick={() => handleChildEducationPlanSelect(variant)}
                            className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${selected ? 'bg-accent text-accent-foreground' : ''}`}
                          >
                            <Check className={`h-4 w-4 ${selected ? 'opacity-100' : 'opacity-0'}`} />
                            <span className="truncate">{label}</span>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </>
              )}

              {!isLoadingPlans && formData.Age && availablePlans.length === 0 && childEducationVariants.length === 0 && (
                <DropdownMenuItem disabled className="px-3 py-2">
                  {L('No plans available for this age', 'এই বয়সের জন্য কোনো প্ল্যান নেই')}
                </DropdownMenuItem>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tooltip when disabled */}
        {isPlanDisabled && isHoveringPlanSelect && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
            {planDisabledMsg}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
          </div>
        )}

        {/* Watch video */}
        {selectedPlan && selectedPlan.videoLink && (
          <Dialog>
            <DialogTrigger asChild>
              <p className="text-[10px] py-1 absolute inset-x-0 text-[#FF6600] underline cursor-pointer">
                {L('Watch', 'ভিডিও দেখুন')} {lang === 'en' ? selectedPlan.labelEn : selectedPlan.labelBn} {L('Video', '')}
              </p>
            </DialogTrigger>
            <DialogContent
              className="max-w-5xl w-full aspect-video p-0 bg-black 
              [&>button.absolute]:top-3 [&>button.absolute]:right-3 
              [&>button.absolute]:bg-black/50 [&>button.absolute]:text-white 
              [&>button.absolute]:hover:bg-black/80"
            >
              <VisuallyHidden>
                <DialogTitle>Plan Video</DialogTitle>
              </VisuallyHidden>
              <iframe
                width="100%"
                height="100%"
                src={selectedPlan.videoLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </DialogContent>
          </Dialog>
        )}

        {getFieldErrorMessage('PlanCode') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('PlanCode')}</p>
        )}
      </div>

      {/* Tenure */}
      <div
        className="col-span-2 md:col-span-1 relative"
        onMouseEnter={() => setIsHoveringTenureSelect(true)}
        onMouseLeave={() => setIsHoveringTenureSelect(false)}
      >
        <Select
          value={formData.Term ? String(formData.Term) : ''}
          disabled={
            isLoadingTenures || !formData.PlanCode || !formData.Age || availableTenures.length === 0
          }
          onValueChange={(v) => {
            const val = parseInt(v, 10)
            if (!isNaN(val)) handleInputChange('Term', val)
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
                  ? L('Loading tenure options...', 'মেয়াদ অপশন লোড হচ্ছে...')
                  : !formData.PlanCode || !formData.Age
                    ? L('Select plan and age first', 'প্রথমে প্ল্যান ও বয়স নির্বাচন করুন')
                    : availableTenures.length === 0
                      ? L('No tenure options available', 'কোনো মেয়াদ অপশন নেই')
                      : L('Select Your Tenure *', 'মেয়াদ নির্বাচন করুন *')
              }
            />
          </SelectTrigger>
          {isHoveringTenureSelect && (!formData.PlanCode || !formData.Age) && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
              {L('Select age and plan first', 'প্রথমে বয়স ও প্ল্যান নির্বাচন করুন')}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
            </div>
          )}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{L('Tenure', 'মেয়াদ')}</SelectLabel>
              {availableTenures.map((tenure) => (
                <SelectItem key={tenure.value} value={String(tenure.value)}>
                  {lang === 'en' ? tenure.labelEn : tenure.labelBn}
                </SelectItem>
              ))}
              {availableTenures.length === 0 &&
                !isLoadingTenures &&
                formData.PlanCode &&
                formData.Age && (
                  <SelectItem disabled value="no-options">
                    {L(
                      'No tenure options available for this plan and age',
                      'এই প্ল্যান ও বয়সের জন্য কোনো মেয়াদ অপশন নেই',
                    )}
                  </SelectItem>
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {tenureError && (
          <p className="text-[10px] py-1 text-red-600 absolute inset-x-0">{tenureError}</p>
        )}
        {getFieldErrorMessage('Term') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Term')}</p>
        )}
      </div>

      {/* Gender */}
      <div className="col-span-2 md:col-span-1">
        <Select
          value={
            formData.Gender !== null && formData.Gender !== undefined
              ? String(formData.Gender)
              : ''
          }
          onValueChange={(v) => handleInputChange('Gender', parseInt(v, 10))}
        >
          <SelectTrigger
            className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
              fieldErrors.Gender ? 'border-red-500 border-2' : ''
            }`}
          >
            <SelectValue placeholder={L('Select Gender *', 'লিঙ্গ নির্বাচন করুন *')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{L('Gender', 'লিঙ্গ')}</SelectLabel>
              {genders.map((g) => (
                <SelectItem key={g.value} value={String(g.value)}>
                  {L(g.textEn, g.textBn)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {getFieldErrorMessage('Gender') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Gender')}</p>
        )}
      </div>

      {/* Annual Income */}
      <div className="col-span-2 md:col-span-1">
        <Input
          min={0}
          type="number"
          placeholder={L('Annual Income *', 'বার্ষিক আয় *')}
          value={formData.annualIncome || ''}
          onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value) || 0)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.annualIncome ? 'border-red-500 border-2' : ''
          }`}
        />
        {getFieldErrorMessage('annualIncome') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('annualIncome')}</p>
        )}
      </div>

      {/* Sum Assured */}
      <div className="relative col-span-2 md:col-span-1">
        <Input
          min={100000}
          type="number"
          placeholder={L('Sum Assured *', 'বীমা অঙ্ক *')}
          value={formData.SumAssured || ''}
          onChange={(e) => handleInputChange('SumAssured', parseInt(e.target.value) || 0)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.SumAssured ? 'border-red-500 border-2' : ''
          }`}
        />
        {getFieldErrorMessage('SumAssured') ? (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('SumAssured')}</p>
        ) : (
          <p className="text-[8px] md:text-[10px] py-2 absolute right-1">
            {L('Suggested', 'সাজেস্টেড')}{' '}
            <span className="text-[#FF6600]">
              {lang === 'en' ? suggestedAmount.toLocaleString() : bnNum(suggestedAmount.toLocaleString())}
            </span>{' '}
            {L('BDT', 'টাকা')}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="tel"
          placeholder={L('Phone Number', 'ফোন নম্বর')}
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* Payment Method */}
      <div
        className="col-span-2 md:col-span-1 relative"
        onMouseEnter={() => setIsHoveringPaymentSelect(true)}
        onMouseLeave={() => setIsHoveringPaymentSelect(false)}
      >
        <Select
          value={formData.PaymentMode ? String(formData.PaymentMode) : ''}
          disabled={
            isLoadingPaymentModes ||
            !formData.PlanCode ||
            !formData.Age ||
            !formData.Term ||
            availablePaymentModes.length === 0
          }
          onValueChange={(v) => {
            const id = parseInt(v, 10)
            const method = availablePaymentModes.find((pm) => pm.paymode_id === id)
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
                  ? L('Loading payment methods...', 'পেমেন্ট মেথড লোড হচ্ছে...')
                  : !formData.PlanCode || !formData.Age || !formData.Term
                    ? L('Select plan, age & term first', 'প্রথমে প্ল্যান, বয়স ও মেয়াদ নির্বাচন করুন')
                    : availablePaymentModes.length === 0
                      ? L('No payment methods available', 'কোনো পেমেন্ট মেথড নেই')
                      : L('Select Payment Method', 'পেমেন্ট মেথড নির্বাচন করুন')
              }
            />
          </SelectTrigger>
          {isHoveringPaymentSelect && (!formData.PlanCode || !formData.Age || !formData.Term) && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
              {L('Select plan, age & term first', 'প্রথমে প্ল্যান, বয়স ও মেয়াদ নির্বাচন করুন')}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
            </div>
          )}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{L('Payment Method', 'পেমেন্ট মেথড')}</SelectLabel>
              {availablePaymentModes.map((pm) => (
                <SelectItem key={pm.paymode_id} value={String(pm.paymode_id)}>
                  {localizePaymode(pm.paymode_name, lang as 'en' | 'bn')}
                </SelectItem>
              ))}
              {availablePaymentModes.length === 0 &&
                !isLoadingPaymentModes &&
                formData.PlanCode &&
                formData.Age &&
                formData.Term && (
                  <SelectItem disabled value="no-options">
                    {L('No payment methods available', 'কোনো পেমেন্ট মেথড নেই')}
                  </SelectItem>
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {getFieldErrorMessage('PaymentMode') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('PaymentMode')}</p>
        )}
      </div>

      {/* Name */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder={L('Name', 'নাম')}
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* Email */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder={L('Email', 'ইমেইল')}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* Consent */}
      <div className="col-span-2">
        <label className="flex items-start gap-3">
          <Checkbox
            id="agree-terms"
            checked={agreeTerms}
            onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
          />
          <div className="text-xs md:text-sm leading-relaxed">
            <LocalizedRichText en={consentEn} bn={consentBn} />
          </div>
        </label>
      </div>

      {/* Submit + helper text */}
      <div className="col-span-2 items-center px-4 flex flex-col gap-6 lg:gap-6 justify-center">
        <Button
          disabled={isLoading || !agreeTerms}
          aria-disabled={isLoading || !agreeTerms}
          className={[
            'bg-[#978900] disabled:bg-gray-400 w-fit text-[11px] md:global-h4 text-white rounded-[4px] md:rounded-[10px] px-6 py-4 xl:px-8 xl:py-8',
            !agreeTerms || isLoading ? 'opacity-60 cursor-not-allowed' : '',
          ].join(' ')}
        >
          {isLoading
            ? L('Calculating...', 'হিসাব করা হচ্ছে...')
            : L('Calculate Now', 'এখনই ক্যালকুলেট করুন')}
        </Button>

        <p className="text-[12px] md:text-[14px] text-[#00000099] mt-4 md:mt-1 md:w-[90%] font-light md:capitalize">
          {L(
            "Our expert advisors are ready to help you choose the best plan based on your age, income, and future goals. Whether you're just starting your career or planning for retirement, we are with you at every step.",
            'আপনার বয়স, আয় এবং ভবিষ্যৎ লক্ষ্য অনুযায়ী সেরা প্ল্যান বেছে নিতে আমাদের বিশেষজ্ঞ পরামর্শদাতারা প্রস্তুত। আপনি ক্যারিয়ারের শুরুতেই থাকুন বা অবসরের পরিকল্পনা করুন—আমরা আছি আপনার প্রতিটি পদক্ষেপে।',
          )}
        </p>
      </div>
    </form>
  )
}

export default CalculateForm
