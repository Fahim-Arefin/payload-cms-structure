import React from 'react'
import { NavbarData, SearchSuggestion } from './ServerNavbar'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './Menu'
import MobileNavbar from './MobileNavbar'
import { Footer } from '@/payload-types'
import SearchIcon from '/public/assets/icons/search-icon.png'

type Props = {
  data: NavbarData
  blur: string
  footerData: Footer
  suggestions: SearchSuggestion[]
}

function ClientNavbar({ data, blur, footerData, suggestions }: Props) {
  const logoUrl =
    data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

  return (
    <>
      {/* mobile */}
      {/* <MobileNavbar data={data} blur={blur} suggestions={suggestions} footerData={footerData} /> */}

      <div
        className="hidden lg:flex justify-between 
        fixed inset-x-0 top-6
        z-50 
        xl:max-w-[80%] mx-auto
        h-[60px] lg:h-[65px]
    "
        style={{
          background:
            'linear-gradient(0deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.20) 100%), rgba(255,255,255,0.20)',
        }}
      >
        {/* logo */}
        <div
          className="flex items-center justify-center
          bg-red-200
          w-[15%]
       "
        >
          <div
            className="relative aspect-[90/70]
        hover:scale-110 transition-all duration-300 ease-in
        w-full h-full"
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
        <div className=" grow bg-red-400">
          <Menu data={data} footerData={footerData} suggestions={suggestions} />
        </div>
        <div className="w-[15%] bg-red-200 flex items-center justify-center">
          <div className="p-[9px] w-[36px] h-[36px] flex justify-center items-center bg-[#006C67] rounded-md">
            <Image
              src={SearchIcon}
              alt="Search"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              placeholder="blur"
              blurDataURL={SearchIcon.blurDataURL}
              quality={90}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientNavbar
