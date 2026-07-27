import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'
import { pageHref } from '@/lib/utils'
import { Footer } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

import Address from 'public/assets/icons/address.png'
import Calender from 'public/assets/icons/calender.png'
import Mail from 'public/assets/icons/mail.png'
import Phone from 'public/assets/icons/phone.png'
// import Ellipse from 'public/assets/images/Full_Ellipse.png'
import Ellipse from 'public/assets/images/introDesign.png'
import type { StaticImageData } from 'next/image'

import At from 'public/assets/icons/at.png'
import AtColored from 'public/assets/icons/atC.png'

import Facebook from 'public/assets/icons/fb.png'
import FacebookColored from 'public/assets/icons/fbC.png'

import Linkdin from 'public/assets/icons/ln.png'
import LinkdinColored from 'public/assets/icons/lnC.png'

import WhatsApp from 'public/assets/icons/wa.png'
import WhatsAppColored from 'public/assets/icons/waC.png'

import LocalizedHighlighted from '../../shared/LocalizedHighlighted'
import LocalizedRichText from '../../shared/LocalizedRichText'
import NewsLetter from './NewsLetter'

type FooterSocialItem = {
  label: string
  href: string
  normalIcon: StaticImageData
  coloredIcon: StaticImageData
  external?: boolean
}

function FooterSocialIcon({ item }: { item: FooterSocialItem }) {
  return (
    <Link
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      className="
        group relative flex aspect-square w-full items-center justify-center
        overflow-hidden rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]
      "
    >
      <Image
        src={item.normalIcon}
        alt={item.label}
        fill
        sizes="80px"
        quality={90}
        placeholder="blur"
        blurDataURL={item.normalIcon.blurDataURL}
        className="
          object-contain
          transition-opacity duration-300 ease-out
          group-hover:opacity-0
        "
      />

      <Image
        src={item.coloredIcon}
        alt=""
        fill
        sizes="80px"
        quality={90}
        placeholder="blur"
        blurDataURL={item.coloredIcon.blurDataURL}
        className="
          object-contain opacity-0
          transition-opacity duration-300 ease-out
          group-hover:opacity-100
        "
      />
    </Link>
  )
}

