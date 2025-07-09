import Footer from '@/components/custom/shared/Footer'
import TopHeader from '@/components/custom/shared/TopHeader'
import React from 'react'
import './fonts.css'
import './styles.css'
import GlobalContactButtons from '@/components/custom/shared/GlobalContactButtons'
import Navbar from '@/components/custom/shared/Navbar/Navbar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Shanta Life',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/mainlogo.png" />
      </head>
      <body>
        <main className="bg-[#F6EDDD] min-h-screen relative font-avenir">
          <TopHeader className="hidden fixed top-0 right-0 left-0 z-50 lg:flex" />
          {/* <Navbar className="absolute top-0 lg:top-[80px] 2xl:top-[115px] left-0 right-0 z-50 " /> */}
          {/* <Navbar className="top-[0px] lg:top-[80px] 2xl:top-[115px] left-0 right-0 z-50" /> */}
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
          <GlobalContactButtons />
        </main>
      </body>
    </html>
  )
}
