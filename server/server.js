import express from 'express'
import cors from 'cors'
import { getByCity, getByLatLon, getByCityId, getCityInfo, searchCities } from './fetch' // Import fetch functions

// Set up express to run on port 3000
const app = express()
const PORT = 3000

// Apply express json parser to parse body from POST requests
app.use(express.json())

// Apply CORS exceptions for frontend API requests
app.use(cors())

// Apply middleware to log method, path, and timestamp to the console
app.use((req, res, next) => {
  console.log("\x1b[36m", `${req.method} ${req.path} started at ${new Date()}`)
  next()
})

// Root route to test connection
app.get('/', (req, res) => {

  res.status(200).json([
    { id: 1, message: 'Hello World!' },
    { id: 2, message: 'Chine says hello!' },
    { id: 3, message: 'So does Shannon 😀' }
  ])
})

app.get('/search/:location', (req, res) => {
  searchCities(req.params.location)
  .then(data => {
    const cities = data.results.filter(c => c.components._type === 'city' || c.components._type === 'state')
    console.log(cities, cities.length)

    res.status(200).json(cities)
  })
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
      console.log(`Response body ${res.body}`)
      res.status(400).json({msg: 'Case statements not hit. Nothing to see here'})
  }
})

// Specific city is included in the URI path. API is queried for the *approximate* city
app.get('/weather/:location', (req, res) => {
  console.log('Hit my query route!')
  getByCity(req.params.location)
  .then(resp => {
    console.log('/weather/:location route hit. No errors here')
    res.status(200).json(resp)
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

// Custom error handling middleware
app.use((err, req, res) => {
  console.error(req.body)
  console.log(res)
  // res.status(500).json(err.stack)
})

// Opens the server on the specified port
const server = app.listen(PORT, () => {
  console.log(`Simple Weather App currently listening on port: ${PORT}`)
})

// Closes the server
process.on('SIGINT', () => {
  console.log('\n Gracefully stopping...')
  server.close()
  console.log('\n Have a nice day!')
})
