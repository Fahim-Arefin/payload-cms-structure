// import { FootPrintDataType } from '@/types'

// type Props = {
//   data: FootPrintDataType
//   isActive?: boolean
// }

// function FootPrintCard({ data, isActive = false }: Props) {
//   return (
//     <div
//       className={`
//         mx-auto relative p-6 overflow-hidden rounded-xl text-white
//         transition-all duration-500 ease-in-out
//         ${isActive ? 'h-[250px] md:h-[320px] lg:h-[420px] xl:h-[500px] 2xl:h-[600px]' : 'h-[180px] md:h-[220px] lg:h-[250px] xl:h-[300px] 2xl:h-[375px]'}
//       `}
//     >
//       {/* Background image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat "
//         style={{
//           backgroundImage: `url('${data.image}')`,
//         }}
//       />

//       {/* Overlay gradient */}
//       <div className="absolute inset-0 bg-black/50 cursor-pointer" />

//       {/* Foreground content */}
//       <div className="cursor-pointer relative z-10 text-white space-y-2 text-justify flex flex-col justify-between h-full">
//         <p className="text-xs xl:text-sm font-light leading-snug line-clamp-5">
//           {data?.description}
//         </p>
//         <h1 className="text-lg font-bold">{data?.title}</h1>
//       </div>
//     </div>
//   )
// }

// export default FootPrintCard

// // v1
// import { FootPrintDataType } from '@/types'
// import Link from 'next/link'

// type Props = {
//   data: FootPrintDataType
//   isActive?: boolean
// }

// function FootPrintCard({ data, isActive = false }: Props) {
//   return (
//     <Link target="_blank" href={data?.link}>
//       <div
//         className={`
//         mx-auto relative p-6 overflow-hidden rounded-2xl text-white
//         transition-all duration-500 ease-in-out
//         h-[180px] md:h-[220px] lg:h-[250px] xl:h-[300px] 2xl:h-[375px]
//       `}
//       >
//         {/* Background image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat "
//           style={{
//             backgroundImage: `url('${data.image}')`,
//           }}
//         />

//         {/* Overlay gradient */}
//         <div className="absolute inset-0 bg-black/60 cursor-pointer" />

//         {/* Foreground content */}
//         <div className="cursor-pointer relative z-10 text-white space-y-2 flex flex-col justify-between h-full">
//           <p className="global-p2 font-light leading-snug line-clamp-5 text-justify">
//             {data?.description}
//           </p>
//           <h1 className="global-h4 tracking-wide">{data?.title}</h1>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default FootPrintCard

// v1 modifing
import { ShantaFootprintBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  data: ShantaFootprintBlockType['cards'][number]
  isActive?: boolean
}
// w-[180px] md:w-[220px] lg:w-[250px] xl:w-[270px] 2xl:w-[320px]
function FootPrintCard({ data, isActive = false }: Props) {
  return (
    <Link target="_blank" href={data?.link}>
      <div
        //   className={`
        //   mx-auto relative p-4 md:p-6 overflow-hidden text-white
        //   transition-all duration-500 ease-in-out
        //   rounded-md lg:rounded-xl
        //   w-[85%] md:w-[85%] lg:w-[85%] xl:w-[83%] 2xl:w-[80%]
        //   h-[180px] md:h-[220px] lg:h-[280px] xl:h-[280px] 2xl:h-[350px]
        //   hover:w-full
        //   hover:h-[200px]
        //   hover:md:h-[300px]
        //   hover:lg:h-[350px]
        //   hover:xl:h-[400px]
        //   hover:2xl:h-[480px]

        // `}
        // h-[180px] md:h-[220px] lg:h-[280px] xl:h-[280px] 2xl:h-[350px]
        //  hover:h-[200px]
        // hover:md:h-[300px]
        // hover:lg:h-[350px]
        // hover:xl:h-[400px]
        // hover:2xl:h-[480px]
        className={`
        mx-auto relative p-4 md:p-6 overflow-hidden text-white
        transition-all duration-500 ease-in-out
        rounded-md lg:rounded-xl
        w-[85%] md:w-[85%] lg:w-[85%] xl:w-[83%] 2xl:w-[80%]
        aspect-[1/1]
        hover:w-full 
      `}
      >
        {/* Background image */}
        {/* web */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage: `url('${data.image}')`,
          }}
        /> */}
        {typeof data?.image === 'object' && data?.image?.url && (
          <Image
            src={data.image?.url}
            alt={data.title}
            fill
            className="object-cover object-center  "
            sizes="(max-width: 767px) 50vw, (max-width: 1349px) 33vw, 400px"
          />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black/60 cursor-pointer" />

        {/* Foreground content */}
        <div className="cursor-pointer relative z-10 text-white space-y-2 flex flex-col justify-between h-full">
          <p className="global-p2 line-clamp-5 lg:line-clamp-7 text-justify">
            <LocalizedText en={data?.description} bn={data?.descriptionBN} />
          </p>
          <h1 className="text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] tracking-wide">
            <LocalizedHighlighted
              textEn={data?.title}
              textBn={data?.titleBN}
              highlightEn={data?.highlightedText}
              highlightBn={data?.highlightedTextBN}
            />
          </h1>
        </div>
      </div>
    </Link>
  )
}

export default FootPrintCard
