// 'use client'

// import { gsap, ScrollTrigger } from '@/lib/gsap'
// import Lenis from 'lenis'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useRef } from 'react'

// type Props = {
//   children: React.ReactNode
// }

// function SmoothScrollProvider({ children }: Props) {
//   const lenisRef = useRef<Lenis | null>(null)
//   const pathname = usePathname()

//   useEffect(() => {
//     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

//     if (prefersReducedMotion) return

//     const lenis = new Lenis({
//       //   duration: 1.18,
//       //   duration: 1.45,
//       duration: 2,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//       //   wheelMultiplier: 0.85,
//       wheelMultiplier: 0.7,
//       touchMultiplier: 1.1,
//       syncTouch: false,
//     })

//     lenisRef.current = lenis

//     lenis.on('scroll', ScrollTrigger.update)

//     const updateLenis = (time: number) => {
//       lenis.raf(time * 1000)
//     }

//     gsap.ticker.add(updateLenis)
//     gsap.ticker.lagSmoothing(0)

//     const refreshTimer = window.setTimeout(() => {
//       lenis.resize()
//       ScrollTrigger.refresh()
//     }, 400)

//     return () => {
//       window.clearTimeout(refreshTimer)
//       lenis.off('scroll', ScrollTrigger.update)
//       gsap.ticker.remove(updateLenis)
//       lenis.destroy()
//       lenisRef.current = null
//     }
//   }, [])

//   useEffect(() => {
//     const timer = window.setTimeout(() => {
//       lenisRef.current?.resize()
//       ScrollTrigger.refresh()

//       if (window.location.hash && lenisRef.current) {
//         lenisRef.current.scrollTo(window.location.hash, {
//           offset: -120,
//           duration: 1,
//         })
//       }
//     }, 180)

//     return () => {
//       window.clearTimeout(timer)
//     }
//   }, [pathname])

//   return <>{children}</>
// }

// export default SmoothScrollProvider

'use client'

import { gsap, ScrollTrigger } from '@/lib/gsap'
import Lenis from 'lenis'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
}

function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousPathnameRef = useRef<string | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const lenis = new Lenis({
      //   duration: 1.2,
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      //   wheelMultiplier: 0.85,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.1,
      syncTouch: false,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    const refreshTimer = window.setTimeout(() => {
      lenis.resize()
      ScrollTrigger.refresh()
    }, 400)

    return () => {
      window.clearTimeout(refreshTimer)

      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()

      lenisRef.current = null

      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    const currentPathname = pathname
    const previousPathname = previousPathnameRef.current
    const isNewPage = previousPathname !== null && previousPathname !== currentPathname

    previousPathnameRef.current = currentPathname

    const timer = window.setTimeout(() => {
      lenis?.resize()
      ScrollTrigger.refresh()

      if (window.location.hash && lenis) {
        lenis.scrollTo(window.location.hash, {
          offset: -120,
          duration: 1,
          force: true,
        })

        return
      }

      if (isNewPage && lenis) {
        lenis.scrollTo(0, {
          immediate: true,
          force: true,
        })

        return
      }

      if (isNewPage) {
        window.scrollTo(0, 0)
      }
    }, 100)

    return () => {
      window.clearTimeout(timer)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}

export default SmoothScrollProvider
