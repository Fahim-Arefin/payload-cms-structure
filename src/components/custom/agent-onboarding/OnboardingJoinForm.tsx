'use client'
import React, { useState } from 'react'
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
import GlobalButton from '../shared/GlobalButton'
import { Loader, MailCheck, SendHorizontal, CheckCircle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import useSSRLanguage from '@/hooks/useSSRLanguage'

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

  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneNumber = (phone: string) => {
    // Bangladesh mobile number format: 11 digits starting with 01
    const phoneRegex = /^01[0-9]{9}$/
    return phoneRegex.test(phone)
  }

  const validateForm = () => {
    const errors: string[] = []

    if (!name.trim()) errors.push('Name is required')
    // if (!email.trim()) errors.push('Email is required')
    // else if (!validateEmail(email)) errors.push('Please enter a valid email address')
    if (!phone.trim()) errors.push('Phone number is required')
    else if (!validatePhoneNumber(phone))
      errors.push('Please enter a valid Bangladesh mobile number (11 digits starting with 01)')
    // if (!pos) errors.push('Please select a job position')

    const file = (document.querySelector('#resume') as HTMLInputElement)?.files?.[0]
    if (!file) errors.push('Resume is required')

    return errors
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      console.log('test handle validation')
      // setValidationErrors(validationErrors)
      // return
    }

    setValidationErrors([])
    setIsLoading(true)
    setShowSuccessAlert(false)
    console.log('test form', { name, phone })

    try {
      const resumeFormData = new FormData()
      resumeFormData.append('agent-career', 'let go')
      const file = (document.querySelector('#resume') as HTMLInputElement)?.files?.[0]
      if (file) {
        resumeFormData.append('file', file)
      }
      console.log(resumeFormData)
      const resumeId = await fetch('/api/resume', {
        method: 'POST',
        body: resumeFormData,
      })
        .then((rs) => rs.json())
        .then((resume) => resume.doc.id)
      console.log({ resumeId })

      await fetch('/api/agent-career-application', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          // email,
          phone,
          // message: message.trim() || 'No additional message provided.',
          resume: resumeId,
        }),
      })
        .then((rs) => rs.json())
        .then((rs) => console.log(rs))

      setIsLoading(false)
      setShowSuccessAlert(true)

      // Reset form after successful submission
      setTimeout(() => {
        setName('')
        // setEmail('')
        setPhone('')
        // setMessage('')
        setResumeUploadFieldText('Upload your resume')
        setShowSuccessAlert(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting application:', error)
      setIsLoading(false)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Remove non-digits
    if (value.length <= 11) {
      setPhone(value)
    }
  }

  // const [isLoading, setIsLoading] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  // const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')

  // localized helper (placeholders-only)
  const lang = useSSRLanguage()
  const L = (en: string, bn: string) => (lang === 'en' ? en : bn)

  // const [position, setPosition] = useState(positions[0] ?? '')
  // const [message, setMessage] = useState('')
  const [resumeUploadFieldText, setResumeUploadFieldText] = useState(
    L(
      'Upload your resume. (Pdf format & maximum 12mb)',
      'আপনার রেজুমে আপলোড করুন। (পিডিএফ ফরম্যাট, সর্বোচ্চ ১২এমবি)',
    ),
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-[#9C8639] rounded-2xl bg-[#FFFFFFCC]
  grid grid-cols-2 gap-x-4 gap-y-8 md:gap-7 xl:gap-8 
  p-6 xl:p-12 z-10"
    >
      {/* name input */}
      <div className="col-span-2 ">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={L('Name', 'নাম')}
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
          required
          disabled={isLoading}
        />
      </div>
      {/* phone number input */}
      <div className="col-span-2">
        <Input
          value={phone}
          onChange={handlePhoneChange}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={L('Phone Number', 'ফোন নম্বর')}
          onKeyDown={(e) => {
            if (!/^[0-9]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
              e.preventDefault()
            }
          }}
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* gender select  */}
      <div className="col-span-1 md:col-span-1">
        <Select
          required
          value={gender}
          onValueChange={(val) => setGender(val)}
          disabled={isLoading}
        >
          <SelectTrigger className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6">
            <SelectValue placeholder={L('Gender', 'লিঙ্গ')} />
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
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder={L('Age', 'বয়স')}
          min={1}
          onWheel={(e) => e.currentTarget.blur()}
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      <div className="col-span-1 md:col-span-1">
        <Input
          type="text"
          placeholder={L('Present Occupation', 'বর্তমান পেশা')}
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>
      {/* sum assumed input */}
      <div className="relative col-span-1 md:col-span-1">
        <Input
          type="text"
          placeholder={L('Preferred Working Area', 'পছন্দের কর্মক্ষেত্র')}
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6"
        />
      </div>

      {/* CV Upload Field */}
      <div className="col-span-2">
        {/* <Input
          type="text"
          placeholder="CV"
          readOnly
          className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 cursor-pointer w-1/2"
          onClick={() => document.getElementById('cvUpload')?.click()}
        />
        <input
          type="file"
          id="cvUpload"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            const fileName = e.target.files?.[0]?.name
            if (fileName) {
              const input = document.querySelector('input[placeholder="CV"]') as HTMLInputElement
              if (input) input.value = fileName
            }
          }}
        /> */}
        {/* <label
          htmlFor="resume"
          className="bg-[#B09B67] text-white font-semibold text-[13px] px-4 py-2 cursor-pointer transition-colors hover:bg-[#a29050] select-none"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          Browse File
        </label> */}
        <div
          className={`flex w-full rounded-[6px] shadow-[0px_0px_5px_0px_#00000040] overflow-hidden bg-[#FCF4EB] md:bg-white ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}
        >
          <label
            htmlFor="resume"
            className="shadow-[0px_0px_5px_0px_#00000040] flex flex-1 items-center cursor-pointer"
          >
            <span className="shadow-[0px_0px_5px_0px_#00000040] rounded-[10px] rounded-r-none px-5 py-2 xl:px-6 xl:py-4 block w-full text-[#737373] text-[13px] select-none">
              {resumeUploadFieldText}
            </span>
            <input
              onChange={(e) =>
                setResumeUploadFieldText(
                  e.target.files?.[0]?.name ?? L('Upload your resume', 'আপনার রেজুমে আপলোড করুন'),
                )
              }
              required
              type="file"
              accept="application/pdf,application/msword"
              id="resume"
              className="hidden"
              disabled={isLoading}
            />
          </label>
          <label
            htmlFor="resume"
            className="shadow-[0px_0px_5px_0px_#00000040] flex justify-center items-center bg-[#B09B67] text-white font-semibold text-[13px] px-4 py-2 cursor-pointer transition-colors hover:bg-[#a29050] select-none"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            {L('Browse File', 'ফাইল নির্বাচন করুন')}
          </label>
        </div>
      </div>

      {/* CONSENT CHECKBOX */}
      <div className="col-span-2">
        <label className="flex items-start gap-3">
          <Checkbox
            id="agree-terms"
            checked={agreeTerms}
            onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
          />
          <span className="text-xs md:text-sm leading-relaxed">
            By clicking <span className="font-semibold">Submit</span>, you agree to our{' '}
            <Link
              href="/terms-condition"
              className="underline text-[#FF6600] hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              terms and conditions
            </Link>{' '}
            and Shanta Life{' '}
            <Link
              href="/privacy-policy"
              className="underline text-[#FF6600] hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacy policy
            </Link>
            .
          </span>
        </label>
      </div>

      {/* <div className="col-span-1 flex items-center">
        <Button
          type="button"
          onClick={() => document.getElementById('cvUpload')?.click()}
          className="bg-[#9C8639] text-white global-p2 font-light rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 w-full"
        >
          Upload
        </Button>
      </div> */}

      {/* submit button */}
      <div className="col-span-2">
        <Button
          disabled={isLoading || !agreeTerms}
          aria-disabled={isLoading || !agreeTerms}
          className={[
            'bg-[#9C8639] text-white uppercase font-semibold rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 w-full',
            !agreeTerms || isLoading ? 'opacity-60 cursor-not-allowed' : '',
          ].join(' ')}
        >
          {isLoading
            ? L('Sending...', 'পাঠানো হচ্ছে...')
            : showSuccessAlert
              ? L('Sent', 'পাঠানো হয়েছে')
              : L('Submit', 'জমা দিন')}
        </Button>
      </div>
    </form>
  )
}

export default OnboardingJoinForm