async function ServerFooter() {
  const footer = await getGlobalCached<Footer>(GLOBAL_FOOTER_SLUG_AND_TAG, 1)
  const footerSocialItems: FooterSocialItem[] = [
    footer?.social?.facebookUrl
      ? {
          label: 'Facebook',
          href: footer.social.facebookUrl,
          normalIcon: Facebook,
          coloredIcon: FacebookColored,
          external: true,
        }
      : null,

    footer?.social?.linkedinUrl
      ? {
          label: 'LinkedIn',
          href: footer.social.linkedinUrl,
          normalIcon: Linkdin,
          coloredIcon: LinkdinColored,
          external: true,
        }
      : null,

    footer?.contactInfoSection?.email
      ? {
          label: 'Email',
          href: `mailto:${footer.contactInfoSection.email}`,
          normalIcon: At,
          coloredIcon: AtColored,
        }
      : null,

    footer?.social?.whatsApp
      ? {
          label: 'WhatsApp',
          href: footer.social.whatsApp,
          normalIcon: WhatsApp,
          coloredIcon: WhatsAppColored,
          external: true,
        }
      : null,
  ].filter(Boolean) as FooterSocialItem[]

  return (
    <div
      className="relative z-0 
    bg-secondary-1 
    min-h-[450px] lg:min-h-[380px] xl:min-h-[585px] 2xl:min-h-[680px]
    pb-9 md:pb-[48px] lg:pb-5 xl:pb-8 2xl:pb-10
    lg:flex lg:flex-col lg:justify-between
    space-y-6 overflow-hidden
    "
    >
      {/* Ellipse Background */}
      <div className="absolute -top-1/2 inset-0 z-10">
        <Image
          src={Ellipse}
          alt="Ellipse Background"
          fill
          quality={90}
          placeholder="blur"
          sizes="100vw"
          blurDataURL={Ellipse?.blurDataURL || ''}
          className="object-cover rotate-180"
        />
      </div>

      {/* main contents */}
      <div
        className="relative z-20
    px-4 md:px-[120px] lg:px-[50px] xl:px-[110px] 2xl:px-[140px]
    pt-9 md:pt-[48px] lg:pt-5 xl:pt-8 2xl:pt-10
     "
      >
        {/* content */}
        <div
          className="grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-12
      lg:mt-[30px] xl:mt-[60px] 2xl:mt-[70px]
      relative z-20"
        >
          {/* grid 1 */}
          <div
            className="col-span-1 lg:col-span-3
        space-y-[12px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]
        relative
        flex flex-col items-center lg:items-start
        "
          >
            {/* logo */}
            {typeof footer?.logo === 'object' && footer?.logo?.url && (
              <Link
                href={`/`}
                className="relative z-20
            hover:scale-110 transition-all duration-300 ease-in
            w-[100px] xl:w-[135px] 2xl:w-[150px]
            aspect-[922/512]"
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
            <div className="font-agency text-white-1 global-h7 z-20 w-[80%] text-center lg:text-start">
              {footer?.branding?.introText}
            </div>
            <NewsLetter />
          </div>

          {/* grid 2 */}
          <div
            className="col-span-1 lg:col-span-3
        space-y-[8px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]
        flex flex-col items-center lg:items-start
        lg:pl-9 xl:pl-10 2xl:pl-12"
          >
            <div className="text-primary-2 lg:text-white-1 font-agency global-h7">
              {footer?.resourses?.header}
            </div>
            <div
              className="flex flex-col
          space-y-1 xl:space-y-1.5 2xl:space-y-2.5"
            >
              {footer?.resourses?.links?.map((item, index) => (
                <div
                  className="flex items-center justify-center lg:justify-start space-x-1.5"
                  key={index}
                >
                  <Link
                    key={index}
                    href={pageHref(item?.buttonLink)}
                    className="w-fit
    relative inline-block
    text-white-2 global-p5 font-grift text-center lg:text-start
    hover:text-primary-2 transition-all duration-300 ease-in

    after:content-['']
    after:absolute after:left-0 after:-bottom-[2px]
    after:h-[2px] after:w-full
    after:origin-left after:scale-x-0
    after:bg-primary-2
    after:transition-transform after:duration-300 after:ease-in

    hover:after:scale-x-100
  "
                  >
                    {item?.buttonText}
                  </Link>
                  {item?.showNewBadge && (
                    <div
                      className="text-secondary-1 font-grift font-extrabold bg-primary-2 w-fit
                text-[8px] lg:text-[9px] 2xl:text-[10px] tracking-wide  uppercase
                rounded-[38px]
                px-[3px] xl:px-[6px] 2xl:px-[5px]
                py-[2px] xl:py-[5px] 2xl:py-[2px]
                "
                    >
                      new
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* grid 3 */}
          <div
            className="col-span-1 lg:col-span-3
            hidden lg:flex lg:flex-col items-center lg:items-start
        space-y-[8px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]"
          >
            <div className="text-primary-2 lg:text-white-1 font-agency global-h7">
              {footer?.serviceSection?.header}
            </div>
            <div
              className="flex flex-col
          space-y-1 xl:space-y-1.5 2xl:space-y-2.5"
            >
              {footer?.serviceSection?.services?.map((item, index) => (
                <div
                  className="flex items-center justify-center lg:justify-start space-x-1.5"
                  key={index}
                >
                  <Link
                    key={index}
                    href={pageHref(item?.buttonLink)}
                    className="w-fit
    relative inline-block
    text-white-2 global-p5 font-grift text-center lg:text-start
    hover:text-primary-2 transition-all duration-300 ease-in

    after:content-['']
    after:absolute after:left-0 after:-bottom-[2px]
    after:h-[2px] after:w-full
    after:origin-left after:scale-x-0
    after:bg-primary-2
    after:transition-transform after:duration-300 after:ease-in

    hover:after:scale-x-100
  "
                  >
                    {item?.buttonText}
                  </Link>
                  {item?.showNewBadge && (
                    <div
                      className="text-secondary-1 font-grift font-extrabold bg-primary-2 w-fit
                text-[8px] lg:text-[9px] 2xl:text-[10px] tracking-wide  uppercase
                rounded-[38px]
                px-[3px] xl:px-[6px] 2xl:px-[5px]
                py-[2px] xl:py-[5px] 2xl:py-[2px]
                "
                    >
                      new
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* grid 4 */}
          <div
            className="col-span-1 lg:col-span-3
        space-y-[8px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]
        flex flex-col items-center lg:items-start
        relative "
          >
            <div className="text-primary-2 lg:text-white-1 font-agency global-h7">
              {footer?.contactInfoSection?.header}
            </div>
            <div
              className="flex flex-col items-center lg:items-start
          space-y-1.5 lg:space-y-2 xl:space-y-3 2xl:space-y-4"
            >
              {/* address */}
              <div
                className="flex items-start
              space-x-1 xl:space-x-2 w-full text-center lg:text-start"
              >
                {/* icon */}
                <div
                  className="
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
                  href={footer?.contactInfoSection?.mapUrl || ''}
                >
                  <div className="text-white-1 font-grift global-p5">
                    <LocalizedRichText
                      en={footer?.contactInfoSection?.companyAddress}
                      bn={footer?.contactInfoSection?.companyAddress}
                    />
                  </div>
                </Link>
              </div>
              {/* office time */}
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
                    src={Calender}
                    alt="Mail icon"
                    width={Calender?.width}
                    height={Calender?.height}
                    placeholder="blur"
                    blurDataURL={Calender?.blurDataURL}
                    quality={100}
                    sizes="100vw"
                    className="w-full h-full"
                  />
                </div>
                {/* Mail */}
                <div className="text-white-1 font-grift global-p5">
                  <div>{footer?.contactInfoSection?.officeTime}</div>
                </div>
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
                <div className="text-white-1 font-grift global-p5">
                  <a href={`tel:${footer?.contactInfoSection?.phone}`}>
                    {footer?.contactInfoSection?.phone}
                  </a>
                </div>
              </div>
              {/* mail */}
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
                    src={Mail}
                    alt="Mail icon"
                    width={Mail?.width}
                    height={Mail?.height}
                    placeholder="blur"
                    blurDataURL={Mail?.blurDataURL}
                    quality={100}
                    sizes="100vw"
                    className="w-full h-full"
                  />
                </div>
                {/* Mail */}
                <div className="text-white-1 font-grift global-p5">
                  <a href={`mailto:${footer?.contactInfoSection?.email}`}>
                    {footer?.contactInfoSection?.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* brand text */}
        <div
          className="flex justify-center lg:hidden font-agency global-h7 z-20 text-center lg:text-start
        mt-[24px] mb-[8px] lg:m-0 text-primary-2"
        >
          {footer?.social?.header}
        </div>
        {/* social */}
        {/* social */}
        {footerSocialItems.length > 0 && (
          <div
            className="
      flex justify-center lg:hidden
      mx-auto
      w-[120px]
      gap-[4px]
    "
          >
            {footerSocialItems.map((item) => (
              <div key={item.label} className="w-[20%]">
                <FooterSocialIcon item={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* copuright and social links */}
      <div
        className=" px-4 md:px-[120px] lg:px-[50px] xl:px-[110px] 2xl:px-[140px]
       flex flex-col items-center gap-1 lg:flex lg:flex-row lg:justify-between lg:items-center relative z-20"
      >
        {/* copyright */}
        <div className="text-white-1 global-p5 tracking-wider font-grift z-20 ">
          <LocalizedHighlighted
            textBn={footer?.copyright?.copyrightText}
            textEn={footer?.copyright?.copyrightText}
            highlightBn={footer?.copyright?.copyrightHighlightedText}
            highlightEn={footer?.copyright?.copyrightHighlightedText}
          />
        </div>
        {/* social */}
        {/* social */}
        {footerSocialItems.length > 0 && (
          <div
            className="
      hidden lg:flex
      absolute left-1/2 -translate-x-1/2
      w-[130px] xl:w-[150px] 2xl:w-[165px]
      items-center justify-center
      gap-[8px] 2xl:gap-[9px]
    "
          >
            {footerSocialItems.map((item) => (
              <div key={item.label} className="w-[20%]">
                <FooterSocialIcon item={item} />
              </div>
            ))}
          </div>
        )}
        {/* legal */}
        <div className="text-primary-2 global-p5 tracking-wider font-grift">
          <LocalizedRichText
            en={footer?.legalSection?.legalValue}
            bn={footer?.legalSection?.legalValue}
          />
        </div>
      </div>

      {/* background image */}
      <div className="absolute inset-x-0 bottom-28 lg:bottom-0 z-10 ">
        {/*  */}
        {typeof footer?.logoBackgroundImage === 'object' && footer?.logoBackgroundImage?.url && (
          <div className="relative z-10 w-full aspect-[1437/280] ">
            <Image
              src={footer?.logoBackgroundImage?.url}
              alt="Brand BG Logo"
              fill
              quality={90}
              placeholder="blur"
              sizes="100vw"
              blurDataURL={footer?.logoBackgroundImageBlurDataURL || ''}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ServerFooter
