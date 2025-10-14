import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const delay = async (): Promise<void> => {
  console.log('Adding 10-second delay before fetching data...')
  await new Promise((resolve) => setTimeout(resolve, 10000))
  console.log('Delay complete, proceeding with data fetch...')
}

export const bnNum = (n: number) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])

type MaybePopulated = string | { slug?: string } | null | undefined

export function pageHref(target: MaybePopulated): string {
  if (!target || typeof target === 'string') return '#' // not populated; resolve on server
  const s = target.slug || ''
  if (!s) return '#'
  return s === 'index' ? '/' : `/${s.replace(/^\/+/, '')}`
}
