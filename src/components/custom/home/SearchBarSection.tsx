import { Input } from '@/components/ui/input'
import React from 'react'
import { CiSearch } from 'react-icons/ci'

function SearchBarSection() {
  return (
    <div
      className="z-40 flex justify-center items-center bg-white
    px-14 py-12 sm:p-8 md:p-16 lg:p-24 "
    >
      <div
        className="w-full max-w-[80%] md:max-w-sm lg:max-w-xl bg-[#F6EDDD] rounded-lg md:rounded-md 
        relative
        py-1 px-1.5 md:py-1.5 md:px-2 lg:py-2 lg:px-2.5 "
        // style={{ boxShadow: '0px 0px 13px 6px #00000014' }}
      >
        <Input
          type="text"
          placeholder="Try shanta multi-stage maturity plan"
          className="w-full rounded-xl md:rounded-md bg-white text-[#000000] placeholder:text-[#00000040] 
          placeholder:text-xs sm:placeholder:text-sm tracking-[0.03em] py-4 px-5 sm:py-5 sm:px-12 
          h-[40px] md:h-[45px] lg:h-[60px] xl:h-[70px] "
        />

        <div className="hidden md:block absolute right-5 sm:right-10 top-1/2 -translate-y-1/2">
          <CiSearch size={28} />
        </div>
      </div>
    </div>
  )
}

export default SearchBarSection
