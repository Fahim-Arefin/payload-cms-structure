import Image from 'next/image'
import GlobalButton from '../shared/GlobalButton'
import Link from 'next/link'
import award1 from '/public/assets/homepage/web/award1.png'
import award2 from '/public/assets/homepage/web/award2.png'
import award3 from '/public/assets/homepage/web/award3.png'
import award4 from '/public/assets/homepage/web/award4.png'
import LocalizedString from '../shared/LocalizedString'
import LocalizedText from '../shared/LocalizedText'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedRichText from '../shared/LocalizedRichText'

function WhyChooseUsSection() {
  return (
    <div className="relative bg-white lg:pb-[200px]">
      {/* Background image with overlay only for mobile */}
      <div className="absolute lg:hidden inset-0 z-10">
        <Image
          // src="/assets/homepage/mobile/whyChooseUs.jpg"
          src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/mobile/whyChooseUs.jpg`}
          alt="Background"
          className="object-cover"
          fill
          sizes="(max-width: 400px) 200px,(max-width: 1023px) 50vw, 33vw" // Define responsive image sizes
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-[#1E1E1E]/60 z-20" />
      </div>

      <div className="container-width z-30 relative w-full min-h-[550px] md:min-h-[600px] lg:min-h-[550px] grid grid-cols-1 lg:grid-cols-2">
        {/* Image Section aligned to right */}
        <div className="hidden lg:flex justify-end items-center rounded-t-[24px]">
          <div className="relative w-full rounded-t-[24px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px]">
            <Image
              className="object-cover rounded-2xl"
              // src="/assets/homepage/web/whyChooseUs.jpg"
              src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/whyChooseUs.jpg`}
              alt="why choose us"
              quality={85}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw" // Define responsive image sizes
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col font-avenir">
          {/* top section */}
          <div
            className="z-30 space-y-4 lg:space-y-4 h-[50%] flex flex-col justify-start lg:justify-center p-8 md:p-12 lg:pr-0 lg:pt-0 lg:pb-0 lg:pl-12
           text-center lg:text-left"
          >
            <div className="global-h4  text-white lg:text-[#1E1E1E] uppercase font-light">
              <LocalizedText en="Why Choose Us" bn="কেন শান্তা লাইফ?" />
            </div>
            <div className="flex items-center justify-center space-x-2 lg:flex-col lg:justify-start lg:items-start lg:space-x-0">
              <div className="global-h1 font-medium  text-white lg:text-[#434342] uppercase">
                <LocalizedText en="Built on Trust" bn="ঐতিহ্যের ভরসা," />
              </div>
              <div className="global-h1 uppercase font-medium  text-white lg:text-[#434342]">
                {/* Backed by <span className="text-white lg:text-[#ED7125]"> Legacy</span> */}
                <LocalizedHighlighted
                  textEn="Backed by Legacy"
                  textBn="সুরক্ষার প্রতিশ্রুতি"
                  highlightEn="by Legacy"
                  highlightBn="প্রতিশ্রুতি"
                  highlightClassName="text-[#ED7125]"
                />
              </div>
            </div>
            <div className=" text-white lg:text-[#434342] text-[12px] md:text-[16px] lg:text-[14px] 2xl:text-[17px] mt-3 lg:mt-0 font-normal">
              <LocalizedText
                en={
                  `Born from a vision to redefine life insurance in Bangladesh, Shanta Life Insurance is backed by a powerful consortium, including Shanta Holdings.` as any
                }
                bn={
                  `শান্তা হোল্ডিংস-এর দৃঢ় ভিত ও সাফল্যের ধারাবাহিকতায়, লাইফ ইন্স্যুরেন্স ইন্ডাস্ট্রিতে নতুনত্বের অঙ্গীকার নিয়ে এসেছে শান্তা লাইফ ইন্স্যুরেন্স। শান্তা পরিবারের দীর্ঘ অভিজ্ঞতা, মূল্যবোধ ও বিশ্বাসের ওপর ভর করে আমরা এগিয়ে চলেছি জীবনকে আরও নিরাপদ ও অর্থনৈতিকভাবে নির্ভার করতে।` as any
                }
              />
            </div>
          </div>

          {/* bottom section */}
          <div className="h-[50%] absolute bottom-0 right-0 w-full lg:w-[80%] xl:w-[75%] 2xl:w-[1000px]">
            {/* horizontal grid */}
            <div className=" z-[50]  h-[250px] 2xl:h-[300px] lg:bg-[#FCF4EB] flex justify-center lg:justify-end items-center rounded-tl-2xl">
              <div className="flex justify-center lg:justify-end items-center flex-wrap w-full lg:w-[61%] xl:w-[67%] 2xl:w-[71%]">
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex ">
                  {/* img */}
                  <div className="p-2 2xl:p-4 border-2 rounded-t-sm md:rounded-t-md lg:rounded-t-xl border-white lg:border-[#9A4E46] bg-white lg:bg-none">
                    <div className="">
                      <Image
                        unoptimized={false}
                        src={award1}
                        alt="award1"
                        placeholder="blur"
                        sizes="30vw"
                      />
                    </div>
                  </div>
                  {/* info */}
                  <div className=" text-white lg:text-[#434343] p-2 2xl:p-4 border-b-2 border-white lg:border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px] font-bold ">
                      <LocalizedText en="98%" bn="৯৮%" />
                    </div>
                    <div className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      <LocalizedText en="Settlement Rate" bn="সেটেলমেন্ট রেট" />
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-t-sm md:rounded-t-md lg:rounded-t-xl border-white lg:border-[#9A4E46]  bg-white lg:bg-none">
                    <div className="">
                      <Image
                        unoptimized={false}
                        src={award2}
                        alt="award2"
                        placeholder="blur"
                        sizes="30vw"
                      />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-white lg:text-[#434343] p-2 2xl:p-4 border-b-2 border-white lg:border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      <LocalizedText en="1299" bn="১২৯৯" />
                    </div>
                    <div className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      <LocalizedText en="Claim Settled" bn="ক্লেইম সেটেল্ড" />
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-b-sm md:rounded-b-md lg:rounded-b-xl border-white lg:border-[#9A4E46]  bg-white lg:bg-none">
                    <div className="">
                      <Image
                        unoptimized={false}
                        src={award3}
                        alt="award3"
                        placeholder="blur"
                        sizes="30vw"
                      />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-white lg:text-[#434343] p-2 2xl:p-4 border-t-2 border-white lg:border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      <LocalizedText en="7322" bn="৭৩২২" />
                    </div>
                    <div className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      <LocalizedText en="Satisfied Customers" bn="স্যাটিসফাইড কাস্টমার" />
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-b-sm md:rounded-b-md lg:rounded-b-xl border-white lg:border-[#9A4E46]  bg-white lg:bg-none">
                    <div className="">
                      <Image
                        unoptimized={false}
                        src={award4}
                        alt="award4"
                        placeholder="blur"
                        sizes="30vw"
                      />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-white lg:text-[#434343] p-2 2xl:p-4 border-t-2 border-white lg:border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      <LocalizedText en="3.5K +" bn="৩,৫০০+" />
                    </div>
                    <div className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      <LocalizedText en="Families Insured" bn="সুরক্ষিত পরিবার" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* vertical grid */}
            <div className="hidden lg:block absolute top-0 left-0 bg-[#FCF4EB] lg:pl-2 lg:pt-2 2xl:pl-3.5 2xl:pt-3.pl-3.5 rounded-tl-2xl rounded-br-2xl">
              <div className="relative lg:h-[350px] xl:h-[370px] 2xl:h-[420px] lg:w-[235px]  xl:w-[250px] 2xl:w-[300px] z-[50] rounded-2xl">
                <Image
                  className="z-[50] rounded-2xl"
                  // src="/assets/homepage/web/whychooseus2.png"
                  src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/whychooseus2.png`}
                  alt="why choose us"
                  fill
                  // sizes="(max-width: 1349px) 10vw , (max-width: 1699px) 20vw, 20vw"
                  sizes="300px"
                />
              </div>
            </div>

            <div className="hidden lg:flex justify-center absolute inset-x-0 bottom-0 ">
              <Link href="/about-us">
                <GlobalButton
                  size="small"
                  variant="primary"
                  className="lg:ml-16 xl:-ml-5 2xl:-ml-32"
                  // text="Explore"
                >
                  <LocalizedString en="Explore" bn="এক্সপ্লোর করুন" />
                </GlobalButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUsSection
