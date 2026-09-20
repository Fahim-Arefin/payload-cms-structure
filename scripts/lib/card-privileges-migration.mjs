/** Build additive migrations; keep the original groups for recovery. */
export function migratePrivilegesLayout(layout, createID) {
  const selector = layout?.find((block) => block.blockType === 'cardInfo')?.cardSelector
  const changes = []
  for (const [index, block] of (layout ?? []).entries()) {
    if (block.blockType !== 'cardPrivileges' || Array.isArray(block.cards)) continue
    const cards = []
    let defaultCardKey
    for (const [oldField, infoKey, fallbackKey, fallbackName] of [
      ['metalCard', 'worldElite', 'world-elite', 'World Elite'],
      ['visaInfinite', 'visaInfinite', 'visa-infinite', 'Visa Infinite'],
    ]) {
      const group = block[oldField]
      if (!group) continue
      const configured = selector?.[infoKey]
      const key = configured?.sectionId || fallbackKey
      if (!/^[a-zA-Z][a-zA-Z0-9-]{0,79}$/.test(key) || cards.some((card) => card.cardKey === key)) {
        throw new Error(
          'Existing Card Info section IDs must be valid, distinct card keys before migration.',
        )
      }
      const previousItem = group.items?.find((item) => item.cardImage)
      cards.push({
        ...group,
        _id: createID(),
        cardName: configured?.cardName || fallbackName,
        cardKey: key,
        cardImage: group.cardImage ?? previousItem?.cardImage,
        cardImageOriginal: group.cardImageOriginal ?? previousItem?.cardImageOriginal,
        cardImageBlurDataURL: group.cardImageBlurDataURL ?? previousItem?.cardImageBlurDataURL,
      })
      if ((selector?.defaultCard ?? 'worldElite') === infoKey) defaultCardKey = key
    }
    if (cards.length)
      changes.push({ index, cards, defaultCardKey: defaultCardKey ?? cards[0].cardKey })
  }
  return changes
}
