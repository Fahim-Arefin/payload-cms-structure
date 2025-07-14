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

import Image from 'next/image'
import React from 'react'

type NewsItem = {
  id: number
  image: string
  date: string
  title: string
  description: string
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: '/assets/newsbanner2.jpg',
    date: '14 Aug 2024 | 11.00am',
    title: 'A Kickoff meeting with Sales team.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    image: '/assets/newsbanner2.jpg',
    date: '15 Aug 2024 | 2.00pm',
    title: 'Marketing strategy planning session.',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 3,
    image: '/assets/newsbanner2.jpg',
    date: '16 Aug 2024 | 9.00am',
    title: 'Monthly team performance review.',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
]

function AllNewsContainer() {
  return (
    <div
      className="bg-[#434343]
    px-10 lg:px-[40px] xl:px-[100px]  2xl:px-[150px] 
    py-8 lg:py-[20px] xl:py-[40px] 2xl:py-[50px]
    grid grid-cols-1 lg:grid-cols-2 text-white gap-6 xl:gap-12 "
    >
      {/* Left Banner */}
      <div className="relative rounded-[6px] cursor-pointer">
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
      </div>

      {/* News List */}
      <div className="space-y-6">
        {newsItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 lg:space-x-6 h-fit">
            <div
              className=" rounded-[6px] 
            min-w-[110px] max-w-[110px] xl:min-w-[140px] xl:max-w-[140px] 
            h-[110px] xl:h-[140px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="object-cover rounded-md h-full w-full"
              />
            </div>
            <div className="space-y-2 xl:space-y-3">
              <div className="flex items-center space-x-2">
                <Image src="/assets/calender2.png" alt="calendar" width={16} height={16} />
                <p className="text-[11px]">{item.date}</p>
              </div>
              <h3 className="text-[#ED7125]  text-[11px] md:text-[15px]">{item.title}</h3>
              {/* description 2xl */}
              <p className="hidden 2xl:block text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 40).join(' ')}
                {item.description.split(' ').length > 40 && (
                  <span className="ml-1 text-[#ED7125] font-medium cursor-pointer hover:underline hover:text-[#c45d1f] transition-all">
                    ... see more
                  </span>
                )}
              </p>
              {/* description xl */}
              <p className="hidden xl:block 2xl:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 28).join(' ')}
                {item.description.split(' ').length > 28 && (
                  <span className="ml-1 text-[#ED7125] font-medium cursor-pointer hover:underline hover:text-[#c45d1f] transition-all">
                    ... see more
                  </span>
                )}
              </p>
              {/* description lg */}
              <p className="hidden lg:block xl:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 13).join(' ')}
                {item.description.split(' ').length > 13 && (
                  <span className="ml-1 text-[#ED7125] font-medium cursor-pointer hover:underline hover:text-[#c45d1f] transition-all">
                    ... see more
                  </span>
                )}
              </p>
              {/* description md */}
              <p className="hidden md:block lg:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 18).join(' ')}
                {item.description.split(' ').length > 18 && (
                  <span className="ml-1 text-[#ED7125] font-medium cursor-pointer hover:underline hover:text-[#c45d1f] transition-all">
                    ... see more
                  </span>
                )}
              </p>
              {/* description sm */}
              <p className="md:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                {item.description.split(' ').slice(0, 10).join(' ')}
                {item.description.split(' ').length > 10 && (
                  <span className="ml-1 text-[#ED7125] font-medium cursor-pointer hover:underline hover:text-[#c45d1f] transition-all">
                    ... see more
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllNewsContainer
