// Each answer adds points to one or more seasons. The highest total wins.
export const QUESTIONS = [
  { id: 'q1', text: 'It is a free Saturday. Where are you?', options: [
    { label: 'Walking through a market with an open window nearby', points: { spring: 2 } },
    { label: 'On a beach, with no plan at all', points: { summer: 2 } },
    { label: 'Cooking something slow for friends', points: { autumn: 2 } },
    { label: 'Inside with a book and a blanket', points: { winter: 2 } },
  ] },
  { id: 'q2', text: 'Pick the colour you would paint a room.', options: [
    { label: 'Soft sage green', points: { spring: 2 } },
    { label: 'Warm sunlit yellow', points: { summer: 2 } },
    { label: 'Deep wine red', points: { autumn: 2 } },
    { label: 'Pale frosted blue', points: { winter: 2 } },
  ] },
  { id: 'q3', text: 'How should a perfume feel on you?', options: [
    { label: 'Fresh and light, like clean air', points: { spring: 1, summer: 1 } },
    { label: 'Rich and warm, like a coat', points: { autumn: 1, winter: 1 } },
    { label: 'Bright and playful', points: { summer: 2 } },
    { label: 'Quiet and mysterious', points: { winter: 1, autumn: 1 } },
  ] },
  { id: 'q4', text: 'Your ideal evening ends with…', options: [
    { label: 'A garden party that runs late', points: { spring: 2 } },
    { label: 'A swim and a long dinner outside', points: { summer: 2 } },
    { label: 'Wine, candles and good conversation', points: { autumn: 2 } },
    { label: 'Snow falling outside the window', points: { winter: 2 } },
  ] },
  { id: 'q5', text: 'Which ingredient sounds most like you?', options: [
    { label: 'Pear blossom', points: { spring: 2 } },
    { label: 'Sea salt', points: { summer: 2 } },
    { label: 'Oud', points: { autumn: 2 } },
    { label: 'Sandalwood', points: { winter: 2 } },
  ] },
];
