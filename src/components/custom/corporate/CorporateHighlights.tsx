import React, { FC } from 'react'

type Highlights = {
  mainDescription: string

}

type CorporateHighlightProps = {
  highlightsData: Highlights[]
}

const CorporateHighlight: FC<CorporateHighlightProps> = ({ highlightsData }: CorporateHighlightProps) => {
  return (
    

      <div className="relative z-10 container-padding bg-white">
        <img
          src="/assets/leftquote.png"
          alt="Opening Quote"
          className="hidden lg:block w-12 2xl:w-20 absolute right-20 2xl:right-48 2xl:top-28"
        />
        <img
          src="/assets/rightquote.png" 
          alt="Closing Quote"
          className="hidden lg:block w-12 2xl:w-20 absolute left-20 2xl:left-48 2xl:top-28"
        />
        <p className="global-h3 text-gray-800 text-center">{highlightsData[0]?.mainDescription}</p>
      </div>

    
  )
}

export default CorporateHighlight;
