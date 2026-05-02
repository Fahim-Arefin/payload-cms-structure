// import { getGlobalCached } from '@/lib/cachedGlobals'
// import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'
// import { pageHref } from '@/lib/utils'
// import { Footer } from '@/payload-types'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// import { default as Pattern01, default as Pattern02 } from '/public/assets/images/BOpattern.png'
// import Phone from 'public/assets/icons/phone.png'
// import Address from 'public/assets/icons/address.png'
// import Mail from 'public/assets/icons/mail.png'
// import Arrow from 'public/assets/icons/arrow.png'

// import At from 'public/assets/icons/attherate.png'
// import Facebook from 'public/assets/icons/facebook.png'
// import Linkdin from 'public/assets/icons/linkdin.png'
// import WhatsApp from 'public/assets/icons/whatsapp.png'
// import FooterBlur01 from 'public/assets/images/Blur1.png'
// import FooterBlur02 from 'public/assets/images/Blur2.png'

// import LocalizedRichText from '../../shared/LocalizedRichText'
// import Marquee from 'react-fast-marquee'

// async function ServerFooter() {
//   const footer = await getGlobalCached<Footer>(GLOBAL_FOOTER_SLUG_AND_TAG, 1)

//   return (
//     <div className="relative z-0">
//       <div
//         className="
//       bg-dark-1 container-padding
//     min-h-[450px] lg:min-h-[380px] xl:min-h-[585px] 2xl:min-h-[600px]
//     lg:space-y-[30px] xl:space-y-[60px] 2xl:space-y-[65px]
//     px-4 md:px-[120px] lg:px-[50px] xl:px-[110px] 2xl:px-[140px]
//     py-9 md:py-[48px] lg:py-5 xl:py-8 2xl:py-10 "
//       >
//         {/* content */}
//         <div
//           className="grid grid-cols-1 gap-3 lg:gap-0 lg:grid-cols-12
//       lg:mt-[30px] xl:mt-[60px] 2xl:mt-[70px]
//       relative z-20"
//         >
//           {/* grid 1 */}
//           <div
//             className="col-span-1 lg:col-span-3
//         space-y-[12px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]
//         relative
//         flex flex-col items-center lg:items-start
//         "
//           >
//             {/* logo */}
//             {typeof footer?.logo === 'object' && footer?.logo?.url && (
//               <Link
//                 href={`/`}
//                 className="relative z-20
//             hover:scale-110 transition-all duration-300 ease-in
//             w-[150px] xl:w-[240px] 2xl:w-[260px]
//             aspect-[701/179]"
//               >
//                 <Image
//                   src={footer?.logo?.url}
//                   alt="Brand Logo"
//                   fill
//                   quality={90}
//                   placeholder="blur"
//                   sizes="100vw"
//                   blurDataURL={footer?.logoBlurDataURL || ''}
//                 />
//               </Link>
//             )}
//             {/* brand text */}
//             <div className="font-manrope text-white-3 global-p4 z-20 w-[80%] text-center lg:text-start">
//               {footer?.branding?.introText}
//             </div>
//             {/* ISO image */}
//             {typeof footer?.isoBadgeImage === 'object' && footer?.isoBadgeImage?.url && (
//               <div
//                 className="relative z-20
//             w-[85px] xl:w-[135px] 2xl:w-[160px]
//             aspect-[544/204]"
//               >
//                 <Image
//                   src={footer?.isoBadgeImage?.url}
//                   alt="ISO Badge Image"
//                   fill
//                   quality={90}
//                   placeholder="blur"
//                   sizes="100vw"
//                   blurDataURL={footer?.isoBadgeImageBlurDataURL || ''}
//                 />
//               </div>
//             )}

//             <Image
//               src={FooterBlur01}
//               alt="Footer blur 01"
//               width={FooterBlur01?.width}
//               height={FooterBlur01?.height}
//               quality={90}
//               sizes="100vw"
//               placeholder="blur"
//               blurDataURL={FooterBlur01?.blurDataURL}
//               className="absolute -z-10
//               lg:scale-125 xl:scale-150
//               w-[80%] md:w-[60%] lg:w-full h-fit
//               lg:-left-[4%]
//               -bottom-[120%] md:-bottom-[150%] lg:-bottom-[70%] opacity-80"
//             />
//           </div>

//           {/* grid 2 */}
//           <div
//             className="col-span-1 lg:col-span-3
//         space-y-[8px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]
//         flex flex-col items-center lg:items-start
//         lg:pl-9 xl:pl-10 2xl:pl-12"
//           >
//             <div className="text-white-3 font-proxima font-bold global-h5">
//               {footer?.quickLinksSection?.header}
//             </div>
//             <div
//               className="flex flex-col
//           space-y-1 xl:space-y-1.5 2xl:space-y-2.5"
//             >
//               {footer?.quickLinksSection?.links?.map((item, index) => (
//                 <Link
//                   key={index}
//                   href={pageHref(item?.buttonLink)}
//                   className="w-fit mx-auto lg:mx-0
//     relative inline-block
//     text-white-2 global-p4 font-manrope text-center lg:text-start
//     hover:text-cyan transition-all duration-300 ease-in

