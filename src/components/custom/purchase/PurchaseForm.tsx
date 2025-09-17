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

function PurchaseForm({ formData, setFormData, onPlanSelect }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [availablePlans, setAvailablePlans] = useState<{ plan_name: string; plan_code: number }[]>(
    [],
  )
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
  const [currentPaymentMode, setCurrentPaymentMode] = useState<string>('')
  const [isHoveringPlanSelect, setIsHoveringPlanSelect] = useState(false)
  const [submitButtonText, setSubmitButtonText] = useState('Request for purchase')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  // Video link mappings for plans
  const videoLinkMappings = {
    'Shanta Child Education Plan (3%)': 'https://www.youtube.com/embed/Fj_BE9D64W4',
    'Shanta Endowment Plan': 'https://www.youtube.com/embed/CkKkdNkBk9g',
    'Shanta 3 Stage Plan': 'https://www.youtube.com/embed/h11sOPnfnhw',
    'Shanta 4 Stage Plan': 'https://www.youtube.com/embed/h11sOPnfnhw',
  }

  // Fetch plans from API based on age
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
        // Define the plan name mappings
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

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear field error when user starts typing/selecting
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

  // Effect to fetch plans when age changes
  useEffect(() => {
    if (formData.Age) {
      fetchPlans(formData.Age)
      // Reset selected plan when age changes
      setFormData((prev) => ({ ...prev, PlanCode: 0 }))
      setSelectedPlan(null)
    }
  }, [formData.Age])

  // Function to get specific error message for each field
  const getFieldErrorMessage = (field: keyof typeof fieldErrors): string => {
    if (!fieldErrors[field]) return ''

    switch (field) {
      case 'PlanCode':
        return 'Please select a plan'
      case 'Age':
        if (!formData.Age) return 'Please enter your age'
        if (formData.Age < 18 || formData.Age > 65) return 'Age must be between 18 and 65'
        return ''
      case 'Gender':
        return 'Please select your gender'
      case 'name':
        return 'Please enter your name'
      case 'phoneNumber':
        return 'Please enter your phone number'
      default:
        return ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset previous field errors
    setFieldErrors({
      PlanCode: false,
      Age: false,
      Gender: false,
      name: false,
      phoneNumber: false,
    })

    // Validate each required field and mark errors
    const errors = {
      PlanCode: !formData.PlanCode,
      Age: !formData.Age || formData.Age < 18 || formData.Age > 65,
      Gender: formData.Gender === undefined || formData.Gender === null,
      name: !formData.name || formData.name.trim() === '',
      phoneNumber: !formData.phoneNumber || formData.phoneNumber.trim() === '',
    }

    // Set field errors
    setFieldErrors(errors)

    // Check if any errors exist
    const hasErrors = Object.values(errors).some((error) => error)

    if (hasErrors) {
      return
    }

    // Handle form submission - send email
    setIsSubmitting(true)
    setSubmitButtonText('Submitting...')

    try {
      // Get plan name from selected plan
      const planName =
        availablePlans.find((p) => p.plan_code === formData.PlanCode)?.plan_name || 'N/A'
      const genderText = genders.find((g) => g.value === formData.Gender)?.text || 'N/A'

      const response = await fetch('/api/emails/purchase-request', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
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
        setSubmitButtonText('Request Submitted!')
        setShowSuccessAlert(true)

        // Reset form after successful submission
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
          setSubmitButtonText('Request for purchase')
          setIsSubmitting(false)
        }, 2000)
      } else {
        throw new Error('Failed to submit request')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitButtonText('Submission Failed')
      setTimeout(() => {
        setSubmitButtonText('Submit Purchase Request')
        setIsSubmitting(false)
      }, 2000)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="rounded-2xl bg-[#9C863940]
  grid grid-cols-2 gap-x-4 gap-y-8 md:gap-5 xl:gap-6 
  xl:px-4 xl:py-8 py-8 px-4 z-10"
    >
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
        {/* Age error message */}
        {getFieldErrorMessage('Age') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('Age')}</p>
        )}
      </div>

      {/* plans */}
      <div
        className="relative col-span-2 md:col-span-1"
        onMouseEnter={() => setIsHoveringPlanSelect(true)}
        onMouseLeave={() => setIsHoveringPlanSelect(false)}
      >
        <Select
          value={
            formData.PlanCode && formData.PlanCode > 0
              ? availablePlans.find((p) => p.plan_code === formData.PlanCode)?.plan_name || ''
              : ''
          }
          disabled={isLoadingPlans || !formData.Age || availablePlans.length === 0}
          onValueChange={(v) => {
            const plan = availablePlans.find((p) => p.plan_name === v)
            // Add video link to the selected plan
            const planWithVideo = plan
              ? {
                  ...plan,
                  videoLink: videoLinkMappings[plan.plan_name as keyof typeof videoLinkMappings],
                }
              : null
            setSelectedPlan(planWithVideo)
            if (plan) {
              // Set plan code when plan changes
              setFormData((prev) => ({
                ...prev,
                PlanCode: plan.plan_code,
              }))

              // Clear field errors for plan
              setFieldErrors((prev) => ({
                ...prev,
                PlanCode: false,
              }))

              // Notify parent about plan selection
              if (onPlanSelect) {
                onPlanSelect(plan.plan_code, plan.plan_name)
              }
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
              {availablePlans.length === 0 && !isLoadingPlans && formData.Age && (
                <SelectItem disabled value="no-options">
                  No plans available for this age
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* below a text saying watch video */}
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
        {/* Plan selection error message */}
        {getFieldErrorMessage('PlanCode') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('PlanCode')}</p>
        )}
      </div>

      {/* name input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder="Name *"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.name ? 'border-red-500 border-2' : ''
          }`}
        />
        {/* Name error message */}
        {getFieldErrorMessage('name') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('name')}</p>
        )}
      </div>

      {/* phone number input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="tel"
          placeholder="Phone Number *"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          className={`bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 ${
            fieldErrors.phoneNumber ? 'border-red-500 border-2' : ''
          }`}
        />
        {/* Phone number error message */}
        {getFieldErrorMessage('phoneNumber') && (
          <p className="text-red-500 text-xs mt-1">{getFieldErrorMessage('phoneNumber')}</p>
        )}
      </div>

      {/* email input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
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

      {/* city input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* occupation input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={(e) => handleInputChange('occupation', e.target.value)}
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

      {/* submit button */}
      <div className="col-span-2 items-center px-4 flex flex-col gap-6 lg:gap-6 justify-center">
        <Button
          disabled={isSubmitting || !agreeTerms}
          aria-disabled={isSubmitting || !agreeTerms}
          className={[
            'bg-[#978900] disabled:bg-gray-400 w-fit text-[11px] md:global-h4 text-white rounded-[4px] md:rounded-[10px] px-6 py-4 xl:px-8 xl:py-8 flex items-center gap-2',
            !agreeTerms || isSubmitting ? 'opacity-60 cursor-not-allowed' : '',
          ].join(' ')}
        >
          {submitButtonText === 'Submitting...' ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : submitButtonText === 'Request Submitted!' ? (
            <MailCheck className="w-4 h-4" />
          ) : null}
          {submitButtonText}
        </Button>
        <p className="text-[12px] md:text-[14px] text-[#00000099] mt-4 md:mt-1 md:w-[90%] font-light md:capitalize">
          Our expert advisors are ready to help you choose the best plan based on your age, income,
          and future goals. Whether you're just starting your career or planning for retirement, we
          are with you at every step.
        </p>
      </div>

      {/* Success Alert Modal */}
      {showSuccessAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 md:p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                Request Submitted Successfully!
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Your purchase request is submitted successfully, our representative will contact you
                soon.
              </p>
            </div>
            <Button
              onClick={() => setShowSuccessAlert(false)}
              className="bg-[#978900] hover:bg-[#7a6e00] text-white px-6 py-2 rounded-md"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}

export default PurchaseForm
