export interface Testimonial {
  quote: string
  name: string
  event: string
  /** Registry key in src/data/images.ts — optional portrait. */
  image?: string
}

/**
 * PLACEHOLDER TESTIMONIALS.
 * These are clearly-labelled sample reviews used to demonstrate layout and
 * tone. Replace with genuine client feedback before launch — see README.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'They planned my proposal with the patience and discretion of a close friend. When I walked in, I understood why everyone said to trust them.',
    name: 'Sample Client One',
    event: 'Marriage Proposal',
  },
  {
    quote:
      'Our daughter\u2019s surprise birthday was staged with such care. Every detail felt personal, and the reveal was worth every second of planning.',
    name: 'Sample Client Two',
    event: 'Surprise Birthday',
  },
  {
    quote:
      'The anniversary dinner they designed felt like a film. Quiet, warm, and completely us. We have already asked them about the next one.',
    name: 'Sample Client Three',
    event: 'Anniversary Celebration',
  },
  {
    quote:
      'From the first conversation to the last guest leaving, everything was seamless. Our corporate evening looked and felt exactly like our brand.',
    name: 'Sample Client Four',
    event: 'Corporate Event',
  },
]
