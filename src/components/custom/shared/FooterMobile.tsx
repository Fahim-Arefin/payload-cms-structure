import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'
import { pageHref } from '@/lib/utils'
import { GlobalFooter } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import LocalizedHighlighted from './LocalizedHighlighted'
import LocalizedText from './LocalizedText'

async function FooterMobile() {
  const shurjoPayData = [
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/1.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/2.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/3.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/4.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/5.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/6.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/7.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/8.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/9.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/10.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/11.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/12.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/13.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/14.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/15.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/16.png`,
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/17.png`,
    },
  ]

  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })

  // const footer = await payload.findGlobal({
  //   slug: GLOBAL_FOOTER_SLUG_AND_TAG,
  // })

  // ⬇️ Cached global fetch (tag: global:global-footer)
  const footer = await getGlobalCached<GlobalFooter>(GLOBAL_FOOTER_SLUG_AND_TAG, 1) // depth=1 is enough for logo relation url

  return (
    <>
      {footer && (
        <div className="h-fit font-avenir bg-[#3A3A3C] ">
          {/* logo */}
          <div className="w-full py-4">
            <div
              className="relative
       w-[80px] md:w-[120px] mx-auto aspect-[1.48/1] "
            >
              {typeof footer?.branding?.logo === 'object' && footer?.branding?.logo?.url && (
                <Image
                  fill
                  // src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/footer2.png`}
                  src={footer?.branding?.logo?.url}
                  alt="footer logo"
                  className="object-contain object-center"
                  sizes="200px"
                  placeholder="blur"
                  blurDataURL={footer?.branding?.logoBlurDataURL || ''}
                  quality={80}
                />
              )}
            </div>
          </div>
          {/* info section */}
          <div className="space-y-2 ">
            {/* email */}
            <div className="flex text-white/70 items-center space-x-2 w-[70%] md:w-[50%] mx-auto text-[10px] md:text-[12px] font-light">
              <div>
                <img
                  src="/assets/fotter-logos/footericon1.png"
                  alt=""
                  className="min-w-[30px] min-h-[30px]"
                />
              </div>
              <div className="hover:text-blue-300 duration-100 transition-all">
                <a
                  href={`mailto:${footer?.branding?.email}`}
                  className="hover:text-blue-300 transition-colors"
                >
                  {footer?.branding?.email}
                </a>
              </div>
            </div>
            {/* address */}
            <div className="flex text-white/70 items-center space-x-2 w-[70%] md:w-[50%] mx-auto text-[10px] md:text-[12px] font-light">
              <div>
                <img
                  src="/assets/fotter-logos/footericon2.png"
                  alt=""
                  className="min-w-[30px] min-h-[30px]"
                />
              </div>
              <Link
                target="_blank"
                // href="https://www.google.com/maps?ll=23.770282,90.40626&z=16&t=m&hl=en-GB&gl=US&mapclient=embed&cid=8200627424099091507"
                href={footer?.branding?.mapUrl || ''}
                className="hover:text-blue-300 duration-100 transition-all"
              >
                <LocalizedText en={footer?.branding?.address} bn={footer?.branding?.addressBN} />
              </Link>
            </div>
            {/* phone */}
            <div className="flex text-white/70 items-center space-x-2 w-[70%] md:w-[50%] mx-auto text-[10px] md:text-[12px] font-light">
              <div>
                <img
                  src="/assets/fotter-logos/footericon3.png"
                  alt=""
                  className="min-w-[30px] min-h-[30px]"
                />
              </div>
              <div>
                <a
                  href={`tel:${footer?.branding?.phone}`}
                  className="hover:text-blue-300 transition-colors"
                >
                  <LocalizedText en={footer?.branding?.phone} bn={footer?.branding?.phoneBN} />
                </a>
                <br />
                <LocalizedText
                  en={footer?.branding?.phoneNote}
                  bn={footer?.branding?.phoneNoteBN}
                />
              </div>
            </div>
          </div>
          {/* Link section */}
          <div className="grid grid-cols-2 w-[70%] md:w-[50%] mx-auto mt-6 text-white/70 font-light">
            <div>
              <h4 className="text-[14px] md:text-[16px] text-white/50 mb-3">
                <LocalizedText
                  en={footer?.exploreSection?.exploreHeader}
                  bn={footer?.exploreSection?.exploreHeaderBN}
                />
              </h4>
              <div className="text-[10px] md:text-[12px] flex flex-col">
                {/* explore links */}
                {footer?.exploreSection?.explore?.map((link, index) => (
                  <Link
                    key={index}
                    className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                    href={pageHref(link?.buttonLink)}
                  >
                    <LocalizedText en={link?.buttonText} bn={link?.buttonTextBN} />
                  </Link>
                ))}

                {/* <Link
                  className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                  href="/plans"
                >
                  <LocalizedText en="Solutions" bn="সলিউশন" />
                </Link>
                <Link
                  className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                  href="/career"
                >
                  <LocalizedText en="Career" bn="ক্যারিয়ার" />
                </Link>
                <Link
                  className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                  href="/news-and-media"
                >
                  <LocalizedText en="Media & Blogs" bn="মিডিয়া এন্ড ব্লগস" />
                </Link>
                <Link
                  className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                  href="/support"
                >
                  <LocalizedText en="Support" bn="সাপোর্ট" />
                </Link>
                <Link
                  className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                  href="/premium-calculator"
                >
                  <LocalizedText en="Premium Calculator" bn="প্রিমিয়াম ক্যালকুলেটর" />
                </Link>
                <ToolTip>
                  <Link
                    className="cursor-not-allowed transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                    href="#"
                  >
                    <LocalizedText en="Learning" bn="লার্নিং" />
                  </Link>
                </ToolTip> */}
              </div>
            </div>
            <div>
              <h4 className="text-[14px] md:text-[16px] text-white/50 mb-3">
                <LocalizedText
                  en={footer?.legalSection?.legalHeader}
                  bn={footer?.legalSection?.legalHeaderBN}
                />
              </h4>
              <div className="text-[10px] md:text-[12px] flex flex-col">
                {/* legal links */}
                {footer?.legalSection?.legal?.map((link, index) => (
                  <Link
                    key={index}
                    className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                    href={pageHref(link?.buttonLink)}
                  >
                    <LocalizedText en={link?.buttonText} bn={link?.buttonTextBN} />
                  </Link>
                ))}

                {/* <Link
                  className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                  href="/terms-condition"
                >
                  <LocalizedText en="Terms & Conditions" bn="টার্মস এন্ড কন্ডিশন" />
                </Link> */}
              </div>
            </div>
          </div>
          {/* social media section */}
          <div className="w-[70%] md:w-[50%] mx-auto mt-6 text-white/70 font-light">
            <h4 className="text-[14px] md:text-[16px] text-white/50 mb-2 text-center">
              <LocalizedText
                en={footer?.social?.socialHeader}
                bn={footer?.social?.socialHeaderBN}
              />
            </h4>
            <div className="flex justify-center items-center space-x-2">
              {/* <Link target="_blank" href="https://www.facebook.com/profile.php?id=61566152682701"> */}
              <Link target="_blank" href={footer?.social?.facebookUrl}>
                <img
                  src="/assets/fotter-logos/findus1.png"
                  alt="facebook icon"
                  className="min-w-[30px] min-h-[30px]"
                />
              </Link>
              <Link target="_blank" href={footer?.social?.youtubeUrl}>
                <img
                  src="/assets/fotter-logos/findus2.png"
                  alt="youtube icon"
                  className="min-w-[30px] min-h-[30px]"
                />
              </Link>
              <Link target="_blank" href={footer?.social?.linkedinUrl}>
                <img
                  src="/assets/fotter-logos/findus3.png"
                  alt="linkedin icon"
                  className="min-w-[30px] min-h-[30px]"
                />
              </Link>
              <Link target="_blank" href={footer?.social?.instagramUrl}>
                <img
                  src="/assets/fotter-logos/findus4.png"
                  alt="instagram icon"
                  className="min-w-[30px] min-h-[30px]"
                />
              </Link>
            </div>
          </div>

          <div className="w-[70%] md:w-[50%] mx-auto mt-6 text-white/70 font-light">
            {/* powered by section */}
            <div className="flex items-center justify-center space-x-2">
              <h1 className="pt-[4px] text-[14px] font-medium text-white/50">Powered By -</h1>
              {/* <div className="w-[85px]">
            <img src="/assets/fotter-logos/shurjo.png" alt="" className="h-full w-full" />
          </div> */}
              {/* make the logo box a positioned container */}
              <div className="relative w-[85px] h-[22px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/shurjo.png`}
                  alt="Shurjo"
                  fill
                  className="object-contain"
                  sizes="85px"
                  priority={false}
                />
              </div>
            </div>
          </div>
          <div className="w-[95%] md:w-[50%] mx-auto mt-2 text-white/70 font-light">
            {/* photos */}
            <div className="flex gap-[3px] flex-wrap mt-2 justify-center">
              {shurjoPayData?.map((img, i) => (
                <div
                  key={i}
                  className="rounded-[5px] bg-[#5A5A5B] p-[2px] flex items-center justify-center
                  w-[35px] h-[35px]
                  md:w-[40px] md:h-[40px]
                  "
                >
                  <div
                    className="relative w-[32px] h-[32px]
                    md:w-[38px] md:h-[38px] "
                  >
                    <Image
                      fill
                      src={img?.image}
                      alt="pay-icon"
                      className="object-contain"
                      sizes="52px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* copyright section */}
          <div className="bg-[#76746E80] flex justify-center items-center mt-6 h-[40px] md:h-[45px] text-white/70 font-normal text-[10px] md:text-[12px]">
            {/* Copyright © 2025{' '}
            <span className="text-[#FF6600] mx-1">Shanta Life Insurance PLC.</span> All Rights
            Reserved */}
            <LocalizedHighlighted
              textEn={footer?.copyright}
              textBn={footer?.copyrightBN}
              highlightEn={footer?.copyrightHighlightedText}
              highlightBn={footer?.copyrightHighlightedTextBN}
              className="mx-1"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default FooterMobile
