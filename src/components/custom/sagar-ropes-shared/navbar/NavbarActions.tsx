'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Footer } from '@/payload-types'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import Link from 'next/link'
import Address from 'public/assets/icons/address.png'
import At from 'public/assets/icons/attherate.png'
import Facebook from 'public/assets/icons/facebook.png'
import Linkdin from 'public/assets/icons/linkdin.png'
import Phone from 'public/assets/icons/phone.png'
import WhatsApp from 'public/assets/icons/whatsapp.png'
// import NavbarDialog from './NavbarDialog'
import SearchBarSection from './SearchBarSection'
import { default as Pattern02 } from '/public/assets/images/BOpattern.png'
import Blur4 from '/public/assets/images/Blur4.png'
import { NavbarData, SearchSuggestion } from './ServerNavbar'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  footerData: Footer
  suggestions: SearchSuggestion[]
  queryFormRecipientEmails: NavbarData['queryFormRecipientEmails']
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M11.7849 10.9712C11.6082 11.1479 11.4314 11.3247 11.2546 11.5015C11.329 11.6938 11.4093 11.8801 11.4955 12.0606C11.8403 12.7825 12.2793 13.4101 12.8127 13.9434C14.6793 15.8101 16.6743 17.5484 18.7976 19.1585C18.9493 19.2735 19.1016 19.3878 19.2546 19.5015C19.4314 19.3247 19.6082 19.1479 19.7849 18.9712C19.6712 18.8182 19.5569 18.6659 19.4419 18.5142C17.8319 16.3909 16.0935 14.3959 14.2269 12.5292C13.6935 11.9959 13.0659 11.5568 12.344 11.2121C12.1636 11.1259 11.9772 11.0456 11.7849 10.9712Z"
        fill="#0E0E47"
      />
      <path
        d="M11.7849 10.9712C11.6082 11.1479 11.4314 11.3247 11.2546 11.5015C11.329 11.6938 11.4093 11.8801 11.4955 12.0606C11.8403 12.7825 12.2793 13.4101 12.8127 13.9434C14.6793 15.8101 16.6743 17.5484 18.7976 19.1585C18.9493 19.2735 19.1016 19.3878 19.2546 19.5015C19.4314 19.3247 19.6082 19.1479 19.7849 18.9712C19.6712 18.8182 19.5569 18.6659 19.4419 18.5142C17.8319 16.3909 16.0935 14.3959 14.2269 12.5292C13.6935 11.9959 13.0659 11.5568 12.344 11.2121C12.1636 11.1259 11.9772 11.0456 11.7849 10.9712Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        d="M11.7849 10.9712C11.6082 11.1479 11.4314 11.3247 11.2546 11.5015C11.329 11.6938 11.4093 11.8801 11.4955 12.0606C11.8403 12.7825 12.2793 13.4101 12.8127 13.9434C14.6793 15.8101 16.6743 17.5484 18.7976 19.1585C18.9493 19.2735 19.1016 19.3878 19.2546 19.5015C19.4314 19.3247 19.6082 19.1479 19.7849 18.9712C19.6712 18.8182 19.5569 18.6659 19.4419 18.5142C17.8319 16.3909 16.0935 14.3959 14.2269 12.5292C13.6935 11.9959 13.0659 11.5568 12.344 11.2121C12.1636 11.1259 11.9772 11.0456 11.7849 10.9712Z"
        fill="black"
        fillOpacity="0.2"
      />
      <circle cx="7.5" cy="7.5" r="6.5" stroke="#0E0E47" strokeWidth="2" />
      <circle cx="7.5" cy="7.5" r="6.5" stroke="black" strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="7.5" cy="7.5" r="6.5" stroke="black" strokeOpacity="0.2" strokeWidth="2" />
    </svg>
  )
}

