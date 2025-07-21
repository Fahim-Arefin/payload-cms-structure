import React from 'react'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  showAnimation?: boolean
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  className = '',
  prefix = '',
  suffix = '',
  showAnimation = true
}) => {
  const animatedValue = useAnimatedCounter(value, duration, showAnimation)

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <span className={className}>
      {value > 0 ? `${prefix}${formatNumber(animatedValue)}${suffix}` : ''}
    </span>
  )
}

export default AnimatedCounter