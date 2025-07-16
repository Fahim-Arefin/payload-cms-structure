'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

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
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const plans = [
    {
      text: 'Shanta Child Education Plan',
      videoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
    },
    {
      text: 'Shanta Endowment Plan',
      videoLink: 'https://www.youtube.com/embed/CkKkdNkBk9g',
    },
    {
      text: 'Shanta 3 Stage Plan',
      videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
    },
    {
      text: 'Shanta 4 Stage Plan',
      videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
    },
    // 'Retirement Plan',
    // 'Family Protection',
    // 'Travel Coverage',
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
  grid grid-cols-2 gap-x-4 gap-y-8 md:gap-5 xl:gap-6 
  p-6 xl:p-8 z-10"
    >
      {/* plans */}
      <div className="relative col-span-2 md:col-span-1">
        <Select onValueChange={(v) => setSelectedPlan(plans.find((p) => p.text == v))}>
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder="Select Your Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Plans</SelectLabel>

              {/* generates options  */}
              {plans.map((plan) => (
                <SelectItem key={plan.text} value={plan.text}>
                  {plan.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* below a text saying watch video */}
        {/* <p className="text-[10px] py-2 absolute inset-x-0 text-[#FF6600] underline">Watch Video</p> */}
        {selectedPlan && (
          <Dialog>
            <DialogTrigger asChild>
              <p className="text-[10px] py-1 absolute inset-x-0 text-[#FF6600] underline cursor-pointer">
                Watch Video
              </p>
            </DialogTrigger>

            <DialogContent
              className="max-w-5xl w-full aspect-video p-0 bg-black 
      [&>button.absolute]:top-3 [&>button.absolute]:right-3 
      [&>button.absolute]:bg-black/50 
      [&>button.absolute]:text-white 
      [&>button.absolute]:hover:bg-black/80"
            >
              <VisuallyHidden>
                <DialogTitle>Plan Video</DialogTitle>
              </VisuallyHidden>

              <iframe
                width="100%"
                height="100%"
                src={selectedPlan?.videoLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </DialogContent>
          </Dialog>
        )}
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
