export type PortfolioCategory =
  | 'Birthday'
  | 'Proposal'
  | 'Anniversary'
  | 'Wedding'
  | 'Corporate'
  | 'Surprise'

export interface PortfolioItem {
  id: string
  title: string
  category: PortfolioCategory
  description: string
  image: string
  tall?: boolean
}

export const PORTFOLIO_CATEGORIES: ('All' | PortfolioCategory)[] = [
  'All',
  'Birthday',
  'Proposal',
  'Anniversary',
  'Wedding',
  'Corporate',
  'Surprise',
]

/**
 * Sample portfolio — replace with real completed events before launch.
 * `image` values are registry keys in src/data/images.ts.
 */
export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'A Midnight Surprise for Ria',
    category: 'Surprise',
    description: 'A candlelit living room staged in secret, revealed at midnight.',
    image: 'candlelight-1',
    tall: true,
  },
  {
    id: 'p2',
    title: 'An Anniversary Under the Stars',
    category: 'Anniversary',
    description: 'A rooftop table for two, lit with a thousand small lights.',
    image: 'anniversary-1',
  },
  {
    id: 'p3',
    title: 'The Proposal on the Terrace',
    category: 'Proposal',
    description: 'Florals, candlelight and a single question at golden hour.',
    image: 'proposal-1',
    tall: true,
  },
  {
    id: 'p4',
    title: 'A Garden Wedding in Ivory',
    category: 'Wedding',
    description: 'An ivory-and-gold ceremony designed from invitation to reception.',
    image: 'wedding-1',
  },
  {
    id: 'p5',
    title: 'Product Launch, After Dark',
    category: 'Corporate',
    description: 'A brand evening with a bespoke stage and a considered guest flow.',
    image: 'corporate-1',
  },
  {
    id: 'p6',
    title: 'Seventh Birthday, In Full Colour',
    category: 'Birthday',
    description: 'A playful theme built entirely around one child\u2019s imagination.',
    image: 'birthday-1',
    tall: true,
  },
  {
    id: 'p7',
    title: 'A Surprise Proposal Abroad',
    category: 'Proposal',
    description: 'A destination setting, planned remotely and delivered perfectly.',
    image: 'proposal-2',
    tall: true,
  },
  {
    id: 'p8',
    title: 'Twenty-Five Years, One Table',
    category: 'Anniversary',
    description: 'An intimate family dinner that retold twenty-five years of a marriage.',
    image: 'table-1',
  },
  {
    id: 'p9',
    title: 'The Private Dinner Party',
    category: 'Surprise',
    description: 'A chef\u2019s table hidden behind a bookshelf of memories.',
    image: 'party-1',
    tall: true,
  },
  {
    id: 'p10',
    title: 'The Anniversary Gala',
    category: 'Corporate',
    description: 'A milestone company evening produced end-to-end.',
    image: 'corporate-2',
  },
]
