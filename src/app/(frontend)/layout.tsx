import React from 'react'
// import './fonts.css'
import ServerFooter from '@/components/custom/sagar-ropes-shared/footer/ServerFooter'
import ServerNavbar from '@/components/custom/sagar-ropes-shared/navbar/ServerNavbar'
import CookieConsentBanner from '@/components/custom/shared/CookieConsentModal'
import GlobalContactButtons from '@/components/custom/shared/GlobalContactButtons'
import Providers from '@/context/providers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata } from 'next'
import { Noto_Serif_Bengali } from 'next/font/google'
import './styles.css'
import { Toaster } from '@/components/ui/sonner'
import GlobalSocialLinks from '@/components/custom/shared/GlobalSocialLinks'
import GlobalScrollButton from '@/components/custom/shared/GlobalScrollButton'
import SmoothScrollProvider from '@/context/SmoothScrollProvider'

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-bn', // expose a CSS variable for Tailwind/use anywhere
})

// export const metadata: Metadata = {
//   title: 'Sagar Rope |',
//   description: 'Protecting what matters most with innovative and tailored insurance solutions.',
//   keywords: [
//     'Shanta Life Insurance',
//     'Insurance Bangladesh',
//     'Family Protection Plans',
//     'Life Insurance in Bangladesh',
//     'Welcome to Shanta Life Insurance',
//     'Insurance',
//     'Life Insurance',
//     'Insurance Policy',
//     'Insurance Coverage',
//     'Insurance Plans',
//     'Term Life Insurance',
//     'Whole Life Insurance',
//     'Universal Life Insurance',
//     'Life Insurance Quotes',
//     'Life Insurance Rates',
//     'Affordable Life Insurance',
//     'Life Insurance Benefits',
//     'Life Insurance Calculator',
//     'Family Life Insurance',
//     'Life Insurance for Seniors',
//     'Shanta Life Insurance Plans',
//     'Shanta Life Insurance Quotes',
//     'Shanta Insurance Coverage',
//     'Shanta Life Insurance Benefits',
//     'Best life insurance policy for families',
//     'Affordable term life insurance for young adults',
//     'How to choose a life insurance plan',
//     'Benefits of whole life insurance vs. term life insurance',
//     'Shanta Life Insurance customer reviews',
//     'Life insurance in Bangladesh',
//     'Best life insurance company in Bangladesh',
//     'Affordable life insurance in Bangladesh',
//     'Shanta Life Insurance office in Bangladesh',
//     'Investment Options in Bangladesh',
//     'Metlife Bangladesh',
//     'Guardian life insurance',
//     'Pragati Life Insurance',
//     'Sonali Life Insurance',
//     'Delta Life Insurance',
//     'Agricultural Insurance',
//     'Pet insurance',
//     'Jiban Bima Corporation',
//     'Rupali Life Insurance',
//     'Fareast Life Insurance',
//     'National Life',
//     'Alico',
//     'Crop Insurance',
//     'Financial planning',
//     'Retirement planning',
//     'Education planning',
//     'Life insurance and savings',
//     'Tax benefits of life insurance',
//     'Investment',
//     'DPS',
//     'Savings Planning',
//     'Loan',
//     'Importance of life insurance',
//     'How to apply for life insurance',
//     'Life insurance for different life stages',
//     'Understanding life insurance terms',
//     'Life insurance myths and facts',
//     'Savings for beginners',
//     'How to get rich',
//     'Areas of finance',
//     'Health Insurance',
//     'Cancer Insurance',
//     'Loan',
//     'Legal Liability',
//     'Best Company in Bangladesh',
//     'Health insurance plans',
//     'Compound Interest',
//     'Tax Return',
//     'Money managers',
//     'Investment companies',
//     'Investment opportunities in Bangladesh',
//     'Investment management companies',
//     'Best investment options',
//     'Online investment',
//     'Low-risk investment',
//     'Hospital Names',
//     'Square Hospital',
//     'Ibn Sina Medical College Hospital',
//     'CMH',
//     'Anower Khan Modern Hospital Ltd',
//     'BRB Hospital Limited',
//     'PRAAVA Health',
//     'York Hospital Ltd.',
//     'Anower Khan Modern Diagnostic Centre & Hospital Outdoor Service',
//     'Evercare Hospitals Dhaka',
//     'Bangladesh Specialized Hospital PLC',
//     'Evercare Hospitals Chittagong',
//     'Shahabuddin Medical College & Hospital',
//     'Ashulia Women and Children Hospital (AWCH)',
//     'Mother & Child Care, Mirpur-6',
//     'Citibank, N.A',
//     'Commercial Bank of Ceylon PLC',
//     'HSBC',
//     'Standard Chartered Bank',
//     'Woori Bank',
//     'AB Bank PLC',
//     'Bank Asia PLC',
//     'BRAC Bank PLC',
//     'City Bank PLC',
//     'Dhaka Bank PLC',
//     'Dutch-Bangla Bank PLC',
//     'Eastern Bank PLC',
//     'IFIC Bank PLC',
//     'Mutual Trust Bank PLC',
//     'Premier Bank PLC',
//     'Prime Bank PLC',
//     'Trust Bank PLC',
//     'United Commercial Bank PLC',
//     'Uttara Bank PLC',
//     'IDLC',
//     'IPDC',
//   ],
//   openGraph: {
//     title:
//       'Shanta Life Insurance | Life Insurance Company in Bangladesh | Welcome to Shanta Life Insurance',
//     description: 'Protecting what matters most with innovative and tailored insurance solutions.',
//     url: 'https://shantalife.com/',
//     images: [
//       {
//         url: 'https://shantalife.com/assets/img/logo/logo-SLI.svg',
//       },
//     ],
//     siteName: 'shantalife',
//   },
//   other: {
//     'facebook-domain-verification': 'hq1sdzo7wujgmgap4x87q5qhbqotip',
//     'google-site-verification': 'V6JFG8AbajjlaJ2TXqUVY8A8yCjOwc047yj_HZcx8As',
//   },
// }

