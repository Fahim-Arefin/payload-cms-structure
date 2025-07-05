'use client'
import React from 'react'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

function OnboardingJoinForm() {
  const plans = [
    'Child Education Plan',
    'Retirement Plan',
    'Health Insurance',
    'Family Protection',
    'Travel Coverage',
  ]
  const genders = ['Male', 'Female']
  const tenures = ['10 years', '20 years', '30 years']
  const paymentMethods = ['Monthly', 'Quarterly', 'Yearly']
  return (
    <form
      action=""
      className="border-2 border-[#9C8639] rounded-2xl bg-[#FFFFFFCC]
  grid grid-cols-2 gap-x-4 gap-y-8 md:gap-7 xl:gap-8 
  p-6 xl:p-12 z-10"
    >


      {/* name input */}
      <div className="col-span-2 ">
        <Input
          type="text"
          placeholder="Name"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
       {/* phone number input */}
      <div className="col-span-2">
        <Input
          type="number"
          placeholder="Phone Number"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* gender select  */}
      <div className="col-span-1 md:col-span-1">
        <Select>
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              {genders.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

            {/* age input */}
      <div className="col-span-1 md:col-span-1">
        <Input
          type="number"
          placeholder="Age"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
     
      {/* annual income input */}
      <div className="col-span-1 md:col-span-1">
        <Input
          type="text"
          placeholder="Present Occupation"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* sum assumed input */}
      <div className="relative col-span-1 md:col-span-1">
        <Input
          type="text"
          placeholder="Preferred Working Area"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* submit button */}
      <div className="col-span-2">
        <Button className="bg-[#9C8639] text-white rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 w-full">
          Join Us
        </Button>
      </div>
    </form>
  )
}

export default OnboardingJoinForm
