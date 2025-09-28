'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader, MailCheck, SendHorizontal } from 'lucide-react'
import { useState } from 'react'
import GlobalButton from '../GlobalButton'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import LocalizedText from '../LocalizedText'
import LocalizedString from '../LocalizedString'

function ContactUsSection() {
  const [sendButtonText, setSendButtonText] = useState('Send Message')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const lang = useSSRLanguage()
  const L = (en: string, bn: string) => (lang === 'en' ? en : bn)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const sendMessageHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setSendButtonText('Sending...')
    console.log({ firstName, lastName, email, phone, message })

    await fetch('/api/emails/ask-us', {
      method: 'POST',
      // credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        address: '',
        message,
      }),
    })
      .then((rs) => rs.json())
      .then((rs) => {
        setSendButtonText('Message Sent')
        setTimeout(() => {
          setSendButtonText('Send Message')
        }, 1500)
      })
  }

  // what to display on buttons based on language
  const renderBtnLabel = () => {
    if (sendButtonText === 'Sending...') return L('Sending...', 'Sending...')
    if (sendButtonText === 'Message Sent') return L('Message Sent', 'Message Sent')
    return L('Send Message', 'জমা দিন')
  }
  return (
    <div
      className="bg-[#F6EDDD] relative 
      px-5 
           md:px-24 
           lg:px-[70px]  
           xl:px-[80px]
      h-[200px] md:h-[330px] lg:h-[480px] xl:h-[550px] 2xl:h-[700px]
      "
    >
      {/* main img */}
      {/*  h-[63%] md:h-[75%] lg:h-[65%] xl:h-[70%] 2xl:h-[489px]  */}
      <div
        className=" 
      z-20 absolute -bottom-1 left-5 
      lg:left-12
      xl:left-20
      2xl:left-28
      w-[60%] lg:w-[50%] 
      aspect-[891/489]"
      >
        {/* <img
          src="/assets/solutions/individual/saving-and-investment/web/askUsImage.png"
          alt=""
          className=" h-full w-full"
        /> */}
        <div className="relative h-full w-full">
          <Image
            fill
            src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/web/askUsImage.png`}
            alt="Contant us image"
            sizes="50vw"
          />
        </div>
      </div>

      {/* message arrow img  */}
      <div
        className="hidden lg:block absolute lg:bottom-10 xl:bottom-20 2xl:bottom-28 inset-x-0 left-[36%] 
             w-[200px] md:w-[250px] lg:w-[250px] xl:w-[300px] 2xl:w-[460px]
             rotate-[20.397deg] z-10 aspect-[730/300]"
      >
        <div className="w-full h-full relative">
          <Image
            src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/web/contactUs3.png`}
            alt=""
            fill
          />
        </div>
      </div>

      {/* hanging phone  */}
      <div
        className="z-10 absolute top-0 right-[85%]
                    h-1/3 aspect-[80/310]"
      >
        <div className="relative w-full h-full">
          <Image
            src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/web/contactUs4.png`}
            alt="hanging phone"
            fill
          />
        </div>
      </div>
      {/* hanging phone  */}
      <div
        className="z-10 absolute top-0 right-[75%]
                    h-[40%] aspect-[70/310]"
      >
        <div className="relative w-full h-full">
          <Image
            src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/web/contactUs5.png`}
            alt="hanging phone"
            fill
          />
        </div>
      </div>
      {/* hanging phone  */}
      <div
        className="z-10 absolute top-0 right-[65%]
                    h-1/3 aspect-[80/310]"
      >
        <div className="relative w-full h-full">
          <Image
            src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/web/contactUs4.png`}
            alt="hanging phone"
            fill
          />
        </div>
      </div>
      {/* hanging phone  */}
      <div
        className="z-10 absolute top-0 right-[55%]
                    h-1/3 aspect-[80/310]"
      >
        <div className="relative w-full h-full">
          <Image
            src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/web/contactUs5.png`}
            alt="hanging phone"
            fill
          />
        </div>
      </div>

      {/* form */}
      <div
        className="hidden  
        lg:grid grid-cols-2 h-full items-center gap-2"
      >
        <div></div>
        <div
          className="col-span-1 
          lg:py-8 lg:px-4
          xl:py-8 2xl:px-6 
          "
        >
          <h3 className="global-h2">
            <LocalizedText en="Have a Question?" bn="প্রশ্ন করুন" />
          </h3>
          <h1
            className="global-h2 font-medium
          lg:mb-6 xl:mb-6 2xl:mb-8"
          >
            <LocalizedText en="Ask Us!" bn="আমাদের" />
          </h1>

          <form
            className="relative z-30 lg:space-y-3 xl:space-y-4 2xl:space-y-12"
            onSubmit={sendMessageHandler}
          >
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-lg text-gray-800 2xl:mb-1">
                  <LocalizedText en="First Name" bn="ফার্স্ট নাম" />
                </label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder=""
                  className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0
                  h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg text-gray-800 2xl:mb-1">
                  <LocalizedText en="Last Name" bn="লাস্ট নাম" />
                </label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder=""
                  className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0 
                  h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-lg text-gray-800 2xl:mb-1">
                  <LocalizedText en="Email" bn="ইমেইল" />
                </label>
                <Input
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value
                    setEmail(value)
                    if (!value) {
                      setEmailError('Email is required')
                    } else if (!emailRegex.test(value)) {
                      setEmailError('Enter a valid email address')
                    } else {
                      setEmailError('')
                    }
                  }}
                  type="email"
                  placeholder=""
                  className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0
                  h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                />
                {emailError && <p className="text-red-500 text-xs pl-1">{emailError}</p>}
              </div>
              <div className="flex flex-col">
                <label className="text-lg text-gray-800 2xl:mb-1">
                  <LocalizedText en="Phone Number" bn="ফোন নাম্বার" />
                </label>
                <Input
                  value={phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '') // Remove non-digits
                    if (value.length > 11) value = value.slice(0, 11)
                    setPhone(value)
                    if (value.length === 0) {
                      setPhoneError('Phone number is required')
                    } else if (value.length !== 11) {
                      setPhoneError('Phone number must be exactly 11 digits')
                    } else {
                      setPhoneError('')
                    }
                  }}
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={11}
                  placeholder=""
                  className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0
                  h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                />
                {phoneError && <p className="text-red-500 text-xs pl-1">{phoneError}</p>}
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col">
              <label className="text-lg text-gray-800 2xl:mb-1">
                <LocalizedText en="Message" bn="মেসেজ" />
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message.."
                className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0
                h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                rows={3}
              />
            </div>

            {/* CONSENT (desktop) */}
            <div className="">
              <label className="flex items-start gap-3 text-black">
                <Checkbox
                  id="agree-terms-desktop"
                  checked={agreeTerms}
                  onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
                />
                <span className="text-xs leading-relaxed">
                  By clicking <span className="font-semibold">Send Message</span>, you agree to our{' '}
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

            {/* Button */}
            <div className="pt-4 flex justify-end">
              {/* <Button
                  variant="primary"
                  className=" text-white shadow-md cursor-not-allowed
                
                text-[10px] md:text-[12px] lg:text-[12px] xl:text-[14px] 2xl:text-[14px]"
                >
                  {sendButtonText}
                </Button> */}
              <GlobalButton
                size="small"
                className={[
                  'w-[100px] md:w-[120px] lg:w-[140px] xl:w-[150px] 2xl:w-[150px]',
                  !agreeTerms || sendButtonText === 'Sending...'
                    ? 'opacity-60 cursor-not-allowed'
                    : '',
                ].join(' ')}
                variant="primary"
                disabled={!agreeTerms || sendButtonText === 'Sending...'}
                aria-disabled={!agreeTerms || sendButtonText === 'Sending...'}
              >
                {sendButtonText == 'Sending...' ? (
                  <Loader />
                ) : sendButtonText == 'Message Sent' ? (
                  <MailCheck />
                ) : (
                  <SendHorizontal />
                )}

                <span className="text-sm">
                  <LocalizedString en={sendButtonText} bn="জমা দিন " />
                </span>
              </GlobalButton>
            </div>
          </form>
        </div>
      </div>

      {/* mobile version */}
      <div className="lg:hidden grid grid-cols-2 h-full gap-2">
        <div></div>
        <div className="flex flex-col justify-center items-center text-center space-y-3 md:space-y-5">
          <div>
            <h3 className="global-h3">
              <LocalizedText en="Have a Question?" bn="প্রশ্ন করুন" />
            </h3>
            <h1 className="global-h1 font-medium">
              <LocalizedText en="Ask Us!" bn="আমাদের" />
            </h1>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                className="shadow-md z-30
             text-[10px] md:text-[12px] 
             h-[30px] px-2.5 rounded-md gap-1"
              >
                <SendHorizontal style={{ width: '12px', height: '12px' }} />
                <div>Send Message</div>
              </Button>
              {/* <GlobalButton size="small" className="" text="Send Message" variant="primary" /> */}
            </DialogTrigger>
            {/* bg-[#F6EDDD]/70 backdrop-blur-xl  */}

            <DialogPortal>
              {/* <DialogOverlay className="bg-transparent backdrop-filter-none shadow-none fixed inset-0 z-50" /> */}
              <DialogContent
                className="bg-[#f5deb3]/70 backdrop-blur-xl
            border-none p-4 md:p-6 rounded-md max-w-[90vw] md:max-w-[80%]"
              >
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                </DialogHeader>
                {/* FORM CONTENT */}
                <form
                  className="space-y-3 text-black text-sm font-light"
                  onSubmit={sendMessageHandler}
                >
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm">
                        <LocalizedText en="First Name" bn="ফার্স্ট নাম" />
                      </label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="rounded-none border-0 border-b border-black focus-visible:ring-0 px-0 h-[28px]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm">
                        <LocalizedText en="Last Name" bn="লাস্ট নাম" />
                      </label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="rounded-none border-0 border-b border-black focus-visible:ring-0 px-0 h-[28px]"
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm">
                        <LocalizedText en="Email" bn="ইমেইল" />
                      </label>
                      <Input
                        value={email}
                        onChange={(e) => {
                          const value = e.target.value
                          setEmail(value)
                          if (!value) {
                            setEmailError('Email is required')
                          } else if (!emailRegex.test(value)) {
                            setEmailError('Enter a valid email address')
                          } else {
                            setEmailError('')
                          }
                        }}
                        className="rounded-none border-0 border-b border-black focus-visible:ring-0 px-0 h-[28px]"
                      />
                      {emailError && <p className="text-red-500 text-xs pl-1">{emailError}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm">
                        <LocalizedText en="Phone Number" bn="ফোন নাম্বার" />
                      </label>
                      <Input
                        value={phone}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '') // Remove non-digits
                          if (value.length > 11) value = value.slice(0, 11)
                          setPhone(value)
                          if (value.length === 0) {
                            setPhoneError('Phone number is required')
                          } else if (value.length !== 11) {
                            setPhoneError('Phone number must be exactly 11 digits')
                          } else {
                            setPhoneError('')
                          }
                        }}
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={11}
                        className="rounded-none border-0 border-b border-black focus-visible:ring-0 px-0 h-[28px]"
                      />
                      {phoneError && <p className="text-red-500 text-xs pl-1">{phoneError}</p>}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="flex flex-col">
                    <label className="text-sm">
                      <LocalizedText en="Message" bn="মেসেজ" />
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message..."
                      className="rounded-none border-0 border-b border-black focus-visible:ring-0 px-0 placeholder:text-black/50 placeholder:text-[12px]
                    h-[28px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                      rows={3}
                    />
                  </div>

                  {/* CONSENT (mobile) */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 text-black">
                      <Checkbox
                        id="agree-terms-mobile"
                        checked={agreeTerms}
                        onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
                      />
                      <span className="text-xs leading-relaxed">
                        By clicking <span className="font-semibold">Send Message</span>, you agree
                        to our{' '}
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

                  {/* Submit */}
                  <div className="pt-4 flex justify-end">
                    <Button
                      variant="primary"
                      disabled={!agreeTerms || sendButtonText === 'Sending...'}
                      aria-disabled={!agreeTerms || sendButtonText === 'Sending...'}
                      className={[
                        'shadow-md z-30 text-[10px] md:text-[12px] h-[30px] px-2.5 rounded-md gap-1',
                        !agreeTerms || sendButtonText === 'Sending...'
                          ? 'opacity-60 cursor-not-allowed'
                          : '',
                      ].join(' ')}
                    >
                      {sendButtonText == 'Sending...' ? (
                        <Loader style={{ width: '12px', height: '12px' }} />
                      ) : sendButtonText == 'Message Sent' ? (
                        <MailCheck style={{ width: '12px', height: '12px' }} />
                      ) : (
                        <SendHorizontal style={{ width: '12px', height: '12px' }} />
                      )}

                      <span>
                        <LocalizedString en={sendButtonText} bn="জমা দিন " />
                      </span>
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ContactUsSection
