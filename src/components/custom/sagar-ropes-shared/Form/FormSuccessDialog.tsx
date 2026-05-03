'use client'

import React from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import WorldMap from '/public/assets/images/worldMap.png'

type FormSuccessDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  heading: string
  description: string
  ctaLabel: string
}

function FormSuccessDialog({
  open,
  onOpenChange,
  heading,
  description,
  ctaLabel,
}: FormSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          !fixed !left-0 !top-0  z-[10002] 
          !h-screen !w-screen !max-w-none
          !translate-x-0 !translate-y-0
          !rounded-none sm:!rounded-none
          border-0 bg-white p-0 shadow-none
          overflow-hidden
          data-[state=open]:animate-none data-[state=closed]:animate-none
          [&>button]:hidden
        "
      >
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* Layer 1: Image */}
          <div className="absolute inset-0 z-0">
            <Image
              fill
              src={WorldMap}
              alt="World map background"
              quality={90}
              sizes="100vw"
              className="object-contain"
              placeholder="blur"
              blurDataURL={WorldMap?.blurDataURL}
              priority
            />
          </div>

          {/* Layer 2: Blur above image */}
          <div className="absolute inset-0 z-10 backdrop-blur-[6px]" />

          {/* Layer 3: Overlay above blur/image */}
          <div className="absolute inset-0 z-20 bg-[rgba(7,7,37,0.25)]" />

          {/* Layer 4: Content above everything */}
          <div className="relative z-30 flex min-h-screen w-full items-center justify-center px-5 py-10 md:px-10 lg:px-14">
            <div className="mx-auto max-w-[780px] text-center">
              <DialogTitle
                className="
                  font-proxima font-bold text-dark-3
                  global-h2
                  md:text-[36px]
                  lg:text-[44px]
                "
              >
                {heading}
              </DialogTitle>

              <div className="mx-auto mt-3 h-[2px] w-full max-w-[520px] bg-cyan" />

              <DialogDescription
                className="
                  mx-auto mt-8 max-w-[780px] text-center
                  font-manrope text-dark-3
                  global-p2
                  md:text-xl
                  lg:text-2xl
                "
              >
                {description}
              </DialogDescription>

              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="
                  mt-8 rounded-none border border-dark-1 bg-transparent
                  px-4 py-2 font-manrope text-sm font-bold text-dark-1
                  hover:bg-dark-1 hover:text-white
                "
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FormSuccessDialog
