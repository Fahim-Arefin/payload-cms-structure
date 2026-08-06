'use client'

import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CheckCircle2 } from 'lucide-react'
import React from 'react'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  heading?: string
  description?: string
  ctaLabel?: string
}

function FormSuccessDialog({
  open,
  onOpenChange,
  heading = 'Thank You',
  description = 'Your submission has been received successfully.',
  ctaLabel = 'Close',
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100%-32px)] 
          rounded-[14px] border border-primary-1/30
          bg-white-1 px-[24px] py-[34px]
          text-center shadow-[0_22px_70px_rgba(0,108,103,0.18)]
          sm:px-[34px] sm:py-[42px]
          lg:rounded-[18px]
          lg:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[40%]
        "
      >
        <DialogHeader className="items-center text-center">
          <div
            className="
              mb-[18px] flex size-[56px] items-center justify-center
              rounded-full border border-primary-1/25
              bg-primary-1/10 text-primary-1
              lg:size-[64px]
              xl:size-[84px]
            "
          >
            <CheckCircle2 className="size-[30px] lg:size-[34px] xl:size-[44px]" strokeWidth={1.8} />
          </div>

          <DialogTitle
            className="
              font-agency text-[34px] leading-[1]
              text-secondary-1
              lg:text-[40px]
              xl:text-[48px]
              text-center
            "
          >
            {heading}
          </DialogTitle>

          <DialogDescription
            className="
              mx-auto mt-[12px] w-[80%] md:max-w-[60%]
              font-grift text-[13px] font-semibold leading-[1.65]
              text-secondary-1/75
              lg:text-[14px]
              xl:text-[14px]
              text-center
            "
          >
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-[10px] md:mt-[14px] xl:mt-[18px] flex justify-center">
          <Button01 type="button" onClick={() => onOpenChange(false)}>
            {ctaLabel}
          </Button01>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FormSuccessDialog
