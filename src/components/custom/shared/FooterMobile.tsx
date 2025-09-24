import React from 'react'
import Link from 'next/link'
import ToolTip from './ToolTip'
import Image from 'next/image'
import LocalizedText from './LocalizedText'

function FooterMobile() {
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
  return (
    <div className="h-fit font-avenir bg-[#3A3A3C]">
      {/* logo */}
      <div
        className="relative h-[80px] md:h-[120px]
       w-[80px] md:w-[120px] mx-auto"
      >
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/fotter-logos/footer2.png`}
          alt="footer logo"
          className="object-contain "
          sizes="200px"
        />
      </div>
      {/* info section */}
      <div className="space-y-2">
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
            <a href="mailto:info@shantalife.com" className="hover:text-blue-300 transition-colors">
              info@shantalife.com
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
            href="https://www.google.com/maps?ll=23.770282,90.40626&z=16&t=m&hl=en-GB&gl=US&mapclient=embed&cid=8200627424099091507"
            className="hover:text-blue-300 duration-100 transition-all"
          >
            <LocalizedText
              en="Shanta Western Tower, Level 10, 186, Bir Uttam Mir Shawkat Sarak, Dhaka 1208"
              bn="শান্তা ওয়েস্টার্ন টাওয়ার, লেভেল ১০, ১৮৬ বীর উত্তম মীর শওকত সড়ক, ঢাকা ১২০৮"
            />
          </Link>
        </div>
        {/* address */}
        <div className="flex text-white/70 items-center space-x-2 w-[70%] md:w-[50%] mx-auto text-[10px] md:text-[12px] font-light">
          <div>
            <img
              src="/assets/fotter-logos/footericon3.png"
              alt=""
              className="min-w-[30px] min-h-[30px]"
            />
          </div>
          <div>
            <a href="tel:+8809610889900" className="hover:text-blue-300 transition-colors">
              <LocalizedText en="+88 09610889900" bn="+৮৮ ০৯৬১০৮৮৯৯০০" />
            </a>
            <br />
            <LocalizedText
              en="(10 am-6 pm, Sunday-Thursday)"
              bn="(সকাল ১০টা - সন্ধ্যা ৬টা, রবিবার - বৃহস্পতিবার)"
            />
          </div>
        </div>
      </div>
      {/* Link section */}
      <div className="grid grid-cols-2 w-[70%] md:w-[50%] mx-auto mt-6 text-white/70 font-light">
        <div>
          <h4 className="text-[14px] md:text-[16px] text-white/50 mb-3">
            <LocalizedText en="Explore" bn="এক্সপ্লোর" />
          </h4>
          <div className="text-[10px] md:text-[12px] flex flex-col">
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/about-us"
            >
              <LocalizedText en="About" bn="আমাদের সম্পর্কে" />
            </Link>
            <Link
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
            </ToolTip>
          </div>
        </div>
        <div>
          <h4 className="text-[14px] md:text-[16px] text-white/50 mb-3">
            <LocalizedText en="Legal" bn="লিগ্যাল" />
          </h4>
          <div className="text-[10px] md:text-[12px] flex flex-col">
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/privacy-policy"
            >
              <LocalizedText en="Privacy Policy" bn="প্রাইভেসি পলিসি" />
            </Link>
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/terms-condition"
            >
              <LocalizedText en="Terms & Conditions" bn="টার্মস এন্ড কন্ডিশন" />
            </Link>
          </div>
        </div>
      </div>
      {/* social media section */}
      <div className="w-[70%] md:w-[50%] mx-auto mt-6 text-white/70 font-light">
        <h4 className="text-[14px] md:text-[16px] text-white/50 mb-2 text-center">
          <LocalizedText en="Find us on" bn="আমাদের সোশ্যাল মিডিয়া প্ল্যাটফর্মসমূহ" />
        </h4>
        <div className="flex justify-center items-center space-x-2">
          <Link target="_blank" href="https://www.facebook.com/profile.php?id=61566152682701">
            <img
              src="/assets/fotter-logos/findus1.png"
              alt=""
              className="min-w-[30px] min-h-[30px]"
            />
          </Link>
          <Link target="_blank" href="https://www.youtube.com/@ShantaLifeInsurance">
            <img
              src="/assets/fotter-logos/findus2.png"
              alt=""
              className="min-w-[30px] min-h-[30px]"
            />
          </Link>
          <Link target="_blank" href="https://www.linkedin.com/company/shanta-life-insurance">
            <img
              src="/assets/fotter-logos/findus3.png"
              alt=""
              className="min-w-[30px] min-h-[30px]"
            />
          </Link>
          <Link target="_blank" href="https://www.instagram.com/shanta_life_insurance">
            <img
              src="/assets/fotter-logos/findus4.png"
              alt=""
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
        Copyright © 2025 <span className="text-[#FF6600] mx-1">Shanta Life Insurance PLC.</span>{' '}
        All Rights Reserved
      </div>
    </div>
  )
}

export default FooterMobile
