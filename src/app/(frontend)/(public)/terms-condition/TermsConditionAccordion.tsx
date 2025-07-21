import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { termsCondition } from './termsConditionData'

export default function TermsConditionAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full mx-auto px-1 sm:px-6 space-y-2">
      {termsCondition.map((privacyItem, i) => (
        <AccordionItem
          key={i}
          value={`item-${i + 2}`}
          className="bg-white border border-gray-200 rounded-lg shadow-sm px-2 sm:px-4 py-0 sm:py-4"
        >
          <AccordionTrigger className="text-[16px] sm:text-[26px]">
            {privacyItem.title}
          </AccordionTrigger>
          <AccordionContent className="text-[12px] sm:text-[20px] px-[40px]">
            {privacyItem.type ? (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: privacyItem.content,
                  }}
                ></div>
              </>
            ) : (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: privacyItem.secondTitle ?? '',
                  }}
                ></div>
                <ul className="list-disc pl-6 space-y-1">
                  {privacyItem.points.map((point, i) => (
                    <li key={`point-${i}`}>{point}</li>
                  ))}
                </ul>
                <div
                  dangerouslySetInnerHTML={{
                    __html: privacyItem.footerText,
                  }}
                ></div>
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
