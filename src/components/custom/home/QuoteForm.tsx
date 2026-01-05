'use client'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ApiResponse } from '@/utils/premiumCalculator'
import { formatLocalizedNumber } from '@/utils/numberLocalization'
import GlobalButton from '../shared/GlobalButton'

// NEW: icons & dropdown-menu pieces for the plan selector
import { Check, ChevronDown } from 'lucide-react'
import { format } from 'date-fns'
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
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import LocalizedString from '../shared/LocalizedString'
import LocalizedText from '../shared/LocalizedText'
import { PremiumCalculatorBlockType } from '@/types/payloadCustomTypes'
import LocalizedRichText from '../shared/LocalizedRichText'

/* ---------------- helpers JUST for select option localization ---------------- */

const bnNum = (s: string | number) => String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])

const PLAN_LABELS: Record<string, { en: string; bn: string }> = {
  'Shanta Endowment Plan': { en: 'Shanta Endowment Plan', bn: 'শান্তা এনডাওমেন্ট প্ল্যান' },
  'Shanta 3 Stage Plan': { en: 'Shanta 3 Stage Plan', bn: 'শান্তা থ্রি পেমেন্ট প্ল্যান' },
  'Shanta 4 Stage Plan': { en: 'Shanta 4 Stage Plan', bn: 'শান্তা ফোর পেমেন্ট প্ল্যান' },
  'Shanta Child Education Plan (1%)': {
    en: 'Shanta Child Education Plan (1%)',
    bn: 'শান্তা চাইল্ড এডুকেশন প্ল্যান (১%)',
  },
  'Shanta Child Education Plan (2%)': {
    en: 'Shanta Child Education Plan (2%)',
    bn: 'শান্তা চাইল্ড এডুকেশন প্ল্যান (২%)',
  },
  'Shanta Child Education Plan (3%)': {
    en: 'Shanta Child Education Plan (3%)',
    bn: 'শান্তা চাইল্ড এডুকেশন প্ল্যান (৩%)',
  },
  'Shanta Child Education Plan Single Payment (1%)': {
    en: 'Shanta Child Education Plan Single Payment (1%)',
    bn: 'চাইল্ড এডুকেশন সিঙ্গেল পেমেন্ট (১%)',
  },
  'Shanta Child Education Plan Single Payment (2%)': {
    en: 'Shanta Child Education Plan Single Payment (2%)',
    bn: 'চাইল্ড এডুকেশন সিঙ্গেল পেমেন্ট (২%)',
  },
  'Shanta Child Education Plan Single Payment (3%)': {
    en: 'Shanta Child Education Plan Single Payment (3%)',
    bn: 'চাইল্ড এডুকেশন সিঙ্গেল পেমেন্ট (৩%)',
  },
}
// API → canonical EN
const API_PLAN_NAME_MAP: Record<string, string> = {
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
const planLabel = (name: string, lang: 'en' | 'bn') => PLAN_LABELS[name]?.[lang] ?? name

const localizeTenure = (label: string, lang: 'en' | 'bn') => {
  if (lang === 'en') return label
  // "10 years" -> "১০ বছর"
  return label.replace(/(\d+)/, (m) => bnNum(m)).replace(/years?/, 'বছর')
}

const localizePaymode = (name: string, lang: 'en' | 'bn') => {
  const map: Record<string, { en: string; bn: string }> = {
    Yearly: { en: 'Yearly', bn: 'বার্ষিক' },
    'Half Yearly': { en: 'Half Yearly', bn: 'অর্ধ-বার্ষিক' },
    HalfYearly: { en: 'Half Yearly', bn: 'অর্ধ-বার্ষিক' },
    Quarterly: { en: 'Quarterly', bn: 'ত্রৈমাসিক' },
    Monthly: { en: 'Monthly', bn: 'মাসিক' },
    Single: { en: 'Single Payment', bn: 'এককালীন' },
    'Single Payment': { en: 'Single Payment', bn: 'এককালীন' },
  }
  const key = map[name] ? name : name.replace(/\s+/g, '')
  return map[key] ? map[key][lang] : name
}

/* --------------------------------------------------------------------------- */

interface FormData {
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

type QuoteMeta = {
  lang?: 'en' | 'bn'
  plan?: { code: number; name: string; displayName?: string }
  payment?: { id: number; name: string; displayName?: string }
  gender?: { id: number; name: string; displayName?: string }
  term?: { value: number; label: string }
}

interface QuoteFormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  onApiResponse?: (response: ApiResponse, paymentMode: string) => void
  payloadData: PremiumCalculatorBlockType
  // ✅ new
  onMetaChange?: (patch: Partial<QuoteMeta>) => void
  onMetaReset?: () => void
}

function QuoteForm({
  formData,
  setFormData,
  onApiResponse,
  payloadData,
  onMetaChange,
  onMetaReset,
}: QuoteFormProps) {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isHoveringPlanSelect, setIsHoveringPlanSelect] = useState(false)
  const [isHoveringTenureSelect, setIsHoveringTenureSelect] = useState(false)
  const [isHoveringPaymentSelect, setIsHoveringPaymentSelect] = useState(false)

  // const [formData, setFormData] = useState<FormData>({
  //   PlanCode: 0,
  //   Age: 0,
  //   dateOfBirth: null,
  //   SumAssured: 0,
  //   Term: 0,
  //   PaymentMode: 0,
  //   Gender: null,
  //   phoneNumber: '',
  //   annualIncome: 0,
  //   name: '',
  //   email: '',
  // })

  const lang = useSSRLanguage()
  const L = (en: string, bn: string) => (lang === 'en' ? en : bn)
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [availableTenures, setAvailableTenures] = useState<{ text: string; value: number }[]>([])
  const [isLoadingTenures, setIsLoadingTenures] = useState(false)
  const [tenureError, setTenureError] = useState<string | null>(null)

  const [availablePlans, setAvailablePlans] = useState<{ plan_name: string; plan_code: number }[]>(
    [],
  )
  const [isLoadingPlans, setIsLoadingPlans] = useState(false)
  const [planError, setPlanError] = useState<string | null>(null)

  const [availablePaymentModes, setAvailablePaymentModes] = useState<
    { paymode_name: string; paymode_id: number }[]
  >([])
  const [isLoadingPaymentModes, setIsLoadingPaymentModes] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const [fieldErrors, setFieldErrors] = useState({
    PlanCode: false,
    Age: false,
    annualIncome: false,
    SumAssured: false,
    Term: false,
    PaymentMode: false,
    Gender: false,
    agreeTerms: false,
  })

  const [currentPaymentMode, setCurrentPaymentMode] = useState<string>('')

  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isCalculatingAge, setIsCalculatingAge] = useState(false)
  const [ageCalculationError, setAgeCalculationError] = useState<string | null>(null)

  // NEW: child education variants, dropdown open state, disabled state + msg
  const [childEducationVariants, setChildEducationVariants] = useState<
    { plan_name: string; plan_code: number }[]
  >([])
  const [planMenuOpen, setPlanMenuOpen] = useState(false)
  const isPlanDisabled =
    isLoadingPlans ||
    !formData.Age ||
    (availablePlans.length === 0 && childEducationVariants.length === 0)
  const planDisabledMsg = !formData.Age
    ? L('Enter age first', 'আগে বয়স লিখুন')
    : isLoadingPlans
      ? 'Loading plans...'
      : 'No plans available'

  // Video link mappings for plans
  const videoLinkMappings: Record<string, string> = {
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

  // Date helpers
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
      } else {
        throw new Error('Invalid response from age calculation API')
      }
    } catch (err) {
      setAgeCalculationError(err instanceof Error ? err.message : 'Failed to calculate age')
    } finally {
      setIsCalculatingAge(false)
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

  const calculateSuggestedAmount = () => {
    if (formData.Term && formData.annualIncome) {
      const calculated = formData.Term * formData.annualIncome * 0.1
      return Math.max(calculated, 100000)
    }
    return 100000
  }
  const suggestedAmount = calculateSuggestedAmount()

  // Fetch plans by age — now including all Child Education variants and grouping them
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
        const normalized = data
          .filter((plan: any) => API_PLAN_NAME_MAP[plan.plan_name])
          .map((plan: any) => ({
            ...plan,
            plan_name: API_PLAN_NAME_MAP[plan.plan_name],
          }))

        const childPlans = normalized.filter((p: any) =>
          p.plan_name.includes('Shanta Child Education Plan'),
        )
        const otherPlans = normalized.filter(
          (p: any) => !p.plan_name.includes('Shanta Child Education Plan'),
        )

        setChildEducationVariants(childPlans)

        const groupedPlans = [
          ...otherPlans,
          ...(childPlans.length > 0
            ? [{ plan_name: 'Shanta Child Education Plan', plan_code: 0, isGroup: true as const }]
            : []),
        ]

        setAvailablePlans(groupedPlans)
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

  const genders = [
    { text: 'Male', value: 1 },
    { text: 'Female', value: 2 },
  ]

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field in fieldErrors && (fieldErrors as any)[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: false }) as any)
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
      if (!response.ok) throw new Error('Failed to fetch tenure options')
      const data = await response.json()

      if (data && data[0]?.term) {
        try {
          const termArray = JSON.parse(data[0].term)
          if (Array.isArray(termArray)) {
            const tenureOptions = termArray.map((t: any) => ({
              text: `${t.term} years`,
              value: Number(t.term),
            }))
            setAvailableTenures(tenureOptions)
          } else {
            setAvailableTenures([])
          }
        } catch {
          setAvailableTenures([])
        }
      } else {
        setAvailableTenures([])
      }

      if (data && data[0]?.pay_mode) {
        try {
          const raw =
            typeof data[0].pay_mode === 'string' ? JSON.parse(data[0].pay_mode) : data[0].pay_mode
          const valid = Array.isArray(raw)
            ? raw.filter(
                (m: any) =>
                  m &&
                  typeof m === 'object' &&
                  m.paymode_name &&
                  m.paymode_name.trim() !== '' &&
                  m.paymode_id !== undefined &&
                  m.paymode_id !== null,
              )
            : []
          setAvailablePaymentModes(valid)
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

  useEffect(() => {
    if (formData.Age) {
      fetchPlans(formData.Age)
      setFormData((prev) => ({ ...prev, PlanCode: 0, Term: 0 }))
      setSelectedPlan(null)
      setAvailableTenures([])
      // ✅ reset extracted meta
      onMetaReset?.()
      onMetaChange?.({ lang: lang as 'en' | 'bn' })
    } else {
      setAvailablePlans([])
      setChildEducationVariants([])
    }
  }, [formData.Age])

  useEffect(() => {
    if (formData.PlanCode && formData.Age) {
      setIsLoadingPaymentModes(true)
      fetchTenureOptions(formData.PlanCode, formData.Age)
      setFormData((prev) => ({ ...prev, Term: 0, PaymentMode: 0 }))
      setCurrentPaymentMode('')
    } else {
      setAvailablePaymentModes([])
      setIsLoadingPaymentModes(false)
    }
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
        onApiResponse?.(data[0], currentPaymentMode)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldErrorMessage = (field: keyof typeof fieldErrors): string => {
    if (!(fieldErrors as any)[field]) return ''
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
      case 'agreeTerms':
        return 'Please agree to the terms'
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
      agreeTerms: false,
    } as any)

    const errors = {
      PlanCode: !formData.PlanCode,
      Age: !formData.dateOfBirth || formData.Age < 18 || formData.Age > 65,
      annualIncome: !formData.annualIncome,
      SumAssured: !formData.SumAssured || formData.SumAssured < 100000,
      Term: !formData.Term,
      PaymentMode: !formData.PaymentMode,
      Gender: formData.Gender === undefined || formData.Gender === null,
      agreeTerms: !agreeTerms,
    }

    setFieldErrors(errors as any)
    const hasErrors = Object.values(errors).some(Boolean)
    if (hasErrors) return

    setError(null)
    calculatePremium()
  }

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="border-2 border-[#9C8639] bg-[#FFFFFFCC] rounded-lg xl:rounded-xl 2xl:rounded-2xl
                 grid grid-cols-2 gap-x-6 lg:gap-x-4 xl:gap-x-6 gap-y-7 md:gap-y-7 lg:gap-y-[31px] xl:gap-y-[32px] 2xl:gap-y-[38px]
                 p-4 py-6 md:p-6 lg:p-5 xl:p-8 z-10"
    >
      {/* DOB and Age Fields */}
      <div className="col-span-2 md:col-span-1">
        <div className="flex gap-2">
          {/* DOB Field */}
          <div className="flex-1">
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  aria-haspopup="dialog"
                  variant="outline"
                  onClick={handleOpenDatePicker}
                  className={`w-full justify-start text-left font-normal !text-[12px] md:!text-[14px] 2xl:!text-[16px]
                              placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
                              rounded-sm lg:rounded-[9px] xl:rounded-[10px]
                              shadow-[0px_0px_5px_0px_#00000040] px-3 py-5 xl:px-4 xl:py-6
                              ${fieldErrors.Age ? 'border-red-500 border-2' : ''} ${!formData.dateOfBirth ? 'text-muted-foreground' : ''}`}
                >
                  {formData.dateOfBirth ? (
                    <span>{format(new Date(formData.dateOfBirth), 'dd/MM/yyyy')}</span>
                  ) : (
                    <span>{L('Date of Birth *', 'জন্মতারিখ *')}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4">
                  <DatePicker
                    selected={tempSelectedDate}
                    onChange={setTempSelectedDate}
                    maxDate={new Date()}
                    minDate={new Date(new Date().getFullYear() - 65, 0, 1)}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    placeholderText="Select date of birth"
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
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Calculating...
                        </div>
                      ) : (
                        'Confirm'
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

          {/* Age Field */}
          <div className="flex-1">
            <Button
              variant="outline"
              disabled
              className="w-full justify-start text-left font-normal !text-[12px] md:!text-[14px] 2xl:!text-[16px]
               placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
               rounded-sm lg:rounded-[9px] xl:rounded-[10px]
               shadow-[0px_0px_5px_0px_#00000040] px-3 py-5 xl:px-4 xl:py-6
               bg-background text-foreground cursor-not-allowed opacity-60"
            >
              {formData.Age
                ? `${L('Age', 'বয়স')}: ${formatLocalizedNumber(formData.Age, lang)}`
                : L('Age', 'বয়স')}
            </Button>
          </div>
        </div>
        {getFieldErrorMessage('Age') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Age')}</p>
        )}
      </div>

      {/* PLAN SELECTOR — DROPDOWN MENU */}
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
                if (
                  isPlanDisabled &&
                  ['Enter', ' ', 'Spacebar', 'ArrowDown'].includes((e as any).key)
                ) {
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
                    (p: any) =>
                      p.plan_name !== 'Shanta Child Education Plan' && !(p as any).isGroup,
                  )
                  const pickedRegular = regular.find((p) => p.plan_code === formData.PlanCode)
                  const pickedChild = childEducationVariants.find(
                    (p) => p.plan_code === formData.PlanCode,
                  )
                  const raw = pickedRegular?.plan_name ?? pickedChild?.plan_name ?? ''

                  if (raw) return planLabel(raw, lang as 'en' | 'bn')
                  if (isLoadingPlans) return 'Loading plans...'
                  if (!formData.Age) return L('Enter age to load plans', 'প্ল্যান দেখতে বয়স দিন')
                  if (availablePlans.length === 0 && childEducationVariants.length === 0)
                    return 'No plans available'
                  return L('Select Plan', 'প্ল্যান নির্বাচন করুন')
                })()}
              </span>

              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform ${planMenuOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            sideOffset={6}
            className="z-[1000] min-w-[260px] rounded-md border bg-popover text-popover-foreground shadow-md p-0 overflow-hidden"
          >
            <div className="py-2">
              <DropdownMenuLabel className="px-3 py-2">
                <LocalizedText en="Plans" bn="প্ল্যানসমূহ" />
              </DropdownMenuLabel>

              {/* Regular plans (localized label) */}
              {availablePlans
                .filter(
                  (p: any) => p.plan_name !== 'Shanta Child Education Plan' && !(p as any).isGroup,
                )
                .map((plan) => {
                  const selected = formData.PlanCode === plan.plan_code
                  const label = planLabel(plan.plan_name, lang as 'en' | 'bn')
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

                        // ✅ emit meta
                        onMetaChange?.({
                          lang: lang as 'en' | 'bn',
                          plan: {
                            code: plan.plan_code,
                            name: plan.plan_name,
                            displayName: planLabel(plan.plan_name, lang as 'en' | 'bn'),
                          },
                          term: undefined,
                          payment: undefined,
                        })

                        setAvailableTenures([])
                        setAvailablePaymentModes([])
                        setFieldErrors((prev) => ({ ...prev, PlanCode: false, Term: false }) as any)
                      }}
                      className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${selected ? 'bg-accent text-accent-foreground' : ''}`}
                    >
                      <Check className={`h-4 w-4 ${selected ? 'opacity-100' : 'opacity-0'}`} />
                      <span className="truncate">{label}</span>
                    </DropdownMenuItem>
                  )
                })}

              {/* If no regular plans */}
              {!isLoadingPlans &&
                formData.Age &&
                availablePlans.filter(
                  (p: any) => p.plan_name !== 'Shanta Child Education Plan' && !(p as any).isGroup,
                ).length === 0 && (
                  <DropdownMenuItem disabled className="px-3 py-2">
                    No regular plans available
                  </DropdownMenuItem>
                )}

              {/* Child Education submenu (localized titles + items) */}
              {childEducationVariants.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="px-3 py-2 cursor-pointer flex items-center justify-between">
                      <span>
                        {planLabel('Shanta Child Education Plan (3%)', lang as 'en' | 'bn').replace(
                          /\s*\(৩%\)|\s*\(3%\)/,
                          '',
                        )}
                      </span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="z-[1100] min-w-[280px] rounded-md border bg-popover text-popover-foreground shadow-md p-0 overflow-hidden">
                      {childEducationVariants.map((variant) => {
                        const selected = formData.PlanCode === variant.plan_code
                        const label = planLabel(variant.plan_name, lang as 'en' | 'bn')
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

                              // ✅ emit meta
                              onMetaChange?.({
                                lang: lang as 'en' | 'bn',
                                plan: {
                                  code: variant.plan_code,
                                  name: variant.plan_name,
                                  displayName: planLabel(variant.plan_name, lang as 'en' | 'bn'),
                                },
                                term: undefined,
                                payment: undefined,
                              })

                              setAvailableTenures([])
                              setAvailablePaymentModes([])
                              setFieldErrors(
                                (prev) => ({ ...prev, PlanCode: false, Term: false }) as any,
                              )
                            }}
                            className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${selected ? 'bg-accent text-accent-foreground' : ''}`}
                          >
                            <Check
                              className={`h-4 w-4 ${selected ? 'opacity-100' : 'opacity-0'}`}
                            />
                            <span className="truncate">{label}</span>
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

        {/* tooltip while disabled */}
        {isPlanDisabled && isHoveringPlanSelect && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
            {planDisabledMsg}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
          </div>
        )}

        {/* Watch video link (uses localized title for display only) */}
        {selectedPlan && selectedPlan.videoLink && (
          <Dialog>
            <DialogTrigger asChild>
              <p className="text-[10px] py-1 absolute inset-x-0 text-[#FF6600] underline cursor-pointer">
                Watch {planLabel(selectedPlan.plan_name, lang as 'en' | 'bn')} Video
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

        {/* Plan error */}
        {getFieldErrorMessage('PlanCode') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('PlanCode')}</p>
        )}
        {planError && (
          <p className="text-[10px] py-1 text-red-600 absolute inset-x-0">{planError}</p>
        )}
      </div>

      {/* TERM (Tenure) */}
      <div
        className="col-span-2 md:col-span-1 relative"
        onMouseEnter={() => setIsHoveringTenureSelect(true)}
        onMouseLeave={() => setIsHoveringTenureSelect(false)}
      >
        <Select
          value={formData.Term > 0 ? String(formData.Term) : ''}
          disabled={
            isLoadingTenures || !formData.PlanCode || !formData.Age || availableTenures.length === 0
          }
          onValueChange={(v) => {
            const num = parseInt(v, 10)
            if (!isNaN(num)) {
              handleInputChange('Term', num)

              const picked = availableTenures.find((t) => t.value === num)
              onMetaChange?.({
                term: {
                  value: num,
                  label: picked ? localizeTenure(picked.text, lang as 'en' | 'bn') : '',
                },
              })
            }
          }}
        >
          <SelectTrigger
            aria-label="Select Tenure"
            className={`!text-[12px] md:!text-[14px] 2xl:!text-[16px]
                        placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
                        rounded-sm lg:rounded-[9px] xl:rounded-[10px] shadow-[0px_0px_5px_0px_#00000040] px-5 py-5 xl:px-6 xl:py-6
                        ${
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
                  ? L('Loading tenure options...', 'মেয়াদের তালিকা লোড হচ্ছে...')
                  : availableTenures.length === 0 && formData.PlanCode && formData.Age
                    ? L('No tenure options available', 'কোনো মেয়াদ পাওয়া যায়নি')
                    : L('Select Term', 'মেয়াদ নির্বাচন করুন')
              }
            />
          </SelectTrigger>
          {isHoveringTenureSelect && (!formData.PlanCode || !formData.Age) && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
              <LocalizedText
                en={`Select age and plan first`}
                bn="আগে বয়স এবং পরিকল্পনা নির্বাচন করুন"
              />

              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
            </div>
          )}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                <LocalizedText en="Tenure" bn="মেয়াদ" />
              </SelectLabel>
              {availableTenures.map((tenure) => (
                <SelectItem key={tenure.value} value={String(tenure.value)}>
                  {localizeTenure(tenure.text, lang as 'en' | 'bn')}
                </SelectItem>
              ))}
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
        {getFieldErrorMessage('Term') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Term')}</p>
        )}
      </div>

      {/* GENDER (labels localized; value unchanged) */}
      <div className="col-span-2 md:col-span-1">
        <Select
          value={
            formData.Gender !== undefined && formData.Gender !== null ? String(formData.Gender) : ''
          }
          onValueChange={(v) => {
            const num = parseInt(v, 10)
            if (!isNaN(num)) {
              handleInputChange('Gender', num)

              const name = num === 1 ? 'Male' : 'Female'
              const displayName = L(name, num === 1 ? 'পুরুষ' : 'মহিলা')

              onMetaChange?.({
                gender: { id: num, name, displayName },
              })
            }
          }}
        >
          <SelectTrigger
            aria-label="Select Gender"
            className={`!text-[12px] md:!text-[14px] 2xl:!text-[16px]
                        placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
                        rounded-sm lg:rounded-[9px] xl:rounded-[10px] shadow-[0px_0px_5px_0px_#00000040] px-5 py-5 xl:px-6 xl:py-6
                        ${fieldErrors.Gender ? 'border-red-500 border-2' : ''}`}
          >
            <SelectValue placeholder={L('Select Gender *', 'লিঙ্গ নির্বাচন করুন *')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                <LocalizedText en="Gender" bn="লিঙ্গ" />
              </SelectLabel>
              {genders.map((g) => (
                <SelectItem key={g.value} value={String(g.value)}>
                  {L(g.text, g.text === 'Male' ? 'পুরুষ' : 'মহিলা')}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {getFieldErrorMessage('Gender') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Gender')}</p>
        )}
      </div>

      {/* INCOME */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="annualIncome" className="sr-only">
          Annual Income
        </label>
        <Input
          id="annualIncome"
          min={0}
          type="number"
          placeholder={L('Annual Income *', 'বার্ষিক আয় *')}
          value={formData.annualIncome || ''}
          onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value) || 0)}
          className={`!text-[12px] md:!text-[14px] 2xl:!text-[16px]
                      placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
                      rounded-sm lg:rounded-[9px] xl:rounded-[10px]
                      shadow-[0px_0px_5px_0px_#00000040] px-5 py-5 xl:px-6 xl:py-6
                      ${fieldErrors.annualIncome ? 'border-red-500 border-2' : ''}`}
        />
        {getFieldErrorMessage('annualIncome') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('annualIncome')}</p>
        )}
      </div>

      {/* SUM ASSURED */}
      <div className="relative col-span-2 md:col-span-1">
        <label htmlFor="sumAssured" className="sr-only">
          Sum Assured
        </label>
        <Input
          aria-invalid={fieldErrors.SumAssured || undefined}
          aria-describedby={fieldErrors.SumAssured ? 'sumAssured-error' : undefined}
          id="sumAssured"
          min={100000}
          type="number"
          placeholder={L('Sum Assured *', 'বীমা অঙ্ক *')}
          value={formData.SumAssured || ''}
          onChange={(e) => handleInputChange('SumAssured', parseInt(e.target.value) || 0)}
          className={`!text-[12px] md:!text-[14px] 2xl:!text-[16px]
                      placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
                      rounded-sm lg:rounded-[9px] xl:rounded-[10px]
                      shadow-[0px_0px_5px_0px_#00000040] px-5 py-5 xl:px-6 xl:py-6
                      ${fieldErrors.SumAssured ? 'border-red-500 border-2' : ''}`}
        />
        {getFieldErrorMessage('SumAssured') ? (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('SumAssured')}</p>
        ) : (
          <p className="text-[9px] lg:text-[10px] py-2 absolute inset-x-0">
            <LocalizedText en={`Suggested`} bn={`সাজেস্টেড`} />{' '}
            <span className="text-[#FF6600]">{formatLocalizedNumber(suggestedAmount, lang)}</span>{' '}
            <LocalizedText en={`BDT`} bn={`টাকা`} />
          </p>
        )}
      </div>

      {/* PHONE */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="phoneNumber" className="sr-only">
          Phone Number
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder={L('Phone Number', 'ফোন নম্বর')}
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          className="!text-[12px] md:!text-[14px] 2xl:!text-[16px]
                     placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
                     rounded-sm lg:rounded-[9px] xl:rounded-[10px]
                     shadow-[0px_0px_5px_0px_#00000040] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* PAYMENT MODE (display localized label; keep values the same) */}
      <div
        className="col-span-2 md:col-span-1 relative"
        onMouseEnter={() => setIsHoveringPaymentSelect(true)}
        onMouseLeave={() => setIsHoveringPaymentSelect(false)}
      >
        <Select
          value={formData.PaymentMode > 0 ? String(formData.PaymentMode) : ''}
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

              onMetaChange?.({
                payment: {
                  id: method.paymode_id,
                  name: method.paymode_name,
                  displayName: localizePaymode(method.paymode_name, lang as 'en' | 'bn'),
                },
              })
            }
          }}
        >
          <SelectTrigger
            aria-label="Select Payment Method"
            className={`!text-[12px] md:!text-[14px] 2xl:!text-[16px]
                        placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
                        rounded-sm lg:rounded-[9px] xl:rounded-[10px] shadow-[0px_0px_5px_0px_#00000040] px-5 py-5 xl:px-6 xl:py-6
                        ${
                          isLoadingPaymentModes ||
                          !formData.PlanCode ||
                          !formData.Age ||
                          !formData.Term ||
                          availablePaymentModes.length === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        } ${fieldErrors.PaymentMode ? 'border-red-500 border-2' : ''}`}
          >
            <SelectValue
              placeholder={
                isLoadingPaymentModes
                  ? L('Loading payment methods...', 'পেমেন্ট পদ্ধতি লোড হচ্ছে...')
                  : availablePaymentModes.length === 0 &&
                      formData.PlanCode &&
                      formData.Age &&
                      formData.Term
                    ? L('No payment methods available', 'কোনো পেমেন্ট পদ্ধতি নেই')
                    : L('Select Payment Method', 'পেমেন্ট পদ্ধতি নির্বাচন করুন')
              }
            />
          </SelectTrigger>
          {isHoveringPaymentSelect && (!formData.PlanCode || !formData.Age || !formData.Term) && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-gray-600 bg-opacity-90 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
              <LocalizedText
                en={`Select plan, age & term first`}
                bn={`আপনার প্ল্যান, বয়স এবং মেয়াদ নির্বাচন করুন`}
              />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
            </div>
          )}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                <LocalizedText en="Payment Method" bn="পেমেন্ট পদ্ধতি" />
              </SelectLabel>
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
                    <LocalizedText en="No payment methods available" bn="কোনো পেমেন্ট পদ্ধতি নেই" />
                  </SelectItem>
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {getFieldErrorMessage('PaymentMode') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('PaymentMode')}</p>
        )}
      </div>

      {/* NAME */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder={L('Name', 'নাম')}
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="!text-[12px] md:!text-[14px] 2xl:!text-[16px]
                     placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
                     rounded-sm lg:rounded-[9px] xl:rounded-[10px]
                     shadow-[0px_0px_5px_0px_#00000040] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* EMAIL */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <Input
          id="email"
          type="text"
          placeholder={L('Email', 'ইমেইল')}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="!text-[12px] md:!text-[14px] 2xl:!text-[16px]
                     placeholder:!text-[12px] md:placeholder:!text-[14px] 2xl:placeholder:!text-[16px]
                     rounded-sm lg:rounded-[9px] xl:rounded-[10px]
                     shadow-[0px_0px_5px_0px_#00000040] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* CONSENT CHECKBOX (unchanged text) */}
      <div className="col-span-2 w-full">
        <div className="flex gap-3">
          <Checkbox
            id="agree-terms"
            checked={agreeTerms}
            onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
          />
          <div className="text-xs md:text-sm leading-relaxed ">
            <LocalizedRichText
              en={payloadData?.premiumCalculatorForm?.consentText}
              bn={payloadData?.premiumCalculatorForm?.consentTextBN}
            />
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <div className="col-span-2">
        <GlobalButton
          type="submit"
          variant="secondary"
          disabled={isLoading || !agreeTerms}
          aria-disabled={isLoading || !agreeTerms}
          className={[
            'px-5 py-5 xl:px-6 xl:py-6 w-full md:w-full lg:w-full xl:w-full 2xl:w-full',
            'rounded-sm lg:rounded-[9px] xl:rounded-[10px]',
            !agreeTerms || isLoading ? 'opacity-60 cursor-not-allowed' : '',
          ].join(' ')}
        >
          {' '}
          {/* {isLoading ? 'Calculating...' : 'Get A Quote Now'} */}{' '}
          <LocalizedString
            en={isLoading ? 'Calculating...' : 'Calculate Your Premium'}
            bn={isLoading ? 'হিসাব...' : 'আপনার প্রিমিয়াম ক্যালকুলেট করুন'}
          />{' '}
        </GlobalButton>{' '}
      </div>
    </form>
  )
}

export default QuoteForm
