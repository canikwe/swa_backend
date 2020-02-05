import Bluebird from 'bluebird'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

// Set up fetch and promise handling for async API calls
fetch.promise = Bluebird

// Configure dotenv for environment variables
dotenv.config()

// Base URL for weather API fetch calls
const weatherURL = () => 'http://api.openweathermap.org/data/2.5/weather'
const cityURL = () => 'https://api.opencagedata.com/geocode/v1/json?q='

export const getByCity = location => {
  return fetch(weatherURL() + `?q=${location}&` + 'APPID=' + process.env.WEATHER_API_KEY)
  .then(resp => resp.json())
}

export const getByLatLon = (lat, lon) => {
  return fetch(weatherURL() + `?lat=${lat}&lon=${lon}&` + 'APPID=' + process.env.WEATHER_API_KEY)
  .then(resp => resp.json())
}

export const getByCityId = (id) => {
  return fetch(weatherURL() + `?id=${id}&` + 'APPID=' + process.env.WEATHER_API_KEY)
  .then(resp => resp.json())
}

export const searchCities = city => {
  // return cityList.filter(cityObj => cityObj.name.toLowerCase() === 'springfield')
  console.log(cityURL(), process.env.CITY_API_KEY)

  return fetch(cityURL() + city + '&key=' + process.env.CITY_API_KEY)
  .then(resp => resp.json())
}

