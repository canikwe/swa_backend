import express from 'express'
import cors from 'cors'
import { getByCity, getByLatLon, getByCityId } from './fetch' // Import fetch functions

// Set up express to run on port 3000
const app = express()
const PORT = 3000

// Apply express json parser to parse body from POST requests
app.use(express.json())

// Apply CORS exceptions for frontend API requests
app.use(cors())

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
      getByCity(req.body.query)
      .then(resp => {
        console.log('Location case hit. No errors here')
        res.status(200).json(resp)
      })
      .catch(console.log)
      break
    case 'coordinates':
      getByLatLon(req.body.query.lat, req.body.query.lon)
      .then(resp => {
        console.log('Coordinates case hit. No errors here')
        res.status(200).json(resp)
      })
      .catch(console.log)
      break
    default:
      console.log(req.body)
      res.status(400).json({msg: 'Case statements not hit. Nothing to see here'})
  }
})

// Specific city is included in the URI path. API is queried for the *approximate* city
app.get('/weather/:location', (req, res) => {
  console.log('Hit my query route!')
  getByCity(req.params.location)
  .then(resp => {
    console.log('/weather/:location route hit. No errors here')
    res.send(resp)
  })
  .catch(console.log)
})

// Latitude and longitude is included in the URI.
app.get('/weather/:lat/:lon', (req, res) => {
  console.log('lat/lon route')
  getByLatLon(req.params.lat, req.params.lon)
  .then(resp => {
    console.log('/weather/:lat/:lon route hit. No errors here')
    res.status(200).json(resp)
  })
  .catch(console.log)
})

const server = app.listen(PORT, () => {
  console.log(`Simple Weather App currently listening on port: ${PORT}`)
})

process.on('SIGINT', () => {
  console.log('\n Gracefully stopping...')
  server.close()
  console.log('\n Have a nice day!')
})
