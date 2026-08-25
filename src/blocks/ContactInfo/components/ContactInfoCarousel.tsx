'use client'

import CarouselArrowButton from '@/components/custom/sagar-ropes-shared/buttons/CarouselArrowButton'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { ContactInfoBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import CallIcon from 'public/assets/icons/contactInfo/call.png'
import CallWhiteIcon from 'public/assets/icons/contactInfo/callWhite.png'
import FacebookIcon from 'public/assets/icons/contactInfo/facebook.png'
import FacebookWhiteIcon from 'public/assets/icons/contactInfo/facebookWhite.png'
import LinkedinIcon from 'public/assets/icons/contactInfo/linkedin.png'
import LinkedinWhiteIcon from 'public/assets/icons/contactInfo/linkedinWhite.png'
import MailIcon from 'public/assets/icons/contactInfo/mail.png'
import MailWhiteIcon from 'public/assets/icons/contactInfo/mailWhite.png'
import WhatsappIcon from 'public/assets/icons/contactInfo/whatsapp.png'
import WhatsappWhiteIcon from 'public/assets/icons/contactInfo/whatsappWhite.png'

type Props = { block: ContactInfoBlockType }

type ContactCardItem = {
  key: string
  label?: string | null
  value?: string | null
  href: string
  icon: StaticImageData
  iconWhite: StaticImageData
  external?: boolean
}

function cleanPhoneHref(phone?: string | null) {
  if (!phone) return '#'

  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned ? `tel:${cleaned}` : '#'
}

function ContactInfoCarousel({ block }: Props) {
  const autoplayPlugin = useRef(
    Autoplay({
      delay: sliderDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  )

  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const items = useMemo<ContactCardItem[]>(() => {
    const contacts = block?.contacts

    return [
      {
        key: 'call-us',
        label: contacts?.callUs?.label,
        value: contacts?.callUs?.phoneNumber,
        href: cleanPhoneHref(contacts?.callUs?.phoneNumber),
        icon: CallIcon,
        iconWhite: CallWhiteIcon,
      },
      {
        key: 'email-us',
        label: contacts?.emailUs?.label,
        value: contacts?.emailUs?.email,
        href: contacts?.emailUs?.email ? `mailto:${contacts.emailUs.email}` : '#',
        icon: MailIcon,
        iconWhite: MailWhiteIcon,
      },
      {
        key: 'whatsapp',
        label: contacts?.whatsApp?.label,
        value: 'WhatsApp',
        href: contacts?.whatsApp?.link || '#',
        icon: WhatsappIcon,
        iconWhite: WhatsappWhiteIcon,
        external: true,
      },
      {
        key: 'linkedin',
        label: contacts?.linkedIn?.label,
        value: 'XynoLab',
        href: contacts?.linkedIn?.link || '#',
        icon: LinkedinIcon,
        iconWhite: LinkedinWhiteIcon,
        external: true,
      },
      {
        key: 'facebook',
        label: contacts?.facebook?.label,
        value: 'XynoLab',
        href: contacts?.facebook?.link || '#',
        icon: FacebookIcon,
        iconWhite: FacebookWhiteIcon,
        external: true,
      },
    ].filter((item) => item.label && item.value)
  }, [block?.contacts])

  const hasMultipleItems = items.length > 1
  const shouldShowArrows = hasMultipleItems && (canScrollPrev || canScrollNext)

  useEffect(() => {
    if (!api) return

    const updateArrowState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateArrowState()

    api.on('select', updateArrowState)
    api.on('reInit', updateArrowState)

    return () => {
      api.off('select', updateArrowState)
      api.off('reInit', updateArrowState)
    }
  }, [api])

  if (!items.length) return null

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: false,
        }}
        plugins={hasMultipleItems ? [autoplayPlugin.current] : []}
        className="w-full"
      >
        <CarouselContent
          className="
            -ml-[18px]
            md:-ml-[22px]
            xl:-ml-[26px]
          "
        >
          {items.map((item) => (
            <CarouselItem
              key={item.key}
              className="
                basis-1/2 pl-[18px]
                sm:basis-1/3
                md:pl-[22px]
                lg:basis-1/3
                xl:basis-1/4 xl:pl-[26px]
                2xl:basis-1/5
              "
            >
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="
                  group/contact-card
                  relative isolate flex w-full flex-col
                  rounded-[10px]
                  border border-primary-1/35
                  bg-white-1/35
                  px-[18px] py-[20px]
                  text-start
                  backdrop-blur-[20px]
                  transition-colors duration-300 ease-out
                  hover:border-primary-1
                  md:min-h-[160px] md:px-[16px] md:py-[18px]
                  lg:min-h-[200px] lg:px-[26px] lg:py-[28px]
                  xl:min-h-[252px] xl:px-[28px] xl:py-[30px]
                  min-h-[150px]
                "
              >
                <span
                  className="
                    pointer-events-none absolute inset-0 -z-10
                    rounded-[10px]
                    bg-[linear-gradient(135deg,rgba(255,255,255,0.36)_0%,rgba(255,255,255,0.12)_48%,rgba(0,108,103,0.12)_100%)]
                  "
                />

                <span
                  className="
                    relative flex items-center justify-center
                    rounded-full border border-primary-1
                    bg-transparent
                    transition-colors duration-300 ease-out
                    group-hover/contact-card:bg-primary-1
                    size-[50px]
                    md:size-[55px]
                    lg:size-[70px]
                    xl:size-[74px]
                  "
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={42}
                    height={42}
                    className="
                      absolute object-contain
                      opacity-100 transition-opacity duration-300
                      group-hover/contact-card:opacity-0
                      h-[28px] w-[28px]
                      md:h-[30px] md:w-[30px]
                      lg:h-[40px] lg:w-[40px]
                      xl:h-[42px] xl:w-[42px]
                    "
                  />

                  <Image
                    src={item.iconWhite}
                    alt=""
                    width={42}
                    height={42}
                    className="
                      absolute object-contain
                      opacity-0 transition-opacity duration-300
                      group-hover/contact-card:opacity-100
                      h-[28px] w-[28px]
                      md:h-[30px] md:w-[30px]
                      lg:h-[40px] lg:w-[40px]
                      xl:h-[42px] xl:w-[42px]
                    "
                  />
                </span>

                <span
                  className="
                    mt-auto block pt-[34px]
                    font-agency text-primary-1 global-h6
                  "
                >
                  {item.label}
                </span>

                <span
                  className="
                    block max-w-full truncate
                    font-grift font-bold text-secondary-1 global-p5
                  "
                >
                  {item.value}
                </span>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {shouldShowArrows && (
        <div
          className="
            mt-[22px] flex items-center justify-center gap-[12px]
            md:mt-[26px]
          "
        >
          <CarouselArrowButton
            direction="prev"
            ariaLabel="Previous contact"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            buttonClassName="
              size-[30px]
              md:size-[32px]
              lg:size-[36px]
              xl:size-[38px]
            "
          />

          <CarouselArrowButton
            direction="next"
            ariaLabel="Next contact"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            buttonClassName="
              size-[30px]
              md:size-[32px]
              lg:size-[36px]
              xl:size-[38px]
            "
          />
        </div>
      )}
    </div>
  )
}

export default ContactInfoCarousel
