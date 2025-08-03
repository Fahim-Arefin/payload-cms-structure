import Footer from '@/components/custom/shared/Footer'
import TopHeader from '@/components/custom/shared/TopHeader'
import React from 'react'
import './fonts.css'
import './styles.css'
import GlobalContactButtons from '@/components/custom/shared/GlobalContactButtons'
import Navbar from '@/components/custom/shared/Navbar/Navbar'
import FooterMobile from '@/components/custom/shared/FooterMobile'
import CookieConsentBanner from '@/components/custom/shared/CookieConsentModal'
import { Metadata } from 'next'
import Script from 'next/script'

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
        <link rel="icon" type="image/png" href="/assets/mainlogo_2.png" />
        {/* Google Tag (gtag.js) */}
        <Script
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
        </Script>
        <Script
          src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
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
      </body>
    </html>
  )
}
