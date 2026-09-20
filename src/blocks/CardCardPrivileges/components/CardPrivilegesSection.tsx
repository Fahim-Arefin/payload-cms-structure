'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { useBrowserLocation } from '@/hooks/useBrowserLocation'
import { usePageScroll } from '@/context/SmoothScrollProvider'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import type { CardPrivilegesBlockType } from '@/types/payloadCustomTypes'
import { resolveCardKey } from '../cardSelection'

type CardGroup = CardPrivilegesBlockType['cards'][number]

export default function CardPrivilegesSection({ block }: { block: CardPrivilegesBlockType }) {
  const location = useBrowserLocation()
  const [previousKey, setPreviousKey] = useState<string | null>(null)
  const cards = block.cards ?? []
  const activeKey = resolveCardKey(cards, location?.hash, previousKey, block.defaultCardKey)
  useEffect(() => {
    setPreviousKey(activeKey)
  }, [activeKey])
  const group = cards.find((card) => card.cardKey === activeKey)
  if (!group) return null
  return <PrivilegesCarousel key={group.cardKey} block={block} group={group} />
}

function PrivilegesCarousel({
  block,
  group,
}: {
  block: CardPrivilegesBlockType
  group: CardGroup
}) {
  const root = useRef<HTMLElement>(null)
  const scrollTo = usePageScroll()
  const viewport = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const imageFrame = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const controlTween = useRef<gsap.core.Tween | null>(null)
  const transitionTo = useRef<((index: number) => void) | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselId = useId()
  const items = group?.items ?? []
  const count = items.length
  const right = group?.cardPreference === 'right'
  const background = typeof block.groovyDesign === 'object' ? block.groovyDesign : null
  const card = typeof group?.cardImage === 'object' ? group.cardImage : null

  useGSAP(
    () => {
      if (!root.current || !frame.current || !content.current || !count) return
      const media = gsap.matchMedia()
      media.add(
        { all: '(min-width: 0px)', reduced: '(prefers-reduced-motion: reduce)' },
        (context) => {
          const element = root.current
          if (!element) return
          const reduced = Boolean(context.conditions?.reduced)
          const subtitles = gsap.utils.toArray<HTMLElement>(
            '[data-privilege-card-title]',
            root.current,
          )
          const images = gsap.utils.toArray<HTMLElement>('[data-privilege-image]', root.current)
          const copy = gsap.utils.toArray<HTMLElement>('[data-privilege-copy]', root.current)
          let settledIndex = 0
          let isTransitioning = false
          let synchronizingScroll = false
          // Animate only the outgoing and incoming slide. Scroll never controls
          // the playhead, and an in-flight transition cannot be interrupted.
          const renderTransition = (from: number, to: number, mix: number) => {
            for (let index = 0; index < count; index++) {
              const incoming = index === to
              const opacity = incoming ? mix : index === from ? 1 - mix : 0
              const y = reduced ? 0 : incoming ? -36 * (1 - mix) : 24 * mix
              gsap.set([subtitles[index], copy[index]], { autoAlpha: opacity, y })
              gsap.set(images[index], {
                autoAlpha: opacity,
                xPercent: reduced || incoming ? 0 : (right ? -35 : 35) * mix,
                y: reduced || !incoming ? 0 : -36 * (1 - mix),
              })
            }
          }
          renderTransition(0, 0, 1)
          const switchSlide = (index: number) => {
            const target = gsap.utils.clamp(0, count - 1, Math.round(index))
            if (isTransitioning || target === settledIndex) return
            const from = settledIndex
            isTransitioning = true
            const complete = () => {
              renderTransition(from, target, 1)
              settledIndex = target
              setActiveIndex(target)
              const pinned = trigger.current
              if (pinned && pinned.scroll() >= pinned.start && pinned.scroll() <= pinned.end) {
                synchronizingScroll = true
                // Stay inside the pin until the next gesture exits either end.
                scrollTo(
                  pinned.start + 1 + ((pinned.end - pinned.start - 2) * target) / (count - 1),
                )
                ScrollTrigger.update()
                synchronizingScroll = false
              }
              isTransitioning = false
            }
            if (reduced) {
              complete()
            } else {
              const transition = { mix: 0 }
              controlTween.current = gsap.to(transition, {
                mix: 1,
                duration: 0.55,
                ease: 'power2.inOut',
                onUpdate: () => renderTransition(from, target, transition.mix),
                onComplete: complete,
              })
            }
          }
          transitionTo.current = switchSlide
          const navbarHeight = () =>
            document.querySelector('header.sticky')?.getBoundingClientRect().height ?? 0
          const measure = () => {
            if (!root.current || !frame.current || !content.current) return
            const mobile = window.matchMedia('(max-width: 767px)').matches
            const fullWidth = window.matchMedia('(min-width: 1024px)').matches
            // The mobile viewport includes the navbar, with its content centered below it.
            gsap.set(viewport.current, { paddingTop: mobile ? navbarHeight() : 0 })
            const padding = getComputedStyle(root.current)
            const available = Math.max(
              1,
              window.innerHeight -
                navbarHeight() -
                parseFloat(padding.paddingTop) -
                parseFloat(padding.paddingBottom),
            )
            // Fill the visible screen below the desktop navbar without pushing
            // pagination below it. The section background covers this entire area.
            gsap.set(viewport.current, {
              minHeight: fullWidth ? available : mobile ? '100vh' : 0,
            })
            if (fullWidth && imageFrame.current && stage.current && panel.current) {
              // Reserve the actual heading, caption, and pagination heights first.
              // Constrain only the photo height so the layout retains its full width.
              const surroundingHeight = content.current.offsetHeight - stage.current.offsetHeight
              const naturalImageHeight = (imageFrame.current.clientWidth * 412) / 841
              const imageHeight = Math.max(
                panel.current.offsetHeight,
                Math.min(naturalImageHeight, available - surroundingHeight),
              )
              gsap.set(imageFrame.current, { height: imageHeight })
            } else if (imageFrame.current) {
              gsap.set(imageFrame.current, { clearProps: 'height' })
            }
            const naturalHeight = content.current.offsetHeight
            const scale =
              reduced || count === 1 || fullWidth
                ? 1
                : Math.min(1, available / Math.max(1, naturalHeight))
            gsap.set(content.current, { scale, transformOrigin: 'top center' })
            gsap.set(frame.current, { height: naturalHeight * scale })
          }
          measure()
          ScrollTrigger.addEventListener('refreshInit', measure)
          if (!reduced && count > 1) {
            trigger.current = ScrollTrigger.create({
              trigger: root.current,
              pin: root.current,
              start: () =>
                'top ' +
                (window.matchMedia('(max-width: 767px)').matches ? 0 : navbarHeight()) +
                'px',
              end: () => '+=' + (count - 1) * Math.max(500, window.innerHeight * 0.85),
              onUpdate: (self) => {
                if (!synchronizingScroll) switchSlide(Math.round(self.progress * (count - 1)))
              },
              onRefresh: (self) => switchSlide(Math.round(self.progress * (count - 1))),
              anticipatePin: 1,
              invalidateOnRefresh: true,
            })
          }
          let gestureLocked = false
          let wheelTimer: ReturnType<typeof setTimeout> | undefined
          let touchStartY = 0
          const consumeGesture = (direction: number, event: WheelEvent | TouchEvent) => {
            const pinned = trigger.current
            if (!pinned || pinned.scroll() < pinned.start || pinned.scroll() > pinned.end) return
            const next = settledIndex + direction
            if (!isTransitioning && !gestureLocked && (next < 0 || next >= count)) return
            event.preventDefault()
            event.stopPropagation()
            if (isTransitioning || gestureLocked) return
            gestureLocked = true
            // Stop any remaining smooth-scroll momentum before playing the full transition.
            synchronizingScroll = true
            scrollTo(pinned.scroll())
            ScrollTrigger.update()
            synchronizingScroll = false
            switchSlide(next)
          }
          const onWheel = (event: WheelEvent) => {
            if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX) || !event.deltaY)
              return
            consumeGesture(event.deltaY > 0 ? 1 : -1, event)
            clearTimeout(wheelTimer)
            wheelTimer = setTimeout(() => {
              gestureLocked = false
            }, 180)
          }
          const onTouchStart = (event: TouchEvent) => {
            if (event.touches.length === 1) {
              touchStartY = event.touches[0].clientY
              gestureLocked = false
            }
          }
          const onTouchMove = (event: TouchEvent) => {
            if (event.touches.length !== 1) return
            const delta = touchStartY - event.touches[0].clientY
            if (Math.abs(delta) >= 10) consumeGesture(delta > 0 ? 1 : -1, event)
          }
          const onTouchEnd = () => {
            gestureLocked = false
          }
          element.addEventListener('wheel', onWheel, { passive: false })
          element.addEventListener('touchstart', onTouchStart, { passive: true })
          element.addEventListener('touchmove', onTouchMove, { passive: false })
          element.addEventListener('touchend', onTouchEnd)
          element.addEventListener('touchcancel', onTouchEnd)
          let mounted = true
          const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
          document.fonts.ready.then(() => {
            if (mounted) ScrollTrigger.refresh()
          })
          let resizeFrame = 0
          const observer = new ResizeObserver(() => {
            cancelAnimationFrame(resizeFrame)
            resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
          })
          if (content.current) observer.observe(content.current)
          return () => {
            mounted = false
            cancelAnimationFrame(refreshFrame)
            cancelAnimationFrame(resizeFrame)
            observer.disconnect()
            ScrollTrigger.removeEventListener('refreshInit', measure)
            controlTween.current?.kill()
            trigger.current?.kill()
            trigger.current = null
            clearTimeout(wheelTimer)
            element.removeEventListener('wheel', onWheel)
            element.removeEventListener('touchstart', onTouchStart)
            element.removeEventListener('touchmove', onTouchMove)
            element.removeEventListener('touchend', onTouchEnd)
            element.removeEventListener('touchcancel', onTouchEnd)
            transitionTo.current = null
          }
        },
      )
      return () => media.revert()
    },
    { scope: root, dependencies: [items, right, count, scrollTo], revertOnUpdate: true },
  )

  const select = (index: number) => {
    const target = Math.max(0, Math.min(count - 1, index))
    transitionTo.current?.(target)
  }

  if (!count) return null

  return (
    <section
      ref={root}
      aria-label="Card privileges"
      aria-roledescription="carousel"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          select(activeIndex + (event.key === 'ArrowRight' ? 1 : -1))
        }
      }}
      className={`container-padding-x relative isolate overflow-hidden bg-[#1E1E1E] text-white md:container-padding lg:!py-6 ${group.showLight ? "bg-[url('/assets/images/dora3.png')] bg-[length:100%_100%] bg-center bg-no-repeat bg-origin-border bg-blend-screen" : ''}`}
    >
      {background?.url && (
        <Image
          src={background.url}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      )}
      <div
        ref={viewport}
        className="relative flex min-h-screen w-full items-center md:block md:min-h-0 lg:flex lg:min-h-screen"
      >
        <div ref={frame} className="relative w-full">
          <div ref={content} id={carouselId} className="relative w-full">
            <div className="relative isolate mx-auto grid min-h-24 w-fit max-w-full items-center px-10 py-4 sm:min-h-28 lg:min-h-[clamp(5rem,14svh,9rem)] lg:px-16">
              {card?.url && (
                <div
                  className={`pointer-events-none absolute top-0 z-0 aspect-[726/1146] w-16 -rotate-[38deg] sm:w-20 lg:-top-2 lg:w-20 xl:w-28 ${right ? 'left-6 sm:left-2 lg:left-auto lg:right-12' : 'left-6 sm:left-2 lg:left-12'}`}
                >
                  <Image
                    src={card.url}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1280px) 112px, (min-width: 640px) 80px, 64px"
                    className="object-contain"
                  />
                </div>
              )}
              <div className="relative z-10 text-center">
                <h2 className="font-exo-2 text-[clamp(1.5rem,2.8vw,3.25rem)] font-bold uppercase leading-tight text-[#F8F8F9]">
                  {group.sectionTitle}{' '}
                  <span className="inline-block font-baltiholm text-[1.35em] font-normal normal-case text-[#E5262D]">
                    {group.sectionSubtitle}
                  </span>
                </h2>
              </div>
            </div>
            <div
              className={`mb-5 mt-4 grid text-center lg:my-3 ${right ? 'lg:text-right' : 'lg:text-left'}`}
            >
              {items.map((item, index) => (
                <div
                  key={item.id ?? index}
                  data-privilege-card-title
                  aria-hidden={index !== activeIndex}
                  className={`col-start-1 row-start-1 ${index ? 'invisible' : ''}`}
                >
                  <h3 className="font-baltiholm text-3xl font-normal leading-tight sm:text-4xl lg:text-[clamp(2rem,5svh,3.75rem)]">
                    {item.cardTitle}
                  </h3>
                  <p className="mt-2 font-roboto text-sm font-normal sm:text-lg lg:text-2xl">
                    {item.cardSubtitle}
                  </p>
                </div>
              ))}
            </div>
            <div ref={stage} className="grid grid-cols-1 lg:grid-cols-12 lg:items-center">
              <div
                ref={imageFrame}
                className={`relative grid overflow-hidden rounded-t-lg lg:row-start-1 lg:rounded-2xl ${right ? 'lg:col-start-1 lg:col-end-9' : 'lg:col-start-5 lg:col-end-13'}`}
              >
                {items.map((item, index) => {
                  const photo =
                    typeof item.privilegesImage === 'object' ? item.privilegesImage : null
                  return (
                    <div
                      key={item.id ?? index}
                      data-privilege-image
                      aria-hidden={index !== activeIndex}
                      className={`relative col-start-1 row-start-1 aspect-[841/412] w-full lg:aspect-auto lg:h-full ${index ? 'invisible' : ''}`}
                    >
                      {photo?.url && (
                        <Image
                          src={photo.url}
                          alt={item.privilegesName}
                          fill
                          unoptimized
                          loading="eager"
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
              <div
                ref={panel}
                className={`relative z-10 grid overflow-hidden rounded-b-lg border border-white/20 bg-[#E5262D4D] px-5 py-5 backdrop-blur-xl sm:px-8 sm:py-7 lg:row-start-1 lg:rounded-3xl lg:px-10 lg:py-8 ${right ? 'lg:col-start-6 lg:col-end-13' : 'lg:col-start-1 lg:col-end-8'}`}
              >
                {items.map((item, index) => (
                  <div
                    key={item.id ?? index}
                    data-privilege-copy
                    aria-hidden={index !== activeIndex}
                    className={`col-start-1 row-start-1 ${index ? 'invisible' : ''}`}
                  >
                    <h4 className="font-exo-2 text-base font-bold uppercase leading-tight sm:text-xl lg:text-[clamp(1.125rem,3svh,1.875rem)]">
                      {item.privilegesName}
                    </h4>
                    <p className="mt-3 whitespace-pre-line font-roboto text-sm font-light leading-relaxed sm:text-lg lg:text-[clamp(1rem,2.4svh,1.5rem)]">
                      {item.privilegesDescription}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {count > 1 && (
              <div className="mt-3 flex justify-center lg:mt-5" aria-label="Choose privilege">
                {items.map((item, index) => (
                  <button
                    key={item.id ?? index}
                    type="button"
                    aria-label={`Show privilege ${index + 1}: ${item.privilegesName}`}
                    aria-controls={carouselId}
                    aria-current={activeIndex === index ? 'true' : undefined}
                    onClick={() => select(index)}
                    className="flex h-11 min-w-9 items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span
                      className={`h-1.5 rounded-[1px] transition-[width,background-color] motion-reduce:transition-none ${activeIndex === index ? 'w-6 bg-[#E5262D]' : 'w-2 bg-white/80'}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Privilege {activeIndex + 1} of {count}: {items[activeIndex]?.privilegesName}
      </p>
    </section>
  )
}
