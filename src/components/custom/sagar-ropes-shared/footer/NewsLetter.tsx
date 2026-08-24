// 'use client'

// import { Input } from '@/components/ui/input'
// import React, { useRef, useState } from 'react'
// import ButtonArrowAnimated, { ButtonArrowAnimatedRef } from '../buttons/ButtonArrowAnimated'
// import { toast } from 'sonner'

// type Props = {
//   className?: string
// }

// function NewsLetter({ className }: Props) {
//   const arrowRef = useRef<ButtonArrowAnimatedRef | null>(null)
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()

//     if (loading) return

//     const form = event.currentTarget
//     const formData = new FormData(form)
//     const email = String(formData.get('email') || '').trim()

//     if (!email) {
//       toast.error('Email is required.')
//       return
//     }

//     try {
//       setLoading(true)

//       const res = await fetch('/api/newsletter-subscribe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//         }),
//       })

//       const data = await res.json()

//       if (!res.ok || !data?.success) {
//         toast.error(data?.message || 'Something went wrong.')
//         return
//       }

//       toast.success(data?.message || 'Subscribed successfully.')
//       form.reset()
//     } catch (error) {
//       console.error('Newsletter submit error:', error)
//       toast.error('Something went wrong. Please try again later.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className={className}>
//       <form
//         onSubmit={handleSubmit}
//         className="
//           relative isolate overflow-hidden

//           w-[200px]
//           lg:w-[200px]
//           xl:w-[275px]
//           2xl:w-[300px]

//           h-[36px]
//           lg:h-[40px]
//           xl:h-[50px]
//           2xl:h-[58px]

//           rounded-[8px]
//           lg:rounded-[10px]
//           xl:rounded-[14px]
//           2xl:rounded-[18px]

//           bg-[#006C674D]
//         "
//         style={{
//           backdropFilter: 'blur(10px)',
//           WebkitBackdropFilter: 'blur(10px)',
//           boxShadow: '0 10px 24px rgba(0, 108, 103, 0.28)',
//         }}
//       >
//         <Input
//           name="email"
//           type="email"
//           placeholder="Enter Your Email"
//           required
//           disabled={loading}
//           className="
//             relative z-10
//             h-full w-full
//             border-0 bg-transparent

//             pl-[10px]
//             sm:pl-[11px]
//             md:pl-[12px]
//             lg:pl-[14px]
//             xl:pl-[20px]

//             pr-[34px]
//             sm:pr-[36px]
//             md:pr-[38px]
//             lg:pr-[42px]
//             xl:pr-[56px]
//             2xl:pr-[58px]

//             font-grift
//             text-[10px]
//             lg:text-[11px]
//             xl:text-[13px]
//             2xl:text-[14px]
//             font-bold

//             text-white-1
//             placeholder:text-white-1/35
//             placeholder:tracking-[0.6px]
//             lg:placeholder:tracking-[0.8px]
//             xl:placeholder:tracking-[1px]

//             disabled:cursor-not-allowed
//             disabled:opacity-70

//             focus-visible:ring-0
//             focus-visible:ring-offset-0
//             focus-visible:outline-none
//           "
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           aria-label="Submit newsletter email"
//           onMouseEnter={() => arrowRef.current?.enter()}
//           onMouseLeave={() => arrowRef.current?.leave()}
//           className="
//             absolute top-1/2 z-20
//             flex -translate-y-1/2 items-center justify-center
//             cursor-pointer

//             right-[7px]
//             sm:right-[8px]
//             md:right-[9px]
//             lg:right-[10px]
//             xl:right-[16px]

//             h-[18px] w-[20px]
//             sm:h-[19px] sm:w-[21px]
//             md:h-[20px] md:w-[22px]
//             lg:h-[22px] lg:w-[24px]
//             xl:h-[30px] xl:w-[32px]

//             disabled:cursor-not-allowed
//             disabled:opacity-60
//           "
//         >
//           <ButtonArrowAnimated ref={arrowRef} />
//         </button>

//         <span
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute inset-0 z-30

//             rounded-[8px]
//             sm:rounded-[9px]
//             md:rounded-[10px]
//             lg:rounded-[12px]
//             xl:rounded-[16px]
//             2xl:rounded-[18px]
//           "
//           style={{
//             boxShadow: `
//               inset 0 0 0 1px rgba(0, 108, 103, 0.45),
//               inset 1.5px 1.5px 0 rgba(255, 251, 252, 0.45),
//               inset -1.5px -1.5px 0 rgba(255, 251, 252, 0.28),
//               inset 0 -2px 8px rgba(0, 108, 103, 0.25),
//               0 0 0 1px rgba(0, 108, 103, 0.25),
//               0 8px 18px rgba(110, 201, 199, 0.35)
//             `,
//           }}
//         />
//       </form>
//     </div>
//   )
// }

// export default NewsLetter

'use client'

