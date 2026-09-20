import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import ts from 'typescript'
import { migratePrivilegesLayout } from './lib/card-privileges-migration.mjs'

// Transpile the dependency-free selection helpers using the existing compiler.
// This runner also works on the Node 18/20 versions supported by the project.
const source = await readFile(
  new URL('../src/blocks/CardCardPrivileges/cardSelection.ts', import.meta.url),
  'utf8',
)
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
})
const { resolveCardKey, validateCardChoices, validateDefaultCardKey, validateCardKey } =
  await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
const cards = ['world-elite', 'visa-infinite', 'platinum'].map((cardKey) => ({ cardKey }))

test('a newly configured card is selected without a hardcoded branch', () => {
  assert.equal(resolveCardKey(cards, '#platinum', 'world-elite'), 'platinum')
  assert.equal(resolveCardKey([...cards, { cardKey: 'business' }], '#business'), 'business')
})

test('existing anchors, encoded hashes, and back navigation select their matching cards', () => {
  assert.equal(resolveCardKey(cards, '#visa-infinite', 'platinum'), 'visa-infinite')
  assert.equal(resolveCardKey(cards, '#world-elite', 'visa-infinite'), 'world-elite')
  assert.equal(resolveCardKey(cards, '#visa%2Dinfinite'), 'visa-infinite')
})

test('unrelated anchors preserve selection, and clearing the hash restores the default', () => {
  assert.equal(resolveCardKey(cards, '#contact', 'platinum', 'visa-infinite'), 'platinum')
  assert.equal(resolveCardKey(cards, '', 'platinum', 'visa-infinite'), 'visa-infinite')
  assert.equal(resolveCardKey(cards, undefined, null, 'visa-infinite'), 'visa-infinite')
})

test('missing or deleted choices fall back safely', () => {
  assert.equal(resolveCardKey(cards, '#unknown', 'removed', 'removed'), 'world-elite')
  assert.equal(resolveCardKey([], '#platinum', 'platinum'), null)
  assert.equal(resolveCardKey(cards, '#%broken', 'platinum'), 'platinum')
})

test('keys and defaults are validated before saving', () => {
  assert.equal(validateCardChoices(cards), true)
  assert.notEqual(validateCardChoices([...cards, { cardKey: 'platinum' }]), true)
  assert.notEqual(validateCardChoices([]), true)
  for (const key of ['#platinum', 'platinum card', ' platinum', 'platinum/', '']) {
    assert.notEqual(validateCardKey(key), true)
  }
  assert.equal(validateDefaultCardKey('platinum', cards), true)
  assert.equal(validateDefaultCardKey('', cards), true)
  assert.notEqual(validateDefaultCardKey('missing', cards), true)
})

const legacyLayout = () => [
  {
    blockType: 'cardInfo',
    cardSelector: {
      defaultCard: 'visaInfinite',
      worldElite: { sectionId: 'custom-metal', cardName: 'My Metal Card' },
      visaInfinite: { sectionId: 'custom-visa', cardName: 'My Visa Card' },
    },
  },
  {
    blockType: 'cardPrivileges',
    metalCard: {
      cardImage: 'metal-image',
      items: [{ id: 'm1', privilegesImage: 'dining', privilegesName: 'Dining' }],
    },
    visaInfinite: {
      cardImage: 'visa-image',
      items: [{ id: 'v1', privilegesImage: 'travel', privilegesName: 'Travel' }],
    },
  },
]

test('migration preserves configured anchors, names, default selection, and all item data', () => {
  const layout = legacyLayout()
  const before = structuredClone(layout)
  const [change] = migratePrivilegesLayout(layout, () => 'new-id')
  assert.equal(change.index, 1)
  assert.deepEqual(
    change.cards.map((card) => card.cardKey),
    ['custom-metal', 'custom-visa'],
  )
  assert.equal(change.cards[0].cardName, 'My Metal Card')
  assert.equal(change.defaultCardKey, 'custom-visa')
  assert.equal(change.cards[0].cardImage, 'metal-image')
  assert.deepEqual(change.cards[0].items, layout[1].metalCard.items)
  assert.deepEqual(change.cards[1].items, layout[1].visaInfinite.items)
  assert.deepEqual(layout, before)
})

test('migration is idempotent and never replaces an existing dynamic card list', () => {
  const layout = legacyLayout()
  const [change] = migratePrivilegesLayout(layout, () => 'new-id')
  layout[1].cards = change.cards
  assert.deepEqual(
    migratePrivilegesLayout(layout, () => 'unused'),
    [],
  )
  layout[1].cards = []
  assert.deepEqual(
    migratePrivilegesLayout(layout, () => 'unused'),
    [],
  )
})

test('migration recovers artwork from the original item-level schema', () => {
  const layout = [
    {
      blockType: 'cardPrivileges',
      metalCard: { items: [{ cardImage: 'original-card', cardImageOriginal: 'original-upload' }] },
    },
  ]
  const [change] = migratePrivilegesLayout(layout, () => 'new-id')
  assert.equal(change.cards[0].cardImage, 'original-card')
  assert.equal(change.cards[0].cardImageOriginal, 'original-upload')
  assert.equal(change.defaultCardKey, 'world-elite')
})

test('migration rejects conflicting existing anchors', () => {
  const layout = legacyLayout()
  layout[0].cardSelector.visaInfinite.sectionId = 'custom-metal'
  assert.throws(() => migratePrivilegesLayout(layout, () => 'new-id'), /distinct card keys/)
})
