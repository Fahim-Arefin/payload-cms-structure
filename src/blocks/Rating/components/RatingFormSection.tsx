// 'use client'

// import { Button } from '@/components/ui/button'
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from '@/components/ui/command'
// import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import countriesJson from '@/data/country.json'
// import { cn } from '@/lib/utils'
// import { RatingBlockType } from '@/types/payloadCustomTypes'
// import { Check, ChevronsUpDown, Star } from 'lucide-react'
// import Image from 'next/image'
// import React, { useMemo, useState } from 'react'
// import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
// import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
// import FormSuccessDialog from './FormSuccessDialog'

// type Props = { block: RatingBlockType }

// const REVIEW_MAX_LENGTH = 500

// type FormData = {
//   buyersFullName: string
//   linkedIn: string
//   companyName: string
//   position: string
//   country: string
//   phone: string
//   rating: number
//   review: string
//   countryDialCode: string
// }

// type FormErrors = Partial<Record<keyof FormData, string>>

// type CountryOption = {
//   name: string
//   code: string
//   flag: string
//   dialCode: string
//   flagSvg: string
// }

// type CountryJsonItem = {
//   countryName: string
//   countryCode: string
//   callingCode: string
//   flag: string
// }

// const countries: CountryOption[] = (countriesJson as CountryJsonItem[])
//   .map((country) => ({
//     name: country.countryName || '',
//     code: country.countryCode || '',
//     flag: '',
//     dialCode: country.callingCode || '',
//     flagSvg: country.flag || '',
//   }))
//   .filter((country) => country.name && country.code)
//   .sort((a, b) => a.name.localeCompare(b.name))

// const labelClassName = 'text-secondary-2 global-p4 lg:global-p5 font-bold font-grift'

// function UnderlineInputField({
//   id,
//   name,
//   label,
//   placeholder,
//   value,
//   onChange,
//   error,
//   required = false,
//   type = 'text',
// }: {
//   id: string
//   name: string
//   label: string
//   placeholder?: string
//   value: string
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//   error?: string
//   required?: boolean
//   type?: React.HTMLInputTypeAttribute
// }) {
//   const isInvalid = Boolean(error)

//   return (
//     <Field
//       {...(isInvalid ? { 'data-invalid': true } : {})}
//       className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
//     >
//       <FieldLabel htmlFor={id} className={labelClassName}>
//         {label}
//         {required ? ' *' : ''}
//       </FieldLabel>

//       <input
//         id={id}
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         aria-invalid={isInvalid || undefined}
//         className="
//           w-full rounded-none border-0 border-b border-primary-1/45
//           bg-transparent px-[14px] pb-[14px] pt-[8px]
//           font-grift global-p4 lg:global-p5
//           text-secondary-1 outline-none
//           transition-colors duration-300

//           placeholder:font-grift
//           placeholder:capitalize
//           placeholder:text-secondary-1/18

//           focus:border-primary-1
//           focus:ring-0
//           focus-visible:outline-none
//           focus-visible:ring-0

//           h-[28px]
//           md:h-[32px]
//           xl:h-[56px]
//           2xl:h-[60px]
//         "
//       />

//       {error && (
//         <FieldDescription className="font-grift text-[10px] md:text-[12px]  text-red-500">
//           {error}
//         </FieldDescription>
//       )}
//     </Field>
//   )
// }

// function UnderlineTextareaField({
//   id,
//   name,
//   label,
//   placeholder,
//   value,
//   onChange,
//   error,
//   required = false,
//   maxLength,
// }: {
//   id: string
//   name: string
//   label: string
//   placeholder?: string
//   value: string
//   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
//   error?: string
//   required?: boolean
//   maxLength?: number
// }) {
//   const isInvalid = Boolean(error)

//   return (
//     <Field
//       {...(isInvalid ? { 'data-invalid': true } : {})}
//       className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
//     >
//       <FieldLabel htmlFor={id} className={labelClassName}>
//         {label}
//         {required ? ' *' : ''}
//       </FieldLabel>

//       <textarea
//         id={id}
//         name={name}
//         rows={2}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         maxLength={maxLength}
//         aria-invalid={isInvalid || undefined}
//         className="
//           min-h-[72px] w-full resize-none rounded-none border-0 border-b border-primary-1/45
//           bg-transparent px-[14px] pb-[14px] pt-[8px]
//           font-grift global-p4 lg:global-p5 leading-[1.45]
//           text-secondary-1 outline-none
//           transition-colors duration-300

//           placeholder:font-grift
//           placeholder:capitalize
//           placeholder:text-secondary-1/18

//           focus:border-primary-1
//           focus:ring-0
//           focus-visible:outline-none
//           focus-visible:ring-0

//           md:min-h-[78px]
//           xl:min-h-[84px]
//         "
//       />

//       {(error || maxLength) && (
//         <FieldDescription className="font-grift text-[10px] md:text-[12px]">
//           {error ? (
//             <span className="text-red-500">{error}</span>
//           ) : maxLength ? (
//             <span className="text-secondary-1/45">
//               {value.length}/{maxLength}
//             </span>
//           ) : null}
//         </FieldDescription>
//       )}
//     </Field>
//   )
// }