import { Input } from '@/components/ui/input'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import ButtonArrowAnimated, { ButtonArrowAnimatedRef } from '../buttons/ButtonArrowAnimated'

type Props = {
  className?: string
}

const EMAIL_MAX = 254
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function NewsLetter({ className }: Props) {
  const arrowRef = useRef<ButtonArrowAnimatedRef | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (loading) return

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get('email') || '')
      .trim()
      .slice(0, EMAIL_MAX)

    if (!email) {
      toast.error('Email is required.')
      return
    }

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    if (email.length > EMAIL_MAX) {
      toast.error(`Email must be ${EMAIL_MAX} characters or less.`)
      return
    }

    try {
      setLoading(true)

      const res = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data?.success) {
        toast.error(data?.message || 'Something went wrong.')
        return
      }

      toast.success(data?.message || 'Subscribed successfully.')
      form.reset()
    } catch (error) {
      console.error('Newsletter submit error:', error)
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="
          relative isolate overflow-hidden

          w-[200px]
          lg:w-[200px]
          xl:w-[275px]
          2xl:w-[300px]

          h-[36px]
          lg:h-[40px]
          xl:h-[50px]
          2xl:h-[58px]

          rounded-[8px]
          lg:rounded-[10px]
          xl:rounded-[14px]
          2xl:rounded-[18px]

          bg-[#006C674D]
        "
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 10px 24px rgba(0, 108, 103, 0.28)',
        }}
      >
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
          disabled={loading}
          autoComplete="email"
          maxLength={EMAIL_MAX}
          className="
            footer-newsletter-input

            relative z-10
            h-full w-full
            border-0 bg-transparent

            pl-[10px]
            sm:pl-[11px]
            md:pl-[12px]
            lg:pl-[14px]
            xl:pl-[20px]

            pr-[34px]
            sm:pr-[36px]
            md:pr-[38px]
            lg:pr-[42px]
            xl:pr-[56px]
            2xl:pr-[58px]

            font-grift
            text-[10px]
            lg:text-[11px]
            xl:text-[13px]
            2xl:text-[14px]
            font-bold

            text-white-1
            placeholder:text-white-1/35
            placeholder:tracking-[0.6px]
            lg:placeholder:tracking-[0.8px]
            xl:placeholder:tracking-[1px]

            disabled:cursor-not-allowed
            disabled:opacity-70

            focus-visible:ring-0
            focus-visible:ring-offset-0
            focus-visible:outline-none
          "
        />

        <button
          type="submit"
          disabled={loading}
          aria-label="Submit newsletter email"
          onMouseEnter={() => arrowRef.current?.enter()}
          onMouseLeave={() => arrowRef.current?.leave()}
          className="
            absolute top-1/2 z-20
            flex -translate-y-1/2 items-center justify-center
            cursor-pointer

            right-[7px]
            sm:right-[8px]
            md:right-[9px]
            lg:right-[10px]
            xl:right-[16px]

            h-[18px] w-[20px]
            sm:h-[19px] sm:w-[21px]
            md:h-[20px] md:w-[22px]
            lg:h-[22px] lg:w-[24px]
            xl:h-[30px] xl:w-[32px]

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <ButtonArrowAnimated ref={arrowRef} />
        </button>

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-30

            rounded-[8px]
            sm:rounded-[9px]
            md:rounded-[10px]
            lg:rounded-[12px]
            xl:rounded-[16px]
            2xl:rounded-[18px]
          "
          style={{
            boxShadow: `
              inset 0 0 0 1px rgba(0, 108, 103, 0.45),
              inset 1.5px 1.5px 0 rgba(255, 251, 252, 0.45),
              inset -1.5px -1.5px 0 rgba(255, 251, 252, 0.28),
              inset 0 -2px 8px rgba(0, 108, 103, 0.25),
              0 0 0 1px rgba(0, 108, 103, 0.25),
              0 8px 18px rgba(110, 201, 199, 0.35)
            `,
          }}
        />
      </form>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .footer-newsletter-input:-webkit-autofill,
            .footer-newsletter-input:-webkit-autofill:hover,
            .footer-newsletter-input:-webkit-autofill:focus,
            .footer-newsletter-input:-webkit-autofill:active {
              -webkit-text-fill-color: #fffbfc !important;
              caret-color: #fffbfc !important;
              background-color: transparent !important;
              box-shadow: 0 0 0 1000px rgba(0, 108, 103, 0.3) inset !important;
              -webkit-box-shadow: 0 0 0 1000px rgba(0, 108, 103, 0.3) inset !important;
              transition: background-color 999999s ease-in-out 0s !important;
            }

            .footer-newsletter-input:-webkit-autofill::first-line {
              font-family: var(--font-grift), sans-serif !important;
              font-weight: 700 !important;
              color: #fffbfc !important;
            }
          `,
        }}
      />
    </div>
  )
}

export default NewsLetter
