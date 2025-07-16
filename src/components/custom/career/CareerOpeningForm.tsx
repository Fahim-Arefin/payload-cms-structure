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
import GlobalButton from '../shared/GlobalButton'

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
      className="bg-white md:bg-[#FCF4EB] rounded-[12px] h-full px-5 py-6 flex flex-col gap-4 w-full"
    >
      <span className="font-bold text-[#343434] text-lg mb-1 tracking-tight">JOIN OUR TEAM</span>
      <Input
        placeholder="Name"
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px]"
      />
      <Input
        placeholder="Phone"
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px]"
      />
      <Input
        placeholder="Email"
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px]"
      />
      <Select>
        <SelectTrigger className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none text-[15px]">
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
      <div className="flex w-full rounded-[6px] overflow-hidden bg-[#FCF4EB] md:bg-white">
        <label htmlFor="resume" className="flex flex-1 items-center cursor-pointer">
          <span className="block w-full text-[#B0B0B0] text-[13px] px-3 py-2 select-none">
            Upload your resume
          </span>
          <input type="file" id="resume" className="hidden" />
        </label>
        <label
          htmlFor="resume"
          className="bg-[#B09B67] text-white font-semibold text-[13px] px-4 py-2 cursor-pointer transition-colors hover:bg-[#a29050] select-none"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          Browse File
        </label>
      </div>

      <Textarea
        placeholder="Your message"
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px] lg:min-h-[105px] xl:min-h-[70px]"
        rows={2}
      />
      {/* <Button
        type="submit"
        className="mt-2 bg-[#ED7125] text-white text-[15px] font-semibold py-2 px-5 rounded-[5px] w-full md:w-auto md:self-end hover:bg-[#d15d15] transition-colors"
      >
        Send Application
      </Button> */}
      <GlobalButton
        size="small"
        className="cursor-not-allowed font-semibold w-full md:w-auto md:self-end"
        text="Send Application"
        variant="primary"
      />
    </form>
  )
}

export default CareerOpeningForm