// function CountrySelectField({
//   id,
//   name,
//   label,
//   value,
//   onChange,
//   error,
// }: {
//   id: string
//   name: string
//   label: string
//   value: string
//   onChange: (countryCode: string, country?: CountryOption) => void
//   error?: string
// }) {
//   const [open, setOpen] = useState(false)
//   const isInvalid = Boolean(error)

//   const selectedCountry = useMemo(
//     () => countries.find((country) => country.code === value),
//     [value],
//   )

//   return (
//     <Field
//       {...(isInvalid ? { 'data-invalid': true } : {})}
//       className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
//     >
//       <FieldLabel htmlFor={id} className={labelClassName}>
//         {label}
//       </FieldLabel>

//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             id={id}
//             name={name}
//             type="button"
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             aria-invalid={isInvalid || undefined}
//             className={cn(
//               `
//                 w-full justify-between rounded-none border-0 border-b border-primary-1/75
//                 bg-transparent px-[10px] pb-[14px] pt-[8px] text-left
//                 font-grift global-p4 md:global-p5 text-secondary-1
//                 shadow-none transition-colors duration-300

//                 hover:bg-transparent
//                 focus:border-primary-1
//                 focus:outline-none focus:ring-0
//                 focus-visible:outline-none focus-visible:ring-0

//                 h-[28px]
//                 md:h-[32px]
//                 xl:h-[56px]
//                 2xl:h-[60px]
//               `,
//               !selectedCountry && 'text-secondary-1/45',
//             )}
//           >
//             <span className="flex min-w-0 items-center gap-[12px] truncate">
//               {selectedCountry ? (
//                 <>
//                   <span className="relative h-[18px] w-[28px] shrink-0 overflow-hidden rounded-[2px]">
//                     {selectedCountry.flagSvg ? (
//                       <Image
//                         src={selectedCountry.flagSvg}
//                         alt={`${selectedCountry.name} flag`}
//                         fill
//                         sizes="28px"
//                         className="object-cover"
//                       />
//                     ) : (
//                       <span className="text-base leading-none">{selectedCountry.flag}</span>
//                     )}
//                   </span>

//                   <span className="truncate">{selectedCountry.name}</span>
//                 </>
//               ) : (
//                 <span>Select country</span>
//               )}
//             </span>

//             <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-70" />
//           </Button>
//         </PopoverTrigger>

//         {/* <PopoverContent className="relative z-[10001] w-[var(--radix-popover-trigger-width)] rounded-none p-0">
//           <Command>
//             <CommandInput placeholder="Search country..." className="font-grift" />
//             <CommandList>
//               <CommandEmpty>No country found.</CommandEmpty>

//               <CommandGroup>
//                 {countries.map((country) => (
//                   <CommandItem
//                     key={country.code}
//                     value={`${country.name} ${country.code} ${country.dialCode}`}
//                     onSelect={() => {
//                       onChange(country.code, country)
//                       setOpen(false)
//                     }}
//                     className="font-grift"
//                   >
//                     <span className="relative mr-2 h-4 w-6 shrink-0 overflow-hidden rounded-sm border border-gray-200">
//                       {country.flagSvg ? (
//                         <Image
//                           src={country.flagSvg}
//                           alt={`${country.name} flag`}
//                           fill
//                           sizes="24px"
//                           className="object-cover"
//                         />
//                       ) : (
//                         <span className="text-base leading-none">{country.flag}</span>
//                       )}
//                     </span>

//                     <span className="flex-1 truncate">{country.name}</span>

//                     {country.dialCode ? (
//                       <span className="mr-2 text-secondary-1/50">{country.dialCode}</span>
//                     ) : null}

//                     <Check
//                       className={cn(
//                         'ml-auto size-4',
//                         value === country.code ? 'opacity-100' : 'opacity-0',
//                       )}
//                     />
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent> */}
//         <PopoverContent
//           data-lenis-prevent
//           data-lenis-prevent-wheel
//           data-lenis-prevent-touch
//           className="relative z-[10001] w-[var(--radix-popover-trigger-width)] rounded-none p-0"
//           onWheelCapture={(event) => event.stopPropagation()}
//           onTouchMoveCapture={(event) => event.stopPropagation()}
//         >
//           <Command>
//             <CommandInput placeholder="Search country..." className="font-grift" />

//             <CommandList
//               data-lenis-prevent
//               data-lenis-prevent-wheel
//               data-lenis-prevent-touch
//               className="max-h-[260px] overflow-y-auto overscroll-contain"
//               onWheelCapture={(event) => event.stopPropagation()}
//               onTouchMoveCapture={(event) => event.stopPropagation()}
//             >
//               <CommandEmpty>No country found.</CommandEmpty>

//               <CommandGroup>
//                 {countries.map((country) => (
//                   <CommandItem
//                     key={country.code}
//                     value={`${country.name} ${country.code} ${country.dialCode}`}
//                     onSelect={() => {
//                       onChange(country.code, country)
//                       setOpen(false)
//                     }}
//                     className="font-grift"
//                   >
//                     <span className="relative mr-2 h-4 w-6 shrink-0 overflow-hidden rounded-sm border border-gray-200">
//                       {country.flagSvg ? (
//                         <Image
//                           src={country.flagSvg}
//                           alt={`${country.name} flag`}
//                           fill
//                           sizes="24px"
//                           className="object-cover"
//                         />
//                       ) : (
//                         <span className="text-base leading-none">{country.flag}</span>
//                       )}
//                     </span>