function NavbarActions({ footerData, suggestions, queryFormRecipientEmails }: Props) {
  const footer = footerData
  return (
    <Sheet>
      {/* trigger btn */}
      <div className="flex items-center justify-between w-[200px] xl:w-[250px] 2xl:w-[300px]">
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open search and contact sheet"
            className="w-[20%] flex items-center justify-center cursor-pointer"
          >
            <SearchIcon />
          </button>
        </SheetTrigger>

        <div className="w-[80%]">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="
                transition-all duration-300 ease-in
                rounded-none font-proxima font-bold uppercase global-p3
                bg-transparent hover:bg-dark-3
                text-dark-3 hover:text-white-1
                border-[2px] border-dark-3 w-full
              "
            >
              Contact Us
            </Button>
          </SheetTrigger>
        </div>
      </div>

      <SheetContent
        side="right"
        className="
          z-[9999]
          w-[85%] lg:max-w-[520px]
          bg-dark-1
          shadow-none
          backdrop-blur-none
          border border-none
          p-0
          [&>button]:hidden
        "
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle className="font-proxima uppercase text-dark-3">Contact Us</SheetTitle>
            <SheetDescription>
              Dummy sheet text. Search/contact content will be designed later.
            </SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <div
          className="
          relative z-30
        px-11
        py-6
        flex flex-col justify-evenly xl:justify-around h-full
        "
        >
          {/* footer grid-1 data */}
          <div
            className="relative z-30
        space-y-[35px] xl:space-y-[40px] 
        flex flex-col "
          >
            {/* logo */}
            {typeof footer?.logo === 'object' && footer?.logo?.url && (
              <Link
                href={`/`}
                className="relative z-20
            hover:scale-110 transition-all duration-300 ease-in
            w-[150px] xl:w-[220px]
            aspect-[701/179]"
              >
                <Image
                  src={footer?.logo?.url}
                  alt="Brand Logo"
                  fill
                  quality={90}
                  placeholder="blur"
                  sizes="100vw"
                  blurDataURL={footer?.logoBlurDataURL || ''}
                />
              </Link>
            )}
            {/* brand text */}
            <div className="font-manrope text-white-1 global-p4 z-20 w-[80%]">
              {footer?.branding?.introText}
            </div>
            {/* ISO image */}
            {typeof footer?.isoBadgeImage === 'object' && footer?.isoBadgeImage?.url && (
              <div
                className="relative z-20
            w-[85px] xl:w-[135px] 2xl:w-[160px]
            aspect-[544/204]"
              >
                <Image
                  src={footer?.isoBadgeImage?.url}
                  alt="ISO Badge Image"
                  fill
                  quality={90}
                  placeholder="blur"
                  sizes="100vw"
                  blurDataURL={footer?.isoBadgeImageBlurDataURL || ''}
                />
              </div>
            )}
          </div>

          {/* searchbar */}
          <div className="relative z-[9999]">
            <SearchBarSection suggestions={suggestions} />
          </div>
          {/* Query Dialog */}
          <div className="relative z-30 flex items-center space-x-7">
            <div className="font-manrope font-bold text-[12px] md:text-[12px] lg:text-[14px] xl:text-[20px] 2xl:text-[22px] leading-[140%] tracking-[-0.6px] text-white-1">
              Make an Inquiry ?
            </div>
            {/* <div className="">
              <NavbarDialog
                queryFormRecipientEmails={queryFormRecipientEmails}
                trigger={
                  <Button
                    variant="link"
                    className="
          group
          relative
          inline-flex items-center gap-2
          overflow-visible
          p-0
          font-manrope font-bold uppercase 
          text-[10px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px] leading-[133.333%]
          text-white-1
          no-underline hover:no-underline
          transition-all duration-300 ease-out
          hover:text-white-1

          after:content-['']
          after:absolute
          after:left-0
          after:right-0
          after:bottom-[1px]
          after:h-[1px]
          after:bg-cyan
          after:transition-all
          after:duration-300
          after:ease-out
          hover:after:h-[2px]
        "
                  >
                    <span>ASK US ANYTHING</span>

                    <span
                      className="
            relative
            inline-flex shrink-0 items-center justify-center
            overflow-visible
            w-3 xl:w-4
            h-3 xl:h-4 
          "
                    >
                      <Image
                        src="/assets/icons/btn01Icon.png"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className="
              h-full w-full object-contain
              transition-none
              group-hover:animate-[askBtnIconDropLeft_0.65s_ease-out_forwards]
            "
                      />
                    </span>
                  </Button>
                }
              />
            </div> */}
          </div>

          {/* footer grid-4 data */}
          <div className="relative z-30 space-y-4 xl:space-y-5">
            <div className="font-proxima font-bold text-[12px] md:text-[12px] lg:text-[14px] xl:text-[20px] 2xl:text-[22px] leading-[140%] tracking-[-0.6px] text-white-1">
              CONTACT US
            </div>

            {/* address */}
            <div
              className="flex items-start 
                            space-x-1 xl:space-x-2 w-[80%] lg:w-full text-center lg:text-start"
            >
              {/* icon */}
              <div
                className="lg:mt-[1px] xl:mt-[3px]
                              w-[15px] 2xl:w-[20px]
                            aspect-square
                            "
              >
                <Image
                  src={Address}
                  alt="Address icon"
                  width={Address?.width}
                  height={Address?.height}
                  placeholder="blur"
                  blurDataURL={Address?.blurDataURL}
                  quality={100}
                  sizes="100vw"
                  className="w-full h-full"
                />
              </div>
              {/* address */}
              <Link
                target="_blank"
                // href="https://www.google.com/maps?ll=23.770282,90.40626&z=16&t=m&hl=en-GB&gl=US&mapclient=embed&cid=8200627424099091507"
                href={footer?.factorySection?.mapUrl || ''}
              >
                <div className="text-white-2 font-manrope global-p4">
                  <LocalizedRichText
                    en={footer?.factorySection?.facAddress}
                    bn={footer?.factorySection?.facAddress}
                  />
                </div>
              </Link>
            </div>
            {/* phone */}
            <div
              className="flex items-start 
                            space-x-1 xl:space-x-2"
            >
              {/* icon */}
              <div
                className="lg:mt-[2px]
                              w-[15px] 2xl:w-[20px]
                            aspect-square
                            "
              >
                <Image
                  src={Phone}
                  alt="Phone icon"
                  width={Phone?.width}
                  height={Phone?.height}
                  placeholder="blur"
                  blurDataURL={Phone?.blurDataURL}
                  quality={100}
                  sizes="100vw"
                  className="w-full h-full"
                />
              </div>
              {/* Phone */}
              <div className="text-white-2 font-manrope global-p4">
                <a href={`tel:${footer?.factorySection?.phone}`}>{footer?.factorySection?.phone}</a>
              </div>
            </div>
            {/* social */}
            <div
              className="flex
          space-x-1 lg:space-x-2 xl:space-x-2.5 2xl:space-x-3"
            >
              {/* facebook */}
              <Link
                href={footer?.social?.facebookUrl || ''}
                target="_blank"
                className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px] 
          h-[30px] xl:h-[35px] 2xl:h-[40px] 
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
              >
                <Image
                  src={Facebook}
                  alt="Facebook icon"
                  width={Facebook?.width}
                  height={Facebook?.height}
                  quality={90}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={Facebook?.blurDataURL}
                  className="aspect-auto 
                w-[10px] xl:w-[13px] 
                group-hover:w-[13px]  xl:group-hover:w-[16px] 
              transition-all duration-300 ease-in"
                />
              </Link>
              {/* whats app */}
              <Link
                href={footer?.social?.whatsApp || ''}
                target="_blank"
                className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px] 
          h-[30px] xl:h-[35px] 2xl:h-[40px] 
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
              >
                <Image
                  src={WhatsApp}
                  alt="WhatsApp icon"
                  width={WhatsApp?.width}
                  height={WhatsApp?.height}
                  quality={90}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={WhatsApp?.blurDataURL}
                  className="aspect-auto 
                w-[18px] xl:w-[23px] 
                group-hover:w-[20px] xl:group-hover:w-[26px] 
              transition-all duration-300 ease-in"
                />
              </Link>
              {/* At the rate app */}
              <Link
                href={`mailto:${footer?.factorySection?.email}` || ''}
                className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px] 
          h-[30px] xl:h-[35px] 2xl:h-[40px] 
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
              >
                <Image
                  src={At}
                  alt="At icon"
                  width={At?.width}
                  height={At?.height}
                  quality={90}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={At?.blurDataURL}
                  className="aspect-auto 
                w-[18px] xl:w-[23px] 
                group-hover:w-[20px] xl:group-hover:w-[26px] 
              transition-all duration-300 ease-in"
                />
              </Link>
              {/* Linkdin */}
              <Link
                href={footer?.social?.linkedinUrl || ''}
                target="_blank"
                className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px] 
          h-[30px] xl:h-[35px] 2xl:h-[40px] 
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
              >
                <Image
                  src={Linkdin}
                  alt="Linkdin icon"
                  width={Linkdin?.width}
                  height={Linkdin?.height}
                  quality={90}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={Linkdin?.blurDataURL}
                  className="aspect-auto 
                w-[18px] xl:w-[22px] 
                group-hover:w-[20px] xl:group-hover:w-[25px] 
              transition-all duration-300 ease-in"
                />
              </Link>
            </div>
          </div>

          {/* pattern 2 */}
          {footer?.showPatternDesign && (
            <div
              className="invisible md:visible absolute right-0 top-0 z-10 opacity-60 
            w-[40%] 
            h-[35%] 2xl:h-[30%]"
            >
              <Image
                fill
                src={Pattern02}
                alt="pattern image 02"
                quality={90}
                sizes="100vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={Pattern02?.blurDataURL}
              />
            </div>
          )}
          <div className="invisible md:visible absolute right-0 top-0 z-10 w-full h-[50%]">
            <Image
              fill
              src={Blur4}
              alt="Blur4 image "
              quality={90}
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Blur4?.blurDataURL}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NavbarActions
