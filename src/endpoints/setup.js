const MongoDb = require('mongodb')
const Config = require('../config')
const ShipService = require('../service/ship')
const ShipData = require('../data/ship-data')

export default function setup (app) {
  const MongoClient = MongoDb.MongoClient
  MongoClient.connect(Config.MONGO_URL, (err, db) => {
    console.log('MONGODB CONNECTED')
    const ShipDataLayer = ShipData.createShipData(db)
    app.get('/', (req, res) => {
      res.send('Battleship hello')
    })

    app.get('/api', (req, res) => {

    })

    app.post('/api/reset', (req, res) => {
      
    })

    app.post('/api/ship', (req, res) => {
      return ShipService.place(req.body, ShipDataLayer).then(result => {
        res.json(result)
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
    })

    app.post('/api/attack', (req, res) => {
      
    })
  })
}