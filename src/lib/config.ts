/**
 * Central brand & business configuration.
 *
 * Every value that a real business would need to change lives here.
 * See README.md and .env.example for the environment-variable integration points.
 */

export const BRAND = {
  name: 'DeepTrics',
  fullName: 'DeepTrics Event Planners & Surprise Planners',
  tagline: 'We create moments that last forever.',
  description:
    'A creative event and surprise planning company transforming ideas into unforgettable experiences — from extraordinary celebrations to beautifully unexpected surprises.',
  city: 'Your City',
  country: 'Your Country',
} as const

/**
 * Contact details are configurable. Prefer environment variables in production;
 * the values below act as visible, clearly-editable defaults.
 */
export const CONTACT = {
  phone: import.meta.env.VITE_CONTACT_PHONE ?? '+91 00000 00000',
  email: import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@deeptrics.com',
  /**
   * WhatsApp number in international format WITHOUT "+" or spaces, e.g. "911234567890".
   * Set via VITE_WHATSAPP_NUMBER in .env — see .env.example.
   */
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER ?? '911234567890',
  address: 'Sample Studio Address — replace in src/lib/config.ts',
  hours: 'Mon – Sun · 10:00 – 20:00',
} as const

/** Build a wa.me link with a pre-filled message. */
export function whatsappLink(message?: string) {
  const text = message ?? `Hello ${BRAND.fullName}, I would like to plan an event.`
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
}

/**
 * Enquiry submission endpoint.
 * When empty, the form does NOT pretend to succeed — it shows an honest
 * "submission not configured" state and offers WhatsApp / email instead.
 * Set VITE_ENQUIRY_ENDPOINT to your form/CRM/email service URL (see README).
 */
export const ENQUIRY_ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT ?? ''

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'Facebook', href: 'https://facebook.com/' },
  { label: 'YouTube', href: 'https://youtube.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
] as const

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Our Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const

/**
 * Statistics — PLACEHOLDER VALUES ONLY.
 * These are sample figures for the animated counters. Replace `value` with real
 * numbers once available. No fabricated claims are shipped as fact.
 */
export const STATS: { label: string; value: number; suffix?: string }[] = [
  { label: 'Events Celebrated', value: 320, suffix: '+' },
  { label: 'Smiles Created', value: 40, suffix: 'k+' },
  { label: 'Surprises Delivered', value: 180, suffix: '+' },
  { label: 'Happy Clients', value: 260, suffix: '+' },
]

export const EVENT_TYPES = [
  'Birthday Celebration',
  'Surprise Birthday',
  'Romantic Surprise',
  'Marriage Proposal',
  'Anniversary Celebration',
  'Wedding Planning',
  'Corporate Event',
  'Private Party',
  'Decoration & Theming',
  'Customised Celebration',
  'Other',
] as const

export const BUDGET_RANGES = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,50,000',
  '₹2,50,000+',
  'Not sure yet',
] as const
