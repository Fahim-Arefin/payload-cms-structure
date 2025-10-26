'use client'
import * as React from 'react'

type Props = { src: string; alt?: string }

export default function LayoutThumbPreview({ src, alt }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <div style={{ marginBottom: 8 }}>
      <div
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-block',
          cursor: 'zoom-in',
          border: '1px solid #e5e5e5',
          padding: 4,
          borderRadius: 6,
          background: '#fff',
        }}
        title="Click to enlarge"
      >
        <img
          src={src}
          alt={alt}
          style={{ display: 'block', maxWidth: 220, height: 'auto', borderRadius: 4 }}
        />
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 9999,
            display: 'grid',
            placeItems: 'center',
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 10,
              padding: 12,
              maxWidth: '90vw',
              maxHeight: '90vh',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{ display: 'block', maxWidth: '80vw', maxHeight: '80vh', height: 'auto' }}
            />
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  appearance: 'none',
                  border: '1px solid #ddd',
                  background: '#f7f7f7',
                  padding: '6px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>Click the image to preview</div>
    </div>
  )
}
