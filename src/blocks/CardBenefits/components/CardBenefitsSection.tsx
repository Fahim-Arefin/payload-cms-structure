'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import { useBrowserLocation } from '@/hooks/useBrowserLocation'
import { usePageScroll } from '@/context/SmoothScrollProvider'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { resolveCardKey } from '../../CardCardPrivileges/cardSelection'
import type { CardBenefitsBlockType } from '@/types/payloadCustomTypes'
import { benefitStackPosition } from './stackPositions'

type CardGroup = CardBenefitsBlockType['cards'][number]

export default function CardBenefitsSection({ block }: { block: CardBenefitsBlockType }) {
  const location = useBrowserLocation()
  const [previous, setPrevious] = useState<string | null>(null)
  const cards = block.cards ?? []
  const key = resolveCardKey(cards, location?.hash, previous, block.defaultCardKey)
  useEffect(() => {
    setPrevious(key)
  }, [key])
  const group = cards.find((card) => card.cardKey === key)
  return group ? <BenefitsCarousel key={group.cardKey} block={block} group={group} /> : null
}

function BenefitsCarousel({ block, group }: { block: CardBenefitsBlockType; group: CardGroup }) {
  const root = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const header = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const pagination = useRef<HTMLDivElement>(null)
  const selectRef = useRef<((index: number) => void) | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollTo = usePageScroll()
  const headingId = useId()
  const stageId = useId()
  const items = group.items ?? []
  const count = items.length
  const artwork = typeof group.cardImage === 'object' ? group.cardImage : null
  const groovy = typeof block.groovyDesign === 'object' ? block.groovyDesign : null

  useGSAP(
    () => {
      const element = root.current
      if (!element || !stage.current || !content.current || !count) return
      const media = gsap.matchMedia()
      media.add(
        {
          desktop: '(min-width: 1024px)',
          wide: '(min-width: 1280px)',
          extraWide: '(min-width: 1536px)',
          small: '(max-width: 1023px)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const desktop = Boolean(context.conditions?.desktop)
          const visibleCount = context.conditions?.extraWide ? 5 : context.conditions?.wide ? 4 : 3
          const lastSlot = benefitStackPosition(
            Math.min(count, visibleCount) - 1,
            0,
            count,
            desktop,
            visibleCount,
          )
          const stackSpan = lastSlot.x + lastSlot.scale
          const reduced = Boolean(context.conditions?.reduced)
          const cards = gsap.utils.toArray<HTMLElement>('[data-benefit-card]', element)
          let selected = 0
          let busy = false
          let synchronizing = false
          let trigger: ScrollTrigger | null = null
          let animation: gsap.core.Timeline | null = null
          let width = 320
          let height = 448
          let stageWidth = 0
          const navbarHeight = () =>
            document.querySelector('header.sticky')?.getBoundingClientRect().height ?? 0
          const pose = (index: number, active = selected) => {
            const position = benefitStackPosition(index, active, count, desktop, visibleCount)
            return {
              x: desktop
                ? (stageWidth - width * stackSpan) / 2 + position.x * width
                : (stageWidth - width * position.scale) / 2,
              y: desktop ? position.y * height : position.y,
              scale: position.scale,
              rotation: position.rotation,
              autoAlpha: position.autoAlpha,
              zIndex: position.zIndex,
            }
          }
          const settle = () => cards.forEach((card, index) => gsap.set(card, pose(index)))
          const measure = () => {
            if (!stage.current || !content.current) return
            const padding = getComputedStyle(element)
            const topPadding = Math.max(24, navbarHeight())
            // Keep a full-screen patterned section, with the visible content below the navbar.
            gsap.set(element, {
              height: window.innerHeight,
              minHeight: window.innerHeight,
              paddingTop: topPadding,
            })
            const available = Math.max(
              100,
              window.innerHeight - topPadding - parseFloat(padding.paddingBottom),
            )
            stageWidth = content.current.clientWidth
            const surrounding =
              (header.current?.offsetHeight ?? 0) + (pagination.current?.offsetHeight ?? 0) + 32
            const space = Math.max(80, available - surrounding - (desktop ? 0 : 40))
            width = desktop ? stageWidth / stackSpan : Math.min(stageWidth / 1.08, space / 1.4)
            height = desktop ? Math.min(width * 1.4, space) : width * 1.4
            gsap.set(cards, {
              width,
              height,
              transformOrigin: 'top left',
              '--benefit-type-width': `${Math.min(width, height / 1.4)}px`,
            })
            // Long CMS text gets more panel height before the whole stack is fitted.
            const panels = cards.map((card) =>
              card.querySelector<HTMLElement>('[data-benefit-panel]'),
            )
            const needed = Math.max(
              height * 0.42,
              ...panels.map((panel) => panel?.scrollHeight ?? 0),
            )
            const ratio = Math.max(1.4, needed / (0.42 * Math.max(1, width)))
            if (!desktop) {
              width = Math.min(width, space / ratio)
              height = width * ratio
            }
            gsap.set(cards, { width, height })
            gsap.set(stage.current, { height: height + (desktop ? 0 : 40) })
            if (!busy) settle()
            // Very short windows still show the entire title, stack and pagination.
            gsap.set(content.current, { scale: 1, transformOrigin: 'center center' })
            const scale = Math.min(1, available / Math.max(1, content.current.offsetHeight))
            gsap.set(content.current, { scale })
          }
          const switchTo = (requested: number) => {
            const target = Math.max(0, Math.min(count - 1, requested))
            if (busy || target === selected) return
            busy = true
            const previous = selected
            const forward = target > previous
            const moving = forward ? previous : target
            const complete = () => {
              selected = target
              settle()
              setActiveIndex(target)
              if (trigger && trigger.scroll() >= trigger.start && trigger.scroll() <= trigger.end) {
                synchronizing = true
                scrollTo(
                  trigger.start + 1 + ((trigger.end - trigger.start - 2) * target) / (count - 1),
                )
                ScrollTrigger.update()
                synchronizing = false
              }
              busy = false
            }
            if (reduced) {
              complete()
              return
            }
            animation = gsap.timeline({ onComplete: complete })
            if (!forward) {
              const { zIndex, ...destination } = pose(moving, target)
              // Bring the back card around the lower edge before lifting it to the front.
              // Its current transform is preserved so visible cards never jump or blink.
              animation.to(
                cards[moving],
                {
                  x: destination.x + width * (desktop ? 0.3 : 0.06),
                  y: destination.y + height * (desktop ? 0.26 : 0.18),
                  rotation: desktop ? 7 : -9,
                  scale: desktop ? 0.93 : 1.02,
                  autoAlpha: 1,
                  duration: 0.32,
                  ease: 'power2.inOut',
                },
                0,
              )
              cards.forEach((card, index) => {
                if (index === moving) return
                const { zIndex: nextLayer, ...nextPose } = pose(index, target)
                animation?.set(card, { zIndex: nextLayer }, 0.32)
                animation?.to(card, { ...nextPose, duration: 0.55, ease: 'power3.inOut' }, 0.2)
              })
              animation.set(cards[moving], { zIndex }, 0.32)
              animation.to(
                cards[moving],
                { ...destination, duration: 0.48, ease: 'power3.out' },
                0.32,
              )
              return
            }
            if (forward) {
              // Desktop slides down and right; mobile tips forward and drops under the pile.
              animation.to(
                cards[moving],
                {
                  x: pose(moving).x + width * (desktop ? 0.3 : 0.06),
                  y: pose(moving).y + height * (desktop ? 0.26 : 0.18),
                  rotation: desktop ? 7 : -9,
                  scale: desktop ? 0.93 : 1.02,
                  autoAlpha: 0,
                  duration: 0.3,
                  ease: 'power2.in',
                },
                0,
              )
            }
            cards.forEach((card, index) => {
              if (index === moving) return
              const { zIndex, ...destination } = pose(index, target)
              animation?.set(card, { zIndex }, 0.2)
              animation?.to(card, { ...destination, duration: 0.5, ease: 'power3.inOut' }, 0.12)
            })
            const { zIndex, ...destination } = pose(moving, target)
            animation.set(cards[moving], { zIndex }, forward ? 0.3 : 0)
            animation.to(
              cards[moving],
              { ...destination, duration: forward ? 0.35 : 0.6, ease: 'power3.out' },
              forward ? 0.3 : 0,
            )
          }
          selectRef.current = switchTo
          measure()
          ScrollTrigger.addEventListener('refreshInit', measure)
          if (count > 1 && !reduced) {
            trigger = ScrollTrigger.create({
              trigger: element,
              pin: element,
              start: 'top top',
              end: () => '+=' + (count - 1) * Math.max(500, window.innerHeight * 0.85),
              onUpdate: (self) => {
                if (!synchronizing) switchTo(Math.round(self.progress * (count - 1)))
              },
              anticipatePin: 1,
              invalidateOnRefresh: true,
            })
          }
          let gestureLocked = false
          let wheelTimer: ReturnType<typeof setTimeout> | undefined
          let touchY = 0
          const consume = (direction: number, event: WheelEvent | TouchEvent) => {
            if (!trigger || trigger.scroll() < trigger.start || trigger.scroll() > trigger.end)
              return
            const next = selected + direction
            if (!busy && !gestureLocked && (next < 0 || next >= count)) return
            event.preventDefault()
            event.stopPropagation()
            if (busy || gestureLocked) return
            gestureLocked = true
            synchronizing = true
            scrollTo(trigger.scroll())
            ScrollTrigger.update()
            synchronizing = false
            switchTo(next)
          }
          const onWheel = (event: WheelEvent) => {
            if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX) || !event.deltaY)
              return
            consume(event.deltaY > 0 ? 1 : -1, event)
            clearTimeout(wheelTimer)
            wheelTimer = setTimeout(() => {
              gestureLocked = false
            }, 180)
          }
          const onTouchStart = (event: TouchEvent) => {
            if (event.touches.length === 1) {
              touchY = event.touches[0].clientY
              gestureLocked = false
            }
          }
          const onTouchMove = (event: TouchEvent) => {
            if (event.touches.length === 1) {
              const delta = touchY - event.touches[0].clientY
              if (Math.abs(delta) >= 10) consume(delta > 0 ? 1 : -1, event)
            }
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
          let frame = requestAnimationFrame(() => ScrollTrigger.refresh())
          const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => ScrollTrigger.refresh())
          })
          if (header.current) observer.observe(header.current)
          document.fonts.ready.then(() => {
            if (mounted) ScrollTrigger.refresh()
          })
          return () => {
            mounted = false
            observer.disconnect()
            cancelAnimationFrame(frame)
            clearTimeout(wheelTimer)
            animation?.kill()
            trigger?.kill()
            ScrollTrigger.removeEventListener('refreshInit', measure)
            element.removeEventListener('wheel', onWheel)
            element.removeEventListener('touchstart', onTouchStart)
            element.removeEventListener('touchmove', onTouchMove)
            element.removeEventListener('touchend', onTouchEnd)
            element.removeEventListener('touchcancel', onTouchEnd)
            selectRef.current = null
          }
        },
      )
      return () => media.revert()
    },
    { scope: root, dependencies: [items, count, scrollTo], revertOnUpdate: true },
  )

  if (!count) return null
  return (
    <section
      ref={root}
      aria-labelledby={headingId}
      className="container-padding-x relative isolate flex min-h-screen items-center overflow-hidden bg-[#1E1E1E] py-6 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/images/dora5.png')] bg-[length:100%_100%] bg-center bg-no-repeat  mix-blend-screen"
      />
      {groovy?.url && (
        <Image
          src={groovy.url}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      )}
      <div ref={content} className="relative w-full">
        <div ref={header} className="mb-5 text-center lg:mb-8">
          <div className="relative isolate mx-auto w-fit max-w-full px-7 py-4 lg:px-16">
            {artwork?.url && (
              <div className="pointer-events-none absolute right-3 top-0 -z-10 aspect-[726/1146] w-12 rotate-[38deg] sm:w-16 lg:right-8 lg:w-20 xl:w-28">
                <Image
                  src={artwork.url}
                  alt=""
                  fill
                  unoptimized
                  sizes="(min-width: 1280px) 112px, 80px"
                  className="object-contain"
                />
              </div>
            )}
            <h2
              id={headingId}
              className="text-[clamp(1.5rem,2.8vw,3.25rem)] leading-tight text-[#F8F8F9]"
            >
              <span className="block font-baltiholm text-[1.35em] font-normal lg:inline">
                {block.title}{' '}
              </span>
              <strong className="font-exo-2 font-bold uppercase text-[#E5262D]">
                {group.cardName}
              </strong>{' '}
              <span className="font-baltiholm text-[1.35em] font-normal">benefits.</span>
            </h2>
          </div>
          <p className="mx-auto max-w-4xl font-roboto text-xs font-light text-white/75 sm:text-sm lg:text-base">
            {block.description}
          </p>
        </div>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={`${group.cardName} benefits`}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault()
              selectRef.current?.(activeIndex + (event.key === 'ArrowRight' ? 1 : -1))
            }
          }}
        >
          <div ref={stage} id={stageId} className="relative h-[420px] w-full">
            {items.map((item, index) => {
              const photo = typeof item.image === 'object' ? item.image : null
              return (
                <article
                  key={item.id ?? index}
                  data-benefit-card
                  aria-hidden={index !== activeIndex}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}: ${item.title}`}
                  className={`absolute left-0 top-0 flex h-[380px] w-[270px] flex-col overflow-hidden rounded-2xl bg-[#111110] shadow-[0_12px_30px_rgba(0,0,0,0.4)] [container-type:inline-size] lg:rounded-3xl ${index ? 'invisible' : ''}`}
                >
                  {photo?.url && (
                    <Image
                      src={photo.url}
                      alt=""
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="pointer-events-none object-cover"
                    />
                  )}
                  <div className="relative h-[58%] shrink-0 overflow-hidden">
                    {photo?.url && (
                      <Image
                        src={photo.url}
                        alt={item.title}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 45vw, 90vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div
                    data-benefit-panel
                    className="relative flex min-h-0 flex-1 flex-col items-center justify-between gap-[2cqw] bg-black/75 px-[7%] py-[6%] text-center backdrop-blur-xl lg:gap-[calc(var(--benefit-type-width)*0.02)] lg:py-[calc(var(--benefit-type-width)*0.06)]"
                  >
                    <h3 className="font-exo-2 text-[4.8cqw] font-bold leading-tight lg:text-[length:calc(var(--benefit-type-width)*0.048)]">
                      {item.title}
                    </h3>
                    <p className="font-roboto text-[3.4cqw] font-light leading-[1.3] text-white/80 lg:text-[length:calc(var(--benefit-type-width)*0.034)]">
                      {item.description}
                    </p>
                    <span className="font-roboto text-[3.2cqw] font-light uppercase leading-tight text-white/85 lg:text-[length:calc(var(--benefit-type-width)*0.032)]">
                      {item.infoText}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
          <div
            ref={pagination}
            className="mt-3 flex flex-wrap justify-center"
            aria-label="Choose a benefit"
          >
            {count > 1 &&
              items.map((item, index) => (
                <button
                  key={item.id ?? index}
                  type="button"
                  aria-label={`Show benefit ${index + 1}: ${item.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-controls={stageId}
                  onClick={() => selectRef.current?.(index)}
                  className="flex h-11 min-w-9 items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span
                    className={`h-1.5 rounded-[1px] transition-[width,background-color] motion-reduce:transition-none ${index === activeIndex ? 'w-6 bg-[#E5262D]' : 'w-2 bg-white/80'}`}
                  />
                </button>
              ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Benefit {activeIndex + 1} of {count}: {items[activeIndex]?.title}
        </p>
      </div>
    </section>
  )
}
