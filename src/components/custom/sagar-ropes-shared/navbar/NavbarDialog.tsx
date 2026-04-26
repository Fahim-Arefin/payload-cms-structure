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
      className={cn(
        `
         fixed inset-x-0 top-24 bottom-0 z-[10001]
w-screen
h-[calc(100vh-6rem)]
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

      <DialogPrimitive.Close
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
      </DialogPrimitive.Close>
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

        <div className="flex h-full items-center justify-center w-[30%] mx-auto">
          <QueryForm />
        </div>
      </NoOverlayFullScreenDialogContent>
    </Dialog>
  )
}

export default NavbarDialog
