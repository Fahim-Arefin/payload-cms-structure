'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import GlobalButton from '../shared/GlobalButton'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import LocalizedText from '../shared/LocalizedText'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { SupportFaqTabBlockType } from '@/types/payloadCustomTypes'

// Each form row from schema
type FormRow = {
  title: string
  titleBN?: string | null
}

type Props = {
  forms: SupportFaqTabBlockType['forms']
  buttonTextEn: string
  buttonTextBn?: string | null
  containerBg?: string
  headerBg?: string
}

function FormsTable({
  forms,
  buttonTextEn,
  buttonTextBn,
  containerBg = '#F6EDDD',
  headerBg = '#a08d2c',
}: Props) {
  const lang = useSSRLanguage()
  const btnText = lang === 'bn' ? buttonTextBn || buttonTextEn : buttonTextEn

  return (
    <div
      className="px-5 py-12 
           md:px-24 md:py-[40px] 
           lg:px-[130px]  lg:py-[50px] 
           xl:px-[200px]  xl:py-[70px] 
           2xl:px-[300px] 2xl:py-[100px] 
            overflow-x-auto rounded-md"
      style={{ backgroundColor: containerBg }}
    >
      <Table className="overflow-x-auto min-w-[500px] text-[12px] md:text-[16px] font-medium">
        <TableHeader style={{ backgroundColor: headerBg, color: '#ffffff' }}>
          <TableRow className="text-center hover:bg-transparent">
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
          {(forms || []).map((form, idx) => {
            // build href like BrochureButtonBlock
            const href =
              (form.formPDF &&
                typeof form.formPDF === 'object' &&
                'url' in form.formPDF &&
                form.formPDF.url) ||
              (typeof form.formPDF === 'string' ? `/media/${form.formPDF}` : '#')

            const hasPdf = href && href !== '#'
            return (
              <TableRow key={`form-${idx}`} className="text-center border border-[#42424242]">
                <TableCell className="p-4 text-center border border-[#42424242]">
                  {idx + 1}
                </TableCell>
                <TableCell className="p-4 text-center border border-[#42424242]">
                  <LocalizedText en={form.title} bn={form.titleBN || undefined} />
                </TableCell>
                <TableCell className="p-4 text-center border border-[#42424242]">
                  {hasPdf ? (
                    <Link href={href} target="_blank" prefetch={false}>
                      <GlobalButton
                        variant="outline"
                        size="small"
                        className="hover:bg-[#a08d2c] hover:text-white"
                        style={{ borderColor: headerBg }}
                      >
                        <FileText className="h-4 w-4" />
                        {btnText}
                      </GlobalButton>
                    </Link>
                  ) : (
                    <GlobalButton
                      variant="outline"
                      size="small"
                      className="opacity-60 cursor-not-allowed"
                      style={{ borderColor: headerBg }}
                      disabled
                    >
                      <FileText className="h-4 w-4" />
                      {btnText}
                    </GlobalButton>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default FormsTable
