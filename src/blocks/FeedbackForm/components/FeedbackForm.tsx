'use client'

import React, { useState } from 'react'
import { InputField } from '@/components/custom/sagar-ropes-shared/Form/InputField'
import { TextareaField } from '@/components/custom/sagar-ropes-shared/Form/TextareaField'
import {
  CountryOption,
  CountrySelectField,
} from '@/components/custom/sagar-ropes-shared/Form/CountrySelectField'
import { ContactNumberField } from '@/components/custom/sagar-ropes-shared/Form/ContactNumberField'
import { RatingField } from '@/components/custom/sagar-ropes-shared/Form/RatingField'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
import { toast } from 'sonner'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import FormSuccessDialog from '@/components/custom/sagar-ropes-shared/Form/FormSuccessDialog'

const REVIEW_MAX_LENGTH = 500

type FormData = {
  name: string
  email: string
  companyName: string
  position: string
  country: string
  phone: string
  rating: number
  review: string
  countryDialCode: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

type RecipientEmails = {
  email1?: string | null
  email2?: string | null
  email3?: string | null
  email4?: string | null
  email5?: string | null
}

type Props = {
  formId: string
  recipientEmails?: RecipientEmails
}

export function validatePhoneNumber(phone: string, countryCode: string) {
  const raw = phone.trim()

  if (!raw) {
    return 'Contact number is required.'
  }

  const phoneNumber = parsePhoneNumberFromString(raw, countryCode as any)

  if (!phoneNumber) {
    return 'Please enter a valid contact number.'
  }

  // Length / structure check
  if (!phoneNumber.isPossible()) {
    return 'Phone number length is not valid for the selected country.'
  }

  // Full country-specific validation
  if (!phoneNumber.isValid()) {
    return 'Please enter a valid contact number.'
  }

  return undefined
}

const getRecipientList = (recipientEmails?: RecipientEmails) =>
  [
    recipientEmails?.email1,
    recipientEmails?.email2,
    recipientEmails?.email3,
    recipientEmails?.email4,
    recipientEmails?.email5,
  ]
    .map((email) => String(email || '').trim())
    .filter(Boolean)

function FeedbackForm({ formId, recipientEmails }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    companyName: '',
    position: '',
    country: '',
    phone: '',
    rating: 0,
    review: '',
    countryDialCode: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = React.useState(false)
  //   const [submitMessage, setSubmitMessage] = useState('')

  const validateField = (field: keyof FormData, value: string | number) => {
    switch (field) {
      case 'name':
        if (!String(value).trim()) return 'Name is required.'
        return undefined

      case 'email':
        if (!String(value).trim()) return 'Email is required.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())) {
          return 'Please enter a valid email address.'
        }
        return undefined

      case 'companyName':
        return undefined

      case 'position':
        return undefined

      case 'country':
        if (!String(value).trim()) return 'Country is required.'
        return undefined

      // case 'phone': {
      //   const raw = String(value).trim()

      //   if (!raw) return 'Contact number is required.'
      //   if (!formData.country) return 'Please select a country first.'

      //   const phoneNumber = parsePhoneNumberFromString(raw, formData.country as CountryCode)

      //   if (!phoneNumber) {
      //     return 'Please enter a valid contact number.'
      //   }

      //   if (!phoneNumber.isPossible()) {
      //     return 'Phone number length is not valid for the selected country.'
      //   }

      //   if (!phoneNumber.isValid()) {
      //     return 'Please enter a valid contact number.'
      //   }

      //   return undefined
      // }
      case 'phone': {
        const raw = String(value).trim()

        if (!raw) return 'Contact number is required.'
        if (!/^\d+$/.test(raw)) return 'Contact number can contain numbers only.'
        if (!formData.country) return 'Please select a country first.'

        const phoneNumber = parsePhoneNumberFromString(raw, formData.country as CountryCode)

        if (!phoneNumber) {
          return 'Please enter a valid contact number.'
        }

        if (!phoneNumber.isPossible()) {
          return 'Phone number length is not valid for the selected country.'
        }

        if (!phoneNumber.isValid()) {
          return 'Please enter a valid contact number.'
        }

        return undefined
      }

      case 'rating':
        if (Number(value) < 1) return 'Rating is required.'
        return undefined

      // case 'review':
      //   if (!String(value).trim()) return 'Review is required.'
      //   if (String(value).trim().length < 40) return 'Review must be at least 40 characters.'
      //   return undefined

      case 'review': {
        const raw = String(value).trim()

        if (!raw) return 'Review is required.'
        if (raw.length > REVIEW_MAX_LENGTH) {
          return `Review must be ${REVIEW_MAX_LENGTH} characters or less.`
        }

        return undefined
      }
      default:
        return undefined
    }
  }

  const validateForm = (): FormErrors => ({
    name: validateField('name', formData.name),
    email: validateField('email', formData.email),
    companyName: validateField('companyName', formData.companyName),
    position: validateField('position', formData.position),
    country: validateField('country', formData.country),
    phone: validateField('phone', formData.phone),
    rating: validateField('rating', formData.rating),
    review: validateField('review', formData.review),
  })

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }))

    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        phone: validateField('phone', value),
      }))
    }
  }

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))

      if (hasSubmitted) {
        setErrors((prev) => ({
          ...prev,
          [field]: validateField(field, value),
        }))
      }
    }

  const handleCountryChange = (countryCode: string, country?: CountryOption) => {
    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      countryDialCode: country?.dialCode || '',
    }))

    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        country: validateField('country', countryCode),
      }))
    }
  }

  const handleRatingChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }))

    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        rating: validateField('rating', value),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHasSubmitted(true)

    const newErrors = validateForm()
    setErrors(newErrors)

    const hasAnyError = Object.values(newErrors).some(Boolean)
    if (hasAnyError) return

    // console.log('Submitted data:', formData)
    try {
      setIsSubmitting(true)

      const res = await fetch('/api/review-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(formData),
        body: JSON.stringify({
          ...formData,
          recipients: getRecipientList(recipientEmails),
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        toast.error('Submission failed', {
          description: result?.message || 'Please try again in a moment.',
          duration: 5000,
          icon: <AlertCircle className="h-5 w-5 text-red-400" />,
        })
        return
      }

      // toast.success('Review submitted', {
      //   description: 'Thank you for sharing your experience with us.',
      //   duration: 4000,
      //   icon: <CheckCircle2 className="h-5 w-5 text-cyan" />,
      // })
      setSuccessDialogOpen(true)

      setFormData({
        name: '',
        email: '',
        companyName: '',
        position: '',
        country: '',
        phone: '',
        rating: 0,
        review: '',
        countryDialCode: '',
      })

      setErrors({})
      setHasSubmitted(false)
    } catch (error) {
      console.error(error)

      toast.error('Something went wrong', {
        description: 'Your review could not be submitted right now.',
        duration: 5000,
        icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4 md:gap-3 xl:gap-4 2xl:gap-5">
      <div className="col-span-12 md:col-span-6">
        <InputField
          id={`${formId}-name`}
          name="name"
          label="Buyers Full Name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleInputChange('name')}
          error={errors.name}
          required
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <InputField
          id={`${formId}-email`}
          name="email"
          label="Email Address"
          type="email"
          placeholder="We'll use this to reply to your query"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
          required
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <InputField
          id={`${formId}-companyName`}
          name="companyName"
          // id="companyName"
          label="Company Name"
          placeholder="The organization you represent (optional)"
          value={formData.companyName}
          onChange={handleInputChange('companyName')}
          error={errors.companyName}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <InputField
          // id="position"
          id={`${formId}-position`}
          name="position"
          label="Position"
          placeholder="Your role or designation (optional)"
          value={formData.position}
          onChange={handleInputChange('position')}
          error={errors.position}
        />
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-3">
        <CountrySelectField
          // id="country"
          id={`${formId}-contactNo`}
          name="contactNo"
          label="Country"
          value={formData.country}
          onChange={handleCountryChange}
          error={errors.country}
          required
        />
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-3">
        <ContactNumberField
          id={`${formId}-phone`}
          name="phone"
          label="Contact No."
          countryDialCode={formData.countryDialCode}
          phoneValue={formData.phone}
          onPhoneChange={handlePhoneChange}
          error={errors.phone}
          required
        />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <RatingField
          // id="rating"
          id={`${formId}-rating`}
          label="Rate Our Performance"
          value={formData.rating}
          onChange={handleRatingChange}
          error={errors.rating}
          required
        />
      </div>

      <div className="col-span-12">
        <TextareaField
          // id="review"
          id={`${formId}-message`}
          name="message"
          label="Your Review"
          placeholder="Please share the experience we've been waiting for."
          value={formData.review}
          onChange={handleInputChange('review')}
          error={errors.review}
          required
          rows={4}
          maxLength={REVIEW_MAX_LENGTH}
        />
      </div>

      <div className="col-span-12 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="border border-[#686893] px-5 py-2 font-manrope font-bold global-p5 text-dark-1 bg-white/10
  hover:border-cyan hover:bg-cyan hover:text-white-1 transition-all duration-300 ease-in-out
  disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Your Testimony'}
        </button>
      </div>
      <FormSuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        heading="Thank You for Your Insight"
        description="Your testimony has been successfully submitted. Your experience helps us continue our legacy of strength and precision."
        ctaLabel="Back to the Legacy"
      />
    </form>
  )
}

export default FeedbackForm
