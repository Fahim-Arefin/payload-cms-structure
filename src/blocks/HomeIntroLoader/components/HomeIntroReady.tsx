'use client'

import { useEffect, useRef } from 'react'
import { INTRO_READY_EVENT } from '../introState'

export default function HomeIntroReady() {
  const marker = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    marker.current?.setAttribute('data-home-intro-ready', 'true')
    window.dispatchEvent(new Event(INTRO_READY_EVENT))
  }, [])

  return <span ref={marker} hidden data-home-intro-ready="false" />
}
