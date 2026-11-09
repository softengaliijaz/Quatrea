export const SEASONS = [
  { key: 'spring', name: 'Spring', perfumeId: 'eclosion', color: '#86B98F', headline: 'The first warm morning after the rain.', text: 'Green tea and pear blossom open the day. Peony and lily of the valley follow, then white musk settles like linen drying in the sun.', chips: ['Green tea', 'Peony', 'White musk'] },
  { key: 'summer', name: 'Summer', perfumeId: 'zenith', color: '#F0B13C', headline: 'Noon on the water, nothing left to do.', text: 'Bergamot and sea salt meet neroli and frangipani. The dry-down is sun-bleached driftwood and a soft vanilla that lasts until evening.', chips: ['Bergamot', 'Frangipani', 'Driftwood'] },
  { key: 'autumn', name: 'Autumn', perfumeId: 'vendange', color: '#A5495A', headline: 'Dark fruit, warm wood, the last evening outside.', text: 'Black currant and fig leaf lead into red grape and rose. Oud and patchouli make the base deeper with every hour.', chips: ['Black currant', 'Red grape', 'Oud'] },
  { key: 'winter', name: 'Winter', perfumeId: 'givre', color: '#8FAFD6', headline: 'Cold air, warm skin, a quiet room.', text: 'Juniper and pink pepper sparkle over iris and frosted violet. Amber and sandalwood melt in last, the feeling of stepping indoors.', chips: ['Juniper', 'Iris', 'Amber'] },
];
export const seasonByKey = Object.fromEntries(SEASONS.map((s) => [s.key, s]));
