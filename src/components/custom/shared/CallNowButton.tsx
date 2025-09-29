'use client'

import GlobalButton from './GlobalButton'

interface CallNowButtonProps {
  className?: string
  size?: 'small' | 'large' | 'medium'
  variant?: 'link' | 'primary' | 'glass' | 'default' | 'destructive' | 'outline' | 'secondary'
  number: string
  label: string
}

export default function CallNowButton({
  className,
  size = 'large',
  variant = 'primary',
  number = '09610889900',
  label = 'call now',
}: CallNowButtonProps) {
  const handleCall = () => {
    // window.open('tel:09610889900', '_self')
    window.open(`tel:${number}`, '_self')
  }

  return (
    <div onClick={handleCall} className="cursor-pointer">
      <GlobalButton
        variant={variant}
        className={
          className ||
          'border border-white text-white bg-white/20 backdrop-blur-md hover:bg-white/30 hover:border-white transition-colors duration-300'
        }
        // text="Call Now"
        text={label}
        size={size}
      />
    </div>
  )
}
