import Image from 'next/image'
import award1 from '/public/assets/homepage/web/award1.png'
import award2 from '/public/assets/homepage/web/award2.png'
import award3 from '/public/assets/homepage/web/award3.png'
import award4 from '/public/assets/homepage/web/award4.png'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'

function AwardSection() {
  return (
    <div className="bg-white pb-24 pt-12 md:py-24 lg:py-[110px] 2xl:py-[150px]">
      <div className="relative">
        {/* linear linear-gradient */}
        <div className="md:hidden absolute top-[135px] w-full h-[4px]">
          <div className="w-full h-[4px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto" />
        </div>

        <h1
          className="global-h1 w-full lg:w-[85%] 2xl:w-[70%] mx-auto font-medium lg:font-semibold text-[#4A4A4A]
        text-center lg:text-start
        mb-5 md:mb-8 lg:mb-16  2xl:mb-24"
        >
          <LocalizedHighlighted
            textBn="সফলতার প্রতিটি ধাপ"
            textEn="Milestones Unlocked"
            highlightBn="ধাপ"
            highlightEn="Unlocked"
            highlightClassName="text-[#ED7125]"
          />
        </h1>
        <div className="z-20 relative w-full lg:w-[85%] 2xl:w-[70%] mx-auto lg:min-h-[500px] grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section aligned to right */}
          <div className="flex justify-end items-center rounded-t-[14px] lg:rounded-t-[24px]">
            <div
              className="relative
            w-[70%] mx-auto lg:mx-0 lg:w-full rounded-2xl
            h-[200px] md:h-[300px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px]"
            >
              {/* web */}
              <Image
                fill
                className="rounded-2xl object-cover"
                src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/about_milestone_2.jpg`}
                alt="why choose us"
                sizes="(max-width: 767px) 300px, (max-width: 1023px) 50vw , (max-width: 1349px) 600px , 100vw"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col font-avenir">
            {/* top section */}
            <div className="hidden lg:flex h-[250px] 2xl:h-[300px] justify-center lg:justify-end items-center rounded-tl-2xl">
              <div className="flex justify-center lg:justify-end items-center flex-wrap w-full">
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* img */}
                  <div className="p-2 2xl:p-4 border-2 rounded-t-xl border-[#9A4E46] ">
                    <div className="">
                      {/* <img src="/assets/homepage/web/award1.png" alt="" /> */}
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
                  <div className="text-[#434343] p-2 2xl:p-4 border-b-2 border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px] font-bold">
                      <LocalizedText en="100%" bn="১০০%" />
                    </div>
                    <div className="text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      <LocalizedText en="Settlement Rate" bn="সেটেলমেন্ট রেট" />
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-t-xl border-[#9A4E46]">
                    <div className="">
                      {/* <img src="/assets/homepage/web/award2.png" alt="" /> */}
                      <Image
                        unoptimized={false}
                        src={award2}
                        alt=" award2"
                        placeholder="blur"
                        sizes="30vw"
                      />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-[#434343] p-2 2xl:p-4 border-b-2 border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      <LocalizedText en="112" bn="১১২" />
                    </div>
                    <div className="text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      <LocalizedText en="Claim Settled" bn="ক্লেম সেটলড" />
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-b-xl border-[#9A4E46]">
                    <div className="">
                      {/* <img src="/assets/homepage/web/award3.png" alt="" /> */}
                      <Image
                        unoptimized={false}
                        src={award3}
                        alt=" award3"
                        placeholder="blur"
                        sizes="30vw"
                      />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-[#434343] p-2 2xl:p-4 border-t-2 border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      <LocalizedText en="235" bn="২৩৫" />
                    </div>
                    <div className="text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      <LocalizedText en="Satisfied Customers" bn="স্যাটিসফাইড কাস্টমার" />
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[48%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-b-xl border-[#9A4E46]">
                    <div className="">
                      {/* <img src="/assets/homepage/web/award4.png" alt="" /> */}
                      <Image
                        unoptimized={false}
                        src={award4}
                        alt=" award4"
                        placeholder="blur"
                        sizes="30vw"
                      />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-[#434343] p-2 2xl:p-4 border-t-2 border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      <LocalizedText en="1K +" bn="১কে  +" />
                    </div>
                    <div className="text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      <LocalizedText en="Families Insured" bn="সুরক্ষিত পরিবার" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom section */}
            <div
              className=" lg:h-[50%] absolute
              inset-x-0 mx-auto top-[60%] 
              lg:bottom-0 lg:top-auto lg:right-0 lg:left-auto
            w-[90%] lg:w-[70%] xl:w-[67%] 2xl:w-[900px]"
            >
              <div
                className=" lg:h-[250px] 2xl:h-[300px] text-center lg:text-start
               p-2 md:p-6 lg:p-12 text-white space-y-2 lg:space-y-6
              rounded-[8px] bg-[rgba(156,134,57,0.5)] backdrop-blur-[15px]
              "
              >
                <div>
                  <h1 className="global-h2 font-bold">
                    <LocalizedText en="Grand Launch Announcement" bn="শান্তা লাইফের শুভযাত্রা" />
                  </h1>
                  <h5 className="global-h4 font-light">
                    <LocalizedText en="December 1, 2024" bn="ডিসেম্বর ১, ২০২৪" />
                  </h5>
                </div>
                <p className="global-p2 font-light">
                  <LocalizedText
                    en={`The ceremony was graced by key leaders including CEO Nafis A. Ahmed and directors
                  Saif Khondoker, Arif Khan, Raiven Hasan, Anisul Haque, along with other senior
                  officials.`}
                    bn={`উদ্বোধনী অনুষ্ঠানে সিইও নাফিস আকতার আহমেদ, পরিচালক সাইফ খন্দকার, আরিফ খান, রাইভেন হাসান, আনিসুল হক ও অন্যান্য সিনিয়র কর্মকর্তারা উপস্থিত ছিলেন।`}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AwardSection
