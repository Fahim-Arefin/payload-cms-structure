import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import ts from 'typescript'
import { migrateCardInfoLayout } from './lib/card-info-migration.mjs'

const source = await readFile(
  new URL('../src/blocks/CardInfo/cardStack.ts', import.meta.url),
  'utf8',
)
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
})
const { getCardStackPose } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

test('two-card geometry preserves the existing front and back positions', () => {
  for (const mobile of [true, false]) {
    for (const active of [0, 1]) {
      const front = getCardStackPose(active, active, 2, mobile)
      const back = getCardStackPose(1 - active, active, 2, mobile)
      assert.equal(front.xPercent, active === 0 ? -8 : -5)
      assert.equal(back.xPercent, active === 0 ? 18 : 15)
      assert.equal(front.yPercent, mobile ? -2 : -3)
      assert.equal(back.yPercent, mobile ? 3 : 4)
      assert.equal(front.scale, back.scale)
      assert.ok(front.zIndex > back.zIndex)
    }
  }
})

test('every card can come to the front while large stacks stay within bounds', () => {
  for (const count of [1, 3, 4, 12, 30]) {
    for (let active = 0; active < count; active++) {
      const poses = Array.from({ length: count }, (_, index) =>
        getCardStackPose(index, active, count, false),
      )
      assert.equal(poses[active].autoAlpha, 1)
      assert.equal(poses.filter((pose) => pose.autoAlpha > 0).length, Math.min(count, 3))
      assert.ok(poses.every((pose) => Math.abs(pose.xPercent) <= 28))
      assert.equal(Math.max(...poses.map((pose) => pose.zIndex)), poses[active].zIndex)
    }
  }
})

const layout = [
  {
    blockType: 'cardInfo',
    content: { title: 'Welcome' },
    cardSelector: {
      title: 'Choose Your Card',
      defaultCard: 'visaInfinite',
      worldElite: {
        sectionId: 'custom-metal',
        cardName: 'Metal',
        buttonLabel: 'Select Metal',
        cardImage: 'image-1',
        cardImageOriginal: 'original-1',
        buttonLink: 'page-1',
      },
      visaInfinite: { sectionId: 'custom-visa', cardName: 'Visa', cardImage: 'image-2' },
    },
  },
]

test('migration preserves media, links, names, anchors and selected card without mutating old content', () => {
  const before = structuredClone(layout)
  const [change] = migrateCardInfoLayout(layout, () => 'new-id')
  assert.equal(change.defaultCardKey, 'custom-visa')
  assert.equal(change.cards[0].cardKey, 'custom-metal')
  assert.equal(change.cards[0].cardImage, 'image-1')
  assert.equal(change.cards[0].cardImageOriginal, 'original-1')
  assert.equal(change.cards[0].buttonLink, 'page-1')
  assert.equal(change.cards[0].buttonLabel, 'Select Metal')
  assert.equal(change.cards[1].legacyCardType, 'visaInfinite')
  assert.deepEqual(layout, before)
  assert.deepEqual(
    migrateCardInfoLayout([{ ...layout[0], cards: change.cards }], () => 'unused'),
    [],
  )
})

test('migration rejects duplicate or invalid existing keys before writing', () => {
  for (const sectionId of ['custom-metal', '#invalid']) {
    const invalid = structuredClone(layout)
    invalid[0].cardSelector.visaInfinite.sectionId = sectionId
    assert.throws(() => migrateCardInfoLayout(invalid, () => 'unused'), /valid, unique/)
  }
})
