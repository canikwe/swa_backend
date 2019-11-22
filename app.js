const express = require('express')
const app = express()
const port = 3000

const Bluebird = require('bluebird')
const fetch = require('node-fetch')
fetch.promise = Bluebird

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
  fetch('https://www.metaweather.com/api/location/44418')
  .then(resp => resp.json())
  .then(resp => {
    console.log('No errors here')
    res.send(resp)
  })
  .catch(console.log)
  // res.send({message: 'Hit my weather route'})
})

app.listen(port, () => {
  console.log(`Simple Weather App currently listening on port: ${port}`)
})
