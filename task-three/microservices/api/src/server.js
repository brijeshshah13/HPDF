const express = require('express');
const bodyParser = require('body-parser');

// Init App
var app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Create a new client object
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAMsAqNZM6qVrPdxcFlcVAgk5Znz6T7a-A',
  Promise: Promise // 'Promise' is the native 
});

function expectOK(res) {
  expect(res.status).toBe(200);
  expect(res.json.status).toBe('OK');
  return res;
}

/**
 * Directions route (/directions)
 * Can be accessed by going to http://example.com:8080/directions
 * origin and destination are mandatory query params, rest are optional
 * this endpoint supports departure_time
 */
app.get('/directions/:origin?/:destination?/:mode?/:waypoints?/:alternatives?/:language?/:avoid?/:units?/:region?/:departure_time?/:traffic_model?/:transit_mode?/:transit_routing_preference?/:optimize?', (request, response) => {
  googleMapsClient.directions({
    origin: request.query.origin,
    destination: request.query.destination,
    mode: request.query.mode,
    waypoints: request.query.waypoints,
    alternatives: request.query.alternatives,
    language: request.query.language,
    avoid: request.query.avoid,
    units: request.query.units,
    region: request.query.region,
    departure_time: request.query.departure_time,
    traffic_model: request.query.traffic_model,
    transit_mode: request.query.transit_mode,
    transit_routing_preference: request.query.transit_routing_preference,
    optimize: request.query.optimize
    })
    .asPromise(expectOK)
    .then((res) => {
      response.json(res.json);
    })
    .catch((err) => {
      response.json(err);
    });
});

/**
 * Directions route (/directions)
 * Can be accessed by going to http://example.com:8080/directions
 * origin and destination are mandatory query params, rest are optional
 * this endpoint supports arrival_time
 */
app.get('/directions/:origin?/:destination?/:mode?/:waypoints?/:alternatives?/:language?/:avoid?/:units?/:region?/:arrival_time?/:traffic_model?/:transit_mode?/:transit_routing_preference?/:optimize?', (request, response) => {
  googleMapsClient.directions({
    origin: request.query.origin,
    destination: request.query.destination,
    mode: request.query.mode,
    waypoints: request.query.waypoints,
    alternatives: request.query.alternatives,
    language: request.query.language,
    avoid: request.query.avoid,
    units: request.query.units,
    region: request.query.region,
    arrival_time: request.query.arrival_time,
    traffic_model: request.query.traffic_model,
    transit_mode: request.query.transit_mode,
    transit_routing_preference: request.query.transit_routing_preference,
    optimize: request.query.optimize
    })
    .asPromise(expectOK)
    .then((res) => {
      response.json(res.json);
    })
    .catch((err) => {
      response.json(err);
    });
});

app.get('/distancematrix/:origins?/:destinations?/:mode?/:language?/:avoid?/:units?/:region?/:departure_time?/:transit_mode?/:transit_routing_preference?/:traffic_model?', (request, response) => {
  googleMapsClient.distanceMatrix({
    origins: request.query.origins,
    destinations: request.query.destinations,
    mode: request.query.mode,
    language: request.query.language,
    avoid: request.query.avoid,
    units: request.query.units,
    region: request.query.region,
    departure_time: request.query.departure_time,
    transit_mode: request.query.transit_mode,
    transit_routing_preference: request.query.transit_routing_preference,
    traffic_model: request.query.traffic_model
    })
    .asPromise(expectOK)
    .then((res) => {
      response.json(res.json);
    })
    .catch((err) => {
      response.json(err);
    });
});

app.get('/distancematrix/:origins?/:destinations?/:mode?/:language?/:avoid?/:units?/:region?/:arrival_time?/:transit_mode?/:transit_routing_preference?/:traffic_model?', (request, response) => {
  googleMapsClient.distanceMatrix({
    origins: request.query.origins,
    destinations: request.query.destinations,
    mode: request.query.mode,
    language: request.query.language,
    avoid: request.query.avoid,
    units: request.query.units,
    region: request.query.region,
    arrival_time: request.query.arrival_time,
    transit_mode: request.query.transit_mode,
    transit_routing_preference: request.query.transit_routing_preference,
    traffic_model: request.query.traffic_model
    })
    .asPromise(expectOK)
    .then((res) => {
      response.json(res.json);
    })
    .catch((err) => {
      response.json(err);
    });
});

app.listen(8080, () => console.log('Server started on port 8080'));
