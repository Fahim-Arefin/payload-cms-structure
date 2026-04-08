import { pageHref, resolvePageSlug } from '@/lib/utils'
import { ContactInfoCardBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  data: NonNullable<ContactInfoCardBlockType['contactInfo']>[number]
  index: number
  className?: string
  height?: string
  padding?: string
}

function Card03({ data, index, className, height, padding }: Props) {
  // If GlobalButton supports children (you already do in the YT button), render label as child:
  const href =
    data?.sectionId && data?.buttonLink && data?.sectionId
      ? `/${resolvePageSlug(data?.buttonLink)}/#${data?.sectionId}`
      : pageHref(data.buttonLink)

  const link = href !== '#' ? href : ''

  const cardContent = (
    <div
      className={`group flex flex-col justify-between items-center
      transition-all duration-300 ease-in
      ${padding}
      ${height}
      ${className}
      `}
    >
      {/* icons */}
      {typeof data?.icon === 'object' && data?.icon?.url && (
        <div
          className="rounded-full bg-bg-1 
                      w-[30px] md:w-[40px] lg:w-[60px] xl:w-[80px] 2xl:w-[90px]
                      h-[30px] md:h-[40px] lg:h-[60px] xl:h-[80px] 2xl:h-[90px]
                      flex items-center justify-center
        "
        >
          <div
            className="relative  
          w-[35px]
          aspect-[1/1] group-hover:scale-90 transition-all delay-150 duration-300 ease-out"
          >
            <Image
              key={index}
              src={data?.icon?.url}
              alt="icon"
              fill
              sizes="100vw"
              className={`object-cover object-center w-full h-full`}
              placeholder={data?.iconBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={data?.iconBlurDataURL || undefined}
            />
          </div>
        </div>
      )}

      <div
        className="text-center 
      lg:space-x-1 xl:space-y-2"
      >
        {/* titles */}
        {data?.displayText && (
          <div className={`font-proxima global-h4 font-bold text-black`}>
            {data?.displayText && <div>{data?.displayText}</div>}
          </div>
        )}
        {data?.description && (
          <div className={`font-manrope global-p4 text-dark-3`}>
            <LocalizedRichText en={data?.description} bn={data?.description} />
          </div>
        )}
      </div>
    </div>
  )

  // return <Link className={`${link ? 'cursor-pointer' : 'cursor-default'}`} href={link}></Link>
  return link ? (
    <Link className="cursor-pointer" href={link}>
      {cardContent}
    </Link>
  ) : (
    <React.Fragment>{cardContent}</React.Fragment>
  )
}

export default Card03

// import { pageHref, resolvePageSlug } from '@/lib/utils'
// import { ContactInfoCardBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// type Props = {
//   data: NonNullable<ContactInfoCardBlockType['contactInfo']>[number]
//   index: number
//   className?: string
//   height?: string
//   padding?: string
// }

// function Card03({ data, index, className, height, padding }: Props) {
//   const actionType = data?.actionType
//   const actionValue = data?.actionValue?.trim() || ''

//   const internalHref =
//     data?.sectionId && data?.buttonLink
//       ? `/${resolvePageSlug(data?.buttonLink)}/#${data?.sectionId}`
//       : pageHref(data?.buttonLink)

//   const href =
//     actionType === 'phone'
//       ? actionValue
//         ? `tel:${actionValue.replace(/\s+/g, '')}`
//         : ''
//       : actionType === 'email'
//         ? actionValue
//           ? `mailto:${actionValue}`
//           : ''
//         : actionType === 'external'
//           ? actionValue
//           : actionType === 'internal'
//             ? internalHref !== '#'
//               ? internalHref
//               : ''
//             : ''

//   const isExternal = actionType === 'external'
//   const isClickable = !!href && actionType !== 'none'

//   const cardContent = (
//     <div
//       className={`z-10 flex flex-col justify-between items-center
//       transition-all duration-300 ease-in
//       ${padding}
//       ${height}
//       ${className}
//       `}
//     >
//       {typeof data?.icon === 'object' && data?.icon?.url && (
//         <div
//           className="border-[1.125px] border-[rgba(16,16,83,0.15)] bg-[linear-gradient(135deg,rgba(16,16,83,0.30)_0%,rgba(16,16,83,0)_50%,rgba(16,16,83,0.30)_100%)]
//                       w-[30px] md:w-[35px] lg:w-[40px] xl:w-[50px] 2xl:w-[65px]
//                       h-[30px] md:h-[35px] lg:h-[40px] xl:h-[50px] 2xl:h-[65px]
//                       flex items-center justify-center
//                       p-1 xl:p-1.5 2xl:p-2"
//         >
//           <div className="relative aspect-[1/1] w-full transition-all delay-150 duration-300 ease-out group-hover:scale-90">
//             <Image
//               key={index}
//               src={data?.icon?.url}
//               alt="icon"
//               fill
//               sizes="100vw"
//               className="h-full w-full object-cover object-center"
//               placeholder={data?.iconBlurDataURL ? 'blur' : 'empty'}
//               blurDataURL={data?.iconBlurDataURL || undefined}
//             />
//           </div>
//         </div>
//       )}

//       {data?.displayText && (
//         <div className="global-h4 font-proxima font-bold text-black">
//           <div>{data?.displayText}</div>
//         </div>
//       )}
//     </div>
//   )

//   if (!isClickable) {
//     return <>{cardContent}</>
//   }

//   if (isExternal || actionType === 'phone' || actionType === 'email') {
//     return (
//       <a
//         className="cursor-pointer"
//         href={href}
//         target={isExternal ? '_blank' : undefined}
//         rel={isExternal ? 'noreferrer' : undefined}
//       >
//         {cardContent}
//       </a>
//     )
//   }

//   return (
//     <Link className="cursor-pointer" href={href}>
//       {cardContent}
//     </Link>
//   )
// }

// export default Card03
