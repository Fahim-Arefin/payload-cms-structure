'use client'

import Image from 'next/image'
import { useId, useRef, useState } from 'react'
import { useActiveCard } from '@/contexts/ActiveCardContext'
import { usePageScroll } from '@/context/SmoothScrollProvider'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import type { CardPrivilegesBlockType } from '@/types/payloadCustomTypes'

type CardGroup = CardPrivilegesBlockType['metalCard']

export default function CardPrivilegesSection({ block }: { block: CardPrivilegesBlockType }) {
  const { activeCard } = useActiveCard()
  const group = activeCard === 'visaInfinite' ? block.visaInfinite : block.metalCard
  return <PrivilegesCarousel key={activeCard} block={block} group={group} />
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
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const controlTween = useRef<gsap.core.Tween | null>(null)
  const reducedMotion = useRef(false)
  const selectedIndex = useRef(0)
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
          const reduced = Boolean(context.conditions?.reduced)
          reducedMotion.current = reduced
          const headings = gsap.utils.toArray<HTMLElement>('[data-privilege-heading]', root.current)
          const subtitles = gsap.utils.toArray<HTMLElement>(
            '[data-privilege-card-title]',
            root.current,
          )
          const images = gsap.utils.toArray<HTMLElement>('[data-privilege-image]', root.current)
          const copy = gsap.utils.toArray<HTMLElement>('[data-privilege-copy]', root.current)
          const phase = { value: 0 }
          // One playhead gives identical results when reversing scroll, jumping with
          // a dot, or refreshing a pinned section. The red panel and card never move.
          const render = () => {
            const from = Math.min(count - 1, Math.floor(phase.value))
            const progress = gsap.utils.clamp(0, 1, (phase.value - from - 0.2) / 0.8)
            const mix = progress * progress * (3 - 2 * progress)
            for (let index = 0; index < count; index++) {
              const incoming = index === from + 1
              const opacity = index === from ? 1 - mix : incoming ? mix : 0
              const y = reduced ? 0 : incoming ? -36 * (1 - mix) : 24 * mix
              gsap.set([headings[index], subtitles[index], copy[index]], { autoAlpha: opacity, y })
              gsap.set(images[index], {
                autoAlpha: opacity,
                xPercent: reduced || incoming ? 0 : (right ? -35 : 35) * mix,
                y: reduced || !incoming ? 0 : -36 * (1 - mix),
              })
            }
            const next = Math.min(count - 1, from + (mix >= 0.5 ? 1 : 0))
            if (next !== selectedIndex.current) {
              selectedIndex.current = next
              setActiveIndex(next)
            }
          }
          render()
          const animation = gsap.timeline({ paused: true }).fromTo(
            phase,
            { value: 0 },
            {
              value: Math.max(0, count - 1),
              duration: Math.max(1, count - 1),
              ease: 'none',
              onUpdate: render,
            },
          )
          timeline.current = animation
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
              animation,
              scrub: 0.6,
              snap: { snapTo: 1 / (count - 1), delay: 0.2, duration: { min: 0.15, max: 0.4 } },
              anticipatePin: 1,
              invalidateOnRefresh: true,
            })
          }
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
            animation.kill()
            timeline.current = null
          }
        },
      )
      return () => media.revert()
    },
    { scope: root, dependencies: [items, right, count], revertOnUpdate: true },
  )

  const select = (index: number) => {
    const target = Math.max(0, Math.min(count - 1, index))
    controlTween.current?.kill()
    if (trigger.current) {
      const scroll =
        trigger.current.start +
        ((trigger.current.end - trigger.current.start) * target) / (count - 1)
      scrollTo(scroll)
      ScrollTrigger.update()
    } else if (reducedMotion.current) {
      timeline.current?.time(target, false)
    } else {
      controlTween.current = timeline.current?.tweenTo(target, { duration: 0.55 }) ?? null
    }
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
      className="container-padding-x relative isolate overflow-hidden bg-[#1E1E1E] text-white md:container-padding lg:!py-6"
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
        className="relative flex min-h-screen w-full items-center md:block md:min-h-0"
      >
        <div ref={frame} className="relative w-full">
          <div ref={content} id={carouselId} className="relative w-full">
            <div className="relative isolate mx-auto grid min-h-24 w-fit max-w-full items-center px-10 py-4 sm:min-h-28 lg:min-h-[clamp(5rem,14svh,9rem)] lg:px-16">
              {card?.url && (
                <div
                  className={`pointer-events-none absolute top-0 z-0 aspect-[726/1146] w-14 -rotate-[38deg] sm:w-20 lg:-top-2 lg:w-28 ${right ? 'left-2 lg:left-auto lg:right-12' : 'left-2 lg:left-12'}`}
                >
                  <Image
                    src={card.url}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 112px, 80px"
                    className="object-contain"
                  />
                </div>
              )}
              {items.map((item, index) => (
                <div
                  key={item.id ?? index}
                  data-privilege-heading
                  aria-hidden={index !== activeIndex}
                  className={`relative z-10 col-start-1 row-start-1 text-center ${index ? 'invisible' : ''}`}
                >
                  <h2 className="font-exo-2 text-[clamp(1.5rem,2.8vw,3.25rem)] font-bold uppercase leading-tight text-[#F8F8F9]">
                    {item.sectionTitle}{' '}
                    <span className="inline-block font-baltiholm text-[1.35em] font-normal normal-case text-[#E5262D]">
                      {item.sectionSubtitle}
                    </span>
                  </h2>
                </div>
              ))}
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
