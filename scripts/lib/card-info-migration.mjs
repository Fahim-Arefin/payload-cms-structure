/** Add dynamic cards without removing the original selector data. */
export function migrateCardInfoLayout(layout, createID) {
  const changes = []
  for (const [index, block] of (layout ?? []).entries()) {
    if (block.blockType !== 'cardInfo' || Array.isArray(block.cards)) continue
    const selector = block.cardSelector
    const cards = []
    for (const [legacyCardType, fallbackKey, fallbackName] of [
      ['worldElite', 'world-elite', 'World Elite'],
      ['visaInfinite', 'visa-infinite', 'Visa Infinite'],
    ]) {
      const oldCard = selector?.[legacyCardType]
      if (!oldCard) continue
      const cardKey = oldCard.sectionId || fallbackKey
      if (
        !/^[a-zA-Z][a-zA-Z0-9-]{0,79}$/.test(cardKey) ||
        cards.some((card) => card.cardKey === cardKey)
      ) {
        throw new Error('Card Info section IDs must be valid, unique card keys before migration.')
      }
      cards.push({
        ...oldCard,
        _id: createID(),
        cardKey,
        cardName: oldCard.cardName || fallbackName,
        buttonLabel: oldCard.buttonLabel || oldCard.cardName || fallbackName,
        legacyCardType,
      })
    }
    if (cards.length) {
      const selected = cards.find((card) => card.legacyCardType === selector?.defaultCard)
      changes.push({ index, cards, defaultCardKey: selected?.cardKey ?? cards[0].cardKey })
    }
  }
  return changes
}
