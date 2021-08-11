const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm9iLWRla2tlciIsImEiOiJja3JueXhzY2IxMWthMm9ub3Ruc3dybXZnIn0.c9v5R71-bPHLML9B1iWLYQ&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (response.body.features.length === 0) {
      callback('Unable to find location!');
    } else {
      const { center, place_name } = response.body.features[0];
      callback(undefined, {
        latitude: center[0],
        longitude: center[1],
        location: place_name
      });
    }
  });
}

module.exports = geocode;