//     after:content-['']
//     after:absolute after:left-0 after:-bottom-[2px]
//     after:h-[2px] after:w-full
//     after:origin-left after:scale-x-0
//     after:bg-cyan
//     after:transition-transform after:duration-300 after:ease-in

//     hover:after:scale-x-100
//   "
//                 >
//                   {item?.buttonText}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* grid 3 */}
//           <div
//             className="col-span-1 lg:col-span-3
//             hidden lg:flex lg:flex-col items-center lg:items-start
//         space-y-[8px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]"
//           >
//             <div className="text-white-3 font-proxima font-bold global-h5">
//               {footer?.productsSection?.header}
//             </div>
//             <div
//               className="flex flex-col
//           space-y-1 xl:space-y-1.5 2xl:space-y-2.5"
//             >
//               {footer?.productsSection?.products?.map((item, index) => (
//                 <div
//                   className="flex items-center justify-center lg:justify-start space-x-1"
//                   key={index}
//                 >
//                   <Link
//                     key={index}
//                     href={pageHref(item?.buttonLink)}
//                     className="w-fit
//     relative inline-block
//     text-white-2 global-p4 font-manrope text-center lg:text-start
//     hover:text-cyan transition-all duration-300 ease-in

//     after:content-['']
//     after:absolute after:left-0 after:-bottom-[2px]
//     after:h-[2px] after:w-full
//     after:origin-left after:scale-x-0
//     after:bg-cyan
//     after:transition-transform after:duration-300 after:ease-in

//     hover:after:scale-x-100
//   "
//                   >
//                     {item?.buttonText}
//                   </Link>
//                   {item?.showNewBadge && (
//                     <div
//                       className="text-white-1 font-proxima font-extrabold bg-cyan w-fit
//                 text-[9px] xl:text-[10px] 2xl:text-[12px] tracking-wide  uppercase
//                 px-[3px] xl:px-[6px] 2xl:px-[5px]
//                 py-[2px] xl:py-[5px] 2xl:py-[2px]
//                 "
//                     >
//                       new
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* grid 4 */}
//           <div
//             className="col-span-1 lg:col-span-3
//         space-y-[8px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]
//         flex flex-col items-center lg:items-start
//         relative "
//           >
//             <div className="text-white-3 font-proxima font-bold global-h5">
//               {footer?.factorySection?.header}
//             </div>
//             <div
//               className="flex flex-col items-center lg:items-start
//           space-y-1.5 lg:space-y-2 xl:space-y-3 2xl:space-y-4"
//             >
//               {/* address */}
//               <div
//                 className="flex items-start
//               space-x-1 xl:space-x-2 w-[80%] lg:w-full text-center lg:text-start"
//               >
//                 {/* icon */}
//                 <div
//                   className="lg:mt-[3px]
//                 w-[15px] 2xl:w-[20px]
//               aspect-square
//               "
//                 >
//                   <Image
//                     src={Address}
//                     alt="Address icon"
//                     width={Address?.width}
//                     height={Address?.height}
//                     placeholder="blur"
//                     blurDataURL={Address?.blurDataURL}
//                     quality={100}
//                     sizes="100vw"
//                     className="w-full h-full"
//                   />
//                 </div>
//                 {/* address */}
//                 <Link
//                   target="_blank"
//                   // href="https://www.google.com/maps?ll=23.770282,90.40626&z=16&t=m&hl=en-GB&gl=US&mapclient=embed&cid=8200627424099091507"
//                   href={footer?.factorySection?.mapUrl || ''}
//                 >
//                   <div className="text-white-2 font-manrope global-p4">
//                     {footer?.factorySection?.address}
//                   </div>
//                 </Link>
//               </div>
//               {/* phone */}
//               <div
//                 className="flex items-start
//               space-x-1 xl:space-x-2"
//               >
//                 {/* icon */}
//                 <div
//                   className="lg:mt-[2px]
//                 w-[15px] 2xl:w-[20px]
//               aspect-square
//               "
//                 >
//                   <Image
//                     src={Phone}
//                     alt="Phone icon"
//                     width={Phone?.width}
//                     height={Phone?.height}
//                     placeholder="blur"
//                     blurDataURL={Phone?.blurDataURL}
//                     quality={100}
//                     sizes="100vw"
//                     className="w-full h-full"
//                   />
//                 </div>
//                 {/* Phone */}
//                 <div className="text-white-2 font-manrope global-p4">
//                   <a href={`tel:${footer?.factorySection?.phone}`}>
//                     {footer?.factorySection?.phone}
//                   </a>
//                 </div>
//               </div>
//               {/* mail */}
//               <div
//                 className="flex items-start
//               space-x-1 xl:space-x-2"
//               >
//                 {/* icon */}
//                 <div
//                   className="lg:mt-[2px]
//                 w-[15px] 2xl:w-[20px]
//               aspect-square
//               "
//                 >
//                   <Image
//                     src={Mail}
//                     alt="Mail icon"
//                     width={Mail?.width}
//                     height={Mail?.height}
//                     placeholder="blur"
//                     blurDataURL={Mail?.blurDataURL}
//                     quality={100}
//                     sizes="100vw"
//                     className="w-full h-full"
//                   />
//                 </div>
//                 {/* Mail */}
//                 <div className="text-white-2 font-manrope global-p4">
//                   <a href={`mailto:${footer?.factorySection?.email}`}>
//                     {footer?.factorySection?.email}
//                   </a>
//                 </div>
//               </div>

