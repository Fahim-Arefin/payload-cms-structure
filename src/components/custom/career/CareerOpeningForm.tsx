'use client'
import React, { useState } from 'react'
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
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSendButtonText('Sending...')
    console.log({ name, email, phone, position, message })
    const resumeFormData = new FormData()
    resumeFormData.append('hogamara', 'let go')
    resumeFormData.append('file', (document.querySelector('#resume') as HTMLInputElement)?.files?.[0])
    console.log(resumeFormData)
    const resumeId = await fetch('/api/resume', {
      method: 'POST',
      body: resumeFormData,
    })
      .then((rs) => rs.json())
      .then((resume) => resume.doc.id)
    console.log({ resumeId })

    await fetch('/api/career-application', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        position,
        message,
        resume: resumeId,
      }),
    })
      .then((rs) => rs.json())
      .then((rs) => console.log(rs))
    setSendButtonText('Application Sent')
    setTimeout(() => {
      setSendButtonText('Send Application')
    }, 1500)
  }

  const [sendButtonText, setSendButtonText] = useState('Send Application')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [position, setPosition] = useState(positions[0] ?? '')
  const [message, setMessage] = useState('')
  const [resumeUploadFieldText, setResumeUploadFieldText] = useState('Upload your resume')

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white md:bg-[#FCF4EB] rounded-[12px] h-full px-5 py-6 flex flex-col gap-4 w-full"
    >
      <span className="font-bold text-[#343434] text-lg mb-1 tracking-tight">JOIN OUR TEAM</span>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px]"
        required
      />
      <Input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px]"
        required
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px]"
        required
      />
      <Select required value={position} onValueChange={(e) => setPosition(e)}>
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
            {resumeUploadFieldText}
          </span>
          <input
            onChange={(e) =>
              setResumeUploadFieldText(e.target.files?.[0]?.name ?? 'Upload your resume')
            }
            required
            type="file"
            accept="application/pdf,application/msword"
            id="resume"
            className="hidden"
          />
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px] lg:min-h-[105px] xl:min-h-[70px]"
        rows={2}
        required
      />
      {/* <Button
        type="submit"
        className="mt-2 bg-[#ED7125] text-white text-[15px] font-semibold py-2 px-5 rounded-[5px] w-full md:w-auto md:self-end hover:bg-[#d15d15] transition-colors"
      >
        Send Application
      </Button> */}
      <GlobalButton
        size="small"
        className="font-semibold w-full md:w-auto md:self-end"
        text={sendButtonText}
        variant="primary"
      />
    </form>
  )
}

export default CareerOpeningForm
