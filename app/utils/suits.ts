const redSuits = ['♥', '♦']

/** Red suits print in circus red, black suits in navy — regardless of the active deck */
export const suitClass = (suit?: string) =>
  redSuits.includes(suit ?? '') ? 'suit-red' : 'suit-black'