//                     <span className="flex-1 truncate">{country.name}</span>

//                     {country.dialCode ? (
//                       <span className="mr-2 text-secondary-1/50">{country.dialCode}</span>
//                     ) : null}

//                     <Check
//                       className={cn(
//                         'ml-auto size-4',
//                         value === country.code ? 'opacity-100' : 'opacity-0',
//                       )}
//                     />
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>

//       {error && (
//         <FieldDescription className="font-grift text-[10px] md:text-[12px] text-red-500">
//           {error}
//         </FieldDescription>
//       )}
//     </Field>
//   )
// }

// function ContactNumberField({
//   id,
//   name,
//   label,
//   countryDialCode,
//   phoneValue,
//   onPhoneChange,
//   error,
// }: {
//   id: string
//   name: string
//   label: string
//   countryDialCode: string
//   phoneValue: string
//   onPhoneChange: (value: string) => void
//   error?: string
// }) {
//   const isInvalid = Boolean(error)

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const onlyDigits = e.target.value.replace(/\D/g, '')
//     onPhoneChange(onlyDigits)
//   }

//   return (
//     <Field
//       {...(isInvalid ? { 'data-invalid': true } : {})}
//       className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
//     >
//       <FieldLabel htmlFor={id} className={labelClassName}>
//         {label}
//       </FieldLabel>

//       <div className="grid grid-cols-12 gap-[12px]">
//         <input
//           value={countryDialCode || ''}
//           readOnly
//           placeholder="+880"
//           className="
//             col-span-4 rounded-none border-0 border-b border-primary-1/75
//             bg-transparent px-[10px] pb-[14px] pt-[8px]
//             font-grift global-p4 md:global-p5 text-secondary-1 outline-none
//             placeholder:text-secondary-1/35

//             h-[28px]
//             md:h-[32px]
//             xl:h-[56px]
//             2xl:h-[60px]
//           "
//         />

//         <input
//           id={id}
//           name={name}
//           type="tel"
//           inputMode="numeric"
//           pattern="[0-9]*"
//           placeholder="0123456789124"
//           value={phoneValue}
//           onChange={handlePhoneChange}
//           aria-invalid={isInvalid || undefined}
//           className="
//             col-span-8 rounded-none border-0 border-b border-primary-1/45
//             bg-transparent px-[10px] pb-[14px] pt-[8px]
//             font-grift  global-p4 md:global-p5 text-secondary-1 outline-none
//             transition-colors duration-300

//             placeholder:font-grift
//             placeholder:text-secondary-1/18

//             focus:border-primary-1
//             focus:ring-0
//             focus-visible:outline-none
//             focus-visible:ring-0

//             h-[28px]
//             md:h-[32px]
//             xl:h-[56px]
//             2xl:h-[60px]
//           "
//         />
//       </div>

//       {error && (
//         <FieldDescription className="font-grift text-[10px]  md:text-[12px] text-red-500">
//           {error}
//         </FieldDescription>
//       )}
//     </Field>
//   )
// }

// function RatingField({
//   id,
//   label,
//   value,
//   onChange,
//   error,
//   required = false,
//   max = 5,
// }: {
//   id: string
//   label: string
//   value: number
//   onChange: (value: number) => void
//   error?: string
//   required?: boolean
//   max?: number
// }) {
//   const isInvalid = Boolean(error)

//   return (
//     <Field
//       {...(isInvalid ? { 'data-invalid': true } : {})}
//       className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
//     >
//       <FieldLabel htmlFor={id} className={labelClassName}>
//         {label}
//         {required ? ' *' : ''}
//       </FieldLabel>

//       <div id={id} className="flex items-center gap-[10px] md:gap-[12px]">
//         {Array.from({ length: max }).map((_, index) => {
//           const ratingValue = index + 1
//           const active = ratingValue <= value

//           return (
//             <button
//               key={ratingValue}
//               type="button"
//               onClick={() => onChange(ratingValue)}
//               className="transition duration-200 hover:scale-110"
//               aria-label={`Rate ${ratingValue} out of ${max}`}
//             >
//               <Star
//                 className={`
//                   h-[30px] w-[30px]
//                   md:h-[34px] md:w-[34px]
//                   xl:h-[38px] xl:w-[38px]
//                   2xl:h-[42px] 2xl:w-[42px]
//                   ${
//                     active ? 'fill-primary-1 text-primary-1' : 'fill-primary-1/18 text-primary-1/18'
//                   }
//                 `}
//               />
//             </button>
//           )
//         })}
//       </div>

//       {error && (
//         <FieldDescription className="font-grift text-[10px] md:text-[12px] text-red-500">
//           {error}
//         </FieldDescription>
//       )}
//     </Field>
//   )
// }

// function RatingFormSection({ block }: Props) {
//   const [formData, setFormData] = useState<FormData>({
//     buyersFullName: '',
//     linkedIn: '',
//     companyName: '',
//     position: '',
//     country: '',
//     phone: '',
//     rating: 0,
//     review: '',
//     countryDialCode: '',
//   })

