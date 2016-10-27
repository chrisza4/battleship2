const Joi = require('joi')
const RoundData = require('./round-data')

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
  direction: Joi.string().valid([ 'vertical', 'horizontal' ]),
  roundId: Joi.string().allow(null)
}).required()

export function createShipData (db) {
  return {
    saveShip (toSave) {
      Joi.assert(toSave, shipSchemas)
      return RoundData.getLatestRound(db)
      .then(round => {
        const roundId = String(round._id)
        return db.collection('ships').insert(Object.assign({ }, toSave, { roundId }))
      })
    },

    getShipsByLatestRound () {
      return RoundData.getLatestRound(db).then(round => {
        return db.collection('ships').find({
          roundId: String(round._id)
        }).toArray()
      })
    },
  }
}