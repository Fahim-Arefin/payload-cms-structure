import Footer from '@/components/custom/shared/Footer'
import TopHeader from '@/components/custom/shared/TopHeader'
import React from 'react'
// import './fonts.css'
import './styles.css'
import GlobalContactButtons from '@/components/custom/shared/GlobalContactButtons'
import Navbar from '@/components/custom/shared/Navbar/Navbar'
import FooterMobile from '@/components/custom/shared/FooterMobile'
import CookieConsentBanner from '@/components/custom/shared/CookieConsentModal'
import { Metadata } from 'next'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import Providers from '@/context/providers'
import { Noto_Sans_Bengali, Noto_Serif_Bengali } from 'next/font/google'

// const notoBengali = Noto_Sans_Bengali({
//   subsets: ['bengali'],
//   weight: ['400', '500', '700'],
//   display: 'swap',
//   variable: '--font-bn', // expose a CSS variable for Tailwind/use anywhere
// })

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-bn', // expose a CSS variable for Tailwind/use anywhere
})

export const metadata: Metadata = {
  title:
    'Shanta Life Insurance | Life Insurance Company in Bangladesh | Welcome to Shanta Life Insurance',
  description: 'Protecting what matters most with innovative and tailored insurance solutions.',
  keywords: [
    'Shanta Life Insurance',
    'Insurance Bangladesh',
    'Family Protection Plans',
    'Life Insurance in Bangladesh',
    'Welcome to Shanta Life Insurance',
    'Insurance',
    'Life Insurance',
    'Insurance Policy',
    'Insurance Coverage',
    'Insurance Plans',
    'Term Life Insurance',
    'Whole Life Insurance',
    'Universal Life Insurance',
    'Life Insurance Quotes',
    'Life Insurance Rates',
    'Affordable Life Insurance',
    'Life Insurance Benefits',
    'Life Insurance Calculator',
    'Family Life Insurance',
    'Life Insurance for Seniors',
    'Shanta Life Insurance Plans',
    'Shanta Life Insurance Quotes',
    'Shanta Insurance Coverage',
    'Shanta Life Insurance Benefits',
    'Best life insurance policy for families',
    'Affordable term life insurance for young adults',
    'How to choose a life insurance plan',
    'Benefits of whole life insurance vs. term life insurance',
    'Shanta Life Insurance customer reviews',
    'Life insurance in Bangladesh',
    'Best life insurance company in Bangladesh',
    'Affordable life insurance in Bangladesh',
    'Shanta Life Insurance office in Bangladesh',
    'Investment Options in Bangladesh',
    'Metlife Bangladesh',
    'Guardian life insurance',
    'Pragati Life Insurance',
    'Sonali Life Insurance',
    'Delta Life Insurance',
    'Agricultural Insurance',
    'Pet insurance',
    'Jiban Bima Corporation',
    'Rupali Life Insurance',
    'Fareast Life Insurance',
    'National Life',
    'Alico',
    'Crop Insurance',
    'Financial planning',
    'Retirement planning',
    'Education planning',
    'Life insurance and savings',
    'Tax benefits of life insurance',
    'Investment',
    'DPS',
    'Savings Planning',
    'Loan',
    'Importance of life insurance',
    'How to apply for life insurance',
    'Life insurance for different life stages',
    'Understanding life insurance terms',
    'Life insurance myths and facts',
    'Savings for beginners',
    'How to get rich',
    'Areas of finance',
    'Health Insurance',
    'Cancer Insurance',
    'Loan',
    'Legal Liability',
    'Best Company in Bangladesh',
    'Health insurance plans',
    'Compound Interest',
    'Tax Return',
    'Money managers',
    'Investment companies',
    'Investment opportunities in Bangladesh',
    'Investment management companies',
    'Best investment options',
    'Online investment',
    'Low-risk investment',
    'Hospital Names',
    'Square Hospital',
    'Ibn Sina Medical College Hospital',
    'CMH',
    'Anower Khan Modern Hospital Ltd',
    'BRB Hospital Limited',
    'PRAAVA Health',
    'York Hospital Ltd.',
    'Anower Khan Modern Diagnostic Centre & Hospital Outdoor Service',
    'Evercare Hospitals Dhaka',
    'Bangladesh Specialized Hospital PLC',
    'Evercare Hospitals Chittagong',
    'Shahabuddin Medical College & Hospital',
    'Ashulia Women and Children Hospital (AWCH)',
    'Mother & Child Care, Mirpur-6',
    'Citibank, N.A',
    'Commercial Bank of Ceylon PLC',
    'HSBC',
    'Standard Chartered Bank',
    'Woori Bank',
    'AB Bank PLC',
    'Bank Asia PLC',
    'BRAC Bank PLC',
    'City Bank PLC',
    'Dhaka Bank PLC',
    'Dutch-Bangla Bank PLC',
    'Eastern Bank PLC',
    'IFIC Bank PLC',
    'Mutual Trust Bank PLC',
    'Premier Bank PLC',
    'Prime Bank PLC',
    'Trust Bank PLC',
    'United Commercial Bank PLC',
    'Uttara Bank PLC',
    'IDLC',
    'IPDC',
  ],
  openGraph: {
    title:
      'Shanta Life Insurance | Life Insurance Company in Bangladesh | Welcome to Shanta Life Insurance',
    description: 'Protecting what matters most with innovative and tailored insurance solutions.',
    url: 'https://shantalife.com/',
    images: [
      {
        url: 'https://shantalife.com/assets/img/logo/logo-SLI.svg',
      },
    ],
    siteName: 'shantalife',
  },
  other: {
    'facebook-domain-verification': 'hq1sdzo7wujgmgap4x87q5qhbqotip',
    'google-site-verification': 'V6JFG8AbajjlaJ2TXqUVY8A8yCjOwc047yj_HZcx8As',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" type="image/png" href="/assets/logo/mainlogo_2.png" /> */}
        <link
          rel="icon"
          type="image/png"
          href={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/mainlogo_2.png`}
        />
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
          <main className="bg-[#F6EDDD] min-h-screen relative font-avenir 3xl:max-w-[1925px] 3xl:mx-auto">
            <TopHeader className="hidden fixed top-0 right-0 left-0 z-50 lg:flex" />
            {/* <Navbar className="absolute top-0 lg:top-[80px] 2xl:top-[115px] left-0 right-0 z-50 " /> */}
            {/* <Navbar className="top-[0px] lg:top-[80px] 2xl:top-[115px] left-0 right-0 z-50" /> */}
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <CookieConsentBanner />
            <div className="hidden lg:block">
              <Footer />
            </div>
            <div className="lg:hidden">
              <FooterMobile />
            </div>
            <GlobalContactButtons />
          </main>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </Providers>
      </body>
    </html>
  )
}
