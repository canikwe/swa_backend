// Set up express to run on port 3000
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

// Parse POST requests
const bodyParser = require('body-parser')

// Apply body-parser to get params from POST requests
app.use(bodyParser.json())

// Apply CORS exceptions for frontend API requests
app.use(cors())

// Import fetch functions
const fetch = require('./fetch')

// Root route to test connection
app.get('/', (req, res) => {
  console.log(req.params)
  res.send([
    { id: 1, message: 'Hello World!' },
    { id: 2, message: 'Chine says hello!' },
    { id: 3, message: 'So does Shannon 😀' }
  ])
})

// Single route to handle POST requests from frontend
app.post('/weather', (req, res) => {
  switch(req.body.type) {
    case 'location':
      fetch.getByCity(req.body.query)
      .then(resp => {
        console.log('No errors here')
        res.send(resp)
      })
      .catch(console.log)
      break
    case 'coordinates':
      fetch.getByLatLon(req.body.query.lat, req.body.query.lon)
      .then(resp => {
        console.log('No errors here')
        res.send(resp)
      })
      .catch(console.log)
      break
    default:
      console.log(req.body)
      res.send({msg: 'sorry, nothing to see here'})
  }
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

// Latitude and longitude is included in the URI.
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
