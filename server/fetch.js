import Bluebird from 'bluebird'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

// Set up fetch and promise handling for async API calls
fetch.promise = Bluebird

// Configure dotenv for environment variables
dotenv.config()

// Base URL for weather API fetch calls
const baseURL = 'http://api.openweathermap.org/data/2.5/weather'

export const getByCity = location => {
  return fetch(baseURL + `?q=${location}&` + 'APPID=' + process.env.WEATHER_API_KEY)
  .then(resp => resp.json())
}

export const getByLatLon = (lat, lon) => {
  return fetch(baseURL + `?lat=${lat}&lon=${lon}&` + 'APPID=' + process.env.WEATHER_API_KEY)
  .then(resp => resp.json())
}

export const getByCityId = (id) => {
  return fetch(baseURL + `?id=${id}&` + 'APPID=' + process.env.WEATHER_API_KEY)
  .then(resp => resp.json())
}
