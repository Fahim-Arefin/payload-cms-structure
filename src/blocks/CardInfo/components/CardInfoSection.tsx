'use client'

import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { gsap, useGSAP } from '@/lib/gsap'
import { useBrowserLocation } from '@/hooks/useBrowserLocation'
import { resolveCardKey } from '../../CardCardPrivileges/cardSelection'
import { getCardStackPose } from '../cardStack'
import type { CardInfoBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

type Card = CardInfoBlockType['cards'][number]

function buildHref(card: Card) {
  const page = card.buttonLink
  const slug = typeof page === 'object' && page ? page.slug : null
  const path =
    slug == null
      ? ''
      : ['index', 'home', ''].includes(slug)
        ? '/'
        : `/${slug.replace(/^\/+|\/+$/g, '')}`
  return `${path}#${card.cardKey}`
}

function CardInfoSection({
  block,
  anchorKeys,
}: {
  block: CardInfoBlockType
  anchorKeys?: string[]
}) {
  const rootRef = useRef<HTMLElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const location = useBrowserLocation()
  const [previousKey, setPreviousKey] = useState<string | null>(null)
  const cards = block.cards ?? []
  const activeKey = resolveCardKey(cards, location?.hash, previousKey, block.defaultCardKey)
  const activeIndex = Math.max(
    0,
    cards.findIndex((card) => card.cardKey === activeKey),
  )
  const groovy = typeof block.groovyDesign === 'object' ? block.groovyDesign : null

  useEffect(() => {
    setPreviousKey(activeKey)
  }, [activeKey])

  useEffect(() => {
    const section = rootRef.current
    const description = descriptionRef.current
    if (!section || !description) return
    const positionGlow = () => {
      const bounds = description.getBoundingClientRect()
      const center = bounds.top - section.getBoundingClientRect().top + bounds.height / 2
      section.style.setProperty('--card-info-glow-y', `${center}px`)
    }
    const observer = new ResizeObserver(positionGlow)
    observer.observe(section)
    observer.observe(description)
    positionGlow()
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const stacks = gsap.utils.toArray<HTMLElement>('[data-card-stack]', rootRef.current)
      for (const stack of stacks) {
        const mobile = stack.dataset.cardStack === 'mobile'
        const elements = gsap.utils.toArray<HTMLElement>('[data-card-index]', stack)
        for (const element of elements) {
          const index = Number(element.dataset.cardIndex)
          const { zIndex, ...pose } = getCardStackPose(index, activeIndex, cards.length, mobile)
          gsap.set(element, { zIndex })
          gsap.to(element, {
            ...pose,
            duration: reduced ? 0 : 0.72,
            ease: index === activeIndex ? 'power3.out' : 'power3.inOut',
            overwrite: 'auto',
          })
        }
      }
    },
    { scope: rootRef, dependencies: [activeIndex, cards.length] },
  )

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, card: Card) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return
    const target = new URL(buildHref(card), window.location.href)
    const normalize = (path: string) => path.replace(/\/+$/, '') || '/'
    if (
      target.origin !== window.location.origin ||
      normalize(target.pathname) !== normalize(window.location.pathname)
    )
      return
    event.preventDefault()
    if (target.href !== window.location.href)
      window.history.pushState(window.history.state, '', target.href)
    setPreviousKey(card.cardKey)
  }

  const renderStack = (mobile: boolean) => (
    <div
      data-card-stack={mobile ? 'mobile' : 'desktop'}
      className={`grid w-full place-items-center overflow-visible ${mobile ? 'py-[6px]' : ''}`}
    >
      {cards.map((card, index) => {
        const photo = typeof card.cardImage === 'object' ? card.cardImage : null
        const pose = getCardStackPose(index, activeIndex, cards.length, mobile)
        return (
          <Link
            key={card.cardKey}
            href={buildHref(card)}
            onClick={(event) => handleClick(event, card)}
            data-card-index={index}
            aria-label={`Select ${card.cardName}`}
            aria-current={card.cardKey === activeKey ? 'true' : undefined}
            aria-hidden={pose.autoAlpha === 0}
            tabIndex={pose.autoAlpha === 0 ? -1 : undefined}
            className={`relative col-start-1 row-start-1 block cursor-pointer will-change-transform ${mobile ? 'w-[48%] sm:w-[44%] md:w-[40%]' : 'lg:w-[49%] xl:w-[47%] 2xl:w-[45%] 3xl:w-[43%]'}`}
          >
            <div className="relative aspect-[726/1146] w-full">
              {photo?.url && (
                <Image
                  src={photo.url}
                  alt={card.cardName}
                  fill
                  priority={index < 2}
                  quality={100}
                  className="object-cover object-center drop-shadow-[0_24px_32px_rgba(0,0,0,0.34)]"
                  placeholder={card.cardImageBlurDataURL ? 'blur' : 'empty'}
                  blurDataURL={card.cardImageBlurDataURL || undefined}
                  sizes="(max-width: 1023px) 50vw, 28vw"
                />
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )

  const renderIndicator = () => (
    <div className="flex flex-wrap items-center justify-center gap-[9px] font-roboto sm:gap-[10px] xl:gap-[12px]">
      {cards.map((card, index) => (
        <Link
          key={card.cardKey}
          href={buildHref(card)}
          onClick={(event) => handleClick(event, card)}
          aria-label={`Select ${card.cardName}`}
          aria-current={card.cardKey === activeKey ? 'true' : undefined}
          className={`text-[9px] font-semibold leading-none transition-colors duration-300 sm:text-[10px] md:text-[11px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] ${card.cardKey === activeKey ? 'text-[#F52832]' : 'text-white/45 hover:text-white/80'}`}
        >
          {String(index + 1).padStart(2, '0')}
        </Link>
      ))}
    </div>
  )

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_calc(100%_-_120px),transparent_100%)] lg:hidden"
      >
        <div className="absolute left-0 top-[var(--card-info-glow-y,80%)] h-full w-full -translate-y-1/2 bg-[url('/assets/images/dora4.png')] bg-[length:100%_100%] bg-center bg-no-repeat mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
      </div>
      {groovy?.url && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${JSON.stringify(groovy.url)})` }}
        />
      )}
      {(anchorKeys ?? cards.map((card) => card.cardKey)).map((key) => (
        <span
          key={key}
          id={key}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-px w-px scroll-mt-[100px]"
        />
      ))}
      <div className="container-padding relative z-10 w-full">
        <div className="grid grid-cols-1 gap-y-[22px] sm:gap-y-[26px] md:gap-y-[30px] lg:grid-cols-[0.92fr_1.08fr] lg:grid-rows-[auto_auto_auto] lg:gap-x-[54px] lg:gap-y-[26px] xl:gap-x-[74px] 2xl:gap-x-[92px]">
          <div className="order-1 text-center lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
            {block.content?.title && (
              <h2 className="global-h1 font-baltiholm font-normal leading-[0.85] text-white">
                {block.content.title}
              </h2>
            )}
            {block.content?.subtitle && (
              <div className="global-p1 mt-[6px] font-roboto font-normal leading-[1.25] text-white sm:mt-[8px]">
                {block.content.subtitle}
              </div>
            )}
          </div>
          <div className="order-2 lg:hidden">
            {renderStack(true)}
            <div className="mt-[8%] flex justify-center">{renderIndicator()}</div>
          </div>
          <div className="relative order-3 flex flex-col gap-y-[22px] sm:gap-y-[26px] md:gap-y-[30px] lg:contents">
            <div
              ref={descriptionRef}
              className="relative order-4 mx-auto max-w-[470px] text-center lg:order-none lg:col-start-1 lg:row-start-2 lg:mx-0 lg:max-w-[620px] lg:text-left"
            >
              {block.content?.description && (
                <div className="global-p2 font-roboto font-normal leading-[1.38] text-[#D9D9D9]">
                  <LocalizedRichText
                    en={block.content.description}
                    bn={block.content.description}
                  />
                </div>
              )}
            </div>
            <div className="relative order-3 text-center lg:order-none lg:col-start-1 lg:row-start-3 lg:self-start lg:text-left">
              {block.cardSelector?.title && (
                <div className="global-p3 mb-[9px] font-roboto font-normal text-[#D9D9D9]">
                  {block.cardSelector.title}
                </div>
              )}
              <div
                className={`flex flex-wrap items-center justify-center gap-[8px] sm:gap-[10px] md:gap-[12px] lg:justify-start lg:gap-[14px] xl:gap-[16px] ${cards.length === 2 ? 'flex-row-reverse lg:flex-row' : 'flex-row'}`}
              >
                {cards.map((card) => (
                  <Link
                    key={card.cardKey}
                    href={buildHref(card)}
                    onClick={(event) => handleClick(event, card)}
                    aria-current={card.cardKey === activeKey ? 'true' : undefined}
                    className={`inline-flex min-h-[38px] min-w-[118px] max-w-full items-center justify-center rounded-[6px] border px-[15px] py-[8px] font-roboto text-[13px] font-normal transition-all duration-300 ease-out sm:min-h-[42px] sm:min-w-[130px] sm:text-[14px] md:min-h-[46px] md:min-w-[145px] md:text-[15px] lg:min-h-[48px] lg:min-w-[160px] lg:text-[16px] xl:min-h-[52px] xl:min-w-[180px] xl:px-[24px] xl:text-[18px] 2xl:min-h-[58px] 2xl:min-w-[205px] 2xl:text-[20px] ${card.cardKey === activeKey ? 'border-[#F52832] bg-[#F52832] text-white shadow-[0_10px_26px_rgba(245,40,50,0.16)]' : 'border-white/55 bg-transparent text-white/85 hover:border-white hover:bg-white/[0.06] hover:text-white'}`}
                  >
                    {card.buttonLabel || card.cardName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:flex lg:min-w-0 lg:flex-col lg:items-center lg:justify-center">
            {renderStack(false)}
            <div className="mt-[8%] flex justify-center">{renderIndicator()}</div>
          </div>
        </div>
      </div>
      <div className="container-padding relative z-10 flex justify-center">
        <div className="flex h-12 items-center justify-center rounded-full bg-[#171719] px-1.5 py-2 [animation-duration:1.8s] motion-safe:animate-bounce sm:h-16 lg:h-28 lg:px-2.5 lg:py-4 xl:h-44 2xl:h-52">
          <Image
            src="/assets/images/Arrow.png"
            alt="Scroll down for more"
            width={42}
            height={431}
            unoptimized
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
    </section>
  )
}
export default CardInfoSection
