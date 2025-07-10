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
import ToolTip from '../shared/ToolTip'

function QuoteForm() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted')
  }

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="border-2 border-[#9C8639] rounded-2xl bg-[#FFFFFFCC]
  grid grid-cols-2 gap-x-4 gap-y-8 md:gap-7 xl:gap-8 
  p-6 xl:p-12 z-10"
    >
      {/* plans */}
      <div className="relative col-span-2 md:col-span-1">
        <Select>
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder="Select Your Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Plans</SelectLabel>

              {/* generates options  */}
              {plans.map((plan) => (
                <SelectItem key={plan} value={plan}>
                  {plan}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* below a text saying watch video */}
        <p className="text-[10px] py-2 absolute inset-x-0 text-[#FF6600] underline">Watch Video</p>
      </div>
      {/* select yopur tenure */}
      <div className="col-span-2 md:col-span-1">
        <Select>
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder="Select Your Tenure" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tenure</SelectLabel>
              {tenures.map((tenure) => (
                <SelectItem key={tenure} value={tenure}>
                  {tenure}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* name input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="text"
          placeholder="Name"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* age input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          min={0}
          type="number"
          placeholder="Age"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* gender select  */}
      <div className="col-span-2 md:col-span-1">
        <Select>
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder="Select Your Gender" />
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
      {/* phone number input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          min={0}
          type="number"
          placeholder="Phone Number"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* annual income input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          min={0}
          type="number"
          placeholder="Annual Income"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* sum assumed input */}
      <div className="relative col-span-2 md:col-span-1">
        <Input
          min={0}
          type="number"
          placeholder="Sum Assumed"
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
        <p className="text-[10px] py-2 absolute inset-x-0">
          Suggested BDT <span className="text-[#FF6600]">10,00000</span>
        </p>
      </div>
      {/* payment method select  */}
      <div className="col-span-2 md:col-span-1">
        <Select>
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder="Select Your Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Payment Method</SelectLabel>
              {paymentMethods.map((paymentMethod) => (
                <SelectItem key={paymentMethod} value={paymentMethod}>
                  {paymentMethod}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* submit button */}
      <ToolTip className="col-span-2">
        <Button className="cursor-not-allowed bg-[#9C8639] text-white rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 w-full">
          Get A Quote Now
        </Button>
      </ToolTip>
    </form>
  )
}

export default QuoteForm
