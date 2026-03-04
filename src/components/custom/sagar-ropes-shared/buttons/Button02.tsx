'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useRef } from 'react'
import Btn02Icon from '/public/assets/icons/btn02Icon.png'

type Props = {
  children?: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button02({ children, className, ...props }: Props) {
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const triggerNudge = () => {
    const el = btnRef.current
    if (!el) return
    el.classList.remove('animate-hoverNudge')
    // force reflow so animation can restart
    void el.offsetWidth
    el.classList.add('animate-hoverNudge')
  }

  return (
    <Button
      {...props}
      ref={btnRef}
      onMouseEnter={(e) => {
        triggerNudge()
        props.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        triggerNudge()
        props.onMouseLeave?.(e)
      }}
      className={`rounded-none font-manrope text-dark-1 
        shadow-none bg-transparent hover:bg-transparent group global-link 
        h-7 xl:h-9
        px-0.5 md:px-1
        ${className ?? ''}`}
    >
      <div className="relative inline-block">
        <span
          className="
      relative
      after:content-['']
      after:absolute after:left-0 after:-bottom-[2px]
      after:h-[2px] after:w-full
      after:origin-left after:scale-x-0
      after:bg-current
      after:transition-transform after:duration-300 after:ease-in
      group-hover:after:scale-x-100
    "
        >
          {children}
        </span>
      </div>
      <div
        className="bg-dark-1 flex justify-center items-center
      w-[20px] xl:w-[25px] 
      h-[20px] xl:h-[25px]"
      >
        <Image
          src={Btn02Icon}
          alt="btn icon"
          className="group-hover:rotate-[43deg] transition-all duration-300 ease-in
          w-[12px] xl:w-[16px] 
          h-[12px] xl:h-[16px]"
        />
      </div>
    </Button>
  )
}

export default Button02
