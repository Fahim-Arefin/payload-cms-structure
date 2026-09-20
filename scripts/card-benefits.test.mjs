import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import ts from 'typescript'
import { migrateCardBenefitsLayout } from './lib/card-benefits-migration.mjs'

const source = await readFile(
  new URL('../src/blocks/CardBenefits/components/stackPositions.ts', import.meta.url),
  'utf8',
)
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
})
const { benefitStackPosition } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

test('each benefit reaches the front, with at most three visible cards', () => {
  for (const count of [1, 2, 3, 4, 12]) {
    for (const desktop of [true, false]) {
      for (let active = 0; active < count; active++) {
        const poses = Array.from({ length: count }, (_, index) =>
          benefitStackPosition(index, active, count, desktop),
        )
        assert.equal(poses[active].scale, 1)
        assert.equal(poses[active].autoAlpha, 1)
        assert.equal(poses.filter((pose) => pose.autoAlpha > 0).length, Math.min(3, count))
        assert.equal(Math.max(...poses.map((pose) => pose.zIndex)), poses[active].zIndex)
        assert.ok(poses.every((pose) => Number.isFinite(pose.x) && Number.isFinite(pose.y)))
      }
    }
  }
})

test('wide desktop shows four cards and keeps every card reachable', () => {
  for (const count of [3, 4, 5, 12]) {
    for (let active = 0; active < count; active++) {
      const poses = Array.from({ length: count }, (_, index) =>
        benefitStackPosition(index, active, count, true, 4),
      )
      assert.equal(poses.filter((pose) => pose.autoAlpha > 0).length, Math.min(4, count))
      assert.equal(poses[active].scale, 1)
      assert.equal(poses[active].zIndex, count)
    }
  }
  const fourth = benefitStackPosition(3, 0, 4, true, 4)
  assert.equal(fourth.autoAlpha, 1)
  assert.equal(fourth.x + fourth.scale, 2.58)
  assert.equal(benefitStackPosition(3, 0, 4, false, 4).autoAlpha, 0)
})

test('2xl shows up to five cards without duplicating smaller lists', () => {
  for (const count of [1, 2, 3, 4, 5, 6, 12]) {
    for (let active = 0; active < count; active++) {
      const poses = Array.from({ length: count }, (_, index) =>
        benefitStackPosition(index, active, count, true, 5),
      )
      assert.equal(poses.filter((pose) => pose.autoAlpha > 0).length, Math.min(5, count))
      assert.equal(poses[active].scale, 1)
      assert.ok(poses.every((pose) => Number.isFinite(pose.scale) && Number.isFinite(pose.x)))
    }
  }
  assert.equal(benefitStackPosition(4, 0, 5, true, 4).autoAlpha, 0)
  assert.equal(benefitStackPosition(4, 0, 5, true, 5).autoAlpha, 1)
})

test('front benefit moves behind the last when advancing; desktop and mobile layouts differ', () => {
  for (const desktop of [true, false]) {
    assert.equal(benefitStackPosition(0, 1, 3, desktop).depth, 2)
    assert.equal(benefitStackPosition(1, 1, 3, desktop).depth, 0)
    assert.equal(benefitStackPosition(0, 3, 4, desktop).depth, 1)
  }
  assert.ok(benefitStackPosition(2, 0, 3, true).x > benefitStackPosition(1, 0, 3, true).x)
  assert.equal(benefitStackPosition(2, 0, 3, false).x, 0)
  assert.ok(benefitStackPosition(0, 0, 3, false).y > benefitStackPosition(2, 0, 3, false).y)
})

const layout = [
  {
    blockType: 'cardInfo',
    defaultCardKey: 'custom-visa',
    cards: [
      { cardKey: 'custom-metal', legacyCardType: 'worldElite' },
      { cardKey: 'custom-visa', legacyCardType: 'visaInfinite' },
    ],
  },
  {
    blockType: 'cardBenefits',
    title: 'Explore',
    description: 'Intro',
    groovyDesign: 'pattern',
    metalCardName: 'METAL CARDS',
    metalCardImage: 'artwork',
    metalCardImageOriginal: 'original',
    metalBenefits: [
      {
        title: 'Insurance',
        description: 'Cover',
        infoText: 'Info',
        image: 'photo',
        imageOriginal: 'photo-original',
      },
    ],
    visaCardName: 'VISA CARDS',
    visaBenefits: [{ title: 'Travel', image: 'travel-photo' }],
  },
]

test('migration preserves all content and media and uses configured keys and default', () => {
  const before = structuredClone(layout)
  const [change] = migrateCardBenefitsLayout(layout, () => 'new-id')
  assert.equal(change.defaultCardKey, 'custom-visa')
  assert.equal(change.cards[0].cardKey, 'custom-metal')
  assert.equal(change.cards[0].cardName, 'METAL CARDS')
  assert.equal(change.cards[0].cardImage, 'artwork')
  assert.equal(change.cards[0].cardImageOriginal, 'original')
  assert.deepEqual(change.cards[0].items, layout[1].metalBenefits)
  assert.deepEqual(layout, before)
  assert.deepEqual(
    migrateCardBenefitsLayout([layout[0], { ...layout[1], cards: change.cards }], () => 'unused'),
    [],
  )
})

test('migration supports legacy Card Info and rejects conflicting keys', () => {
  const oldInfo = {
    blockType: 'cardInfo',
    cardSelector: {
      defaultCard: 'visaInfinite',
      worldElite: { sectionId: 'metal' },
      visaInfinite: { sectionId: 'visa' },
    },
  }
  assert.equal(
    migrateCardBenefitsLayout([oldInfo, layout[1]], () => 'id')[0].defaultCardKey,
    'visa',
  )
  oldInfo.cardSelector.visaInfinite.sectionId = 'metal'
  assert.throws(
    () => migrateCardBenefitsLayout([oldInfo, layout[1]], () => 'id'),
    /valid and unique/,
  )
})
