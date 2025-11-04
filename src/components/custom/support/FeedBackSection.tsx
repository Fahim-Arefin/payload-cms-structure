// src/sections/FeedBackSection.tsx
'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader, MailCheck, SendHorizontal } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedString from '../shared/LocalizedString'
import LocalizedText from '../shared/LocalizedText'
import useSSRLanguage from '@/hooks/useSSRLanguage'

// 👉 keep your actual type import, but we won't use MediaField anywhere
import type { SupportFeedbackFormBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: SupportFeedbackFormBlockType
}

/** Accepts string or object (Payload media), returns best-effort URL */
function mediaToUrl(src: any): string {
  if (!src) return ''
  if (typeof src === 'string') return src
  if (typeof src === 'object') {
    // prefer top-level url
    if (typeof src.url === 'string' && src.url) return src.url
    // fallback: first sizes url if available
    if (src.sizes && typeof src.sizes === 'object') {
      const first = Object.values(src.sizes)[0] as any
      if (first && typeof first.url === 'string') return first.url
    }
  }
  return ''
}

function FeedBackSection({ block }: Props) {
  // ---- localization
  const lang = useSSRLanguage()
  const t = (en: string, bn: string) => (lang === 'bn' ? bn : en)

  // ==== CMS fields ====
  const bgUrl = mediaToUrl(block?.backgroundImage)
  const titleEn = block?.title ?? ''
  const titleBn = block?.titleBN ?? ''
  const highlightEn = block?.highlightedTitle ?? ''
  const highlightBn = block?.highlightedTitleBN ?? ''
  const rightTitleEn = block?.rightTitle ?? ''
  const rightTitleBn = block?.rightTitleBN ?? ''
  const rightBtnEn = block?.rightButtonText ?? ''
  const rightBtnBn = block?.rightButtonTextBN ?? ''

  // ==== form state (unchanged)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [sendButtonText, setSendButtonText] = useState<'Send Feedback' | 'Sending...' | 'Feedback Sent'>('Send Feedback')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [feedback, setFeedback] = useState('')
  const [requiredError, setRequiredError] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const localizedSendText =
    sendButtonText === 'Sending...'
      ? t('Sending...', 'পাঠানো হচ্ছে...')
      : sendButtonText === 'Feedback Sent'
        ? t('Feedback Sent', 'ফিডব্যাক পাঠানো হয়েছে')
        : t('Send Feedback', 'সেন্ড ফিডব্যাক')

  const sendFeedbackHandler = async () => {
    if (!name || !email || !phone || !address || !feedback) {
      setRequiredError(true)
      setTimeout(() => setRequiredError(false), 3000)
      return
    }
    setSendButtonText('Sending...')
    try {
      await fetch('/api/emails/feedback', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, address, feedback }),
      }).then((r) => r.json())
      setSendButtonText('Feedback Sent')
      setTimeout(() => setSendButtonText('Send Feedback'), 1500)
    } catch {
      setSendButtonText('Send Feedback')
    }
  }

  return (
    <div
      className="
        relative overflow-hidden rounded-[8px] h-auto 
        py-[50px] lg:py-[70px] xl:py-[100px] 2xl:py-[120px]
        xl:h-[700px] 2xl:h-[820px]
      "
    >
      {/* Background layer using CMS image (mobile & desktop) */}
      <div
        className="lg:hidden absolute inset-0 z-0 rounded-[8px] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url('${bgUrl}')`,
        }}
      />
      <div
        className="hidden lg:block absolute inset-0 z-0 rounded-[8px] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url('${bgUrl}')`,
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 text-white w-[80%] lg:w-[85%] xl:w-[72%] mx-auto">
        <h1
          className="text-[18px] md:text-[22px] lg:text-[28px] xl:text-[33px] 2xl:text-[40px] uppercase font-semibold lg:font-normal
        mb-6 lg:mb-8 xl:mb-12 2xl:mb-20 "
        >
          <LocalizedHighlighted
            textEn={titleEn}
            textBn={titleBn}
            highlightEn={highlightEn}
            highlightBn={highlightBn}
            highlightClassName="text-[#ED7125]"
          />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          {/* Column 1 */}
          <div className="space-y-5 xl:space-y-8 mb-5 xl:mb-0">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('Name', 'নাম')}
              className="bg-white text-black w-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] rounded-[8px] lg:rounded-[10px] xl:rounded-[12px] h-[45px] lg:h-[50px] xl:h-[60px]"
            />
            <div>
              <Input
                value={email}
                onChange={(e) => {
                  const value = e.target.value
                  setEmail(value)
                  if (value.trim() === '') setEmailError(t('Email is required', 'ইমেইল প্রয়োজন'))
                  else if (!emailRegex.test(value)) setEmailError(t('Enter a valid email address', 'সঠিক ইমেইল লিখুন'))
                  else setEmailError('')
                }}
                type="email"
                placeholder={t('Email', 'ইমেইল')}
                className="bg-white text-black w-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] rounded-[8px] lg:rounded-[10px] xl:rounded-[12px] h-[45px] lg:h-[50px] xl:h-[60px]"
              />
              {emailError && <p className="text-red-500 text-sm pl-1">{emailError}</p>}
            </div>
            <div>
              <Input
                value={phone}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '')
                  if (value.length > 11) value = value.slice(0, 11)
                  setPhone(value)
                  if (value.length === 0) setPhoneError(t('Phone number is required', 'ফোন নম্বর প্রয়োজন'))
                  else if (value.length !== 11)
                    setPhoneError(t('Phone number must be exactly 11 digits', 'ফোন নম্বর ১১ সংখ্যার হতে হবে'))
                  else setPhoneError('')
                }}
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder={t('Phone', 'ফোন')}
                className="bg-white text-black w-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] rounded-[8px] lg:rounded-[10px] xl:rounded-[12px] h-[45px] lg:h-[50px] xl:h-[60px]"
              />
              {phoneError && <p className="text-red-500 text-sm pl-1">{phoneError}</p>}
            </div>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('Address', 'ঠিকানা')}
              className="bg-white text-black w-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] rounded-[8px] lg:rounded-[10px] xl:rounded-[12px] h-[45px] lg:h-[50px] xl:h-[60px]"
            />

            {/* Consent (desktop) */}
            <div className="hidden lg:block">
              <label className="flex items-start gap-3">
                <Checkbox
                  id="agree-terms-desktop"
                  checked={agreeTerms}
                  onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
                />
                <span className="text-xs md:text-sm leading-relaxed">
                  <LocalizedText en="By clicking " bn="এখানে ক্লিক করার মাধ্যমে, " />
                  <span className="font-semibold"><LocalizedText en="Send Feedback" bn="আপনি আমাদের " /></span>
                  <LocalizedText en=", you agree to our " bn="" />
                  <Link href="/terms-condition" className="underline text-[#FF6600] hover:opacity-90" target="_blank" rel="noopener noreferrer">
                    <LocalizedText en="terms and conditions" bn="টার্মস এন্ড কন্ডিশনস " />
                  </Link>{' '}
                  <LocalizedText en="and " bn=", ও " />
                  <Link href="/privacy-policy" className="underline text-[#FF6600] hover:opacity-90" target="_blank" rel="noopener noreferrer">
                    <LocalizedText en="privacy policy" bn="প্রাইভেসি পলিসিতে " />
                  </Link>
                  <LocalizedText en="." bn="সম্মত করছেন।" />
                </span>
              </label>
            </div>

            <Button
              onClick={sendFeedbackHandler}
              variant="primary"
              disabled={sendButtonText === 'Sending...' || !agreeTerms}
              aria-disabled={sendButtonText === 'Sending...' || !agreeTerms}
              className={[
                'hidden lg:block h-[45px] lg:h-[50px] xl:h-[60px] lg:w-[180px] xl:w-[240px]',
                'lg:rounded-[6px] xl:rounded-[8px] font-normal lg:text-[16px] xl:text-[18px]',
                sendButtonText === 'Sending...' || !agreeTerms ? 'opacity-60 cursor-not-allowed' : '',
              ].join(' ')}
            >
              {sendButtonText == 'Sending...' ? <Loader className="inline mb-1" /> : sendButtonText == 'Feedback Sent' ? <MailCheck className="inline mb-1" /> : <SendHorizontal className="inline mb-1" />}
              <span className="ml-2.5">{localizedSendText}</span>
            </Button>
          </div>

          {/* Column 2 */}
          <div className="space-y-5 lg:space-y-0 ">
            <div>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t('Write your feedback', 'আপনার মন্তব্য লিখুন')}
                className="shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] w-full 
                  h-[150px] lg:h-[258px] xl:h-[332px] bg-white text-black p-5 rounded-[8px] lg:rounded-[10px] xl:rounded-[12px]"
              />
              {requiredError && <p className="text-red-500 text-sm">{t('Please fill out all the fields', 'সব ঘর পূরণ করুন')}</p>}
            </div>

            {/* Consent (mobile) */}
            <div className="lg:hidden mb-2">
              <label className="flex items-start gap-3">
                <Checkbox
                  id="agree-terms-mobile"
                  checked={agreeTerms}
                  onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
                />
                <span className="text-xs md:text-sm leading-relaxed">
                  <LocalizedText en="By clicking " bn="এখানে ক্লিক করার মাধ্যমে, " />
                  <span className="font-semibold"><LocalizedText en="Send Feedback" bn="আপনি আমাদের " /></span>
                  <LocalizedText en=", you agree to our " bn="" />
                  <Link href="/terms-condition" className="underline text-[#FF6600] hover:opacity-90" target="_blank" rel="noopener noreferrer">
                    <LocalizedText en="terms and conditions" bn="টার্মস এন্ড কন্ডিশনস " />
                  </Link>{' '}
                  <LocalizedText en="and " bn=", ও " />
                  <Link href="/privacy-policy" className="underline text-[#FF6600] hover:opacity-90" target="_blank" rel="noopener noreferrer">
                    <LocalizedText en="privacy policy" bn="প্রাইভেসি পলিসিতে " />
                  </Link>
                  <LocalizedText en="." bn="সম্মত করছেন।" />
                </span>
              </label>
            </div>

            <div>
              <Button
                onClick={sendFeedbackHandler}
                variant="primary"
                disabled={sendButtonText === 'Sending...' || !agreeTerms}
                aria-disabled={sendButtonText === 'Sending...' || !agreeTerms}
                className={[
                  'lg:hidden h-[45px] lg:h-[50px] xl:h-[60px] lg:w-[180px] xl:w-[240px]',
                  'lg:rounded-[6px] xl:rounded-[8px] font-normal flex items-center',
                  sendButtonText === 'Sending...' || !agreeTerms ? 'opacity-60 cursor-not-allowed' : '',
                ].join(' ')}
              >
                {sendButtonText == 'Sending...' ? <Loader className="inline mb-1" /> : sendButtonText == 'Feedback Sent' ? <MailCheck className="inline mb-1" /> : <SendHorizontal className="inline mb-1" />}
                <span className="">{localizedSendText}</span>
              </Button>
            </div>
          </div>

          {/* Column 3: Support info from CMS */}
          <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/60 pt-5 mt-5 lg:mt-0 lg:pt-0 lg:pl-8">
            <div className="space-y-4 lg:pl-2 xl:pl-4">
              <div className="space-y-4">
                <p className="global-span font-medium">
                  <LocalizedText en={rightTitleEn} bn={rightTitleBn} />
                </p>
                <div>
                  <Button
                    variant="outline"
                    className=" h-[45px] lg:h-[50px] xl:h-[60px] 
                      lg:w-[180px] xl:w-[240px]
                      lg:rounded-[6px] xl:rounded-[8px]
                      font-normal
                      lg:text-[16px] xl:text-[18px]"
                  >
                    <LocalizedString en={rightBtnEn || 'Contact'} bn={rightBtnBn || 'যোগাযোগ'} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>{/* grid */}
      </div>{/* Foreground */}
    </div>
  )
}

export default FeedBackSection
