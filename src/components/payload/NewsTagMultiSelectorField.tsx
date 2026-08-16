'use client'

import { useField } from '@payloadcms/ui'
import React, { useEffect, useMemo, useState } from 'react'

import { GLOBAL_NEWS_TAGS_SLUG_AND_TAG } from '@/lib/constants'

type OptionItem = {
  id?: string
  label?: string
  key?: string
  [key: string]: any
}

type Props = {
  path: string
  field?: {
    label?: string
    admin?: {
      description?: string
    }
  }
}

const getSiblingPath = (path: string, fieldName: string) => {
  const parts = path.split('.')
  parts.pop()

  return [...parts, fieldName].join('.')
}

const normalizeTagKeys = (value: unknown): string[] => {
  if (!Array.isArray(value)) return []

  return value.map((item) => String(item ?? '').trim()).filter(Boolean)
}

export function NewsTagMultiSelectorField({ path, field }: Props) {
  const tagKeysPath = getSiblingPath(path, 'tagKeys')

  const {
    value: tagKeysValue,
    setValue: setTagKeysValue,
    errorMessage: tagKeysError,
  } = useField<string[]>({
    path: tagKeysPath,
  })

  const selectedTagKeys = useMemo(() => normalizeTagKeys(tagKeysValue), [tagKeysValue])

  const [tags, setTags] = useState<OptionItem[]>([])
  const [loadingTags, setLoadingTags] = useState(true)
  const [tagFetchError, setTagFetchError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchTags = async () => {
      try {
        setLoadingTags(true)
        setTagFetchError('')

        const res = await fetch(`/api/globals/${GLOBAL_NEWS_TAGS_SLUG_AND_TAG}?depth=0`, {
          credentials: 'include',
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error(`Failed to load news tags: ${res.status}`)
        }

        const data = await res.json()
        const rows: OptionItem[] = Array.isArray(data?.tags) ? data.tags : []

        const cleanRows = rows
          .filter((item) => item?.label && item?.key)
          .sort((a, b) => String(a.label).localeCompare(String(b.label)))

        if (!mounted) return

        setTags(cleanRows)
      } catch (error) {
        if (!mounted) return

        setTagFetchError((error as Error).message || 'Failed to load news tags.')
      } finally {
        if (mounted) setLoadingTags(false)
      }
    }

    fetchTags()

    return () => {
      mounted = false
    }
  }, [])

  const selectedTags = useMemo(() => {
    const selectedSet = new Set(selectedTagKeys)

    return tags.filter((tag) => tag?.key && selectedSet.has(tag.key))
  }, [tags, selectedTagKeys])

  const toggleTag = (tagKey?: string) => {
    if (!tagKey || loadingTags) return

    const exists = selectedTagKeys.includes(tagKey)

    const nextKeys = exists
      ? selectedTagKeys.filter((key) => key !== tagKey)
      : [...selectedTagKeys, tagKey]

    setTagKeysValue(nextKeys)
  }

  const clearTags = () => {
    setTagKeysValue([])
  }

  return (
    <div style={{ width: '100%' }}>
      {field?.label ? (
        <label
          style={{
            display: 'block',
            marginBottom: 12,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--theme-elevation-800)',
          }}
        >
          {field.label}
        </label>
      ) : null}

      <div
        style={{
          border: tagKeysError ? '1px solid #D92D20' : '1px solid var(--theme-elevation-150)',
          background: 'var(--theme-elevation-50)',
          borderRadius: 8,
          padding: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--theme-elevation-800)',
            }}
          >
            Select News Tags <span style={{ color: '#D92D20' }}>*</span>
          </div>

          {selectedTagKeys.length > 0 ? (
            <button
              type="button"
              onClick={clearTags}
              disabled={loadingTags}
              style={{
                border: '1px solid var(--theme-elevation-250)',
                background: 'var(--theme-input-bg)',
                color: 'var(--theme-text)',
                borderRadius: 6,
                padding: '6px 10px',
                fontSize: 12,
                cursor: loadingTags ? 'not-allowed' : 'pointer',
              }}
            >
              Clear
            </button>
          ) : null}
        </div>

        {loadingTags ? (
          <div
            style={{
              minHeight: 44,
              display: 'flex',
              alignItems: 'center',
              color: 'var(--theme-elevation-500)',
              fontSize: 13,
            }}
          >
            Loading news tags...
          </div>
        ) : tags.length ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {tags.map((tag) => {
              const isSelected = !!tag?.key && selectedTagKeys.includes(tag.key)

              return (
                <button
                  key={tag.key}
                  type="button"
                  onClick={() => toggleTag(tag.key)}
                  style={{
                    border: isSelected
                      ? '1px solid var(--theme-success-500)'
                      : '1px solid var(--theme-elevation-250)',
                    background: isSelected ? 'var(--theme-success-100)' : 'var(--theme-input-bg)',
                    color: 'var(--theme-text)',
                    borderRadius: 999,
                    padding: '8px 12px',
                    fontSize: 13,
                    fontWeight: isSelected ? 600 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {isSelected ? '✓ ' : ''}
                  {tag.label}
                </button>
              )
            })}
          </div>
        ) : (
          <div
            style={{
              minHeight: 44,
              display: 'flex',
              alignItems: 'center',
              color: 'var(--theme-elevation-500)',
              fontSize: 13,
            }}
          >
            No news tags found. Please add tags from the News Tags global.
          </div>
        )}

        {selectedTags.length ? (
          <div
            style={{
              marginTop: 12,
              borderTop: '1px solid var(--theme-elevation-150)',
              paddingTop: 10,
            }}
          >
            <div
              style={{
                marginBottom: 8,
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--theme-elevation-700)',
              }}
            >
              Selected Tags
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 8,
              }}
            >
              {selectedTags.map((tag) => (
                <div
                  key={tag.key}
                  style={{
                    border: '1px solid var(--theme-elevation-150)',
                    background: 'var(--theme-elevation-100)',
                    borderRadius: 8,
                    padding: 10,
                    fontSize: 12,
                    color: 'var(--theme-elevation-700)',
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{tag.label}</div>
                  <div style={{ marginTop: 3 }}>Key: {tag.key}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tagFetchError ? (
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: 12, color: '#D92D20' }}>
            {tagFetchError}
          </p>
        ) : null}

        {tagKeysError ? (
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: 12, color: '#D92D20' }}>
            {tagKeysError}
          </p>
        ) : null}
      </div>

      <p style={{ marginTop: 6, fontSize: 12, color: 'var(--theme-elevation-500)' }}>
        Select one or more tags from the News Tags global list.
      </p>
    </div>
  )
}

export default NewsTagMultiSelectorField
