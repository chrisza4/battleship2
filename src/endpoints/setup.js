export default function setup (app) {
  app.get('/', (req, res) => {
    res.send('Battleship hello')
  })

  app.get('/api', (req, res) => {

  })

  app.post('/api/reset', (req, res) => {
    
  })

  app.post('api/ship', (req, res) => {

  })

  app.post('api/attack', (req, res) => {
    
  })
}