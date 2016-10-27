import Joi from 'joi'
import * as ShipUtils from './ship-utils'

export const SHIP_TYPES = {
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

export async function place (placement, roundId, data) {
  const v = Joi.validate(placement, shipSchemas, { stripUnknown: true })
  if (v.error) {
    throw v.error
  }
  const coordinates = ShipUtils.realSpace(placement) 
  for (const coordinate of coordinates) {
    if (coordinate.x < 0 || coordinate.y < 0 || coordinate.x >= 10 || coordinate.y >= 10) {
      throw new Error('Illegal placement: coordinate out of ocean')
    }
  }
  return data.getShipsByRound(roundId).then(ships => {
    const getShipOccupiedSpaces = (ship) => ShipUtils.getOccupiedSpacesFromRealSpaces(ShipUtils.realSpace(ship))
    const allSpaces = ShipUtils.flatArrayWithFilter(ships.map(getShipOccupiedSpaces), ShipUtils.isSameCoordinate)
    if (allSpaces.filter(a => ShipUtils.isSameCoordinate(a, placement.coordinates)).length >= 1) {
      throw new Error('Illegal placement: too near to another ship')
    }
    if (ShipUtils.getQuota(placement.shipTypes) - ships.filter(r => r.shipTypes === placement.shipTypes).length <= 0) {
      throw new Error('Ship depleted')
    }
    return data.saveShip(placement, roundId)
  })
}