'use client'

import GlobalButton from './GlobalButton'

interface CallNowButtonProps {
  className?: string
  size?: 'small' | 'large' | 'medium'
  variant?: 'link' | 'primary' | 'glass' | 'default' | 'destructive' | 'outline' | 'secondary'
}

export default function CallNowButton({ className, size = 'large', variant = 'primary' }: CallNowButtonProps) {
  const handleCall = () => {
    window.open('tel:09610889900', '_self')
  }

  return (
    <div onClick={handleCall} className="cursor-pointer">
      <GlobalButton
        variant={variant}
        className={className || "border border-white text-white bg-white/20 backdrop-blur-md hover:bg-white/30 hover:border-white transition-colors duration-300"}
        text="Call Now"
        size={size}
      />
    </div>
  )
}