//   const [errors, setErrors] = useState<FormErrors>({})
//   const [hasSubmitted, setHasSubmitted] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [successDialogOpen, setSuccessDialogOpen] = useState(false)

//   if (block?.ratingSettings?.showRatingForm === false) return null

//   const validateField = (field: keyof FormData, value: string | number) => {
//     switch (field) {
//       case 'buyersFullName':
//         if (!String(value).trim()) return 'Buyer full name is required.'
//         return undefined

//       case 'linkedIn':
//         return undefined

//       case 'companyName':
//         if (!String(value).trim()) return 'Company name is required.'
//         return undefined

//       case 'position':
//         if (!String(value).trim()) return 'Position is required.'
//         return undefined

//       case 'country':
//         if (!String(value).trim()) return 'Country is required.'
//         return undefined

//       case 'phone': {
//         const raw = String(value).trim()

//         if (!raw) return 'Contact number is required.'
//         if (!/^\d+$/.test(raw)) return 'Contact number can contain numbers only.'
//         if (!formData.country) return 'Please select a country first.'

//         const phoneNumber = parsePhoneNumberFromString(raw, formData.country as CountryCode)

//         if (!phoneNumber) return 'Please enter a valid contact number.'
//         if (!phoneNumber.isPossible()) {
//           return 'Phone number length is not valid for the selected country.'
//         }
//         if (!phoneNumber.isValid()) return 'Please enter a valid contact number.'

//         return undefined
//       }

//       case 'rating':
//         if (Number(value) < 1) return 'Rating is required.'
//         return undefined

//       case 'review': {
//         const raw = String(value).trim()

//         if (!raw) return 'Review is required.'
//         if (raw.length > REVIEW_MAX_LENGTH) {
//           return `Review must be ${REVIEW_MAX_LENGTH} characters or less.`
//         }

//         return undefined
//       }

//       default:
//         return undefined
//     }
//   }

//   const validateForm = (): FormErrors => ({
//     buyersFullName: validateField('buyersFullName', formData.buyersFullName),
//     linkedIn: validateField('linkedIn', formData.linkedIn),
//     companyName: validateField('companyName', formData.companyName),
//     position: validateField('position', formData.position),
//     country: validateField('country', formData.country),
//     phone: validateField('phone', formData.phone),
//     rating: validateField('rating', formData.rating),
//     review: validateField('review', formData.review),
//   })

//   const handleInputChange =
//     (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       const value = e.target.value

//       setFormData((prev) => ({
//         ...prev,
//         [field]: value,
//       }))

//       if (hasSubmitted) {
//         setErrors((prev) => ({
//           ...prev,
//           [field]: validateField(field, value),
//         }))
//       }
//     }

//   const handleCountryChange = (countryCode: string, country?: CountryOption) => {
//     setFormData((prev) => ({
//       ...prev,
//       country: countryCode,
//       countryDialCode: country?.dialCode || '',
//     }))

//     if (hasSubmitted) {
//       setErrors((prev) => ({
//         ...prev,
//         country: validateField('country', countryCode),
//       }))
//     }
//   }

//   const handlePhoneChange = (value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       phone: value,
//     }))

//     if (hasSubmitted) {
//       setErrors((prev) => ({
//         ...prev,
//         phone: validateField('phone', value),
//       }))
//     }
//   }

//   const handleRatingChange = (value: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       rating: value,
//     }))

//     if (hasSubmitted) {
//       setErrors((prev) => ({
//         ...prev,
//         rating: validateField('rating', value),
//       }))
//     }
//   }

//   //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   //     e.preventDefault()
//   //     setHasSubmitted(true)

//   //     const newErrors = validateForm()
//   //     setErrors(newErrors)

//   //     const hasAnyError = Object.values(newErrors).some(Boolean)
//   //     if (hasAnyError) return

//   //     setIsSubmitting(true)

//   //     window.setTimeout(() => {
//   //       setSuccessDialogOpen(true)

//   //       setFormData({
//   //         buyersFullName: '',
//   //         linkedIn: '',
//   //         companyName: '',
//   //         position: '',
//   //         country: '',
//   //         phone: '',
//   //         rating: 0,
//   //         review: '',
//   //         countryDialCode: '',
//   //       })

//   //       setErrors({})
//   //       setHasSubmitted(false)
//   //       setIsSubmitting(false)
//   //     }, 450)
//   //   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setHasSubmitted(true)

//     const newErrors = validateForm()
//     setErrors(newErrors)

//     const hasAnyError = Object.values(newErrors).some(Boolean)
//     if (hasAnyError) return

//     try {
//       setIsSubmitting(true)

//       const res = await fetch('/api/review-form', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })

//       const result = await res.json()

//       if (!res.ok) {
//         setErrors((prev) => ({
//           ...prev,
//           review: result?.message || 'Review submission failed. Please try again.',
//         }))

//         return
//       }

//       setSuccessDialogOpen(true)

//       setFormData({
//         buyersFullName: '',
//         linkedIn: '',
//         companyName: '',
//         position: '',
//         country: '',
//         phone: '',
//         rating: 0,
//         review: '',
//         countryDialCode: '',
//       })

