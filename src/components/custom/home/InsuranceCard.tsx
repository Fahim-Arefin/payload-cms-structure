import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LifeInsuranceSimplifiedBlockType } from '@/types/payloadCustomTypes'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'

type InsuranceCardDataType = NonNullable<
  NonNullable<LifeInsuranceSimplifiedBlockType['sections']>[number]['insuranceCardData']
>[number]

type Props = {
  data: InsuranceCardDataType
}

const content = (data: InsuranceCardDataType) => (
  <div>
    <div
      // h-[120px] md:h-[200px] lg:h-[250px] xl:h-[300px] flex-shrink-0
      className={`relative
       aspect-[4/3] w-full
      rounded-[4.167px] 
      bg-[#343A40] overflow-hidden ${data?.videoLink && ' cursor-pointer '} 
    `}
    >
      {typeof data.image === 'object' && data.image?.url && (
        <Image
          src={data.image.url}
          alt={data?.title ?? 'Video thumbnail'}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1023px) 300px, (max-width: 1349px) 400px, 500px"
          placeholder="blur"
          blurDataURL={data?.imageBlurDataURL || ''}
          quality={90}
        />
      )}

      {/* Text Content */}
      {(data?.title || data?.description || data?.titleBN || data?.descriptionBN) && (
        <div
          className="relative z-20 h-full flex items-end 
          p-2
      md:px-4 xl:px-6 
      md:pb-10 xl:pb-16"
        >
          <div className="absolute inset-0 bg-[#343A40]/50 rounded-[4.167px] z-20"></div>
          <div className="h-fit md:space-y-2 lg:space-y-3 xl:space-y-4 z-30">
            <h4 className="text-white text-[12px] lg:text-[15px] font-bold line-clamp-1 md:line-clamp-none">
              <LocalizedText en={data?.title} bn={data?.titleBN} />
            </h4>
            <p className="text-[#E5E5E5] text-[10px] lg:text-[12px] line-clamp-2 md:line-clamp-none">
              <LocalizedText en={data?.description} bn={data?.descriptionBN} />
            </p>
          </div>
        </div>
      )}
      <div
        className="absolute bottom-0 right-0 z-20 
       w-[20px] lg:w-[30px] xl:w-[40px] 2xl:w-[50px]  
       h-[20px] lg:h-[30px] xl:h-[40px] 2xl:h-[50px]"
      >
        <img
          src={data?.videoLink ? '/assets/icons/play3.svg' : '/assets/icons/circle.svg'}
          alt=""
        />
      </div>
    </div>
    {/* {data.title && (
      <h4 className="text-[#434343] text-[10px] md:text-[12px] lg:text-[15px] font-bold text-center mt-1 md:mt-5">
        {data.title}
      </h4>
    )} */}
  </div>
)

function InsuranceCard({ data }: Props) {
  return data?.videoLink ? (
    <Dialog>
      <DialogTrigger asChild>{content(data)}</DialogTrigger>

      <DialogContent
        className="max-w-5xl w-full aspect-video p-0 bg-black 
      [&>button.absolute]:top-3 [&>button.absolute]:right-3 
      [&>button.absolute]:bg-black/50 
      [&>button.absolute]:text-white 
      [&>button.absolute]:hover:bg-black/80"
      >
        <VisuallyHidden>
          <DialogTitle>Insurance Video</DialogTitle>
        </VisuallyHidden>

        <iframe
          width="100%"
          height="100%"
          src={data?.videoLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </DialogContent>
    </Dialog>
  ) : (
    content(data)
  )
}

export default InsuranceCard
