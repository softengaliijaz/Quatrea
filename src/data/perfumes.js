export const SIZES = [
  { ml: 30, factor: 0.65 },
  { ml: 50, factor: 1 },
  { ml: 100, factor: 1.7 },
];

export const PERFUMES = [
  {
    id: 'eclosion', slug: 'eclosion', name: 'Éclosion', season: 'spring', accent: '#86B98F',
    tagline: 'The first warm morning after the rain.',
    description: 'Éclosion opens like a window thrown wide. Green tea and pear blossom lift off damp petals, peony and lily of the valley hold the middle, and white musk settles like linen drying in the sun.',
    notes: { top: ['Green tea', 'Pear blossom'], heart: ['Peony', 'Lily of the valley'], base: ['White musk', 'Cedar'] },
    families: ['floral', 'green'], mood: 'First light, open windows', longevity: '6 to 8 hours', basePrice: 98, rating: 4.8, reviewCount: 124,
    reviews: [
      { id: 'e1', name: 'Amélie R.', rating: 5, date: 'March 2026', text: 'Fresh without being sharp. I get compliments every time I wear it to work.' },
      { id: 'e2', name: 'Sofia L.', rating: 5, date: 'April 2026', text: 'Smells like a garden after rain. It lasts a full working day on me.' },
      { id: 'e3', name: 'Marcus T.', rating: 4, date: 'April 2026', text: 'Clean and calm. I wish the bottle were larger.' },
    ],
  },
  {
    id: 'zenith', slug: 'zenith', name: 'Zénith', season: 'summer', accent: '#F0B13C',
    tagline: 'Noon on the water, nothing left to do.',
    description: 'Zénith is bright from the first spray. Bergamot and sea salt meet neroli and frangipani, then dry down into sun-bleached driftwood and a soft vanilla that stays on your skin until evening.',
    notes: { top: ['Bergamot', 'Sea salt'], heart: ['Neroli', 'Frangipani'], base: ['Driftwood', 'Vanilla'] },
    families: ['fresh', 'floral'], mood: 'Salt air, long afternoons', longevity: '5 to 7 hours', basePrice: 104, rating: 4.6, reviewCount: 98,
    reviews: [
      { id: 'z1', name: 'Julien P.', rating: 5, date: 'June 2026', text: 'Holiday in a bottle. The salt note is real and the vanilla never gets sweet.' },
      { id: 'z2', name: 'Nadia K.', rating: 4, date: 'July 2026', text: 'Perfect for hot days. I reapply once around lunch.' },
      { id: 'z3', name: 'Ines B.', rating: 5, date: 'August 2026', text: 'My signature summer scent now. Light, but people still notice it.' },
    ],
  },
  {
    id: 'vendange', slug: 'vendange', name: 'Vendange', season: 'autumn', accent: '#8E3B46',
    tagline: 'Dark fruit, warm wood, the last evening outside.',
    description: 'Vendange smells like the cellar door opening. Black currant and fig leaf lead into red grape and rose, resting on a deep base of oud and patchouli that grows richer through the evening.',
    notes: { top: ['Black currant', 'Fig leaf'], heart: ['Red grape', 'Rose'], base: ['Oud', 'Patchouli'] },
    families: ['woody', 'fruity'], mood: 'Harvest, candlelight', longevity: '8 to 10 hours', basePrice: 118, rating: 4.9, reviewCount: 143,
    reviews: [
      { id: 'v1', name: 'Hugo D.', rating: 5, date: 'October 2025', text: 'Rich, warm and a little mysterious. My favourite for dinners.' },
      { id: 'v2', name: 'Clara M.', rating: 5, date: 'November 2025', text: 'The grape and rose pairing is unlike anything else I own.' },
      { id: 'v3', name: 'Omar S.', rating: 5, date: 'October 2026', text: 'Two sprays last all night. Worth every cent.' },
    ],
  },
  {
    id: 'givre', slug: 'givre', name: 'Givre', season: 'winter', accent: '#8FAFD6',
    tagline: 'Cold air, warm skin, a quiet room.',
    description: 'Givre is crisp and silent. Juniper and pink pepper sparkle over iris and frosted violet, then melt into amber and sandalwood, a warmth that feels like stepping indoors.',
    notes: { top: ['Juniper', 'Pink pepper'], heart: ['Iris', 'Frosted violet'], base: ['Amber', 'Sandalwood'] },
    families: ['woody', 'fresh'], mood: 'Still air, first snow', longevity: '7 to 9 hours', basePrice: 112, rating: 4.7, reviewCount: 87,
    reviews: [
      { id: 'g1', name: 'Elise V.', rating: 5, date: 'January 2026', text: 'Elegant and calm. Smells like walking into a warm room in January.' },
      { id: 'g2', name: 'Tomas H.', rating: 4, date: 'February 2026', text: 'The pink pepper opening is wonderful. The amber takes over after an hour.' },
      { id: 'g3', name: 'Yuki A.', rating: 5, date: 'December 2025', text: 'Quiet but present. I wear it under a scarf and keep smelling it.' },
    ],
  },
];

export const FAMILIES = ['floral', 'green', 'fresh', 'woody', 'fruity'];
export const getPerfume = (slug) => PERFUMES.find((p) => p.slug === slug);
export const priceFor = (perfume, ml) => Math.round(perfume.basePrice * (SIZES.find((s) => s.ml === ml)?.factor ?? 1));