//       setErrors({})
//       setHasSubmitted(false)
//     } catch (error) {
//       console.error(error)

//       setErrors((prev) => ({
//         ...prev,
//         review: 'Something went wrong. Please try again.',
//       }))
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="
//         mx-auto grid w-full  grid-cols-12
//         max-w-[1120px] xl:max-w-[1180px] 2xl:max-w-[1240px]
//          gap-x-0 md:gap-x-[20px] lg:gap-x-[70px] xl:gap-x-[80px]
//         gap-y-[14px] md:gap-y-[30px] xl:gap-y-[46px] 2xl:gap-y-[52px]
//       "
//     >
//       <div className="col-span-12 md:col-span-6">
//         <UnderlineInputField
//           id="rating-buyers-full-name"
//           name="buyersFullName"
//           label="Buyers Full Name"
//           placeholder="Your Full Name"
//           value={formData.buyersFullName}
//           onChange={handleInputChange('buyersFullName')}
//           error={errors.buyersFullName}
//           required
//         />
//       </div>

//       <div className="col-span-12 md:col-span-6">
//         <UnderlineInputField
//           id="rating-linked-in"
//           name="linkedIn"
//           label="Linked In"
//           placeholder="We'll Use This To Reply To Your Query"
//           value={formData.linkedIn}
//           onChange={handleInputChange('linkedIn')}
//           error={errors.linkedIn}
//         />
//       </div>

//       <div className="col-span-12 md:col-span-6">
//         <UnderlineInputField
//           id="rating-company-name"
//           name="companyName"
//           label="Company Name"
//           placeholder="The Organization You Represent (Optional)"
//           value={formData.companyName}
//           onChange={handleInputChange('companyName')}
//           error={errors.companyName}
//           required
//         />
//       </div>

//       <div className="col-span-12 md:col-span-6">
//         <UnderlineInputField
//           id="rating-position"
//           name="position"
//           label="Position"
//           placeholder="Your Role Or Designation (Optional)"
//           value={formData.position}
//           onChange={handleInputChange('position')}
//           error={errors.position}
//           required
//         />
//       </div>

//       <div className="col-span-12 md:col-span-6 xl:col-span-3">
//         <CountrySelectField
//           id="rating-country"
//           name="country"
//           label="Country"
//           value={formData.country}
//           onChange={handleCountryChange}
//           error={errors.country}
//         />
//       </div>

//       <div className="col-span-12 md:col-span-6 xl:col-span-3">
//         <ContactNumberField
//           id="rating-phone"
//           name="phone"
//           label="Contact No."
//           countryDialCode={formData.countryDialCode}
//           phoneValue={formData.phone}
//           onPhoneChange={handlePhoneChange}
//           error={errors.phone}
//         />
//       </div>

//       <div className="col-span-12 xl:col-span-6">
//         <RatingField
//           id="rating-performance"
//           label="Rate Our Performance"
//           value={formData.rating}
//           onChange={handleRatingChange}
//           error={errors.rating}
//           required
//         />
//       </div>

//       <div className="col-span-12">
//         <UnderlineTextareaField
//           id="rating-review"
//           name="review"
//           label="Your Review"
//           placeholder="Please Share The Experience We've Been Waiting For."
//           value={formData.review}
//           onChange={handleInputChange('review')}
//           error={errors.review}
//           required
//           maxLength={REVIEW_MAX_LENGTH}
//         />
//       </div>

//       <div className="col-span-12 flex justify-center pt-[4px]">
//         <Button01 type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit Review'}
//         </Button01>
//       </div>

//       <FormSuccessDialog
//         open={successDialogOpen}
//         onOpenChange={setSuccessDialogOpen}
//         heading="Thank You for Your Review"
//         description="Your review has been successfully submitted. Your experience helps us keep improving."
//         ctaLabel="Back to Experience"
//       />
//     </form>
//   )
// }

// export default RatingFormSection

'use client'

import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import countriesJson from '@/data/country.json'
import { cn } from '@/lib/utils'
import { RatingBlockType } from '@/types/payloadCustomTypes'
import { Check, ChevronsUpDown, Star } from 'lucide-react'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import FormSuccessDialog from './FormSuccessDialog'

type Props = { block: RatingBlockType }

const REVIEW_MAX_LENGTH = 500

