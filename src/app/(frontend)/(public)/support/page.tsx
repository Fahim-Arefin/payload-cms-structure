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
      image: '/assets/supportpage/web/levelup1.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup1.jpg',
      link: '/news-and-media#vlog',
    },
    {
      title: 'Blog',
      image: '/assets/supportpage/web/levelup2.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup2.jpg',
      link: '/news-and-media#blog',
    },
    {
      title: 'News',
      image: '/assets/supportpage/web/levelup3.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup3.jpg',
      link: '/news-and-media#news',
    },
    {
      title: 'Vlog',
      image: '/assets/supportpage/web/levelup1.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup1.jpg',
      link: '/news-and-media#vlog',
    },
    {
      title: 'Blog',
      image: '/assets/supportpage/web/levelup2.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup2.jpg',
      link: '/news-and-media#blog',
    },
    {
      title: 'News',
      image: '/assets/supportpage/web/levelup3.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup3.jpg',
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
          office_email: 'info@shantalife.com; customer.services@shantalife.com',
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
          office_location_Label: 'Farazy Hospital Ltd., Dhaka',
          office_name: `Mr. Md. Mozammel Haque`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House+%2315-19%2C+Block-E%2C+Main+Road%2C+Banasree%2C+Rampura%2C+Dhaka-+1219&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House #15-19, Block-E, Main Road, Banasree, Rampura, Dhaka- 1219',
          office_email: 'fhl.mhcorporate@gmail.com',
          office_phone: '+880 1882 084 319, +880 1910 200 245',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%',
        },
        {
          office_location_Label: 'Farazy Diagnostic & Hospital Ltd., Dhaka',
          office_name: `Mr. Md. Mozammel Haque`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=1204%2C+Madani+Avenue%2C+100+Feet+Road%2C+Baridhara%2C+Natun+Bazar%2CGulshan%2C+Dhaka-1212&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address:
            '1204, Madani Avenue, 100 Feet Road, Baridhara, Natun Bazar,Gulshan, Dhaka-1212',
          office_email: 'fhl.mhcorporate@gmail.com',
          office_phone: '+880 1882 084 319, +880 1910 200 245',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%',
        },
        {
          office_location_Label: 'Farazy Dental & Research Center (Mirpur Branch), Dhaka',
          office_name: `Mr. Md. Mozammel Haque`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Plot+%23+01%2C+Road+%23+03%2C+Section+%23+10%2C+Mirpur&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Plot # 01, Road # 03, Section # 10, Mirpur',
          office_email: 'fhl.mhcorporate@gmail.com',
          office_phone: '+880 1882 084 319, +880 1910 200 245',
          discount_details:
            'Dentists Scaling -50%, Implants -25%, Dentists Cap bridge -20%, RCT & Filling -30%',
        },
        {
          office_location_Label: 'Farazy Dental & Research Center (Rampura/ Banosree), Dhaka',
          office_name: `Mr. Md. Mozammel Haque`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Plot+%23+10%2C+Block+%23+H%2C+Avenue+Road+%23+08%2C+Banasree&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Plot # 10, Block # H, Avenue Road # 08, Banasree',
          office_email: 'fhl.mhcorporate@gmail.com',
          office_phone: '+880 1882 084 319, +880 1910 200 245',
          discount_details:
            'Dentists Scaling -50%, Implants -25%, Dentists Cap bridge -20%, RCT & Filling -30%',
        },
        {
          office_location_Label: 'Farazy Dental & Research Center (Uttara Branch), Dhaka',
          office_name: `Mr. Md. Mozammel Haque`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Plot+%23+14%2FA%2C+Rabindra+Sarani+Road%2C+Avenue+Road%2C+Sector-+7.&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Plot # 14/A, Rabindra Sarani Road, Avenue Road, Sector- 7.',
          office_email: 'fhl.mhcorporate@gmail.com',
          office_phone: '+880 1882 084 319, +880 1910 200 245',
          discount_details:
            'Dentists Scaling -50%, Implants -25%, Dentists Cap bridge -20%, RCT & Filling -30%',
        },
        {
          office_location_Label: 'Anower Khan Modern Hospital Ltd, Dhaka',
          office_name: `Badrul Alam Mukul`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House+No.+17%2C+Road-8%2C+Dhanmondi%2C+Dhaka-1205&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House No. 17, Road-8, Dhanmondi, Dhaka-1205',
          office_email: 'mukul85bam@gmail.com',
          office_phone: '+880 1711 927 861',
          discount_details: 'Pathological Test - 20%, Radiology & Imaging - 10%',
        },
        {
          office_location_Label: 'BRB Hospital Limited, Dhaka',
          office_name: `Mr. Rezaul Karim`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=77%2FA%2C+East+Razabazar%2C+West+Panthapath%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '77/A, East Razabazar, West Panthapath, Dhaka',
          office_email: 'rezaul.corporate@brbhospital.com',
          office_phone: '+880 1713 150 473, +880 01747 321 321',
          discount_details: 'Pathological Test - 20%, Radiology & Imaging - 15%',
        },
        {
          office_location_Label: 'PRAAVA Health, Dhaka',
          office_name: `Md. Fazle Rabby`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Plot-+9%2C+Road-17%2C+Block-C%2C+Banani%2C+Dhaka-1213&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Plot- 9, Road-17, Block-C, Banani, Dhaka-1213',
          office_email: 'frabby@praavahealth.com',
          office_phone: '+880 1847 278059',
          discount_details: 'Pathological Test - 20%, Radiology & Imaging - 20%',
        },
        {
          office_location_Label: 'Asgar Ali Hospital, Dhaka',
          office_name: `Maruf Bin Hafiz`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=111%2F1%2FA%2C+Distillery+Road%2C+Gandaria%2CDhaka-1204&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '111/1/A, Distillery Road, Gandaria,Dhaka-1204',
          office_email: 'marufaah@asgaralihospital.com',
          office_phone: '+880 1787 683062',
          discount_details: 'Pathological Test - 10%, Radiology & Imaging - 10%, OPD Medicine -3%',
        },
        {
          office_location_Label: 'York Hospital Ltd., Dhaka',
          office_name: `Sarif M S Hassan Shamim`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Road-22%2C+House-12+%26+13%2C+Block-K%2C+Banani%2C+Dhaka-1213&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Road-22, House-12 & 13, Block-K, Banani, Dhaka-1213',
          office_email: 'sarifhassan888@gmail.com',
          office_phone: '+880 1711 035 050',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 15%',
        },
        {
          office_location_Label:
            'Anower Khan Modern Diagnostic Centre & Hospital Outdoor Service, Dhaka',
          office_name: `Md. Shahed Ahmed`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Plot-11%2C+Road-+11%2C+Block-+G%2C+Banani%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Plot-11, Road- 11, Block- G, Banani, Dhaka',
          office_email: 'shahedjames@gmail.com',
          office_phone: '+880 1776 198 470',
          discount_details: 'Pathological Test - 20%, Radiology & Imaging - 10%',
        },
        {
          office_location_Label:
            'Universal Medical College & Hospital Ltd. (Former Ayesha Memorial Hospital), Dhaka',
          office_name: `Mr. Aminul Islam Sumon`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=74G+%2F+75%2C+Peacock+Square%2C+New+Airport+Road%2C+Mohakhali%2C+Dhaka-+1215&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '74G / 75, Peacock Square, New Airport Road, Mohakhali, Dhaka- 1215',
          office_email: 'sahed@ayshamemorialhospital.com',
          office_phone: '+880 1841 490 025',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 15%',
        },
        {
          office_location_Label: 'Nagorik Specialized Hospital Limited, Dhaka',
          office_name: `Md. Mustafiul Alam`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House+%23+59%2C+Block+%23+C%2C+Main+Road%2C+Jahurul+Islam+City%2C+Aftabnagor%2C+Dhaka-1212&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address:
            'House # 59, Block # C, Main Road, Jahurul Islam City, Aftabnagor, Dhaka-1212',
          office_email: 'mustafiulalam@gmail.com',
          office_phone: '+880 0175 847 278',
          discount_details: 'Pathological Test - 20%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'Insaf Barakah Kidney & General Hospital, Dhaka',
          office_name: `Md. Hero Miah`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-11%2C+Shahid+Tajuddin+Ahmed+Sharoni%2C+Moghbazar%2C+Dhaka-1217&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-11, Shahid Tajuddin Ahmed Sharoni, Moghbazar, Dhaka-1217',
          office_email: 'bkidney_77@yahoo.com',
          office_phone: '+880 1321 149 522, 01926 604 637',
          discount_details:
            'Pathological & Radiology - 40%, Dental & physiotherapy - 10%, Medicine -6%, Ambulance -10%',
        },
        {
          office_location_Label: 'Alliance Hospital Limited, Dhaka',
          office_name: `AHM Humayun Kabir`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Alliance+Hospital+Limited%2C+24%2F3+Khilji+Road+%28Ring+Road%29%2C+Shyamoli%2C+Dhaka%2C+1207&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address:
            'Alliance Hospital Limited, 24/3 Khilji Road (Ring Road), Shyamoli, Dhaka, 1207',
          office_email: 'hkmilon051979@gmail.com',
          office_phone: '+880 1983 737 611',
          discount_details: 'Pathological Test - 30%, Radiology & Imaging - 20%',
        },
        {
          office_location_Label: 'Evercare Hospitals Dhaka, Dhaka',
          office_name: `Md. Iftekhar Hossain`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Plot-81%2C+Block-+E%2C+Bashundhara+R%2FA%2C+Dhaka-1229&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Plot-81, Block- E, Bashundhara R/A, Dhaka-1229',
          office_email: 'iftekhar.hossain@evercarebd.com',
          office_phone: '+880 1713 489 195',
          discount_details: 'Not Available OPD discount',
        },
        {
          office_location_Label: 'Bangladesh Specialized Hospital PLC, Dhaka',
          office_name: `Abdullah Al Fahad`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-21%2C+Mirpur+Road%2C+Shyamoli%2C+Dhaka-1207&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-21, Mirpur Road, Shyamoli, Dhaka-1207',
          office_email: 'corporate@bshl.com.bd',
          office_phone: '+880 1313 777 888',
          discount_details: 'Pathological Test - 20%, Radiology & Imaging - 15%',
        },
        {
          office_location_Label: 'Al-Karim General Hospital Limited, Dhaka',
          office_name: `Muhammed Emrul Kayes`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Hazi+Borhan+Uddin+Tower+17%2FA%2C+North+Saydabad%2C+Dhaka-1100&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Hazi Borhan Uddin Tower 17/A, North Saydabad, Dhaka-1100',
          office_email: 'akghl2023@gmail.com',
          office_phone: '+880 1999 906 404',
          discount_details:
            'Pathological Test - 40%, Radiology & Imaging - 30%, Dental & physiotherapy - 20%, Vaccine -20%',
        },
        {
          office_location_Label: 'Evercare Hospitals Chittagong, Chittagong',
          office_name: `Ranjan kumar Dash`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Plot-+H1%2C+Ananya+R%2FA%2C+Chittagong+Development+Authority%2C+Hathazari%2C+Chittagong%2C+Bangladesh&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address:
            'Plot- H1, Ananya R/A, Chittagong Development Authority, Hathazari, Chittagong, Bangladesh',
          office_email: 'corporate.chattrogram@evercare.com',
          office_phone: '+880 1729 043 247',
          discount_details: 'Not Available OPD discount',
        },
        {
          office_location_Label: 'Shahabuddin Medical College & Hospital, Dhaka',
          office_name: `Md. Sahidul Islam`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House+No%3A+15-16%2C+Road+113%2FA%2C+Gulshan-2%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House No: 15-16, Road 113/A, Gulshan-2, Dhaka',
          office_email: 'corporate.marketing@shahabuddinmedical.org',
          office_phone: '+8801795556854',
          discount_details: 'Pathological Test - 30%, Radiology & Imaging - 25%',
        },
        {
          office_location_Label: 'Ashulia Women and Children Hospital (AWCH), Savar',
          office_name: `Md. Harunor Rashid`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Beron%2C+Yearpur%2C+Ashulia%2C+Dhaka-1349&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Beron, Yearpur, Ashulia, Dhaka-1349',
          office_email: '',
          office_phone: '+880 1724 452 545',
          discount_details: 'Pathological Test - 15%, Radiology & Imaging - 10%',
        },
        {
          office_location_Label: 'Aalok Healthcare Ltd. Mirpur -10, Dhaka',
          office_name: `Manager`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-1+%26+3%2C+Road-2%2C+Block-B%2C+Section-10%2C+Mirpur%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-1 & 3, Road-2, Block-B, Section-10, Mirpur, Dhaka',
          office_email: '',
          office_phone: '02-48033802, 48035051, 01915448491, 01769969839',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'Aalok Healthcare Ltd. Mirpur-1, Dhaka',
          office_name: `Manager`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=21%2C+Darus+Salam+Road%2C+Mirpur-1%2C+Dhaka-1216.&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '21, Darus Salam Road, Mirpur-1, Dhaka-1216.',
          office_email: '',
          office_phone: '02-48036186, 01769969858, 01769969840',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'Aalok Healthcare Ltd.  Pallabi, Dhaka',
          office_name: `Manager`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=2%2F6+Pallabi.+%28111%2F2%2C+Bus+Stand%29%2C+Mirpur%2C+Dhaka.&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '2/6 Pallabi. (111/2, Bus Stand), Mirpur, Dhaka.',
          office_email: '',
          office_phone: '02-48035672, 01769969860, 01769969841',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'Aalok Healthcare Ltd. Kachukhet, Dhaka',
          office_name: `Manager`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Rajanigandha+Tower%2C+Kachukhet%2C+Dhaka+Cant.+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Rajanigandha Tower, Kachukhet, Dhaka Cant. Dhaka',
          office_email: '',
          office_phone: '02-8715512, 01725695669, 01769969816',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'Aalok Healthcare Ltd.   SAHIC, Dhaka',
          office_name: `Manager`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Mohakhali%2C+Dhaka.&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Mohakhali, Dhaka.',
          office_email: '',
          office_phone: '01769969842',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'Aalok Hospital Ltd., Dhaka',
          office_name: `Manager`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-1%2C+Road-5%2C+Block-A%2C+Section-6%2C+Mirpur%2C+Dhaka.&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-1, Road-5, Block-A, Section-6, Mirpur, Dhaka.',
          office_email: '',
          office_phone: '09678822822, 01769969836-37, 01769969853',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'Mother & Child Care, Mirpur-6, Dhaka',
          office_name: `Asst. Manager, Customer Care`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-3%2C+Road-4%2C+Block-A%2C+Section-6%2C+Mirpur%2C+Dhaka-1216&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-3, Road-4, Block-A, Section-6, Mirpur, Dhaka-1216',
          office_email: '',
          office_phone: '01322896926',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'Aalok Healthcare Ltd.  Ghatail, Tangail',
          office_name: `Manager`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Hospital+Gate%2C+Ghatail%2C+Tangail.&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Hospital Gate, Ghatail, Tangail.',
          office_email: '',
          office_phone: '01769969869, 01769969815',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'Aalok Healthcare Hospital, Ghatail., Tangail',
          office_name: `Director`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Main+Road%2C+Ghatail%2C+Tangail.&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Main Road, Ghatail, Tangail.',
          office_email: '',
          office_phone: '01769969861, 01711180691',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 20%, OPD Medicine -5%',
        },
        {
          office_location_Label: 'East West Medical College & Hospital, Dhaka',
          office_name: `Bishwajit Podder`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Dhour%2C+Nishatnagar%2C+Turag%2C+Dhaka-1230&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Dhour, Nishatnagar, Turag, Dhaka-1230',
          office_email: 'bishwajitananna@gmail.com',
          office_phone: '+880 1329 730 433',
          discount_details: 'Pathological Test - 30%, Radiology & Imaging - 10%, Procedure -20%',
        },
        {
          office_location_Label: 'Update Dental College & Hospital, Dhaka',
          office_name: `Bishwajit Podder`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Dhour%2C+Nishatnagar%2C+Turag%2C+Dhaka-1231&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Dhour, Nishatnagar, Turag, Dhaka-1231',
          office_email: 'bishwajitananna@gmail.com',
          office_phone: '+880 1329 730 434',
          discount_details: 'Dental Service -20%',
        },
        {
          office_location_Label: 'Aichi Hospital Ltd., Dhaka',
          office_name: `Bishwajit Podder`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Dhour%2C+Nishatnagar%2C+Turag%2C+Dhaka-1232&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Dhour, Nishatnagar, Turag, Dhaka-1232',
          office_email: 'bishwajitananna@gmail.com',
          office_phone: '+880 1329 730 435',
          discount_details: 'Pathological Test - 30%, Radiology & Imaging - 10%, Procedure -20%',
        },
        {
          office_location_Label: 'Dhanmondi Diagnostic & Consultation Center, Dhaka',
          office_name: `Dr. Khalid Omar Shahin`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=79+Shatmosjid+Road%2C+Dhanmondi%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '79 Shatmosjid Road, Dhanmondi, Dhaka',
          office_email: 'khalidfalil1987@gmail.com',
          office_phone: '01748 360 073',
          discount_details: 'Pathological Test - 30%, Radiology & Imaging - 20%',
        },
        {
          office_location_Label: 'Life Trust Diagnostic Limited, Dhaka',
          office_name: `Md. Abdullah Al Mamun`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Rafiq+Tower+%283rd+Floor%2C+Lift-2%29+CB%2C+211%2F8%2C+Main+Road%2C+Mirpur-14%2C+Dhaka+Cantonment%2C+Dhaka-1206&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address:
            'Rafiq Tower (3rd Floor, Lift-2) CB, 211/8, Main Road, Mirpur-14, Dhaka Cantonment, Dhaka-1206',
          office_email: 'mamunsharkar88@gmail.com',
          office_phone: '+880 1677 727 634',
          discount_details: 'Pathological Test - 30%, Radiology & Imaging - 25%',
        },
        {
          office_location_Label: 'Al Helal Specialized Hospital Ltd, Dhaka',
          office_name: `Md. Shafiqul Islam Talukder`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=150%2C+Begum+Rokeya+Sarani%2C+Senpara+Parbata%2C+Mirpur-10&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '150, Begum Rokeya Sarani, Senpara Parbata, Mirpur-10',
          office_email: 'shafiqtalukder70@gmail.com',
          office_phone: '01711 156 001',
          discount_details: 'Pathological Test - 30%, Radiology & Imaging - 25%',
        },
        {
          office_location_Label: 'Delta Hospital Limited, Dhaka',
          office_name: `Md. Ershadul Hoque`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=26%2F2%2C+Principal+Abul+Kashem+%28Darussalam%29+Road%2C+Mirpur-1%2C+Dhaka-1216&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '26/2, Principal Abul Kashem (Darussalam) Road, Mirpur-1, Dhaka-1216',
          office_email: 'marketing@delta-hospital.com',
          office_phone: '01897672034',
          discount_details:
            'Pathological Test - 30%, Radiology & Imaging - 25%, MRI -30%, CT Scan, ECO, Endoscopy -15%',
        },
        {
          office_location_Label: 'Apollo Imperial Hospitals, Chittagong',
          office_name: `Mamun Hossain Kaji`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Zakir+Hossain+Road%2C+Pahartali%2C+Chattogram+4202&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Zakir Hossain Road, Pahartali, Chattogram 4202',
          office_email: 'mamun.bdm@aihlbd.org',
          office_phone: '01859 773 332',
          discount_details: 'Pathological Test - 13%, Radiology & Imaging - 13%',
        },
        {
          office_location_Label: 'Dr. Sirajul Islam Medical College & Hospital Limited, Dhaka',
          office_name: `Nur Mohammad`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=12%2F3%2C+New+Circular+Road%2C+Malibagh%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '12/3, New Circular Road, Malibagh, Dhaka',
          office_email: 'n.monir87@gmail.com',
          office_phone: '01614561414',
          discount_details: 'Pathological Test - 20%, Radiology & Imaging - 15%',
        },
        {
          office_location_Label: 'Thyrocare Bangladesh Limited, Dhaka',
          office_name: `Rubayet Amin`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=12th+floor%2C+confidence+Center%2C+Pragoti+Sarani%2C+Shahjadpur%2C+Dhaka-1212&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '12th floor, confidence Center, Pragoti Sarani, Shahjadpur, Dhaka-1212',
          office_email: 'rubayet@thyrocarebd.com',
          office_phone: '01944443850',
          discount_details: 'Pathological Test - 30%',
        },
        {
          office_location_Label: 'Enam Medical Hospital Pvt. Ltd, Dhaka',
          office_name: `Md. Almas Uddin`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=9%2F3%2C+Parboti+Nagar%2C+Savar+Thana+Road%2C+Savar-1340&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '9/3, Parboti Nagar, Savar Thana Road, Savar-1340',
          office_email: 'info@emch.bd.com',
          office_phone: '01817 649 343',
          discount_details: 'Pathological Test - 25%, Radiology & Imaging - 25%',
        },
        {
          office_location_Label: 'M H Samorita Hospital & Medical College, Dhaka',
          office_name: `Rashid Khan`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=117+Tejgaon%2C+Love+Road%2C+Dhaka-1208&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '117 Tejgaon, Love Road, Dhaka-1208',
          office_email: 'info.mhshme@gmail.com',
          office_phone: '01841 114 228',
          discount_details: 'Pathologial- 30%, Radiological- 20%, Physiotherapy- 20%',
        },
        {
          office_location_Label: 'United Hospital Limited, Dhaka',
          office_name: `Syed Ashraf Ul Masum`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=plot-15%2C+Road-71%2C+Gulshan%2C+Dhaka-1212&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'plot-15, Road-71, Gulshan, Dhaka-1212',
          office_email: 'syed.masum@uhlbd.com',
          office_phone: '01914 001 403',
          discount_details: 'Pathologial- 20%, Radiological- 10%',
        },
        {
          office_location_Label: 'Uttara Crescent Hospital, Dhaka',
          office_name: `Mr Animesh, Head of Marketing`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-21%2CRoad-15%2C+sector-03%2C+Uttara%2C+Dhaka-1230&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-21,Road-15, sector-03, Uttara, Dhaka-1230',
          office_email: 'headofmarketinguch@gmail.com',
          office_phone: '01409977620',
          discount_details: 'Pathologial- 30%, Radiological- 20%, Bed/ ward -20%',
        },
        {
          office_location_Label: 'Square Hospitals Ltd., Dhaka',
          office_name: `Mr. Nur Alam Sumon`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=18%2FF%2C+Bir+Uttam+Qazi+Nuruzzaman+Sarak%2C+West+Panthapath%2C+Dhaka-1205&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '18/F, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka-1205',
          office_email: 'nuralam@squarehospital.com',
          office_phone: '01819 871 813',
          discount_details: 'Not Available OPD discount',
        },
        {
          office_location_Label: 'MAX Hospital & Diagnostics, Chittagong',
          office_name: `Ashit Dey`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=35%2F36+Mehedibag+4000+Chittagong%2C+Chittagong&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '35/36 Mehedibag 4000 Chittagong, Chittagong',
          office_email: 'ashitdey1983@gmail.com',
          office_phone: '01814792025',
          discount_details: 'Pathologial- 30%, Radiological- 20%, Ambulance- 20%',
        },
        {
          office_location_Label: 'Central Hospital Limited, Dhaka',
          office_name: `Mr. Abdullah Al Mamun`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House+No-+2%2C+Road+No-5%2C+Green+road%2C+Dhanmondi%2C+Dhaka-1208&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House No- 2, Road No-5, Green road, Dhanmondi, Dhaka-1208',
          office_email: 'mamunchl81@gmail.com',
          office_phone: '+880 1731 213 511',
          discount_details: 'Pathologial- 25%, Radiological- 10%',
        },
        {
          office_location_Label: 'Japan Bangladesh Friendship Medical Services Ltd., Dhaka',
          office_name: `Mr. Md. Rasel Mia`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=55%2C+Satmosjid+Road+%28Zigatola+Bus+Stand%29%2C+Dhanmondi%2C+Dhaka-1209&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '55, Satmosjid Road (Zigatola Bus Stand), Dhanmondi, Dhaka-1209',
          office_email: 'jbfhbdd2021@gmail.com',
          office_phone: '+880 1713 443 325',
          discount_details: 'Pathologial- 30%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Imaging Center, Dhaka',
          office_name: `Abu Abdullah Rasel`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-48%2C+Road-9%2FA%2C+Satmasjid+Road%2C+Dhanmondi+R%2FA%2C+Dhaka-1209&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-48, Road-9/A, Satmasjid Road, Dhanmondi R/A, Dhaka-1209',
          office_email: 'aar.imsf@gmail.com',
          office_phone: '01313095947, 01716-881550, 01313095871',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Medical Imaging Center, Dhaka',
          office_name: `Mr. Md. Mohiuddin Robin`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-58%2C+Road-2%2FA%2C+Jigatola+Bus+Stand%2C+Dhanmondi+R%2FA%2C+Dhaka-1209&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-58, Road-2/A, Jigatola Bus Stand, Dhanmondi R/A, Dhaka-1209',
          office_email: 'mohiuddin.robin@yahoo.com',
          office_phone: '01313095947',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Hospital, Dhanmondi, Dhaka',
          office_name: `Md. Milan Hasan`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-68%2C+Road-15%2FA%2C+Dhanmondi+R%2FA%2C+Dhaka-1209.+%28Near+Sankar+Bus+Stand%29&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-68, Road-15/A, Dhanmondi R/A, Dhaka-1209. (Near Sankar Bus Stand)',
          office_email: 'corporate.ish2019@gmail.com',
          office_phone: '01752464024, 01313095898, 01641381717',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Medical College & Hospital, Kallayanpur, Dhaka',
          office_name: `Ataullah Tomal`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=1%2F1-B%2C+Kallyanpur+%2C+Mirpur+Road%2C+Dhaka-1207&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '1/1-B, Kallyanpur , Mirpur Road, Dhaka-1207',
          office_email: 'ataullah.ist1991@gmail.com',
          office_phone: '01313095897, 01703-723772',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina D. Lab & Consultation Center, Doyagonj, Dhaka',
          office_name: `Mr. Abu Sayed`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=28+Doyagonj+%28Hat+Lane%29%2C+Sutrapur%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '28 Doyagonj (Hat Lane), Sutrapur, Dhaka',
          office_email: 'mdsayed81@gmail.com',
          office_phone: '01828161194, 01625944928',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Badda, Dhaka',
          office_name: `Md. Khairul Islam Masum`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Badda+Tower%2C+Cha+72%2F1%2C+Uttar+Badda%2C+Progati+Sarani%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Badda Tower, Cha 72/1, Uttar Badda, Progati Sarani, Dhaka',
          office_email: 'masumrpt@gmail.com',
          office_phone: '01313095923',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center Lalbagh Ltd., Dhaka',
          office_name: `Md. Zakir Hossain`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=27%2F4%2C+Dhakeshory+Road%2C+Lalbagh%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '27/4, Dhakeshory Road, Lalbagh, Dhaka',
          office_email: 'mdzakirhossen395@gmail.com',
          office_phone: '01790-393395',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Jatrabari, Dhaka',
          office_name: `Md. Sazidul Islam`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=79%2F1%2FE%2C+Demra+Road%2C+Bibir+Bagicha%2C+Uttar+Jatrabari%2C+Dhaka-1204&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '79/1/E, Demra Road, Bibir Bagicha, Uttar Jatrabari, Dhaka-1204',
          office_email: 'sazidislam245@gmail.com',
          office_phone: '01886366168, 0178-1111993',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Uttara, Dhaka',
          office_name: `Md. Shahidul Islam`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-52%2C+Sector-13+Garib-E-Newaz+Avenew%2C+Uttara%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-52, Sector-13 Garib-E-Newaz Avenew, Uttara, Dhaka',
          office_email: 'shahid22884@gmail.com',
          office_phone: '01670352618, 01687-468382, 01716-657303',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center Keranigonj Ltd., Dhaka',
          office_name: `Nur Mohammmad`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-Maa+Plaza%2C+Kadamtoli+Moor%2C+Keraniganj%2C+Dhaka-1310&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-Maa Plaza, Kadamtoli Moor, Keraniganj, Dhaka-1310',
          office_email: 'nurmohammad3141@gmail.com',
          office_phone: '01628738882',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Mirpur, Dhaka',
          office_name: `Md. Kamrul Ahsan`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-11%2C+Haji+Road%2C+Avenue-3%2C+Rupnagar%2C+Mirpur-2%2C+Dhaka-1216&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-11, Haji Road, Avenue-3, Rupnagar, Mirpur-2, Dhaka-1216',
          office_email: 'kamrulibnsina@gmail.com',
          office_phone: '01712861579, 01739546877',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Malibagh, Dhaka',
          office_name: `Mozzem Hossain Palash`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House+%23+479%2C+DIT+Road%2C+Malibagh%2C+Dhaka-1217.&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House # 479, DIT Road, Malibagh, Dhaka-1217.',
          office_email: 'mozzemibn@gmail.com',
          office_phone: '01313095899, 01785612500',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Savar, Dhaka',
          office_name: `Monjurul Islam Mahin`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=B-31%2F6Jaleswar%2C+Aricha+Road%2C+Savar%2C+Dhaka.&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'B-31/6Jaleswar, Aricha Road, Savar, Dhaka.',
          office_email: 'mahinmv334@gmail.com',
          office_phone: '01821382493, 01313095901, 01518645891',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Cancer Diagnostic Center, Dhanmondi, Dhaka',
          office_name: `Md. Ibrahim Hossain`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House%23+47%2C+Shatmasjid+Road%2C+Dhanmondi%2C+Dhaka&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House# 47, Shatmasjid Road, Dhanmondi, Dhaka',
          office_email: 'ibrahimhossain5602@gmail.com',
          office_phone: '01937562072',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Hospital Sylhet Ltd., Sylhet',
          office_name: `Md. Sahed Ali`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Sobhani+Ghat+Point%2C+Sylhet&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Sobhani Ghat Point, Sylhet',
          office_email: 'ali.shahedishsl@gmail.com',
          office_phone: '01313095950, 01701268386',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Bogura, Bogura',
          office_name: `Ali Ahmad`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=Kanojgari%2C+Sherpur+Road%2C+Bogra&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'Kanojgari, Sherpur Road, Bogra',
          office_email: 'aliahamad03@gmail.com',
          office_phone: '01313095932, 01313095933',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label:
            'Ibn Sina Diagnostic & Consultation Center, Chattagram, Chittagong',
          office_name: `Md. Sanaul Islam`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=12%2FA%2C+Katalganj%2C+Road-2%2C+Panchlaish%2C+Chattagram&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '12/A, Katalganj, Road-2, Panchlaish, Chattagram',
          office_email: 'sanauliiuc@gmail.com',
          office_phone: '01824255392, 01407608483',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Cumilla, Cumilla',
          office_name: `Kazi Tarequzzaman`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=29+Kotbari+Road%2C+Tomsom+bridge%2C+Cumilla&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '29 Kotbari Road, Tomsom bridge, Cumilla',
          office_email: 'kazitareq5@gmail.com',
          office_phone: '01680-230213, 01840-020525',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Hospital & Diagnostic Center, Jashore, Jashore',
          office_name: `Md. Israil Hossain`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=House-68%2C+Jail+Road%2C+Ghop%2C+Jashore&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'House-68, Jail Road, Ghop, Jashore',
          office_email: 'israil86trust@gmail.com',
          office_phone: '01313095940, 01713143696',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Rajshahi, Rajshahi',
          office_name: `Md. Masud Rana`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=223-224%2C+Kazihata%2C+C%26B+Mor%0A%28Opposite+Television+Center%29%2C+Rajpara%2C+Rajshahi&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address:
            '223-224, Kazihata, C&B Mor\n(Opposite Television Center), Rajpara, Rajshahi',
          office_email: 'md16rana@gmail.com',
          office_phone: '01307090934, 01750723720',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Hospital & Diagnostic Center, Noakhali, Noakhali',
          office_name: `Md. Joynal Abedin`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=%28Opposite+Sadar+Hospital%29%2C+Maizdee%2C+Noakhali&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '(Opposite Sadar Hospital), Maizdee, Noakhali',
          office_email: 'mjoynalfeni@gmail.com',
          office_phone: '01722085377, 01814717859',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Hospital, Bogra, Bogura',
          office_name: ``,
          office_location:
            "<iframe src='https://www.google.com/maps?q=upcoming&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'upcoming',
          office_email: '',
          office_phone: '',
          discount_details: 'upcoming',
        },
        {
          office_location_Label: 'Ibn Sina Diagnostic & Consultation Center, Feni, Feni',
          office_name: ``,
          office_location:
            "<iframe src='https://www.google.com/maps?q=upcoming&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: 'upcoming',
          office_email: '',
          office_phone: '',
          discount_details: 'upcoming',
        },
        {
          office_location_Label: 'Dhaka Central International Medical College & Hospital, Dhaka',
          office_name: `Md. Musa Ali`,
          office_location:
            "<iframe src='https://www.google.com/maps?q=2%2F1+Ring+Road%2C+Shyamoli%2CDhaka-1207&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>",
          office_address: '2/1 Ring Road, Shyamoli,Dhaka-1207',
          office_email: 'musa.ali@dcimch.com',
          office_phone: '01409967349',
          discount_details: 'Pathologial- 35%, Radiological- 30%',
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
