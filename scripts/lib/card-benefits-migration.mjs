/** Preserve old fields while adding keyed card groups. */
export function migrateCardBenefitsLayout(layout, createID) {
  const info = layout?.find((block) => block.blockType === 'cardInfo')
  const changes = []
  for (const [index, block] of (layout ?? []).entries()) {
    if (block.blockType !== 'cardBenefits' || Array.isArray(block.cards)) continue
    const cards = []
    for (const [prefix, legacyType, fallbackKey, fallbackName] of [
      ['metal', 'worldElite', 'world-elite', 'METAL CARDS'],
      ['visa', 'visaInfinite', 'visa-infinite', 'VISA CARDS'],
    ]) {
      const items = block[`${prefix}Benefits`]
      if (!Array.isArray(items) || !items.length) continue
      const configured = info?.cards?.find((card) => card.legacyCardType === legacyType)
      const oldInfo = info?.cardSelector?.[legacyType]
      const cardKey = configured?.cardKey || oldInfo?.sectionId || fallbackKey
      if (
        !/^[a-zA-Z][a-zA-Z0-9-]{0,79}$/.test(cardKey) ||
        cards.some((card) => card.cardKey === cardKey)
      ) {
        throw new Error('Existing card keys must be valid and unique before migrating Benefits.')
      }
      cards.push({
        _id: createID(),
        cardKey,
        cardName: block[`${prefix}CardName`] || configured?.cardName || fallbackName,
        cardImage: block[`${prefix}CardImage`],
        cardImageOriginal: block[`${prefix}CardImageOriginal`],
        cardImageBlurDataURL: block[`${prefix}CardImageBlurDataURL`],
        items,
      })
    }
    if (!cards.length) continue
    const oldDefault = info?.cardSelector?.defaultCard ?? 'worldElite'
    const preferred =
      info?.defaultCardKey ||
      info?.cardSelector?.[oldDefault]?.sectionId ||
      (oldDefault === 'visaInfinite' ? 'visa-infinite' : 'world-elite')
    changes.push({
      index,
      cards,
      defaultCardKey: cards.find((card) => card.cardKey === preferred)?.cardKey ?? cards[0].cardKey,
    })
  }
  return changes
}
