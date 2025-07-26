import React, { FC } from 'react'

type CorporateOfferingsProps = {}

const insuranceCards = [
  {
    title: 'Life Insurance Products',
    items: [
      'Group Life Insurance (GL)',
      'Accidental Death Coverage (AD)',
      'Permanent and Total Disability (PTD)',
      'Permanent and Partial Disability (PPD)',
      'Critical Illness Coverage (CIB)',
    ],
  },
  {
    title: 'Group Medical Insurance',
    items: [
      'In-Patient Coverage (IPC)',
      'Maternity Benefits',
      'Out Patient Coverage (OPC)',
      'OPC Dental',
      'OPC Optical',
    ],
  },
]

const CorporateOfferings: FC<CorporateOfferingsProps> = ({}) => {
  return (
    <div className="container-padding">
      {/* Title */}
      <h1 className="global-h1 font-semibold uppercase mb-10">
        Our <span className="text-[#ED7125]">Offerings</span>
      </h1>

      <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
        {insuranceCards.map((card, idx) => (
          <div
            key={card.title}
            className="flex-1 bg-white rounded-xl px-2 py-6 flex flex-col gap-4"
          >
            <div className="text-[#ED7125] global-h4 font-bold mb-2">{card.title}:</div>
            <ul className="space-y-4">
              {card.items.map((item) => (
                <li
                  key={item}
                  className="text-[#434342] text-base font-medium text-left leading-6 pl-3 border-l-4 border-[#ED7125] bg-[#FFF8F2] rounded"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CorporateOfferings