type FormData = {
  buyersFullName: string
  linkedIn: string
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

type RatingBlockWithRecipients = RatingBlockType & {
  recipientEmails?: RecipientEmails | null
}

type CountryOption = {
  name: string
  code: string
  flag: string
  dialCode: string
  flagSvg: string
}

type CountryJsonItem = {
  countryName: string
  countryCode: string
  callingCode: string
  flag: string
}

const countries: CountryOption[] = (countriesJson as CountryJsonItem[])
  .map((country) => ({
    name: country.countryName || '',
    code: country.countryCode || '',
    flag: '',
    dialCode: country.callingCode || '',
    flagSvg: country.flag || '',
  }))
  .filter((country) => country.name && country.code)
  .sort((a, b) => a.name.localeCompare(b.name))

const labelClassName = 'text-secondary-2 global-p4 lg:global-p5 font-bold font-grift'

const getRecipientList = (recipientEmails?: RecipientEmails | null) =>
  [
    recipientEmails?.email1,
    recipientEmails?.email2,
    recipientEmails?.email3,
    recipientEmails?.email4,
    recipientEmails?.email5,
  ]
    .map((email) => String(email || '').trim())
    .filter(Boolean)

function UnderlineInputField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  type = 'text',
}: {
  id: string
  name: string
  label: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  type?: React.HTMLInputTypeAttribute
}) {
  const isInvalid = Boolean(error)

  return (
    <Field
      {...(isInvalid ? { 'data-invalid': true } : {})}
      className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
    >
      <FieldLabel htmlFor={id} className={labelClassName}>
        {label}
        {required ? ' *' : ''}
      </FieldLabel>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={isInvalid || undefined}
        className="
          w-full rounded-none border-0 border-b border-primary-1/45
          bg-transparent px-[14px] pb-[14px] pt-[8px]
          font-grift global-p4 lg:global-p5
          text-secondary-1 outline-none
          transition-colors duration-300
          placeholder:font-grift
          placeholder:capitalize
          placeholder:text-secondary-1/18
          focus:border-primary-1
          focus:ring-0
          focus-visible:outline-none
          focus-visible:ring-0
          h-[28px]
          md:h-[32px]
          xl:h-[56px]
          2xl:h-[60px]
        "
      />

      {error && (
        <FieldDescription className="font-grift text-[10px] md:text-[12px] text-red-500">
          {error}
        </FieldDescription>
      )}
    </Field>
  )
}

function UnderlineTextareaField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  maxLength,
}: {
  id: string
  name: string
  label: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
  maxLength?: number
}) {
  const isInvalid = Boolean(error)

  return (
    <Field
      {...(isInvalid ? { 'data-invalid': true } : {})}
      className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
    >
      <FieldLabel htmlFor={id} className={labelClassName}>
        {label}
        {required ? ' *' : ''}
      </FieldLabel>

      <textarea
        id={id}
        name={name}
        rows={2}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        aria-invalid={isInvalid || undefined}
        className="
          min-h-[72px] w-full resize-none rounded-none border-0 border-b border-primary-1/45
          bg-transparent px-[14px] pb-[14px] pt-[8px]
          font-grift global-p4 lg:global-p5 leading-[1.45]
          text-secondary-1 outline-none
          transition-colors duration-300
          placeholder:font-grift
          placeholder:capitalize
          placeholder:text-secondary-1/18
          focus:border-primary-1
          focus:ring-0
          focus-visible:outline-none
          focus-visible:ring-0
          md:min-h-[78px]
          xl:min-h-[84px]
        "
      />

      {(error || maxLength) && (
        <FieldDescription className="font-grift text-[10px] md:text-[12px]">
          {error ? (
            <span className="text-red-500">{error}</span>
          ) : maxLength ? (
            <span className="text-secondary-1/45">
              {value.length}/{maxLength}
            </span>
          ) : null}
        </FieldDescription>
      )}
    </Field>
  )
}

