import { SHIP_TYPES } from '../data/ship-data'
import { isSameCoordinate } from './utils'

export function flatArrayWithFilter (doubleArray, filterer) {
  return doubleArray.reduce((acc, array) => {
    for (const item of array) {
      if (acc.filter(p => filterer(p, item)).length === 0) {
        acc.push(item)
      }
    }
    return acc
  }, [ ])
} 

export function getQuota (shipType) {
  switch (shipType) {
    case SHIP_TYPES.Battleship: return 1
    case SHIP_TYPES.Cruisers: return 2
    case SHIP_TYPES.Destroyers: return 3
    case SHIP_TYPES.Submarines: return 4
    default: return 0
  }
}

function occupiedSpaceForSingleCoordinate (coordinate) {
  const result = [ ]
  for (let i = coordinate.x - 1; i <= coordinate.x + 1; i++)
    for (let j = coordinate.y - 1; j <= coordinate.y + 1; j++)
      result.push({ x: i, y: j })
  return result 
}

export function getOccupiedSpacesFromRealSpaces (realSpaces) {
  const allOccupiedSpaces = flatArrayWithFilter(realSpaces.map(occupiedSpaceForSingleCoordinate), isSameCoordinate)
  return Object.values(allOccupiedSpaces)
}

export function realSpace (ship) {
  switch (ship.shipTypes) {
    case SHIP_TYPES.Battleship: {
      if (ship.direction === 'horizontal') {
        return [
          { x: ship.coordinates.x, y: ship.coordinates.y },
          { x: ship.coordinates.x + 1, y: ship.coordinates.y },
          { x: ship.coordinates.x + 2, y: ship.coordinates.y },
          { x: ship.coordinates.x + 3, y: ship.coordinates.y },
        ]
      }
      else {
        return [
          { x: ship.coordinates.x, y: ship.coordinates.y },
          { x: ship.coordinates.x, y: ship.coordinates.y + 1 },
          { x: ship.coordinates.x, y: ship.coordinates.y + 2 },
          { x: ship.coordinates.x, y: ship.coordinates.y + 3 },
        ]
      }
    }
    case SHIP_TYPES.Cruisers: {
      if (ship.direction === 'horizontal') {
        return [
          { x: ship.coordinates.x, y: ship.coordinates.y },
          { x: ship.coordinates.x + 1, y: ship.coordinates.y },
          { x: ship.coordinates.x + 2, y: ship.coordinates.y },
        ]
      }
      else {
        return [
          { x: ship.coordinates.x, y: ship.coordinates.y },
          { x: ship.coordinates.x, y: ship.coordinates.y + 1 },
          { x: ship.coordinates.x, y: ship.coordinates.y + 2 },
        ]
      }
    }
    case SHIP_TYPES.Destroyers: {
      if (ship.direction === 'horizontal') {
        return [
          { x: ship.coordinates.x, y: ship.coordinates.y },
          { x: ship.coordinates.x + 1, y: ship.coordinates.y },
        ]
      }
      else {
        return [
          { x: ship.coordinates.x, y: ship.coordinates.y },
          { x: ship.coordinates.x, y: ship.coordinates.y + 1 },
        ]
      }
    }
    case SHIP_TYPES.Submarines: {
      return [ { x: ship.coordinates.x, y: ship.coordinates.y } ]
    }
  }
}