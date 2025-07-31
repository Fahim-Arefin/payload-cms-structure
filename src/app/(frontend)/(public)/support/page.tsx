'use client'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CatchTheBuzzSection from '@/components/custom/support/CatchTheBuzzSection'
import { FaqTabSection } from '@/components/custom/support/FaqTabSection'
import FeedBackSection from '@/components/custom/support/FeedBackSection'
import LevelUpSection from '@/components/custom/support/LevelUpSection'
import { MapTabSection } from '@/components/custom/support/MapTabSection'
import { useEffect, useState } from 'react'

function SupportPage() {
  const [activeMapTab, setActiveMapTab] = useState('branches')
  const [activeFaqTab, setActiveFaqTab] = useState('general')

  useEffect(() => {
    let lastHash = ''

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) // Remove the # symbol

      // Prevent infinite loops by checking if hash actually changed
      if (hash === lastHash) return
      lastHash = hash

      if (hash) {
        let targetSection = null

        // Handle map tab fragments
        if (hash === 'hospitals') {
          setActiveMapTab('hospitals')
          targetSection = 'map-section'
        } else if (hash === 'branches') {
          setActiveMapTab('branches')
          targetSection = 'map-section'
        }
        // Handle FAQ tab fragments
        else if (hash === 'general') {
          setActiveFaqTab('general')
          targetSection = 'faq-section'
        } else if (hash === 'form') {
          setActiveFaqTab('form')
          targetSection = 'faq-section'
        }

        // Scroll to the target section after a short delay to allow tab to activate
        if (targetSection) {
          setTimeout(() => {
            const element = document.getElementById(targetSection)
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              })
            }
          }, 150)
        }
      }
    }

    // Check hash on component mount
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    let lastHash = window.location.hash

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash === lastHash?.substring(1)) return
      lastHash = window.location.hash

      if (hash) {
        let targetSection = null

        if (hash === 'hospitals') {
          setActiveMapTab('hospitals')
          targetSection = 'map-section'
        } else if (hash === 'branches') {
          setActiveMapTab('branches')
          targetSection = 'map-section'
        } else if (hash === 'general') {
          setActiveFaqTab('general')
          targetSection = 'faq-section'
        } else if (hash === 'form') {
          setActiveFaqTab('form')
          targetSection = 'faq-section'
        }

        if (targetSection) {
          setTimeout(() => {
            const element = document.getElementById(targetSection)
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              })
            }
          }, 150)
        }
      }
    }

    // Initial check (on mount)
    handleHashChange()

    // Listen for hashchange (back/forward navigation, etc)
    window.addEventListener('hashchange', handleHashChange)

    // ALSO: poll for hash changes that Next.js Link might trigger (SPA navigation)
    const interval = setInterval(() => {
      if (window.location.hash !== lastHash) {
        handleHashChange()
      }
    }, 100) // fast enough for UX

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      clearInterval(interval)
    }
  }, [setActiveMapTab, setActiveFaqTab])

  const heroSlides = [
    {
      title: '',
      subtitle: 'SUPPORT',
      description: 'Need help? We aim to deliver support that speaks your language.',
      image: '/assets/suppoprtHero.jpg',
    },
  ]

  const newsSliderData = [
    {
      title: 'Shanta Life Insurance Begins its Journey',
      image: '/assets/newsSlider1.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance gets licence to launch',
      image: '/assets/newsSlider2.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
      image: '/assets/newsSlider3.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance Begins its Journey',
      image: '/assets/newsSlider1.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance gets licence to launch',
      image: '/assets/newsSlider2.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
      image: '/assets/newsSlider3.jpg',
      date: '6th March, 2025',
    },
  ]
  const levelUpData = [
    {
      title: 'Vlog',
      image: '/assets/levelup1.jpg',
      link: '/news-and-media#vlog',
    },
    {
      title: 'Blog',
      image: '/assets/levelup2.jpg',
      link: '/news-and-media#blog',
    },
    {
      title: 'News',
      image: '/assets/levelup3.jpg',
      link: '/news-and-media#news',
    },
    {
      title: 'Vlog',
      image: '/assets/levelup1.jpg',
      link: '/news-and-media#vlog',
    },
    {
      title: 'Blog',
      image: '/assets/levelup2.jpg',
      link: '/news-and-media#blog',
    },
    {
      title: 'News',
      image: '/assets/levelup3.jpg',
      link: '/news-and-media#news',
    },
  ]

  const tabItems = [
    {
      value: 'branches',
      label: 'OUR BRANCHES',
    },
    {
      value: 'hospitals',
      label: 'PANEL HOSPITALS',
    },
  ]
  const faqItems = [
    {
      value: 'general',
      label: 'GENERAL FAQ',
    },
    {
      value: 'form',
      label: 'DOWNLOAD FORMS',
    },
  ]

  const tabContent = [
    {
      content: [
        {
          office_location_Label: 'Head office',
          office_location: 'Shanta Life Insurance',
          office_address:
            'Shanta Western Tower - 186, Bir Uttam Mir Shawkat Sarak- Tejgaon Link Road, Dhaka-1208 (Level-10)',
          office_email: 'info@shantalife.com',
          office_phone: '09610889900 (10 am to 6 pm, Sunday to Thursday)',
        },
        {
          office_location_Label: 'Head Office Extention ',
          office_location: 'Shanta Life Insurance | Sales Office',
          office_address:
            '191/A Haque Tower (4th floor), Bir Uttam Mir Showkat Sorok, Tejgaon-Gulshan Link Road, Dhaka-1208',
          office_email: 'info@shantalife.com',
          office_phone: '09610889900 (10 am to 6 pm, Sunday to Thursday)',
        },
        {
          office_location_Label: 'Motijheel Branch',
          office_location:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58441.38016697795!2d90.3798384867766!3d23.726464622294557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8506cc33d99%3A0xfd076b7e6b99cdb7!2sShanta%20Asset%20Management%20Limited!5e0!3m2!1sen!2sus!4v1752957902530!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          office_address:
            'Peoples Insurance Bhaban (10th Floor), 36, Dilkusha C/A, Dhaka-1000, Bangladesh',
          office_email: 'info@shantalife.com',
          office_phone: '09610889900 (10 am to 6 pm, Sunday to Thursday)',
        },
        {
          office_location_Label: 'Chattogram Branch',
          office_location:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.842462113068!2d91.8117762!3d22.321797000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acdf3566b1bfbd%3A0x12d6963aaefdf18f!2sAyub%20Trade%20Center!5e0!3m2!1sen!2sbd!4v1752958082561!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          office_address:
            'Ayub Trade Centre (7th Floor), 1269/B, SK Mujib Road, Agrabad C/A, Chattogram-4100',
          office_email: 'info@shantalife.com',
          office_phone: '09610889900 (10 am to 6 pm, Sunday to Thursday)',
        },
      ],
    },
    {
      content: [
        {
          office_location_Label: 'Farazy Hospital Ltd, Dhaka',
          office_location:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.575025711915!2d90.43367297605147!3d23.762529488309234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b809fd8d4487%3A0x7c9b3001d76ccc77!2sFarazy%20Hospital%20Limited%20-%20Banasree!5e0!3m2!1sen!2sbd!4v1752959904849!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          office_address: 'House #15-19, Block-E, Main Road, Banasree, Rampura, Dhaka- 1219',
          office_email: 'fhl.mhcorporate@gmail.com',
          office_phone: '+880 1882 084 319 (10 am to 6 pm, Sunday to Thursday)',
        },
        {
          office_location_Label: 'BRB Hospitals Limited, Dhaka',
          office_location:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8632267395606!2d90.38297397605128!3d23.752256288703705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd27f8c373%3A0x39df794e3533d47a!2sBRB%20Hospitals%20Limited!5e0!3m2!1sen!2sbd!4v1752960136758!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          office_address: '77/A, East Razabazar, West Panthapath, Dhaka',
          office_email: 'rezaul.corporate@brbhospital.com',
          office_phone: '+880 1713 150 473 (10 am to 6 pm, Sunday to Thursday)',
        },
        {
          office_location_Label: 'York Hospital Ltd, Dhaka',
          office_location:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.6261712447167!2d90.40579977605218!3d23.79632278701043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7229f1d76f1%3A0x1ad7acd1282e32b2!2sYork%20Hospital!5e0!3m2!1sen!2sbd!4v1752960278640!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          office_address: 'Road-22, House-12 & 13, Block-K, Banani, Dhaka-1213',
          office_email: 'sarifhassan888@gmail.com',
          office_phone: '+880 1711 035 050 (10 am to 6 pm, Sunday to Thursday)',
        },
        {
          office_location_Label: 'Evercare Hospitals, Chattogram',
          office_location:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.7201832219216!2d91.8469776760242!3d22.401903739203593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2782e6299a61%3A0x459db4c66339430c!2sEvercare%20Hospital%20Chattogram!5e0!3m2!1sen!2sbd!4v1752960331706!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          office_address:
            'Plot- H1, Ananya R/A, Chattogram Development Authority, Hathazari, Chattogram, Bangladesh',
          office_email: 'corporate.chattrogram@evercare.com',
          office_phone: '+880 1729 043 247 (10 am to 6 pm, Sunday to Thursday)',
        },
        {
          office_location_Label: 'Apollo Imperial Hospitals, Chattogram',
          office_location:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.8521894733467!2d91.79286187602335!3d22.35920934075615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8e328704ffd%3A0x518c4a1ca25f627e!2sApollo%20Imperial%20Hospitals!5e0!3m2!1sen!2sbd!4v1752960458659!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          office_address: 'Zakir Hossain Road, Pahartali, Chattogram 4202',
          office_email: 'mamun.bdm@aihlbd.org',
          office_phone: '01859 773 332 (10 am to 6 pm, Sunday to Thursday)',
        },
        {
          office_location_Label: 'Ibn Sina Hospital & Diagnostic Center, Noakhali',
          office_location:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.136266056989!2d91.08948767603336!3d22.871424121950387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754a5007c73bf51%3A0x9c43dfd7b14a5110!2sIbn%20Sina%20Hospital%20%26%20Diagnostic%20Center%2C%20Noakhali!5e0!3m2!1sen!2sbd!4v1752960517421!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          office_address: '(Opposite Sadar Hospital), Maizdee, Noakhali',
          office_email: 'syedhakim09@gmail.com',
          office_phone: '01814717859 (10 am to 6 pm, Sunday to Thursday)',
        },
      ],
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        top=" top-[220px] md:top-[150px] lg:top-[50%]"
        // height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[578px] "
        // height=" h-[252px] md:h-[352px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px] "
        position="[object-position:50%_50px] md:[object-position:50%_-10%]"
      />
      <div id="map-section">
        <MapTabSection config={tabItems} data={tabContent} initialTab={activeMapTab} />
      </div>
      <div id="faq-section">
        <FaqTabSection config={faqItems} initialTab={activeFaqTab} />
      </div>
      {/* <GeneralFaq /> */}
      <CatchTheBuzzSection />
      {/* <NewsSliderSection data={newsSliderData} /> */}
      <FeedBackSection />
      <LevelUpSection data={levelUpData} />
    </div>
  )
}

export default SupportPage
