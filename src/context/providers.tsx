'use client'
import { LanguageProvider, type Language } from './LanguageContext'

export default function Providers({
  children,
  initialLang = 'en',
}: {
  children: React.ReactNode
  initialLang?: Language
}) {
  return <LanguageProvider initial={initialLang}>{children}</LanguageProvider>
}