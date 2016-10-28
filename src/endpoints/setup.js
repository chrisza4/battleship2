const MongoDb = require('mongodb')
const Config = require('../config')
const ShipService = require('../service/ship')
const ShipData = require('../data/ship-data')
const AttackData = require('../data/attack-data')
const RoundData = require('../data/round-data')
const AttackService = require('../service/attack')

export default function setup (app) {
  const MongoClient = MongoDb.MongoClient
  MongoClient.connect(Config.MONGO_URL, (err, db) => {
    console.log('MONGODB CONNECTED')

    const ShipDataLayer = ShipData.createShipData(db)
    const AttackDataLayer = AttackData.createAttackData(db)

    app.get('/', (req, res) => {
      res.send('Battleship hello')
    })

    app.get('/api', async (req, res) => {
      const ships = await ShipDataLayer.getShipsByLatestRound()
      res.json(ships)
    })

    app.post('/api/reset', async (req, res) => {
      await RoundData.newRound(db)
      res.send('ok')
    })

    app.post('/api/ship', (req, res) => {
      return ShipService.place(req.body, ShipDataLayer).then(result => {
        res.json(result)
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
    })

    app.post('/api/attack', async (req, res) => {
      try {
        const dataLayer = {
          getShipsByLatestRound: ShipDataLayer.getShipsByLatestRound,
          getAttackByLatestRound: AttackDataLayer.getAttackByLatestRound,
          saveAttack: AttackDataLayer.saveAttack,
          newRound: () => RoundData.newRound(db)
        }
        const result = await AttackService.placeAttack(req.body, dataLayer)
        res.json(result)
      }
      catch (err) {
        res.status(500).send(err.message)
      }
    })
  })
}