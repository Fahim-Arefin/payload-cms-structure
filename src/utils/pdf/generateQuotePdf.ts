// src/utils/pdf/generateQuotePdf.ts
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import fs from 'node:fs/promises'
import path from 'node:path'

function safeLatin(text: any) {
  // Removes Bangla/unicode chars that WinAnsi can't encode (like ৳, বাংলা letters)
  return String(text ?? '').replace(/[^\x20-\x7E]/g, '')
}

export type IllustrationData = {
  // page1-3 fields...
  customerName: string
  benefits: Array<{ type: string; description: string; amount: string }>
  riders: Array<{ name: string; description: string; coverageAmount: string; premium: string }>
  projectedValues: Array<{
    year: number
    annualPremium: string
    deathBenefit: string
    surrenderValue: string
    maturityValue: string
    paidUpValue: string
  }>
}

// very small helper
function clip(text: any, max = 30) {
  const s = String(text ?? '')
  return s.length > max ? s.slice(0, max - 1) + '…' : s
}

export async function generateQuotePdf(data: IllustrationData) {
  const pdfDoc = await PDFDocument.create()

  // ✅ allow custom TTF fonts
  pdfDoc.registerFontkit(fontkit)

  // ✅ embed your custom font (recommended)
  const fontPath = path.join(process.cwd(), 'public', 'pdfFont', 'Avenir Regular.ttf')
  let font
  try {
    const fontBytes = await fs.readFile(fontPath)
    font = await pdfDoc.embedFont(fontBytes, { subset: true })
  } catch {
    // fallback if font file missing
    font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  }

  //   const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // load 6 background images from /public/pdf-templates
  const baseDir = path.join(process.cwd(), 'public', 'pdf-templates')
  const bgPaths = [
    'page-1.png',
    'page-2.png',
    'page-3.png',
    'page-4.png',
    'page-5.png',
    'page-6.png',
  ].map((p) => path.join(baseDir, p))

  const bgs = await Promise.all(bgPaths.map((p) => fs.readFile(p)))

  for (let i = 0; i < 6; i++) {
    // embed png as background
    const img = await pdfDoc.embedPng(bgs[i])
    const { width, height } = img.scale(1)

    const page = pdfDoc.addPage([width, height])
    page.drawImage(img, { x: 0, y: 0, width, height })

    // Example: put dynamic text (you will map all your fields)
    // const draw = (text: string, x: number, y: number, size = 10) => {
    //   page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) })
    // }
    const draw = (text: string, x: number, y: number, size = 10) => {
      page.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0.6117647059, 0.5254901961, 0.2235294118),
      })
    }

    // ===== Page 1 (index 0): customer name =====
    if (i === 0) {
      const text = safeLatin(data.customerName || '-')
      const size = 18

      const centerX = 300 // change this only if needed
      const y = 600 // change this only if needed

      const textWidth = font.widthOfTextAtSize(text, size)
      const x = centerX - textWidth / 2

      draw(text, x, y, size)
    }

    // ===== Page 4 (index 3): benefits + riders tables =====
    if (i === 3) {
      // BENEFITS (2 rows)
      const benefitRowY = [430, 405]
      const benefitX = { type: 85, desc: 220, amount: 450 }

      data.benefits.slice(0, 2).forEach((b, idx) => {
        draw(clip(b.type, 16), benefitX.type, benefitRowY[idx], 9)
        draw(clip(b.description, 45), benefitX.desc, benefitRowY[idx], 9)
        draw(clip(b.amount, 18), benefitX.amount, benefitRowY[idx], 9)
      })

      // RIDERS (visible rows depend on your template)
      const riderStartY = 305
      const riderRowH = 22
      const riderMaxRows = 1 // change to 2/3 if your template has more
      const riderX = { name: 70, desc: 160, coverage: 355, premium: 495 }

      data.riders.slice(0, riderMaxRows).forEach((r, idx) => {
        const y = riderStartY - idx * riderRowH
        draw(clip(r.name, 16), riderX.name, y, 9)
        draw(clip(r.description, 28), riderX.desc, y, 9)
        draw(clip(r.coverageAmount, 14), riderX.coverage, y, 9)
        draw(clip(r.premium, 12), riderX.premium, y, 9)
      })
    }

    // ===== Page 5 (index 4): projected values table =====
    if (i === 4) {
      const colX = {
        year: 60,
        annualPremium: 145,
        deathBenefit: 245,
        surrenderValue: 345,
        maturityValue: 440,
        paidUpValue: 520,
      }
      const startY = 650
      const rowH = 28
      const maxRows = 12 // depends on how many table rows your template shows

      data.projectedValues.slice(0, maxRows).forEach((r, idx) => {
        const y = startY - idx * rowH
        draw(String(r.year), colX.year, y, 9)
        draw(clip(r.annualPremium, 12), colX.annualPremium, y, 9)
        draw(clip(r.deathBenefit, 12), colX.deathBenefit, y, 9)
        draw(clip(r.surrenderValue, 12), colX.surrenderValue, y, 9)
        draw(clip(r.maturityValue, 12), colX.maturityValue, y, 9)
        draw(clip(r.paidUpValue, 12), colX.paidUpValue, y, 9)
      })
    }
  }

  const bytes = await pdfDoc.save()
  return Buffer.from(bytes)
}
