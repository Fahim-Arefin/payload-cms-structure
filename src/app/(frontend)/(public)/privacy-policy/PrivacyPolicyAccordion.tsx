// components/PrivacyPolicyAccordion.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPolicyAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full mx-auto px-1 sm:px-6 space-y-2">
      <AccordionItem value="item-1" className="bg-white border border-gray-200 rounded-lg shadow-sm px-2 sm:px-4 py-0 sm:py-4">
        <AccordionTrigger className="text-[16px] sm:text-[26px]" >1. Our Commitment to Your Privacy</AccordionTrigger>
        <AccordionContent className="text-[12px] sm:text-[20px] px-[40px]">
          <p className="mb-2">This Privacy Policy outlines:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>What personal data we gather</li>
            <li>How and why we process your data</li>
            <li>Who we may share your data with</li>
            <li>Your rights concerning your data</li>
            <li>Data Retention Period</li>
            <li>How we use cookies and third-party tools</li>
            <li>How to contact us with questions or concerns</li>
            <li>Our Measures for Data Breach</li>
          </ul>
          <p className="mt-4 text-[12px] sm:text-[20px] text-gray-500">
            By accessing or using our services or website, you acknowledge that you have read and agreed to the terms of this Privacy Policy. If you disagree, please do not provide personal information via our platforms.
          </p>
        </AccordionContent>
      </AccordionItem>

      {[
        "2. How We Collect Your Information",
        "3. Purpose of Data Use",
        "4. Disclosure of Personal Data",
        "5. Your Rights",
        "6. Data Retention Period (Global Compliance)",
        "7. Data Breach Notification (PDPA & Global Compliance)",
        "8. Use of Personal Data for Marketing",
        "9. Cookies and Tracking Technologies",
      ].map((title, i) => (
        <AccordionItem key={i} value={`item-${i + 2}`} className="bg-white border border-gray-200 rounded-lg shadow-sm px-2 sm:px-4 py-0 sm:py-4">
          <AccordionTrigger className="text-[16px] sm:text-[26px]">{title}</AccordionTrigger>
          <AccordionContent className="text-[12px] sm:text-[20px] px-[40px]">
            {/* Placeholder text for other sections */}
            <p>Details about: {title}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
