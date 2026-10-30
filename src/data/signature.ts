import type { StockImage } from './images'

export interface SignatureExperience {
  id: string
  index: string
  title: string
  description: string
  image: string
}

export const SIGNATURE_EXPERIENCES: SignatureExperience[] = [
  {
    id: 'candlelight-dinner',
    index: '01',
    title: 'Candlelight Dinners',
    description: 'A table set in amber light, curated for two.',
    image: 'candlelight-1',
  },
  {
    id: 'rooftop-surprise',
    index: '02',
    title: 'Rooftop Romantic Surprises',
    description: 'Skyline views staged with soft florals and warm light.',
    image: 'rooftop-1',
  },
  {
    id: 'birthday-room',
    index: '03',
    title: 'Birthday Room Decorations',
    description: 'Rooms transformed overnight into a personal celebration.',
    image: 'birthday-1',
  },
  {
    id: 'flower-balloon',
    index: '04',
    title: 'Flower & Balloon Arrangements',
    description: 'Sculptural florals and considered colour stories.',
    image: 'flowers-1',
  },
  {
    id: 'romantic-proposal',
    index: '05',
    title: 'Romantic Proposals',
    description: 'The question, framed like a film still.',
    image: 'proposal-1',
  },
  {
    id: 'anniversary-setup',
    index: '06',
    title: 'Luxury Anniversary Setups',
    description: 'Evenings built to honour the years.',
    image: 'anniversary-1',
  },
  {
    id: 'themed-birthday',
    index: '07',
    title: 'Themed Birthday Celebrations',
    description: 'Full worlds, built for one unforgettable evening.',
    image: 'party-1',
  },
] satisfies SignatureExperience[]

/** Re-export for typing convenience in components that need StockImage. */
export type { StockImage }
