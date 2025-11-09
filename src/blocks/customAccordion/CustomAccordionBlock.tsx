import React from 'react'
import { CustomAccordionBlockType } from '@/types/payloadCustomTypes'
import CustomAccordionSection from '@/components/custom/shared/customAccordion/CustomAccordionSection'

type Props = {
  block: CustomAccordionBlockType
    params: Record<string, string>
}

function CustomAccordionBlock({block, params}: Props) {
  return (
    <div>
      <CustomAccordionSection block={block}/>
    </div>
  )
}

export default CustomAccordionBlock