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
import { Loader, MailCheck, SendHorizontal, CheckCircle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import LocalizedText from '../shared/LocalizedText'
import useSSRLanguage from '@/hooks/useSSRLanguage'

const positions = [
  // 'Junior IT Executive',
  'IT Project Manager',
  'Head of Agency Business',
  'Full Stack Engineer',
  // 'Mid IT Executive',
  // 'Senior IT Executive',
  // 'Management Trainee',
  // 'Relationship Officer (Internship)',
  // 'Relationship Officer (Full time)',
  // 'Campus Ambassador (Part-time)',
  // 'Campus Ambassador (Full time)',
]

function CareerOpeningForm({ pos, setPos }: { pos: string; setPos: (p: string) => void }) {
  const lang = useSSRLanguage()
  const L = (en: string, bn: string) => (lang === 'en' ? en : bn)

  const [agreeTerms, setAgreeTerms] = useState(false)
  // Validation functions
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
    if (!email.trim()) errors.push('Email is required')
    else if (!validateEmail(email)) errors.push('Please enter a valid email address')
    if (!phone.trim()) errors.push('Phone number is required')
    else if (!validatePhoneNumber(phone))
      errors.push('Please enter a valid Bangladesh mobile number (11 digits starting with 01)')
    if (!pos) errors.push('Please select a job position')

    const file = (document.querySelector('#resume') as HTMLInputElement)?.files?.[0]
    if (!file) errors.push('Resume is required')
    if (!agreeTerms) errors.push('You must agree to the terms and privacy policy to continue')

    return errors
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors)
      return
    }

    setValidationErrors([])
    setIsLoading(true)
    setShowSuccessAlert(false)
    console.log({ name, email, phone, position, message })

    try {
      const resumeFormData = new FormData()
      resumeFormData.append('hogamara', 'let go')
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
          position: pos,
          message: message.trim() || 'No additional message provided.',
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
        setEmail('')
        setPhone('')
        setMessage('')
        setResumeUploadFieldText('Upload your resume')
        setShowSuccessAlert(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting application:', error)
      setIsLoading(false)
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [position, setPosition] = useState(positions[0] ?? '')
  const [message, setMessage] = useState('')
  const [resumeUploadFieldText, setResumeUploadFieldText] = useState(
    L(
      'Upload your resume (Pdf format & maximum 12mb)',
      'আপনার রেজুমে আপলোড করুন (পিডিএফ ফরম্যাট, সর্বোচ্চ ১২এমবি)',
    ),
  )

  // Handle phone input - only allow numbers and limit to 11 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Remove non-digits
    if (value.length <= 11) {
      setPhone(value)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white md:bg-[#FCF4EB] rounded-[12px] h-full px-5 py-6 flex flex-col gap-4 w-full"
    >
      <span className="font-bold text-[#343434] text-lg mb-1 tracking-tight">
        <LocalizedText en="JOIN OUR TEAM" bn="আমাদের সাথে যোগ দিন" />
      </span>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md animate-in fade-in-0 slide-in-from-top-1">
          <ul className="text-sm space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md flex items-center gap-2 animate-in fade-in-0 slide-in-from-top-1">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm font-medium">
            {L(
              "Application sent successfully! We'll get back to you soon.",
              'আবেদন সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
            )}
          </span>
        </div>
      )}
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={L('Name', 'নাম')}
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px]"
        required
        disabled={isLoading}
      />
      <Input
        value={phone}
        onChange={handlePhoneChange}
        placeholder={L('Phone (01XXXXXXXXX)', 'ফোন (০১XXXXXXXXX)')}
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px]"
        required
        disabled={isLoading}
        type="tel"
        maxLength={11}
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={L('Email', 'ইমেইল')}
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px]"
        required
        disabled={isLoading}
        type="email"
      />
      <Select required value={pos} onValueChange={setPos} disabled={isLoading}>
        <SelectTrigger className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none text-[15px]">
          <SelectValue placeholder={L('Select Job Position', 'জব পজিশন সিলেক্ট করুন')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{L('Position', 'পদ')}</SelectLabel>
            {positions.map((position) => (
              <SelectItem value={position} key={position}>
                {position}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* File upload */}
      <div
        className={`flex w-full rounded-[6px] overflow-hidden bg-[#FCF4EB] md:bg-white ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <label htmlFor="resume" className="flex flex-1 items-center cursor-pointer">
          <span className="block w-full text-[#B0B0B0] text-[11px] px-3 py-2 select-none">
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
          className="bg-[#B09B67] text-white font-semibold text-[13px] px-4 py-2 cursor-pointer transition-colors hover:bg-[#a29050] select-none"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          {L('Browse File', 'ব্রাউস ফাইল')}
        </label>
      </div>

      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={L('Your message (optional)', 'আপনার মেসেজ (অপশনাল)')}
        className="bg-[#FCF4EB] md:bg-white rounded-md px-4 py-2 border-none placeholder:text-[#B0B0B0] text-[15px] lg:min-h-[105px] xl:min-h-[70px]"
        rows={2}
        disabled={isLoading}
      />
      {/* <Button
        type="submit"
        className="mt-2 bg-[#ED7125] text-white text-[15px] font-semibold py-2 px-5 rounded-[5px] w-full md:w-auto md:self-end hover:bg-[#d15d15] transition-colors"
      >
        Send Application
      </Button> */}
      {/* CONSENT CHECKBOX */}
      <div className="mt-1">
        <label className="flex items-start gap-3">
          <Checkbox
            id="agree-terms"
            checked={agreeTerms}
            onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
          />
          <span className="text-xs leading-relaxed">
            {lang === 'en' ? (
              <>
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
              </>
            ) : (
              <>
                <span className="font-semibold">বাটনে</span>  ক্লিক করার
                মাধ্যমে আপনি আমাদের{' '}
                <Link
                  href="/terms-condition"
                  className="underline text-[#FF6600] hover:opacity-90"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  শর্তাবলী (Terms &amp; Conditions)
                </Link>{' '}
                এবং শানতা লাইফের{' '}
                <Link
                  href="/privacy-policy"
                  className="underline text-[#FF6600] hover:opacity-90"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  গোপনীয়তা নীতি (Privacy Policy)
                </Link>{' '}
                এর সাথে সম্মত হচ্ছেন।
              </>
            )}
          </span>
        </label>
      </div>

      <GlobalButton
        size="small"
        className={`font-semibold w-full md:w-auto md:self-end ${
          isLoading || !agreeTerms ? 'opacity-60 cursor-not-allowed' : ''
        }`}
        text={
          isLoading
            ? L('Sending...', 'পাঠানো হচ্ছে...')
            : showSuccessAlert
              ? L('Sent', 'পাঠানো হয়েছে')
              : L('Submit', 'জমা দিন')
        }
        variant="primary"
        disabled={isLoading || !agreeTerms}
        aria-disabled={isLoading || !agreeTerms}
      >
        {isLoading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : showSuccessAlert ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <SendHorizontal className="h-4 w-4" />
        )}
        <span className="text-sm">
          {isLoading
            ? L('Sending...', 'পাঠানো হচ্ছে...')
            : showSuccessAlert
              ? L('Sent', 'পাঠানো হয়েছে')
              : L('Submit', 'জমা দিন')}
        </span>
      </GlobalButton>
    </form>
  )
}

export default CareerOpeningForm
