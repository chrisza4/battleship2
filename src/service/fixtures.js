export function createMockShip (opts) {
  const prototype = {
    shipTypes: 1,
    coordinates: {
      x: 0,
      y: 0,
    },
    direction: 'vertical',
    roundId: 'round1'
  }

  return Object.assign(prototype, opts)
}

export function createMockAttack (opts) {
  const prototype = {
    coordinates: {
      x: 0,
      y: 0,
    },
    roundId: 'round1'
  }
  return Object.assign(prototype, opts)
}