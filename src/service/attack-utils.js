import _ from 'lodash'
import { realSpace } from './ship-utils'
import { isSameCoordinate } from './utils'

export function isBoardReadyToPlay (ships) {
  if (!Array.isArray(ships)) return false
  if (ships.length < 10) return false
  return true
}

export function getHitableSpaces (ships) {
  const shipTypeSet = new Set()
  for (const ship of ships) {
    shipTypeSet.add(ship.roundId)
  }
  if (shipTypeSet.size > 1) {
    throw new Error('Ship mixxing up')
  }
  const allCoordinates = _.flatten(ships.map(realSpace))
  return _.uniqBy(allCoordinates, c => String(c.x) + String(c.y))
}

export function getAttackResult (currenAttack, oldAttacks, ships) {
  const allCoordinates = _.flatten(ships.map(realSpace))
  if (!_.some(allCoordinates, c => isSameCoordinate(c, currenAttack.coordinates))) {
    return {
      message: 'miss'
    }
  }  
  const allAttacks = [ currenAttack, ...oldAttacks ]
  const attackedCoor = allAttacks.map(d => d.coordinates)
  const alreadyHitSpot = _.reduce(allCoordinates, (acc, co) => {
    if (_.some(attackedCoor, a => isSameCoordinate(co, a))) acc.push(co)
    return acc
  }, [ ])
  if (alreadyHitSpot.length >= allCoordinates.length) {
    return {
      message: 'won'
    }
  }
  for (const ship of ships) {
    const shipSpaces = realSpace(ship)
    if (isHit(currenAttack, shipSpaces)) {
      if (isShipSunk(ship, allAttacks)) {
        return {
          message: 'You just sank the ship',
          shipTypes: ship.shipTypes
        }
      }
      else {
        return {
          message: 'hit'
        }
      }
    }
  }
}

const isHit = (attack, coordinates) => _.some(coordinates, c => isSameCoordinate(attack.coordinates, c))  

export function isShipSunk (ship, attacks) {
  const shipSpaces = realSpace(ship)
  let spaceLeft = shipSpaces.length
  for (const attack of attacks) {
    if (_.some(shipSpaces, s => isSameCoordinate(s, attack.coordinates))) {
      spaceLeft--
    }
    if (spaceLeft === 0) return true
  }
  return false
}