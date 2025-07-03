import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function ContactUsSection() {
  return (
    <div
      className="bg-[#F6EDDD] relative
      lg:mt-[120px] xl:mt-[200px]
      lg:px-[130px] xl:px-[200px] 2xl:px-[300px] 
      lg:h-[430px] xl:h-[500px] 2xl:h-[600px]"
    >
      {/* main img */}
      <div
        className="
      z-20 absolute bottom-0 
      lg:left-[2%] xl:left-[4%] 2xl:left-[70px] 
       h-[140%] 2xl:h-[850.667px] 2xl:w-[800px]"
      >
        <img src="/assets/contactUsImage.png" alt="" className="h-full w-full" />
      </div>

      {/* message arrow img  */}
      {/* <div
        className="z-10 absolute inset-x-0 bottom-12 left-[35%]
                   w-[400px] rotate-[10.397deg]"
      >
        <img src="/assets/contactUs3.png" alt="" className="h-full" />
      </div> */}
      <div
        className="absolute bottom-6 inset-x-0 left-[35%] 
             w-[200px] md:w-[250px] lg:w-[250px] xl:w-[300px] 2xl:w-[400px]
             rotate-[10.397deg] z-10"
      >
        <img src="/assets/contactUs3.png" alt="" className="w-full h-auto" />
      </div>

      {/* hanging phone  */}
      <div
        className="z-10 absolute top-0 right-[85%]
                    h-1/2"
      >
        <img src="/assets/contactUs2.png" alt="" className="h-full" />
      </div>
      {/* hanging phone  */}
      <div
        className="z-10 absolute top-0 right-[75%]
                    h-1/2"
      >
        <img src="/assets/contactUs1.png" alt="" className="h-full" />
      </div>
      {/* hanging phone  */}
      <div
        className="z-10 absolute top-0 right-[65%]
                    h-1/2"
      >
        <img src="/assets/contactUs2.png" alt="" className="h-full" />
      </div>
      {/* hanging phone  */}
      <div
        className="z-10 absolute top-0 right-[55%]
                    h-1/2"
      >
        <img src="/assets/contactUs1.png" alt="" className="h-full" />
      </div>

      {/* form */}
      <div
        className="
      grid grid-cols-2 h-full gap-2"
      >
        <div></div>
        <div
          className="col-span-1 
          lg:py-8 lg:px-4
          xl:py-12 2xl:px-6 "
        >
          <h3 className="global-h3">Have a Question?</h3>
          <h1
            className="global-h1 font-medium
          lg:mb-6 xl:mb-6 2xl:mb-8"
          >
            Ask Us!
          </h1>

          <form className="lg:space-y-3 xl:space-y-4 2xl:space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="global-p2 text-gray-800 2xl:mb-1">First Name</label>
                <Input
                  placeholder=""
                  className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0
                  h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="global-p2 text-gray-800 2xl:mb-1">Last Name</label>
                <Input
                  placeholder=""
                  className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0 
                  h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="global-p2 text-gray-800 2xl:mb-1">Email</label>
                <Input
                  type="email"
                  placeholder=""
                  className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0
                  h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="global-p2 text-gray-800 2xl:mb-1">Phone Number</label>
                <Input
                  type="tel"
                  placeholder=""
                  className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0
                  h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col">
              <label className="global-p2 text-gray-800 2xl:mb-1">Message</label>
              <Input
                placeholder="Write your message.."
                className="rounded-none border-0 border-b border-black focus-visible:ring-0 focus-visible:ring-offset-0 px-0
                h-[10px] lg:h-[28px] xl:h-[30px] 2xl:h-[32px]"
              />
            </div>

            {/* Button */}
            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                className=" text-white shadow-md  
               
              text-[10px] md:text-[12px] lg:text-[12px] xl:text-[14px] 2xl:text-[14px]"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUsSection
