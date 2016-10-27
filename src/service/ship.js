import Joi from 'joi'
import _ from 'lodash'

const SHIP_TYPES = {
  Battleship: 1,
  Cruisers: 2,
  Destroyers: 3,
  Submarines: 4
}

export const shipSchemas = Joi.object().keys({
  shipTypes: Joi.number().valid(Object.values(SHIP_TYPES)).required(),
  coordinates: Joi.object().keys({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }).required(),
  direction: Joi.string().valid([ 'vertical', 'horizontal' ])
})

export async function place (params, data) {
  const v = Joi.validate(params, shipSchemas, { stripUnknown: true })
  if (v.error) {
    throw v.error
  }


}

export function isShipCanBePlaced (newShip, ships) {

}

export function occupiedSpace (ship) {
  const occupied = (coordinate) => {
    const result = [ ]
    for (let i = coordinate.x - 1; i <= coordinate.x + 1; i++)
      for (let j = coordinate.y - 1; j <= coordinate.y + 1; j++)
        result.push({ x: i, y: j })
    return result 
  }
  const spaces = realSpace(ship)
  const allOccupiedSpaces = _.reduce(_.flatten(spaces.map(occupied)), (acc, val) => {
    const key = JSON.stringify(val)
    acc[key] = val
    return acc
  }, { })
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