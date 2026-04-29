'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useField } from '@payloadcms/ui'
import { GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG } from '@/lib/constants'

// type CategoryOption = {
//   id?: string
//   label?: string
//   key?: string
//   image?: any
//   imageBlurDataURL?: string
//   [key: string]: any
// }
type CategoryOption = {
  id?: string
  label?: string
  key?: string
  [key: string]: any
}

type Props = {
  path: string
  field?: {
    label?: string
    required?: boolean
    admin?: {
      description?: string
      width?: string
    }
  }
}

export function NewsCategorySelectField({ path, field }: Props) {
  const { value, setValue, errorMessage } = useField<string>({ path })

  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchCategories = async () => {
      try {
        setLoading(true)
        setFetchError('')

        const res = await fetch(`/api/globals/${GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG}?depth=1`, {
          credentials: 'include',
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error(`Failed to load categories: ${res.status}`)
        }

        const data = await res.json()
        const rows: CategoryOption[] = Array.isArray(data?.categories) ? data.categories : []

        const cleanRows = rows
          .filter((item) => item?.label && item?.key)
          .sort((a, b) => String(a.label).localeCompare(String(b.label)))

        if (!mounted) return

        setCategories(cleanRows)
      } catch (error) {
        if (!mounted) return
        setFetchError((error as Error).message || 'Failed to load categories.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCategories()

    return () => {
      mounted = false
    }
  }, [])

  const selectedCategory = useMemo(
    () => categories.find((item) => item.key === value),
    [categories, value],
  )

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value)
  }

  const helperText = field?.admin?.description || 'Select category and tag from their global lists.'

  return (
    <div
      style={{
        width: field?.admin?.width || '100%',
      }}
    >
      <label
        style={{
          display: 'block',
          marginBottom: 8,
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--theme-elevation-800)',
        }}
      >
        {field?.label || 'Category'}
        {field?.required ? <span style={{ color: '#D92D20' }}> *</span> : null}
      </label>

      <div style={{ position: 'relative' }}>
        <select
          value={value || ''}
          onChange={handleChange}
          disabled={loading}
          style={{
            width: '100%',
            height: 44,
            borderRadius: 6,
            border: errorMessage ? '1px solid #D92D20' : '1px solid var(--theme-elevation-250)',
            background: loading ? 'var(--theme-elevation-100)' : 'var(--theme-input-bg)',
            color: 'var(--theme-text)',
            padding: '0 42px 0 14px',
            fontSize: 14,
            outline: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            appearance: 'none',
          }}
        >
          <option value="">{loading ? 'Loading categories...' : 'Select category'}</option>

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

      {selectedCategory ? (
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
          <div style={{ fontWeight: 600 }}>{selectedCategory.label}</div>
          <div style={{ marginTop: 3 }}>Key: {selectedCategory.key}</div>
        </div>
      ) : null}

      {/* {field?.admin?.description ? (
        <p style={{ marginTop: 6, fontSize: 12, color: 'var(--theme-elevation-500)' }}>
          {field.admin.description}
        </p>
      ) : null} */}
      <p style={{ marginTop: 6, fontSize: 12, color: 'var(--theme-elevation-500)' }}>
        Select category from global list.
      </p>

      {fetchError ? (
        <p style={{ marginTop: 6, fontSize: 12, color: '#D92D20' }}>{fetchError}</p>
      ) : null}

      {errorMessage ? (
        <p style={{ marginTop: 6, fontSize: 12, color: '#D92D20' }}>{errorMessage}</p>
      ) : null}
    </div>
  )
}

export default NewsCategorySelectField