export const metadata: Metadata = {
  title: {
    default: 'Xynolab',
    template: '%s | Xynolab',
  },
  description:
    'Xynolab manufactures high-quality ropes and twines for marine, fishing, industrial, agricultural, and commercial use.',

  keywords: ['Xynolab'],

  icons: {
    // icon: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/DPXynolabRounder.png`,
    icon: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/favicon.png`,
    // icon: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/DPXynolab.png`,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        {/* <meta name="facebook-domain-verification" content="5zfjmpany80ph0dq1j8hirmw95jtod" /> */}
        {/* Google Tag (gtag.js) */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CP1L2ZN6G5"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CP1L2ZN6G5');
          `}
        </Script> */}
        {/* <Script
          src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          strategy="beforeInteractive"
        /> */}
      </head>
      <body className={`${notoSerifBengali.variable}`}>
        <Providers initialLang="en">
          <SmoothScrollProvider>
            <main className="min-h-screen relative 3xl:max-w-[1925px] 3xl:mx-auto font-grift">
              <ServerNavbar />
              <div className="min-h-screen">
                {children}
                {/* <Toaster position="bottom-right" richColors closeButton /> */}
                <Toaster
                  position="bottom-right"
                  richColors
                  closeButton
                  toastOptions={{
                    classNames: {
                      toast:
                        'group rounded-xl border border-white/10 bg-[#0F172A]/95 text-white shadow-2xl backdrop-blur-md',
                      title: 'font-grift text-[14px] font-semibold text-white',
                      description: 'font-grift text-[12px] text-white/70',
                      actionButton: 'bg-cyan text-white hover:bg-cyan/90 font-grift',
                      cancelButton: 'bg-white/10 text-white hover:bg-white/20 font-grift',
                      closeButton: 'border-white/10 bg-white/5 text-white hover:bg-white/10',
                    },
                  }}
                />
              </div>
              {/* <CookieConsentBanner /> */}
              <div className="">
                <ServerFooter />
              </div>
              <GlobalSocialLinks />
              <GlobalScrollButton />
            </main>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  )
}
