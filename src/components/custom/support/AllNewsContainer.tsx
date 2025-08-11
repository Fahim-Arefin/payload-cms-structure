// import React from 'react'

// type Props = {}

// function AllNewsContainer({}: Props) {
//   return (
//     <div
//       className="bg-[#434343] px-[150px] py-[50px]
//     grid grid-cols-2 gap-12 text-white "
//     >
//       <div className="rounded-[6px]rounded-[6px] cursor-pointer">
//         <img src="/assets/newsbanner.png" alt="" className="h-[500px] rounded-[6px]" />
//       </div>
//       <div className="space-y-6">
//         <div className="flex space-x-6 h-fit ">
//           <div className=" bg-red-200 rounded-md ">
//             <img
//               src="/assets/newsbanner2.jpg"
//               alt=""
//               className="h-[120px] min-w-[120px] object-cover rounded-md"
//             />
//           </div>
//           <div className="space-y-3">
//             <div className="flex items-center space-x-2">
//               <div className="">
//                 <img src="/assets/calender2.png" alt="" className="w-4 h-4" />
//               </div>
//               <p className="text-[10px]">14 Aug 2024 | 11.00am</p>
//             </div>
//             <h3 className="text-[#ED7125] text-[13px]">A Kickoff meeting with Sales team.</h3>
//             <p className="text-[12px]">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
//               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//             </p>
//           </div>
//         </div>
//         <div className="flex space-x-6 h-fit ">
//           <div className=" bg-red-200 rounded-md ">
//             <img
//               src="/assets/newsbanner2.jpg"
//               alt=""
//               className="h-[120px] w-[280px] object-cover rounded-md"
//             />
//           </div>
//           <div className="space-y-3">
//             <div className="flex items-center space-x-2">
//               <div className="">
//                 <img src="/assets/calender2.png" alt="" className="w-4 h-4" />
//               </div>
//               <p className="text-[10px]">14 Aug 2024 | 11.00am</p>
//             </div>
//             <h3 className="text-[#ED7125] text-[13px]">A Kickoff meeting with Sales team.</h3>
//             <p className="text-[12px]">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
//               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//             </p>
//           </div>
//         </div>
//         <div className="flex space-x-6 h-fit ">
//           <div className=" bg-red-200 rounded-md ">
//             <img
//               src="/assets/newsbanner2.jpg"
//               alt=""
//               className="h-[120px] w-[280px] object-cover rounded-md"
//             />
//           </div>
//           <div className="space-y-3">
//             <div className="flex items-center space-x-2">
//               <div className="">
//                 <img src="/assets/calender2.png" alt="" className="w-4 h-4" />
//               </div>
//               <p className="text-[10px]">14 Aug 2024 | 11.00am</p>
//             </div>
//             <h3 className="text-[#ED7125] text-[13px]">A Kickoff meeting with Sales team.</h3>
//             <p className="text-[12px]">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
//               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AllNewsContainer

'use client'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { BsPlay } from 'react-icons/bs'

type NewsItem = {
  id: number
  image: string
  mobileImage: string
  date: string
  title: string
  description: string
  videoLink: string
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: '/assets/supportpage/web/thumbnails/yt-thumbnail-4.jpg',
    mobileImage: '/assets/supportpage/mobile/thumbnails/yt-thumbnail-4.jpg',
    date: '15 Jan 2024 | 10.00am',
    title: 'Understanding Life Insurance Basics',
    description:
      "Learn the fundamental concepts of life insurance and how it can protect your family's financial future. Discover the different types of policies available and find the right coverage for your needs. Our expert explains key terms, benefits, and important considerations when choosing life insurance.",
    videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
  },
  {
    id: 2,
    image: '/assets/supportpage/web/thumbnails/yt-thumbnail-1.jpg',
    mobileImage: '/assets/supportpage/mobile/thumbnails/yt-thumbnail-1.jpg',
    date: '22 Feb 2024 | 2.30pm',
    title: 'Expert Insurance Guidance & Tips',
    description:
      'Get professional insights from our insurance experts on making smart coverage decisions. Learn practical tips for evaluating policies, understanding premiums, and maximizing your insurance benefits. Essential knowledge for protecting what matters most to you.',
    videoLink: 'https://www.youtube.com/embed/rcduE_ff314',
  },
  {
    id: 3,
    image: '/assets/supportpage/web/thumbnails/yt-thumbnail-4.jpg',
    mobileImage: '/assets/supportpage/mobile/thumbnails/yt-thumbnail-4.jpg',
    date: '15 Jan 2024 | 11.30am',
    title: 'Life Insurance Planning Strategies',
    description:
      "Explore comprehensive strategies for incorporating life insurance into your financial planning. Understand how to align coverage with your life goals, protect your family's lifestyle, and ensure financial security for the future.",
    videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
  },
]

