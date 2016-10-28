import Joi from 'joi'
import * as RoundData from './round-data'

export const attackSchemas = Joi.object().keys({
  roundId: Joi.string().allow(null),
  coordinates: Joi.object().keys({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }).required(),
}).required()

export function createAttackData (db) {
  return {
    saveAttack: async (attack) => {
      Joi.assert(attack, attackSchemas)
      const round = await RoundData.getLatestRound(db)
      return db.collection('attacks').insert(Object.assign(
        { },
        attack,
        { roundId: String(round._id)
      }))
    },

    getAttackByLatestRound: async () => {
      const round = await RoundData.getLatestRound(db)
      return db.collection('attacks').find({
        roundId: String(round._id)
      }).toArray()
    }
  }
}