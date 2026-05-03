import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import React from 'react'

type TextareaFieldProps = {
  id: string
  name: string
  label: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  description?: string
  required?: boolean
  rows?: number
  maxLength?: number
}

export function TextareaField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  description,
  required = false,
  rows = 4,
  maxLength,
}: TextareaFieldProps) {
  const isInvalid = Boolean(error)

  return (
    <Field {...(isInvalid ? { 'data-invalid': true } : {})}>
      <FieldLabel htmlFor={id} className="font-manrope font-bold text-dark-1 global-p5">
        {label}
        {required ? ' *' : ''}
      </FieldLabel>

      <textarea
        id={id}
        name={name ?? id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        aria-invalid={isInvalid || undefined}
        className="w-full resize-none font-manrope global-p5 rounded-none border border-cyan
        placeholder:font-manrope placeholder:global-p5 placeholder:text-[#07072550] placeholder:font-bold
        bg-white/10
        focus:outline-none focus:ring-0
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#686893] focus-visible:ring-offset-0 focus-visible:border-[#686893]
        p-2 lg:p-3 xl:p-4 2xl:p-5"
      />

      {/* {(error || description) && (
        <FieldDescription className="font-manrope text-red-500 global-p5 min-h-5">
          {isInvalid ? error : description}
        </FieldDescription>
      )} */}
      {(error || description || maxLength) && (
        <FieldDescription className="font-manrope text-red-500 global-p5 min-h-5">
          {isInvalid ? (
            error
          ) : maxLength ? (
            <span className="text-[#07072580]">
              {value.length}/{maxLength}
            </span>
          ) : (
            description
          )}
        </FieldDescription>
      )}
    </Field>
  )
}
