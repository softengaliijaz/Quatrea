export const ARTICLES = [
  {
    slug: 'why-four-perfumes', title: 'Why we made four perfumes, and only four', season: 'spring', readMinutes: 4, date: '12 March 2026',
    excerpt: 'A house with endless launches can never be known. We chose a calendar instead.',
    body: [
      'Most perfume houses grow by adding. A new launch every few months, a limited edition for every holiday, a flanker of a flanker. We wanted the opposite: a small house you could learn completely.',
      'The year already has a structure everyone understands. Four seasons give four moods, and each one asks for something different from a fragrance. Spring wants air. Summer wants light. Autumn wants depth. Winter wants quiet.',
      'So we wrote one perfume for each, and agreed that nothing else would be added until one of them was perfect. Éclosion took nineteen versions. Vendange took twenty-six.',
      'The result is a collection you can follow through the year, or ignore entirely and wear one all twelve months. Both are fine with us.',
    ],
  },
  {
    slug: 'how-a-note-travels', title: 'How a note travels from top to base', season: 'summer', readMinutes: 5, date: '2 June 2026',
    excerpt: 'Why a perfume smells different at ten minutes, two hours and bedtime.',
    body: [
      'A perfume is not one smell. It is a sequence, and the order is set by how quickly each ingredient evaporates from your skin.',
      'Top notes, such as bergamot and juniper, are made of tiny, light molecules. They arrive first and leave within minutes. They are the handshake.',
      'Heart notes, such as peony and neroli, take over for the next few hours. This is the part of the perfume you will actually live with.',
      'Base notes, such as amber and oud, are heavy and slow. They are still on your skin when everything else has gone, and they are the reason a scarf can smell of you the next morning.',
      'When you test a fragrance, wait at least an hour before you decide. The first spray is only the introduction.',
    ],
  },
  {
    slug: 'the-harvest-in-grasse', title: 'Notes from the harvest in Grasse', season: 'autumn', readMinutes: 6, date: '19 September 2026',
    excerpt: 'Five a.m., cold hands, and a field of roses that will be gone by noon.',
    body: [
      'Rose petals for perfume are picked before the sun is high. Once the day warms up, the oils in the flower begin to escape, and the best of the scent is lost.',
      'Our pickers start at five. By ten the baskets are weighed and carried to the distillery, where the petals are processed within hours.',
      'It takes around four tonnes of petals to make one kilogram of rose absolute. That is why we use it sparingly, only where it can be smelled.',
      'In the afternoon the field is quiet again. The roses that were missed are left, and the soil gets its rest until next year.',
    ],
  },
  {
    slug: 'wearing-perfume-in-winter', title: 'How to wear perfume in cold weather', season: 'winter', readMinutes: 3, date: '4 December 2026',
    excerpt: 'Cold skin holds less scent. Here is how to make a fragrance last under layers.',
    body: [
      'Perfume needs a little warmth to bloom, and in winter your skin is cooler and drier. Dry skin lets a scent disappear much faster.',
      'Start with an unscented moisturiser. Oils hold fragrance, so a thin layer on your wrists and neck gives the perfume something to cling to.',
      'Spray on pulse points, then once on a scarf or the collar of your coat. Fabric holds scent far longer than skin, and the warmth of your body will slowly release it through the day.',
      'Choose depth over freshness. Amber, sandalwood and iris carry well in cold air, while light citrus can feel thin.',
    ],
  },
];
export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);
