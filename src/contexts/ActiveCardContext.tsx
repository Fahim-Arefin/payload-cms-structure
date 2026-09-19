'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useBrowserLocation } from '@/hooks/useBrowserLocation'

export type CardKey = 'worldElite' | 'visaInfinite'

type ActiveCardState = {
  activeCard: CardKey
  setActiveCard: Dispatch<SetStateAction<CardKey>>
}

const ActiveCardContext = createContext<ActiveCardState | null>(null)

function normalizeSectionId(value?: string | null) {
  const id = (value ?? '').trim().replace(/^#/, '')
  try {
    return decodeURIComponent(id)
  } catch {
    return id
  }
}

/** One card selection for every block on the page, driven by navbar URL anchors. */
export function ActiveCardProvider({
  children,
  worldSectionId,
  visaSectionId,
  defaultCard = 'worldElite',
}: {
  children: ReactNode
  worldSectionId?: string | null
  visaSectionId?: string | null
  defaultCard?: CardKey
}) {
  const location = useBrowserLocation()
  const hash = location?.hash
  const [selectedCard, setActiveCard] = useState<CardKey>(defaultCard)
  const sectionId = normalizeSectionId(hash)
  const cardFromUrl: CardKey | null =
    sectionId && sectionId === normalizeSectionId(worldSectionId)
      ? 'worldElite'
      : sectionId && sectionId === normalizeSectionId(visaSectionId)
        ? 'visaInfinite'
        : null
  // All consumers see the URL selection in the same render. Remember it when
  // navigating to another section (for example #benefits) on this page.
  const activeCard = cardFromUrl ?? (hash === '' ? defaultCard : selectedCard)

  useEffect(() => {
    if (cardFromUrl) setActiveCard(cardFromUrl)
    else if (hash === '') setActiveCard(defaultCard)
  }, [cardFromUrl, hash, defaultCard])

  const value = useMemo(() => ({ activeCard, setActiveCard }), [activeCard])
  return <ActiveCardContext.Provider value={value}>{children}</ActiveCardContext.Provider>
}

/** Use in card-specific sections, such as carousels, to choose their data. */
export function useActiveCard() {
  const context = useContext(ActiveCardContext)
  if (!context) throw new Error('useActiveCard must be used inside ActiveCardProvider')
  return context
}
