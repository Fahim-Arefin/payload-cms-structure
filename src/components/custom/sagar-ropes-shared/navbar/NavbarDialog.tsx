'use client'

import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import QueryForm from '@/blocks/QueryForm/components/QueryForm'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

type NavbarDialogProps = {
  trigger: React.ReactNode
}

const NoOverlayFullScreenDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    {/* No DialogOverlay here */}
    <DialogPrimitive.Content
      style={{
        background: 'var(--overlay-overlay-25, rgba(7, 7, 37, 0.25))',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        backgroundImage: "url('/assets/images/worldMap.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
      ref={ref}
      //   fixed inset-x-0
      //  top-[60px] lg:top-[75px] xl:top-[80px] 2xl:top-[85px] bottom-0 z-[10001]
      //  w-screen
      //  h-[calc(100vh-60px)] lg:h-[calc(100vh-75px)] xl:h-[calc(100vh-80px)] 2xl:h-[calc(100vh-85px)]
      className={cn(
        `
         fixed inset-0 
         z-[10001] 
         w-screen h-screen
          translate-x-0 translate-y-0
          rounded-none border-none
          bg-white
          
          p-6
          shadow-none
          outline-none
        `,
        className,
      )}
      {...props}
    >
      {children}

      {/* <DialogPrimitive.Close
        className="
          absolute right-4 top-4
          rounded-sm opacity-70
          transition-opacity hover:opacity-100
          focus:outline-none
          disabled:pointer-events-none
        "
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close> */}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))

NoOverlayFullScreenDialogContent.displayName = 'NoOverlayFullScreenDialogContent'

function NavbarDialog({ trigger }: NavbarDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <NoOverlayFullScreenDialogContent>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle className="font-proxima uppercase text-white">
              Full Screen Dialog
            </DialogTitle>
            <DialogDescription>
              This full-screen dialog opens above the sheet without overlay.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        {/* <div className="flex h-full items-center justify-center w-full md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] mx-auto">
          <QueryForm className="relative z-[10001]" />
        </div> */}
        {/* <div className="relative flex h-full items-center justify-center w-full md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] mx-auto">
          <DialogPrimitive.Close
            className="
        absolute right-2 xl:right-4 top-[60px] lg:top-[100px] xl:top-[70px] 2xl:top-[78px] z-[10002]
        flex  items-center justify-center
        rounded-sm
        w-5 xl:w-6
        h-5 xl:h-6
        focus:outline-none
        disabled:pointer-events-none
        border border-white-3
        transition-all duration-300 ease-in-out
        hover:bg-cyan hover:text-white-1 hover:border-cyan
      "
          >
            <X className="h-3 w-3 xl:h-4 xl:w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <QueryForm className="relative z-[10001] " />
        </div> */}
        <div className="flex h-full w-full items-center justify-center overflow-y-auto">
          <div className="relative w-full md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]">
            <DialogPrimitive.Close
              className="
        absolute right-2 lg:right-3 top-2 lg:top-3 z-[10002]
        flex items-center justify-center
        rounded-sm
        w-4 md:w-5 xl:w-6
        h-4 md:h-5 xl:h-6
        focus:outline-none
        disabled:pointer-events-none
        border border-white-3
        text-dark-1
        transition-all duration-300 ease-in-out
        hover:bg-cyan hover:text-white-1 hover:border-cyan
      "
            >
              <X className="h-2 w-2 md:h-3 md:w-3 xl:h-4 xl:w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>

            <QueryForm className="relative z-[10001] w-full" />
          </div>
        </div>
      </NoOverlayFullScreenDialogContent>
    </Dialog>
  )
}

export default NavbarDialog
