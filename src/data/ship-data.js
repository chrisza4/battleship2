const Joi = require('joi')

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
      return db.collection('rounds').find({}).sort({ created: -1 }).limit(1).toArray().then(rounds => {         
        if (!rounds || !rounds.length) return db.collection('rounds').insert({
          created: new Date()
        }).then(r => r.ops)
        return rounds[0]        
      })
      .then(round => {
        const roundId = String(round._id)
        return db.collection('ships').insert(Object.assign({ }, toSave, { roundId }))
      })
    },

    getShipsByLatestRound () {
      return db.collection('rounds').find({}).sort({ created: -1 }).limit(1).toArray().then(rounds => {
        if (!rounds || !rounds.length) return [ ]
        return db.collection('ships').find({
          roundId: String(rounds[0]._id)
        }).toArray()
      })
    },
  }
}