'use client'

import { useId, useRef, useState } from 'react'
import Image from 'next/image'
import { useActiveCard } from '@/contexts/ActiveCardContext'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import type { CardBenefitsBlockType } from '@/types/payloadCustomTypes'
import { carouselPosition } from './carouselPositions'
import styles from './cardBenefits.module.css'

type Benefit = CardBenefitsBlockType['metalBenefits'][number]

export default function CardBenefitsSection({ block }: { block: CardBenefitsBlockType }) {
  const { activeCard } = useActiveCard()
  const visa = activeCard === 'visaInfinite'
  const items = (visa ? block.visaBenefits : block.metalBenefits) ?? []
  return (
    <BenefitsCarousel
      key={activeCard}
      block={block}
      items={items}
      cardName={visa ? block.visaCardName : block.metalCardName}
      cardImage={visa ? block.visaCardImage : block.metalCardImage}
    />
  )
}

function BenefitsCarousel({
  block,
  items,
  cardName,
  cardImage,
}: {
  block: CardBenefitsBlockType
  items: Benefit[]
  cardName: string
  cardImage: CardBenefitsBlockType['metalCardImage']
}) {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const orbit = useRef<HTMLDivElement>(null)
  const carousel = useRef<HTMLDivElement>(null)
  const pagination = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLElement | null)[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const controlTween = useRef<gsap.core.Tween | null>(null)
  const reducedMotion = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const selected = useRef(0)
  const headingId = useId()
  const stageId = useId()
  const count = items.length
  const groovy = typeof block.groovyDesign === 'object' ? block.groovyDesign : null
  const artwork = typeof cardImage === 'object' ? cardImage : null

  useGSAP(
    () => {
      if (!root.current || !stage.current || !carousel.current || !count) return
      const media = gsap.matchMedia()
      media.add(
        { reduced: '(prefers-reduced-motion: reduce)', all: '(min-width: 0px)' },
        (context) => {
          const reduced = Boolean(context.conditions?.reduced)
          reducedMotion.current = reduced
          const elements = cards.current.filter((card): card is HTMLElement => Boolean(card))
          const panels = elements.map((card) =>
            card.querySelector<HTMLElement>('[data-benefit-panel]'),
          )
          const playhead = { phase: 0 }
          let aspect = 1.33
          const navbarHeight = () =>
            document.querySelector('header.sticky')?.getBoundingClientRect().height ?? 0
          const renderOrbit = () => {
            elements.forEach((card, index) => {
              const { panelAlpha, ...position } = carouselPosition(
                index,
                playhead.phase,
                count,
                aspect,
              )
              // Reset pixel translations: CSS percentage transforms must never accumulate
              // with GSAP's parsed x/y offsets.
              gsap.set(card, { x: 0, y: 0, ...position, transformOrigin: 'top center' })
              gsap.set(panels[index], { backgroundColor: 'rgba(12,12,11,' + panelAlpha + ')' })
            })
            const next = Math.round(playhead.phase) % count
            if (next !== selected.current) {
              selected.current = next
              setActiveIndex(next)
            }
          }
          const measure = () => {
            if (!root.current || !stage.current) return
            // Only the carousel pins; the heading and section padding scroll away.
            const availableHeight = Math.max(
              1,
              window.innerHeight - navbarHeight() - (pagination.current?.offsetHeight ?? 0) - 32,
            )
            const left = carouselPosition(2, 0, 3)
            const right = carouselPosition(1, 0, 3)
            const span = (right.xPercent - left.xPercent) / 100 + (left.scale + right.scale) / 2
            const width = Math.min(stage.current.clientWidth / span, availableHeight / 1.8)
            if (width <= 0) return
            gsap.set(root.current, {
              '--card-width': width + 'px',
              '--navbar-height': navbarHeight() + 'px',
            })
            gsap.set(elements, { height: width * 1.33 })
            const height = Math.max(
              width * 1.33,
              ...panels.map((panel) => (panel?.scrollHeight ?? 0) / 0.375),
            )
            aspect = height / width
            gsap.set(elements, { height })
            // Reserve the entire circular path, including its lowest intermediate point.
            let orbitHeight = 0
            for (let sample = 0; sample <= 120; sample++) {
              const point = carouselPosition(0, (sample / 120) * count, count, aspect)
              orbitHeight = Math.max(orbitHeight, height * (point.yPercent / 100 + point.scale))
            }
            const fit = Math.min(1, availableHeight / orbitHeight)
            gsap.set(orbit.current, {
              height: orbitHeight,
              scale: fit,
              transformOrigin: 'top center',
            })
            gsap.set(stage.current, { height: orbitHeight * fit })
            renderOrbit()
          }
          measure()
          ScrollTrigger.addEventListener('refreshInit', measure)
          const timeline = gsap.timeline({ paused: true })
          timeline.fromTo(
            playhead,
            { phase: 0 },
            {
              phase: count,
              duration: count,
              ease: 'none',
              onUpdate: renderOrbit,
            },
          )
          timelineRef.current = timeline
          if (!reduced && count > 1) {
            triggerRef.current = ScrollTrigger.create({
              trigger: carousel.current,
              pin: carousel.current,
              start: () => 'top ' + (navbarHeight() + 16) + 'px',
              end: () => '+=' + count * Math.max(400, window.innerHeight * 0.65),
              animation: timeline,
              scrub: 0.7,
              snap: { snapTo: 1 / count, delay: 0.15, duration: { min: 0.2, max: 0.5 } },
              anticipatePin: 1,
              invalidateOnRefresh: true,
            })
          }
          return () => {
            controlTween.current?.kill()
            ScrollTrigger.removeEventListener('refreshInit', measure)
            triggerRef.current?.kill()
            triggerRef.current = null
            timeline.kill()
            timelineRef.current = null
          }
        },
      )
      let mounted = true
      const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
      document.fonts.ready.then(() => {
        if (mounted) ScrollTrigger.refresh()
      })
      return () => {
        mounted = false
        cancelAnimationFrame(frame)
        media.revert()
      }
    },
    { scope: root, dependencies: [count], revertOnUpdate: true },
  )

  const selectBenefit = (index: number) => {
    const next = (index + count) % count
    const trigger = triggerRef.current
    const timeline = timelineRef.current
    if (!timeline) return
    controlTween.current?.kill()
    if (trigger?.pin) {
      window.scrollTo({
        top: trigger.start + ((trigger.end - trigger.start) * next) / count,
        behavior: 'smooth',
      })
    } else {
      // On mobile and with reduced motion, controls work without moving the page.
      trigger?.getTween()?.pause()
      if (reducedMotion.current) timeline.pause().time(next)
      else controlTween.current = timeline.tweenTo(next, { duration: 0.75, ease: 'power2.inOut' })
    }
  }

  return (
    <section
      ref={root}
      className={styles.section + ' container-padding'}
      aria-labelledby={headingId}
    >
      <div className={styles.dora} aria-hidden="true" />
      {groovy?.url && (
        <div
          className={styles.groovy}
          aria-hidden="true"
          style={{ backgroundImage: `url(${JSON.stringify(groovy.url)})` }}
        />
      )}
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id={headingId} className={styles.title}>
            <span>{block.title}</span> <strong>{cardName}</strong> <span>benefits.</span>
          </h2>
          {artwork?.url && (
            <div className={styles.cardArtwork}>
              <Image
                src={artwork.url}
                alt={cardName}
                fill
                sizes="(max-width: 767px) 48px, 80px"
                className="object-contain"
              />
            </div>
          )}
          <p className={styles.description}>{block.description}</p>
        </header>
        {count > 0 && (
          <div
            ref={carousel}
            role="region"
            aria-roledescription="carousel"
            aria-label={`${cardName} benefits`}
            tabIndex={0}
            className={styles.carousel}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault()
                selectBenefit(activeIndex + (event.key === 'ArrowRight' ? 1 : -1))
              }
            }}
          >
            <div ref={stage} id={stageId} className={styles.stage}>
              <div ref={orbit} className={styles.orbit}>
                {items.map((item, index) => {
                  const image = typeof item.image === 'object' ? item.image : null
                  return (
                    <article
                      key={item.id || index}
                      ref={(element) => {
                        cards.current[index] = element
                      }}
                      className={styles.benefit}
                      data-initial-slot={index}
                      aria-hidden={index !== activeIndex}
                      aria-roledescription="slide"
                      aria-label={`${index + 1} of ${count}: ${item.title}`}
                    >
                      <div className={styles.image}>
                        {image?.url && (
                          <Image
                            src={image.url}
                            alt={item.title}
                            fill
                            sizes="68vw"
                            quality={95}
                            className="object-cover"
                            placeholder={item.imageBlurDataURL ? 'blur' : 'empty'}
                            blurDataURL={item.imageBlurDataURL || undefined}
                          />
                        )}
                      </div>
                      <div className={styles.panel} data-benefit-panel>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span>{item.infoText}</span>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
            <div ref={pagination} className={styles.pagination} aria-label="Choose a benefit">
              {(count === 3 ? [2, 0, 1] : items.map((_, index) => index)).map((index) => (
                <button
                  key={items[index].id || index}
                  type="button"
                  className={styles.dot}
                  aria-label={`Show benefit ${index + 1}: ${items[index].title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-controls={stageId}
                  onClick={() => selectBenefit(index)}
                >
                  <span />
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {items[activeIndex]?.title}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