//               <Image
//                 src={FooterBlur02}
//                 alt="Footer blur 02"
//                 width={FooterBlur02?.width}
//                 height={FooterBlur02?.height}
//                 quality={90}
//                 sizes="100vw"
//                 placeholder="blur"
//                 blurDataURL={FooterBlur02?.blurDataURL}
//                 className="absolute -z-10
//                 w-[50%] h-[90%] md:h-[96%] lg:w-full lg:h-fit
//                  left-[100px] md:left-[250px] lg:-left-[30%]
//                 top-[170px] lg:-top-[100px] xl:-top-[140px]
//                 xl:scale-110 2xl:scale-125
//                 opacity-80
//                 "
//               />
//             </div>
//           </div>
//         </div>

//         {/* brand text */}
//         <div
//           className="flex justify-center lg:hidden font-manrope text-white-3 global-p4 z-20 text-center lg:text-start
//         mt-[12px] mb-[8px] lg:m-0 "
//         >
//           {footer?.social?.header}
//         </div>
//         {/* social */}
//         <div
//           className="flex justify-center lg:hidden mb-[12px] lg:mb-0
//           space-x-1 lg:space-x-2 xl:space-x-2.5 2xl:space-x-3"
//         >
//           {/* facebook */}
//           <Link
//             href={footer?.social?.facebookUrl || ''}
//             target="_blank"
//             className="flex items-center justify-center group
//           w-[30px] xl:w-[35px] 2xl:w-[40px]
//           h-[30px] xl:h-[35px] 2xl:h-[40px]
//           bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
//           "
//           >
//             <Image
//               src={Facebook}
//               alt="Facebook icon"
//               width={Facebook?.width}
//               height={Facebook?.height}
//               quality={90}
//               sizes="100vw"
//               placeholder="blur"
//               blurDataURL={Facebook?.blurDataURL}
//               className="aspect-auto
//                 w-[10px] xl:w-[13px]
//                 group-hover:w-[13px]  xl:group-hover:w-[16px]
//               transition-all duration-300 ease-in"
//             />
//           </Link>
//           {/* whats app */}
//           <Link
//             href={footer?.social?.whatsApp || ''}
//             target="_blank"
//             className="flex items-center justify-center group
//           w-[30px] xl:w-[35px] 2xl:w-[40px]
//           h-[30px] xl:h-[35px] 2xl:h-[40px]
//           bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
//           "
//           >
//             <Image
//               src={WhatsApp}
//               alt="WhatsApp icon"
//               width={WhatsApp?.width}
//               height={WhatsApp?.height}
//               quality={90}
//               sizes="100vw"
//               placeholder="blur"
//               blurDataURL={WhatsApp?.blurDataURL}
//               className="aspect-auto
//                 w-[18px] xl:w-[23px]
//                 group-hover:w-[20px] xl:group-hover:w-[26px]
//               transition-all duration-300 ease-in"
//             />
//           </Link>
//           {/* At the rate app */}
//           <Link
//             href={`mailto:${footer?.factorySection?.email}` || ''}
//             className="flex items-center justify-center group
//           w-[30px] xl:w-[35px] 2xl:w-[40px]
//           h-[30px] xl:h-[35px] 2xl:h-[40px]
//           bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
//           "
//           >
//             <Image
//               src={At}
//               alt="At icon"
//               width={At?.width}
//               height={At?.height}
//               quality={90}
//               sizes="100vw"
//               placeholder="blur"
//               blurDataURL={At?.blurDataURL}
//               className="aspect-auto
//                 w-[18px] xl:w-[23px]
//                 group-hover:w-[20px] xl:group-hover:w-[26px]
//               transition-all duration-300 ease-in"
//             />
//           </Link>
//           {/* Linkdin */}
//           <Link
//             href={footer?.social?.linkedinUrl || ''}
//             target="_blank"
//             className="flex items-center justify-center group
//           w-[30px] xl:w-[35px] 2xl:w-[40px]
//           h-[30px] xl:h-[35px] 2xl:h-[40px]
//           bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
//           "
//           >
//             <Image
//               src={Linkdin}
//               alt="Linkdin icon"
//               width={Linkdin?.width}
//               height={Linkdin?.height}
//               quality={90}
//               sizes="100vw"
//               placeholder="blur"
//               blurDataURL={Linkdin?.blurDataURL}
//               className="aspect-auto
//                 w-[18px] xl:w-[22px]
//                 group-hover:w-[20px] xl:group-hover:w-[25px]
//               transition-all duration-300 ease-in"
//             />
//           </Link>
//         </div>

