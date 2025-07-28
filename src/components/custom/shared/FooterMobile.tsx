import React from 'react'
import Link from 'next/link'
import ToolTip from './ToolTip'

function FooterMobile() {
  return (
    <div className="h-fit font-avenir bg-[#3A3A3C]">
      {/* logo */}
      <div
        className="h-[80px] md:h-[120px]
       w-[80px] md:w-[120px] mx-auto"
      >
        <img
          src="/assets/footer2.png"
          alt="footer logo"
          className="h-full w-full object-contain "
        />
      </div>
      {/* info section */}
      <div className="space-y-2">
        {/* email */}
        <div className="flex text-white/70 items-center space-x-2 w-[70%] md:w-[50%] mx-auto text-[10px] md:text-[12px] font-light">
          <div>
            <img src="/assets/footericon1.png" alt="" className="min-w-[30px] min-h-[30px]" />
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
            <img src="/assets/footericon2.png" alt="" className="min-w-[30px] min-h-[30px]" />
          </div>
          <Link
            target="_blank"
            href="https://www.google.com/maps?ll=23.770282,90.40626&z=16&t=m&hl=en-GB&gl=US&mapclient=embed&cid=8200627424099091507"
            className="hover:text-blue-300 duration-100 transition-all"
          >
            Shanta Western Tower, Level 10, 186 Bir Uttam Mir Shawkat Sarak, Dhaka 1208
          </Link>
        </div>
        {/* address */}
        <div className="flex text-white/70 items-center space-x-2 w-[70%] md:w-[50%] mx-auto text-[10px] md:text-[12px] font-light">
          <div>
            <img src="/assets/footericon3.png" alt="" className="min-w-[30px] min-h-[30px]" />
          </div>
          <div>
            <a href="tel:+8809610889900" className="hover:text-blue-300 transition-colors">
              +88 09610889900
            </a>
            <br />
            (10 am-6 pm, Sunday-Thursday)
          </div>
        </div>
      </div>
      {/* Link section */}
      <div className="grid grid-cols-2 w-[70%] md:w-[50%] mx-auto mt-6 text-white/70 font-light">
        <div>
          <h4 className="text-[14px] md:text-[16px] text-white/50 mb-3">Explore</h4>
          <div className="text-[10px] md:text-[12px] flex flex-col">
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/about-us"
            >
              About
            </Link>
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/plans"
            >
              Solutions
            </Link>
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/career"
            >
              Career
            </Link>
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/news-and-media"
            >
              Media & Blogs
            </Link>
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/support"
            >
              Support
            </Link>
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/premium-calculator"
            >
              Premium Calculator
            </Link>
            <ToolTip>
              <Link
                className="cursor-not-allowed transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
                href="#"
              >
                Learning
              </Link>
            </ToolTip>
          </div>
        </div>
        <div>
          <h4 className="text-[14px] md:text-[16px] text-white/50 mb-3">Legal</h4>
          <div className="text-[10px] md:text-[12px] flex flex-col">
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              className="transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-[#FF6600]"
              href="/terms-condition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
      {/* social media section */}
      <div className="w-[70%] md:w-[50%] mx-auto mt-6 text-white/70 font-light">
        <h4 className="text-[14px] md:text-[16px] text-white/50 mb-2 text-center">Find us on</h4>
        <div className="flex justify-center items-center space-x-2">
          <Link target="_blank" href="https://www.facebook.com/profile.php?id=61566152682701">
            <img src="/assets/findus1.png" alt="" className="min-w-[30px] min-h-[30px]" />
          </Link>
          <Link target="_blank" href="https://www.youtube.com/@ShantaLifeInsurance">
            <img src="/assets/findus2.png" alt="" className="min-w-[30px] min-h-[30px]" />
          </Link>
          <Link target="_blank" href="https://www.linkedin.com/company/shanta-life-insurance">
            <img src="/assets/findus3.png" alt="" className="min-w-[30px] min-h-[30px]" />
          </Link>
          <Link target="_blank" href="https://www.instagram.com/shanta_life_insurance">
            <img src="/assets/findus4.png" alt="" className="min-w-[30px] min-h-[30px]" />
          </Link>
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
