const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App', 
    name: 'Rob Dekker'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About', 
    name: 'Rob Dekker'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page', 
    message: 'This is the help message!', 
    name: 'Rob Dekker'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'No search query provided!'
    });
  }

  geocode(req.query.search, (error, data) => {
    if (error) {
      return res.send({
        error: 'An error occured'
      });
    }

    const { latitude, longitude, location } = data;
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
  
      res.send({ 
        forecast: forecastData, 
        location,
        address: req.query.search
      });
    })
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404', 
    message: 'Help article not found', 
    name: 'Rob Dekker'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404', 
    message: 'Page not found', 
    name: 'Rob Dekker'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});