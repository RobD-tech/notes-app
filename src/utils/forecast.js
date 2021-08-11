const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=442007c0322caae09503baeac99039a8&query=${longitude},${latitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather services!')
    } else if (response.body.error) {
      callback('Unable to find location');
    } else {
      const { temperature, feelslike, weather_descriptions } = response.body.current;
      callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
    }
  })
}

module.exports = forecast;