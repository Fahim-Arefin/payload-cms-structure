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
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Loader, MailCheck, CheckCircle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import LocalizedText from '../shared/LocalizedText'

type FormData = {
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

type Props = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  onPlanSelect?: (planCode: number, planName: string) => void
}

/** Canonical EN plan keys -> both labels (EN/BN). */
const PLAN_LABELS: Record<
  string,
  { en: string; bn: string }
> = {
  'Shanta Endowment Plan': {
    en: 'Shanta Endowment Plan',
    bn: 'শান্তা এনডাওমেন্ট প্ল্যান',
  },
  'Shanta 3 Stage Plan': {
    en: 'Shanta 3 Stage Plan',
    bn: 'শান্তা থ্রি পেমেন্ট প্ল্যান',
  },
  'Shanta 4 Stage Plan': {
    en: 'Shanta 4 Stage Plan',
    bn: 'শান্তা ফোর পেমেন্ট প্ল্যান',
  },
  'Shanta Child Education Plan (3%)': {
    en: 'Shanta Child Education Plan (3%)',
    bn: 'শান্তা চাইল্ড এডুকেশন প্ল্যান (৩%)',
  },
}

/** API → Canonical EN mapping (normalize external names). */
const API_NAME_TO_CANONICAL: Record<string, keyof typeof PLAN_LABELS> = {
  'Shanta Endowment': 'Shanta Endowment Plan',
  'Shanta Three Payment Plan': 'Shanta 3 Stage Plan',
  'Shanta Four Payment Plan': 'Shanta 4 Stage Plan',
  'Shanta Child Education Plan (3%)': 'Shanta Child Education Plan (3%)',
}

/** Canonical EN -> video URL */
const VIDEO_LINKS: Record<keyof typeof PLAN_LABELS, string> = {
  'Shanta Child Education Plan (3%)': 'https://www.youtube.com/embed/Fj_BE9D64W4',
  'Shanta Endowment Plan': 'https://www.youtube.com/embed/CkKkdNkBk9g',
  'Shanta 3 Stage Plan': 'https://www.youtube.com/embed/h11sOPnfnhw',
  'Shanta 4 Stage Plan': 'https://www.youtube.com/embed/h11sOPnfnhw',
}

type AvailablePlan = {
  plan_code: number
  /** Canonical EN key used for logic (stable) */
  key: keyof typeof PLAN_LABELS
  /** Display labels */
  labelEn: string
  labelBn: string
  videoLink?: string
}

