import { Input } from '@/components/ui/input'
import React from 'react'
import { CiSearch } from 'react-icons/ci'

function SearchBarSection() {
  return (
    <div className="z-40 flex justify-center items-center px-14 py-12 sm:p-8 md:p-16 lg:p-24">
      <div
        className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-[#F6EDDD] rounded-full p-2 sm:p-3 relative"
        style={{ boxShadow: '0px 0px 13px 6px #00000014' }}
      >
        <Input
          type="text"
          placeholder="Try shanta multi-stage maturity plan"
          className="w-full rounded-full bg-white text-[#00000040] placeholder:text-[#00000040] placeholder:text-xs sm:placeholder:text-sm tracking-[0.03em] py-4 px-5 sm:py-5 sm:px-12"
        />

        <div className="absolute right-5 sm:right-10 top-1/2 -translate-y-1/2">
          <CiSearch size={28} />
        </div>
      </div>
    </div>
  )
}

export default SearchBarSection