//         {/* marqury */}
//         <Marquee autoFill className="relative z-20 my-[12px] lg:my-0">
//           <div
//             className="flex items-center overflow-hidden
//           space-x-4 lg:space-x-6 xl:space-x-7 2xl:space-x-8
//           ml-4 lg:ml-6 xl:ml-7 2xl:ml-8"
//           >
//             {/* text */}
//             <div
//               className="text-[var(--Dark-Dark-1,#070725)] [-webkit-text-stroke-width:1.52px] [-webkit-text-stroke-color:var(--White-White-2,#E7E7EE)]
//       font-manrope not-italic font-bold uppercase leading-[125%] tracking-[5.4px]  opacity-20
//        text-[25px] lg:text-[35px] xl:text-[60px] 2xl:text-[70px]"
//             >
//               <div>{footer?.marqueeSection?.text}</div>
//             </div>
//             <div
//               className="text-[var(--White-White-2,#E7E7EE)] [-webkit-text-stroke-width:1.52px] [-webkit-text-stroke-color:var(--White-White-2,#E7E7EE)]
//         font-[Manrope] not-italic font-bold leading-[125%] tracking-[5.4px] uppercase opacity-20
//         text-[25px] lg:text-[35px] xl:text-[60px] 2xl:text-[70px]"
//             >
//               {footer?.marqueeSection?.year}
//             </div>
//             {/* icon */}
//             <Image
//               src={Arrow}
//               alt="Arrow"
//               width={Arrow?.width}
//               height={Arrow?.height}
//               quality={90}
//               sizes="100vw"
//               placeholder="blur"
//               blurDataURL={Arrow?.blurDataURL}
//               className="w-[20px] lg:w-[25px] xl:w-[42px] 2xl:w-[48px] aspect-[1/1]"
//             />
//           </div>
//         </Marquee>
//         {/* copuright and social links */}
//         <div className="flex justify-between items-center relative z-20 ">
//           {/* copyright */}
//           <div className="text-white-3 global-p4 tracking-wider font-manrope z-20">
//             {footer?.copyrightSection?.copyright}
//           </div>

//           {/* social */}
//           <div
//             className="hidden lg:flex
//           space-x-1 lg:space-x-2 xl:space-x-2.5 2xl:space-x-3"
//           >
//             {/* facebook */}
//             <Link
//               href={footer?.social?.facebookUrl || ''}
//               target="_blank"
//               className="flex items-center justify-center group
//           w-[30px] xl:w-[35px] 2xl:w-[40px]
//           h-[30px] xl:h-[35px] 2xl:h-[40px]
//           bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
//           "
//             >
//               <Image
//                 src={Facebook}
//                 alt="Facebook icon"
//                 width={Facebook?.width}
//                 height={Facebook?.height}
//                 quality={90}
//                 sizes="100vw"
//                 placeholder="blur"
//                 blurDataURL={Facebook?.blurDataURL}
//                 className="aspect-auto
//                 w-[10px] xl:w-[13px]
//                 group-hover:w-[13px]  xl:group-hover:w-[16px]
//               transition-all duration-300 ease-in"
//               />
//             </Link>
//             {/* whats app */}
//             <Link
//               href={footer?.social?.whatsApp || ''}
//               target="_blank"
//               className="flex items-center justify-center group
//           w-[30px] xl:w-[35px] 2xl:w-[40px]
//           h-[30px] xl:h-[35px] 2xl:h-[40px]
//           bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
//           "
//             >
//               <Image
//                 src={WhatsApp}
//                 alt="WhatsApp icon"
//                 width={WhatsApp?.width}
//                 height={WhatsApp?.height}
//                 quality={90}
//                 sizes="100vw"
//                 placeholder="blur"
//                 blurDataURL={WhatsApp?.blurDataURL}
//                 className="aspect-auto
//                 w-[18px] xl:w-[23px]
//                 group-hover:w-[20px] xl:group-hover:w-[26px]
//               transition-all duration-300 ease-in"
//               />
//             </Link>
//             {/* At the rate app */}
//             <Link
//               href={`mailto:${footer?.factorySection?.email}` || ''}
//               className="flex items-center justify-center group
//           w-[30px] xl:w-[35px] 2xl:w-[40px]
//           h-[30px] xl:h-[35px] 2xl:h-[40px]
//           bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
//           "
//             >
//               <Image
//                 src={At}
//                 alt="At icon"
//                 width={At?.width}
//                 height={At?.height}
//                 quality={90}
//                 sizes="100vw"
//                 placeholder="blur"
//                 blurDataURL={At?.blurDataURL}
//                 className="aspect-auto
//                 w-[18px] xl:w-[23px]
//                 group-hover:w-[20px] xl:group-hover:w-[26px]
//               transition-all duration-300 ease-in"
//               />
//             </Link>
//             {/* Linkdin */}
//             <Link
//               href={footer?.social?.linkedinUrl || ''}
//               target="_blank"
//               className="flex items-center justify-center group
//           w-[30px] xl:w-[35px] 2xl:w-[40px]
//           h-[30px] xl:h-[35px] 2xl:h-[40px]
//           bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
//           "
//             >
//               <Image
//                 src={Linkdin}
//                 alt="Linkdin icon"
//                 width={Linkdin?.width}
//                 height={Linkdin?.height}
//                 quality={90}
//                 sizes="100vw"
//                 placeholder="blur"
//                 blurDataURL={Linkdin?.blurDataURL}
//                 className="aspect-auto
//                 w-[18px] xl:w-[22px]
//                 group-hover:w-[20px] xl:group-hover:w-[25px]
//               transition-all duration-300 ease-in"
//               />
//             </Link>
//           </div>