function AllNewsContainer() {
  const [open, setOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState('')
  const [newsCardOpen, setNewsCardOpen] = useState(false)
  return (
    // px-10 lg:px-[40px] xl:px-[100px]  2xl:px-[150px]
    // py-8 lg:py-[20px] xl:py-[40px] 2xl:py-[50px]
    <div
      className="bg-[#434343] 
    rounded-[6px]  md:rounded-[8px] lg:rounded-[11px] xl:rounded-[13px] 2xl:rounded-[15px]
    p-8 lg:p-[20px] xl:p-[40px] 2xl:p-[50px]
    grid grid-cols-1 lg:grid-cols-2 text-white gap-6 xl:gap-12 
    mb-12 lg:mb-16 xl:mb-24"
    >
      {/* Left Banner */}
      {/* <div className="relative rounded-[6px] cursor-pointer">
        <Image
          src="/assets/newsbanner.png"
          alt="Main news"
          width={500}
          height={500}
          className="w-full rounded-[6px] object-cover 
          h-[250px] md:h-[350px] lg:h-[350px] xl:h-[460px] 2xl:h-[500px] "
        />
        <div className="opacity-0 hover:opacity-100 flex transition-all duration-300 absolute inset-0 items-center bg-black/50 justify-center rounded-[6px]">
          <img src="/assets/play2.png" alt="" />
        </div>
      </div> */}

      {/* h-[250px] md:h-[350px] lg:h-[350px] xl:h-[460px] 2xl:h-[500px] */}
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="relative rounded-[6px] cursor-pointer" onClick={() => setOpen(true)}>
          <img
            src="/assets/supportpage/mobile/thumbnails/yt-thumbnail-4.jpg"
            alt="Main news"
            className="lg:hidden w-full rounded-[6px] object-cover 
          h-[250px] md:h-[350px] lg:h-full"
          />
          <img
            src="/assets/supportpage/web/thumbnails/yt-thumbnail-4.jpg"
            alt="Main news"
            className="hidden lg:block w-full rounded-[6px] object-cover 
          h-[250px] md:h-[350px] lg:h-full"
          />
          <div className="opacity-0 hover:opacity-100 flex transition-all duration-300 absolute inset-0 items-center bg-black/50 justify-center rounded-[6px]">
            <img
              className="lg:hidden w-12 h-12 md:w-16 md:h-16"
              src="/assets/supportpage/mobile/play2.png"
              alt="play"
            />
            <img
              className="hidden lg:block lg:w-12 lg:h-12 xl:w-16 xl:h-16"
              src="/assets/supportpage/web/play2.png"
              alt="play"
            />
          </div>
        </div>

        {/* ─── Dialog Content ─── */}
        <DialogContent
          className="max-w-5xl w-full aspect-video p-0 bg-black 
        [&>button.absolute]:top-3 [&>button.absolute]:right-3 
        [&>button.absolute]:bg-black/50 
        [&>button.absolute]:text-white 
        [&>button.absolute]:hover:bg-black/80"
        >
          <VisuallyHidden>
            <DialogTitle>Expert Video</DialogTitle>
          </VisuallyHidden>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/YbnlDrexiGE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>

      {/* News List */}
      <div className="space-y-6">
        {newsItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 lg:space-x-6 h-fit">
            <div
              className="relative rounded-[6px] cursor-pointer
            min-w-[110px] max-w-[110px] xl:min-w-[140px] xl:max-w-[140px] 
            h-[110px] xl:h-[140px]"
              onClick={() => {
                setSelectedVideo(item.videoLink)
                setNewsCardOpen(true)
              }}
            >
              <img
                src={item.mobileImage}
                alt={item.title}
                className="object-cover rounded-md h-full w-full lg:hidden"
              />
              <img
                src={item.image}
                alt={item.title}
                className="object-cover rounded-md h-full w-full hidden lg:block"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-md">
                <BsPlay className="text-white text-2xl xl:text-3xl" />
              </div>
            </div>
            <div className="space-y-2 xl:space-y-3">
              <div className="flex items-center">
                <img
                  src="/assets/supportpage/mobile/calender2.png"
                  alt="calendar"
                  className="lg:hidden "
                />
                <img
                  src="/assets/supportpage/web/calender2.png"
                  alt="calendar"
                  className="hidden lg:block"
                />
                <p className="text-[11px] ml-2">{item.date}</p>
              </div>
              <h3 className="text-[#ED7125]  text-[11px] md:text-[15px]">{item.title}</h3>
              {/* description 2xl */}
              <p className="hidden 2xl:block text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 40).join(' ')}
              </p>
              {/* description xl */}
              <p className="hidden xl:block 2xl:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 28).join(' ')}
              </p>
              {/* description lg */}
              <p className="hidden lg:block xl:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 13).join(' ')}
              </p>
              {/* description md */}
              <p className="hidden md:block lg:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 18).join(' ')}
              </p>
              {/* description sm */}
              <p className="md:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 10).join(' ')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* News Card Video Modal */}
      <Dialog open={newsCardOpen} onOpenChange={setNewsCardOpen}>
        <DialogContent
          className="max-w-5xl w-full aspect-video p-0 bg-black 
        [&>button.absolute]:top-3 [&>button.absolute]:right-3 
        [&>button.absolute]:bg-black/50 
        [&>button.absolute]:text-white 
        [&>button.absolute]:hover:bg-black/80"
        >
          <VisuallyHidden>
            <DialogTitle>News Video</DialogTitle>
          </VisuallyHidden>
          <iframe
            width="100%"
            height="100%"
            src={selectedVideo}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AllNewsContainer
