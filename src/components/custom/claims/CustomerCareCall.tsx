'use client'

import useSSRLanguage from '@/hooks/useSSRLanguage'
// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import { Loader, MailCheck, SendHorizontal, X } from 'lucide-react' // ShadCN uses lucide-react for icons
import GlobalButton from '../shared/GlobalButton'
import LocalizedText from '../shared/LocalizedText'

// helper: EN → BN digits
function toBengaliNumber(num: string) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num.replace(/\d/g, (d) => bnDigits[parseInt(d, 10)])
}

export function ContactComponent() {
  // const [showPopover, setShowPopover] = useState(false)
  // const [userPhone, setUserPhone] = useState('')
  // const [confirmButtonText, setConfirmButtonText] = useState('Confirm')

  // console.log('show', showPopover)
  const lang = useSSRLanguage()
  const phone = '09610889900'
  const phoneBn = toBengaliNumber(phone)

  const handleCallClick = () => {
    window.location.href = 'tel:09610889900'
    // const now = new Date()
    // const hour = now.getHours()

    // if (hour >= 17 && hour < 18) {
    //   setShowPopover(false)
    //   window.location.href = 'tel:09610889900'
    //   console.log('withing hour')
    // } else {
    //   console.log('not withing hour')
    //   setShowPopover(true)
    // }
  }

  // const handleConfirm = async () => {
  //   setConfirmButtonText('Confirming...')
  //   setUserPhone('')

  //   await fetch('/api/emails/corporate-claim', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       phone: userPhone,
  //     }),
  //   }).then(() => {
  //     setConfirmButtonText('Confirmed')
  //     setTimeout(() => {
  //       setConfirmButtonText('Confirm')
  //       setShowPopover(false)
  //     }, 1500)
  //   })
  // }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative ">
      <h4 className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        {lang === 'en' ? (
          <>
            For any further queries please contact{' '}
            <a href={`tel:${phone}`} className="text-[#9C8639]">
              {phone}
            </a>
          </>
        ) : (
          <>
            যে কোনো তথ্যের জন্য অনুগ্রহ করে{' '}
            <a href={`tel:${phone}`} className="text-[#9C8639]">
              {phoneBn}
            </a>{' '}
            নম্বরে যোগাযোগ করুন।
          </>
        )}
      </h4>
      {/* <GlobalButton
        variant="outline"
        className="flex items-center gap-2 bg-yellow-800 text-white hover:bg-yellow-700 border-yellow-900
            w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[150px]
            h-[32px] md:h-[34px] lg:h-[38px] xl:h-[40px] 2xl:h-[42px]"
        onClick={handleCallClick}
        size="small"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h1.6a1 1 0 01.9.55L9.5 7a1 1 0 01-.1 1.04l-1.5 2a16.99 16.99 0 007.06 7.06l2-1.5a1 1 0 011.04-.1l3.45 1.8a1 1 0 01.55.9V19a2 2 0 01-2 2h-1C10.61 21 3 13.39 3 4v1z"
          />
        </svg>
        <LocalizedText en="09610889900" bn="০৯৬১০৮৮৯৯০০" />
      </GlobalButton> */}
      {/* <Popover open={showPopover}>
        <PopoverTrigger asChild>
          <GlobalButton
            variant="outline"
            className="flex items-center gap-2 bg-yellow-800 text-white hover:bg-yellow-700 border-yellow-900
            w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[150px]
            h-[32px] md:h-[34px] lg:h-[38px] xl:h-[40px] 2xl:h-[42px]"
            onClick={handleCallClick}
            size="small"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h1.6a1 1 0 01.9.55L9.5 7a1 1 0 01-.1 1.04l-1.5 2a16.99 16.99 0 007.06 7.06l2-1.5a1 1 0 011.04-.1l3.45 1.8a1 1 0 01.55.9V19a2 2 0 01-2 2h-1C10.61 21 3 13.39 3 4v1z"
              />
            </svg>
            09610889900
          </GlobalButton>
        </PopoverTrigger>

        <PopoverContent className="w-72 space-y-2">
          <div className="flex justify-between items-start">
            <div className="text-sm font-medium text-gray-800">
              Customer care not available. Please leave your number:
            </div>
            <button
              onClick={() => setShowPopover(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <Input
            placeholder="Your phone number"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
          <Button onClick={handleConfirm} className="w-full bg-yellow-800 hover:bg-yellow-700">
            {confirmButtonText == 'Confirming...' ? (
              <Loader className="inline mb-1" />
            ) : confirmButtonText == 'Confirmed' ? (
              <MailCheck className="inline mb-1" />
            ) : (
              <SendHorizontal className="inline mb-1" />
            )}

            <span className="text-base">{confirmButtonText}</span>
          </Button>
        </PopoverContent>
      </Popover> */}
    </div>
  )
}