//           {/* legal */}
//           <div className="text-white-3 global-p4 tracking-wider font-manrope">
//             <LocalizedRichText
//               en={footer?.legalSection?.legalValue}
//               bn={footer?.legalSection?.legalValue}
//             />
//           </div>
//         </div>
//       </div>
//       {/* pattern 1 */}
//       {footer?.showPatternDesign && (
//         <div
//           className="invisible md:visible absolute left-0 bottom-0 z-10 opacity-30 h-[50%]
//                  md:w-[120px]
//                  lg:w-[170px]
//                  xl:w-[225px]
//                  2xl:w-[280px]
//               "
//         >
//           <Image
//             fill
//             src={Pattern01}
//             alt="pattern image 02"
//             quality={90}
//             sizes="100vw"
//             className="object-cover -rotate-180"
//             placeholder="blur"
//             blurDataURL={Pattern01?.blurDataURL}
//           />
//         </div>
//       )}
//       {/* pattern 2 */}
//       {footer?.showPatternDesign && (
//         <div
//           className="invisible md:visible absolute right-0 top-0 z-10 opacity-30 h-[50%]
//                  md:w-[120px]
//                  lg:w-[170px]
//                  xl:w-[225px]
//                  2xl:w-[280px]
//               "
//         >
//           <Image
//             fill
//             src={Pattern02}
//             alt="pattern image 02"
//             quality={90}
//             sizes="100vw"
//             className="object-cover"
//             placeholder="blur"
//             blurDataURL={Pattern02?.blurDataURL}
//           />
//         </div>
//       )}
//     </div>
//   )
// }

// export default ServerFooter
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'
import { pageHref } from '@/lib/utils'
import { Footer } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { default as Pattern01, default as Pattern02 } from '/public/assets/images/BOpattern.png'
import Phone from 'public/assets/icons/phone.png'
import Address from 'public/assets/icons/address.png'
import Mail from 'public/assets/icons/mail.png'
import Arrow from 'public/assets/icons/arrow.png'

import At from 'public/assets/icons/attherate.png'
import Facebook from 'public/assets/icons/facebook.png'
import Linkdin from 'public/assets/icons/linkdin.png'
import WhatsApp from 'public/assets/icons/whatsapp.png'
import FooterBlur01 from 'public/assets/images/Blur1.png'
import FooterBlur02 from 'public/assets/images/Blur2.png'

import LocalizedRichText from '../../shared/LocalizedRichText'
import Marquee from 'react-fast-marquee'

