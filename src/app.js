// var express = require('express')
// var app = express()

import express from 'express'
import setup from './endpoints/setup'

const app = express()

setup(app)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})