'use client'

import { GlobalContactUs } from '@/payload-types'
import React, { FormEvent, useRef, useState } from 'react'
import FormHeading from './FormHeading'
import Image from 'next/image'
import CrossIcon from 'public/assets/icons/cross.png'
import ButtonArrowAnimated, {
  ButtonArrowAnimatedRef,
} from '@/components/custom/sagar-ropes-shared/buttons/ButtonArrowAnimated'
import { toast } from 'sonner'

type Props = {
  globalContactData: GlobalContactUs
}

type FormState = {
  name: string
  phone: string
  email: string
  selectedSolutions: string[]
  selectedBudget: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

function ContactUsForm({ globalContactData }: Props) {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    selectedSolutions: [],
    selectedBudget: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const solutions = globalContactData?.ourSolutions ?? []
  const budgets = globalContactData?.budgets ?? []

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitArrowRef = useRef<ButtonArrowAnimatedRef | null>(null)

  const toggleSolution = (value: string) => {
    setForm((prev) => {
      const alreadySelected = prev.selectedSolutions.includes(value)

      return {
        ...prev,
        selectedSolutions: alreadySelected
          ? prev.selectedSolutions.filter((item) => item !== value)
          : [...prev.selectedSolutions, value],
      }
    })

    setErrors((prev) => ({
      ...prev,
      selectedSolutions: '',
    }))
  }

  const selectBudget = (value: string) => {
    setForm((prev) => ({
      ...prev,
      selectedBudget: value,
    }))

    setErrors((prev) => ({
      ...prev,
      selectedBudget: '',
    }))
  }

  const removeSolution = (value: string) => {
    setForm((prev) => ({
      ...prev,
      selectedSolutions: prev.selectedSolutions.filter((item) => item !== value),
    }))
  }

  const removeBudget = () => {
    setForm((prev) => ({
      ...prev,
      selectedBudget: '',
    }))
  }

  const validateForm = () => {
    const nextErrors: FormErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required'
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone number is required'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address'
    }

    if (form.selectedSolutions.length === 0) {
      nextErrors.selectedSolutions = 'Please select at least one solution'
    }

    if (!form.selectedBudget) {
      nextErrors.selectedBudget = 'Please select your budget'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return

    try {
      setIsSubmitting(true)

      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await res.json()

      if (!res.ok) {
        toast.error('Submission failed', {
          description: result?.message || 'Please try again.',
        })

        return
      }

      toast.success('Submitted successfully', {
        description: result?.message || 'We will contact you soon.',
      })

      setForm({
        name: '',
        phone: '',
        email: '',
        selectedSolutions: [],
        selectedBudget: '',
      })

      setErrors({})
    } catch (error) {
      console.error(error)

      toast.error('Submission failed', {
        description: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8 lg:space-y-10">
      {/* contact info */}
      <div className="space-y-4 lg:space-y-5">
        <FormHeading text="CONTACT INFO" required />

        <div className="space-y-3 lg:space-y-4">
          {/* name */}
          <div>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="NAME"
              className="
                w-full border-b border-primary-1/50 bg-transparent
                px-3 py-2
                font-grift global-p5 text-secondary-1
                placeholder:text-secondary-1/35
                outline-none
                focus:border-primary-1
              "
            />

            {errors.name && <p className="mt-1 font-grift text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* phone */}
          <div>
            <input
              type="number"
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder="PHONE NUMBER"
              className="
                w-full border-b border-primary-1/50 bg-transparent
                px-3 py-2
                font-grift global-p5 text-secondary-1
                placeholder:text-secondary-1/35
                outline-none
                focus:border-primary-1
              "
            />

            {errors.phone && <p className="mt-1 font-grift text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* email */}
          <div>
            <input
              type="text"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="EMAIL ADDRESS"
              className="
                w-full border-b border-primary-1/50 bg-transparent
                px-3 py-2
                font-grift global-p5 text-secondary-1
                placeholder:text-secondary-1/35
                outline-none
                focus:border-primary-1
              "
            />

            {errors.email && <p className="mt-1 font-grift text-xs text-red-500">{errors.email}</p>}
          </div>
          {/* selected solutions and budget preview */}
          {(form.selectedSolutions.length > 0 || form.selectedBudget) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
              {form.selectedSolutions.map((solution) => (
                <button
                  key={solution}
                  type="button"
                  onClick={() => removeSolution(solution)}
                  className="
          inline-flex h-fit items-center gap-2
          font-grift global-p5 leading-none text-primary-1
        "
                >
                  <span
                    className="
            inline-flex items-center justify-center
            size-[14px] lg:size-[16px] xl:size-[18px]
            rounded-[3px]
            bg-primary-1
            shrink-0
            translate-y-[-1px]
          "
                  >
                    <Image
                      src={CrossIcon}
                      alt=""
                      width={8}
                      height={8}
                      quality={90}
                      placeholder="blur"
                      blurDataURL={CrossIcon.blurDataURL}
                      className="
              block
              w-[7px] lg:w-[8px] xl:w-[9px]
              h-auto
            "
                    />
                  </span>

                  <span className="block leading-none">{solution}</span>
                </button>
              ))}

              {form.selectedBudget && (
                <button
                  type="button"
                  onClick={removeBudget}
                  className="
          inline-flex h-fit items-center gap-2
          font-grift global-p5 leading-none text-primary-1
        "
                >
                  <span
                    className="
            inline-flex items-center justify-center
            size-[14px] lg:size-[16px] xl:size-[18px]
            rounded-[3px]
            bg-primary-1
            shrink-0
            translate-y-[-1px]
          "
                  >
                    <Image
                      src={CrossIcon}
                      alt=""
                      width={8}
                      height={8}
                      quality={90}
                      placeholder="blur"
                      blurDataURL={CrossIcon.blurDataURL}
                      className="
              block
              w-[7px] lg:w-[8px] xl:w-[9px]
              h-auto
            "
                    />
                  </span>

                  <span className="block leading-none">{form.selectedBudget}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* solutions */}
      <div className="space-y-4">
        <FormHeading text="YOU ARE INTERESTED IN" required />

        <div className="flex flex-wrap gap-1.5 lg:gap-2">
          {solutions.map((solution, index) => {
            const text = solution?.text
            if (!text) return null

            const isSelected = form.selectedSolutions.includes(text)

            return (
              <button
                key={solution?.id ?? index}
                type="button"
                onClick={() => toggleSolution(text)}
                className={`
                  font-grift global-p5 border border-primary-1
                  px-3 lg:px-4 xl:px-5
                  py-1.5 lg:py-2
                  rounded-full
                  transition-all duration-200 ease-in
                  ${
                    isSelected
                      ? 'bg-primary-1 text-white-1'
                      : 'bg-transparent text-primary-1 hover:bg-primary-1/20'
                  }
                `}
              >
                {text}
              </button>
            )
          })}
        </div>

        {errors.selectedSolutions && (
          <p className="font-grift text-xs text-red-500">{errors.selectedSolutions}</p>
        )}
      </div>

      {/* budget */}
      <div className="space-y-4">
        <FormHeading text="YOUR BUDGET" required />

        <div className="flex flex-wrap gap-1.5 lg:gap-2">
          {budgets.map((budget, index) => {
            const text = budget?.text
            if (!text) return null

            const isSelected = form.selectedBudget === text

            return (
              <button
                key={budget?.id ?? index}
                type="button"
                onClick={() => selectBudget(text)}
                className={`
                  font-grift global-p5 border border-primary-1
                  px-3 lg:px-4 xl:px-5
                  py-1.5 lg:py-2
                  rounded-full
                  transition-all duration-200 ease-in
                  ${
                    isSelected
                      ? 'bg-primary-1 text-white-1'
                      : 'bg-transparent text-primary-1 hover:bg-primary-1/20'
                  }
                `}
              >
                {text}
              </button>
            )
          })}
        </div>

        {errors.selectedBudget && (
          <p className="font-grift text-xs text-red-500">{errors.selectedBudget}</p>
        )}
      </div>

      {/* submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        onMouseEnter={() => submitArrowRef.current?.enter()}
        onMouseLeave={() => submitArrowRef.current?.leave()}
        className="
    inline-flex items-center justify-center gap-2
    rounded-[8px] bg-primary-1
    px-5 py-3
    font-grift global-p5 font-semibold text-white-1
    hover:bg-primary-1/90
    transition-all duration-200 ease-in
    disabled:cursor-not-allowed disabled:opacity-70
  "
      >
        {isSubmitting ? (
          <>
            <span
              className="
          size-[15px]
          animate-spin
          rounded-full
          border-2 border-white-1/40
          border-t-white-1
        "
            />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>Submit</span>

            <ButtonArrowAnimated
              ref={submitArrowRef}
              className="scale-90"
              tailClassName="bg-white-1"
            />
          </>
        )}
      </button>
    </form>
  )
}

export default ContactUsForm
