'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { FileDown, FileText } from 'lucide-react'
import GlobalButton from '../shared/GlobalButton'
import Link from 'next/link'

const forms = [
  {
    id: 1,
    title: 'Change or Correction in Policy Details',
    url: '/assets/pdf/Change-or-Correction-in-Policy-Details.pdf',
  },
  { id: 2, title: 'Death Claim Form', url: '/assets/pdf/Death-Claim-Form.pdf' },
  {
    id: 3,
    title: 'EFT Debit Authorization Form',
    url: '/assets/pdf/EFT-Debit-Authorization-Form.pdf',
  },
  { id: 4, title: 'Good health declaration', url: '/assets/pdf/Good-health-declaration.pdf' },
  {
    id: 5,
    title: 'Health Insurance Claim Form',
    url: '/assets/pdf/Health-Insurance-Claim-Form.pdf',
  },
  { id: 6, title: 'Loan Application Form', url: '/assets/pdf/Loan-Application-Form.pdf' },
  {
    id: 7,
    title: 'Personal Informaition Change or Correction',
    url: '/assets/pdf/Personal-Informaition-Change-or-Correction.pdf',
  },
  { id: 8, title: 'Refund Form', url: '/assets/pdf/Refund-Form.pdf' },
  { id: 9, title: 'Request for Certificate', url: '/assets/pdf/Request-for-Certificate.pdf' },
  { id: 10, title: 'RFP', url: '/assets/pdf/RFP.pdf' },
  { id: 11, title: 'Transfer Request', url: '/assets/pdf/Transfer-Request.pdf' },
  {
    id: 12,
    title: 'Health Statement for Group Insurance',
    url: '/assets/pdf/Health-Statement-for-Group-Insurance.pdf',
  },
  { id: 13, title: 'Critical Illness Claim', url: '/assets/pdf/Critical-Illness-Claim-Form.pdf' },
  { id: 14, title: 'PPD & PTD Claim Form', url: '/assets/pdf/PPD-and-PTD-Claim-Form.pdf' },
]

function FormsTable() {
  return (
    <div
      className="px-5 py-12 
           md:px-24 md:py-[40px] 
           lg:px-[130px]  lg:py-[50px] 
           xl:px-[200px]  xl:py-[70px] 
           2xl:px-[300px] 2xl:py-[100px] bg-[#F6EDDD]
            overflow-x-auto rounded-md"
    >
      <Table className=" overflow-x-auto min-w-[500px] text-[12px] md:text-[16px] font-medium">
        <TableHeader className="bg-[#a08d2c] text-white ">
          <TableRow className="text-center hover:bg-[#a08d2c] ">
            <TableHead className="p-4 text-white text-center w-[80px] border border-[#42424242]">
              ID
            </TableHead>
            <TableHead className="p-4 text-white text-center border border-[#42424242]">
              Title
            </TableHead>
            <TableHead className="p-4 text-white text-center w-[260px] border border-[#42424242]">
              Download
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow key={form.id} className="text-center border border-[#42424242]">
              <TableCell className="p-4 text-center border border-[#42424242]">{form.id}</TableCell>
              <TableCell className="p-4 text-center border border-[#42424242]">
                {form.title}
              </TableCell>
              <TableCell className="p-4 text-center border border-[#42424242]">
                <div>
                  <Link href={form?.url} target="_blank">
                    <GlobalButton
                      variant="outline"
                      size="small"
                      className="hover:bg-[#a08d2c] hover:text-white"
                    >
                      <FileText className="h-4 w-4" />
                      Download
                    </GlobalButton>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default FormsTable
