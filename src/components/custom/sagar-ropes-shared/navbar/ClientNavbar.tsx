import React from 'react'
import { NavbarData, SearchSuggestion } from './ServerNavbar'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './Menu'
import MobileNavbar from './MobileNavbar'
import { Footer } from '@/payload-types'

type Props = {
  data: NavbarData
  blur: string
  footerData: Footer
  suggestions: SearchSuggestion[]
  queryFormRecipientEmails: NavbarData['queryFormRecipientEmails']
}

function ClientNavbar({ data, blur, footerData, suggestions, queryFormRecipientEmails }: Props) {
  const logoUrl =
    data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

  return (
    <>
      {/* mobile */}
      <MobileNavbar
        data={data}
        blur={blur}
        suggestions={suggestions}
        footerData={footerData}
        queryFormRecipientEmails={data?.queryFormRecipientEmails}
      />

      <div
        className="fixed inset-x-0 z-50 w-full hidden lg:flex 
     h-[60px] lg:h-[75px] xl:h-[80px] 2xl:h-[85px]
    border-b-[3px] border-b-dark-3 backdrop-blur-[15px]
    "
        style={{
          background:
            'linear-gradient(0deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.20) 100%), rgba(255,255,255,0.20)',
        }}
      >
        {/* logo */}
        <div
          className="flex items-center justify-center
                pl-4 lg:pl-6 xl:pl-10 2xl:pl-12
                w-[200px] lg:w-[220px] xl:w-[300px] 2xl:w-[400px]
       "
        >
          <div
            className="relative aspect-[701/179]
        hover:scale-110 transition-all duration-300 ease-in
        w-[100px] lg:w-[140px] xl:w-[180px] 2xl:w-[200px] "
          >
            <Link href="/" aria-label="Home">
              {typeof data.branding.logo === 'object' && data.branding.logo?.url && (
                <Image
                  src={logoUrl}
                  alt="Company logo"
                  fill
                  className="object-contain w-full h-full"
                  priority
                  placeholder="blur"
                  blurDataURL={blur || ''}
                  quality={90}
                />
              )}
            </Link>
          </div>
        </div>
        {/* border border-black */}
        <div className=" grow ">
          <Menu
            data={data}
            footerData={footerData}
            suggestions={suggestions}
            queryFormRecipientEmails={data?.queryFormRecipientEmails}
          />
        </div>
      </div>
    </>
  )
}

export default ClientNavbar
