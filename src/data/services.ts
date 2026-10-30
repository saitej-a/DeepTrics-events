export interface Service {
  slug: string
  index: string
  title: string
  short: string
  description: string[]
  highlights: string[]
  image: string
  image2: string
}

/**
 * Services — copy is written as sample, on-brand editorial content.
 * The `image` / `image2` fields are registry keys in src/data/images.ts.
 */
export const SERVICES: Service[] = [
  {
    slug: 'birthday-celebrations',
    index: '01',
    title: 'Birthday Celebrations',
    short: 'Milestone birthdays designed around the person, not a template.',
    description: [
      'We build birthdays that feel personal from the first invitation to the final toast. A considered theme, a colour story, and every small detail tuned to the person at the centre of it.',
      'From intimate dinners to full-scale parties, we handle décor, catering, entertainment and the quiet logistics that let you simply be present.',
    ],
    highlights: ['Bespoke theming', 'Venue & décor', 'Entertainment', 'Catering curation'],
    image: 'birthday-1',
    image2: 'cake-1',
  },
  {
    slug: 'surprise-birthday-planning',
    index: '02',
    title: 'Surprise Birthday Planning',
    short: 'Perfectly kept secrets, beautifully staged reveals.',
    description: [
      'A surprise lives or dies on its secrecy. We choreograph the cover story, the timing and the reveal so the moment lands with genuine astonishment.',
      'Room takeovers, midnight setups, surprise guests and recorded reactions — every element rehearsed, nothing left to chance.',
    ],
    highlights: ['Secret coordination', 'Midnight setups', 'Room transformations', 'The reveal moment'],
    image: 'birthday-2',
    image2: 'confetti-1',
  },
  {
    slug: 'romantic-surprises',
    index: '03',
    title: 'Romantic Surprises',
    short: 'Quiet, cinematic gestures for the person who matters most.',
    description: [
      'We design romantic moments that feel like film scenes — candlelit settings, handwritten notes, music and light arranged to hold the mood.',
      'Every romantic surprise is conceived around your story, your memories and the feeling you want to leave behind.',
    ],
    highlights: ['Candlelight settings', 'Personal storytelling', 'Music & atmosphere', 'Photography'],
    image: 'candlelight-1',
    image2: 'flowers-1',
  },
  {
    slug: 'marriage-proposals',
    index: '04',
    title: 'Marriage Proposals',
    short: 'The single most important question, staged with intention.',
    description: [
      'A proposal is a once-in-a-lifetime frame. We plan the location, the lighting, the timing and the words around it — then step back and let you ask.',
      'From private rooftop scenes to scenic destinations, we make sure the backdrop is worthy of the moment.',
    ],
    highlights: ['Location scouting', 'Floral styling', 'Ring moment staging', 'Capture & video'],
    image: 'proposal-1',
    image2: 'flowers-2',
  },
  {
    slug: 'anniversary-celebrations',
    index: '05',
    title: 'Anniversary Celebrations',
    short: 'Honouring the years with evenings that feel earned.',
    description: [
      'Anniversaries deserve ceremony. We craft evenings that trace your story — a table for two, a room of closest people, or a celebration to remember.',
      'Every anniversary is approached as a reflection of the time you have spent together.',
    ],
    highlights: ['Intimate dinners', 'Memory curation', 'Gifting & surprises', 'Renewal setups'],
    image: 'anniversary-1',
    image2: 'table-1',
  },
  {
    slug: 'wedding-planning',
    index: '06',
    title: 'Wedding Planning',
    short: 'End-to-end design and delivery for your most important day.',
    description: [
      'We plan weddings with the restraint and intention they deserve — a coherent design language carried through décor, florals, lighting and flow.',
      'Our team manages vendors, timelines and the hundred invisible decisions so the day unfolds without friction.',
    ],
    highlights: ['Full design concept', 'Vendor management', 'Day-of coordination', 'Lighting & staging'],
    image: 'wedding-1',
    image2: 'wedding-2',
  },
  {
    slug: 'corporate-events',
    index: '07',
    title: 'Corporate Events',
    short: 'Refined gatherings that represent your brand precisely.',
    description: [
      'Launches, dinners, summits and celebrations — we design corporate experiences with the polish your brand requires.',
      'From guest experience to stage design, every corporate event is produced with the same rigour as our personal celebrations.',
    ],
    highlights: ['Brand-aligned design', 'Stage & AV', 'Guest experience', 'Logistics'],
    image: 'corporate-1',
    image2: 'corporate-2',
  },
  {
    slug: 'private-parties',
    index: '08',
    title: 'Private Parties',
    short: 'Gatherings that feel effortless because nothing is.',
    description: [
      'House parties, garden evenings and milestone gatherings — planned with taste and delivered without a single visible effort.',
      'We take the coordination off your hands and leave you with the part that matters: your people.',
    ],
    highlights: ['Curated atmosphere', 'Bar & catering', 'Lighting design', 'Guest management'],
    image: 'party-1',
    image2: 'party-2',
  },
  {
    slug: 'decorations-theming',
    index: '09',
    title: 'Decorations & Theming',
    short: 'Spaces transformed through colour, texture and light.',
    description: [
      'Decoration is where an event becomes an atmosphere. Our styling team builds complete environments — florals, drapery, props, signage and light.',
      'Every installation is designed to photograph beautifully and feel even better in person.',
    ],
    highlights: ['Floral & balloon design', 'Themed styling', 'Props & backdrops', 'Ambient lighting'],
    image: 'decor-1',
    image2: 'flowers-3',
  },
  {
    slug: 'customised-celebrations',
    index: '10',
    title: 'Customised Celebrations',
    short: 'Whatever you can imagine, designed from a blank page.',
    description: [
      'Some moments do not fit a category. Tell us the idea, the feeling, the person — and we will design a one-off experience around it.',
      'This is our favourite kind of work: entirely bespoke, entirely yours.',
    ],
    highlights: ['Open brief', 'One-off design', 'Full production', 'End-to-end delivery'],
    image: 'party-3',
    image2: 'confetti-2',
  },
]

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}
