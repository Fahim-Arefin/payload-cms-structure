'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useField } from '@payloadcms/ui'
import { GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG, GLOBAL_NEWS_TAGS_SLUG_AND_TAG } from '@/lib/constants'

type OptionItem = {
  id?: string
  label?: string
  key?: string
  image?: any
  imageBlurDataURL?: string
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

export function NewsCategoryTagSelectorField({ path, field }: Props) {
  const categoryPath = getSiblingPath(path, 'categoryKey')
  const tagPath = getSiblingPath(path, 'tagKey')

  const {
    value: categoryValue,
    setValue: setCategoryValue,
    errorMessage: categoryError,
  } = useField<string>({
    path: categoryPath,
  })

  const {
    value: tagValue,
    setValue: setTagValue,
    errorMessage: tagError,
  } = useField<string>({
    path: tagPath,
  })

  const [categories, setCategories] = useState<OptionItem[]>([])
  const [tags, setTags] = useState<OptionItem[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingTags, setLoadingTags] = useState(true)
  const [categoryFetchError, setCategoryFetchError] = useState('')
  const [tagFetchError, setTagFetchError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true)
        setCategoryFetchError('')

        const res = await fetch(`/api/globals/${GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG}?depth=1`, {
          credentials: 'include',
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error(`Failed to load categories: ${res.status}`)
        }

        const data = await res.json()
        const rows: OptionItem[] = Array.isArray(data?.categories) ? data.categories : []

        const cleanRows = rows
          .filter((item) => item?.label && item?.key)
          .sort((a, b) => String(a.label).localeCompare(String(b.label)))

        if (!mounted) return
        setCategories(cleanRows)
      } catch (error) {
        if (!mounted) return
        setCategoryFetchError((error as Error).message || 'Failed to load categories.')
      } finally {
        if (mounted) setLoadingCategories(false)
      }
    }

    fetchCategories()

    return () => {
      mounted = false
    }
  }, [])

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
          throw new Error(`Failed to load tags: ${res.status}`)
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
        setTagFetchError((error as Error).message || 'Failed to load tags.')
      } finally {
        if (mounted) setLoadingTags(false)
      }
    }

    fetchTags()

    return () => {
      mounted = false
    }
  }, [])

  const selectedCategory = useMemo(
    () => categories.find((item) => item.key === categoryValue),
    [categories, categoryValue],
  )

  const selectedTag = useMemo(() => tags.find((item) => item.key === tagValue), [tags, tagValue])

  const selectStyle = (hasError?: boolean, loading?: boolean): React.CSSProperties => ({
    width: '100%',
    height: 44,
    borderRadius: 6,
    border: hasError ? '1px solid #D92D20' : '1px solid var(--theme-elevation-250)',
    background: loading ? 'var(--theme-elevation-100)' : 'var(--theme-input-bg)',
    color: 'var(--theme-text)',
    padding: '0 42px 0 14px',
    fontSize: 14,
    outline: 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    appearance: 'none',
  })

  const renderSelectedBox = (item?: OptionItem) => {
    if (!item) return null

    return (
      <div
        style={{
          marginTop: 10,
          border: '1px solid var(--theme-elevation-150)',
          background: 'var(--theme-elevation-50)',
          borderRadius: 8,
          padding: 10,
          fontSize: 12,
          color: 'var(--theme-elevation-700)',
        }}
      >
        <div style={{ fontWeight: 600 }}>{item.label}</div>
        <div style={{ marginTop: 3 }}>Key: {item.key}</div>
      </div>
    )
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
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 16,
          width: '100%',
        }}
      >
        {/* Category */}
        <div style={{ minWidth: 0 }}>
          <label
            style={{
              display: 'block',
              marginBottom: 8,
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--theme-elevation-800)',
            }}
          >
            Category <span style={{ color: '#D92D20' }}>*</span>
          </label>

          <div style={{ position: 'relative' }}>
            <select
              value={categoryValue || ''}
              onChange={(event) => setCategoryValue(event.target.value)}
              disabled={loadingCategories}
              style={selectStyle(Boolean(categoryError), loadingCategories)}
            >
              <option value="">
                {loadingCategories ? 'Loading categories...' : 'Select category'}
              </option>

              {categories.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.label}
                </option>
              ))}
            </select>

            <span
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: 12,
                color: 'var(--theme-elevation-500)',
              }}
            >
              ▼
            </span>
          </div>

          {renderSelectedBox(selectedCategory)}

          {categoryFetchError ? (
            <p style={{ marginTop: 6, fontSize: 12, color: '#D92D20' }}>{categoryFetchError}</p>
          ) : null}

          {categoryError ? (
            <p style={{ marginTop: 6, fontSize: 12, color: '#D92D20' }}>{categoryError}</p>
          ) : null}
        </div>

        {/* Tag */}
        <div style={{ minWidth: 0 }}>
          <label
            style={{
              display: 'block',
              marginBottom: 8,
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--theme-elevation-800)',
            }}
          >
            Tag <span style={{ color: '#D92D20' }}>*</span>
          </label>

          <div style={{ position: 'relative' }}>
            <select
              value={tagValue || ''}
              onChange={(event) => setTagValue(event.target.value)}
              disabled={loadingTags}
              style={selectStyle(Boolean(tagError), loadingTags)}
            >
              <option value="">{loadingTags ? 'Loading tags...' : 'Select tag'}</option>

              {tags.map((tag) => (
                <option key={tag.key} value={tag.key}>
                  {tag.label}
                </option>
              ))}
            </select>

            <span
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: 12,
                color: 'var(--theme-elevation-500)',
              }}
            >
              ▼
            </span>
          </div>

          {renderSelectedBox(selectedTag)}

          {tagFetchError ? (
            <p style={{ marginTop: 6, fontSize: 12, color: '#D92D20' }}>{tagFetchError}</p>
          ) : null}

          {tagError ? (
            <p style={{ marginTop: 6, fontSize: 12, color: '#D92D20' }}>{tagError}</p>
          ) : null}
        </div>
      </div>

      {/* {field?.admin?.description ? (
        <p style={{ marginTop: 8, fontSize: 12, color: 'var(--theme-elevation-500)' }}>
          {field.admin.description}
        </p>
      ) : null} */}
      <p style={{ marginTop: 6, fontSize: 12, color: 'var(--theme-elevation-500)' }}>
        Select category and tag from their global lists.
      </p>
    </div>
  )
}

export default NewsCategoryTagSelectorField
