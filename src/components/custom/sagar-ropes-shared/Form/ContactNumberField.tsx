// import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
// import { Input } from '@/components/ui/input'
// import React from 'react'

// type ContactNumberFieldProps = {
//   id: string
//   name: string
//   label: string
//   countryDialCode: string
//   phoneValue: string
//   onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//   error?: string
//   required?: boolean
// }

// export function ContactNumberField({
//   id,
//   name,
//   label,
//   countryDialCode,
//   phoneValue,
//   onPhoneChange,
//   error,
//   required = false,
// }: ContactNumberFieldProps) {
//   const isInvalid = Boolean(error)

//   const sharedClassName =
//     'font-manrope global-p5 rounded-none border-[1.5px] border-cyan bg-white/10 ' +
//     'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-1 ' +
//     'focus-visible:ring-[#686893] focus-visible:ring-offset-0 focus-visible:border-[#686893] ' +
//     'p-2 lg:p-3 xl:p-4 2xl:p-5'

//   return (
//     <Field {...(isInvalid ? { 'data-invalid': true } : {})}>
//       <FieldLabel htmlFor={id} className="font-manrope font-bold text-dark-1 global-p5">
//         {label}
//         {required ? ' *' : ''}
//       </FieldLabel>

//       <div className="grid grid-cols-12 gap-2">
//         <div className="col-span-4">
//           <Input
//             value={countryDialCode || ''}
//             readOnly
//             placeholder="+880"
//             className={sharedClassName}
//           />
//         </div>

//         <div className="col-span-8">
//           <Input
//             id={id}
//             name={name ?? id}
//             type="tel"
//             placeholder="0123456789124"
//             value={phoneValue}
//             onChange={onPhoneChange}
//             aria-invalid={isInvalid || undefined}
//             className={`${sharedClassName} placeholder:font-manrope placeholder:global-p5 placeholder:text-[#07072550] placeholder:font-bold`}
//           />
//         </div>
//       </div>

//       {error && (
//         <FieldDescription className="font-manrope text-red-500 global-p5 min-h-5">
//           {error}
//         </FieldDescription>
//       )}
//     </Field>
//   )
// }

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'

type ContactNumberFieldProps = {
  id: string
  name: string
  label: string
  countryDialCode: string
  phoneValue: string
  onPhoneChange: (value: string) => void
  error?: string
  required?: boolean
}

export function ContactNumberField({
  id,
  name,
  label,
  countryDialCode,
  phoneValue,
  onPhoneChange,
  error,
  required = false,
}: ContactNumberFieldProps) {
  const isInvalid = Boolean(error)

  const sharedClassName =
    'font-manrope global-p5 rounded-none border-[1.5px] border-cyan bg-white/10 ' +
    'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-1 ' +
    'focus-visible:ring-[#686893] focus-visible:ring-offset-0 focus-visible:border-[#686893] ' +
    'p-2 lg:p-3 xl:p-4 2xl:p-5'

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '')
    onPhoneChange(onlyDigits)
  }

  return (
    <Field {...(isInvalid ? { 'data-invalid': true } : {})}>
      <FieldLabel htmlFor={id} className="font-manrope font-bold text-dark-1 global-p5">
        {label}
        {required ? ' *' : ''}
      </FieldLabel>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <Input
            value={countryDialCode || ''}
            readOnly
            placeholder="+880"
            className={sharedClassName}
          />
        </div>

        <div className="col-span-8">
          <Input
            id={id}
            name={name ?? id}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0123456789124"
            value={phoneValue}
            onChange={handlePhoneChange}
            aria-invalid={isInvalid || undefined}
            className={`${sharedClassName} placeholder:font-manrope placeholder:global-p5 placeholder:text-[#07072550] placeholder:font-bold`}
          />
        </div>
      </div>

      {error && (
        <FieldDescription className="font-manrope text-red-500 global-p5 min-h-5">
          {error}
        </FieldDescription>
      )}
    </Field>
  )
}
