import express from 'express'
import setup from './endpoints/setup'
import BodyParser from 'body-parser'

const app = express()
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

setup(app)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})