import React from 'react'
import { InputField } from '../Form/InputField'
import { Input } from '@/components/ui/input'

type Props = {}

function SearchBarSection({}: Props) {
  return (
    <div
      className="text-white-1 relative z-30
    space-y-4 xl:space-y-5"
    >
      <div className="font-proxima font-bold text-[12px] text-white-1 md:text-[12px] lg:text-[14px] xl:text-[20px] 2xl:text-[22px] leading-[140%] tracking-[-0.6px]">
        SEARCH NOW!
      </div>
      <div>
        <Input
          //   id={id}
          //   name={id}
          //   type={type}
          placeholder={`Search Our Products . . . `}
          //   value={value}
          //   onChange={onChange}
          //   aria-invalid={isInvalid || undefined}
          className={`font-manrope global-p5 rounded-none border-[1.5px] border-cyan text-cyan font-bold
        placeholder:font-manrope placeholder:global-p5 placeholder:text-cyan placeholder:font-bold
        bg-white/10
        focus:outline-none focus:ring-0
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#686893] focus-visible:ring-offset-0 focus-visible:border-[#686893]
        p-2 lg:p-3 xl:p-4 2xl:p-5 `}
        />
      </div>
    </div>
  )
}

export default SearchBarSection
