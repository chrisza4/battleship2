import Joi from 'joi'
import * as ShipUtils from './ship-utils'
import { isSameCoordinate } from './utils'
import { shipSchemas } from '../data/ship-data'

export async function place (placement, data) {
  console.log(placement)
  const v = Joi.validate(placement, shipSchemas, { stripUnknown: true })
  if (v.error) {
    throw v.error
  }
  const cleanPlacement = v.value
  const coordinates = ShipUtils.realSpace(placement) 
  for (const coordinate of coordinates) {
    if (coordinate.x < 0 || coordinate.y < 0 || coordinate.x >= 10 || coordinate.y >= 10) {
      throw new Error('Illegal placement: coordinate out of ocean')
    }
  }
  return data.getShipsByLatestRound().then(ships => {
    const getShipOccupiedSpaces = (ship) => ShipUtils.getOccupiedSpacesFromRealSpaces(ShipUtils.realSpace(ship))
    const allSpaces = ShipUtils.flatArrayWithFilter(ships.map(getShipOccupiedSpaces), isSameCoordinate)
    if (allSpaces.filter(a => isSameCoordinate(a, placement.coordinates)).length >= 1) {
      throw new Error('Illegal placement: too near to another ship')
    }
    if (ShipUtils.getQuota(placement.shipTypes) - ships.filter(r => r.shipTypes === placement.shipTypes).length <= 0) {
      throw new Error('Ship depleted')
    }
    return data.saveShip(cleanPlacement)
  })
}