'use client'

import IntroSection from '@/components/custom/sagar-ropes-shared/others/IntroSection'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { Button } from '@/components/ui/button'
import { TechnicalDatasheetCardBlockType } from '@/types/payloadCustomTypes'
import { DownloadIcon, Loader2 } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  block: TechnicalDatasheetCardBlockType
  params: Record<string, string>
}

function TechnicalDatashheetBlock({ block }: Props) {
  const [isDownloading, setIsDownloading] = useState(false)

  const file =
    typeof block?.datasheetFile === 'object' && block?.datasheetFile ? block.datasheetFile : null

  const fileUrl = file?.url || ''
  const fileName = file?.filename || `${block?.title || 'Datasheet'}`

  const handleDownload = async () => {
    if (!fileUrl || isDownloading) return

    try {
      setIsDownloading(true)

      const res = await fetch(fileUrl)
      if (!res.ok) throw new Error('Download failed')

      const blob = await res.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = blobUrl
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()

      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error(error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="container-padding">
        <IntroSection block={block} />

        <div
          className="mt-4 flex flex-col items-center justify-center gap-2 bg-white-1 p-4
          md:flex-row md:items-center md:justify-between md:gap-0
          md:px-12 md:py-6
          lg:mt-6 lg:px-20 lg:py-10
          xl:mt-8 xl:px-24 xl:py-12
          2xl:mt-10 2xl:px-28 2xl:py-14"
        >
          <div className="global-h4 font-proxima font-bold text-dark-1">{block?.title}</div>

          <div>
            {fileUrl ? (
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="rounded-none border border-dark-1 bg-dark-1 transition-all duration-300 ease-out hover:bg-white-2 hover:text-dark-1
                h-8 px-2 text-xs
                md:px-3
                xl:h-9 xl:px-4 xl:text-base"
              >
                {isDownloading ? (
                  <>
                    Downloading ...
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  <>
                    Download
                    <DownloadIcon />
                  </>
                )}
              </Button>
            ) : (
              <Button
                disabled
                className="rounded-none border border-dark-1 bg-dark-1 opacity-60
                h-8 px-2 text-xs
                md:px-3
                xl:h-9 xl:px-4 xl:text-base"
              >
                Download
                <DownloadIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    </WithHashScroller>
  )
}

export default TechnicalDatashheetBlock
