'use client'

import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react' // Any close icon, or use your own SVG

const STORAGE_KEY = 'shantaLifeCookie'
type CookieStatus = 'accepted' | 'rejected'

const COOKIE_POLICY_TEXT =
  'We use cookies and similar technologies to help personalize content and provide a better experience. By clicking accept, you agree to this, as outlined in our'

const CookieConsentBanner: FC = () => {
  const [show, setShow] = useState(false)
  const [closed, setClosed] = useState(false)

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

  // Hide if not showing or closed this session
  if (!show || closed) return null

  return (
    <div className="fixed z-[9999] inset-x-0 bottom-0 flex justify-center pointer-events-none">
      <div
        className="
          pointer-events-auto w-[95vw] md:w-[75%]
          mx-auto bg-white shadow-xl border border-[#e0e0e0]
          rounded-t-2xl sm:rounded-2xl
          px-5 py-6 sm:p-7
          mb-2 sm:mb-6
          flex flex-col items-start
          animate-fade-in-up
          relative
        "
      >
        {/* Close Button */}
        <button
          onClick={() => setClosed(true)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 rounded-full p-1 transition-colors"
          aria-label="Close cookie consent"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg sm:text-xl font-bold mb-2 text-[#22223b]">Cookies Settings</h2>
        <div>
          <p className="mb-2 text-[#22223b] text-justify text-sm sm:text-base leading-snug">
            {COOKIE_POLICY_TEXT}{' '}
            <Link
              href="/privacy-policy"
              className="underline text-[#9C8639] text-sm sm:text-base"
            >
              Privacy Policy.
            </Link>
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-3 w-full">
          <Button
            variant="primary"
            className="w-[80px] text-base font-semibold"
            onClick={() => handleAction('accepted')}
          >
            Accept
          </Button>
          <Button
            variant="outline"
            className="w-[80px] text-base font-semibold"
            onClick={() => handleAction('rejected')}
          >
            Reject
          </Button>
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
