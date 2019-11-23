// Set up fetch and promise handling for async API calls
const Bluebird = require('bluebird')
const fetch = require('node-fetch')
fetch.promise = Bluebird

// Configure dotenv for environment variables
require('dotenv').config()

// Base URL for all fetch calls
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?'

module.exports = { 
  getByCity: location => {
    return fetch(baseURL + `q=${location}&` + 'APPID=' + process.env.OWM_API_KEY)
    .then(resp => resp.json())
  },
  getByLatLon: (lat, lon) => {
    return fetch(baseURL + `lat=${lat}&lon=${lon}&` + 'APPID=' + process.env.OWM_API_KEY)
    .then(resp => resp.json())
  }
}
