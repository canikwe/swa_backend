// Set up express to run on port 3000
const express = require('express')
const app = express()
const port = 3000



// Import fetch functions
const fetch = require('./fetch')

app.get('/', (req, res) => {
  console.log(req.params)
  res.send([
    { id: 1, message: 'Hello World!' },
    { id: 2, message: 'Chine says hello!' },
    { id: 3, message: 'So does Shannon 😀' }
  ])
})

// Specific city is included in the URI path. API is queried for the *approximate* city
app.get('/weather/:location', (req, res) => {
  console.log('Hit my query route!')
  fetch.getByCity(req.params.location)
  .then(resp => {
    console.log('No errors here')
    res.send(resp)
  })
  .catch(console.log)
})

app.get('/weather/:lat/:lon', (req, res) => {
  console.log('lat/lon route')
  fetch.getByLatLon(req.params.lat, req.params.lon)
  .then(resp => {
    console.log('No errors here')
    res.send(resp)
  })
  .catch(console.log)
})

app.listen(port, () => {
  console.log(`Simple Weather App currently listening on port: ${port}`)
})
