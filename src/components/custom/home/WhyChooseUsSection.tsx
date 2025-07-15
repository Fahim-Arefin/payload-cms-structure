import { Button } from '@/components/ui/button'
import ToolTip from '../shared/ToolTip'

function WhyChooseUsSection() {
  return (
    <div className="relative bg-white lg:pb-[200px]">
      {/* Background image with overlay only for mobile */}
      <div className="absolute lg:hidden inset-0 -z-0">
        <img
          src="/assets/whychooseus3.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-[#1E1E1E7A] z-30" /> */}
      </div>

      <div className="container-width z-20 relative w-full min-h-[550px] md:min-h-[600px] lg:min-h-[550px] grid grid-cols-1 lg:grid-cols-2">
        {/* Image Section aligned to right */}
        <div className="hidden lg:flex justify-end items-center rounded-t-[24px]">
          <div className="w-full rounded-t-[24px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px]">
            <img
              className="h-full w-full z-[50] rounded-2xl"
              src="/assets/whychooseus3.png"
              alt="why choose us"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col font-avenir ">
          {/* top section */}
          <div className="lg:space-y-4 h-[50%] flex flex-col justify-start lg:justify-center p-12 lg:pr-0 lg:pt-0 lg:pb-0 lg:pl-12 text-center lg:text-left">
            <div className="global-h4  text-[#1E1E1E] uppercase font-light">Why Choose us?</div>
            <div className="flex items-center justify-center space-x-2 lg:flex-col lg:justify-start lg:items-start lg:space-x-0">
              <div className="global-h1 font-bold  lg:font-medium  text-[#434342] uppercase">
                Built on Trust
              </div>
              <div
                className="global-h1 uppercase
            font-bold lg:font-medium text-[#434342]"
              >
                Backed by <span className="text-[#ED7125]"> Legacy</span>
              </div>
            </div>
            <div className="text-[#434342] text-[12px] md:text-[16px] lg:text-[14px] 2xl:text-[17px] mt-3 lg:mt-0 font-normal">
              Born from a vision to redefine life insurance in Bangladesh, Shanta Life Insurance is
              backed by a powerful consortium, including Shanta Holdings.
            </div>
          </div>

          {/* bottom section */}
          <div className="h-[50%] absolute bottom-0 right-0 w-full lg:w-[80%] xl:w-[75%] 2xl:w-[1000px]">
            {/* horizontal grid */}
            <div className=" h-[250px] 2xl:h-[300px] lg:bg-[#FCF4EB] flex justify-center lg:justify-end items-center rounded-tl-2xl">
              <div className="flex justify-center lg:justify-end items-center flex-wrap w-full lg:w-[60%] xl:w-[67%] 2xl:w-[69%]">
                {/* each info section */}
                <div className="w-[42%] md:w-[40%] lg:w-[45%] flex ">
                  {/* img */}
                  <div className="p-2 2xl:p-4 border-2 rounded-t-sm md:rounded-t-md lg:rounded-t-xl border-white lg:border-[#9A4E46]  bg-white lg:bg-none">
                    <div className="">
                      <img src="/assets/award1.png" alt="" />
                    </div>
                  </div>
                  {/* info */}
                  <div className=" text-white lg:text-[#434343] p-2 2xl:p-4 border-b-2 border-white lg:border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px] font-bold ">
                      89%
                    </div>
                    <div className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      Success Rate
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[42%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-t-sm md:rounded-t-md lg:rounded-t-xl border-white lg:border-[#9A4E46]  bg-white lg:bg-none">
                    <div className="">
                      <img src="/assets/award2.png" alt="" />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-white lg:text-[#434343] p-2 2xl:p-4 border-b-2 border-white lg:border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      568
                    </div>
                    <div className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      Claim Settled
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[42%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-b-sm md:rounded-b-md lg:rounded-b-xl border-white lg:border-[#9A4E46]  bg-white lg:bg-none">
                    <div className="">
                      <img src="/assets/award3.png" alt="" />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-white lg:text-[#434343] p-2 2xl:p-4 border-t-2 border-white lg:border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      235
                    </div>
                    <div className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      Satisfied Customer
                    </div>
                  </div>
                </div>
                {/* each info section */}
                <div className="w-[42%] md:w-[40%] lg:w-[45%] flex">
                  {/* svg */}
                  <div className="p-2 2xl:p-4 border-2 rounded-b-sm md:rounded-b-md lg:rounded-b-xl border-white lg:border-[#9A4E46]  bg-white lg:bg-none">
                    <div className="">
                      <img src="/assets/award4.png" alt="" />
                    </div>
                  </div>
                  {/* info */}
                  <div className="text-white lg:text-[#434343] p-2 2xl:p-4 border-t-2 border-white lg:border-[#9A4E46] w-full">
                    <div className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px]  font-bold">
                      1K +
                    </div>
                    <div className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] 2xl:text-[15px] font-light">
                      Families Insured
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* vertical grid */}
            <div className="hidden lg:block absolute top-0 left-0 bg-[#FCF4EB] lg:pl-3 lg:pt-3 2xl:pl-6 2xl:pt-6 rounded-tl-2xl rounded-br-2xl">
              <div className="lg:h-[350px] xl:h-[370px] 2xl:h-[420px] lg:w-[235px]  xl:w-[250px] 2xl:w-[300px] z-[50] rounded-2xl">
                <img
                  className="h-full w-full z-[50] rounded-2xl"
                  src="/assets/whychooseus2.png"
                  alt="why choose us"
                />
              </div>
            </div>

            <ToolTip className="hidden lg:flex justify-center absolute inset-x-0 bottom-0 ">
              <Button
                variant="primary"
                className="cursor-not-allowed rounded-lg text-white px-6 py-4 lg:h-8 xl:h-10 lg:ml-24 xl:ml-6 2xl:-ml-16
                h-[52px] lg:w-[140px] xl:w-[180px]"
              >
                Explore
              </Button>
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUsSection
