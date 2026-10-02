const redSuits = ['♥', '♦']

/** Red suits get bordeaux, black suits get baltic blue — regardless of active palette */
export const suitClass = (suit?: string) =>
  redSuits.includes(suit ?? '') ? 'suit-red' : 'suit-black'
