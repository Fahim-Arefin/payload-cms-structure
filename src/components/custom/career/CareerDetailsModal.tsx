import React, { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import GlobalButton from '../shared/GlobalButton'
import { FaDownload } from 'react-icons/fa'

type CareerDetailsModalProps = {
  open: boolean
  onOpenChange: any
  details: any
}

const CareerDetailsModal: FC<CareerDetailsModalProps> = ({ open, onOpenChange, details }) => {
  const handleDownload = (filename: string) => {
    const link = document.createElement('a')
    link.href = `/assets/job-posts/${filename}` // Make sure this path exists in /public
    link.download = `${filename}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  if (!details) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] max-w-[400px] md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl !p-0 rounded-2xl overflow-y-auto max-h-[95vh]">
        {/* Header with close button */}
        <div className="sticky top-0 z-30 bg-[#F6EDDD] rounded-t-2xl">
          <DialogHeader className="flex flex-row items-center justify-between border-b px-6 py-4 bg-[#F6EDDD]">
            <DialogTitle className="text-[16px] text-left md:text-center md:text-[22px] font-bold text-[#ED7125]">
              Job Description - {details?.title}
            </DialogTitle>
            <DialogClose asChild>
              <button className="rounded-full bg-white p-1 border border-neutral-200 hover:bg-neutral-100 ml-3">
                <X className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </DialogClose>
          </DialogHeader>
        </div>

        {/* Branding Row */}
        <div className="flex justify-between px-6 pt-4 pb-2 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <img src="/assets/modalBanner.png" alt="Modal Banner" />
            <div className="text-[#ED7125] text-[18px] lg:text-[22px] xl:text-[32px] font-bold">
              JOIN US <br className="hidden md:block" />
              IN CRAFTING A <br className="hidden md:block" />
              <span className="whitespace-nowrap">BRIGHTER FUTURE</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 xl:gap-6 2xl:gap-10 items-start">
            <img
              src="/assets/mainlogo_2.png"
              alt="Shanta Life Logo"
              className="h-[60px] md:h-[90px] w-auto object-contain ml-2"
              style={{ maxWidth: 120 }}
            />
            <GlobalButton
              onClick={() => handleDownload(details?.filename)}
              text="Download"
              variant="primary"
            >
              <h1 className="text-[14px] md:text-[20px]">Download</h1>
              <FaDownload />
            </GlobalButton>
          </div>
        </div>

        {/* Vision/Mission Statement */}

        <div className="px-6 pt-6 pb-2 text-[#434342] text-[15px] font-medium text-justify leading-[1.7] rounded-t-none rounded-b-xl">
          With the vision of redefining the idea of Life Insurance in Bangladesh through innovation
          and a new spirit, Shanta Life is set to commence its operations. Our ambition is to build
          a devoted team for delivering best-in-class products and services that will transform the
          industry. If you are driven by the pursuit of excellence and wish to work with a dynamic
          team, we invite you to be a part of our journey.
        </div>

        {/* Main modal content */}
        <div className="p-6 bg-white mb-2 lg:mb-4">
          <h3 className="text-[22px] font-bold mb-4 lg:mb-6">{details?.title}</h3>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            <div>
              <div className="mb-5">
                <div className="text-[18px] font-bold text-[#343434] mb-2">
                  Key Responsibilities
                </div>
                <ul className="list-disc list-inside text-[15px] text-justify text-[#434342] space-y-2">
                  {details?.responsibilities.map((item: any, i: any) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[18px] font-bold text-[#343434] mb-2">Key Requirements</div>
                <ul className="list-disc list-inside text-[15px] text-justify text-[#434342] space-y-2">
                  {details?.requirements.map((item: any, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4">
                <div className="text-[18px] font-bold text-[#343434] mb-2">Job Info</div>
                <div className="text-[15px] mb-1">
                  <span className="font-semibold">Location:</span> {details?.location}
                  <br />
                  <span className="font-semibold">Deadline:</span> {details?.deadline}
                </div>
              </div>
              <div className=" bg-[#F6EDDD] rounded-xl p-4">
                <div className="font-bold text-[#ED7125] text-[16px] mb-1">How to Apply?</div>
                <div className="text-[15px] text-[#434342]">
                  Email your updated CV to{' '}
                  <span className="font-semibold">{details?.applyEmail}</span>
                  <br />
                  <span>Mentioning the Subject Line:</span>
                  <span className="font-semibold"> {details?.subjectLine}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CareerDetailsModal
