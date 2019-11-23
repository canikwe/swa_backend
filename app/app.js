// Set up express to run on port 3000
const express = require('express')
const app = express()
const port = 3000

// Set up fetch and promise handling for async API calls
const Bluebird = require('bluebird')
const fetch = require('node-fetch')
fetch.promise = Bluebird

// Configure dotenv for environment variables
require('dotenv').config()

// Base URL for all fetch calls
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?'

app.get('/', (req, res) => {
  console.log(req.params)
  res.send([
    { id: 1, message: 'Hello World!' },
    { id: 2, message: 'Chine says hello!' },
    { id: 3, message: 'So does Shannon 😀' }
  ])
})

app.get('/weather', (req, res) => {
  console.log('Hit my weather route!')
  fetch(baseURL + 'q=London&' + 'APPID=' + process.env.OWM_API_KEY)
  .then(resp => resp.json())
  .then(resp => {
    console.log('No errors here')
    res.send(resp)
  })
  .catch(console.log)
})

app.listen(port, () => {
  console.log(`Simple Weather App currently listening on port: ${port}`)
})
