import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'

type InputFieldProps = {
  id: string
  label: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  description?: string
  required?: boolean
  className?: string
}

export function InputField({
  id,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  description,
  required = false,
  className = '',
}: InputFieldProps) {
  const isInvalid = Boolean(error)

  return (
    <Field {...(isInvalid ? { 'data-invalid': true } : {})}>
      <FieldLabel htmlFor={id} className="font-manrope font-bold text-dark-1 global-p5">
        {label}
        {required ? ' *' : ''}
      </FieldLabel>

      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={isInvalid || undefined}
        className={`font-manrope global-p5 rounded-none border-[1.5px] border-cyan
        placeholder:font-manrope placeholder:global-p5 placeholder:text-[#07072550] placeholder:font-bold
        bg-white/10
        focus:outline-none focus:ring-0
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#686893] focus-visible:ring-offset-0 focus-visible:border-[#686893]
        p-2 lg:p-3 xl:p-4 2xl:p-5 ${className}`}
      />

      {(error || description) && (
        <FieldDescription className="font-manrope text-red-500 global-p5 min-h-5">
          {isInvalid ? error : description}
        </FieldDescription>
      )}
    </Field>
  )
}
