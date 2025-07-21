import { useEffect, useState } from 'react'

export const useAnimatedCounter = (
  targetValue: number,
  duration: number = 1000,
  startAnimation: boolean = true
) => {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    if (!startAnimation || targetValue === 0) {
      setCurrentValue(targetValue)
      return
    }

    const startValue = 0
    const increment = targetValue / (duration / 16) // 16ms per frame (60fps)
    let current = startValue
    
    const timer = setInterval(() => {
      current += increment
      if (current >= targetValue) {
        setCurrentValue(targetValue)
        clearInterval(timer)
      } else {
        setCurrentValue(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [targetValue, duration, startAnimation])

  return currentValue
}