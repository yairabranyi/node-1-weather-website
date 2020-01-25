const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/feb093141399c603ced220cf2fdce8f5/' +
    latitude + 
    ',' +
    longitude +
    '?units=si'
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find coordinates', undefined)
    } else {
      callback(
        undefined,
        `Today it's ${body.daily.data[0].summary} The Temprature is currently ${body.currently.temperature}, and the precipProbability is ${body.currently.precipProbability}.`
      )
    }
  })
}

module.exports = forecast
