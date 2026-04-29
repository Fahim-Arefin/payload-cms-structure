'use client'

import { ContactNumberField } from '@/components/custom/sagar-ropes-shared/Form/ContactNumberField'
import {
  CountryOption,
  CountrySelectField,
} from '@/components/custom/sagar-ropes-shared/Form/CountrySelectField'
import { InputField } from '@/components/custom/sagar-ropes-shared/Form/InputField'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type FormData = {
  name: string
  email: string
  companyName: string
  position: string
  country: string
  phone: string
  query: string
  countryDialCode: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

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

type Props = {
  className?: string
}

function QueryForm({ className }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    companyName: '',
    position: '',
    country: '',
    phone: '',
    query: '',
    countryDialCode: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

      case 'phone': {
        const raw = String(value).trim()

        if (!raw) return 'Contact number is required.'
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

      case 'query':
        if (!String(value).trim()) return 'Query is required.'
        if (String(value).trim().length < 40) return 'Query must be at least 40 characters.'
        return undefined

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
    query: validateField('query', formData.query),
  })

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

      const res = await fetch('/api/query-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) {
        // setSubmitMessage(result?.message || 'Submission failed.')
        // toast.error(result?.message || 'Submission failed.', {
        //   duration: 4000,
        // })
        toast.error('Submission failed', {
          description: result?.message || 'Please try again in a moment.',
          duration: 5000,
          icon: <AlertCircle className="h-5 w-5 text-red-400" />,
        })
        return
      }

      //   setSubmitMessage('Thank you! Your review has been submitted.')
      //   toast.success('Thank you! Your review has been submitted.', {
      //     duration: 4000,
      //   })
      toast.success('Query submitted', {
        description: 'Thank you for sharing your query with us.',
        duration: 4000,
        icon: <CheckCircle2 className="h-5 w-5 text-cyan" />,
      })

      setFormData({
        name: '',
        email: '',
        companyName: '',
        position: '',
        country: '',
        phone: '',
        query: '',
        countryDialCode: '',
      })

      setErrors({})
      setHasSubmitted(false)
    } catch (error) {
      console.error(error)
      //   setSubmitMessage('Something went wrong while submitting the form.')
      //   toast.error('Something went wrong while submitting the form.', {
      //     duration: 4000,
      //   })
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
    <form
      onSubmit={handleSubmit}
      className={`grid grid-cols-2 gap-4 md:gap-3 xl:gap-4 2xl:gap-5 
    bg-white border-2 border-cyan 
    px-4 lg:px-5 xl:px-7 2xl:px-8 
    py-4 lg:py-7 xl:py-11 2xl:py-12
        ${className}
    `}
    >
      <div className="col-span-2">
        <InputField
          id="name"
          label="Full Name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleInputChange('name')}
          error={errors.name}
          required
        />
      </div>

      <div className="col-span-2">
        <InputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="We'll use this to reply to your query"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
          required
        />
      </div>

      <div className="col-span-2">
        <InputField
          id="companyName"
          label="Company Name"
          placeholder="The organization you represent (optional)"
          value={formData.companyName}
          onChange={handleInputChange('companyName')}
          error={errors.companyName}
        />
      </div>

      <div className="col-span-2">
        <InputField
          id="position"
          label="Position"
          placeholder="Your role or designation (optional)"
          value={formData.position}
          onChange={handleInputChange('position')}
          error={errors.position}
        />
      </div>
      <div className="col-span-2">
        <InputField
          id="query"
          label="Your Query"
          placeholder="Ask Us Anything"
          value={formData.query}
          onChange={handleInputChange('query')}
          error={errors.query}
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <CountrySelectField
          id="country"
          label="Country"
          value={formData.country}
          onChange={handleCountryChange}
          error={errors.country}
          required
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <ContactNumberField
          id="phone"
          label="Contact No."
          countryDialCode={formData.countryDialCode}
          phoneValue={formData.phone}
          onPhoneChange={handleInputChange('phone')}
          error={errors.phone}
          required
        />
      </div>

      <div className="col-span-2 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="border border-[#686893] px-5 py-2 font-manrope font-bold global-p5 text-dark-1 bg-white/10
  hover:border-cyan hover:bg-cyan hover:text-white-1 transition-all duration-300 ease-in-out
  disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Your Query'}
        </button>
      </div>
    </form>
  )
}

export default QueryForm
