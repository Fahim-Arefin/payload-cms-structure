'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const positions = [
  'IT Executive',
  'Management Trainee',
  'Relationship Officer',
  'Campus Ambassador',
]

function CareerOpeningForm() {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    // your logic here
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#F9F4EE] rounded-[12px] shadow px-5 py-6 flex flex-col gap-4 w-full"
    >
      <span className="font-bold text-[#343434] text-lg mb-1 tracking-tight">JOIN OUR TEAM</span>
      <Input
        placeholder="Name"
        className="bg-white rounded-md px-4 py-2 shadow-sm border-none placeholder:text-[#B0B0B0] text-[15px]"
      />
      <Input
        placeholder="Phone"
        className="bg-white rounded-md px-4 py-2 shadow-sm border-none placeholder:text-[#B0B0B0] text-[15px]"
      />
      <Input
        placeholder="Email"
        className="bg-white rounded-md px-4 py-2 shadow-sm border-none placeholder:text-[#B0B0B0] text-[15px]"
      />
      <Select>
        <SelectTrigger className="bg-white rounded-md px-4 py-2 shadow-sm border-none text-[15px]">
          <SelectValue placeholder="IT Executive" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Position</SelectLabel>
            {positions.map((position) => (
              <SelectItem value={position} key={position}>
                {position}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* File upload */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="resume"
          className="bg-[#B09B67] rounded px-4 py-2 text-white font-semibold text-[13px] cursor-pointer"
        >
          Browse File
          <input
            type="file"
            id="resume"
            className="hidden"
          />
        </label>
        <span className="text-[#B0B0B0] text-[13px]">Upload your resume</span>
      </div>
      <Textarea
        placeholder="Your message"
        className="bg-white rounded-md px-4 py-2 shadow-sm border-none placeholder:text-[#B0B0B0] text-[15px] min-h-[65px]"
        rows={2}
      />
      <Button
        type="submit"
        className="mt-2 bg-[#ED7125] text-white text-[15px] font-semibold py-2 px-5 rounded-[5px] w-full md:w-auto md:self-end hover:bg-[#d15d15] transition-colors"
      >
        Send Application
      </Button>
    </form>
  )
}

export default CareerOpeningForm
