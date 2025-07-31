'use client'

import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react' // Any close icon, or use your own SVG

const STORAGE_KEY = 'shantaLifeCookie'
type CookieStatus = 'accepted' | 'rejected'

// const COOKIE_POLICY_TEXT =
//   'We use cookies and similar technologies to help personalize content and provide a better experience. By clicking accept, you agree to this, as outlined in our'
const COOKIE_POLICY_TEXT =
  'We use cookies to improve your experience. By clicking "Accept" you agree on this according to our '
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
          pointer-events-auto w-fit max-w-[95vw] md:max-w-[85%]
          mx-auto bg-white shadow-xl border-2 border-[#ED7125]
          rounded-2xl
          px-5 py-4 sm:px-6 sm:py-5
          mb-2 sm:mb-6
          flex flex-col items-start
          animate-fade-in-up
          relative
        "
      >
        {/* Close Button */}
        <button
          onClick={() => setClosed(true)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white/70 backdrop-blur-[16.67px] hover:bg-white/80 rounded-full p-1.5 transition-all shadow-sm border border-gray-200"
          aria-label="Close cookie consent"
        >
          <X className="w-3 h-3" />
        </button>

        {/* <h2 className="text-[14px] md:text-xl font-bold mb-2 text-[#22223b]">Cookies Settings</h2> */}
        <div className="flex items-center gap-2 pr-8">
          <span className="text-[#22223b] text-[12px] md:text-base leading-snug text-justify">
            {COOKIE_POLICY_TEXT}{' '}
            <Link
              href="/privacy-policy"
              className="underline text-[#9C8639] text-[12px] md:text-base"
            >
              Privacy Policy.
            </Link>
            <span className="inline-flex gap-1.5 ml-2">
              <Button
                variant="primary"
                className="px-2 py-0.5 text-[9px] md:text-xs font-semibold h-auto min-h-0 leading-tight"
                onClick={() => handleAction('accepted')}
              >
                Accept
              </Button>
              <Button
                variant="outline"
                className="px-2 py-0.5 text-[9px] md:text-xs font-semibold h-auto min-h-0 leading-tight"
                onClick={() => handleAction('rejected')}
              >
                Reject
              </Button>
            </span>
          </span>
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