function CountrySelectField({
  id,
  name,
  label,
  value,
  onChange,
  error,
}: {
  id: string
  name: string
  label: string
  value: string
  onChange: (countryCode: string, country?: CountryOption) => void
  error?: string
}) {
  const [open, setOpen] = useState(false)
  const isInvalid = Boolean(error)

  const selectedCountry = useMemo(
    () => countries.find((country) => country.code === value),
    [value],
  )

  return (
    <Field
      {...(isInvalid ? { 'data-invalid': true } : {})}
      className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
    >
      <FieldLabel htmlFor={id} className={labelClassName}>
        {label}
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            name={name}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={isInvalid || undefined}
            className={cn(
              `
                w-full justify-between rounded-none border-0 border-b border-primary-1/75
                bg-transparent px-[10px] pb-[14px] pt-[8px] text-left
                font-grift global-p4 md:global-p5 text-secondary-1
                shadow-none transition-colors duration-300
                hover:bg-transparent
                focus:border-primary-1
                focus:outline-none focus:ring-0
                focus-visible:outline-none focus-visible:ring-0
                h-[28px]
                md:h-[32px]
                xl:h-[56px]
                2xl:h-[60px]
              `,
              !selectedCountry && 'text-secondary-1/45',
            )}
          >
            <span className="flex min-w-0 items-center gap-[12px] truncate">
              {selectedCountry ? (
                <>
                  <span className="relative h-[18px] w-[28px] shrink-0 overflow-hidden rounded-[2px]">
                    {selectedCountry.flagSvg ? (
                      <Image
                        src={selectedCountry.flagSvg}
                        alt={`${selectedCountry.name} flag`}
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-base leading-none">{selectedCountry.flag}</span>
                    )}
                  </span>

                  <span className="truncate">{selectedCountry.name}</span>
                </>
              ) : (
                <span>Select country</span>
              )}
            </span>

            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-70" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          className="relative z-[10001] w-[var(--radix-popover-trigger-width)] rounded-none p-0"
          onWheelCapture={(event) => event.stopPropagation()}
          onTouchMoveCapture={(event) => event.stopPropagation()}
        >
          <Command>
            <CommandInput placeholder="Search country..." className="font-grift" />

            <CommandList
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              className="max-h-[260px] overflow-y-auto overscroll-contain"
              onWheelCapture={(event) => event.stopPropagation()}
              onTouchMoveCapture={(event) => event.stopPropagation()}
            >
              <CommandEmpty>No country found.</CommandEmpty>

              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.code} ${country.dialCode}`}
                    onSelect={() => {
                      onChange(country.code, country)
                      setOpen(false)
                    }}
                    className="font-grift"
                  >
                    <span className="relative mr-2 h-4 w-6 shrink-0 overflow-hidden rounded-sm border border-gray-200">
                      {country.flagSvg ? (
                        <Image
                          src={country.flagSvg}
                          alt={`${country.name} flag`}
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-base leading-none">{country.flag}</span>
                      )}
                    </span>

                    <span className="flex-1 truncate">{country.name}</span>

                    {country.dialCode ? (
                      <span className="mr-2 text-secondary-1/50">{country.dialCode}</span>
                    ) : null}

                    <Check
                      className={cn(
                        'ml-auto size-4',
                        value === country.code ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <FieldDescription className="font-grift text-[10px] md:text-[12px] text-red-500">
          {error}
        </FieldDescription>
      )}
    </Field>
  )
}

function ContactNumberField({
  id,
  name,
  label,
  countryDialCode,
  phoneValue,
  onPhoneChange,
  error,
}: {
  id: string
  name: string
  label: string
  countryDialCode: string
  phoneValue: string
  onPhoneChange: (value: string) => void
  error?: string
}) {
  const isInvalid = Boolean(error)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '')
    onPhoneChange(onlyDigits)
  }

  return (
    <Field
      {...(isInvalid ? { 'data-invalid': true } : {})}
      className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
    >
      <FieldLabel htmlFor={id} className={labelClassName}>
        {label}
      </FieldLabel>

      <div className="grid grid-cols-12 gap-[12px]">
        <input
          value={countryDialCode || ''}
          readOnly
          placeholder="+880"
          className="
            col-span-4 rounded-none border-0 border-b border-primary-1/75
            bg-transparent px-[10px] pb-[14px] pt-[8px]
            font-grift global-p4 md:global-p5 text-secondary-1 outline-none
            placeholder:text-secondary-1/35
            h-[28px]
            md:h-[32px]
            xl:h-[56px]
            2xl:h-[60px]
          "
        />

        <input
          id={id}
          name={name}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0123456789124"
          value={phoneValue}
          onChange={handlePhoneChange}
          aria-invalid={isInvalid || undefined}
          className="
            col-span-8 rounded-none border-0 border-b border-primary-1/45
            bg-transparent px-[10px] pb-[14px] pt-[8px]
            font-grift global-p4 md:global-p5 text-secondary-1 outline-none
            transition-colors duration-300
            placeholder:font-grift
            placeholder:text-secondary-1/18
            focus:border-primary-1
            focus:ring-0
            focus-visible:outline-none
            focus-visible:ring-0
            h-[28px]
            md:h-[32px]
            xl:h-[56px]
            2xl:h-[60px]
          "
        />
      </div>

      {error && (
        <FieldDescription className="font-grift text-[10px] md:text-[12px] text-red-500">
          {error}
        </FieldDescription>
      )}
    </Field>
  )
}

function RatingField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  max = 5,
}: {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  error?: string
  required?: boolean
  max?: number
}) {
  const isInvalid = Boolean(error)

  return (
    <Field
      {...(isInvalid ? { 'data-invalid': true } : {})}
      className="gap-[8px] md:gap-[10px] lg:gap-[12px]"
    >
      <FieldLabel htmlFor={id} className={labelClassName}>
        {label}
        {required ? ' *' : ''}
      </FieldLabel>

      <div id={id} className="flex items-center gap-[10px] md:gap-[12px]">
        {Array.from({ length: max }).map((_, index) => {
          const ratingValue = index + 1
          const active = ratingValue <= value

          return (
            <button
              key={ratingValue}
              type="button"
              onClick={() => onChange(ratingValue)}
              className="transition duration-200 hover:scale-110"
              aria-label={`Rate ${ratingValue} out of ${max}`}
            >
              <Star
                className={`
                  h-[30px] w-[30px]
                  md:h-[34px] md:w-[34px]
                  xl:h-[38px] xl:w-[38px]
                  2xl:h-[42px] 2xl:w-[42px]
                  ${
                    active ? 'fill-primary-1 text-primary-1' : 'fill-primary-1/18 text-primary-1/18'
                  }
                `}
              />
            </button>
          )
        })}
      </div>

      {error && (
        <FieldDescription className="font-grift text-[10px] md:text-[12px] text-red-500">
          {error}
        </FieldDescription>
      )}
    </Field>
  )
}

function RatingFormSection({ block }: Props) {
  const blockWithRecipients = block as RatingBlockWithRecipients

  const [formData, setFormData] = useState<FormData>({
    buyersFullName: '',
    linkedIn: '',
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
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [successDialogDescription, setSuccessDialogDescription] = useState(
    'Your review has been successfully submitted. Your experience helps us keep improving.',
  )

  if (block?.ratingSettings?.showRatingForm === false) return null

  const validateField = (field: keyof FormData, value: string | number) => {
    switch (field) {
      case 'buyersFullName':
        if (!String(value).trim()) return 'Buyer full name is required.'
        return undefined

      case 'linkedIn':
        return undefined

      case 'companyName':
        if (!String(value).trim()) return 'Company name is required.'
        return undefined

      case 'position':
        if (!String(value).trim()) return 'Position is required.'
        return undefined

      case 'country':
        if (!String(value).trim()) return 'Country is required.'
        return undefined

      case 'phone': {
        const raw = String(value).trim()

        if (!raw) return 'Contact number is required.'
        if (!/^\d+$/.test(raw)) return 'Contact number can contain numbers only.'
        if (!formData.country) return 'Please select a country first.'

        const phoneNumber = parsePhoneNumberFromString(raw, formData.country as CountryCode)

        if (!phoneNumber) return 'Please enter a valid contact number.'
        if (!phoneNumber.isPossible()) {
          return 'Phone number length is not valid for the selected country.'
        }
        if (!phoneNumber.isValid()) return 'Please enter a valid contact number.'

        return undefined
      }

      case 'rating':
        if (Number(value) < 1) return 'Rating is required.'
        return undefined

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
    buyersFullName: validateField('buyersFullName', formData.buyersFullName),
    linkedIn: validateField('linkedIn', formData.linkedIn),
    companyName: validateField('companyName', formData.companyName),
    position: validateField('position', formData.position),
    country: validateField('country', formData.country),
    phone: validateField('phone', formData.phone),
    rating: validateField('rating', formData.rating),
    review: validateField('review', formData.review),
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

    try {
      setIsSubmitting(true)

      const res = await fetch('/api/review-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipients: getRecipientList(blockWithRecipients?.recipientEmails),
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        setErrors((prev) => ({
          ...prev,
          review: result?.message || 'Review submission failed. Please try again.',
        }))

        return
      }

      setSuccessDialogDescription(
        result?.emailSent
          ? 'Your review has been successfully submitted, and it has reached our admin team via email.'
          : result?.emailMessage ||
              'Your review has been successfully submitted. Your experience helps us keep improving.',
      )

      setSuccessDialogOpen(true)

      setFormData({
        buyersFullName: '',
        linkedIn: '',
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

      setErrors((prev) => ({
        ...prev,
        review: 'Something went wrong. Please try again.',
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mx-auto grid w-full grid-cols-12
        max-w-[1120px] xl:max-w-[1180px] 2xl:max-w-[1240px]
        gap-x-0 md:gap-x-[20px] lg:gap-x-[70px] xl:gap-x-[80px]
        gap-y-[14px] md:gap-y-[30px] xl:gap-y-[46px] 2xl:gap-y-[52px]
      "
    >
      <div className="col-span-12 md:col-span-6">
        <UnderlineInputField
          id="rating-buyers-full-name"
          name="buyersFullName"
          label="Buyers Full Name"
          placeholder="Your Full Name"
          value={formData.buyersFullName}
          onChange={handleInputChange('buyersFullName')}
          error={errors.buyersFullName}
          required
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <UnderlineInputField
          id="rating-linked-in"
          name="linkedIn"
          label="Linked In"
          placeholder="We'll Use This To Reply To Your Query"
          value={formData.linkedIn}
          onChange={handleInputChange('linkedIn')}
          error={errors.linkedIn}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <UnderlineInputField
          id="rating-company-name"
          name="companyName"
          label="Company Name"
          placeholder="The Organization You Represent (Optional)"
          value={formData.companyName}
          onChange={handleInputChange('companyName')}
          error={errors.companyName}
          required
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <UnderlineInputField
          id="rating-position"
          name="position"
          label="Position"
          placeholder="Your Role Or Designation (Optional)"
          value={formData.position}
          onChange={handleInputChange('position')}
          error={errors.position}
          required
        />
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-3">
        <CountrySelectField
          id="rating-country"
          name="country"
          label="Country"
          value={formData.country}
          onChange={handleCountryChange}
          error={errors.country}
        />
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-3">
        <ContactNumberField
          id="rating-phone"
          name="phone"
          label="Contact No."
          countryDialCode={formData.countryDialCode}
          phoneValue={formData.phone}
          onPhoneChange={handlePhoneChange}
          error={errors.phone}
        />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <RatingField
          id="rating-performance"
          label="Rate Our Performance"
          value={formData.rating}
          onChange={handleRatingChange}
          error={errors.rating}
          required
        />
      </div>

      <div className="col-span-12">
        <UnderlineTextareaField
          id="rating-review"
          name="review"
          label="Your Review"
          placeholder="Please Share The Experience We've Been Waiting For."
          value={formData.review}
          onChange={handleInputChange('review')}
          error={errors.review}
          required
          maxLength={REVIEW_MAX_LENGTH}
        />
      </div>

      <div className="col-span-12 flex justify-center pt-[4px]">
        <Button01 type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button01>
      </div>

      <FormSuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        heading="Thank You for Your Review"
        description={successDialogDescription}
        ctaLabel="Back to Experience"
      />
    </form>
  )
}

export default RatingFormSection
