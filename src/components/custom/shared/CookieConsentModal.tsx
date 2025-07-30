'use client'

import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import GlobalButton from './GlobalButton'

const STORAGE_KEY = 'shantaLifeCookie'
type CookieStatus = 'accepted' | 'rejected'

const COOKIE_POLICY_TEXT =
  'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this, as outlined in our Cookie Policy.'

const CookieConsentBanner: FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem(STORAGE_KEY)
      if (!val) setShow(true)
    }
  }, [])

  const handleAction = (status: CookieStatus) => {
    localStorage.setItem(STORAGE_KEY, status)
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      className="
        fixed z-[9999] inset-x-0 bottom-0 flex justify-center pointer-events-none
      "
    >
      <div
        className="
          pointer-events-auto w-[95vw] sm:w-[420px] md:w-[480px] 2xl:w-[550px]
          mx-auto bg-white shadow-xl border border-[#e0e0e0]
          rounded-t-2xl sm:rounded-2xl
          px-5 py-6 sm:p-7
          mb-2 sm:mb-6
          flex flex-col items-start
          animate-fade-in-up
        "
      >
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-[#22223b]">Cookies Settings</h2>
        <p className="mb-2 text-[#22223b] text-sm sm:text-base leading-snug">
          {COOKIE_POLICY_TEXT}
        </p>
        <Link
          href="/privacy-policy"
          className="underline text-[#9C8639] text-sm sm:text-base mb-3 sm:mb-5"
        >
          Read more
        </Link>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full mt-1">
          <GlobalButton
            text="Accept"
            variant="primary"
            className="w-full sm:w-[150px] text-base font-semibold"
            onClick={() => handleAction('accepted')}
          />
          <GlobalButton
            text="Reject"
            variant="outline"
            className="w-full sm:w-[150px] text-base font-semibold"
            onClick={() => handleAction('rejected')}
          />
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(80px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.35s cubic-bezier(.16,1,.3,1) both;
        }
      `}</style>
    </div>
  )
}

export default CookieConsentBanner
