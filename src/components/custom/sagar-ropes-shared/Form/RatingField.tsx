import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import React from 'react'
import { Star } from 'lucide-react'

type RatingFieldProps = {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  error?: string
  required?: boolean
  max?: number
}

export function RatingField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  max = 5,
}: RatingFieldProps) {
  const isInvalid = Boolean(error)

  return (
    <Field {...(isInvalid ? { 'data-invalid': true } : {})}>
      <FieldLabel htmlFor={id} className="font-manrope font-bold text-dark-1 global-p5">
        {label}
        {required ? ' *' : ''}
      </FieldLabel>

      <div id={id} className="flex items-center gap-1 md:gap-1.5 xl:gap-2">
        {Array.from({ length: max }).map((_, index) => {
          const ratingValue = index + 1
          const active = ratingValue <= value

          return (
            <button
              key={ratingValue}
              type="button"
              onClick={() => onChange(ratingValue)}
              className="transition hover:scale-105"
              aria-label={`Rate ${ratingValue} out of ${max}`}
            >
              <Star
                className={`h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10 ${
                  active ? 'fill-cyan text-cyan' : 'fill-transparent text-gray-300'
                }`}
              />
            </button>
          )
        })}
      </div>

      {error && (
        <FieldDescription className="font-manrope text-red-500 global-p5 min-h-5">
          {isInvalid ? error : ''}
        </FieldDescription>
      )}
    </Field>
  )
}