async function ServerFooter() {
  const footer = await getGlobalCached<Footer>(GLOBAL_FOOTER_SLUG_AND_TAG, 1)

  return (
    <div
      className="relative z-0 
    bg-dark-1 
    min-h-[450px] lg:min-h-[380px] xl:min-h-[585px] 2xl:min-h-[600px]
    pb-9 md:pb-[48px] lg:pb-5 xl:pb-8 2xl:pb-10
     lg:space-y-[30px] xl:space-y-[60px] 2xl:space-y-[65px]
    "
    >
      <div
        className="
    px-4 md:px-[120px] lg:px-[50px] xl:px-[110px] 2xl:px-[140px]
    pt-9 md:pt-[48px] lg:pt-5 xl:pt-8 2xl:pt-10
     "
      >
        {/* content */}
        <div
          className="grid grid-cols-1 gap-3 lg:gap-0 lg:grid-cols-12
      lg:mt-[30px] xl:mt-[60px] 2xl:mt-[70px]
      relative z-20"
        >
          {/* grid 1 */}
          <div
            className="col-span-1 lg:col-span-3
        space-y-[12px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]
        relative
        flex flex-col items-center lg:items-start
        "
          >
            {/* logo */}
            {typeof footer?.logo === 'object' && footer?.logo?.url && (
              <Link
                href={`/`}
                className="relative z-20
            hover:scale-110 transition-all duration-300 ease-in
            w-[150px] xl:w-[240px] 2xl:w-[260px]
            aspect-[701/179]"
              >
                <Image
                  src={footer?.logo?.url}
                  alt="Brand Logo"
                  fill
                  quality={90}
                  placeholder="blur"
                  sizes="100vw"
                  blurDataURL={footer?.logoBlurDataURL || ''}
                />
              </Link>
            )}
            {/* brand text */}
            <div className="font-manrope text-white-3 global-p4 z-20 w-[80%] text-center lg:text-start">
              {footer?.branding?.introText}
            </div>
            {/* ISO image */}
            {typeof footer?.isoBadgeImage === 'object' && footer?.isoBadgeImage?.url && (
              <div
                className="relative z-20
            w-[85px] xl:w-[135px] 2xl:w-[160px]
            aspect-[544/204]"
              >
                <Image
                  src={footer?.isoBadgeImage?.url}
                  alt="ISO Badge Image"
                  fill
                  quality={90}
                  placeholder="blur"
                  sizes="100vw"
                  blurDataURL={footer?.isoBadgeImageBlurDataURL || ''}
                />
              </div>
            )}

            <Image
              src={FooterBlur01}
              alt="Footer blur 01"
              width={FooterBlur01?.width}
              height={FooterBlur01?.height}
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={FooterBlur01?.blurDataURL}
              className="absolute -z-10
              lg:scale-125 xl:scale-150
              w-[80%] md:w-[60%] lg:w-full h-fit
              lg:-left-[4%]
              -bottom-[120%] md:-bottom-[150%] lg:-bottom-[70%] opacity-80"
            />
          </div>

          {/* grid 2 */}
          <div
            className="col-span-1 lg:col-span-3
        space-y-[8px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]
        flex flex-col items-center lg:items-start
        lg:pl-9 xl:pl-10 2xl:pl-12"
          >
            <div className="text-white-3 font-proxima font-bold global-h5">
              {footer?.quickLinksSection?.header}
            </div>
            <div
              className="flex flex-col
          space-y-1 xl:space-y-1.5 2xl:space-y-2.5"
            >
              {footer?.quickLinksSection?.links?.map((item, index) => (
                <Link
                  key={index}
                  href={pageHref(item?.buttonLink)}
                  className="w-fit mx-auto lg:mx-0
    relative inline-block
    text-white-2 global-p4 font-manrope text-center lg:text-start
    hover:text-cyan transition-all duration-300 ease-in

    after:content-['']
    after:absolute after:left-0 after:-bottom-[2px]
    after:h-[2px] after:w-full
    after:origin-left after:scale-x-0
    after:bg-cyan
    after:transition-transform after:duration-300 after:ease-in

    hover:after:scale-x-100
  "
                >
                  {item?.buttonText}
                </Link>
              ))}
            </div>
          </div>

          {/* grid 3 */}
          <div
            className="col-span-1 lg:col-span-3
            hidden lg:flex lg:flex-col items-center lg:items-start
        space-y-[8px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]"
          >
            <div className="text-white-3 font-proxima font-bold global-h5">
              {footer?.productsSection?.header}
            </div>
            <div
              className="flex flex-col
          space-y-1 xl:space-y-1.5 2xl:space-y-2.5"
            >
              {footer?.productsSection?.products?.map((item, index) => (
                <div
                  className="flex items-center justify-center lg:justify-start space-x-1"
                  key={index}
                >
                  <Link
                    key={index}
                    href={pageHref(item?.buttonLink)}
                    className="w-fit
    relative inline-block
    text-white-2 global-p4 font-manrope text-center lg:text-start
    hover:text-cyan transition-all duration-300 ease-in

    after:content-['']
    after:absolute after:left-0 after:-bottom-[2px]
    after:h-[2px] after:w-full
    after:origin-left after:scale-x-0
    after:bg-cyan
    after:transition-transform after:duration-300 after:ease-in

    hover:after:scale-x-100
  "
                  >
                    {item?.buttonText}
                  </Link>
                  {item?.showNewBadge && (
                    <div
                      className="text-white-1 font-proxima font-extrabold bg-cyan w-fit
                text-[9px] xl:text-[10px] 2xl:text-[12px] tracking-wide  uppercase
                px-[3px] xl:px-[6px] 2xl:px-[5px]
                py-[2px] xl:py-[5px] 2xl:py-[2px]
                "
                    >
                      new
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* grid 4 */}
          <div
            className="col-span-1 lg:col-span-3
        space-y-[8px] lg:space-y-[15px] xl:space-y-[20px] 2xl:space-y-[25px]
        flex flex-col items-center lg:items-start
        relative "
          >
            <div className="text-white-3 font-proxima font-bold global-h5">
              {footer?.factorySection?.header}
            </div>
            <div
              className="flex flex-col items-center lg:items-start
          space-y-1.5 lg:space-y-2 xl:space-y-3 2xl:space-y-4"
            >
              {/* address */}
              <div
                className="flex items-start
              space-x-1 xl:space-x-2 w-[80%] lg:w-full text-center lg:text-start"
              >
                {/* icon */}
                <div
                  className="lg:mt-[3px]
                w-[15px] 2xl:w-[20px]
              aspect-square
              "
                >
                  <Image
                    src={Address}
                    alt="Address icon"
                    width={Address?.width}
                    height={Address?.height}
                    placeholder="blur"
                    blurDataURL={Address?.blurDataURL}
                    quality={100}
                    sizes="100vw"
                    className="w-full h-full"
                  />
                </div>
                {/* address */}
                <Link
                  target="_blank"
                  // href="https://www.google.com/maps?ll=23.770282,90.40626&z=16&t=m&hl=en-GB&gl=US&mapclient=embed&cid=8200627424099091507"
                  href={footer?.factorySection?.mapUrl || ''}
                >
                  <div className="text-white-2 font-manrope global-p4">
                    <LocalizedRichText
                      en={footer?.factorySection?.facAddress}
                      bn={footer?.factorySection?.facAddress}
                    />
                  </div>
                </Link>
              </div>
              {/* phone */}
              <div
                className="flex items-start
              space-x-1 xl:space-x-2"
              >
                {/* icon */}
                <div
                  className="lg:mt-[2px]
                w-[15px] 2xl:w-[20px]
              aspect-square
              "
                >
                  <Image
                    src={Phone}
                    alt="Phone icon"
                    width={Phone?.width}
                    height={Phone?.height}
                    placeholder="blur"
                    blurDataURL={Phone?.blurDataURL}
                    quality={100}
                    sizes="100vw"
                    className="w-full h-full"
                  />
                </div>
                {/* Phone */}
                <div className="text-white-2 font-manrope global-p4">
                  <a href={`tel:${footer?.factorySection?.phone}`}>
                    {footer?.factorySection?.phone}
                  </a>
                </div>
              </div>
              {/* mail */}
              <div
                className="flex items-start
              space-x-1 xl:space-x-2"
              >
                {/* icon */}
                <div
                  className="lg:mt-[2px]
                w-[15px] 2xl:w-[20px]
              aspect-square
              "
                >
                  <Image
                    src={Mail}
                    alt="Mail icon"
                    width={Mail?.width}
                    height={Mail?.height}
                    placeholder="blur"
                    blurDataURL={Mail?.blurDataURL}
                    quality={100}
                    sizes="100vw"
                    className="w-full h-full"
                  />
                </div>
                {/* Mail */}
                <div className="text-white-2 font-manrope global-p4">
                  <a href={`mailto:${footer?.factorySection?.email}`}>
                    {footer?.factorySection?.email}
                  </a>
                </div>
              </div>

              <Image
                src={FooterBlur02}
                alt="Footer blur 02"
                width={FooterBlur02?.width}
                height={FooterBlur02?.height}
                quality={90}
                sizes="100vw"
                placeholder="blur"
                blurDataURL={FooterBlur02?.blurDataURL}
                className="absolute -z-10
                w-[50%] h-[90%] md:h-[96%] lg:w-full lg:h-fit
                 left-[100px] md:left-[250px] lg:-left-[30%]
                top-[170px] lg:-top-[100px] xl:-top-[140px]
                xl:scale-110 2xl:scale-125
                opacity-80
                "
              />
            </div>
          </div>
        </div>

        {/* brand text */}
        <div
          className="flex justify-center lg:hidden font-manrope text-white-3 global-p4 z-20 text-center lg:text-start
        mt-[12px] mb-[8px] lg:m-0 "
        >
          {footer?.social?.header}
        </div>
        {/* social */}
        <div
          className="flex justify-center lg:hidden mb-[12px] lg:mb-0
          space-x-1 lg:space-x-2 xl:space-x-2.5 2xl:space-x-3"
        >
          {/* facebook */}
          <Link
            href={footer?.social?.facebookUrl || ''}
            target="_blank"
            className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px]
          h-[30px] xl:h-[35px] 2xl:h-[40px]
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
          >
            <Image
              src={Facebook}
              alt="Facebook icon"
              width={Facebook?.width}
              height={Facebook?.height}
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={Facebook?.blurDataURL}
              className="aspect-auto
                w-[10px] xl:w-[13px]
                group-hover:w-[13px]  xl:group-hover:w-[16px]
              transition-all duration-300 ease-in"
            />
          </Link>
          {/* whats app */}
          <Link
            href={footer?.social?.whatsApp || ''}
            target="_blank"
            className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px]
          h-[30px] xl:h-[35px] 2xl:h-[40px]
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
          >
            <Image
              src={WhatsApp}
              alt="WhatsApp icon"
              width={WhatsApp?.width}
              height={WhatsApp?.height}
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={WhatsApp?.blurDataURL}
              className="aspect-auto
                w-[18px] xl:w-[23px]
                group-hover:w-[20px] xl:group-hover:w-[26px]
              transition-all duration-300 ease-in"
            />
          </Link>
          {/* At the rate app */}
          <Link
            href={`mailto:${footer?.factorySection?.email}` || ''}
            className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px]
          h-[30px] xl:h-[35px] 2xl:h-[40px]
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
          >
            <Image
              src={At}
              alt="At icon"
              width={At?.width}
              height={At?.height}
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={At?.blurDataURL}
              className="aspect-auto
                w-[18px] xl:w-[23px]
                group-hover:w-[20px] xl:group-hover:w-[26px]
              transition-all duration-300 ease-in"
            />
          </Link>
          {/* Linkdin */}
          <Link
            href={footer?.social?.linkedinUrl || ''}
            target="_blank"
            className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px]
          h-[30px] xl:h-[35px] 2xl:h-[40px]
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
          >
            <Image
              src={Linkdin}
              alt="Linkdin icon"
              width={Linkdin?.width}
              height={Linkdin?.height}
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={Linkdin?.blurDataURL}
              className="aspect-auto
                w-[18px] xl:w-[22px]
                group-hover:w-[20px] xl:group-hover:w-[25px]
              transition-all duration-300 ease-in"
            />
          </Link>
        </div>
      </div>

      {/* marqury */}
      <Marquee autoFill className="relative z-20 my-[12px] lg:my-0">
        <div
          className="flex items-center overflow-hidden
          space-x-4 lg:space-x-6 xl:space-x-7 2xl:space-x-8
          ml-4 lg:ml-6 xl:ml-7 2xl:ml-8"
        >
          {/* text */}
          <div
            className="text-[var(--Dark-Dark-1,#070725)] [-webkit-text-stroke-width:1.52px] [-webkit-text-stroke-color:var(--White-White-2,#E7E7EE)]
      font-manrope not-italic font-bold uppercase leading-[125%] tracking-[5.4px]  opacity-20
       text-[25px] lg:text-[35px] xl:text-[60px] 2xl:text-[70px]"
          >
            <div>{footer?.marqueeSection?.text}</div>
          </div>
          <div
            className="text-[var(--White-White-2,#E7E7EE)] [-webkit-text-stroke-width:1.52px] [-webkit-text-stroke-color:var(--White-White-2,#E7E7EE)]
        font-[Manrope] not-italic font-bold leading-[125%] tracking-[5.4px] uppercase opacity-20
        text-[25px] lg:text-[35px] xl:text-[60px] 2xl:text-[70px]"
          >
            {footer?.marqueeSection?.year}
          </div>
          {/* icon */}
          <Image
            src={Arrow}
            alt="Arrow"
            width={Arrow?.width}
            height={Arrow?.height}
            quality={90}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={Arrow?.blurDataURL}
            className="w-[20px] lg:w-[25px] xl:w-[42px] 2xl:w-[48px] aspect-[1/1]"
          />
        </div>
      </Marquee>
      {/* copuright and social links */}
      <div
        className=" px-4 md:px-[120px] lg:px-[50px] xl:px-[110px] 2xl:px-[140px]
       flex justify-between items-center relative z-20"
      >
        {/* copyright */}
        <div className="text-white-3 global-p4 tracking-wider font-manrope z-20 ">
          {footer?.copyrightSection?.copyright}
        </div>
        {/* social */}
        <div
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2
          space-x-1 lg:space-x-2 xl:space-x-2.5 2xl:space-x-3"
        >
          {/* facebook */}
          <Link
            href={footer?.social?.facebookUrl || ''}
            target="_blank"
            className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px]
          h-[30px] xl:h-[35px] 2xl:h-[40px]
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
          >
            <Image
              src={Facebook}
              alt="Facebook icon"
              width={Facebook?.width}
              height={Facebook?.height}
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={Facebook?.blurDataURL}
              className="aspect-auto
                w-[10px] xl:w-[13px]
                group-hover:w-[13px]  xl:group-hover:w-[16px]
              transition-all duration-300 ease-in"
            />
          </Link>
          {/* whats app */}
          <Link
            href={footer?.social?.whatsApp || ''}
            target="_blank"
            className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px]
          h-[30px] xl:h-[35px] 2xl:h-[40px]
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
          >
            <Image
              src={WhatsApp}
              alt="WhatsApp icon"
              width={WhatsApp?.width}
              height={WhatsApp?.height}
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={WhatsApp?.blurDataURL}
              className="aspect-auto
                w-[18px] xl:w-[23px]
                group-hover:w-[20px] xl:group-hover:w-[26px]
              transition-all duration-300 ease-in"
            />
          </Link>
          {/* At the rate app */}
          <Link
            href={`mailto:${footer?.factorySection?.email}` || ''}
            className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px]
          h-[30px] xl:h-[35px] 2xl:h-[40px]
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
          >
            <Image
              src={At}
              alt="At icon"
              width={At?.width}
              height={At?.height}
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={At?.blurDataURL}
              className="aspect-auto
                w-[18px] xl:w-[23px]
                group-hover:w-[20px] xl:group-hover:w-[26px]
              transition-all duration-300 ease-in"
            />
          </Link>
          {/* Linkdin */}
          <Link
            href={footer?.social?.linkedinUrl || ''}
            target="_blank"
            className="flex items-center justify-center group
          w-[30px] xl:w-[35px] 2xl:w-[40px]
          h-[30px] xl:h-[35px] 2xl:h-[40px]
          bg-[#33CCCC33] hover:bg-cyan transition-all duration-300 ease-in
          "
          >
            <Image
              src={Linkdin}
              alt="Linkdin icon"
              width={Linkdin?.width}
              height={Linkdin?.height}
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={Linkdin?.blurDataURL}
              className="aspect-auto
                w-[18px] xl:w-[22px]
                group-hover:w-[20px] xl:group-hover:w-[25px]
              transition-all duration-300 ease-in"
            />
          </Link>
        </div>
        {/* legal */}
        <div className="text-white-3 global-p4 tracking-wider font-manrope">
          <LocalizedRichText
            en={footer?.legalSection?.legalValue}
            bn={footer?.legalSection?.legalValue}
          />
        </div>
      </div>

      {/* pattern 1 */}
      {footer?.showPatternDesign && (
        <div
          className="invisible md:visible absolute left-0 bottom-0 z-10 opacity-30 h-[50%]
                 md:w-[120px]
                 lg:w-[170px]
                 xl:w-[225px]
                 2xl:w-[280px]
              "
        >
          <Image
            fill
            src={Pattern01}
            alt="pattern image 02"
            quality={90}
            sizes="100vw"
            className="object-cover -rotate-180"
            placeholder="blur"
            blurDataURL={Pattern01?.blurDataURL}
          />
        </div>
      )}
      {/* pattern 2 */}
      {footer?.showPatternDesign && (
        <div
          className="invisible md:visible absolute right-0 top-0 z-10 opacity-30 h-[50%]
                 md:w-[120px]
                 lg:w-[170px]
                 xl:w-[225px]
                 2xl:w-[280px]
              "
        >
          <Image
            fill
            src={Pattern02}
            alt="pattern image 02"
            quality={90}
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={Pattern02?.blurDataURL}
          />
        </div>
      )}
    </div>
  )
}

export default ServerFooter
