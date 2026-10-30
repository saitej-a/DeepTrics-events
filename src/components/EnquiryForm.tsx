import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { BUDGET_RANGES, ENQUIRY_ENDPOINT, EVENT_TYPES, whatsappLink } from '../lib/config'

interface FormState {
  name: string
  phone: string
  email: string
  eventType: string
  date: string
  location: string
  budget: string
  details: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

const EMPTY: FormState = {
  name: '',
  phone: '',
  email: '',
  eventType: '',
  date: '',
  location: '',
  budget: '',
  details: '',
}

function validate(values: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!/^[+\d][\d\s\-()]{6,15}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.'
  if (!values.eventType) errors.eventType = 'Please choose an event type.'
  if (!values.date) errors.date = 'Please choose an event date.'
  return errors
}

export function EnquiryForm({ initialEventType }: { initialEventType?: string | null }) {
  const [values, setValues] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  // Pre-fill event type when a service "Enquire" action is used.
  useEffect(() => {
    if (initialEventType) {
      setValues((v) => ({ ...v, eventType: initialEventType }))
    }
  }, [initialEventType])

  const set = (key: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
    if (status !== 'idle') setStatus('idle')
  }

  const firstErrorKey = Object.keys(errors).find((k) => errors[k as keyof FormState])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const el = document.getElementById(`field-${firstErrorKey}`)
      el?.focus()
      return
    }

    if (!ENQUIRY_ENDPOINT) {
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          ...values,
        }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus('success')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const waText = `Hello DeepTrics, I would like to plan a ${values.eventType || 'special event'}. My name is ${values.name || '...'}.`

  const fieldClass = (key: keyof FormState) =>
    `w-full border-b bg-transparent px-0 py-3 text-base text-ivory placeholder:text-beige/40 focus:outline-none focus:border-gold transition-colors ${
      errors[key] ? 'border-red-400/70' : 'border-ivory/15'
    }`

  return (
    <div className="rounded-none border border-ivory/10 bg-charcoal p-6 sm:p-10">
      {status === 'success' ? (
        <div className="flex flex-col items-center py-12 text-center">
          <CheckCircle2 size={40} className="text-gold" />
          <h3 className="display mt-5 text-3xl text-ivory">Enquiry received.</h3>
          <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-beige">
            Thank you for reaching out. Our team will be in touch shortly to begin shaping your
            experience.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            <div>
              <label htmlFor="field-name" className="eyebrow">Full name *</label>
              <input
                id="field-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={values.name}
                onChange={(e) => set('name', e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
                className={fieldClass('name')}
              />
              {errors.name && (
                <p id="err-name" className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="field-phone" className="eyebrow">Phone number *</label>
              <input
                id="field-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 00000 00000"
                value={values.phone}
                onChange={(e) => set('phone', e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'err-phone' : undefined}
                className={fieldClass('phone')}
              />
              {errors.phone && (
                <p id="err-phone" className="mt-1 text-xs text-red-400">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="field-email" className="eyebrow">Email address *</label>
              <input
                id="field-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(e) => set('email', e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
                className={fieldClass('email')}
              />
              {errors.email && (
                <p id="err-email" className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="field-eventType" className="eyebrow">Event type *</label>
              <select
                id="field-eventType"
                value={values.eventType}
                onChange={(e) => set('eventType', e.target.value)}
                aria-invalid={!!errors.eventType}
                className={`${fieldClass('eventType')} appearance-none bg-charcoal ${values.eventType ? '' : 'text-beige/40'}`}
              >
                <option value="" disabled>Select an event type</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.eventType && (
                <p className="mt-1 text-xs text-red-400">{errors.eventType}</p>
              )}
            </div>

            <div>
              <label htmlFor="field-date" className="eyebrow">Event date *</label>
              <input
                id="field-date"
                type="date"
                min={today}
                value={values.date}
                onChange={(e) => set('date', e.target.value)}
                aria-invalid={!!errors.date}
                className={`${fieldClass('date')} [color-scheme:dark]`}
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-400">{errors.date}</p>
              )}
            </div>

            <div>
              <label htmlFor="field-location" className="eyebrow">Event location</label>
              <input
                id="field-location"
                type="text"
                placeholder="City / venue"
                value={values.location}
                onChange={(e) => set('location', e.target.value)}
                className={fieldClass('location')}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-budget" className="eyebrow">Estimated budget</label>
              <select
                id="field-budget"
                value={values.budget}
                onChange={(e) => set('budget', e.target.value)}
                className={`${fieldClass('budget')} appearance-none bg-charcoal ${values.budget ? '' : 'text-beige/40'}`}
              >
                <option value="" disabled>Select a range</option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-details" className="eyebrow">Additional details</label>
              <textarea
                id="field-details"
                rows={4}
                placeholder="Tell us about the occasion, the person, the feeling you want to create..."
                value={values.details}
                onChange={(e) => set('details', e.target.value)}
                className={`${fieldClass('details')} resize-none`}
              />
            </div>
          </div>

          {status === 'error' && (
            <p className="mt-6 text-sm text-red-400">
              We could not send your enquiry. Please try again, or reach us on WhatsApp below.
            </p>
          )}
          {status === 'unconfigured' && (
            <div className="mt-6 border border-gold/30 bg-gold/5 p-4 text-sm leading-relaxed text-beige">
              Enquiry delivery is not yet configured. To activate this form, set{' '}
              <code className="text-gold">VITE_ENQUIRY_ENDPOINT</code> (see README). Until then,
              please send your details directly on WhatsApp — we read every message.
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ivory disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending
                </>
              ) : (
                <>
                  <Send size={16} /> Send Enquiry
                </>
              )}
            </button>
            <a
              href={whatsappLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-gold/50 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </form>
      )}
    </div>
  )
}
