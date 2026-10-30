export interface StockImage {
  src: string
  alt: string
  artist?: string
  license?: string
  orientation: 'landscape' | 'portrait'
}

/**
 * Central image registry — every photograph on the site resolves through this
 * map, keeping all imagery replaceable in one place.
 *
 * The current entries are CC-licensed placeholder stock curated from Wikimedia
 * Commons (see IMAGE_ATTRIBUTION.md for full attribution). Replace `src` with
 * your real portfolio photography (WebP/AVIF, sized appropriately) before
 * launch.
 */
export const IMAGES: Record<string, StockImage> = {
  'about-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/France-000377_-_Hall_of_Mirrors_%2814828712445%29.jpg/1920px-France-000377_-_Hall_of_Mirrors_%2814828712445%29.jpg',
    alt: 'Opulent gilded ballroom with crystal chandeliers and mirrored walls',
    artist: 'Dennis G. Jarvis',
    license: 'CC BY-SA',
    orientation: 'portrait',
  },
  'birthday-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Birthday_Cake_Bloomsburg%2C_Pennsylvania.jpg/1920px-Birthday_Cake_Bloomsburg%2C_Pennsylvania.jpg',
    alt: 'An elegant birthday cake with candles in warm light',
    artist: 'Tim-desser',
    license: 'CC0',
    orientation: 'landscape',
  },
  'birthday-2': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Birthday_cake..red.jpg/1920px-Birthday_cake..red.jpg',
    alt: 'A red birthday cake photographed in moody, low light',
    artist: 'JAYASHREESATHIYAMOORTHY',
    license: 'CC0',
    orientation: 'portrait',
  },
  'cake-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Mother%27s_birthday_cake_in_birthday_dinner.jpg/1920px-Mother%27s_birthday_cake_in_birthday_dinner.jpg',
    alt: 'A birthday cake at an intimate dinner in warm lighting',
    artist: 'Geoffreyrabbit',
    license: 'CC BY-SA',
    orientation: 'landscape',
  },
  'confetti-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/XS_Nightclub_Las_Vegas_Confetti_1.jpg/1920px-XS_Nightclub_Las_Vegas_Confetti_1.jpg',
    alt: 'Confetti falling through a dimly lit celebration',
    artist: 'jencu',
    license: 'CC BY',
    orientation: 'landscape',
  },
  'confetti-2': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Confetti_in_the_air.jpg/1920px-Confetti_in_the_air.jpg',
    alt: 'Confetti suspended in the air against a dark background',
    artist: 'AntonellaVella',
    license: 'CC BY-SA',
    orientation: 'portrait',
  },
  'candlelight-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/DZ6_2628_Cozy_candlelit_dinner_for_two_elegant_Thai_restaurant_setting_with_twinkling_lights_and_a_delicate_orchid_centerpiece.jpg/1920px-DZ6_2628_Cozy_candlelit_dinner_for_two_elegant_Thai_restaurant_setting_with_twinkling_lights_and_a_delicate_orchid_centerpiece.jpg',
    alt: 'A candlelit dinner table for two, warm golden light and a delicate orchid centerpiece',
    artist: 'PattayaPatrol',
    license: 'CC BY-SA',
    orientation: 'landscape',
  },
  'flowers-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/2007-03-05_Floral_arrangement.JPG/1920px-2007-03-05_Floral_arrangement.JPG',
    alt: 'A warm golden floral arrangement in soft light',
    artist: 'Vera Buhl',
    license: 'CC BY-SA',
    orientation: 'landscape',
  },
  'flowers-2': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Omni_San_Francisco_Hotel_-_2021-08-18_-_Sarah_Stierch_01.jpg/1920px-Omni_San_Francisco_Hotel_-_2021-08-18_-_Sarah_Stierch_01.jpg',
    alt: 'An elegant floral arrangement in a luxury hotel lobby',
    artist: 'Missvain',
    license: 'CC BY',
    orientation: 'portrait',
  },
  'flowers-3': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Wedding_Decoration_in_Anambra_state%2C_Nigeria.jpg/1920px-Wedding_Decoration_in_Anambra_state%2C_Nigeria.jpg',
    alt: 'A decorated venue with flowers and elegant arrangements',
    artist: 'Solomoral',
    license: 'CC0',
    orientation: 'portrait',
  },
  'proposal-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Romantic_Couple_Proposal_for_Wedding.jpg/1920px-Romantic_Couple_Proposal_for_Wedding.jpg',
    alt: 'A couple in a romantic proposal moment in soft golden light',
    artist: 'epSos.de',
    license: 'CC BY',
    orientation: 'landscape',
  },
  'proposal-2': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Proposal_Ring.jpg',
    alt: 'A close-up of an engagement ring in warm golden light',
    artist: 'Tuyishimejosue',
    license: 'CC BY',
    orientation: 'portrait',
  },
  'anniversary-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/DZ6_2645_An_elegant_table_setting_a_sparkling_wine_glass_catching_the_warm_glow_of_a_cozy_dimly_lit_dining_scene.jpg/1920px-DZ6_2645_An_elegant_table_setting_a_sparkling_wine_glass_catching_the_warm_glow_of_a_cozy_dimly_lit_dining_scene.jpg',
    alt: 'An elegant table setting with a sparkling wine glass in warm dim light',
    artist: 'PattayaPatrol',
    license: 'CC BY-SA',
    orientation: 'landscape',
  },
  'table-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Table_set_for_dining_in_a_modern_restaurant_interior_with_wooden_walls_and_elegant_decor.jpg/1920px-Table_set_for_dining_in_a_modern_restaurant_interior_with_wooden_walls_and_elegant_decor.jpg',
    alt: 'A sophisticated restaurant table set with flowers and a warm wooden interior',
    artist: 'Shixart1985',
    license: 'CC BY',
    orientation: 'portrait',
  },
  'wedding-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Bunratty_Castle_Hotel_-_Table_Setting_for_Wedding_Reception_Dinner_-_geograph.org.uk_-_3779894.jpg/1920px-Bunratty_Castle_Hotel_-_Table_Setting_for_Wedding_Reception_Dinner_-_geograph.org.uk_-_3779894.jpg',
    alt: 'An elegantly set wedding reception table with warm candlelight',
    artist: 'Joseph Mischyshyn',
    license: 'CC BY-SA',
    orientation: 'landscape',
  },
  'wedding-2': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Marriage_reception_desk_in_Thailand.JPG/1920px-Marriage_reception_desk_in_Thailand.JPG',
    alt: 'Wedding reception table décor with warm golden accents',
    artist: 'Mattes',
    license: 'CC BY-SA',
    orientation: 'landscape',
  },
  'corporate-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/20th_Anniversary_Schwab_Foundation_Gala_Dinner_%2844166854244%29.jpg/1920px-20th_Anniversary_Schwab_Foundation_Gala_Dinner_%2844166854244%29.jpg',
    alt: 'A lavish gala dinner with elegant table settings and warm light',
    artist: 'World Economic Forum',
    license: 'CC BY',
    orientation: 'landscape',
  },
  'corporate-2': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/RWVI_Gala_Dinner%2C_Venice_2019_Congress.jpg/1920px-RWVI_Gala_Dinner%2C_Venice_2019_Congress.jpg',
    alt: 'A sophisticated gala dinner in a grand hall',
    artist: 'Derek Williams',
    license: 'CC BY',
    orientation: 'landscape',
  },
  'party-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Rice_lights_converging_to_a_center_in_a_outdoor_party_decoration.jpg/1920px-Rice_lights_converging_to_a_center_in_a_outdoor_party_decoration.jpg',
    alt: 'String lights converging overhead at a dark outdoor party',
    artist: 'Subhrajyoti07',
    license: 'CC BY-SA',
    orientation: 'landscape',
  },
  'party-2': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/DFC_4625_Twinkling_string_lights_guide_the_way_to_a_cozy_garden_caf%C3%A9_on_a_warm_evening.jpg/1920px-DFC_4625_Twinkling_string_lights_guide_the_way_to_a_cozy_garden_caf%C3%A9_on_a_warm_evening.jpg',
    alt: 'Twinkling string lights along a cozy garden path at night',
    artist: 'PattayaPatrol',
    license: 'CC BY-SA',
    orientation: 'landscape',
  },
  'party-3': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/The_champagne_toast.jpg/1920px-The_champagne_toast.jpg',
    alt: 'Champagne glasses raised in a warm golden toast',
    artist: 'Jen Russo',
    license: 'CC BY',
    orientation: 'portrait',
  },
  'decor-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/France-000368C_-_Hall_of_Mirrors_%2814641986468%29.jpg/1920px-France-000368C_-_Hall_of_Mirrors_%2814641986468%29.jpg',
    alt: 'An opulent gold ballroom with chandeliers and mirrored walls',
    artist: 'Dennis G. Jarvis',
    license: 'CC BY-SA',
    orientation: 'landscape',
  },
  'rooftop-1': {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Dinner_on_a_rooftop_%286369713231%29.jpg/1920px-Dinner_on_a_rooftop_%286369713231%29.jpg',
    alt: 'A candlelit rooftop dinner table under a dark evening sky',
    artist: 'Barry Pousman',
    license: 'CC BY',
    orientation: 'landscape',
  },
}

export function image(key: string): StockImage {
  const found = IMAGES[key]
  if (found) return found
  // Graceful fallback: never render a broken <img>. SmartImage turns an empty
  // src into an elegant branded placeholder.
  return { src: '', alt: '', orientation: 'landscape' }
}