function PurchaseForm({ formData, setFormData, onPlanSelect }: Props) {
  const lang = useSSRLanguage()
  const L = (en: string, bn?: string) => (lang === 'en' ? en : bn ?? en)

  const [selectedPlan, setSelectedPlan] = useState<AvailablePlan | null>(null)
  const [availablePlans, setAvailablePlans] = useState<AvailablePlan[]>([])
  const [isLoadingPlans, setIsLoadingPlans] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [planError, setPlanError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    PlanCode: boolean
    Age: boolean
    Gender: boolean
    name: boolean
    phoneNumber: boolean
  }>({
    PlanCode: false,
    Age: false,
    Gender: false,
    name: false,
    phoneNumber: false,
  })

  // submit state machine
  type SubmitState = 'idle' | 'submitting' | 'success' | 'failed'
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const submitLabel = (() => {
    switch (submitState) {
      case 'submitting':
        return L('Submitting...', 'জমা হচ্ছে...')
      case 'success':
        return L('Request Submitted!', 'রিকুয়েস্ট জমা হয়েছে!')
      case 'failed':
        return L('Submission Failed', 'জমা দিতে ব্যর্থ')
      default:
        return L('Request for purchase', 'পলিসি কিনতে রিকুয়েস্ট করুন')
    }
  })()

  // gender options (stable values, localized labels)
  const genders = [
    { labelEn: 'Male', labelBn: 'পুরুষ', value: 1 },
    { labelEn: 'Female', labelBn: 'মহিলা', value: 0 },
  ]

  /** Fetch plans by age and normalize to canonical keys + labels */
  const fetchPlans = async (age: number) => {
    if (!age || age < 18 || age > 65) {
      setAvailablePlans([])
      return
    }

    setIsLoadingPlans(true)
    setPlanError(null)

    try {
      const res = await fetch(`/api/plan/0/${age}`)
      if (!res.ok) throw new Error('Failed to fetch plans')
      const data = await res.json()

      if (Array.isArray(data)) {
        const normalized: AvailablePlan[] = data
          .filter((p: any) => API_NAME_TO_CANONICAL[p.plan_name])
          .map((p: any) => {
            const key = API_NAME_TO_CANONICAL[p.plan_name] as keyof typeof PLAN_LABELS
            return {
              plan_code: p.plan_code,
              key,
              labelEn: PLAN_LABELS[key].en,
              labelBn: PLAN_LABELS[key].bn,
              videoLink: VIDEO_LINKS[key],
            }
          })

        setAvailablePlans(normalized)
      } else {
        setAvailablePlans([])
      }
    } catch (err) {
      setPlanError(err instanceof Error ? err.message : 'Failed to fetch plans')
      setAvailablePlans([])
    } finally {
      setIsLoadingPlans(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field in fieldErrors && (fieldErrors as any)[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: false }))
    }
  }

  useEffect(() => {
    if (formData.Age) {
      fetchPlans(formData.Age)
      setFormData((prev) => ({ ...prev, PlanCode: 0 }))
      setSelectedPlan(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.Age])

  const getFieldErrorMessage = (field: keyof typeof fieldErrors): string => {
    if (!(fieldErrors as any)[field]) return ''
    switch (field) {
      case 'PlanCode':
        return L('Please select a plan', 'অনুগ্রহ করে একটি প্ল্যান নির্বাচন করুন')
      case 'Age':
        if (!formData.Age) return L('Please enter your age', 'অনুগ্রহ করে আপনার বয়স লিখুন')
        if (formData.Age < 18 || formData.Age > 65)
          return L('Age must be between 18 and 65', 'বয়স ১৮ থেকে ৬৫ বছরের মধ্যে হতে হবে')
        return ''
      case 'Gender':
        return L('Please select your gender', 'অনুগ্রহ করে আপনার লিঙ্গ নির্বাচন করুন')
      case 'name':
        return L('Please enter your name', 'অনুগ্রহ করে আপনার নাম লিখুন')
      case 'phoneNumber':
        return L('Please enter your phone number', 'অনুগ্রহ করে আপনার ফোন নম্বর লিখুন')
      default:
        return ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setFieldErrors({
      PlanCode: false,
      Age: false,
      Gender: false,
      name: false,
      phoneNumber: false,
    })

    const errors = {
      PlanCode: !formData.PlanCode,
      Age: !formData.Age || formData.Age < 18 || formData.Age > 65,
      Gender: formData.Gender === undefined || formData.Gender === null,
      name: !formData.name || formData.name.trim() === '',
      phoneNumber: !formData.phoneNumber || formData.phoneNumber.trim() === '',
    }

    setFieldErrors(errors)
    if (Object.values(errors).some(Boolean)) return

    setIsSubmitting(true)
    setSubmitState('submitting')

    try {
      const plan = availablePlans.find((p) => p.plan_code === formData.PlanCode)
      const planNameCanonical = plan?.key ?? 'N/A'
      const planNameLocalized = plan ? (lang === 'en' ? plan.labelEn : plan.labelBn) : 'N/A'
      const genderText =
        genders.find((g) => g.value === formData.Gender)?.[lang === 'en' ? 'labelEn' : 'labelBn'] ||
        'N/A'

      const response = await fetch('/api/emails/purchase-request', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: planNameCanonical, // keep canonical for backend/reporting
          planNameLocalized,          // optional: send localized for convenience
          age: formData.Age,
          gender: genderText,
          name: formData.name || 'N/A',
          phoneNumber: formData.phoneNumber || 'N/A',
          email: formData.email || 'N/A',
          city: formData.city || 'N/A',
          occupation: formData.occupation || 'N/A',
        }),
      })

      if (response.ok) {
        setSubmitState('success')
        setShowSuccessAlert(true)
        setTimeout(() => {
          setFormData({
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
          setSelectedPlan(null)
          setSubmitState('idle')
          setIsSubmitting(false)
        }, 2000)
      } else {
        throw new Error('Failed to submit request')
      }
    } catch {
      setSubmitState('failed')
      setTimeout(() => {
        setSubmitState('idle')
        setIsSubmitting(false)
      }, 2000)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-[#9C863940]
      grid grid-cols-2 gap-x-4 gap-y-8 md:gap-5 xl:gap-6 
      xl:px-4 xl:py-8 py-8 px-4 z-10"
    >
      {/* Age */}
      <div className="col-span-2 md:col-span-1">
        <Input
          min={18}
          max={65}
          type="number"
          placeholder={L('Age *', 'বয়স *')}
          value={formData.Age || ''}
          onChange={(e) => handleInputChange('Age', parseInt(e.target.value) || 0)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.Age ? 'border-red-500 border-2' : ''
          }`}
        />
        {getFieldErrorMessage('Age') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Age')}</p>
        )}
      </div>

      {/* Plans (value = plan_code; labels localized) */}
      <div className="relative col-span-2 md:col-span-1">
        <Select
          value={formData.PlanCode ? String(formData.PlanCode) : ''}
          disabled={isLoadingPlans || !formData.Age || availablePlans.length === 0}
          onValueChange={(value) => {
            const code = parseInt(value, 10)
            const plan = availablePlans.find((p) => p.plan_code === code) || null
            setSelectedPlan(plan ?? null)
            setFormData((prev) => ({ ...prev, PlanCode: code }))
            setFieldErrors((prev) => ({ ...prev, PlanCode: false }))

            // IMPORTANT: pass canonical EN key to parent so your
            // getPlanDetailsCode() mapping in PurchaseSection keeps working.
            if (plan) onPlanSelect?.(plan.plan_code, plan.key)
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
                  ? L('Loading plans...', 'প্ল্যান লোড হচ্ছে...')
                  : availablePlans.length === 0 && formData.Age
                    ? L('No plans available', 'কোন প্ল্যান পাওয়া যায়নি')
                    : L('Select Plan', 'প্ল্যান নির্বাচন করুন')
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                <LocalizedText en="Plans" bn="প্ল্যানসমূহ" />
              </SelectLabel>
              {availablePlans.map((plan) => (
                <SelectItem key={plan.plan_code} value={String(plan.plan_code)}>
                  {lang === 'en' ? plan.labelEn : plan.labelBn}
                </SelectItem>
              ))}
              {availablePlans.length === 0 && !isLoadingPlans && formData.Age && (
                <SelectItem disabled value="no-options">
                  {L('No plans available for this age', 'এই বয়সের জন্য কোনো প্ল্যান নেই')}
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {selectedPlan?.videoLink && (
          <Dialog>
            <DialogTrigger asChild>
              <p className="text-[10px] py-1 absolute inset-x-0 text-[#FF6600] underline cursor-pointer">
                <LocalizedText
                  en={`Watch ${selectedPlan.labelEn} Video`}
                  bn={`${selectedPlan.labelBn} ভিডিও দেখুন`}
                />
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

      {/* Name */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder={L('Name *', 'নাম *')}
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.name ? 'border-red-500 border-2' : ''
          }`}
        />
        {getFieldErrorMessage('name') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('name')}</p>
        )}
      </div>

      {/* Phone */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="tel"
          placeholder={L('Phone Number *', 'ফোন নম্বর *')}
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.phoneNumber ? 'border-red-500 border-2' : ''
          }`}
        />
        {getFieldErrorMessage('phoneNumber') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('phoneNumber')}</p>
        )}
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

      {/* Gender */}
      <div className="col-span-2 md:col-span-1">
        <Select
          value={
            formData.Gender !== null && formData.Gender !== undefined ? String(formData.Gender) : ''
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
              <SelectLabel>
                <LocalizedText en="Gender" bn="লিঙ্গ" />
              </SelectLabel>
              {genders.map((g) => (
                <SelectItem key={g.value} value={String(g.value)}>
                  {L(g.labelEn, g.labelBn)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {getFieldErrorMessage('Gender') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Gender')}</p>
        )}
      </div>

      {/* City */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder={L('City', 'শহর')}
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* Occupation */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder={L('Occupation', 'পেশা')}
          value={formData.occupation}
          onChange={(e) => handleInputChange('occupation', e.target.value)}
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
          <span className="text-xs md:text-sm leading-relaxed">
            <LocalizedText en="By clicking " bn="এখানে ক্লিক করার মাধ্যমে, " />
            <span className="font-semibold">
              <LocalizedText en="Request for purchase" bn="আপনি আমাদের " />
            </span>
            <LocalizedText en=", you agree to our " bn="" />
            <Link
              href="/terms-condition"
              className="underline text-[#FF6600] hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocalizedText en="terms and conditions" bn="টার্মস এন্ড কন্ডিশনস " />
            </Link>{' '}
            <LocalizedText en="and " bn=", ও " />
            <Link
              href="/privacy-policy"
              className="underline text-[#FF6600] hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocalizedText en="privacy policy" bn="প্রাইভেসি পলিসিতে " />
            </Link>
            <LocalizedText en="." bn="সম্মত করছেন।" />
          </span>
        </label>
      </div>

      {/* Submit */}
      <div className="col-span-2 items-center px-4 flex flex-col gap-6 lg:gap-6 justify-center">
        <Button
          disabled={isSubmitting || !agreeTerms}
          aria-disabled={isSubmitting || !agreeTerms}
          className={[
            'bg-[#978900] disabled:bg-gray-400 w-fit text-[11px] md:global-h4 text-white rounded-[4px] md:rounded-[10px] px-6 py-4 xl:px-8 xl:py-8 flex items-center gap-2',
            !agreeTerms || isSubmitting ? 'opacity-60 cursor-not-allowed' : '',
          ].join(' ')}
        >
          {submitState === 'submitting' ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : submitState === 'success' ? (
            <MailCheck className="w-4 h-4" />
          ) : null}
          {submitLabel}
        </Button>

        <p className="text-[12px] md:text-[14px] text-[#00000099] mt-4 md:mt-1 md:w-[90%] font-light md:capitalize">
          {L(
            "Our expert advisors are ready to help you choose the best plan based on your age, income, and future goals. Whether you're just starting your career or planning for retirement, we are with you at every step.",
            'আপনার বয়স, আয় এবং ভবিষ্যৎ লক্ষ্য অনুযায়ী সেরা প্ল্যান বেছে নিতে আমাদের বিশেষজ্ঞ পরামর্শদাতারা প্রস্তুত। আপনি ক্যারিয়ারের শুরুতেই থাকুন বা অবসরের পরিকল্পনা করুন-আমরা আছি আপনার প্রতিটি পদক্ষেপে।',
          )}
        </p>
      </div>

      {/* Success Modal */}
      {showSuccessAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 md:p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {L('Request Submitted Successfully!', 'রিকুয়েস্ট সফলভাবে জমা হয়েছে!')}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {L(
                  'Your purchase request is submitted successfully, our representative will contact you soon.',
                  'আপনার ক্রয় সংক্রান্ত রিকুয়েস্ট সফলভাবে জমা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।',
                )}
              </p>
            </div>
            <Button
              onClick={() => setShowSuccessAlert(false)}
              className="bg-[#978900] hover:bg-[#7a6e00] text-white px-6 py-2 rounded-md"
            >
              {L('Close', 'বন্ধ করুন')}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}

export default PurchaseForm
