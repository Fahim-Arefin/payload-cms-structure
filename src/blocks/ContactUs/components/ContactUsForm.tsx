'use client'

import ButtonArrowAnimated, {
  ButtonArrowAnimatedRef,
} from '@/components/custom/sagar-ropes-shared/buttons/ButtonArrowAnimated'
import { GlobalContactUs } from '@/payload-types'
import Image from 'next/image'
import CrossIcon from 'public/assets/icons/cross.png'
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import FormHeading from './FormHeading'

type Props = {
  globalContactData: GlobalContactUs
}

type FormState = {
  name: string
  phone: string
  email: string
  selectedSolutions: string[]
  selectedCurrencyCode: string
  selectedCurrencySign: string
  budgetMin: string
  budgetMax: string
}

type FormErrors = Partial<
  Record<
    'name' | 'phone' | 'email' | 'selectedSolutions' | 'selectedCurrencyCode' | 'budget',
    string
  >
>

const formatNumber = (value: number) => {
  if (!Number.isFinite(value)) return '0'
  return new Intl.NumberFormat('en-US').format(value)
}

const toNumber = (value: string | number | null | undefined) => {
  if (value === '' || value === null || value === undefined) return null

  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : null
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value))
}

function ContactUsForm({ globalContactData }: Props) {
  const solutions = globalContactData?.ourSolutions ?? []
  const currencies = globalContactData?.currencies ?? []

  const budgetMinBoundary = toNumber(globalContactData?.budgetRange?.minValue) ?? 0
  const budgetMaxBoundary = toNumber(globalContactData?.budgetRange?.maxValue) ?? 1000000

  const initialCurrency = currencies?.[0]

  const getInitialForm = (): FormState => {
    const defaultMin = clamp(
      toNumber(globalContactData?.budgetRange?.defaultMinValue) ?? budgetMinBoundary,
      budgetMinBoundary,
      budgetMaxBoundary,
    )

    const defaultMax = clamp(
      toNumber(globalContactData?.budgetRange?.defaultMaxValue) ?? budgetMaxBoundary,
      defaultMin,
      budgetMaxBoundary,
    )

    return {
      name: '',
      phone: '',
      email: '',
      selectedSolutions: [],
      selectedCurrencyCode: initialCurrency?.currencyCode || '',
      selectedCurrencySign: initialCurrency?.currencySign || '',
      budgetMin: String(defaultMin),
      budgetMax: String(defaultMax),
    }
  }

  const [form, setForm] = useState<FormState>(() => getInitialForm())
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSelectedBudget, setShowSelectedBudget] = useState(true)
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false)

  const submitArrowRef = useRef<ButtonArrowAnimatedRef | null>(null)
  const currencyDropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!currencyDropdownRef.current) return

      if (!currencyDropdownRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedCurrency = useMemo(() => {
    return currencies.find((currency) => currency?.currencyCode === form.selectedCurrencyCode)
  }, [currencies, form.selectedCurrencyCode])

  const typedBudgetMin = toNumber(form.budgetMin)
  const typedBudgetMax = toNumber(form.budgetMax)

  const budgetMin = clamp(typedBudgetMin ?? budgetMinBoundary, budgetMinBoundary, budgetMaxBoundary)
  const budgetMax = clamp(typedBudgetMax ?? budgetMaxBoundary, budgetMin, budgetMaxBoundary)

  const budgetMinPercent =
    budgetMaxBoundary === budgetMinBoundary
      ? 0
      : ((budgetMin - budgetMinBoundary) / (budgetMaxBoundary - budgetMinBoundary)) * 100

  const budgetMaxPercent =
    budgetMaxBoundary === budgetMinBoundary
      ? 100
      : ((budgetMax - budgetMinBoundary) / (budgetMaxBoundary - budgetMinBoundary)) * 100

  const selectedBudgetLabel =
    showSelectedBudget &&
    form.selectedCurrencyCode &&
    form.budgetMin !== '' &&
    form.budgetMax !== ''
      ? `${formatNumber(budgetMin)} - ${formatNumber(budgetMax)} ${form.selectedCurrencyCode}`
      : ''

  const updateField = (field: 'name' | 'phone' | 'email', value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }))
  }

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

  const removeSolution = (value: string) => {
    setForm((prev) => ({
      ...prev,
      selectedSolutions: prev.selectedSolutions.filter((item) => item !== value),
    }))
  }

  const removeBudget = () => {
    setShowSelectedBudget(false)

    setErrors((prev) => ({
      ...prev,
      budget: '',
      selectedCurrencyCode: '',
    }))
  }

  const markBudgetSelected = () => {
    setShowSelectedBudget(true)

    setErrors((prev) => ({
      ...prev,
      budget: '',
      selectedCurrencyCode: '',
    }))
  }

  const handleCurrencyChange = (value: string) => {
    const currency = currencies.find((item) => item?.currencyCode === value)

    setForm((prev) => ({
      ...prev,
      selectedCurrencyCode: currency?.currencyCode || '',
      selectedCurrencySign: currency?.currencySign || '',
    }))

    markBudgetSelected()
    setCurrencyDropdownOpen(false)
  }

  const handleBudgetMinInputChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      budgetMin: value,
    }))

    markBudgetSelected()
  }

  const handleBudgetMaxInputChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      budgetMax: value,
    }))

    markBudgetSelected()
  }

  const normalizeBudgetMin = () => {
    const nextMin = clamp(typedBudgetMin ?? budgetMinBoundary, budgetMinBoundary, budgetMaxBoundary)
    const nextMax = budgetMax < nextMin ? nextMin : budgetMax

    setForm((prev) => ({
      ...prev,
      budgetMin: String(nextMin),
      budgetMax: String(nextMax),
    }))
  }

  const normalizeBudgetMax = () => {
    const nextMax = clamp(typedBudgetMax ?? budgetMaxBoundary, budgetMin, budgetMaxBoundary)

    setForm((prev) => ({
      ...prev,
      budgetMax: String(nextMax),
    }))
  }

  const handleBudgetInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: 'min' | 'max',
  ) => {
    if (event.key !== 'Enter') return

    event.preventDefault()
    event.stopPropagation()

    if (field === 'min') {
      normalizeBudgetMin()
    }

    if (field === 'max') {
      normalizeBudgetMax()
    }

    event.currentTarget.blur()
  }

  const handleBudgetMinRangeChange = (value: string) => {
    const nextMin = clamp(Number(value), budgetMinBoundary, budgetMax)

    setForm((prev) => ({
      ...prev,
      budgetMin: String(nextMin),
    }))

    markBudgetSelected()
  }

  const handleBudgetMaxRangeChange = (value: string) => {
    const nextMax = clamp(Number(value), budgetMin, budgetMaxBoundary)

    setForm((prev) => ({
      ...prev,
      budgetMax: String(nextMax),
    }))

    markBudgetSelected()
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

    if (!form.selectedCurrencyCode) {
      nextErrors.selectedCurrencyCode = 'Please select a currency'
    }

    if (!showSelectedBudget || form.budgetMin === '' || form.budgetMax === '') {
      nextErrors.budget = 'Please enter your budget range'
    } else if (
      !Number.isFinite(budgetMin) ||
      !Number.isFinite(budgetMax) ||
      budgetMin > budgetMax
    ) {
      nextErrors.budget = 'Please enter a valid budget range'
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
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          selectedSolutions: form.selectedSolutions,
          selectedCurrencyCode: form.selectedCurrencyCode,
          selectedCurrencySign: form.selectedCurrencySign,
          budgetMin,
          budgetMax,
        }),
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

      setForm(getInitialForm())
      setShowSelectedBudget(true)
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

          {(form.selectedSolutions.length > 0 || selectedBudgetLabel) && (
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
                      className="block w-[7px] h-auto lg:w-[8px] xl:w-[9px]"
                    />
                  </span>

                  <span className="block leading-none">{solution}</span>
                </button>
              ))}

              {selectedBudgetLabel && (
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
                      className="block w-[7px] h-auto lg:w-[8px] xl:w-[9px]"
                    />
                  </span>

                  <span className="block leading-none">{selectedBudgetLabel}</span>
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

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 lg:items-end xl:gap-10">
          {/* left 50% */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 xl:gap-8">
            {/* currency */}
            <div className="col-span-12 lg:col-span-4">
              <label className="font-grift global-p5 text-secondary-1 ">Choose A Currency</label>

              <div
                ref={currencyDropdownRef}
                className="
    relative mt-1
    border-b border-primary-1/50
    px-3 py-2
    focus-within:border-primary-1
  "
              >
                <button
                  type="button"
                  onClick={() => setCurrencyDropdownOpen((prev) => !prev)}
                  className="
      flex w-full items-center
      bg-transparent
      font-grift global-p5 text-secondary-1
      outline-none
    "
                >
                  <span className="flex w-[44px] items-center justify-start text-primary-1/70">
                    {selectedCurrency?.currencySign || form.selectedCurrencySign}
                  </span>

                  <span className="flex-1 text-left">{form.selectedCurrencyCode}</span>

                  <span
                    className={`
        text-primary-1 transition-transform duration-200
        ${currencyDropdownOpen ? 'rotate-180' : ''}
      `}
                  >
                    ▾
                  </span>
                </button>

                {currencyDropdownOpen && (
                  <div
                    className="
        absolute left-0 right-0 top-full z-50 mt-2
        overflow-hidden rounded-[8px]
        border border-primary-1/25
        bg-white-1
        shadow-[0_14px_34px_rgba(10,17,40,0.12)]
      "
                  >
                    {currencies.map((currency, index) => {
                      if (!currency?.currencyCode) return null

                      const isActive = currency.currencyCode === form.selectedCurrencyCode

                      return (
                        <button
                          key={currency?.id ?? index}
                          type="button"
                          onClick={() => handleCurrencyChange(currency.currencyCode)}
                          className={`
              flex w-full items-center gap-3
              px-4 py-2.5
              font-grift global-p5
              transition-all duration-200
              ${
                isActive
                  ? 'bg-primary-1 text-white-1'
                  : 'bg-white-1 text-secondary-1 hover:bg-primary-1/10 hover:text-primary-1'
              }
            `}
                        >
                          <span className="w-5 text-center">{currency.currencySign}</span>
                          <span>{currency.currencyCode}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {errors.selectedCurrencyCode && (
                <p className="mt-1 font-grift text-xs text-red-500">
                  {errors.selectedCurrencyCode}
                </p>
              )}
            </div>

            {/* manual inputs */}
            <div className="col-span-12 lg:col-span-8">
              <label className="font-grift global-p5 text-secondary-1 ">Budget Range</label>

              <div
                // className="
                //   mt-3 flex h-[38px] items-center gap-2
                //   border-b border-primary-1
                //   font-grift global-p5 text-secondary-1
                // "
                className="
                 mt-1 flex items-center gap-2
    border-b border-primary-1/50
    px-3 py-2
    font-grift global-p5 text-secondary-1
    focus-within:border-primary-1
                "
              >
                <input
                  type="number"
                  value={form.budgetMin}
                  min={budgetMinBoundary}
                  max={budgetMaxBoundary}
                  onChange={(event) => handleBudgetMinInputChange(event.target.value)}
                  onBlur={normalizeBudgetMin}
                  onKeyDown={(event) => handleBudgetInputKeyDown(event, 'min')}
                  className="
                    contact-budget-number-input
                    w-[30%] bg-transparent
                    font-grift global-p5 text-secondary-1
                    outline-none
                     placeholder:text-secondary-1/35
                  "
                />

                <span>-</span>

                <input
                  type="number"
                  value={form.budgetMax}
                  min={budgetMinBoundary}
                  max={budgetMaxBoundary}
                  onChange={(event) => handleBudgetMaxInputChange(event.target.value)}
                  onBlur={normalizeBudgetMax}
                  onKeyDown={(event) => handleBudgetInputKeyDown(event, 'max')}
                  className="
                    contact-budget-number-input
                    w-[30%] bg-transparent
                    font-grift global-p5 text-secondary-1
                    outline-none
                     placeholder:text-secondary-1/35
                  "
                />

                <span>{form.selectedCurrencyCode}</span>
              </div>

              {errors.budget && (
                <p className="mt-1 font-grift text-xs text-red-500">{errors.budget}</p>
              )}
            </div>
          </div>

          {/* right 50% range selector */}
          <div className="relative pt-8 w-[70%] mx-auto md:w-full">
            <div className="relative h-[48px]">
              <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-primary-2/35" />

              <div
                className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-primary-1"
                style={{
                  left: `${budgetMinPercent}%`,
                  right: `${100 - budgetMaxPercent}%`,
                }}
              />

              <input
                type="range"
                min={budgetMinBoundary}
                max={budgetMaxBoundary}
                value={budgetMin}
                onChange={(event) => handleBudgetMinRangeChange(event.target.value)}
                className="contact-budget-range-input contact-budget-range-input-min"
              />

              <input
                type="range"
                min={budgetMinBoundary}
                max={budgetMaxBoundary}
                value={budgetMax}
                onChange={(event) => handleBudgetMaxRangeChange(event.target.value)}
                className="contact-budget-range-input contact-budget-range-input-max"
              />

              {/* <div
                className="
                  pointer-events-none absolute top-[-22px]
                  -translate-x-1/2 rounded-full bg-primary-2/70
                  px-3 py-1 font-grift text-[10px] text-primary-1
                "
                style={{
                  left: `${budgetMinPercent}%`,
                }}
              >
                {formatNumber(budgetMin)} {form.selectedCurrencyCode}
              </div>

              <div
                className="
                  pointer-events-none absolute top-[-22px]
                  -translate-x-1/2 rounded-full bg-primary-2/70
                  px-3 py-1 font-grift text-[10px] text-primary-1
                "
                style={{
                  left: `${budgetMaxPercent}%`,
                }}
              >
                {formatNumber(budgetMax)} {form.selectedCurrencyCode}
              </div> */}

              <div
                className="
    pointer-events-none absolute top-[-22px]
    -translate-x-1/2 rounded-full bg-primary-2/70
    px-3 py-1 font-grift text-[10px] text-primary-1
    whitespace-nowrap min-w-max leading-none
  "
                style={{
                  left: `${budgetMinPercent}%`,
                }}
              >
                {formatNumber(budgetMin)}
                {'\u00A0'}
                {form.selectedCurrencyCode}
              </div>

              <div
                className="
    pointer-events-none absolute top-[-22px]
    -translate-x-1/2 rounded-full bg-primary-2/70
    px-3 py-1 font-grift text-[10px] text-primary-1
    whitespace-nowrap min-w-max leading-none
  "
                style={{
                  left: `${budgetMaxPercent}%`,
                }}
              >
                {formatNumber(budgetMax)}
                {'\u00A0'}
                {form.selectedCurrencyCode}
              </div>
              <div className="absolute left-0 top-[38px] font-grift text-[10px] text-secondary-1/50">
                {formatNumber(budgetMinBoundary)} {form.selectedCurrencyCode}
              </div>

              <div className="absolute left-1/2 top-[38px] -translate-x-1/2 font-grift text-[10px] text-secondary-1/50">
                {formatNumber(Math.round((budgetMinBoundary + budgetMaxBoundary) / 2))}{' '}
                {form.selectedCurrencyCode}
              </div>

              <div className="absolute right-0 top-[38px] font-grift text-[10px] text-secondary-1/50">
                {formatNumber(budgetMaxBoundary)} {form.selectedCurrencyCode}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* submit */}
      <div className="mx-auto flex justify-center lg:justify-start items-center">
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
      </div>
    </form>
  )
}

export default ContactUsForm
