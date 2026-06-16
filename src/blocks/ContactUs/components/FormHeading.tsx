import React from 'react'

type Props = {
  text: string
  required?: boolean
}

function FormHeading({ text, required }: Props) {
  return (
    <div className="font-grift global-p4 font-semibold uppercase text-secondary-1">
      {text} {required && <span className="text-red-500">*</span>}
    </div>
  )
}

export default FormHeading
