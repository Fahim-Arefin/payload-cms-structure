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

type Props = {
  plan?: string
  onPlanChange: (value: string) => void
}

function CalculateForm({ plan, onPlanChange }: Props) {
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
      className=" rounded-2xl bg-[#9C863940]
  grid grid-cols-2 gap-x-4 gap-y-8 md:gap-7 xl:gap-8 
  p-6 xl:p-12 z-10"
    >
      {/* plans */}
      <div className="relative col-span-2 md:col-span-1">
        <Select onValueChange={onPlanChange}>
          <SelectTrigger className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
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
      <div className="col-span-2 md:col-span-1 ">
        <Select>
          <SelectTrigger className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
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
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* age input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="number"
          placeholder="Age"
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* gender select  */}
      <div className="col-span-2 md:col-span-1">
        <Select>
          <SelectTrigger className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
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
      {/* phone number input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="number"
          placeholder="Phone Number"
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* annual income input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          type="number"
          placeholder="Annual Income"
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* sum assumed input */}
      <div className="relative col-span-2 md:col-span-1">
        <Input
          type="number"
          placeholder="Sum Assumed"
          className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
        <p className="text-[10px] py-2 absolute inset-x-0">
          Suggested BDT <span className="text-[#FF6600]">10,00000</span>
        </p>
      </div>
      {/* payment method select  */}
      <div className="col-span-2 md:col-span-1">
        <Select>
          <SelectTrigger className="bg-white shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder="Payment Method" />
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
      <div className="col-span-2 items-center px-4  flex flex-col gap-4 justify-center">
        <Button className="bg-[#978900] w-fit global-h4 text-white rounded-[10px] px-5 py-5 xl:px-8 xl:py-8">
          Calculate Now
        </Button>
        <p className="text-[10px] text-[#00000099] w-2/3 font-light">
          Our expert advisors are ready to help you choose the best plan based on your age, income,
          and future goals. Whether you're just starting your career or planning for retirement, we
          are with you at every step.
        </p>
        <p className="text-[12px] text-[#434343] underline">Have Questions? Ask Us! </p>
      </div>
    </form>
  )
}

export default CalculateForm
