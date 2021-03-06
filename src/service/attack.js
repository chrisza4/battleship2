import Joi from 'joi'
import { attackSchemas } from '../data/attack-data'
import { isSameCoordinate } from './utils'
import * as AttackUtils from './attack-utils'

export async function placeAttack (attack, data) {
  const v = Joi.validate(attack, attackSchemas)
  if (v.error) {
    throw v.error
  }
  const attacks = await data.getAttackByLatestRound()
  const thisCoordinates = v.value.coordinates
  if (attacks.filter(c => isSameCoordinate(c.coordinates, thisCoordinates)).length > 0)
    throw new Error('Attack duplicated')
  const ships = await data.getShipsByLatestRound()
  if (!AttackUtils.isBoardReadyToPlay(ships)) {
    throw new Error('Board is not ready')
  }
  await data.saveAttack(attack)
  const boardResult = AttackUtils.getAttackResult(attack, attacks, ships)
  if (boardResult.message === 'won') {
    await data.newRound()
  }
  return boardResult
}