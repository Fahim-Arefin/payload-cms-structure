// import Image from 'next/image'
// import Link from 'next/link'

// export default function NotFound() {
//   return (
//     <main className="font-avenir flex justify-center items-center min-h-[100dvh] bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
//       <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
//         {/* Left: Copy */}
//         <div>
//           <p className="text-xs font-semibold tracking-widest text-neutral-500 dark:text-neutral-400">
//             404
//           </p>
//           <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
//           <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
//             The page you’re looking for doesn’t exist or has been moved.
//           </p>

//           <div className="mt-8">
//             <Link
//               href="/"
//               className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm
//                          hover:bg-neutral-800 active:translate-y-px dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300"
//               // className="inline-flex items-center gap-2 rounded-lg bg-[#ED7125] hover:bg-[#ED7125]/90 px-4 py-2 text-sm font-medium text-white shadow-sm
//               //            active:translate-y-px "
//             >
//               Go Home
//               <svg
//                 className="size-4"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M5 12h14" />
//                 <path d="m12 5 7 7-7 7" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* Right: Image card */}
//         <div className="mx-auto w-full max-w-md">
//           <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
//             <div className="flex items-center justify-center p-10">
//               <Image
//                 src="/assets/images/notFound.png"
//                 alt="Not Found"
//                 width={220}
//                 height={220}
//                 priority
//                 className="h-auto w-40 sm:w-52 select-none"
//               />
//             </div>
//             <div className="border-t border-neutral-200 px-6 py-4 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
//               Not Found
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }

import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="
        relative min-h-[100dvh] overflow-hidden
        bg-[#EEF7F4] py-[54px]
        font-grift text-secondary-1
        md:py-[70px]
        lg:py-[80px]
      "
    >
      {/* bottom primary ellipse */}
      <div
        className="
          pointer-events-none absolute bottom-[-210px] left-1/2 z-0
          h-[360px] w-[680px] -translate-x-1/2
          rounded-full bg-primary-1/50 blur-[95px]
          md:bottom-[-240px] md:h-[430px] md:w-[860px] md:blur-[115px]
          lg:bottom-[-280px] lg:h-[520px] lg:w-[1120px] lg:blur-[140px]
        "
      />

      <section
        className="
          container-padding relative z-10
          flex min-h-[calc(100dvh-108px)] w-full
          flex-col items-center justify-center text-center
          md:min-h-[calc(100dvh-140px)]
          lg:min-h-[calc(100dvh-160px)]
        "
      >
        {/* full width frame */}
        <div className="relative w-full md:w-[85%] lg:w-[75%] mx-auto overflow-visible">
          <div
            className="
              relative w-full overflow-hidden rounded-[10px]
              shadow-[0_24px_70px_rgba(7,17,35,0.12)]
              md:rounded-[12px]
              lg:rounded-[14px]
            "
          >
            <div className="relative aspect-[1437/577] w-full">
              {/* frame */}
              <Image
                src="/assets/images/notFoundFrame.png"
                alt=""
                fill
                priority
                quality={100}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* robot / 404 image full inside frame */}
              <Image
                src="/assets/images/notFound2.png"
                alt="404 page not found"
                fill
                priority
                quality={100}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        <h1
          className="
            mt-[34px]
            font-agency text-[42px] leading-[1]
            text-secondary-1
            md:mt-[42px] md:text-[62px]
            lg:text-[74px]
            xl:text-[84px]
          "
        >
          Page not found
        </h1>

        <p
          className="
            mt-[14px]
            max-w-[720px]
            font-grift text-[12px] font-bold
            uppercase leading-[1.65] tracking-[0.08em]
            text-secondary-1
            md:mt-[18px] md:text-[14px]
            lg:text-[15px]
          "
        >
          The Page You’re Looking For Doesn’t Exist Or Has Been Moved.
        </p>

        <div
          className="
            mt-[28px] flex flex-wrap items-center justify-center
            gap-[12px]
            md:mt-[34px] md:gap-[18px]
          "
        >
          <Link href="/" className="inline-flex">
            <Button01>Back To Home</Button01>
          </Link>

          <Link href="/our-solutions" className="inline-flex">
            <Button01>Explore Solution</Button01>
          </Link>
        </div>
      </section>
    </main>
  )
}
