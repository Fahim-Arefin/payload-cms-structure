'use client'

export function IndividualClaim() {
  const data = [
    {
      descriptionContent: `
      <b>Step 1:</b></br> Complete the Health Insurance Claim Form duly signed off by the Policy Owner.
        `,
    },
    {
      descriptionContent: `
      <b>Step 2:</b></br> Attach all treatment documents along with the claim form. You may also find the list of required documents at the end of the form.
        `,
    },
    {
      descriptionContent: `
      <b>Step 3:</b></br> Send the documents via email to info@shantalife.com or via your representative to our head office.

        `,
    },
  ]
  return (
    <div>
      <div className={``}>
        <div
          className={`
          flex flex-col mt-12
        space-y-4 lg:space-y-4 xl:space-y-7`}
        >
          {data?.map((eachItem, i) => (
            <div
              key={i}
              className=" flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
              space-x-2 lg:space-x-1 xl:space-x-3 2xl:space-x-4
              p-1.5 md:px-3 md:py-1.5 lg:px-3 lg:py-2 xl:p-3 2xl:p-4 
              rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
            >
              <div className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#434343]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: eachItem?.descriptionContent,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h4 className="mt-[30px] lg:mt-[50px] xl:mt-[80px] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        For any further queries please contact 09610889900
      </h4>
    </div>
  )
}
