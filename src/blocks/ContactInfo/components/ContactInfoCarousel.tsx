'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { ContactInfoBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import Image, { StaticImageData } from 'next/image'
import React, { useMemo, useRef, useState } from 'react'

import WhiteArrowRight from 'public/assets/icons/carousal/WhiteArrowRight.png'
import WhiteArrowLeft from 'public/assets/icons/carousal/whiteArrowLeft.png'

import CallIcon from 'public/assets/icons/contactInfo/call.png'
import CallWhiteIcon from 'public/assets/icons/contactInfo/callWhite.png'
import MailIcon from 'public/assets/icons/contactInfo/mail.png'
import MailWhiteIcon from 'public/assets/icons/contactInfo/mailWhite.png'
import WhatsappIcon from 'public/assets/icons/contactInfo/whatsapp.png'
import WhatsappWhiteIcon from 'public/assets/icons/contactInfo/whatsappWhite.png'
import LinkedinIcon from 'public/assets/icons/contactInfo/linkedin.png'
import LinkedinWhiteIcon from 'public/assets/icons/contactInfo/linkedinWhite.png'
import FacebookIcon from 'public/assets/icons/contactInfo/facebook.png'
import FacebookWhiteIcon from 'public/assets/icons/contactInfo/facebookWhite.png'
import { sliderDelay } from '@/lib/data'

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
  const [api, setApi] = useState<CarouselApi>()

  const autoplayPlugin = useRef(
    Autoplay({
      delay: sliderDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  )

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

  if (!items.length) return null

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[autoplayPlugin.current]}
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
                 pl-[18px]
                basis-1/2
                sm:basis-1/3
                lg:basis-1/3
                xl:basis-1/4 
                2xl:basis-1/5 
                xl:pl-[26px]
                md:pl-[22px]
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
                  
                  text-start
                  backdrop-blur-[20px]
                  transition-colors duration-300 ease-out

                  hover:border-primary-1
                  px-[18px] py-[20px]
                  md:px-[16px] md:py-[18px]
                  lg:px-[26px] lg:py-[28px]
                  xl:px-[28px] xl:py-[30px]
                  min-h-[150px] 
                  md:min-h-[160px] 
                  lg:min-h-[200px] 
                  xl:min-h-[252px] 
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
                    relative flex  items-center justify-center
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
                      absoluteobject-contain
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

        <div className="mt-[22px] flex items-center justify-center gap-[8px] md:mt-[26px]">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous contact"
            className="
              flex items-center justify-center rounded-full
              border-0 bg-primary-1/35 p-0
              shadow-[0_10px_22px_rgba(0,108,103,0.18)]
              backdrop-blur-[10px]
              transition duration-300
              hover:bg-primary-1
              size-[26px] 
              md:size-[28px]
              lg:size-[32px]
              xl:size-[34px]
            "
          >
            <Image
              src={WhiteArrowLeft}
              alt=""
              width={16}
              height={16}
              className="h-[14px] w-[14px] object-contain"
            />
          </button>

          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Next contact"
            className="
              flex items-center justify-center rounded-full
              border-0 bg-primary-1/35 p-0
              shadow-[0_10px_22px_rgba(0,108,103,0.18)]
              backdrop-blur-[10px]
              transition duration-300
              hover:bg-primary-1
              size-[26px] 
              md:size-[28px]
              lg:size-[32px]
              xl:size-[34px]
            "
          >
            <Image
              src={WhiteArrowRight}
              alt=""
              width={16}
              height={16}
              className="h-[14px] w-[14px] object-contain"
            />
          </button>
        </div>
      </Carousel>
    </div>
  )
}

export default ContactInfoCarousel
