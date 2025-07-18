'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  bgColor?: string
  paddingOn?: boolean
  text: string
}

function SearchNews({ bgColor, paddingOn = false, text }: Props) {
  return (
    <div
      className={`${paddingOn && ' px-5 pt-12 md:px-24 md:pt-24 lg:px-[130px]  lg:pt-[110px] xl:px-[200px]  xl:pt-[100px] 2xl:px-[300px] 2xl:pt-[150px] '}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0 ">
        <h1 className="global-h1 font-semibold uppercase">{text}</h1>
        <div className="bg-[#FAF2EA] p-2 rounded-lg">
          <div
            className="flex items-center bg-white max-w-full
          rounded-xl 
          md:px-1.5 lg:px-2.5 xl:px-3 2xl:px-3.5 
          md:py-0.5 lg:py-1 xl:py-2  2xl:py-2.5 
          md:w-[250px] lg:w-[300px] xl:w-[400px] 2xl:w-[470px] "
          >
            <Input
              type="text"
              placeholder="Search.."
              className="placeholder:text-[#ABABAB] shadow-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sm text-lg"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="text-black hover:bg-transparent 
              "
            >
              <div className="w-[18px] md:w-5 lg:w-6 xl:w-7">
                <img src="/assets/searchbar2.png" alt="" className="w-full h-full" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchNews
