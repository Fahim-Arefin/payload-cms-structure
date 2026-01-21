'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useMemo, useState } from 'react'

/* =========================
   TYPES
========================= */

type ProducerItem = {
  name: string
  contact_no: string
}

type ProducerFail = {
  Code?: number
  Message?: string
}

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  onVerified: () => void // called when phone matches -> open PDF
}

/* =========================
   HELPERS
========================= */

function normalizePhone(s: string) {
  // keep digits only (0167-xxx == 0167xxx)
  return String(s ?? '').replace(/[^\d]/g, '')
}

/* =========================
   COMPONENT
========================= */

export default function AgentVerifyModal({ open, onOpenChange, onVerified }: Props) {
  const [step, setStep] = useState<1 | 2>(1)

  const [agentCode, setAgentCode] = useState('')
  const [phoneInput, setPhoneInput] = useState('')

  const [producer, setProducer] = useState<ProducerItem | null>(null)

  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  /* =========================
     RESET ON OPEN
  ========================= */

  useEffect(() => {
    if (!open) return
    setStep(1)
    setAgentCode('')
    setPhoneInput('')
    setProducer(null)
    setErr(null)
    setLoading(false)
  }, [open])

  const canVerifyCode = useMemo(() => agentCode.trim().length > 0, [agentCode])
  const canCheckPhone = useMemo(() => phoneInput.trim().length > 0, [phoneInput])

  /* =========================
     STEP 1: VERIFY AGENT CODE
  ========================= */

  const verifyAgentCode = async () => {
    const code = agentCode.trim()
    if (!code) return

    setLoading(true)
    setErr(null)

    try {
      const res = await fetch(`/api/agent-verify?agent_code=${encodeURIComponent(code)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })

      const raw = (await res.json().catch(() => null)) as ProducerItem[] | ProducerFail | null

      console.log('verify-agent raw response:', raw)

      // 🔑 NORMALIZE RESPONSE (API RETURNS ARRAY)
      const producerItem = Array.isArray(raw) && raw.length > 0 ? raw[0] : null

      const ok =
        producerItem &&
        typeof producerItem.name === 'string' &&
        typeof producerItem.contact_no === 'string'

      if (!ok) {
        const msg = (raw as ProducerFail)?.Message || 'No active producer found for this chain code'

        setProducer(null)
        setStep(1)
        setErr(msg)
        return
      }

      // ✅ SUCCESS
      setProducer(producerItem)
      setStep(2)
      setErr(null)
    } catch (e: any) {
      setErr(e?.message || 'Failed to verify agent code')
    } finally {
      setLoading(false)
    }
  }

  /* =========================
     STEP 2: CONFIRM PHONE
  ========================= */

  const confirmPhoneAndProceed = () => {
    if (!producer) return

    const expected = normalizePhone(producer.contact_no)
    const given = normalizePhone(phoneInput)

    if (!given) {
      setErr('Please enter your phone number.')
      return
    }

    if (given !== expected) {
      setErr('Phone number does not match our record.')
      return
    }

    setErr(null)
    onOpenChange(false) // close verify modal
    onVerified() // open PDF modal
  }

  /* =========================
     UI
  ========================= */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[92vw]">
        <DialogHeader>
          <DialogTitle>{step === 1 ? 'Verify Agent Code' : 'Confirm Phone Number'}</DialogTitle>
        </DialogHeader>

        {err && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </div>
        )}

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">Enter your agent code to verify.</div>

            <Input
              value={agentCode}
              onChange={(e) => setAgentCode(e.target.value)}
              placeholder="Agent code (e.g. 1110101004)"
              inputMode="numeric"
            />

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={verifyAgentCode} disabled={!canVerifyCode || loading}>
                {loading ? 'Verifying…' : 'Verify'}
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && producer && (
          <div className="space-y-3">
            <div className="rounded-md bg-muted px-3 py-2 text-sm">
              <div className="font-medium">Producer</div>
              <div className="mt-1">{producer.name}</div>
            </div>

            <div className="text-sm text-muted-foreground">
              Enter your phone number to continue.
            </div>

            <Input
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Phone number"
              inputMode="tel"
              type="number"
            />

            <div className="flex gap-2 justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1)
                  setProducer(null)
                  setPhoneInput('')
                  setErr(null)
                }}
              >
                Back
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmPhoneAndProceed} disabled={!canCheckPhone}>
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
