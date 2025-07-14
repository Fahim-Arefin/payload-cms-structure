import React from 'react'

type EligibilityCardProps = {
  title: string
  icon: string // icon path
  bgImage: string // background image path
  entryMin: string
  entryMinLabel: string
  entryMax: string
  entryMaxLabel: string
  policyTerm: string
  policyTermLabel: string
  maturityAge: string
  maturityAgeLabel: string
}

export const EligibilityCard: React.FC<EligibilityCardProps> = ({
  title,
  icon,
  bgImage,
  entryMin,
  entryMinLabel,
  entryMax,
  entryMaxLabel,
  policyTerm,
  policyTermLabel,
  maturityAge,
  maturityAgeLabel,
}) => {
  return (
    <div
      className="rounded-xl p-4 lg:p-12 w-full h-auto xl:h-[535px] xl:w-[347px] overflow-hidden shadow-lg bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.40), rgba(0,0,0,0.30)), url('${bgImage}')`,
      }}
    >
      <div className="flex flex-col gap-2 items-center">
        <img src={icon} alt={title} className="w-14 h-14" />
        <p className="uppercase text-white font-bold global-p1 mt-2">{title}</p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 mt-4">
        {/* Entry Age */}
        <div
          className="p-2 w-64 flex flex-col items-center shadow-md"
          style={{
            borderRadius: '6.667px 6.667px 0px 0px',
            background: 'rgba(156, 134, 57, 0.10)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="text-white global-p2 uppercase mb-1 font-light">Entry Age</div>
          <div className="flex justify-between w-full px-2 text-white">
            <div className="flex flex-col items-center">
              <p className="text-xs font-light text-[#FCF4EB]">Minimum</p>
              <p className="global-span font-bold">{entryMin}</p>
              <p className="text-base -mt-2 font-light">{entryMinLabel}</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-xs font-light">Maximum</p>
              <p className="global-span font-bold">{entryMax}</p>
              <p className="text-base -mt-2 font-light">{entryMaxLabel}</p>
            </div>
          </div>
        </div>
        {/* Policy Term */}
        <div
          className="p-4 w-64 flex flex-col items-center shadow-md"
          style={{
            borderRadius: '6.667px 6.667px 0px 0px',
            background: 'rgba(156, 134, 57, 0.10)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="text-white global-p2 uppercase mb-1 font-light">Policy Term</div>
          <div className="text-white font-bold global-span">
            {policyTerm} <span className="global-span font-light">{policyTermLabel}</span>
          </div>
        </div>
        {/* Maturity Age */}
        <div
          className="p-4 w-64 flex flex-col items-center shadow-md"
          style={{
            borderRadius: '6.667px 6.667px 0px 0px',
            background: 'rgba(156, 134, 57, 0.10)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="text-white global-p2 uppercase mb-1 font-light">Maturity Age</div>
          <div className="text-white font-bold global-span">
            {maturityAge} <span className="global-span font-light">{maturityAgeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
